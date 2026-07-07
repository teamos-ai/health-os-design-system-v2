/**
 * HeroSection — the design-system hero. A centred layout: a
 * floating pill nav, a big two-tone Spline Sans H1, a calm subtitle, then the rich
 * command / "ask AI" widget with `/command` chips, all over a soft radial glow.
 */
import { Hero, HeroContainer } from '@/components/ui/hero';
import { CommandWidget } from '@/components/ui/command-widget';
import { CommandChip } from '@/components/ui/command-chip';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animated';
import { SHOWCASE_COMMANDS } from '@/data/system';

// Hero background is intentionally a single flat ground (pure white / pure black /
// paper per theme) — no glow, no texture — for a calm, minimal, software-like hero.
export const HeroSection = () => (
  <Hero id="hero">
    <HeroContainer>
      <FadeIn delay={0.05}>
        <h1 className="font-display text-display-lg text-ink-900 md:text-display-xl">
          The design system behind
          <br />a <span className="text-gradient-sweep">calm</span> practice.
        </h1>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-hero-gap-sm">
        <p className="max-w-xl font-sans text-body-lg leading-relaxed text-ink-500">
          Tokens, components and voice — locked, documented, and ready to build with.
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
