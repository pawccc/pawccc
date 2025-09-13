import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session?.user) redirect(303, '/sign-in');

	return {
		messages: [
			{
				name: 'Valaphee',
				date: '11:30',
				text: 'Hello world'
			}
		]
	};
};

export const actions: Actions = {
	default: async () => {}
};
