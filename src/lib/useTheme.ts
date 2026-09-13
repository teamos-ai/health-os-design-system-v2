import * as React from 'react';

/** The two Health OS themes. They share every colour and component; only the ground changes. */
export type Theme = 'light' | 'paper';

export const THEMES: Theme[] = ['light', 'paper'];

function current(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('theme-paper') ? 'paper' : 'light';
}

/**
 * Theme hook. Light is the default (no class); paper sets `.theme-paper` on <html>.
 * Persists to localStorage and keeps every toggle in sync through a `themechange` event.
 * The pre-paint script in index.html applies the saved theme before first render.
 */
export function useTheme() {
  const [theme, setState] = React.useState<Theme>(current);

  React.useEffect(() => {
    const onChange = () => setState(current());
    window.addEventListener('themechange', onChange);
    return () => window.removeEventListener('themechange', onChange);
  }, []);

  const setTheme = React.useCallback((t: Theme) => {
    document.documentElement.classList.toggle('theme-paper', t === 'paper');
    try {
      localStorage.setItem('theme', t);
    } catch {
      /* storage can be unavailable (private mode); the theme still applies */
    }
    window.dispatchEvent(new Event('themechange'));
  }, []);

  return { theme, setTheme };
}
