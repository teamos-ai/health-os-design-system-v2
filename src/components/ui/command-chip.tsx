/**
 * CommandChip: a quick-action suggestion under a command bar, written as a `/command`.
 * Surface fill, hairline, Anonymous Pro, the leading slash in apricot. Renders a button;
 * pass `onClick` to run the command.
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
        'group inline-flex items-center gap-2 rounded-md border border-line bg-surface',
        'px-4 py-2 font-sans text-body text-ink-600',
        'transition-[border-color,color,box-shadow,transform] duration-sm ease-out hover:border-ink-400 hover:text-ink-900 hover:shadow-sm',
        'active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apricot-400',
        className
      )}
      {...props}
    >
      <span className="font-bold text-apricot-400">/</span>
      <span>{command}</span>
    </button>
  )
);
CommandChip.displayName = 'CommandChip';
