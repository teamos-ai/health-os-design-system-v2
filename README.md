# Health OS design system

The design and brand reference for Health OS. One token file, two themes, three brand colours, headlines with one apricot word and a picture tile, an 80-tile squircle library, nine card types, three bento systems, feature components, lead magnets, a full widget library and a tagged image library, documented so AI agents can build from it first and people can browse it second.

- Reference site: https://ds-healthos.vercel.app
- For AI agents: start at [`llms.txt`](llms.txt), then [`design-system/CLAUDE.md`](design-system/CLAUDE.md)

## How it fits together

```
design-system/tokens/tokens.json        the only file with token values
  └─ scripts/tokens.mjs                 generates
       ├─ design-system/tokens/tokens.css         CSS variables, both themes
       ├─ design-system/tokens/tailwind.preset.js the Tailwind preset (off-system classes produce no CSS)
       └─ src/lib/palette.ts                      fixed values for SVG and inline styles

design-system/reference/catalog.json    purpose, use, avoid, API and source for every entry,
                                        plus the checklist and the open decisions
  ├─ src/showcase/**                    the reference site renders it next to each example
  └─ scripts/docs.mjs                   generates
       ├─ design-system/REFERENCE.md
       ├─ design-system/CHECKLIST.md
       └─ llms.txt

scripts/lint-tokens.mjs                 fails on any colour, size, radius, shadow or font
                                        class the tokens do not define
```

The site and the written reference read the same files, so they cannot drift apart.

## Commands

```bash
npm install
npm run dev       # http://localhost:5183
npm run tokens    # after editing tokens.json
npm run docs      # after editing catalog.json
npm run check     # tokens in sync, docs in sync, no off-system classes
npm run build     # check, then typecheck, then build dist/
```

Vercel runs `npm run build`, so a deploy fails if tokens or docs are stale or a class is off-system.

## Repository

```
design-system/
  CLAUDE.md          read first: authority, load order, rules, how to change the system
  REFERENCE.md       generated: every token and entry
  CHECKLIST.md       generated: the pre-asset checklist
  BRAND-SUMMARY.md   what Health OS is and how it should feel
  VOICE.md           copy mechanics, and where the database takes over
  ASSET-RECIPES.md   what to use for each kind of asset
  tokens/            tokens.json and its generated outputs
  reference/         catalog.json
  logo/              the mark and its usage
  _audit/            audit and critique reports
src/
  components/        ui, cards, widgets, blocks, bento, layout, brand
  sections/          CommandHero, Pillars, BentoSection, DirectoryCompare
  showcase/          the reference site: Shell, Section, one file per section
  data/              demo copy, the offer from the database, image library tags
  lib/               cn, theme, motion constants, generated palette
public/
  imagery/ backgrounds/ media/   the image library and the overview video
```

## Stack

React 18 · Vite 6 · TypeScript 5 · Tailwind CSS 3.4 · Framer Motion 11 · Lucide · class-variance-authority · tailwind-merge.

## Authority

Design and brand decisions: this repository, approved by Tumai. Claims, prices, offers and voice: the Health OS database, `teamos-ai/db-health-os`, which this system never overrides.
