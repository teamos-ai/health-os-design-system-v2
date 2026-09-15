# Asset recipes

What to reach for when building each kind of asset. Each recipe names the ground, type, colour moments, components and checks. Values and props are in [REFERENCE.md](REFERENCE.md); copy and claims follow [VOICE.md](VOICE.md) and the Health OS database. Finish every asset with [CHECKLIST.md](CHECKLIST.md).

**Every asset:** one theme (light or paper), never a dark background · Spline Sans headings, Anonymous Pro body · every H1 a `Headline`: ink with one apricot-400 accent word and one to three icon tiles · the only dark surface is the small icon tile · rose, apricot and lavender only in 50, 200 and 400, with widgets and cards in 200 and 50 only, text in ink · apricot for every interactive accent and never as decoration, focus rings in ink-900 · one gradient moment, never a saturated fill · buttons in apricot-200 `#F8C39C` with ink text · flat surfaces with hairlines · images from the tagged library · video only in `VideoPlayer` · sentence case, no em dashes, no invented numbers.

## 1. Marketing page

The live page in the reference site is this recipe, assembled.

| Order | Build with | Notes |
|---|---|---|
| Banner | `Ticker` | Optional. The one banner, on the soft wash, on both themes. One per page |
| Navigation | `Nav` | One primary button in the bar |
| Hero | `CommandHero`, or `Hero` + `HeroContainer` + `HeroGlow` | Spacing comes from the hero tokens. The H1 is a `Headline` with its accent word and floating icon tiles, ideally a line from the headline library. Add `fade` when the section below sits on the textured ground. Only a page's opening hero may float its tiles around the headline with `FloatingTiles` |
| Why it works | `Pillars` (feature grid) | Up to four `FeatureCard`s |
| What runs | `FeatureBento` for a section summary, `ProductBento` for what the platform does, or feature components (`FeatureSteps`, `FeatureTabs`, `FeatureGrid`, `FeatureCards`) | One bento per page. Figures from the database only |
| Plans | `PricingTable` with plans from `src/data/offer.ts` (never a loose `PricingCard`) | Prices and fees exactly as the offer states them. Annual prices are monthly × 10, two months free; the switch and its confetti come with the table |
| Comparison | `DirectoryCompare` | Open decision; never names a competitor |
| Questions | `Faq`, one condensed column up to 800px | Answers from the database FAQ. Questions in the quiet title role |
| Footer | `Footer` | Light surface-2 panel with a hairline, `rounded-lg`. `LogoLong` fits here when there is room |

Sections sit at `py-16 md:py-24` inside `max-w-container px-6`. Every third section can take the textured ground. The primary action on the page is the same everywhere it appears.

## 2. Blog post or guide

The reference site's Blog section is this recipe, assembled. Parts are in `src/components/blog/Blog.tsx`.

- **Article page:** `Breadcrumb` · category `Badge` · the H1 as a `Headline` with its accent word and icon tiles · a standfirst in `text-body text-ink-600` · `ArticleMeta` (author, date, reading time, copy link) · a hero figure with a `text-label` caption.
- The body sits on `max-w-reading` beside a `TableOfContents` (sticky from lg) when there are three or more subheadings. Section titles in `text-subheading`.
- A pull quote is `PullQuote`: larger subheading type on a 2px rose-200 rule. Never a filled or gradient block behind reading text.
- The body goes inside `ArticleLayout`, so the reading column can shrink on phones and wide tables scroll inside their own frame.
- Comparisons are real tables (`Table`), with a text alternative for any check or cross.
- The end: tags as outline badges, `AuthorNote`, related posts as `ContentCard`s, and one next step (`ResourceCard` or `ActionCard`).
- **Blog index:** a `Headline` · one `FeaturedPost` · `CategoryFilter` · a grid of `ContentCard`s · `Pagination`.

## 3. Lead magnet: guide, checklist or calculator

- The listing is a `ResourceCard` with a portrait cover from the background library (tone light or mid, text space at top).
- The cover title sits on a paper strip, never directly on the photo.
- Calculators follow the stack cost calculator: `Input`s, one primary `Button`, a result panel that explains the sum. Only the visitor's own numbers; no pre-filled savings.

## 4. Email

- 600px single column. Page ground outside, `surface` card inside with a `line` hairline and 12px corners.
- Logo mark at 40px, top left. Headline in Spline Sans 700 at the subheading size or the heading's 36px floor; body 16px on 26px in Anonymous Pro, with `ui-monospace, Menlo, monospace` as the fallback.
- One button: apricot-200 `#F8C39C` fill, dark ink `#1F1F1F` text, 8px corners, written as a bulletproof link.
- Gradients are unreliable in email clients: use a solid `rose-50` or `apricot-50` panel for the one colour moment.
- Transactional email drops the colour moment entirely.

