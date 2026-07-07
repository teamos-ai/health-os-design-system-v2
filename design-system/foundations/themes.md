# Themes — three grounds, one system

Health OS ships **three global themes**, applied as a class on `<html>` and implemented as RGB-channel CSS variables in `tokens/tokens.css`. Components never branch on theme — they use token classes (`bg-paper`, `bg-surface`, `border-line`, `text-ink-900`…), and the variables resolve per theme underneath.

| Theme | Class | Ground | Feel |
|---|---|---|---|
| **Light** (default) | *(none)* | clean white `#FFFFFF` | minimal, software |
| **Paper** | `.theme-paper` | warm ivory `#F9F6F2` | **the brand ground** — marketing default |
| **Dark** | `.dark` | true black `#000000` | OLED software; cards lift to `#161616` |

## What flips, what stays fixed

**Flips per theme (CSS variables):** `paper`, `surface`, `surface-2`, `line`, `line-soft`, `ground-textured`, the entire `ink-*` ramp, `accent` (accent-as-text), and the four `--btn-accent-*` variables behind `Button variant="accent"`.

**Fixed in every theme:** the brand ramps (rose/brand, apricot, lavender, gold), `carbon` (`#1F1F1F` — it sits just above the dark page), the semantic ramps, the signature gradient and the glows.

## The pure-white / pure-black ruling

The brand rule "never pure white or pure black" applies to **hand-authored values**: never hard-code `#FFFFFF` as a page ground or `#000000` as text/scrim. The light theme's white ground and the dark theme's black ground are the **two sanctioned exceptions**, reachable only through the theme variables — which is exactly why you must use `bg-paper`/`bg-surface` instead of literals.

## Mode-aware accent button

`Button variant="accent"` is one class that re-colours per theme, always as a tonal fill + darker same-hue label (white-on-bright fails AA on this palette, so it never happens):

| Theme | Fill / hover | Label | Contrast |
|---|---|---|---|
| Light | apricot-100 / 200 | apricot-800 | 7.03:1 |
| Paper | rose-100 / 200 | rose-800 | 8.44:1 |
| Dark | lavender-800 / 700 | lavender-100 | 9.01:1 |

## Dark-theme colour notes

- Primary text is `#F5F5F5` (ink-900 flipped), body `#C4C4C4` (ink-600) — neutral greys so the warm accents do the colour work.
- Accent-as-text lightens to `brand-300` (`#EE7DBA`) for AA on black — use the `text-accent` class, never `text-brand-600`, for coloured links on the page ground.
- `bg-brand-gradient-soft` is too bright on carbon — use `bg-brand-gradient-soft-dark` (the 800-level sibling).
- The tint+text status pairs stay `-100`/`-700` and hold AA in all themes.

## Implementation contract

1. **Never hard-code a neutral.** `bg-white`, `text-black`, `#F9F6F2`-as-literal all break two of the three themes. Use the token classes.
2. White-alpha overlays (`bg-white/10`, `text-white/75`) are sanctioned **only on fixed-carbon surfaces** (the footer panel, dark pill, dashboard rail) — those grounds don't flip.
3. Theme switching: `useTheme()` (src/lib/useTheme.ts) + the pre-paint script in `index.html` (no flash). `darkMode: 'class'` keeps Tailwind's `dark:` variant available for the rare fixed-value override.
4. Test every new surface in all three themes before shipping — the showcase's theme toggle exists for exactly this.
