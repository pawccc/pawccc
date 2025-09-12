import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
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
