// Reads copy/pages/<slug>.md at build time, strips {fact:...} tags and splits the body into sections by
// the component hints. Nothing is dropped or rewritten: every block of the copy is returned and rendered.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

// Locate the repo root by walking up from this module (works from the source tree and from Astro's
// bundled build chunks alike, and does not depend on process.cwd()).
function findRoot() {
  let dir = path.dirname(fileURLToPath(import.meta.url));
  for (let i = 0; i < 12; i++) {
    if (fs.existsSync(path.join(dir, 'copy', 'pages', 'index.md')) && fs.existsSync(path.join(dir, 'mockups'))) return dir;
    const up = path.dirname(dir);
    if (up === dir) break;
    dir = up;
  }
  throw new Error('copy.mjs: could not find the repo root (copy/pages) above ' + fileURLToPath(import.meta.url));
}
export const ROOT = findRoot();

const HINT = /^\[(hero|proof-strip|cards(?::\s*\d+)?|faq|cta-band|testimonial|steps)\]\s*$/;
// Hinted sections whose first H2 belongs to the hinted component.
const TAKES_H2 = new Set(['cards', 'faq', 'cta-band', 'testimonial', 'steps']);

// ------------------------------------------------------------------ inline markdown (minimal)
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Straight quotes and apostrophes to typographic ones (text only; hrefs never contain quotes here). */
export function smart(s) {
  return s
    .replace(/([ap]\.m\.) – (\d)/g, '$1\u00A0–\u00A0$2')
    .replace(/\bTN (\d{5})/g, 'TN\u00A0$1')
    .replace(/(^|[\s(\[—–-])"/g, '$1“')
    .replace(/"/g, '”')
    .replace(/(^|[\s(\[—–-])'/g, '$1‘')
    .replace(/'/g, '’');
}

const ES_PHRASES = [/Se habla español\.?/g, /Llame al [^]*?gratuita\./g];

/** Render one line of markdown inline formatting to HTML: **bold**, [text](href). */
export function inline(md) {
  let s = esc(smart(md));
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Keep an hours range ("9:00 a.m. – 5:00 p.m.") on one line; browsers may break after an en dash.
  s = s.replace(/\d{1,2}:\d{2}[ \u00A0]?[ap]\.m\.\u00A0–\u00A0\d{1,2}:\d{2}[ \u00A0]?[ap]\.m\./g, (m) => `<span class="nowrap">${m}</span>`);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => {
    const attrs = [`href="${href}"`];
    if (href.startsWith('tel:')) attrs.push('class="tel"');
    if (/^https?:/.test(href)) attrs.push('rel="noopener"');
    if (href === '/es/' || /español/i.test(text)) attrs.push('hreflang="es"', 'lang="es"');
    return `<a ${attrs.join(' ')}>${text}</a>`;
  });
  // Mark Spanish phrases for screen readers (outside of tags only).
  for (const re of ES_PHRASES) {
    s = s.replace(re, (m) => (/[<>]/.test(m.replace(/<a [^>]*class="tel"[^>]*>[^<]*<\/a>/g, '')) ? m : `<span lang="es"${/^Se habla/.test(m) ? ' class="nowrap"' : ''}>${m}</span>`));
  }
  return s;
}

/** Plain text of a markdown line (no formatting, typographic quotes). */
export const plain = (md) => smart(md.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'));

// ------------------------------------------------------------------ block parsing
/**
 * Blocks: {type:'p', md} | {type:'ul', items:[md]} | {type:'ol', items:[md]} | {type:'quote', md}
 *         | {type:'h3', md} | {type:'link', md, href, text}   (a paragraph that is only one link)
 */
function parseBlocks(lines) {
  const blocks = [];
  let para = [];
  const flush = () => {
    if (!para.length) return;
    const md = para.join(' ').trim();
    para = [];
    const lm = md.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    blocks.push(lm ? { type: 'link', md, text: lm[1], href: lm[2] } : { type: 'p', md });
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { flush(); continue; }
    let m;
    if ((m = line.match(/^###\s+(.*)$/))) { flush(); blocks.push({ type: 'h3', md: m[1].trim() }); continue; }
    if ((m = line.match(/^[-*]\s+(.*)$/))) {
      flush();
      const last = blocks[blocks.length - 1];
      if (last && last.type === 'ul' && last.open) last.items.push(m[1].trim());
      else blocks.push({ type: 'ul', items: [m[1].trim()], open: true });
      continue;
    }
    if ((m = line.match(/^\d+\.\s+(.*)$/))) {
      flush();
      const last = blocks[blocks.length - 1];
      if (last && last.type === 'ol' && last.open) last.items.push(m[1].trim());
      else blocks.push({ type: 'ol', items: [m[1].trim()], open: true });
      continue;
    }
    if ((m = line.match(/^>\s?(.*)$/))) { flush(); blocks.push({ type: 'quote', md: m[1].trim() }); continue; }
    // a non-list line closes any open list
    const last = blocks[blocks.length - 1];
    if (last && last.open && !para.length) last.open = false;
    para.push(line.trim());
  }
  flush();
  for (const b of blocks) delete b.open;
  return blocks;
}

/** Split a block list on h3 into {intro, items:[{title, blocks}]}. */
export function splitH3(blocks) {
  const intro = [], items = [];
  for (const b of blocks) {
    if (b.type === 'h3') items.push({ title: b.md, blocks: [] });
    else if (items.length) items[items.length - 1].blocks.push(b);
    else intro.push(b);
  }
  return { intro, items };
}

/** Parse a testimonial quote line: "text" — Attribution  */
export function parseQuote(md) {
  const m = md.match(/^"([\s\S]*)"\s+—\s+(.+)$/);
  return m ? { text: m[1], by: m[2] } : { text: md, by: '' };
}

// ------------------------------------------------------------------ page loader
const cache = new Map();
export function loadCopy(slug) {
  if (cache.has(slug)) return cache.get(slug);
  const file = path.join(ROOT, 'copy', 'pages', `${slug}.md`);
  const text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`copy.mjs: no frontmatter in ${file}`);
  const data = YAML.parse(m[1]) || {};
  const body = m[2].replace(/[ \t]*\{fact:[^}]*\}/g, '');

  const sections = [];
  let cur = null;
  const start = (type) => { cur = { type, h2: null, lines: [] }; sections.push(cur); };
  for (const line of body.split('\n')) {
    const hint = line.trim().match(HINT);
    if (hint) { start(hint[1].replace(/:.*/, '')); continue; }
    const h2 = line.match(/^##\s+(.*)$/);
    if (h2) {
      const fresh = cur && !cur.h2 && TAKES_H2.has(cur.type) && !cur.lines.some((l) => l.trim());
      if (!fresh) start('prose');
      cur.h2 = h2[1].trim();
      continue;
    }
    if (!cur) start('prose');
    cur.lines.push(line);
  }
  const out = {
    slug,
    data: { ...data, title: smart(String(data.title || '')), description: smart(String(data.description || '')) },
    sections: sections
      .map((s, i) => ({ type: s.type, h2: s.h2, blocks: parseBlocks(s.lines), index: i }))
      .filter((s) => s.h2 || s.blocks.length),
  };
  cache.set(slug, out);
  return out;
}

/** Turn a heading into an id. */
export const slugify = (s) => plain(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
