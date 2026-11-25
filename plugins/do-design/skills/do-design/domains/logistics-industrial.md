# Logistics & industrial
Scope: logistics, shipping, fleet management, IoT monitoring, manufacturing/MES, energy/utilities, field-service apps. Related: crm-enterprise, saas-dashboard, food-restaurant, ecommerce.
## Users & trust drivers
- Dispatchers/operators on control-room desktops for long shifts; drivers/technicians on rugged mobile with gloves, sunlight, poor signal.
- Trust built by real-time accuracy, visible data freshness, reliable alerts, offline resilience.
- Trust destroyed by stale data shown as live, alert floods, lost offline submissions, ambiguous units.
## Must-have patterns
- Live map: clustered assets, status by color + shape, route/ETA lines, geofences, timeline scrubber/playback.
- Alarm list: severity, age, acknowledged state, owner, shelving; links into asset context.
- Asset/shipment detail: status history, sensor charts with thresholds, documents (POD, BOL), last-seen timestamp.
- Field app: offline queue with sync status, barcode/QR scan, photo capture, signature, 48px+ targets.
- Dispatch board: drag-assign jobs to drivers/techs, capacity, time windows, conflicts highlighted.
## Key screens
- Operations overview, live map, alarms, asset/vehicle detail, shipment tracking, dispatch board, work orders, inventory, reports, field job list/detail.
## Visual register
- High-performance HMI: grayscale baseline, color only for abnormal states; dark for control rooms, high-contrast light for outdoors.
- Dense tables with tabular numerals and units; condensed or mono numerics (IBM Plex Sans/Mono, Roboto Mono).
- Options: ISA-101 muted HMI, Flexport-like clean modern logistics, Samsara-style friendly fleet, rugged high-contrast field.
- Avoid tired default: neon cyan-on-black sci-fi dashboards, 3D globe hero, gauges/speedometers for every metric.
## Domain rules
- ISA-101 HMI and ISA-18.2 alarm management: prioritized, actionable alarms, flood suppression, acknowledgement.
- Always show units, timezone, data age; mark stale/offline sensors distinctly; never interpolate silently.
- Safety-critical commands (remote stop, release, override) need confirmation, permission check, audit trail.
- Transport compliance where relevant: FMCSA ELD hours-of-service, hazmat labels, customs docs; driver GPS privacy.
## Anti-patterns
- Red/green-only status with no severity hierarchy, shape/text redundancy, or sunlight-readable contrast.
- Auto-refresh that resets scroll, selection, or open panels.
- Mobile forms that require connectivity or lose data on failed submit.
- Charts without thresholds, targets, or units.
## Research seeds
- Exemplars: Samsara, Flexport, project44, Motive, ServiceTitan, Siemens Industrial Experience, Tesla energy app, Uber Freight.
- Queries: "high performance HMI design examples", "fleet management dashboard UI", "field service mobile app offline UX".
