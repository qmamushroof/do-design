// Minimal color parsing + WCAG contrast. Supports hex, rgb(a), hsl(a), oklch, oklab.
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));

function num(v, scale = 1) {
  v = String(v).trim();
  if (v.endsWith('%')) return (parseFloat(v) / 100) * scale;
  return parseFloat(v);
}

function srgbFromLinear(c) {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

function oklabToSrgb(L, a, b) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map((c) => clamp(srgbFromLinear(c)));
}

function hslToRgb(h, s, l) {
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
}

/** Parse a CSS color string → {r,g,b,a} with r,g,b in 0..1, or null. */
export function parseColor(input) {
  if (!input) return null;
  const s = String(input).trim().toLowerCase();
  if (s === 'white') return { r: 1, g: 1, b: 1, a: 1 };
  if (s === 'black') return { r: 0, g: 0, b: 0, a: 1 };
  if (s === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
  let m = s.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let h = m[1];
    if (h.length <= 4) h = [...h].map((c) => c + c).join('');
    const n = (i) => parseInt(h.slice(i, i + 2), 16) / 255;
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) : 1 };
  }
  m = s.match(/^(rgba?|hsla?|oklch|oklab)\(([^)]+)\)$/);
  if (!m) return null;
  const parts = m[2].replace(/\s*\/\s*/, ' / ').replace(/,/g, ' ').split(/\s+/).filter(Boolean);
  const slash = parts.indexOf('/');
  const alpha = slash >= 0 ? num(parts[slash + 1], 1) : parts.length === 4 ? num(parts[3], 1) : 1;
  const [p0, p1, p2] = parts;
  let rgb;
  switch (m[1]) {
    case 'rgb': case 'rgba':
      rgb = [p0, p1, p2].map((v) => (v.endsWith('%') ? num(v, 1) : parseFloat(v) / 255));
      break;
    case 'hsl': case 'hsla':
      rgb = hslToRgb(parseFloat(p0), num(p1.endsWith('%') ? p1 : p1 + '%', 1), num(p2.endsWith('%') ? p2 : p2 + '%', 1));
      break;
    case 'oklch': {
      const L = num(p0, 1), C = num(p1, 0.4), H = (parseFloat(p2) || 0) * (Math.PI / 180);
      rgb = oklabToSrgb(L, C * Math.cos(H), C * Math.sin(H));
      break;
    }
    case 'oklab':
      rgb = oklabToSrgb(num(p0, 1), num(p1, 0.4), num(p2, 0.4));
      break;
  }
  return { r: rgb[0], g: rgb[1], b: rgb[2], a: alpha };
}

/** Composite fg over opaque bg. */
export function over(fg, bg) {
  const a = fg.a ?? 1;
  return { r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a), a: 1 };
}

export function luminance({ r, g, b }) {
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function contrast(fg, bg) {
  const base = bg.a < 1 ? over(bg, { r: 1, g: 1, b: 1, a: 1 }) : bg;
  const f = fg.a < 1 ? over(fg, base) : fg;
  const [l1, l2] = [luminance(f), luminance(base)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

export function toHex({ r, g, b }) {
  return '#' + [r, g, b].map((c) => Math.round(clamp(c) * 255).toString(16).padStart(2, '0')).join('');
}

export const COLOR_RE = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab)\([^)]*\)/g;
