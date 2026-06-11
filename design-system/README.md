# Health OS Design System — v2

A calm, warm, fully tokenised design system for wellness practitioners. **v1's locked brand** (apricot → rose → lavender on warm ivory, flat and premium) wearing **efficient.app's structural craft** — a command-palette search hero, monospace labels, dark pill CTAs, a gentle tool-card marquee, soft pastel glows — with a little **Cherry Note** texture (grain, a thin top ticker, a bento grid, a rounded carbon footer).

Built with **React + Vite + TypeScript + Tailwind CSS + Framer Motion**.

> The brand is identical to v1. The v2 delta is the **type pairing** (Spline Sans headings + Anonymous Pro monospace body — the "operating system" texture) and the **structure** (command palette, marquee, glows, dark pills).

## What's in this folder

```
design-system/
├── CLAUDE.md            ← read first: agent rules, token quick-reference, do/don't
├── BRAND-SUMMARY.md     ← one-page locked brand snapshot
├── README.md            ← this file
├── foundations/         ← the visual + verbal rules (the "why" and "how")
│   ├── brand.md
│   ├── color.md
│   ├── typography.md
│   ├── spacing.md
│   ├── radius.md
│   ├── shadow.md
│   ├── motion.md
│   ├── iconography.md
│   ├── imagery.md
│   ├── voice.md
│   └── vocabulary.md
├── tokens/              ← the values (single source of truth)
│   ├── tailwind.preset.js
│   ├── tokens.css
│   └── tokens.json
├── components/
│   └── README.md        ← the component catalogue + props / variants
└── logo/
    └── usage.md         ← logo do/don't, clear space, min size, inverse
```

## The token pipeline — how values reach your markup

There is **one source of truth** with three portable mirrors, kept in lockstep:

| File | Format | Consumed by |
|---|---|---|
| `tokens/tailwind.preset.js` | Tailwind preset (JS) | the Tailwind build — defines every `bg-*`, `text-*`, `rounded-*`, `shadow-*`, `animate-*`, `font-*`, `max-w-*` class |
| `tokens/tokens.css` | CSS custom properties (`--hos-*`) | any non-Tailwind consumer (vanilla CSS, email, embeds) |
| `tokens/tokens.json` | W3C-style design tokens | Figma, Style Dictionary, other tooling |

### How tokens flow into Tailwind
The preset is loaded in `tailwind.config.js` at the project root:

```js
// tailwind.config.js
import healthos from './design-system/tokens/tailwind.preset.js'

export default {
  presets: [healthos],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
}
```

Because the preset lives under `theme.extend`, every named token becomes a Tailwind utility:

- Colours → `bg-brand-600`, `text-ink-900`, `border-line`, `bg-glow-hero`, `bg-brand-gradient`
- Type → `font-display`, `font-mono`, `text-display-xl`, `text-overline`
- Radius → `rounded-md`, `rounded-lg`, `rounded-full`
- Shadow → `shadow-sm`, `shadow-md`, `shadow-carbon`
- Motion → `animate-marquee`, `animate-ticker`, `duration-md`, `ease-out`
- Layout → `max-w-container`, `max-w-reading`, `max-w-hero-subcopy`

**Never hard-code a hex, size, radius or duration that already exists as a token.** If you need a value the tokens don't have, add it to the preset (and mirror it in `tokens.css` / `tokens.json`) rather than inlining it.

### Fonts
The locked pairing loads in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@400;500;600;700&family=Anonymous+Pro:wght@400;700&display=swap" rel="stylesheet">
```

Spline Sans drives `font-display`; Anonymous Pro (monospace) drives both `font-sans` and `font-mono` — the deliberate "OS" texture.

## Running the showcase
From the project root:

```bash
npm install
npm run dev      # Vite dev server
npm run build    # production build
```

> Build note: this system develops cleanly from a local path. Vite / esbuild can struggle to resolve modules from paths containing spaces, so build under a space-free path (e.g. `C:\dev\health-os-design-system-v2`) and mirror to any network share afterwards.

## Using the system anywhere else
1. Read `CLAUDE.md` for the rules and the token quick-reference.
2. Pull the preset (Tailwind) or `tokens.css` (anything else).
3. Follow the foundations — especially **zero glass**, **never pure white/black**, **white text only on `brand-600`+ or carbon**, **sentence case**, **Australian English Sage voice**.
4. Reach for the v2 signature moves (command-palette hero, tool-card marquee, mono overlines, dark pill CTAs) to make a page unmistakably Health OS v2.
