/**
 * FeatureCard: one benefit, told plainly.
 *
 * The icon sits in the top row in its accent colour, beside an optional tag that names
 * the area. The title and sentence settle at the bottom, so cards of different heights in
 * a bento or grid still line up along their text. No icon tile and no numbering: those are
 * the template tells this card avoids. Not a link; hover gives a quiet lift.
 */
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ACCENTS, type Accent } from '@/lib/accents';
import { cn } from '@/lib/utils';

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: Accent;
  /** names the area, top right: "Booking", "Follow-up" */
  tag?: string;
  className?: string;
}

export const FeatureCard = ({ icon: Icon, title, description, accent = 'rose', tag, className }: FeatureCardProps) => {
  const a = ACCENTS[accent];
  return (
    <div
      className={cn(
        'group flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-[box-shadow,transform,border-color] duration-md ease-out hover:-translate-y-1 hover:border-ink-200 hover:shadow-sm',
        className
      )}
    >
      <div className="flex min-h-6 items-center justify-between gap-3">
        <Icon className={cn('h-6 w-6 transition-transform duration-md ease-out group-hover:-translate-y-px', a.text)} strokeWidth={1.5} aria-hidden />
        {tag && (
          <Badge variant={a.badge} size="sm">
            {tag}
          </Badge>
        )}
      </div>
      <div className="mt-auto pt-10">
        <h3 className="font-display text-subheading text-ink-900">{title}</h3>
        <p className="mt-2 font-sans text-body text-ink-600">{description}</p>
      </div>
    </div>
  );
};
