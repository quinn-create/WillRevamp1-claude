#!/usr/bin/env node
// Link checker for a built site.
//  1. every internal href/src in dist resolves (file, or _redirects -> file)
//  2. every OLD url (inventory/pages.json + inventory/old-urls.json) is 200 or 301 -> 200 locally
//  3. optional --external: GET each external link once (report only; many sites block bots)
// Usage: node tools/links.mjs --dist dist --out qa/links.json [--external]
import fs from 'node:fs';
import path from 'node:path';
import { args, abs, walk, readJSON, writeJSON, parseRedirects, matchRedirect, fetchRetry } from './lib.mjs';

const a = args();
const DIST = abs(a.dist || 'dist');
const rules = fs.existsSync(path.join(DIST, '_redirects')) ? parseRedirects(fs.readFileSync(path.join(DIST, '_redirects'), 'utf8')) : [];

function fileFor(p) {
  const clean = decodeURIComponent(p.replace(/[?#].*$/, ''));
  for (const c of [clean, path.join(clean, 'index.html'), clean.replace(/\/$/, '') + '.html']) {
    const f = path.join(DIST, c);
    if (f.startsWith(DIST) && fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  }
  return null;
}
/** Resolve like Cloudflare Pages: static file wins, else _redirects (up to 4 hops). */
export function resolvePath(p) {
  const hops = [];
  let cur = p;
  for (let i = 0; i < 5; i++) {
    const f = fileFor(cur);
    if (f) return { ok: true, status: hops.length ? hops[0].status : 200, final: cur, hops };
    const r = matchRedirect(rules, cur.replace(/[?#].*$/, ''));
    if (!r) return { ok: false, status: 404, final: cur, hops };
    hops.push({ from: cur, to: r.to, status: r.status });
    if (/^https?:/.test(r.to)) {
      const u = new URL(r.to);
      cur = u.pathname + u.search;
    } else cur = r.to;
  }
  return { ok: false, status: 508, final: cur, hops };
}

const htmlFiles = walk(DIST, (f) => f.endsWith('.html'));
const broken = [];
const external = new Map();
const hashOnly = [];
for (const f of htmlFiles) {
  const html = fs.readFileSync(f, 'utf8');
  const pagePath = '/' + path.relative(DIST, f).replace(/index\.html$/, '');
  const refs = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g), ...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) =>
    m[0].includes('srcset') ? m[1].split(',').map((s) => s.trim().split(/\s+/)[0]) : [m[1]]);
  for (const r of refs) {
    if (r === '#' || r === '') { hashOnly.push(pagePath); continue; }
    if (/^(mailto:|tel:|data:|javascript:|#)/.test(r)) continue;
    if (/^https?:\/\//.test(r) || r.startsWith('//')) {
      const u = new URL(r.startsWith('//') ? 'https:' + r : r);
      if (/willfraleylaw\.com$/.test(u.host)) {
        const res = resolvePath(u.pathname);
        if (!res.ok) broken.push({ page: pagePath, ref: r, why: 'absolute self-link does not resolve' });
      } else {
        if (!external.has(u.href)) external.set(u.href, new Set());
        external.get(u.href).add(pagePath);
      }
      continue;
    }
    const target = r.startsWith('/') ? r : path.posix.join(path.posix.dirname(pagePath.endsWith('/') ? pagePath + 'x' : pagePath), r);
    const res = resolvePath(target);
    if (!res.ok) broken.push({ page: pagePath, ref: r, why: `resolves to ${res.status}` });
  }
}

const oldUrls = new Set();
for (const p of readJSON('inventory/pages.json', { pages: [] }).pages) oldUrls.add(new URL(p.url).pathname);
for (const u of readJSON('inventory/old-urls.json', [])) oldUrls.add(typeof u === 'string' ? (u.startsWith('http') ? new URL(u).pathname + new URL(u).search : u) : u.path);
const old = [...oldUrls].sort().map((p) => {
  const r = resolvePath(p);
  const good = r.ok && (r.hops.length === 0 || r.hops[0].status === 301);
  return { path: p, ok: good, status: r.status, final: r.final, hops: r.hops.length };
});

const ext = [];
if (a.external) {
  for (const [u, pages] of external) {
    let status = 0;
    try { status = (await fetchRetry(u, { method: 'GET' }, 2)).status; } catch { status = -1; }
    ext.push({ url: u, status, pages: [...pages] });
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  pages: htmlFiles.length,
  brokenInternal: broken,
  hashOnlyLinks: [...new Set(hashOnly)],
  oldUrls: old,
  oldUrlFailures: old.filter((o) => !o.ok),
  external: a.external ? ext : [...external.keys()],
};
if (a.out) writeJSON(a.out, report);
console.log(`pages ${report.pages} · broken internal ${broken.length} · href=# on ${report.hashOnlyLinks.length} pages · old URLs ${old.length - report.oldUrlFailures.length}/${old.length} ok`);
process.exit(broken.length || report.oldUrlFailures.length || report.hashOnlyLinks.length ? 1 : 0);
