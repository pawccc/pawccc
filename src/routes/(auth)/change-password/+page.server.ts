import { password, sql } from 'bun';

import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

import { PUBLIC_AUTH_PASSCODE_EXPIRY } from '$env/static/public';

export const load: PageServerLoad = async (event) => {
	// already authenticated
	if ((await event.locals.auth())?.user) redirect(303, '/');
};

export const actions: Actions = {
	default: async ({ request, url }) => {
		const data = await request.formData();

		const _password = data.get('password');
		if (typeof _password !== 'string') return fail(400);

		const passcode = url.searchParams.get('passcode');
		if (!passcode) return fail(400);

		const [user] = await sql`UPDATE "user"
								             SET password = ${await password.hash(_password)},
										             passcode = null
								             WHERE passcode = ${passcode}
								               AND passcode_date + INTERVAL ${PUBLIC_AUTH_PASSCODE_EXPIRY} > now()
								             RETURNING id`;
		if (!user) return fail(400);

		redirect(303, '/sign-in');
	}
};
