/**
 * Ticker: the one banner. A thin strip of short statements on the soft wash that scrolls
 * slowly and pauses on hover. A keyboard-reachable pause control sits at the right edge
 * (WCAG 2.2.2).
 *
 * There is only this banner: no grey, paper, white or dark strip exists on either theme
 * (tokens.json → banner). Options: `reverse` direction and `speed` in seconds per loop,
 * kept inside the banner token's 32 to 60 second band.
 */
import * as React from 'react';
import { Pause, Play } from 'lucide-react';
import { TICKER_ITEMS, type TickerItem } from '@/data/system';
import { BANNER } from '@/lib/palette';
import { cn } from '@/lib/utils';

export interface TickerProps {
  items?: TickerItem[];
  reverse?: boolean;
  /** seconds per loop (lower is faster), kept inside the banner token range of 32 to 60 */
  speed?: number;
  /** Accessible name for the strip. Defaults to 'Announcements'. */
  ariaLabel?: string;
  className?: string;
}

export const Ticker = ({
  items = TICKER_ITEMS,
  reverse = false,
  speed = 32,
  ariaLabel,
  className,
}: TickerProps) => {
  const [paused, setPaused] = React.useState(false);
  /* Clamp to the banner token's range: a banner drifts, it never races. */
  const duration = Math.min(BANNER.speedMax, Math.max(BANNER.speedMin, speed));
  const doubled = [...items, ...items];
  return (
    <div
      role="group"
      aria-label={ariaLabel ?? 'Announcements'}
      className={cn(
        'pause-on-hover relative w-full overflow-hidden border-y border-line bg-brand-gradient-soft py-3',
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
            className="flex items-center gap-2 font-sans text-label uppercase text-ink-900"
            aria-hidden={i >= items.length ? true : undefined}
          >
            <Icon className="h-3 w-3 text-ink-500" strokeWidth={1.5} />
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
          'absolute inset-y-0 right-0 flex min-w-12 items-center justify-end bg-gradient-to-l from-lavender-50 from-60% to-transparent pl-10 pr-4',
          'text-ink-600 transition-colors duration-sm hover:text-ink-900',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink-900'
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
