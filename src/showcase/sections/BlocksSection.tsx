/**
 * BlocksSection: composed page sections. Pricing follows the Health OS offer (data/offer.ts).
 */
import { Section, Example } from '@/showcase/Section';
import { PricingTable } from '@/components/blocks/PricingTable';
import { Faq } from '@/components/blocks/Faq';
import { Pillars } from '@/sections/Pillars';
import { PLANS, PRICING_NOTE, FAQ_ITEMS } from '@/data/offer';

export const BlocksSection = () => (
  <Section id="blocks">
    <div className="flex flex-col gap-8">
      <Example id="pricing-table" label="Pricing table">
        <PricingTable plans={PLANS} note={PRICING_NOTE} />
      </Example>
      <Example id="faq" label="FAQ">
        <Faq columns={2} items={FAQ_ITEMS} />
      </Example>
      <Example id="pillars" label="Feature grid" padded={false}>
        <Pillars id="blocks-pillars" />
      </Example>
    </div>
  </Section>
);
