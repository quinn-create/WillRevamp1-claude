#!/usr/bin/env node
// Contact form test (A21 / P500). Rerunnable by QA.
//
//   node tools/form-test.mjs            # full run: off-state on dist/, dummy-key build, Turnstile build
//   node tools/form-test.mjs --no-turnstile
//
// 1. Off state (the real, empty site.config.json): dist/contact-us/ and dist/es/contacto/ render the form
//    disabled, with no action, no submit, no form script, and tel: + mailto: links. (Run `npm run build` first.)
// 2. Builds into a temporary outDir with a DUMMY Web3Forms key written into a temporary site.config.json; the
//    original file is restored byte-for-byte in `finally` (keys must stay empty in the repo). dist/ is untouched.
// 3. Serves that build locally; https://api.web3forms.com/submit is mocked with Playwright page.route. Every
//    other non-local request is aborted. EN and ES:
//    empty submit → specific errors + summary, no request · blur validation · honeypot filled → rejected, no
//    request · submit < 3 s → rejected (time-trap) · endpoint failure → error notice, typed text kept ·
//    valid submit → request carries the key and fields → success state → thank-you page of that language.
// 4. With --no-turnstile omitted: a second build with a dummy Turnstile site key checks the widget script is
//    loaded only then, and that a submit without a token is held back (the widget is stubbed locally).
// Exit code 0 only if every assertion passed. Results: plan/checks/form-test.json.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import { execFileSync } from 'node:child_process';
import { ROOT, launchBrowser, serve, args, writeJSON, sleep } from './lib.mjs';

const opt = args();
const CFG = path.join(ROOT, 'site.config.json');
const DUMMY_KEY = '00000000-0000-4000-8000-00000000a21f'; // not a real key; never committed
const DUMMY_TURNSTILE = '1x00000000000000000000AA'; // Cloudflare's public "always passes" test site key
const ENDPOINT = 'https://api.web3forms.com/submit';
const results = [];
let failures = 0;
const ok = (name, pass, detail = '') => {
  results.push({ name, pass: !!pass, detail: detail ? String(detail) : undefined });
  if (!pass) failures++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);
};

const PAGES = [
  { lang: 'en', path: '/contact-us/', thanks: '/thank-you/', err: { first: 'Enter your first name.', last: 'Enter your last name.', phone: 'Enter your phone number so the office can call you back.', email: 'Enter an email address like name@example.com, or leave it blank.' } },
  { lang: 'es', path: '/es/contacto/', thanks: '/es/gracias/', err: { first: 'Escriba su nombre.', last: 'Escriba su apellido.', phone: 'Escriba su número de teléfono para que la oficina pueda llamarle.', email: 'Escriba un correo como nombre@ejemplo.com, o déjelo en blanco.' } },
];

function buildWith(forms, outDir) {
  const original = fs.readFileSync(CFG);
  const restore = () => fs.writeFileSync(CFG, original);
  const onSig = () => { restore(); process.exit(130); };
  process.once('SIGINT', onSig);
  process.once('SIGTERM', onSig);
  try {
    const cfg = JSON.parse(original.toString('utf8'));
    Object.assign(cfg.forms, forms);
    fs.writeFileSync(CFG, JSON.stringify(cfg, null, 2) + '\n');
    execFileSync('npx', ['astro', 'build', '--outDir', outDir], { cwd: ROOT, stdio: ['ignore', 'ignore', 'inherit'] });
  } finally {
    restore();
    process.off('SIGINT', onSig);
    process.off('SIGTERM', onSig);
  }
  const back = JSON.parse(fs.readFileSync(CFG, 'utf8'));
  ok('site.config.json restored with empty keys', fs.readFileSync(CFG).equals(original) && !back.forms.web3formsAccessKey && !back.forms.turnstileSiteKey);
}

