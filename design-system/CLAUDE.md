# CLAUDE.md — read this first

This folder is the **portable, LLM-readable layer** of Health OS Design System **v2**. When producing anything for Health OS — a page, a funnel, a slide, an email, an ad, a skinned site — read this file first, then load what you need. Use the **tokens** as the source of truth for values; never hard-code a hex, size or radius that exists as a token.

> v2 = v1's locked warm brand (apricot → rose → lavender, flat, premium) with command-centre structural craft (command-palette hero, mono labels, dark pill CTAs, gentle marquee, soft glows) + quiet supporting texture (grain, thin ticker, bento grid, rounded carbon footer). The **delta from v1 is the type pairing and the structure** — the brand is unchanged.

## 1. Load order
1. `BRAND-SUMMARY.md` — the one-page snapshot.
2. `foundations/brand.md` + `voice.md` + `vocabulary.md` — who we are, how we sound.
3. `foundations/color.md` · `typography.md` · `spacing.md` · `radius.md` · `shadow.md` · `motion.md` · `iconography.md` · `imagery.md` — the visual rules.
4. `tokens/tokens.json` (+ `tokens.css`, `tailwind.preset.js`) — the values.
5. `logo/usage.md` — the mark rules.
6. `components/README.md` — the component catalogue and its props / variants.

## 2. Token quick reference (use these exact class names)
| Need | Token / class |
|---|---|
| Page background | `bg-paper` (`#F9F6F2`) |
| Card surface | `bg-surface` (`#FFFFFF`) |
| Body text | `text-ink-900` |
| Secondary text | `text-ink-500` / `text-ink-600` |
| Hairline border | `border-line` (`#E7E0D8`) |
| Primary action (white text) | `bg-brand-600` (`#BE2E7B`) |
| Brand accent / DNA hue | `brand-400` / `rose-400` (`#E85BA8`) |
| Warm accent | `apricot-400` (`#F5A060`) |
| Cool accent | `lavender-400` (`#A666D9`) |
| Premium signal | `gold-600` (`#BE9522`) |
| Dark CTA / footer | `bg-carbon` (`#1F1F1F`) |
| Signature gradient | `bg-brand-gradient` |
| Soft gradient fill | `bg-brand-gradient-soft` |
| Hero glow wash | `bg-glow-hero` (or `bg-glow-rose/-apricot/-lavender`) |
| Headings | `font-display` (Spline Sans) |
| Body / labels | `font-sans` or `font-mono` (Anonymous Pro) |
| Heading sizes | `text-display-xl` … `text-h4` |
| Body sizes | `text-body-lg/-md/-sm`, `text-caption` |
| Overline / label | `text-overline`, `text-label` (uppercase mono) |
| UI radius | `rounded-md` (8px) |
| Card radius | `rounded-lg` (12px) |
| Pill / CTA | `rounded-full` |
| Bento / hero panel | `rounded-xl` / `rounded-2xl` |
| Hover shadow | `shadow-sm` / `shadow-md` |
| Marquee carousel | `animate-marquee` (also `-slow`, `-reverse`) |
| Thin top ticker | `animate-ticker` |
| Containers | `max-w-container` (1200), `max-w-reading` (680), `max-w-hero-subcopy` (600) |
| Hero spacing (RULE) | build with the `<Hero>` primitive — padding `pt-hero-py`/`pb-hero-py` (112) → `md:…-hero-py-lg` (176); item gaps `mt-hero-gap` (56) / `mt-hero-gap-sm` (32). See `foundations/hero.md`. |

