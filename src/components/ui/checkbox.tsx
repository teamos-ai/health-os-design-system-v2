/**
 * Checkbox — Health OS v2.
 *
 * A real `<input type="checkbox">` (accessible + form-native) with a custom-drawn box:
 * hairline square at rest, `brand-600` fill + white Lucide check when checked. 8px radius,
 * brand focus ring, sentence-case label to the right. Reduced-motion safe (the check just
 * appears — no bounce).
 */
import * as React from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  /** render an indeterminate (mixed) state */
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, indeterminate, id, checked, disabled, ...props }, ref) => {
    const autoId = React.useId();
    const fieldId = id ?? autoId;
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);
    React.useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = Boolean(indeterminate);
    }, [indeterminate]);

    return (
      <label
        htmlFor={fieldId}
        className={cn(
          'group inline-flex cursor-pointer items-center gap-2.5 font-mono text-body-sm text-ink-900',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            ref={innerRef}
            id={fieldId}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-md border border-line bg-surface transition-colors duration-sm ease-out checked:border-brand-600 checked:bg-brand-600 indeterminate:border-brand-600 indeterminate:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed"
            {...props}
          />
          {indeterminate ? (
            <Minus className="pointer-events-none relative h-3.5 w-3.5 text-white opacity-100" strokeWidth={2.5} aria-hidden />
          ) : (
            <Check
              className="pointer-events-none relative h-3.5 w-3.5 text-white opacity-0 transition-opacity duration-sm ease-out peer-checked:opacity-100"
              strokeWidth={2.5}
              aria-hidden
            />
          )}
        </span>
        {label && <span>{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';
