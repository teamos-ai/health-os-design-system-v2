# Motion

Motion is a first-class part of Health OS v2 — but **disciplined and quiet**. The whole vocabulary is **fade + small translate**, plus two gentle continuous loops (the marquee carousel and the thin top ticker) that the efficient.app / Cherry Note structure calls for. Every animation honours `prefers-reduced-motion`. Built with Framer Motion.

The rule of thumb: interactions are **fast (150–250ms)**, scroll reveals are **calm (300–400ms)**, and **nothing exceeds 500ms**. No bounce, no elastic, no spring overshoot, no autoplaying video.

## Duration tokens
| Token | ms | Tailwind | Use |
|---|---|---|---|
| xs | 80 | `duration-xs` | taps, toggles |
| sm | 160 | `duration-sm` | buttons, hovers, focus |
| md | 240 | `duration-md` | cards, inputs, menus, command bar |
| lg | 360 | `duration-lg` | scroll reveals |
| xl | 480 | `duration-xl` | the largest hero reveal — the ceiling, never exceeded |

## Easing tokens
- **out** `cubic-bezier(0.22, 1, 0.36, 1)` (`ease-out`) — default for entrances and reveals.
- **standard / in-out** `cubic-bezier(0.4, 0, 0.2, 1)` (`ease-standard`, `ease-in-out`) — UI state changes.
- **linear** — the marquee and ticker loops only.

## Standard animations
| Moment | Spec |
|---|---|
| Button press | scale 0.98, dur-xs |
| Hover lift | translateY -4px + shadow none→sm, dur-md (the `HoverLift` primitive) |
| Input / command-bar focus | border → `brand-400`, soft ring, dur-sm |
| Menu / command results open | fade + translateY 4px, dur-md, ease-out |
| Modal open | fade + scale 0.98→1, dur-md |
| Scroll reveal | fade + translateY 8px, dur-lg, once, ease-out (the `FadeIn` primitive) |
| Stagger cascade | children offset ~60–80ms (the `Stagger` / `StaggerItem` primitives) |
| Count-up | number eases to value on view, ~1.4s ease-out (the `CountUp` primitive) |
| Tool-card carousel | `animate-marquee` — translateX 0 → -50%, 40s, linear, infinite |
| Top ticker | `animate-ticker` — translateX 0 → -50%, 32s, linear, infinite |

## The continuous loops (v2 craft)
- **Marquee** (`animate-marquee`, `animate-marquee-slow`, `animate-marquee-reverse`) — the horizontal tool-card / logo carousel. **Gentle and slow** (40–60s), linear, seamless (the row is duplicated and translated -50%). It glides; it never races. Pause on hover is encouraged.
- **Ticker** (`animate-ticker`) — the thin top marquee of short mono labels (Cherry Note influence). Even slower-feeling, low-key, 32s. One thin line of texture, never a focal point.

These are the *only* always-on motions. Everything else is triggered by interaction or by entering the viewport.

## We do NOT do
- No parallax. No scroll-jacking.
- No autoplaying / looping background video.
- No bounce, elastic, spring overshoot, shake, wobble.
- No confetti, no text shimmer, no typewriter effect.
- No entrance animation that blocks reading.
- No animated gradient on every surface (the gradient is a static brand device; the glows are static washes).
- Nothing over 500ms.

## Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
In React, the motion primitives read `useReducedMotion()` and skip the initial offset entirely. **The marquee and ticker stop (or render static) under reduced motion** — a continuously moving carousel is exactly what motion-sensitive users need turned off.
