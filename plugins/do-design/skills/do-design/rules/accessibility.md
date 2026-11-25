# Accessibility floor (WCAG 2.2 AA; nothing overrides it)

## Perceivable
- Contrast: text ≥ 4.5:1; large text (≥ 24px, or ≥ 18.66px bold) ≥ 3:1; UI components, focus rings and graphics needed to understand content ≥ 3:1 against adjacent colours.
- Don't convey meaning by colour alone: add text, an icon, a pattern or position.
- Images: meaningful images get `alt`; decorative ones get `alt=""`. Icon-only buttons have an accessible name.
- Text resizes to 200% without loss. Reflow at 320 CSS px without 2-D scrolling (except tables, maps).
- Respect `prefers-reduced-motion`, `prefers-color-scheme`, and `forced-colors` (no info lost in Windows High Contrast).

## Operable
- Everything is keyboard-operable, with a logical tab order and no traps (dialogs trap focus intentionally and restore it on close).
- Visible focus indicator: `:focus-visible` with ≥ 2px outline at ≥ 3:1 contrast, never obscured by sticky headers (2.4.11).
- Target size ≥ 24×24 CSS px or enough spacing (2.5.8). Prefer 44px on touch.
- No functionality that needs dragging without a single-pointer alternative (2.5.7).
- Skip link to main content. Pause, stop or hide anything that moves for longer than 5s.
- No time limits without a way to extend; no content flashing more than 3 times per second.

## Understandable
- `lang` on `html`. Page `title` unique per screen.
- Labels and instructions for inputs. Errors identified in text, with suggestions; no reliance on placeholder text.
- Consistent navigation and help placement across screens (3.2.6). Don't ask for the same information twice (3.3.7).
- Authentication without cognitive tests: allow paste and password managers (3.3.8).

## Robust
- Semantic HTML first (`button`, `a`, `nav`, `main`, `header`, `label`, `table`). ARIA only to fill gaps, with correct roles, states and properties.
- Status messages announced via `role="status"` / `aria-live="polite"`.
- Custom widgets follow WAI-ARIA APG keyboard patterns (tabs, menu, combobox, dialog, disclosure).

## Mobile and native
- Support Dynamic Type / font scaling up to 200%. VoiceOver and TalkBack labels, traits and roles.
- Don't disable zoom. Respect safe areas.
