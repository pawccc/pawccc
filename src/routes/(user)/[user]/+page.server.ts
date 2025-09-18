import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const user = (await locals.auth())?.user;
	if (!user) redirect(302, `/sign-in?redirectTo=${encodeURIComponent(url.pathname + url.search)}`);
};
