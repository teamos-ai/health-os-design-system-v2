/**
 * Skeleton — Health OS v2.
 *
 * Loading placeholders that match the shape of the content they stand in for — the calm
 * alternative to a spinner. A tonal `animate-shimmer` sheen (the sanctioned skeleton loop,
 * frozen under reduced motion). `SkeletonText` renders N lines; `SkeletonCard` a common
 * media-plus-text card outline. Always give the loading container an `aria-busy` + a
 * visually-hidden "Loading…" so screen readers know to wait.
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** shape — a rounded rect (default) or a circle */
  circle?: boolean;
}

export const Skeleton = ({ className, circle, ...props }: SkeletonProps) => (
  <div
    aria-hidden
    className={cn(
      'animate-shimmer bg-[length:200%_100%] bg-gradient-to-r from-ink-100 via-surface-2 to-ink-100',
      circle ? 'rounded-full' : 'rounded-md',
      className
    )}
    {...props}
  />
);

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export const SkeletonText = ({ lines = 3, className }: SkeletonTextProps) => (
  <div className={cn('flex flex-col gap-2.5', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={cn('h-3.5', i === lines - 1 ? 'w-3/5' : 'w-full')} />
    ))}
  </div>
);

export const SkeletonCard = ({ className }: { className?: string }) => (
  <div
    role="status"
    aria-busy="true"
    className={cn('rounded-lg border border-line bg-surface p-5', className)}
  >
    <span className="sr-only">Loading</span>
    <Skeleton className="mb-4 aspect-video w-full" />
    <Skeleton className="mb-3 h-5 w-2/3" />
    <SkeletonText lines={2} />
  </div>
);
