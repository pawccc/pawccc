import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
	cookies.delete(
		url.protocol == 'https:' ? '__Secure-authjs.session-token' : 'authjs.session-token',
		{ path: '/' }
	);
	redirect(303, '/sign-in');
};
