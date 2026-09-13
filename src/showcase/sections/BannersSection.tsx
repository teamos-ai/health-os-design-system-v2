/**
 * BannersSection: the ticker in its three tones.
 */
import { Section, Example } from '@/showcase/Section';
import { Ticker } from '@/components/layout/Ticker';
import { TICKER_ITEMS, TICKER_PRINCIPLES, TICKER_CRAFT } from '@/data/system';

export const BannersSection = () => (
  <Section id="banners">
    <Example id="ticker" label="Ticker: subtle, carbon and tint" padded={false}>
      <div className="flex flex-col gap-4 py-6">
        <Ticker items={TICKER_ITEMS} tone="subtle" ariaLabel="Subtle banner" />
        <Ticker items={TICKER_PRINCIPLES} tone="carbon" reverse speed={36} ariaLabel="Carbon banner" />
        <Ticker items={TICKER_CRAFT} tone="tint" speed={42} ariaLabel="Tint banner" />
      </div>
    </Example>
  </Section>
);
