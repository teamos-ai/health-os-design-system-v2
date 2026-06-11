/**
 * ToolCard — a single "thing Health OS replaces" card for the horizontal carousel
 * (efficient.app app-card craft, Health OS skin). Coloured icon tile + tool name +
 * meta line + a small accent badge. Rounded hairline, soft hover lift, zero glass.
 */
import type { LucideIcon } from 'lucide-react';
import { ACCENTS, type Accent } from '@/lib/accents';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface ToolCardProps {
  name: string;
  meta: string;
  icon: LucideIcon;
  accent?: Accent;
  badge?: string;
  className?: string;
}

export const ToolCard = ({ name, meta, icon: Icon, accent = 'rose', badge = 'Replaces', className }: ToolCardProps) => {
  const a = ACCENTS[accent];
  return (
    <article
      className={cn(
        'flex w-72 shrink-0 flex-col gap-4 rounded-lg border border-line bg-surface p-5',
        'transition-all duration-md ease-out hover:border-ink-300 hover:shadow-md',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span className={cn('flex h-12 w-12 items-center justify-center rounded-md', a.well)}>
          <Icon width={22} height={22} strokeWidth={1.5} aria-hidden />
        </span>
        <Badge variant={a.badge} size="sm">
          {badge}
        </Badge>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-h4 text-ink-900">{name}</h3>
        <p className="font-mono text-body-sm text-ink-600">{meta}</p>
      </div>
    </article>
  );
};
