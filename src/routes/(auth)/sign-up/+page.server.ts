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

		const email = data.get('email');
		if (!email) return fail(400);

		const username = data.get('username');
		if (!username) return fail(400);

		const [user] =
			await sql`INSERT INTO "user" (email, username) VALUES (${email}, ${username}) ON CONFLICT DO NOTHING RETURNING id`;
		if (!user) return fail(400);

		redirect(303, '/sign-in');
	}
};
