/**
 * Badge — small soft tonal squircle (8px radius, never a pill). Tonal background +
 * same-hue text (700 on the 100 tint to clear AA at the small label size). Optional
 * leading emoji or dot. Use for status, category, wellness tags and numbered details.
 */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badge = cva(
  'inline-flex items-center gap-1.5 font-mono font-bold uppercase tracking-label whitespace-nowrap',
  {
    variants: {
      variant: {
        // Pastel by design — soft tonal washes so tags stay quiet on a page.
        // Accents sit on the -50 tints; semantics on a lightened -100 (/70).
        neutral: 'bg-ink-100/70 text-ink-700',
        brand: 'bg-rose-50 text-brand-700',
        apricot: 'bg-apricot-50 text-apricot-700',
        lavender: 'bg-lavender-50 text-lavender-700',
        gold: 'bg-gold-100/70 text-gold-800',
        success: 'bg-success-100/70 text-success-700',
        warn: 'bg-warn-100/70 text-warn-700',
        danger: 'bg-danger-100/70 text-danger-700',
        info: 'bg-info-100/70 text-info-700',
        outline: 'bg-surface border border-line text-ink-500',
      },
      size: {
        sm: 'text-[10px] leading-none px-2 py-1 rounded-md',
        md: 'text-label px-2.5 py-1 rounded-md',
      },
    },
    defaultVariants: { variant: 'neutral', size: 'md' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {
  dot?: boolean;
  /** leading emoji that represents the label */
  emoji?: string;
}

const DOT_COLOR: Record<string, string> = {
  neutral: 'bg-ink-400',
  brand: 'bg-brand-400',
  apricot: 'bg-apricot-400',
  lavender: 'bg-lavender-400',
  gold: 'bg-gold-400',
  success: 'bg-success-600',
  warn: 'bg-warn-600',
  danger: 'bg-danger-600',
  info: 'bg-info-600',
  outline: 'bg-ink-400',
};

export const Badge = ({ className, variant, size, dot, emoji, children, ...props }: BadgeProps) => (
  <span className={cn(badge({ variant, size }), className)} {...props}>
    {dot && <span className={cn('h-1.5 w-1.5 rounded-sm', DOT_COLOR[variant ?? 'neutral'])} />}
    {emoji && (
      <span aria-hidden className="text-[0.95em] leading-none">
        {emoji}
      </span>
    )}
    {children}
  </span>
);
