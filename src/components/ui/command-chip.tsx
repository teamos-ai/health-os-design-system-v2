/**
 * CommandChip — the `/command` pill. A pill (rounded-full) BY DESIGN — quick-action
 * chips are one of the sanctioned pill shapes. Light surface, hairline border,
 * Anonymous Pro, the leading "/" picked out in rose. Sits beneath the command bar as
 * a quick-action suggestion. Renders a button; pass `onClick` to wire it.
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CommandChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** the command text WITHOUT the leading slash, e.g. "set up online booking" */
  command: string;
}

export const CommandChip = React.forwardRef<HTMLButtonElement, CommandChipProps>(
  ({ command, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        'group inline-flex items-center gap-1.5 rounded-full border border-line bg-surface',
        'px-3.5 py-2 font-mono text-body-sm text-ink-600',
        'transition-all duration-sm ease-out hover:border-ink-300 hover:text-ink-900 hover:shadow-sm',
        'active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/35',
        className
      )}
      {...props}
    >
      <span className="font-bold text-accent">/</span>
      <span>{command}</span>
    </button>
  )
);
CommandChip.displayName = 'CommandChip';
