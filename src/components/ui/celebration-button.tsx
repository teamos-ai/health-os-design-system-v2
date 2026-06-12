/**
 * CelebrationButton — Health OS v2.
 *
 * An accent button that plays a small, tasteful emoji burst on click. It reuses the
 * mode-aware accent skin (apricot / rose / lavender) so it auto-themes with no extra
 * colour. Honours `prefers-reduced-motion`: reduced users get a single static pop with
 * zero travel. Per-click keyed bursts (a seq ref) support rapid re-clicks; each burst
 * self-cleans after the animation. The burst layer is aria-hidden and never intercepts
 * clicks. A CSS @media gate (.btn-celebrate-particle) is a belt-and-braces fallback so
 * particles never animate even if the JS guard is ever bypassed.
 */
import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button, type ButtonProps } from '@/components/ui/button';

interface Particle {
  id: number;
  x: number; // px from centre
  y: number;
  rotate: number;
  scale: number;
}

interface Burst {
  key: number;
  particles: Particle[];
}

export interface CelebrationButtonProps extends Omit<ButtonProps, 'variant'> {
  /** The celebration emoji. Default 🎉 */
  emoji?: string;
  /** Number of particles in a full-motion burst. Default 14. */
  particleCount?: number;
}

export const CelebrationButton = React.forwardRef<HTMLButtonElement, CelebrationButtonProps>(
  ({ emoji = '🎉', particleCount = 14, onClick, children, className, ...props }, ref) => {
    const reduced = useReducedMotion();
    const [bursts, setBursts] = React.useState<Burst[]>([]);
    const seq = React.useRef(0);
    const timers = React.useRef<number[]>([]);

    // Clear any in-flight burst-cleanup timers if the button unmounts mid-animation.
    React.useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

    const fire = (e: React.MouseEvent<HTMLButtonElement>) => {
      const key = seq.current++;
      const count = reduced ? 1 : particleCount;
      const particles: Particle[] = Array.from({ length: count }, (_, i) => {
        const angle = reduced
          ? -Math.PI / 2
          : (Math.PI * 2 * i) / count + (Math.random() - 0.5);
        const dist = reduced ? 0 : 34 + Math.random() * 30;
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - (reduced ? 0 : 8),
          rotate: reduced ? 0 : (Math.random() - 0.5) * 90,
          scale: 0.85 + Math.random() * 0.5,
        };
      });
      setBursts((b) => [...b, { key, particles }]);
      const id = window.setTimeout(() => {
        setBursts((b) => b.filter((x) => x.key !== key));
        timers.current = timers.current.filter((t) => t !== id);
      }, 900);
      timers.current.push(id);
      onClick?.(e);
    };

    return (
      <span className="relative inline-flex">
        <Button ref={ref} variant="accent" onClick={fire} className={className} {...props}>
          {children}
        </Button>

        {/* burst layer — centred over the button, never intercepts clicks */}
        <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-0 w-0">
          {bursts.map((burst) =>
            burst.particles.map((p) => (
              <motion.span
                key={`${burst.key}-${p.id}`}
                className="btn-celebrate-particle absolute text-body-md will-change-transform"
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                animate={
                  reduced
                    ? { opacity: [0, 1, 0], scale: [0.6, 1.15, 1] }
                    : { opacity: [0, 1, 1, 0], x: p.x, y: p.y, rotate: p.rotate, scale: p.scale }
                }
                transition={{ duration: reduced ? 0.5 : 0.85, ease: [0.22, 1, 0.36, 1] }}
                style={{ translateX: '-50%', translateY: '-50%' }}
              >
                {emoji}
              </motion.span>
            ))
          )}
        </span>
      </span>
    );
  }
);
CelebrationButton.displayName = 'CelebrationButton';
