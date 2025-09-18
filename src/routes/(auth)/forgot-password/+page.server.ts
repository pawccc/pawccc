import { sql } from 'bun';

import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

import ChangePassword from '$lib/letters/ChangePassword.svelte';
import { sendMail } from '$lib/send.server';

export const load: PageServerLoad = async (event) => {
	if ((await event.locals.auth())?.user) redirect(303, '/');
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const username = data.get('username');
		if (typeof username !== 'string') return fail(400);

		const [user] = await sql`UPDATE "user"
								             SET passcode      = DEFAULT,
									 	             passcode_date = DEFAULT
								             WHERE username = ${username}
									             AND (passcode IS NULL OR passcode_date + INTERVAL '1 hour' < now())
								             RETURNING email, passcode`; // FIXME PUBLIC_AUTH_PASSCODE_EXPIRY
		if (!user) return fail(400);

		await sendMail(
			{
				from: 'pawc.cc <no-reply@pawc.cc>',
				to: user.email,
				subject: 'Change password request' // FIXME changePassword.letter.subject
			},
			ChangePassword,
			{
				passcode: user.passcode
			}
		);

		redirect(303, '/sign-in');
	}
};
