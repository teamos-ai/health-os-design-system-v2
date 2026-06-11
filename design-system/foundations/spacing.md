# Spacing

An **8px base** scale. Everything snaps to it. The 4px step (`space-1`) exists for fine optical adjustments inside dense, mono-typeset UI, but the rhythm of the system is built on multiples of 8.

## Scale

| Token | px | | Token | px |
|---|---|---|---|---|
| 0 | 0 | | 8 | 32 |
| 1 | 4 | | 10 | 40 |
| 2 | 8 | | 12 | 48 |
| 3 | 12 | | 16 | 64 |
| 4 | 16 | | 20 | 80 |
| 5 | 20 | | 24 | 96 |
| 6 | 24 | | | |

These map to Tailwind's default spacing utilities (`p-2` = 8px, `gap-4` = 16px, `py-24` = 96px, etc.).

## Section rhythm
`overline → (8) → h2 → (16) → body → (32–48) → content`. Between major sections on a page: **96px** desktop (`py-24`), **64px** mobile (`py-16`). The command-palette hero gets extra top room so the glow can breathe.

## Grid & container
- Container max **1200px** (`max-w-container`).
- Gutter **24px** desktop / **16px** mobile.
- Reading measure **680px** (`max-w-reading`) — but with mono body, keep actual lines to ≤ ~70 characters.
- Hero sub-copy measure **600px** (`max-w-hero-subcopy`).
- Bento grid: 12 cols (lg) / 2 cols (sm), gap 16–24px.
- Tool-card carousel: fixed-width cards (~280–320px), gap 16px, gently marqueeing.

## Internal padding
| Element | Padding |
|---|---|
| Button sm / md / lg | 8×16 / 12×24 / 14×32 |
| Input / command bar | 12×16 |
| Card | 24 (md), 32 (lg) |
| Bento card | 24–32 |
| Tool card | 20–24 |
| Badge / chip | 4×12 |
| `/command` chip | 4×10 |
| Footer panel (carbon) | 48–64 |
| Nav bar | 12–24 |
| Ticker | 8×16 |

## Gap conventions
- Button group: 12 (`gap-3`).
- Card grid: 16–24 (`gap-4`–`gap-6`).
- Feature / bento grid: 16–24.
- Form fields: 16 (`gap-4`).
- Inline icon + text: 8 (`gap-2`).
- Command-chip row: 8 (`gap-2`).

## 5 core rules
1. Snap to the 8px scale — no `13px`, no `7px`. Use `space-1` (4px) only for optical nudges.
2. Vertical rhythm beats horizontal fuss — get the stacking gaps right first.
3. More air around headings than inside them.
4. Consistent gutters across a composition; don't mix 16 and 20 in one grid.
5. Generous outer margins on the hero — the glow and the command bar need negative space to feel calm, not cramped.
