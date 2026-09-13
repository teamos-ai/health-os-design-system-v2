/**
 * Swatch and GradientSwatch: click-to-copy colour and gradient chips for the token reference.
 */
import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

/** "#E85BA8" → "rgb(232, 91, 168)" (supports 3- or 6-digit hex). */
export function hexToRgb(hex: string): string {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
}

/** Copy with a graceful fallback for non-secure / older contexts. */
export async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch {
      /* ignore */
    }
    document.body.removeChild(ta);
  }
}

function useCopied(timeout = 1300) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<number | undefined>(undefined);
  React.useEffect(() => () => window.clearTimeout(timer.current), []);
  const fire = React.useCallback(
    (value: string) => {
      copyText(value);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), timeout);
    },
    [timeout]
  );
  return { copied, fire };
}

export interface SwatchProps {
  hex: string;
  /** token name, e.g. "rose-400" */
  label: string;
  /** what the shade is for, e.g. "Deep: text and filled buttons" */
  role?: string;
  /** value copied on click (defaults to the hex) */
  copyValue?: string;
  className?: string;
}

export const Swatch = ({ hex, label, role, copyValue, className }: SwatchProps) => {
  const { copied, fire } = useCopied();
  const HEX = hex.toUpperCase();
  const value = copyValue ?? HEX;
  return (
    <button
      type="button"
      onClick={() => fire(value)}
      title={`Copy ${value}`}
      aria-label={`${label}, ${HEX}. Click to copy ${value}.`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-lg border border-line bg-surface text-left transition-[box-shadow,border-color] duration-sm ease-out hover:border-ink-400 hover:shadow-sm',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
        className
      )}
    >
      <span className="relative block h-16 w-full ring-1 ring-inset ring-carbon/5" style={{ background: hex }}>
        <span
          className={cn(
            'absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md bg-surface shadow-sm transition-opacity duration-sm',
            copied ? 'text-success-600 opacity-100' : 'text-ink-900 opacity-0 group-hover:opacity-100'
          )}
        >
          {copied ? <Check className="h-4 w-4" strokeWidth={2} /> : <Copy className="h-4 w-4" strokeWidth={1.5} />}
        </span>
      </span>
      <span className="flex flex-col gap-1 px-3 py-3">
        <span className="font-sans text-label uppercase text-ink-900">{label}</span>
        <span aria-live="polite" className="font-sans text-label text-ink-600">
          {copied ? 'Copied' : HEX}
        </span>
        {role && <span className="font-sans text-label text-ink-500">{role}</span>}
      </span>
    </button>
  );
};

export interface GradientSwatchProps {
  label: string;
  /** Tailwind class, e.g. bg-brand-gradient */
  token: string;
  /** the CSS value to display and copy */
  css: string;
  className?: string;
}

export const GradientSwatch = ({ label, token, css, className }: GradientSwatchProps) => {
  const { copied, fire } = useCopied();
  return (
    <button
      type="button"
      onClick={() => fire(css)}
      title={`Copy ${css}`}
      aria-label={`${label}. Click to copy the CSS gradient.`}
      className={cn('group block w-full text-left focus-visible:outline-none', className)}
    >
      <span
        className="relative block h-32 w-full overflow-hidden rounded-lg border border-line transition-shadow duration-sm group-hover:shadow-sm group-focus-visible:ring-2 group-focus-visible:ring-rose-400"
        style={{ background: css }}
      >
        <span
          className={cn(
            'absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md bg-surface shadow-sm transition-opacity duration-sm',
            copied ? 'text-success-600 opacity-100' : 'text-ink-900 opacity-0 group-hover:opacity-100'
          )}
        >
          {copied ? <Check className="h-4 w-4" strokeWidth={2} /> : <Copy className="h-4 w-4" strokeWidth={1.5} />}
        </span>
      </span>
      <span className="mt-3 block font-display text-body text-ink-900">{label}</span>
      <span aria-live="polite" className="block font-sans text-label text-ink-500">
        {copied ? 'Copied the CSS' : token}
      </span>
    </button>
  );
};
