/**
 * BlocksSection: composed page sections. Health OS pricing follows the offer (data/offer.ts),
 * which has no annual plan, so its table shows no billing switch. The second table shows the
 * switch with sample prices for a studio's own memberships. Then common questions and the
 * feature grid.
 */
import { Section, Example } from '@/showcase/Section';
import { PricingTable } from '@/components/blocks/PricingTable';
import { Faq, type FaqItem } from '@/components/blocks/Faq';
import type { PricingCardProps } from '@/components/cards';
import { Pillars } from '@/sections/Pillars';
import { PLANS, PRICING_NOTE, FAQ_ITEMS } from '@/data/offer';
import { PHOTOS } from '@/data/photos';
import { thumb } from '@/lib/images';

const photo = (fragment: string) => {
  const p = PHOTOS.find((x) => x.src.includes(fragment)) ?? PHOTOS[0];
  return { src: thumb(p.src), alt: p.description };
};

/* Sample figures for a studio's own membership page. Never Health OS prices. */
const STUDIO_PLANS: PricingCardProps[] = [
  {
    name: 'Casual',
    price: 59,
    annualPrice: 49,
    cadence: 'AUD / month',
    description: 'Four classes a month, booked when it suits you.',
    features: ['4 classes a month', 'Book up to a week ahead', 'Mat and towel at the studio'],
    action: { label: 'Choose Casual' },
  },
  {
    name: 'Unlimited',
    price: 129,
    annualPrice: 109,
    cadence: 'AUD / month',
    description: 'Every class on the timetable, as often as you like.',
    features: ['Unlimited classes', 'Book up to two weeks ahead', 'One guest pass a month'],
    action: { label: 'Choose Unlimited' },
    featured: true,
  },
  {
    name: 'Private',
    price: 249,
    annualPrice: 219,
    cadence: 'AUD / month',
    description: 'Two one-to-one sessions a month with your coach.',
    features: ['2 private sessions a month', 'A plan reviewed each month', 'Unlimited classes'],
    action: { label: 'Ask about Private' },
  },
];

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
      <Example id="pricing-table" label="Pricing table">
        <div className="flex flex-col gap-16 py-4">
          <PricingTable plans={PLANS} note={PRICING_NOTE} />
          <div className="border-t border-line pt-12">
            <p className="mb-8 text-center font-sans text-label text-ink-600">With a billing switch, using sample prices for a studio</p>
            <PricingTable plans={STUDIO_PLANS} note="Sample prices for a studio's own memberships, in AUD." />
          </div>
        </div>
      </Example>
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
