// Site data for every page: plan/sitemap.json (pages, nav, footer, header), site.config.json (keys, flags)
// and the firm facts (NAP, hours, socials) read from inventory/facts.json through a small map of fact IDs.
// Build-time only: nothing here ships to the browser.
import sitemapJson from '../../plan/sitemap.json';
import configJson from '../../site.config.json';
import factsJson from '../../inventory/facts.json';

export type Lang = 'en' | 'es';

export interface SitemapPage {
  path: string;
  esPath?: string;
  title: string;
  titleEs?: string;
  intent?: string;
  primaryCta?: string;
  primaryCtaEs?: string;
  parent?: string | null;
  nav?: boolean;
  publish?: boolean;
  noindex?: boolean;
  policy_page?: boolean;
  schemaType?: string;
  old?: string[];
}
export interface NavItem {
  label: string;
  labelEs: string;
  path: string;
  esPath: string;
  children?: NavItem[];
}
export interface Fact { id: string; claim: string; type: string; source_url: string; exact_quote: string }

export const sitemap = sitemapJson as unknown as {
  pages: SitemapPage[];
  nav: NavItem[];
  footer: NavItem[];
  header: { phone: { label: string; href: string; microLabel: string; microLabelEs: string } };
};
export const config = configJson as {
  siteUrl: string;
  client: string;
  forms: { provider: string; web3formsAccessKey: string; turnstileSiteKey: string; destinationEmail: string };
  tracking: Record<string, string>;
  consentPolicyVersion: number;
  blog: { enabled: boolean };
};
export const SITE_URL = config.siteUrl.replace(/\/$/, '');

