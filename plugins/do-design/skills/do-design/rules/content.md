# Content and microcopy

## Realistic data
- Use content that matches the domain and audience. Names come from a diverse, region-appropriate mix; never John Doe, Jane Smith, Acme or Lorem.
- Uneven, plausible numbers: 1,238 not 1,000; +1.83% not +10%; $48.20 not $50. Mix magnitudes, and include zeros and negatives where real.
- Varied timestamps (just now, 14 min ago, yesterday 16:42, 3 Mar). Varied text lengths, including a long name, a missing avatar and a truncated title.
- Every screen includes at least one edge case in its default state (long string, empty optional field, 0 count) to prove the layout holds.
- Images: domain-specific and consistent in treatment. Mark placeholders clearly in the handoff. No people-stock clichés (handshakes, laptop smiles).

## Source of truth
- Identifiers, schema names, error codes, routes and fixed copy strings come verbatim from the project docs listed in `state.md` `## Doc constraints`, with a `file:line` source. Never write them from memory.
- If the docs don't define something the UI needs, use a clearly marked placeholder and record `GAP: <what>` (builders) or `NEW (needs owner)` (content model). Never invent a code that looks official.
- Doc copy still follows the punctuation rules below. Report each change you make to doc copy, and add it to `## Doc deltas` in `state.md`.

## Punctuation
- **No em dashes (U+2014)** in UI copy, generated docs, AskUserQuestion text or code string literals. Use a comma, colon, full stop or parentheses: "Run 1: 7 findings", "Fix next", "Not checked (reason)". `lint.mjs` errors on them.
- En dash (–) only for numeric ranges: "3–5 days", "09:00–17:00".
- Minus sign (−, U+2212) for negative numbers in display text; hyphen-minus in code.
- Middle dot (·) as a meta-line separator, at most 3 items per line.
- Curly quotes and apostrophes in display text; × for dimensions.

## UX writing
- Buttons say what happens: verb + object ("Save changes", "Send invoice", "Create project"). Never "Submit", "OK", "Click here".
- Headlines state the value in this product's terms. Specific beats clever.
- Errors: what happened + how to fix it, in plain language. No blame, no codes alone, no "Oops!".
- Empty states: what will appear here + the first action. A light touch of voice is fine; jokes are not.
- Confirmations: name the object and the consequence ("Delete 3 invoices? This can't be undone.") with the buttons "Delete invoices" / "Cancel".
- Sentence case for UI text. Consistent terminology: one word per concept across the product.
- Numbers and dates in the locale format. Units always shown. Currency with its code where ambiguous.
- Banned filler: unlock, elevate, seamless, supercharge, empower, revolutionize, next-level, all-in-one, effortless, cutting-edge, "Learn more" as the only link text.
- Match `voice` from the interview. Write copy as a design material, not a placeholder; final copy ships in the prototype.
