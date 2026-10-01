#!/usr/bin/env node
// Lighthouse, mobile preset (Lighthouse's default form factor + simulated throttling).
// Runs ONE page at a time and should run with nothing else loading the CPU. Median of --runs (default 1).
// Usage:
//   node tools/lighthouse.mjs --dist dist --out qa/lighthouse.json [--runs 3] [--paths /,/es/]
//   node tools/lighthouse.mjs --url https://willfraleylaw.com/ --url ... --out audit/lighthouse-before.json
import { spawnSync } from 'node:child_process';
import { args, abs, serve, distPages, chromiumPath, writeJSON, readJSON } from './lib.mjs';

const a = args();
const runs = Number(a.runs || 1);
const CHROME = process.env.CHROME_PATH || chromiumPath();

function once(url) {
  const r = spawnSync(abs('node_modules/.bin/lighthouse'), [
    url, '--output=json', '--output-path=stdout', '--quiet',
    '--only-categories=performance,accessibility,best-practices,seo',
    '--chrome-flags=--headless=new --no-sandbox --disable-gpu --ignore-certificate-errors',
    '--max-wait-for-load=90000',
  ], { env: { ...process.env, CHROME_PATH: CHROME }, encoding: 'utf8', maxBuffer: 512 * 1024 * 1024, timeout: 240000 });
  if (r.status !== 0 || !r.stdout) return { url, error: (r.stderr || 'lighthouse failed').split('\n').slice(-3).join(' ') };
  const j = JSON.parse(r.stdout);
  if (j.runtimeError) return { url, error: j.runtimeError.message };
  const cat = (k) => Math.round((j.categories[k]?.score ?? 0) * 100);
  const au = j.audits;
  const items = au['network-requests']?.details?.items || [];
  const kb = (pred) => Math.round(items.filter(pred).reduce((s, i) => s + (i.transferSize || 0), 0) / 1024);
  return {
    url,
    performance: cat('performance'), accessibility: cat('accessibility'), bestPractices: cat('best-practices'), seo: cat('seo'),
    lcpMs: Math.round(au['largest-contentful-paint']?.numericValue ?? 0),
    cls: Number((au['cumulative-layout-shift']?.numericValue ?? 0).toFixed(3)),
    tbtMs: Math.round(au['total-blocking-time']?.numericValue ?? 0),
    fcpMs: Math.round(au['first-contentful-paint']?.numericValue ?? 0),
    totalKB: Math.round((au['total-byte-weight']?.numericValue ?? 0) / 1024),
    jsKB: kb((i) => i.resourceType === 'Script'), cssKB: kb((i) => i.resourceType === 'Stylesheet'),
    imageKB: kb((i) => i.resourceType === 'Image'), fontKB: kb((i) => i.resourceType === 'Font'),
    requests: items.length,
    failedAudits: Object.values(au).filter((x) => x.score !== null && x.score < 0.9 && x.scoreDisplayMode === 'binary').map((x) => x.id),
  };
}

function median(results) {
  const ok = results.filter((r) => !r.error);
  if (!ok.length) return results[0];
  ok.sort((x, y) => x.performance - y.performance);
  return { ...ok[Math.floor(ok.length / 2)], runs: ok.map((r) => r.performance) };
}

async function main() {
  let server = null, urls = [];
  if (a.dist) {
    server = await serve(a.dist);
    const paths = a.paths ? String(a.paths).split(',') : distPages(a.dist).filter((p) => !p.startsWith('/_') && !/\/404\/?$/.test(p));
    urls = paths.map((p) => server.url + p);
  } else if (a.urls) {
    urls = readJSON(a.urls);
  } else {
    urls = [].concat(a.url || []);
  }
  const out = [];
  for (const u of urls) {
    const rs = [];
    for (let i = 0; i < runs; i++) rs.push(once(u));
    const m = median(rs);
    if (server) m.path = u.slice(server.url.length);
    out.push(m);
    console.log(m.error ? `ERR ${u}: ${m.error}` : `${m.performance}/${m.accessibility}/${m.bestPractices}/${m.seo} LCP ${m.lcpMs} CLS ${m.cls} TBT ${m.tbtMs} ${m.totalKB}KB ${u}`);
    if (a.out) writeJSON(a.out, { generatedAt: new Date().toISOString(), runs, results: out });
  }
  if (server) await server.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
