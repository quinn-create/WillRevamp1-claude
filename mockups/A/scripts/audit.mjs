// Dev helper: static audit of the built mockup pages (h1 count, img attrs, lang, legal line, free-consultation
// beside tel:, warn phrases, law-firm words) + a live check that the menu dialog opens and closes.
import fs from 'node:fs';
import { serve, launchBrowser, newContext } from '../../../tools/lib.mjs';
const pages = ['index.html', 'criminal-defense/index.html', 'contact-us/index.html', 'components/index.html'];
const WARN = ['elevate', 'seamless', 'unlock', 'look no further', 'we understand that', "whether you're", 'cutting-edge', 'world-class', 'passionate about', 'tailored solutions', 'we pride ourselves', 'navigate the complexities', 'peace of mind', 'dedicated team', 'second to none', 'one-stop shop', 'game-changer', 'leverage', 'synergy', 'delve', 'robust', 'holistic', 'aggressive'];
const LAW = /\b(specialist|specializ\w*|experts?|certified|guarantee[sd]?)\b/gi;
for (const p of pages) {
  const html = fs.readFileSync(`mockups/A/dist/${p}`, 'utf8');
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const badImg = imgs.filter((t) => !/\swidth=/.test(t) || !/\sheight=/.test(t) || !/\salt(=|\s|>)/.test(t));
  const h1 = (html.match(/<h1\b/g) || []).length;
  // every block element containing "free consultation" must also contain a tel: link
  const blocks = [...html.matchAll(/<(p|li|a|div|figcaption|span)\b[^>]*>(?:(?!<\/?(?:p|li|div)\b)[\s\S])*?free consultation[\s\S]*?<\/\1>/gi)].map((m) => m[0]);
  const lonely = [];
  for (const m of html.matchAll(/free consultation/gi)) {
    const i = m.index;
    const win = html.slice(Math.max(0, i - 700), i + 400);
    if (!/tel:\+16154107290/.test(win)) lonely.push(html.slice(Math.max(0, i - 80), i + 30).replace(/\s+/g, ' '));
  }
  const warn = WARN.filter((w) => text.toLowerCase().includes(w));
  const law = (text.replace(/Prior results do not guarantee a similar outcome/g, '').match(LAW) || []);
  console.log(p, { h1, imgs: imgs.length, badImg: badImg.length, lang: /<html lang="en"/.test(html), legal: /not legal advice/.test(text), lonelyFree: lonely, warn, law, tel: (html.match(/tel:\+16154107290/g) || []).length, hashLinks: (html.match(/href="#"/g) || []).length });
}
const server = await serve('mockups/A/dist');
const browser = await launchBrowser();
const ctx = await newContext(browser);
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(String(e)));
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(server.url + '/criminal-defense/', { waitUntil: 'networkidle' });
await page.click('[data-menu-open]');
const open = await page.evaluate(() => document.getElementById('menu').open);
const expanded = await page.getAttribute('[data-menu-open]', 'aria-expanded');
await page.keyboard.press('Escape');
const closed = await page.evaluate(() => !document.getElementById('menu').open);
await page.goto(server.url + '/', { waitUntil: 'networkidle' });
await page.mouse.wheel(0, 3000); await page.waitForTimeout(1200);
const revealed = await page.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter((e) => e.getBoundingClientRect().top < innerHeight && e.getBoundingClientRect().bottom > 0).every((e) => e.classList.contains('is-in')));
console.log({ dialogOpens: open, expanded, escCloses: closed, revealInView: revealed, consoleErrors: errors });
await browser.close(); await server.close();
