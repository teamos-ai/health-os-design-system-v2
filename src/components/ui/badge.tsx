/**
 * Badge: a small tonal tag for status, category and topic. A soft tint with a light
 * same-hue edge and dark ink text, label type, 8px corners. Optional leading emoji or dot.
 *
 * Colours: neutral and outline for quiet tags; rose, apricot and lavender for brand
 * categories; success, warning and error only when the tag reports a real state.
 */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badge = cva('inline-flex items-center gap-2 whitespace-nowrap rounded-md font-sans text-label uppercase', {
  variants: {
    variant: {
      neutral: 'bg-ink-100 text-ink-900',
      outline: 'border border-line bg-surface text-ink-500',
      rose: 'bg-rose-50 text-ink-900 ring-1 ring-inset ring-rose-200',
      apricot: 'bg-apricot-50 text-ink-900 ring-1 ring-inset ring-apricot-200',
      lavender: 'bg-lavender-50 text-ink-900 ring-1 ring-inset ring-lavender-200',
      success: 'bg-success-100 text-ink-900 ring-1 ring-inset ring-success-300',
      warning: 'bg-warning-100 text-ink-900 ring-1 ring-inset ring-warning-300',
      error: 'bg-error-100 text-ink-900 ring-1 ring-inset ring-error-300',
    },
    size: {
      sm: 'px-2 py-1',
      md: 'px-3 py-1',
    },
  },
  defaultVariants: { variant: 'neutral', size: 'md' },
});

export type BadgeVariant = NonNullable<VariantProps<typeof badge>['variant']>;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badge> {
  /** leading dot, for a live or categorised state */
  dot?: boolean;
  /** leading emoji that represents the label (decorative; the text carries the meaning) */
  emoji?: string;
}

const DOT: Record<BadgeVariant, string> = {
  neutral: 'bg-ink-400',
  outline: 'bg-ink-400',
  rose: 'bg-rose-400',
  apricot: 'bg-apricot-400',
  lavender: 'bg-lavender-400',
  success: 'bg-success-600',
  warning: 'bg-warning-600',
  error: 'bg-error-600',
};

export const Badge = ({ className, variant, size, dot, emoji, children, ...props }: BadgeProps) => (
  <span className={cn(badge({ variant, size }), className)} {...props}>
    {dot && <span aria-hidden className={cn('h-2 w-2 rounded-full', DOT[variant ?? 'neutral'])} />}
    {emoji && (
      <span aria-hidden className="leading-none">
        {emoji}
      </span>
    )}
    {children}
  </span>
);
