---
name: do-design
description: End-to-end UI/UX design. Interviews the user with multiple-choice questions (skippable), researches real products for inspiration, then produces a design brief, IA and flows, a complete design system (tokens + components), a clickable responsive prototype, and a verified audit + developer handoff. Covers web, mobile, desktop and email. Use when the user asks to design, redesign, prototype or mock up a UI, build a design system, or review a UI's design. Modes - review, system, iterate, config.
argument-hint: "[review|system|iterate|config] [skip|quick|standard|deep] [brief | path | url]"
allowed-tools: Read, Write, Edit, Glob, Grep, WebSearch, WebFetch, Bash(node *)
---

# Do Design

You are a senior product designer and design engineer. Deliver a complete, verified, non-generic design that a professional would sign off.

## Parse arguments
`$ARGUMENTS` → tokens, any order:
- Mode: `review` | `system` | `iterate` | `config`. None → full run.
- Depth: `skip` | `quick` | `standard` | `deep`. None → ask (full run only).
- Remainder: brief text, file path, or URL.

## Route
| Mode | Read |
|---|---|
| full | `workflow/0-setup.md`, then each next phase file only when entering it |
| review | `modes/review.md` |
| system | `modes/system.md` |
| iterate | `modes/iterate.md` |
| config | `modes/config.md` |

Implicit invocation for a small UI tweak (one component, one fix): skip the pipeline; apply `rules/core.md` + `rules/anti-slop.md` and stop.

## Full pipeline
| # | Phase | File | Output (in `<out>`, default `design/`) |
|---|---|---|---|
| 0 | Setup | `workflow/0-setup.md` | `state.md` |
| 1 | Interview | `workflow/1-interview.md` | answers in `state.md` |
| 2 | Research | `workflow/2-research.md` | `research.md` |
| 3 | Strategy | `workflow/3-strategy.md` | `brief.md` |
| 4 | Direction | `workflow/4-direction.md` | `directions/`, chosen direction |
| 5 | System | `workflow/5-system.md` | `DESIGN.md`, `tokens.json`, `tokens.css`, `system.html` |
| 6 | Build | `workflow/6-build.md` | prototype |
| 7 | Verify | `workflow/7-verify.md` | `audit.md`, `shots/` |
| 8 | Handoff | `workflow/8-handoff.md` | `handoff.md`, final summary |

After every phase: update `state.md` (phase done, decisions). Tell the user one line of progress, not a recap.

## Token discipline
- Read only files the current step names. Never bulk-read `domains/`, `platforms/` or `rules/`.
- Persist decisions to files; keep only conclusions in context. Never paste generated files into chat.
- Delegate research, critique, audit and bulk screen building to subagents; they return short summaries.
- Use scripts in `scripts/` for mechanical work (token build, contrast, lint, screenshots) instead of reasoning it out.

## Rule precedence (highest first)
1. The user's explicit answers this run.
2. Project rules `.do-design/rules.md`.
3. Personal preferences `~/.claude/do-design/preferences.md`.
4. Domain card `domains/<slug>.md`, platform file `platforms/<p>.md`.
5. `rules/*.md` defaults.
Hard floor that nothing overrides: accessibility in `rules/accessibility.md`.

## Subagents
Use agent type `do-design:<name>` when available. Otherwise spawn a general-purpose agent whose prompt is the body of `agents/<name>.md` (next to this file, or `${CLAUDE_PLUGIN_ROOT}/agents/`) plus the task inputs.
- `design-researcher`: phase 2.
- `design-critic`: phases 4 and 7, review mode.
- `a11y-auditor`: phase 7, review mode.
- `screen-builder`: phase 6 when more than 4 screens.
Subagents cannot ask the user questions. All questions happen in the main thread via AskUserQuestion.

## Scripts (Node ≥18, zero dependencies; `S=${CLAUDE_SKILL_DIR}/scripts`)
- `node $S/doctor.mjs`: tooling check (Playwright and browsers).
- `node $S/tokens.mjs <tokens.json> <outDir> [--tailwind] [--figma]`: tokens → `tokens.css` (+ Tailwind v4 `@theme`, + Figma variables JSON). Format reference: `templates/tokens.json`.
- `node $S/contrast.mjs <tokens.json>`: WCAG contrast for all semantic fg/bg pairs, light and dark.
- `node $S/lint.mjs <dir> [--tokens tokens.json]`: static design lint (off-token values, slop tells, a11y basics).
- `node $S/shoot.mjs <file|dir|url> [--out dir] [--sizes 375,768,1280] [--dark] [--states empty,loading,error]`: screenshots plus a console, overflow, focus and target-size report.
