// Reads the Markdown copy at build time and turns it into renderable sections.
// - Source: copy/pages/<slug>.md at the repo root, resolved from this file (cwd-independent).
// - Frontmatter is parsed with `yaml`. Every {fact:…} tag is stripped.
// - The body is split into sections at the component hints ([hero], [proof-strip], [cards: N], [faq],
//   [cta-band], [testimonial], [steps]). An H2 that arrives after a section already has a heading or content
//   opens a new untyped "prose" section, so no copy is dropped.
// - Inline Markdown (bold, italic, links) is rendered minimally, with typographic quotes and apostrophes.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

// From src/lib this is ../../../../copy/pages. Astro bundles this module into a build chunk at another depth,
// so walk up from wherever this file runs until the repo's copy/pages folder is found.
function findUp(rel) {
  let dir = path.dirname(fileURLToPath(import.meta.url));
  for (let i = 0; i < 12; i++) {
    const p = path.join(dir, rel);
    if (fs.existsSync(p)) return p;
    dir = path.dirname(dir);
  }
  throw new Error(`copy.mjs: cannot find ${rel} above ${fileURLToPath(import.meta.url)}`);
}
export const REPO = path.resolve(findUp('copy/pages/index.md'), '../../..');
const COPY = path.join(REPO, 'copy/pages');

