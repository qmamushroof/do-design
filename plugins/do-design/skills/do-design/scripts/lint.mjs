#!/usr/bin/env node
// Static design lint for prototypes/UI code.
// Usage: node lint.mjs <dir|file>... [--tokens tokens.json] [--json]
// Severity: error (must fix) · warn (fix or justify) · info.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, basename, relative } from 'node:path';
import { loadTokens, flatten, resolver } from './lib/tokens.mjs';
import { COLOR_RE } from './lib/color.mjs';

const args = process.argv.slice(2);
const tokIdx = args.indexOf('--tokens');
const tokenPath = tokIdx >= 0 ? args[tokIdx + 1] : null;
const targets = args.filter((a, i) => !a.startsWith('--') && !(tokIdx >= 0 && i === tokIdx + 1));
const EXT = new Set(['.html', '.htm', '.css', '.scss', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.astro', '.mjml']);
const SKIP_DIR = new Set(['node_modules', '.git', 'dist', 'build', '.next', '.nuxt', 'shots', '_archive', 'coverage']);

// ---- token context
let spacing = null, tokenFonts = [], tokenColorValues = new Map();
if (tokenPath) {
  const entries = flatten(loadTokens(tokenPath));
  const { literal } = resolver(entries);
  spacing = new Set(entries.filter((e) => e.path[0] === 'space').map((e) => String(literal(e.value, e.theme))).filter((v) => v.endsWith('px')).map((v) => parseFloat(v)));
  spacing.add(0); spacing.add(1);
  tokenFonts = entries.filter((e) => e.path[0] === 'font').flatMap((e) => [].concat(e.value)).map((f) => f.toLowerCase().replace(/["']/g, ''));
  for (const e of entries.filter((x) => x.path[0] === 'color')) tokenColorValues.set(String(literal(e.value, e.theme)).toLowerCase(), e.name);
}

// ---- rules: [id, severity, regex, message, test?(match, ctx)]
const CONVERGENT_FONTS = ['inter', 'roboto', 'open sans', 'lato', 'poppins', 'montserrat', 'space grotesk', 'arial', 'helvetica'];
const rules = [
  ['transition-all', 'error', /transition(-property)?\s*:\s*all\b|\btransition-all\b/g, 'transition: all — animate specific properties (transform, opacity)'],
  ['dead-link', 'error', /href\s*=\s*["'](#?)["']/g, 'dead link href="#" — link to a real screen or use <button>'],
  ['lorem', 'error', /lorem ipsum|dolor sit amet/gi, 'placeholder lorem ipsum — write real content'],
  ['fake-names', 'error', /\b(john|jane) (doe|smith)\b|\bacme( corp| inc)?\b/gi, 'generic placeholder name — use realistic, varied names'],
  ['zoom-block', 'error', /user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?\b/gi, 'zoom disabled — remove (WCAG 1.4.4)'],
  ['img-alt', 'error', /<img\b(?![^>]*\balt\s*=)[^>]*>/gi, '<img> without alt'],
  ['slop-copy', 'warn', /\b(unlock|elevate|seamless(ly)?|supercharge|revolutioni[sz]e|empower|cutting-edge|next-level|all-in-one|effortless(ly)?|game-?changer)\b/gi, 'cliché copy — say the specific benefit'],
  ['generic-cta', 'warn', />\s*(submit|click here|learn more|ok)\s*</gi, 'vague button/link text — verb + object'],
  ['gradient-text', 'warn', /background-clip\s*:\s*text|\bbg-clip-text\b/g, 'gradient text — justify as signature or remove'],
  ['glass', 'info', /backdrop-filter\s*:\s*blur|\bbackdrop-blur/g, 'backdrop blur — only for overlays where context matters'],
  ['z-chaos', 'warn', /z-index\s*:\s*(\d{4,})/g, 'arbitrary z-index — use z tokens'],
  ['important', 'info', /!important/g, '!important — prefer specificity fixes'],
  ['tiny-text', 'warn', /font-size\s*:\s*(\d+(?:\.\d+)?)px/g, 'font-size below 12px', (m) => parseFloat(m[1]) < 12],
  ['emoji-icon', 'warn', /<(button|a|li|h[1-6]|span|div)[^>]*>\s*[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, 'emoji used as icon — use the icon set'],
];

const files = [];
const walk = (p) => {
  const s = statSync(p);
  if (s.isDirectory()) { if (!SKIP_DIR.has(basename(p))) for (const f of readdirSync(p)) walk(join(p, f)); }
  else if (EXT.has(extname(p))) files.push(p);
};
for (const t of targets) walk(t);

const findings = [];
const seen = new Set();
const add = (file, line, sev, id, msg) => { const k = `${file}:${line}:${id}`; if (seen.has(k)) return; seen.add(k); findings.push({ file: relative(process.cwd(), file).replace(/\\/g, '/'), line, sev, id, msg }); };
const lineOf = (src, idx) => src.slice(0, idx).split('\n').length;

for (const file of files) {
  const src = readFileSync(file, 'utf8');
  const isTokens = /tokens(\.[\w-]+)?\.css$/.test(file);
  const isHtml = /\.(html?|vue|svelte|astro|jsx|tsx)$/.test(file);

  for (const [id, sev, re, msg, test] of rules) {
    for (const m of src.matchAll(re)) if (!test || test(m)) add(file, lineOf(src, m.index), sev, id, msg);
  }

  // Off-token colors (outside token files and SVG path data).
  if (!isTokens) {
    const styleLike = src.replace(/<svg[\s\S]*?<\/svg>/gi, (s) => s.replace(/[^\n]/g, ' '));
    for (const m of styleLike.matchAll(COLOR_RE)) {
      const v = m[0].toLowerCase();
      const pre = styleLike.slice(Math.max(0, m.index - 40), m.index);
      if (/--[\w-]+\s*:\s*$/.test(pre)) continue; // defining a custom property
      if (/^#[0-9a-f]{3,8}$/.test(v) && /(&#|\burl\(|href=|id=|#[\w-]*$)/.test(pre.slice(-6))) continue;
      if (!/^#|\(/.test(v)) continue;
      const tok = tokenColorValues.get(v);
      add(file, lineOf(src, m.index), 'warn', 'off-token-color', tok ? `raw ${m[0]} — use var(${tok})` : `raw color ${m[0]} — use a semantic token`);
    }
  }

  // Off-scale spacing.
  if (spacing && !isTokens) {
    for (const m of src.matchAll(/\b(margin|padding|gap|row-gap|column-gap|inset|top|left|right|bottom)(-[a-z-]+)?\s*:\s*([^;}{]+)/g)) {
      const bad = [...m[3].matchAll(/(-?\d+(?:\.\d+)?)px/g)].map((x) => Math.abs(parseFloat(x[1]))).filter((n) => !spacing.has(n));
      if (bad.length) add(file, lineOf(src, m.index), 'warn', 'off-scale-space', `${m[1]}${m[2] ?? ''}: ${bad.join('px, ')}px not on spacing scale`);
    }
  }

  // Fonts.
  for (const m of src.matchAll(/font-family\s*:\s*([^;}{]+)/g)) {
    const first = m[1].split(',')[0].trim().replace(/["']/g, '').toLowerCase();
    if (first.startsWith('var(')) continue;
    if (CONVERGENT_FONTS.includes(first) && !tokenFonts.includes(first)) add(file, lineOf(src, m.index), 'warn', 'convergent-font', `"${first}" is a default AI-look font — justify in brief or choose by voice`);
    else if (tokenFonts.length && !tokenFonts.includes(first) && !['inherit', 'monospace', 'serif', 'sans-serif', 'system-ui'].includes(first)) add(file, lineOf(src, m.index), 'warn', 'off-token-font', `font "${first}" not in tokens — use var(--font-*)`);
  }

  // Focus removal without replacement.
  if (/outline\s*:\s*(none|0)\b/.test(src) && !/:focus-visible/.test(src)) {
    const idx = src.search(/outline\s*:\s*(none|0)\b/);
    add(file, lineOf(src, idx), 'error', 'focus-removed', 'outline removed without :focus-visible replacement');
  }

  // Document-level HTML checks.
  if (/\.html?$/.test(file) && /<html/i.test(src)) {
    if (!/<html[^>]*\blang=/i.test(src)) add(file, 1, 'error', 'html-lang', '<html> missing lang');
    if (!/<title>[^<]+<\/title>/i.test(src)) add(file, 1, 'error', 'title', 'missing <title>');
    if (!/name=["']viewport["']/i.test(src)) add(file, 1, 'error', 'viewport', 'missing viewport meta');
    const h1 = (src.match(/<h1\b/gi) || []).length;
    if (h1 !== 1) add(file, 1, 'warn', 'h1-count', `${h1} <h1> elements — use exactly one`);
    if (!/<main\b/i.test(src)) add(file, 1, 'warn', 'landmark', 'no <main> landmark');
  }
  if (isHtml) {
    for (const m of src.matchAll(/<(input|select|textarea)\b([^>]*)>/gi)) {
      const attrs = m[2];
      if (/type=["'](hidden|submit|button)["']/i.test(attrs)) continue;
      const id = attrs.match(/\bid=["']([^"']+)["']/)?.[1];
      const labelled = /aria-label(ledby)?=/.test(attrs) || (id && new RegExp(`for=["']${id}["']`).test(src));
      const wrapped = /<label[^>]*>[^]*$/i.test(src.slice(Math.max(0, m.index - 200), m.index)) && !/<\/label>[^]*$/i.test(src.slice(Math.max(0, m.index - 200), m.index));
      if (!labelled && !wrapped) add(file, lineOf(src, m.index), 'error', 'input-label', `<${m[1]}> without an associated label`);
    }
    for (const m of src.matchAll(/<button\b([^>]*)>\s*(<(svg|iconify-icon|i|img)\b[^]*?)<\/button>/gi)) {
      const text = m[2].replace(/<[^>]+>/g, '').trim();
      if (!text && !/aria-label/.test(m[1]) && !/<img[^>]*alt=["'][^"']+/.test(m[2])) add(file, lineOf(src, m.index), 'error', 'icon-button-name', 'icon-only button without aria-label');
    }
  }
}

// ---- output
const order = { error: 0, warn: 1, info: 2 };
findings.sort((a, b) => order[a.sev] - order[b.sev] || a.file.localeCompare(b.file) || a.line - b.line);
const count = (s) => findings.filter((f) => f.sev === s).length;
if (args.includes('--json')) {
  console.log(JSON.stringify({ files: files.length, findings }, null, 2));
} else {
  const MAX = 60;
  for (const f of findings.slice(0, MAX)) console.log(`${f.sev.toUpperCase().padEnd(5)} ${f.file}:${f.line} [${f.id}] ${f.msg}`);
  if (findings.length > MAX) console.log(`… ${findings.length - MAX} more (use --json)`);
  console.log(`lint: ${files.length} files · ${count('error')} errors · ${count('warn')} warnings · ${count('info')} info`);
}
process.exit(count('error') ? 1 : 0);
