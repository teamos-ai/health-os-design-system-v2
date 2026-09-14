/**
 * Button: the three Health OS button styles, one colour everywhere.
 *
 *   primary    the one main action in a view. Apricot-200 (#F8C39C) with dark ink text,
 *              on every ground: light, paper and tinted panels.
 *   secondary  a supporting action beside a primary. Surface fill with a hairline.
 *   text       a low-emphasis action inside copy, cards and rows. Ink text on an apricot underline.
 *
 * Sizes: `default` everywhere, `small` only in dense areas (tables, toolbars, cards).
 * Every style supports `disabled` and `loading`. Same shape and behaviour in both themes.
 * Icon-only actions use <IconButton>. Pass `href` to render a link that looks like a button.
 */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const button = cva(
  'inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-md font-display text-body ' +
    'transition-[background-color,border-color,color,box-shadow,transform] duration-sm ease-out ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-paper ' +
    'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-apricot-200 text-ink-900 hover:bg-apricot-200/80',
        secondary: 'border border-line bg-surface text-ink-900 hover:border-ink-400',
        text: 'rounded-none text-ink-900 underline decoration-apricot-200 decoration-2 underline-offset-4 hover:decoration-ink-900 active:scale-100',
      },
      size: {
        default: 'h-11 px-6',
        small: 'h-9 px-4',
      },
    },
    compoundVariants: [
      { variant: 'text', size: 'default', className: 'h-auto px-0 py-2' },
      { variant: 'text', size: 'small', className: 'h-auto px-0 py-1' },
    ],
    defaultVariants: { variant: 'primary', size: 'default' },
  }
);

type Variants = VariantProps<typeof button>;

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    Variants {
  /** Render as a link with button styling. */
  href?: string;
  /** Icon before the label (16px). Replaced by the spinner while loading. */
  leadingIcon?: React.ReactNode;
  /** Icon after the label (16px), e.g. an arrow on a text button. */
  trailingIcon?: React.ReactNode;
  /** Shows a spinner, sets aria-busy and blocks clicks while keeping the label visible. */
  loading?: boolean;
}

const Spinner = () => (
  <svg aria-hidden viewBox="0 0 16 16" fill="none" className="h-4 w-4 shrink-0 animate-spin">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
    <path d="M14.5 8A6.5 6.5 0 0 0 8 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, href, leadingIcon, trailingIcon, loading = false, disabled, children, type, ...props },
    ref
  ) => {
    const classes = cn(button({ variant, size }), className);
    const content = (
      <>
        {loading ? <Spinner /> : leadingIcon}
        {children}
        {trailingIcon}
      </>
    );

    if (href) {
      const blocked = disabled || loading;
      const anchorProps = props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          {...anchorProps}
          href={blocked ? undefined : href}
          aria-disabled={blocked || undefined}
          aria-busy={loading || undefined}
          className={classes}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type={type ?? 'button'}
        className={classes}
        disabled={disabled || loading || undefined}
        aria-busy={loading || undefined}
        {...props}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { button as buttonVariants };
