import * as React from 'react';

export type Theme = 'light' | 'dark';

const isDark = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

/**
 * Theme hook — reads/sets the `.dark` class on <html>, persists to localStorage, and
 * keeps every toggle instance in sync via a `themechange` event. Default is light
 * (warm ivory); dark is opt-in. Initial class is set pre-paint by the inline script
 * in index.html, so there is no flash.
 */
export function useTheme() {
  const [theme, setState] = React.useState<Theme>(() => (isDark() ? 'dark' : 'light'));

  React.useEffect(() => {
    const onChange = () => setState(isDark() ? 'dark' : 'light');
    window.addEventListener('themechange', onChange);
    return () => window.removeEventListener('themechange', onChange);
  }, []);

  const setTheme = React.useCallback((t: Theme) => {
    document.documentElement.classList.toggle('dark', t === 'dark');
    try {
      localStorage.setItem('theme', t);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event('themechange'));
  }, []);

  const toggle = React.useCallback(() => setTheme(isDark() ? 'light' : 'dark'), [setTheme]);

  return { theme, setTheme, toggle };
}
