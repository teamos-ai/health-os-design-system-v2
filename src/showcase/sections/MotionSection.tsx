/**
 * MotionSection: the motion library, demonstrated. Press Move to replay a demo; the
 * interactive ones respond to hover and click. Each group closes with its usage guidance.
 */
import * as React from 'react';
import { Play } from 'lucide-react';
import { Section, Demo, Usage } from '@/showcase/Section';
import {
  FadeIn,
  Stagger,
  StaggerItem,
  HoverLift,
  Marquee,
  HeroGlow,
  Reveal,
  TextReveal,
  RollingNumber,
  BreathingDot,
  HoverUnderline,
  Appear,
} from '@/components/ui/animated';
import { Disclosure } from '@/components/ui/disclosure';
import { Stat } from '@/components/ui/stat';
import { Counter, StatTrend, SeatsRemaining, TicketsSold, MembersCount, Countdown } from '@/components/ui/counters';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';


const MoveButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant="secondary" size="small" onClick={onClick} leadingIcon={<Play className="h-3 w-3 fill-current" strokeWidth={0} />}>
    Move
  </Button>
);

/** Wraps a demo with a Move button that replays its motion by remounting the content. */
const MotionDemo = ({
  label,
  children,
  padded = true,
}: {
  label: string;
  children: React.ReactNode;
  padded?: boolean;
}) => {
  const [replay, setReplay] = React.useState(0);
  return (
    <Demo
      label={label}
      padded={padded}
      action={<MoveButton onClick={() => setReplay((n) => n + 1)} />}
    >
      <div key={replay}>{children}</div>
    </Demo>
  );
};

const UsageRow = ({ ids }: { ids: string[] }) => (
  <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
    {ids.map((id) => (
      <div key={id} className="overflow-hidden rounded-lg border border-line">
        <Usage id={id} className="border-t-0" />
      </div>
    ))}
  </div>
);

const PresenceDemo = () => {
  const [show, setShow] = React.useState(true);
  return (
    <div className="flex min-h-[88px] flex-col items-start gap-3">
      <Button variant="secondary" size="small" onClick={() => setShow((s) => !s)}>
        {show ? 'Hide' : 'Show'} message
      </Button>
      <Appear show={show}>
        <div className="rounded-md border border-line bg-surface px-4 py-3 font-sans text-body text-ink-900">
          Your changes are saved.
        </div>
      </Appear>
    </div>
  );
};

// Countdown targets are computed once, so replaying a demo does not reset them.
const COUNTDOWN_FULL = new Date(Date.now() + (3 * 24 * 60 * 60 + 7 * 60 * 60 + 42 * 60 + 18) * 1000);
const COUNTDOWN_DAYS = new Date(Date.now() + 9 * 24 * 60 * 60 * 1000);

