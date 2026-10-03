// Repo root, found by walking up from this module. Works both from src/ and from Astro's bundled
// prerender chunks in dist/.prerender/, so nothing depends on process.cwd().
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function findRoot() {
  let dir = path.dirname(fileURLToPath(import.meta.url));
  for (let i = 0; i < 12; i++) {
    if (fs.existsSync(path.join(dir, 'copy/pages')) && fs.existsSync(path.join(dir, 'plan/sitemap.json'))) return dir;
    const up = path.dirname(dir);
    if (up === dir) break;
    dir = up;
  }
  throw new Error('repo root (copy/pages + plan/sitemap.json) not found above ' + fileURLToPath(import.meta.url));
}
export const ROOT = findRoot();
