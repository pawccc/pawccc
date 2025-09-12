import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete('authjs.session-token', { path: '/' });
	redirect(302, '/sign-in');
};
