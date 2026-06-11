/**
 * LivePageSection — the whole system assembled into one page, inside a browser frame.
 * Ticker + nav + command hero + carousel + pillars + outcomes + bento + comparison +
 * the dark-carbon footer. Proof the system dresses a real Health OS page end to end.
 */
import { Section } from '@/showcase/Section';
import { Ticker } from '@/components/layout/Ticker';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { CommandHero } from '@/sections/CommandHero';
import { ToolCarousel } from '@/sections/ToolCarousel';
import { Pillars } from '@/sections/Pillars';
import { OutcomeBand } from '@/sections/OutcomeBand';
import { BentoSection } from '@/sections/BentoSection';
import { DirectoryCompare } from '@/sections/DirectoryCompare';

export const LivePageSection = () => (
  <Section
    id="live"
    eyebrow="Assembled"
    title="The live page"
    lead="Every token, component and section, composed into a single Health OS marketing page. Scroll inside the frame."
    className="border-b-0"
  >
    <div className="overflow-hidden rounded-2xl border border-line shadow-lg">
      {/* Browser chrome */}
      <div className="flex items-center justify-between border-b border-line bg-paper px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        </div>
        <span className="font-mono text-caption text-ink-400">healthos.com.au</span>
        <span className="w-10" />
      </div>

      {/* Scrollable assembled page */}
      <div className="no-scrollbar max-h-[80vh] overflow-y-auto bg-paper">
        <Ticker />
        <Nav sticky={false} />
        <CommandHero id="live-hero" />
        <ToolCarousel id="live-carousel" />
        <Pillars id="live-pillars" />
        <OutcomeBand id="live-outcomes" />
        <BentoSection id="live-bento" />
        <DirectoryCompare id="live-compare" />
        <Footer />
      </div>
    </div>
  </Section>
);
