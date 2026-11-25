# CRM & enterprise tools
Scope: CRM, ERP, internal tools, back-office, admin panels, data-heavy line-of-business apps. Related: saas-dashboard, productivity, hr-recruiting, logistics-industrial.
## Users & trust drivers
- Power users 6-8 h/day on desktop, often dual monitors; speed and keyboard flow beat aesthetics.
- Admins/managers need auditability: who changed what, when, why; silent data mutation destroys trust.
- Trust breakers: lost edits, slow tables, totals that disagree between views, permission surprises.
## Must-have patterns
- Data grid: sticky header/first column, resize/reorder/hide columns, saved views, inline edit, bulk select, virtualized 10k+ rows.
- Faceted filter bar with chips, saved/shared segments, filter+sort state serialized in URL for deep links.
- Record page: summary header (status, owner, key fields), related lists/tabs, activity timeline, side panel quick edit.
- Command palette (Cmd/Ctrl+K), global cross-entity search, shortcuts with discoverable cheat sheet.
- Bulk actions: affected-count preview, undo toast, background job progress; field history and unsaved-changes guard.
## Key screens
- List/grid views, record detail, create/edit form, pipeline kanban, reports, import wizard + mapping, approvals inbox, roles/permissions, audit log.
## Visual register
- Compact density (32-36px rows) with comfortable toggle; tabular numerals; 13-14px UI type (Inter, IBM Plex Sans, system UI).
- Mostly neutral; hue reserved for status, selection, errors; muted brand accent only on primary actions.
- Options: Linear-like monochrome precision, Airtable-like soft color-coding, Carbon/Fiori structured enterprise grid.
- Avoid tired default: card-per-record grids, giant KPI tiles with sparklines, decorative gradients on an all-day tool.
## Domain rules
- WCAG 2.2 AA (Section 508/EN 301 549 for public buyers); full keyboard grid operation (ARIA grid pattern).
- Numbers right-aligned, fixed decimals, locale-aware currency/dates, units and timezone shown; truncated IDs get copy button.
- Irreversible ops: explicit count, typed-name confirm; partial import failures downloadable as error CSV with row numbers.
- GDPR/CCPA: export, deletion requests, consent fields, role-based PII masking, access logging for sensitive records.
## Anti-patterns
- Marketing hero or welcome illustration atop a daily-use workspace.
- 10-row pagination with no page-size control; filters lost on back navigation.
- Modals stacked on modals for editing instead of inline edit or side panel.
- Icon-only toolbars without tooltips; status conveyed by unlabeled color dots.
## Research seeds
- Exemplars: Linear, Attio, Salesforce Lightning, HubSpot, Airtable, Retool, Folk, SAP Fiori.
- Queries: "enterprise data table UX best practices", "Attio CRM record page UI", "design system data grid guidelines".
