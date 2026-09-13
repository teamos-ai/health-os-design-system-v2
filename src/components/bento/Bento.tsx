/**
 * Bento: a responsive grid for composing cards at different sizes.
 * BentoGrid is the container (1 column, 2 from md, 3 from lg). BentoCell sets how many
 * columns a card spans. Give every item exactly one cell: no empty tiles.
 */
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const BentoGrid = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={cn('grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3', className)}>{children}</div>
);

/* Literal classes so Tailwind keeps them. A 3-span caps at 2 on the md grid. */
const SPAN: Record<1 | 2 | 3, string> = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-2 lg:col-span-3',
};

export const BentoCell = ({ span = 1, className, children }: { span?: 1 | 2 | 3; className?: string; children: ReactNode }) => (
  <div className={cn('min-w-0', SPAN[span], className)}>{children}</div>
);
