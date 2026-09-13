/**
 * Widgets 17 to 22: metrics and charts.
 */
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingDown, TrendingUp } from 'lucide-react';
import { APRICOT, ROSE, LAVENDER, INK } from '@/lib/palette';
import { EASE_OUT } from '@/lib/motion';
import { Figure, Grow, SweepRing, useSeen } from './motion';
import { LIGHT, BAR, SWEEP_BAR, TRACK, type WidgetAccent } from './tones';

const SOLID: Record<WidgetAccent | 'ink', string> = { ...LIGHT, ink: INK[200] };

const Delta = ({ value, unit = '%', period }: { value: number; unit?: string; period?: string }) => {
  const up = value >= 0;
  return (
    <span className="inline-flex items-center gap-1 font-sans text-label text-ink-900">
      {up ? <TrendingUp className="h-3 w-3 text-success-600" aria-hidden /> : <TrendingDown className="h-3 w-3 text-ink-500" aria-hidden />}
      {up ? '+' : ''}
      {value}
      {unit}
      {period && <span className="text-ink-500"> {period}</span>}
    </span>
  );
};

/* ── 17 · Metric strip ────────────────────────────────────────────────── */
export interface MetricItem {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delta: number;
}
export const MetricStrip = ({ items, period }: { items: MetricItem[]; period: string }) => (
  <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4">
    {items.map((m, i) => (
      <div key={m.label} className="relative overflow-hidden rounded-lg border border-line bg-surface p-4">
        <span className="font-sans text-label uppercase text-ink-500">{m.label}</span>
        <Figure value={m.value} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals} className="mt-2 block font-display text-subheading text-ink-900" />
        <span className="mt-1 block">
          <Delta value={m.delta} period={period} />
        </span>
        <Grow pct={100} delay={0.1 + i * 0.08} className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundImage: SWEEP_BAR }} />
      </div>
    ))}
  </div>
);

/* ── 18 · Category donut ──────────────────────────────────────────────── */
export const CategoryDonut = ({
  segments,
  totalLabel,
  totalValue,
}: {
  segments: { label: string; value: number; accent: WidgetAccent | 'ink' }[];
  totalLabel: string;
  totalValue: string;
}) => {
  const total = segments.reduce((a, s) => a + s.value, 0);
  let acc = 0;
  const stops = segments
    .map((s) => {
      const from = (acc / total) * 100;
      acc += s.value;
      const to = (acc / total) * 100;
      return `${SOLID[s.accent]} calc(var(--a) * ${(from / 100).toFixed(4)} * 1%) calc(var(--a) * ${(to / 100).toFixed(4)} * 1%)`;
    });
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <DonutSweep stops={stops}>
        <span className="font-display text-subheading text-ink-900">{totalValue}</span>
        <span className="font-sans text-label uppercase text-ink-500">{totalLabel}</span>
      </DonutSweep>
      <ul className="flex flex-col gap-2">
        {segments.map((s) => (
          <li key={s.label} className="flex min-w-40 items-center gap-2 font-sans text-body text-ink-600">
            <i aria-hidden className="h-2 w-2 rounded-full" style={{ background: SOLID[s.accent] }} />
            <span className="flex-1">{s.label}</span>
            <Figure value={Math.round((s.value / total) * 100)} suffix="%" className="font-display text-ink-900" />
          </li>
        ))}
      </ul>
    </div>
  );
};

/** Donut variant of SweepRing with multiple hard segments. */
const DonutSweep = ({ stops, children }: { stops: string[]; children: React.ReactNode }) => (
  <SweepRing pct={100} size={120} thickness={20} stops={[INK[100]]} className="donut-host">
    <DonutFill stops={stops} />
    {children}
  </SweepRing>
);

const DonutFill = ({ stops }: { stops: string[] }) => (
  <span
    aria-hidden
    className="absolute inset-0 -z-0 rounded-full"
    style={{
      background: `conic-gradient(from -90deg, ${stops.join(', ')}, transparent calc(var(--a) * 1%))`,
      WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 20px), #000 calc(100% - 20px))',
      mask: 'radial-gradient(farthest-side, transparent calc(100% - 20px), #000 calc(100% - 20px))',
    }}
  />
);

/* ── 19 · Progress rows ───────────────────────────────────────────────── */
export const ProgressRows = ({ rows }: { rows: { label: string; value: number; accent: WidgetAccent }[] }) => (
  <ul className="flex w-full flex-col gap-4">
    {rows.map((r, i) => (
      <li key={r.label}>
        <div className="mb-2 flex justify-between font-sans text-body">
          <span className="text-ink-600">{r.label}</span>
          <Figure value={r.value} suffix="%" className="font-display text-ink-900" />
        </div>
        <div className="h-2 overflow-hidden rounded-md bg-ink-100">
          <Grow pct={r.value} delay={i * 0.1} className="rounded-md" style={{ backgroundImage: BAR[r.accent] }} />
        </div>
      </li>
    ))}
  </ul>
);

