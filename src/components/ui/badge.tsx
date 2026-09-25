/**
 * Badge: a small, quiet tag for status, category and topic. Sentence case in the label face
 * with normal tracking, a flat soft tint, 8px corners. No emoji: they bring colours from
 * outside the palette and render differently on every device. A badge can lead with a dot
 * (for a real state) or a small line icon, never both.
 *
 * Colour carries one meaning everywhere (BADGE_KEY in src/data/system.ts), so most badges are
 * neutral:
 *   rose      people and in person: members, one-to-one, groups, workshops, care
 *   lavender  online and self-paced: courses, webinars, replays, all-access
 *   neutral   topics, formats and everything else
 *   outline   quiet, inactive or not yet live: draft, free tier, worksheet
 *   success, warning, error  real states only (live, low stock, overdue), with a dot
 * Apricot is not a badge colour: apricot marks things you can act on.
 */
import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/* WRAPS WHEN IT MUST, 25 September 2026 (hardening).
   `whitespace-nowrap` with `shrink-0` is a promise the element can never keep: at 200 percent
   text on a 320px screen the label is wider than the viewport, the item refuses to shrink, and
   the page gains horizontal scroll, which is WCAG 1.4.4. Measured on Health OS: three tags and
   one button carried 133px of it at 320.
   `max-w-full` plus normal wrapping costs nothing at 100 percent, because an inline-flex box is
   sized by its content and only ever wraps when the container has already run out of room. */
const badge = cva('inline-flex max-w-full items-center rounded-lg font-sans text-label normal-case tracking-normal', {
  variants: {
    variant: {
      neutral: 'bg-ink-100 text-ink-900',
      outline: 'border border-line bg-surface text-ink-600',
      rose: 'bg-rose-50 text-ink-900',
      lavender: 'bg-lavender-50 text-ink-900',
      success: 'bg-success-100 text-ink-900',
      warning: 'bg-warning-100 text-ink-900',
      error: 'bg-error-100 text-ink-900',
    },
    size: {
      sm: 'h-6 gap-1 px-2',
      md: 'h-7 gap-2 px-3',
    },
  },
  defaultVariants: { variant: 'neutral', size: 'md' },
});

export type BadgeVariant = NonNullable<VariantProps<typeof badge>['variant']>;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badge> {
  /** leading dot, for a real state: live, active, low stock */
  dot?: boolean;
  /** leading line icon that names the kind of thing (decorative; the text carries the meaning) */
  icon?: LucideIcon;
}

const DOT: Record<BadgeVariant, string> = {
  neutral: 'bg-ink-400',
  outline: 'bg-ink-400',
  rose: 'bg-rose-400',
  lavender: 'bg-lavender-400',
  success: 'bg-success-600',
  warning: 'bg-warning-600',
  error: 'bg-error-600',
};

export const Badge = ({ className, variant, size, dot, icon: Icon, children, ...props }: BadgeProps) => (
  <span className={cn(badge({ variant, size }), className)} {...props}>
    {dot && <span aria-hidden className={cn('h-2 w-2 shrink-0 rounded-full', DOT[variant ?? 'neutral'])} />}
    {!dot && Icon && <Icon aria-hidden className="h-3 w-3 shrink-0 text-ink-600" strokeWidth={1.75} />}
    {children}
  </span>
);
