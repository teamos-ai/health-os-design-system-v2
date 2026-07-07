/**
 * Pagination — Health OS v2.
 *
 * Filled carbon current page, muted ink siblings, outline prev/next IconButtons with
 * lucide chevrons (for consistency with the rest of the system). Collapses to an
 * ellipsis when there are many pages. 8px squircles only — no circles.
 */
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from '@/components/ui/icon-button';
import { cn } from '@/lib/utils';

export interface PaginationProps {
  /** 1-based current page. */
  page: number;
  total: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

function pageRange(page: number, total: number, sib: number): (number | 'gap')[] {
  const window = sib * 2 + 5; // first, last, current, 2*sib, 2 gaps
  if (total <= window) return Array.from({ length: total }, (_, i) => i + 1);
  const left = Math.max(page - sib, 2);
  const right = Math.min(page + sib, total - 1);
  const out: (number | 'gap')[] = [1];
  if (left > 2) out.push('gap');
  for (let i = left; i <= right; i++) out.push(i);
  if (right < total - 1) out.push('gap');
  out.push(total);
  return out;
}

export const Pagination = ({
  page,
  total,
  onChange,
  siblingCount = 1,
  className,
}: PaginationProps) => {
  const items = pageRange(page, total, siblingCount);
  const go = (p: number) => {
    if (p >= 1 && p <= total && p !== page) onChange(p);
  };

  const cell =
    'inline-flex h-10 min-w-10 items-center justify-center rounded-md px-2 ' +
    'font-display text-body-sm font-medium transition-all duration-sm ease-out ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 ' +
    'focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[0.98]';

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1.5', className)}>
      <IconButton
        size="sm"
        variant="outline"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => go(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
      </IconButton>

      {items.map((it, i) =>
        it === 'gap' ? (
          <span key={`gap-${i}`} className="px-1.5 font-mono text-body-sm text-ink-400" aria-hidden>
            …
          </span>
        ) : (
          <button
            key={it}
            type="button"
            aria-current={it === page ? 'page' : undefined}
            onClick={() => go(it)}
            className={cn(
              cell,
              it === page
                ? 'bg-carbon text-white dark:bg-ink-900 dark:text-paper'
                : 'text-ink-500 hover:bg-ink-100 hover:text-ink-900'
            )}
          >
            {it}
          </button>
        )
      )}

      <IconButton
        size="sm"
        variant="outline"
        aria-label="Next page"
        disabled={page >= total}
        onClick={() => go(page + 1)}
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
      </IconButton>
    </nav>
  );
};
