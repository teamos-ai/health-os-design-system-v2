# Radius

Soft, friendly corners — never sharp, never fully rounded except where a pill is intended. The system is flat and warm; the radius keeps it approachable.

| Token | px | Tailwind | Use |
|---|---|---|---|
| none | 0 | `rounded-none` | logo mark grid, full-bleed images |
| xs | 4 | `rounded-xs` | tags, tiny chips, `/command` chips |
| sm | 6 | `rounded-sm` | compact inputs, inline code |
| **md** | **8** | **`rounded-md`** | **inputs, product-UI buttons, command bar, feature-icon chips, small cards** |
| **lg** | **12** | **`rounded-lg`** | **cards, surfaces, tool cards, feature tiles** |
| xl | 20 | `rounded-xl` | bento cards, hero panels |
| 2xl | 28 | `rounded-2xl` | large hero / showcase panels, footer panel |
| 3xl | 36 | `rounded-3xl` | oversized feature / dark-carbon footer |
| full | 9999 | `rounded-full` | pills, avatars, marketing CTAs, dark pill CTA |

## The locked sizes
- **8px (`rounded-md`)** is the default UI radius — buttons, inputs, the command bar, chips, feature-icon chips.
- **12px (`rounded-lg`)** is the card radius — tool cards, feature cards, surfaces.
- **full (`rounded-full`)** is for marketing CTAs (pills) and the dark-carbon pill CTA.

## The two rules
1. **Marketing CTA = pill** (`rounded-full`). The friendly, human shape — and the dark-carbon pill CTA borrowed from efficient.app is always `rounded-full`.
2. **Product-UI button = md** (`rounded-md`). Tighter, more utilitarian — fits the mono "OS" texture.

## Consistency
Within one composition, pick a radius family and hold it. A card at `lg` (12px) contains buttons and inputs at `md` (8px) — one step tighter inside, never looser. A bento card at `xl` (20px) contains tiles at `lg`.

## The carbon footer / panels
The rounded dark-carbon footer panel (Cherry Note influence) uses `rounded-2xl` or `rounded-3xl` — the larger radius softens the heavy carbon block so it reads as a calm panel, not a hard slab.

## Exceptions
- Avatars → `rounded-full`.
- The logo mark uses its own fixed radius — don't restyle it (see `logo/usage.md`).
- Photography on paper → `rounded-lg`.
- Bento cards → `rounded-xl` (the signature soft-square feel).
- Glows and washes have no radius — they're diffuse, not boxed.
