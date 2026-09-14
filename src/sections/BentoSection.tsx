/**
 * BentoSection: what the product runs, as the feature bento in its photo-led style. A photo
 * hero, a real figure, one feature, the check as the next step and two facts from the offer.
 */
import { ClipboardCheck } from 'lucide-react';
import { FeatureBento, type BentoStyle } from '@/components/bento/FeatureBento';
import { FadeIn } from '@/components/ui/animated';
import { BENTO_ITEMS } from '@/data/system';
import { thumb } from '@/lib/images';

const coworking = '/imagery/work-and-content-creation/three-women-coworking-on-boucle-sofa-with-laptop-and-coffee-studio-lounge-16-9.png';

export const BentoSection = ({ id = 'runs', variant = 'photo' }: { id?: string; variant?: BentoStyle }) => {
  const [setup, enquiries] = BENTO_ITEMS;
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
          <FeatureBento
            variant={variant}
            hero={{
              eyebrow: 'Setup',
              title: setup.title,
              description: setup.description,
              image: { src: thumb(coworking), alt: 'Three women working together on a sofa with laptops and coffee' },
            }}
            highlight={{ icon: ClipboardCheck, value: 10, label: 'questions in the check, under two minutes' }}
            feature={{ icon: enquiries.icon, title: enquiries.title, description: enquiries.description }}
            action={{ eyebrow: 'The check', title: 'See what still routes through you' }}
            facts={[
              { value: 297, prefix: '$', label: 'AUD a month for Health OS' },
              { value: 'One', label: 'place for booking, clients and sales' },
            ]}
          />
        </FadeIn>
      </div>
    </section>
  );
};
