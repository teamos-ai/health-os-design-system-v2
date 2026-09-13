/**
 * Motion primitives: the Health OS motion library (Framer Motion).
 *
 * Health OS motion is its own: calm and flowing, and on by default. The library is
 * open-ended: add new moments when a real need appears. Every primitive respects
 * `prefers-reduced-motion` and settles to its finished state.
 *
 * Stable:        FadeIn, Stagger, StaggerItem, Reveal, TextReveal, CountUp, RollingNumber,
 *                HoverLift, HoverUnderline, Marquee, Appear, BreathingDot, HeroGlow
 * Experimental:  Parallax, BorderGlow, PointerSpotlight, GradientShimmer (label them where shown)
 */
import * as React from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
  useMotionValue,
  useAnimationFrame,
  useScroll,
  useTransform,
  wrap,
  type Variants,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { APRICOT, ROSE, LAVENDER } from '@/lib/palette';
import { EASE_OUT } from '@/lib/motion';

/** "#E85BA8" + 0.14 → "rgba(232, 91, 168, 0.14)" — for palette hexes needing an alpha. */
const hexToRgba = (hex: string, alpha: number): string => {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

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
      {/* screen readers get the static final figure, never the intermediates */}
      <span className="sr-only">{`${prefix}${to.toFixed(decimals)}${suffix}`}</span>
      <span aria-hidden>
        {prefix}
        {value.toFixed(decimals)}
        {suffix}
      </span>
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

/* ── HeroGlow: the soft wash gradient, faded out from the top of a hero ──
   Uses bg-brand-gradient-soft under a radial mask, so a hero gets atmosphere without
   a photo. aria-hidden and pointer-events none. */
export const HeroGlow = ({ className }: { className?: string }) => (
  <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
    <div
      className="absolute inset-x-0 top-0 h-3/4 bg-brand-gradient-soft"
      style={{
        maskImage: 'radial-gradient(70% 90% at 50% 0%, #000 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(70% 90% at 50% 0%, #000 0%, transparent 100%)',
      }}
    />
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
  /** allow grab-and-scrub: drag/swipe to move through faster, then auto-drift resumes */
  draggable?: boolean;
  /** accessible name for the marquee region (the duplicate copy stays aria-hidden) */
  ariaLabel?: string;
  className?: string;
  gapClassName?: string;
}
export const Marquee = ({
  children,
  speed = 36,
  reverse = false,
  pauseOnHover = true,
  draggable = false,
  ariaLabel = 'scrolling showcase',
  className,
  gapClassName = 'gap-5',
}: MarqueeProps) => {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const [copyWidth, setCopyWidth] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const firstCopyRef = React.useRef<HTMLDivElement>(null);
  const dragRef = React.useRef({ active: false, startX: 0, startVal: 0 });

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
    if (reduced || paused || dragRef.current.active || copyWidth === 0) return;
    const move = (delta / 1000) * speed * (reverse ? 1 : -1);
    const next = wrap(-copyWidth, 0, x.get() + move);
    x.set(next);
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable) return;
    dragRef.current = { active: true, startX: e.clientX, startVal: x.get() };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable || !dragRef.current.active || copyWidth === 0) return;
    const dx = e.clientX - dragRef.current.startX;
    x.set(wrap(-copyWidth, 0, dragRef.current.startVal + dx));
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable || !dragRef.current.active) return;
    dragRef.current.active = false;
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const content = (
    <div ref={firstCopyRef} className={cn('flex shrink-0 items-stretch', gapClassName)}>
      {children}
    </div>
  );

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        'relative overflow-hidden marquee-mask',
        draggable && 'cursor-grab touch-pan-y select-none active:cursor-grabbing',
        className
      )}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
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

/* ── Reveal — fade + small translate on scroll-in ── */
export interface RevealProps {
  delay?: number;
  y?: number;
  /** @deprecated ignored: kept so older call sites still compile. */
  blur?: number;
  className?: string;
  children: React.ReactNode;
  as?: 'div' | 'section' | 'span' | 'li' | 'p';
}
export const Reveal = ({ delay = 0, y = 12, className, children, as = 'div' }: RevealProps) => {
  const reduced = useReducedMotion();
  const Tag = motion[as] as React.ElementType;
  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: EASE_OUT, delay }}
    >
      {children}
    </Tag>
  );
};

/* ── TextReveal — heading words fade-up in a gentle stagger ──
   Defaults keep the total perceived reveal ≤ ~480ms for typical headings
   (e.g. 8 words: 7 × 25ms stagger + 300ms word fade = 475ms). */
export const TextReveal = ({
  text,
  className,
  delay = 0,
  stagger = 0.025,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) => {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;
  const words = text.split(' ');
  return (
    <motion.span
      className={cn('inline-block', className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: '0.4em' },
            show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT } },
          }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
};

/* ── Parallax — gentle scroll-linked drift (≤ small px) ── */
/** Experimental. A gentle scroll-linked drift for decorative media only, never for text. */
export const Parallax = ({
  children,
  amount = 12,
  className,
}: {
  children: React.ReactNode;
  amount?: number;
  className?: string;
}) => {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
};

