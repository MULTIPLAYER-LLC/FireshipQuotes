import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-node';

export default {
  kit: {
    adapter: adapter()
  },
  typescript: {
      strict: true
  },
	preprocess: vitePreprocess()
};
