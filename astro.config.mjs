import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: 'https://xujiuran.github.io/',
  base: 'tomato.astro5/',
  integrations: [preact()]
});