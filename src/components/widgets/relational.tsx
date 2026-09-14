/**
 * Widgets 09 to 16: relational pieces that answer who, when and how much.
 */
import { motion } from 'framer-motion';
import { APRICOT, ROSE, LAVENDER, INK } from '@/lib/palette';
import { EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Figure, Grow, useSeen } from './motion';
import { LIGHT, SOFT, BAR, SWEEP_BAR, type WidgetAccent } from './tones';

const AVATAR: Record<WidgetAccent | 'ink', string> = {
  apricot: `linear-gradient(140deg, ${APRICOT[200]}, ${APRICOT[50]})`,
  rose: `linear-gradient(140deg, ${ROSE[200]}, ${ROSE[50]})`,
  lavender: `linear-gradient(140deg, ${LAVENDER[200]}, ${LAVENDER[50]})`,
  ink: `linear-gradient(140deg, ${INK[200]}, ${INK[100]})`,
};
const SOLID = LIGHT;

export const Avatar = ({ initials, accent = 'rose', className }: { initials: string; accent?: WidgetAccent | 'ink'; className?: string }) => (
  <span
    className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-sans text-label text-ink-900', className)}
    style={{ backgroundImage: AVATAR[accent] }}
    aria-hidden
  >
    {initials}
  </span>
);

const Stagger = ({ children, i, className }: { children: React.ReactNode; i: number; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x: -8 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.36, delay: i * 0.06, ease: EASE_OUT }}
  >
    {children}
  </motion.div>
);

/* ── 09 · Leaderboard ─────────────────────────────────────────────────── */
export const Leaderboard = ({ rows }: { rows: { name: string; initials: string; value: number; accent: WidgetAccent }[] }) => {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <ol className="flex flex-col gap-3">
      {rows.map((r, i) => (
        <li key={r.name}>
          <Stagger i={i} className="flex items-center gap-3">
            <span className="w-4 shrink-0 text-center font-sans text-label text-ink-500">{i + 1}</span>
            <Avatar initials={r.initials} accent={r.accent} />
            <span className="flex min-w-0 flex-1 flex-col gap-2">
              <span className="truncate font-sans text-body text-ink-900">{r.name}</span>
              <span className="h-2 overflow-hidden rounded-md bg-ink-100">
                <Grow pct={(r.value / max) * 100} delay={i * 0.06} className="rounded-md" style={{ backgroundImage: BAR[r.accent] }} />
              </span>
            </span>
            <Figure value={r.value} className="shrink-0 font-display text-body text-ink-900" />
          </Stagger>
        </li>
      ))}
    </ol>
  );
};

/* ── 10 · Agenda ──────────────────────────────────────────────────────── */
export type AgendaStatus = 'confirmed' | 'pending' | 'new';
const STATUS: Record<AgendaStatus, string> = {
  confirmed: 'bg-success-100 text-ink-900 ring-1 ring-inset ring-success-300',
  pending: 'bg-apricot-50 text-ink-900 ring-1 ring-inset ring-apricot-200',
  new: 'bg-lavender-50 text-ink-900 ring-1 ring-inset ring-lavender-200',
};
export const Agenda = ({ rows }: { rows: { time: string; title: string; detail: string; status: AgendaStatus; accent: WidgetAccent }[] }) => (
  <ul className="flex flex-col divide-y divide-line-soft">
    {rows.map((r, i) => (
      <li key={r.time + r.title} className="py-3 first:pt-0">
        <Stagger i={i} className="flex items-center gap-3">
          <span className="w-12 shrink-0 font-sans text-label text-ink-600">{r.time}</span>
          <span aria-hidden className="h-8 w-1 shrink-0 rounded-full" style={{ background: SOLID[r.accent] }} />
          <span className="min-w-0 flex-1">
            <span className="block truncate font-sans text-body text-ink-900">{r.title}</span>
            <span className="block truncate font-sans text-label text-ink-500">{r.detail}</span>
          </span>
          <span className={cn('shrink-0 rounded-md px-2 py-1 font-sans text-label uppercase', STATUS[r.status])}>{r.status}</span>
        </Stagger>
      </li>
    ))}
  </ul>
);

