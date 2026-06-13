/**
 * Health OS Design System v2 — Tailwind preset (single source of truth for Tailwind).
 *
 * v2 = v1's locked colour architecture (apricot → rose → lavender, warm, flat, premium)
 * with command-centre structural craft: soft pastel radial hero glows, mono labels,
 * dark pill CTAs, a gentle marquee, a thin ticker, subtle grain.
 *
 * Type pairing is the v2 delta: headings = Spline Sans (font-display), body + labels =
 * Anonymous Pro (font-sans AND font-mono — Anonymous Pro IS monospace, which is the
 * deliberate "operating-system / command-palette" texture). Body line-height 1.6.
 *
 * `brand` aliases the Rose family (signature hue). Zero glass. No coloured shadows.
 *
 *   // tailwind.config.js
 *   import healthos from './design-system/tokens/tailwind.preset.js'
 *   export default { presets: [healthos], content: ['./index.html','./src/**\/*.{ts,tsx}'] }
 */
export default {
  theme: {
    extend: {
      colors: {
        /* ── Rose — signature / primary (brand alias) ───────── */
        rose: {
          50: '#FADEEE', 100: '#F8C6E0', 200: '#F3A0CC', 300: '#EE7DBA',
          400: '#E85BA8', 500: '#D63F92', 600: '#BE2E7B', 700: '#97215F',
          800: '#5F1640', 900: '#2E1222',
        },
        brand: {
          50: '#FADEEE', 100: '#F8C6E0', 200: '#F3A0CC', 300: '#EE7DBA',
          400: '#E85BA8', 500: '#D63F92', 600: '#BE2E7B', 700: '#97215F',
          800: '#5F1640', 900: '#2E1222',
        },
        /* ── Apricot — warm accent ──────────────────────────── */
        apricot: {
          50: '#FDECDF', 100: '#FBD9BE', 200: '#F8C39C', 300: '#F7B27E',
          400: '#F5A060', 500: '#E68A47', 600: '#C9722F', 700: '#9E5723',
          800: '#6B3A18', 900: '#312013',
        },
        /* ── Lavender — cool accent ─────────────────────────── */
        lavender: {
          50: '#EDE1F7', 100: '#DEC8F0', 200: '#C9A3E6', 300: '#B985DE',
          400: '#A666D9', 500: '#9450C9', 600: '#7E3CB0', 700: '#602C88',
          800: '#3E1C58', 900: '#21152B',
        },
        /* ── Ink (warm neutrals / text) — flips light↔dark via CSS vars ── */
        ink: {
          100: 'rgb(var(--ink-100) / <alpha-value>)',
          200: 'rgb(var(--ink-200) / <alpha-value>)',
          300: 'rgb(var(--ink-300) / <alpha-value>)',
          400: 'rgb(var(--ink-400) / <alpha-value>)',
          500: 'rgb(var(--ink-500) / <alpha-value>)',
          600: 'rgb(var(--ink-600) / <alpha-value>)',
          700: 'rgb(var(--ink-700) / <alpha-value>)',
          900: 'rgb(var(--ink-900) / <alpha-value>)',
        },
        /* ── Carbon — fixed dark (footer, dark pill) ────────── */
        carbon: { DEFAULT: '#1F1F1F', 800: '#262626', 700: '#2E2E2E', 600: '#3A3A3A' },
        /* ── Surfaces — flip light↔dark via CSS vars ────────── */
        paper: 'rgb(var(--paper) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        line: {
          DEFAULT: 'rgb(var(--line) / <alpha-value>)',
          soft: 'rgb(var(--line-soft) / <alpha-value>)',
        },
        /* ── Accent-as-text on the page ground (auto-lightens on dark for AA) ── */
        accent: 'rgb(var(--accent-text) / <alpha-value>)',
        /* ── Gold — premium signal accent ───────────────────── */
        gold: { 100: '#F6ECCB', 400: '#D9B23F', 600: '#BE9522', 800: '#6E560F' },
        /* ── Semantic ───────────────────────────────────────── */
        success: { 100: '#E2F5EC', 600: '#1F9D6B', 700: '#15724E' },
        warn: { 100: '#FBF2DC', 600: '#C08415', 700: '#8A5E0F' },
        danger: { 100: '#FAE4E2', 600: '#C8382F', 700: '#9F2A23' },
        info: { 100: '#DEC8F0', 600: '#7E3CB0', 700: '#5E2C86' },
      },
      fontFamily: {
        /* Headings — Spline Sans (600/700) */
        display: ['"Spline Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        heading: ['"Spline Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        /* Body + labels — Anonymous Pro (monospace, the "OS" texture) */
        sans: ['"Anonymous Pro"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        mono: ['"Anonymous Pro"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        /* Display + headings — Spline Sans, tight tracking */
        'display-xl': ['76px', { lineHeight: '80px', letterSpacing: '-0.022em', fontWeight: '700' }],
        'display-lg': ['58px', { lineHeight: '62px', letterSpacing: '-0.02em', fontWeight: '700' }],
        h1: ['42px', { lineHeight: '48px', letterSpacing: '-0.018em', fontWeight: '700' }],
        h2: ['34px', { lineHeight: '42px', letterSpacing: '-0.016em', fontWeight: '700' }],
        h3: ['26px', { lineHeight: '34px', letterSpacing: '-0.014em', fontWeight: '600' }],
        h4: ['21px', { lineHeight: '28px', letterSpacing: '-0.012em', fontWeight: '600' }],
        /* Body — Anonymous Pro, generous 1.6 line-height */
        'body-lg': ['17px', { lineHeight: '27px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '26px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '22px', fontWeight: '400' }],
        caption: ['13px', { lineHeight: '20px', fontWeight: '400' }],
        /* Mono labels / overlines — uppercase, wide tracking */
        overline: ['12px', { lineHeight: '16px', letterSpacing: '0.08em', fontWeight: '700' }],
        label: ['11px', { lineHeight: '16px', letterSpacing: '0.1em', fontWeight: '700' }],
        code: ['14px', { lineHeight: '22px', fontWeight: '400' }],
      },
      letterSpacing: {
        label: '0.08em',
        wide2: '0.1em',
      },
      spacing: {
        /* ── Hero rhythm — RULE: every hero across Health OS uses this spacious,
           minimalist scale so heroes always breathe the same way. Vertical padding
           (hero-py / hero-py-lg) frames the section; the stack gaps (hero-gap /
           hero-gap-sm) separate the H1, subcopy, primary action and supporting chips.
           Reach for these via the <Hero> primitive — don't hand-roll hero padding. */
        'hero-py': '7rem' /* 112px — hero top/bottom padding (mobile) */,
        'hero-py-lg': '11rem' /* 176px — hero top/bottom padding (≥ md) */,
        'hero-gap': '3.5rem' /* 56px — primary gap between hero blocks (subcopy → action) */,
        'hero-gap-sm': '2rem' /* 32px — tighter gap (title → subcopy, action → chips) */,
      },
      borderRadius: {
        none: '0px', xs: '4px', sm: '6px', md: '8px',
        /* 8px is the GLOBAL maximum — squircles only, no pills/circles.
           Larger aliases are capped at 8px so nothing can exceed it. */
        lg: '8px', xl: '8px', '2xl': '8px', '3xl': '8px', full: '8px',
      },
      boxShadow: {
        /* Soft, neutral, carbon-based only — never coloured, never inner */
        xs: '0 1px 2px rgba(31, 31, 31, 0.04)',
        sm: '0 1px 3px rgba(31, 31, 31, 0.06), 0 1px 2px rgba(31, 31, 31, 0.04)',
        md: '0 4px 14px rgba(31, 31, 31, 0.06), 0 2px 4px rgba(31, 31, 31, 0.04)',
        lg: '0 12px 32px rgba(31, 31, 31, 0.08), 0 4px 8px rgba(31, 31, 31, 0.04)',
        xl: '0 24px 56px rgba(31, 31, 31, 0.10), 0 8px 16px rgba(31, 31, 31, 0.06)',
        /* Carbon panels (footer / dark pill) get a deeper neutral */
        carbon: '0 20px 48px rgba(31, 31, 31, 0.18)',
      },
      transitionDuration: {
        xs: '80ms', sm: '160ms', md: '240ms', lg: '360ms', xl: '480ms',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backgroundImage: {
        /* Signature gradient — apricot → rose → lavender, never reversed */
        'brand-gradient': 'linear-gradient(135deg, #F5A060 0%, #E85BA8 50%, #A666D9 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, #FDECDF 0%, #FADEEE 50%, #EDE1F7 100%)',
        /* dark-mode sibling of the soft wash — deep apricot→rose→lavender (800s), a
           gentle warm tint that reads on the carbon ground (where the light wash is too bright) */
        'brand-gradient-soft-dark': 'linear-gradient(135deg, #6B3A18 0%, #5F1640 50%, #3E1C58 100%)',
        /* soft pastel radial hero glows on warm ivory */
        'glow-hero':
          'radial-gradient(40% 50% at 22% 18%, rgba(245,160,96,0.30) 0%, transparent 70%),' +
          'radial-gradient(42% 52% at 78% 14%, rgba(166,102,217,0.28) 0%, transparent 72%),' +
          'radial-gradient(50% 55% at 50% 4%, rgba(232,91,168,0.26) 0%, transparent 68%)',
        'glow-rose': 'radial-gradient(ellipse at center, rgba(232,91,168,0.28) 0%, transparent 70%)',
        'glow-apricot': 'radial-gradient(ellipse at center, rgba(245,160,96,0.28) 0%, transparent 70%)',
        'glow-lavender': 'radial-gradient(ellipse at center, rgba(166,102,217,0.28) 0%, transparent 70%)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        ticker: 'ticker 32s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
      maxWidth: {
        container: '1200px',
        reading: '680px',
        'hero-subcopy': '600px',
      },
      screens: {
        sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px',
      },
    },
  },
};
