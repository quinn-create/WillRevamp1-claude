// A20 P400 page helpers (build-time only). Routes from plan/sitemap.json, the page template for each path,
// the hero scene for each path (images/GENERATED.json via astro:assets), vendor-directive filtering from
// site.config.json, and the JSON-LD graph per schema_type. Nothing here ships to the browser.
// Files under src/pages/_lib/ are never routed (underscore prefix).
import type { ImageMetadata } from 'astro';
import { sitemap, config, flags, firm, normPath, absUrl, breadcrumbJsonLd, titleIn, type Lang, type SitemapPage } from '../../lib/site';
import { plain, splitH3, type Block, type PageCopy, type Section } from '../../lib/copy';
import generated from '../../../images/GENERATED.json';

// ------------------------------------------------------------------ routes
/** Paths with their own page file (not built by the catch-all routes). */
const DEDICATED = new Set(['/404/', '/thank-you/']);

/** Every sitemap page the catch-all routes build: publish !== false, no dedicated route; the blog only when enabled. */
export function routedPages(): SitemapPage[] {
  return sitemap.pages.filter((pg) => {
    const p = normPath(pg.path);
    if (DEDICATED.has(p)) return false;
    if (p === '/blog/') return flags.blogOn;
    return pg.publish !== false;
  });
}
/** "/criminal-defense/dui/" → "criminal-defense/dui"; "/" → undefined (Astro rest param for the index). */
export const restParam = (p: string, prefix = ''): string | undefined => {
  const s = normPath(p).slice(prefix.length).replace(/^\/+|\/+$/g, '');
  return s || undefined;
};

// ------------------------------------------------------------------ templates (DESIGN-SYSTEM section 10)
export type Template = 'home' | 'hub' | 'practice' | 'about' | 'testimonials' | 'faqs' | 'news' | 'contact' | 'policy' | 'blog';
const BY_PATH: Record<string, Template> = {
  '/': 'home',
  '/legal-services/': 'hub',
  '/criminal-defense/': 'hub',
  '/family-law/': 'hub',
  '/about/': 'about',
  '/testimonials/': 'testimonials',
  '/faqs/': 'faqs',
  '/in-the-news/': 'news',
  '/contact-us/': 'contact',
  '/privacy-policy/': 'policy',
  '/accessibility/': 'policy',
  '/cookie-settings/': 'policy',
  '/blog/': 'blog',
};
export function templateOf(pg: SitemapPage, copy: PageCopy): Template {
  const p = normPath(pg.path);
  if (BY_PATH[p]) return BY_PATH[p];
  if (copy.data.policy_page || pg.policy_page) return 'policy';
  return 'practice';
}

/** Children of a page in the sitemap (hub → its practice pages), in sitemap order. */
export const childrenOf = (pg: SitemapPage): SitemapPage[] => sitemap.pages.filter((c) => c.parent && normPath(c.parent) === normPath(pg.path) && c.publish !== false);

// ------------------------------------------------------------------ hero scenes (images/GENERATED.json)
// Set = the chosen direction ("A") for Home, the criminal-defense hub and Contact; set "site" for the others
// (images/SLOTS-SITE.md). About, Testimonials, FAQs and In the News carry no generated scene (DESIGN-SYSTEM 9.2:
// one image-led moment at most; About uses Will's real photos). ES twins reuse the EN page's slot.
const SCENE: Record<string, { set: string; slot: string }> = {
  '/': { set: 'A', slot: 'hero' },
  '/criminal-defense/': { set: 'A', slot: 'practice' },
  '/contact-us/': { set: 'A', slot: 'contact' },
  '/legal-services/': { set: 'site', slot: 'services' },
  '/family-law/': { set: 'site', slot: 'family' },
  '/personal-injury/': { set: 'site', slot: 'injury' },
  '/adoption/': { set: 'site', slot: 'adoption' },
  '/dcs-case-attorney/': { set: 'site', slot: 'dcs' },
  '/criminal-defense/dui/': { set: 'site', slot: 'cd-dui' },
  '/criminal-defense/drug-crimes/': { set: 'site', slot: 'cd-drug-crimes' },
  '/criminal-defense/theft/': { set: 'site', slot: 'cd-theft' },
  '/criminal-defense/violent-crimes/': { set: 'site', slot: 'cd-violent-crimes' },
  '/criminal-defense/sex-crimes/': { set: 'site', slot: 'cd-sex-crimes' },
  '/criminal-defense/fraud/': { set: 'site', slot: 'cd-fraud' },
  '/criminal-defense/probation-violation/': { set: 'site', slot: 'cd-probation' },
  '/criminal-defense/domestic-assault/': { set: 'site', slot: 'cd-domestic-assault' },
  '/family-law/divorce/': { set: 'site', slot: 'fl-divorce' },
  '/family-law/child-custody/': { set: 'site', slot: 'fl-custody' },
  '/family-law/visitation/': { set: 'site', slot: 'fl-visitation' },
  '/family-law/parenting-plan-modifications/': { set: 'site', slot: 'fl-parenting-plan' },
  '/family-law/paternity/': { set: 'site', slot: 'fl-paternity' },
};
type GenEntry = { set: string; slot: string; master: string };
const GEN = (generated as unknown as { images: GenEntry[] }).images;

