/**
 * Modal — Health OS v2.
 *
 * A centred dialog with a soft scrim, focus trap, Escape-to-close, scroll lock and
 * focus return to the trigger. Opens with fade + scale 0.98→1 (dur-md, reduced-motion
 * safe). `role="dialog"` + `aria-modal` + labelled title. Flat surface, hairline,
 * `rounded-xl`, neutral shadow — zero glass. For simple confirmations and short forms;
 * prefer inline editing or a slide-over for larger flows.
 */
import * as React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/ui/icon-button';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

export const Modal = ({ open, onClose, title, description, children, footer, className }: ModalProps) => {
  const reduced = useReducedMotion();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();
  const descId = React.useId();
  const returnFocus = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    // focus the first focusable inside, else the panel
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? panel)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab' && panel) {
        const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (items.length === 0) {
          e.preventDefault();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      returnFocus.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Scrim — calm carbon veil, no blur */}
      <button
        type="button"
        aria-label="Close dialog"
        tabIndex={-1}
        onClick={onClose}
        className={cn('absolute inset-0 bg-carbon/40', !reduced && 'motion-safe:animate-enter-rise')}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cn(
          'relative z-10 w-full max-w-lg rounded-xl border border-line bg-surface p-6 shadow-xl focus:outline-none',
          !reduced && 'motion-safe:animate-enter-rise',
          className
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="font-display text-h3 text-ink-900">
            {title}
          </h2>
          <IconButton variant="ghost" size="sm" aria-label="Close" onClick={onClose}>
            <X className="h-5 w-5" strokeWidth={1.5} />
          </IconButton>
        </div>
        {description && (
          <p id={descId} className="mt-2 font-mono text-body-sm leading-relaxed text-ink-600">
            {description}
          </p>
        )}
        {children && <div className="mt-5">{children}</div>}
        {footer && <div className="mt-6 flex flex-wrap items-center justify-end gap-3">{footer}</div>}
      </div>
    </div>,
    document.body
  );
};
