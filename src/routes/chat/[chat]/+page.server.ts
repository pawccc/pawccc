import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { sql } from 'bun';

export const load: PageServerLoad = async ({ locals, params }) => {
	// Unauthenticated
	const user = (await locals.auth())?.user ?? redirect(303, '/sign-in');

	// Unauthorized
	const [participant] =
		await sql`SELECT 1 FROM chat_participant WHERE chat = ${params.chat} AND "user" = ${user.id}`;
	if (!participant) error(403, 'Forbidden');

	const messages =
		await sql`SELECT id, "user", date, text FROM chat_message WHERE chat = ${params.chat}`;

	return {
		messages
	};
};

export const actions: Actions = {
	default: async ({ locals, params, request }) => {
		// Unauthenticated
		const user = (await locals.auth())?.user ?? redirect(303, '/sign-in');

		// Unauthorized
		const [participant] =
			await sql`SELECT 1 FROM chat_participant WHERE chat = ${params.chat} AND "user" = ${user.id}`;
		if (!participant) error(403, 'Forbidden');

		const data = await request.formData();
		await sql`INSERT INTO chat_message (chat, "user", text) VALUES (${params.chat}, ${user.id}, ${data.get('text')})`;
	}
};
