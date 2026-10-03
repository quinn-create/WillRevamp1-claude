#!/usr/bin/env node
// Responsive QA for a built site (A24). Every page in dist (EN + ES) at several widths:
//   1. horizontal overflow (document wider than the viewport) + the elements that stick out
//   2. tap targets < 44 px (a, button, input, select, summary) — inline text links inside paragraphs ignored;
//      inputs wrapped in / labelled by a <label> are measured with their label
//   3. focus obscured: Tab through the page; for each focused element, the share of it hidden behind a
//      fixed/sticky element (header, call bar, consent banner) that is not its own ancestor
// Usage: node tools/responsive.mjs --dist dist --out qa/responsive.json [--widths 360,390,768,1280,1920] [--paths /,/es/]
//        [--concurrency 3] [--max-tabs 250]
import { args, serve, distPages, launchBrowser, writeJSON } from './lib.mjs';

const a = args();
const WIDTHS = String(a.widths || '360,390,768,1280,1920').split(',').map(Number);
const HEIGHTS = { 360: 780, 390: 844, 768: 1024, 1280: 800, 1920: 1080 };
const CONC = Number(a.concurrency || 3);
const MAX_TABS = Number(a['max-tabs'] || 250);
const MIN = 44;

// Runs in the page. Shared helpers are re-declared inside each evaluate (functions cannot be passed in).
const HELPERS = `
  window.__qaDesc = (el) => {
    if (!el || !el.tagName) return String(el);
    let s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    const cls = (typeof el.className === 'string' ? el.className : '').trim().split(/\\s+/).filter(Boolean).slice(0, 3);
    if (cls.length) s += '.' + cls.join('.');
    const t = (el.getAttribute('aria-label') || el.textContent || el.getAttribute('name') || el.getAttribute('href') || '').replace(/\\s+/g, ' ').trim().slice(0, 50);
    return t ? s + ' "' + t + '"' : s;
  };
  window.__qaVisible = (el) => {
    if (!el.checkVisibility || !el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) return false;
    if (el.closest('[inert],[aria-hidden="true"],[hidden]')) return false;
    const r = el.getBoundingClientRect();
    return r.width > 1 && r.height > 1;
  };
  window.__qaFixed = () => [...document.querySelectorAll('body *')].filter((el) => {
    const p = getComputedStyle(el).position;
    return (p === 'fixed' || p === 'sticky') && window.__qaVisible(el);
  });
`;

