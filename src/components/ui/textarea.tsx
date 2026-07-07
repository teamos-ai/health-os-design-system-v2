/**
 * Textarea — Health OS v2.
 *
 * The multi-line sibling of Input. Same hairline + focus-ring language, mono body,
 * `rounded-md`. Optional label (sentence case, above), hint and error wired to
 * `aria-describedby`; error takes over the border and colour, the hint stays visible.
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, id, rows = 4, ...props }, ref) => {
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
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'w-full resize-y rounded-md border bg-surface px-4 py-3 font-mono text-body-md text-ink-900',
            'placeholder:text-ink-400 transition-colors duration-sm ease-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/35 focus-visible:ring-offset-1 focus-visible:ring-offset-paper',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-danger-600 focus-visible:border-danger-600' : 'border-line focus-visible:border-brand-400',
            className
          )}
          {...props}
        />
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
Textarea.displayName = 'Textarea';
