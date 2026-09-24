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
          /* The visible track stays 40x24, which is the design. The HIT AREA is grown to 44x44
             by a pseudo-element, because 24px only just clears WCAG 2.5.8 (AA) and a switch is
             usually the control that changes the most on a screen: on the Health OS pricing
             table this one rewrites all three prices. `before:` rather than padding, so the
             track keeps its geometry and nothing around it moves. */
          'relative inline-flex h-6 w-10 shrink-0 items-center rounded-full border transition-colors duration-md ease-out',
          'before:absolute before:left-1/2 before:top-1/2 before:h-11 before:w-11 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[\'\']',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          on ? 'border-apricot-200 bg-apricot-200' : 'border-line bg-ink-100'
        )}
      >
        <span
          aria-hidden
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-surface shadow-sm transition-transform duration-md ease-out',
            on ? 'translate-x-[1.15rem]' : 'translate-x-1'
          )}
        />
      </button>
      {label && (
        <label htmlFor={fieldId} className={cn('font-sans text-body text-ink-900', !disabled && 'cursor-pointer')}>
          {label}
        </label>
      )}
    </span>
  );
};
