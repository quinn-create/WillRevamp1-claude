#!/usr/bin/env node
// GATES for the website revamp. Written once in Stage 0 and hash-locked (plan/CHECK-HASH).
// NEVER EDIT THIS FILE after Stage 0. Every threshold and word list the kit fixes lives HERE,
// so the hash protects the gates themselves. It reads only stage-produced data from the repo.
// Self-contained: Node built-ins + `yaml` only.
//
// Usage:
//   node tools/check.mjs --record-hash          (Stage 0 only; refuses if plan/CHECK-HASH exists)
//   node tools/check.mjs --gate 0|1|2|2b|3|4|6 [--rev N]
//   node tools/check.mjs --build                (after every build phase; partial page sets allowed)
//   node tools/check.mjs --final                (full site: every page EN+ES, redirects, headers, SEO, consent)
// Exit code 0 = pass, 1 = fail. A check that did not run is a failure.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const SELF = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(SELF), '..');
const P = (...p) => path.join(ROOT, ...p);
const exists = (p) => fs.existsSync(P(p));
const read = (p) => fs.readFileSync(P(p), 'utf8');
const readJSON = (p) => JSON.parse(read(p));

// ---------------------------------------------------------------- fixed by the kit (do not move out)
const BANNED_PHRASES = []; // kit BANNED_PHRASES: [] — "free consultation" is allowed for this client
const FORBIDDEN_STRINGS = [ // known defects of the old site that must never reach the new one
  'Knoxville Web Design', 'jshwebdesigns', 'hostingersite.com', 'Murfreeesboro',
  'online or at to', 'online or at today', 'or at to get started', 'or at to discuss',
];
const WARN_PHRASES = ['elevate', 'seamless', 'unlock', "in today's fast-paced world", 'look no further', 'we understand that',
  "whether you're", 'cutting-edge', 'world-class', 'passionate about', 'tailored solutions', 'we pride ourselves',
  'navigate the complexities', 'peace of mind', 'dedicated team', 'second to none', 'one-stop shop', 'game-changer',
  'leverage', 'synergy', 'delve', 'robust', 'holistic', 'aggressive'];
const LAW_FORBIDDEN = /\b(specialist|specializ(?:e|es|ed|ing)|specialis(?:e|es|ed|ing)|experts?|certified|guarantee[sd]?|guaranteeing|especialista|especializad[oa]s?|expert[oa]s?|certificad[oa]s?|garantizad[oa]s?|garantizamos)\b/i;
const RESULTS_WORDS = /\b(verdicts?|acquittals?|acquitted|settlements?|dismissals?|not guilty|veredictos?|absoluci[oó]n|acuerdos? de indemnizaci[oó]n)\b/i;
const RESULTS_DISCLAIMER = /Prior results do not guarantee a similar outcome|Los resultados anteriores no garantizan un resultado similar/i;
const LEGAL_LINE = /not legal advice|no (constituye|es) (asesoramiento|asesor[ií]a) legal/i;
const FACT_TYPES = ['identity', 'contact', 'hours', 'location', 'service', 'price', 'credential', 'membership', 'person',
  'testimonial', 'stat', 'award', 'policy', 'offer', 'other'];
const JS_BUDGET_GZ = 50 * 1024;
const LH = { performance: 95, accessibility: 95, bestPractices: 95, seo: 95, lcpMs: 2000, cls: 0.05, tbtMs: 150 };
const ZIP_LIMIT = 25 * 1024 * 1024;
const TITLE_MAX = 60, DESC_MIN = 140, DESC_MAX = 155;
const DIRECTIONS = ['A', 'B', 'C'];
const AGENT_COUNT = 25;
const TOOLS = ['crawl', 'shots', 'check', 'lighthouse', 'axe', 'links', 'images', 'compare', 'configure', 'package'];
const QA_CHECKS = ['01-visual', '02-lighthouse', '03-accessibility', '04-links', '05-content-parity', '06-copy-proof',
  '07-responsive', '08-forms', '09-seo', '10-build-console'];
const TRACKERS = /googletagmanager\.com|google-analytics\.com|connect\.facebook\.net|analytics\.tiktok\.com|clarity\.ms/;
const SECRET = /(AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9]{20,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|xox[abp]-[A-Za-z0-9-]{10,}|ghp_[A-Za-z0-9]{30,})/;

// ---------------------------------------------------------------- reporting
const results = [];
let failed = 0;
function ok(name, pass, detail = '') {
  results.push({ name, pass: !!pass, detail });
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
}
function warn(name, detail) {
  results.push({ name, pass: true, warning: true, detail });
  console.log(`WARN  ${name} — ${detail}`);
}
function guard(name, fn) {
  try { fn(); } catch (e) { ok(name, false, `check crashed: ${String(e.message || e).split('\n')[0]}`); }
}

