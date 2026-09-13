/**
 * Pillars: the feature grid. The heading holds the left column while four FeatureCards sit
 * in a two-by-two grid on the right, so the block reads as one idea with four parts rather
 * than a row of identical boxes. Stacks to one column below lg.
 */
import { FeatureCard } from '@/components/cards';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animated';
import { PILLARS } from '@/data/system';

export const Pillars = ({ id = 'why' }: { id?: string }) => (
  <section id={id} className="py-16 md:py-24">
    <div className="mx-auto grid max-w-container gap-10 px-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
      <FadeIn>
        <div className="lg:sticky lg:top-24">
          <h2 className="font-display text-heading text-ink-900">Four ideas, one calm system</h2>
          <p className="mt-4 max-w-md font-sans text-body text-ink-600">
            Every part of Health OS comes back to the same four ideas.
          </p>
        </div>
      </FadeIn>
      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PILLARS.map((p) => (
          <StaggerItem key={p.title} className="h-full">
            <FeatureCard icon={p.icon} title={p.title} description={p.description} accent={p.accent} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);
