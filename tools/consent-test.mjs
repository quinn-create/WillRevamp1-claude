#!/usr/bin/env node
// Consent manager test (A22 / P600). Rerunnable by QA.
//
//   node tools/consent-test.mjs        # needs a current `npm run build` in dist/
//
// 1. Off state (the real, empty site.config.json, dist/): no banner and no consent script outside Cookie Settings;
//    Cookie Settings EN/ES render the controls (fieldset disabled until the script runs) and a "Last reviewed" date;
//    Privacy EN/ES show no vendor sections. Live: the controls save a first-party "consent" cookie + localStorage
//    mirror (policy version + timestamp), confirm with a focused status, honor GPC, and nothing external loads.
// 2. Builds into a temporary outDir with DUMMY tracking IDs in a temporary site.config.json (the original file is
//    restored byte-for-byte in `finally`; dist/ is untouched). Every tracker host is intercepted with Playwright
//    (empty 200 responses) and recorded. EN + ES: banner with equal Accept all / Reject all / Settings; no tracker
//    request before a choice; Reject → none, persists over reload; Accept → all four load; Settings → per-category
//    save loads only that category; GPC → no banner and nothing loads; footer "Cookie settings" re-opens the
//    manager; a policy-version change or a newly configured vendor asks again; the localStorage mirror restores a
//    lost cookie; no tracker <script src> in any static page; Privacy shows the configured vendor sections.
// Exit code 0 only if every assertion passed. Results: plan/checks/consent-test.json.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT, launchBrowser, serve, writeJSON, walk, sleep } from './lib.mjs';

const CFG = path.join(ROOT, 'site.config.json');
// Not real IDs; never committed (shaped like public IDs so the build-time validator accepts them).
const DUMMY = { ga4: 'G-TESTA22000', clarity: 'a22test000', metaPixel: '100000000000022', tiktokPixel: 'CTESTA2200000000000' };
const TRACKER = /googletagmanager\.com|google-analytics\.com|clarity\.ms|connect\.facebook\.net|facebook\.com\/tr|analytics\.tiktok\.com/;
const HOSTS = { ga4: /googletagmanager\.com/, clarity: /clarity\.ms/, meta: /connect\.facebook\.net/, tiktok: /analytics\.tiktok\.com/ };

const results = [];
let failures = 0;
const ok = (name, pass, detail = '') => {
  results.push({ name, pass: !!pass, detail: String(detail || '') });
  if (!pass) failures++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);
};
const SETTINGS = { en: '/cookie-settings/', es: '/es/configuracion-de-cookies/' };
const PRIVACY = { en: '/privacy-policy/', es: '/es/politica-de-privacidad/' };
const HOME = { en: '/', es: '/es/' };
const html = (dir, p) => fs.readFileSync(path.join(dir, p, 'index.html'), 'utf8');

function buildWith(tracking, outDir) {
  const original = fs.readFileSync(CFG);
  const restore = () => fs.writeFileSync(CFG, original);
  const onSig = () => { restore(); process.exit(130); };
  process.once('SIGINT', onSig);
  process.once('SIGTERM', onSig);
  try {
    const cfg = JSON.parse(original.toString('utf8'));
    Object.assign(cfg.tracking, tracking);
    fs.writeFileSync(CFG, JSON.stringify(cfg, null, 2) + '\n');
    execFileSync('npx', ['astro', 'build', '--outDir', outDir], { cwd: ROOT, stdio: ['ignore', 'ignore', 'inherit'] });
  } finally {
    restore();
    process.off('SIGINT', onSig);
    process.off('SIGTERM', onSig);
  }
  const back = JSON.parse(fs.readFileSync(CFG, 'utf8'));
  ok('site.config.json restored with empty tracking keys', fs.readFileSync(CFG).equals(original) && !Object.values(back.tracking).some(Boolean));
}

/** A context whose non-local requests are recorded; tracker hosts get an empty 200, everything else is aborted. */
async function context(browser, { gpc = false } = {}) {
  const ctx = await browser.newContext();
  const seen = [];
  await ctx.route((u) => !/^http:\/\/127\.0\.0\.1/.test(u.toString()), (route) => {
    const u = route.request().url();
    seen.push(u);
    if (TRACKER.test(u)) return route.fulfill({ status: 200, contentType: 'application/javascript', body: '' });
    return route.abort();
  });
  if (gpc) await ctx.addInitScript(() => Object.defineProperty(Navigator.prototype, 'globalPrivacyControl', { get: () => true, configurable: true }));
  return { ctx, seen, trackers: () => seen.filter((u) => TRACKER.test(u)) };
}
const consentCookie = async (ctx) => {
  const c = (await ctx.cookies()).find((x) => x.name === 'consent');
  try { return c ? JSON.parse(decodeURIComponent(c.value)) : null; } catch { return 'unparseable'; }
};
const loadedVendors = (urls) => Object.entries(HOSTS).filter(([, re]) => urls.some((u) => re.test(u))).map(([k]) => k).sort().join(',');

