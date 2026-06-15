/**
 * CrmSection — rough-in scaffold for the "CRM software" surface. The full CrmDashboard
 * mock leads, then a row of the smaller CRM pieces it is built from: a contacts list, a
 * metric strip and a live activity feed. Decorative placeholder data, to be wired later.
 */
import { Section, Demo } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { MonoLabel } from '@/components/ui/mono-label';
import { BreathingDot } from '@/components/ui/animated';
import { CrmDashboard } from '@/components/ui/crm-dashboard';
import { Counter, StatTrend } from '@/components/ui/counters';
import { cn } from '@/lib/utils';

const ROUGH = <Badge variant="outline" size="sm">Rough scaffold</Badge>;

const CONTACTS: { name: string; status: string; variant: 'success' | 'apricot' | 'lavender'; well: string }[] = [
  { name: 'Maya Robinson', status: 'Active', variant: 'success', well: 'bg-rose-50 text-brand-600' },
  { name: 'James Patel', status: 'New', variant: 'apricot', well: 'bg-apricot-50 text-apricot-600' },
  { name: 'Sana Kaur', status: 'Follow-up', variant: 'lavender', well: 'bg-lavender-50 text-lavender-600' },
];

const ACTIVITY: { who: string; what: string; when: string }[] = [
  { who: 'Leo Marsh', what: 'booked a consult', when: '2m' },
  { who: 'Aisha Bello', what: 'completed intake form', when: '18m' },
  { who: 'Tom Nguyen', what: 'paid invoice #1042', when: '1h' },
];

const initials = (name: string) =>
  name.split(' ').map((p) => p[0]).slice(0, 2).join('');

export const CrmSection = () => (
  <Section
    id="crm"
    eyebrow="Software"
    title="CRM software"
    lead="The product surface itself — a flat, on-brand CRM. The full pipeline board leads, then the smaller pieces it is assembled from: a contacts list, a metric strip and a live activity feed."
  >
    <div className="flex flex-col gap-8">
      <CrmDashboard className="mx-auto max-w-5xl" />

      <Demo label="CRM building blocks" action={ROUGH} padded={false}>
      <div className="grid gap-5 p-6 lg:grid-cols-3">
        {/* Contacts list */}
        <div className="rounded-lg border border-line bg-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <MonoLabel>Contacts</MonoLabel>
            <Badge variant="outline" size="sm">3 shown</Badge>
          </div>
          <ul className="flex flex-col gap-3">
            {CONTACTS.map((c) => (
              <li key={c.name} className="flex items-center gap-3">
                <span
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-md font-mono text-caption font-bold',
                    c.well
                  )}
                >
                  {initials(c.name)}
                </span>
                <span className="flex-1 font-sans text-body-sm text-ink-800">{c.name}</span>
                <Badge variant={c.variant} size="sm">{c.status}</Badge>
              </li>
            ))}
          </ul>
        </div>

        {/* Metric strip */}
        <div className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-5">
          <MonoLabel>This month</MonoLabel>
          <StatTrend value={42} delta={8.6} label="new enquiries" />
          <div className="flex items-baseline gap-2">
            <span className="font-display text-h2 leading-none text-ink-900 tabular-nums">
              <Counter to={19.2} decimals={1} prefix="$" suffix="k" />
            </span>
            <span className="font-mono text-caption text-ink-500">open pipeline</span>
          </div>
        </div>

        {/* Activity feed */}
        <div className="rounded-lg border border-line bg-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <MonoLabel>Activity</MonoLabel>
            <MonoLabel tone="success" trailing={<BreathingDot color="bg-success-600" />}>
              Live
            </MonoLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {ACTIVITY.map((a) => (
              <li key={a.who} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                <span className="flex-1 font-sans text-body-sm leading-snug text-ink-700">
                  <span className="text-ink-900">{a.who}</span> {a.what}
                </span>
                <span className="font-mono text-caption text-ink-400">{a.when}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </Demo>
    </div>
  </Section>
);