/* ── GradientShimmer: experimental loading sheen for placeholder text shapes ──
   Loading placeholders only, never readable content. The text stays one solid tonal
   neutral; a soft mask band travels across it, so there is no gradient-filled text. */
const SHEEN_MASK: React.CSSProperties = {
  WebkitMaskImage: 'linear-gradient(110deg, #000 35%, rgba(0, 0, 0, 0.35) 50%, #000 65%)',
  maskImage: 'linear-gradient(110deg, #000 35%, rgba(0, 0, 0, 0.35) 50%, #000 65%)',
  WebkitMaskSize: '250% 100%',
  maskSize: '250% 100%',
};

export const GradientShimmer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span className={cn('animate-sheen text-ink-200', className)} style={SHEEN_MASK}>
    {children}
  </span>
);

/* ── BorderGlow — soft gradient hairline drifting around the edge ── */
/** Experimental. The signature gradient drifts around a card edge while it is hovered or focused. */
export const BorderGlow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const reduced = useReducedMotion();
  const [active, setActive] = React.useState(false);
  return (
    <div
      className={cn('relative overflow-hidden rounded-md p-px', className)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            `conic-gradient(from 0deg, transparent 0deg, ${APRICOT[400]} 40deg, ${ROSE[400]} 80deg, ${LAVENDER[400]} 120deg, transparent 170deg)`,
        }}
        animate={reduced || !active ? undefined : { rotate: 360 }}
        transition={{ duration: 9, ease: 'linear', repeat: Infinity }}
      />
      <div className="relative rounded-md bg-surface">{children}</div>
    </div>
  );
};

/* ── BreathingDot: a calm pulse for a genuinely live status (one per view) ── */
export const BreathingDot = ({ className, color = 'bg-success-600' }: { className?: string; color?: string }) => {
  const reduced = useReducedMotion();
  return (
    <span className={cn('relative inline-flex h-2 w-2', className)}>
      {!reduced && (
        <motion.span
          aria-hidden
          className={cn('absolute inset-0 rounded-full', color)}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.6, 1] }}
          transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity }}
        />
      )}
      <span className={cn('relative inline-block h-2 w-2 rounded-full', color)} />
    </span>
  );
};

/* ── PointerSpotlight — soft glow that follows the cursor inside a card ── */
const SPOTLIGHT_DEFAULT = hexToRgba(ROSE[400], 0.14); // rose-400 @ .14

/** Experimental. A soft rose light follows the pointer inside a card. */
export const PointerSpotlight = ({
  children,
  className,
  color = SPOTLIGHT_DEFAULT,
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove} className={cn('group relative overflow-hidden rounded-md', className)}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-md ease-out group-hover:opacity-100"
        style={{ background: `radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), ${color}, transparent 70%)` }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

/* ── HoverUnderline — link affordance, underline draws in from the left ── */
export const HoverUnderline = ({
  children,
  href = '#',
  className,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) => (
  <a
    href={href}
    className={cn(
      'group relative inline-block rounded-md font-sans text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700',
      className
    )}
  >
    {children}
    <span
      aria-hidden
      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-rose-700 transition-transform duration-md ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
    />
  </a>
);

/* ── RollingNumber — odometer digit roll (CountUp's richer cousin) ── */
const Digit = ({ value, active, reduced }: { value: number; active: boolean; reduced: boolean | null }) => (
  <span className="relative inline-block h-[1em] w-[0.6em] overflow-hidden tabular-nums">
    <motion.span
      className="absolute left-0 top-0 flex flex-col items-center"
      initial={{ y: 0 }}
      animate={{ y: active ? `-${value}em` : 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.45, ease: EASE_OUT }}
    >
      {Array.from({ length: 10 }, (_, n) => (
        <span key={n} className="block h-[1em] leading-[1em]">
          {n}
        </span>
      ))}
    </motion.span>
  </span>
);
export const RollingNumber = ({
  value,
  prefix = '',
  suffix = '',
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const chars = String(Math.round(value)).split('');
  return (
    <span ref={ref} className={cn('inline-flex items-end tabular-nums', className)}>
      {/* screen readers get the static final value, never the rolling columns */}
      <span className="sr-only">{`${prefix}${Math.round(value)}${suffix}`}</span>
      <span aria-hidden className="inline-flex items-end">
        {prefix}
        {chars.map((c, i) =>
          /\d/.test(c) ? (
            <Digit key={i} value={Number(c)} active={inView} reduced={reduced} />
          ) : (
            <span key={i}>{c}</span>
          )
        )}
        {suffix}
      </span>
    </span>
  );
};

/* ── Appear — AnimatePresence enter/exit for toggled content ── */
export const Appear = ({
  show,
  children,
  className,
  y = 8,
}: {
  show: boolean;
  children: React.ReactNode;
  className?: string;
  y?: number;
}) => {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={className}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y }}
          transition={{ duration: 0.24, ease: EASE_OUT }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