// ------------------------------------------------------------------ 1. off state (real dist/)
function offState() {
  for (const pg of PAGES) {
    const f = path.join(ROOT, 'dist', pg.path, 'index.html');
    if (!fs.existsSync(f)) { ok(`[${pg.lang}] off state: ${pg.path} built (run npm run build first)`, false); continue; }
    const html = fs.readFileSync(f, 'utf8');
    const form = (html.match(/<form\b[^>]*data-contact-form[^>]*>[\s\S]*?<\/form>/) || [''])[0];
    ok(`[${pg.lang}] off state: form renders`, !!form);
    ok(`[${pg.lang}] off state: no action, no submit button`, form && !/<form[^>]*\saction=/.test(form) && !/type="submit"/.test(form));
    ok(`[${pg.lang}] off state: fields disabled (fieldset disabled)`, /<fieldset[^>]*\sdisabled/.test(form));
    ok(`[${pg.lang}] off state: note with tel: and mailto:`, /data-form-off/.test(form) && /href="tel:\+16154107290"/.test(form) && /href="mailto:inbox@willfraleylaw\.com"/.test(form));
    ok(`[${pg.lang}] off state: no access key, no Web3Forms or Turnstile reference`, !/access_key|web3forms|turnstile/i.test(html));
    ok(`[${pg.lang}] off state: non-confidentiality notice inside the form`, /data-confidentiality/.test(form) && /(attorney-client|abogado y cliente)/.test(form));
  }
}

