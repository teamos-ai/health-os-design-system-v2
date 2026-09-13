/**
 * SignatureSection: the three full-width sections that make a page feel like Health OS,
 * each shown at full width with its usage.
 */
import type { ReactNode } from 'react';
import { Section, Usage } from '@/showcase/Section';
import { CommandHero } from '@/sections/CommandHero';
import { BentoSection } from '@/sections/BentoSection';
import { DirectoryCompare } from '@/sections/DirectoryCompare';

const Band = ({ id, children }: { id: string; children: ReactNode }) => (
  <div className="overflow-hidden rounded-lg border border-line bg-surface">
    <div className="bg-paper">{children}</div>
    <Usage id={id} />
  </div>
);

export const SignatureSection = () => (
  <Section id="signature" className="[&>div]:max-w-6xl">
    <div className="flex flex-col gap-8">
      <Band id="command-hero">
        <CommandHero id="sig-hero" headingLevel="h2" />
      </Band>
      <Band id="bento-section">
        <BentoSection id="sig-bento" />
      </Band>
      <Band id="directory-compare">
        <DirectoryCompare id="sig-compare" />
      </Band>
    </div>
  </Section>
);
