// Dev helper: report elements wider than the viewport (horizontal overflow) per page/width.
import { serve, launchBrowser, newContext } from '../../../tools/lib.mjs';
const paths = (process.argv[2] || '/,/criminal-defense/,/contact-us/,/components/').split(',');
const widths = (process.argv[3] || '390,1280').split(',').map(Number);
const server = await serve('mockups/A/dist');
const browser = await launchBrowser();
const ctx = await newContext(browser, { reducedMotion: 'reduce' });
for (const p of paths) for (const w of widths) {
  const page = await ctx.newPage();
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto(server.url + p, { waitUntil: 'networkidle' });
  const r = await page.evaluate(() => {
    const W = document.documentElement.clientWidth;
    const out = [];
    for (const el of document.querySelectorAll('body *')) {
      const b = el.getBoundingClientRect();
      if (b.right > W + 0.5 && b.width > 0) out.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} right=${Math.round(b.right)} w=${Math.round(b.width)}`);
    }
    return { W, sw: document.documentElement.scrollWidth, out: out.slice(0, 8) };
  });
  console.log(p, w, 'scrollWidth', r.sw, r.out.join(' | '));
  await page.close();
}
await browser.close(); await server.close();
