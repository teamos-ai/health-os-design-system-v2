/**
 * CrmDashboard — a flat, on-brand CRM software mock for the signature CRM band.
 * Browser chrome + left rail + a four-column pipeline board of deal cards. Pure
 * hairline + tonal wells, mono labels, soft shadow, zero glass. Rough-in scaffold —
 * placeholder copy, to be wired to real records later. Decorative — aria-hidden.
 */
import { GitBranch, Users, CircleDollarSign, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { icon: GitBranch, label: 'Pipeline', active: true },
  { icon: Users, label: 'Contacts', active: false },
  { icon: CircleDollarSign, label: 'Deals', active: false },
  { icon: Inbox, label: 'Inbox', active: false },
];

interface Deal {
  name: string;
  value: string;
  dot: string;
  stage: string;
}

const COLUMNS: { title: string; count: number; deals: Deal[] }[] = [
  {
    title: 'New',
    count: 3,
    deals: [
      { name: 'Maya Robinson', value: '$1,200', dot: 'bg-brand-400', stage: 'Enquiry' },
      { name: 'James Patel', value: '$840', dot: 'bg-apricot-400', stage: 'Enquiry' },
    ],
  },
  {
    title: 'Contacted',
    count: 2,
    deals: [{ name: 'Sana Kaur', value: '$2,400', dot: 'bg-lavender-400', stage: 'Follow-up' }],
  },
  {
    title: 'Booked',
    count: 2,
    deals: [
      { name: 'Tom Nguyen', value: '$3,600', dot: 'bg-gold-400', stage: 'Consult' },
      { name: 'Aisha Bello', value: '$1,950', dot: 'bg-brand-400', stage: 'Consult' },
    ],
  },
  {
    title: 'Won',
    count: 1,
    deals: [{ name: 'Leo Marsh', value: '$4,800', dot: 'bg-success-600', stage: 'Programme' }],
  },
];

export const CrmDashboard = ({ className }: { className?: string }) => (
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
      <span className="font-mono text-caption text-ink-400">crm.healthos.com.au</span>
      <span className="w-10" />
    </div>

    <div className="flex min-h-[420px]">
      {/* Left rail */}
      <aside className="hidden w-52 flex-col border-r border-line bg-paper p-4 md:flex">
        <span className="mb-5 px-1 font-mono text-overline uppercase text-ink-500">Workspace</span>
        <nav className="flex flex-col gap-1">
          {NAV.map(({ icon: Icon, label, active }) => (
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
      </aside>

      {/* Pipeline board */}
      <main className="flex-1 overflow-hidden bg-surface p-5">
        <div className="mb-4 flex items-end justify-between">
          <h3 className="font-display text-h4 text-ink-900">Pipeline</h3>
          <span className="font-mono text-caption text-ink-400">8 open · $19.2k</span>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title} className="rounded-md border border-line bg-paper p-3">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="font-mono text-caption uppercase text-ink-600">{col.title}</span>
                <span className="font-mono text-caption text-ink-400">{col.count}</span>
              </div>
              <div className="flex flex-col gap-2">
                {col.deals.map((deal) => (
                  <div key={deal.name} className="rounded-md border border-line bg-surface p-2.5">
                    <div className="flex items-center gap-2">
                      <span className={cn('h-2 w-2 rounded-full', deal.dot)} />
                      <span className="font-sans text-body-sm text-ink-800">{deal.name}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-display text-body-sm text-ink-900">{deal.value}</span>
                      <span className="rounded-md bg-ink-100 px-1.5 py-0.5 font-mono text-[10px] uppercase text-ink-600">
                        {deal.stage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  </div>
);