// ---------------------------------------------------------------- helpers
const norm = (s) => String(s ?? '').normalize('NFKC').replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"')
  .replace(/[–—]/g, '-').replace(/ /g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
function walk(dir, filter = () => true) {
  const out = [];
  const d = P(dir);
  if (!fs.existsSync(d)) return out;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out.push(...walk(path.relative(ROOT, p), filter));
    else if (filter(p)) out.push(p);
  }
  return out;
}
function sha256(file) { return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'); }
function frontmatter(text) {
  const m = text.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: null, body: text };
  try { return { data: YAML.parse(m[1]) || {}, body: m[2] }; } catch (e) { return { data: null, body: m[2], error: String(e.message).split('\n')[0] }; }
}
function visibleText(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<template[\s\S]*?<\/template>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;|&rsquo;/g, "'").replace(/&quot;|&ldquo;|&rdquo;/g, '"').replace(/\s+/g, ' ');
}
function withoutBlockquotes(html) { return html.replace(/<blockquote[\s\S]*?<\/blockquote>/gi, ' '); }
function hasPhrase(text, phrase) { return new RegExp(`(^|[^a-z])${phrase.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`, 'i').test(norm(text)); }
function factsIndex() {
  const facts = exists('inventory/facts.json') ? readJSON('inventory/facts.json') : [];
  const list = Array.isArray(facts) ? facts : facts.facts || [];
  return new Map(list.map((f) => [String(f.id), f]));
}
function sitemap() {
  if (!exists('plan/sitemap.json')) return null;
  const s = readJSON('plan/sitemap.json');
  return Array.isArray(s) ? { pages: s } : s;
}
const pagePath = (p) => '/' + String(p).replace(/^\/+|\/+$/g, '') + (String(p).replace(/^\/+|\/+$/g, '') ? '/' : '');
const slugOf = (p) => { const s = String(p).replace(/^\/+|\/+$/g, ''); return s === '' ? 'index' : s; };

// ---------------------------------------------------------------- copy validation (2b, 4)
function validateCopy(file, facts, { esOf } = {}) {
  const errors = [], warnings = [];
  const text = read(file);
  const { data, body, error } = frontmatter(text);
  if (!data) return { errors: [error ? `frontmatter YAML: ${error}` : 'no frontmatter'], warnings, ids: new Set() };
  for (const k of ['title', 'description', 'h1', 'primary_cta', 'schema_type']) if (!data[k]) errors.push(`frontmatter.${k} missing`);
  const t = String(data.title || '').replace(/\{fact:[^}]+\}/g, '').trim();
  const d = String(data.description || '').replace(/\{fact:[^}]+\}/g, '').trim();
  if (t.length > TITLE_MAX) errors.push(`title ${t.length} chars > ${TITLE_MAX}`);
  if (d.length < DESC_MIN || d.length > DESC_MAX) errors.push(`description ${d.length} chars (needs ${DESC_MIN}-${DESC_MAX})`);
  // Title, description and H1 obey the same rules as the body: law words, forbidden strings, and any
  // number must be backed by a fact-tagged sentence in the body that contains the same number.
  const fm = ['title', 'description', 'h1'].map((k) => String(data[k] || '')).join(' \n ').replace(/\{fact:[^}]+\}/g, '');
  const fmLaw = fm.replace(/\s+/g, ' ').match(LAW_FORBIDDEN);
  if (fmLaw) errors.push(`law-firm rule in title/description/h1: "${fmLaw[0]}"`);
  for (const s of FORBIDDEN_STRINGS) if (fm.includes(s)) errors.push(`forbidden string in title/description/h1 "${s}"`);
  if (!data.policy_page) {
    const tagged = body.split('\n').filter((l) => /\{fact:[^}]+\}/.test(l)).join(' ');
    for (const k of ['title', 'description', 'h1']) {
      const v = String(data[k] || '');
      if (/\{fact:[^}]+\}/.test(v)) continue; // the field cites its own fact
      for (const n of v.match(/\d[\d,.]*/g) || []) { const x = n.replace(/[.,]+$/, ''); if (!tagged.includes(x)) errors.push(`number "${x}" in ${k} needs {fact:ID} in the field or a fact-tagged body sentence with the same number`); }
    }
  }
  const ids = new Set();
  for (const m of text.matchAll(/\{fact:([^}]+)\}/g)) for (const id of m[1].split(/[,\s]+/).filter(Boolean)) {
    ids.add(id);
    if (!facts.has(id)) errors.push(`unknown fact id ${id}`);
  }
  // Every sentence that carries a number (years, phone, address, hours, prices, counts) must cite a fact.
  const NUMBER_EXEMPT = /last reviewed|[úu]ltima revisi[óo]n|©|copyright|\b404\b|WCAG\s*2(\.\d)?|Section 508/i;
  const lines = (data.policy_page ? '' : body).split('\n').map((l) => l.replace(/^\s*\[[^\]\d]*\]\s*$/, '').replace(/^\s*(\d+\.|[-*>#]+)\s+/, ''));
  for (const line of lines) {
    const sentences = line.split(/(?<=[.!?])(?<!\b(?:[A-Z]|St|Ste|Ave|Rd|Blvd|Dr|Mr|Mrs|Ms|Jr|Sr|No|[ap]\.m)\.)\s+(?=[A-Z¿¡"“])/);
    for (const s of sentences) {
      const bare = s.replace(/\{fact:[^}]+\}/g, '').replace(/\[[^\]]*\]\([^)]*\)/g, (m) => m.replace(/\([^)]*\)/, ''));
      if (/\d/.test(bare) && !/\{fact:[^}]+\}/.test(s) && !NUMBER_EXEMPT.test(bare)) errors.push(`number without {fact:ID}: "${bare.trim().slice(0, 90)}"`);
    }
  }
  // Testimonials: a quoted line citing a testimonial fact must reproduce that fact verbatim.
  for (const line of body.split('\n').filter((l) => /^\s*>/.test(l))) {
    const fids = [...line.matchAll(/\{fact:([^}]+)\}/g)].flatMap((m) => m[1].split(/[,\s]+/));
    for (const id of fids) {
      const f = facts.get(id);
      if (f && f.type === 'testimonial') {
        const raw = line.replace(/^\s*>\s*/, '').replace(/\{fact:[^}]+\}/g, '').trim();
        const quoted = raw.match(/^["“](.*)["”](?:\s*[—–-].*)?$/);
        const q = norm(quoted ? quoted[1] : raw.replace(/\s+[—–-]\s+[^—–]*$/, ''));
        if (q && !norm(f.exact_quote).includes(q) && !norm(f.claim).includes(q)) errors.push(`testimonial ${id} not verbatim`);
      }
    }
  }
  const plain = body.replace(/\{fact:[^}]+\}/g, '');
  for (const ph of BANNED_PHRASES) if (hasPhrase(plain, ph)) errors.push(`banned phrase "${ph}"`);
  for (const s of FORBIDDEN_STRINGS) if (plain.includes(s)) errors.push(`forbidden string "${s}"`);
  for (const ph of WARN_PHRASES) if (hasPhrase(plain, ph)) warnings.push(`warn phrase "${ph}"`);
  const nonQuote = plain.split('\n').filter((l) => !/^\s*>/.test(l)).join('\n').replace(/\s+/g, ' ').replace(new RegExp(RESULTS_DISCLAIMER.source, 'gi'), ' ');
  const law = nonQuote.match(LAW_FORBIDDEN);
  if (law) errors.push(`law-firm rule: "${law[0]}" (use "focuses on"/"practices")`);
  if (RESULTS_WORDS.test(plain) && !RESULTS_DISCLAIMER.test(plain.replace(/\s+/g, ' ')) && !/\[results-disclaimer\]/.test(body)) errors.push('results mentioned without "Prior results do not guarantee a similar outcome."');
  if (esOf) for (const id of ids) if (!esOf.has(id)) errors.push(`Spanish cites ${id}, which the English page does not`);
  return { errors, warnings, ids };
}

