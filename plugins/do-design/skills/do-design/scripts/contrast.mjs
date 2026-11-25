#!/usr/bin/env node
// WCAG contrast check for semantic color tokens, per theme.
// Usage: node contrast.mjs <tokens.json> [--aaa] [--json]
// Pairs: conventional roles + any extra "$pairs": [["fg","bg"], ...] in tokens.json.
import { loadTokens, flatten, resolver } from './lib/tokens.mjs';
import { parseColor, contrast } from './lib/color.mjs';

const [src, ...flags] = process.argv.slice(2);
if (!src) { console.error('Usage: node contrast.mjs <tokens.json> [--aaa] [--json]'); process.exit(2); }
const aaa = flags.includes('--aaa');
const TEXT = aaa ? 7 : 4.5, UI = 3;

const tokens = loadTokens(src);
const entries = flatten(tokens);
const { literal } = resolver(entries);

const SURFACES = ['bg', 'surface', 'surface-raised', 'surface-sunken'];
const rules = [
  ...['text', 'text-muted', 'text-subtle'].flatMap((fg) => SURFACES.map((bg) => [fg, bg, TEXT, 'text'])),
  ['accent', 'bg', TEXT, 'accent as text/link (≥3 ok only for large text or icons)'],
  ['accent', 'surface', TEXT, 'accent as text/link (≥3 ok only for large text or icons)'],
  ['accent-fg', 'accent', TEXT, 'text on accent'],
  ['accent-fg', 'accent-hover', TEXT, 'text on accent hover'],
  ['border-strong', 'bg', UI, 'input borders (UI component)'],
  ['border-strong', 'surface', UI, 'input borders (UI component)'],
  ['focus', 'bg', UI, 'focus ring'],
  ['focus', 'surface', UI, 'focus ring'],
  ...['danger', 'warning', 'success', 'info'].flatMap((s) => [
    [`${s}-fg`, s, TEXT, `text on ${s}`],
    [s, 'bg', UI, `${s} icon/indicator`],
  ]),
  ...(tokens.$pairs ?? []).map(([fg, bg, min]) => [fg, bg, min ?? TEXT, 'custom pair']),
];

const themes = [...new Set(entries.map((e) => e.theme).filter(Boolean))];
if (!themes.length) themes.push(null);
const results = [];
for (const theme of themes) {
  const roles = new Map(entries.filter((e) => e.path[0] === 'color' && e.theme === theme).map((e) => [e.name.slice(2), e]));
  const color = (role) => {
    const e = roles.get(role);
    return e ? parseColor(literal(e.value, theme)) : null;
  };
  for (const [fg, bg, min, use] of rules) {
    const f = color(fg), b = color(bg);
    if (!f || !b) continue;
    const ratio = contrast(f, b);
    results.push({ theme: theme ?? 'default', fg, bg, ratio: +ratio.toFixed(2), min, use, pass: ratio >= min });
  }
}

const failures = results.filter((r) => !r.pass);
if (flags.includes('--json')) {
  console.log(JSON.stringify({ checked: results.length, failures }, null, 2));
} else {
  for (const r of failures) {
    const hint = r.use.startsWith('accent as text') && r.ratio >= 3 ? ' (passes 3:1 — fine for large text/icons only)' : '';
    console.log(`FAIL [${r.theme}] ${r.fg} on ${r.bg}: ${r.ratio}:1 < ${r.min}:1 — ${r.use}${hint}`);
  }
  console.log(`contrast: ${results.length} pairs checked, ${failures.length} failing${aaa ? ' (AAA)' : ' (AA)'}`);
}
process.exit(failures.length ? 1 : 0);
