/**
 * BentosSection: the three bento systems, each for its own job, then the bento grid for
 * composing cards by hand. Images come from the tagged library; figures follow the offer.
 */
import * as React from 'react';
import { Clock, MapPin, Users } from 'lucide-react';
import { Section, Example } from '@/showcase/Section';
import { ContentCard, FeatureCard, ActionCard } from '@/components/cards';
import { BentoGrid, BentoCell } from '@/components/bento/Bento';
import { FeatureBento, type BentoStyle } from '@/components/bento/FeatureBento';
import { ProductBento } from '@/components/bento/ProductBento';
import { GalleryBento, type GalleryPhoto } from '@/components/bento/GalleryBento';
import { SegmentedControl } from '@/components/ui/segmented';
import { thumb } from '@/lib/images';
import { PHOTOS } from '@/data/photos';

const IMG = {
  coworking: '/imagery/work-and-content-creation/three-women-coworking-on-boucle-sofa-with-laptop-and-coffee-4-3.png',
};

/** A library photo at display size, with its description as the alt text. */
const libraryPhoto = (src: string, caption?: string): GalleryPhoto => {
  const photo = PHOTOS.find((p) => p.src === src);
  return { src: thumb(src), alt: photo?.description ?? '', caption };
};

const BENTO_STYLES: { value: BentoStyle; label: string }[] = [
  { value: 'photo', label: 'Photo-led' },
  { value: 'tint', label: 'Tinted' },
  { value: 'quiet', label: 'Quiet' },
];

const FeatureBentoExample = () => {
  const [variant, setVariant] = React.useState<BentoStyle>('photo');
  return (
    <Example
      id="feature-bento"
      label="Feature bento"
      action={<SegmentedControl size="sm" aria-label="Bento style" options={BENTO_STYLES} value={variant} onValueChange={(v) => setVariant(v as BentoStyle)} />}
    >
      <FeatureBento
        key={variant}
        variant={variant}
        hero={{
          eyebrow: 'Health OS',
          title: 'Set it up once, then let it run',
          description: 'Built with you, then running in the background while you are with your clients.',
          image: { src: thumb(IMG.coworking), alt: 'Three women working together on a sofa with laptops and coffee' },
        }}
        highlight={{ icon: 'clipboard-checklist', value: 10, label: 'questions in the check, under two minutes' }}
        feature={{ icon: 'desk-calendar', title: 'Bookings that confirm themselves', description: 'Clients book, pay and get reminders without you in the loop.' }}
        action={{ eyebrow: 'The check', title: 'See what still routes through you' }}
        facts={[
          { value: 297, prefix: '$', label: 'AUD a month for Health OS' },
          { value: 'One', label: 'place for booking, clients and sales' },
        ]}
      />
    </Example>
  );
};

const ProductBentoExample = () => (
  <Example id="product-bento" label="Product bento">
    <ProductBento
      figure={{
        value: 'One',
        label: 'dashboard',
        title: 'Booking, clients and sales together',
        description: 'Your calendar, client records and sales live on one dashboard.',
      }}
      booking={{
        title: 'Bookings that confirm themselves',
        description: 'Clients book, pay and get reminders without you in the loop.',
        days: [
          { weekday: 'Mon', date: '14' },
          { weekday: 'Tue', date: '15' },
          { weekday: 'Wed', date: '16' },
          { weekday: 'Thu', date: '17' },
          { weekday: 'Fri', date: '18' },
        ],
        bookedDay: 3,
        slots: ['9:00 am', '10:30 am', '1:00 pm', '3:30 pm'],
        bookedSlot: 1,
      }}
      followUp={{
        title: 'Enquiries answered',
        description: 'New enquiries get a reply and a next step while you are with a client.',
        received: 'Hi, is anything free on Thursday?',
        sent: 'Thursday at 10:30 is open. Here is the link to book.',
      }}
      pipeline={{
        title: 'Every enquiry has a next step',
        description: 'See where each person sits, from first message to first booking.',
        stages: ['Enquiry', 'Replied', 'Booked', 'Rebooked'],
      }}
      clients={{
        title: 'Records for every client',
        description: 'Bookings, forms and notes sit with each client, ready before they arrive.',
        rows: [
          { name: 'Mia', detail: 'Thu 10:30' },
          { name: 'Priya', detail: 'Fri 9:00' },
          { name: 'Sam', detail: 'Mon 2:30' },
        ],
      }}
    />
  </Example>
);

const GALLERY_LAYOUTS = [
  { value: 'standard', label: 'Standard' },
  { value: 'reverse', label: 'Mirrored' },
];

const GalleryBentoExample = () => {
  const [layout, setLayout] = React.useState('standard');
  return (
    <Example
      id="gallery-bento"
      label="Gallery bento"
      action={<SegmentedControl size="sm" aria-label="Gallery layout" options={GALLERY_LAYOUTS} value={layout} onValueChange={setLayout} />}
    >
      <GalleryBento
        reverse={layout === 'reverse'}
        photos={{
          portrait: libraryPhoto('/imagery/active-and-fitness/group-yoga-side-plank-in-bright-studio-vertical-9-16.png', 'The main studio'),
          wide: libraryPhoto('/imagery/social-and-wellness/three-women-chatting-in-wellness-studio-with-drinks-16-9.png', 'The lounge'),
          second: libraryPhoto('/imagery/social-and-wellness/two-women-relaxing-on-grass-overhead-shot-16-9.png', 'The garden'),
        }}
        eyebrow="Saturday class"
        title="Morning flow at the studio"
        description="A slow, steady class for all levels, with tea in the lounge afterwards."
        action={{ label: 'See class times' }}
        details={[
          { icon: MapPin, label: 'Where', value: 'Bondi studio, upstairs' },
          { icon: Clock, label: 'When', value: 'Saturdays, 7 to 8:15 am' },
          { icon: Users, label: 'Group size', value: 'Up to 12 people' },
        ]}
      />
    </Example>
  );
};

export const BentosSection = () => (
  <Section id="bentos">
    <div className="flex flex-col gap-8">
      <FeatureBentoExample />
      <ProductBentoExample />
      <GalleryBentoExample />

      <Example id="bento-grid" label="Bento grid">
        <BentoGrid>
          <BentoCell span={2}>
            <ContentCard
              title="Set it up once, then let it run"
              excerpt="Built with you, then running in the background."
              image={{ src: thumb(IMG.coworking), alt: 'Three women working together on a sofa with laptops and coffee' }}
              ratio="3/2"
              category="Setup"
              className="h-full"
            />
          </BentoCell>
          <BentoCell>
            <FeatureCard icon="chat-bubbles" accent="lavender" title="Enquiries answered" description="New enquiries get a reply and a next step while you are with a client." />
          </BentoCell>
          <BentoCell>
            <FeatureCard icon="gold-bell" accent="apricot" title="Reminders on time" description="Every booking gets its reminder without anyone sending it." />
          </BentoCell>
          <BentoCell span={2}>
            <ActionCard title="See what still routes through you" description="Ten questions, under two minutes." action={{ label: 'Start the check' }} className="h-full" />
          </BentoCell>
        </BentoGrid>
      </Example>
    </div>
  </Section>
);
