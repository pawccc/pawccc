import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// unauthenticated
	if (!(await locals.auth())?.user) redirect(303, '/sign-in');
};
