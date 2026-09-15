/**
 * CommandHero: the command-palette hero. The two-tone headline with its picture tiles, a
 * short line, the command bar and quick-action chips, then an illustrative product preview.
 * Built on <Hero> so the spacing rules hold.
 */
import { CommandBar } from '@/components/ui/command-bar';
import { CommandChip } from '@/components/ui/command-chip';
import { DashboardPreview } from '@/components/ui/dashboard-preview';
import { Hero, HeroContainer } from '@/components/ui/hero';
import { Headline } from '@/components/ui/headline';
import { FadeIn, HeroGlow, Stagger, StaggerItem } from '@/components/ui/animated';
import { COMMANDS } from '@/data/system';

export interface CommandHeroProps {
  id?: string;
  /** 'h1' on a real page; 'h2' when shown inside the reference so the page keeps one h1 */
  headingLevel?: 'h1' | 'h2';
}

export const CommandHero = ({ id = 'top', headingLevel = 'h1' }: CommandHeroProps) => {
  return (
    <Hero id={id} className="border-b-0">
      <HeroGlow />
      <HeroContainer>
        <FadeIn>
          <Headline as={headingLevel} text="You built {blocks} it. Now [make] it run {computer} without you." />
        </FadeIn>
        <FadeIn delay={0.08} className="mt-hero-gap-sm">
          <p className="max-w-hero-subcopy font-sans text-body text-ink-600">
            Health OS brings booking, clients, courses, content and sales into one system that runs in the background.
          </p>
        </FadeIn>
        <FadeIn delay={0.14} className="mt-hero-gap w-full max-w-xl">
          <CommandBar aria-label="Search the platform" />
        </FadeIn>
        <Stagger className="mt-hero-gap-sm flex flex-wrap items-center justify-center gap-2" amount={0.4}>
          {COMMANDS.map((command) => (
            <StaggerItem key={command}>
              <CommandChip command={command} />
            </StaggerItem>
          ))}
        </Stagger>
      </HeroContainer>
      <FadeIn delay={0.1} y={16} className="mx-auto mt-16 max-w-4xl">
        <DashboardPreview />
      </FadeIn>
    </Hero>
  );
};
