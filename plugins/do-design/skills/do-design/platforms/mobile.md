# Platform — mobile app (iOS / Android)

## Prototype form
- RN/Expo or Flutter detected → build in it.
- Otherwise build HTML screens in a device frame: iPhone 393×852 (Dynamic Island, home indicator) and/or Android 412×915 (status bar, gesture bar). `index.html` shows the screens side by side; each screen also opens frameless at its own URL.
- Separate iOS and Android variants only where conventions differ (nav, sheets, typography, controls). Otherwise use one shared design with platform-adaptive details.

## iOS (HIG)
- SF Pro (system) by default; a brand font for display only. Support Dynamic Type sizes (body 17pt).
- Tab bar with 3–5 items, at the bottom, text labels always on. Navigation bar with a large title that collapses on scroll. Back = chevron + previous title.
- Sheets (medium/large detents), action sheets for destructive choices, swipe actions on list rows, pull to refresh.
- Targets 44×44pt. Respect the safe areas. SF Symbols weight matches the adjacent text weight.

## Android (Material 3)
- Roboto/system or a brand font. Type roles: display, headline, title, body, label.
- Navigation bar with 3–5 destinations (pill active indicator); navigation rail ≥ 600dp; top app bar (small/medium/large).
- FAB for the single primary creation action, only if one exists. Bottom sheets, snackbars with an action, and predictive back.
- Targets 48×48dp. Dynamic colour (Material You) is optional; the brand colour stays recognisable.

## Both
- Thumb zone: primary actions at the bottom half; no critical actions in the top corners.
- Offline, slow-network and permission-denied states for every screen that needs them.
- Onboarding: 3 screens or fewer, value first, permission requests at the moment of need with a pre-prompt.
- Haptics noted in the handoff (success, warning, selection).
- Keyboard: the right type per field, a Next/Done return key, and content scrolled clear of the keyboard.
