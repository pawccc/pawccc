import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { sql, password } from 'bun';

export const load: PageServerLoad = async (event) => {
	if (await event.locals.auth()) redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ request, url }) => {
		const data = await request.formData();

		const otp = url.searchParams.get('otp');
		const [user_otp] = await sql`DELETE FROM users_otp WHERE password = ${otp} RETURNING "user"`;

		const pwd = data.get('password');
		await sql`UPDATE users SET password = ${await password.hash(pwd)} WHERE id = ${user_otp.user}`;
	}
};
