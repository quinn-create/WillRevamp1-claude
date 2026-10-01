#!/usr/bin/env node
// Crawl SITE_URL (read-only): sitemap + nav + in-page links, same host, max 300.
// One browser load per page; extracts structure + readable text, screenshots at 390 and 1280.
// Usage: node tools/crawl.mjs --site https://willfraleylaw.com [--delay 10] [--max 300] [--resume] [--no-shots]
import fs from 'node:fs';
import { args, abs, ensureDir, writeJSON, writeText, readJSON, sleep, fetchRetry, launchBrowser, newContext,
  slugFromUrl, fileSlug } from './lib.mjs';

const a = args();
const SITE = new URL(a.site || readJSON('site.config.json', {}).sourceSite || 'https://willfraleylaw.com');
const HOST = SITE.host.replace(/^www\./, '');
const DELAY = Number(a.delay ?? 10) * 1000;
const MAX = Number(a.max ?? 300);
const SHOTS = !a['no-shots'];
const sameHost = (u) => { try { return new URL(u).host.replace(/^www\./, '') === HOST; } catch { return false; } };
const norm = (u) => { const x = new URL(u, SITE); x.hash = ''; x.host = SITE.host; if (!/\.[a-z0-9]{2,5}$/i.test(x.pathname) && !x.pathname.endsWith('/')) x.pathname += '/'; return x.href; };
const isPage = (u) => !/\.(jpe?g|png|webp|gif|svg|pdf|zip|xml|css|js|ico|mp4|woff2?)$/i.test(new URL(u).pathname) && !/\/wp-(content|json|includes|admin)\//.test(u) && !/[?&](replytocom|s)=/.test(u);

let lastFetch = 0;
async function politeFetch(url) {
  const wait = lastFetch + DELAY - Date.now();
  if (wait > 0) await sleep(wait);
  lastFetch = Date.now();
  return fetchRetry(url);
}

async function sitemapUrls() {
  const out = new Set();
  const seen = new Set();
  const queue = [new URL('/robots.txt', SITE).href, new URL('/sitemap.xml', SITE).href, new URL('/sitemap_index.xml', SITE).href];
  const robots = await politeFetch(queue.shift()).then((r) => r.text()).catch(() => '');
  for (const m of robots.matchAll(/^sitemap:\s*(\S+)/gim)) queue.unshift(m[1]);
  while (queue.length) {
    const sm = queue.shift();
    if (seen.has(sm)) continue;
    seen.add(sm);
    const r = await politeFetch(sm).catch(() => null);
    if (!r || !r.ok) continue;
    const xml = await r.text();
    const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
    if (/<sitemapindex/i.test(xml)) queue.push(...locs);
    else locs.filter(sameHost).forEach((l) => out.add(norm(l)));
  }
  return { urls: [...out], robots, sitemaps: [...seen] };
}

const EXTRACT = () => {
  const q = (s) => document.querySelector(s);
  const meta = (n) => q(`meta[name="${n}"]`)?.content || q(`meta[property="${n}"]`)?.content || null;
  const headings = [...document.querySelectorAll('h1,h2,h3')].map((h) => ({ level: Number(h.tagName[1]), text: h.innerText.trim() })).filter((h) => h.text);
  const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { return JSON.parse(s.textContent); } catch { return s.textContent; } });
  const og = Object.fromEntries([...document.querySelectorAll('meta[property^="og:"],meta[name^="twitter:"]')].map((m) => [m.getAttribute('property') || m.getAttribute('name'), m.content]));
  const links = [...document.querySelectorAll('a[href]')].map((l) => ({ href: l.getAttribute('href'), abs: l.href, text: (l.innerText || l.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' '), inHeader: !!l.closest('header,[data-elementor-type="header"]'), inFooter: !!l.closest('footer,[data-elementor-type="footer"]') }));
  const forms = [...document.querySelectorAll('form')].map((f) => ({ id: f.id || null, action: f.getAttribute('action'), method: f.method, fields: [...f.querySelectorAll('input,select,textarea')].filter((i) => i.type !== 'hidden').map((i) => ({ tag: i.tagName.toLowerCase(), type: i.type, name: i.name, id: i.id, required: i.required || i.getAttribute('aria-required') === 'true', placeholder: i.placeholder || null, label: (i.id && document.querySelector(`label[for="${i.id}"]`)?.innerText.trim()) || i.closest('.gfield, label, .form-group')?.querySelector('label, legend')?.innerText.trim() || null, options: i.tagName === 'SELECT' ? [...i.options].map((o) => o.text.trim()) : undefined })), submit: f.querySelector('[type=submit]')?.value || f.querySelector('[type=submit]')?.innerText || null, textAfter: f.parentElement?.innerText.split('\n').filter(Boolean).slice(-4).join(' ') || null }));
  const images = [...document.querySelectorAll('img')].map((i) => ({ src: i.currentSrc || i.src, srcset: i.getAttribute('srcset'), alt: i.getAttribute('alt'), w: i.naturalWidth, h: i.naturalHeight }));
  const bgImages = [...document.querySelectorAll('*')].map((e) => getComputedStyle(e).backgroundImage).filter((b) => b && b.startsWith('url(')).map((b) => b.slice(5, -2));
  // Readable text: clone, drop chrome, walk block elements in order.
  const clone = document.body.cloneNode(true);
  clone.querySelectorAll('script,style,noscript,svg,header,footer,nav,form,[data-elementor-type="header"],[data-elementor-type="footer"],.elementor-location-header,.elementor-location-footer').forEach((n) => n.remove());
  const lines = [];
  clone.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,blockquote,td,th,dt,dd,.elementor-testimonial__text,.elementor-icon-list-text,.elementor-heading-title,.elementor-button-text').forEach((n) => {
    if (n.querySelector('p,li,h1,h2,h3,h4,h5,h6')) return;
    const t = n.textContent.replace(/\s+/g, ' ').trim();
    if (!t) return;
    const tag = n.tagName.toLowerCase();
    const line = /^h[1-6]$/.test(tag) ? '#'.repeat(Number(tag[1])) + ' ' + t : tag === 'li' ? '- ' + t : tag === 'blockquote' ? '> ' + t : t;
    if (lines[lines.length - 1] !== line) lines.push(line);
  });
  const chromeText = { header: document.querySelector('header,[data-elementor-type="header"]')?.innerText.trim() || null, footer: document.querySelector('footer,[data-elementor-type="footer"]')?.innerText.trim() || null };
  return { title: document.title, metaDescription: meta('description'), canonical: q('link[rel="canonical"]')?.href || null, robotsMeta: meta('robots'), lang: document.documentElement.lang, generator: meta('generator'), headings, h1Count: document.querySelectorAll('h1').length, jsonld, og, links, forms, images, bgImages: [...new Set(bgImages)], text: lines.join('\n\n'), chromeText };
};

