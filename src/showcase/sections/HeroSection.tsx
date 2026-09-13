/**
 * HeroSection: the reference site's opening. One heading with a highlighted word, a short
 * line, the command widget and quick links to the parts people look for most.
 */
import { Hero, HeroContainer } from '@/components/ui/hero';
import { CommandWidget } from '@/components/ui/command-widget';
import { CommandChip } from '@/components/ui/command-chip';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animated';
import { SHOWCASE_COMMANDS } from '@/data/system';
import { sectionMeta } from '@/showcase/catalog';

const JUMP: Record<string, string> = {
  'browse the components': 'buttons',
  'copy a token': 'tokens',
  'switch the theme': 'tokens',
  'read the checklist': 'checklist',
  'open the live page': 'live',
};

export const HeroSection = () => {
  const meta = sectionMeta('hero');
  return (
    <Hero id="hero">
      <HeroContainer>
        <FadeIn delay={0.05}>
          <h1 className="font-display text-heading text-ink-900">
            The design system behind a <span className="text-highlight">calm practice</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.1} className="mt-hero-gap-sm">
          <p className="max-w-hero-subcopy font-sans text-body text-ink-600">{meta.lead}</p>
        </FadeIn>
        <FadeIn delay={0.15} className="mt-hero-gap w-full max-w-2xl">
          <CommandWidget />
        </FadeIn>
        <Stagger className="mt-hero-gap-sm flex flex-wrap items-center justify-center gap-2" amount={0.4}>
          {SHOWCASE_COMMANDS.map((command) => (
            <StaggerItem key={command}>
              <CommandChip command={command} onClick={() => document.getElementById(JUMP[command])?.scrollIntoView()} />
            </StaggerItem>
          ))}
        </Stagger>
      </HeroContainer>
    </Hero>
  );
};
