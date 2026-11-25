# Mode — config

`/do-design config`: set the defaults that pre-answer interview questions and add custom rules.

1. MCQ: Scope → Personal (all projects: `~/.claude/do-design/preferences.md`) / This project (`.do-design/rules.md`, committed to share with the team).
2. Read the existing file, if any, and show its current keys in 8 lines or fewer.
3. MCQ (multiSelect): what to set → Interview defaults (depth, directions) / Visual defaults (density, radius, type, color, motion, icons) / Tech and output (output dir, tech, token formats) / Custom rules (free text).
4. For each chosen group, ask the matching questions from `questions/bank.md`, with "No default (ask each time)" as an option.
5. Custom rules: ask the user to type them via Other, one rule per line. Store them verbatim under `## Rules`.
6. Write the file in the format of `templates/preferences.md`. Show the final file path.

Precedence reminder: project rules override personal preferences, and in-run answers override both.
