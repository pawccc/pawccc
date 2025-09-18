import { sql } from 'bun';

import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

import ChangePassword from '$lib/letters/ChangePassword.svelte';
import { sendEmail } from '$lib/send.server';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9_]{2,16}$/;

export const load: PageServerLoad = async (event) => {
	if ((await event.locals.auth())?.user) redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const email = data.get('email');
		if (typeof email !== 'string' || !emailRegex.test(email)) return fail(400);

		const username = data.get('username');
		if (typeof username !== 'string' || !usernameRegex.test(username)) return fail(400);

		const [user] = await sql`INSERT INTO "user" (email, username)
														 VALUES (lower(${email}), lower(${username}))
														 ON CONFLICT DO NOTHING
												     RETURNING passcode`;
		if (!user) return fail(400);

		await sendEmail(email, ChangePassword, {
			passcode: user.passcode
		});

		redirect(302, '/sign-in');
	}
};
