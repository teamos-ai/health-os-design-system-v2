/**
 * ThemeToggle — a 3-position segmented control: Light (white) · Paper (ivory) · Dark
 * (carbon), left → middle → right. A thumb slides to the active mode. Flat hairline,
 * brand focus ring, reduced-motion safe (the slide is a short token transition).
 */
import * as React from 'react';
import { Sun, FileText, Moon, type LucideIcon } from 'lucide-react';
import { useTheme, type Theme } from '@/lib/useTheme';
import { cn } from '@/lib/utils';

const MODES: { id: Theme; label: string; Icon: LucideIcon }[] = [
  { id: 'light', label: 'Light mode', Icon: Sun },
  { id: 'paper', label: 'Paper mode', Icon: FileText },
  { id: 'dark', label: 'Dark mode', Icon: Moon },
];

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const idx = Math.max(0, MODES.findIndex((m) => m.id === theme));
  const btnRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  /** Radiogroup convention: arrows cycle the modes, focus follows selection. */
  const move = (next: number) => {
    const mode = MODES[next];
    if (!mode) return;
    setTheme(mode.id);
    btnRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const len = MODES.length;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      move((idx + 1) % len);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      move((idx - 1 + len) % len);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      onKeyDown={onKeyDown}
      className={cn(
        'relative inline-flex items-center rounded-full border border-line bg-ink-100 p-0.5',
        className
      )}
    >
      {/* sliding thumb */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0.5 left-0.5 top-0.5 w-8 rounded-full bg-surface shadow-sm ring-1 ring-line transition-transform duration-md ease-out"
        style={{ transform: `translateX(${idx * 100}%)` }}
      />
      {MODES.map((m, i) => {
        const active = theme === m.id;
        return (
          <button
            key={m.id}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={i === idx ? 0 : -1}
            aria-label={m.label}
            title={m.label}
            onClick={() => setTheme(m.id)}
            className={cn(
              'relative z-10 flex h-7 w-8 items-center justify-center rounded-full transition-colors duration-sm',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40',
              active ? 'text-ink-900' : 'text-ink-400 hover:text-ink-600'
            )}
          >
            <m.Icon className="h-4 w-4" strokeWidth={1.5} />
          </button>
        );
      })}
    </div>
  );
};
