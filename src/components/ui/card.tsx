/**
 * Card — flat hairline surface. 1px line border, soft NEUTRAL shadow on hover only.
 * Zero glass, no coloured shadow. `interactive` adds the hover lift + border darken.
 *
 * Compose with CardHeader / CardTitle / CardDescription / CardContent / CardFooter,
 * or just drop children in. `tone="ivory"` for a paper-tinted surface on white grounds.
 */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const card = cva('relative border transition-all duration-md ease-out', {
  variants: {
    tone: {
      surface: 'bg-surface border-line',
      ivory: 'bg-paper border-line',
      soft: 'bg-line-soft border-line-soft',
    },
    radius: { lg: 'rounded-lg', xl: 'rounded-xl', '2xl': 'rounded-2xl' },
    padding: { none: 'p-0', sm: 'p-4', md: 'p-6', lg: 'p-8' },
    interactive: { true: 'hover:border-ink-300 hover:shadow-md', false: '' },
  },
  defaultVariants: { tone: 'surface', radius: 'lg', padding: 'md', interactive: false },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof card> {
  as?: React.ElementType;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, tone, radius, padding, interactive, as: Comp = 'div', ...props }, ref) => (
    <Comp ref={ref} className={cn(card({ tone, radius, padding, interactive }), className)} {...props} />
  )
);
Card.displayName = 'Card';

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4 flex flex-col gap-1.5', className)} {...props} />
);

export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('font-display text-h4 text-ink-900', className)} {...props} />
);

export const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('font-sans text-body-sm text-ink-500 leading-relaxed', className)} {...props} />
);

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('font-sans text-body-md text-ink-600', className)} {...props} />
);

export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-5 flex items-center gap-3', className)} {...props} />
);
