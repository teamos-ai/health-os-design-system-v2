# Typography

**Spline Sans** for display and headings (`font-display`) · **Anonymous Pro** for subtitles, body and labels (`font-sans` and `font-mono` — they are the same family) · sentence case everywhere.

The v2 type pairing is the version's signature delta. Anonymous Pro is a **monospace**, and that is deliberate: the even, terminal-like rhythm of mono body and mono labels reinforces the "operating system / command palette" positioning. Spline Sans on the headings keeps the voice human and warm; Anonymous Pro underneath gives it the quiet, engineered texture of a tool that runs in the background.

## Scale

| Token | Size / line | Weight | Tracking | Font |
|---|---|---|---|---|
| `display-xl` | 76 / 80 | 700 | -0.022em | Spline Sans |
| `display-lg` | 58 / 62 | 700 | -0.020em | Spline Sans |
| `h1` | 42 / 48 | 700 | -0.018em | Spline Sans |
| `h2` | 34 / 42 | 700 | -0.016em | Spline Sans |
| `h3` | 26 / 34 | 600 | -0.014em | Spline Sans |
| `h4` | 21 / 28 | 600 | -0.012em | Spline Sans |
| `body-lg` | 17 / 27 | 400 | — | Anonymous Pro |
| `body-md` | 16 / 26 | 400 | — | Anonymous Pro |
| `body-sm` | 14 / 22 | 400 | — | Anonymous Pro |
| `caption` | 13 / 20 | 400 | — | Anonymous Pro |
| `overline` | 12 / 16 | 700 | 0.08em, uppercase | Anonymous Pro |
| `label` | 11 / 16 | 700 | 0.10em, uppercase | Anonymous Pro |
| `code` | 14 / 22 | 400 | — | Anonymous Pro |

Use the named sizes as Tailwind classes: `text-display-xl`, `text-h2`, `text-body-md`, `text-overline`, etc. Each carries its line-height, weight and tracking baked in.

## Weights used
**Spline Sans:** 600 semibold, 700 bold (headings carry weight through 600–700 + negative tracking, not size alone).
**Anonymous Pro:** 400 regular (body), 700 bold (overlines, labels, inline emphasis). Anonymous Pro ships only 400 and 700 — there is no 500/600, so don't reach for `font-medium` / `font-semibold` on body text; use 400 or 700.

## Line-height — the 1.6 rule
Body copy runs at a generous **~1.6 line-height** (16/26, 17/27). Monospace needs the extra leading to breathe; never tighten body below this. Headings stay tight (negative tracking, ~1.15–1.2 line-height) for contrast against the airy body.

## The mono measure rule
Because the body is monospace, **keep the reading measure short — ≤ ~70 characters** (roughly `max-w-reading` at 680px, often less). Long mono lines get tiring fast. Prefer `max-w-hero-subcopy` (600px) for hero sub-copy and intro paragraphs. When in doubt, go narrower than you would with a proportional font.

## 8 rules
1. **Sentence case** for every heading, button and label. (Overlines/labels may be uppercase — that's their tracked-mono style.)
2. Max **3 type sizes** in a single composition.
3. Reading measure **≤ ~70 characters** — mono is dense, give it room and keep lines short.
4. Headings carry weight via Spline Sans 600–700 + negative tracking, not size alone.
5. Body, captions and labels are all Anonymous Pro — one family does the whole "OS" voice.
6. Italics for genuine emphasis only — never decoration. (Anonymous Pro italics read strongly; use sparingly.)
7. **No text shadow.** Ever.
8. Heading-to-body gap = one space step (8–16px); never crowd a heading against its paragraph.

## Pairings by context
- **Marketing hero:** `display-lg`/`display-xl` (Spline Sans 700) + `body-lg` (Anonymous Pro 400), one gradient word, over `bg-glow-hero`.
- **Command bar:** mono `body-md` input + `/command` chips in `label` tracking — the monospace makes the search field read like a real terminal.
- **Section:** `overline` (`text-brand-600`) → `h2` → `body-md`.
- **Card:** `h4` + `body-sm` in `text-ink-500`.
- **Tool / feature card:** `overline` mono meta + `h4` title + `body-sm` body.
- **Stat:** `display-lg` with `tabular-nums` (count-up) + `body-sm` label.
- **Ticker / overline labels:** `label` size, uppercase, `0.1em` tracking, mono — the thin top ticker and section eyebrows.

## Font loading (web)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@400;500;600;700&family=Anonymous+Pro:wght@400;700&display=swap" rel="stylesheet">
```
Display stack falls back to `ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif`.
Body / mono stack falls back to `ui-monospace, SFMono-Regular, Menlo, monospace` — so the OS texture survives even before Anonymous Pro loads.

## When not to use the primary fonts
For long-form legal/transactional text where a system stack loads faster, the monospace fallback is acceptable. Never substitute a decorative or serif face for headings, and never swap Anonymous Pro for a proportional sans on body — the monospace *is* the brand texture in v2.
