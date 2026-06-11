# Components

The Health OS v2 component library. Every component is built from the tokens in `../tokens/` and obeys the foundations in `../foundations/`. They render on **warm ivory** (`bg-paper`), lift to **white** surfaces (`bg-surface`) with a **hairline** (`border-line`), use **Spline Sans** headings + **Anonymous Pro** monospace body, and animate quietly via Framer Motion. **Zero glass, no 3D, no coloured shadows, sentence case, Australian English.**

> Defaults to remember: cards are `rounded-lg` (12px), UI controls are `rounded-md` (8px), marketing CTAs are `rounded-full` pills, hover lifts add `shadow-sm`/`shadow-md` only. White text only on `brand-600`+ or `carbon`.

---

## Primitives

### `Button`
The core action control.
- **Variants:** `primary` (`bg-brand-600` text-white), `secondary` (`bg-surface border-line text-ink-900`), `ghost` (transparent, `text-ink-700`, wash on hover), `gradient` (`bg-brand-gradient` text-white — signature, used sparingly), `dark` / dark pill (`bg-carbon text-white` — the confident CTA), `link` (inline text link in `text-brand-600`), `danger` (`bg-danger-600` text-white).
- **Sizes:** `sm` (8×16), `md` (12×24), `lg` (14×32).
- **Shape:** `rounded` — `full` (pills for marketing) or `md` (product UI). Default `md`; marketing CTAs use `full`.
- **Behaviour:** press scale 0.98 (dur-xs), hover wash / lift (dur-sm). Optional leading / trailing Lucide icon (16–18px). Never white text on bright accents — use `primary`, `dark` or `gradient` for white-on-colour.

### `Card`
The base surface. `bg-surface border border-line rounded-lg shadow-none`, lifting to `shadow-sm` + `translateY(-4px)` on hover when interactive. Slots for header, body and footer. The container most other content sits in.

### `Badge`
Small status / category pill. `rounded-full`, `4×12` padding, mono `text-label` (uppercase). Tints follow the semantic or accent families — e.g. `bg-success-100 text-success-600`, `bg-brand-100 text-brand-600`, `bg-gold-100 text-gold-600`. Hairline optional.

### `Input`
Text field. `rounded-md`, `border-line`, `12×16` padding, Anonymous Pro `body-md`. Focus → border `brand-400` + soft neutral ring (dur-sm). Optional leading Lucide icon, label (sentence case) and helper / error text (`text-danger-600`). Never coloured shadow on focus — a subtle ring only.

---

## Signature v2 components

### `CommandBar`
The hero centrepiece — a command-palette search input. A wide `rounded-md` (or `rounded-full`) field on `bg-surface` with a leading search icon, placeholder "Search your practice…", a trailing **⌘K** key hint, and the helper line **"type / for commands."** Monospace throughout so it reads like a real terminal. The single strongest v2 signal; place it centred over `bg-glow-hero`.

### `CommandChip`
The `/command` pill. A small `rounded-xs`/`rounded-full` chip in mono `text-label` showing a slash command (e.g. `/book`, `/remind`, `/follow-up`), with an optional 14px Lucide icon. Rendered in a wrapping row beneath the `CommandBar` to suggest what the OS can do. Hover → subtle `brand-100` wash.

### `ToolCard`
The thing Health OS replaces — the carousel card. A logo tile (square, `rounded-md`) + tool name (`h4`) + a line of meta (mono `body-sm`, `text-ink-500`) + an accent **badge** (e.g. "Replaces your booking app") in an accent tint. `bg-surface border-line rounded-lg`, hover lift. Designed to sit in a gently marqueeing horizontal row.

### `FeatureCard`
The bento / grid feature tile. A 40×40 feature-icon chip (`bg-{family}-100 text-{family}-600`, 20px Lucide icon, `rounded-md`) + title (`h4`) + body (`body-sm`, `text-ink-600`). `rounded-lg` (or `rounded-xl` in a bento). The standard "here's what it does" affordance.

### `Stat`
A headline metric with a **count-up**. Large number in `display-lg` Spline Sans with `tabular-nums`, easing to its value on view (~1.4s), plus a mono `body-sm` label beneath (e.g. "12 hrs saved a week"). Uses the `CountUp` primitive; pairs with the modest, concrete numbers from `vocabulary.md`.

### `Ticker`
The thin top marquee. One low-key line of short mono labels (`text-label`, uppercase) scrolling slowly via `animate-ticker` (32s, linear). Texture, never a focal point. Stops under reduced motion.

### `MonoLabel`
The overline / eyebrow. Uppercase Anonymous Pro `text-overline` (12/16, `0.08em` tracking), usually `text-brand-600`, opening a section above its `h2`. The recurring mono accent that ties the "OS" texture together.

### `Nav`
Sticky top navigation — centred logo + links with an inline search affordance (often a compact `CommandBar` or a ⌘K trigger). `bg-paper/80` with a `border-line` bottom hairline. **No backdrop blur / frosted glass** — if a translucent feel is wanted, use a solid paper at high opacity, never glassmorphism. Sentence-case links; active link in `text-brand-600`.

### `Footer`
The rounded dark-carbon panel. A `bg-carbon rounded-3xl` block with white / reduced-opacity-white text, link columns, a small gradient logo mark, and the tagline. The one confident dark anchor on the warm page. Optional `shadow-carbon` if it floats above content.

### `BentoGrid`
The feature grid. 12 columns (lg) / 2 columns (sm), 16–24px gaps, cells at `rounded-xl`, mixing `FeatureCard`s, `Stat`s and a highlight cell (which may carry `bg-brand-gradient-soft` or a `bg-glow-*` wash). One highlight per grid — restraint keeps it premium.

---

## Motion primitives (Framer Motion)

All read `useReducedMotion()` and degrade gracefully. See `../foundations/motion.md`.

- **`FadeIn`** — scroll reveal: fade + `translateY(8px)`, dur-lg (360ms), once, ease-out. Wrap any block that should arrive on scroll.
- **`Stagger` / `StaggerItem`** — cascade container + child; children offset ~60–80ms so a grid or list arrives in sequence.
- **`CountUp`** — eases a number to its target on view (~1.4s ease-out). Powers `Stat`.
- **`Marquee`** — seamless horizontal loop (`animate-marquee` / `-slow` / `-reverse`, 40–60s linear). Powers the `ToolCard` carousel and any logo band. Pause on hover; stop under reduced motion.
- **`HoverLift`** — `translateY(-4px)` + `shadow-none → shadow-sm` (dur-md) on hover. The standard interactive-card lift.
- **`HeroGlow`** — the static soft pastel radial wash behind the hero (`bg-glow-hero`). A positioned background layer, not animated — atmosphere without a hero photo.

## Composition rule
Build pages from these in the v2 rhythm: **ticker → nav → command-palette hero (glow + CommandBar + CommandChips) → tool-card marquee → bento feature grid → stats → comparison / directory rhythm → dark-carbon footer.** Keep the gradient and glows to signature moments, keep everything flat and warm, and let the monospace body carry the calm "operating system" texture.
