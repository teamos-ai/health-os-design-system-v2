# Health OS Design System v2

A fully tokenised, living **React + Vite + TypeScript + Tailwind v3 + Framer Motion** design system and showcase for **Health OS** — the calm operating system for practitioners.

> **A warm, flat, premium, calm command-centre system.** Warm ivory + carbon + rose, never pure white/black, never pink-red. Zero glassmorphism, soft neutral shadows, WCAG AA, sentence case, calm Sage voice.

v2 is the second design-system experiment for Health OS. It keeps v1's locked colour architecture and adds command-centre craft (command-palette hero with `/command` chips, soft pastel radial glows, a horizontal tool-card carousel, mono labels, dark carbon pill CTAs, rounded hairline cards, a directory/comparison rhythm) and quiet supporting details (subtle grain, a thin top ticker, a bento grid, a rounded dark-carbon footer).

## Brand — locked

| Token | Value |
|---|---|
| Background | Warm Ivory `#F9F6F2` (`paper`) |
| Surface | `#FFFFFF` (`surface`) |
| Text | Carbon `#1F1F1F` (`ink-900`) |
| Hairline | `#E7E0D8` (`line`) |
| Accent (primary) | Rose `#E85BA8` (`brand-400`) |
| Primary action (white text, AA) | Rose `#BE2E7B` (`brand-600`) |
| Accents | Apricot `#F5A060`, Lavender `#A666D9`, Gold `#BE9522` |
| Gradient | `linear-gradient(135deg,#F5A060,#E85BA8 50%,#A666D9)` — used with restraint |
| Headings | **Spline Sans** (600/700) — `font-display` |
| Body + labels | **Anonymous Pro** (400/700, monospace) — `font-sans` / `font-mono`, line-height 1.6 |
| Radius | 8px UI · 12px cards · full pills for marketing CTAs |
| Elevation | flat + 1px hairline; soft neutral shadow on hover only — **zero glass** |
| Motion | subtle 150–250ms, reveals 300–400ms, ≤500ms, reduced-motion safe |
| Icons | Lucide, line, 1.5px stroke |

Full reference lives in [`design-system/`](design-system/) — tokens, foundations docs, `CLAUDE.md` (agent skinning guide), `BRAND-SUMMARY.md`, and the logo kit.

## Stack

React 18 · Vite 6 · TypeScript 5 · Tailwind v3 (preset format) · Framer Motion 11 · Lucide · CVA + clsx + tailwind-merge.

## Run

```bash
npm install
npm run dev        # http://localhost:5183
npm run build      # tsc --noEmit && vite build  →  dist/
npm run preview
```

## Structure

```
design-system/
  tokens/          tokens.json · tokens.css · tailwind.preset.js  (single source of truth)
  foundations/     colour · typography · spacing · radius · shadow · motion · iconography · imagery · voice · vocabulary
  logo/            mark · wordmark · lockups · favicon · usage
  CLAUDE.md · BRAND-SUMMARY.md · README.md
src/
  lib/             cn() (tailwind-merge taught about our font-size tokens) · accents
  data/            demo content (calm Sage voice) · imagery buckets + washes
  components/
    brand/         Logo (gradient OS mark + wordmark)
    ui/            button · card · badge · input · command-bar · command-chip · tool-card ·
                   feature-card · stat · mono-label · image-wash · dashboard-preview · animated (motion primitives)
    layout/        Nav (sticky centered + search) · Footer (dark-carbon) · Ticker
    bento/         BentoGrid · BentoCard
  sections/        CommandHero · ToolCarousel · Pillars · OutcomeBand · BentoSection · DirectoryCompare
  showcase/        Shell (left-nav) · Section · sections/* (Overview, Tokens, Logo, Components, Signature, Motion, Image library, Live page)
```

## The token pipeline

`design-system/tokens/tailwind.preset.js` is the single source of truth. It feeds Tailwind via `tailwind.config.js` (`presets: [healthos]`), so every component uses tokenised classes (`bg-brand-600`, `text-ink-900`, `font-display`, `rounded-lg`, `shadow-md`, `bg-glow-hero`, `animate-marquee`) — no hard-coded colours or sizes downstream. `tokens.css` mirrors the values as CSS variables for non-Tailwind consumers; `tokens.json` is the W3C-style export.

## Deploy

GitHub: [`teamos-ai/health-os-design-system-v2`](https://github.com/teamos-ai/health-os-design-system-v2) (private, SSH).
Vercel (Team OS): auto-detect Vite · build `npm run build` · output `dist`.

---

Built for practitioners. Calm, grounded, outcome-first.
