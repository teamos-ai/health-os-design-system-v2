/**
 * FeatureCard — icon well + title + body. The workhorse of feature grids and bento
 * cells. Optional numbered overline for the "01 02 03" rhythm. Flat hairline, soft
 * hover, zero glass. Sentence-case copy, calm Sage voice.
 */
import type { LucideIcon } from 'lucide-react';
import { ACCENTS, type Accent } from '@/lib/accents';
import { MonoLabel } from '@/components/ui/mono-label';
import { cn } from '@/lib/utils';

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: Accent;
  number?: string;
  eyebrow?: string;
  className?: string;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  accent = 'rose',
  number,
  eyebrow,
  className,
}: FeatureCardProps) => {
  const a = ACCENTS[accent];
  return (
    <div
      className={cn(
        'group flex h-full flex-col gap-4 rounded-lg border border-line bg-surface p-6',
        'transition-all duration-md ease-out hover:border-ink-300 hover:shadow-md',
        className
      )}
    >
      <span className={cn('flex h-12 w-12 items-center justify-center rounded-md', a.well)}>
        <Icon width={22} height={22} strokeWidth={1.5} aria-hidden />
      </span>
      <div className="flex flex-col gap-2">
        {(number || eyebrow) && (
          <MonoLabel number={number}>{eyebrow}</MonoLabel>
        )}
        <h3 className="font-display text-h4 text-ink-900">{title}</h3>
        <p className="font-sans text-body-md leading-relaxed text-ink-600">{description}</p>
      </div>
    </div>
  );
};
