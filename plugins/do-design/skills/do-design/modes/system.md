# Mode — system

`/do-design system [path]`: create, extract or complete a design system only.

## A. Existing codebase (styles or components found)
1. **Extract**: Grep colour literals (hex/rgb/hsl/oklch), font families, font sizes, spacing values, radii, shadows, breakpoints, z-indices across styles and components. Count how often each value occurs.
2. **Cluster**: merge near-duplicates (ΔE < 3 for colour, ±1px for size). Map each cluster to a token role. Flag outliers and inconsistencies, with counts and file locations.
3. **Report**: show a summary of 10 lines or fewer: value counts before → after and the major inconsistencies. MCQ: Normalize to new tokens (Recommended) / Document as-is / Normalize + refactor code to use the tokens.
4. Then run Phase 5 (`workflow/5-system.md`) using the extracted values as primitives. Fill any gaps: missing states, dark mode, a scale with holes, missing semantic roles.
5. **Refactor** (if chosen): replace literals with tokens file by file. Run `lint.mjs` after.

## B. No codebase
Run the interview with only these rounds: R1 `product`/`audience`, R3, R4, plus R6 `a11y`. Respect the depth argument. Then run Phase 4 with 1 direction (specimen page only), then Phase 5.

## Output
`DESIGN.md`, `tokens.json`, `tokens.css` (+ stack theme), `system.html`, and an `audit.md` with the contrast and lint results.
