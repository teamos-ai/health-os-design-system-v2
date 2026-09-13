/**
 * Widgets 28 to 31: activity, feedback and conversation.
 */
import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import { APRICOT, LAVENDER, ROSE } from '@/lib/palette';
import { EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Figure, Grow, useSeen } from './motion';
import { Avatar } from './relational';
import type { WidgetAccent } from './figures';

/* ── 28 · Activity feed ───────────────────────────────────────────────── */
export interface FeedItem {
  initials: string;
  accent: WidgetAccent | 'ink';
  actor: string;
  action: string;
  time: string;
}
export const ActivityFeed = ({ items }: { items: FeedItem[] }) => (
  <ul className="flex w-full flex-col divide-y divide-line-soft" aria-live="polite">
    {items.map((it, i) => (
      <motion.li
        key={it.actor + it.time}
        className="flex items-center gap-3 py-3 first:pt-0"
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.36, delay: i * 0.12, ease: EASE_OUT }}
      >
        <Avatar initials={it.initials} accent={it.accent} />
        <span className="min-w-0 flex-1 truncate font-sans text-body text-ink-900">
          <span className="font-bold">{it.actor}</span> {it.action}
        </span>
        <span className="shrink-0 font-sans text-label text-ink-500">{it.time}</span>
      </motion.li>
    ))}
  </ul>
);

/* ── 29 · Rating summary (experimental) ───────────────────────────────── */
export const RatingSummary = ({ average, count, distribution }: { average: number; count: number; distribution: number[] }) => {
  const total = distribution.reduce((a, b) => a + b, 0);
  const { ref, seen, reduced } = useSeen<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className="flex w-full flex-wrap items-center gap-6">
      <div className="text-center">
        <Figure value={average} decimals={1} className="block font-display text-heading text-ink-900" />
        <span className="mt-1 flex justify-center gap-1" aria-label={`${average} out of 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <motion.span
              key={i}
              initial={reduced ? false : { opacity: 0, scale: 0.4 }}
              animate={seen ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.08, ease: EASE_OUT }}
            >
              <Star className="h-4 w-4" fill={i < Math.round(average) ? APRICOT[400] : 'none'} stroke={APRICOT[400]} strokeWidth={1.5} aria-hidden />
            </motion.span>
          ))}
        </span>
        <span className="mt-1 block font-sans text-label text-ink-500">{count} responses</span>
      </div>
      <ul className="flex min-w-40 flex-1 flex-col gap-2">
        {distribution.map((n, i) => (
          <li key={i} className="flex items-center gap-2 font-sans text-label text-ink-500">
            <span className="w-2">{5 - i}</span>
            <span className="h-2 flex-1 overflow-hidden rounded-md bg-ink-100">
              <Grow pct={(n / total) * 100} delay={i * 0.08} className="rounded-md bg-apricot-400" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ── 30 · Assistant message (experimental) ────────────────────────────── */
export const AssistantMessage = ({ name, message }: { name: string; message: string }) => {
  const { ref, seen } = useSeen<HTMLDivElement>(0.5);
  const reduced = useReducedMotion();
  const [typing, setTyping] = React.useState(!reduced);
  React.useEffect(() => {
    if (!seen || reduced) return;
    const id = window.setTimeout(() => setTyping(false), 1400);
    return () => window.clearTimeout(id);
  }, [seen, reduced]);
  return (
    <div ref={ref} className="flex w-full items-end gap-3">
      <span
        aria-hidden
        className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md"
        style={{ backgroundImage: `linear-gradient(140deg, ${LAVENDER[400]}, ${LAVENDER[700]})` }}
      >
        <span className="widget-bloom" />
      </span>
      <div className="max-w-sm rounded-lg rounded-bl-md bg-lavender-50 px-4 py-3">
        <p className="mb-1 font-sans text-label uppercase text-lavender-700">{name} · AI assistant</p>
        <AnimatePresence mode="wait" initial={false}>
          {typing ? (
            <motion.span key="typing" className="flex gap-1 py-2" exit={{ opacity: 0 }} aria-label="Typing">
              {[0, 1, 2].map((i) => (
                <motion.i
                  key={i}
                  className="h-2 w-2 rounded-full"
                  style={{ background: LAVENDER[400] }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.span>
          ) : (
            <motion.p
              key="message"
              className="font-sans text-body text-ink-900"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, ease: EASE_OUT }}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ── 31 · Check-in (experimental) ─────────────────────────────────────── */
const FACE_FILL = [LAVENDER[50], APRICOT[50], ROSE[50], LAVENDER[50]];
const MOUTHS = ['M17 31q7 4 14 0', 'M18 30q6 2.5 12 0', 'M18 30h12', 'M18 31q6-3 12 0'];
export const CheckIn = ({
  question,
  options,
  onSelect,
}: {
  question: string;
  options: string[];
  onSelect?: (option: string) => void;
}) => {
  const [selected, setSelected] = React.useState<string | null>(null);
  return (
    <fieldset className="w-full text-center">
      <legend className="mx-auto mb-4 font-display text-subheading text-ink-900">{question}</legend>
      <div className="flex justify-center gap-3" role="radiogroup">
        {options.map((o, i) => {
          const on = selected === o;
          return (
            <motion.button
              key={o}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => {
                setSelected(o);
                onSelect?.(o);
              }}
              className="flex w-14 flex-col items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-700/40"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.36, delay: i * 0.08, ease: EASE_OUT }}
              whileTap={{ scale: 0.96 }}
            >
              <svg viewBox="0 0 48 48" className={cn('h-11 w-11 rounded-md transition-shadow duration-sm', on && 'ring-2 ring-lavender-400 ring-offset-2 ring-offset-surface')} aria-hidden>
                <rect width="48" height="48" rx="10" fill={FACE_FILL[i % FACE_FILL.length]} />
                <circle cx="18" cy="21" r="2" fill="#1F1F1F" />
                <circle cx="30" cy="21" r="2" fill="#1F1F1F" />
                <path d={MOUTHS[i % MOUTHS.length]} fill="none" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="font-sans text-label text-ink-500">{o}</span>
            </motion.button>
          );
        })}
      </div>
    </fieldset>
  );
};
