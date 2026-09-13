/**
 * LivePageSection: a whole marketing page assembled from the system, in a browser frame.
 */
import { Section, Usage } from '@/showcase/Section';
import { Ticker } from '@/components/layout/Ticker';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { CommandHero } from '@/sections/CommandHero';
import { Pillars } from '@/sections/Pillars';
import { BentoSection } from '@/sections/BentoSection';
import { DirectoryCompare } from '@/sections/DirectoryCompare';
import { PricingTable } from '@/components/blocks/PricingTable';
import { Faq } from '@/components/blocks/Faq';
import { PLANS, PRICING_NOTE, FAQ_ITEMS } from '@/data/offer';

export const LivePageSection = () => (
  <Section id="live" className="border-b-0 [&>div]:max-w-6xl">
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-lg">
      <div className="flex items-center justify-between border-b border-line bg-surface-2 px-4 py-3">
        <span aria-hidden className="flex gap-2">
          <i className="h-2 w-2 rounded-full bg-ink-200" />
          <i className="h-2 w-2 rounded-full bg-ink-200" />
          <i className="h-2 w-2 rounded-full bg-ink-200" />
        </span>
        <span className="font-sans text-label text-ink-500">healthos.au</span>
        <span className="w-10" />
      </div>
      <div
        role="group"
        aria-label="Assembled page preview, scrollable"
        tabIndex={0}
        className="max-h-[80vh] overflow-y-auto bg-paper [scrollbar-width:thin] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rose-700/40"
      >
        <Ticker />
        <Nav sticky={false} />
        <CommandHero id="live-hero" headingLevel="h2" />
        <Pillars id="live-pillars" />
        <BentoSection id="live-bento" />
        <section id="live-pricing" className="py-16 md:py-24">
          <div className="mx-auto max-w-container px-6">
            <h2 className="mb-12 max-w-2xl font-display text-heading text-ink-900">Three plans</h2>
            <PricingTable plans={PLANS} note={PRICING_NOTE} />
          </div>
        </section>
        <DirectoryCompare id="live-compare" />
        <section id="live-faq" className="py-16 md:py-24">
          <div className="mx-auto max-w-container px-6">
            <h2 className="mb-8 max-w-2xl font-display text-heading text-ink-900">Questions</h2>
            <Faq items={FAQ_ITEMS} columns={2} />
          </div>
        </section>
        <Footer />
      </div>
      <Usage id="live-page" />
    </div>
  </Section>
);
