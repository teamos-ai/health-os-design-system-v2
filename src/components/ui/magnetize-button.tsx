/**
 * MagnetizeButton — Health OS v2.
 *
 * A calm, tonal CTA whose scattered particles magnetise toward the centre on hover/focus
 * and spring back out on leave — adapted from a 21st.dev pattern to the Health OS palette
 * and conventions: it wraps our own `Button` (8px squircle, token focus ring), drops the
 * original's violet/Magnet-icon/label-toggle in favour of the brand **lavender** (the calm
 * cool accent — the on-brand sibling of that violet) with a dark same-hue label for AA, and
 * keeps a static label. `prefers-reduced-motion` safe: no particles render and the magnet
 * handlers no-op, so reduced users get a plain, fully-working lavender button.
 */
import * as React from 'react';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Particle {
  id: number;
  x: number; // rest x offset from centre (px)
  y: number; // rest y offset from centre (px)
}

export interface MagnetizeButtonProps extends Omit<ButtonProps, 'variant'> {
  /** Number of magnetising particles. Default 14. */
  particleCount?: number;
}

export const MagnetizeButton = React.forwardRef<HTMLButtonElement, MagnetizeButtonProps>(
  ({ particleCount = 14, className, children, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
    const reduced = useReducedMotion();
    const [isAttracting, setIsAttracting] = React.useState(false);
    const [particles, setParticles] = React.useState<Particle[]>([]);
    const control = useAnimation();

    React.useEffect(() => {
      setParticles(
        Array.from({ length: particleCount }, (_, i) => ({
          id: i,
          x: Math.random() * 360 - 180, // ±180px
          y: Math.random() * 360 - 180,
        }))
      );
    }, [particleCount]);

    const attract = React.useCallback(() => {
      if (reduced) return;
      setIsAttracting(true);
      control.start({ x: 0, y: 0, transition: { type: 'spring', stiffness: 50, damping: 10 } });
    }, [control, reduced]);

    const release = React.useCallback(() => {
      if (reduced || particles.length === 0) return;
      setIsAttracting(false);
      control.start((i: number) => {
        const pt = particles[i];
        if (!pt) return {};
        return { x: pt.x, y: pt.y, transition: { type: 'spring', stiffness: 100, damping: 15 } };
      });
    }, [control, particles, reduced]);

    return (
      <Button
        ref={ref}
        className={cn(
          'relative min-w-40 touch-none',
          // Brand lavender tonal — fixed light/dark pairing (the app theme flips ink/paper,
          // but this tile reads the same in every mode), dark same-hue label for AA.
          'border border-lavender-300 bg-lavender-100 text-lavender-700 hover:bg-lavender-200',
          'dark:border-lavender-700 dark:bg-lavender-900 dark:text-lavender-200 dark:hover:bg-lavender-800',
          className
        )}
        onMouseEnter={(e) => { attract(); onMouseEnter?.(e); }}
        onMouseLeave={(e) => { release(); onMouseLeave?.(e); }}
        onFocus={(e) => { attract(); onFocus?.(e); }}
        onBlur={(e) => { release(); onBlur?.(e); }}
        {...props}
      >
        {!reduced &&
          particles.map((p, i) => (
            <motion.span
              key={p.id}
              custom={i}
              aria-hidden
              initial={{ x: p.x, y: p.y }}
              animate={control}
              className={cn(
                'absolute h-1.5 w-1.5 rounded-full bg-lavender-400 transition-opacity duration-300 dark:bg-lavender-300',
                isAttracting ? 'opacity-100' : 'opacity-40'
              )}
            />
          ))}
        <span className="relative flex w-full items-center justify-center">{children}</span>
      </Button>
    );
  }
);
MagnetizeButton.displayName = 'MagnetizeButton';
