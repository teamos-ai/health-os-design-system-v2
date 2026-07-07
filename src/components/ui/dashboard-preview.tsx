/**
 * DashboardPreview — a flat, on-brand mini product mockup for the hero payoff
 * (design.md hero = "dashboard mockup"). Browser chrome + sidebar + a calm "today"
 * card + stat tiles + a tiny bar row. Pure hairline + tonal wells, zero glass.
 * Decorative — aria-hidden so screen readers skip the faux UI.
 */
import {
  CalendarCheck,
  Users,
  GraduationCap,
  Megaphone,
  LayoutDashboard,
} from 'lucide-react';
import { LogoMark } from '@/components/brand/Logo';
import { cn } from '@/lib/utils';

const SIDEBAR = [
  { icon: LayoutDashboard, label: 'Today', active: true },
  { icon: CalendarCheck, label: 'Calendar', active: false },
  { icon: Users, label: 'Clients', active: false },
  { icon: GraduationCap, label: 'Courses', active: false },
  { icon: Megaphone, label: 'Marketing', active: false },
];

const TODAY = [
  { time: '9:00', name: 'Initial consult — Maya R.', tone: 'bg-brand-400' },
  { time: '11:30', name: 'Follow-up — James P.', tone: 'bg-lavender-400' },
  { time: '2:15', name: 'Programme review — Sana K.', tone: 'bg-apricot-400' },
];

const BARS = [38, 52, 44, 61, 70, 58, 76];

export const DashboardPreview = ({ className }: { className?: string }) => (
  <div
    aria-hidden
    className={cn(
      'overflow-hidden rounded-xl border border-line bg-surface shadow-lg',
      className
    )}
  >
    {/* Browser chrome */}
    <div className="flex items-center justify-between border-b border-line bg-paper px-4 py-3">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
      </div>
      <span className="font-mono text-caption text-ink-400">app.healthos.com.au</span>
      <span className="w-10" />
    </div>

    <div className="flex h-[440px]">
      {/* Sidebar */}
      <aside className="hidden w-56 flex-col border-r border-line bg-paper p-4 md:flex">
        <div className="mb-7 px-1">
          <LogoMark size={26} />
        </div>
        <nav className="flex flex-col gap-1">
          {SIDEBAR.map(({ icon: Icon, label, active }) => (
            <span
              key={label}
              className={cn(
                'flex items-center gap-2.5 rounded-md px-3 py-2 font-mono text-body-sm',
                active ? 'bg-rose-50 text-brand-700' : 'text-ink-500'
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
              {label}
            </span>
          ))}
        </nav>
        <div className="mt-auto rounded-lg border border-line bg-surface p-4">
          <p className="font-mono text-caption text-ink-500">Live in 30 days</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
            <div className="h-full w-[72%] rounded-full bg-brand-gradient" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-hidden bg-surface p-6">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h3 className="font-display text-h4 text-ink-900">Good morning</h3>
            <p className="font-mono text-caption text-ink-400">Tuesday — three appointments today</p>
          </div>
          <span className="rounded-full bg-success-100 px-2.5 py-1 font-mono text-label uppercase text-success-700">
            On track
          </span>
        </div>

        {/* Today card */}
        <div className="rounded-lg border border-line bg-paper p-5">
          <p className="mb-3 font-mono text-overline uppercase text-ink-500">Today</p>
          <div className="flex flex-col gap-2.5">
            {TODAY.map((row) => (
              <div key={row.time} className="flex items-center gap-3 rounded-md border border-line bg-surface px-3 py-2.5">
                <span className={cn('h-2 w-2 rounded-full', row.tone)} />
                <span className="w-12 font-mono text-body-sm text-ink-500">{row.time}</span>
                <span className="font-sans text-body-sm text-ink-700">{row.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stat tiles + mini chart */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="rounded-lg border border-line bg-surface p-4">
            <div className="font-display text-h3 text-ink-900">24</div>
            <div className="mt-1 font-mono text-caption text-ink-400">Bookings this week</div>
          </div>
          <div className="rounded-lg border border-line bg-surface p-4">
            <div className="font-display text-h3 text-ink-900">$8.4k</div>
            <div className="mt-1 font-mono text-caption text-ink-400">Revenue booked</div>
          </div>
          <div className="flex flex-col rounded-lg border border-line bg-surface p-4">
            <div className="mb-2 font-mono text-caption text-ink-400">New enquiries</div>
            <div className="flex flex-1 items-end gap-1">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-sm bg-rose-100"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
);
