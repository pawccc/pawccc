import { signIn } from '$lib/auth';
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	if (await event.locals.auth()) redirect(302, '/');
};

export const actions: Actions = { default: signIn };
