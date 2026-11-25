// Load and flatten do-design tokens.json (DTCG-style: leaves have "$value").
import { readFileSync } from 'node:fs';

export const THEMES = ['light', 'dark'];

export function loadTokens(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

/**
 * Flatten to entries: { path: ['color','light','bg'], name: '--bg', theme: 'light'|'dark'|null, value, type }
 * Naming:
 *  color.primitive.<ramp>.<step> → --<ramp>-<step>
 *  color.<theme>.<role>          → --<role>
 *  <group>[.<theme>].<k...>      → --<group>-<k...>   (theme keys removed)
 */
export function flatten(tokens) {
  const out = [];
  const walk = (node, path, inheritedType) => {
    if (node && typeof node === 'object' && '$value' in node) {
      const theme = path.find((p) => THEMES.includes(p)) ?? null;
      const rest = path.filter((p) => !THEMES.includes(p) && p !== 'primitive');
      const name = rest[0] === 'color' ? '--' + rest.slice(1).join('-') : '--' + rest.join('-');
      out.push({ path, name, theme, value: node.$value, type: node.$type ?? inheritedType, description: node.$description });
      return;
    }
    if (!node || typeof node !== 'object') return;
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('$')) continue;
      walk(v, [...path, k], node.$type ?? inheritedType);
    }
  };
  walk(tokens, [], undefined);
  return out;
}

const REF = /^\{([^}]+)\}$/;

/** Resolve "{a.b.c}" references. mode 'var' → var(--name), 'literal' → final value. */
export function resolver(entries) {
  const byPath = new Map(entries.map((e) => [e.path.join('.'), e]));
  const find = (ref, theme) =>
    byPath.get(ref) ??
    (theme && byPath.get(ref.replace(/^(\w+)\./, `$1.${theme}.`))) ??
    null;
  const literal = (value, theme, depth = 0) => {
    if (Array.isArray(value)) return value.map((v) => (/\s/.test(v) && !/^["']/.test(v) ? `"${v}"` : v)).join(', ');
    const m = typeof value === 'string' && value.match(REF);
    if (!m) return value;
    const target = find(m[1], theme);
    if (!target || depth > 10) throw new Error(`Unresolved token reference ${value}`);
    return literal(target.value, theme, depth + 1);
  };
  const asVar = (value, theme) => {
    if (Array.isArray(value)) return literal(value, theme);
    const m = typeof value === 'string' && value.match(REF);
    if (!m) return value;
    const target = find(m[1], theme);
    if (!target) throw new Error(`Unresolved token reference ${value}`);
    return `var(${target.name})`;
  };
  return { literal, asVar };
}
