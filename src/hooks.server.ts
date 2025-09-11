import { handle as handleAuth } from '$lib/auth';
import { all, default as cur } from '$lib/locales';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(async ({ event, resolve }) => {
	let lang = 'en';
	for (const prefLangWithPriority in event.request.headers.get('accept-language')?.split(',')) {
		const prefLang = prefLangWithPriority.split(';', 2)[0];
		if (all[prefLang]) {
			lang = prefLang;
			cur.set(all[prefLang]);
			break;
		}
	}
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
}, handleAuth);
