/**
 * MotionSection — the quiet motion vocabulary, demonstrated. Auto/continuous demos get
 * a "Move" button that replays them (remounts the content); interactive demos are
 * driven by hover/click. Every primitive honours prefers-reduced-motion.
 */
import * as React from 'react';
import { Play } from 'lucide-react';
import { Section, Demo } from '@/showcase/Section';
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
  GradientShimmer,
  BorderGlow,
  BreathingDot,
  PointerSpotlight,
  HoverUnderline,
  Appear,
} from '@/components/ui/animated';
import { Disclosure } from '@/components/ui/disclosure';
import { Stat } from '@/components/ui/stat';
import { Counter, StatTrend, SeatsRemaining, TicketsSold, MembersCount, Countdown } from '@/components/ui/counters';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MoveButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1',
      'font-mono text-caption text-ink-600 transition-colors duration-sm',
      'hover:border-ink-300 hover:text-ink-900 active:scale-[0.97]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40'
    )}
  >
    <Play className="h-3 w-3" strokeWidth={1.5} />
    Move
  </button>
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
    <Demo label={label} padded={padded} action={<MoveButton onClick={() => setReplay((n) => n + 1)} />}>
      <div key={replay}>{children}</div>
    </Demo>
  );
};

const PresenceDemo = () => {
  const [show, setShow] = React.useState(true);
  return (
    <div className="flex min-h-[88px] flex-col items-start gap-3">
      <Button variant="secondary" size="sm" onClick={() => setShow((s) => !s)}>
        {show ? 'Hide' : 'Show'} message
      </Button>
      <Appear show={show}>
        <div className="rounded-md border border-line bg-surface px-4 py-3 font-sans text-body-sm text-ink-700">
          Your changes are saved.
        </div>
      </Appear>
    </div>
  );
};

// Stable countdown targets — computed once so a Move-replay doesn't reset the live timers.
const COUNTDOWN_FULL = new Date(Date.now() + (3 * 24 * 60 * 60 + 7 * 60 * 60 + 42 * 60 + 18) * 1000);
const COUNTDOWN_DAYS = new Date(Date.now() + 9 * 24 * 60 * 60 * 1000);

