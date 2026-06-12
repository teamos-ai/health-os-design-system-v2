/**
 * MonoLabel — the command-UI overline. Anonymous Pro, uppercase, wide
 * tracking. Optional numbered prefix ("01") or leading dot for the
 * "01 02 03 details" rhythm, an optional `trailing` slot (icon / status dot),
 * a `size` (sm | md) and a `tone` drawn from the locked accent family.
 * Sentence-case copy in headings; overlines may be caps.
 *
 * Backward-compatible: the original API (`number`, `dot`, `tone` of
 * ink | brand | inverse) renders exactly as before — `size` defaults to `md`,
 * the numbered prefix and dot keep the brand hue for ink / brand / inverse tones.
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

export type MonoLabelTone =
  | 'ink'
  | 'brand'
  | 'apricot'
  | 'lavender'
  | 'gold'
  | 'success'
  | 'inverse';

export interface MonoLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** numbered prefix for the 01 / 02 / 03 rhythm */
  number?: string;
  /** leading dot marker */
  dot?: boolean;
  /** text colour, mapped to the locked accent family */
  tone?: MonoLabelTone;
  /** overline (md, default) or the tighter label scale (sm) */
  size?: 'sm' | 'md';
  /** optional trailing slot — an icon, arrow or status dot */
  trailing?: React.ReactNode;
}

/** Same-hue text per tone, AA on every page ground. The accent ramps are fixed hexes
 *  that don't flip per theme, so the 700/800 step (AA on white + ivory) would collapse
 *  on the dark carbon ground — the `dark:` step lightens each to a value that clears
 *  4.5:1 on #1F1F1F (apricot-300 6.6 · lavender-300 5.6 · gold-400 8.2 · success-600 4.8). */
const TONE_TEXT: Record<MonoLabelTone, string> = {
  ink: 'text-ink-600',
  brand: 'text-accent',
  apricot: 'text-apricot-700 dark:text-apricot-300',
  lavender: 'text-lavender-700 dark:text-lavender-300',
  gold: 'text-gold-800 dark:text-gold-400',
  success: 'text-success-700 dark:text-success-600',
  inverse: 'text-white/70',
};

/** Prefix / dot accent hue per tone. ink + brand + inverse keep the brand accent (legacy).
 *  Accent-tone numbers lighten on dark to stay legible alongside the lightened label. */
const TONE_MARK: Record<MonoLabelTone, { number: string; dot: string }> = {
  ink: { number: 'text-accent', dot: 'bg-brand-400' },
  brand: { number: 'text-accent', dot: 'bg-brand-400' },
  apricot: { number: 'text-apricot-600 dark:text-apricot-300', dot: 'bg-apricot-400' },
  lavender: { number: 'text-lavender-600 dark:text-lavender-300', dot: 'bg-lavender-400' },
  gold: { number: 'text-gold-600 dark:text-gold-400', dot: 'bg-gold-400' },
  success: { number: 'text-success-600', dot: 'bg-success-600' },
  inverse: { number: 'text-white/80', dot: 'bg-white/60' },
};

const SIZE: Record<NonNullable<MonoLabelProps['size']>, string> = {
  sm: 'text-label gap-1.5',
  md: 'text-overline gap-2',
};

export const MonoLabel = ({
  number,
  dot,
  tone = 'ink',
  size = 'md',
  trailing,
  className,
  children,
  ...props
}: MonoLabelProps) => {
  const mark = TONE_MARK[tone];
  return (
    <span
      className={cn(
        'inline-flex items-center font-mono uppercase',
        SIZE[size],
        TONE_TEXT[tone],
        className
      )}
      {...props}
    >
      {number && <span className={mark.number}>{number}</span>}
      {dot && <span className={cn('h-1 w-1 rounded-full', mark.dot)} />}
      {children}
      {trailing && <span className="inline-flex items-center">{trailing}</span>}
    </span>
  );
};
