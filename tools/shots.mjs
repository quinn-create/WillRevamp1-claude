#!/usr/bin/env node
// Screenshots at fixed widths. Either a built folder (--dist) or explicit --url(s).
// Usage:
//   node tools/shots.mjs --dist dist --out REPORT/shots/after [--widths 360,390,768,1280,1920] [--format jpeg|png] [--paths /,/contact-us/]
//   node tools/shots.mjs --url https://willfraleylaw.com/ --out inventory/shots/before --widths 390,1280
import path from 'node:path';
import { args, abs, ensureDir, serve, distPages, launchBrowser, newContext, slugFromPath, fileSlug } from './lib.mjs';

const a = args();
const widths = String(a.widths || '390,1280').split(',').map(Number);
const format = a.format === 'png' ? 'png' : 'jpeg';
const out = ensureDir(a.out || 'REPORT/shots/after');

async function main() {
  let base = null, server = null, paths = [];
  if (a.dist) {
    server = await serve(a.dist);
    base = server.url;
    paths = a.paths ? String(a.paths).split(',') : distPages(a.dist).filter((p) => !p.startsWith('/_'));
  } else {
    paths = [].concat(a.url || []);
  }
  const browser = await launchBrowser();
  const ctx = await newContext(browser, { reducedMotion: 'reduce' });
  const results = [];
  for (const p of paths) {
    const url = base ? base + p : p;
    const slug = fileSlug(slugFromPath(base ? p : new URL(p).pathname));
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
      // Reveal-on-scroll content must be visible in captures.
      await page.addStyleTag({ content: '*{animation:none!important;transition:none!important} [data-reveal]{opacity:1!important;transform:none!important}' });
      for (const w of widths) {
        await page.setViewportSize({ width: w, height: w < 800 ? 844 : 900 });
        await page.waitForTimeout(300);
        const file = path.join(out, `${slug}-${w}.${format === 'png' ? 'png' : 'jpg'}`);
        await page.screenshot({ path: file, fullPage: true, type: format, ...(format === 'jpeg' ? { quality: 80 } : {}) });
        results.push({ url, width: w, file: path.relative(abs('.'), file) });
      }
    } catch (e) {
      results.push({ url, error: String(e.message).split('\n')[0] });
    }
    await page.close();
  }
  await browser.close();
  if (server) await server.close();
  console.log(JSON.stringify(results, null, 2));
}
main().catch((e) => { console.error(e); process.exit(1); });
