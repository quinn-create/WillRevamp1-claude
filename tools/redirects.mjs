#!/usr/bin/env node
// A23 P700: public/_redirects for Cloudflare Pages, rebuilt from the plan on every build.
//
// Sources: plan/sitemap.json "redirects", every page's "old" list, inventory/old-urls.json.
// Rules:
//  - one hop, 301, target is always a real built page (the sitemap page that owns the old URL);
//  - exact paths; old URLs that are not real pages get both "/x/" and "/x" forms (Cloudflare matches literally);
//  - splats only for whole trees that are gone (/wp-content/uploads/*, /feed/*, /comments/feed/*), listed AFTER
//    the exact rules because Cloudflare applies the first match;
//  - never ":placeholder" syntax; never a rule whose source is a real page (it would shadow the page);
//  - query-string URLs (/?p=95) cannot be matched by _redirects; they are skipped here and handed to the
//    operator (plan/fragments/A23/needs-operator.md: Redirect Rule / Pages Function snippet);
//  - hosts cannot be matched either: www -> apex is plan/WWW-REDIRECT.md.
// Usage: node tools/redirects.mjs   (also run by `npm run build` before astro build)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (...a) => path.join(ROOT, ...a);
const sm = JSON.parse(fs.readFileSync(P('plan/sitemap.json'), 'utf8'));
const cfg = JSON.parse(fs.readFileSync(P('site.config.json'), 'utf8'));
const oldUrls = fs.existsSync(P('inventory/old-urls.json')) ? JSON.parse(fs.readFileSync(P('inventory/old-urls.json'), 'utf8')) : [];
const normPath = (p) => { const s = String(p || '/').replace(/[?#].*$/, '').replace(/^\/+|\/+$/g, ''); return s ? `/${s}/` : '/'; };

// ------------------------------------------------------------------ real pages (never a redirect source)
const blogOn = !!cfg.blog?.enabled;
const real = new Set();
for (const pg of sm.pages) {
  const live = normPath(pg.path) === '/blog/' ? blogOn : pg.publish !== false || normPath(pg.path) === '/404/';
  if (!live) continue;
  for (const p of [pg.path, pg.esPath].filter(Boolean)) real.add(normPath(p));
}
const isReal = (from) => !/[?*]/.test(from) && !/\.[a-z0-9]+$/i.test(from) && real.has(normPath(from));

// ------------------------------------------------------------------ collect source -> target
const map = new Map(); // from -> to
const query = new Map(); // "/?p=95" -> to (operator)
const owner = (old) => sm.pages.find((pg) => (pg.old || []).includes(old) && pg.publish !== false);
function add(from, to, why) {
  if (!from || !to) return;
  from = from.startsWith('http') ? new URL(from).pathname + new URL(from).search : from;
  if (from.includes('?')) { if (!query.has(from)) query.set(from, normPath(to)); return; }
  if (isReal(from)) return; // a real page answers 200 itself
  if (!map.has(from)) map.set(from, { to: normPath(to), why });
}
// 1. explicit plan redirects
for (const r of sm.redirects || []) add(r.from, r.to, 'sitemap');
// 2. page "old" lists -> owning page
for (const pg of sm.pages) {
  if (pg.publish === false) continue;
  for (const o of pg.old || []) add(o, pg.path, 'old');
}
// 3. inventory/old-urls.json: redirects keep their target; everything else maps to the page that lists it
for (const u of oldUrls) {
  const p = typeof u === 'string' ? u : u.path;
  const pg = owner(p);
  if (u.to && u.kind === 'redirect') add(p, u.to, 'old-urls');
  else if (pg) add(p, pg.path, 'old-urls');
}
// Blog off: /blog/ goes home (the sitemap rule); with the blog on it is a real page and isReal() drops it.

// Resolve chains so every rule is one hop to a real page.
const resolve = (to, seen = new Set()) => { const r = map.get(to); return r && !seen.has(to) ? resolve(r.to, seen.add(to)) : to; };
for (const [from, r] of map) r.to = resolve(r.to);
const sitemapFiles = new Set(['/sitemap-index.xml']);
const bad = [...map].filter(([, r]) => !real.has(r.to) && !sitemapFiles.has(r.to.replace(/\/$/, '')));
for (const [from, r] of map) if (sitemapFiles.has(r.to.replace(/\/$/, ''))) r.to = r.to.replace(/\/$/, '');
if (bad.length) { console.error('redirects: targets that are not real pages:\n' + bad.map(([f, r]) => `  ${f} -> ${r.to}`).join('\n')); process.exit(1); }

// ------------------------------------------------------------------ emit
const exact = [], splat = [];
for (const [from, r] of map) (from.endsWith('*') ? splat : exact).push([from, r.to]);
const lines = [];
const seenFrom = new Set();
const push = (from, to) => { if (seenFrom.has(from) || isReal(from) || from === to) return; seenFrom.add(from); lines.push(`${from} ${to} 301`); };
for (const [from, to] of exact) {
  push(from, to);
  // slash variants for directory-style old URLs (not for files like /x/index.html or /sitemap.xml)
  if (!/\.[a-z0-9]+$/i.test(from)) push(from.endsWith('/') ? from.replace(/\/$/, '') : from + '/', to);
}
// default splats for gone WordPress trees (after the exact rules: first match wins)
for (const [from, to] of [['/feed/*', '/'], ['/comments/feed/*', '/'], ...splat]) push(from, to);
const header = [
  '# Cloudflare Pages redirects — generated by tools/redirects.mjs from plan/sitemap.json, inventory/old-urls.json.',
  '# Do not edit by hand. One hop, 301, exact paths first, splats last (first match wins).',
  '# Query-string URLs (/?p=…) and www -> apex cannot be expressed here: see NEEDS-OPERATOR.md and plan/WWW-REDIRECT.md.',
];
fs.writeFileSync(P('public/_redirects'), header.join('\n') + '\n' + lines.join('\n') + '\n');
const qs = [...query].map(([f, t]) => ({ from: f, to: t }));
fs.mkdirSync(P('.cache'), { recursive: true });
fs.writeFileSync(P('.cache/query-redirects.json'), JSON.stringify(qs, null, 1));
console.log(`redirects: ${lines.length} rules -> public/_redirects (${lines.filter((l) => l.split(' ')[0].endsWith('*')).length} splats); ${qs.length} query-string URLs for the operator`);
