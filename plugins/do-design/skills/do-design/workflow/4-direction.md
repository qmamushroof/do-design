# Phase 4 — Visual direction

Read now: `rules/anti-slop.md`, `rules/core.md`, the platform file(s), and `research.md` if you need it.
Count: the `directions` answer. If unset: Skip/Quick → 1, Standard/Deep → 3.

## Define each direction (in `state.md`, ≤12 lines each)
- **Name** by character (e.g. "Ledger", "Greenhouse", "Night Shift"), never "Option A".
- **Thesis**: one sentence linking the brief to the visual choice.
- **Palette**: 4–6 hex values with roles (bg, surface, text, muted, accent, plus one support). Sketch them in OKLCH.
- **Type**: display and body families, plus mono if needed. Give a scale ratio and a weight strategy. Fonts must be available (Google Fonts, Fontsource or system) and licensed for use.
- **Shape**: radius, borders vs shadows, density, grid.
- **Signature**: the one bold move. Everything else stays quiet.
- **Motion character**: one line.
- **Cost**: what this direction trades away.

## Gates (before building)
1. **Slop check**: run each direction against `rules/anti-slop.md`. If it matches a convergence default, justify it from the brief or change it.
2. **Distinctness** (3 directions): any two may share at most one of layout, type family, palette family, imagery. Look at them as squinted light/dark masses; if two look alike, replace one.
3. **Brief fit**: each direction serves the audience, goal and domain rules.

## Build the comparison
- Build the single most representative P0 screen (hero or main dashboard) per direction, with real content.
- 3 directions: use `templates/compare.html`. One file per direction in `<out>/directions/`; switching is instant (no animation).
- 1 direction: one file, `<out>/directions/<name>.html`.
- Screenshot at desktop and mobile if `shots` ≠ none. Standard/Deep: spawn `design-critic` in compare mode for a ≤10-line verdict.

## Choose
- 3 directions: give a one-line pitch and cost for each, plus the critic's verdict. Don't pre-pick. MCQ: one option per direction (name + thesis) / Mix (describe in Other).
- 1 direction: rationale and screenshot path. MCQ: Proceed (Recommended) / Tweak (describe) / Show 2 alternatives.
- Skip mode: proceed with 1 and note it.

Record the chosen direction in `state.md`. Next: `workflow/5-system.md`.
