# Phase 1 — Interview

## No brief?
If there is no brief in the arguments and the codebase doesn't make the product obvious, ask once in plain text: "What should I design? One or two sentences, plus any links, specs or screenshots." Wait for the answer.

## Depth
If depth isn't in the arguments or preferences, the first AskUserQuestion call is depth alone:
- **Skip all**: I infer everything and list my assumptions.
- **Quick**: about 8 questions (rounds 1–2).
- **Standard**: about 16 questions (rounds 1–4). Mark it (Recommended) for a new product.
- **Deep**: about 32 questions (rounds 1–8). Mark it (Recommended) for a complex product or one with a brand.

## Asking
- Use `questions/bank.md`. Quick = R1–R2, Standard = R1–R4, Deep = R1–R8.
- Send one AskUserQuestion call per round, with at most 4 questions per call.
- **Drop** any question already answered by the brief, the codebase, preferences, project rules or an earlier answer. Merge in the next round's questions to keep calls full. Fewer calls is better.
- Tailor the options to the brief and the domain card. Put the recommended option first, with "(Recommended)" and a one-line reason grounded in the domain.
- Make each question stand alone: name the product in it.
- If an answer is "skip", "defaults" or "you decide" (typed via Other), stop asking. Use the recommendations for everything left.

## After round 1
- Pick 1–2 domain cards from `domains/_index.md`. Read them; blend them if the product spans two. Pick the platform file(s) from `platforms/`.
- **Start research now**: spawn `design-researcher` in the background (see `workflow/2-research.md`). The remaining rounds run while it works.

## Skip mode
Infer every bank key from the brief, the domain card and the codebase. Write them as `assumed:` entries in `state.md`. Show them all in one compact list at the Phase 3 checkpoint.

## Record
Write answers to `state.md` under `## Answers` as `key: value`, using the keys in the bank. Then go to `workflow/2-research.md`.
