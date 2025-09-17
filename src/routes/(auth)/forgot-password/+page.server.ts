import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { sql } from 'bun';
import { sendMail } from '$lib/send.server';

export const load: PageServerLoad = async (event) => {
	// already authenticated
	if ((await event.locals.auth())?.user) redirect(303, '/');
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const username = data.get('username');
		if (!username) return fail(400);

		const [{ passcode, email }] =
			await sql`UPDATE "user" SET passcode = DEFAULT, passcode_date = DEFAULT WHERE username = ${username} RETURNING passcode, email`;
		if (!passcode) return fail(400);

		console.log(passcode);
		await sendMail({
			from: 'pawc.cc <no-reply@pawc.cc>',
			to: email,
			subject: 'Change Password',
			html: `<a href="https://pawc.cc/change-password?passcode=${passcode}">Change Password</a>`
		});

		redirect(303, '/sign-in');
	}
};
