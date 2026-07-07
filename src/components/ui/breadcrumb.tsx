/**
 * Breadcrumb — Health OS v2.
 *
 * The "you are here" trail. A `<nav aria-label="Breadcrumb">` wrapping an ordered list,
 * mono `body-sm`, hairline chevron separators, the current page marked `aria-current="page"`
 * and un-linked. Links get the brand hover + focus ring. Sentence case throughout.
 */
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Crumb {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: Crumb[];
  className?: string;
}

export const Breadcrumb = ({ items, className }: BreadcrumbProps) => (
  <nav aria-label="Breadcrumb" className={className}>
    <ol className="flex flex-wrap items-center gap-1.5 font-mono text-body-sm">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {item.href && !last ? (
              <a
                href={item.href}
                className="rounded-sm text-ink-500 transition-colors duration-sm hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                {item.label}
              </a>
            ) : (
              <span className={cn(last ? 'text-ink-900' : 'text-ink-500')} aria-current={last ? 'page' : undefined}>
                {item.label}
              </span>
            )}
            {!last && <ChevronRight className="h-3.5 w-3.5 text-ink-400" strokeWidth={1.5} aria-hidden />}
          </li>
        );
      })}
    </ol>
  </nav>
);
