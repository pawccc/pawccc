import { signIn } from '$lib/auth';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	if (await event.locals.auth()) redirect(302, '/');
};

export const actions: Actions = {
	default: async (event) => {
		return await signIn(event).catch((error) => {
			if (error instanceof Error) {
				return fail(400);
			} else {
				return redirect(302, '/');
			}
		});
	}
};
