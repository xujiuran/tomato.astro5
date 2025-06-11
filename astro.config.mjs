import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: 'https://xujiuran.github.io/',
  base: 'tomato.astro5/',
  integrations: [preact()],
  i18n: {
    locales: ["es", "en", "pt-br"],
    defaultLocale: "en",
  },
  // legacy: {
  //   collections: true
  // }
});