## 5. Social post

The reference site's social templates are the starting point.

| Format | Size | Safe area |
|---|---|---|
| Feed post | 1080 × 1080 | Keep type clear of the edges |
| Story | 1080 × 1920 | Keep type inside the centre 1080 × 1420 |
| Link preview | 1200 × 630 | Keep type clear of the edges; the image takes one half |

- Paper or light ground, one short headline in Spline Sans, the logo mark small in a corner.
- One colour moment: a highlight word, a soft wash panel or one image with its suggested use.
- Text never sits over the subject of a photo; put it on the ground beside or below.
- No competitor logos, testimonials or countdowns.

## 6. Slide deck

- 16:9 on the paper ground. Title slides may use `HeroGlow`'s soft wash at the top; content slides stay clean.
- Slide titles use the heading role at its largest size. Slides are the one place body text runs larger than 16px: size it for the room and keep it Anonymous Pro 400. Labels stay uppercase Anonymous Pro 700.
- One idea per slide, at most three supporting points, 96px outer margins, hairline dividers.
- Charts use the widget styles: 200 shades as data colours on ink-100 tracks, labels in ink-500.

## 7. Document: proposal, report or one-pager

- A4, paper ground (or white with `line` rules for print). 72px side margins.
- Title in Spline Sans 700, section titles in Spline Sans 600, body in Anonymous Pro 400 at a size that keeps about 70 characters a line.
- Tables with hairline rows and `text-label` headers. Links in ink with an apricot-200 underline; key figures in ink-900.
- The logo mark on the title page only.

## 8. Product screen or dashboard

- `bg-paper` page, `surface` cards with `border-line rounded-lg`, `surface-2` wells and table headers.
- Build from widgets first: pick by their "Use it for" line and wire their documented inputs to real data. Their colours stay in the light and soft shades.
- Controls from Elements: `Input`, `Select`, `Checkbox`, `Switch`, `Segmented`, `Tabs`, `Table`, `Pagination`.
- Status uses the 100 tint with ink text and a 600 icon or dot. Numbers use tabular figures.
- Design the empty, loading (`Skeleton`) and error (`Alert`) states for every view.
- Experimental widgets can be used. Check their notes in REFERENCE.md first.

## 9. Icon

Every H1 uses one to three icons, and cards, bentos and posts use them on their own (`IconTile`). Search the icon library (`HEADLINE_TILE_LIST`, or the Icon library section) for the word or the object: 228 icons in 17 groups, and all 107 headline words point at an icon. An icon marked `planned` needs making before it goes live.

- **Model:** Tumai's tiles (Health OS Branding Guidelines, pages 11 and 12): one real object in warm studio light, cut out, sitting on the warm charcoal squircle. The ground comes from the `icon` tokens, never from the image.
- **Subject:** one literal, recognisable object for the word beside it, written as the tile's `picture`. Software is a vintage all-in-one computer, calm is balanced river stones, built is wooden blocks. No people, icons, emoji, abstract shapes or brand logos (a classic product shape is fine; its logo is not).
- **Prompt:** "Photorealistic studio product photograph of [object], true-to-life materials and colours, three-quarter view. Isolated on a fully transparent background, centred and filling about 80% of a square frame, soft warm studio light from the upper left with a gentle rim light so every edge reads clearly, soft natural shading, crisp high detail, calm premium minimal aesthetic, like a refined app icon object. No text, no letters, no numbers, no logos, no brand marks, no watermark, no background, no floor, no shadow plane."
- **Settings:** GPT Image 2 text to image, 1K, 1:1, transparent background, through the KIE connection. Quote the cost and get Tumai's approval before generating.
- **Check:** sharp at 3× the tile size, no text, numbers or logos, reads on the charcoal ground at 40px. Redo anything that doesn't.
- **Save:** run `python3 scripts/icon-tiles.py <raw> <out>`, which trims to the object and pads it to 80% of a square. Save a 1024px PNG, a 320px WebP and the baked `-tile.png` (the object on the charcoal squircle, for Canva) to `public/heading-tiles/`, named after the id. Add the entry to `src/data/headline-tiles.ts` with its `words`, `group` and `picture`, and remove the id from `PLANNED` once its files exist.

## 10. Screenshot of the product

- Crop to the part that makes the point. Remove browser chrome unless the frame helps.
- Frame it on a `surface` panel with `rounded-lg` and `shadow-lg`.
- Replace or blur every name, email, phone number, price agreement and client detail.
- Never present a coded mock as a real screenshot.
