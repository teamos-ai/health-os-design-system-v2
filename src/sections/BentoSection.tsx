/**
 * BentoSection: what the product runs, as a bento of varied cells. Two feature cells, an
 * image cell and a warm action cell, so the grid has rhythm instead of four white boxes.
 */
import { BentoGrid, BentoCell } from '@/components/bento/Bento';
import { FeatureCard, ContentCard, ActionCard } from '@/components/cards';
import { FadeIn } from '@/components/ui/animated';
import { BENTO_ITEMS } from '@/data/system';
import { thumb } from '@/lib/images';

const coworking = '/imagery/work-and-content-creation/three-women-coworking-on-boucle-sofa-with-laptop-and-coffee-studio-lounge-16-9.png';

export const BentoSection = ({ id = 'runs' }: { id?: string }) => {
  const [setup, enquiries, onboarding] = BENTO_ITEMS;
  return (
    <section id={id} className="py-16 md:py-24">
      <div className="mx-auto max-w-container px-6">
        <FadeIn className="mb-12 max-w-2xl">
          <h2 className="font-display text-heading text-ink-900">Set it up once, then let it run</h2>
          <p className="mt-4 font-sans text-body text-ink-600">
            Built with you, then running in the background while you are with your clients.
          </p>
        </FadeIn>
        <FadeIn delay={0.05} y={16}>
          <BentoGrid>
            <BentoCell span={2}>
              <ContentCard
                title={setup.title}
                excerpt={setup.description}
                image={{ src: thumb(coworking), alt: 'Three women working together on a sofa with laptops and coffee' }}
                ratio="3/2"
                category="Setup"
                className="h-full"
              />
            </BentoCell>
            <BentoCell>
              <FeatureCard icon={enquiries.icon} title={enquiries.title} description={enquiries.description} accent={enquiries.accent} />
            </BentoCell>
            <BentoCell>
              <FeatureCard icon={onboarding.icon} title={onboarding.title} description={onboarding.description} accent={onboarding.accent} />
            </BentoCell>
            <BentoCell span={2}>
              <ActionCard
                title="See what still routes through you"
                description="Ten questions, under two minutes. The result is yours whether we ever speak or not."
                action={{ label: 'Start the check' }}
                className="h-full"
              />
            </BentoCell>
          </BentoGrid>
        </FadeIn>
      </div>
    </section>
  );
};
