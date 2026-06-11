# Imagery

## The single most important rule
**Real photography of real wellness practitioners and real spaces** — warm, natural light, calm. Health OS is about a real person's real practice; the imagery must feel lived-in, not stock. In v2 the photography sits on the warm ivory ground alongside soft pastel glows and a faint grain — so it should feel of-a-piece with that calm, slightly textured surface, never glossy or clinical.

## Photography
- **What we shoot:** practitioners at work, calm studio / clinic spaces, hands and small human moments, the unglamorous back-office made serene.
- **How:** natural light, warm white balance, shallow depth, generous negative space for type.
- **Treatments:** subtle warm grade toward the ivory paper; optional soft apricot / rose wash at low opacity for brand cohesion. Round to `rounded-lg` on paper.
- **Never:** fake "diverse team high-fiving," headset call-centre stock, glowing-blue tech tropes, fake dashboards floating in 3D space.

## Texture & grain (v2 craft)
A **subtle grain** overlay gives the ivory ground a quiet analogue warmth. Keep it *barely there* — a low-opacity noise layer, never a visible pattern. Grain warms the surface; it must never compete with photography or hurt text contrast. Photography itself stays clean; the grain lives on the page surface, not on the image.

## The hero glows are not imagery
The soft pastel radial glows (`bg-glow-hero`, `bg-glow-rose`…) are background colour washes, not pictures. They're how a Health OS hero gets atmosphere without a hero photo. Use them as the default hero "imagery": a glow wash + the command bar + type, no photograph needed.

## Illustration
- **Style (if used):** simple, flat, warm, line-led — matching Lucide's 1.5px weight. Sparingly.
- **Never illustrate:** generic AI blobs, corporate-Memphis blob people, 3D isometric SaaS scenes, Memphis confetti, gradient-mesh "AI" orbs.

## OG / social image (1200×630)
Paper background · lockup top-left · one short headline (`display-lg`, sentence case) · one gradient accent bar or a soft glow wash · generous margins. No busy collage. The mono sub-label (overline) reinforces the "OS" texture.

## Patterns & backgrounds
- **Glow wash** — the default. A soft radial from apricot / rose / lavender into paper (`bg-glow-*`).
- **Grain** — faint analogue noise on the ivory surface. Low opacity, no visible pattern.
- **Grid** — faint dot grid, `ink-200` on paper, for occasional texture behind dense UI.
- **Hairline** — `line` / `line-soft` dividers.
- **Never:** animated backgrounds, particles, aurora / mesh gradients, **glassmorphism panels**, frosted blur on content.

## Fallback order when photography isn't available
1. Real shipped photo (always wins).
2. Sourced, licence-clear photo matching the warm, natural treatment.
3. Brand glow wash + a single Lucide feature icon.
4. Solid paper / surface with type only, over faint grain. (Never a generic stock cliché.)
