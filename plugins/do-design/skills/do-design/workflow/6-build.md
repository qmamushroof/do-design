# Phase 6 — Build prototype

Read now: `rules/content.md`, `rules/motion.md` and `rules/accessibility.md`. Keep `DESIGN.md` as your contract. Don't reread the earlier rules files; use your notes in `state.md`.

## Structure
- **Static target** (`<out>/prototype/`):
  - `index.html`: screen map (cards linking every screen and state) and theme toggle.
  - One `<screen>.html` per screen.
  - `tokens.css` (generated; copy or link it), `app.css` (components; uses tokens only), `app.js` (vanilla).
  - Icons: one set, via `<script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js">`, then `<iconify-icon icon="<set>:<name>">`. Or inline SVG.
  - Fonts: Google Fonts or Fontsource links with `display=swap`; preconnect.
- **Stack target**: an isolated route or folder. Reuse existing components where they meet the spec; otherwise build them in `prototype/components/`. Use project conventions (TS, lint rules, file naming).
- **Mobile / desktop / email**: follow `platforms/<p>.md` (device frame, window chrome, table email).

## `app.js` must provide
- Real navigation: every link and button goes somewhere or does something. No `href="#"`.
- A state switcher: `?state=empty|loading|error|edge` toggles the screen's states. Add a small dev-only floating control, hidden on print.
- Theme toggle (light/dark/system), persisted in `localStorage`.
- Interactive behaviour of core flows: form validation, tabs, dialogs (focus-trapped, Esc closes), menus, toasts, optimistic updates.

## Order
1. Shell: layout, navigation and responsive behaviour.
2. Shared components (from `system.html`).
3. The P0 reference screen, fully finished. It sets the bar.
4. The remaining screens, by priority. With more than 4, spawn `screen-builder` agents in parallel, 2–3 screens each. Give each the paths to `DESIGN.md`, `tokens.css`, `app.css`, the reference screen, and its rows of the inventory plus the content model. They must not edit shared files. They report new component needs; you add those to `app.css` yourself.

## Every screen
- All states from the inventory, real content, responsive at 375/768/1280+ with no horizontal scroll, and keyboard reachability with a visible focus ring.
- Semantic HTML: landmarks, one `h1`, labelled controls, `alt` text.
- Only token values. No raw hex, px off the scale, or ad-hoc shadows.

Next: `workflow/7-verify.md`.
