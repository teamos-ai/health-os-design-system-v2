# Health OS Design System v2 — impeccable-pass audit

**Phase 0 deliverable · branch `fable5/impeccable-pass` · 7 July 2026**
Read-only audit of the full repo: 3 token files, 14 docs, 40 components, 6 marketing sections, 22 showcase sections, app shell, data layer, live showcase (dev server), and asset manifests. Baseline `npm run build` passes; zero missing assets across 165 file references; the tree starts green.

**Overall verdict.** The system is genuinely good — the token architecture (preset + CSS-var theming) is coherent, reduced-motion discipline in `src/` is best-in-class, the voice layer is almost spotless, and no asset reference is broken. The gaps cluster in four places: (1) the **docs and the shipped tokens contradict each other** on load-bearing rules (radius, loops, glows, icons, emoji); (2) a **Figma-imported cards subtree** that bypasses the token system entirely and carries most of the hard brand violations; (3) an **expressive-motion component family** (confetti/glow/magnetize) that the locked motion rules ban by name; (4) **machine-readability** — `tokens.json` is neither complete nor correct, and there is no `llms.txt` or asset-recipe layer.

---

## 1. Decisions required before Phase 1 (locked-brand rulings — not mine to make)

These are places where the shipped code and the locked documentation disagree. Fixing either direction is mechanical; choosing the direction is a brand decision.

