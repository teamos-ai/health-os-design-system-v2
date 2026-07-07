/**
 * Tooltip — Health OS v2.
 *
 * A small carbon label that appears on hover AND focus (keyboard-reachable), positioned
 * top/bottom/left/right. Fade + 4px rise, dur-md. Uses `role="tooltip"` + `aria-describedby`
 * so screen readers announce it with the trigger. Carbon ground → white text (AA-safe),
 * `rounded-md`, `shadow-md`. Not for interactive content (use a popover/dialog for that).
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

type Side = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  label: string;
  side?: Side;
  children: React.ReactElement;
  className?: string;
}

const SIDE: Record<Side, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export const Tooltip = ({ label, side = 'top', children, className }: TooltipProps) => {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();

  const trigger = React.cloneElement(children, {
    'aria-describedby': open ? id : undefined,
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
  } as React.HTMLAttributes<HTMLElement>);

  return (
    <span className="relative inline-flex">
      {trigger}
      <span
        role="tooltip"
        id={id}
        className={cn(
          'pointer-events-none absolute z-40 w-max max-w-xs rounded-md bg-carbon px-2.5 py-1.5 font-mono text-caption text-white shadow-md',
          'transition-[opacity,transform] duration-md ease-out',
          SIDE[side],
          open ? 'opacity-100' : 'opacity-0',
          // start the rise offset from the resting position, per side
          !open && (side === 'top' ? 'translate-y-1' : side === 'bottom' ? '-translate-y-1' : ''),
          className
        )}
      >
        {label}
      </span>
    </span>
  );
};