// ------------------------------------------------------------------ 3. live tests on a dummy-key build
async function liveTests(outDir, { turnstile = false } = {}) {
  const srv = await serve(outDir);
  const browser = await launchBrowser();
  try {
    for (const pg of PAGES) {
      const tag = `[${pg.lang}${turnstile ? ' turnstile' : ''}]`;
      const html = fs.readFileSync(path.join(outDir, pg.path, 'index.html'), 'utf8');
      const hasTs = /challenges\.cloudflare\.com\/turnstile/.test(html);
      ok(`${tag} Turnstile script ${turnstile ? 'loaded' : 'absent'}`, hasTs === turnstile);
      ok(`${tag} form has the Web3Forms action and the dummy key`, /action="https:\/\/api\.web3forms\.com\/submit"/.test(html) && html.includes(DUMMY_KEY));
      ok(`${tag} non-confidentiality notice directly above Submit`, /data-confidentiality[\s\S]*?<\/div>\s*<\/div>\s*<div class="notice notice--error" data-fail[\s\S]*?<div class="form-actions"/.test(html));

      const ctx = await browser.newContext();
      const posts = [];
      let mode = 'ok';
      await ctx.route(/^https?:\/\/(?!127\.0\.0\.1|localhost)/, async (route) => {
        const req = route.request();
        const url = req.url();
        if (url.startsWith(ENDPOINT)) {
          posts.push({ method: req.method(), body: req.postDataBuffer()?.toString('utf8') || '', accept: req.headers().accept });
          if (mode === 'fail') return route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ success: false, message: 'mock failure' }) });
          return route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ success: true, message: 'Email sent successfully!' }) });
        }
        if (/challenges\.cloudflare\.com\/turnstile/.test(url)) {
          // Local stub: a widget that writes its token only when told to (window.__tsSolve()).
          const js = `window.turnstile={reset(){}};window.__tsSolve=()=>document.querySelectorAll('.cf-turnstile').forEach(w=>{let i=w.querySelector('input');if(!i){i=document.createElement('input');i.type='hidden';i.name='cf-turnstile-response';w.append(i)}i.value='stub-token'});`;
          return route.fulfill({ status: 200, contentType: 'text/javascript', body: js });
        }
        return route.abort('blockedbyclient');
      });
      const page = await ctx.newPage();
      const consoleErrors = [];
      page.on('pageerror', (e) => consoleErrors.push(String(e)));
      // The mocked 500 (case f) logs "Failed to load resource" on purpose; local 4xx/5xx are tracked instead.
      page.on('console', (m) => { if (m.type() === 'error' && !/^Failed to load resource/.test(m.text())) consoleErrors.push(m.text()); });
      page.on('response', (r) => { if (r.url().startsWith(srv.url) && r.status() >= 400) consoleErrors.push(`${r.status()} ${r.url()}`); });
      const url = srv.url + pg.path;
      const visibleErr = (id) => page.evaluate((id) => { const e = document.getElementById(`${id}-err`); return e && !e.hidden ? e.textContent.trim() : ''; }, id);
      const fillValid = async () => {
        await page.fill('#cf-first', 'Maria');
        await page.fill('#cf-last', 'Lopez');
        await page.fill('#cf-email', 'maria@example.com');
        await page.fill('#cf-phone', '(615) 555-0100');
        await page.selectOption('#cf-time', { index: 2 });
        await page.selectOption('#cf-client', { index: 1 });
        await page.fill('#cf-message', 'Test message from tools/form-test.mjs');
      };
      const submit = () => page.click('form[data-contact-form] button[type="submit"]');

      // a. empty submit → specific errors, summary focused, no request
      await page.goto(url, { waitUntil: 'load' });
      await submit();
      await page.waitForSelector('[data-summary]:not([hidden])', { timeout: 5000 }).catch(() => {});
      const errs = { first: await visibleErr('cf-first'), last: await visibleErr('cf-last'), phone: await visibleErr('cf-phone'), email: await visibleErr('cf-email'), message: await visibleErr('cf-message') };
      ok(`${tag} empty submit: specific errors on first, last, phone`, errs.first === pg.err.first && errs.last === pg.err.last && errs.phone === pg.err.phone, JSON.stringify(errs));
      ok(`${tag} empty submit: optional fields not flagged`, !errs.email && !errs.message);
      const sum = await page.evaluate(() => { const s = document.querySelector('[data-summary]'); return { shown: !s.hidden, focused: document.activeElement === s, links: [...s.querySelectorAll('a')].map((a) => a.getAttribute('href')) }; });
      ok(`${tag} empty submit: error summary shown, focused, links to fields`, sum.shown && sum.focused && sum.links.join() === '#cf-first,#cf-last,#cf-phone', JSON.stringify(sum));
      ok(`${tag} empty submit: aria-invalid on the three fields`, (await page.locator('[aria-invalid="true"]').count()) === 3);
      ok(`${tag} empty submit: no request sent`, posts.length === 0);

      // b. inline validation on blur; error clears once fixed
      await page.fill('#cf-email', 'maria@');
      await page.locator('#cf-email').blur();
      ok(`${tag} blur: invalid email flagged with specific copy`, (await visibleErr('cf-email')) === pg.err.email);
      await page.fill('#cf-email', 'maria@example.com');
      ok(`${tag} input: error clears when fixed`, !(await visibleErr('cf-email')) && !(await page.locator('#cf-email[aria-invalid]').count()));
      await page.fill('#cf-phone', '615-55');
      await page.locator('#cf-phone').blur();
      ok(`${tag} blur: short phone flagged`, !!(await visibleErr('cf-phone')));

      // c. time-trap: a fresh page submitted in under 3 s is rejected
      await page.goto(url, { waitUntil: 'load' });
      await fillValid();
      await submit();
      const fast = await page.evaluate(() => { const f = document.querySelector('[data-fail]'); return !f.hidden && f.querySelector('[data-fail-reason]').textContent === f.dataset.fast; });
      ok(`${tag} time-trap: submit < 3 s rejected`, fast && posts.length === 0 && page.url() === url);

      // d. honeypot filled → rejected, no request
      await page.goto(url, { waitUntil: 'load' });
      await fillValid();
      await page.evaluate(() => { document.querySelector('input[name="botcheck"]').value = 'https://spam.example'; });
      await sleep(3200);
      await submit();
      const hp = await page.evaluate(() => { const f = document.querySelector('[data-fail]'); return !f.hidden && f.querySelector('[data-fail-reason]').textContent === f.dataset.spam; });
      ok(`${tag} honeypot filled: rejected`, hp && posts.length === 0 && page.url() === url);

      // e. Turnstile (only in the Turnstile build): no token → held back; token → goes through below
      if (turnstile) {
        await page.goto(url, { waitUntil: 'load' });
        await fillValid();
        await sleep(3200);
        await submit();
        const held = await page.evaluate(() => { const f = document.querySelector('[data-fail]'); return !f.hidden && f.querySelector('[data-fail-reason]').textContent === f.dataset.captcha; });
        ok(`${tag} Turnstile: submit without a token held back`, held && posts.length === 0);
      }

      // f. endpoint failure → error notice, typed text kept, button usable again
      mode = 'fail';
      await page.goto(url, { waitUntil: 'load' });
      await fillValid();
      if (turnstile) await page.evaluate(() => window.__tsSolve());
      await sleep(3200);
      await submit();
      await page.waitForSelector('[data-fail]:not([hidden])', { timeout: 5000 }).catch(() => {});
      const net = await page.evaluate(() => { const f = document.querySelector('[data-fail]'); const b = document.querySelector('form[data-contact-form] button[type="submit"]'); return { shown: !f.hidden, reason: f.querySelector('[data-fail-reason]').textContent === f.dataset.net, tel: !!f.querySelector('a[href^="tel:"]'), kept: document.getElementById('cf-message').value, enabled: !b.disabled }; });
      ok(`${tag} endpoint failure: error notice with phone, message kept, button re-enabled`, net.shown && net.reason && net.tel && net.kept === 'Test message from tools/form-test.mjs' && net.enabled, JSON.stringify(net));
      ok(`${tag} endpoint failure: one request made`, posts.length === 1);

      // g. valid submit → mock gets the key + fields → success state → thank-you page
      mode = 'ok';
      posts.length = 0;
      await page.goto(url, { waitUntil: 'load' });
      await fillValid();
      if (turnstile) await page.evaluate(() => window.__tsSolve());
      await sleep(3200);
      await submit();
      const succ = await page.waitForSelector('#cf-success:not([hidden])', { timeout: 5000 }).then(() => page.evaluate(() => ({ formHidden: document.querySelector('form[data-contact-form]').hidden, focused: document.activeElement?.id === 'cf-success' }))).catch(() => null);
      ok(`${tag} success state replaces the form`, succ && succ.formHidden && succ.focused, JSON.stringify(succ));
      await page.waitForURL(srv.url + pg.thanks, { timeout: 8000 }).catch(() => {});
      ok(`${tag} reaches the thank-you page (${pg.thanks})`, new URL(page.url()).pathname === pg.thanks, page.url());
      const body = posts[0]?.body || '';
      const fields = ['access_key', 'first_name', 'last_name', 'name', 'email', 'phone', 'best_time', 'new_client', 'message', 'subject', 'language', 'botcheck'];
      const sent = Object.fromEntries(fields.map((k) => [k, (body.match(new RegExp(`name="${k}"\\r\\n\\r\\n([^\\r]*)`)) || [])[1]]));
      ok(`${tag} one POST to Web3Forms with Accept: application/json`, posts.length === 1 && posts[0].method === 'POST' && /application\/json/.test(posts[0].accept || ''));
      ok(`${tag} payload: dummy key, all 7 fields, combined name, language, empty honeypot, no redirect field`,
        sent.access_key === DUMMY_KEY && sent.first_name === 'Maria' && sent.last_name === 'Lopez' && sent.name === 'Maria Lopez' && sent.email === 'maria@example.com' &&
        sent.phone === '(615) 555-0100' && !!sent.best_time && !!sent.new_client && sent.message === 'Test message from tools/form-test.mjs' && sent.language === pg.lang && sent.botcheck === '' && !/name="redirect"/.test(body),
        JSON.stringify(sent));
      if (turnstile) ok(`${tag} payload carries the Turnstile token`, /name="cf-turnstile-response"\r\n\r\nstub-token/.test(body));
      ok(`${tag} no page errors`, consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));
      await ctx.close();
    }
  } finally {
    await browser.close();
    await srv.close();
  }
}

