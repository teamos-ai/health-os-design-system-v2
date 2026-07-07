# Iconography

## Library — two tiers
1. **Functional UI icons: Lucide, exclusively.** (`lucide-react` in the app.) Every interactive, navigational, status or informational icon is Lucide — one library, no mixing. Lucide's clean, even line weight sits naturally next to Anonymous Pro's monospace — both read as quiet, engineered, calm.
2. **Illustrative feature icons: the Health OS squircle set** — the custom glyph library in the showcase's Icons section (8px squircle tiles, Aura/Dissolve treatments in the brand gradient families). Use it for *decorative feature illustration* only — bento highlights, marketing tiles, empty-state art. Never for buttons, nav, status, or anything the user operates, and never mixed with Lucide in the same row.

## Style
- Stroke **1.5px**, outline only, **rounded terminals** (Lucide's default round line-cap and line-join).
- `currentColor` by default — the icon inherits its text colour.
- **Never mix filled and line icons in one context.** Line is the system; if a filled state is ever needed (e.g. a toggled star), the whole set in that view switches together — never half-and-half.
- No duotone, no other icon set, no 3D, no skeuomorphism.

## Size by context
| Context | Size |
|---|---|
| Inline with 14/16/17px text | 14 / 16 / 18 |
| Button icon | 16–18 |
| Nav icon | 17 |
| `/command` chip icon | 14 |
| Feature icon (in chip) | 20 |
| Tool-card accent icon | 18–20 |
| Hero / section icon | 22–24 |
| Empty state | 28 |

## Colour rules
- Default `currentColor` (icon follows text colour).
- **Feature chip** = 40×40, `rounded-md` (8px), family-100 background + family-600 icon — e.g. `bg-brand-100 text-brand-600`, `bg-apricot-100 text-apricot-600`, `bg-lavender-100 text-lavender-600`, `bg-gold-100 text-gold-600`.
- On the gradient or on carbon/dark surfaces, icons go white at reduced opacity (~80%).

## Feature-icon pattern
A 40×40 `rounded-md` chip in a `-100` tint holding a 20px Lucide icon in the matching `-600`. This is the standard "feature" affordance across feature cards, bento tiles and tool cards. It's the small, consistent dab of brand colour that keeps the system warm without flooding it.

## Mono context note (v2)
Because the body type is monospace, line icons at 1.5px stroke pair especially well — the icon stroke and the type stem read at a similar weight, so an inline icon sits cleanly in a mono label or `/command` chip. Keep inline icons optically aligned to the cap height of the mono text.

## Emoji policy
- **Product UI, emails and documents: no emoji.** Anything the user operates uses Lucide.
- **Showcase and marketing surfaces:** emoji may appear as *decorative, `aria-hidden` accents* — the optional leading emoji on `Badge`, overview snapshot cards, placeholder memoji tiles. An adjacent text label always carries the meaning; emoji never replace a functional icon.

## What we don't use
- No second *functional* icon library beside Lucide (the squircle set is illustrative only).
- No filled / 3D / skeuomorphic icons.
- No mixing filled and line within a single screen or component group.

## Custom-icon fallback order
1. Lucide icon that fits.
2. Compose two Lucide icons.
3. Commission a custom icon drawn to Lucide's grid (24px, stroke 1.5, outline, rounded terminals).