export const MotionSection = () => (
  <Section id="motion">
    <div className="grid gap-4 md:grid-cols-2">
      {/* ── Core ── */}
      <MotionDemo label="FadeIn">
        <div className="flex flex-col gap-3">
          {['Booking', 'Clients', 'Courses'].map((label, i) => (
            <FadeIn key={label} delay={i * 0.08}>
              <div className="rounded-md border border-line bg-surface px-4 py-3 font-sans text-body text-ink-900">
                {label}
              </div>
            </FadeIn>
          ))}
        </div>
      </MotionDemo>

      <MotionDemo label="Stagger">
        <Stagger className="flex flex-wrap gap-3">
          {['Consolidate', 'Clarity', 'Control', 'Consistency'].map((label) => (
            <StaggerItem key={label}>
              <Badge variant="rose">{label}</Badge>
            </StaggerItem>
          ))}
        </Stagger>
      </MotionDemo>

      <MotionDemo label="Reveal">
        <Reveal>
          <div className="rounded-md border border-line bg-surface px-6 py-5 font-sans text-body text-ink-900">
            Settles into place
          </div>
        </Reveal>
      </MotionDemo>

      <MotionDemo label="TextReveal">
        <TextReveal text="Set it up once, then let it run" className="font-display text-subheading text-ink-900" />
      </MotionDemo>

      <MotionDemo label="CountUp (sample data)">
        <div className="flex items-center gap-10">
          <Stat value={342} label="bookings this week" />
          <Stat value={94} suffix="%" label="show-up rate" />
        </div>
      </MotionDemo>

      <MotionDemo label="RollingNumber (sample data)">
        <div className="flex items-end gap-10">
          <div>
            <RollingNumber value={1240} className="font-display text-heading text-ink-900" />
            <div className="mt-1 font-sans text-body text-ink-600">sessions booked</div>
          </div>
          <div>
            <RollingNumber value={86} suffix="%" className="font-display text-heading text-ink-900" />
            <div className="mt-1 font-sans text-body text-ink-600">rooms booked</div>
          </div>
        </div>
      </MotionDemo>

      <UsageRow ids={['fade-in', 'stagger', 'text-reveal', 'numbers']} />

      {/* ── Ambient ── */}
      <MotionDemo label="BreathingDot">
        <div className="flex items-center gap-8 font-sans text-body text-ink-900">
          <span className="inline-flex items-center gap-2">
            <BreathingDot color="bg-success-600" /> Bookings open
          </span>
          <span className="inline-flex items-center gap-2">
            <BreathingDot color="bg-apricot-400" /> Live session
          </span>
        </div>
      </MotionDemo>

      <MotionDemo label="Marquee">
        <Marquee speed={28} gapClassName="gap-3">
          {['Booking', 'CRM', 'Courses', 'Marketing', 'Sales', 'Funnels'].map((label) => (
            <Badge key={label} variant="outline" size="md">{label}</Badge>
          ))}
        </Marquee>
      </MotionDemo>

      <MotionDemo label="HeroGlow" padded={false}>
        <div className="relative flex h-44 items-center justify-center overflow-hidden bg-paper">
          <HeroGlow />
          <span className="font-sans text-label uppercase text-ink-600">Soft wash</span>
        </div>
      </MotionDemo>

      <MotionDemo label="HoverLift">
        <HoverLift className="w-fit">
          <div className="rounded-md border border-line bg-surface px-6 py-5 font-sans text-body text-ink-900 transition-shadow hover:shadow-md">
            Lift on hover
          </div>
        </HoverLift>
      </MotionDemo>

      <UsageRow ids={['marquee', 'breathing-dot', 'hero-glow', 'experimental-motion']} />

      {/* ── Interaction and presence ── */}
      <Demo label="HoverUnderline">
        <div className="flex h-full items-center gap-8 font-sans text-body">
          <HoverUnderline href="#tokens">Read the tokens</HoverUnderline>
          <HoverUnderline href="#buttons">Browse components</HoverUnderline>
        </div>
      </Demo>

      <Demo label="Disclosure">
        <div className="flex flex-col gap-3">
          <Disclosure title="What does setup involve?">
            We move your tools and rebuild your workflows, then hand over a system that already runs.
          </Disclosure>
          <Disclosure title="Can I keep my booking link?">
            Yes. Your existing link can point to the new booking page.
          </Disclosure>
        </div>
      </Demo>

      <Demo label="Appear">
        <PresenceDemo />
      </Demo>

      <UsageRow ids={['hover', 'appear']} />

      {/* ── Counters ── */}
      <MotionDemo label="Counters: seats and members (sample data)">
        <div className="grid gap-8 sm:grid-cols-2">
          <SeatsRemaining taken={128} total={200} noun="seats" accent="rose" />
          <SeatsRemaining taken={47} total={60} noun="seats left" count="remaining" accent="lavender" />
          <MembersCount value={2480} />
          <TicketsSold value={356} label="tickets sold this week" />
        </div>
      </MotionDemo>

      <MotionDemo label="Counters: trends (sample data)">
        <div className="flex flex-wrap items-end gap-12">
          <StatTrend value={1284} delta={12.4} label="New clients this month" />
          <StatTrend value={94} delta={-3.1} suffix="%" label="Show-up rate" />
        </div>
      </MotionDemo>

      <MotionDemo label="Counters: up and down (sample data)">
        <div className="flex flex-wrap items-end gap-12">
          <div className="flex flex-col gap-2">
            <Counter to={1240} direction="up" className="font-display text-heading text-ink-900" />
            <span className="font-sans text-body text-ink-600">sessions delivered (up)</span>
          </div>
          <div className="flex flex-col gap-2">
            <Counter from={200} to={36} className="font-display text-heading text-ink-900" />
            <span className="font-sans text-body text-ink-600">places still open (down)</span>
          </div>
        </div>
      </MotionDemo>

      <MotionDemo label="Counters: countdown to a date">
        <div className="flex flex-col items-start gap-6">
          <Countdown to={COUNTDOWN_FULL} />
          <Countdown to={COUNTDOWN_DAYS} compact />
        </div>
      </MotionDemo>

      <UsageRow ids={['counters']} />
    </div>
  </Section>
);
