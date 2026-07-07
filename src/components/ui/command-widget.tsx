/**
 * CommandWidget — the rich command / "ask AI" search widget: a
 * search row (icon + placeholder + "/" hint) above a toolbar (add · search · chat on
 * the left; voice + a dark circular submit on the right). Flat hairline + soft shadow,
 * zero glass. The dark submit inverts to a light disc on the dark theme.
 *
 * Decorative by default; pass `value`/`onChange` to control the input and `onSubmit`
 * to fire on Enter and on the submit disc. With no handlers, the toolbar buttons drop
 * out of the tab order (tabIndex -1) so keyboard users don't tab through inert chrome.
 */
import * as React from 'react';
import { Search, Plus, MessageCircle, Mic, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconBtn =
  'flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition-colors duration-sm ' +
  'hover:bg-ink-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40';

export interface CommandWidgetProps {
  className?: string;
  /** Controlled value — pass together with `onChange` to make the input live. */
  value?: string;
  /** Change handler — receives the current query string. */
  onChange?: (value: string) => void;
  /** Fires with the current query on Enter and on the submit-disc click. */
  onSubmit?: (value: string) => void;
  placeholder?: string;
}

export const CommandWidget = ({
  className,
  value,
  onChange,
  onSubmit,
  placeholder = 'Search anything. Type @ for tokens and / for shortcuts',
}: CommandWidgetProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  // Decorative unless wired up — inert toolbar buttons leave the tab order.
  const interactive = value !== undefined || onChange !== undefined || onSubmit !== undefined;
  const toolbarTabIndex = interactive ? undefined : -1;

  const submit = () => onSubmit?.(inputRef.current?.value ?? '');

  return (
    <div className={cn('rounded-2xl border border-line bg-surface p-2.5 shadow-md', className)}>
      {/* search row */}
      <div className="flex items-center gap-3 px-3 pb-3 pt-2">
        <Search className="h-5 w-5 shrink-0 text-ink-400" strokeWidth={1.5} aria-hidden />
        <input
          ref={inputRef}
          type="text"
          aria-label="Search the design system"
          placeholder={placeholder}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          readOnly={value !== undefined && onChange === undefined}
          onKeyDown={
            onSubmit
              ? (e) => {
                  if (e.key === 'Enter') submit();
                }
              : undefined
          }
          className="w-full bg-transparent font-mono text-body-md text-ink-900 placeholder:text-ink-500 focus:outline-none"
        />
        <kbd
          aria-hidden
          className="hidden shrink-0 rounded-md border border-line bg-paper px-2 py-1 font-mono text-caption text-ink-600 sm:block"
        >
          /
        </kbd>
      </div>

      {/* toolbar row */}
      <div className="flex items-center justify-between border-t border-line px-1 pt-2.5">
        <div className="flex items-center gap-0.5">
          <button type="button" aria-label="Add" tabIndex={toolbarTabIndex} className={iconBtn}>
            <Plus className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Search"
            aria-pressed="true"
            tabIndex={toolbarTabIndex}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40"
          >
            <Search className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button type="button" aria-label="Chat" tabIndex={toolbarTabIndex} className={iconBtn}>
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Voice input"
            tabIndex={toolbarTabIndex}
            className={iconBtn}
          >
            <Mic className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Submit"
            tabIndex={toolbarTabIndex}
            onClick={onSubmit ? submit : undefined}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-carbon text-white transition-colors duration-sm hover:bg-carbon-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 dark:bg-ink-900 dark:text-paper dark:hover:bg-ink-700"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
};