// ------------------------------------------------------------------ paths
/** Normalize to "/a/b/" form (leading + trailing slash; "/" for home). */
export function normPath(p: string): string {
  const s = String(p || '/').replace(/[?#].*$/, '').replace(/index\.html$/, '').replace(/^\/+|\/+$/g, '');
  return s ? `/${s}/` : '/';
}
export const langOf = (p: string): Lang => (normPath(p) === '/es/' || normPath(p).startsWith('/es/') ? 'es' : 'en');
/** Slug of a page (copy file key): the EN path without slashes; "/" is "index". */
export const slugOf = (enPath: string): string => normPath(enPath).replace(/^\/|\/$/g, '') || 'index';

/** The sitemap entry for an EN or ES path. */
export function pageByPath(p: string): SitemapPage | undefined {
  const n = normPath(p);
  return sitemap.pages.find((pg) => normPath(pg.path) === n || (pg.esPath && normPath(pg.esPath) === n));
}

/** EN and ES twins of a path. Pages without a twin fall back to the other language's home. */
export function alternates(p: string): { en: string; es: string } {
  const pg = pageByPath(p);
  if (pg) return { en: normPath(pg.path), es: pg.esPath ? normPath(pg.esPath) : '/es/' };
  return langOf(p) === 'es' ? { en: '/', es: normPath(p) } : { en: normPath(p), es: '/es/' };
}
/** The same page in another language. */
export const alternatePath = (p: string, lang: Lang): string => alternates(p)[lang];
/** Path of a sitemap page or nav item in a language. */
export const pathIn = (item: { path: string; esPath?: string }, lang: Lang): string =>
  lang === 'es' ? normPath(item.esPath || '/es/') : normPath(item.path);
export const labelIn = (item: { label: string; labelEs?: string }, lang: Lang): string =>
  lang === 'es' ? item.labelEs || item.label : item.label;
export const titleIn = (pg: SitemapPage, lang: Lang): string => (lang === 'es' ? pg.titleEs || pg.title : pg.title);
export const absUrl = (p: string): string => (/^https?:/.test(p) ? p : SITE_URL + (p.startsWith('/') ? p : `/${p}`));

// ------------------------------------------------------------------ navigation
export interface NavLink { label: string; href: string; current: boolean; children?: NavLink[] }

/** Primary nav (max 6 items) in a language, with `current` set on the current item and its parent. */
export function nav(lang: Lang, currentPath: string): NavLink[] {
  const cur = normPath(currentPath);
  return sitemap.nav.slice(0, 6).map((item) => {
    const href = pathIn(item, lang);
    const children = item.children?.map((c) => ({ label: labelIn(c, lang), href: pathIn(c, lang), current: pathIn(c, lang) === cur }));
    const current = href === cur || (href !== '/' && href !== '/es/' && cur.startsWith(href)) || !!children?.some((c) => c.current);
    return { label: labelIn(item, lang), href, current, children };
  });
}

/** Breadcrumb trail from the sitemap parents: [{label, href}], last item is the current page. */
export function breadcrumbs(p: string, lang: Lang): { label: string; href: string }[] {
  const trail: { label: string; href: string }[] = [];
  let pg = pageByPath(p);
  const seen = new Set<string>();
  while (pg && !seen.has(pg.path)) {
    seen.add(pg.path);
    trail.unshift({ label: titleIn(pg, lang), href: pathIn(pg, lang) });
    if (!pg.parent) break;
    pg = pageByPath(pg.parent);
  }
  return trail;
}

// ------------------------------------------------------------------ firm facts
const FACTS = new Map<string, Fact>(((Array.isArray(factsJson) ? factsJson : (factsJson as any).facts) as Fact[]).map((f) => [String(f.id), f]));
export const fact = (id: string): Fact | undefined => FACTS.get(id);

const flat = (s: string) => s.normalize('NFKC').replace(/\s+/g, ' ').toLowerCase();
/**
 * A display value backed by a ledgered fact. The build fails if the fact is missing or its exact quote does
 * not contain every `must` fragment, so a value can never drift from its source.
 */
function sourced(id: string, value: string, must: string[] = [value]) {
  const f = FACTS.get(id);
  if (!f) throw new Error(`site.ts: fact ${id} is not in inventory/facts.json`);
  for (const m of must) if (!flat(f.exact_quote).includes(flat(m))) throw new Error(`site.ts: fact ${id} quote does not contain "${m}"`);
  return { value, fact: id };
}

// Fact map (verified firm facts, CLAUDE.md). Hours follow the footer (F031/F032), not the schema (F033):
// see inventory/CONFLICTS.md C07.
export const firm = {
  name: sourced('F001', 'Will Fraley, Attorney at Law'),
  attorney: sourced('F011', 'Will Fraley', ['"name": "Will Fraley"']),
  jobTitle: sourced('F011', 'Attorney at Law', ['"jobTitle": "Attorney at Law"']),
  phone: sourced('F013', '(615) 410-7290'),
  tel: sourced('F015', 'tel:+16154107290'),
  telE164: sourced('F016', '+1-615-410-7290'),
  email: sourced('F019', 'inbox@willfraleylaw.com'),
  mailto: sourced('F020', 'mailto:inbox@willfraleylaw.com'),
  street: sourced('F021', '509 W College St'),
  city: sourced('F021', 'Murfreesboro'),
  region: sourced('F021', 'TN'),
  postalCode: sourced('F021', '37130'),
  addressLine: sourced('F021', '509 W College St, Murfreesboro, TN 37130', ['509 W College St', 'Murfreesboro, TN 37130']),
  mapUrl: sourced('F024', 'https://goo.gl/maps/5UGDFjKCfam'),
  geo: { lat: 35.847942, lng: -86.396674, fact: sourced('F025', '35.847942', ['35.847942', '-86.396674']).fact },
  hours: [
    { days: { en: 'Monday–Thursday', es: 'Lunes a jueves' }, open: '09:00', close: '17:00', dayCodes: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      text: { en: '9:00 a.m. – 5:00 p.m.', es: '9:00 a. m. – 5:00 p. m.' }, fact: sourced('F031', 'Mon–Thu', ['Monday', 'Thursday', '9:00am', '5:00pm']).fact },
    { days: { en: 'Friday', es: 'Viernes' }, open: '09:00', close: '16:00', dayCodes: ['Friday'],
      text: { en: '9:00 a.m. – 4:00 p.m.', es: '9:00 a. m. – 4:00 p. m.' }, fact: sourced('F032', 'Fri', ['Friday', '9:00am', '4:00pm']).fact },
  ],
  // Socials exactly as published in the old site's footer, in the same order.
  socials: [
    { label: 'Facebook', ...sourced('F026', 'https://www.facebook.com/WillFraleyLaw/') },
    { label: 'LinkedIn', ...sourced('F027', 'https://www.linkedin.com/in/will-fraley-b745416/') },
    { label: 'X', ...sourced('F028', 'https://x.com/fraley37') },
    { label: 'AVVO', ...sourced('F029', 'https://www.avvo.com/attorneys/37130-tn-raymond-fraley-1707380.html') },
  ],
} as const;

/** Feature flags derived from site.config.json (empty keys = off). */
export const flags = {
  formsOn: !!config.forms.web3formsAccessKey,
  trackingOn: Object.values(config.tracking).some(Boolean),
  blogOn: !!config.blog.enabled,
};

/** BreadcrumbList JSON-LD node matching the visible trail (for Base `jsonLd`). */
export function breadcrumbJsonLd(p: string, lang: Lang): Record<string, unknown> | null {
  const trail = breadcrumbs(p, lang);
  if (trail.length < 2) return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: absUrl(c.href) })),
  };
}
