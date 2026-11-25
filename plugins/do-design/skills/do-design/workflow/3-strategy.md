# Phase 3 — Strategy (brief, IA, flows)

Write `<out>/brief.md` from `templates/brief.md`. Be specific. A sentence that could fit any product gets deleted.

1. **Problem and goal**: one paragraph. Success metric(s) a PM would track.
2. **Users**: 1–2 lean profiles: context, top 3 jobs-to-be-done, top frustration. No stock persona fluff (no ages, hobbies, quotes).
3. **Constraints**: platforms, a11y target, locales, tech, brand, legal/domain rules from the domain card.
4. **IA**: sitemap as a nested list. Navigation model and why.
5. **Flows**: core flows as Mermaid `flowchart LR`, including decision and error branches. Max 3 flows; Deep allows 5.
6. **Screen inventory**: table with Screen · Purpose · Key components · States (default/empty/loading/error/edge) · Priority (P0–P2). Scope follows `scope`.
7. **Content model**: the real entities and fields shown in the UI, with realistic sample values (see `rules/content.md`).
8. **Design intent**: six lines, each concrete:
   - Who uses it and what they're doing.
   - The hero moment and the main action.
   - Baseline: the domain conventions you keep.
   - Deviation: where you depart from the convention, and why.
   - Direction in one sentence.
   - Signature: the one bold move, plus where everything stays quiet.

## Checkpoint
- Standard/Deep: show the screen inventory and flow names (≤12 lines). In Skip mode, show the `assumed:` list instead. Ask one MCQ: Approve (Recommended) / Add or remove screens / Change flows / Change assumptions.
- Quick: show the inventory in ≤6 lines, then continue without asking.

Next: `workflow/4-direction.md`.
