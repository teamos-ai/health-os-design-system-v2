/**
 * palette.ts — the FIXED brand hexes for JS/SVG consumers.
 *
 * Single source for every place that needs a literal colour value at runtime
 * (SVG strokes, canvas/particle animations, inline gradients, CSS-in-JS washes).
 * Values mirror design-system/tokens/tokens.json → tailwind.preset.js exactly;
 * if a ramp changes there, change it here — never re-type a brand hex elsewhere.
 *
 * Only the theme-INDEPENDENT values live here (brand accents, carbon, semantic).
 * Theme-aware neutrals (paper/surface/line/ink) must be consumed as CSS variables
 * (`rgb(var(--ink-500))`) or Tailwind classes, never as fixed hexes.
 */

export const ROSE = {
  50: '#FADEEE', 100: '#F8C6E0', 200: '#F3A0CC', 300: '#EE7DBA', 400: '#E85BA8',
  500: '#D63F92', 550: '#CC3385', 600: '#BE2E7B', 700: '#97215F', 800: '#5F1640', 900: '#2E1222',
} as const;

export const APRICOT = {
  50: '#FDECDF', 100: '#FBD9BE', 200: '#F8C39C', 300: '#F7B27E', 400: '#F5A060',
  500: '#E68A47', 600: '#C9722F', 700: '#9E5723', 800: '#6B3A18', 900: '#312013',
} as const;

export const LAVENDER = {
  50: '#EDE1F7', 100: '#DEC8F0', 200: '#C9A3E6', 300: '#B985DE', 400: '#A666D9',
  500: '#9450C9', 600: '#7E3CB0', 700: '#602C88', 800: '#3E1C58', 900: '#21152B',
} as const;

export const GOLD = { 100: '#F6ECCB', 400: '#D9B23F', 600: '#BE9522', 800: '#6E560F' } as const;

export const CARBON = '#1F1F1F';
export const PAPER_IVORY = '#F9F6F2';

export const SUCCESS = { 100: '#E2F5EC', 200: '#8FD6B6', 600: '#1F9D6B', 700: '#15724E' } as const;
export const WARN = { 100: '#FBF2DC', 600: '#C08415', 700: '#8A5E0F' } as const;
export const DANGER = { 100: '#FAE4E2', 600: '#C8382F', 700: '#9F2A23' } as const;

/** The signature gradient stops — apricot → rose → lavender, never reversed. */
export const GRADIENT_STOPS = [APRICOT[400], ROSE[400], LAVENDER[400]] as const;

/** bg-brand-gradient as a CSS value, for inline-style consumers. */
export const BRAND_GRADIENT = `linear-gradient(135deg, ${APRICOT[400]} 0%, ${ROSE[400]} 50%, ${LAVENDER[400]} 100%)`;

/**
 * The celebration ramp used by the expressive (opt-in, quarantined) button family.
 * Mid-tone accents only — never pure white, never off-ramp values.
 */
export const PARTY_RAMP = [
  APRICOT[400], ROSE[400], LAVENDER[400], GOLD[600], ROSE[300], LAVENDER[600],
] as const;
