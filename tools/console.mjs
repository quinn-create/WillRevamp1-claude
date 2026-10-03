#!/usr/bin/env node
// Console / CSP QA for a built site (A24). Serves dist, loads every page (EN + ES) with the production
// Content-Security-Policy from dist/_headers applied as a response header on every local document, scrolls to the
// bottom (lazy images), and collects: console errors (and warnings), uncaught page errors, CSP violations
// (securitypolicyviolation listener injected before any page script), failed / >= 400 subresource requests and any
// attempt to contact a non-local host (aborted; tracking is off, so there should be none).
// `upgrade-insecure-requests` is dropped for the local http:// test only (it would rewrite 127.0.0.1 requests).
// Usage: node tools/console.mjs --dist dist --out qa/console.json [--paths /,/es/] [--widths 1280,390]
import fs from 'node:fs';
import path from 'node:path';
import { args, abs, serve, distPages, launchBrowser, writeJSON } from './lib.mjs';

const a = args();
const DIST = a.dist || 'dist';
const WIDTHS = String(a.widths || '1280,390').split(',').map(Number);

function headersFor(dist) {
  const text = fs.readFileSync(path.join(abs(dist), '_headers'), 'utf8');
  const out = {};
  let inAll = false;
  for (const line of text.split('\n')) {
    if (/^\S/.test(line)) { inAll = line.trim() === '/*'; continue; }
    if (!inAll) continue;
    const m = line.match(/^\s+([A-Za-z-]+):\s*(.*)$/);
    if (m) out[m[1]] = m[2].trim();
  }
  return out;
}

async function main() {
  const hdrs = headersFor(DIST);
  const cspFull = hdrs['Content-Security-Policy'];
  if (!cspFull) throw new Error('no Content-Security-Policy in dist/_headers /* block');
  const csp = cspFull.split(';').map((s) => s.trim()).filter((s) => s && s !== 'upgrade-insecure-requests').join('; ');
  const server = await serve(DIST);
  const paths = a.paths ? String(a.paths).split(',') : distPages(DIST).filter((p) => !p.startsWith('/_'));
  const browser = await launchBrowser();
  const results = [];
  for (const w of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w < 768 ? 844 : 900 } });
    await ctx.addInitScript(() => {
      window.__csp = [];
      document.addEventListener('securitypolicyviolation', (e) => {
        window.__csp.push({ directive: e.violatedDirective, effective: e.effectiveDirective, blocked: e.blockedURI, source: e.sourceFile, line: e.lineNumber, sample: e.sample, disposition: e.disposition });
      });
    });
    let external = [];
    await ctx.route(/^https?:\/\/(?!127\.0\.0\.1|localhost)/, (r) => { external.push(r.request().url()); return r.abort('blockedbyclient'); });
    await ctx.route(/^http:\/\/127\.0\.0\.1/, async (r) => {
      if (r.request().resourceType() !== 'document') return r.continue();
      const res = await r.fetch();
      return r.fulfill({ response: res, headers: { ...res.headers(), 'content-security-policy': csp } });
    });
    for (const p of paths) {
      external = [];
      const page = await ctx.newPage();
      const consoleMsgs = [], pageErrors = [], failed = [];
      page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') consoleMsgs.push({ type: m.type(), text: m.text().slice(0, 400), loc: m.location()?.url ? `${m.location().url.replace(server.url, '')}:${m.location().lineNumber}` : undefined }); });
      page.on('pageerror', (e) => pageErrors.push(String(e.message || e).slice(0, 400)));
      page.on('requestfailed', (rq) => { if (!/^https?:\/\/(?!127\.0\.0\.1)/.test(rq.url())) failed.push({ url: rq.url().replace(server.url, ''), error: rq.failure()?.errorText }); });
      page.on('response', (rs) => { if (rs.status() >= 400 && rs.request().resourceType() !== 'document') failed.push({ url: rs.url().replace(server.url, ''), status: rs.status() }); });
      let docStatus = null, err = null, csp = [];
      try {
        const resp = await page.goto(server.url + p, { waitUntil: 'load', timeout: 120000 });
        docStatus = resp?.status();
        await page.evaluate(async () => {
          for (let y = 0; y < document.documentElement.scrollHeight; y += Math.round(innerHeight * 0.8)) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
          scrollTo(0, document.documentElement.scrollHeight);
          await new Promise((r) => setTimeout(r, 300));
        });
        await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        csp = await page.evaluate(() => window.__csp || []);
      } catch (e) { err = String(e.message || e).split('\n')[0]; }
      await page.close();
      const entry = { path: p, width: w, status: docStatus, consoleErrors: consoleMsgs.filter((m) => m.type === 'error'), consoleWarnings: consoleMsgs.filter((m) => m.type === 'warning'), pageErrors, cspViolations: csp, failedRequests: failed, externalRequests: [...new Set(external)], ...(err ? { error: err } : {}) };
      results.push(entry);
      const n = entry.consoleErrors.length + pageErrors.length + csp.length + failed.length + entry.externalRequests.length;
      console.log(`${n ? 'ISSUES' : 'ok    '} ${w} ${p}  console-err ${entry.consoleErrors.length} warn ${entry.consoleWarnings.length} page-err ${pageErrors.length} csp ${csp.length} failed ${failed.length} external ${entry.externalRequests.length}${err ? ' ERR ' + err : ''}`);
    }
    await ctx.close();
  }
  await browser.close();
  await server.close();
  const sum = (k) => results.reduce((s, r) => s + (Array.isArray(r[k]) ? r[k].length : 0), 0);
  const summary = { pages: paths.length, widths: WIDTHS, loads: results.length, consoleErrors: sum('consoleErrors'), consoleWarnings: sum('consoleWarnings'), pageErrors: sum('pageErrors'), cspViolations: sum('cspViolations'), failedRequests: sum('failedRequests'), externalRequests: sum('externalRequests'), loadErrors: results.filter((r) => r.error).length };
  writeJSON(a.out || 'qa/console.json', { generatedAt: new Date().toISOString(), csp, note: 'CSP from dist/_headers applied as a response header; upgrade-insecure-requests dropped for the local http test.', summary, results });
  console.log(JSON.stringify(summary));
}
main().catch((e) => { console.error(e); process.exit(1); });
