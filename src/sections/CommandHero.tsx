/**
 * CommandHero — the command-palette search hero.
 * Soft pastel radial glow on warm ivory, a big Spline Sans headline with one gradient
 * word, the command bar, a row of `/command` chips, then the dashboard payoff.
 * In-view cascade, reduced-motion safe.
 */
import { CommandBar } from '@/components/ui/command-bar';
import { CommandChip } from '@/components/ui/command-chip';
import { MonoLabel } from '@/components/ui/mono-label';
import { DashboardPreview } from '@/components/ui/dashboard-preview';
import { FadeIn, HeroGlow, Stagger, StaggerItem } from '@/components/ui/animated';
import { COMMANDS } from '@/data/system';

export const CommandHero = ({ id = 'top' }: { id?: string }) => (
  <section id={id} className="relative overflow-hidden px-6 pb-16 pt-20 md:pb-24 md:pt-28">
    <HeroGlow />

    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <FadeIn>
        <MonoLabel dot>The operating system for your practice</MonoLabel>
      </FadeIn>

      <FadeIn delay={0.05} className="mt-6">
        <h1 className="font-display text-display-lg text-ink-900 md:text-display-xl">
          Your practice, <span className="text-gradient">one system</span>.
        </h1>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-6">
        <p className="max-w-hero-subcopy font-sans text-body-lg leading-relaxed text-ink-600">
          Health OS replaces the six to eight tools you juggle with one calm place to run
          booking, clients, courses, content and sales.
        </p>
      </FadeIn>

      <FadeIn delay={0.15} className="mt-9 w-full max-w-xl">
        <CommandBar aria-label="Search the platform" />
      </FadeIn>

      <Stagger className="mt-5 flex flex-wrap items-center justify-center gap-2.5" amount={0.4}>
        {COMMANDS.map((command) => (
          <StaggerItem key={command}>
            <CommandChip command={command} />
          </StaggerItem>
        ))}
      </Stagger>

      <FadeIn delay={0.1} className="mt-7">
        <p className="font-mono text-caption text-ink-600">
          No hype — done-with-you setup, live in 30 days.
        </p>
      </FadeIn>
    </div>

    <FadeIn delay={0.1} y={16} className="mx-auto mt-16 max-w-4xl">
      <DashboardPreview />
    </FadeIn>
  </section>
);
