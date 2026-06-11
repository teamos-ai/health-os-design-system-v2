/**
 * Button — Health OS v2.
 *
 * Marketing CTA = `variant="primary"` + `size="lg"` (pill). The efficient.app dark
 * pill = `variant="dark"`. The signature apricot→rose→lavender CTA = `variant="gradient"`
 * (use sparingly — one per view). Product UI button = `size="md"` + `rounded="md"`.
 *
 * Rules: primary = brand-600 (AA on ivory/white), hover brand-700, active scale 0.98.
 * No coloured shadows. Focus ring brand-600 @ 40%. Don't stack two primary CTAs in a row.
 */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const button = cva(
  'inline-flex items-center justify-center gap-2 font-display font-medium select-none ' +
    'transition-all duration-sm ease-out ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 ' +
    'focus-visible:ring-offset-2 focus-visible:ring-offset-paper ' +
    'disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-brand-600 text-white hover:bg-brand-700',
        secondary: 'bg-surface text-ink-900 border border-line hover:border-ink-300 hover:shadow-sm',
        ghost: 'bg-transparent text-ink-900 hover:bg-ink-100',
        dark: 'bg-carbon text-white hover:bg-carbon-800 dark:bg-ink-900 dark:text-paper dark:hover:bg-ink-700',
        gradient: 'bg-brand-gradient text-white hover:brightness-[1.04] shadow-sm',
        link: 'bg-transparent text-accent hover:opacity-80 underline underline-offset-4 decoration-1 p-0',
        danger: 'bg-danger-600 text-white hover:brightness-95',
      },
      size: {
        sm: 'text-body-sm py-2 px-4',
        md: 'text-body-md py-2.5 px-6',
        lg: 'text-body-md py-3.5 px-8',
      },
      rounded: { full: 'rounded-full', md: 'rounded-md' },
    },
    compoundVariants: [{ variant: 'link', className: 'py-0 px-0 active:scale-100' }],
    defaultVariants: { variant: 'primary', size: 'md', rounded: 'full' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  as?: React.ElementType;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, as: Comp = 'button', ...props }, ref) => (
    <Comp ref={ref} className={cn(button({ variant, size, rounded }), className)} {...props} />
  )
);
Button.displayName = 'Button';
