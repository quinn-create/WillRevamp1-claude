#!/usr/bin/env node
// Writes domain / form / tracking keys into site.config.json, then rebuilds, re-checks and repackages.
// Usage: node tools/configure.mjs --domain willfraleylaw.com --web3forms <key> --turnstile <site key|""> --ga4 <G-ID|""> --meta <pixel|""> --tiktok <pixel|""> --clarity <id|"">
// Blank or omitted values leave a vendor off. Only public, client-side IDs belong here — never secrets.
import { execSync } from 'node:child_process';
import { args, readJSON, writeJSON } from './lib.mjs';

const a = args();
const cfg = readJSON('site.config.json');
const set = (k, path) => { if (a[k] !== undefined) { const v = a[k] === true ? '' : String(a[k]).trim(); let o = cfg; const ks = path.split('.'); ks.slice(0, -1).forEach((x) => (o = o[x] ??= {})); o[ks.at(-1)] = v; } };
set('domain', 'domain');
set('web3forms', 'forms.web3formsAccessKey');
set('turnstile', 'forms.turnstileSiteKey');
set('ga4', 'tracking.ga4');
set('meta', 'tracking.metaPixel');
set('tiktok', 'tracking.tiktokPixel');
set('clarity', 'tracking.clarity');
cfg.updatedAt = new Date().toISOString();
writeJSON('site.config.json', cfg);
console.log('site.config.json updated');
if (!a['no-build']) {
  execSync('npm run build', { stdio: 'inherit' });
  execSync('node tools/check.mjs --final', { stdio: 'inherit' });
  execSync('node tools/package.mjs', { stdio: 'inherit' });
}