// Only the masters a page uses are imported (an import alone makes Astro emit the original file into dist/).
import aHero from '../../../images/generated/A/hero.png';
import aPractice from '../../../images/generated/A/practice.png';
import aContact from '../../../images/generated/A/contact.png';
import sServices from '../../../images/generated/site/services.png';
import sFamily from '../../../images/generated/site/family.png';
import sInjury from '../../../images/generated/site/injury.png';
import sAdoption from '../../../images/generated/site/adoption.png';
import sDcs from '../../../images/generated/site/dcs.png';
import sCdDui from '../../../images/generated/site/cd-dui.png';
import sCdDrug from '../../../images/generated/site/cd-drug-crimes.png';
import sCdTheft from '../../../images/generated/site/cd-theft.png';
import sCdViolent from '../../../images/generated/site/cd-violent-crimes.png';
import sCdSex from '../../../images/generated/site/cd-sex-crimes.png';
import sCdFraud from '../../../images/generated/site/cd-fraud.png';
import sCdProbation from '../../../images/generated/site/cd-probation.png';
import sCdDomestic from '../../../images/generated/site/cd-domestic-assault.png';
import sFlDivorce from '../../../images/generated/site/fl-divorce.png';
import sFlCustody from '../../../images/generated/site/fl-custody.png';
import sFlVisitation from '../../../images/generated/site/fl-visitation.png';
import sFlParenting from '../../../images/generated/site/fl-parenting-plan.png';
import sFlPaternity from '../../../images/generated/site/fl-paternity.png';
const MASTERS: Record<string, ImageMetadata> = {
  'A/hero': aHero, 'A/practice': aPractice, 'A/contact': aContact,
  'site/services': sServices, 'site/family': sFamily, 'site/injury': sInjury, 'site/adoption': sAdoption, 'site/dcs': sDcs,
  'site/cd-dui': sCdDui, 'site/cd-drug-crimes': sCdDrug, 'site/cd-theft': sCdTheft, 'site/cd-violent-crimes': sCdViolent,
  'site/cd-sex-crimes': sCdSex, 'site/cd-fraud': sCdFraud, 'site/cd-probation': sCdProbation, 'site/cd-domestic-assault': sCdDomestic,
  'site/fl-divorce': sFlDivorce, 'site/fl-custody': sFlCustody, 'site/fl-visitation': sFlVisitation,
  'site/fl-parenting-plan': sFlParenting, 'site/fl-paternity': sFlPaternity,
};

/**
 * A plain copy of imported image metadata that keeps its source path. astro:assets marks an original as
 * "referenced" (and then ships the full-size original in dist/) whenever any property of the imported object is
 * read, e.g. `width` for the never-upscale cap. The copy is read instead, so only the AVIF/WebP derivatives ship.
 */
export function derivativesOnly(img: ImageMetadata): ImageMetadata {
  const any = img as any;
  if (!any || typeof any.clone !== 'object') return img; // dev server / non-proxied metadata
  const copy = any.clone as ImageMetadata;
  Object.defineProperty(copy, 'fsPath', { value: any.fsPath, enumerable: false });
  return copy;
}

/** The generated scene for an EN path (or null), listed in GENERATED.json, imported through astro:assets. */
export function sceneFor(enPath: string): ImageMetadata | null {
  const s = SCENE[normPath(enPath)];
  if (!s) return null;
  const e = GEN.find((g) => g.set === s.set && g.slot === s.slot);
  const img = e && MASTERS[`${s.set}/${s.slot}`];
  if (!e || !img) throw new Error(`pages.ts: scene ${s.set}/${s.slot} is not logged in images/GENERATED.json or not imported`);
  return derivativesOnly(img);
}

