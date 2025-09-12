import { signIn } from '$lib/auth';
import type { Actions, PageServerLoad } from './$types';
import { CredentialsSignin } from '@auth/core/errors';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	if (await event.locals.auth()) redirect(302, '/');
};

export const actions: Actions = {
	default: async (event) => {
		try {
			await signIn(event);
		} catch (error) {
			if (error instanceof CredentialsSignin) {
				return fail(400);
			}
		}
		return redirect(302, '/');
	}
};
