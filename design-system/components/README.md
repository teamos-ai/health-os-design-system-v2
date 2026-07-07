# Components

The Health OS v2 component library (`src/components/`). Every component is built from the tokens in `../tokens/` and obeys the foundations in `../foundations/`. They render on **warm ivory** (`bg-paper`), lift to **white** surfaces (`bg-surface`) with a **hairline** (`border-line`), use **Spline Sans** headings + **Anonymous Pro** monospace body, theme correctly across light/paper/dark (see `../foundations/themes.md`), and animate quietly via Framer Motion. **Zero glass, no 3D, no coloured shadows, sentence case, Australian English.**

> Defaults to remember: cards are `rounded-lg` (12px), UI controls are `rounded-md` (8px), marketing CTAs are `rounded-full` pills, hover lifts add `shadow-sm`/`shadow-md` only. White text only on `brand-600`+ or `carbon`.

---

## Primitives (`src/components/ui/`)

### `Button`
The core action control. `forwardRef`, CVA.
- **Variants:** `primary` (`bg-brand-600` text-white, hover 700 — the locked action colour), `secondary` (surface + hairline), `ghost` (transparent, ink wash on hover), `dark` (`bg-carbon` text-white — the confident pill CTA), `gradient` (`bg-brand-gradient` with a **carbon label** — 400-level stops can't carry white at AA; signature, sparing), `warm` (apricot-led sunrise gradient, carbon label), `accent` (mode-aware pastel via `--btn-accent-*` — apricot/rose/lavender per theme, AA verified), `soft` (ink-100 tonal), `outline` (hairline "Cancel"), `link` (inline `text-accent` underline), `danger` (`bg-danger-600` white, hover 700).
- **Sizes:** `sm` (8×16) · `md` (12×24) · `lg` (14×32).
- **Props:** `as` (polymorphic, e.g. `as="a"` + `href`) · `leadingIcon` (chip before the label) · `loading` (spinner + `aria-busy` + disabled).
- **Shape:** `rounded-md` default (product UI); marketing CTAs add `className="rounded-full"`.
- **Behaviour:** press scale 0.98 (dur-xs), hover shift/lift (dur-sm), brand focus ring.

### `IconButton`
Icon-only square button. `aria-label` **required at the type level**. Variants `dark / outline / soft / ghost / accent`; sizes `sm/md/lg` (40/44/48px). Press 0.98, brand ring.

### `Input`
Labelled field: `label`, `hint`, `error`, `icon` + all input attributes. Auto-ID, `aria-invalid`, `aria-describedby` (error takes over, hint stays visible below), `aria-live` error. Focus → `brand-400` border + soft ring (dur-sm). `rounded-md`, hairline, mono body.

### `Card` (+ `CardMedia`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`)
The base surface. CVA: `tone` (`surface / ivory / soft`) · `radius` (`lg / xl / 2xl` = 12/20/28) · `padding` (`none / sm / md / lg`) · `interactive` (hover border-darken + `shadow-md`).
- **Photography mode:** `image` + `imageAlt` (+ `mediaPosition="top" | "side"`, `ratio`, `badge`, `badgeAlign`, `zoom`, `placeholderIcon`, `accent`); without `image` it renders an on-token wash placeholder. Media clips to the card's outer radius (no corner seams).
- **Typed slots:** `meta` (`MetaItem[]` — icon + mono caption row) and `actions` (`ActionItem[]` — outline + solid button pair; last action is primary). Type guards `isMetaArray` / `isActionArray` are exported and shared with `FeatureCard`.

### `Badge`
Status/category pill. `rounded-full`, 4×12, mono `text-label` uppercase. CVA: `variant` (`neutral / brand / apricot / lavender / gold / success / warn / danger / info / outline` — tint + AA text pairs) × `size` (`sm/md`). Props: `dot` (leading status dot), `emoji` (decorative, `aria-hidden` — showcase/marketing surfaces only per `iconography.md`).

### `MonoLabel`
The overline/eyebrow. Uppercase mono `text-overline`, usually `text-brand-600`, opens every section above its `h2`. Props: `tone` (7 accent tones, dark-theme AA engineered), `size` (`sm/md`), `number`, `dot`, `trailing`.

### `SegmentedControl<T>`
Generic value selector. `options / value / defaultValue / onValueChange / size / aria-label`. `role="radiogroup"` + `radio` semantics, roving tabindex, full arrow-key support. Carbon-filled active segment.

### `Disclosure`
Accordion item. `title`, `defaultOpen`, and controlled `open` / `onOpenChange`. Height+fade at ~300ms, `aria-expanded` + `aria-controls`, labelled `role="region"` panel, reduced-motion snap.

### `Pagination`
Numbered pager with ellipsis collapse. `page / total / onChange / siblingCount`. 40px cells, `aria-current="page"`, labelled prev/next `IconButton`s.

### `Stat`
Headline metric. `value` (animated `CountUp`, SR-safe) or `display` (static string), `label`, `prefix/suffix/decimals/align`. `display-lg` Spline Sans + `tabular-nums`, mono label beneath.

### Counters family (`counters.tsx`)
- **`Counter`** — count-up/down number, ≤1.4s ease-out (the sanctioned exception), sr-only static value.
- **`StatTrend`** — delta chip (`▲ 12.4%`) with sr-only "up/down", success/apricot AA tint pairs.
- **`SeatsRemaining` / `TicketsSold` / `MembersCount`** — composed availability/momentum stats.
- **`Countdown`** — `role="timer"`, `aria-live="off"`, `onComplete` callback + optional `completedLabel`.

### `CommandBar`
The hero command-palette input. CVA `size` (`hero/md`). Leading search icon, `aria-hidden` ⌘K hint, "type / for commands" helper. Mono throughout; focus ring brand-600/35. Display component by default (uncontrolled).

### `CommandChip`
The `/command` pill (`rounded-full`). `command` string prop, optional 14px Lucide icon, hover `brand-100` wash, press 0.98, disabled state.

### `CommandWidget`
The rich "ask AI" two-row search widget. Decorative by default (inert toolbar drops out of the tab order); pass `value / onChange / onSubmit / placeholder` to make it live. Submit disc = carbon circle, hover colour-shift (no grow).

### `ToolCard`
The "thing Health OS replaces" carousel card: logo tile + name (`h3`) + mono meta + accent `Badge` ("Replaces your booking app"). `bg-surface border-line rounded-lg`, hover lift. Sits in the marquee.

### `FeatureCard`
Icon-well feature tile: 40×40 `-100`/`-600` accent chip + 20px Lucide icon, `h4` title, `body-sm` copy; optional photo mode (same media props as Card), `number`/`eyebrow` slots. `forwardRef`.

### `Hero` + `HeroContainer`
The locked hero shell (see `../foundations/hero.md`). `Hero` owns `hero-py`/`hero-py-lg` padding; `HeroContainer` centres a `max-w-4xl` column. Both spread rest props. **Never hand-roll hero padding.**

### `EmbedFrame`
Self-sizing same-origin iframe host. `src`, `title` (required), `minHeight`. Skeleton shimmer while loading, calm inline error state, height resets on `src` change. Note: embed documents don't theme-flip.

### `VideoPlayer`
Hairline video frame. `src / poster / hint / captionsSrc / captionsLang / captionsLabel`. Scroll-away picture-in-picture dock with labelled close button; gradient empty state; calm error state. Real content must pass captions.

### `ImageWash`
Draft photography placeholder tile. Prefer the tokenised `wash` prop (`apricot / rose / lavender / soft-gradient / paper / carbon`); `background` string is a deprecated escape hatch. `role="img"` + label when meaningful. `dark` (white text) only on carbon/deep washes.

### `Swatch` / `GradientSwatch`
Click-to-copy colour chips for the tokens section. Full aria-labels (hex + rgb + action), `aria-live` copy feedback, `primary` ring highlight. Utilities `hexToRgb`, `copyText`, `useCopied` exported.

### `ThemeToggle`
The 3-way light/paper/dark radio. `role="radiogroup"`, arrow-key navigation, sliding thumb (dur-md), icon-only radios with labels + titles.

### `DashboardPreview` / `PracticeDashboard`
Decorative product mocks (hero + signature band). Entirely static, `aria-hidden` at the root, fixed-carbon panels by design, data hues from `@/lib/palette`. Not for real data.

### `SaveButton`
**The sanctioned confirmation:** quiet green check chips, ≤400ms, ≤24px travel, `aria-live` "Saved" announcement, reduced-motion = no particles. Accent skin (mode-aware).

---

## Interaction layer (added in the impeccable pass)

### Form controls
- **`Textarea`** — multi-line Input sibling; `label` / `hint` / `error` wired to `aria-describedby` (hint persists under error), resizable, `rounded-md`.
- **`Select`** — styled native `<select>` with a Lucide chevron; `options` + `placeholder`, same label/hint/error contract.
- **`Checkbox`** — real checkbox, custom box (hairline → `brand-600` + white check), `indeterminate` support, brand focus ring.
- **`RadioGroup`** — `fieldset`/`legend` + native radios; `options` with per-item `hint`/`disabled`, controlled or uncontrolled.
- **`Switch`** — `role="switch"` binary toggle; sliding thumb (transform only, dur-md), controlled or uncontrolled.

### Overlays
- **`Tabs`** — ARIA `tablist`/`tab`/`tabpanel` with roving tabindex + arrow keys; sliding `brand-600` underline, panels fade+rise (`animate-enter-rise`). Use when a selection swaps content (SegmentedControl is for a value with no panel).
- **`Tooltip`** — carbon label on hover **and** focus; `role="tooltip"` + `aria-describedby`, four sides, fade+rise. Non-interactive content only.
- **`Modal`** — centred dialog: focus trap, Escape close, scroll lock, focus return; `role="dialog"` + `aria-modal`, fade+scale, `rounded-xl`, zero glass. `title` / `description` / `footer` slots.
- **`ToastProvider` + `useToast`** — transient bottom-right stack; `toast({ title, description, tone, duration })`, auto-dismiss, `aria-live` polite (assertive for danger). Wrap the app in `<ToastProvider>`.

### Display
- **`Alert`** — inline status using the `-100`/`-700` tint pairs; tone icon, `role="status"`/`"alert"` per urgency, optional dismiss.
- **`Table<Row>`** — semantic table (real `<th scope>`), hairline dividers, `tabular-nums` numeric columns, `caption`, auto `overflow-x-auto`.
- **`Skeleton` / `SkeletonText` / `SkeletonCard`** — loading placeholders using the tonal `animate-shimmer` (the sanctioned skeleton loop); pair with `aria-busy` + sr-only "Loading".
- **`Breadcrumb`** — `nav aria-label="Breadcrumb"` trail; current page `aria-current` and un-linked.

## Marketing blocks (`src/components/blocks/`)

- **`PricingTable`** — up to three tiers; the recommended tier leads with a `brand-400` hairline + badge + primary CTA (colour, not height); feature lists align across columns; `tabular-nums` prices.
- **`Faq`** — questions built on the accessible `Disclosure`; 1 or 2 columns.
- **`Testimonial` / `TestimonialWall`** — `figure`/`blockquote` quiet proof; squircle avatars; the wall is CSS-columns (no dot carousel).

---

## Motion primitives (`animated.tsx`)

All read `useReducedMotion()` and degrade gracefully. See `../foundations/motion.md`.

- **`FadeIn`** — scroll reveal: fade + `translateY(8–10px)`, dur-lg, once, ease-out.
- **`Stagger` / `StaggerItem`** — cascade container + child (~60–80ms offsets).
- **`CountUp`** — number eases to target (≤1.4s, the sanctioned exception), sr-safe.
- **`RollingNumber`** — odometer digits (450ms), `aria-hidden` columns + sr-only value.
- **`Marquee`** — seamless loop (40–60s linear), pause on hover, drag optional, clones `aria-hidden`, labelled `role="group"`. Powers the tool-card carousel.
- **`HoverLift`** — `translateY(-4px)` + shadow lift (dur-md). The standard card hover.
- **`HeroGlow`** — the static soft pastel wash behind heroes (`bg-glow-hero`).
- **`Reveal`** — deeper fade+rise (400ms). **`TextReveal`** — word-stagger heading reveal (≤480ms total).
- **`HoverUnderline`** — animated link underline with a real focus outline.
- **`BreathingDot`** — sanctioned ambient loop: live-status indicators only, max one per view.
- **`GradientShimmer`** — skeleton-loading sheen ONLY (tonal, never decorative text shimmer).
- **`Appear`** — simple mount fade (240ms).
- ⚠ `Parallax`, `BorderGlow`, `PointerSpotlight` — **deprecated/off-brand**; kept for back-compat, never used in new work.

Shared motion constants live in `src/lib/motion.ts` (`EASE_OUT`, `PRESS_SCALE`); fixed brand hexes for JS/SVG consumers in `src/lib/palette.ts`.

---

## Layout (`src/components/layout/`)

### `Nav`
Sticky marketing header: logo, centre links, compact `CommandBar` (≥xl), `ThemeToggle`, dark pill CTA. `activeHref` prop → `aria-current="page"` + `text-accent` active link. Mobile (<lg): labelled hamburger → full-width dropdown panel (fade + 4px rise, Escape closes, focus returns). Solid `bg-paper` — **no glass**. Focus rings on every link.

### `Footer`
The rounded dark-carbon panel (`bg-carbon rounded-3xl max-w-container-wide`). CTA, `nav aria-label="Footer"` link columns, newsletter form (calm `aria-live` confirmation), socials. White/70 focus rings on carbon. `shadow-carbon` optional.

### `Ticker`
The thin label marquee. `items / tone (subtle | tint | carbon) / reverse / speed (clamped 32–60s) / ariaLabel`. Duplicate copy `aria-hidden`, pause on hover **and** a keyboard-reachable pause/play control (WCAG 2.2.2), frozen under reduced motion.

### `TopBanner`
Theme-aware ticker selector — picks tone/speed/content per active theme.

---

## Brand + grids

### `LogoMark` (`brand/Logo.tsx`)
The gradient mark (PNG asset; the repo's SVG is raster-embedded — see TSDoc). `size` prop; `inverse` is a documented no-op (the gradient mark is ground-agnostic per `../logo/usage.md`).

### `BentoGrid` + `BentoCard` (`bento/Bento.tsx`)
The feature grid: 1 → 2 (md) → 3 (lg) columns, cells `rounded-xl` (20px), `span` 1–3, accent icon chips, `h3` headings. One highlight cell per grid.

### `cards/` (BentoCard.tsx, BentoMore.tsx, HeroBento.tsx)
⚠ **Showcase-internal Figma-import archetypes — not part of the reusable library.** Do not build from these; they are being rebuilt on-token (see `_audit/AUDIT.md` D4). Use `Card`, `FeatureCard` and `BentoGrid` instead.

---

## Composition rule

Build pages in the v2 rhythm: **ticker → nav → command-palette hero (glow + CommandBar + CommandChips) → tool-card marquee → bento feature grid → count-up stats → comparison/directory rhythm → dark-carbon footer.** Keep the gradient and glows to signature moments, keep everything flat and warm, and let the monospace body carry the calm "operating system" texture. Per-asset-type recipes: `../ASSET-RECIPES.md`.
