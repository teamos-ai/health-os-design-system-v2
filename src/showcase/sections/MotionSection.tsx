/**
 * MotionSection — the quiet motion vocabulary, demonstrated. Each demo has a "Move"
 * button that replays the animation (it remounts the demo content, re-running the
 * entrance). Every primitive honours prefers-reduced-motion.
 */
import * as React from 'react';
import { Play } from 'lucide-react';
import { Section, Demo } from '@/showcase/Section';
import { FadeIn, Stagger, StaggerItem, HoverLift, Marquee, HeroGlow } from '@/components/ui/animated';
import { Stat } from '@/components/ui/stat';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const MoveButton = ({ onClick, className }: { onClick: () => void; className?: string }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1',
      'font-mono text-caption text-ink-600 transition-colors duration-sm',
      'hover:border-ink-300 hover:text-ink-900 active:scale-[0.97]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40',
      className
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

export const MotionSection = () => (
  <Section
    id="motion"
    eyebrow="Motion"
    title="Quiet by default"
    lead="Fade and small translate, a gentle marquee, a soft hover lift, a calm count-up. 150–250ms for interactions, 300–400ms for reveals, never past 500ms — and every primitive respects reduced motion. Press Move to replay any one."
  >
    <div className="grid gap-4 md:grid-cols-2">
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

      <MotionDemo label="CountUp — on view">
        <div className="flex items-center gap-10">
          <Stat value={30} suffix=" days" label="to go live" />
          <Stat value={94} suffix="%" label="stay after 90 days" />
        </div>
      </MotionDemo>

      <MotionDemo label="HoverLift — hover me">
        <FadeIn className="w-fit">
          <HoverLift className="w-fit">
            <div className="rounded-md border border-line bg-surface px-6 py-5 font-sans text-body-md text-ink-700 transition-shadow hover:shadow-md">
              Lift on hover
            </div>
          </HoverLift>
        </FadeIn>
      </MotionDemo>

      <MotionDemo label="Marquee — gentle, pauses on hover">
        <Marquee speed={28} gapClassName="gap-3">
          {['Booking', 'CRM', 'Courses', 'Marketing', 'Sales', 'Funnels'].map((label) => (
            <Badge key={label} variant="outline" size="md">{label}</Badge>
          ))}
        </Marquee>
      </MotionDemo>

      <MotionDemo label="HeroGlow — soft radial wash" padded={false}>
        <FadeIn>
          <div className="relative flex h-44 items-center justify-center overflow-hidden bg-paper">
            <HeroGlow />
            <span className="font-mono text-caption text-ink-600">apricot · rose · lavender, on ivory</span>
          </div>
        </FadeIn>
      </MotionDemo>
    </div>
  </Section>
);
