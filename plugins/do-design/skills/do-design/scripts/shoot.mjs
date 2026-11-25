#!/usr/bin/env node
// Screenshots + render checks.
// Usage: node shoot.mjs <file|dir|url>... [--out dir] [--sizes 375,768,1280] [--dark] [--states empty,loading,error] [--full]
// Reports: console errors, page errors, failed requests, broken images, horizontal overflow,
//          missing visible focus, small touch targets. Writes <out>/report.json. Exit 1 on blockers.
import { mkdirSync, statSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve, basename, extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadPlaywright } from './lib/playwright.mjs';

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : def; };
const flag = (name) => args.includes(name);
const valued = new Set(['--out', '--sizes', '--states']);
const targets = args.filter((a, i) => !a.startsWith('--') && !valued.has(args[i - 1]));
if (!targets.length) { console.error('Usage: node shoot.mjs <file|dir|url>... [--out dir] [--sizes 375,768,1280] [--dark] [--states a,b] [--full]'); process.exit(2); }

const out = opt('--out', 'shots');
const sizes = opt('--sizes', '375,768,1280').split(',').map(Number);
const states = opt('--states', '') ? ['', ...opt('--states').split(',')] : [''];
const schemes = flag('--dark') ? ['light', 'dark'] : ['light'];
mkdirSync(out, { recursive: true });

const found = await loadPlaywright();
if (!found) { console.log('shots=none — Playwright not found. Run: node doctor.mjs --install'); process.exit(3); }
const { chromium } = found.pw;

