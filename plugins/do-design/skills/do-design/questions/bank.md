# Question bank

Format: `key` [header ≤12 chars] question → options (first = usual default; re-rank per domain). Use `multi` for multiSelect.
Rewrite option text to fit the product. Keep labels ≤5 words and descriptions ≤15 words.

## R1 Foundation (Quick+)
- `product` [Product] What are we designing? → Marketing/landing site · Web app · Dashboard/admin · Mobile app · Desktop app · E-commerce · Email set
- `platforms` [Platforms] `multi` Which platforms and primary device? → Responsive web, mobile-first · Responsive web, desktop-first · iOS + Android · Desktop app
- `audience` [Audience] Who are the primary users? → General consumers · Professionals/experts · Internal team · Specific group (kids, seniors, clinicians…)
- `goal` [Goal] What's the #1 action the design must drive? → Sign up/convert · Complete a core task fast · Monitor and decide · Browse and discover

## R2 Scope (Quick+)
- `scope` [Scope] How much should I design? → Core flow end-to-end (5–8 screens) · Key screens only (3–4) · Full product map (10+) · Single page
- `directions` [Directions] Explore directions first? → 1 recommended direction · 3 distinct directions, pick one
- `brand` [Brand] What brand assets exist? → None, create identity · Logo + colors · Full brand guide · Existing design system/code
- `theme` [Theme] Color modes? → Light + dark · Light only · Dark only · Follow system, both

## R3 Personality (Standard+)
- `personality` [Personality] Which personality fits? → Calm & precise · Warm & human · Bold & expressive · Editorial & refined · Playful
- `density` [Density] Information density? → Balanced · Airy, focused · Compact · Data-dense
- `type` [Typography] Typographic voice? → Grotesk/neo-grotesk sans · Humanist sans · Serif display + sans body · Mono accents · Let research decide
- `color` [Color] Color strategy? → Neutral + one sharp accent · Brand-led bold · Muted natural tones · High-contrast duotone

## R4 Layout system (Standard+)
- `spacing` [Spacing] Spacing base? → 4px base, 8px rhythm · 8px strict · 4px dense
- `radius` [Corners] Corner style? → Subtle 4–6px · Sharp 0–2px · Soft 8–12px · Round 16px+/pill
- `nav` [Navigation] Primary navigation? → Sidebar · Top bar · Bottom tabs (mobile) · Command palette + minimal chrome
- `width` [Layout] Content width and grid? → 12-col, max 1280px · Fluid full-width (apps) · Narrow reading column 680–760px · Asymmetric editorial grid

## R5 Content & feel (Deep)
- `content` [Content] Content source? → Realistic generated content · I'll provide copy · Mix: I give key copy
- `motion` [Motion] Motion level? → Subtle functional (150–250ms) · Minimal/none · Expressive, choreographed
- `imagery` [Imagery] Imagery style? → Product UI/screens · Photography · Illustration · Typographic/none · Data visualization
- `icons` [Icons] Icon style? → Line 1.5px (Lucide/Tabler) · Phosphor (weights) · Filled/Material Symbols · Platform native (SF/Material)

## R6 Quality bars (Deep)
- `a11y` [Access] Accessibility target? → WCAG 2.2 AA · AAA where feasible · AA + seniors/low vision tuning
- `i18n` [Language] Localization? → Single language · Multi-language (+30% text) · Includes RTL
- `states` [States] `multi` States to cover? → Empty · Loading/skeleton · Error/offline · Edge content (long names, zero data)
- `devices` [Devices] Constraints? → Modern devices · Low-end/slow network · Touch + keyboard both · Kiosk/large screen

## R7 Inspiration (Deep)
- `refs` [References] Products you admire? → Let research choose · I'll name some (Other) · Match a competitor (Other)
- `avoid` [Avoid] `multi` Avoid? → Gradients/glassmorphism · Illustrations of people · Dark patterns/urgency · Heavy animation
- `voice` [Voice] Copy voice? → Plain & direct · Friendly · Formal/authoritative · Witty
- `signature` [Signature] Where to spend boldness? → Typography · Color · Layout/composition · Motion/interaction

## R8 Delivery (Deep)
- `fidelity` [Fidelity] Fidelity? → High-fidelity interactive · Mid-fi, real layout, light styling · Wireframe first, then hi-fi
- `tokens_out` [Tokens] `multi` Token outputs? → CSS variables · DTCG JSON · Tailwind theme · Figma variables JSON
- `tech` [Tech] Prototype tech? → Auto-detect (current: <detected>) · Static HTML/CSS/JS · Existing project stack
- `handoff` [Handoff] Handoff depth? → Component specs + tokens · + Redlines per screen · Tokens only