async function measure(page, url, width) {
  const height = HEIGHTS[width] || 900;
  await page.setViewportSize({ width, height });
  await page.goto(url, { waitUntil: 'load', timeout: 120000 });
  await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.evaluate(HELPERS);

  const overflow = await page.evaluate(() => {
    const de = document.documentElement;
    const vw = de.clientWidth;
    const sw = Math.max(de.scrollWidth, document.body.scrollWidth);
    const offenders = [];
    if (sw > vw + 1) {
      const clips = (el) => {
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          const o = getComputedStyle(p).overflowX;
          if (o !== 'visible') return true;
        }
        return false;
      };
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if ((r.right > vw + 1 || r.left < -1) && !clips(el) && getComputedStyle(el).position !== 'fixed') {
          // keep only the outermost offenders
          if (!offenders.some((o) => o.el.contains(el))) offenders.push({ el, left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) });
        }
      }
    }
    return { viewport: vw, scrollWidth: sw, overflowPx: Math.max(0, sw - vw), offenders: offenders.slice(0, 10).map((o) => ({ el: window.__qaDesc(o.el), left: o.left, right: o.right, width: o.width })) };
  });

  const smallTargets = await page.evaluate((MIN) => {
    const out = [];
    for (const el of document.querySelectorAll('a[href],button,input,select,summary')) {
      if (el.matches('input[type=hidden]')) continue;
      if (!window.__qaVisible(el)) continue;
      const cs = getComputedStyle(el);
      if (el.tagName === 'A' && cs.display === 'inline' && el.closest('p,dd,td,figcaption,blockquote')) continue;
      let r = el.getBoundingClientRect();
      let w = r.width, h = r.height, via = '';
      if (el.tagName === 'INPUT') {
        const lab = el.closest('label') || (el.id && document.querySelector('label[for="' + CSS.escape(el.id) + '"]'));
        if (lab && window.__qaVisible(lab)) {
          const lr = lab.getBoundingClientRect();
          const l = Math.min(r.left, lr.left), t = Math.min(r.top, lr.top), rr = Math.max(r.right, lr.right), b = Math.max(r.bottom, lr.bottom);
          // only union when the label is adjacent (checkbox/radio rows), not a label stacked above a text box
          if (/checkbox|radio/.test(el.type)) { w = rr - l; h = b - t; via = 'label'; }
        }
      }
      if (w < MIN - 0.5 || h < MIN - 0.5) {
        out.push({ el: window.__qaDesc(el), w: Math.round(w), h: Math.round(h), display: cs.display, below24: w < 23.5 || h < 23.5, ...(via ? { via } : {}) });
      }
    }
    return out;
  }, MIN);

  // Focus obscured: Tab through the page from the top.
  const focus = [];
  await page.evaluate(() => { window.scrollTo(0, 0); document.activeElement && document.activeElement.blur && document.activeElement.blur(); });
  let first = null, stops = 0;
  for (let i = 0; i < MAX_TABS; i++) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(async () => {
      // let focus styles (and any transition) settle before measuring
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const el = document.activeElement;
      if (!el || el === document.body || el === document.documentElement) return { done: true };
      if (!el.__qaId) el.__qaId = 'q' + Math.random().toString(36).slice(2);
      const vw = document.documentElement.clientWidth, vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      const res = { id: el.__qaId, el: window.__qaDesc(el) };
      const L = Math.max(0, r.left), T = Math.max(0, r.top), R = Math.min(vw, r.right), B = Math.min(vh, r.bottom);
      if (r.width <= 1 || r.height <= 1) return { ...res, tiny: true };
      if (R <= L || B <= T) return { ...res, offscreen: true, top: Math.round(r.top) };
      const fixed = window.__qaFixed().filter((f) => !f.contains(el) && !el.contains(f));
      if (!fixed.length) return { ...res, covered: 0 };
      // 7x5 grid sample over the on-screen part; a sample counts as covered when the topmost element there
      // belongs to a fixed/sticky box. The on-screen share is accounted for too (cut-off by viewport edge).
      const N = 7, M = 5;
      let covered = 0, total = 0;
      const by = new Set();
      for (let x = 0; x < N; x++) for (let y = 0; y < M; y++) {
        const px = r.left + ((x + 0.5) / N) * r.width, py = r.top + ((y + 0.5) / M) * r.height;
        total++;
        if (px < 0 || py < 0 || px >= vw || py >= vh) continue;
        const top = document.elementFromPoint(px, py);
        const f = top && fixed.find((fx) => fx.contains(top));
        if (f) { covered++; by.add(window.__qaDesc(f).replace(/ ".*$/, '')); }
      }
      return { ...res, covered: covered / total, by: [...by] };
    });
    if (info.done) break;
    if (first === info.id) break; // wrapped around
    if (!first) first = info.id;
    stops++;
    if (info.offscreen) focus.push({ el: info.el, issue: 'offscreen-after-focus', top: info.top });
    else if (info.covered > 0) focus.push({ el: info.el, issue: info.covered >= 0.999 ? 'fully-obscured' : 'partly-obscured', coveredPct: Math.round(info.covered * 100), by: info.by });
  }
  return { width, height, overflow, smallTargets, focus: { stops, issues: focus } };
}

async function main() {
  const server = await serve(a.dist || 'dist');
  const list = a.paths ? String(a.paths).split(',') : distPages(a.dist || 'dist').filter((p) => !p.startsWith('/_'));
  const browser = await launchBrowser();
  const results = [];
  const jobs = list.map((p) => async () => {
    const ctx = await browser.newContext();
    await ctx.route(/^https?:\/\/(?!127\.0\.0\.1|localhost)/, (r) => r.abort('blockedbyclient'));
    const page = await ctx.newPage();
    const entry = { path: p, widths: [] };
    for (const w of WIDTHS) {
      try { entry.widths.push(await measure(page, server.url + p, w)); }
      catch (e) { entry.widths.push({ width: w, error: String(e.message || e).split('\n')[0] }); }
    }
    await ctx.close();
    results.push(entry);
    const ov = entry.widths.filter((x) => x.overflow?.overflowPx > 0).map((x) => x.width);
    const st = entry.widths.reduce((s, x) => s + (x.smallTargets?.length || 0), 0);
    const fo = entry.widths.reduce((s, x) => s + (x.focus?.issues.length || 0), 0);
    console.log(`${p}  overflow@[${ov}]  small-targets ${st}  focus-issues ${fo}${entry.widths.some((x) => x.error) ? '  ERR' : ''}`);
  });
  let i = 0;
  await Promise.all(Array.from({ length: CONC }, async () => { while (i < jobs.length) await jobs[i++](); }));
  await browser.close();
  await server.close();
  results.sort((x, y) => x.path.localeCompare(y.path));

  const summary = { pages: results.length, widths: WIDTHS, overflowPages: [], smallTargetCount: 0, smallTargetsBelow24: 0, smallTargetsByElement: {}, focusObscured: { fully: 0, partly: 0, offscreen: 0 }, focusByElement: {}, errors: 0 };
  for (const r of results) {
    for (const w of r.widths) {
      if (w.error) { summary.errors++; continue; }
      if (w.overflow.overflowPx > 0) summary.overflowPages.push(`${r.path}@${w.width}`);
      for (const t of w.smallTargets) {
        summary.smallTargetCount++;
        if (t.below24) summary.smallTargetsBelow24++;
        const k = `${t.el} (${t.w}x${t.h})@${w.width}`;
        summary.smallTargetsByElement[k] = (summary.smallTargetsByElement[k] || 0) + 1;
      }
      for (const f of w.focus.issues) {
        if (f.issue === 'fully-obscured') summary.focusObscured.fully++;
        else if (f.issue === 'partly-obscured') summary.focusObscured.partly++;
        else summary.focusObscured.offscreen++;
        const k = `${f.issue}: ${f.el}${f.by ? ' by ' + f.by.join('+') : ''}@${w.width}`;
        summary.focusByElement[k] = (summary.focusByElement[k] || 0) + 1;
      }
    }
  }
  writeJSON(a.out || 'qa/responsive.json', { generatedAt: new Date().toISOString(), minTarget: MIN, summary, results });
  console.log(`pages ${summary.pages} · overflow ${summary.overflowPages.length} page-widths · small targets ${summary.smallTargetCount} (${summary.smallTargetsBelow24} < 24px) · focus fully ${summary.focusObscured.fully} / partly ${summary.focusObscured.partly} / offscreen ${summary.focusObscured.offscreen} · errors ${summary.errors}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
