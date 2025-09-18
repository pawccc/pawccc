import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const user = (await locals.auth())?.user;
	if (!user) return;

	return {
		username: user.name
	};
};
