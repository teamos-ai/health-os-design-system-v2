/**
 * DashboardPreview: an illustrative product mockup built from system parts (sample data).
 * Decorative and aria-hidden. Replace with a real, cleaned product screenshot once one
 * exists: real screens beat mockups.
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
  { time: '9:00', name: 'Initial consult, Maya R.', tone: 'bg-rose-200' },
  { time: '11:30', name: 'Follow-up, James P.', tone: 'bg-lavender-200' },
  { time: '2:15', name: 'Program review, Sana K.', tone: 'bg-apricot-200' },
];

const BARS = [38, 52, 44, 61, 70, 58, 76];

export const DashboardPreview = ({ className }: { className?: string }) => (
  <div
    aria-hidden
    className={cn(
      'overflow-hidden rounded-lg border border-line bg-surface shadow-lg',
      className
    )}
  >
    {/* Browser chrome */}
    <div className="flex items-center justify-between border-b border-line bg-paper px-4 py-3">
      <div className="flex gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
      </div>
      <span className="font-sans text-label text-ink-500">app.healthos.com.au</span>
      <span className="w-10" />
    </div>

    <div className="flex md:h-[440px]">
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
                'flex items-center gap-3 rounded-md px-3 py-2 font-sans text-body',
                active ? 'bg-rose-50 text-ink-900' : 'text-ink-500'
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
              {label}
            </span>
          ))}
        </nav>
        <div className="mt-auto rounded-lg border border-line bg-surface p-4">
          <p className="font-sans text-label text-ink-500">Setup progress</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
            <div className="h-full w-[72%] rounded-full bg-rose-200" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="min-w-0 flex-1 overflow-hidden bg-surface p-4 md:p-6">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-subheading text-ink-900">Good morning</h3>
            <p className="font-sans text-label text-ink-500">Tuesday, three appointments today</p>
          </div>
          <span className="rounded-md bg-success-100 px-3 py-1 font-sans text-label uppercase text-ink-900">
            On track
          </span>
        </div>

        {/* Today card */}
        <div className="rounded-lg border border-line bg-paper p-4 md:p-5">
          <p className="mb-3 font-sans text-label uppercase text-ink-500">Today</p>
          <div className="flex flex-col gap-3">
            {TODAY.map((row) => (
              <div key={row.time} className="flex min-w-0 items-center gap-3 rounded-md border border-line bg-surface px-3 py-3">
                <span className={cn('h-2 w-2 shrink-0 rounded-full', row.tone)} />
                <span className="w-12 shrink-0 font-sans text-body text-ink-500">{row.time}</span>
                <span className="truncate font-sans text-body text-ink-900">{row.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stat tiles + mini chart */}
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-line bg-surface p-4">
            <div className="font-display text-subheading text-ink-900">24</div>
            <div className="mt-1 font-sans text-label text-ink-500">Bookings this week</div>
          </div>
          <div className="rounded-lg border border-line bg-surface p-4">
            <div className="font-display text-subheading text-ink-900">$8.4k</div>
            <div className="mt-1 font-sans text-label text-ink-500">Revenue booked</div>
          </div>
          <div className="hidden flex-col rounded-lg border border-line bg-surface p-4 sm:flex">
            <div className="mb-2 font-sans text-label text-ink-500">New enquiries</div>
            <div className="flex flex-1 items-end gap-1">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-md bg-rose-50"
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
