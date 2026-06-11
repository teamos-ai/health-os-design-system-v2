# Colour

Health OS is **multi-hue by design**. Three warm families — apricot, rose, lavender — form the signature, sitting on a warm ivory ground with carbon ink, and a disciplined semantic system underneath so the whole thing reads as calm, not chaotic. In v2 the colour architecture is unchanged from v1; what's new is the *structure* it dresses (soft pastel hero glows, mono labels, dark pill CTAs). The surface stays pure Health OS — warm ivory and carbon, never pure white or pure black.

`brand` aliases the **Rose** family (the signature hue). The accent for white text — the only rose that passes AA on white — is **`brand-600` `#BE2E7B`**.

## Brand scale — Rose (primary action at 600)

| Step | Hex | Tailwind | Use |
|---|---|---|---|
| 50 | `#FADEEE` | `brand-50` | tints, wash backgrounds, glow tails |
| 100 | `#F8C6E0` | `brand-100` | badge fill, hover wash, feature-chip background |
| 200 | `#F3A0CC` | `brand-200` | |
| 300 | `#EE7DBA` | `brand-300` | borders on brand surfaces |
| **400** | **`#E85BA8`** | **`brand-400` / `rose-400`** | **brand DNA "Expressive Rose"; gradient stop; accent fills with dark text** |
| 500 | `#D63F92` | `brand-500` | |
| **600** | **`#BE2E7B`** | **`brand-600`** | **primary action — buttons, links, active nav, white text** |
| 700 | `#97215F` | `brand-700` | hover on primary |
| 800 | `#5F1640` | `brand-800` | |
| 900 | `#2E1222` | `brand-900` | text on rose tints |

> `rose-*` and `brand-*` are the same ramp — use `brand-*` for action and `rose-*` when you specifically mean the hue.

## Accent — Apricot (warm)
`50 #FDECDF · 100 #FBD9BE · 200 #F8C39C · 300 #F7B27E · 400 #F5A060 · 500 #E68A47 · 600 #C9722F · 700 #9E5723 · 800 #6B3A18 · 900 #312013`
Tailwind `apricot-*`. The warm end of the gradient and the warmest glow. `apricot-400` `#F5A060` is the DNA value.

## Accent — Lavender (cool, also `info`)
`50 #EDE1F7 · 100 #DEC8F0 · 200 #C9A3E6 · 300 #B985DE · 400 #A666D9 · 500 #9450C9 · 600 #7E3CB0 · 700 #602C88 · 800 #3E1C58 · 900 #21152B`
Tailwind `lavender-*`. The cool end of the gradient. `lavender-400` `#A666D9` is the DNA value; `lavender-600` `#7E3CB0` doubles as `info`.

## Ink — text & warm neutrals
`100 #F2EFEB · 200 #E3DDD6 · 300 #C9C1B8 · 400 #A39B91 · 500 #7C746B · 600 #5A534B · 700 #3D3833 · 900 #1F1F1F`
Tailwind `ink-*`. Body text = `text-ink-900` on paper. Secondary / supporting text = `text-ink-500` / `text-ink-600`. Disabled = `text-ink-400`.

## Carbon — dark surfaces
`DEFAULT #1F1F1F · 800 #262626 · 700 #2E2E2E · 600 #3A3A3A`
Tailwind `carbon`, `carbon-800/700/600`. Used for the **dark pill CTA** (`bg-carbon`) and the **rounded dark-carbon footer panel**. Carbon is the same value as `ink-900` — the warm-tinted near-black, never `#000`.

## Surfaces
- **Paper** `#F9F6F2` — warm ivory page background (`bg-paper`). The default ground for everything.
- **Surface** `#FFFFFF` — cards lift to white on paper (`bg-surface`).
- **Line** `#E7E0D8` (`border-line`) / **Line-soft** `#F0EBE4` (`border-line-soft`) — warm hairlines.

> Never use pure white as a full-page background and never use pure black for text. The warmth of paper + carbon is the brand.

