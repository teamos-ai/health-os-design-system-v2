# Logo usage

The Health OS mark carries the brand's signature: the **apricot → rose → lavender gradient** on warm ivory or carbon. It's the one place the full gradient always appears. Treat it with restraint and consistency — the logo is a fixed asset, not a surface to restyle.

## The lockup
- **Mark** — the Health OS glyph, filled with `bg-brand-gradient` (`linear-gradient(135deg, #F5A060 0%, #E85BA8 50%, #A666D9 100%)`). Its corner radius is fixed; don't re-round it.
- **Wordmark** — "Health OS" set in **Spline Sans** (700), sentence case. The "OS" may sit slightly tighter to read as a unit.
- **Lockup** — mark + wordmark, horizontally locked with a fixed gap. Use the lockup by default; use the mark alone only where space is tight (favicon, app icon, avatar).

## Clear space
Keep clear space around the lockup equal to the **height of the mark** (the cap height of the wordmark works as a practical proxy). Nothing — text, image edge, another logo, a button — enters that zone. On a busy background, give it more, not less.

## Minimum size
- **Lockup:** 120px wide on screen (24px mark height). Below that, switch to the mark alone.
- **Mark alone:** 24px minimum (16px favicon is the floor, drawn from a simplified version if the full mark loses fidelity).
- Never render the gradient mark so small the three hues muddy into one — at tiny sizes prefer a single-hue (`brand-600`) or solid-carbon version.

## Colour versions
| Background | Logo treatment |
|---|---|
| Warm ivory `paper` (default) | Gradient mark + `ink-900` wordmark |
| White `surface` | Gradient mark + `ink-900` wordmark |
| Carbon `#1F1F1F` (footer / dark) | Gradient mark + **white** wordmark (the inverse lockup) |
| Photography / busy | Solid version (carbon or white) inside clear space, or place on a paper chip |
| Single-colour print / fax | Solid `carbon` (or `brand-600`) — one ink, no gradient |

The gradient mark holds on both paper and carbon. On carbon, only the **wordmark** flips to white — the gradient stays as-is.

## Do
- Use the supplied lockup and proportions.
- Keep the full clear space.
- Use the gradient mark on paper, surface and carbon.
- Drop to a single-hue or solid version when the gradient would muddy (tiny sizes, one-colour print).
- Pair with Spline Sans only in the wordmark.

## Don't
- ❌ Recolour, reverse or re-angle the gradient (apricot is always the warm start, lavender the cool end).
- ❌ Stretch, condense, skew or rotate the mark or lockup.
- ❌ Add a drop shadow, glow, outline, bevel or any 3D / glass effect.
- ❌ Re-round the mark's corners or rebuild it on a different grid.
- ❌ Set the wordmark in any face other than Spline Sans, or in all caps.
- ❌ Place the lockup on a low-contrast or clashing colour, or inside its clear-space zone.
- ❌ Put white wordmark on a bright accent (`brand-400`, `apricot-400`, `lavender-400`) — contrast fails; use carbon, paper or the inverse-on-carbon lockup.
- ❌ Crop the mark or use it as a repeating pattern / texture.

## Favicon & app icon
- **Favicon:** the mark on `paper` (or transparent), 16/32/48px. Simplify if the full gradient mark loses fidelity at 16px.
- **App / OG mark:** the mark on a `paper` or `bg-brand-gradient-soft` square, `rounded-md` corners, generous padding.
- The site `theme-color` is `#F9F6F2` (warm ivory) to match the page ground.
