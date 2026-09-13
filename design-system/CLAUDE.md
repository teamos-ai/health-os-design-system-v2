# Read this first

This folder is the Health OS design system in a form an AI agent can follow without guessing. It is the design and branding reference for anything made for Health OS: pages, emails, posts, documents, decks and product screens. People use the same material through the reference site at https://ds-healthos.vercel.app.

Tumai approves every design decision and every exception.

## 1. What decides what

| Question | Source |
|---|---|
| Colours, type, spacing, radius, shadow, motion, components, imagery | This design system |
| Claims, numbers, prices, offers, guarantees, voice and banned words | The Health OS database, `teamos-ai/db-health-os` |
| A conflict between the two on a claim or an offer | The database wins. This system never overrides it |
| Anything neither covers | Ask Tumai. Do not invent a rule |

## 2. Load order

1. [CHECKLIST.md](CHECKLIST.md): the checks every asset has to pass. Read it before you start, not after.
2. [REFERENCE.md](REFERENCE.md): the token tables, then every component, widget and pattern with when to use it, when not to, its API and source. It opens with the decisions that are still open.
3. [tokens/tokens.json](tokens/tokens.json): the values, if you need them outside Tailwind. `tokens.css` and `tailwind.preset.js` are generated from it.
4. [BRAND-SUMMARY.md](BRAND-SUMMARY.md) and [VOICE.md](VOICE.md): how Health OS should feel and how copy sits in the system.
5. [ASSET-RECIPES.md](ASSET-RECIPES.md): the build recipe for the kind of asset you are making.
6. [logo/usage.md](logo/usage.md): the mark.

## 3. The rules

These come from the decisions recorded on 13 September 2026. Detail for each is in REFERENCE.md.

1. **Tokens only.** Every colour, size, radius, shadow and duration comes from a token. Tailwind generates nothing for an off-system class, and `npm run check` fails on one.
2. **Two themes: light and paper.** Light is the default. Paper is `.theme-paper` on `<html>` and changes only the grounds. There is no dark theme.
3. **Three brand colours, each at full strength with two lighter shades.** Sunlit Apricot `#F5A060`, Expressive Rose `#E85BA8` and Neutral Lavender `#A668D9` at 400, with 200 (light) and 50 (soft). There are no darker shades. **Widgets and cards use only 200 and 50**, never full strength, so they stay soft; widgets take their colours from `src/components/widgets/tones.ts`. Full strength is for checked form controls and focus rings. Text stays in the ink neutrals. Success, warning and error follow the same pattern at 600, 300 and 100.
4. **Three gradients, one moment per view.** `bg-brand-gradient` (signature, used small: the logo, a highlighted word, a thin accent), `bg-brand-gradient-soft` (soft wash) and `bg-brand-gradient-dawn` (soft dawn, for action cards). A saturated gradient is never a card, panel or banner fill. Gradient text is not used: to mark a word, put `.text-highlight` behind it.
5. **Two families, four roles.** Spline Sans for `text-heading` and `text-subheading`; Anonymous Pro for `text-body` and `text-label`. One weight per role, set by the token.
6. **8px rhythm, 4px compact steps.** Section padding `py-16 md:py-24`. Heroes use the `Hero` component and its hero spacing tokens.
7. **Radius and shadow are small sets.** `rounded-md` for controls, `rounded-lg` for containers, `rounded-full` for round things. `shadow-sm`, `shadow-md` and `shadow-lg` for hover, floating UI and dialogs. Surfaces are otherwise flat with a hairline.
8. **Buttons: primary, secondary, text.** One button colour for the whole system: primary buttons and icon buttons are apricot-200 `#F8C39C` with dark ink text, on every ground. Never rose, carbon, a gradient or white text on the fill. One primary per view. Secondary is a surface with a hairline; text is ink on an apricot underline. Two sizes: default and small. Icon-only actions use `IconButton`.
9. **Six card types.** Content, feature, service, pricing, resource and action. Each is styled for its job; do not force one into another's role.
10. **Widgets are functional and soft.** Every widget takes real data through documented inputs and draws its colour from the light and soft shades. Experimental widgets are available and labelled. Figures in the reference site are sample data and never go into marketing.
11. **Images come from the tagged library.** Match the image to its suggested use. Inside a card, the photo dissolves toward the text with the shared `image-fade-*` class. Never put text on a raw photo, never imply a person in a photo is a client.
12. **Motion is on by default and calm.** Use the motion library and the duration and easing tokens. Nothing people need can wait on an animation.
13. **Icons are being replaced.** The filled icon set is not chosen yet. Until it is, components keep their current Lucide icons; do not add a second icon library.
14. **Docs change with the design.** A change to a token, component or rule updates `tokens.json` or `reference/catalog.json` in the same change.

## 4. Changing the system

| To change | Edit | Then run |
|---|---|---|
| A token value or description | `design-system/tokens/tokens.json` | `npm run tokens` |
| A purpose, usage rule, API note, checklist item or open decision | `design-system/reference/catalog.json` | `npm run docs` |
| A component | `src/components/**` and its catalogue entry | `npm run docs` |
| Anything | | `npm run check` before committing |

`npm run build` runs the same checks, so Vercel refuses a deploy with stale tokens, stale docs or an off-system class.

## 5. Before you deliver

Run [CHECKLIST.md](CHECKLIST.md). If an item fails and cannot be fixed, write down the need, then ask Tumai for an exception.
