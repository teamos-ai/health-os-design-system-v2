/**
 * OverviewSection: the system in carousel cards on a slow, draggable marquee that drifts
 * left to right. Each card shows background photos, one idea, one figure and an Open
 * action that scrolls to its section.
 */
import { Section } from '@/showcase/Section';
import { Marquee } from '@/components/ui/animated';
import { CarouselCard } from '@/components/cards';
import { OVERVIEW_CARDS } from '@/data/system';
import { BACKGROUNDS } from '@/data/backgrounds';
import { thumb } from '@/lib/images';

const photo = (src: string) => ({
  src: thumb(src),
  alt: BACKGROUNDS.find((b) => b.src === src)?.description ?? '',
});

export const OverviewSection = () => (
  <Section id="overview">
    <Marquee speed={18} reverse draggable gapClassName="gap-4" ariaLabel="System snapshots" className="py-2">
      {OVERVIEW_CARDS.map((card) => (
        <CarouselCard
          key={card.title}
          images={card.images.map(photo)}
          category={card.group}
          title={card.title}
          meta={card.meta}
          description={card.description}
          figure={card.figure}
          action={{ label: 'Open', onClick: () => document.getElementById(card.section)?.scrollIntoView() }}
        />
      ))}
    </Marquee>
  </Section>
);
