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

		const otp = url.searchParams.get('otp');
		if (!otp) return fail(400);

		const [{ user }] = await sql`DELETE FROM user_otp WHERE password = ${otp} RETURNING "user"`;
		if (!user) return fail(400);

		const pwd = data.get('password');
		if (!pwd) return fail(400);

		await sql`UPDATE "user" SET password = ${await password.hash(pwd)} WHERE id = ${user}`;

		redirect(303, '/sign-in');
	}
};
