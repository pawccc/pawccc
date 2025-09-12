import { handle as handleAuth } from '$lib/auth';
import { all, default as cur } from '$lib/locales';
import type { ServerInit } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { sql } from 'bun';

export const init: ServerInit = async () => {
	await sql`CREATE SEQUENCE IF NOT EXISTS version`;
	while (true) {
		const [version] = await sql`SELECT last_value FROM version;`;
		if (!(await Bun.file(`src/ddl/${version.last_value}.sql`).exists())) break;
		await sql.file(`src/ddl/${version.last_value}.sql`);
	}
};

export const handle = sequence(async ({ event, resolve }) => {
	const lang =
		(event.request.headers.get('accept-language')?.split(',') ?? [])
			.map((value) => {
				const [l, q] = value.split(';');
				return { l: l.trim(), q: q?.startsWith('q=') ? parseFloat(q.slice(2)) || 0 : 1 };
			})
			.sort((a, b) => b.q - a.q)
			.find((value) => Boolean(all[value.l]))?.l ?? 'en';
	cur.set(all[lang]);

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
}, handleAuth);
