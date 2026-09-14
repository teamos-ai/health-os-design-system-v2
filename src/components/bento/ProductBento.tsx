/**
 * ProductBento: what the platform does, each job shown with a small drawn visual.
 *
 * Remodelled from the 21st.dev features-8 bento for Health OS. Five cells on a six-column
 * grid: three across the top (a figure in soft rings, a booking week and a follow-up
 * message), then two wide cells that split into text and a visual set into the corner (a
 * pipeline and a client list). One column on phones; on tablets the first cell and the wide
 * cells run full width, with the wide cells split; the full layout from lg.
 *
 * Every visual is drawn with tokens and markup, never a screenshot, and is decorative: the
 * title and sentence carry the meaning, so visuals are aria-hidden. They settle in once as
 * they come into view and stay still with reduced motion. The figure is the one large type
 * moment. Colour is rose, lavender and the ink neutrals at 50 and 200; nothing here is
 * apricot, because nothing here can be pressed. Names and times are samples, never results.
 */
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, CheckCheck } from 'lucide-react';
import { DURATION, EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';

export interface ProductBentoText {
  title: string;
  /** one sentence about the business, never a health outcome */
  description: string;
}

export interface ProductBentoProps {
  /** the one large figure, drawn in soft rings: value "One", label "dashboard" */
  figure: ProductBentoText & { value: string; label?: string };
  /** a short week and a few times; one day and one time are marked as booked */
  booking: ProductBentoText & {
    /** five days read best: { weekday: 'Thu', date: '17' } */
    days: { weekday: string; date: string }[];
    bookedDay?: number;
    /** two or four times read best: '10:30 am' */
    slots: string[];
    bookedSlot?: number;
  };
  /** a message that came in and the reply that went out */
  followUp: ProductBentoText & { received: string; sent: string; sentLabel?: string };
  /** stage names in order, two to five */
  pipeline: ProductBentoText & { stages: string[] };
  /** three sample first names, each with a short detail such as a booking time */
  clients: ProductBentoText & { rows: { name: string; detail?: string }[] };
  className?: string;
}

const cell = 'relative flex min-w-0 flex-col overflow-hidden rounded-lg border border-line bg-surface';

/* ── entrance: each mark settles in once, in order; reduced motion shows the finished state ── */
type Target = { opacity?: number; x?: number; y?: number; scale?: number };
const RISE: [Target, Target] = [{ opacity: 0, y: 8 }, { opacity: 1, y: 0 }];
const SLIDE: [Target, Target] = [{ opacity: 0, x: -8 }, { opacity: 1, x: 0 }];
const RIPPLE: [Target, Target] = [{ opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 }];

const transition = (i: number) => ({ duration: DURATION.xl, delay: 0.1 + i * 0.08, ease: EASE_OUT });

const useEnter = () => {
  const reduced = useReducedMotion();
  return ([from, to]: [Target, Target], i = 0) => ({
    initial: reduced ? false : from,
    whileInView: to,
    viewport: { once: true, amount: 0.5 },
    transition: transition(i),
  });
};

const CellText = ({ title, description, className }: ProductBentoText & { className?: string }) => (
  <div className={className}>
    <h3 className="font-display text-subheading text-ink-900">{title}</h3>
    <p className="mt-2 font-sans text-body text-ink-600">{description}</p>
  </div>
);

/* ── top row: a visual band over the text ── */
const TopCell = ({ text, visual, className }: { text: ProductBentoText; visual: ReactNode; className?: string }) => (
  <div className={cn(cell, className)}>
    <div aria-hidden className="relative flex h-56 items-center overflow-hidden px-6 pt-6 md:px-8 md:pt-8">
      {visual}
    </div>
    <CellText {...text} className="p-6 md:p-8" />
  </div>
);

/* ── wide row: text beside a visual set into the bottom corner ── */
const WideCell = ({ text, visual }: { text: ProductBentoText; visual: ReactNode }) => (
  <div className={cn(cell, 'sm:col-span-2 sm:grid sm:grid-cols-2 lg:col-span-3')}>
    <CellText {...text} className="p-6 md:p-8" />
    <div aria-hidden className="ml-6 flex-1 rounded-tl-lg border-l border-t border-line bg-surface p-6 sm:ml-0 sm:mt-8">
      {visual}
    </div>
  </div>
);

const Rings = ({ value, label }: { value: string; label?: string }) => {
  const enter = useEnter();
  const radii = [72, 102, 132, 162];
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="image-fade-b absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 340 340" fill="none" className="h-80 w-80 shrink-0">
          {radii.map((r, i) => (
            <motion.circle
              key={r}
              cx="170"
              cy="170"
              r={r}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              className={i % 2 ? 'stroke-rose-200' : 'stroke-lavender-200'}
              {...enter(RIPPLE, i)}
            />
          ))}
        </svg>
      </div>
      <motion.div className="relative text-center" {...enter(RISE)}>
        <p className="font-display text-heading text-ink-900">{value}</p>
        {label && <p className="font-sans text-label uppercase text-ink-500">{label}</p>}
      </motion.div>
    </div>
  );
};

