/**
 * MonoLabel: the small uppercase label that gives a heading its context (an eyebrow),
 * or tags a row. Anonymous Pro, label role. Optional leading number or dot and a trailing slot.
 *
 * Use at most one eyebrow per three sections on a page: the heading usually says enough.
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

export type MonoLabelTone = 'ink' | 'rose' | 'apricot' | 'lavender' | 'success';

export interface MonoLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** leading number, for a numbered sequence */
  number?: string;
  /** leading dot marker, for a live or categorised state */
  dot?: boolean;
  /** colour of the number and dot; the text stays in ink so it reads clearly */
  tone?: MonoLabelTone;
  /** trailing slot: an icon, arrow or status dot */
  trailing?: React.ReactNode;
}

const TONE: Record<MonoLabelTone, { text: string; mark: string; dot: string }> = {
  ink: { text: 'text-ink-500', mark: 'text-apricot-400', dot: 'bg-apricot-400' },
  rose: { text: 'text-ink-900', mark: 'text-rose-400', dot: 'bg-rose-400' },
  apricot: { text: 'text-ink-900', mark: 'text-apricot-400', dot: 'bg-apricot-400' },
  lavender: { text: 'text-ink-900', mark: 'text-lavender-400', dot: 'bg-lavender-400' },
  success: { text: 'text-ink-900', mark: 'text-success-600', dot: 'bg-success-600' },
};

export const MonoLabel = ({ number, dot, tone = 'ink', trailing, className, children, ...props }: MonoLabelProps) => {
  const t = TONE[tone];
  return (
    <span className={cn('inline-flex items-center gap-2 font-sans text-label uppercase', t.text, className)} {...props}>
      {number && <span className={t.mark}>{number}</span>}
      {dot && <span aria-hidden className={cn('h-1 w-1 rounded-full', t.dot)} />}
      {children}
      {trailing && <span className="inline-flex items-center">{trailing}</span>}
    </span>
  );
};
