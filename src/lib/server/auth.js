import { SvelteKitAuth } from '@auth/sveltekit';
import Keycloak from '@auth/core/providers/keycloak';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/server/database';
import { env } from '$env/dynamic/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: DrizzleAdapter(db),
	providers: [
		Keycloak({
			clientId: env.KEYCLOAK_CLIENT_ID,
			clientSecret: env.KEYCLOAK_CLIENT_SECRET,
			issuer: env.KEYCLOAK_ISSUER,
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.preferred_username,
					email: profile.email
				};
			}
		})
	]
});
