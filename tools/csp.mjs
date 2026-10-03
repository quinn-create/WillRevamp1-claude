#!/usr/bin/env node
// A23 P700: Content-Security-Policy hashes, post-build (`npm run build` = og + redirects + astro build + csp).
//
// Scans every dist/**/*.html for inline <script> (executable types only: classic + module; JSON-LD and other
// data blocks are not governed by script-src), inline <style> and style="" attributes, computes their
// sha256 hashes, and rewrites dist/_headers from public/_headers by replacing __CSP_SCRIPT_HASHES__ and
// __CSP_STYLE_HASHES__. Fails (exit 1) if a placeholder survives, an inline event handler (onclick=…) is
// found, or the CSP line would exceed Cloudflare's 2,000-character header limit.
// Usage: node tools/csp.mjs [--dist dist]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argDist = process.argv.indexOf('--dist');
const DIST = path.resolve(ROOT, argDist > -1 ? process.argv[argDist + 1] : 'dist');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const sha = (s) => `'sha256-${crypto.createHash('sha256').update(s, 'utf8').digest('base64')}'`;
const EXEC = /^(|text\/javascript|application\/javascript|module)$/i;

const scripts = new Set(), styles = new Set(), attrs = new Set(), problems = [];
for (const f of walk(DIST).filter((x) => x.endsWith('.html'))) {
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/\ssrc\s*=/.test(m[1])) continue;
    const type = (m[1].match(/\stype\s*=\s*"([^"]*)"/i) || [, ''])[1];
    if (!EXEC.test(type.trim())) continue;
    if (m[2].trim()) scripts.add(sha(m[2]));
  }
  for (const m of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) styles.add(sha(m[1]));
  for (const m of html.matchAll(/\sstyle="([^"]*)"/gi)) attrs.add(sha(m[1].replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&')));
  for (const m of html.matchAll(/<[a-z][^>]*\s(on[a-z]+)\s*=/gi)) problems.push(`${path.relative(DIST, f)}: inline handler ${m[1]}`);
}
const styleList = [...styles, ...(attrs.size ? ["'unsafe-hashes'", ...attrs] : [])];

const src = fs.readFileSync(path.join(ROOT, 'public/_headers'), 'utf8');
const out = src
  .replace('__CSP_SCRIPT_HASHES__', [...scripts].sort().join(' '))
  .replace('__CSP_STYLE_HASHES__', styleList.join(' '))
  .replace(/ {2,}(?=;)|(?<=\S) +(?=;)/g, '');
if (/__CSP_[A-Z_]+__/.test(out)) problems.push('a CSP placeholder was not replaced');
const csp = (out.match(/^\s*Content-Security-Policy:.*$/m) || [''])[0];
if (!csp) problems.push('no Content-Security-Policy line in public/_headers');
if (csp.length > 2000) problems.push(`CSP line is ${csp.length} chars (Cloudflare limit 2,000)`);
if (problems.length) { console.error('csp: ' + problems.join('\n  ')); process.exit(1); }
fs.writeFileSync(path.join(DIST, '_headers'), out);
console.log(`csp: ${scripts.size} inline script hash(es), ${styles.size} <style> hash(es), ${attrs.size} style-attribute hash(es) -> dist/_headers (CSP ${csp.trim().length} chars)`);
