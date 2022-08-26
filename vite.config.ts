import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			external: ['@datocms/cma-client-browser']
		}
	}
};

export default config;
