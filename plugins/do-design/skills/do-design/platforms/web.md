# Platform — responsive web

- **Breakpoints** (content-driven defaults): 375 (base) · 640 · 768 · 1024 · 1280 · 1536. Test 320 for reflow.
- **Containers**: marketing max 1200–1320px; app shells are fluid with a 240–280px sidebar (collapsible to 64–72px icons); reading width 680–760px.
- **Navigation**:
  - Marketing: top bar ≤ 7 items, with a sticky header that shrinks or hides on scroll down.
  - Apps: sidebar for 5+ sections, top tabs for 2–5, breadcrumbs for depth > 2, command palette (⌘K) for power users.
- **Mobile web**: thumb-zone primary actions, bottom sheet for secondary choices. Avoid hover-only affordances, and set an `inputmode` per field.
- **Fluid type**: `clamp(min, preferred vw + rem, max)` for display sizes. Body is fixed in rem.
- **Performance budget**: LCP < 2.5s, CLS < 0.1, INP < 200ms. Use `font-display: swap`, sized images (`width`/`height`), lazy-loading below the fold, ≤ 2 font families and ≤ 4 font files.
- **Landing pages**: one message per section, proof close to the claim, a primary CTA repeated at natural decision points (not every section), and a scannable pricing table with feature comparison.
- **SEO and meta**: semantic headings, a descriptive `title` and meta description, Open Graph image, favicon set.
- **Dark mode**: `color-scheme: light dark`, with a `prefers-color-scheme` default and a user toggle that persists.
