# Shadow

Low-opacity, **neutral (carbon-based) only**. Shadows imply elevation, never decoration. The system is flat: most surfaces sit on paper with a 1px hairline and no shadow, lifting only on hover. **Zero glassmorphism, zero coloured shadows, zero inner shadows, zero neumorphism, zero 3D.**

| Token | Tailwind | Value |
|---|---|---|
| none | `shadow-none` | `none` |
| xs | `shadow-xs` | `0 1px 2px rgba(31,31,31,0.04)` |
| sm | `shadow-sm` | `0 1px 3px rgba(31,31,31,0.06), 0 1px 2px rgba(31,31,31,0.04)` |
| md | `shadow-md` | `0 4px 14px rgba(31,31,31,0.06), 0 2px 4px rgba(31,31,31,0.04)` |
| lg | `shadow-lg` | `0 12px 32px rgba(31,31,31,0.08), 0 4px 8px rgba(31,31,31,0.04)` |
| xl | `shadow-xl` | `0 24px 56px rgba(31,31,31,0.10), 0 8px 16px rgba(31,31,31,0.06)` |
| carbon | `shadow-carbon` | `0 20px 48px rgba(31,31,31,0.18)` |

Every shadow is built from `rgba(31,31,31,…)` — the carbon/ink-900 value — so elevation always reads as a soft neutral, never tinted.

## 6 rules
1. **Default is `shadow-none`.** Most surfaces sit flat on paper with a `border-line` hairline.
2. Add **`shadow-xs` / `shadow-sm` on hover** to lift an interactive card or tool card (paired with a small `translateY`).
3. Reserve **`shadow-md` and up** for genuinely floating UI — dropdowns, the command-palette results panel, popovers, modals.
4. **`shadow-carbon`** is reserved for the heaviest floating dark elements (a lifted dark pill, the footer panel if it floats) — it's the deepest neutral, still uncoloured.
5. **No coloured shadows.** The gradient and the glows are the brand colour devices; shadows stay neutral. (A rose-tinted shadow is the single fastest way to break this system.)
6. **No inner shadows, no neumorphism, no glass blur, no 3D.** Elevation comes from a flat shadow + hairline, nothing more.

## The flat + hairline default
The resting state of a Health OS surface is: `bg-surface` + `border border-line` + `shadow-none`. On hover, an interactive surface lifts to `shadow-sm` (or `shadow-md` for the carousel tool cards) and rises a few pixels. That hover lift is the *only* place a default card earns a shadow.

## Glow vs shadow — don't confuse them
The hero glows (`bg-glow-hero`, `bg-glow-rose`…) are **background washes**, not shadows. They live behind content as diffuse colour. They never sit on a box as a coloured drop-shadow. Keep the two systems separate: glows tint the ivory ground; shadows lift neutral surfaces off it.