const urls = [];
for (const t of targets) {
  if (/^https?:\/\//.test(t)) { urls.push({ url: t, name: t.replace(/^https?:\/\//, '').replace(/[^\w.-]+/g, '_').slice(0, 60) }); continue; }
  const p = resolve(t);
  const files = statSync(p).isDirectory()
    ? readdirSync(p).filter((f) => extname(f) === '.html').map((f) => join(p, f))
    : [p];
  for (const f of files) urls.push({ url: pathToFileURL(f).href, name: basename(f, '.html') });
}

const browser = await chromium.launch();
const report = [];
let blockers = 0;

for (const { url, name } of urls) {
  for (const scheme of schemes) {
    for (const width of sizes) {
      for (const state of states) {
        const height = width < 600 ? 812 : width < 1100 ? 1024 : 900;
        const ctx = await browser.newContext({ viewport: { width, height }, colorScheme: scheme, deviceScaleFactor: width < 600 ? 2 : 1 });
        const page = await ctx.newPage();
        const issues = [];
        page.on('console', (m) => { if (m.type() === 'error' && !m.text().startsWith('Failed to load resource')) issues.push({ sev: 'blocker', kind: 'console', msg: m.text().slice(0, 200) }); });
        page.on('pageerror', (e) => issues.push({ sev: 'blocker', kind: 'pageerror', msg: String(e.message).slice(0, 200) }));
        page.on('requestfailed', (r) => issues.push({ sev: 'major', kind: 'request', msg: `${r.failure()?.errorText} ${r.url().startsWith('file:') ? decodeURI(r.url()).split('/').pop() : r.url().slice(0, 120)}` }));
        const target = state ? url + (url.includes('?') ? '&' : '?') + 'state=' + state : url;
        try {
          await page.goto(target, { waitUntil: 'networkidle', timeout: 30000 });
        } catch (e) {
          issues.push({ sev: 'blocker', kind: 'load', msg: e.message.slice(0, 200) });
        }
        await page.waitForTimeout(300);

        const checks = await page.evaluate(() => {
          const vw = document.documentElement.clientWidth;
          const r = { overflow: [], brokenImages: [], smallTargets: [], noFocus: [] };
          if (document.documentElement.scrollWidth > vw + 1) {
            for (const el of document.querySelectorAll('body *')) {
              const b = el.getBoundingClientRect();
              if (b.right > vw + 1 && b.width > 0 && getComputedStyle(el).position !== 'fixed') {
                const scroller = el.closest('[style*="overflow"], .scroll-x, table, pre');
                if (!scroller) r.overflow.push(el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''));
              }
              if (r.overflow.length >= 5) break;
            }
          }
          for (const img of document.images) if (img.complete && img.naturalWidth === 0) r.brokenImages.push(img.src.split('/').pop().slice(0, 80));
          const interactive = [...document.querySelectorAll('a[href], button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])')]
            .filter((el) => { const b = el.getBoundingClientRect(); return b.width > 0 && b.height > 0; });
          for (const el of interactive) {
            const b = el.getBoundingClientRect();
            const inline = el.tagName === 'A' && getComputedStyle(el).display === 'inline';
            if (!inline && (b.width < 24 || b.height < 24)) r.smallTargets.push(`${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(b.width)}×${Math.round(b.height)}`);
          }
          r.smallTargets = r.smallTargets.slice(0, 8);
          r.focusables = interactive.length;
          return r;
        });

        // Focus visibility: tab through first 12 elements, compare style before/after.
        for (let i = 0; i < Math.min(12, checks.focusables); i++) {
          await page.keyboard.press('Tab');
          const res = await page.evaluate(() => {
            const el = document.activeElement;
            if (!el || el === document.body) return null;
            const s = getComputedStyle(el);
            const visible = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || (s.boxShadow && s.boxShadow !== 'none');
            return visible ? null : `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}"`;
          });
          if (res && !checks.noFocus.includes(res)) checks.noFocus.push(res);
        }

        if (checks.overflow.length) issues.push({ sev: 'blocker', kind: 'overflow', msg: checks.overflow.join(', ') });
        if (checks.brokenImages.length) issues.push({ sev: 'blocker', kind: 'image', msg: checks.brokenImages.join(', ') });
        if (checks.noFocus.length) issues.push({ sev: 'major', kind: 'focus', msg: 'no outline/box-shadow on focus (verify another visible indicator exists): ' + checks.noFocus.join(', ') });
        if (checks.smallTargets.length) issues.push({ sev: 'major', kind: 'target', msg: '<24px: ' + checks.smallTargets.join('; ') });

        const file = join(out, `${name}${state ? '.' + state : ''}-${width}${scheme === 'dark' ? '-dark' : ''}.png`);
        await page.evaluate(() => { document.activeElement?.blur(); scrollTo(0, 0); });
        await page.screenshot({ path: file, fullPage: flag('--full') || width >= 600 });
        await ctx.close();
        blockers += issues.filter((x) => x.sev === 'blocker').length;
        report.push({ file, url: target, width, scheme, issues });
      }
    }
  }
}
await browser.close();
// Compact output: one line per unique issue per page, listing the variants it appeared in.
const byPage = new Map();
for (const r of report) {
  const key = r.url.replace(/[?&]state=.*/, '');
  if (!byPage.has(key)) byPage.set(key, { shots: [], issues: new Map() });
  const pg = byPage.get(key);
  pg.shots.push(r.file);
  const variant = `${r.width}${r.scheme === 'dark' ? 'd' : ''}${/state=(\w+)/.exec(r.url)?.[1] ? ':' + /state=(\w+)/.exec(r.url)[1] : ''}`;
  for (const x of r.issues) {
    const k = `[${x.sev}] ${x.kind}: ${x.msg}`;
    if (!pg.issues.has(k)) pg.issues.set(k, []);
    pg.issues.get(k).push(variant);
  }
}
for (const [url, pg] of byPage) {
  console.log(`${pg.issues.size ? '✗' : '✓'} ${url.split('/').pop()} — ${pg.shots.length} shots`);
  for (const [k, v] of pg.issues) console.log(`   ${k} (${v.length === pg.shots.length ? 'all' : v.join(',')})`);
}
writeFileSync(join(out, 'report.json'), JSON.stringify(report, null, 2));
console.log(`shots: ${report.length} captured, ${blockers} blocker(s) → ${join(out, 'report.json')}`);
process.exit(blockers ? 1 : 0);
