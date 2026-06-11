/**
 * Ticker — the thin top marquee (Cherry Note). Mono uppercase facts with a small
 * rose Lucide glyph, looping gently. CSS `animate-ticker` (reduced-motion safe via
 * the global guard). Items are duplicated once for a seamless wrap.
 */
import { TICKER_ITEMS } from '@/data/system';
import { cn } from '@/lib/utils';

export const Ticker = ({ className }: { className?: string }) => {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className={cn('w-full overflow-hidden border-b border-line bg-ink-100 py-2.5', className)}>
      <div className="flex w-max animate-ticker gap-12 whitespace-nowrap pause-on-hover">
        {items.map(({ icon: Icon, text }, i) => (
          <div
            key={i}
            className="flex items-center gap-2 font-mono text-overline uppercase text-ink-600"
            aria-hidden={i >= TICKER_ITEMS.length ? true : undefined}
          >
            <Icon className="h-3 w-3 text-accent" strokeWidth={1.5} />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
