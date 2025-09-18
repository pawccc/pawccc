import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ setHeaders, isDataRequest }) => {
	if (isDataRequest) return;

	setHeaders({
		'Cross-Origin-Embedder-Policy': 'require-corp',
		'Cross-Origin-Opener-Policy': 'same-origin',
		'Cross-Origin-Resource-Policy': 'same-origin',
		'Referrer-Policy': 'no-referrer',
		'X-Content-Type-Options': 'nosniff',
		'X-Frame-Options': 'DENY',
		'X-XSS-Protection': '0'
	});
};
