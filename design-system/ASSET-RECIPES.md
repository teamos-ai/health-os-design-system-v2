# Asset recipes — build anything on-brand

How to produce each asset type from this system. Every recipe = **ground + type + colour discipline + components + voice register**. Values come from `tokens/` (never hard-code); component APIs from `components/README.md`; voice from `foundations/voice.md`. When an asset type isn't listed, compose from the nearest recipe and the defaults in `CLAUDE.md` §4.

**Universal rules (every asset):** paper ground (`#F9F6F2` / `bg-paper`) · Spline Sans headings + Anonymous Pro mono body at 1.6 · sentence case · one gradient moment maximum · flat + hairline (`border-line`), shadow only on hover/floating · AA contrast (white text only on `brand-600`+/`carbon`) · Australian English, calm Sage voice, "practitioners"/"clients" · no glass, no 3D, no confetti, no hype.

---

## 1. Landing page / homepage

- **Structure (the v2 rhythm):** thin `Ticker` → `Nav` (paper, hairline bottom) → command-palette hero (`<Hero>` + `HeroGlow` + `CommandBar` + `CommandChip` row) → `ToolCard` marquee ("replaces" framing) → bento feature grid (`BentoGrid` + `FeatureCard`, one highlight cell max) → `Stat` count-up band → comparison/directory section → rounded carbon `Footer` (`bg-carbon rounded-3xl`).
- **Hero:** built ONLY with the `<Hero>` primitive (`hero-py`/`hero-py-lg` padding, `hero-gap`/`hero-gap-sm` stack rhythm). H1 `text-display-lg/-xl`, ONE gradient word (`text-transparent bg-clip-text bg-brand-gradient`), subcopy `body-lg` at `max-w-hero-subcopy`, primary CTA = dark pill (`bg-carbon text-white rounded-full`) or `bg-brand-600` pill.
- **Section rhythm:** `py-16 md:py-24`; every section opens `MonoLabel` overline (`text-overline text-brand-600`) → `h2` → `body-md`.
- **Colour:** rose-600 drives every action; apricot/lavender only as `-100` feature-chip fills; gradient = logo + one hero word + (optionally) one CTA.
- **Voice:** homepage-hero register — one true specific thing, e.g. "Bookings, reminders and follow-up — running while you're with clients."

## 2. Email — marketing

- **Layout:** single 600px column · `bg-paper` outer, `bg-surface` card with 1px `line` border, `rounded-lg` (12px) · logo lockup top-left at ≥120px · generous 32–48px padding.
- **Type (email-safe):** load Spline Sans + Anonymous Pro via Google Fonts `<link>` with fallbacks `ui-sans-serif/system-ui` and `ui-monospace/Menlo` — the mono fallback keeps the OS texture. H1 = `h2` size (34px) — display sizes are too large for mail. Body 16/26.
- **Colour:** one CTA button, `bg-brand-600` white text, `rounded-full`, bulletproof-button markup. No gradient fills in email (rendering risk) — a 4px gradient top border strip is the sanctioned signature moment.
- **Voice:** "a one-to-one note from someone who gets it." Sentence-case subject, no exclamation marks, outcome in the first line.
- **Transactional variant:** drop the glow/gradient entirely; plain, factual, fast; `body-sm` metadata in `ink-500`.

## 3. Slide deck

- **Canvas:** 16:9, `paper` ground. Title slides may carry `bg-glow-hero` (soft, top-weighted); content slides stay clean.
- **Type scale:** slide title = `display-lg` (58px), section title = `h1` (42), body = 21–24px mono (scale `body-lg` up ~1.3× for projection; keep ≤ ~60ch), labels = `overline` in `brand-600`.
- **Layout:** one idea per slide; overline → title → ≤3 supporting points; 96px outer margins; hairline dividers, not boxes. Stats use `display-xl` numbers + mono labels (the `Stat` pattern).
- **Colour:** carbon text on paper; ONE accent moment per slide (a gradient word on the title slide, a `-100` chip, a key number in `brand-600`). Dark closing slide: `carbon` ground, white text, gradient logo mark.
- **Don't:** full-bleed photos behind text, more than 3 type sizes, bullets deeper than one level.

## 4. Document (report / proposal / one-pager)

