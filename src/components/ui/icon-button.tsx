/**
 * IconButton: a square, icon-only button that mirrors the three Button styles.
 *
 *   primary    a main action shown as an icon (play, send). Rose, or carbon with tone="neutral".
 *   secondary  a supporting icon action on a surface (copy, filter, more).
 *   text       a quiet icon action inside rows, toolbars and headers (close, menu).
 *
 * `aria-label` is required because there is no visible text. Sizes: default 44px, small 36px.
 */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const iconButton = cva(
  'inline-flex shrink-0 items-center justify-center rounded-md transition-[background-color,border-color,color,transform] duration-sm ease-out ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper ' +
    'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'text-white',
        secondary: 'border border-line bg-surface text-ink-900 hover:border-ink-400',
        text: 'text-ink-600 hover:bg-ink-100 hover:text-ink-900',
      },
      tone: { brand: '', neutral: '' },
      size: { default: 'h-11 w-11', small: 'h-9 w-9' },
    },
    compoundVariants: [
      { variant: 'primary', tone: 'brand', className: 'bg-rose-700 hover:bg-rose-700/90' },
      { variant: 'primary', tone: 'neutral', className: 'bg-carbon hover:bg-carbon/85' },
    ],
    defaultVariants: { variant: 'secondary', tone: 'brand', size: 'default' },
  }
);

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'>,
    VariantProps<typeof iconButton> {
  /** Accessible name. Icon-only buttons have no text, so this is required. */
  'aria-label': string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, tone, size, type, ...props }, ref) => (
    <button ref={ref} type={type ?? 'button'} className={cn(iconButton({ variant, tone, size }), className)} {...props} />
  )
);
IconButton.displayName = 'IconButton';

export { iconButton as iconButtonVariants };
