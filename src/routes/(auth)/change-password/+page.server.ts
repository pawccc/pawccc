import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { password, sql } from 'bun';

export const load: PageServerLoad = async (event) => {
	if (await event.locals.auth()) redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ request, url }) => {
		const data = await request.formData();

		const otp = url.searchParams.get('otp');
		if (!otp) return fail(400);

		const [user_otp] = await sql`DELETE FROM user_otp WHERE password = ${otp} RETURNING "user"`;
		if (!user_otp) return fail(400);

		const pwd = data.get('password');
		if (!pwd) return fail(400);

		await sql`UPDATE "user" SET password = ${await password.hash(pwd)} WHERE id = ${user_otp.user}`;

		redirect(302, '/sign-in');
	}
};
