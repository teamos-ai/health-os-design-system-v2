/**
 * WidgetsSection: the full widget library, grouped. Each widget is live and functional,
 * animates into view, and is captioned from the catalogue with its job, its inputs and,
 * where it applies, an experimental label. All figures are sample data.
 */
import type { ReactNode } from 'react';
import { CalendarCheck, CheckCircle2, Users } from 'lucide-react';
import { Section } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { entry } from '@/showcase/catalog';
import { cn } from '@/lib/utils';
import {
  AuraStatTiles,
  GradientRing,
  CapacityMeter,
  TrendCard,
  LiveTimer,
  TrackingCluster,
  BarCluster,
  AuraCountdown,
  Leaderboard,
  Agenda,
  ScoreGauge,
  BreakdownBar,
  ActivityHeatmap,
  RevenueCard,
  AvatarCluster,
  ConversionFunnel,
  MetricStrip,
  CategoryDonut,
  ProgressRows,
  TickedGauge,
  GoalProgress,
  Comparison,
  MiniCalendar,
  SlotPicker,
  OnboardingStepper,
  PlanCard,
  ToggleSettings,
  ActivityFeed,
  RatingSummary,
  AssistantMessage,
  CheckIn,
} from '@/components/widgets';

type Span = 'third' | 'half' | 'full';
const SPAN: Record<Span, string> = { third: 'md:col-span-2', half: 'md:col-span-3', full: 'md:col-span-6' };

const Widget = ({ id, span = 'third', children, align = 'center' }: { id: string; span?: Span; children: ReactNode; align?: 'center' | 'start' }) => {
  const e = entry(id);
  return (
    <figure className={cn('flex min-w-0 flex-col', SPAN[span])}>
      <div
        className={cn(
          'flex min-h-52 flex-1 rounded-lg border border-line bg-surface p-6',
          align === 'center' ? 'items-center justify-center' : 'flex-col items-stretch justify-start'
        )}
      >
        {children}
      </div>
      <figcaption className="mt-3 flex flex-col gap-1 px-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-sans text-label uppercase text-ink-900">
            {e.number} · {e.name}
          </span>
          {e.status === 'experimental' && (
            <Badge variant="lavender" size="sm">
              Experimental
            </Badge>
          )}
        </span>
        <span className="font-sans text-body text-ink-600">{e.purpose}</span>
        <span className="font-sans text-label text-ink-500">
          <span className="uppercase">Use for</span> {e.use[0]}
          {e.avoid[0] ? (
            <>
              {' '}
              <span className="uppercase">· Not for</span> {e.avoid[0]}
            </>
          ) : null}
        </span>
        <span className="font-sans text-label text-ink-500">
          <span className="uppercase">Inputs</span> {e.api}
        </span>
      </figcaption>
    </figure>
  );
};

const Group = ({ title, children }: { title: string; children: ReactNode }) => (
  <div>
    <div className="mb-6 flex items-center gap-4">
      <h3 className="font-display text-subheading text-ink-900">{title}</h3>
      <span aria-hidden className="h-px flex-1 bg-line" />
    </div>
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-6">{children}</div>
  </div>
);

/* Sample data: the next webinar starts nine days after the page is opened. */
const WEBINAR_START = new Date(Date.now() + (9 * 86400 + 14 * 3600 + 32 * 60) * 1000);

