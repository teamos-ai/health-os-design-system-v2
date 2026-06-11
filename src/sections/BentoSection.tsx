/**
 * BentoSection — "what Health OS runs" bento grid (bento craft). Done-with-
 * you setup, the nurture engine, onboarding on autopilot, one dashboard. Cascade reveal.
 */
import { BentoGrid, BentoCard } from '@/components/bento/Bento';
import { FadeIn } from '@/components/ui/animated';
import { MonoLabel } from '@/components/ui/mono-label';
import { BENTO_ITEMS } from '@/data/system';

export const BentoSection = ({ id = 'runs' }: { id?: string }) => (
  <section id={id} className="py-20 md:py-24">
    <div className="mx-auto max-w-container px-6">
      <div className="mb-12 mx-auto flex max-w-2xl flex-col items-center text-center">
        <FadeIn>
          <MonoLabel>What Health OS runs</MonoLabel>
        </FadeIn>
        <FadeIn delay={0.05} className="mt-4">
          <h2 className="font-display text-h1 text-ink-900">Set it up once, then let it run</h2>
        </FadeIn>
        <FadeIn delay={0.1} className="mt-4">
          <p className="font-sans text-body-lg leading-relaxed text-ink-600">
            The quiet machinery behind a calm practice — built with you, then running in
            the background so you can stay with your clients.
          </p>
        </FadeIn>
      </div>

      <FadeIn delay={0.05} y={16}>
        <BentoGrid>
          {BENTO_ITEMS.map((item) => (
            <BentoCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              accent={item.accent}
              span={item.span}
            />
          ))}
        </BentoGrid>
      </FadeIn>
    </div>
  </section>
);
