/**
 * PracticeDashboard — a flat, on-brand admin/analytics dashboard mock for the signature
 * band. Recreates a classic store-admin "Overview" layout (dark rail + welcome header +
 * stat cards + a performance line chart + a category donut) in the Health OS palette and
 * voice: a practitioner's practice dashboard, apricot-led with lavender second and only a
 * light touch of pink, so it stays warm and gender-neutral rather than tipping feminine.
 *
 * Brand notes: the carbon rail and the dark hero stat card are FIXED #1F1F1F grounds in
 * every theme, so their text uses FIXED colours (white / apricot-300), never the
 * theme-flipping ink-* tokens. The main content uses surface/paper/ink tokens so it adapts
 * per mode. Flat hairlines + tonal wells, zero glass, neutral shadow. Decorative —
 * aria-hidden; the charts are hand-drawn SVG (no chart dependency).
 */
import {
  LayoutGrid,
  MessageSquare,
  Users,
  CalendarCheck,
  BookOpen,
  Settings as SettingsIcon,
  Search,
  Bell,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Wallet,
  LifeBuoy,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { APRICOT, ROSE, LAVENDER } from '@/lib/palette';

/* ── Left rail nav ─────────────────────────────────────────────────────────── */
const NAV = [
  { icon: LayoutGrid, label: 'Overview', active: true, sub: ['Summary', 'Custom view'] },
  { icon: MessageSquare, label: 'Messages', badge: '2' },
  { icon: Users, label: 'Clients' },
  { icon: CalendarCheck, label: 'Sessions' },
  { icon: BookOpen, label: 'Programmes' },
  { icon: SettingsIcon, label: 'Settings' },
];

/* ── Performance chart data (0–60 scale) ───────────────────────────────────── */
const DAYS = ['03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16'];
const REVENUE = [30, 42, 40, 44, 38, 58, 52, 13, 30, 40, 38, 11, 22, 48];
const COSTS = [50, 38, 36, 30, 42, 40, 30, 28, 32, 20, 18, 22, 26, 30];

const CW = 504; // chart plot width
const CH = 150; // chart plot height
const X0 = 40; // left gutter (y labels)
const Y0 = 16; // top padding (value 60)
const MAX = 60;
const xAt = (i: number) => X0 + (i * CW) / (DAYS.length - 1);
const yAt = (v: number) => Y0 + (1 - v / MAX) * CH;
const linePts = (vals: number[]) => vals.map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`).join(' ');
const areaPath = (vals: number[]) =>
  `M ${xAt(0)},${Y0 + CH} ` + vals.map((v, i) => `L ${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`).join(' ') + ` L ${xAt(vals.length - 1)},${Y0 + CH} Z`;

/* ── Category donut ────────────────────────────────────────────────────────── */
const R = 52;
const C = 2 * Math.PI * R;
const SEGMENTS = [
  { label: 'Coaching', pct: 0.5, color: APRICOT[400] }, // apricot — leads
  { label: 'Courses', pct: 0.3, color: LAVENDER[400] }, // lavender — second
  { label: 'Memberships', pct: 0.2, color: ROSE[300] }, // light pink — minimal
];

/* ── Stat cards ────────────────────────────────────────────────────────────── */
const StatTrend = ({ up, value, sub, good = true }: { up: boolean; value: string; sub: string; good?: boolean }) => (
  <div className="mt-3 flex items-center gap-2">
    <span className={cn('inline-flex items-center gap-1 font-display text-body-sm', good ? 'text-success-700' : 'text-danger-600')}>
      {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
      {value}
    </span>
    <span className="font-mono text-caption text-ink-400">{sub}</span>
  </div>
);

export const PracticeDashboard = ({ className }: { className?: string }) => (
  <div
    aria-hidden
    className={cn('overflow-hidden rounded-xl border border-line bg-paper shadow-lg', className)}
  >
    <div className="flex min-h-[560px]">
      {/* ── Carbon left rail (fixed dark — fixed text colours) ───────────────── */}
      <aside className="hidden w-56 shrink-0 flex-col bg-carbon p-4 md:flex">
        <div className="flex items-center gap-2 px-2 py-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 font-display text-body-sm font-semibold text-white">@</span>
          <span className="font-display text-body-md font-semibold text-white">Your practice</span>
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-0.5">
          {NAV.map(({ icon: Icon, label, active, badge, sub }) => (
            <div key={label}>
              <span
                className={cn(
                  'flex items-center gap-2.5 rounded-md px-3 py-2 font-mono text-body-sm',
                  active ? 'bg-white/10 text-white' : 'text-white/55'
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-md bg-apricot-400 px-1 font-mono text-micro font-semibold tracking-normal text-carbon">
                    {badge}
                  </span>
                )}
                {active && <ChevronDown className="h-3.5 w-3.5 text-white/60" />}
              </span>
              {sub && (
                <div className="ml-9 mt-0.5 flex flex-col gap-0.5">
                  <span className="rounded-md bg-white/5 px-3 py-1.5 font-mono text-caption text-white/90">{sub[0]}</span>
                  <span className="px-3 py-1.5 font-mono text-caption text-apricot-300">{sub[1]}</span>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-4 flex flex-col gap-0.5 border-t border-white/10 pt-4">
          <span className="flex items-center gap-2.5 px-3 py-1.5 font-mono text-caption text-white/45"><LifeBuoy className="h-3.5 w-3.5" strokeWidth={1.5} />Help</span>
          <span className="flex items-center gap-2.5 px-3 py-1.5 font-mono text-caption text-white/45"><LogOut className="h-3.5 w-3.5" strokeWidth={1.5} />Log out</span>
        </div>
      </aside>

      {/* ── Main column ──────────────────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 border-b border-line bg-surface px-5 py-4">
          <div>
            <h3 className="font-display text-h4 text-ink-900">Welcome back, Hayley</h3>
            <p className="mt-0.5 font-sans text-body-sm text-ink-500">Here's how your practice is tracking today.</p>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="flex items-center gap-2 rounded-md bg-paper px-3 py-2 font-mono text-caption text-ink-400">
              <Search className="h-3.5 w-3.5" /> Search
            </span>
            <span className="relative flex h-9 w-9 items-center justify-center rounded-md bg-paper text-ink-500">
              <Bell className="h-4 w-4" strokeWidth={1.5} />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-apricot-400 font-mono text-micro font-semibold tracking-normal text-carbon">4</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-gradient-warm font-display text-body-sm font-semibold text-carbon">H</span>
              <span className="font-sans text-body-sm text-ink-700">Hayley Quinn</span>
            </span>
          </div>
        </header>

        {/* Body */}
        <div className="flex flex-col gap-4 p-5">
          {/* Stat cards */}
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Hero card — carbon (fixed dark) */}
            <div className="flex flex-col justify-between rounded-lg bg-carbon p-5">
              <div className="flex items-start justify-between">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-apricot-300"><Wallet className="h-4 w-4" /></span>
                  <span className="flex flex-col">
                    <span className="font-display text-body-md font-semibold text-white">Revenue</span>
                    <span className="font-mono text-caption text-white/50">731 sessions</span>
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 text-white/40" />
              </div>
              <div className="mt-5">
                <span className="font-display text-display-lg leading-none text-white">$9,328</span>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 font-display text-body-sm text-apricot-300"><TrendingUp className="h-3.5 w-3.5" />+15.6%</span>
                  <span className="font-mono text-caption text-white/50">+1.4k this week</span>
                </div>
              </div>
            </div>

            {/* Clients */}
            <div className="flex flex-col justify-between rounded-lg border border-line bg-surface p-5">
              <div className="flex items-start justify-between">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-apricot-50 text-apricot-600"><Users className="h-4 w-4" /></span>
                  <span className="flex flex-col">
                    <span className="font-display text-body-md font-semibold text-ink-900">Active clients</span>
                    <span className="font-mono text-caption text-ink-400">Avg. session 50m</span>
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 text-ink-300" />
              </div>
              <div className="mt-5">
                <span className="font-display text-display-lg leading-none text-ink-900">312</span>
                <StatTrend up value="+12.7%" sub="+18 this week" />
              </div>
            </div>

            {/* Cancellations */}
            <div className="flex flex-col justify-between rounded-lg border border-line bg-surface p-5">
              <div className="flex items-start justify-between">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-lavender-100 text-lavender-700"><CalendarCheck className="h-4 w-4" /></span>
                  <span className="flex flex-col">
                    <span className="font-display text-body-md font-semibold text-ink-900">Cancellations</span>
                    <span className="font-mono text-caption text-ink-400">2 awaiting</span>
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 text-ink-300" />
              </div>
              <div className="mt-5">
                <span className="font-display text-display-lg leading-none text-ink-900">9</span>
                <StatTrend up={false} value="-12.7%" sub="fewer than last week" good />
              </div>
            </div>
          </div>

          {/* Chart + donut */}
          <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
            {/* Performance line chart */}
            <div className="rounded-lg border border-line bg-surface p-5">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-body-md font-semibold text-ink-900">Practice performance</h4>
                <div className="flex items-center gap-4 font-mono text-caption text-ink-500">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-apricot-400" />Revenue</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-lavender-400" />Costs</span>
                </div>
              </div>
              <svg viewBox="0 0 560 190" className="mt-3 w-full" role="presentation">
                {/* grid + y labels */}
                {[0, 10, 20, 30, 40, 50, 60].map((v) => (
                  <g key={v}>
                    <line x1={X0} y1={yAt(v)} x2={X0 + CW} y2={yAt(v)} stroke="currentColor" className="text-line" strokeWidth="1" />
                    <text x={X0 - 8} y={yAt(v) + 3} textAnchor="end" className="fill-ink-400 font-mono" fontSize="9">{v}</text>
                  </g>
                ))}
                {/* apricot area + line (leads) */}
                <path d={areaPath(REVENUE)} className="fill-apricot-400" opacity="0.1" />
                <polyline points={linePts(COSTS)} fill="none" stroke={LAVENDER[400]} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" opacity="0.8" />
                <polyline points={linePts(REVENUE)} fill="none" stroke={APRICOT[400]} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                {REVENUE.map((v, i) => (
                  <circle key={i} cx={xAt(i)} cy={yAt(v)} r="3" className="fill-surface" stroke={APRICOT[400]} strokeWidth="2" />
                ))}
                {/* x labels */}
                {DAYS.map((d, i) => (
                  <text key={d} x={xAt(i)} y={Y0 + CH + 18} textAnchor="middle" className="fill-ink-400 font-mono" fontSize="8">{d}</text>
                ))}
              </svg>
            </div>

            {/* Top programmes donut */}
            <div className="rounded-lg border border-line bg-surface p-5">
              <h4 className="font-display text-body-md font-semibold text-ink-900">Top programmes</h4>
              <div className="mt-2 flex items-center justify-center">
                <svg viewBox="0 0 140 140" className="h-36 w-36 -rotate-90" role="presentation">
                  <circle cx="70" cy="70" r={R} fill="none" stroke="currentColor" className="text-ink-100" strokeWidth="14" />
                  {SEGMENTS.reduce<{ nodes: JSX.Element[]; offset: number }>(
                    (acc, s, i) => {
                      const len = s.pct * C - 4; // small gap
                      acc.nodes.push(
                        <circle
                          key={i}
                          cx="70"
                          cy="70"
                          r={R}
                          fill="none"
                          stroke={s.color}
                          strokeWidth="14"
                          strokeLinecap="round"
                          strokeDasharray={`${len} ${C - len}`}
                          strokeDashoffset={-acc.offset}
                        />
                      );
                      acc.offset += s.pct * C;
                      return acc;
                    },
                    { nodes: [], offset: 0 }
                  ).nodes}
                  <text x="70" y="68" textAnchor="middle" className="rotate-90 fill-ink-900 font-display" fontSize="20" fontWeight="600" style={{ transformOrigin: '70px 70px' }}>$6.2k</text>
                  <text x="70" y="84" textAnchor="middle" className="rotate-90 fill-ink-400 font-mono" fontSize="8" style={{ transformOrigin: '70px 70px' }}>this month</text>
                </svg>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {SEGMENTS.map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-sans text-body-sm text-ink-700">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
                      {s.label}
                    </span>
                    <span className="font-mono text-caption text-ink-400">{Math.round(s.pct * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
