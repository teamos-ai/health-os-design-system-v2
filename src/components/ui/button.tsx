/**
 * Button — Health OS v2.
 *
 * Marketing CTA = `variant="primary"` + `size="lg"`. The dark pill = `variant="dark"`.
 * The signature apricot→rose→lavender CTA = `variant="gradient"` (use sparingly).
 * The mode-aware PASTEL CTA = `variant="accent"` — apricot (light) / rose (paper) /
 * lavender (dark), driven by the --btn-accent-* CSS vars in tokens.css. Same class,
 * all three themes, AA verified (a tonal fill + a darker same-hue label; white-on-accent
 * FAILS AA on this palette, so we never do it).
 *
 * Squircle by default — 8px radius (the global maximum), never a full pill.
 * No coloured shadows. Focus ring brand-600 @ 40% on neutral variants; the accent uses
 * its own per-mode --btn-accent-ring. Active scale 0.98. Don't stack two primary CTAs.
 *
 * Locked variant names kept valid app-wide: primary, secondary, ghost, dark, gradient,
 * link, danger. Added: accent, soft, outline. `danger` stays SOLID (AA white-on-red).
 */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const button = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-display font-medium select-none ' +
    'transition-all duration-sm ease-out ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 ' +
    'focus-visible:ring-offset-2 focus-visible:ring-offset-paper ' +
    'disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        /* ── Locked names (kept valid app-wide) ───────────────────────── */
        primary: 'bg-brand-600 text-white hover:bg-brand-700',
        secondary: 'bg-surface text-ink-900 border border-line hover:border-ink-300 hover:shadow-sm',
        ghost: 'bg-transparent text-ink-900 hover:bg-ink-100',
        dark: 'bg-carbon text-white hover:bg-carbon-800 dark:bg-ink-900 dark:text-paper dark:hover:bg-ink-700',
        gradient: 'bg-brand-gradient text-white hover:brightness-[1.04] shadow-sm',
        link: 'bg-transparent text-accent hover:opacity-80 underline underline-offset-4 decoration-1 p-0 rounded-none',
        danger: 'bg-danger-600 text-white hover:brightness-95',
        /* ── Added ─────────────────────────────────────────────────────── */
        // The one colour story — a mode-aware pastel, driven entirely by tokens.css.
        // The focus ring overrides the base brand ring so it matches the active hue.
        accent:
          'bg-[var(--btn-accent-bg)] text-[var(--btn-accent-fg)] hover:bg-[var(--btn-accent-bg-hover)] ' +
          'focus-visible:ring-[var(--btn-accent-ring)]',
        // Neutral tonal fill — the calm, muted "Submit" look, but kept readable (ink-600).
        soft: 'bg-ink-100 text-ink-600 hover:bg-ink-200 hover:text-ink-700',
        // Hairline, no fill — the "Cancel" look.
        outline: 'bg-transparent text-ink-900 border border-ink-900/70 hover:bg-ink-900 hover:text-paper',
      },
      size: {
        sm: 'text-body-sm py-2 px-4',
        md: 'text-body-md py-2.5 px-6',
        lg: 'text-body-md py-3.5 px-8',
      },
    },
    compoundVariants: [{ variant: 'link', className: 'py-0 px-0 active:scale-100' }],
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  as?: React.ElementType;
  /**
   * Small badge rendered before the label — e.g. the carbon pill's white play badge.
   * A light chip on dark fills, an ink chip on light fills, so it reads on any variant.
   */
  leadingIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, as: Comp = 'button', leadingIcon, children, ...props }, ref) => {
    const onDark = variant === 'dark' || variant === 'primary' || variant === 'gradient';
    return (
      <Comp ref={ref} className={cn(button({ variant, size }), className)} {...props}>
        {leadingIcon != null && (
          <span
            aria-hidden
            className={cn(
              'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm',
              onDark ? 'bg-white/20 text-current' : 'bg-ink-900/10 text-current'
            )}
          >
            {leadingIcon}
          </span>
        )}
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { button as buttonVariants };
