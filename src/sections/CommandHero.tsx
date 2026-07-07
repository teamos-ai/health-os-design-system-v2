/**
 * CommandHero — the command-palette search hero.
 * Soft pastel radial glow on warm ivory, a big Spline Sans headline with one gradient
 * word, the command bar, a row of `/command` chips, then the dashboard payoff.
 * Built on the <Hero> primitive (foundations/hero.md) — spacious by rule, never
 * hand-rolled padding. In-view cascade, reduced-motion safe.
 */
import { CommandBar } from '@/components/ui/command-bar';
import { CommandChip } from '@/components/ui/command-chip';
import { MonoLabel } from '@/components/ui/mono-label';
import { DashboardPreview } from '@/components/ui/dashboard-preview';
import { Hero, HeroContainer } from '@/components/ui/hero';
import { FadeIn, HeroGlow, Stagger, StaggerItem } from '@/components/ui/animated';
import { COMMANDS } from '@/data/system';

export interface CommandHeroProps {
  id?: string;
  /** 'h1' on a real page; 'h2' when the hero renders inside a framed demo
   *  (Signature / Live page) so the document keeps a single h1. */
  headingLevel?: 'h1' | 'h2';
}

export const CommandHero = ({ id = 'top', headingLevel = 'h1' }: CommandHeroProps) => {
  const Heading = headingLevel;
  return (
    <Hero id={id} className="overflow-hidden">
      <HeroGlow />

      <HeroContainer className="flex flex-col items-center text-center">
        <FadeIn>
          <MonoLabel dot>The operating system for your practice</MonoLabel>
        </FadeIn>

        <FadeIn delay={0.05} className="mt-hero-gap-sm">
          <Heading className="font-display text-display-lg text-ink-900 md:text-display-xl">
            Your practice, <span className="text-gradient">one system</span>.
          </Heading>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-hero-gap-sm">
          <p className="max-w-hero-subcopy font-sans text-body-lg leading-relaxed text-ink-600">
            Health OS replaces the six to eight tools you juggle with one calm place to run
            booking, clients, courses, content and sales.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-hero-gap w-full max-w-xl">
          <CommandBar aria-label="Search the platform" />
        </FadeIn>

        <Stagger
          className="mt-hero-gap-sm flex flex-wrap items-center justify-center gap-2.5"
          amount={0.4}
        >
          {COMMANDS.map((command) => (
            <StaggerItem key={command}>
              <CommandChip command={command} />
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={0.1} className="mt-hero-gap-sm">
          <p className="font-mono text-caption text-ink-600">
            Done-with-you setup — live in 30 days.
          </p>
        </FadeIn>
      </HeroContainer>

      <FadeIn delay={0.1} y={16} className="mx-auto mt-16 max-w-4xl px-6">
        <DashboardPreview />
      </FadeIn>
    </Hero>
  );
};
