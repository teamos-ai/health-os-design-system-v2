/**
 * MonoLabel — the efficient.app command-UI overline. Anonymous Pro, uppercase, wide
 * tracking, ink-500. Optional numbered prefix ("01") or leading dot for the
 * "01 02 03 details" rhythm. Sentence-case copy in headings; overlines may be caps.
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface MonoLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  number?: string;
  dot?: boolean;
  tone?: 'ink' | 'brand' | 'inverse';
}

const TONE: Record<NonNullable<MonoLabelProps['tone']>, string> = {
  ink: 'text-ink-600',
  brand: 'text-brand-600',
  inverse: 'text-white/70',
};

export const MonoLabel = ({ number, dot, tone = 'ink', className, children, ...props }: MonoLabelProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 font-mono text-overline uppercase',
      TONE[tone],
      className
    )}
    {...props}
  >
    {number && <span className="text-brand-600">{number}</span>}
    {dot && <span className="h-1 w-1 rounded-full bg-brand-400" />}
    {children}
  </span>
);
