// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production site. Mockups under mockups/<X>/ have their own config (`astro build --root mockups/<X>`).
export default defineConfig({
  site: 'https://willfraleylaw.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-US', es: 'es-US' } },
      filter: (page) => !/\/_|\/thank-you\/|\/gracias\/|\/404\//.test(page),
    }),
  ],
});