| # | Conflict | Docs / brief say | Shipped code does | My recommendation |
|---|---|---|---|---|
| D1 | **Radius scale** | 8px UI · 12px cards · 20/28/36 panels · `full` = pill (radius.md, CLAUDE.md, README, components README, the brief's "Radius 8/12/full") | `tokens.json` + preset cap **everything at 8px** — "squircles only, no pills". Pill intent is still encoded in ~10 components via `rounded-full`, and the cards trio bypasses the cap with inline styles (real pills/20px render there) | **Restore the documented 8/12/20/28/full scale.** The 8px-everywhere cap looks like a later experiment that never got written back into any doc; every doc, the brief, and the component intent (`rounded-full` CTAs, carbon pill, footer 3xl) assume the documented scale. If you prefer the squircle-only look, say so and I'll rewrite all five docs + the pill-intent classes instead. |
| D2 | **Confetti / celebration family** | motion.md: "No confetti", "no bounce/elastic/spring", nothing >500ms | `ConfettiButton`, `CelebrationButton` (particle bursts, 1.2–1.3s), `SaveButton` burst (0.9s), `GlowButton` sparkle burst, `MagnetizeButton` (spring physics, cursor-following) — all built, polished, demoed in ButtonsSection | **Quarantine, don't delete** (additive rule): move them to a clearly-labelled "expressive — off-brand, opt-in" showcase group with a visible warning badge, exclude them from the component catalogue AIs read, and cap SaveButton at ≤400ms as the one sanctioned confirmation. Deleting exports would break rule #5 (no deletions without asking). |
| D3 | **Ambient loops** | motion.md: only marquee (40–60s) + ticker (32s) may loop | `GradientShimmer` (6s), `BorderGlow` (9s), `BreathingDot` (2.6s), `hos-grad-pan/drift/spin` (9/16/18s), aura-widget pulses, twinkle — all reduced-motion safe but outside the sanctioned vocabulary | **Amend motion.md** with a third sanctioned tier: "ambient status loops" (breathing dot for live status, shimmer for skeleton loading only), with hard rules (≤1 per view, decorative-only, RM-frozen). Cut BorderGlow + the animated gradient demos or scope them to the Motion section as explicitly "demo-only". |
| D4 | **Cards trio (Figma export)** | Zero glass, no 3D, no coloured/black shadows, carbon-neutral shadows, tokens only, theme-aware | `cards/BentoCard+BentoMore+HeroBento` (2,279 lines): 8 glassmorphism instances, 3D flip/tilt, spring-overshoot beziers, coloured glow ring, orange coloured shadow, pure-black scrims, **foreign palette** (Tailwind violet-600/emerald-600, Figma magenta/orange), theme-blind fixed-white styling, inline-style radius bypasses | **Rebuild in place** (Phase 3): retokenise `DS` onto CSS vars, replace glass with flat surface + hairline, flatten 3D/spring variants to on-brand equivalents, purge foreign colours, keep the excellent layout archetypes. It's the single biggest work item (~2.3k lines) but the archetype catalogue is worth saving. |
| D5 | **Emoji** | iconography.md: no emoji in shipped UI (showcase nav labels only) | ~106 emoji rendered: `Badge` has a designed `emoji` prop (~80 uses), OverviewSection cards (12), Notion (5), Memojis placeholders (8), Cards (1) | **Amend the rule** to "emoji allowed as decorative, `aria-hidden` accents in showcase/marketing surfaces; never as functional icons; never in product UI" — that's what the code already does, carefully. Stripping the Badge prop would delete a designed feature. |
| D6 | **Icon system** | iconography.md: "Lucide, exclusively" | IconsSection ships a custom squircle icon set (~70 glyphs, embed) and declares it "replaces the earlier Lucide scaffold"; Lucide still used everywhere else | **Document the two-tier reality**: Lucide = functional UI icons (1.5px, locked); squircle set = illustrative/feature icons. Update iconography.md accordingly. |
| D7 | **Ticker speeds** | motion.md: ticker = 32s | TopBanner runs 32/36/42s by theme; Ticker `speed` prop is unclamped | Amend spec to "32–45s" and clamp the prop 32–60. Trivial either way. |

Everything else in this audit is non-controversial and fixes toward the documented brand.

---

## 2. (a) Token gaps — values, drift, and orphans

### 2.1 tokens.json is not the source of truth it claims to be
The preset (`tailwind.preset.js`) is the real source; `tokens.json` is missing or contradicting:

| Missing from tokens.json (exists in preset/css) | Contradicts |
|---|---|
| `rose/brand-550` (#CC3385 — the "lightest AA-for-white" step, the most nuanced token in the system) | **radius**: json/preset say all ≥md = 8px; every doc says 12/20/28/36/pill (→ D1) |
| `carbon-600/700/800` | `tokens.css` default (light) theme = **white ground** `#FFFFFF` + `#EAE8E5` line; tokens.json/docs present paper `#F9F6F2` as the ground. The three-theme system (light/paper/dark) exists **only** in tokens.css comments — no doc explains it |
| `surface-2`, `ground-textured`, `accent-text`, the 4 `--btn-accent-*` vars ×3 themes | dark theme = pure `#000000` ground vs "never pure black" (documented nowhere as an exception) |
| `brand-gradient-warm`, `brand-gradient-soft-dark`, composed `glow-hero` | TokensSection documents glow alphas as **0.55** — shipped value is **0.28** (proof that hand-retyped docs drift) |
| `shadow-xs`, `shadow-xl` | |
| `duration-xs` (80ms), `letterSpacing label/wide2`, `text-code` | |
| `animate-shimmer`, `marquee-slow/-reverse` | |
| dark/paper theme variable sets (json has zero theme awareness) | |

### 2.2 Hardcoded values that duplicate existing tokens (fix mechanically)
- **ButtonsSection.tsx** — 14 hex classnames duplicating *fixed* tokens (`#1F1F1F`→carbon, `#7E3CB0`→lavender-600, `#E85BA8`→rose-400 …) at lines 37–60, 116.
- **practice-dashboard.tsx** — 6 SVG/segment hexes (63–65, 232–235, 280) + `text-[#1F1F1F]` ×3.
- **button.tsx:39** `text-[#1F1F1F]` → `text-carbon`.
- **Brand-trio duplication ×4 files**: `#F5A060/#E85BA8/#A666D9` (+ gold-600, rose-300, lavender-600) hardcoded in animated.tsx (380, 404), celebration-button (18), confetti-button (23), glow-button (53, 104) — needs one tokenised source.
- **index.css:29–30** selection colours duplicate rose-400/700 (and are untested on dark).
- **swatch.tsx:90,142** `ring-black/[0.06]` — pure-black hairline → `ring-carbon/5`.
- **imagery.ts:18–23** six wash gradients retype token hexes.
- **TokensSection.tsx:86–88** `text-[#F5A060]` etc. → token classes; whole section should *import* the preset instead of retyping values (the glow-alpha drift already happened).
- **cards trio** — the `DS` object re-declares ~15 token values; 2 values are off-token one-offs (`#6B6560`, `#A39B93` ≈ ink-500/400); black-based shadows; white fade gradients ×11 (`#ffffff` — theme-blind).

### 2.3 Orphan values that need new tokens (mint in Phase 1)
| Suggested token | Motivation |
|---|---|
| `text-micro` (10px/14) | `text-[10px]`/`text-[9px]`/`text-[11px]` used in 6+ files (badge sm, dashboards, tokens/backgrounds/imagery captions) |
| `success-200` (≈ #8FD6B6) | BentoMore invented it because the success ramp lacks a mid tint |
| `glow-*-strong` (0.50–0.55 alpha) | glow-button rgba literals; TokensSection thought 0.55 *was* the token |
| press/zoom scale conventions (`active:scale-[0.98]`, `1.04` image zoom) | three different press scales in use (0.96/0.98) and two hover zooms (1.04/1.05/1.09) — standardise as documented utility classes |
| icon size 18 (`h-4.5` equivalent) | 18px raw numbers in input, command-bar, shell |
| `container-wide` (1320px) or drop to `container` | Footer `max-w-[1320px]` |
| `w-pip` (min(360px,82vw)) | video-player PiP dock |
| durations: nothing new needed — but Framer JS literals (0.5–1.6s) must map to tokens; count-up (1.4s) needs a written exception or a cap |

### 2.4 Real bugs found
- **`text-ink-800` does not exist** — silently no-ops at DirectoryCompare.tsx:53 and dashboard-preview.tsx:100.
- **Button `gradient` variant**: white text on 400-level gradient stops — fails AA (~2.1:1 at the apricot end) and is the banned combo by name (button.tsx:36).
- **Button `onDark` logic** (button.tsx:77) includes `primary` (now a light fill) — leading-icon chip renders invisible white-on-pink.
- **dashboard-preview "On track" chip**: success-600 on success-100 ≈ 3.0:1 (system convention is 700-on-tint).
- **HeroBento stale copy**: "Health OS · 2025", "Q1 2025" (it's 2026).
- **Framer console warning** (non-static position container) from `Parallax` (animated.tsx:359) — and parallax itself is banned by motion.md.

---

## 3. (b) Craft gaps

### Systemic
- **Section rhythm drift**: 5 of 6 marketing sections use `py-20` mobile; spacing.md mandates `py-16 md:py-24`. One-line fix ×5.
- **CommandHero hand-rolls hero padding** (`pt-20 md:pt-28` + ad-hoc `mt-6/9/5/7` gaps) instead of the locked `<Hero>` primitive + hero-gap tokens — the exact thing hero.md forbids (CommandHero.tsx:15–48).
- **No mobile navigation anywhere**: showcase sidebar is `hidden lg:flex` with no mobile jump list (20 sections); marketing Nav hides its links below `lg` with no hamburger.
- **Focus-visible rings missing**: Nav links, Footer links + CTA + newsletter input, ButtonsSection BTN_BASE demos, HeroUnderline primitive. (Buttons/inputs/chips elsewhere are exemplary.)
- **Press/zoom scale inconsistency**: 0.98 (Button) vs 0.96 (IconButton, Pagination); hover zooms 1.04/1.05/1.09.
- **Theme-blindness in the cards trio** — fixed-white cards/fades break `.dark` and `.theme-paper`.
- **Voice**: showcase hero is pure hype ("The only design system that matters." / "No boring designs.") vs the locked calm Sage voice — the flagship page opens off-brand. Conflicting stat claims (ticker "10–15 hrs" vs stat "12 hrs"). US spellings ("Centered", "Dr.", "Group program"), Title Case ('The Health OS Design System'), unsubstantiated health claims in cards filler copy ("proven to reduce HRV within 4 minutes").

### Component-level (selection; full per-file lists live in the four sub-reports)
- Button: no loading state; `danger` hover via `brightness` filter; anchor polymorphism untyped (`as="a"` workarounds in two files).
- EmbedFrame: no loading skeleton or error state; embeds don't theme-flip (documented nowhere).
- Disclosure: no controlled mode; missing `aria-controls`.
- SegmentedControl: `tablist` role without panels (should be radiogroup).
- Countdown: no completed state; `hideLabels` drops meaning.
- Calculators demo: "Calculate" does nothing (≈5 lines to wire); keypad inert but focusable.
- SocialMedia: two dead `href="#"` CTAs via a type-workaround spread.
- Footer: newsletter form is a stub; all links `#`.
- Nav: no `aria-current` active state (explicitly required by components README); dead ternary (border identical in both branches).
- Logo is a raster PNG (no SVG/2x) — softens at scale, can't recolour.
- VideoSection: 16.4MB mp4, no poster, no captions.
- DirectoryCompare: div-table, no mobile collapse, `grid-cols-[1.5fr_1fr_1fr]` at 375px.
- HeroBento: bottom 5-col grid has zero responsive rules; injected global `<style>` with `!important`.
- 5 assets named `ChatGPT_Image_Jun_14__2026__*.png` (also: AI imagery vs "real photography" rule).
- Shell: `w-[76px]`, `h-[18px]` arbitraries; VideoSection missing from `SHOWCASE_NAV` (scroll-spy skips it).

---

## 4. (c) Accessibility gaps

**Structure**
- No skip link (20+ tab stops before content); showcase `<nav>` unlabelled; `aria-current="true"` should be `"location"`.
- **4 × h1** on one document (HeroSection + CommandHero ×2 via Signature/LivePage + Blog demo). CommandHero needs a heading-level prop; Blog demo h1 → h3.
- Nested landmarks: NotionSection renders a real `<main>` + fake `<nav>` inside the page; LivePage embeds Nav/Footer landmarks inside a section.
- OutcomeBand has no heading at all.

**Interaction**
- Hover-only reveals with no keyboard/touch path: FlipCard, SlideRevealCard, TiltHover (also keeps animating under reduced motion — the one real RM failure).
- LivePage scroll region: no `tabindex`/label, scrollbar hidden.
- Ticker/marquee: pause is hover-only — WCAG 2.2.2 wants an explicit pause control for >5s moving content.
- Focus-visible gaps listed in §3.
- Inert-but-focusable controls (Calculators keypad, Social dead links, Notion "Get for free", CommandWidget's five inert toolbar buttons).

**Content/SR**
- Animated numbers (CountUp/RollingNumber/Counter) announce intermediate values; RollingNumber renders 10 stacked digits per column to SRs. Needs `aria-hidden` digits + static accessible value.
- StatTrend direction conveyed only by colour+arrow.
- Blog comparison table: divs, Check/X icons with no text alternative.
- SaveButton success is visual-only (no `aria-live`).
- Video: no `<track>` captions.
- Contrast: Notion callout lavender-600-on-50 (~4.4:1 borderline; convention is 700-on-tint); dashboard success chip (§2.4); GradientShimmer sweeps a near-white stop through text on paper.
- squircle-icons embed: no reduced-motion guard inside the iframe (global guard doesn't reach embeds).

---

## 5. (d) Incomplete / stub inventory

| Item | State |
|---|---|
| Blog, Calculators, Memojis, Notion, Social | Honestly badged "rough scaffold" in-UI — need finishing in Phase 3 |
| Video / Icons / Widgets / Banners sections | Short wrappers but real content behind them — *not* stubs |
| Footer newsletter + all `#` links; NAV_LINKS → `#pricing/#resources/#about` anchors that don't exist | Stubs |
| CommandWidget | Display-only: five inert buttons, no handlers/props — wire or mark decorative |
| BentoMore | Dead `color` props (FullTextOnImage, PanoramaCinema); FlipCard badge hardwired pink; `▶ PLAY` fake affordance; variant letters skip N (deleted variant) |
| HeroBento | Prop-less hardcoded demo — can't take real data; belongs in showcase |
| Logo `inverse` prop | Accepted, documented no-op |
| animated.tsx header | Lists 7 exports; file has 17 |
| TokensSection | Missing the entire motion/duration/easing token block; missing brand-550; missing spacing/hero tokens; wrong glow alphas |
| components/README.md | Documents ~20 of 40 components; none of the counters/save/segmented/pagination/video/swatch/theme-toggle/embed/image-wash/dashboard family |

---

## 6. (e) Machine-readability — could an external AI build on-brand from the repo alone?

**Today: no.** It would fail four ways:

1. **It would trust tokens.json** (the file that declares itself the schema source) and build 8px-everything with no pills, no themes, no 550 step — while the docs it reads alongside tell it to use pills and 12px cards. Whichever it believes, it contradicts the other half of the repo.
2. **It would read the showcase as documentation** — and learn confetti buttons, glass cards, 3D tilts, spring beziers and a foreign violet/emerald palette from CardsSection, plus hype copy from the hero.
3. **It has no entry point from the repo root** — no `llms.txt`; `design-system/CLAUDE.md` is excellent but unreferenced from the root README's first screen; no per-asset-type recipes (email/slide/social specs don't exist anywhere).
4. **Component API knowledge is incomplete** — half the components are undocumented; props/variants live only in source; TokensSection omits motion tokens entirely and misstates glow values.

**Phase 1 will fix**: tokens.json rebuilt complete + correct (incl. themes) → css + preset regenerated from it; `llms.txt` at root with load order; `ASSET-RECIPES.md` (landing page / email / slide / doc / social / dashboard → tokens + components + voice per type); CLAUDE.md corrections (theme system, radius ruling, loop tiers, emoji/icon rulings); components/README.md completed for all 40 (Phase 2 finishes per-component detail).

---

## 7. (f) Prioritised, phased fix plan

Effort: **S** <1h · **M** 1–3h · **L** 3–8h · **XL** >8h (focused units).

### Phase 1 — Token + machine-readability foundation *(total ≈ L–XL)*
| Item | Effort |
|---|---|
| Apply D1 radius ruling across json/css/preset (+ pill-intent classes if squircle-only wins) | M |
| Rebuild tokens.json as complete design-tokens.org source (themes, 550, gradients, glows, durations, shadows xs–xl, micro type, new tokens §2.3) | M |
| Regenerate/align tokens.css + preset 1:1 (single generation path or lint check) | M |
| Fix real bugs: ink-800 ×2, Button gradient variant, onDark logic, selection colours, success-chip contrast | S–M |
| Mechanical de-hexing (§2.2): ButtonsSection, practice-dashboard, brand-trio ×4, swatch, imagery.ts, TokensSection imports preset | M |
| `llms.txt` + `ASSET-RECIPES.md` + CLAUDE.md/doc corrections (theme system, D2–D7 rulings written into motion/iconography/radius docs) | M–L |
| Build + commit | S |

### Phase 2 — Component polish (all 40) *(total ≈ XL)*
Focus order: Button (loading, polymorphic typing, press token) → Input/Disclosure/Segmented (a11y semantics) → Nav/Footer (focus rings, aria-current, mobile menu) → animated.tsx (Reveal ≤400ms, drop blur; RollingNumber ≤480ms; SR-safe numbers; kill/gate loops per D3; fix Parallax warning or remove) → counters (aria, done-state) → expressive family per D2 → the rest. Update components/README.md per component as touched. Build + commit.

### Phase 3 — Sections + widgets *(total ≈ XL; cards trio is the bulk)*
- Cards trio rebuild per D4 (retokenise, de-glass, flatten 3D/spring, theme-aware, keyboard + RM parity, Lucide icons, alt text) — **XL, the single biggest item**.
- CommandHero → `<Hero>` primitive; rhythm `py-16 md:py-24` ×5; OutcomeBand h2; DirectoryCompare real table + mobile.
- Showcase: rewrite hero copy in Sage voice; finish the 5 scaffolds (wire calculator, real blog photo, Notion landmarks/emoji, Social specs + disable dead CTAs); TokensSection motion block + corrections; heading hierarchy (h1 dedupe, band h3s); skip link + nav label + mobile jump list; VideoSection nav entry + captions + poster + compressed mp4.

### Phase 4 — Motion + delight *(M–L)*
Cohesive entrance/hover pass with the tokenised vocabulary; marquee/ticker clamps (D7); 1–3 signature moments (e.g. command-bar focus choreography, count-up band, gradient-word reveal — all within budget); document in motion.md.

### Phase 5 — New components *(L–XL, from this audit's gaps)*
Highest-value: **Table** (DirectoryCompare/Blog need real semantics) · **Tabs** (correct pattern to replace tablist-misuse) · **Toast/inline Alert** (semantic ramp exists, no component) · **Tooltip** · **Modal/Dialog** (motion spec exists, no component) · **Skeleton loader** (shimmer token exists) · **Select/Textarea/Checkbox/Radio/Switch** (form story is Input-only) · **Breadcrumb** · pricing/FAQ/testimonial blocks for ASSET-RECIPES. Each: tokenised, AA, RM-safe, typed, showcased, documented. No new deps.

### Phase 6 — Adversarial review *(M–L)* → FINAL-REVIEW.md scorecard.
### Phase 7 — Proof *(S–M)* → build green, before/after captures, hand-off. No push.

---

## Appendix — severity index (top 20, cross-referenced)

| Sev | Finding | Where |
|---|---|---|
| 🔴 | Radius: docs vs tokens contradiction (D1) | tokens.json:80–83, preset:119–124 vs radius.md/CLAUDE.md/README |
| 🔴 | Glassmorphism ×8 | BentoCard:610,779 · BentoMore:83,277,383,413 · HeroBento:260,273 |
| 🔴 | Foreign palette (violet/emerald/magenta/orange) | BentoCard:745–748,815–818 · BentoMore:348,451,681 · HeroBento:29 |
| 🔴 | Confetti/spring family vs "no confetti/spring" (D2) | confetti-button, celebration-button, glow-button, magnetize-button, save-button |
| 🔴 | Button `gradient`: white on 400s (AA fail) | button.tsx:36 |
| 🔴 | 3D flip/tilt + overshoot beziers + coloured shadows | BentoMore:308–344,578–622,684 · HeroBento:29–31,134 |
| 🟠 | tokens.json incomplete/wrong; TokensSection glow alphas 2× off; no motion tokens documented | tokens.json · TokensSection:55–57 |
| 🟠 | `text-ink-800` no-op bug | DirectoryCompare:53 · dashboard-preview:100 |
| 🟠 | Hype hero copy vs Sage voice | HeroSection:19–27 |
| 🟠 | CommandHero hand-rolled hero | CommandHero:15–48 |
| 🟠 | 4×h1; heading order | HeroSection, CommandHero, BlogSection:27 |
| 🟠 | Skip link / nav label / mobile nav absent | Shell.tsx, Nav.tsx |
| 🟠 | Focus-visible gaps | Nav:46, Footer:38–62,77, ButtonsSection:34, animated:480 |
| 🟠 | Hover-only + RM-failing interactions | BentoMore FlipCard/SlideReveal/TiltHover |
| 🟠 | Ambient loops beyond spec (D3) | animated.tsx:368–431 · index.css:157–176 · aura embed |
| 🟠 | Theme-blind cards trio | cards/* (fixed white + #fff fades) |
| 🟡 | py-20 rhythm ×5; onDark bug; SR number output; ticker pause control; div-tables | §3–4 |
| 🟡 | Emoji ~106 vs rule (D5); squircle icons vs Lucide rule (D6) | badges/overview/notion/memojis · IconsSection |
| 🟡 | Stubs: newsletter, dead links, inert calculator, CommandWidget | §5 |
| 🟡 | 16MB mp4, PNG logo, ChatGPT-named assets | public/media, brand/Logo |

*Full line-level detail for every file lives in the four sub-audit reports generated during Phase 0; this document is the consolidated, prioritised source of truth for Phases 1–6.*
