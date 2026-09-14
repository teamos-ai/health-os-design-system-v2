/**
 * HeroSection: the reference site's opening. The two-tone headline with its picture tiles, a
 * short line, the command widget and quick links to the parts people look for most.
 */
import { Hero, HeroContainer } from '@/components/ui/hero';
import { Headline } from '@/components/ui/headline';
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
          <Headline text="The design {swatches} system behind a [calm] {stones} practice" />
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
