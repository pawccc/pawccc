import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import cssnano from 'cssnano';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	html: {
		cspNonce: '%sveltekit.nonce%'
	},
	css: {
		postcss: {
			plugins: [cssnano()]
		}
	}
});
