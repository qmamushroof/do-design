# Phase 5 — Design system

The single source of truth is `<out>/tokens.json` (DTCG-style; format in `templates/tokens.json`). Generate everything else from it.

## 1. Tokens (three tiers)
- **Primitive**: color ramps in OKLCH. Steps 50–950 for the neutral, the accent and each status colour. Tint the neutrals toward the accent hue (chroma 0.005–0.02), never pure grey.
- **Semantic**: `bg`, `surface`, `surface-raised`, `surface-sunken`, `border`, `border-strong`, `text`, `text-muted`, `text-subtle`, `accent`, `accent-hover`, `accent-fg`, `focus`, `success|warning|danger|info` (+`-fg`, `-subtle`). Map light and dark separately. Dark mode is redesigned, not inverted: raise surfaces by lightness and desaturate the accent ~10%.
- **Component**: only where a component diverges from the semantic tokens (e.g. `button-primary-bg`).
- **Type**: families; size scale from a ratio (apps 1.125–1.2, marketing 1.25–1.333, editorial up to 1.5). Web display sizes use `clamp()`. Line-height falls as size grows: body 1.5–1.65, headings 1.05–1.25. Letter-spacing −0.01 to −0.03em at display sizes. Use 3–4 weights max.
- **Space**: base 4 → 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128.
- **Radius, border width, elevation** (2–4 layered shadows tinted with the bg hue), **z-index**, **motion** (durations 100/150/200/300/500, easings: standard, enter, exit), **breakpoints**, **layout** (container widths, gutters, columns).

## 2. Generate and verify
1. `node $S/tokens.mjs <out>/tokens.json <out>` (add `--tailwind` for Tailwind v4 targets).
2. `node $S/contrast.mjs <out>/tokens.json`. Fix failures in `tokens.json` and regenerate. Zero failures is required.
3. Stack target: wire the tokens into the stack's theme (Tailwind `@theme`, a CSS vars import, a MUI/Chakra theme, a Flutter `ThemeData`, a SwiftUI asset catalog/extension). Reference the generated values; don't re-type them.

## 3. Components
- Inventory = the union of the "Key components" column in `brief.md`. Don't build a generic kit.
- Each component specifies: anatomy, variants (explicit; no boolean-prop soup), sizes, and states: default, hover, focus-visible, active, disabled, loading, invalid, selected (as applicable). Also its tokens and a11y role/keyboard.
- Platform conventions come from `platforms/<p>.md`.

## 4. Document
- `<out>/DESIGN.md` from `templates/DESIGN.md`: principles (3, specific), token tables, type specimen, component specs, do/don't pairs. It must be concise enough for an agent to follow.
- `<out>/system.html` (or a stack route): a live gallery of tokens and every component state, in light and dark.

Next: `workflow/6-build.md`.
