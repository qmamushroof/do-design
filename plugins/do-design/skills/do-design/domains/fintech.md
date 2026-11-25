# Fintech
Scope: banking, payments, wallets, investing, crypto, lending, accounting, expense tools. Related: saas-dashboard, ecommerce, crm-enterprise, professional-services.
## Users & trust drivers
- Mobile-first consumers checking balances several times daily; SMB owners and finance teams on desktop for reconciliation.
- Moments of high anxiety: sending money, failed payments, fraud alerts, market drops, KYC rejections.
- Trust = exact amounts, clear fees before confirmation, instant receipts, visible security, reachable human support.
## Must-have patterns
- Amount input: tabular numerals, currency prefix/suffix per locale, live grouping, max/available balance shortcut.
- Review-then-confirm step: recipient, amount, fees, FX rate, arrival time; biometric/2FA confirmation.
- Transaction list: merchant logo/name, category, pending vs posted states, grouped by date, searchable, exportable CSV.
- Transaction status timeline (initiated, processing, completed/failed) with reference ID and next steps.
- Charts: portfolio/balance over time with range presets, gain/loss with sign and percentage, cost basis.
- Security center: devices/sessions, card freeze toggle, limits, notifications settings.
## Key screens
- Home/balances, accounts, transaction detail, send/pay, request, cards, portfolio, asset detail, trade ticket, statements, KYC onboarding, settings/security.
## Visual register
- Range: calm editorial (Mercury, Monzo), dense pro terminal (Interactive Brokers, Kraken Pro), warm consumer (Cash App, Revolut).
- Large confident balance typography; tabular lining figures; restrained palette so gain/loss and alerts stand out.
- Tired default to avoid: navy+gold "trust" palette, stock handshake photos, floating 3D coins, neon crypto gradients.
## Domain rules
- Gain/loss never color-only: use +/- signs, arrows, labels; check red/green for colorblind users (consider blue/orange option).
- Format money by locale (ISO 4217); fixed decimals per currency (JPY 0, BHD 3); never float rounding artifacts.
- Disclose fees, APR/APY, FX markups pre-confirmation; investing needs risk disclosures, not hidden in footers.
- PCI DSS: never display full PAN; mask to last 4; SCA/PSD2 step-up in EU; EAA (WCAG-based) applies to EU banking.
- Errors: say if money moved or not; idempotent retry; never ambiguous "failed" after debit.
## Anti-patterns
- Fake perfect upward charts; balances like $1,000,000.00 in mockups; "Bank-grade security" padlock badges.
- Confetti on every transaction; gamified trading celebrations (regulatory risk).
- Hiding cancellation or account closure; dark-pattern upsells on credit products.
## Research seeds
- Exemplars: Mercury, Monzo, Stripe, Revolut, Wise, Ramp, Robinhood, Copilot Money.
- Queries: "fintech app UI 2026", "banking app transaction list design", "site:mobbin.com money transfer flow".
