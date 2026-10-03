// Site-wide data for the Verdict mockup. Every value traces to inventory/facts.json or plan/sitemap.json.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './root.mjs';
const sitemap = JSON.parse(fs.readFileSync(path.join(ROOT, 'plan/sitemap.json'), 'utf8'));

export const NAV = sitemap.nav.slice(0, 6).map((n) => ({ label: n.label, labelEs: n.labelEs, path: n.path, esPath: n.esPath, children: n.children || [] }));
export const FOOTER_LINKS = sitemap.footer;
export const PAGES = sitemap.pages;
export const esPathFor = (p) => (PAGES.find((x) => x.path === p) || {}).esPath || '/es/';

export const FIRM = {
  name: 'Will Fraley, Attorney at Law', // F001
  phone: '(615) 410-7290', // F013
  tel: 'tel:+16154107290',
  email: 'inbox@willfraleylaw.com', // F019
  street: '509 W College St', // F021
  city: 'Murfreesboro, TN 37130', // F021
  hours: [
    { days: 'Monday–Thursday', time: '9:00 a.m. – 5:00 p.m.' }, // F031
    { days: 'Friday', time: '9:00 a.m. – 4:00 p.m.' }, // F032
  ],
  spanish: 'Se habla español', // F092
  micro: sitemap.header.phone.microLabel, // "Free consultation · Se habla español" (F090, F092)
  maps: 'https://www.google.com/maps/search/?api=1&query=509+W+College+St+Murfreesboro+TN+37130', // F021, F024
  origin: 'https://willfraleylaw.com',
};
// Same strings with the Spanish phrase marked lang="es" (WCAG 3.1.2), for set:html.
const esSpan = (t) => String(t).replace(/Se habla español/g, '<span lang="es">Se habla español</span>');
FIRM.microHtml = esSpan(FIRM.micro).replace('<span lang="es">', '<span lang="es" class="nowrap">');
FIRM.spanishHtml = esSpan(FIRM.spanish);
