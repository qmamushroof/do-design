# Mode — iterate

`/do-design iterate "<change>"`: continue a previous run without re-interviewing.

1. Read `<out>/state.md`. If it's missing, tell the user and offer a full run.
2. Read `DESIGN.md`. Read other files only as the change requires.
3. **Classify the change**:
   - **Token-level** (colour, type, spacing, radius, motion): edit `tokens.json`, then regenerate with `tokens.mjs` and check with `contrast.mjs`. Never patch the generated CSS.
   - **Component-level**: update the spec in `DESIGN.md`, the implementation, and `system.html`.
   - **Screen/flow-level**: update the inventory in `brief.md`, then build or edit the screen(s).
   - **Direction-level** (whole new look): confirm with an MCQ first, since it rewrites the tokens and affects every screen.
4. If the change is ambiguous, ask at most one AskUserQuestion call, with up to 4 questions.
5. **Verify only what's affected**: run lint on the changed files, shoot the changed screens, and run the critic only if the change is visual and spans more than one screen.
6. Append to `state.md` under `## Changelog`: date, change, files touched. Then give a summary of 5 lines or fewer.