export const MotionSection = () => (
  <Section
    id="motion"
    eyebrow="Motion"
    title="Quiet by default"
    lead="Fade and small translate, gentle marquees and glows, soft hover lifts, calm count-ups. 150–250ms for interactions, 300–400ms for reveals, never past 500ms — and every primitive respects reduced motion. Press Move to replay any one; hover or click the interactive ones."
  >
    <div className="grid gap-4 md:grid-cols-2">
      {/* ── Core ── */}
      <MotionDemo label="FadeIn — in-view cascade">
        <div className="flex flex-col gap-3">
          {['Booking', 'Clients', 'Courses'].map((label, i) => (
            <FadeIn key={label} delay={i * 0.08}>
              <div className="rounded-md border border-line bg-surface px-4 py-3 font-sans text-body-md text-ink-700">
                {label}
              </div>
            </FadeIn>
          ))}
        </div>
      </MotionDemo>

      <MotionDemo label="Stagger — children cascade">
        <Stagger className="flex flex-wrap gap-2.5">
          {['Consolidate', 'Clarity', 'Control', 'Consistency'].map((label) => (
            <StaggerItem key={label}>
              <Badge variant="brand">{label}</Badge>
            </StaggerItem>
          ))}
        </Stagger>
      </MotionDemo>

      <MotionDemo label="Reveal — blur-up on scroll">
        <Reveal>
          <div className="rounded-md border border-line bg-surface px-6 py-5 font-sans text-body-md text-ink-700">
            Settles into sharp focus
          </div>
        </Reveal>
      </MotionDemo>

      <MotionDemo label="TextReveal — words cascade">
        <TextReveal text="Beauty in all lines and curves" className="font-display text-h3 text-ink-900" />
      </MotionDemo>

      <MotionDemo label="CountUp — on view">
        <div className="flex items-center gap-10">
          <Stat value={30} suffix=" days" label="to go live" />
          <Stat value={94} suffix="%" label="stay after 90 days" />
        </div>
      </MotionDemo>

      <MotionDemo label="RollingNumber — odometer roll">
        <div className="flex items-end gap-10">
          <div>
            <RollingNumber value={1240} className="font-display text-display-lg text-ink-900" />
            <div className="mt-1 font-mono text-body-sm text-ink-600">clients onboarded</div>
          </div>
          <div>
            <RollingNumber value={98} suffix="%" className="font-display text-display-lg text-ink-900" />
            <div className="mt-1 font-mono text-body-sm text-ink-600">would refer</div>
          </div>
        </div>
      </MotionDemo>

      {/* ── Ambient & brand ── */}
      <MotionDemo label="GradientShimmer — sheen on the gradient">
        <GradientShimmer className="font-display text-h2">Health OS</GradientShimmer>
      </MotionDemo>

      <MotionDemo label="BorderGlow — drifting hairline">
        <BorderGlow className="w-fit">
          <div className="px-6 py-5 font-sans text-body-md text-ink-700">A quietly glowing edge</div>
        </BorderGlow>
      </MotionDemo>

      <MotionDemo label="BreathingDot — calm status pulse">
        <div className="flex items-center gap-8 font-mono text-body-sm text-ink-700">
          <span className="inline-flex items-center gap-2">
            <BreathingDot color="bg-success-600" /> Operational
          </span>
          <span className="inline-flex items-center gap-2">
            <BreathingDot color="bg-brand-400" /> Live session
          </span>
        </div>
      </MotionDemo>

      <MotionDemo label="Marquee — gentle, pauses on hover">
        <Marquee speed={28} gapClassName="gap-3">
          {['Booking', 'CRM', 'Courses', 'Marketing', 'Sales', 'Funnels'].map((label) => (
            <Badge key={label} variant="outline" size="md">{label}</Badge>
          ))}
        </Marquee>
      </MotionDemo>

      <MotionDemo label="HeroGlow — soft radial wash" padded={false}>
        <div className="relative flex h-44 items-center justify-center overflow-hidden bg-paper">
          <HeroGlow />
          <span className="font-mono text-caption text-ink-600">apricot · rose · lavender</span>
        </div>
      </MotionDemo>

      <MotionDemo label="HoverLift — hover the card">
        <HoverLift className="w-fit">
          <div className="rounded-md border border-line bg-surface px-6 py-5 font-sans text-body-md text-ink-700 transition-shadow hover:shadow-md">
            Lift on hover
          </div>
        </HoverLift>
      </MotionDemo>

      {/* ── Interaction & presence (self-driving) ── */}
      <Demo label="PointerSpotlight — move your cursor">
        <PointerSpotlight className="border border-line bg-surface">
          <div className="px-6 py-10 text-center font-sans text-body-md text-ink-600">
            Move your cursor across this card
          </div>
        </PointerSpotlight>
      </Demo>

      <Demo label="HoverUnderline — hover the link">
        <div className="flex h-full items-center gap-8 font-sans text-body-md">
          <HoverUnderline href="#">Read the docs</HoverUnderline>
          <HoverUnderline href="#">Browse components</HoverUnderline>
        </div>
      </Demo>

      <Demo label="Collapse — click to expand">
        <div className="flex flex-col gap-3">
          <Disclosure title="What does setup involve?">
            We migrate your tools and rebuild your workflows, then hand you a system that already works on
            day one.
          </Disclosure>
          <Disclosure title="How long until we are live?">
            Most practices are live within 30 days.
          </Disclosure>
        </div>
      </Demo>

      <Demo label="Presence — enter / exit">
        <PresenceDemo />
      </Demo>

      {/* Parallax demo removed — the primitive is deprecated/off-brand
          (foundations/motion.md bans parallax); the showcase doesn't teach it. */}

      {/* ── Counters (moved from Components) — press Move to replay the count-up ── */}
      <MotionDemo label="Counters — seats & memberships">
        <div className="grid gap-8 sm:grid-cols-2">
          <SeatsRemaining taken={128} total={200} noun="seats" accent="rose" />
          <SeatsRemaining taken={47} total={60} noun="seats left" count="remaining" accent="lavender" />
          <MembersCount value={2480} />
          <TicketsSold value={356} label="tickets sold this week" />
        </div>
      </MotionDemo>

      <MotionDemo label="Counters — percentage trends">
        <div className="flex flex-wrap items-end gap-12">
          <StatTrend value={1284} delta={12.4} label="New clients this month" />
          <StatTrend value={94} delta={-3.1} suffix="%" label="Show-up rate" />
        </div>
      </MotionDemo>

      <MotionDemo label="Counters — count up / down">
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
      </MotionDemo>

      <MotionDemo label="Counters — countdown to a date">
        <div className="flex flex-col items-start gap-6">
          <Countdown to={COUNTDOWN_FULL} />
          <Countdown to={COUNTDOWN_DAYS} compact />
        </div>
      </MotionDemo>
    </div>
  </Section>
);
