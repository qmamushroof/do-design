# do-design

`/do-design` turns a one-line idea into a complete, verified UI/UX design. It asks you multiple-choice questions (or none), looks at real products for inspiration, and then produces:

- **Design brief**: users, information architecture, Mermaid user flows, screen inventory, content model.
- **Design system**: `tokens.json` (single source) → CSS variables, Tailwind v4 theme, Figma variables; `DESIGN.md`; a live component gallery.
- **Clickable prototype**: every screen in the brief, with real content, empty/loading/error states, light/dark, responsive. Built in your stack, or as static HTML.
- **Verification**: lint, WCAG contrast, screenshots at 3 breakpoints, an independent design critique and an accessibility audit, fixed in up to 3 passes.
- **Handoff**: component specs, screen specs and a motion spec.

It covers responsive web, iOS/Android, desktop apps and email, with curated rule cards for 24 product domains.

## Install

**As a plugin** (includes dedicated subagents):
```
/plugin marketplace add qmamushroof/do-design
/plugin install do-design@do-design
```

**As a standalone skill** (gives the exact `/do-design` command):
```
node scripts/build.mjs --install        # → ~/.claude/skills/do-design
```

Requirements: Node ≥ 18. Playwright is optional but recommended. Run `node <skill>/scripts/doctor.mjs --install` once to enable screenshot verification. Without it, the skill falls back to a browser MCP tool or static checks.

## Use

| Command | What it does |
|---|---|
| `/do-design` | Full run. Asks what to design, then how many questions you want. |
| `/do-design quick "vet clinic booking app"` | Full run with ~8 questions. Depth is `skip`, `quick`, `standard` or `deep`. |
| `/do-design skip "pricing page for a time-tracking SaaS"` | No questions. Smart defaults, with the assumptions listed. |
| `/do-design review src/app/dashboard` | Critique, a11y and anti-slop audit of existing UI, with fixes. |
| `/do-design system` | Create, extract or complete a design system only. |
| `/do-design iterate "make it denser, add a reports screen"` | Continue a previous run without re-interviewing. |
| `/do-design config` | Save your defaults and custom rules. |

Output goes to `design/` (configurable).

## Customize

- Personal defaults: `~/.claude/do-design/preferences.md`
- Project rules, shared with your team: `.do-design/rules.md`

Both use the format in [templates/preferences.md](plugins/do-design/skills/do-design/templates/preferences.md), or let `/do-design config` write them. Precedence: in-run answers > project rules > personal preferences > domain cards > built-in rules. Accessibility (WCAG 2.2 AA) is a floor that nothing overrides.

To extend the knowledge, add a domain card to `domains/` (same template, ≤ 32 lines) and list it in `domains/_index.md`.

## How it stays cheap
`SKILL.md` is a short router. Each phase file, rule file and domain card is loaded only when its step runs. Research, critique, audit and bulk screen building run in subagents that return short summaries. Mechanical work (token builds, contrast, lint, screenshots) runs in zero-dependency Node scripts instead of model reasoning.

## Layout
```
plugins/do-design/
  agents/                 design-researcher, design-critic, a11y-auditor, screen-builder
  skills/do-design/
    SKILL.md              router
    workflow/             phases 0–8 (setup → handoff)
    modes/                review, system, iterate, config
    questions/bank.md     32 MCQs in 8 rounds, keyed for state + preferences
    rules/                core, anti-slop, accessibility, motion, content
    platforms/            web, mobile, desktop, email(+other)
    domains/              24 domain rule cards + index
    templates/            state, brief, DESIGN, handoff, preferences, tokens.json, compare.html
    scripts/              doctor, tokens, contrast, lint, shoot (Node, no deps)
scripts/build.mjs         builds dist/do-design standalone skill (+ --install)
```
