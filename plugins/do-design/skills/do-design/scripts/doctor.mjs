#!/usr/bin/env node
// Tooling check. Usage: node doctor.mjs [--install]
// Prints: shots=playwright|none plus details. --install sets up Playwright + Chromium in ~/.cache/do-design.
import { existsSync } from 'node:fs';
import { loadPlaywright, installPlaywright } from './lib/playwright.mjs';

const major = +process.versions.node.split('.')[0];
let found = await loadPlaywright();
if (!found && process.argv.includes('--install')) {
  installPlaywright();
  found = await loadPlaywright();
}

let browser = false;
if (found) {
  try { browser = existsSync(found.pw.chromium.executablePath()); } catch {}
}

const shots = found && browser ? 'playwright' : 'none';
console.log(`node=${process.versions.node}${major < 18 ? ' (needs ≥18)' : ''}`);
console.log(`playwright=${found ? found.version : 'missing'}${found ? ` (${found.from})` : ''}`);
console.log(`chromium=${browser ? 'ok' : 'missing'}`);
console.log(`shots=${shots}`);
if (shots === 'none') {
  console.log(found
    ? 'fix: npx playwright install chromium'
    : 'fix: node doctor.mjs --install (≈150MB, user cache) — or use a browser/screenshot MCP tool if available — or continue with static checks only');
}
