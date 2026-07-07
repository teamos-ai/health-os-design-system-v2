/**
 * IconButton — Health OS v2.
 *
 * Square, icon-only. Carbon by default — the screenshot's solid play button. Fixed
 * box dimensions per size (h/w) so the target is predictable regardless of the icon
 * child. `aria-label` is required, since there is no visible text.
 *
 * 8px squircle, neutral focus ring, active scale, reduced-motion safe (no JS motion).
 * Accent variant auto-themes through the same --btn-accent-* vars as Button.
 */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const iconButton = cva(
  'inline-flex shrink-0 items-center justify-center rounded-md ' +
    'transition-all duration-sm ease-out active:scale-[0.98] ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 ' +
    'focus-visible:ring-offset-2 focus-visible:ring-offset-paper ' +
    'disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        dark: 'bg-carbon text-white hover:bg-carbon-800 dark:bg-ink-900 dark:text-paper dark:hover:bg-ink-700',
        outline: 'border border-ink-900/70 text-ink-900 hover:bg-ink-900 hover:text-paper',
        soft: 'bg-ink-100 text-ink-600 hover:bg-ink-200 hover:text-ink-700',
        ghost: 'text-ink-700 hover:bg-ink-100 hover:text-ink-900',
        accent:
          'bg-[var(--btn-accent-bg)] text-[var(--btn-accent-fg)] hover:bg-[var(--btn-accent-bg-hover)] ' +
          'focus-visible:ring-[var(--btn-accent-ring)]',
      },
      size: { sm: 'h-10 w-10', md: 'h-11 w-11', lg: 'h-12 w-12' },
    },
    defaultVariants: { variant: 'dark', size: 'md' },
  }
);

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'>,
    VariantProps<typeof iconButton> {
  as?: React.ElementType;
  /** Accessible name — icon-only buttons have no text, so this is required. */
  'aria-label': string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, as: Comp = 'button', ...props }, ref) => (
    <Comp ref={ref} className={cn(iconButton({ variant, size }), className)} {...props} />
  )
);
IconButton.displayName = 'IconButton';

export { iconButton as iconButtonVariants };
