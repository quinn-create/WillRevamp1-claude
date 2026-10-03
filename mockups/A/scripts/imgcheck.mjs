// Dev helper: report every <img> load state at a given width (default 390).
import { serve, launchBrowser, newContext } from '../../../tools/lib.mjs';
const p = process.argv[2] || '/contact-us/';
const w = Number(process.argv[3] || 390);
const server = await serve('mockups/A/dist');
const browser = await launchBrowser();
const ctx = await newContext(browser, { reducedMotion: 'reduce' });
const page = await ctx.newPage();
console.log('initial viewport', page.viewportSize());
await page.goto(server.url + p, { waitUntil: 'networkidle' });
await page.setViewportSize({ width: w, height: 844 });
await page.waitForTimeout(500);
console.log(await page.evaluate(() => [...document.images].map((i) => ({ src: i.currentSrc.split('/').pop(), complete: i.complete, nw: i.naturalWidth, w: Math.round(i.getBoundingClientRect().width), h: Math.round(i.getBoundingClientRect().height), loading: i.loading }))));
await browser.close(); await server.close();
