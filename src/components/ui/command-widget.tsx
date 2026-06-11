/**
 * CommandWidget — the rich command / "ask AI" search widget: a
 * search row (icon + placeholder + "/" hint) above a toolbar (add · search · chat on
 * the left; voice + a dark circular submit on the right). Flat hairline + soft shadow,
 * zero glass. The dark submit inverts to a light disc on the dark theme.
 */
import { Search, Plus, MessageCircle, Mic, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconBtn =
  'flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition-colors duration-sm ' +
  'hover:bg-ink-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40';

export const CommandWidget = ({ className }: { className?: string }) => (
  <div className={cn('rounded-2xl border border-line bg-surface p-2.5 shadow-md', className)}>
    {/* search row */}
    <div className="flex items-center gap-3 px-3 pb-3 pt-2">
      <Search className="h-5 w-5 shrink-0 text-ink-400" strokeWidth={1.5} aria-hidden />
      <input
        type="text"
        aria-label="Search the design system"
        placeholder="Search anything. Type @ for tokens and / for shortcuts"
        className="w-full bg-transparent font-mono text-body-md text-ink-900 placeholder:text-ink-500 focus:outline-none"
      />
      <kbd className="hidden shrink-0 rounded-md border border-line bg-paper px-2 py-1 font-mono text-caption text-ink-600 sm:block">
        /
      </kbd>
    </div>

    {/* toolbar row */}
    <div className="flex items-center justify-between border-t border-line px-1 pt-2.5">
      <div className="flex items-center gap-0.5">
        <button type="button" aria-label="Add" className={iconBtn}>
          <Plus className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Search"
          aria-pressed="true"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40"
        >
          <Search className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <button type="button" aria-label="Chat" className={iconBtn}>
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
      <div className="flex items-center gap-1.5">
        <button type="button" aria-label="Voice input" className={iconBtn}>
          <Mic className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Submit"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-carbon text-white transition-transform duration-sm hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 dark:bg-ink-900 dark:text-paper"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  </div>
);