const FACT = /\s*\{fact:[^}]+\}/g;
const HINT = /^\s*\[(hero|proof-strip|cards|faq|cta-band|testimonial|steps)(?::\s*(\d+))?\]\s*$/;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => esc(s).replace(/"/g, '&quot;');

// Typographic quotes: apostrophes and double quotes in running text (never inside URLs).
export function smart(s) {
  return s
    .replace(/(^|[\s(\[—–-])"(?=\S)/g, '$1“')
    .replace(/"/g, '”')
    .replace(/(\w)'(\w)/g, '$1’$2')
    .replace(/(^|[\s(\[—–-])'(?=\S)/g, '$1‘')
    .replace(/'/g, '’');
}

// Minimal inline Markdown → HTML. Links become <a>; tel:/mailto:/external links get sensible attributes.
export function inline(src) {
  const text = String(src).replace(FACT, '').trim();
  const out = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0, m;
  const fmt = (t) => smart(esc(t))
    .replace(/(\d{1,2}:\d{2}) (a\.m\.|p\.m\.)/g, '$1\u00A0$2')
    .replace(/ – (\d)/g, '\u00A0–\u00A0$1')
    // An en dash is a break opportunity even before a no-break space, so time ranges are wrapped whole.
    .replace(/(\d{1,2}:\d{2}\u00A0[ap]\.m\.\u00A0–\u00A0\d{1,2}:\d{2}\u00A0[ap]\.m\.)/g, '<span class="nowrap">$1</span>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)(.+?)\*/g, '$1<em>$2</em>');
  while ((m = re.exec(text))) {
    out.push(fmt(text.slice(last, m.index)));
    const href = m[2];
    const ext = /^https?:/.test(href);
    const cls = href.startsWith('tel:') ? ' class="tel"' : '';
    const extra = ext ? ' rel="noopener" target="_blank"' : '';
    const lang = href === '/es/' ? ' hreflang="es"' : '';
    out.push(`<a href="${escAttr(href)}"${cls}${lang}${extra}>${fmt(m[1])}${ext ? '<span class="visually-hidden"> (opens in a new tab)</span>' : ''}</a>`);
    last = m.index + m[0].length;
  }
  out.push(fmt(text.slice(last)));
  return out.join('');
}

// Plain text (for aria labels, titles): links reduced to their text, emphasis removed.
export function plain(src) {
  return smart(String(src).replace(FACT, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*?/g, '').trim());
}

// Blocks: h2, h3, p, ul, ol, quote, link (a paragraph that is only one link).
function parseBlocks(lines) {
  const blocks = [];
  let para = [];
  const flush = () => { if (para.length) { pushPara(para.join(' ')); para = []; } };
  const pushPara = (t) => {
    const bare = t.replace(FACT, '').trim();
    const only = bare.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (only) blocks.push({ type: 'link', text: only[1], href: only[2], html: inline(only[1]) });
    else blocks.push({ type: 'p', raw: t, html: inline(t) });
  };
  for (const line of lines) {
    if (!line.trim()) { flush(); continue; }
    let m;
    if ((m = line.match(/^##\s+(.*)$/))) { flush(); blocks.push({ type: 'h2', raw: m[1], html: inline(m[1]), text: plain(m[1]) }); continue; }
    if ((m = line.match(/^###\s+(.*)$/))) { flush(); blocks.push({ type: 'h3', raw: m[1], html: inline(m[1]), text: plain(m[1]) }); continue; }
    if ((m = line.match(/^\s*[-*]\s+(.*)$/))) {
      flush();
      const prev = blocks[blocks.length - 1];
      if (prev && prev.type === 'ul') prev.items.push({ raw: m[1], html: inline(m[1]) });
      else blocks.push({ type: 'ul', items: [{ raw: m[1], html: inline(m[1]) }] });
      continue;
    }
    if ((m = line.match(/^\s*(\d+)\.\s+(.*)$/))) {
      flush();
      const prev = blocks[blocks.length - 1];
      const item = { n: Number(m[1]), raw: m[2], html: inline(m[2]) };
      if (prev && prev.type === 'ol') prev.items.push(item);
      else blocks.push({ type: 'ol', items: [item] });
      continue;
    }
    if ((m = line.match(/^\s*>\s?(.*)$/))) {
      flush();
      const raw = m[1].replace(FACT, '').trim();
      const q = raw.match(/^["“](.*)["”]\s*[—–-]\s*(.+)$/);
      blocks.push({ type: 'quote', quote: q ? q[1] : raw, by: q ? q[2] : '', html: smart(esc(q ? q[1] : raw)), byHtml: q ? inline(q[2]) : '' });
      continue;
    }
    para.push(line.trim());
  }
  flush();
  return blocks;
}

// Sections: { type, count, heading, blocks, items? }
function splitSections(body) {
  const sections = [];
  let cur = null;
  const open = (type, count) => { cur = { type, count, lines: [] }; sections.push(cur); };
  const hasContent = (s) => s.lines.some((l) => l.trim());
  for (const line of body.replace(/\r\n/g, '\n').split('\n')) {
    const h = line.match(HINT);
    if (h) { open(h[1], h[2] ? Number(h[2]) : null); continue; }
    // An H2 stays in a freshly hinted, still-empty section; otherwise it opens an untyped prose section.
    if (/^##\s+/.test(line) && (!cur || hasContent(cur))) open('prose', null);
    if (!cur) open('prose', null);
    cur.lines.push(line);
  }
  return sections.filter(hasContent).map((s) => {
    const blocks = parseBlocks(s.lines);
    const h2 = blocks.find((b) => b.type === 'h2');
    const rest = blocks.filter((b) => b !== h2);
    const sec = { type: s.type, count: s.count, heading: h2 || null, blocks: rest };
    sec.id = h2 ? slugify(h2.text) : s.type;
    if (s.type === 'cards' || s.type === 'faq') sec.groups = groupByH3(rest);
    return sec;
  });
}

// Groups blocks under each H3: { intro: [...blocks before the first H3], items: [{ title, blocks, link }], after: [...] }
function groupByH3(blocks) {
  const intro = [], items = [];
  let cur = null;
  for (const b of blocks) {
    if (b.type === 'h3') { cur = { title: b, blocks: [] }; items.push(cur); continue; }
    if (cur) cur.blocks.push(b); else intro.push(b);
  }
  // A trailing link-only paragraph after the last card body that is not the card's own link belongs to the section.
  const after = [];
  for (const it of items) {
    const links = it.blocks.filter((b) => b.type === 'link');
    if (links.length > 1) {
      const extra = links.slice(1);
      it.blocks = it.blocks.filter((b) => !extra.includes(b));
      after.push(...extra);
    }
    it.link = it.blocks.find((b) => b.type === 'link' && !/^(tel:|mailto:|https?:)/.test(b.href)) || null;
    it.body = it.blocks.filter((b) => b !== it.link);
  }
  return { intro, items, after };
}

export function slugify(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’'"“”?.,:!]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const cache = new Map();
export function loadPage(slug) {
  if (cache.has(slug)) return cache.get(slug);
  const file = path.join(COPY, `${slug}.md`);
  const text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const data = m ? YAML.parse(m[1]) : {};
  const body = m ? m[2] : text;
  const fm = {};
  for (const [k, v] of Object.entries(data)) fm[k] = typeof v === 'string' ? v.replace(FACT, '').trim() : v;
  const page = { slug, fm, sections: splitSections(body) };
  cache.set(slug, page);
  return page;
}

// Helpers for pages.
export const byType = (page, type) => page.sections.filter((s) => s.type === type);
export const first = (page, type) => page.sections.find((s) => s.type === type) || null;
