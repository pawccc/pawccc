import { handle as handleAuth } from '$lib/auth';
import { all, default as cur } from '$lib/locales';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(async ({ event, resolve }) => {
	const lang =
		(event.request.headers.get('accept-language')?.split(',') ?? [])
			.map((e) => {
				const [l, q] = e.split(';');
				return { l: l.trim(), q: q?.startsWith('q=') ? parseFloat(q.slice(2)) || 0 : 1 };
			})
			.sort((a, b) => b.q - a.q)
			.find((e) => Boolean(all[e.l]))?.l ?? 'en';
	cur.set(all[lang]);

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
}, handleAuth);
