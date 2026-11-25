# Phase 0 — Setup

1. **Preferences.** Read `~/.claude/do-design/preferences.md` and `.do-design/rules.md` if they exist. Note the keys they set: those questions are pre-answered. `out:` sets the output dir (default `design/`).
2. **Existing run.** If `<out>/state.md` exists, ask with one MCQ: Resume from the last phase (Recommended) / Start fresh (move the old run to `<out>/_archive/<YYYY-MM-DD>/`) / Iterate on it (switch to `modes/iterate.md`).
3. **Detect project** (Glob/Grep, no deep reads):
   - Stack: `package.json` deps (next, react, vue, nuxt, svelte, astro, solid, angular, electron, tauri, react-native, expo), `pubspec.yaml` (Flutter), `*.xcodeproj`/`Package.swift` (SwiftUI), `build.gradle*` (Compose).
   - Styling: tailwind (version), `components.json` (shadcn), CSS modules, styled-components, MUI, Chakra.
   - Existing design: theme files, CSS custom properties, tailwind theme, fonts, logo/brand assets.
   - Empty or no stack → standalone HTML target.
4. **Build target.**
   - Stack found → build inside it on an isolated route or folder (`/prototype`, `src/prototype/`). Never edit production screens unless the user asks.
   - No stack → `<out>/prototype/` as static HTML/CSS/JS.
   - Native mobile without a web stack → HTML device-framed prototype (see `platforms/mobile.md`).
5. **Tooling.** Run `node ${CLAUDE_SKILL_DIR}/scripts/doctor.mjs`. Record `shots: playwright | browser-tool | none`. Use `browser-tool` when you have a browser or screenshot MCP tool and Playwright is missing.
6. **State.** Create `<out>/state.md` from `templates/state.md`. Fill in the brief, stack, target, tooling and preference keys.
7. Go to `workflow/1-interview.md`.
