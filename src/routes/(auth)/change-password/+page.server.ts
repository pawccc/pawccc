import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { password, sql } from 'bun';

export const load: PageServerLoad = async (event) => {
	// already authenticated
	if ((await event.locals.auth())?.user) redirect(303, '/');
};

export const actions: Actions = {
	default: async ({ request, url }) => {
		const data = await request.formData();

		const passcode = url.searchParams.get('passcode');
		if (!passcode) return fail(400);

		const _password = data.get('password');
		if (!_password) return fail(400);

		let [user] =
			await sql`UPDATE "user" SET password = ${await password.hash(_password)}, passcode = null WHERE passcode = ${passcode} RETURNING id`;
		if (!user) return fail(400);

		redirect(303, '/sign-in');
	}
};
