# Phase 8 — Handoff

Write `<out>/handoff.md` from `templates/handoff.md`. Depth follows `handoff`.
- **Tokens**: point to `tokens.json`, `tokens.css` and any stack theme files, then explain how to consume them. If `tokens_out` includes Figma, re-run `tokens.mjs` with `--figma`. It writes `tokens.figma.json`: collections Primitives/Semantic, modes Light/Dark.
- **Components**: per component: anatomy, variants, sizes, states table, tokens used, a11y (role, keyboard, ARIA), and implementation notes (e.g. compound component API).
- **Screens**: purpose, layout grid per breakpoint, responsive behaviour, states, data dependencies, edge cases.
- **Interactions and motion**: trigger → change → duration/easing token → reduced-motion fallback.
- **Assets**: fonts (source, license), icon set, images (placeholders to replace).
- **Open questions**: decisions that need stakeholder input.

## Final message to user (≤15 lines)
- What was made: counts of screens, components and tokens.
- How to open it: the path to `prototype/index.html` and `system.html`, or the route and dev command.
- Verification result: pass number and scores, plus anything deferred.
- Assumptions made (Skip/Quick).
- 2–3 suggested next steps, phrased as `/do-design iterate "<change>"` commands.

Set `phase: done` in `state.md`.
