/**
 * Widgets 01 to 08: headline figures and live pieces.
 * Every widget takes its data as props and animates its measurement into view.
 */
import * as React from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, Square, TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import { APRICOT, ROSE, LAVENDER } from '@/lib/palette';
import { EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Figure, Grow, SweepRing, useSeen } from './motion';

import { TILE, SWEEP, SWEEP_BAR, LIGHT, SOFT, type WidgetAccent } from './tones';

export type { WidgetAccent } from './tones';

/* ── 01 · Aura stat tiles ─────────────────────────────────────────────── */
export interface StatTileItem {
  label: string;
  value: number;
  icon: LucideIcon;
  accent: WidgetAccent;
  suffix?: string;
}
export const AuraStatTiles = ({ items }: { items: StatTileItem[] }) => (
  <div className="grid w-full gap-4 sm:grid-cols-3">
    {items.map(({ label, value, icon: Icon, accent, suffix }, i) => (
      <motion.div
        key={label}
        className="relative isolate overflow-hidden rounded-lg p-5 text-ink-900 shadow-sm"
        style={{ backgroundImage: TILE[accent] }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.48, delay: i * 0.08, ease: EASE_OUT }}
      >
        <span aria-hidden className="widget-bloom" />
        <span className="mb-6 flex h-10 w-10 items-center justify-center rounded-md bg-white/40">
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </span>
        <Figure value={value} suffix={suffix} className="block font-display text-heading" />
        <span className="mt-2 block font-sans text-label uppercase text-ink-900">{label}</span>
      </motion.div>
    ))}
  </div>
);

/* ── 02 · Gradient ring ───────────────────────────────────────────────── */
export const GradientRing = ({ value, unit, caption }: { value: number; unit: string; caption: React.ReactNode }) => (
  <div className="flex flex-col items-center gap-4">
    <SweepRing pct={value} size={132} thickness={13} stops={[...SWEEP]}>
      <Figure value={value} suffix="%" className="font-display text-subheading text-ink-900" />
      <span className="font-sans text-label uppercase text-ink-500">{unit}</span>
    </SweepRing>
    <p className="font-sans text-body text-ink-600">{caption}</p>
  </div>
);

/* ── 03 · Capacity meter ──────────────────────────────────────────────── */
export const CapacityMeter = ({ used, total, unit, note }: { used: number; total: number; unit: string; note?: string }) => (
  <div className="flex w-full max-w-xs flex-col gap-3">
    <div className="flex items-baseline justify-between">
      <span className="font-display text-subheading text-ink-900">
        <Figure value={used} />
        <span className="text-ink-500"> / {total}</span>
      </span>
      <span className="font-sans text-label uppercase text-ink-500">{unit}</span>
    </div>
    <div className="h-3 overflow-hidden rounded-md bg-ink-100">
      <Grow pct={(used / total) * 100} className="rounded-md" style={{ backgroundImage: SWEEP_BAR }} />
    </div>
    <div className="flex items-baseline justify-between font-sans text-label uppercase">
      <span className="text-ink-900">{total - used} open</span>
      {note && <span className="text-ink-500">{note}</span>}
    </div>
  </div>
);

