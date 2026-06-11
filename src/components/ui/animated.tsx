/**
 * Motion primitives — Health OS v2's quiet Framer Motion vocabulary.
 *
 * Every primitive honours `prefers-reduced-motion`. Vocabulary = fade + small
 * translate + gentle marquee + soft hover lift + count-up. No bounce / wobble /
 * elastic / autoplay. Durations stay subtle (≤ 480ms). Use at most ONE reveal
 * per viewport band so the page reads calm.
 *
 * Exports: FadeIn · Stagger · StaggerItem · CountUp · HoverLift · HeroGlow · Marquee
 */
import * as React from 'react';
import {
  motion,
  useReducedMotion,
  useInView,
  useMotionValue,
  useAnimationFrame,
  wrap,
  type Variants,
} from 'framer-motion';
import { cn } from '@/lib/utils';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/* ── FadeIn — viewport fade + small translate-up (in-view cascade) ── */
export interface FadeInProps {
  delay?: number;
  y?: number;
  className?: string;
  children: React.ReactNode;
  as?: 'div' | 'section' | 'span' | 'li' | 'header' | 'p';
}
export const FadeIn = ({ delay = 0, y = 10, className, children, as = 'div' }: FadeInProps) => {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as React.ElementType;
  return (
    <MotionTag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: EASE_OUT, delay }}
    >
      {children}
    </MotionTag>
  );
};

/* ── Stagger container + item — cascade a row/grid of children ── */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};
export const Stagger = ({
  className,
  children,
  amount = 0.15,
}: {
  className?: string;
  children: React.ReactNode;
  amount?: number;
}) => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial={reduced ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
};
export const StaggerItem = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <motion.div className={className} variants={itemVariants}>
    {children}
  </motion.div>
);

/* ── CountUp — animated number, IntersectionObserver-driven ── */
export interface CountUpProps {
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}
export const CountUp = ({
  to,
  duration = 1.4,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}: CountUpProps) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    let start = 0;
    const ms = duration * 1000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min(1, (ts - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, duration]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
};

/* ── HoverLift — wrap any card for a calm hover raise (no glass) ── */
export const HoverLift = ({
  className,
  children,
  y = -4,
}: {
  className?: string;
  children: React.ReactNode;
  y?: number;
}) => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduced ? undefined : { y }}
      transition={{ duration: 0.24, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
};

/* ── HeroGlow — efficient.app-style soft pastel radial wash on warm ivory ──
   Pure CSS radial gradients (apricot / rose / lavender @ low alpha), blurred.
   aria-hidden, pointer-events none, zero glass. */
export const HeroGlow = ({ className }: { className?: string }) => (
  <div
    aria-hidden
    className={cn(
      'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
      className
    )}
  >
    <div className="absolute left-1/2 top-[-12%] h-[640px] w-[min(1100px,120%)] -translate-x-1/2 bg-glow-hero blur-2xl opacity-90" />
  </div>
);

/* ── Marquee — seamless, gentle, pause-on-hover, reduced-motion safe ──
   Canonical Framer approach: measure one copy, drive x with useAnimationFrame +
   wrap() for a seamless loop. Renders children twice. */
export interface MarqueeProps {
  children: React.ReactNode;
  /** pixels per second */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  gapClassName?: string;
}
export const Marquee = ({
  children,
  speed = 36,
  reverse = false,
  pauseOnHover = true,
  className,
  gapClassName = 'gap-5',
}: MarqueeProps) => {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const [copyWidth, setCopyWidth] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const firstCopyRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = firstCopyRef.current;
    if (!el) return;
    const measure = () => setCopyWidth(el.scrollWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  useAnimationFrame((_, delta) => {
    if (reduced || paused || copyWidth === 0) return;
    const move = (delta / 1000) * speed * (reverse ? 1 : -1);
    const next = wrap(-copyWidth, 0, x.get() + move);
    x.set(next);
  });

  const content = (
    <div ref={firstCopyRef} className={cn('flex shrink-0 items-stretch', gapClassName)}>
      {children}
    </div>
  );

  return (
    <div
      className={cn('relative overflow-hidden marquee-mask', className)}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <motion.div className={cn('flex w-max items-stretch', gapClassName)} style={{ x }}>
        {content}
        {/* duplicate copy for the seamless wrap */}
        <div aria-hidden className={cn('flex shrink-0 items-stretch', gapClassName)}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};
