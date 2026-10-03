// Shared helpers for tools/*. check.mjs does NOT import this file (it is hash-locked and self-contained).
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const rel = (p) => path.relative(ROOT, p);
export const abs = (p) => (path.isAbsolute(p) ? p : path.join(ROOT, p));

export function ensureDir(d) {
  fs.mkdirSync(abs(d), { recursive: true });
  return abs(d);
}
export function readJSON(p, fallback) {
  try {
    return JSON.parse(fs.readFileSync(abs(p), 'utf8'));
  } catch (e) {
    if (fallback !== undefined) return fallback;
    throw e;
  }
}
export function writeJSON(p, data) {
  ensureDir(path.dirname(abs(p)));
  fs.writeFileSync(abs(p), JSON.stringify(data, null, 2) + '\n');
}
export function writeText(p, text) {
  ensureDir(path.dirname(abs(p)));
  fs.writeFileSync(abs(p), text);
}

/** Parse --flag value / --flag pairs. Repeated flags become arrays. */
export function args(argv = process.argv.slice(2)) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) { out._.push(a); continue; }
    const key = a.slice(2);
    const next = argv[i + 1];
    const val = next === undefined || next.startsWith('--') ? true : (i++, next);
    if (key in out) out[key] = [].concat(out[key], val);
    else out[key] = val;
  }
  return out;
}

/** URL path -> slug. "/" -> "index"; "/criminal-defense/dui/" -> "criminal-defense/dui". */
export function slugFromPath(p) {
  const clean = p.replace(/[?#].*$/, '').replace(/^\/+|\/+$/g, '');
  return clean === '' ? 'index' : clean;
}
export function slugFromUrl(u) {
  return slugFromPath(new URL(u).pathname);
}
export const fileSlug = (slug) => slug.replace(/\//g, '__');

/** Find a Chromium binary: Playwright's own resolution first, then /opt/pw-browsers. */
export function chromiumPath() {
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  try {
    const dirs = fs.readdirSync(base).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse();
    for (const d of dirs) {
      const p = path.join(base, d, 'chrome-linux', 'chrome');
      if (fs.existsSync(p)) return p;
    }
  } catch {}
  return undefined;
}

export async function launchBrowser() {
  const { chromium } = await import('playwright');
  const opts = { args: ['--no-sandbox', '--disable-gpu'] };
  try {
    return await chromium.launch(opts);
  } catch (e) {
    const exe = chromiumPath();
    if (!exe) throw e;
    return chromium.launch({ ...opts, executablePath: exe });
  }
}

/**
 * Contexts ignore TLS errors because the sandbox proxy re-signs live-site certificates, and route every
 * remote request through Node's fetch: Chromium's own networking through the sandbox proxy randomly fails
 * requests with ERR_TOO_MANY_RETRIES (pages, CSS, images, fonts). Localhost requests go direct.
 * Analytics/ad beacons are aborted (they never affect rendering).
 */
const BEACONS = /google-analytics\.com|googletagmanager\.com\/(gtag|gtm)|\/g\/collect|doubleclick\.net|connect\.facebook\.net|facebook\.com\/tr|analytics\.tiktok\.com|clarity\.ms|hotjar/;
export async function newContext(browser, extra = {}) {
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true, userAgent: UA, ...extra });
  await routeViaNode(ctx);
  return ctx;
}
export async function routeViaNode(target, { concurrency = 6 } = {}) {
  let active = 0;
  const q = [];
  const acquire = () => new Promise((r) => { if (active < concurrency) { active++; r(); } else q.push(r); });
  const release = () => { const n = q.shift(); if (n) n(); else active--; };
  await target.route(/^https?:\/\/(?!127\.0\.0\.1|localhost)/, async (route) => {
    const req = route.request();
    if (BEACONS.test(req.url())) return route.abort('blockedbyclient').catch(() => {});
    await acquire();
    try {
      const headers = { ...req.headers() };
      delete headers.host;
      let res = null;
      for (let i = 0; i < 3 && !res; i++) {
        try {
          res = await fetch(req.url(), { method: req.method(), headers, body: req.postDataBuffer() || undefined, redirect: 'manual', signal: AbortSignal.timeout(60000) });
        } catch { await sleep(1500 * (i + 1)); }
      }
      if (!res) return await route.abort('failed');
      const body = Buffer.from(await res.arrayBuffer());
      const h = {};
      res.headers.forEach((v, k) => { if (!['content-encoding', 'content-length', 'transfer-encoding', 'connection', 'set-cookie'].includes(k)) h[k] = v; });
      await route.fulfill({ status: res.status, headers: h, body });
    } catch {
      await route.abort('failed').catch(() => {});
    } finally {
      release();
    }
  });
}

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2',
  '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain', '.pdf': 'application/pdf',
  '.webmanifest': 'application/manifest+json',
};

