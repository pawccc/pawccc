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

		const [user] = await sql`SELECT id FROM "user" WHERE username = ${username}`;
		if (!user) return fail(400);

		const password = getRandomAlphanumericString(8);
		const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
		await sql`INSERT INTO user_otp ("user", password, expires_at) VALUES (${user.id}, ${password}, ${expiresAt})`;

		redirect(303, '/sign-in');
	}
};

function getRandomAlphanumericString(length: number): string {
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const array = new Uint32Array(length);
	crypto.getRandomValues(array);
	return Array.from(array, (x) => chars[x % chars.length]).join('');
}
