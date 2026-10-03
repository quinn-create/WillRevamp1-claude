// @ts-check
import fs from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://willfraleylaw.com';
// hreflang alternates for the XML sitemap (A23 P700). The ES slugs are translated (/criminal-defense/dui/ ↔
// /es/defensa-penal/dui/), so the integration's built-in i18n pairing (same path under /es/) cannot find the
// twins; plan/sitemap.json is the source of truth, as it is for the <link rel="alternate"> tags in Base.astro.
const plan = JSON.parse(fs.readFileSync(new URL('./plan/sitemap.json', import.meta.url), 'utf8'));
const twins = new Map();
for (const pg of plan.pages) {
  if (!pg.esPath) continue;
  const pair = { en: SITE + pg.path, es: SITE + pg.esPath };
  twins.set(pair.en, pair);
  twins.set(pair.es, pair);
}

// Production site. Mockups under mockups/<X>/ have their own config (`astro build --root mockups/<X>`).
export default defineConfig({
  site: SITE,
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
      serialize(item) {
        const pair = twins.get(item.url);
        if (pair) {
          item.links = [
            { lang: 'en', url: pair.en },
            { lang: 'es', url: pair.es },
            { lang: 'x-default', url: pair.en },
          ];
        }
        return item;
      },
    }),
  ],
});
