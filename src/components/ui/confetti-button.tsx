/**
 * ⚠ EXPRESSIVE — OFF-BRAND, OPT-IN ONLY.
 * Quarantined under foundations/motion.md §Sanctioned exceptions: never used on standard
 * Health OS marketing or product surfaces; excluded from the AI component catalogue.
 * Reaching for this requires a deliberate, documented decision.
 */
/**
 * ConfettiButton — Health OS v2.
 *
 * A celebratory accent button for the happy moment — signing up, joining, booking in.
 * On click it throws a small, festive burst of mixed-shape confetti (rounded squares +
 * dots + thin ribbons) in the brand palette: they spray up and out from the button's
 * top-centre, then tumble back down and fade. Sibling of CelebrationButton (thin
 * streamers) and SaveButton (green ticks) — same mode-aware accent skin, so it themes
 * itself per mode (apricot / rose / lavender) with no extra colour.
 *
 * Honours `prefers-reduced-motion`: reduced users get NO confetti (the click still
 * fires). Per-click keyed bursts (a seq ref) support rapid re-clicks; each burst
 * self-cleans after the animation, and any in-flight timers clear on unmount. The burst
 * layer is aria-hidden and never intercepts clicks. The .btn-celebrate-particle class
 * is a CSS belt-and-braces stop so particles never animate even if the JS guard is ever
 * bypassed.
 */
import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button, type ButtonProps } from '@/components/ui/button';
import { PARTY_RAMP } from '@/lib/palette';

/** Confetti colours — the brand trio + gold + two deeper tones for depth. */
const CONFETTI_COLORS = PARTY_RAMP;

type Shape = 'square' | 'dot' | 'ribbon';
const SHAPES: Shape[] = ['square', 'dot', 'ribbon'];

interface Piece {
  id: number;
  shape: Shape;
  size: number; // px — the long edge
  color: string;
  x: number; // horizontal drift (px)
  up: number; // peak rise (px)
  fall: number; // distance it drops past the start (px)
  rotate: number; // total spin (deg)
  delay: number; // small stagger (s)
}

interface Burst {
  key: number;
  pieces: Piece[];
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function dims(shape: Shape, size: number): { w: number; h: number; radius: string } {
  switch (shape) {
    case 'dot':
      return { w: size, h: size, radius: '9999px' };
    case 'ribbon':
      return { w: Math.max(3, size * 0.4), h: size * 1.4, radius: '1px' };
    default: // square — the squircle, on-brand
      return { w: size, h: size, radius: '2px' };
  }
}

export interface ConfettiButtonProps extends Omit<ButtonProps, 'variant'> {
  /** Number of confetti pieces in a full-motion burst. Default 22. */
  particleCount?: number;
}

export const ConfettiButton = React.forwardRef<HTMLButtonElement, ConfettiButtonProps>(
  ({ particleCount = 22, onClick, children, className, ...props }, ref) => {
    const reduced = useReducedMotion();
    const [bursts, setBursts] = React.useState<Burst[]>([]);
    const seq = React.useRef(0);
    const timers = React.useRef<number[]>([]);

    // Clear any in-flight burst-cleanup timers if the button unmounts mid-animation.
    React.useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

    const fire = (e: React.MouseEvent<HTMLButtonElement>) => {
      const key = seq.current++;
      // Reduced motion → no confetti at all (the action still fires below).
      const count = reduced ? 0 : particleCount;
      const pieces: Piece[] = Array.from({ length: count }, (_, i) => ({
        id: i,
        shape: SHAPES[i % SHAPES.length],
        size: 6 + Math.random() * 7, // 6–13px
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        x: (Math.random() - 0.5) * 300, // ±150px
        up: 60 + Math.random() * 100, // 60–160px
        fall: 70 + Math.random() * 90, // 70–160px
        rotate: (Math.random() - 0.5) * 900, // ±450°
        delay: Math.random() * 0.1,
      }));
      setBursts((b) => [...b, { key, pieces }]);
      const id = window.setTimeout(() => {
        setBursts((b) => b.filter((x) => x.key !== key));
        timers.current = timers.current.filter((t) => t !== id);
      }, 1500);
      timers.current.push(id);
      onClick?.(e);
    };

    return (
      <span className="relative inline-flex">
        <Button ref={ref} variant="accent" onClick={fire} className={className} {...props}>
          {children}
        </Button>

        {/* burst layer — pinned to the button's top-centre, never intercepts clicks */}
        <span aria-hidden className="pointer-events-none absolute left-1/2 top-1 z-10 h-0 w-0">
          {bursts.map((burst) =>
            burst.pieces.map((p) => {
              const { w, h, radius } = dims(p.shape, p.size);
              return (
                <motion.span
                  key={`${burst.key}-${p.id}`}
                  className="btn-celebrate-particle absolute will-change-transform"
                  style={{ width: w, height: h, backgroundColor: p.color, borderRadius: radius, translateX: '-50%' }}
                  initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    x: [0, p.x * 0.4, p.x * 0.8, p.x],
                    y: [0, -p.up, -p.up * 0.3, p.fall],
                    rotate: [0, p.rotate * 0.3, p.rotate * 0.7, p.rotate],
                  }}
                  transition={{ duration: 1.3, ease: EASE_OUT, times: [0, 0.25, 0.7, 1], delay: p.delay }}
                />
              );
            })
          )}
        </span>
      </span>
    );
  }
);
ConfettiButton.displayName = 'ConfettiButton';
