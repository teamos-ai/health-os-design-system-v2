/**
 * Widgets 23 to 27: scheduling and product controls. These are interactive: they hold
 * selection state and report changes through callbacks.
 */
import * as React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Figure } from './motion';

const pop = (i: number, step = 0.02) => ({
  initial: { opacity: 0, y: 6 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.3, delay: i * step, ease: EASE_OUT },
});

/* ── 23 · Mini calendar ───────────────────────────────────────────────── */
export const MiniCalendar = ({
  monthLabel,
  daysInMonth,
  startOffset,
  today,
  booked,
  defaultSelected,
  onSelect,
}: {
  monthLabel: string;
  daysInMonth: number;
  /** empty cells before day 1 (Monday first) */
  startOffset: number;
  today: number;
  booked: number[];
  defaultSelected?: number;
  onSelect?: (day: number) => void;
}) => {
  const [selected, setSelected] = React.useState(defaultSelected);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  return (
    <div className="w-full">
      <p className="mb-3 font-sans text-label uppercase text-ink-500">{monthLabel}</p>
      <div className="mb-2 grid grid-cols-7 gap-1" aria-hidden>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <span key={i} className="text-center font-sans text-label text-ink-500">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1" role="grid" aria-label={monthLabel}>
        {Array.from({ length: startOffset }, (_, i) => (
          <span key={`e${i}`} />
        ))}
        {days.map((d, i) => {
          const isToday = d === today;
          const isSel = d === selected;
          return (
            <motion.button
              key={d}
              type="button"
              {...pop(i, 0.012)}
              onClick={() => {
                setSelected(d);
                onSelect?.(d);
              }}
              aria-pressed={isSel}
              aria-label={`${d} ${monthLabel}${booked.includes(d) ? ', has bookings' : ''}${isToday ? ', today' : ''}`}
              className={cn(
                'relative flex aspect-square items-center justify-center rounded-md font-sans text-body transition-colors duration-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400',
                isToday ? 'bg-rose-400 text-white' : isSel ? 'bg-rose-50 text-ink-900 ring-1 ring-inset ring-rose-200' : 'text-ink-900 hover:bg-ink-100'
              )}
            >
              {d}
              {booked.includes(d) && !isToday && <span aria-hidden className="absolute bottom-1 h-1 w-1 rounded-full bg-rose-400" />}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

/* ── 24 · Slot picker ─────────────────────────────────────────────────── */
export const SlotPicker = ({
  label,
  slots,
  defaultSelected,
  onSelect,
}: {
  label: string;
  slots: { time: string; taken?: boolean }[];
  defaultSelected?: string;
  onSelect?: (time: string) => void;
}) => {
  const [selected, setSelected] = React.useState(defaultSelected);
  return (
    <fieldset className="w-full">
      <legend className="mb-3 font-sans text-label uppercase text-ink-500">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {slots.map((s, i) => {
          const isSel = s.time === selected;
          return (
            <motion.button
              key={s.time}
              type="button"
              {...pop(i, 0.04)}
              disabled={s.taken}
              aria-pressed={isSel}
              onClick={() => {
                setSelected(s.time);
                onSelect?.(s.time);
              }}
              className={cn(
                'rounded-md border px-3 py-2 font-sans text-body tabular-nums transition-colors duration-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400',
                s.taken
                  ? 'cursor-not-allowed border-transparent bg-ink-100 text-ink-400 line-through'
                  : isSel
                    ? 'border-transparent bg-rose-400 text-white'
                    : 'border-line text-ink-900 hover:border-ink-400'
              )}
            >
              {s.time}
            </motion.button>
          );
        })}
      </div>
    </fieldset>
  );
};

/* ── 25 · Onboarding stepper ──────────────────────────────────────────── */
export type StepStatus = 'done' | 'current' | 'next';
export const OnboardingStepper = ({ steps }: { steps: { title: string; status: StepStatus; detail?: string }[] }) => (
  <ol className="flex w-full flex-col">
    {steps.map((s, i) => (
      <motion.li key={s.title} className="relative flex gap-3 pb-4 last:pb-0" {...pop(i, 0.12)}>
        {i < steps.length - 1 && <span aria-hidden className="absolute bottom-0 left-3 top-7 w-px bg-ink-200" />}
        <span
          className={cn(
            'relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-sans text-label',
            s.status === 'done' && 'bg-rose-400 text-white',
            s.status === 'current' && 'border-2 border-lavender-400 bg-surface text-ink-900',
            s.status === 'next' && 'bg-ink-100 text-ink-500'
          )}
        >
          {s.status === 'done' ? <Check className="h-3 w-3" strokeWidth={3} aria-hidden /> : i + 1}
        </span>
        <span>
          <span className={cn('block font-sans text-body', s.status === 'next' ? 'text-ink-500' : 'text-ink-900')}>{s.title}</span>
          {s.detail && <span className="block font-sans text-label text-ink-500">{s.detail}</span>}
          <span className="sr-only">{s.status === 'done' ? 'Done' : s.status === 'current' ? 'In progress' : 'Not started'}</span>
        </span>
      </motion.li>
    ))}
  </ol>
);

/* ── 26 · Plan card ───────────────────────────────────────────────────── */
export const PlanCard = ({
  name,
  price,
  cadence,
  fee,
  features,
  action,
}: {
  name: string;
  price: number;
  cadence: string;
  fee?: string;
  features: string[];
  action: string;
}) => (
  <div className="w-full overflow-hidden rounded-lg border border-line bg-surface">
    <div className="relative overflow-hidden bg-brand-gradient-soft px-5 py-4">
      <span aria-hidden className="widget-sheen" />
      <p className="relative font-sans text-label uppercase text-ink-900">{name}</p>
      <p className="relative mt-1 font-display text-heading text-ink-900">
        <Figure value={price} prefix="$" />
        <span className="ml-2 font-sans text-body text-ink-600">{cadence}</span>
      </p>
      {fee && <p className="relative font-sans text-label text-ink-600">{fee}</p>}
    </div>
    <ul className="flex flex-col gap-3 p-5">
      {features.map((f, i) => (
        <motion.li key={f} className="flex items-center gap-3 font-sans text-body text-ink-900" {...pop(i, 0.1)}>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-rose-400 text-white">
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
          </span>
          {f}
        </motion.li>
      ))}
      <li className="mt-1">
        <button
          type="button"
          className="h-11 w-full rounded-md bg-rose-400 font-display text-body text-white transition-colors hover:bg-rose-400/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
        >
          {action}
        </button>
      </li>
    </ul>
  </div>
);

/* ── 27 · Toggle settings ─────────────────────────────────────────────── */
export const ToggleSettings = ({
  items,
  onChange,
}: {
  items: { id: string; label: string; detail: string; enabled: boolean }[];
  onChange?: (id: string, enabled: boolean) => void;
}) => {
  const [state, setState] = React.useState(() => Object.fromEntries(items.map((i) => [i.id, i.enabled])));
  return (
    <ul className="flex w-full flex-col gap-4">
      {items.map((it, i) => {
        const on = state[it.id];
        return (
          <motion.li key={it.id} className="flex items-center justify-between gap-4" {...pop(i, 0.1)}>
            <span id={`tg-${it.id}`}>
              <span className="block font-sans text-body text-ink-900">{it.label}</span>
              <span className="block font-sans text-label text-ink-500">{it.detail}</span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={on}
              aria-labelledby={`tg-${it.id}`}
              onClick={() => {
                setState((s) => ({ ...s, [it.id]: !on }));
                onChange?.(it.id, !on);
              }}
              className={cn(
                'relative h-6 w-11 shrink-0 rounded-full transition-colors duration-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2',
                on ? 'bg-brand-gradient' : 'bg-ink-200'
              )}
            >
              <motion.span
                aria-hidden
                className="absolute left-1 top-1 h-4 w-4 rounded-full bg-surface shadow-sm"
                animate={{ x: on ? 20 : 0 }}
                transition={{ duration: 0.24, ease: EASE_OUT }}
              />
            </button>
          </motion.li>
        );
      })}
    </ul>
  );
};
