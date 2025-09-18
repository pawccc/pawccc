import { password, sql } from 'bun';

import Credentials from '@auth/core/providers/credentials';
import { SvelteKitAuth } from '@auth/sveltekit';

export const { handle, signIn, signOut } = SvelteKitAuth({
	trustHost: true,
	providers: [
		Credentials({
			credentials: {
				username: {},
				password: {}
			},
			authorize: async (credentials) => {
				const [user] = await sql`SELECT id, username, password
										             FROM "user"
									               WHERE username = lower(${credentials.username})`;
				if (
					!user ||
					!user.password ||
					!(await password.verify(credentials.password as string, user.password))
				)
					return null;

				return {
					id: user.id,
					name: user.username
				};
			}
		})
	],
	pages: {
		signIn: '/sign-in',
		signOut: '/sign-out'
	},
	callbacks: {
		session: async ({ session, token }) => {
			if (token) {
				session.user = {
					id: token.uid,
					name: token.sub
				};
			}
			return session;
		},
		jwt: async ({ token, user }) => {
			if (user) {
				token.uid = user.id;
				token.sub = user.name;
			}
			return token;
		}
	}
});
