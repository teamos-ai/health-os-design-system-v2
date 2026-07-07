/**
 * Select — Health OS v2.
 *
 * A styled native `<select>` (native = accessible + mobile-correct by default). Same
 * hairline + focus language as Input, a Lucide chevron overlaid on the right, mono body,
 * `rounded-md`. Optional label / hint / error wired to `aria-describedby`.
 */
import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, hint, error, id, options, placeholder, defaultValue, value, ...props }, ref) => {
    const autoId = React.useId();
    const fieldId = id ?? autoId;
    const hintId = `${fieldId}-hint`;
    const errorId = `${fieldId}-error`;
    const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined;

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={fieldId} className="font-mono text-caption text-ink-700">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={fieldId}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            defaultValue={defaultValue ?? (placeholder ? '' : undefined)}
            value={value}
            className={cn(
              'w-full appearance-none rounded-md border bg-surface py-2.5 pl-4 pr-10 font-mono text-body-md text-ink-900',
              'transition-colors duration-sm ease-out',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/35 focus-visible:ring-offset-1 focus-visible:ring-offset-paper',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error ? 'border-danger-600 focus-visible:border-danger-600' : 'border-line focus-visible:border-brand-400',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((o) => (
              <option key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500"
            strokeWidth={1.5}
            aria-hidden
          />
        </div>
        {error && (
          <p id={errorId} aria-live="polite" className="font-mono text-caption text-danger-700">
            {error}
          </p>
        )}
        {hint && (
          <p id={hintId} className="font-mono text-caption text-ink-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';
