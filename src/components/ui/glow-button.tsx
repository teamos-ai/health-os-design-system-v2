/**
 * GlowButton — Health OS v2 (signature / use sparingly).
 *
 * A calm carbon "night-sky" CTA that blooms a soft celestial glow on hover/focus and
 * sends up a few twinkling sparkles when clicked — the magical moment for "book a call".
 *
 * Brand stance: the system bans coloured *shadows* (non-negotiable #4), but soft *glows*
 * are a sanctioned signature move (#2 — the hero uses `bg-glow-*`). This reuses that exact
 * glow-token language: a soft, blurred radial halo + a faint rotating conic shimmer, both
 * revealed only on interaction. It is NOT a `box-shadow`. Treat it like the gradient —
 * one expressive moment per view, not on every button.
 *
 * Motion is quiet and `prefers-reduced-motion` safe: the ambient drift/spin/twinkle are
 * pure CSS frozen by the global reduced-motion guard, and the click sparkle burst is
 * JS-gated to nothing for reduced users (the action still fires). The glow + sparkle
 * layers are aria-hidden and never intercept clicks; click-burst timers clear on unmount.
 */
import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Celestial soft halo — the glow-token radial language (apricot · rose · lavender). */
const HALO_GRADIENT =
  'radial-gradient(40% 50% at 25% 28%, rgba(245,160,96,0.55) 0%, transparent 70%),' +
  'radial-gradient(45% 55% at 76% 30%, rgba(166,102,217,0.50) 0%, transparent 72%),' +
  'radial-gradient(52% 60% at 50% 80%, rgba(232,91,168,0.50) 0%, transparent 70%)';

/** Ambient twinkle positions (around the button), with a small stagger. */
const TWINKLES = [
  { top: '-14%', left: '6%', size: 12, delay: '0s' },
  { top: '8%', left: '96%', size: 10, delay: '0.5s' },
  { top: '86%', left: '14%', size: 9, delay: '1.1s' },
  { top: '70%', left: '90%', size: 13, delay: '0.8s' },
];

interface Spark {
  id: number;
  x: number; // horizontal drift (px)
  rise: number; // distance risen (px)
  size: number; // px
  color: string;
  delay: number; // stagger (s)
}

interface Burst {
  key: number;
  sparks: Spark[];
}

const SPARK_COLORS = ['#FFFFFF', '#F7B27E', '#B985DE', '#EE7DBA'];

export interface GlowButtonProps extends Omit<ButtonProps, 'variant'> {
  /** Number of sparkles in a full-motion click burst. Default 5. */
  sparkCount?: number;
}

export const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ sparkCount = 5, onClick, children, className, ...props }, ref) => {
    const reduced = useReducedMotion();
    const [bursts, setBursts] = React.useState<Burst[]>([]);
    const seq = React.useRef(0);
    const timers = React.useRef<number[]>([]);

    React.useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

    const fire = (e: React.MouseEvent<HTMLButtonElement>) => {
      const key = seq.current++;
      const count = reduced ? 0 : sparkCount;
      const sparks: Spark[] = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 90, // ±45px
        rise: 30 + Math.random() * 26, // 30–56px
        size: 12 + Math.random() * 8, // 12–20px
        color: SPARK_COLORS[i % SPARK_COLORS.length],
        delay: i * 0.06,
      }));
      setBursts((b) => [...b, { key, sparks }]);
      const id = window.setTimeout(() => {
        setBursts((b) => b.filter((x) => x.key !== key));
        timers.current = timers.current.filter((t) => t !== id);
      }, 1100);
      timers.current.push(id);
      onClick?.(e);
    };

    return (
      <span className="group relative inline-flex isolate">
        {/* Celestial glow halo — behind the button, revealed on hover / keyboard focus.
            Soft + blurred (glow-token language), never a coloured box-shadow. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-7 -z-10 opacity-0 blur-md transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100"
        >
          <span
            className="anim-grad-drift absolute inset-0 rounded-full"
            style={{ backgroundImage: HALO_GRADIENT, backgroundSize: '180% 180%' }}
          />
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span
              className="anim-grad-spin absolute inset-[-45%] opacity-30"
              style={{ background: 'conic-gradient(from 0deg,#F5A060,#E85BA8,#A666D9,#F5A060)' }}
            />
          </span>
        </span>

        {/* Ambient twinkles — fade in on hover / focus, gentle CSS twinkle. */}
        <span aria-hidden className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
          {TWINKLES.map((t, i) => (
            <Sparkles
              key={i}
              className="hos-twinkle absolute text-white/90"
              strokeWidth={1.5}
              style={{ top: t.top, left: t.left, width: t.size, height: t.size, animationDelay: t.delay }}
            />
          ))}
        </span>

        <Button ref={ref} variant="dark" onClick={fire} className={className} {...props}>
          {children}
        </Button>

        {/* Click sparkle burst — rises from the button's top-centre, never intercepts clicks. */}
        <span aria-hidden className="pointer-events-none absolute left-1/2 top-1 z-20 h-0 w-0">
          {bursts.map((burst) =>
            burst.sparks.map((s) => (
              <motion.span
                key={`${burst.key}-${s.id}`}
                className="btn-celebrate-particle absolute will-change-transform"
                style={{ color: s.color, translateX: '-50%' }}
                initial={{ opacity: 0, x: s.x, y: 0, scale: 0.3, rotate: -30 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.3, 1, 1, 0.8],
                  rotate: [-30, 0, 10, 20],
                  x: s.x,
                  y: [0, -s.rise * 0.7, -s.rise, -s.rise],
                }}
                transition={{ duration: 1.0, ease: EASE_OUT, times: [0, 0.25, 0.7, 1], delay: s.delay }}
              >
                <Sparkles style={{ width: s.size, height: s.size }} strokeWidth={1.75} />
              </motion.span>
            ))
          )}
        </span>
      </span>
    );
  }
);
GlowButton.displayName = 'GlowButton';
