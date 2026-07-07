/**
 * RadioGroup — Health OS v2.
 *
 * A labelled set of single-choice options built on real `<input type="radio">`s
 * (native keyboard + form semantics). Custom-drawn circle: hairline ring at rest,
 * `brand-600` ring + filled dot when selected. `role`/`aria` come from the native
 * inputs + a `fieldset`/`legend`. Reduced-motion safe.
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  hint?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  legend: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export const RadioGroup = ({
  name,
  legend,
  options,
  value,
  defaultValue,
  onValueChange,
  className,
}: RadioGroupProps) => {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? '');
  const current = isControlled ? value : internal;

  const select = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <fieldset className={cn('flex flex-col gap-3', className)}>
      <legend className="mb-1 font-mono text-caption text-ink-700">{legend}</legend>
      {options.map((o) => {
        const id = `${name}-${o.value}`;
        return (
          <label
            key={o.value}
            htmlFor={id}
            className={cn(
              'group inline-flex cursor-pointer items-start gap-2.5 font-mono text-body-sm text-ink-900',
              o.disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            <span className="relative mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center">
              <input
                id={id}
                type="radio"
                name={name}
                value={o.value}
                checked={current === o.value}
                disabled={o.disabled}
                onChange={() => select(o.value)}
                className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-full border border-line bg-surface transition-colors duration-sm ease-out checked:border-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed"
              />
              <span className="pointer-events-none relative h-2 w-2 scale-0 rounded-full bg-brand-600 transition-transform duration-sm ease-out peer-checked:scale-100" />
            </span>
            <span className="flex flex-col">
              <span>{o.label}</span>
              {o.hint && <span className="text-caption text-ink-500">{o.hint}</span>}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
};
