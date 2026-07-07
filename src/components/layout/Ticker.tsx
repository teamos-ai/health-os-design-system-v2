/**
 * Ticker — the thin scrolling banner. Mono uppercase facts with a small
 * accent glyph, looping gently and pausing on hover. CSS-driven (reduced-motion safe
 * via the global guard); items are duplicated once for a seamless wrap. A small
 * keyboard-reachable pause/play control sits at the right edge (WCAG 2.2.2).
 *
 * Variants: `tone` (subtle / tint / carbon), `reverse` (scroll direction), `speed`
 * (seconds per loop), and any `items` set.
 */
import * as React from 'react';
import { Pause, Play } from 'lucide-react';
import { TICKER_ITEMS, type TickerItem } from '@/data/system';
import { cn } from '@/lib/utils';

/* Tones. `subtle` flips with the ink ramp (pale on light, dark fill on dark).
   `tint` is the soft pastel wash with fixed dark text — it reads identically in every
   theme (a gentle pastel bar, even on the carbon page), so its label colour can't use
   the flipping ink ramp. `carbon` is the bold black bar on light themes; since a black
   bar would vanish on the carbon page, it inverts to a gentle deep tint on dark.
   `fade` backs the pause control with a gradient matching the strip's right edge;
   `ring` is the focus ring — white on the carbon ground, brand elsewhere. */
const TONES = {
  subtle: {
    wrap: 'bg-ink-100 border-line',
    text: 'text-ink-600',
    icon: 'text-accent',
    fade: 'from-ink-100',
    ring: 'focus-visible:ring-brand-600/40',
  },
  tint: {
    wrap: 'bg-brand-gradient-soft border-line',
    text: 'text-carbon/80',
    icon: 'text-brand-600',
    fade: 'from-lavender-50',
    ring: 'focus-visible:ring-brand-600/40',
  },
  carbon: {
    wrap: 'bg-carbon border-carbon-700 dark:bg-brand-gradient-soft-dark dark:border-line-soft',
    text: 'text-white/75 dark:text-ink-700',
    icon: 'text-brand-400 dark:text-brand-300',
    fade: 'from-carbon dark:from-lavender-800',
    ring: 'focus-visible:ring-white/70',
  },
} as const;

export interface TickerProps {
  items?: TickerItem[];
  tone?: keyof typeof TONES;
  reverse?: boolean;
  /** seconds per loop (lower = faster) — clamped to the sanctioned 32–60s band */
  speed?: number;
  /** Accessible name for the strip. Defaults to 'Announcements'. */
  ariaLabel?: string;
  className?: string;
}

export const Ticker = ({
  items = TICKER_ITEMS,
  tone = 'subtle',
  reverse = false,
  speed = 32,
  ariaLabel,
  className,
}: TickerProps) => {
  const t = TONES[tone];
  const [paused, setPaused] = React.useState(false);
  /* Clamp to the sanctioned always-on loop band — motion.md: ticker 32–45s reference
     (theme variants may run up to 45s), marquee ceiling 60s. */
  const duration = Math.min(60, Math.max(32, speed));
  const doubled = [...items, ...items];
  return (
    <div
      role="group"
      aria-label={ariaLabel ?? 'Announcements'}
      className={cn(
        'pause-on-hover relative w-full overflow-hidden border-y py-2.5',
        t.wrap,
        className
      )}
    >
      <div
        className={cn(
          'flex w-max gap-12 whitespace-nowrap',
          reverse ? 'animate-marquee-reverse' : 'animate-ticker'
        )}
        style={{
          animationDuration: `${duration}s`,
          animationPlayState: paused ? 'paused' : undefined,
        }}
      >
        {doubled.map(({ icon: Icon, text }, i) => (
          <div
            key={i}
            className={cn('flex items-center gap-2 font-mono text-overline uppercase', t.text)}
            aria-hidden={i >= items.length ? true : undefined}
          >
            <Icon className={cn('h-3 w-3', t.icon)} strokeWidth={1.5} />
            <span>{text}</span>
          </div>
        ))}
      </div>
      {/* Pause/play — keyboard-reachable stop control (WCAG 2.2.2). Inset ring so the
          strip's overflow-hidden edge never clips the focus indicator. */}
      <button
        type="button"
        aria-pressed={paused}
        aria-label={paused ? 'Play announcements' : 'Pause announcements'}
        onClick={() => setPaused((p) => !p)}
        className={cn(
          'absolute inset-y-0 right-0 flex items-center bg-gradient-to-l to-transparent pl-6 pr-2',
          'opacity-60 transition-opacity duration-sm hover:opacity-100 active:opacity-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
          t.text,
          t.fade,
          t.ring
        )}
      >
        {paused ? (
          <Play className="h-3.5 w-3.5" strokeWidth={1.5} />
        ) : (
          <Pause className="h-3.5 w-3.5" strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
};
