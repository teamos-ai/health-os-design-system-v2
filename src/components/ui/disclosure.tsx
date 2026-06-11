/**
 * Disclosure — a calm accordion. Smooth height-auto expand/collapse via Framer
 * AnimatePresence, a chevron that rotates, brand focus ring. Reduced-motion safe
 * (snaps open/closed). 8px squircle, flat hairline, zero glass.
 */
import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export interface DisclosureProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const Disclosure = ({ title, children, defaultOpen = false, className }: DisclosureProps) => {
  const [open, setOpen] = React.useState(defaultOpen);
  const reduced = useReducedMotion();
  return (
    <div className={cn('overflow-hidden rounded-md border border-line bg-surface', className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 rounded-md px-4 py-3.5 text-left font-display text-h4 text-ink-900 transition-colors duration-sm hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40"
      >
        <span>{title}</span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-ink-500 transition-transform duration-md ease-out', open && 'rotate-180')}
          strokeWidth={1.5}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduced ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 font-sans text-body-md leading-relaxed text-ink-600">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
