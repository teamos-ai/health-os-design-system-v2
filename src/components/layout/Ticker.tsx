/**
 * Ticker — the thin scrolling banner (Cherry Note). Mono uppercase facts with a small
 * accent glyph, looping gently and pausing on hover. CSS-driven (reduced-motion safe
 * via the global guard); items are duplicated once for a seamless wrap.
 *
 * Variants: `tone` (subtle / tint / carbon), `reverse` (scroll direction), `speed`
 * (seconds per loop), and any `items` set.
 */
import { TICKER_ITEMS, type TickerItem } from '@/data/system';
import { cn } from '@/lib/utils';

const TONES = {
  subtle: { wrap: 'bg-ink-100 border-line', text: 'text-ink-600', icon: 'text-accent' },
  tint: { wrap: 'bg-brand-gradient-soft border-line', text: 'text-ink-700', icon: 'text-brand-600' },
  carbon: { wrap: 'bg-carbon border-carbon-700', text: 'text-white/75', icon: 'text-brand-400' },
} as const;

export interface TickerProps {
  items?: TickerItem[];
  tone?: keyof typeof TONES;
  reverse?: boolean;
  /** seconds per loop (lower = faster) */
  speed?: number;
  className?: string;
}

export const Ticker = ({
  items = TICKER_ITEMS,
  tone = 'subtle',
  reverse = false,
  speed = 32,
  className,
}: TickerProps) => {
  const t = TONES[tone];
  const doubled = [...items, ...items];
  return (
    <div className={cn('w-full overflow-hidden border-y py-2.5', t.wrap, className)}>
      <div
        className={cn(
          'flex w-max gap-12 whitespace-nowrap pause-on-hover',
          reverse ? 'animate-marquee-reverse' : 'animate-ticker'
        )}
        style={{ animationDuration: `${speed}s` }}
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
    </div>
  );
};
