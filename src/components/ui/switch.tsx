/**
 * Switch — Health OS v2.
 *
 * An on/off toggle built on `role="switch"` semantics. A hairline track that fills
 * `brand-600` when on, with a sliding white thumb (transform only, dur-md — GPU-safe,
 * reduced-motion frozen by the global guard). Optional sentence-case label. For binary
 * settings; use RadioGroup / SegmentedControl for a choice among options.
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  'aria-label'?: string;
}

export const Switch = ({
  checked,
  defaultChecked,
  onCheckedChange,
  label,
  disabled,
  id,
  className,
  'aria-label': ariaLabel,
}: SwitchProps) => {
  const autoId = React.useId();
  const fieldId = id ?? autoId;
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(Boolean(defaultChecked));
  const on = isControlled ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <span className={cn('inline-flex items-center gap-3', disabled && 'opacity-50', className)}>
      <button
        type="button"
        role="switch"
        id={fieldId}
        aria-checked={on}
        aria-label={ariaLabel ?? label}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          'relative inline-flex h-6 w-10 shrink-0 items-center rounded-full border transition-colors duration-md ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          on ? 'border-brand-600 bg-brand-600' : 'border-line bg-ink-100'
        )}
      >
        <span
          aria-hidden
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-md ease-out',
            on ? 'translate-x-[1.15rem]' : 'translate-x-1'
          )}
        />
      </button>
      {label && (
        <label htmlFor={fieldId} className={cn('font-mono text-body-sm text-ink-900', !disabled && 'cursor-pointer')}>
          {label}
        </label>
      )}
    </span>
  );
};
