/**
 * MotionSection — the quiet motion vocabulary, demonstrated. FadeIn, Stagger, CountUp,
 * HoverLift, Marquee, HeroGlow. Every primitive honours prefers-reduced-motion.
 */
import { Section, Demo } from '@/showcase/Section';
import { FadeIn, Stagger, StaggerItem, HoverLift, Marquee, HeroGlow } from '@/components/ui/animated';
import { Stat } from '@/components/ui/stat';
import { Badge } from '@/components/ui/badge';

export const MotionSection = () => (
  <Section
    id="motion"
    eyebrow="Motion"
    title="Quiet by default"
    lead="Fade and small translate, a gentle marquee, a soft hover lift, a calm count-up. 150–250ms for interactions, 300–400ms for reveals, never past 500ms — and every primitive respects reduced motion."
  >
    <div className="grid gap-4 md:grid-cols-2">
      <Demo label="FadeIn — in-view cascade">
        <div className="flex flex-col gap-3">
          {['Booking', 'Clients', 'Courses'].map((label, i) => (
            <FadeIn key={label} delay={i * 0.08}>
              <div className="rounded-md border border-line bg-surface px-4 py-3 font-sans text-body-md text-ink-700">
                {label}
              </div>
            </FadeIn>
          ))}
        </div>
      </Demo>

      <Demo label="Stagger — children cascade">
        <Stagger className="flex flex-wrap gap-2.5">
          {['Consolidate', 'Clarity', 'Control', 'Consistency'].map((label) => (
            <StaggerItem key={label}>
              <Badge variant="brand">{label}</Badge>
            </StaggerItem>
          ))}
        </Stagger>
      </Demo>

      <Demo label="CountUp — on view">
        <div className="flex items-center gap-10">
          <Stat value={30} suffix=" days" label="to go live" />
          <Stat value={94} suffix="%" label="stay after 90 days" />
        </div>
      </Demo>

      <Demo label="HoverLift — hover me">
        <HoverLift className="w-fit">
          <div className="rounded-lg border border-line bg-surface px-6 py-5 font-sans text-body-md text-ink-700 transition-shadow hover:shadow-md">
            Lift on hover
          </div>
        </HoverLift>
      </Demo>

      <Demo label="Marquee — gentle, pauses on hover">
        <Marquee speed={28} gapClassName="gap-3">
          {['Booking', 'CRM', 'Courses', 'Marketing', 'Sales', 'Funnels'].map((label) => (
            <Badge key={label} variant="outline" size="md">{label}</Badge>
          ))}
        </Marquee>
      </Demo>

      <Demo label="HeroGlow — soft radial wash" padded={false}>
        <div className="relative flex h-44 items-center justify-center overflow-hidden bg-paper">
          <HeroGlow />
          <span className="font-mono text-caption text-ink-600">apricot · rose · lavender, on ivory</span>
        </div>
      </Demo>
    </div>
  </Section>
);
