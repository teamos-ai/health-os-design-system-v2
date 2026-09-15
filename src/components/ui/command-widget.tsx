/**
 * CommandWidget: a larger search and ask input. A search row above a small toolbar
 * (add, search, chat on the left; voice and submit on the right).
 *
 * Decorative by default; pass `value`/`onChange` to control the input and `onSubmit` to
 * fire on Enter and on submit. The add, search, chat and voice buttons are pictures of a
 * toolbar and never take focus; the submit disc joins the tab order only when `onSubmit` is
 * set. The submit disc is the soft wash (brand-gradient-soft), Tumai's one exception to apricot
 * buttons. Show the "/" key hint only when the page really focuses the input on "/" (`shortcut`).
 */
import * as React from 'react';
import { Search, Plus, MessageCircle, Mic, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconBtn =
  'flex h-8 w-8 items-center justify-center rounded-md text-ink-500 transition-colors duration-sm ' +
  'hover:bg-ink-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900';

export interface CommandWidgetProps {
  className?: string;
  /** Controlled value — pass together with `onChange` to make the input live. */
  value?: string;
  /** Change handler — receives the current query string. */
  onChange?: (value: string) => void;
  /** Fires with the current query on Enter and on the submit-disc click. */
  onSubmit?: (value: string) => void;
  placeholder?: string;
  /** id for the input, e.g. so a page shortcut can focus it */
  id?: string;
  /** accessible name of the input */
  label?: string;
  /** show the "/" key hint: only when "/" really focuses this input */
  shortcut?: boolean;
}

export const CommandWidget = ({
  className,
  value,
  onChange,
  onSubmit,
  placeholder = 'Search the system: pricing, buttons, icons',
  id,
  label = 'Search the design system',
  shortcut = false,
}: CommandWidgetProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  // The toolbar is a picture of one; only a wired submit disc takes focus.
  const toolbarTabIndex = -1;

  const submit = () => onSubmit?.(inputRef.current?.value ?? '');

  return (
    <div className={cn('rounded-lg border border-line bg-surface p-3 shadow-md', className)}>
      {/* search row */}
      <div className="flex items-center gap-3 px-3 pb-3 pt-2">
        <Search className="h-5 w-5 shrink-0 text-ink-400" strokeWidth={1.5} aria-hidden />
        <input
          ref={inputRef}
          id={id}
          type="search"
          enterKeyHint="search"
          aria-label={label}
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
          className="w-full min-w-0 bg-transparent font-sans text-body text-ink-900 placeholder:text-ink-500 focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
        />
        {shortcut && (
          <kbd
            aria-hidden
            title="Press / to search"
            className="hidden shrink-0 rounded-md border border-line bg-paper px-2 py-1 font-sans text-label text-ink-600 sm:block"
          >
            /
          </kbd>
        )}
      </div>

      {/* toolbar row */}
      <div className="flex items-center justify-between border-t border-line px-1 pt-3">
        {/* decorative toolbar: hidden from assistive tech, never focusable */}
        <div className="flex items-center gap-1">
          <button type="button" aria-hidden tabIndex={toolbarTabIndex} className={iconBtn}>
            <Plus className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-hidden
            tabIndex={toolbarTabIndex}
            className="flex h-8 w-8 items-center justify-center rounded-md bg-apricot-50 text-ink-900 ring-1 ring-inset ring-apricot-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900"
          >
            <Search className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button type="button" aria-hidden tabIndex={toolbarTabIndex} className={iconBtn}>
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-hidden
            tabIndex={toolbarTabIndex}
            className={iconBtn}
          >
            <Mic className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label={onSubmit ? 'Search' : undefined}
            aria-hidden={onSubmit ? undefined : true}
            tabIndex={onSubmit ? undefined : -1}
            onClick={onSubmit ? submit : undefined}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-gradient-soft text-ink-900 ring-1 ring-inset ring-line transition-shadow duration-sm hover:shadow-sm hover:ring-apricot-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
};
