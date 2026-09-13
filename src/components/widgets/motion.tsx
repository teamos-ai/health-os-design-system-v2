/**
 * Widget motion helpers. Every widget animates its measurement once it scrolls into view
 * and settles on the final value. Under reduced motion everything renders finished.
 */
import * as React from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';

/** True once the element has been at least `amount` visible. Always true under reduced motion. */
export function useSeen<T extends Element>(amount = 0.35) {
  const ref = React.useRef<T>(null);
  const inView = useInView(ref, { once: true, amount });
  const reduced = useReducedMotion();
  return { ref, seen: inView || !!reduced, reduced: !!reduced };
}

/** A 0 → 1 progress value that runs once when `run` turns true. */
export function useProgress(run: boolean, { duration = 1.2, delay = 0 }: { duration?: number; delay?: number } = {}) {
  const reduced = useReducedMotion();
  const p = useMotionValue(reduced ? 1 : 0);
  React.useEffect(() => {
    if (!run) return;
    if (reduced) {
      p.set(1);
      return;
    }
    const controls = animate(p, 1, { duration, delay, ease: EASE_OUT });
    return () => controls.stop();
  }, [run, reduced, duration, delay, p]);
  return p;
}

/** A number that counts up from zero when it comes into view. Formats with en-AU grouping. */
export const Figure = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.4,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) => {
  const { ref, seen } = useSeen<HTMLSpanElement>(0.5);
  const p = useProgress(seen, { duration });
  const text = useTransform(p, (t) =>
    `${prefix}${(value * t).toLocaleString('en-AU', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`
  );
  const final = `${prefix}${value.toLocaleString('en-AU', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      <span className="sr-only">{final}</span>
      <motion.span aria-hidden>{text}</motion.span>
    </span>
  );
};

/** A bar that grows from zero to `pct` (0 to 100) along x or y when it comes into view. */
export const Grow = ({
  pct,
  axis = 'x',
  delay = 0,
  className,
  style,
}: {
  pct: number;
  axis?: 'x' | 'y';
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const { ref, seen, reduced } = useSeen<HTMLDivElement>(0.3);
  const size = `${Math.max(0, Math.min(100, pct))}%`;
  return (
    <motion.div
      ref={ref}
      className={cn(axis === 'x' ? 'h-full origin-left' : 'w-full origin-bottom', className)}
      style={{ ...(axis === 'x' ? { width: size } : { height: size }), ...style }}
      initial={reduced ? false : axis === 'x' ? { scaleX: 0 } : { scaleY: 0 }}
      animate={seen ? (axis === 'x' ? { scaleX: 1 } : { scaleY: 1 }) : undefined}
      transition={{ duration: 1, delay, ease: EASE_OUT }}
    />
  );
};

/** A ring or donut drawn with a conic gradient that sweeps to its value when it comes into view. */
export const SweepRing = ({
  pct,
  size = 128,
  thickness = 12,
  stops,
  track = 'var(--hos-ink-100)',
  children,
  className,
}: {
  pct: number;
  size?: number;
  thickness?: number;
  /** gradient colours along the filled arc */
  stops: string[];
  track?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const { ref, seen } = useSeen<HTMLDivElement>(0.4);
  const p = useProgress(seen, { duration: 1.4 });
  const angle = useTransform(p, (t) => pct * t);
  const colourStops = stops.map((c, i) => `${c} calc(var(--a) * ${(i / Math.max(1, stops.length - 1)).toFixed(3)} * 1%)`).join(', ');
  const background = `conic-gradient(from -90deg, ${colourStops}, ${track} calc(var(--a) * 1%))`;
  return (
    <motion.div
      ref={ref}
      className={cn('relative shrink-0 rounded-full', className)}
      style={{ width: size, height: size, background, ['--a' as string]: angle }}
    >
      <div className="absolute rounded-full bg-surface" style={{ inset: thickness }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </motion.div>
  );
};