// ---------------------------------------------------------------- contrast (3)
function parseColor(v) {
  v = v.trim();
  let m = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (m) { const h = m[1].length === 3 ? m[1].split('').map((c) => c + c).join('') : m[1]; return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); }
  m = v.match(/^rgb\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)\s*\)$/i);
  if (m) return m.slice(1, 4).map(Number);
  return null;
}
function luminance([r, g, b]) {
  const c = [r, g, b].map((x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrast(a, b) { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); }
function tokenPairs(cssFile) {
  const css = read(cssFile);
  const vars = {};
  for (const m of css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) if (!(m[1] in vars)) vars[m[1]] = m[2].trim();
  const resolve = (name, depth = 0) => { const v = vars[name]; if (!v || depth > 8) return null; const r = v.match(/^var\((--[\w-]+)\)$/); return r ? resolve(r[1], depth + 1) : parseColor(v); };
  const pairs = [...css.matchAll(/@pair\s+(--[\w-]+)\s+on\s+(--[\w-]+)\s+(text|ui)/g)].map((m) => {
    const fg = resolve(m[1]), bg = resolve(m[2]);
    const ratio = fg && bg ? contrast(fg, bg) : 0;
    const need = m[3] === 'text' ? 4.5 : 3;
    return { fg: m[1], bg: m[2], kind: m[3], ratio: Number(ratio.toFixed(2)), pass: ratio >= need, resolvable: !!(fg && bg) };
  });
  return pairs;
}

// ---------------------------------------------------------------- built-site helpers (build, final)
function distHtml(dir = 'dist') {
  const root = P(dir);
  return walk(dir, (f) => f.endsWith('.html')).map((f) => ({ file: f, url: '/' + path.relative(root, f).replace(/index\.html$/, '').replace(/\\/g, '/'), html: fs.readFileSync(f, 'utf8') }));
}
function metaContent(html, attr, value) {
  for (const t of html.match(/<meta\b[^>]*>/gi) || []) {
    if (!new RegExp(`\\s${attr}="${value}"`, 'i').test(t)) continue;
    const c = t.match(/\scontent="([^"]*)"/i);
    if (c) return c[1];
  }
  return null;
}
function parseRedirects(text) {
  return text.split('\n').map((l) => l.replace(/(^|\s)#.*$/, '').trim()).filter(Boolean).map((l) => { const [from, to, status] = l.split(/\s+/); return { from, to, status: Number(status || 302) }; });
}
function resolveOld(dir, rules, p) {
  const fileFor = (x) => {
    const clean = decodeURIComponent(x.replace(/[?#].*$/, ''));
    for (const c of [clean, path.join(clean, 'index.html'), clean.replace(/\/$/, '') + '.html']) { const f = path.join(P(dir), c); if (f.startsWith(P(dir)) && fs.existsSync(f) && fs.statSync(f).isFile()) return f; }
    return null;
  };
  let cur = p; const hops = [];
  for (let i = 0; i < 5; i++) {
    if (fileFor(cur)) return { ok: hops.length === 0 || hops[0].status === 301, hops };
    const bare = cur.replace(/[?#].*$/, '');
    const r = rules.find((x) => !x.from.startsWith('http') && (x.from.endsWith('*') ? bare.startsWith(x.from.slice(0, -1)) : [bare, bare.replace(/\/$/, ''), bare + '/'].includes(x.from) || (x.from.includes('?') && x.from === cur)));
    if (!r) return { ok: false, hops };
    const to = r.from.endsWith('*') ? r.to.replace(':splat', bare.slice(r.from.length - 1)) : r.to;
    hops.push({ from: cur, to, status: r.status });
    cur = /^https?:/.test(to) ? new URL(to).pathname : to;
  }
  return { ok: false, hops };
}

function checkBuiltSite({ final }) {
  ok('dist/ exists', exists('dist/index.html'));
  if (!exists('dist/index.html')) return;
  ok('no dev-only /_components page in dist', !exists('dist/_components') && !exists('dist/_components.html'));
  const pages = distHtml('dist').filter((p) => !p.url.startsWith('/_'));
  let pageErrors = 0;
  const problems = [];
  for (const { url, html } of pages) {
    const errs = [];
    const is404 = /^\/(es\/)?404(\.html|\/)?$/.test(url) || url === '/404.html';
    const lang = (html.match(/<html[^>]*\slang="([^"]+)"/i) || [])[1];
    if (!lang) errs.push('no <html lang>');
    else if (url.startsWith('/es/') && !/^es/.test(lang)) errs.push(`lang ${lang} on Spanish page`);
    else if (!url.startsWith('/es/') && !/^en/.test(lang)) errs.push(`lang ${lang} on English page`);
    const h1 = (html.match(/<h1[\s>]/gi) || []).length;
    if (h1 !== 1) errs.push(`${h1} <h1>`);
    if (!/<title>[^<]{3,}<\/title>/i.test(html)) errs.push('no <title>');
    if (!is404) {
      if ((metaContent(html, 'name', 'description') || '').length < 50) errs.push('meta description missing/short');
      if (!/<link[^>]+rel="canonical"/i.test(html)) errs.push('no canonical');
      if (!/hreflang="en(-[a-z0-9]+)?"/i.test(html) || !/hreflang="es(-[a-z0-9]+)?"/i.test(html) || !/hreflang="x-default"/i.test(html)) errs.push('hreflang pair incomplete');
    }
    for (const img of html.match(/<img\b[^>]*>/gi) || []) {
      if (!/\swidth="?\d/.test(img) || !/\sheight="?\d/.test(img)) errs.push(`img without width/height: ${img.slice(0, 80)}`);
      if (!/\salt="/.test(img)) errs.push(`img without alt: ${img.slice(0, 80)}`);
    }
    if (/<a\b[^>]*href="#?"/i.test(html)) errs.push('href="#" or empty href');
    const tels = [...html.matchAll(/href="tel:([^"]+)"/gi)].map((m) => m[1].replace(/\D/g, ''));
    if (!is404 && !tels.some((d) => d.endsWith('6154107290'))) errs.push('no tel: link to the firm phone');
    const text = visibleText(html);
    for (const s of FORBIDDEN_STRINGS) if (html.includes(s)) errs.push(`forbidden "${s}"`);
    for (const ph of BANNED_PHRASES) if (hasPhrase(text, ph)) errs.push(`banned "${ph}"`);
    const lawText = visibleText(withoutBlockquotes(html)).replace(new RegExp(RESULTS_DISCLAIMER.source, 'gi'), ' ');
    const law = lawText.match(LAW_FORBIDDEN);
    if (law) errs.push(`law-firm rule "${law[0]}"`);
    if (RESULTS_WORDS.test(text) && !RESULTS_DISCLAIMER.test(text)) errs.push('results mentioned without disclaimer');
    const bodyHtml = html.replace(/^[\s\S]*?<body\b[^>]*>/i, '').replace(/<(script|style|template)\b[\s\S]*?<\/\1>/gi, ' ');
    for (const m of bodyHtml.matchAll(/free(?:\s|&nbsp;|&#160;|<[^>]*>)+consultation|consulta(?:\s|&nbsp;|&#160;|<[^>]*>)+gratuita/gi)) {
      const win = bodyHtml.slice(Math.max(0, m.index - 900), m.index + 900);
      if (!/href="tel:/.test(win)) { errs.push(`"${visibleText(m[0]).trim()}" not beside a tel: link`); break; }
    }
    if (!is404 && !LEGAL_LINE.test(text)) errs.push('footer legal line missing');
    for (const src of html.match(/<script[^>]+src="[^"]+"/gi) || []) if (TRACKERS.test(src)) errs.push(`tracker loaded statically: ${src}`);
    if (SECRET.test(html)) errs.push('possible secret in HTML');
    if (errs.length) { pageErrors++; problems.push(`${url}: ${errs.slice(0, 6).join('; ')}`); }
  }
  ok(`page rules on ${pages.length} pages (lang, one h1, title, description, canonical, hreflang, img dims+alt, no href=#, tel, law rules, legal line)`, pageErrors === 0, problems.slice(0, 15).join(' | '));
  const jsFiles = walk('dist', (f) => /\.m?js$/.test(f));
  let gz = jsFiles.reduce((s, f) => s + zlib.gzipSync(fs.readFileSync(f)).length, 0);
  const inline = pages.map((p) => (p.html.match(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi) || []).filter((s) => !/application\/ld\+json/.test(s)).join('')).sort((a, b) => b.length - a.length)[0] || '';
  gz += zlib.gzipSync(Buffer.from(inline)).length;
  ok(`shipped JS ≤ ${JS_BUDGET_GZ / 1024} KB gzipped (tracking off)`, gz <= JS_BUDGET_GZ, `${(gz / 1024).toFixed(1)} KB`);
  const srcFiles = walk('src', (f) => /\.(astro|md|mdx|ts|js|mjs|json|css|html)$/.test(f));
  const srcBanned = [];
  for (const f of srcFiles) { const t = fs.readFileSync(f, 'utf8'); for (const ph of BANNED_PHRASES) if (hasPhrase(t, ph)) srcBanned.push(`${path.relative(ROOT, f)}: ${ph}`); for (const s of FORBIDDEN_STRINGS) if (t.includes(s)) srcBanned.push(`${path.relative(ROOT, f)}: ${s}`); }
  ok('0 banned phrases / forbidden strings in src/', srcBanned.length === 0, srcBanned.slice(0, 8).join('; '));
  const secretFiles = [...srcFiles, ...walk('dist', () => true).filter((f) => !/\.(png|jpe?g|webp|avif|woff2|ico|pdf|zip)$/.test(f)), P('site.config.json')].filter((f) => fs.existsSync(f) && SECRET.test(fs.readFileSync(f, 'utf8')));
  ok('no secrets in src/, dist/, site.config.json', secretFiles.length === 0, secretFiles.map((f) => path.relative(ROOT, f)).join(', '));
  const fams = new Set();
  for (const f of walk('dist', (x) => x.endsWith('.css'))) for (const m of fs.readFileSync(f, 'utf8').matchAll(/@font-face\s*{[^}]*font-family:\s*["']?([^;"'}]+)/g)) fams.add(m[1].trim().toLowerCase());
  for (const f of [...fams]) if (/fallback/.test(f)) fams.delete(f);
  for (const p of pages) for (const m of p.html.matchAll(/@font-face\s*{[^}]*font-family:\s*["']?([^;"'}]+)/g)) fams.add(m[1].trim().toLowerCase());
  for (const f of [...fams]) if (/fallback/.test(f)) fams.delete(f);
  ok('≤ 2 font families', fams.size <= 2, [...fams].join(', '));
  ok('no Google Fonts / external font CDN at runtime', !pages.some((p) => /fonts\.(googleapis|gstatic)\.com/.test(p.html)));

  if (!final) return;
  const sm = sitemap();
  ok('plan/sitemap.json exists', !!sm);
  if (sm) {
    const have = new Set(pages.map((p) => p.url));
    const missing = [];
    for (const pg of sm.pages) {
      if (pg.publish === false) continue;
      for (const k of ['path', 'esPath']) if (pg[k] && !have.has(pagePath(pg[k]))) missing.push(pagePath(pg[k]));
    }
    ok('every SITEMAP page built in EN and ES', missing.length === 0, missing.slice(0, 12).join(', '));
  }
  ok('_redirects exists', exists('dist/_redirects'));
  if (exists('dist/_redirects')) {
    const rules = parseRedirects(read('dist/_redirects'));
    const old = new Set();
    if (exists('inventory/pages.json')) for (const pg of readJSON('inventory/pages.json').pages) old.add(new URL(pg.url).pathname);
    if (exists('inventory/old-urls.json')) for (const u of readJSON('inventory/old-urls.json')) { const s = typeof u === 'string' ? u : u.path; old.add(s.startsWith('http') ? new URL(s).pathname + new URL(s).search : s); }
    const bad = [...old].filter((p) => !resolveOld('dist', rules, p).ok);
    ok(`every old URL is 200 or 301 -> 200 (${old.size})`, old.size > 0 && bad.length === 0, bad.slice(0, 12).join(', '));
    ok('_redirects normalizes www', rules.some((r) => /^https?:\/\/www\./.test(r.from)) || (exists('dist/_headers') && /www/.test(read('dist/_headers'))) || exists('plan/WWW-REDIRECT.md'));
  }
  ok('_headers with HSTS, nosniff, Referrer-Policy, Permissions-Policy, CSP', exists('dist/_headers') && ['Strict-Transport-Security', 'X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy', 'Content-Security-Policy'].every((h) => read('dist/_headers').includes(h)));
  ok('robots.txt references the sitemap', exists('dist/robots.txt') && /sitemap/i.test(read('dist/robots.txt')));
  const smx = walk('dist', (f) => /sitemap.*\.xml$/.test(f)).map((f) => fs.readFileSync(f, 'utf8')).join('\n');
  ok('XML sitemap with hreflang alternates', /<loc>/.test(smx) && /hreflang/.test(smx));
  const ogMissing = pages.filter((p) => !/404/.test(p.url)).filter((p) => { const c = metaContent(p.html, 'property', 'og:image'); if (!c) return true; const u = new URL(c, 'https://x'); return !fs.existsSync(path.join(P('dist'), u.pathname)); }).map((p) => p.url);
  ok('og:image on every page and the file exists', ogMissing.length === 0, ogMissing.slice(0, 10).join(', '));
  ok('favicon set', exists('dist/favicon.ico') || exists('dist/favicon.svg') || exists('dist/favicon-32x32.png'));
  ok('404 page', exists('dist/404.html'));
  ok('modern image formats shipped (AVIF/WebP)', walk('dist', (f) => /\.(avif|webp)$/.test(f)).length > 0);
  if (sm) {
    const legal = sm.pages.filter((pg) => /privacy|accessibility|privacidad|accesibilidad/i.test(pg.path + ' ' + (pg.esPath || '')));
    const noDate = legal.flatMap((pg) => [pg.path, pg.esPath].filter(Boolean)).filter((p) => { const f = P('dist', pagePath(p), 'index.html'); return !fs.existsSync(f) || !/Last reviewed|Última revisión|Ultima revision/i.test(fs.readFileSync(f, 'utf8')); });
    ok('legal pages show a last-reviewed date', legal.length >= 2 && noDate.length === 0, noDate.join(', '));
  }
  const consent = pages.some((p) => /data-consent|id="[^"]*consent/i.test(p.html));
  ok('consent manager present (data-consent / #…consent… markup)', consent);
}

// ---------------------------------------------------------------- gates
function gate0() {
  for (const f of ['CLAUDE.md', 'AGENTS.md', 'plan/STATE.md', 'plan/DECISIONS.md', 'plan/rules/law-firm.md', 'site.config.json', '.mcp.json', 'package.json', 'NEEDS-OWNER.md', 'NEEDS-OPERATOR.md'])
    ok(`exists ${f}`, exists(f));
  for (const t of TOOLS) ok(`exists tools/${t}.mjs`, exists(`tools/${t}.mjs`));
  const briefs = walk('.claude/agents', (f) => /\/A\d{2}-[\w-]+\.md$/.test(f));
  ok(`${AGENT_COUNT} agent briefs in .claude/agents/`, new Set(briefs.map((f) => path.basename(f).slice(0, 3))).size === AGENT_COUNT, `${briefs.length} found`);
  const bad = briefs.filter((f) => { const { data, body } = frontmatter(fs.readFileSync(f, 'utf8')); return !data?.name || !data?.description || !data?.tools || !/30\+ years/.test(body) || !/Obey CLAUDE\.md/.test(body); });
  ok('briefs have name/description/tools, persona line, "Obey CLAUDE.md / AGENTS.md"', bad.length === 0, bad.map((f) => path.basename(f)).join(', '));
  ok('Astro starter builds (dist/index.html)', exists('dist/index.html'));
  ok('Higgsfield probe recorded in DECISIONS', exists('plan/DECISIONS.md') && /higgsfield/i.test(read('plan/DECISIONS.md')));
  const cfg = exists('site.config.json') ? readJSON('site.config.json') : {};
  ok('site.config.json keys empty at start', !cfg.forms?.web3formsAccessKey && !cfg.tracking?.ga4);
}

function gate1() {
  ok('inventory/pages.json', exists('inventory/pages.json'));
  if (!exists('inventory/pages.json')) return;
  const pages = readJSON('inventory/pages.json').pages || [];
  ok('≥ 1 page captured', pages.length >= 1, `${pages.length}`);
  const noText = pages.filter((p) => p.status === 200 && !p.thin && !(p.textFile && exists(p.textFile) && read(p.textFile).replace(/^---[\s\S]*?---/, '').trim().split(/\s+/).length > 20));
  ok('every page has text or is flagged thin', noText.length === 0, noText.map((p) => p.url).join(', '));
  ok('inventory/forms.json', exists('inventory/forms.json'));
  ok('inventory/assets.json', exists('inventory/assets.json'));
  if (exists('inventory/assets.json')) {
    const assets = readJSON('inventory/assets.json');
    const list = Array.isArray(assets) ? assets : assets.assets || [];
    const badKind = list.filter((x) => !['person', 'logo', 'scene'].includes(x.kind));
    ok('every asset classified person|logo|scene', list.length > 0 && badKind.length === 0, `${list.length} assets, ${badKind.length} unclassified`);
  }
  const rawFacts = exists('inventory/facts.json') ? readJSON('inventory/facts.json') : [];
  const facts = Array.isArray(rawFacts) ? rawFacts : rawFacts.facts || [];
  const dup = [...new Set(facts.map((f) => String(f.id)).filter((id, i, a) => a.indexOf(id) !== i))];
  ok('fact ids are unique', dup.length === 0, dup.join(', '));
  ok('≥ 10 facts', facts.length >= 10, `${facts.length}`);
  const malformed = facts.filter((f) => !f.id || !f.claim || !FACT_TYPES.includes(f.type) || !f.source_url || !norm(f.exact_quote));
  ok('facts have id/claim/type/source_url/exact_quote with a known type', malformed.length === 0, malformed.slice(0, 5).map((f) => f.id).join(', '));
  // Every exact_quote must really appear on the cited page (text or HTML).
  const urlKey = (u) => String(u).replace(/#.*$/, '').replace(/^https?:\/\/(www\.)?/i, '//').replace(/\/$/, '');
  const byUrl = new Map(pages.map((p) => [urlKey(p.url), p]));
  const notFound = [];
  for (const f of facts) {
    const pg = byUrl.get(urlKey(f.source_url));
    if (!pg) { notFound.push(`${f.id} (source not crawled)`); continue; }
    const hay = norm((pg.textFile && exists(pg.textFile) ? read(pg.textFile) : '') + ' ' + (pg.htmlFile && exists(pg.htmlFile) ? visibleText(read(pg.htmlFile)) + ' ' + read(pg.htmlFile) : ''));
    if (!hay.includes(norm(f.exact_quote))) notFound.push(f.id);
  }
  ok('every exact_quote is found on its source page', notFound.length === 0, notFound.slice(0, 10).join(', '));
  ok('inventory/CONFLICTS.md', exists('inventory/CONFLICTS.md'));
}

function gate2() {
  for (const id of ['A03', 'A04', 'A05', 'A06', 'A07', 'A08', 'A09']) {
    const f = `audit/${id}.md`;
    ok(`audit ${f} with score + KEEP/FIX/KILL`, exists(f) && /score/i.test(read(f)) && /KEEP/.test(read(f)) && /FIX/.test(read(f)) && /KILL/.test(read(f)));
  }
  ok('audit/MARKET.md (A10)', exists('audit/MARKET.md'));
  for (const f of ['audit/AUDIT.md', 'plan/REVAMP-BRIEF.md', 'plan/SITEMAP.md', 'design/DESIGN-BRIEF.md']) ok(`exists ${f}`, exists(f));
  const sm = sitemap();
  ok('plan/sitemap.json (machine-readable SITEMAP)', !!sm && Array.isArray(sm.pages) && sm.pages.length > 0);
  if (sm && exists('inventory/pages.json')) {
    const covered = new Set();
    for (const pg of sm.pages) { covered.add(pagePath(pg.path)); for (const o of pg.old || []) covered.add(pagePath(o.startsWith('http') ? new URL(o).pathname : o)); }
    for (const r of sm.redirects || []) covered.add(pagePath(r.from.startsWith('http') ? new URL(r.from).pathname : r.from));
    const old = readJSON('inventory/pages.json').pages.map((p) => pagePath(new URL(p.url).pathname));
    const miss = old.filter((p) => !covered.has(p));
    ok('SITEMAP covers 100% of pages.json', miss.length === 0, `${old.length - miss.length}/${old.length}${miss.length ? ' missing ' + miss.join(', ') : ''}`);
    const md = read('plan/SITEMAP.md');
    const mdMiss = old.filter((p) => !md.includes(p));
    ok('SITEMAP.md lists every old URL', mdMiss.length === 0, mdMiss.join(', '));
    ok('every page has an ES twin', sm.pages.filter((pg) => pg.publish !== false && !pg.esPath).length === 0);
    ok('3 pages flagged mockup:true', sm.pages.filter((pg) => pg.mockup).length === 3);
  }
}

function gate2b() {
  ok('copy/VOICE.md', exists('copy/VOICE.md'));
  const sm = sitemap();
  const facts = factsIndex();
  const targets = sm ? sm.pages.filter((pg) => pg.mockup).map((pg) => slugOf(pg.path)) : [];
  ok('three mockup pages named in sitemap', targets.length === 3, targets.join(', '));
  for (const slug of targets) {
    const f = `copy/pages/${slug}.md`;
    if (!exists(f)) { ok(`copy ${f}`, false, 'missing'); continue; }
    const r = validateCopy(f, facts);
    ok(`copy ${f}`, r.errors.length === 0, r.errors.slice(0, 6).join('; '));
    if (r.warnings.length) warn(`copy ${f}`, r.warnings.join('; '));
  }
}

function gate3(rev) {
  const sm = sitemap();
  const slugs = sm ? sm.pages.filter((pg) => pg.mockup).map((pg) => slugOf(pg.path)) : ['index', 'criminal-defense', 'contact-us'];
  for (const d of DIRECTIONS) {
    const base = `mockups/${d}`;
    for (const f of ['tokens.css', 'RATIONALE.md']) ok(`${base}/${f}`, exists(`${base}/${f}`));
    for (const s of slugs) ok(`${base}/dist ${s}`, exists(`${base}/dist/${s === 'index' ? '' : s + '/'}index.html`));
    ok(`${base} components.html`, exists(`${base}/dist/components.html`) || exists(`${base}/dist/components/index.html`) || exists(`${base}/components.html`));
    const shots = walk(`${base}/shots`, (f) => /\.(png|jpe?g|webp)$/.test(f)).map((f) => path.basename(f));
    const missing = slugs.flatMap((s) => [390, 1280].map((w) => `${s.replace(/\//g, '__')}-${w}`)).filter((n) => !shots.some((x) => x.startsWith(n + '.')));
    ok(`${base} screenshots at 390 + 1280`, missing.length === 0, missing.join(', '));
    if (exists(`${base}/tokens.css`)) {
      const pairs = tokenPairs(`${base}/tokens.css`);
      const bad = pairs.filter((p) => !p.pass || !p.resolvable);
      ok(`${base} token pairs pass AA (${pairs.length} declared with @pair)`, pairs.length >= 6 && bad.length === 0, bad.map((p) => `${p.fg} on ${p.bg} ${p.ratio}`).join('; '));
    }
    const html = distHtml(`${base}/dist`);
    const forb = html.filter((p) => FORBIDDEN_STRINGS.some((s) => p.html.includes(s))).map((p) => p.url);
    ok(`${base} free of forbidden strings`, forb.length === 0, forb.join(', '));
  }
  ok('images/PROMPTS.md', exists('images/PROMPTS.md'));
  ok('images/GENERATED.json', exists('images/GENERATED.json'));
  if (exists('images/GENERATED.json')) {
    const g = readJSON('images/GENERATED.json').images || [];
    for (const d of DIRECTIONS) ok(`≥ 3 images logged for direction ${d}`, g.filter((r) => r.set === d).length >= 3);
    const noGuard = g.filter((r) => r.kind === 'generated' && !/no (people|person|humans?|faces?)/i.test(r.prompt || ''));
    ok('every generation prompt forbids people/faces', noGuard.length === 0, noGuard.map((r) => r.slot).join(', '));
    const noCost = g.filter((r) => r.kind === 'generated' && (r.credits === null || r.credits === undefined || !r.model));
    ok('every generated image logs model + credits', noCost.length === 0, noCost.map((r) => r.slot).join(', '));
    if (g.some((r) => r.kind === 'placeholder')) ok('placeholders listed in NEEDS-OPERATOR.md', exists('NEEDS-OPERATOR.md') && /placeholder|higgsfield/i.test(read('NEEDS-OPERATOR.md')));
  }
  ok('mockups/RECOMMENDATION.md', exists('mockups/RECOMMENDATION.md'));
  ok('mockups/COMPARE.html (self-contained)', exists('mockups/COMPARE.html') && !/<img[^>]+src="(?!data:)/.test(read('mockups/COMPARE.html')));
  const zip = `MOCKUPS-rev${rev}.zip`;
  ok(`${zip} ≤ 25 MB`, exists(zip) && fs.statSync(P(zip)).size <= ZIP_LIMIT, exists(zip) ? `${(fs.statSync(P(zip)).size / 1048576).toFixed(1)} MB` : 'missing');
  ok('LOGBOOK-ENTRY.md (mockup form)', exists('LOGBOOK-ENTRY.md') && new RegExp(`MOCKUPS rev ${rev}`).test(read('LOGBOOK-ENTRY.md')));
  ok('plan/STATE.md says WAITING: mockup decision', exists('plan/STATE.md') && /WAITING: mockup decision/.test(read('plan/STATE.md')));
}

function gate4() {
  const sm = sitemap();
  ok('plan/sitemap.json', !!sm);
  if (!sm) return;
  const facts = factsIndex();
  let errs = 0, warns = 0;
  const problems = [];
  const missing = [];
  for (const pg of sm.pages.filter((x) => x.publish !== false && x.copy !== false)) {
    const slug = slugOf(pg.path);
    const en = `copy/pages/${slug}.md`, es = `copy/pages/es/${slug}.md`;
    if (!exists(en)) { missing.push(en); continue; }
    const r = validateCopy(en, facts);
    errs += r.errors.length; warns += r.warnings.length;
    if (r.errors.length) problems.push(`${en}: ${r.errors.slice(0, 3).join('; ')}`);
    if (!exists(es)) { missing.push(es); continue; }
    const rs = validateCopy(es, facts, { esOf: r.ids });
    errs += rs.errors.length;
    if (rs.errors.length) problems.push(`${es}: ${rs.errors.slice(0, 3).join('; ')}`);
  }
  ok('every EN and ES page has a copy file', missing.length === 0, missing.slice(0, 12).join(', '));
  ok('0 unsourced facts, 0 banned phrases, frontmatter valid, law rules (EN + ES)', errs === 0, problems.slice(0, 12).join(' | '));
  if (warns) warn('warn phrases remain', `${warns}`);
  ok('copy/FACT-CHECK.md', exists('copy/FACT-CHECK.md'));
}

const verdict = (t) => { const v = [...t.matchAll(/^[^\w\n]*Result:[^\w\n]*(PASS|FAIL)[^\w\n]*$/gim)].map((m) => m[1].toUpperCase()); return v.includes('FAIL') ? 'FAIL' : v.length ? 'PASS' : null; };
function gate6() {
  const blocked = exists('plan/BLOCKED.md') ? read('plan/BLOCKED.md') : '';
  for (const c of QA_CHECKS) {
    const f = `qa/${c}.md`;
    if (!exists(f)) { ok(`qa ${c}`, false, 'report missing (a check that did not run is a failure)'); continue; }
    const t = read(f);
    const pass = verdict(t) === 'PASS';
    const fail = verdict(t) === 'FAIL';
    ok(`qa ${c}`, pass || (fail && blocked.includes(c)), pass ? 'PASS' : fail ? 'FAIL, explained in BLOCKED.md' : 'no Result line');
  }
  // Honesty: the numbers must agree with the PASS claims.
  if (exists('qa/lighthouse.json')) {
    const r = readJSON('qa/lighthouse.json').results || [];
    const bad = r.filter((x) => x.error || x.performance < LH.performance || x.accessibility < LH.accessibility || x.bestPractices < LH.bestPractices || x.seo < LH.seo || x.lcpMs > LH.lcpMs || x.cls > LH.cls || x.tbtMs > LH.tbtMs);
    const claimsPass = exists('qa/02-lighthouse.md') && verdict(read('qa/02-lighthouse.md')) === 'PASS';
    ok('Lighthouse numbers agree with qa/02 result', r.length > 0 && (bad.length === 0 || !claimsPass), `${bad.length}/${r.length} pages under threshold`);
  } else ok('qa/lighthouse.json exists', false);
  if (exists('qa/axe.json')) {
    const r = readJSON('qa/axe.json').results || [];
    const bad = r.filter((x) => x.error || x.critical || x.serious);
    const claimsPass = exists('qa/03-accessibility.md') && verdict(read('qa/03-accessibility.md')) === 'PASS';
    ok('axe numbers agree with qa/03 result', r.length > 0 && (bad.length === 0 || !claimsPass), `${bad.length} pages with critical/serious`);
  } else ok('qa/axe.json exists', false);
  if (exists('qa/links.json')) {
    const r = readJSON('qa/links.json');
    const bad = (r.brokenInternal || []).length + (r.oldUrlFailures || []).length;
    const claimsPass = exists('qa/04-links.md') && verdict(read('qa/04-links.md')) === 'PASS';
    ok('link numbers agree with qa/04 result', bad === 0 || !claimsPass, `${bad} broken`);
  } else ok('qa/links.json exists', false);
}

// ---------------------------------------------------------------- main
const argv = process.argv.slice(2);
const flag = (k) => argv.includes(k);
const val = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : undefined; };

if (flag('--record-hash')) {
  if (exists('plan/CHECK-HASH')) { console.error('plan/CHECK-HASH already exists — check.mjs is locked.'); process.exit(1); }
  fs.mkdirSync(P('plan'), { recursive: true });
  fs.writeFileSync(P('plan/CHECK-HASH'), `${sha256(SELF)}  tools/check.mjs\n`);
  console.log('recorded', sha256(SELF));
  process.exit(0);
}

const recorded = exists('plan/CHECK-HASH') ? read('plan/CHECK-HASH').split(/\s+/)[0] : null;
ok('tools/check.mjs hash matches plan/CHECK-HASH', recorded && recorded === sha256(SELF), recorded ? '' : 'no hash recorded');

const gate = val('--gate');
const label = gate ? `gate-${gate}` : flag('--final') ? 'final' : flag('--build') ? 'build' : null;
if (!label) { console.error('usage: --gate 0|1|2|2b|3|4|6 | --build | --final'); process.exit(1); }
guard(label, () => {
  if (gate === '0') gate0();
  else if (gate === '1') gate1();
  else if (gate === '2') gate2();
  else if (gate === '2b') gate2b();
  else if (gate === '3') gate3(Number(val('--rev') || 1));
  else if (gate === '4') gate4();
  else if (gate === '6') { gate6(); checkBuiltSite({ final: true }); }
  else if (flag('--final')) checkBuiltSite({ final: true });
  else if (flag('--build')) checkBuiltSite({ final: false });
  else ok(`unknown gate ${gate}`, false);
});
fs.mkdirSync(P('plan/checks'), { recursive: true });
fs.writeFileSync(P(`plan/checks/${label}.json`), JSON.stringify({ at: new Date().toISOString(), pass: failed === 0, failed, results }, null, 2) + '\n');
console.log(`\n${failed === 0 ? 'GATE PASSED' : `GATE FAILED (${failed})`} — ${label}`);
process.exit(failed === 0 ? 0 : 1);
