/**
 * BlocksSection: composed page sections: common questions and the pillars. Pricing lives once,
 * in the Cards section, as the one pricing system every page uses.
 */
import { Section, Example } from '@/showcase/Section';
import { Faq, type FaqItem } from '@/components/blocks/Faq';
import { Pillars } from '@/sections/Pillars';
import { FAQ_ITEMS } from '@/data/offer';
import { PHOTOS } from '@/data/photos';
import { thumb } from '@/lib/images';

const photo = (fragment: string) => {
  const p = PHOTOS.find((x) => x.src.includes(fragment)) ?? PHOTOS[0];
  return { src: thumb(p.src), alt: p.description };
};

const FAQ_IMAGES = [
  photo('three-women-coworking-on-boucle-sofa-with-laptop-and-coffee-4-3'),
  photo('woman-in-pink-sweatshirt-and-cap-with-phone-and-earphones-portrait'),
  photo('woman-filming-content-on-laptop-by-city-window-4-3'),
  photo('woman-walking-with-iced-coffee-sydney-harbour-backdrop-16-9'),
];

const FAQ: FaqItem[] = FAQ_ITEMS.map((item, i) => ({ ...item, image: FAQ_IMAGES[i] }));

export const BlocksSection = () => (
  <Section id="blocks">
    <div className="flex flex-col gap-8">
      <Example id="faq" label="FAQ">
        <div className="py-4">
          <Faq items={FAQ} />
        </div>
      </Example>
      <Example id="pillars" label="Pillars" padded={false}>
        <Pillars id="blocks-pillars" />
      </Example>
    </div>
  </Section>
);