/* ── 04 · Trend card ──────────────────────────────────────────────────── */
export const TrendCard = ({ label, value, suffix = '', delta, points }: { label: string; value: number; suffix?: string; delta: number; points: number[] }) => {
  const { ref, seen, reduced } = useSeen<SVGSVGElement>(0.4);
  const max = Math.max(...points);
  const min = Math.min(...points);
  const coords = points.map((v, i) => [(i / (points.length - 1)) * 300, 70 - ((v - min) / (max - min || 1)) * 56]);
  const line = coords.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const peak = coords.reduce((a, b) => (b[1] < a[1] ? b : a));
  const up = delta >= 0;
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-sans text-label uppercase text-ink-500">{label}</span>
        <span className={cn('inline-flex items-center gap-1 rounded-md px-2 py-1 font-sans text-label', up ? 'bg-success-100 text-ink-900' : 'bg-apricot-50 text-ink-900')}>
          {up ? <TrendingUp className="h-3 w-3" aria-hidden /> : <TrendingDown className="h-3 w-3" aria-hidden />}
          {up ? '+' : ''}
          {delta}%
        </span>
      </div>
      <Figure value={value} suffix={suffix} className="font-display text-heading text-ink-900" />
      <svg ref={ref} viewBox="0 0 300 78" preserveAspectRatio="none" className="h-20 w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={ROSE[200]} stopOpacity=".55" />
            <stop offset="1" stopColor={ROSE[200]} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="trend-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={APRICOT[200]} />
            <stop offset="1" stopColor={LAVENDER[200]} />
          </linearGradient>
        </defs>
        <motion.path
          d={`${line} L300 78 L0 78 Z`}
          fill="url(#trend-fill)"
          initial={reduced ? false : { opacity: 0 }}
          animate={seen ? { opacity: 1 } : undefined}
          transition={{ duration: 1.2, delay: 0.4 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="url(#trend-line)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={seen ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.4, ease: EASE_OUT }}
        />
        <motion.circle
          cx={peak[0]}
          cy={peak[1]}
          r={4}
          fill={ROSE[200]}
          stroke="#FFFFFF"
          strokeWidth={2}
          initial={reduced ? false : { scale: 0 }}
          animate={seen ? { scale: 1 } : undefined}
          transition={{ duration: 0.36, delay: 1.2, ease: EASE_OUT }}
          style={{ transformOrigin: `${peak[0]}px ${peak[1]}px` }}
        />
      </svg>
    </div>
  );
};

/* ── 05 · Live session timer (experimental) ───────────────────────────── */
export const LiveTimer = ({ label, startSeconds = 0 }: { label: string; startSeconds?: number }) => {
  const [elapsed, setElapsed] = React.useState(startSeconds);
  const [state, setState] = React.useState<'running' | 'paused' | 'stopped'>('running');
  const { ref, seen } = useSeen<HTMLDivElement>(0.4);

  React.useEffect(() => {
    if (!seen || state !== 'running') return;
    const id = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [seen, state]);

  const pad = (n: number) => String(n).padStart(2, '0');
  const h = Math.floor(elapsed / 3600);
  const m = Math.floor((elapsed % 3600) / 60);
  const s = elapsed % 60;

  return (
    <div ref={ref} className="relative w-full max-w-sm overflow-hidden rounded-lg border border-line bg-surface p-5 shadow-md">
      <div className="flex items-center justify-between">
        <span className={cn('inline-flex items-center gap-2 font-sans text-label uppercase', state === 'running' ? 'text-ink-900' : 'text-ink-500')}>
          <span className="relative flex h-2 w-2">
            {state === 'running' && <span className="absolute inset-0 animate-ping rounded-full bg-success-600 opacity-60" />}
            <span className={cn('relative h-2 w-2 rounded-full', state === 'running' ? 'bg-success-600' : 'bg-ink-400')} />
          </span>
          {state === 'running' ? 'Recording' : state === 'paused' ? 'Paused' : 'Stopped'}
        </span>
      </div>
      <p className="mt-4 font-sans text-heading tabular-nums text-ink-900" aria-live="off">
        {pad(h)}:{pad(m)}
        <span className="text-ink-500">:{pad(s)}</span>
      </p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="font-sans text-body text-ink-600">{label}</span>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label={state === 'running' ? 'Pause' : 'Resume'}
            onClick={() => setState((v) => (v === 'running' ? 'paused' : 'running'))}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-apricot-200 text-ink-900 transition-[background-color,transform] hover:bg-apricot-200/80 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2"
          >
            {state === 'running' ? <Pause className="h-4 w-4 fill-current" strokeWidth={0} /> : <Play className="h-4 w-4 fill-current" strokeWidth={0} />}
          </button>
          <button
            type="button"
            aria-label="Stop"
            onClick={() => {
              setState('stopped');
              setElapsed(0);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface text-ink-900 transition-[border-color,transform] hover:border-ink-400 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2"
          >
            <Square className="h-3 w-3 fill-current" strokeWidth={0} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── 06 · Tracking cluster ────────────────────────────────────────────── */
export const TrackingCluster = ({ items }: { items: { label: string; value: number; accent: WidgetAccent }[] }) => {
  const pairs: Record<WidgetAccent, string[]> = {
    apricot: [APRICOT[200], ROSE[200]],
    rose: [ROSE[200], LAVENDER[200]],
    lavender: [LAVENDER[200], ROSE[200]],
  };
  return (
    <div className="flex w-full flex-wrap justify-around gap-4">
      {items.map((it) => (
        <div key={it.label} className="flex flex-col items-center gap-3">
          <SweepRing pct={it.value} size={80} thickness={9} stops={pairs[it.accent]}>
            <Figure value={it.value} suffix="%" className="font-display text-body text-ink-900" />
          </SweepRing>
          <span className="font-sans text-label uppercase text-ink-500">{it.label}</span>
        </div>
      ))}
    </div>
  );
};

/* ── 07 · Bar cluster ─────────────────────────────────────────────────── */
export const BarCluster = ({
  series,
  currentLabel,
  previousLabel,
}: {
  series: { label: string; current: number; previous: number }[];
  currentLabel: string;
  previousLabel: string;
}) => {
  const max = Math.max(...series.flatMap((s) => [s.current, s.previous]));
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex gap-4 font-sans text-label text-ink-600">
        <span className="inline-flex items-center gap-2">
          <i className="h-2 w-2 rounded-full" style={{ background: LIGHT.rose }} />
          {currentLabel}
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="h-2 w-2 rounded-full" style={{ background: LIGHT.apricot }} />
          {previousLabel}
        </span>
      </div>
      <div className="flex h-32 items-end gap-2">
        {series.map((s, i) => (
          <div key={s.label} className="flex h-full flex-1 items-end gap-1" title={`${s.label}: ${s.current} vs ${s.previous}`}>
            <Grow axis="y" pct={(s.current / max) * 100} delay={i * 0.05} className="rounded-t-md" style={{ background: `linear-gradient(180deg, ${LIGHT.rose}, ${SOFT.rose})` }} />
            <Grow axis="y" pct={(s.previous / max) * 100} delay={i * 0.05 + 0.04} className="rounded-t-md" style={{ background: `linear-gradient(180deg, ${SOFT.apricot}, ${LIGHT.apricot})` }} />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {series.map((s) => (
          <span key={s.label} className="flex-1 text-center font-sans text-label text-ink-500">
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ── 08 · Countdown (experimental) ────────────────────────────────────── */
export const AuraCountdown = ({ target }: { target: Date }) => {
  const { ref, seen } = useSeen<HTMLDivElement>(0.4);
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    if (!seen) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [seen]);
  const left = Math.max(0, Math.floor((target.getTime() - now) / 1000));
  const units: { v: number; u: string; accent: WidgetAccent }[] = [
    { v: Math.floor(left / 86400), u: 'days', accent: 'apricot' },
    { v: Math.floor((left % 86400) / 3600), u: 'hrs', accent: 'rose' },
    { v: Math.floor((left % 3600) / 60), u: 'min', accent: 'lavender' },
  ];
  return (
    <div ref={ref} className="flex items-stretch gap-3" role="timer" aria-label={`${units[0].v} days, ${units[1].v} hours, ${units[2].v} minutes`}>
      {units.map((x, i) => (
        <React.Fragment key={x.u}>
          {i > 0 && (
            <span aria-hidden className="self-center font-display text-subheading text-ink-200">
              :
            </span>
          )}
          <motion.div
            className="relative isolate min-w-16 overflow-hidden rounded-lg px-3 py-4 text-center text-ink-900 shadow-sm"
            style={{ backgroundImage: TILE[x.accent] }}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.36, delay: i * 0.08, ease: EASE_OUT }}
          >
            <span aria-hidden className="widget-bloom" />
            <span className="block font-display text-subheading tabular-nums">{String(x.v).padStart(2, '0')}</span>
            <span className="mt-1 block font-sans text-label uppercase text-ink-900">{x.u}</span>
          </motion.div>
        </React.Fragment>
      ))}
    </div>
  );
};

