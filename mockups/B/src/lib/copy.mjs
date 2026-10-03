// Reads the Markdown copy for a page at build time and turns it into typed sections.
// copy/pages/<slug>.md is found from import.meta.url (lib/root.mjs walks up to the repo root), never process.cwd().
// Every {fact:…} tag is stripped; nothing is dropped or rewritten.
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { ROOT } from './root.mjs';

// copy/pages at the repo root (mockups/B/src/lib -> ../../../../)
const COPY_DIR = path.join(ROOT, 'copy/pages');

const HINT = /^\s*\[(hero|proof-strip|cards(?::\s*\d+)?|faq|cta-band|testimonial|steps)\]\s*$/;

// ---------------------------------------------------------------- inline markdown
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Straight quotes -> typographic quotes and apostrophes (text only, never inside URLs). */
export function smart(s) {
  return s
    .replace(/(^|[\s([{—–-])"/g, '$1“')
    .replace(/"/g, '”')
    .replace(/(^|[\s([{—–-])'/g, '$1‘')
    .replace(/'/g, '’');
}

export function stripFacts(s) {
  return String(s ?? '').replace(/\s*\{fact:[^}]+\}/g, '').replace(/[ \t]+$/g, '');
}

/** Markdown inline -> HTML: escaping, **bold**, [links](url), smart quotes. */
export function inline(md) {
  const text = stripFacts(md).trim();
  const out = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m;
  const fmt = (t) => typo(smart(esc(t)).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'));
  while ((m = re.exec(text))) {
    out.push(fmt(text.slice(last, m.index)));
    const href = m[2];
    const ext = /^https?:/.test(href);
    const attrs = ext ? ' rel="noopener" target="_blank"' : '';
    const cls = href.startsWith('tel:') ? ' class="tel"' : '';
    out.push(`<a href="${esc(href)}"${cls}${attrs}>${fmt(m[1])}</a>`);
    last = m.index + m[0].length;
  }
  out.push(fmt(text.slice(last)));
  return langEs(out.join(''));
}

/** Typography only (no words change): a time range never breaks across lines, a time never parts from a.m./p.m. */
function typo(html) {
  return html
    .replace(/(\d{1,2}:\d{2}) ([ap]\.m\.) ([–-]) (\d{1,2}:\d{2}) ([ap]\.m\.)/g, '<span class="nowrap">$1 $2 $3 $4 $5</span>')
    .replace(/(\d{1,2}:\d{2}) ([ap]\.m\.)/g, '$1&nbsp;$2');
}

/** Spanish phrases inside English copy get lang="es" so screen readers switch voice (WCAG 3.1.2). */
export function langEs(html) {
  return html
    .replace(/Llame al (<a [^>]*>[^<]*<\/a>) para una consulta gratuita\./g, '<span lang="es">Llame al $1 para una consulta gratuita.</span>')
    .replace(/(?<!>)Se habla español/g, '<span lang="es">Se habla español</span>');
}

/** A paragraph that is only a link (a CTA line). */
function linkOnly(line) {
  const m = stripFacts(line).trim().match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
  return m ? { label: smart(esc(m[1])), href: m[2], external: /^https?:/.test(m[2]) } : null;
}

// ---------------------------------------------------------------- block parser
/** Lines -> blocks: p, link, ul, ol, quote, h3 (h3 starts a group). */
function parseBlocks(lines) {
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    let m;
    if ((m = line.match(/^###\s+(.*)$/))) { blocks.push({ type: 'h3', html: inline(m[1]), text: stripFacts(m[1]).trim() }); i++; continue; }
    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { items.push(inline(lines[i].replace(/^\s*[-*]\s+/, ''))); i++; }
      blocks.push({ type: 'ul', items });
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) { items.push(splitLead(lines[i].replace(/^\s*\d+\.\s+/, ''))); i++; }
      blocks.push({ type: 'ol', items });
      continue;
    }
    if (/^\s*>/.test(line)) {
      const raw = stripFacts(line.replace(/^\s*>\s*/, '')).trim();
      const q = raw.match(/^"(.*)"\s*[—–-]\s*(.+)$/);
      blocks.push(q
        ? { type: 'quote', html: inline(q[1]), cite: smart(esc(q[2].trim())) }
        : { type: 'quote', html: inline(raw), cite: '' });
      i++;
      continue;
    }
    const link = linkOnly(line);
    if (link) { blocks.push({ type: 'link', ...link }); i++; continue; }
    // a paragraph is one source line in this copy
    blocks.push({ type: 'p', ...splitLead(line) });
    i++;
  }
  return blocks;
}

/** "**Lead.** rest" -> { lead, html } so bold-lead paragraphs can become titled items. */
function splitLead(md) {
  const m = stripFacts(md).trim().match(/^\*\*([^*]+)\*\*\s*(.*)$/);
  if (m) return { lead: smart(esc(m[1])), rest: inline(m[2]), html: inline(md) };
  return { lead: null, rest: inline(md), html: inline(md) };
}

/** Groups blocks under h3 headings: { intro: [...], groups: [{ title, blocks }], outro: [...] }. */
export function groupByH3(blocks) {
  const intro = [];
  const groups = [];
  for (const b of blocks) {
    if (b.type === 'h3') groups.push({ title: b.html, text: b.text, blocks: [] });
    else if (groups.length) groups[groups.length - 1].blocks.push(b);
    else intro.push(b);
  }
  // A trailing link-only block after the last group that is not the group's own link is a section link.
  const outro = [];
  const lastGroup = groups[groups.length - 1];
  if (lastGroup) {
    const links = lastGroup.blocks.filter((b) => b.type === 'link');
    while (links.length > 1 && lastGroup.blocks[lastGroup.blocks.length - 1]?.type === 'link') {
      outro.unshift(lastGroup.blocks.pop());
      links.pop();
    }
  }
  return { intro, groups, outro };
}

// ---------------------------------------------------------------- sections
export function loadPage(slug) {
  const file = path.join(COPY_DIR, `${slug}.md`);
  const text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const fm = YAML.parse(m[1]);
  for (const k of Object.keys(fm)) if (typeof fm[k] === 'string') fm[k] = stripFacts(fm[k]);
  const lines = m[2].split('\n');

  const sections = [];
  let cur = null;
  const start = (kind, cols = null) => { cur = { kind, cols, heading: null, headingText: null, lines: [] }; sections.push(cur); };
  for (const line of lines) {
    const hint = line.match(HINT);
    if (hint) {
      const [kind, n] = hint[1].split(/:\s*/);
      start(kind, n ? Number(n) : null);
      continue;
    }
    const h2 = line.match(/^##\s+(.*)$/);
    if (h2) {
      // An H2 belongs to the hinted section it directly follows; otherwise it opens a plain section.
      const attach = cur && cur.kind !== 'prose' && !cur.heading && !cur.lines.some((l) => l.trim());
      if (!attach) start('prose');
      cur.heading = inline(h2[1]);
      cur.headingText = stripFacts(h2[1]).trim();
      continue;
    }
    if (!cur) start('prose');
    cur.lines.push(line);
  }
  for (const s of sections) {
    s.blocks = parseBlocks(s.lines);
    delete s.lines;
    s.id = s.headingText ? s.headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : s.kind;
  }
  return { fm, sections: sections.filter((s) => s.heading || s.blocks.length) };
}

/** Plain text of an inline-HTML string (for aria labels and counts). */
export const plain = (html) => String(html).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