/* ── 20 · Ticked gauge ────────────────────────────────────────────────── */
const TICK_COLOURS = [APRICOT[200], APRICOT[200], APRICOT[200], ROSE[200], ROSE[200], ROSE[200], ROSE[200], LAVENDER[200], LAVENDER[200], LAVENDER[200], LAVENDER[200], LAVENDER[200], LAVENDER[200]];
export const TickedGauge = ({ value, unit }: { value: number; unit: string }) => {
  const { ref, seen, reduced } = useSeen<SVGSVGElement>(0.4);
  const count = TICK_COLOURS.length;
  const lit = Math.round((value / 100) * count);
  return (
    <div className="flex flex-col items-center">
      <svg ref={ref} viewBox="0 0 200 108" className="w-full max-w-52 overflow-visible" role="img" aria-label={`${value}% ${unit}`}>
        {TICK_COLOURS.map((c, i) => {
          const a = Math.PI - (i / (count - 1)) * Math.PI;
          const x1 = 100 + Math.cos(a) * 84;
          const y1 = 100 - Math.sin(a) * 84;
          const x2 = 100 + Math.cos(a) * 74;
          const y2 = 100 - Math.sin(a) * 74;
          const on = i < lit;
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              strokeWidth={4}
              strokeLinecap="round"
              stroke={on ? c : TRACK}
              initial={reduced ? false : { opacity: 0.25 }}
              animate={seen ? { opacity: 1 } : undefined}
              transition={{ duration: 0.2, delay: on ? i * 0.07 : 0 }}
            />
          );
        })}
      </svg>
      <div className="-mt-12 text-center">
        <Figure value={value} suffix="%" className="block font-display text-heading text-ink-900" />
        <span className="font-sans text-label uppercase text-ink-500">{unit}</span>
      </div>
    </div>
  );
};

/* ── 21 · Goal progress ───────────────────────────────────────────────── */
export const GoalProgress = ({
  label,
  current,
  target,
  onTrack,
}: {
  label: string;
  current: number;
  target: number;
  onTrack: boolean;
}) => (
  <div className="flex w-full flex-col gap-4">
    <div className="flex items-center justify-between">
      <span className="font-sans text-label uppercase text-ink-500">{label}</span>
      {onTrack && (
        <span className="inline-flex items-center gap-1 rounded-md bg-success-100 px-2 py-1 font-sans text-label uppercase text-ink-900">
          <CheckCircle2 className="h-3 w-3 text-success-600" aria-hidden /> On track
        </span>
      )}
    </div>
    <p className="font-display text-subheading text-ink-900">
      <Figure value={current} prefix="$" />
      <span className="text-ink-500"> / ${target.toLocaleString('en-AU')}</span>
    </p>
    <div className="h-3 overflow-hidden rounded-md bg-ink-100">
      <Grow pct={(current / target) * 100} className="rounded-md" style={{ backgroundImage: SWEEP_BAR }} />
    </div>
    <div className="flex justify-between font-sans text-label text-ink-500">
      <span>$0</span>
      <span>Halfway</span>
      <span>Target</span>
    </div>
  </div>
);

/* ── 22 · Comparison ──────────────────────────────────────────────────── */
export const Comparison = ({
  current,
  previous,
  currentLabel,
  previousLabel,
  unit,
}: {
  current: number;
  previous: number;
  currentLabel: string;
  previousLabel: string;
  unit: string;
}) => {
  const diff = current - previous;
  const pct = previous ? Math.round((diff / previous) * 1000) / 10 : 0;
  return (
    <div className="w-full">
      <div className="flex items-stretch">
        <div className="flex flex-1 flex-col gap-1">
          <span className="font-sans text-label uppercase text-ink-500">{currentLabel}</span>
          <Figure value={current} className="font-display text-heading text-ink-900" />
        </div>
        <div className="relative mx-6 w-px bg-line">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface py-1 font-sans text-label text-ink-500">vs</span>
        </div>
        <div className="flex flex-1 flex-col items-end gap-1 text-right">
          <span className="font-sans text-label uppercase text-ink-500">{previousLabel}</span>
          <Figure value={previous} className="font-display text-heading text-ink-500" />
        </div>
      </div>
      <motion.p
        className="mt-4 text-center font-sans text-label text-ink-900"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.36, delay: 1.2, ease: EASE_OUT }}
      >
        {diff >= 0 ? '+' : ''}
        {diff} {unit} ({diff >= 0 ? '+' : ''}
        {pct}%)
      </motion.p>
    </div>
  );
};