const Week = ({ days, bookedDay, slots, bookedSlot }: ProductBentoProps['booking']) => {
  const enter = useEnter();
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))` }}>
        {days.map((d, i) => (
          <motion.div key={`${d.weekday}${d.date}`} className="flex flex-col items-center gap-1 rounded-md border border-line py-2" {...enter(RISE, i)}>
            <span className="font-sans text-label uppercase text-ink-500">{d.weekday}</span>
            <span className="font-sans text-body text-ink-900">{d.date}</span>
            <span className={cn('h-1 w-1 rounded-full', i === bookedDay ? 'bg-lavender-200' : 'bg-transparent')} />
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {slots.map((s, i) => {
          const booked = i === bookedSlot;
          return (
            <motion.div
              key={s}
              className={cn(
                'flex h-9 min-w-0 items-center justify-between gap-2 rounded-md px-3 font-sans text-label',
                booked ? 'bg-lavender-50 text-ink-900 ring-1 ring-inset ring-lavender-200' : 'bg-surface-2 text-ink-600'
              )}
              {...enter(RISE, days.length + i)}
            >
              <span className="truncate">{s}</span>
              {booked && <Check className="h-4 w-4 shrink-0" strokeWidth={1.75} />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const Messages = ({ received, sent, sentLabel = 'Sent' }: ProductBentoProps['followUp']) => {
  const enter = useEnter();
  return (
    <div className="flex w-full flex-col gap-2">
      <motion.p className="mr-8 self-start rounded-md border border-line bg-surface-2 px-3 py-2 font-sans text-label text-ink-600" {...enter(RISE, 0)}>
        {received}
      </motion.p>
      <motion.p className="ml-8 self-end rounded-md bg-rose-50 px-3 py-2 font-sans text-label text-ink-900 ring-1 ring-inset ring-rose-200" {...enter(RISE, 3)}>
        {sent}
      </motion.p>
      <motion.span className="flex items-center gap-1 self-end font-sans text-label uppercase text-ink-500" {...enter(RISE, 5)}>
        <CheckCheck className="h-4 w-4" strokeWidth={1.75} />
        {sentLabel}
      </motion.span>
    </div>
  );
};

/* the bar starts at zero width, so the track is what comes into view and the bar follows */
const Pipeline = ({ stages }: { stages: string[] }) => {
  const reduced = useReducedMotion();
  const share = 100 / stages.length;
  return (
    <div className="flex flex-col gap-3">
      {stages.map((s, i) => (
        <div key={s} className="flex flex-col gap-1">
          <span className="font-sans text-label uppercase text-ink-500">{s}</span>
          <motion.span
            className="relative block h-2 overflow-hidden rounded-full bg-ink-100"
            initial={reduced ? false : 'hidden'}
            whileInView="shown"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.span
              className="absolute inset-y-0 origin-left rounded-full bg-lavender-200"
              style={{ left: `${i * share}%`, width: `${share}%` }}
              variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1, transition: transition(i * 2) } }}
            />
          </motion.span>
        </div>
      ))}
    </div>
  );
};

const AVATAR = ['bg-rose-50', 'bg-lavender-50', 'bg-ink-100'];

const Clients = ({ rows }: { rows: ProductBentoProps['clients']['rows'] }) => {
  const enter = useEnter();
  return (
    <div className="flex flex-col divide-y divide-line-soft">
      {rows.map((r, i) => (
        <motion.div key={r.name} className="flex min-w-0 items-center gap-3 py-3 first:pt-0 last:pb-0" {...enter(SLIDE, i * 2)}>
          <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-sans text-label text-ink-900', AVATAR[i % AVATAR.length])}>
            {r.name.charAt(0)}
          </span>
          <span className="min-w-0 flex-1 truncate font-sans text-body text-ink-900">{r.name}</span>
          {r.detail && <span className="shrink-0 font-sans text-label text-ink-500">{r.detail}</span>}
        </motion.div>
      ))}
    </div>
  );
};

export const ProductBento = ({ figure, booking, followUp, pipeline, clients, className }: ProductBentoProps) => (
  <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6', className)}>
    <TopCell text={figure} visual={<Rings value={figure.value} label={figure.label} />} className="sm:col-span-2 lg:col-span-2" />
    <TopCell text={booking} visual={<Week {...booking} />} className="lg:col-span-2" />
    <TopCell text={followUp} visual={<Messages {...followUp} />} className="lg:col-span-2" />
    <WideCell text={pipeline} visual={<Pipeline stages={pipeline.stages} />} />
    <WideCell text={clients} visual={<Clients rows={clients.rows} />} />
  </div>
);