- **Page:** A4, `paper` ground (print: keep the ivory or fall back to white + `line` rules) · 88px top/bottom, 72px side margins.
- **Type:** title `h1`, sections open overline (`label`, `brand-600`, uppercase mono) → `h2`/`h3` → body `body-md` at ≤70ch. Captions/footnotes `caption` in `ink-500`.
- **Furniture:** hairline `line` rules between sections; tables = mono `body-sm`, hairline row dividers, no zebra fills; pull-quotes get a 2px `brand-400` left border; page footer = mono `label` with page number.
- **Colour:** near-monochrome; brand-600 for links/key figures only. Logo lockup on the title page, mark-only in running footers.
- **Voice:** feature-page register — show the mechanism, short sentences, Oxford comma, numerals ("12 hrs", "98%").

## 5. Social post

- **Formats:** feed 1080×1080 · story/reel 1080×1920 · OG/link 1200×630 (see `imagery.md` §OG).
- **Anatomy:** paper ground · ONE short headline (`display-lg` weight, sentence case, ≤2 lines) · optional mono overline · logo mark small in a corner · one signature accent: a gradient bar, a soft `bg-glow-*` wash, or a single gradient word — never more than one.
- **Photography variant:** real warm photo (see `imagery.md`), `rounded-lg`, subtle ivory grade; text on plain ground beside/below it, never over the subject.
- **Voice:** "useful first; one idea per post." No hashtag walls (≤3), no urgency theatre.
- **Safe areas (story/reel):** keep type inside the centre 1080×1420; nothing in the top 250px / bottom 250px.

## 6. Dashboard / product UI

- **Shell:** `bg-paper` page, `bg-surface` cards with `border-line rounded-lg` (12px), inset wells `bg-surface-2` · optional fixed `carbon` rail (white/70 labels, active item `bg-white/10`).
- **Controls:** product-UI buttons are `rounded-md` (NOT pills) · inputs per `Input` (hairline, focus ring `brand-400` border + soft ring) · segmented controls, `IconButton`, `Pagination` from the library.
- **Type:** mono everywhere except card/panel titles (`h4` Spline Sans); ALL numbers `font-mono tabular-nums`; metadata `caption`/`label` in `ink-500`.
- **Status:** the `-100` tint + `-700` text pair (`bg-success-100 text-success-700`), hairline border, sentence-case label. Charts use the 400-level accents (apricot/lavender/rose-300) as data hues on white.
- **States (mandatory):** every view designs empty (encouraging, next-action), loading (skeleton `animate-shimmer`, not spinners), and error (own it, fix it, move on) states.
- **Density:** 8px grid, `p-5`/`p-6` cards, `gap-4`–`gap-6`; three themes supported via tokens — never hard-code neutrals.

## 7. Blog / long-form article

- Category `Badge` → `h1` → mono byline (`caption`, `ink-500`, "Dr Elise Warner · 11 June 2026 · 6 min read") → lead `body-lg` → sections `h2` at ≤`max-w-reading` · pull-quote = `h3` italic with 2px `brand-400` left border · figures `rounded-lg` with mono captions · comparison tables = real `<table>`, hairlines, Lucide check/x at 1.5px with text alternatives.

## 8. Ad / banner (display)

- One outcome-first line (sentence case, ≤8 words) + one pill CTA (`bg-brand-600` or carbon) + logo mark · paper ground with a single soft glow wash · mono `label` for the disclaimer line. No countdown timers, no red urgency, no more than one accent.

---

## Voice register cheat-sheet (from voice.md)

| Asset | Register |
|---|---|
| Landing hero | Confident, plain, specific — the one true thing |
| Email (marketing) | One-to-one note from someone who gets it |
| Email (transactional) | Plain, factual, fast |
| Slides | Quiet proof; let numbers and practitioners talk |
| Document | Show the mechanism; calm and concrete |
| Social | Useful first; one idea per post |
| Product UI / empty states | Encouraging, points to the next small action |
| Errors | Own it, fix it, move on — never cute |

## Pre-delivery checklist (every asset)

1. Tokens/class names only — zero raw hexes, sizes, radii, shadows, durations that exist as tokens.
2. Sentence case; Australian English; "practitioners"/"clients"; no hype words; no exclamation marks.
3. Gradient + glows restrained to signature moments; zero glass; flat + hairline.
4. Spline Sans headings / Anonymous Pro mono body at 1.6; measure ≤ ~70ch.
5. AA everywhere; white text only on brand-600+/carbon.
6. Paper ground, carbon ink — never pure white page / pure black text (theme grounds excepted).
7. Motion (if any): 150–250ms interactions, 300–400ms reveals, ≤480ms, reduced-motion safe.
8. Would Hayley feel relief in 5 seconds — not sold to?
