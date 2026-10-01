#!/usr/bin/env node
// axe-core accessibility scan (WCAG 2.2 AA tags) + simple keyboard and heading checks.
// Usage: node tools/axe.mjs --dist dist --out qa/axe.json [--paths ...] | --url <u> [--url <u>] --out audit/axe-before.json
import { AxeBuilder } from '@axe-core/playwright';
import { args, serve, distPages, launchBrowser, newContext, writeJSON } from './lib.mjs';

const a = args();

async function main() {
  let server = null, urls = [];
  if (a.dist) {
    server = await serve(a.dist);
    const paths = a.paths ? String(a.paths).split(',') : distPages(a.dist).filter((p) => !p.startsWith('/_'));
    urls = paths.map((p) => server.url + p);
  } else urls = [].concat(a.url || []);
  const browser = await launchBrowser();
  const ctx = await newContext(browser);
  const results = [];
  for (const url of urls) {
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
      const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
      const structure = await page.evaluate(() => {
        const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1]));
        const skips = hs.filter((l, i) => i > 0 && l > hs[i - 1] + 1).length;
        return { h1: hs.filter((l) => l === 1).length, headingSkips: skips, lang: document.documentElement.lang, main: !!document.querySelector('main'), skipLink: !!document.querySelector('a[href^="#"][class*="skip"], a.skip-link, a[href="#main"]') };
      });
      // Keyboard: tab through up to 60 stops; every focused element must show a visible outline/box-shadow.
      let invisible = 0, stops = 0;
      for (let i = 0; i < 60; i++) {
        await page.keyboard.press('Tab');
        const info = await page.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return null;
          const cs = getComputedStyle(el);
          const visible = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || (cs.boxShadow && cs.boxShadow !== 'none');
          return { visible };
        });
        if (!info) break;
        stops++;
        if (!info.visible) invisible++;
      }
      const sum = (imp) => r.violations.filter((v) => v.impact === imp).length;
      results.push({ url: server ? url.slice(server.url.length) : url, critical: sum('critical'), serious: sum('serious'), moderate: sum('moderate'), minor: sum('minor'),
        violations: r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length, targets: v.nodes.slice(0, 5).map((n) => n.target.join(' ')) })),
        structure, keyboard: { stops, focusNotVisible: invisible } });
      console.log(`${results.at(-1).critical}c ${results.at(-1).serious}s ${results.at(-1).moderate}m h1=${structure.h1} skips=${structure.headingSkips} focus-invisible=${invisible} ${url}`);
    } catch (e) {
      results.push({ url, error: String(e.message).split('\n')[0] });
    }
    await page.close();
  }
  await browser.close();
  if (server) await server.close();
  if (a.out) writeJSON(a.out, { generatedAt: new Date().toISOString(), results });
}
main().catch((e) => { console.error(e); process.exit(1); });
