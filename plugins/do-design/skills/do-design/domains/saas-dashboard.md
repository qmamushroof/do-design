# SaaS dashboard
Scope: B2B SaaS apps, analytics dashboards, admin panels, internal tools, settings/billing consoles. Related: devtools, productivity, crm-enterprise, ai-product.
## Users & trust drivers
- Daily power users on desktop (1280-1920px), plus occasional execs scanning KPIs on mobile; admins configure rarely but stakes are high.
- Trust = numbers that reconcile across views, visible data freshness, predictable navigation, no surprise destructive actions.
- Destroyers: unlabeled metrics, charts without units/timeframe, slow filters, settings that silently fail to save.
## Must-have patterns
- Data table: sticky header, sortable columns, column chooser, right-aligned tabular numerals, row selection with bulk-action bar.
- Global filter bar: date range with presets and compare-to-period, saved views, filters reflected in URL.
- KPI tile: value, unit, delta vs explicit period, sparkline; link to underlying report.
- Empty/loading/error states per widget; skeletons matching final layout, not page-wide spinners.
- Command palette (Cmd/Ctrl+K), keyboard shortcuts, breadcrumb or persistent sidebar with workspace switcher.
- Role-aware UI: disabled-with-reason tooltips, audit log, typed-name confirmation for destructive admin actions.
## Key screens
- Overview, report/explorer, list + detail drawer, record detail, settings, members/roles, billing/plans, integrations, audit log, onboarding checklist.
## Visual register
- Density from comfortable (Linear, Stripe) to compact (Retool, Datadog); offer a density toggle for table-heavy products.
- Neutral UI chrome so data color carries meaning; one accent for primary actions; restrained grayscale with 1px borders or subtle surfaces.
- Type: a crisp grotesk or system UI at 13-14px base; tabular figures everywhere numbers align.
- Tired default to avoid: purple-gradient hero cards, glassmorphism KPI tiles, rainbow donut charts, "Welcome back, John!" banners.
## Domain rules
- WCAG 2.2 AA: 4.5:1 text, 3:1 chart marks and focus rings; tables need proper th/scope, keyboard row navigation.
- Status never color-only: pair with icon + label; chart series distinguishable by shape/pattern or direct labels.
- Always show timezone, data-as-of timestamp, and sampling/aggregation notes; consistent number abbreviation (1.2K, 3.4M) with full value on hover.
- Errors inline at field or widget level with retry; never blank a whole dashboard because one query failed.
## Anti-patterns
- Ten equal-weight KPI cards with no hierarchy or story; vanity metrics above the fold.
- Pie/donut for more than 4 categories; 3D or dual-axis charts without clear labeling.
- Fake-precise data (12,483.29 users), lorem ipsum names like "John Doe," identical avatar circles.
## Research seeds
- Exemplars: Linear, Stripe Dashboard, Vercel, PostHog, Attio, Mixpanel, Retool, Plain.
- Queries: "B2B SaaS dashboard UI patterns 2026", "data table UX best practices enterprise", "site:mobbin.com analytics dashboard".