// ------------------------------------------------------------------ 1. off state (real dist/)
async function offState(browser) {
  const dist = path.join(ROOT, 'dist');
  if (!fs.existsSync(path.join(dist, 'index.html'))) { ok('dist/ built (run npm run build first)', false); return; }
  const pages = walk(dist, (f) => f.endsWith('.html'));
  const banner = pages.filter((f) => /data-consent="banner"/.test(fs.readFileSync(f, 'utf8')));
  ok('off state: no consent banner on any page (no vendor configured)', banner.length === 0, banner.slice(0, 3).map((f) => path.relative(dist, f)).join(', '));
  const withScript = pages.filter((f) => /data-consent-config/.test(fs.readFileSync(f, 'utf8'))).map((f) => '/' + path.relative(dist, path.dirname(f)) + '/');
  ok('off state: consent script only on Cookie Settings EN/ES', withScript.sort().join(' ') === [SETTINGS.es, SETTINGS.en].sort().join(' '), withScript.join(' '));
  for (const lang of ['en', 'es']) {
    const h = html(dist, SETTINGS[lang]);
    ok(`[${lang}] off state: Cookie Settings controls with data-consent, fieldset disabled before script`, /data-consent="controls"/.test(h) && /<fieldset[^>]*data-consent-enable[^>]*disabled/.test(h));
    ok(`[${lang}] off state: config lists no vendors`, /data-consent-config>\{"v":\d+,"vendors":\{\}\}</.test(h));
    for (const p of [SETTINGS[lang], PRIVACY[lang], lang === 'en' ? '/accessibility/' : '/es/accesibilidad/']) {
      ok(`[${lang}] ${p} shows a last-reviewed date`, /(Last reviewed|Última revisión):?\s*<time datetime="\d{4}-\d{2}-\d{2}">/.test(html(dist, p)));
    }
    const priv = html(dist, PRIVACY[lang]);
    ok(`[${lang}] off state: Privacy shows no vendor sections`, !/Google Analytics|Microsoft Clarity|Meta Pixel|TikTok Pixel|Web3Forms|Turnstile/.test(priv.replace(/<script[\s\S]*?<\/script>/g, '')));
  }

  const srv = await serve('dist');
  try {
    for (const lang of ['en', 'es']) {
      const { ctx, seen } = await context(browser);
      const page = await ctx.newPage();
      await page.goto(srv.url + SETTINGS[lang]);
      const fsDisabled = await page.locator('fieldset[data-consent-enable]').evaluate((e) => e.disabled);
      ok(`[${lang}] live: script enables the controls`, fsDisabled === false);
      const boxes = page.locator('[data-consent="controls"] input[data-consent-cat]');
      ok(`[${lang}] live: two optional switches, none pre-ticked`, (await boxes.count()) === 2 && !(await boxes.nth(0).isChecked()) && !(await boxes.nth(1).isChecked()));
      await boxes.nth(0).check();
      await page.locator('[data-consent="controls"] button[type="submit"]').click();
      await sleep(150);
      const c = await consentCookie(ctx);
      const ls = await page.evaluate(() => { try { return JSON.parse(localStorage.getItem('consent')); } catch { return null; } });
      ok(`[${lang}] live: save stores cookie "consent" {v, ts, analytics, marketing}`, c && c.v === 1 && typeof c.ts === 'string' && c.analytics === true && c.marketing === false, JSON.stringify(c));
      ok(`[${lang}] live: localStorage mirror matches`, ls && ls.ts === c.ts && ls.analytics === true);
      const status = page.locator('[data-consent-status]');
      ok(`[${lang}] live: status confirms and is focused`, ((await status.textContent()) || '').trim().length > 5 && (await status.evaluate((e) => e === document.activeElement)));
      ok(`[${lang}] live: "saved on this device" line`, ((await page.locator('[data-consent-current]').textContent()) || '').trim().length > 10);
      await page.locator('[data-consent="controls"] [data-consent-action="reject"]').click();
      await sleep(100);
      const c2 = await consentCookie(ctx);
      ok(`[${lang}] live: Reject all stores both off`, c2 && c2.analytics === false && c2.marketing === false);
      await page.reload();
      ok(`[${lang}] live: switches reflect the saved choice after reload`, !(await boxes.nth(0).isChecked()) && !(await boxes.nth(1).isChecked()));
      await page.goto(srv.url + HOME[lang]);
      await page.locator('[data-cookie-settings]').first().click();
      await page.waitForLoadState();
      ok(`[${lang}] live: footer "Cookie settings" leads to the settings page`, new URL(page.url()).pathname === SETTINGS[lang]);
      ok(`[${lang}] live: no external request at all`, seen.length === 0, seen.slice(0, 3).join(' '));
      await ctx.close();
    }
    const { ctx } = await context(browser, { gpc: true });
    const page = await ctx.newPage();
    await page.goto(srv.url + SETTINGS.en);
    const disabled = await page.locator('[data-consent="controls"] input[data-consent-cat]').evaluateAll((els) => els.every((e) => e.disabled && !e.checked));
    ok('live GPC: optional switches off and disabled, notice shown', disabled && (await page.locator('[data-consent-gpc]').isVisible()));
    await ctx.close();
  } finally {
    await srv.close();
  }
}

