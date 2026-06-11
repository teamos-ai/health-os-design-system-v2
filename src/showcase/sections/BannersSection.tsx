/**
 * BannersSection — the scrolling banner (ticker) variants. Three tones, both
 * directions, different paces. Each pauses on hover and honours reduced motion.
 */
import { Section, Demo } from '@/showcase/Section';
import { Ticker } from '@/components/layout/Ticker';
import { TICKER_ITEMS, TICKER_PRINCIPLES, TICKER_CRAFT } from '@/data/system';

export const BannersSection = () => (
  <Section
    id="banners"
    eyebrow="Banners"
    title="Scrolling banners"
    lead="A thin ticker for the top of any page. Three tones, either direction, any pace — it pauses on hover and stills under reduced motion."
  >
    <div className="flex flex-col gap-4">
      <Demo label="Subtle — outcomes, scrolling left" padded={false}>
        <Ticker items={TICKER_ITEMS} tone="subtle" />
      </Demo>
      <Demo label="Carbon — principles, scrolling right" padded={false}>
        <Ticker items={TICKER_PRINCIPLES} tone="carbon" reverse speed={36} />
      </Demo>
      <Demo label="Tint — the craft, gentle" padded={false}>
        <Ticker items={TICKER_CRAFT} tone="tint" speed={42} />
      </Demo>
    </div>
  </Section>
);
