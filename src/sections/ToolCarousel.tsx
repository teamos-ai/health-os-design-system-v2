/**
 * ToolCarousel — the horizontal "everything Health OS replaces" card row (efficient.app
 * app-card carousel craft). Gentle, seamless Framer marquee that pauses on hover and
 * respects reduced motion. Edge-faded. Cards are flat hairline ToolCards.
 */
import { Marquee } from '@/components/ui/animated';
import { ToolCard } from '@/components/ui/tool-card';
import { FadeIn } from '@/components/ui/animated';
import { MonoLabel } from '@/components/ui/mono-label';
import { TOOLS } from '@/data/system';

export const ToolCarousel = ({ id = 'platform' }: { id?: string }) => (
  <section id={id} className="overflow-hidden py-20 md:py-24">
    <div className="mx-auto mb-12 max-w-container px-6 text-center">
      <FadeIn>
        <MonoLabel>Everything in one place</MonoLabel>
      </FadeIn>
      <FadeIn delay={0.05} className="mt-4">
        <h2 className="font-display text-h1 text-ink-900">The tools Health OS replaces</h2>
      </FadeIn>
      <FadeIn delay={0.1} className="mt-4">
        <p className="mx-auto max-w-reading font-sans text-body-lg leading-relaxed text-ink-600">
          One login instead of a drawer full of subscriptions — each tool you pay for
          today, folded into the system.
        </p>
      </FadeIn>
    </div>

    <FadeIn delay={0.05}>
      <Marquee speed={32} className="px-6">
        {TOOLS.map((tool) => (
          <ToolCard
            key={tool.name}
            name={tool.name}
            meta={tool.meta}
            icon={tool.icon}
            accent={tool.accent}
          />
        ))}
      </Marquee>
    </FadeIn>
  </section>
);
