/**
 * Bento — a calm 3-column bento grid. BentoGrid is the responsive
 * container; BentoCard is a flat hairline cell with a coloured icon well, title and
 * body, spanning 1–3 columns. Soft hover lift, zero glass. Spans use literal classes
 * so Tailwind keeps them.
 */
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ACCENTS, type Accent } from '@/lib/accents';
import { cn } from '@/lib/utils';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div
    className={cn(
      'grid grid-cols-1 gap-4 md:grid-cols-2 md:auto-rows-[minmax(220px,auto)] lg:grid-cols-3',
      className
    )}
  >
    {children}
  </div>
);

/* Spans track the grid steps: full-span cards cap at 2 on the md 2-col grid. */
const SPAN: Record<1 | 2 | 3, string> = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-2 lg:col-span-3',
};

export interface BentoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  accent?: Accent;
  span?: 1 | 2 | 3;
  className?: string;
  children?: ReactNode;
}

export const BentoCard = ({
  title,
  description,
  icon: Icon,
  accent = 'rose',
  span = 1,
  className,
  children,
}: BentoCardProps) => {
  const a = ACCENTS[accent];
  return (
    <div
      className={cn(
        'group flex flex-col gap-4 rounded-xl border border-line bg-surface p-6 md:p-7',
        'transition-all duration-md ease-out hover:border-ink-300 hover:shadow-md',
        SPAN[span],
        className
      )}
    >
      <span className={cn('flex h-12 w-12 items-center justify-center rounded-md', a.well)}>
        <Icon width={22} height={22} strokeWidth={1.5} aria-hidden />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-h4 text-ink-900">{title}</h3>
        <p className="max-w-reading font-sans text-body-md leading-relaxed text-ink-600">{description}</p>
      </div>
      {children}
    </div>
  );
};
