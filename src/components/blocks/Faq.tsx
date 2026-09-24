/**
 * Faq: common questions in a condensed column, 800px wide at most (size token `narrow`).
 *
 * Each question is a quiet row: the question in the title role (18px Spline Sans medium), so a
 * list of questions reads as a list rather than a stack of headings, with a small 24px apricot
 * plus on the right. Opening it turns the plus a quarter turn into a cross and reveals the
 * answer beside a small picture: image on the left,
 * answer on the right, even on phones. One answer is open at a time unless `multiple` is set;
 * the first opens by default. Height animates open and closed, and reduced motion snaps.
 * Pictures come from the tagged library and are decorative when the answer says it all.
 */
import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { DURATION, EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
  /** a small picture beside the answer, from the image library */
  image?: { src: string; alt: string };
}

export interface FaqProps {
  items: FaqItem[];
  /** index of the question open at first; -1 for none */
  defaultOpen?: number;
  /** let several answers stay open at once */
  multiple?: boolean;
  /** heading level of each question: h3 inside a section with its own h2 */
  headingLevel?: 'h3' | 'h4';
  className?: string;
}

export const Faq = ({ items, defaultOpen = 0, multiple = false, headingLevel: Heading = 'h3', className }: FaqProps) => {
  const [open, setOpen] = React.useState<number[]>(defaultOpen >= 0 ? [defaultOpen] : []);
  const reduced = useReducedMotion();
  const baseId = React.useId();

  const toggle = (i: number) =>
    setOpen((current) => (current.includes(i) ? current.filter((x) => x !== i) : multiple ? [...current, i] : [i]));

  return (
    <div className={cn('mx-auto w-full max-w-narrow border-t border-line', className)}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        const triggerId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div key={item.question} className="border-b border-line">
            <Heading className="font-display text-title text-ink-900">
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={isOpen ? panelId : undefined}
                onClick={() => toggle(i)}
                className="group -mx-2 flex w-[calc(100%+1rem)] items-center justify-between gap-4 rounded-lg px-2 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-apricot-200 text-ink-900 transition-[transform,background-color] duration-md ease-out group-hover:bg-apricot-200/80',
                    isOpen && 'rotate-45'
                  )}
                >
                  <Plus className="h-3 w-3" strokeWidth={2.25} />
                </span>
              </button>
            </Heading>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={reduced ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : DURATION.lg, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <div className={cn('grid gap-4 pb-6 sm:gap-6 sm:pr-10', item.image && 'grid-cols-[5rem_minmax(0,1fr)] sm:grid-cols-[8rem_minmax(0,1fr)]')}>
                    {item.image && (
                      <img src={item.image.src} alt={item.image.alt} loading="lazy" decoding="async" className="aspect-square w-full rounded-lg object-cover" />
                    )}
                    <div className="min-w-0 self-center font-sans text-body text-ink-600">{item.answer}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
