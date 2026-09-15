/**
 * Disclosure: a calm accordion row. The title is in the title role (18px Spline Sans medium),
 * gentler than a subheading. Height animates open and closed; a small 24px apricot plus turns a
 * quarter turn into a cross when open, the same control the FAQ uses. Ink focus ring. Reduced
 * motion snaps open and closed. 8px corners, flat hairline, no glass.
 */
import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export interface DisclosureProps {
  title: string;
  children: React.ReactNode;
  /** Uncontrolled initial state — ignored when `open` is provided. */
  defaultOpen?: boolean;
  /** Controlled open state — pass together with `onOpenChange`. */
  open?: boolean;
  /** Called with the next state on every toggle (controlled or not). */
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export const Disclosure = ({
  title,
  children,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  className,
}: DisclosureProps) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = openProp ?? internalOpen;
  const reduced = useReducedMotion();
  const id = React.useId();
  const buttonId = `${id}-trigger`;
  const panelId = `${id}-panel`;

  const toggle = () => {
    const next = !open;
    if (openProp === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className={cn('overflow-hidden rounded-md border border-line bg-surface', className)}>
      <button
        type="button"
        id={buttonId}
        onClick={toggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 rounded-md px-4 py-3 text-left font-display text-title text-ink-900 transition-colors duration-sm hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900"
      >
        <span>{title}</span>
        <span
          aria-hidden
          className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-apricot-200 text-ink-900 transition-transform duration-md ease-out', open && 'rotate-45')}
        >
          <Plus className="h-3 w-3" strokeWidth={2.25} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduced ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 font-sans text-body text-ink-600">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
