import { password, sql } from 'bun';

import Credentials from '@auth/core/providers/credentials';
import { SvelteKitAuth } from '@auth/sveltekit';

declare module '@auth/sveltekit' {
	interface Session {
		user: {
			id: number;
		};
	}
}

export const { handle, signIn, signOut } = SvelteKitAuth({
	trustHost: true,
	providers: [
		Credentials({
			credentials: {
				username: {},
				password: {}
			},
			authorize: async (credentials) => {
				const [user] = await sql`SELECT id, password
										             FROM "user"
									               WHERE username = ${credentials.username}`;
				if (
					!user ||
					!user.password ||
					!(await password.verify(credentials.password as string, user.password))
				)
					return null;

				return {
					id: user.id
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
			session.user = {
				id: token.sub
			};
			return session;
		}
	}
});
