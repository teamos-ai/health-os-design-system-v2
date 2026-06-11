/**
 * Pillars — the four-pillar feature grid (Consolidate · Clarity · Control · Consistency).
 * FeatureCards with numbered overlines ("01 02 03" rhythm), cascading into view.
 */
import { FeatureCard } from '@/components/ui/feature-card';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animated';
import { MonoLabel } from '@/components/ui/mono-label';
import { PILLARS } from '@/data/system';

export const Pillars = ({ id = 'why' }: { id?: string }) => (
  <section id={id} className="border-y border-line bg-surface py-20 md:py-24">
    <div className="mx-auto max-w-container px-6">
      <div className="mb-12 max-w-2xl">
        <FadeIn>
          <MonoLabel>Why it works</MonoLabel>
        </FadeIn>
        <FadeIn delay={0.05} className="mt-4">
          <h2 className="font-display text-h1 text-ink-900">Four ideas, one calm system</h2>
        </FadeIn>
      </div>

      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((pillar) => (
          <StaggerItem key={pillar.title} className="h-full">
            <FeatureCard
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
              accent={pillar.accent}
              number={pillar.number}
            />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);
