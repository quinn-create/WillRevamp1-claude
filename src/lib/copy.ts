// Copy loader: copy/pages/<slug>.md (EN) and copy/pages/es/<slug>.md (ES), keyed by the EN slug.
// - parses YAML frontmatter with the `yaml` package
// - strips every {fact:…} tag (they are never shown)
// - splits the body into sections by component hints ([hero], [cards: 3], [faq] …)
// - renders a minimal markdown subset to HTML: headings, paragraphs, lists, bold/italic, code, links, blockquotes
// Nothing is dropped or rewritten: every block of the copy is returned.
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import type { Lang } from './site';

// ------------------------------------------------------------------ repo root
function findRoot(): string {
  const starts = [process.cwd()];
  try { starts.push(path.dirname(new URL(import.meta.url).pathname)); } catch { /* bundled */ }
  for (const start of starts) {
    let dir = start;
    for (let i = 0; i < 12; i++) {
      if (fs.existsSync(path.join(dir, 'copy', 'pages')) && fs.existsSync(path.join(dir, 'plan', 'sitemap.json'))) return dir;
      const up = path.dirname(dir);
      if (up === dir) break;
      dir = up;
    }
  }
  throw new Error('copy.ts: could not find the repo root (copy/pages + plan/sitemap.json)');
}
export const ROOT = findRoot();

// ------------------------------------------------------------------ types
/** Section-level hints: each starts a new section. */
export const SECTION_HINTS = ['hero', 'proof-strip', 'cards', 'faq', 'cta-band', 'testimonial', 'steps', 'stats'] as const;
/** Block-level directives: they stay inside the current section and wrap the block that follows. */
export const BLOCK_HINTS = ['vendor', 'vendor-off', 'consent-controls', 'results-disclaimer'] as const;
const HINT_LINE = /^\s*\[([a-z][a-z-]*)(?::\s*([^\]]*))?\]\s*$/;
/** Hinted sections whose first H2 belongs to the hinted component. */
const TAKES_H2 = new Set(['cards', 'faq', 'cta-band', 'testimonial', 'steps', 'stats']);

export type Block =
  | { type: 'p'; md: string }
  | { type: 'link'; md: string; text: string; href: string } // a paragraph that is only one link
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'quote'; md: string }
  | { type: 'h3' | 'h4'; md: string }
  | { type: 'directive'; name: string; args: string; blocks: Block[] };

export interface Section {
  hint: string; // 'prose' when the copy gives no hint
  args: string; // "3" for [cards: 3], "ga4" for [vendor: ga4], '' otherwise
  h2: string | null;
  markdown: string; // the section body (fact tags stripped), without the hint line and H2
  blocks: Block[];
  index: number;
}
export interface PageCopy {
  slug: string;
  lang: Lang;
  file: string;
  data: Record<string, any> & { title: string; description: string; h1: string; primary_cta?: string; schema_type?: string; policy_page?: boolean };
  sections: Section[];
}