/* ── 11 · Score gauge ─────────────────────────────────────────────────── */
export const ScoreGauge = ({ value, max = 100, unit }: { value: number; max?: number; unit: string }) => {
  const { ref, seen, reduced } = useSeen<SVGSVGElement>(0.4);
  return (
    <div className="relative mx-auto w-full max-w-52">
      <svg ref={ref} viewBox="0 0 200 108" className="block w-full overflow-visible" role="img" aria-label={`${value} of ${max}`}>
        <defs>
          <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={APRICOT[200]} />
            <stop offset="0.5" stopColor={ROSE[200]} />
            <stop offset="1" stopColor={LAVENDER[200]} />
          </linearGradient>
        </defs>
        <path d="M16 100 A84 84 0 0 1 184 100" fill="none" stroke={INK[100]} strokeWidth={14} strokeLinecap="round" />
        <motion.path
          d="M16 100 A84 84 0 0 1 184 100"
          fill="none"
          stroke="url(#gauge-grad)"
          strokeWidth={14}
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={seen ? { pathLength: value / max } : undefined}
          style={reduced ? { pathLength: value / max } : undefined}
          transition={{ duration: 1.4, ease: EASE_OUT }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <Figure value={value} className="block font-display text-heading text-ink-900" />
        <span className="font-sans text-label uppercase text-ink-500">{unit}</span>
      </div>
    </div>
  );
};

/* ── 12 · Breakdown bar ───────────────────────────────────────────────── */
export const BreakdownBar = ({ segments }: { segments: { label: string; value: number; accent: WidgetAccent }[] }) => {
  const total = segments.reduce((a, s) => a + s.value, 0);
  const { ref, seen, reduced } = useSeen<HTMLDivElement>(0.4);
  return (
    <div className="flex w-full flex-col gap-4">
      <div ref={ref} className="flex h-5 overflow-hidden rounded-md bg-ink-100">
        {segments.map((s, i) => (
          <motion.span
            key={s.label}
            className="h-full origin-left"
            style={{ width: `${(s.value / total) * 100}%`, background: SOLID[s.accent] }}
            initial={reduced ? false : { scaleX: 0 }}
            animate={seen ? { scaleX: 1 } : undefined}
            transition={{ duration: 0.6, delay: i * 0.18, ease: EASE_OUT }}
          />
        ))}
      </div>
      <ul className="flex flex-col gap-2">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2 font-sans text-body text-ink-600">
            <i aria-hidden className="h-2 w-2 rounded-full" style={{ background: SOLID[s.accent] }} />
            <span className="flex-1">{s.label}</span>
            <Figure value={Math.round((s.value / total) * 100)} suffix="%" className="font-display text-ink-900" />
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ── 13 · Activity heatmap ────────────────────────────────────────────── */
const HEAT = [INK[100], ROSE[50], `${ROSE[200]}99`, ROSE[200], LAVENDER[200]];
export const ActivityHeatmap = ({ weeks, caption }: { weeks: number[][]; caption: string }) => {
  const { ref, seen, reduced } = useSeen<HTMLDivElement>(0.3);
  const cells = weeks.flat();
  return (
    <div className="flex w-full flex-col gap-3">
      <div ref={ref} className="grid grid-cols-7 gap-1" role="img" aria-label={caption}>
        {cells.map((level, i) => (
          <motion.span
            key={i}
            className="aspect-square rounded-md"
            style={{ background: HEAT[level] }}
            initial={reduced ? false : { opacity: 0, scale: 0.6 }}
            animate={seen ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.36, delay: i * 0.018, ease: EASE_OUT }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between font-sans text-label uppercase text-ink-500">
        <span>Mon to Sun</span>
        <span className="flex items-center gap-1">
          Less
          {HEAT.map((c) => (
            <i key={c} aria-hidden className="h-3 w-3 rounded-md" style={{ background: c }} />
          ))}
          More
        </span>
      </div>
    </div>
  );
};

/* ── 14 · Revenue card ────────────────────────────────────────────────── */
export const RevenueCard = ({
  collected,
  billed,
  categories,
}: {
  collected: number;
  billed: number;
  categories: { label: string; value: number; accent: WidgetAccent }[];
}) => {
  const max = Math.max(...categories.map((c) => c.value));
  return (
    <div className="flex w-full flex-col gap-5">
      <div>
        <div className="flex flex-wrap items-baseline gap-3">
          <Figure value={collected} prefix="$" className="font-display text-heading text-ink-900" />
          <span className="font-sans text-label text-ink-500">collected of ${billed.toLocaleString('en-AU')} billed</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-md bg-ink-100">
          <Grow pct={(collected / billed) * 100} className="rounded-md" style={{ backgroundImage: SWEEP_BAR }} />
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {categories.map((c, i) => (
          <li key={c.label} className="flex items-center gap-3">
            <span className="w-28 shrink-0 font-sans text-body text-ink-600">{c.label}</span>
            <span className="h-2 flex-1 overflow-hidden rounded-md bg-ink-100">
              <Grow pct={(c.value / max) * 100} delay={0.2 + i * 0.08} className="rounded-md" style={{ backgroundImage: BAR[c.accent] }} />
            </span>
            <Figure value={c.value} prefix="$" className="w-20 shrink-0 text-right font-display text-body text-ink-900" />
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ── 15 · Avatar cluster ──────────────────────────────────────────────── */
export const AvatarCluster = ({
  people,
  total,
  caption,
}: {
  people: { initials: string; accent: WidgetAccent | 'ink' }[];
  total: number;
  caption: string;
}) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center">
      {people.map((p, i) => (
        <motion.span
          key={p.initials + i}
          className="-ml-2 first:ml-0"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.36, delay: i * 0.06, ease: EASE_OUT }}
        >
          <Avatar initials={p.initials} accent={p.accent} className="h-9 w-9 ring-2 ring-surface" />
        </motion.span>
      ))}
      <span className="-ml-2 flex h-9 w-9 items-center justify-center rounded-md bg-ink-100 font-sans text-label text-ink-900 ring-2 ring-surface">
        +{total - people.length}
      </span>
      <button
        type="button"
        aria-label="Add a person"
        className="-ml-2 flex h-9 w-9 items-center justify-center rounded-md border border-dashed border-ink-400 bg-surface font-sans text-body text-ink-500 transition-colors hover:border-ink-900 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apricot-400"
      >
        +
      </button>
    </div>
    <p className="font-sans text-body text-ink-600">{caption}</p>
  </div>
);

/* ── 16 · Conversion funnel ───────────────────────────────────────────── */
export const ConversionFunnel = ({ stages }: { stages: { label: string; value: number; note: string; accent: WidgetAccent }[] }) => {
  const max = stages[0]?.value ?? 1;
  return (
    <div className="flex w-full flex-col gap-3">
      {stages.map((s, i) => (
        <div key={s.label} className="flex items-center gap-4">
          <span className="w-32 shrink-0 text-right font-sans text-body text-ink-600">{s.label}</span>
          <span className="flex flex-1 justify-center">
            <FunnelBar pct={(s.value / max) * 100} accent={s.accent} delay={i * 0.15}>
              <Figure value={s.value} className="font-display text-subheading" />
            </FunnelBar>
          </span>
          <span className="w-28 shrink-0 font-sans text-label text-ink-500">{s.note}</span>
        </div>
      ))}
    </div>
  );
};


const FunnelBar = ({ pct, accent, delay, children }: { pct: number; accent: WidgetAccent; delay: number; children: React.ReactNode }) => {
  const { ref, seen, reduced } = useSeen<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className="relative flex h-12 min-w-28 items-center justify-center" style={{ width: `${pct}%` }}>
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-md shadow-sm"
        style={{ backgroundImage: `linear-gradient(150deg, ${LIGHT[accent]}, ${SOFT[accent]})` }}
        initial={reduced ? false : { scaleX: 0.15, opacity: 0 }}
        animate={seen ? { scaleX: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.8, delay, ease: EASE_OUT }}
      />
      <span className="relative text-ink-900">{children}</span>
    </div>
  );
};
