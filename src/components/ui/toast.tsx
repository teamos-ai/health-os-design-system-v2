/**
 * Toast: a short confirmation that appears bottom-right and dismisses itself.
 * Wrap the app in <ToastProvider> and call useToast().toast({ title, tone }).
 * Tones: neutral (default), success, warning, error. Auto-dismiss after 5s (duration: 0 keeps it).
 * For a message that must stay until the situation changes, use an Alert instead.
 */
import * as React from 'react';
import { createPortal } from 'react-dom';
import { Bell, CheckCircle2, AlertTriangle, XCircle, X, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastTone = 'neutral' | 'success' | 'warning' | 'error';

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: ToastTone;
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

const ICONS: Record<ToastTone, { icon: LucideIcon; className: string }> = {
  neutral: { icon: Bell, className: 'text-ink-600' },
  success: { icon: CheckCircle2, className: 'text-success-600' },
  warning: { icon: AlertTriangle, className: 'text-warning-600' },
  error: { icon: XCircle, className: 'text-error-600' },
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
            const { icon: Icon, className } = ICONS[t.tone ?? 'neutral'];
            return (
              <div
                key={t.id}
                role={t.tone === 'error' || t.tone === 'warning' ? 'alert' : 'status'}
                aria-live={t.tone === 'error' ? 'assertive' : 'polite'}
                className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border border-line bg-surface px-4 py-3 shadow-md motion-safe:animate-enter-rise"
              >
                <Icon className={cn('mt-1 h-5 w-5 shrink-0', className)} strokeWidth={1.5} aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-body text-ink-900">{t.title}</p>
                  {t.description && (
                    <p className="mt-1 font-sans text-body text-ink-600">{t.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  aria-label="Dismiss notification"
                  onClick={() => dismiss(t.id)}
                  className="-mr-1 -mt-1 shrink-0 rounded-md p-1 text-ink-500 transition-colors duration-sm hover:bg-ink-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apricot-400"
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
