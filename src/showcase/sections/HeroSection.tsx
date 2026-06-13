/**
 * HeroSection — the design-system hero. A centred layout: a
 * floating pill nav, a big two-tone Spline Sans H1, a calm subtitle, then the rich
 * command / "ask AI" widget with `/command` chips, all over a soft radial glow.
 */
import { Hero, HeroContainer } from '@/components/ui/hero';
import { CommandWidget } from '@/components/ui/command-widget';
import { CommandChip } from '@/components/ui/command-chip';
import { FadeIn, HeroGlow, Stagger, StaggerItem } from '@/components/ui/animated';
import { SHOWCASE_COMMANDS } from '@/data/system';

export const HeroSection = () => (
  <Hero id="hero">
    <HeroGlow />

    <HeroContainer>
      <FadeIn delay={0.05}>
        <h1 className="font-display text-display-lg leading-[1.05] tracking-tight text-ink-900 md:text-display-xl">
          The only <span className="text-gradient">design system</span>
          <br />
          that matters.
        </h1>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-hero-gap-sm">
        <p className="max-w-xl font-sans text-body-lg leading-relaxed text-ink-500">
          No boring designs. Beauty in all lines and curves.
        </p>
      </FadeIn>

      <FadeIn delay={0.15} className="mt-hero-gap w-full max-w-2xl">
        <CommandWidget />
      </FadeIn>

      <Stagger className="mt-hero-gap-sm flex flex-wrap items-center justify-center gap-2.5" amount={0.4}>
        {SHOWCASE_COMMANDS.map((command) => (
          <StaggerItem key={command}>
            <CommandChip command={command} />
          </StaggerItem>
        ))}
      </Stagger>
    </HeroContainer>
  </Hero>
);
