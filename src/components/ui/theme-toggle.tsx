/**
 * ThemeToggle: a two-position switch between Light (white ground) and Paper (warm ivory).
 * A radiogroup: arrow keys move between modes and focus follows the selection.
 */
import * as React from 'react';
import { Sun, FileText, type LucideIcon } from 'lucide-react';
import { useTheme, type Theme } from '@/lib/useTheme';
import { cn } from '@/lib/utils';

const MODES: { id: Theme; label: string; Icon: LucideIcon }[] = [
  { id: 'light', label: 'Light theme', Icon: Sun },
  { id: 'paper', label: 'Paper theme', Icon: FileText },
];

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const idx = Math.max(0, MODES.findIndex((m) => m.id === theme));
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const select = (next: number) => {
    const mode = MODES[(next + MODES.length) % MODES.length];
    setTheme(mode.id);
    refs.current[MODES.indexOf(mode)]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) {
      e.preventDefault();
      select(idx + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1));
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      onKeyDown={onKeyDown}
      className={cn('relative inline-flex items-center rounded-full border border-line bg-ink-100 p-1', className)}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-1 left-1 top-1 w-8 rounded-full bg-surface shadow-sm ring-1 ring-line transition-transform duration-md ease-out"
        style={{ transform: `translateX(${idx * 100}%)` }}
      />
      {MODES.map((m, i) => {
        const active = theme === m.id;
        return (
          <button
            key={m.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            aria-label={m.label}
            title={m.label}
            onClick={() => setTheme(m.id)}
            className={cn(
              'relative z-10 flex h-7 w-8 items-center justify-center rounded-full transition-colors duration-sm',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apricot-400',
              active ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'
            )}
          >
            <m.Icon className="h-4 w-4" strokeWidth={1.5} />
          </button>
        );
      })}
    </div>
  );
};
