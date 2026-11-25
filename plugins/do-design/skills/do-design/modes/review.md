# Mode — review

`/do-design review <path | url | route>`: audit existing UI and fix it.

1. **Target.** A path to a folder or file, a URL, or a running dev-server route. If none is given, ask with an MCQ listing likely candidates found via Glob (pages and routes).
2. **Context.** Read `.do-design/rules.md`, preferences, and `DESIGN.md` or theme files if they exist. Infer the domain → read 1 domain card and the platform file.
3. **Collect evidence** (parallel):
   - `node $S/lint.mjs <dir>`, adding `--tokens` if a `tokens.json` exists.
   - `node $S/shoot.mjs <url|file> --out <out>/review/shots --sizes 375,768,1280`.
   - `node $S/contrast.mjs` if there is a `tokens.json`. Otherwise the a11y-auditor checks contrast from the CSS.
4. **Review.** Spawn `design-critic` (full mode) and `a11y-auditor` in parallel.
5. **Report.** Write `<out>/review.md` with:
   - A scores table.
   - Findings, grouped by severity (blocker / major / minor / polish). Each has its location (`file:line` or screen + region), the issue, the rule it breaks, and the fix.
   - The top 3 highest-leverage changes.
6. **Act.** Show a summary of 10 lines or fewer. MCQ: Fix blockers + majors (Recommended) / Fix everything / Report only / Redesign with full pipeline.
7. **Fix.** Use minimal, convention-respecting edits, then re-run only the failed checks. Append the results to `review.md`.
