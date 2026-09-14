/**
 * Input: a flat hairline field. 8px radius, 1px line; focus draws an ink-900 edge (no glow).
 * Optional label, hint, error and a leading Lucide icon. Anonymous Pro throughout.
 */
import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: LucideIcon;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, icon: Icon, id, ...props }, ref) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;
    const describedBy =
      [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined;
    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="font-sans text-label text-ink-900">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon
              className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-400"
              strokeWidth={1.5}
              aria-hidden
            />
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-md border bg-surface font-sans text-body text-ink-900',
              'placeholder:text-ink-500 transition-colors duration-sm ease-out',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink-900 focus-visible:border-ink-900',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              Icon ? 'pl-11 pr-4' : 'px-4',
              'py-3',
              error ? 'border-error-600' : 'border-line',
              className
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            {...props}
          />
        </div>
        {error && (
          <p id={errorId} aria-live="polite" className="font-sans text-label text-error-600">
            {error}
          </p>
        )}
        {/* The hint stays visible alongside an error — it's guidance, not state. */}
        {hint && (
          <p
            id={hintId}
            className={cn('font-sans text-label', error ? 'text-ink-500' : 'text-ink-600')}
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
