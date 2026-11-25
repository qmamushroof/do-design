# Motion

- **Purpose**: motion explains change (where something came from or went, what changed, what's loading). Never decorate.
- **Durations**: micro (hover, press) 100–150ms; small UI (menus, tooltips) 150–200ms; panels and dialogs 200–300ms; page transitions ≤ 400ms. Exits run ~20% faster than entrances.
- **Easing**: entrances ease-out (`cubic-bezier(0.2, 0, 0, 1)`), exits ease-in (`cubic-bezier(0.4, 0, 1, 1)`), on-screen moves ease-in-out. Never linear, except progress and loops.
- **Properties**: animate only `transform` and `opacity` (and `filter` sparingly). Never animate layout properties. Never use `transition: all`.
- **Feedback**: press response within 100ms. Optimistic UI for fast actions. Show progress after 1s and an estimate after 10s.
- **Choreography**: one orchestrated entrance per page at most (stagger 30–60ms, ≤ 6 items). Scroll reveals only for long-form storytelling, never on app screens.
- **Reduced motion**: under `prefers-reduced-motion: reduce`, replace movement with opacity, or nothing. Keep any essential state change visible.
- **Frequency rule**: the more often an interaction happens, the less animation it gets. Keyboard and command-palette actions get none.
- **Native**: iOS uses spring physics (response ~0.35–0.5, damping ~0.8–1). Android uses Material motion tokens (emphasized decelerate for entrances).
