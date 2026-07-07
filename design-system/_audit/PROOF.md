# Impeccable pass — proof of work

**Branch `fable5/impeccable-pass` · 7 commits ahead of `main` · 7 July 2026**
Not pushed — presented for review.

## Build gate
`npm run build` (`tsc --noEmit && vite build`) — **PASS** at every phase and at close. No console errors on a clean dev server. (One non-error Vite advisory: main chunk >500kB — a perf task, not a regression.)

## What changed, by phase
| Phase | Commit | Substance |
|---|---|---|
| 0 | `40e42cd` | Read-only four-way audit → `_audit/AUDIT.md` + 7 locked-brand rulings |
| 1 | `852f40c` | tokens.json rebuilt (complete/correct/theme-aware) + css/preset in sync; radius scale restored (8/12/20/28/36/pill); real bugs fixed; de-hex sweep; `llms.txt`, `ASSET-RECIPES.md`, `themes.md`, `palette.ts` |
| 2 | `ee0b048` | All 40 components polished — states, ARIA-correct semantics, motion budget, quarantine banners, README catalogue |
| 3 | `3b74e6b` | Cards trio (2,279 lines) rebuilt on-brand + theme-aware; heroes on the `<Hero>` primitive (single h1); Sage-voice rewrite; semantic tables; shell a11y; scaffolds finished |
| 4 | `e50bd52` | Signature gradient-word sweep; off-brand animated gradients removed; motion catalogue documented |
| 5 | `2eb2fd8` | 16 new components (form controls, overlays, display, marketing blocks) + Elements & Blocks showcase, all documented |
| 6 | `dee306b` | Adversarial sweep + fixes; `_audit/FINAL-REVIEW.md` (overall **A**) |

Net: **94 files, +4,393 / −1,088.**

## Verified live (not asserted)
- **Radius restored:** cards 12px, bento 20px, footer 36px, CTAs true pills — measured via computed styles.
- **Both themes hold:** hero renders correctly on paper (warm ivory, canonical) and dark (OLED black); the rebuilt cards and new components (table header, panels) flip correctly under `.dark`.
- **Signature moment:** the hero "calm" / "one system" word runs the 480ms gradient sweep, then rests on the static gradient.
- **New components work:** modal traps focus + locks scroll + returns focus; toast fires and self-dismisses; tabs/switch/checkbox/radio/table render on-brand; Alert tint pairs measured 5.1–6.1:1 (AA).
- **Zero regressions:** no glass, no coloured/black shadows, no spring/overshoot, no white-on-bright-accent, no hype words, single h1, clean console.

## Before → after (headline)
- **Tokens:** `tokens.json` was incomplete and self-contradictory (8px-everywhere vs docs) → complete, correct, theme-aware single source of truth, mirrored 1:1 to css + preset.
- **Machine-readability:** no root entry point, half-documented components, wrong glow values in the reference → `llms.txt` + `ASSET-RECIPES.md` + corrected token reference; a fresh AI can build on-brand from the URL alone.
- **Cards:** a Figma import full of glass/3D/spring/foreign-palette that broke in dark → flat, tokenised, theme-aware, keyboard-accessible, ~45 archetypes preserved.
- **Voice:** flagship hero was hype ("the only design system that matters") → calm Sage ("the design system behind a calm practice").
- **Coverage:** 40 components → 56, with the interaction layer (forms, overlays, tables, blocks) the system previously lacked.

## Hand-off
Everything is committed on `fable5/impeccable-pass`. **Not pushed to main, no PR opened** — awaiting your decision. `_audit/` holds AUDIT.md (Phase 0), FINAL-REVIEW.md (scorecard) and this PROOF.md.
