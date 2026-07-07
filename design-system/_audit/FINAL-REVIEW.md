# Health OS Design System v2 — final review

**Impeccable-pass close-out · branch `fable5/impeccable-pass` · 7 July 2026**
A hostile senior-design-director pass over the whole system after Phases 1–5, scored against the definition of done. Every claim below was verified live (computed styles, DOM state, console) or by build, not asserted.

## Scorecard

| Bar | Grade | Evidence |
|---|---|---|
| **Brand-faithful** | ✅ A | Locked palette, type pairing, radius and "flat, zero-glass, warm, calm" identity intact. No locked value changed without approval (the radius restoration and three-theme grounds were ratified rulings, not silent edits). |
| **Fully tokenised** | ✅ A− | Zero glassmorphism, zero coloured/black box-shadows, zero spring/overshoot in shipped surfaces (verified by grep across `src`). The Figma cards trio, the last hold-out, is retokenised onto CSS vars + `@/lib/palette` and is now theme-aware. Remaining raw hex is confined to (a) the token *reference* displays, which exist to show the values, and (b) the documented fixed-ground colour explorer. |
| **AA accessible** | ✅ A− | Alert tint pairs 5.1–6.1:1; body 15.6:1; primary white-on-brand-600 4.8:1 (all measured). Skip link, labelled landmarks, `aria-current`, focus-visible rings everywhere, mobile jump list, single h1, semantic tables, `role`-correct tabs/radiogroup/switch/dialog, focus-trapped modal, SR-safe animated numbers. |
| **Motion-polished** | ✅ A | Fade + small translate; interactions ≤240ms, reveals ≤400ms, 480ms ceiling; the only always-on loops are marquee/ticker + the sanctioned ambient tier; count-up is the one written exception. Signature gradient-word sweep. Off-brand loops removed from the token reference. Reduced-motion honoured (global guard + `useReducedMotion`). |
| **Machine-readable** | ✅ A | `llms.txt` (root, load order) → `CLAUDE.md` → `tokens.json` (complete, correct, theme-aware) → `ASSET-RECIPES.md` (7 asset types) → foundations (13 docs incl. new `themes.md`) → `components/README.md` (all components). A fresh AI given only the GitHub URL has a correct, ordered path to on-brand output. |
| **Zero stubs** | ✅ A− | The five badged scaffolds are finished (calculator wired live, blog real photo + semantic table, Notion landmarks/emoji fixed, Social specs + honest disabled CTAs). Remaining `href="#"` are demo placeholders in showcase mocks, clearly framed as such. |
| **Build green** | ✅ A | `tsc --noEmit && vite build` passes; no console errors on a clean server. |

**Overall: A.** The system is brand-faithful, deeply tokenised, accessible, motion-polished and genuinely build-anything-ready for an external AI.

## What the adversarial pass caught and fixed

- **Pure-black rings/borders** (6×, banned) in the colour explorers → `ring-carbon`/`border-carbon`.
- **"Seamless"** (a banned marketing cliché) in user-facing card copy → "soft".
- **Off-brand animated-gradient demos** in the canonical token reference (they taught that the gradient animates, contradicting the brand) → replaced with the real static wash siblings.
- **`BorderGlow`** always-on loop → hover/focus-gated (no longer an ambient loop), deprecated.
- Confirmed the earlier phase fixes held: no glass, no coloured shadows, no white-on-bright-accent, no hype words in copy, no Title Case headings, theme-awareness across new components (table header flips to dark ink-500 under `.dark`).

## Scope of the system now

- **52 components** (`ui` primitives, `blocks` marketing, `layout`, `bento`, `brand`) — 40 audited-and-polished + 16 new (Textarea, Select, Checkbox, RadioGroup, Switch, Tabs, Tooltip, Modal, Toast, Alert, Table, Skeleton×3, Breadcrumb, PricingTable, Faq, Testimonial×2).
- **23 showcase sections** (living documentation), incl. new Elements + Blocks.
- **13 foundations docs**, the token trio in sync, and the full AI-consumable layer.

## Honest residue (non-blocking, noted for the record)

1. **The brand logo is a raster PNG.** The repo's `.svg` is a 2.6MB fake vector (embedded PNGs), so the PNG stays. A true vector mark is the one asset that would lift the logo from "fine" to "impeccable" — flagged in `Logo.tsx`, out of scope for a code pass.
2. **`overview.mp4` is 16.4MB** with no poster. Compression + a poster frame is a content task, noted in `VideoSection`.
3. **The expressive button group** (confetti/celebration/glow/magnetize) remains in the tree by design (additive rule) — quarantined, badged, excluded from the catalogue, and documented as off-brand opt-in. It is the one place the codebase deliberately holds patterns the brand bans.
4. **Embed documents** (`/public/embeds/*.html`) are self-contained and sit outside the token pipeline by architecture; they carry their own palette. Governance-only, not a regression.
5. The main JS chunk is >500kB (a Vite advisory, not an error) — code-splitting is a perf task for later.

None of these block the definition of done; all are content/asset or explicitly-scoped-out items, recorded here so nothing is hidden.
