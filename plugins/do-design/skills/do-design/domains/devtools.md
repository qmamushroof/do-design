# Developer tools
Scope: developer tools, APIs, docs sites, CLI web consoles, infra, observability, CI/CD, databases. Related: saas-dashboard, ai-product, productivity, startup-landing.
## Users & trust drivers
- Engineers on large desktop screens, often dark mode, keyboard-first; on-call users under high stress during incidents.
- Trust = copy-pasteable code that works, honest limits/pricing, precise errors, fast pages, no marketing between them and docs.
- Destroyers: vague hero copy, gated docs, broken code samples, hidden rate limits, UI that hides the raw data.
## Must-have patterns
- Code block: syntax highlighting, copy button, language/SDK tabs synced site-wide, line highlights, filename label.
- Docs layout: left nav tree, right "on this page" TOC, versioned docs switcher, search (Cmd+K) with API symbols.
- API reference: endpoint, params table (type, required, default), request/response examples, "try it" with user's keys.
- Logs/traces viewer: virtualized stream, monospaced, level filters, time-range brush, permalink to line, live tail toggle.
- Secrets/API keys: shown once, masked with reveal, scoped permissions, last-used timestamp, rotate/revoke.
## Key screens
- Landing, quickstart, docs, API reference, changelog, dashboard/projects, deploy/build detail, logs, metrics, settings/keys, usage/billing, status page.
## Visual register
- Range: terminal-austere (Fly, Tailscale), precise-minimal (Vercel, Stripe docs), playful-technical (Supabase, Railway, Charm).
- Monospace for code, IDs, hashes, paths; paired with a clean grotesk; consider tabular mono for metrics.
- Dark and light themes both first-class; syntax palette tested for contrast in both.
- Tired default to avoid: neon-on-black "hacker" gradients, glowing grid backgrounds, fake terminal typing animations, isometric server art.
## Domain rules
- Every ID, hash, endpoint, and command copyable; truncate middle (abc12…9f0e) with full value on hover.
- Times: relative ("3m ago") plus absolute ISO/UTC on hover; durations in ms/s with consistent precision.
- Errors show code, message, request ID, and docs link; never just "Something went wrong."
- WCAG 2.2 AA including code blocks; log level not color-only (text label: ERROR, WARN).
- Destructive infra actions (delete project, drop DB) require typed confirmation and state blast radius.
## Anti-patterns
- Code screenshots instead of text; code samples with placeholder syntax errors or outdated SDK versions.
- Generic "Build faster. Ship smarter." hero with no code or product shown above the fold.
- Emoji-laden docs, mascots crowding content, docs search that ignores API symbols.
## Research seeds
- Exemplars: Stripe Docs, Vercel, Supabase, Linear, Tailscale, Resend, Fly.io, Honeycomb.
- Queries: "best developer documentation sites 2026", "developer tool landing page design", "observability UI log viewer design".
