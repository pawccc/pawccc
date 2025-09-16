import { signIn } from '$lib/auth.server';
import type { Actions, PageServerLoad } from './$types';
import { CredentialsSignin } from '@auth/core/errors';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	// already authenticated
	if ((await event.locals.auth())?.user) redirect(303, '/');
};

export const actions: Actions = {
	default: async (event) => {
		return await signIn(event).catch((error) => {
			if (error instanceof CredentialsSignin) return fail(400);
			throw error;
		});
	}
};
