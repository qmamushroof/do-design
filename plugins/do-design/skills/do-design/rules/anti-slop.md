# Anti-slop: avoid the generic AI-generated look

AI UIs converge on statistically average choices. Nothing below is banned outright; each item needs a reason from the brief. "It looks modern" is not a reason.

## Principle
Spend boldness in one place: the signature from `brief.md`. Everything else is quiet, precise and conventional where conventions help users. Craft beats decoration.

## Visual tells (default → do instead)
- **Fonts**: Inter, Roboto, Open Sans, Lato, Poppins, Montserrat or the system stack as the only face; Space Grotesk as the "quirky" pick → choose by voice: a characterful grotesk, a humanist sans, a serif with real display cuts, a confident mono. Pair by contrast of structure, not two near-identical sans.
- **Weak scale**: 400 vs 600 weights, 1.2× size steps everywhere → decisive contrast where hierarchy matters (e.g. display 3× body; 300 vs 700), restraint elsewhere.
- **Purple/indigo → blue gradients** on white, gradient text in headlines, glowing blobs, mesh backgrounds → a flat, confident palette. Gradients only when they are the signature or the brand.
- **Overused "tasteful" defaults** (also convergence, needs a reason): cream `#F4F1EA` + high-contrast serif + terracotta accent; near-black + a single acid-green or vermilion accent; broadsheet hairlines + 0 radius + dense columns.
- **Card soup**: every section a rounded-2xl card with shadow-md and an icon in a tinted circle → vary the containers (plain sections, lists, tables, split layouts), and use cards only for discrete, actionable objects.
- **Uniform radius and shadow** on everything → radius follows component size (nested radius = outer − padding). Shadows are rare and layered, and they mean elevation.
- **Glassmorphism, neumorphism, gratuitous blur** → only for overlays where seeing what's behind matters.
- **Emoji as icons** and mixed icon sets → one icon set with a consistent stroke and size, aligned to the text cap-height.
- **Everything centered** → left-aligned content for reading and scanning; centre only short, isolated statements.
- **Decorative motion everywhere** (fade-up on every scroll, hover lifts on every card) → motion that explains change (see `motion.md`).

## Layout tells
- Hero with a gradient background, a two-line headline, a subhead, two buttons and a floating screenshot with a tilt.
- A three-column grid of feature cards with icons, then a logo row of greyed brands, then "Loved by teams" testimonial cards, then a three-tier pricing with the middle "Popular" badge, then a CTA band.
- A dashboard of four KPI cards with green/red percentages, a line chart, a donut chart and a "Recent activity" list.
→ Start from the user's job and content. Use a conventional structure only when it serves scanning, and make at least one structural decision that comes from this product's content (e.g. lead with the live product state, a real artifact, a comparison, a timeline, a map).

## Content tells (see `content.md`)
- Round fake metrics (10K+, 99.9%, 5x faster). Names like John Doe, Jane Smith or Acme Corp. "2 hours ago" on every item. Lorem ipsum.
- Copy clichés: "Unlock", "Elevate", "Seamless", "Supercharge", "Revolutionize", "Empower", "Your all-in-one…", "Get started" on every button, "Learn more" links.
- Headlines that could fit any product. If you can swap in a competitor's name and the line still works, rewrite it.

## Final squint test
Blur the screenshot. Can you still see 1 focal point, a clear reading order and calm neutrals? Then cover the logo. Could this be any other product? If yes, push the signature further or make one more decision specific to this product's content.