// ------------------------------------------------------------------ vendor directives (site.config.json)
const T = config.tracking;
const VENDOR_ON: Record<string, boolean> = {
  web3forms: !!config.forms.web3formsAccessKey,
  turnstile: !!config.forms.turnstileSiteKey,
  ga4: !!T.ga4,
  clarity: !!T.clarity,
  meta: !!T.metaPixel,
  tiktok: !!T.tiktokPixel,
  analytics: !!(T.ga4 || T.clarity),
  marketing: !!(T.metaPixel || T.tiktokPixel),
  tracking: Object.values(T).some(Boolean),
};
const vendorOn = (name: string) => !!VENDOR_ON[name.trim().toLowerCase()];

/**
 * Keep `[vendor: x]` blocks only when x is configured and `[vendor-off: x]` blocks only when it is not
 * (site.config.json; launch state = every key empty). A directive governs the blocks after it up to the next
 * directive or sub-heading (the copy writes multi-paragraph vendor passages that way). A sub-heading left with
 * nothing under it is dropped.
 */
export function filterVendors(blocks: Block[]): Block[] {
  let gate: boolean | null = null;
  const kept: (Block | null)[] = blocks.map((b) => {
    if (b.type === 'directive') {
      if (b.name === 'vendor') { gate = vendorOn(b.args); return gate ? b : null; }
      if (b.name === 'vendor-off') { gate = !vendorOn(b.args); return gate ? b : null; }
      gate = null;
      return b;
    }
    if (b.type === 'h3' || b.type === 'h4') { gate = null; return b; }
    return gate === false ? null : b;
  });
  const dropped = new Set<number>(kept.map((b, i) => (b === null ? i : -1)).filter((i) => i >= 0));
  const out: Block[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = kept[i];
    if (!b) continue;
    if (b.type === 'h3' || b.type === 'h4') {
      // Everything under this heading (to the next heading) was dropped → drop the heading too.
      let j = i + 1;
      let any = false, lost = false;
      while (j < blocks.length && blocks[j].type !== 'h3' && blocks[j].type !== 'h4') {
        if (kept[j]) any = true; else if (dropped.has(j)) lost = true;
        j++;
      }
      if (!any && lost) continue;
    }
    out.push(b);
  }
  return out;
}
export const filterSection = (s: Section): Section => ({ ...s, blocks: filterVendors(s.blocks) });

// ------------------------------------------------------------------ plain text of blocks (JSON-LD)
export function blocksText(blocks: Block[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case 'p': case 'link': case 'quote': case 'h3': case 'h4': return plain(b.md);
        case 'ul': case 'ol': return b.items.map(plain).join('; ');
        case 'directive': return blocksText(b.blocks);
      }
    })
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ------------------------------------------------------------------ JSON-LD (per schema_type)
export const FIRM_ID = `${absUrl('/')}#firm`;
export const PERSON_ID = `${absUrl('/')}#will-fraley`;

// areaServed exactly as ledgered (F035): "Murfreesboro and the surrounding counties of Rutherford, Coffee, and Wilson".
const AREA_SERVED = [
  { '@type': 'City', name: 'Murfreesboro' },
  { '@type': 'AdministrativeArea', name: 'Rutherford County' },
  { '@type': 'AdministrativeArea', name: 'Coffee County' },
  { '@type': 'AdministrativeArea', name: 'Wilson County' },
];
const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: firm.street.value,
  addressLocality: firm.city.value,
  addressRegion: firm.region.value,
  postalCode: firm.postalCode.value,
  addressCountry: 'US',
};
const SAME_AS = firm.socials.map((s) => s.value);

