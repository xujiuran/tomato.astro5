import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  base: 'tomato.astro',
  integrations: [preact()]
});