## Gold — premium signal
`100 #F6ECCB · 400 #D9B23F · 600 #BE9522 · 800 #6E560F`
Tailwind `gold-*`. Reserved for premium / upgrade / "best value" moments. Not a general accent — if everything is gold, nothing is.

## Signature gradient
`linear-gradient(135deg, #F5A060 0%, #E85BA8 50%, #A666D9 100%)` — Tailwind **`bg-brand-gradient`**.
The hero brand device: the logo, **one** hero word (gradient text), the primary marketing CTA, and soft glows. A soft tint version exists for large fills: **`bg-brand-gradient-soft`** (`#FDECDF → #FADEEE → #EDE1F7`).

**Used with restraint, never reversed, never on every surface.** Apricot is always the warm start, lavender always the cool end.

## Hero glows (v2 craft)
Soft pastel radial glows on the warm ivory ground, applied as a background layer behind the hero:
- **`bg-glow-hero`** — the composed three-glow wash (apricot top-left, lavender top-right, rose top-centre) at ~26–30% alpha. The default hero background.
- **`bg-glow-rose`** / **`bg-glow-apricot`** / **`bg-glow-lavender`** — single-hue ellipse glows at 28% alpha for section accents.

Glows are diffuse and low-alpha — they tint the ivory, they don't paint over it. Never sharpen a glow into a solid blob, and never stack a glow behind body text where it would hurt contrast.

## Semantic (100 tint + 600 solid)
| | 100 (tint) | 600 (solid) | Tailwind |
|---|---|---|---|
| success | `#E2F5EC` | `#1F9D6B` | `bg-success-100` / `text-success-600` |
| warn | `#FBF2DC` | `#C08415` | `bg-warn-100` / `text-warn-600` |
| danger | `#FAE4E2` | `#C8382F` | `bg-danger-100` / `text-danger-600` |
| info | `#DEC8F0` | `#7E3CB0` | `bg-info-100` / `text-info-600` (lavender) |

Pattern for status pills and alerts: a `-100` background with `-600` text and icon, a hairline border, sentence-case label.

## Where primary goes / doesn't
**Goes:** primary buttons (`bg-brand-600`), text links, active nav, focus rings, key stat numbers, feature-icon chips, the `/command` chip accent.
**Does NOT go:** body text, large background fills (use `paper` / `surface` / a `-50` wash), every card border, full-bleed sections. The gradient device covers signature moments; the dark pill carries the high-contrast CTA when you want carbon instead of rose.

## Text contrast minimums (the locked rule)
- `text-ink-900` `#1F1F1F` on `paper` `#F9F6F2` → ~15.6:1 (AAA).
- `text-ink-500` `#7C746B` on paper → ~4.6:1 (AA body) — the lightest acceptable supporting text.
- white on `brand-600` `#BE2E7B` → ~4.8:1 (AA) — the reason primary sits at 600, not the brighter 400.
- white on `carbon` `#1F1F1F` → very high contrast; the dark pill is always safe for white text.

**Never put white text on `apricot-400`, `rose-400`/`brand-400`, or any bright accent** — they fail AA. Use the bright accents as *fills with dark text* (`text-ink-900` / family-900), or inside the gradient. Body text on ivory must always pass AA.

## Do / don't
- ✅ One primary (rose/600) drives action; accents fill; gradient is signature-only.
- ✅ Cards = `bg-surface` on `bg-paper` with a `border-line` hairline.
- ✅ Status uses the `-100` / `-600` pair.
- ❌ No white text on bright accents.
- ❌ No pure white page background, no pure black text.
- ❌ No coloured shadows or coloured glows behind running text.
- ❌ Don't reverse or recolour the signature gradient.

## Reasoning
The brand's identity *is* the three warm hues and their gradient — flattening to one primary would erase it. So all three stay as full ramps, but discipline is enforced: one accessible action colour (rose/600), accents for fills, the gradient and glows for signature moments only. Darkening action to 600 buys the accessible white-text contrast the bright DNA values can't provide, so the system stays expressive *and* legible.
