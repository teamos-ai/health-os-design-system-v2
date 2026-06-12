/**
 * ComponentsSection — the component gallery. The button system (structural set + the
 * mode-aware pastel accent + celebration, the segmented control and pagination), the
 * expanded badge taxonomy, mono labels, inputs, the command bar, photography-ready
 * cards, feature cards, and the count up / down family — all live, all on token.
 */
import { useState } from 'react';
import { Mail, CalendarCheck, Users, Play, ArrowRight, ArrowUpRight, Clock, MapPin, Leaf, Flower2 } from 'lucide-react';
import { Section, Demo } from '@/showcase/Section';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { SegmentedControl } from '@/components/ui/segmented';
import { Pagination } from '@/components/ui/pagination';
import { CelebrationButton } from '@/components/ui/celebration-button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CommandBar } from '@/components/ui/command-bar';
import { CommandChip } from '@/components/ui/command-chip';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ToolCard } from '@/components/ui/tool-card';
import { FeatureCard } from '@/components/ui/feature-card';
import { MonoLabel } from '@/components/ui/mono-label';
import { BreathingDot } from '@/components/ui/animated';
import { Counter, StatTrend, SeatsRemaining, TicketsSold, MembersCount, Countdown } from '@/components/ui/counters';
import {
  BADGES_STATUS,
  BADGES_WELLNESS,
  BADGES_OILS,
  BADGES_COACHING,
  BADGES_COMMUNITY,
  BADGES_EVENTS,
  BADGES_SOCIAL,
  BADGES_COMMERCE,
} from '@/data/system';

// Stable countdown targets — computed once at module load so the section's state
// (segmented control / pagination) re-rendering doesn't reset the live timers.
const COUNTDOWN_FULL = new Date(Date.now() + (3 * 24 * 60 * 60 + 7 * 60 * 60 + 42 * 60 + 18) * 1000);
const COUNTDOWN_DAYS = new Date(Date.now() + 9 * 24 * 60 * 60 * 1000);

