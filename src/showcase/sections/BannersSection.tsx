/**
 * BannersSection: the one banner, on the soft wash, drifting in each direction.
 */
import { Section, Example } from '@/showcase/Section';
import { Ticker } from '@/components/layout/Ticker';
import { TICKER_ITEMS, TICKER_CRAFT } from '@/data/system';

export const BannersSection = () => (
  <Section id="banners">
    <Example id="ticker" label="Banner" padded={false}>
      <div className="flex flex-col gap-4 py-6">
        <Ticker items={TICKER_ITEMS} ariaLabel="Product banner" />
        <Ticker items={TICKER_CRAFT} reverse speed={42} ariaLabel="Craft banner" />
      </div>
    </Example>
  </Section>
);
