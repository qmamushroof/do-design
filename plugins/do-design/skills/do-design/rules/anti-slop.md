# Anti-slop: avoid the generic AI-generated look

AI UIs converge on statistically average choices. Items under "Visual tells" need a reason from the brief; "it looks modern" is not a reason, and a value copied from a project doc is not a reason either (ask the user, see `SKILL.md` "Project docs"). Items under "Hard bans" and "Noise budget" are limits, not suggestions: `lint.mjs` enforces them.

## Principle
Spend boldness in one place: the signature from `brief.md`. Everything else is quiet, precise and conventional where conventions help users. Craft beats decoration. When unsure, remove.

## Hard bans (lint errors)
- **Em dash (U+2014)** anywhere in UI copy, generated docs, questions or code strings → comma, colon or full stop. En dash only for numeric ranges (`3–5`); minus sign (U+2212) for negatives. (`lint.mjs` rule `em-dash`.)
- Lorem ipsum, John Doe, Acme, `href="#"`, `transition: all`, disabled zoom, leftover `/* PROPOSED` markers at handoff.

## Noise budget (hard limits; `lint.mjs` rule `noise`)
- **Tags**: max 2 visual tags (chip, badge, pill, tag) per row, card or header. Everything else is plain text in one meta line (`Open · Medium confidence · axe`).
- **Buttons**: max 1 filled + 1 outlined button per toolbar or page head. Every other action is ghost, link or in an overflow menu (⋯).
- **Each datum once per view.** No summary box, delta box or chart that repeats what a table, overlay or heading already shows. Two representations of one number need a reason in `brief.md`.
- **No pattern fills** (hatching, ruler ticks, stripes, `repeating-linear-gradient`) outside data visualisation.
- **Borders** only between unrelated groups. Never a bordered box inside a bordered box; use space or a hairline divider instead.
- **Status** = icon + coloured word. No tinted-background pills for status.
- **Repeated row meta**: if every row in a list shares the same value, show it once in the header or filter, not on each row.

## Visual tells (default → do instead)
- **Fonts**: Inter, Roboto, Open Sans, Lato, Poppins, Montserrat or the system stack as the only face; Space Grotesk as the "quirky" pick → choose by voice: a characterful grotesk, a humanist sans (e.g. IBM Plex Sans, Source Sans 3), a serif with real display cuts, a confident mono. Pair by contrast of structure, not two near-identical sans. The system stack is allowed only when the user picked it in the interview.
- **Uppercase mono eyebrows** ("RUN · RUN_7F3A") and mono numerals in prose → mono only for code, IDs, hashes and selectors. Eyebrows, if any, use the body face in sentence case.
- **Pill or tinted chips for status** → icon + coloured word (`● Failed`).
- **Radius ≥ 8px on dense tools** (dashboards, editors, tables) → 3–6px. Radius follows component size (nested radius = outer − padding). Pills (999px) only for avatars, dots, switches and counters. (`lint.mjs` rule `pill`.)
- **More than 4 hues** → neutrals + 1 accent + only the status hues you must have (usually danger, plus success or warning). Encode severity by shape, position and word, not a new hue each. (`lint.mjs` rule `hue-count`.)
- **Weak scale**: 400 vs 600 weights, 1.2× size steps everywhere → decisive contrast where hierarchy matters (e.g. display 3× body; 300 vs 700), restraint elsewhere.
- **Purple/indigo → blue gradients** on white, gradient text in headlines, glowing blobs, mesh backgrounds → a flat, confident palette. Gradients only when they are the signature or the brand.
- **Overused "tasteful" defaults** (also convergence, needs a reason): cream `#F4F1EA` + high-contrast serif + terracotta accent; near-black + a single acid-green or vermilion accent; broadsheet hairlines + 0 radius + dense columns.
- **Card soup**: every section a rounded-2xl card with shadow-md and an icon in a tinted circle → vary the containers (plain sections, lists, tables, split layouts), and use cards only for discrete, actionable objects.
- **Uniform shadow** on everything → shadows are rare and layered, and they mean elevation.
- **Glassmorphism, neumorphism, gratuitous blur** → only for overlays where seeing what's behind matters.
- **Emoji as icons** and mixed icon sets → one icon set with a consistent stroke and size, aligned to the text cap-height.
- **Centred text everywhere** → left-aligned text for reading and scanning; centre only short, isolated statements. (Centring the page *column* is different: it is the default for single-column pages, see `platforms/web.md` "Page frame".)
- **Decorative motion everywhere** (fade-up on every scroll, hover lifts on every card) → motion that explains change (see `motion.md`).

## Layout tells
- Hero with a gradient background, a two-line headline, a subhead, two buttons and a floating screenshot with a tilt.
- A three-column grid of feature cards with icons, then a logo row of greyed brands, then "Loved by teams" testimonial cards, then a three-tier pricing with the middle "Popular" badge, then a CTA band.
- A dashboard of four KPI cards with green/red percentages, a line chart, a donut chart and a "Recent activity" list.
→ Start from the user's job and content. Use a conventional structure only when it serves scanning, and make at least one structural decision that comes from this product's content (e.g. lead with the live product state, a real artifact, a comparison, a timeline, a map).

## Content tells (see `content.md`)
- Round fake metrics (10K+, 99.9%, 5x faster). Names like John Doe, Jane Smith or Acme Corp. "2 hours ago" on every item. Lorem ipsum.
- Copy clichés: "Unlock", "Elevate", "Seamless", "Supercharge", "Revolutionize", "Empower", "Your all-in-one…", "Get started" on every button, "Learn more" links.
- Em dashes joining two clauses ("Run 1 — 7 findings") → "Run 1: 7 findings".
- Headlines that could fit any product. If you can swap in a competitor's name and the line still works, rewrite it.

## Final squint test
Blur the screenshot. Can you still see 1 focal point, a clear reading order and calm neutrals? Count competing elements per region: more than about 5 things fighting for attention in one region means cut. Then cover the logo. Could this be any other product? If yes, push the signature further or make one more decision specific to this product's content.
