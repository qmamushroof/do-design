# AI product
Scope: AI assistants, chat UIs, generative image/video/writing tools, copilots, agent consoles, AI search. Related: productivity, devtools, saas-dashboard, media-editorial.
## Users & trust drivers
- Mix of curious first-timers and daily power users; desktop for work, mobile for quick queries and voice.
- Trust = showing sources and reasoning, honest uncertainty, user control over actions and data, consistent output quality.
- Destroyers: confident wrong answers, unclear what data is used for training, agents acting without consent, lost work.
## Must-have patterns
- Composer: multiline, attachments, model/mode picker, stop button during generation, keyboard submit with clear shortcut.
- Streaming output with stable layout; markdown, code blocks with copy, tables; per-message copy, retry, edit-and-resend.
- Citations inline linked to sources panel; distinguish retrieved facts from generated text.
- Agent runs: step timeline (planning, tool calls, results), approval gates before irreversible actions, pause/cancel.
- Generative tools: prompt plus structured controls, variations grid, history/versions, side-by-side compare.
- Conversation management: history search, projects/folders, share with redaction, memory visibility and deletion.
## Key screens
- Empty/new chat, conversation, sources panel, artifact/canvas side panel, agent run detail, history, prompt library, settings/data controls, usage/plan.
## Visual register
- Range: calm editorial-literary (Claude, Perplexity), tool-dense pro (Cursor, Runway), playful creative (Midjourney web, tldraw make-real).
- Text is the interface: excellent reading typography (16-17px, 65-75ch) and clear speaker distinction without heavy bubbles.
- Tired default to avoid: purple-blue gradients, sparkle/star icons everywhere, glowing orbs, robot mascots, "magic" wording.
## Domain rules
- EU AI Act Art. 50 (Aug 2026): disclose AI interaction; mark AI-generated media machine-readably; label deepfakes.
- Show data use: training opt-out, retention, what memory holds; GDPR access/deletion for conversations.
- Errors specific: rate limit with reset time, context too long, content blocked with reason; preserve the prompt.
- Accessibility: aria-live polite for streaming (announce on completion), focus not stolen, reduced-motion typing effects.
- Confirm destructive or external actions (send email, purchase, deploy) with full preview of what will happen.
## Anti-patterns
- Chat as the only UI when a form or button would be faster; four generic suggestion chips on empty state.
- Fake typing delay, anthropomorphic "I'm so excited to help!"; hiding the model's limits.
- Agent progress as a spinner with "Thinking..." for minutes and no visible steps.
## Research seeds
- Exemplars: Claude, Perplexity, Cursor, ChatGPT, Granola, Runway, v0, Raycast AI.
- Queries: "AI UX patterns shape of AI", "agent interface design human in the loop", "generative AI tool UI 2026".