export const WidgetsSection = () => (
  <Section id="widgets" className="[&>div]:max-w-6xl">
    <div className="flex flex-col gap-16">
      <Group title="Headline figures">
        <Widget id="widget-01" span="full">
          <AuraStatTiles
            items={[
              { label: 'Tasks in progress', value: 15, icon: CheckCircle2, accent: 'apricot' },
              { label: 'Sessions this month', value: 97, icon: CalendarCheck, accent: 'rose' },
              { label: 'Active members', value: 1284, icon: Users, accent: 'lavender' },
            ]}
          />
        </Widget>
        <Widget id="widget-02">
          <GradientRing value={75} unit="of plan" caption="4 of 6 modules complete" />
        </Widget>
        <Widget id="widget-03">
          <CapacityMeter used={128} total={200} unit="seats" note="Saturday class" />
        </Widget>
        <Widget id="widget-04">
          <TrendCard label="Show-up rate" value={94} suffix="%" delta={12.4} points={[62, 70, 66, 78, 74, 88, 84, 91, 94]} />
        </Widget>
        <Widget id="widget-05" span="half">
          <LiveTimer label="Onboarding call, Priya K." startSeconds={27600} />
        </Widget>
        <Widget id="widget-06" span="half">
          <TrackingCluster
            items={[
              { label: 'New', value: 30, accent: 'apricot' },
              { label: 'Returning', value: 80, accent: 'rose' },
              { label: 'Reactivated', value: 50, accent: 'lavender' },
            ]}
          />
        </Widget>
        <Widget id="widget-07" span="half">
          <BarCluster
            currentLabel="This year"
            previousLabel="Last year"
            series={[
              { label: 'Jan', current: 50, previous: 28 },
              { label: 'Feb', current: 74, previous: 88 },
              { label: 'Mar', current: 34, previous: 20 },
              { label: 'Apr', current: 90, previous: 56 },
              { label: 'May', current: 60, previous: 44 },
              { label: 'Jun', current: 100, previous: 38 },
            ]}
          />
        </Widget>
        <Widget id="widget-08" span="half">
          <AuraCountdown target={WEBINAR_START} />
        </Widget>
      </Group>

      <Group title="Relational">
        <Widget id="widget-09" span="half" align="start">
          <Leaderboard
            rows={[
              { name: 'Priya Kapoor', initials: 'PK', value: 42, accent: 'rose' },
              { name: 'Marcus Vaughn', initials: 'MV', value: 36, accent: 'apricot' },
              { name: 'Elena Fischer', initials: 'EF', value: 32, accent: 'lavender' },
              { name: 'Tom Okafor', initials: 'TO', value: 25, accent: 'rose' },
              { name: 'Aisha Rahman', initials: 'AR', value: 21, accent: 'apricot' },
            ]}
          />
        </Widget>
        <Widget id="widget-10" span="half" align="start">
          <Agenda
            rows={[
              { time: '09:00', title: 'Onboarding call', detail: 'Priya Kapoor, 45 min', status: 'confirmed', accent: 'rose' },
              { time: '10:30', title: 'Initial assessment', detail: 'Marcus Vaughn, 60 min', status: 'pending', accent: 'apricot' },
              { time: '13:00', title: 'Group session', detail: '8 of 10 booked', status: 'confirmed', accent: 'lavender' },
              { time: '15:15', title: 'Intro call', detail: 'New enquiry from the website', status: 'new', accent: 'rose' },
            ]}
          />
        </Widget>
        <Widget id="widget-11">
          <ScoreGauge value={72} unit="satisfaction" />
        </Widget>
        <Widget id="widget-12" align="start">
          <BreakdownBar
            segments={[
              { label: 'New', value: 34, accent: 'apricot' },
              { label: 'Returning', value: 52, accent: 'rose' },
              { label: 'Reactivated', value: 14, accent: 'lavender' },
            ]}
          />
        </Widget>
        <Widget id="widget-13" align="start">
          <ActivityHeatmap
            caption="Booking density across five weeks"
            weeks={[
              [2, 3, 4, 2, 3, 1, 0],
              [3, 4, 4, 3, 4, 2, 1],
              [1, 2, 3, 4, 3, 2, 0],
              [4, 3, 4, 2, 4, 3, 1],
              [2, 4, 3, 3, 4, 1, 0],
            ]}
          />
        </Widget>
        <Widget id="widget-14" span="half" align="start">
          <RevenueCard
            collected={12480}
            billed={14200}
            categories={[
              { label: 'Memberships', value: 7240, accent: 'rose' },
              { label: 'Sessions', value: 3180, accent: 'apricot' },
              { label: 'Products', value: 2060, accent: 'lavender' },
            ]}
          />
        </Widget>
        <Widget id="widget-15" span="half">
          <AvatarCluster
            people={[
              { initials: 'PK', accent: 'rose' },
              { initials: 'MV', accent: 'apricot' },
              { initials: 'EF', accent: 'lavender' },
              { initials: 'TO', accent: 'rose' },
              { initials: 'AR', accent: 'ink' },
            ]}
            total={25}
            caption="25 people across 3 locations, 4 online now"
          />
        </Widget>
        <Widget id="widget-16" span="full">
          <ConversionFunnel
            stages={[
              { label: 'Enquiries', value: 1420, note: 'Website and referral', accent: 'apricot' },
              { label: 'Booked a call', value: 540, note: '38% of enquiries', accent: 'rose' },
              { label: 'Became members', value: 168, note: '31% of calls', accent: 'lavender' },
            ]}
          />
        </Widget>
      </Group>

      <Group title="Metrics and charts">
        <Widget id="widget-17" span="full">
          <MetricStrip
            period="this week"
            items={[
              { label: 'Revenue', value: 17.9, prefix: '$', suffix: 'k', decimals: 1, delta: 8.2 },
              { label: 'Bookings', value: 342, delta: 4.1 },
              { label: 'Show-up', value: 94, suffix: '%', delta: 1.3 },
              { label: 'Cancellations', value: 2.1, suffix: '%', decimals: 1, delta: -0.4 },
            ]}
          />
        </Widget>
        <Widget id="widget-18">
          <CategoryDonut
            totalLabel="total"
            totalValue="$17.9k"
            segments={[
              { label: 'Memberships', value: 42, accent: 'apricot' },
              { label: 'Sessions', value: 26, accent: 'rose' },
              { label: 'Retail', value: 20, accent: 'lavender' },
              { label: 'Other', value: 12, accent: 'ink' },
            ]}
          />
        </Widget>
        <Widget id="widget-19" align="start">
          <ProgressRows
            rows={[
              { label: 'Perth', value: 82, accent: 'rose' },
              { label: 'Melbourne', value: 64, accent: 'apricot' },
              { label: 'Sydney', value: 45, accent: 'lavender' },
            ]}
          />
        </Widget>
        <Widget id="widget-20">
          <TickedGauge value={78} unit="booked" />
        </Widget>
        <Widget id="widget-21" span="half" align="start">
          <GoalProgress label="Monthly goal" current={14200} target={18000} onTrack />
        </Widget>
        <Widget id="widget-22" span="half">
          <Comparison current={342} previous={316} currentLabel="This week" previousLabel="Last week" unit="bookings" />
        </Widget>
      </Group>

      <Group title="Scheduling and product">
        <Widget id="widget-23" align="start">
          <MiniCalendar monthLabel="June" daysInMonth={30} startOffset={0} today={10} booked={[2, 4, 8, 11, 14, 17, 19, 22, 25]} defaultSelected={16} />
        </Widget>
        <Widget id="widget-24" align="start">
          <SlotPicker
            label="Wednesday 11 June"
            defaultSelected="10:30"
            slots={[
              { time: '09:00' },
              { time: '09:30', taken: true },
              { time: '10:00' },
              { time: '10:30' },
              { time: '11:00' },
              { time: '11:30', taken: true },
              { time: '13:00' },
              { time: '13:30' },
              { time: '14:00', taken: true },
            ]}
          />
        </Widget>
        <Widget id="widget-25" align="start">
          <OnboardingStepper
            steps={[
              { title: 'Create your account', status: 'done', detail: 'Done' },
              { title: 'Add your services', status: 'done', detail: 'Done' },
              { title: 'Connect payments', status: 'current', detail: 'In progress' },
              { title: 'Invite your team', status: 'next' },
            ]}
          />
        </Widget>
        <Widget id="widget-26" span="half">
          <PlanCard
            name="Health OS"
            price={297}
            cadence="AUD / month"
            fee="+ $997 AUD onboarding"
            features={['The Health OS platform', 'Health OS wellness assets', 'Customisation, setup and support']}
            action="Book the walkthrough"
          />
        </Widget>
        <Widget id="widget-27" span="half" align="start">
          <ToggleSettings
            items={[
              { id: 'reminders', label: 'Booking reminders', detail: 'SMS 24 hours before', enabled: true },
              { id: 'winback', label: 'Win-back message', detail: 'Clients away 30 days or more', enabled: true },
              { id: 'waitlist', label: 'Waitlist auto-fill', detail: 'Offer freed slots', enabled: false },
            ]}
          />
        </Widget>
      </Group>

      <Group title="Activity and conversation">
        <Widget id="widget-28" span="half" align="start">
          <ActivityFeed
            items={[
              { initials: 'PK', accent: 'rose', actor: 'Priya', action: 'booked a 1:1 session', time: 'now' },
              { initials: 'MV', accent: 'apricot', actor: 'Marcus', action: 'renewed a membership', time: '4m' },
              { initials: 'EF', accent: 'lavender', actor: 'Elena', action: 'completed intake', time: '12m' },
              { initials: 'TO', accent: 'ink', actor: 'Tom', action: 'joined the waitlist', time: '28m' },
            ]}
          />
        </Widget>
        <Widget id="widget-29" span="half">
          <RatingSummary average={4.9} count={328} distribution={[288, 30, 7, 2, 1]} />
        </Widget>
        <Widget id="widget-30" span="half">
          <AssistantMessage name="Health OS" message="You have 3 open slots tomorrow afternoon. Want me to message your waitlist?" />
        </Widget>
        <Widget id="widget-31" span="half">
          <CheckIn question="How is this week feeling?" options={['Steady', 'Good', 'Busy', 'Stretched']} />
        </Widget>
      </Group>
    </div>
  </Section>
);
