# Asset recipes

What to reach for when building each kind of asset. Each recipe names the ground, type, colour moments, components and checks. Values and props are in [REFERENCE.md](REFERENCE.md); copy and claims follow [VOICE.md](VOICE.md) and the Health OS database. Finish every asset with [CHECKLIST.md](CHECKLIST.md).

**Every asset:** one theme (light or paper) · Spline Sans headings, Anonymous Pro body · rose, apricot and lavender only in 50, 200 and 400, with widgets and cards in 200 and 50 only, text in ink · one gradient moment, never a saturated fill · primary buttons in rose-400 · flat surfaces with hairlines · images from the tagged library · sentence case, no em dashes, no invented numbers.

## 1. Marketing page

The live page in the reference site is this recipe, assembled.

| Order | Build with | Notes |
|---|---|---|
| Ticker | `Ticker` | Optional. Tone `subtle` on light, `carbon` on paper, `tint` for a softer moment. One per page |
| Navigation | `Nav` | One primary button in the bar |
| Hero | `CommandHero`, or `Hero` + `HeroContainer` + `HeroGlow` | Spacing comes from the hero tokens. One `.text-highlight` word in the headline |
| Why it works | `Pillars` (feature grid) | Up to four `FeatureCard`s |
| What runs | `BentoSection`, or `BentoGrid` with `ContentCard`, `FeatureCard` and one `ActionCard` | Mix card types; one action card |
| Plans | `PricingTable` with plans from `src/data/offer.ts` | Prices and fees exactly as the database states them |
| Comparison | `DirectoryCompare` | Open decision; never names a competitor |
| Questions | `Faq`, two columns for six or more | Answers from the database FAQ |
| Footer | `Footer` | Carbon panel, `rounded-lg` |

Sections sit at `py-16 md:py-24` inside `max-w-container px-6`. Every third section can take the textured ground. The primary action on the page is the same everywhere it appears.

## 2. Blog post or guide

- `max-w-reading` column on the page ground.
- Category `Badge` · `h1` in `font-display text-heading` · byline in `font-sans text-label text-ink-500` ("13 September 2026 · 6 min read") · lead paragraph in `text-body text-ink-600`.
- Section titles in `text-subheading`. Figures in `rounded-lg` frames with a `text-label` caption.
- Comparisons are real tables (`Table`), with a text alternative for any check or cross.
- A pull quote sits on `bg-brand-gradient-soft` with `rounded-lg`, not a side stripe.
- Related reading uses `ContentCard`. A download uses `ResourceCard`. One `ActionCard` closes the post.

## 3. Lead magnet: guide, checklist or calculator

- The listing is a `ResourceCard` with a portrait cover from the background library (tone light or mid, text space at top).
- The cover title sits on a paper strip, never directly on the photo.
- Calculators follow the stack cost calculator: `Input`s, one primary `Button`, a result panel that explains the sum. Only the visitor's own numbers; no pre-filled savings.

## 4. Email

- 600px single column. Page ground outside, `surface` card inside with a `line` hairline and 12px corners.
- Logo mark at 40px, top left. Headline in Spline Sans 700 at the subheading size or the heading's 36px floor; body 16px on 26px in Anonymous Pro, with `ui-monospace, Menlo, monospace` as the fallback.
- One button: rose-400 `#E85BA8` fill, white text, 8px corners, written as a bulletproof link.
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
- Tables with hairline rows and `text-label` headers. Links in ink with a rose-400 underline; key figures in ink-900.
- The logo mark on the title page only.

## 8. Product screen or dashboard

- `bg-paper` page, `surface` cards with `border-line rounded-lg`, `surface-2` wells and table headers.
- Build from widgets first: pick by their "Use it for" line and wire their documented inputs to real data. Their colours stay in the light and soft shades.
- Controls from Elements: `Input`, `Select`, `Checkbox`, `Switch`, `Segmented`, `Tabs`, `Table`, `Pagination`.
- Status uses the 100 tint with ink text and a 600 icon or dot. Numbers use tabular figures.
- Design the empty, loading (`Skeleton`) and error (`Alert`) states for every view.
- Experimental widgets can be used. Check their notes in REFERENCE.md first.

## 9. Screenshot of the product

- Crop to the part that makes the point. Remove browser chrome unless the frame helps.
- Frame it on a `surface` panel with `rounded-lg` and `shadow-lg`.
- Replace or blur every name, email, phone number, price agreement and client detail.
- Never present a coded mock as a real screenshot.