/** LegalService for the firm + Person for Will Fraley (F011: founder, "Attorney at Law"). No ratings or reviews. */
export function firmNodes(): Record<string, unknown>[] {
  return [
    {
      '@type': 'LegalService',
      '@id': FIRM_ID,
      inLanguage: undefined,
      name: firm.name.value,
      url: absUrl('/'),
      telephone: firm.telE164.value,
      email: firm.email.value,
      image: absUrl('/og/default.jpg'),
      address: ADDRESS,
      geo: { '@type': 'GeoCoordinates', latitude: firm.geo.lat, longitude: firm.geo.lng },
      hasMap: firm.mapUrl.value,
      openingHoursSpecification: firm.hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.dayCodes, opens: h.open, closes: h.close })),
      areaServed: AREA_SERVED,
      knowsLanguage: ['en-US', 'es-US'],
      sameAs: SAME_AS,
      founder: { '@id': PERSON_ID },
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      inLanguage: undefined,
      name: firm.attorney.value,
      jobTitle: firm.jobTitle.value,
      telephone: firm.telE164.value,
      address: ADDRESS,
      worksFor: { '@id': FIRM_ID },
      sameAs: SAME_AS,
    },
  ];
}

interface LdInput { pg: SitemapPage; copy: PageCopy; lang: Lang; path: string; template: Template }
/** Page-node type for Base (`pageType`) and the extra nodes for the page @graph. */
export function pageJsonLd({ pg, copy, lang, path, template }: LdInput): { pageType: string; nodes: Record<string, unknown>[] } {
  const schema = String(copy.data.schema_type || pg.schemaType || 'WebPage');
  const canonical = absUrl(path);
  const nodes: Record<string, unknown>[] = [];
  const PAGE_TYPES = new Set(['AboutPage', 'ContactPage', 'CollectionPage', 'WebPage']);
  const pageType = template === 'blog' ? 'CollectionPage' : PAGE_TYPES.has(schema) ? schema : 'WebPage';

  if (template !== 'policy') nodes.push(...firmNodes());
  // Practice pages and the practice hubs (schema_type LegalService / Service): one Service offered by the firm.
  if ((template === 'practice' || template === 'hub') && /LegalService|Service/.test(schema) && path !== '/' && path !== '/es/') {
    nodes.push({
      '@type': 'Service',
      '@id': `${canonical}#service`,
      inLanguage: undefined,
      name: titleIn(pg, lang),
      serviceType: pg.title,
      url: canonical,
      provider: { '@id': FIRM_ID },
      areaServed: AREA_SERVED,
    });
  }
  // FAQPage wherever the page has an FAQ section.
  const faqs = copy.sections.filter((s) => s.hint === 'faq').flatMap((s) => splitH3(s.blocks).items);
  if (faqs.length) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      isPartOf: { '@id': `${canonical}#webpage` },
      mainEntity: faqs.map((q) => ({ '@type': 'Question', name: plain(q.title), acceptedAnswer: { '@type': 'Answer', text: blocksText(q.blocks) } })),
    });
  }
  const crumbs = breadcrumbJsonLd(path, lang);
  if (crumbs) nodes.push({ ...crumbs, '@id': `${canonical}#breadcrumb`, inLanguage: undefined });
  return { pageType, nodes };
}

// ------------------------------------------------------------------ dates
// A22: the policy pages (Privacy, Accessibility, Cookie Settings) are regenerated from site.config.json on every
// build (vendor sections follow the configured keys), so their "Last reviewed" date is the build date in the
// firm's time zone. POLICY_REVIEWED=YYYY-MM-DD pins it (e.g. to rebuild without re-review).
const buildDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
export const LAST_REVIEWED: string = /^\d{4}-\d{2}-\d{2}$/.test(process.env.POLICY_REVIEWED || '') ? process.env.POLICY_REVIEWED! : buildDate;
export function formatDate(iso: string, lang: Lang): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-US' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(d);
}
const MONTHS: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
  enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6, julio: 7, agosto: 8, septiembre: 9, setiembre: 9, octubre: 10, noviembre: 11, diciembre: 12,
};
/** Find "October 5, 2014" / "5 de octubre de 2014" in a line → { iso, text } (for a <time> element). */
export function findDate(s: string): { iso: string; text: string } | null {
  const pad = (n: number) => String(n).padStart(2, '0');
  let m = s.match(/\b([A-Z][a-z]+) (\d{1,2}), (\d{4})\b/);
  if (m && MONTHS[m[1].toLowerCase()]) return { iso: `${m[3]}-${pad(MONTHS[m[1].toLowerCase()])}-${pad(+m[2])}`, text: m[0] };
  m = s.match(/\b(\d{1,2}) de ([a-záéíóú]+) de (\d{4})\b/i);
  if (m && MONTHS[m[2].toLowerCase()]) return { iso: `${m[3]}-${pad(MONTHS[m[2].toLowerCase()])}-${pad(+m[1])}`, text: m[0] };
  return null;
}
