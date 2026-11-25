# Platform — email and other surfaces

## Email (transactional and marketing)
- **Width and layout**: 600px max, single column (two at most, stacking on mobile). Table-based layout, inline CSS, `role="presentation"` on layout tables. If an MJML or React Email stack is detected, use it.
- **Typography**: web fonts only with a fallback stack; body 16px, line-height 1.5. Pure black and white are fine for client compatibility.
- **Dark mode**: `color-scheme` and `supported-color-schemes` meta; transparent PNG logos with an outline or halo; test both modes.
- **Accessibility**: `lang`, real text (not text in images), alt text, a descriptive link text, and a bulletproof button that is a styled table cell link with a ≥ 44px tap height.
- **Structure**:
  - Preheader text.
  - One purpose per email, with one primary CTA.
  - Transactional: lead with the key fact (amount, date, status).
  - Footer: sender identity, physical address and unsubscribe for marketing (CAN-SPAM/GDPR).
- **Always ship** a plain-text version.
- **Verify** with screenshots at 600 and 375, light and dark.

## Other surfaces
- **Browser extension**: popup 360–400 wide, ≤ 600 tall; options page; follow the host browser's light/dark.
- **TV / 10-foot**: focus-driven navigation with a large visible focus state, ≥ 24px text, a 5% safe area, and no hover.
- **Watch / widget**: one glanceable fact and one action, with high contrast.
- **Kiosk**: huge targets (≥ 60px), an idle-reset timeout, no keyboard assumptions, and accessibility height reach.
- **Print / PDF**: `@media print` styles, page breaks avoided inside rows and cards, URLs shown for links.
