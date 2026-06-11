/**
 * ImageWash — a draft image placeholder. A rounded tile carrying a CSS background wash
 * (gradient/glow from the signature family) under subtle grain, with an optional label
 * and icon. Stands in for photography until real shoots land. Decorative.
 */
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ImageWashProps {
  background: string;
  label?: string;
  note?: string;
  icon?: LucideIcon;
  /** aspect ratio, e.g. '4/3', '16/9', '1/1' */
  ratio?: string;
  dark?: boolean;
  className?: string;
}

export const ImageWash = ({
  background,
  label,
  note,
  icon: Icon,
  ratio = '4/3',
  dark = false,
  className,
}: ImageWashProps) => (
  <div
    className={cn('grain relative overflow-hidden rounded-lg border border-line', className)}
    style={{ background, aspectRatio: ratio }}
  >
    {(label || Icon) && (
      <div className="absolute inset-0 z-10 flex flex-col justify-end gap-1 p-4">
        {Icon && (
          <Icon
            className={cn('mb-1 h-5 w-5', dark ? 'text-white/80' : 'text-ink-700')}
            strokeWidth={1.5}
            aria-hidden
          />
        )}
        {label && (
          <span className={cn('font-display text-body-md font-medium', dark ? 'text-white' : 'text-ink-900')}>
            {label}
          </span>
        )}
        {note && (
          <span className={cn('font-mono text-caption', dark ? 'text-white/60' : 'text-ink-600')}>
            {note}
          </span>
        )}
      </div>
    )}
  </div>
);
