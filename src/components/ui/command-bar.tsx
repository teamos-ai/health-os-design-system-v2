/**
 * CommandBar: the command-palette search input. A leading search icon, a mono
 * placeholder and a trailing ⌘K hint. `size="hero"` for a hero, `size="md"` in a nav.
 * A real, focusable input: wire `value` and `onChange` to make it live.
 */
import * as React from 'react';
import { Search } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const bar = cva(
  'group flex items-center gap-3 rounded-lg border border-line bg-surface ' +
    'transition-[border-color,box-shadow,opacity] duration-md ease-out shadow-sm has-[:disabled]:opacity-60 ' +
    'focus-within:border-ink-900 focus-within:shadow-md focus-within:ring-1 focus-within:ring-ink-900',
  {
    variants: {
      size: {
        hero: 'px-5 py-4',
        md: 'px-4 py-3',
      },
    },
    defaultVariants: { size: 'hero' },
  }
);

export interface CommandBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof bar> {
  /** show the trailing ⌘K hint (default true) */
  shortcut?: boolean;
  containerClassName?: string;
}

export const CommandBar = React.forwardRef<HTMLInputElement, CommandBarProps>(
  (
    {
      size,
      shortcut = true,
      className,
      containerClassName,
      placeholder = 'Search the platform, or type / for commands',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const iconSize = size === 'md' ? 18 : 22;
    return (
      <div className={cn(bar({ size }), containerClassName)}>
        <Search
          className="shrink-0 text-ink-400 transition-colors group-focus-within:text-ink-900"
          width={iconSize}
          height={iconSize}
          strokeWidth={1.5}
          aria-hidden
        />
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          aria-label={ariaLabel ?? 'Search the platform'}
          className={cn(
            'w-full bg-transparent font-sans text-ink-900 placeholder:text-ink-500 focus:outline-none',
            'text-body',
            className
          )}
          {...props}
        />
        {shortcut && (
          <kbd
            aria-hidden
            className={cn(
              'hidden shrink-0 items-center gap-1 rounded-md border border-line bg-paper',
              'px-2 py-1 font-sans text-label text-ink-600 sm:inline-flex'
            )}
          >
            ⌘K
          </kbd>
        )}
      </div>
    );
  }
);
CommandBar.displayName = 'CommandBar';
