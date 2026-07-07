/**
 * Tabs — Health OS v2.
 *
 * ARIA-correct tabs with panels (`role="tablist"` / `tab` / `tabpanel`) — the right
 * pattern when a selection swaps content (SegmentedControl is for a value with no panel).
 * Roving tabindex, Arrow/Home/End keys, focus-follows-selection. The active tab carries a
 * `brand-600` underline that slides in; panels fade + rise on change (dur-md, reduced-motion
 * safe via the global guard).
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  'aria-label': string;
  className?: string;
}

export const Tabs = ({ items, value, defaultValue, onValueChange, 'aria-label': ariaLabel, className }: TabsProps) => {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value);
  const active = isControlled ? value : internal;
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = React.useId();

  const select = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const enabled = items.map((t, i) => ({ t, i })).filter(({ t }) => !t.disabled);
    const pos = enabled.findIndex(({ i }) => i === index);
    let nextPos = pos;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextPos = (pos + 1) % enabled.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') nextPos = (pos - 1 + enabled.length) % enabled.length;
    else if (e.key === 'Home') nextPos = 0;
    else if (e.key === 'End') nextPos = enabled.length - 1;
    else return;
    e.preventDefault();
    const target = enabled[nextPos];
    select(target.t.value);
    refs.current[target.i]?.focus();
  };

  return (
    <div className={className}>
      <div role="tablist" aria-label={ariaLabel} className="flex gap-1 border-b border-line">
        {items.map((tab, i) => {
          const isActive = tab.value === active;
          return (
            <button
              key={tab.value}
              ref={(el) => (refs.current[i] = el)}
              role="tab"
              type="button"
              id={`${baseId}-tab-${tab.value}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${tab.value}`}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => select(tab.value)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                'relative -mb-px px-4 py-2.5 font-mono text-body-sm transition-colors duration-sm ease-out',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
                'disabled:cursor-not-allowed disabled:opacity-40',
                isActive ? 'text-brand-700' : 'text-ink-500 hover:text-ink-900'
              )}
            >
              {tab.label}
              <span
                aria-hidden
                className={cn(
                  'absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-600 transition-opacity duration-md ease-out',
                  isActive ? 'opacity-100' : 'opacity-0'
                )}
              />
            </button>
          );
        })}
      </div>
      {items.map((tab) => (
        <div
          key={tab.value}
          role="tabpanel"
          id={`${baseId}-panel-${tab.value}`}
          aria-labelledby={`${baseId}-tab-${tab.value}`}
          hidden={tab.value !== active}
          tabIndex={0}
          className="pt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          {tab.value === active && (
            <div className="motion-safe:animate-enter-rise">{tab.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};