export const ComponentsSection = () => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [page, setPage] = useState(1);

  return (
    <Section
      id="components"
      eyebrow="Library"
      title="Components"
      lead="The building blocks the site is assembled from. Flat hairline surfaces, soft neutral hover, the dark carbon pill, and one disciplined colour story — a pastel accent that themes itself per mode (apricot in light, rose in paper, lavender in dark)."
    >
      <div className="flex flex-col gap-4">
        {/* Buttons — the structural set */}
        <Demo label="Buttons — structural set">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="dark" leadingIcon={<Play className="h-3 w-3 fill-current" strokeWidth={0} />}>
                Play the video
              </Button>
              <Button variant="outline">Cancel</Button>
              <Button variant="soft">Submit</Button>
              <Button variant="ghost">Learn more</Button>
              <Button variant="link">See pricing</Button>
              <Button variant="link">
                Read more
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Book a discovery call</Button>
              <Button variant="gradient">Start free</Button>
              <Button variant="secondary">Compare plans</Button>
              <Button variant="danger">Cancel plan</Button>
              <IconButton variant="dark" size="md" aria-label="Play">
                <Play className="h-4 w-4 fill-current" strokeWidth={0} />
              </IconButton>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </Demo>

        {/* Mode-aware accent + celebration */}
        <Demo label="Accent — themes per mode (apricot · rose · lavender) + celebrate">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="accent">Save changes</Button>
              <CelebrationButton>Mark complete 🎉</CelebrationButton>
            </div>
            <p className="font-sans text-body-sm text-ink-500">
              The accent themes per mode — apricot in light, rose in paper, lavender in dark — driven by CSS
              variables, with no per-call work. The celebration button plays a gentle emoji pop (reduced-motion safe).
            </p>
          </div>
        </Demo>

        {/* Segmented control + pagination */}
        <Demo label="Segmented control + pagination">
          <div className="flex flex-wrap items-center gap-8">
            <SegmentedControl
              aria-label="Reporting period"
              value={period}
              onValueChange={setPeriod}
              options={[
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
              ]}
            />
            <Pagination page={page} total={3} onChange={setPage} />
          </div>
        </Demo>

        {/* Badges — emoji + soft pastel tints across the wellness business */}
        <Demo label="Badges — a tag for every corner of the practice">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <MonoLabel>Status</MonoLabel>
              <div className="flex flex-wrap gap-2.5">
                {BADGES_STATUS.map((b) => (
                  <Badge key={b.label} variant={b.variant} emoji={b.emoji}>
                    {b.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <MonoLabel>Wellness states</MonoLabel>
              <div className="flex flex-wrap gap-2.5">
                {BADGES_WELLNESS.map((b) => (
                  <Badge key={b.label} variant={b.variant} emoji={b.emoji}>
                    {b.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <MonoLabel>Essential oils</MonoLabel>
              <div className="flex flex-wrap gap-2.5">
                {BADGES_OILS.map((b) => (
                  <Badge key={b.label} variant={b.variant} emoji={b.emoji}>
                    {b.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <MonoLabel>Coaching &amp; courses</MonoLabel>
              <div className="flex flex-wrap gap-2.5">
                {BADGES_COACHING.map((b) => (
                  <Badge key={b.label} variant={b.variant} emoji={b.emoji}>
                    {b.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <MonoLabel>Communities &amp; membership</MonoLabel>
              <div className="flex flex-wrap gap-2.5">
                {BADGES_COMMUNITY.map((b) => (
                  <Badge key={b.label} variant={b.variant} emoji={b.emoji}>
                    {b.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <MonoLabel>Webinars &amp; events</MonoLabel>
              <div className="flex flex-wrap gap-2.5">
                {BADGES_EVENTS.map((b) => (
                  <Badge key={b.label} variant={b.variant} emoji={b.emoji}>
                    {b.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <MonoLabel>Social &amp; marketing</MonoLabel>
              <div className="flex flex-wrap gap-2.5">
                {BADGES_SOCIAL.map((b) => (
                  <Badge key={b.label} variant={b.variant} emoji={b.emoji}>
                    {b.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <MonoLabel>Commerce &amp; status</MonoLabel>
              <div className="flex flex-wrap gap-2.5">
                {BADGES_COMMERCE.map((b) => (
                  <Badge key={b.label} variant={b.variant} emoji={b.emoji}>
                    {b.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Demo>

        {/* Mono labels */}
        <Demo label="Mono labels — rhythm, tones, status & trailing slots">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <MonoLabel number="01">Consolidate</MonoLabel>
              <MonoLabel number="02">Clarity</MonoLabel>
              <MonoLabel number="03">Calm</MonoLabel>
              <MonoLabel dot tone="brand">Done-with-you setup</MonoLabel>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <MonoLabel tone="success" trailing={<BreathingDot color="bg-success-600" />}>
                System online
              </MonoLabel>
              <MonoLabel tone="ink" trailing={<BreathingDot color="bg-apricot-400" />}>
                Sync in progress
              </MonoLabel>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <MonoLabel dot tone="apricot">Bookings</MonoLabel>
              <MonoLabel dot tone="lavender">Insights</MonoLabel>
              <MonoLabel dot tone="gold">Premium</MonoLabel>
              <MonoLabel dot tone="success">Active plan</MonoLabel>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-md bg-carbon p-2">
                <MonoLabel tone="inverse" number="01">Command</MonoLabel>
              </span>
              <span className="inline-flex rounded-md bg-carbon p-2">
                <MonoLabel tone="inverse" dot>Live</MonoLabel>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <MonoLabel size="sm" tone="ink">Tight label</MonoLabel>
              <MonoLabel size="sm" tone="brand" number="A1">Compact rhythm</MonoLabel>
              <MonoLabel tone="brand" trailing={<ArrowUpRight className="h-3.5 w-3.5" aria-hidden />}>
                View the system
              </MonoLabel>
            </div>
          </div>
        </Demo>

        {/* Inputs */}
        <Demo label="Inputs">
          <div className="grid max-w-2xl gap-5 md:grid-cols-2">
            <Input label="Full name" placeholder="Jane practitioner" />
            <Input label="Email" type="email" icon={Mail} placeholder="jane@practice.com.au" />
            <Input label="Practice name" placeholder="Calm Studio" hint="Shown to your clients." />
            <Input label="Phone" placeholder="04xx xxx xxx" error="Enter a valid number." />
          </div>
        </Demo>

        {/* Command bar + chips */}
        <Demo label="Command bar + /command chips">
          <div className="flex flex-col gap-4">
            <CommandBar />
            <div className="flex flex-wrap gap-2.5">
              <CommandChip command="set up online booking" />
              <CommandChip command="import my client list" />
              <CommandChip command="build a course" />
            </div>
          </div>
        </Demo>

        {/* Cards — the flat text card + the tool card */}
        <Demo label="Card — text + tool">
          <div className="grid gap-4 md:grid-cols-2">
            <Card interactive>
              <CardHeader>
                <CardTitle>Online booking</CardTitle>
                <CardDescription>Scheduling and reminders, in one calendar.</CardDescription>
              </CardHeader>
              <CardContent>
                Clients book themselves in; reminders go out automatically; no double-handling.
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="secondary">View</Button>
              </CardFooter>
            </Card>
            <ToolCard name="Booking & calendar" meta="Scheduling + reminders" icon={CalendarCheck} accent="rose" />
          </div>
        </Demo>

        {/* Photography cards — image-top + image-side. No real photos in the repo yet, so
            each shows the on-token wash placeholder; drop a src/alt in and it just works. */}
        <Demo label="Card — photography: image-top + image-side">
          <div className="grid gap-4 md:grid-cols-2">
            <Card
              interactive
              accent="rose"
              placeholderIcon={Leaf}
              badge={<Badge variant="brand" size="sm">Featured</Badge>}
              meta={[
                { icon: Clock, label: '6–8 hours' },
                { icon: MapPin, label: 'In studio' },
              ]}
              actions={[{ label: 'View details' }, { label: 'Book a session' }]}
            >
              <CardTitle>Restorative breathwork day</CardTitle>
              <CardDescription className="mt-2 text-ink-600">
                A slow, guided reset for practitioners and clients — breath, stillness and a long lunch in the garden.
              </CardDescription>
            </Card>

            <Card
              interactive
              mediaPosition="side"
              accent="lavender"
              placeholderIcon={Flower2}
              badge={<Badge variant="lavender" size="sm">New</Badge>}
              meta={[{ icon: Clock, label: '90 min' }]}
            >
              <CardTitle>Evening wind-down</CardTitle>
              <CardDescription className="mt-2 text-ink-600">
                A gentle close to the day. Soft light, slow movement and a calm note to finish on.
              </CardDescription>
            </Card>
          </div>
        </Demo>

        {/* Feature card (text) + feature card with a photo */}
        <div className="grid gap-4 md:grid-cols-2">
          <Demo label="Feature card — text">
            <FeatureCard
              icon={Users}
              title="Client CRM"
              description="Every record, conversation and booking in one place — the whole relationship at a glance."
              accent="lavender"
              number="02"
              eyebrow="Clarity"
            />
          </Demo>
          <Demo label="Feature card — with a photo">
            <FeatureCard
              icon={Leaf}
              title="Nature reset retreat"
              description="A half-day in the open air — walk, breathe and unplug, then a shared meal to land it."
              accent="apricot"
              badge={<Badge variant="apricot" size="sm">Retreat</Badge>}
              meta={[{ icon: Clock, label: '4 hours' }]}
            />
          </Demo>
        </div>

        {/* Counters — seats, memberships, tickets */}
        <Demo label="Counters — seats & memberships">
          <div className="grid gap-8 sm:grid-cols-2">
            <SeatsRemaining taken={128} total={200} noun="seats" accent="rose" />
            <SeatsRemaining taken={47} total={60} noun="seats left" count="remaining" accent="lavender" />
            <MembersCount value={2480} />
            <TicketsSold value={356} label="tickets sold this week" />
          </div>
        </Demo>

        {/* Counters — percentage trends up / down */}
        <Demo label="Counters — percentage trends">
          <div className="flex flex-wrap items-end gap-12">
            <StatTrend value={1284} delta={12.4} label="New clients this month" />
            <StatTrend value={94} delta={-3.1} suffix="%" label="Show-up rate" />
          </div>
        </Demo>

        {/* Counters — numbers counting up and down */}
        <Demo label="Counters — count up / down">
          <div className="flex flex-wrap items-end gap-12">
            <div className="flex flex-col gap-1.5">
              <Counter to={1240} direction="up" className="font-display text-display-lg leading-none text-ink-900" />
              <span className="font-mono text-body-sm text-ink-600">sessions delivered (up)</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <Counter from={200} to={36} className="font-display text-display-lg leading-none text-ink-900" />
              <span className="font-mono text-body-sm text-ink-600">spots still open (down)</span>
            </div>
          </div>
        </Demo>

        {/* Counters — live countdown to a date */}
        <Demo label="Counters — countdown to a date">
          <div className="flex flex-col items-start gap-6">
            <Countdown to={COUNTDOWN_FULL} />
            <Countdown to={COUNTDOWN_DAYS} compact />
          </div>
        </Demo>
      </div>
    </Section>
  );
};
