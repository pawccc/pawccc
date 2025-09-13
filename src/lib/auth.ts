import Credentials from '@auth/core/providers/credentials';
import { SvelteKitAuth } from '@auth/sveltekit';
import { sql, password } from 'bun';

export const { handle, signIn, signOut } = SvelteKitAuth({
	trustHost: true,
	providers: [
		Credentials({
			credentials: {
				username: {},
				password: {}
			},
			authorize: async (credentials) => {
				const [user] =
					await sql`SELECT password FROM "user" WHERE username = ${credentials.username}`;
				if (!user) return null;

				if (!(await password.verify(credentials.password, user.password))) return null;

				return {};
			}
		})
	],
	pages: {
		signIn: '/sign-in',
		signOut: '/sign-out'
	},
	logger: {
		error() {},
		warn() {},
		debug() {}
	}
});
