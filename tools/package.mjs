#!/usr/bin/env node
// dist/ -> _UPLOAD_TO_CLOUDFLARE/ (+ _UPLOAD_TO_CLOUDFLARE.zip). Run after a passing `check.mjs --final`.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { abs } from './lib.mjs';

const out = abs('_UPLOAD_TO_CLOUDFLARE');
if (!fs.existsSync(abs('dist/index.html'))) { console.error('dist/ missing — run npm run build first'); process.exit(1); }
fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(abs('dist'), out, { recursive: true });
fs.writeFileSync(`${out}/README.txt`,
  'Upload this whole folder to Cloudflare Pages:\nWorkers & Pages -> Create -> Pages -> Upload assets -> drag this folder.\nSee HANDOFF.md in the repository for the domain and keys.\n');
const zip = abs('_UPLOAD_TO_CLOUDFLARE.zip');
if (fs.existsSync(zip)) fs.rmSync(zip);
execFileSync('zip', ['-r', '-q', '-9', zip, '_UPLOAD_TO_CLOUDFLARE'], { cwd: abs('.') });
console.log(`_UPLOAD_TO_CLOUDFLARE/ ready; zip ${(fs.statSync(zip).size / 1048576).toFixed(1)} MB`);
