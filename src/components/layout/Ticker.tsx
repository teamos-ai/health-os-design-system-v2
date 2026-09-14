/**
 * Ticker: a thin banner of short statements that scrolls slowly and pauses on hover.
 * A keyboard-reachable pause control sits at the right edge (WCAG 2.2.2).
 *
 * Tones: `subtle` (quiet fill) and `tint` (soft wash). There is no dark bar.
 * Options: `reverse` direction and `speed` in seconds per loop (32 to 60).
 */
import * as React from 'react';
import { Pause, Play } from 'lucide-react';
import { TICKER_ITEMS, type TickerItem } from '@/data/system';
import { cn } from '@/lib/utils';

/* `fade` backs the pause control with the strip's own colour; `ring` is the focus ring. */
const TONES = {
  subtle: {
    wrap: 'bg-ink-100 border-line',
    text: 'text-ink-600',
    icon: 'text-ink-400',
    fade: 'from-ink-100',
    ring: 'focus-visible:ring-ink-900',
  },
  tint: {
    wrap: 'bg-brand-gradient-soft border-line',
    text: 'text-ink-900',
    icon: 'text-ink-500',
    fade: 'from-lavender-50',
    ring: 'focus-visible:ring-ink-900',
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
  /* Clamp to a calm range: a ticker should drift, never race. */
  const duration = Math.min(60, Math.max(32, speed));
  const doubled = [...items, ...items];
  return (
    <div
      role="group"
      aria-label={ariaLabel ?? 'Announcements'}
      className={cn(
        'pause-on-hover relative w-full overflow-hidden border-y py-3',
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
            className={cn('flex items-center gap-2 font-sans text-label uppercase', t.text)}
            aria-hidden={i >= items.length ? true : undefined}
          >
            <Icon className={cn('h-3 w-3', t.icon)} strokeWidth={1.5} />
            <span>{text}</span>
          </div>
        ))}
      </div>
      {/* Pause and play: keyboard-reachable (WCAG 2.2.2); inset ring so the edge never clips focus */}
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