// ------------------------------------------------------------------ run
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'form-test-'));
try {
  offState();
  const out1 = path.join(tmp, 'key');
  console.log('building with a dummy Web3Forms key …');
  buildWith({ web3formsAccessKey: DUMMY_KEY, turnstileSiteKey: '' }, out1);
  const js = fs.readdirSync(path.join(out1, '_astro')).filter((f) => f.endsWith('.js'));
  const formJs = js.filter((f) => fs.readFileSync(path.join(out1, '_astro', f), 'utf8').includes('data-contact-form'));
  const inlineForm = /<script type="module">[^<]*data-contact-form/.test(fs.readFileSync(path.join(out1, 'contact-us', 'index.html'), 'utf8'));
  const gz = formJs.reduce((s, f) => s + zlib.gzipSync(fs.readFileSync(path.join(out1, '_astro', f))).length, 0);
  ok('form script shipped (file or inline) on the contact page', formJs.length > 0 || inlineForm, formJs.length ? `${formJs.join(', ')} · ${(gz / 1024).toFixed(2)} KB gz` : 'inline');
  ok('form script absent from pages without the form', !/data-contact-form/.test(fs.readFileSync(path.join(out1, 'index.html'), 'utf8')));
  await liveTests(out1);
  if (!opt['no-turnstile']) {
    const out2 = path.join(tmp, 'turnstile');
    console.log('building with a dummy Web3Forms key + Turnstile test site key …');
    buildWith({ web3formsAccessKey: DUMMY_KEY, turnstileSiteKey: DUMMY_TURNSTILE }, out2);
    await liveTests(out2, { turnstile: true });
  }
} catch (e) {
  ok('form test ran to completion', false, e.stack || e);
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
writeJSON('plan/checks/form-test.json', { ranAt: new Date().toISOString(), passed: failures === 0, failures, results });
console.log(`\n${failures === 0 ? 'ALL PASS' : `${failures} FAILURE(S)`} — ${results.length} assertions`);
process.exit(failures === 0 ? 0 : 1);
