// Site-wide data for the mockup: nav from plan/sitemap.json, NAP and hours from the contact copy
// (which cites the ledger: F013 phone, F019 email, F021 address, F031/F032 hours), and inline Lucide icons.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { REPO } from './copy.mjs';

const sitemap = JSON.parse(fs.readFileSync(path.join(REPO, 'plan/sitemap.json'), 'utf8'));

// Header nav: the sitemap's top-level "nav" items, at most six.
export const nav = (sitemap.nav || []).slice(0, 6).map((n) => ({
  label: n.label, path: n.path, esPath: n.esPath,
  children: (n.children || []).map((c) => ({ label: c.label, path: c.path })),
}));

export function esPathFor(p) {
  const pg = sitemap.pages.find((x) => x.path === p);
  return pg?.esPath || '/es/';
}

// Firm facts used in chrome (header, footer, call bar). Each value is quoted in inventory/facts.json.
export const firm = {
  name: 'Will Fraley, Attorney at Law',            // F001
  phone: '(615) 410-7290',                         // F013
  tel: 'tel:+16154107290',                         // F015
  email: 'inbox@willfraleylaw.com',                // F019
  street: '509 W College St',                      // F021
  cityLine: 'Murfreesboro, TN 37130',              // F021
  hours: [
    { days: 'Monday–Thursday', time: '9:00 a.m. – 5:00 p.m.' }, // F031
    { days: 'Friday', time: '9:00 a.m. – 4:00 p.m.' },          // F032
  ],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=509+W+College+St+Murfreesboro+TN+37130', // F024
  site: 'https://willfraleylaw.com',
};

// Lucide icons, inline, stroke 1.75. Resolved from the shared root node_modules.
const require = createRequire(import.meta.url);
const lucideDir = path.join(path.dirname(require.resolve('lucide-static/package.json')), 'icons');
const iconCache = new Map();
export function icon(name, { size = 20, cls = '' } = {}) {
  const key = `${name}|${size}|${cls}`;
  if (iconCache.has(key)) return iconCache.get(key);
  let svg = fs.readFileSync(path.join(lucideDir, `${name}.svg`), 'utf8');
  svg = svg.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').trim()
    .replace(/class="[^"]*"/, '')
    .replace(/width="\d+"/, `width="${size}"`).replace(/height="\d+"/, `height="${size}"`)
    .replace(/stroke-width="[\d.]+"/, 'stroke-width="1.75"')
    .replace('<svg', `<svg class="icon ${cls}" aria-hidden="true" focusable="false"`);
  iconCache.set(key, svg);
  return svg;
}