// ------------------------------------------------------------------ 2. configured (dummy IDs)
async function configured(browser, out) {
  const pages = walk(out, (f) => f.endsWith('.html'));
  const staticTrackers = pages.filter((f) => (fs.readFileSync(f, 'utf8').match(/<script[^>]+src="[^"]+"/gi) || []).some((s) => TRACKER.test(s)));
  ok('configured: no tracker <script src> in any static page', staticTrackers.length === 0, staticTrackers.slice(0, 3).join(', '));
  ok('configured: banner markup on every page', pages.filter((f) => !/404/.test(f)).every((f) => /data-consent="banner"/.test(fs.readFileSync(f, 'utf8'))));
  for (const lang of ['en', 'es']) {
    const priv = html(out, PRIVACY[lang]);
    ok(`[${lang}] configured: Privacy shows the configured vendor sections`, /Google Analytics/.test(priv) && /Clarity/.test(priv) && /Meta/.test(priv) && /TikTok/.test(priv));
  }
  const srv = await serve(out);
  const U = (p) => srv.url + p;
  try {
    for (const lang of ['en', 'es']) {
      const T = `[${lang}] configured`;
      // First visit: banner, equal buttons, nothing loaded.
      let { ctx, trackers } = await context(browser);
      let page = await ctx.newPage();
      await page.goto(U(HOME[lang]));
      await sleep(400);
      const banner = page.locator('[data-consent="banner"]');
      ok(`${T}: banner shown on first visit`, await banner.isVisible());
      const cls = await banner.locator('.consent__actions button:visible').evaluateAll((bs) => bs.map((b) => b.className));
      ok(`${T}: Accept all / Reject all / Settings with equal styling`, cls.length === 3 && new Set(cls).size === 1, cls.join(' | '));
      ok(`${T}: banner text in the page language`, lang === 'es' ? /Aceptar todo/.test(await banner.textContent()) : /Accept all/.test(await banner.textContent()));
      ok(`${T}: no tracker request before a choice`, trackers().length === 0, trackers().join(' '));
      await page.mouse.wheel(0, 3000); await sleep(300);
      ok(`${T}: scrolling is not consent`, trackers().length === 0 && (await banner.isVisible()));
      // Reject.
      await banner.locator('[data-consent-action="reject"]').click();
      ok(`${T}: Reject all hides the banner`, !(await banner.isVisible()));
      await page.reload(); await sleep(400);
      ok(`${T}: after Reject + reload: no banner, no tracker`, !(await banner.isVisible()) && trackers().length === 0);
      const rc = await consentCookie(ctx);
      ok(`${T}: stored choice has version, timestamp, vendors`, rc && rc.v === 1 && rc.ts && rc.vendors.length === 4 && !rc.analytics && !rc.marketing, JSON.stringify(rc));
      // Footer link re-opens the manager with the settings panel.
      await page.locator('[data-cookie-settings]').first().click();
      ok(`${T}: footer "Cookie settings" re-opens the banner with settings`, (await banner.isVisible()) && (await page.locator('[data-consent-panel]').isVisible()) && new URL(page.url()).pathname === HOME[lang]);
      ok(`${T}: focus moves into the manager`, await page.evaluate(() => !!document.activeElement?.closest('[data-consent="banner"]')));
      // Analytics only via Settings.
      await banner.locator('input[data-consent-cat="analytics"]').check();
      await banner.locator('[data-consent-action="save"]').click();
      await sleep(400);
      ok(`${T}: Settings → analytics only loads GA4 + Clarity`, loadedVendors(trackers()) === 'clarity,ga4', loadedVendors(trackers()));
      await ctx.close();

      // Accept all.
      ({ ctx, trackers } = await context(browser));
      page = await ctx.newPage();
      await page.goto(U(HOME[lang]));
      await page.locator('[data-consent="banner"] [data-consent-action="accept"]').click();
      await sleep(400);
      ok(`${T}: Accept all loads all four vendors`, loadedVendors(trackers()) === 'clarity,ga4,meta,tiktok', loadedVendors(trackers()));
      const before = trackers().length;
      await page.goto(U(SETTINGS[lang])); await sleep(400);
      ok(`${T}: accepted choice applies on the next page without asking`, !(await page.locator('[data-consent="banner"]').isVisible()) && trackers().length > before);
      ok(`${T}: Cookie Settings reflects the choice`, await page.locator('[data-consent="controls"] input[data-consent-cat]').evaluateAll((els) => els.every((e) => e.checked)));
      // Policy version change → ask again.
      const base = await consentCookie(ctx);
      const put = async (val) => { await ctx.addCookies([{ name: 'consent', value: encodeURIComponent(JSON.stringify(val)), url: srv.url }]); await page.evaluate(() => localStorage.removeItem('consent')); };
      await put({ ...base, v: 0 });
      await page.goto(U(HOME[lang])); await sleep(300);
      ok(`${T}: older policy version → asked again`, await page.locator('[data-consent="banner"]').isVisible());
      await put({ ...base, vendors: ['ga4'] });
      await page.reload(); await sleep(300);
      ok(`${T}: newly configured vendor → asked again`, await page.locator('[data-consent="banner"]').isVisible());
      // localStorage mirror restores a lost cookie.
      await put({ ...base });
      await page.evaluate((v) => localStorage.setItem('consent', JSON.stringify(v)), base);
      await ctx.clearCookies();
      await page.reload(); await sleep(300);
      const restored = await consentCookie(ctx);
      ok(`${T}: localStorage mirror restores the cookie (no banner)`, restored && restored.ts === base.ts && !(await page.locator('[data-consent="banner"]').isVisible()));
      await ctx.close();

      // GPC.
      ({ ctx, trackers } = await context(browser, { gpc: true }));
      page = await ctx.newPage();
      await page.goto(U(HOME[lang])); await sleep(400);
      ok(`${T}: GPC → no banner, no tracker`, !(await page.locator('[data-consent="banner"]').isVisible()) && trackers().length === 0);
      await ctx.addCookies([{ name: 'consent', value: encodeURIComponent(JSON.stringify({ v: 1, ts: new Date().toISOString(), analytics: true, marketing: true, vendors: ['ga4', 'clarity', 'meta', 'tiktok'] })), url: srv.url }]);
      await page.reload(); await sleep(400);
      ok(`${T}: GPC overrides a stored Accept (nothing loads)`, trackers().length === 0, trackers().join(' '));
      await page.locator('[data-cookie-settings]').first().click();
      ok(`${T}: GPC → switches shown off and disabled`, await page.locator('[data-consent="banner"] input[data-consent-cat]').evaluateAll((els) => els.every((e) => e.disabled && !e.checked)));
      await ctx.close();
    }
  } finally {
    await srv.close();
  }
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'consent-test-'));
const browser = await launchBrowser();
try {
  await offState(browser);
  const out = path.join(tmp, 'tracking');
  console.log('building with dummy tracking IDs …');
  buildWith(DUMMY, out);
  await configured(browser, out);
} catch (e) {
  ok('consent test ran to completion', false, e.stack || e);
} finally {
  await browser.close();
  fs.rmSync(tmp, { recursive: true, force: true });
}
writeJSON('plan/checks/consent-test.json', { ranAt: new Date().toISOString(), passed: failures === 0, failures, results });
console.log(`\n${failures === 0 ? 'ALL PASS' : `${failures} FAILURE(S)`} — ${results.length} assertions`);
process.exit(failures === 0 ? 0 : 1);
