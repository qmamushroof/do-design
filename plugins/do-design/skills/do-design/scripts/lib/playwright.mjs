// Resolve a Playwright install without bundling it: project → global → npx cache → do-design cache.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { existsSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { pathToFileURL } from 'node:url';

export const CACHE_DIR = join(homedir(), '.cache', 'do-design');

function candidates() {
  const dirs = [process.cwd()];
  try { dirs.push(execSync('npm root -g', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()); } catch {}
  const npx = join(homedir(), process.platform === 'win32' ? 'AppData/Local/npm-cache/_npx' : '.npm/_npx');
  for (const root of [npx, join(homedir(), '.npm/_npx')]) {
    if (!existsSync(root)) continue;
    for (const d of readdirSync(root)) dirs.push(join(root, d, 'node_modules'));
  }
  dirs.push(join(CACHE_DIR, 'node_modules'));
  return dirs;
}

export async function loadPlaywright() {
  for (const dir of candidates()) {
    try {
      const req = createRequire(join(dir, 'noop.js'));
      const p = req.resolve('playwright');
      const mod = await import(pathToFileURL(p).href);
      const pw = mod.default ?? mod;
      let version = 'unknown';
      try { version = req('playwright/package.json').version; } catch {}
      return { pw, version, from: p };
    } catch {}
  }
  return null;
}

export function installPlaywright() {
  mkdirSync(CACHE_DIR, { recursive: true });
  execSync('npm init -y', { cwd: CACHE_DIR, stdio: 'ignore' });
  execSync('npm i playwright@latest --no-audit --no-fund', { cwd: CACHE_DIR, stdio: 'inherit' });
  execSync('npx playwright install chromium', { cwd: CACHE_DIR, stdio: 'inherit' });
}
