# Hero — spacious by rule

Heroes are the most-seen surface in the system, so they get a deliberate, **spacious,
minimalist rhythm**. This is a rule, not a preference: every hero across Health OS
breathes the same way. Lots of negative space, one idea per line, nothing crowded.

## The rule

Build every hero with the **`<Hero>` primitive** (`src/components/ui/hero.tsx`). It owns
the spacious vertical padding so you can't accidentally ship a cramped hero. Never
hand-roll hero padding with ad-hoc `py-*` values.

```tsx
<Hero id="…">
  <HeroGlow />                                   {/* optional ambient wash */}
  <HeroContainer>
    <h1 …/>
    <p  className="mt-hero-gap-sm" …/>           {/* title → subcopy */}
    <div className="mt-hero-gap" …/>             {/* subcopy → primary action */}
    <div className="mt-hero-gap-sm" …/>          {/* action → supporting chips */}
  </HeroContainer>
</Hero>
```

## Tokens (source of truth: `tokens/tailwind.preset.js` → `spacing`)

| Token | Value | Tailwind | Use |
| --- | --- | --- | --- |
| `hero-py` | 112px | `pt-hero-py` / `pb-hero-py` | hero top/bottom padding (mobile) |
| `hero-py-lg` | 176px | `md:pt-hero-py-lg` / `md:pb-hero-py-lg` | hero top/bottom padding (≥ md) |
| `hero-gap` | 56px | `mt-hero-gap` | primary gap between hero blocks (subcopy → action) |
| `hero-gap-sm` | 32px | `mt-hero-gap-sm` | tighter gap (title → subcopy, action → chips) |

These are the only spacing values a hero should use for its section padding and its
top-level vertical rhythm. Internal component spacing still uses the base `space` scale.

## Principles

- **Air first.** When in doubt, add space — a hero should feel calm and confident.
- **One rhythm.** Two gap sizes only (`hero-gap`, `hero-gap-sm`) so the cadence reads
  intentional, never random.
- **Centred and contained.** `HeroContainer` keeps content in a `max-w-4xl` column,
  centred, with measured subcopy width.
- **Responsive, not shrunken.** Mobile is already generous (112px); desktop opens up to
  176px. Don't reduce below the tokens.
