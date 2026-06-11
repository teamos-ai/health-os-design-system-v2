/**
 * SignatureSection — the four signature sections shown live, each labelled: the command-
 * palette hero, the tool-card carousel, the bento grid and the directory/comparison.
 * Rendered full-width so they read exactly as they will on the site.
 */
import type { ReactNode } from 'react';
import { FadeIn } from '@/components/ui/animated';
import { MonoLabel } from '@/components/ui/mono-label';
import { CommandHero } from '@/sections/CommandHero';
import { ToolCarousel } from '@/sections/ToolCarousel';
import { BentoSection } from '@/sections/BentoSection';
import { DirectoryCompare } from '@/sections/DirectoryCompare';

const Band = ({ label, children }: { label: string; children: ReactNode }) => (
  <div>
    <div className="border-y border-line bg-surface px-6 py-2.5 md:px-12">
      <span className="font-mono text-caption text-ink-500">{label}</span>
    </div>
    {children}
  </div>
);

export const SignatureSection = () => (
  <section id="signature" className="scroll-mt-8 border-b border-line">
    <div className="px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <header className="max-w-2xl">
            <MonoLabel>Composition</MonoLabel>
            <h2 className="mt-3 font-display text-h1 text-ink-900">Signature sections</h2>
            <p className="mt-4 font-sans text-body-lg leading-relaxed text-ink-500">
              The structural set that dresses the Health OS site — the command-palette hero,
              the carousel of tools it replaces, the bento of what it runs, and the
              comparison that closes the case.
            </p>
          </header>
        </FadeIn>
      </div>
    </div>

    <Band label="a · command-palette hero">
      <CommandHero id="sig-hero" />
    </Band>
    <Band label="b · horizontal tool-card carousel">
      <ToolCarousel id="sig-carousel" />
    </Band>
    <Band label="c · bento grid">
      <BentoSection id="sig-bento" />
    </Band>
    <Band label="d · directory / comparison">
      <DirectoryCompare id="sig-compare" />
    </Band>
  </section>
);