/** Parse a Cloudflare Pages _redirects file into [{from, to, status}]. */
export function parseRedirects(text) {
  return text
    .split('\n')
    .map((l) => l.replace(/(^|\s)#.*$/, '').trim())
    .filter(Boolean)
    .map((l) => {
      const [from, to, status] = l.split(/\s+/);
      return { from, to, status: Number(status || 302) };
    });
}
export function matchRedirect(rules, pathname) {
  for (const r of rules) {
    if (r.from.startsWith('http')) continue; // host rules handled by Cloudflare, not locally
    if (r.from.endsWith('*')) {
      const base = r.from.slice(0, -1);
      if (pathname.startsWith(base)) return { ...r, to: r.to.replace(':splat', pathname.slice(base.length)) };
    } else if (r.from === pathname || r.from === pathname.replace(/\/$/, '') || r.from + '/' === pathname) {
      return r;
    }
  }
  return null;
}

/**
 * Serve a static directory the way Cloudflare Pages would (dir/index.html, 404.html, _redirects).
 * Returns { url, close }.
 */
export function serve(dir, port = 0) {
  const root = abs(dir);
  const redirectsFile = path.join(root, '_redirects');
  const rules = fs.existsSync(redirectsFile) ? parseRedirects(fs.readFileSync(redirectsFile, 'utf8')) : [];
  const server = http.createServer((req, res) => {
    const u = new URL(req.url, 'http://x');
    let p = decodeURIComponent(u.pathname);
    const candidates = [p, path.join(p, 'index.html'), p + '.html'];
    for (const c of candidates) {
      const f = path.join(root, c);
      if (f.startsWith(root) && fs.existsSync(f) && fs.statSync(f).isFile()) {
        const type = MIME[path.extname(f)] || 'application/octet-stream';
        // Cloudflare Pages compresses text responses at the edge; do the same so local Lighthouse runs measure
        // the bytes a visitor actually downloads (A23 P800). Binary formats (woff2, images) are already compressed.
        if (/^(text\/|application\/(javascript|json|xml|manifest\+json))|image\/svg/.test(type) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
          res.writeHead(200, { 'content-type': type, 'content-encoding': 'gzip', vary: 'accept-encoding' });
          return fs.createReadStream(f).pipe(zlib.createGzip()).pipe(res);
        }
        res.writeHead(200, { 'content-type': type });
        return fs.createReadStream(f).pipe(res);
      }
    }
    const r = matchRedirect(rules, p);
    if (r) {
      res.writeHead(r.status, { location: r.to });
      return res.end();
    }
    const nf = path.join(root, '404.html');
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    if (fs.existsSync(nf)) return fs.createReadStream(nf).pipe(res);
    res.end('not found');
  });
  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      const { port: actual } = server.address();
      resolve({ url: `http://127.0.0.1:${actual}`, close: () => new Promise((r) => server.close(r)) });
    });
  });
}

/** List files recursively. */
export function walk(dir, filter = () => true) {
  const out = [];
  const d = abs(dir);
  if (!fs.existsSync(d)) return out;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out.push(...walk(p, filter));
    else if (filter(p)) out.push(p);
  }
  return out;
}

// Pages of a built site: dist/<dir>/index.html (and top-level .html) -> URL paths.
export function distPages(dir) {
  const root = abs(dir);
  return walk(root, (p) => p.endsWith('.html'))
    .map((f) => '/' + path.relative(root, f).replace(/index\.html$/, '').replace(/\.html$/, '/'))
    .map((p) => p.replace(/\/+/g, '/'))
    .sort();
}

/** Fetch with retry/backoff on network or proxy refusals. */
export async function fetchRetry(url, opts = {}, tries = 4) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { redirect: 'follow', ...opts, headers: { 'user-agent': UA, ...(opts.headers || {}) } });
      if (r.status === 403 && i < tries - 1 && /CONNECT|proxy/i.test(r.statusText)) throw new Error('proxy refused');
      return r;
    } catch (e) {
      last = e;
      await sleep(2000 * 2 ** i);
    }
  }
  throw last;
}
