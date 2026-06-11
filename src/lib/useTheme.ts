import * as React from 'react';

export type Theme = 'light' | 'paper' | 'dark';

export const THEMES: Theme[] = ['light', 'paper', 'dark'];

function current(): Theme {
  if (typeof document === 'undefined') return 'light';
  const el = document.documentElement;
  if (el.classList.contains('dark')) return 'dark';
  if (el.classList.contains('theme-paper')) return 'paper';
  return 'light';
}

/**
 * Theme hook — reads/sets the theme class on <html> (light = none, paper =
 * `.theme-paper`, dark = `.dark`), persists to localStorage, and keeps every control
 * in sync via a `themechange` event. Default is light (white). Initial class is set
 * pre-paint by the inline script in index.html, so there is no flash.
 */
export function useTheme() {
  const [theme, setState] = React.useState<Theme>(current);

  React.useEffect(() => {
    const onChange = () => setState(current());
    window.addEventListener('themechange', onChange);
    return () => window.removeEventListener('themechange', onChange);
  }, []);

  const setTheme = React.useCallback((t: Theme) => {
    const el = document.documentElement;
    el.classList.toggle('dark', t === 'dark');
    el.classList.toggle('theme-paper', t === 'paper');
    try {
      localStorage.setItem('theme', t);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event('themechange'));
  }, []);

  return { theme, setTheme };
}
