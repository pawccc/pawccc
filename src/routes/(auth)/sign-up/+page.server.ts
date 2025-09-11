import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { sql } from 'bun';

export const load: PageServerLoad = async (event) => {
	if (await event.locals.auth()) redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const email = data.get('email');
		const username = data.get('username');
		const [user] =
			await sql`INSERT INTO users (email, username) VALUES (${email}, ${username}) RETURNING id`;

		const password = getRandomAlphanumericString(8);
		const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
		await sql`INSERT INTO users_otp ("user", password, expires_at) VALUES (${user.id}, ${password}, ${expiresAt})`;
	}
};

function getRandomAlphanumericString(length: number): string {
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	const array = new Uint32Array(length);
	crypto.getRandomValues(array);
	return Array.from(array, (x) => chars[x % chars.length]).join('');
}
