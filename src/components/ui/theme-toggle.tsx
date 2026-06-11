/**
 * ThemeToggle — flips between the light (warm ivory) and dark (carbon) themes. Sun in
 * dark mode, moon in light. Flat hairline button, brand focus ring, reduced-motion safe.
 */
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/useTheme';
import { cn } from '@/lib/utils';

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface text-ink-600',
        'transition-colors duration-sm ease-out hover:border-ink-300 hover:text-ink-900',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40',
        className
      )}
    >
      {dark ? (
        <Sun className="h-[18px] w-[18px]" strokeWidth={1.5} />
      ) : (
        <Moon className="h-[18px] w-[18px]" strokeWidth={1.5} />
      )}
    </button>
  );
};