async function main() {
  ensureDir('inventory/text');
  ensureDir('inventory/html');
  ensureDir('inventory/shots/before');
  const prev = a.resume ? readJSON('inventory/pages.json', { pages: [] }).pages : [];
  const done = new Map(prev.map((p) => [p.url, p]));

  const { urls, robots, sitemaps } = await sitemapUrls();
  const queue = [norm(SITE.href), ...urls];
  const seen = new Set();
  const browser = await launchBrowser();
  const ctx = await newContext(browser, { viewport: { width: 1280, height: 900 } });
  const pages = [];
  const forms = [];
  while (queue.length && pages.length < MAX) {
    const url = queue.shift();
    if (seen.has(url)) continue;
    seen.add(url);
    if (done.has(url)) { pages.push(done.get(url)); continue; }
    const wait = lastFetch + DELAY - Date.now();
    if (wait > 0) await sleep(wait);
    lastFetch = Date.now();
    const page = await ctx.newPage();
    const rec = { url, slug: slugFromUrl(url) };
    try {
      await page.setViewportSize({ width: 1280, height: 900 });
      const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
      rec.status = res?.status() ?? 0;
      rec.finalUrl = page.url();
      await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } window.scrollTo(0, 0); });
      await page.waitForTimeout(800);
      const html = await page.content();
      const data = await page.evaluate(EXTRACT);
      const fs_ = fileSlug(rec.slug);
      writeText(`inventory/html/${fs_}.html`, html);
      const md = `---\nurl: ${url}\ntitle: ${JSON.stringify(data.title)}\n---\n\n${data.text}\n`;
      writeText(`inventory/text/${fs_}.md`, md);
      const words = data.text.split(/\s+/).filter(Boolean).length;
      Object.assign(rec, {
        title: data.title, metaDescription: data.metaDescription, canonical: data.canonical, robotsMeta: data.robotsMeta,
        lang: data.lang, generator: data.generator, headings: data.headings, h1Count: data.h1Count, jsonld: data.jsonld, og: data.og,
        wordCount: words, thin: words < 150,
        links: { internal: data.links.filter((l) => sameHost(l.abs)), external: data.links.filter((l) => /^https?:/.test(l.abs) && !sameHost(l.abs)), hashOnly: data.links.filter((l) => l.href === '#' || l.href === '') },
        images: data.images, bgImages: data.bgImages, formCount: data.forms.length, chromeText: data.chromeText,
        textFile: `inventory/text/${fs_}.md`, htmlFile: `inventory/html/${fs_}.html`,
      });
      data.forms.forEach((f) => forms.push({ page: url, ...f }));
      if (SHOTS) {
        await page.screenshot({ path: abs(`inventory/shots/before/${fs_}-1280.png`), fullPage: true });
        await page.setViewportSize({ width: 390, height: 844 });
        await page.waitForTimeout(800);
        await page.screenshot({ path: abs(`inventory/shots/before/${fs_}-390.png`), fullPage: true });
      }
      for (const l of rec.links.internal) {
        const n = norm(l.abs);
        if (isPage(n) && !seen.has(n)) queue.push(n);
      }
      console.log(`[${pages.length + 1}] ${rec.status} ${url} (${words} words)`);
    } catch (e) {
      rec.status = rec.status || 0;
      rec.error = String(e.message || e).split('\n')[0];
      console.log(`[${pages.length + 1}] ERROR ${url}: ${rec.error}`);
    }
    await page.close();
    pages.push(rec);
    writeJSON('inventory/pages.json', { site: SITE.href, crawledAt: new Date().toISOString(), robots, sitemaps, pages });
    writeJSON('inventory/forms.json', forms);
  }
  await browser.close();
  console.log(`done: ${pages.length} pages`);
}
main().catch((e) => { console.error(e); process.exit(1); });
