import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { sql } from 'bun';

export const load: PageServerLoad = async (event) => {
	// already authenticated
	if ((await event.locals.auth())?.user) redirect(303, '/');
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const username = data.get('username');
		if (!username) return fail(400);

		await sql`UPDATE "user" SET passcode = DEFAULT, passcode_date = DEFAULT WHERE username = ${username}`;

		redirect(303, '/sign-in');
	}
};
