import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
	cookies.delete(
		url.protocol == 'https:' ? '__Secure-auth' : 'auth',
		{ path: '/' }
	);
	redirect(303, '/sign-in');
};
