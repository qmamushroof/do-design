# Phase 7 — Verify

Loop up to 3 passes. Each pass fixes blockers and majors, then re-checks only what changed.

## Checks (run in parallel where possible)
1. **Lint**: `node $S/lint.mjs <prototype dir> --tokens <out>/tokens.json`.
2. **Contrast**: `node $S/contrast.mjs <out>/tokens.json`.
3. **Render**: needs `shots` ≠ none.
   - Playwright: `node $S/shoot.mjs <entry or each screen> --out <out>/shots --sizes 375,768,1280`. Then add `--dark` for one pass. For stack targets, start the dev server first and pass the URL.
   - Browser tool: screenshot the same sizes manually.
   - Add `--states empty,loading,error` for screens that have states.
   - Blockers: console errors, horizontal overflow, broken images. Majors: failed requests, focus without outline or shadow (check it visually), targets under 24px.
4. **Review**: spawn in parallel:
   - `design-critic` (full mode) with screenshot paths, `brief.md`, `DESIGN.md`, `rules/anti-slop.md`.
   - `a11y-auditor` with prototype paths, the lint output and the contrast output.
   - With no screenshots, the critic reviews code only and says so.

## Pass criteria
- Lint and contrast are clean; no render blockers.
- Critic: every rubric dimension ≥ 4/5, with originality and hierarchy ≥ 4.
- a11y: zero blockers or majors at the `a11y` target.

## Record
Write `<out>/audit.md`: pass number, scores table, findings fixed, findings deferred (with reason), screenshot index. If 3 passes still fail, stop. List the remaining issues honestly in `audit.md` and in the final summary.

Next: `workflow/8-handoff.md`.
