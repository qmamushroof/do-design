# Healthcare
Scope: patient portals, telehealth, clinical tools/EHR, pharmacy, insurance/benefits, scheduling. Related: wellness-fitness, saas-dashboard, gov-nonprofit, professional-services.
## Users & trust drivers
- Patients of all ages and abilities, often anxious, ill, low health literacy or using assistive tech; caregivers acting as proxies.
- Clinicians: time-pressed, interrupted, shared workstations; errors can harm patients; alert fatigue is real.
- Trust = plain language, clear next steps, privacy explicitness, credentialed providers shown, no salesy tone.
## Must-have patterns
- Appointment booking: provider/location/visit-type filters, real availability, in-person vs video, insurance check, calendar add.
- Results view: value, unit, reference range, flag (High/Low text + icon), trend chart, plain-language explanation.
- Medication list: name, dose, frequency, prescriber, refill status/request; allergy banner persistent.
- Secure messaging with expected response time and "if emergency call 911/local number" notice.
- Telehealth: pre-call device check, waiting room status, large controls, reconnect path.
- Clinical UI: patient identity header (name, DOB, MRN) always visible; dense but scannable vitals tables.
## Key screens
- Home/upcoming, appointments, booking, visit summary, test results, medications, messages, billing, insurance card, proxy access, forms/intake.
## Visual register
- Range: calm consumer (One Medical, Oscar), warm clinical-editorial (Maven, Hims), utilitarian clinical density (Epic-modernized).
- Generous type (16-18px body for patients), high contrast, short lines; real diverse imagery or illustration, not stock.
- Tired default to avoid: teal/white stethoscope stock photos, heart-pulse icons, smiling doctor with clipboard, sterile blue gradients.
## Domain rules
- HIPAA: minimum PHI in notifications/emails/push; session timeout with warning; no PHI in URLs or analytics.
- US HHS Section 1557 rule: WCAG 2.1 AA for web/mobile by May 2026 (15+ employees); language assistance taglines.
- Abnormal results never color-only; always show units and reference ranges; dates unambiguous (12 Mar 2026).
- Clinical: confirm patient identity before orders; distinguish similar drug names (tall-man lettering); undo over confirm where safe.
## Anti-patterns
- Medical jargon or raw codes (ICD/LOINC) shown to patients without explanation.
- Chatbots replacing human triage without escalation; cheery tone for serious diagnoses.
- Tiny tap targets, gray-on-white low-contrast text, auto-dismissing toasts for critical info.
- Fake vitals dashboards with neon gauges and random ECG lines.
## Research seeds
- Exemplars: One Medical, Oscar Health, Maven Clinic, MyChart, Zocdoc, Headway, NHS App, GOV.UK/NHS design system.
- Queries: "NHS digital service manual patterns", "patient portal UX accessibility", "clinical decision support UI design".
