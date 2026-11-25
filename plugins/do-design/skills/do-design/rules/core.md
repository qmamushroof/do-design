# Core design rules

## Hierarchy
- One primary action per view. Secondary actions are visually quieter (ghost, outline or link), never a second filled button of equal weight.
- Build hierarchy with size, weight, colour and space together. Pick 2 levers per step, not all 4.
- Users should get the screen's purpose from a 5-second scan: title, key number or state, main action.
- De-emphasize instead of emphasizing: lighten the secondary text before you enlarge the primary.

## Spacing and layout
- Use only spacing-scale values. Same relationship → same space. Gaps inside a group are smaller than gaps between groups (ratio ≥ 1.5×).
- Group by proximity first, then alignment, then background. Borders and dividers come last. No box inside a box inside a box.
- Align to a grid. Every element shares an edge with something. Optical alignment beats mathematical alignment for icons and type.
- Line length for text 45–75ch. Numeric columns are right-aligned with tabular numerals.
- Touch targets ≥ 44×44 (iOS), ≥ 48×48dp (Android), ≥ 24×24 for pointer with spacing (WCAG 2.5.8).
- Pick a content max-width deliberately. Don't stretch forms or text to full width on large screens.

## Typography
- 1–2 families (plus mono if needed). Use 3–4 weights max. Use a size scale; no in-between sizes.
- Body ≥ 16px on web/mobile; dense apps 14px minimum for body and 12px for meta, never smaller. Body line-height 1.5–1.65.
- Headings: tighter line-height (1.05–1.25) and slight negative tracking at large sizes. All-caps labels: +0.04–0.08em tracking, ≤ 13px, used sparingly.
- Use real typographic characters: curly quotes, en dash for ranges, × for dimensions, a thin space before units where house style allows.
- Prevent orphans in headings (`text-wrap: balance`) and in body (`text-wrap: pretty`). Never break inside numbers + units.

## Color
- Neutrals carry 80–90% of the UI. The accent signals interaction or a key state only; if everything is accent, nothing is.
- Tint the neutrals toward the brand hue. Use pure #000/#fff only deliberately.
- Status colours have fixed meanings (danger, warning, success, info). Never use them for decoration, and never as the only signal: add an icon or text.
- Dark mode: surfaces get lighter as they elevate, borders are subtle, accents are slightly desaturated, and no pure-black backgrounds behind long text.
- Build palettes in OKLCH for perceptually even ramps. Verify contrast with the script; don't eyeball it.

## Components and states
- Every interactive element has hover, focus-visible, active and disabled states. Add loading, invalid and selected where they apply.
- Disabled buttons explain why (tooltip or helper text), or stay enabled and validate on submit.
- Forms: labels above fields (not placeholder-only), helper text below, inline errors that say how to fix the problem, optional fields marked (not required ones, when most are required), and a sensible autocomplete and `inputmode`.
- Destructive actions: name the object ("Delete project 'Atlas'"). Undo beats a confirm dialog when it's feasible.
- Empty states: explain what will be here, plus one action to get started. Loading: skeletons that match the layout for >300ms, a spinner only inside buttons/small regions. Errors: what happened, why, and what to do. Keep the user's input.

## Data display
- Format numbers per locale. Use consistent precision, abbreviate large values with a tooltip showing the exact one, and use relative time with an absolute-time tooltip.
- Tables: sticky header, sortable columns marked, row hover, density toggle for data-dense products, truncate with a tooltip, column alignment by type.
- Charts: label directly over legends where possible, start at zero for bars, and use colour only alongside a pattern, label or position.

## Responsive
- Design mobile and desktop as deliberate layouts, not one layout squeezed. Reflow at content breakpoints.
- Navigation transforms: sidebar → drawer or bottom tabs. Tables → cards or priority columns. Multi-column → stacked, in task order.
- No horizontal scroll at 320–375px except intentional carousels or tables with a visible affordance.