## 3. Non-negotiables (Health OS v2 terms)
1. **Multi-hue, disciplined.** Apricot / rose / lavender are all real, but one primary (`brand-600`) drives action; accents fill, the gradient + glows are signature-only.
2. **Gradient & glows with restraint.** Logo, one hero word (`text-transparent bg-clip-text bg-brand-gradient`), the primary CTA, soft hero glows — not every surface.
3. **Zero glassmorphism.** No backdrop blur on content, no frosted panels.
4. **No 3D / neumorphism / inner shadows / coloured shadows.** Flat, calm, premium. Shadows are carbon-based and neutral.
5. **Never pure white or pure black.** Paper `#F9F6F2` and carbon `#1F1F1F` are the brand.
6. **Sentence case** everywhere (overlines / mono labels may be uppercase).
7. **Type pairing is locked:** Spline Sans headings (`font-display`) + Anonymous Pro body & labels (`font-sans`/`font-mono`, monospace). The monospace body is the OS texture — don't swap it for a proportional sans. Body line-height 1.6; **mono measure ≤ ~70 characters.**
8. **Motion is first-class but quiet** — fade + small translate, 150–250ms interactions / 300–400ms reveals / never >500ms. Gentle marquee + thin ticker are the only always-on loops. `prefers-reduced-motion` honoured (loops stop).
9. **Accessible contrast** — body ≥ AA; **white text only on `brand-600`+ or `carbon`, never on bright accents** (`brand-400`, `apricot-400`, `lavender-400`).
10. **Australian English, calm Sage voice.** Say **practitioners** and **clients** (never "coaches"). Outcome first, no hype. Show the mechanism.
11. **Heroes are spacious by rule.** Every hero is built with the `<Hero>` primitive and its hero-spacing tokens (`hero-py`/`hero-py-lg`, `hero-gap`/`hero-gap-sm`) — generous, minimalist, lots of air. Never hand-roll cramped hero padding. See `foundations/hero.md`.

## 4. Defaults when ambiguous
| Question | Default |
|---|---|
| Background | `bg-paper` `#F9F6F2` |
| Case | sentence case |
| Heading font | `font-display` (Spline Sans) |
| Body font | `font-sans` (Anonymous Pro, mono) |
| Body size | `body-md` (16/26) |
| Reading measure | ≤ ~70 chars (`max-w-hero-subcopy` / `max-w-reading`) |
| CTA shape | pill (`rounded-full`) for marketing / `rounded-md` for product UI |
| Primary CTA | `bg-brand-600` text-white **or** the dark pill `bg-carbon` text-white |
| Section spacing | 96px desktop (`py-24`), 64px mobile (`py-16`) |
| Card | `bg-surface border border-line rounded-lg shadow-none`, `shadow-sm` on hover |
| Bento card | `rounded-xl` |
| Hero | `<Hero>` primitive (spacious by rule) + `bg-glow-hero` + command bar + type (no photo needed) |
| Accent | rose; reach for apricot / lavender only with intent |

## 5. v2 signature moves (use these to make a page feel like Health OS v2)
- **Command-palette hero:** centred `CommandBar` (search input + ⌘K + "type / for commands") with a row of `/command` chips below, over `bg-glow-hero` on `bg-paper`. The single strongest v2 signal.
- **Tool-card marquee:** a horizontal row of `ToolCard`s (the tools Health OS replaces) gently marqueeing (`animate-marquee`), pause on hover.
- **Mono overlines:** every section opens with a `text-overline` mono eyebrow in `text-brand-600`.
- **Dark pill CTA:** `bg-carbon text-white rounded-full` — the calm-but-confident action.
- **Thin top ticker:** a single line of short mono labels (`animate-ticker`).
- **Rounded carbon footer:** `bg-carbon rounded-3xl` panel.
- **Bento feature grid** + **count-up stats**.

## 6. Asset-type cheat sheet
| Request | Where to look |
|---|---|
| Landing page / homepage | `foundations/*` + `components/README.md` (command bar, tool cards, bento, footer) |
| Hero | `bg-glow-hero` + `CommandBar` + `CommandChip` + one gradient word |
| Buttons / cards / inputs | `components/README.md` (button, card, input) |
| Tool / feature carousel | `ToolCard` + `Marquee` + `FeatureCard` |
| Motion / interactions | `foundations/motion.md` + the motion primitives in `components/README.md` |
| Colours / type / spacing values | `tokens/` |
| Voice / copy | `foundations/voice.md` + `vocabulary.md` |
| Imagery / backgrounds | `foundations/imagery.md` |
| Logo / favicon | `logo/usage.md` |

## 7. Quality bar — ask before delivering
1. Did I use **tokens / class names**, not raw hexes or pixel sizes?
2. Is it **sentence case** and in the **Health OS Sage voice** (Australian English, specific, calm, no hype, "practitioners"/"clients")?
3. Are the **gradient and glows restrained** (signature moments only) — and is there **zero glass**?
4. Is the **type pairing right** — Spline Sans headings, Anonymous Pro mono body at 1.6, short measure?
5. Does **contrast** pass AA, with white text only on `brand-600`+ or `carbon`?
6. Is the background **paper** (not pure white) and text **carbon/ink** (not pure black)?
7. If it moves, is the motion **quiet** and **reduced-motion-safe** (loops stop)?
8. Would Hayley feel **relief** in 5 seconds — not sold to?
