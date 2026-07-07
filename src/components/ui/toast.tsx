/**
 * Toast — Health OS v2.
 *
 * A transient, non-blocking notification stack. Wrap the app (or a subtree) in
 * `<ToastProvider>` and call `useToast().toast({ ... })` to push one. Toasts stack
 * bottom-right, enter with fade + rise (dur-md), auto-dismiss after `duration` (default
 * 5s), and are pausable/dismissable. The live region is `aria-live="polite"` (assertive
 * for danger). Flat surface + hairline + neutral shadow — calm, never a klaxon.
 */
import * as React from 'react';
import { createPortal } from 'react-dom';
import { Info, CheckCircle2, AlertTriangle, XCircle, X, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tone = 'info' | 'success' | 'warn' | 'danger';

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: Tone;
  /** ms before auto-dismiss; 0 keeps it until dismissed. Default 5000. */
  duration?: number;
}

interface ToastRecord extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  toast: (opts: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

const ICONS: Record<Tone, { icon: LucideIcon; className: string }> = {
  info: { icon: Info, className: 'text-info-600' },
  success: { icon: CheckCircle2, className: 'text-success-600' },
  warn: { icon: AlertTriangle, className: 'text-warn-600' },
  danger: { icon: XCircle, className: 'text-danger-600' },
};

export const useToast = () => {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastRecord[]>([]);
  const seq = React.useRef(0);
  const timers = React.useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = React.useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = React.useCallback(
    (opts: ToastOptions) => {
      const id = ++seq.current;
      setToasts((list) => [...list, { ...opts, id }]);
      const duration = opts.duration ?? 5000;
      if (duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), duration)
        );
      }
      return id;
    },
    [dismiss]
  );

  React.useEffect(() => {
    const map = timers.current;
    return () => map.forEach((t) => clearTimeout(t));
  }, []);

  const value = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-end gap-3 p-4 sm:p-6">
          {toasts.map((t) => {
            const { icon: Icon, className } = ICONS[t.tone ?? 'info'];
            return (
              <div
                key={t.id}
                role={t.tone === 'danger' || t.tone === 'warn' ? 'alert' : 'status'}
                aria-live={t.tone === 'danger' ? 'assertive' : 'polite'}
                className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border border-line bg-surface px-4 py-3 shadow-lg motion-safe:animate-enter-rise"
              >
                <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', className)} strokeWidth={1.5} aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-body-md font-medium text-ink-900">{t.title}</p>
                  {t.description && (
                    <p className="mt-0.5 font-mono text-body-sm leading-relaxed text-ink-600">{t.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  aria-label="Dismiss notification"
                  onClick={() => dismiss(t.id)}
                  className="-mr-1 -mt-1 shrink-0 rounded-md p-1 text-ink-500 transition-colors duration-sm hover:bg-ink-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
