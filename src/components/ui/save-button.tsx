/**
 * SaveButton — Health OS v2.
 *
 * The sanctioned save confirmation — quiet check chips, ≤400ms (foundations/motion.md
 * §Sanctioned exceptions). On click it sends up a few small green check chips that rise
 * ≤24px and fade. Reuses the mode-aware accent skin so it themes per mode with no extra
 * colour. Honours `prefers-reduced-motion`: reduced users get at most two ticks with no
 * travel (a gentle pop in place). Per-click keyed bursts support rapid re-clicks; each
 * burst self-cleans after the animation, and any in-flight timers are cleared on
 * unmount. The burst layer is aria-hidden and never intercepts clicks; an aria-live
 * status announces "Saved" for screen readers.
 */
import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { EASE_OUT } from '@/lib/motion';

interface Tick {
  id: number;
  x: number; // horizontal drift (px)
  rise: number; // distance risen (px)
  delay: number; // stagger (s)
}

interface Burst {
  key: number;
  ticks: Tick[];
}

export interface SaveButtonProps extends Omit<ButtonProps, 'variant'> {
  /** Number of check chips in a full-motion burst. Default 4. */
  tickCount?: number;
}

export const SaveButton = React.forwardRef<HTMLButtonElement, SaveButtonProps>(
  ({ tickCount = 4, onClick, children, className, ...props }, ref) => {
    const reduced = useReducedMotion();
    const [bursts, setBursts] = React.useState<Burst[]>([]);
    const [status, setStatus] = React.useState('');
    const seq = React.useRef(0);
    const timers = React.useRef<number[]>([]);

    React.useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

    const fire = (e: React.MouseEvent<HTMLButtonElement>) => {
      const key = seq.current++;
      const count = reduced ? Math.min(2, tickCount) : tickCount;
      const ticks: Tick[] = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: reduced ? 0 : (Math.random() - 0.5) * 44, // ±22px
        rise: reduced ? 0 : 16 + Math.random() * 8, // 16–24px
        delay: reduced ? 0 : i * 0.04,
      }));
      setBursts((b) => [...b, { key, ticks }]);
      const id = window.setTimeout(() => {
        setBursts((b) => b.filter((x) => x.key !== key));
        timers.current = timers.current.filter((t) => t !== id);
      }, 600);
      timers.current.push(id);
      // announce, then clear so rapid re-saves re-announce
      setStatus('Saved');
      const statusId = window.setTimeout(() => {
        setStatus('');
        timers.current = timers.current.filter((t) => t !== statusId);
      }, 1500);
      timers.current.push(statusId);
      onClick?.(e);
    };

    return (
      <span className="relative inline-flex">
        <Button ref={ref} variant="accent" onClick={fire} className={className} {...props}>
          {children}
        </Button>

        {/* screen-reader status — announces "Saved" politely after each click */}
        <span aria-live="polite" className="sr-only">
          {status}
        </span>

        {/* tick layer — pinned to the button's top-centre, never intercepts clicks */}
        <span aria-hidden className="pointer-events-none absolute left-1/2 top-1 z-10 h-0 w-0">
          {bursts.map((burst) =>
            burst.ticks.map((t) => (
              <motion.span
                key={`${burst.key}-${t.id}`}
                className="absolute flex h-6 w-6 items-center justify-center rounded-md bg-success-100 text-success-600 shadow-sm will-change-transform"
                style={{ translateX: '-50%' }}
                initial={{ opacity: 0, x: t.x, y: 0, scale: 0.4 }}
                animate={
                  reduced
                    ? { opacity: [0, 1, 1, 0], scale: [0.4, 1, 1, 0.9] }
                    : {
                        opacity: [0, 1, 1, 0],
                        scale: [0.4, 1, 1, 0.9],
                        x: t.x,
                        y: [0, -t.rise * 0.7, -t.rise, -t.rise],
                      }
                }
                transition={{ duration: 0.4, ease: EASE_OUT, times: [0, 0.25, 0.7, 1], delay: t.delay }}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              </motion.span>
            ))
          )}
        </span>
      </span>
    );
  }
);
SaveButton.displayName = 'SaveButton';