// ------------------------------------------------------------------ inline markdown
export const stripFacts = (s: string): string => String(s ?? '').replace(/[ \t]*\{fact:[^}]*\}/g, '');
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Straight quotes to typographic ones; keeps hours ranges and "TN 37130" together. Text only. */
export function smart(s: string): string {
  return s
    .replace(/([ap]\.(?:\s?)m\.) – (\d)/g, '$1 – $2')
    .replace(/\bTN (\d{5})/g, 'TN $1')
    .replace(/(^|[\s(\[—–-])"/g, '$1“')
    .replace(/"/g, '”')
    .replace(/(^|[\s(\[—–-])'/g, '$1‘')
    .replace(/'/g, '’');
}

export interface InlineOpts { lang?: Lang }

/** One line of markdown to HTML: `code`, **bold**, *italic* / _italic_, [text](href). */
export function inline(md: string, opts: InlineOpts = {}): string {
  const lang = opts.lang || 'en';
  const codes: string[] = [];
  let s = stripFacts(md).replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(c) - 1}\u0000`);
  const links: string[] = [];
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => `\u0001${links.push(JSON.stringify([text, href])) - 1}\u0001`);
  s = esc(smart(s));
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^\w*])\*([^*\s][^*]*?)\*(?!\w)/g, '$1<em>$2</em>');
  s = s.replace(/(^|[^\w])_([^_\s][^_]*?)_(?!\w)/g, '$1<em>$2</em>');
  // Keep an hours range ("9:00 a.m. – 5:00 p.m.") on one line.
  s = s.replace(/\d{1,2}:\d{2}[  ]?[ap]\.\s?m\. – \d{1,2}:\d{2}[  ]?[ap]\.\s?m\./g, (m) => `<span class="nowrap">${m}</span>`);
  s = s.replace(/\u0001(\d+)\u0001/g, (_, i) => {
    const [text, href] = JSON.parse(links[Number(i)]) as [string, string];
    return linkHtml(text, href, lang);
  });
  s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[Number(i)])}</code>`);
  if (lang === 'en') s = markSpanish(s);
  return s;
}

/** An <a> for copy links: tel links bold + nowrap, cross-language links get hreflang + lang. */
export function linkHtml(text: string, href: string, lang: Lang = 'en'): string {
  const attrs = [`href="${esc(href)}"`];
  if (href.startsWith('tel:')) attrs.push('class="tel"');
  const toEs = href === '/es/' || href.startsWith('/es/');
  if (lang === 'en' && (toEs || /^(español|leer en español|ver en español)$/i.test(text.trim()))) attrs.push('hreflang="es"', 'lang="es"');
  if (lang === 'es' && !toEs && href.startsWith('/') && /^english$/i.test(text.trim())) attrs.push('hreflang="en"', 'lang="en"');
  if (/^https?:/.test(href)) attrs.push('rel="noopener"');
  const inner = esc(smart(stripFacts(text))).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return `<a ${attrs.join(' ')}>${inner}</a>`;
}

/** On English pages, mark Spanish phrases for assistive tech (text outside tags only). */
function markSpanish(html: string): string {
  // A phrase directly inside a tag (">Se habla…") is left alone: that element already sets its language.
  return html
    .replace(/Llame al (?:<a [^>]*class="tel"[^>]*>[^<]*<\/a>|[^<.]*?) para una consulta gratuita\./g, (p) => `<span lang="es">${p}</span>`)
    .replace(/(^|[^>])(Se habla español\.?)/g, (_, pre, p) => `${pre}<span lang="es" class="nowrap">${p}</span>`);
}

/** Plain text of a markdown line (no formatting, typographic quotes, no fact tags). */
export const plain = (md: string): string =>
  smart(stripFacts(md).replace(/`([^`]+)`/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/(^|[^\w])[*_]([^*_]+)[*_](?!\w)/g, '$1$2').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')).trim();

/** Turn a heading into an id. */
export const slugify = (s: string): string =>
  plain(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ------------------------------------------------------------------ blocks
export function parseBlocks(lines: string[]): Block[] {
  const flat: Block[] = [];
  let para: string[] = [];
  let open = false; // the last block is a list that may continue
  const flush = () => {
    if (!para.length) return;
    const md = para.join(' ').trim();
    para = [];
    const lm = md.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    flat.push(lm ? { type: 'link', md, text: lm[1], href: lm[2] } : { type: 'p', md });
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { flush(); open = false; continue; }
    let m: RegExpMatchArray | null;
    if ((m = line.match(HINT_LINE)) && (BLOCK_HINTS as readonly string[]).includes(m[1])) {
      flush(); open = false;
      flat.push({ type: 'directive', name: m[1], args: (m[2] || '').trim(), blocks: [] });
      continue;
    }
    if ((m = line.match(/^(#{3,4})\s+(.*)$/))) { flush(); open = false; flat.push({ type: m[1].length === 3 ? 'h3' : 'h4', md: m[2].trim() }); continue; }
    if ((m = line.match(/^\s*[-*]\s+(.*)$/)) || (m = line.match(/^\s*\d+\.\s+(.*)$/))) {
      const kind = /^\s*\d+\./.test(line) ? 'ol' : 'ul';
      flush();
      const last = flat[flat.length - 1];
      if (open && last && last.type === kind) last.items.push(m[1].trim());
      else flat.push({ type: kind, items: [m[1].trim()] });
      open = true;
      continue;
    }
    if ((m = line.match(/^>\s?(.*)$/))) { flush(); open = false; flat.push({ type: 'quote', md: m[1].trim() }); continue; }
    open = false;
    para.push(line.trim());
  }
  flush();
  // [vendor: x] / [vendor-off: x] wrap the one block that follows them.
  const out: Block[] = [];
  for (let i = 0; i < flat.length; i++) {
    const b = flat[i];
    if (b.type === 'directive' && (b.name === 'vendor' || b.name === 'vendor-off') && flat[i + 1] && flat[i + 1].type !== 'directive') {
      b.blocks.push(flat[++i]);
    }
    out.push(b);
  }
  return out;
}

/** Split blocks on h3 into {intro, items:[{title, blocks}]}. */
export function splitH3(blocks: Block[]): { intro: Block[]; items: { title: string; blocks: Block[] }[] } {
  const intro: Block[] = [];
  const items: { title: string; blocks: Block[] }[] = [];
  for (const b of blocks) {
    if (b.type === 'h3') items.push({ title: b.md, blocks: [] });
    else if (items.length) items[items.length - 1].blocks.push(b);
    else intro.push(b);
  }
  return { intro, items };
}

/** A testimonial line: "text" — Attribution */
export function parseQuote(md: string): { text: string; by: string } {
  const s = stripFacts(md).trim();
  const m = s.match(/^["“]([\s\S]*)["”]\s+[—–-]\s+(.+)$/);
  return m ? { text: m[1], by: m[2].trim() } : { text: s, by: '' };
}

// ------------------------------------------------------------------ markdown → HTML
export function blocksToHtml(blocks: Block[], opts: InlineOpts = {}): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case 'p': return `<p>${inline(b.md, opts)}</p>`;
        case 'link': return `<p>${inline(b.md, opts)}</p>`;
        case 'ul': return `<ul>${b.items.map((i) => `<li>${inline(i, opts)}</li>`).join('')}</ul>`;
        case 'ol': return `<ol>${b.items.map((i) => `<li>${inline(i, opts)}</li>`).join('')}</ol>`;
        case 'quote': return `<blockquote><p>${inline(b.md, opts)}</p></blockquote>`;
        case 'h3': return `<h3>${inline(b.md, opts)}</h3>`;
        case 'h4': return `<h4>${inline(b.md, opts)}</h4>`;
        case 'directive': return `<div data-directive="${b.name}"${b.args ? ` data-args="${esc(b.args)}"` : ''}>${blocksToHtml(b.blocks, opts)}</div>`;
      }
    })
    .join('\n');
}

/** Render a markdown string (minimal subset). `## ` headings render as h2. */
export function renderMarkdown(md: string, opts: InlineOpts = {}): string {
  const out: string[] = [];
  let buf: string[] = [];
  const flush = () => { if (buf.length) out.push(blocksToHtml(parseBlocks(buf), opts)); buf = []; };
  for (const line of stripFacts(md).split('\n')) {
    const h = line.match(/^##\s+(.*)$/);
    if (h) { flush(); out.push(`<h2>${inline(h[1], opts)}</h2>`); } else buf.push(line);
  }
  flush();
  return out.join('\n');
}

// ------------------------------------------------------------------ page loader
const cache = new Map<string, PageCopy>();

export function copyFile(slug: string, lang: Lang = 'en'): string {
  return path.join(ROOT, 'copy', 'pages', ...(lang === 'es' ? ['es'] : []), `${slug}.md`);
}
export const hasCopy = (slug: string, lang: Lang = 'en'): boolean => fs.existsSync(copyFile(slug, lang));

/** Load a page's copy. `slug` is the EN slug ("index", "criminal-defense/dui"). */
export function loadCopy(slug: string, lang: Lang = 'en'): PageCopy {
  const key = `${lang}:${slug}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const file = copyFile(slug, lang);
  const text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`copy.ts: no frontmatter in ${file}`);
  const raw = (YAML.parse(m[1]) || {}) as Record<string, any>;
  const data: Record<string, any> = {};
  for (const [k, v] of Object.entries(raw)) data[k] = typeof v === 'string' ? stripFacts(v).trim() : v;
  const body = stripFacts(m[2]);

  type Raw = { hint: string; args: string; h2: string | null; lines: string[] };
  const raws: Raw[] = [];
  let cur: Raw | null = null;
  const start = (hint: string, args = '') => { cur = { hint, args, h2: null, lines: [] }; raws.push(cur); };
  for (const line of body.split('\n')) {
    const hm = line.match(HINT_LINE);
    if (hm && (SECTION_HINTS as readonly string[]).includes(hm[1])) { start(hm[1], (hm[2] || '').trim()); continue; }
    const h2 = line.match(/^##\s+(.*)$/);
    if (h2) {
      const c = cur as Raw | null;
      const fresh = !!c && !c.h2 && TAKES_H2.has(c.hint) && !c.lines.some((l) => l.trim());
      if (!fresh) start('prose');
      (cur as unknown as Raw).h2 = h2[1].trim();
      continue;
    }
    if (!cur) start('prose');
    (cur as unknown as Raw).lines.push(line);
  }
  const sections: Section[] = raws
    .map((r, index) => ({ hint: r.hint, args: r.args, h2: r.h2, markdown: r.lines.join('\n').trim(), blocks: parseBlocks(r.lines), index }))
    .filter((s) => s.h2 || s.blocks.length);

  const out: PageCopy = {
    slug,
    lang,
    file: path.relative(ROOT, file),
    data: data as PageCopy['data'],
    sections,
  };
  cache.set(key, out);
  return out;
}

/** Sections with a given hint. */
export const sectionsOf = (copy: PageCopy, hint: string): Section[] => copy.sections.filter((s) => s.hint === hint);
