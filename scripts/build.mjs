#!/usr/bin/env node
// Build the standalone skill (plugin skill + agents bundled inside) and optionally install it.
// Usage: node scripts/build.mjs [--install] [--target <dir>]
//   dist/do-design/            standalone skill folder (works in ~/.claude/skills or .claude/skills)
//   --install                  copy to ~/.claude/skills/do-design (or --target)
import { cpSync, rmSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const plugin = join(root, 'plugins', 'do-design');
const dist = join(root, 'dist', 'do-design');

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(plugin, 'skills', 'do-design'), dist, { recursive: true });
cpSync(join(plugin, 'agents'), join(dist, 'agents'), { recursive: true });

const count = (d) => readdirSync(d).reduce((n, f) => n + (statSync(join(d, f)).isDirectory() ? count(join(d, f)) : 1), 0);
console.log(`built ${dist} (${count(dist)} files)`);

const args = process.argv.slice(2);
if (args.includes('--install')) {
  const ti = args.indexOf('--target');
  const target = ti >= 0 ? args[ti + 1] : join(homedir(), '.claude', 'skills', 'do-design');
  rmSync(target, { recursive: true, force: true });
  cpSync(dist, target, { recursive: true });
  console.log(`installed → ${target}  (invoke with /do-design)`);
}
