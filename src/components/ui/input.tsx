/**
 * Input — flat hairline field. 8px radius, 1px line, brand focus ring (no glow).
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
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="font-mono text-caption text-ink-700">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon
              className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-400"
              strokeWidth={1.5}
              aria-hidden
            />
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-md border bg-surface font-sans text-body-md text-ink-900',
              'placeholder:text-ink-500 transition-colors duration-sm ease-out',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/35 focus-visible:border-brand-400',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              Icon ? 'pl-11 pr-4' : 'px-4',
              'py-2.5',
              error ? 'border-danger-600' : 'border-line',
              className
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            {...props}
          />
        </div>
        {error && (
          <p id={errorId} aria-live="polite" className="font-mono text-caption text-danger-600">
            {error}
          </p>
        )}
        {/* The hint stays visible alongside an error — it's guidance, not state. */}
        {hint && (
          <p
            id={hintId}
            className={cn('font-mono text-caption', error ? 'text-ink-500' : 'text-ink-600')}
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
