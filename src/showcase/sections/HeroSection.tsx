/**
 * HeroSection: the reference site's opening. The headline stands clear with its one apricot
 * word, and icon tiles float in the space around it (FloatingTiles). Then a short line, a search
 * that really searches the catalogue and jumps to the best section, and quick links to the parts
 * people look for most. Press / anywhere to search. The hero dissolves into the section below
 * (Hero `fade`), so there is no hard line at the fold.
 */
import * as React from 'react';
import { Hero, HeroContainer } from '@/components/ui/hero';
import { Headline } from '@/components/ui/headline';
import { FloatingTiles, type FloatingTile } from '@/components/ui/floating-tiles';
import { CommandWidget } from '@/components/ui/command-widget';
import { CommandChip } from '@/components/ui/command-chip';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animated';
import { useToast } from '@/components/ui/toast';
import { SHOWCASE_COMMANDS } from '@/data/system';
import { ENTRIES, SECTIONS, sectionMeta } from '@/showcase/catalog';
import { useTheme } from '@/lib/useTheme';

/* Tiles hang in the side margins and above the words. Phones keep two above the headline. */
const TILES: FloatingTile[] = [
  { id: 'swatches', x: 9, y: 20, size: 'lg', lean: -1, from: 'xl' },
  { id: 'stones', x: 14, y: 50, size: 'md', lean: 0.8, from: 'xl' },
  { id: 'envelope', x: 7, y: 77, size: 'sm', lean: -0.6, from: 'xl' },
  { id: 'computer', x: 90, y: 23, size: 'lg', lean: 0.9, from: 'xl' },
  { id: 'desk-calendar', x: 86, y: 53, size: 'md', lean: -0.8, from: 'xl' },
  { id: 'gears', x: 93, y: 79, size: 'sm', lean: 0.6, from: 'xl' },
  { id: 'paint-palette', x: 29, y: 9, size: 'sm', lean: -0.5, from: 'md' },
  { id: 'chat-bubbles', x: 72, y: 8, size: 'md', lean: 0.7, from: 'md' },
  { id: 'coffee-cups', x: 16, y: 5, size: 'sm', lean: -0.7, until: 'md' },
  { id: 'bar-chart', x: 84, y: 6, size: 'sm', lean: 0.7, until: 'md' },
];

const JUMP: Record<string, string> = {
  'browse the components': 'buttons',
  'copy a token': 'tokens',
  'read the checklist': 'checklist',
  'open the live page': 'live',
};

/* Every section and catalogue entry, with its own words weighted above its description. */
const INDEX = [
  ...SECTIONS.filter((s) => s.id !== 'hero').map((s) => ({ section: s.id, name: `${s.label} ${s.title}`.toLowerCase(), text: s.lead.toLowerCase(), weight: 2 })),
  ...ENTRIES.map((e) => ({ section: e.section, name: e.name.toLowerCase(), text: `${e.purpose} ${e.use.join(' ')} ${e.api}`.toLowerCase(), weight: 1 })),
];

/** The section that best matches a query: names count five times more than descriptions. */
const bestSection = (query: string) => {
  const terms = query.toLowerCase().replace(/[@/]/g, ' ').split(/\s+/).filter((t) => t.length > 1);
  if (query.trim().startsWith('@') && terms.length === 0) return 'tokens';
  const scores = new Map<string, number>();
  for (const item of INDEX) {
    const score = terms.reduce((sum, t) => sum + (item.name.includes(t) ? 5 : 0) + (item.text.includes(t) ? 1 : 0), 0) * item.weight;
    if (score > 0) scores.set(item.section, (scores.get(item.section) ?? 0) + score);
  }
  return [...scores.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
};

export const HeroSection = () => {
  const meta = sectionMeta('hero');
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  /* "/" focuses the search from anywhere, unless someone is already typing. */
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, select, [contenteditable="true"]')) return;
      e.preventDefault();
      document.getElementById('hero-search')?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const search = (query: string) => {
    if (!query.trim()) return;
    const id = bestSection(query);
    if (!id) {
      toast({ title: `Nothing matches "${query.trim()}"`, description: 'Try pricing, buttons, icons or tokens.', tone: 'warning' });
      return;
    }
    document.getElementById(id)?.scrollIntoView();
    toast({ title: `Showing ${sectionMeta(id).label}` });
  };

  const run = (command: string) => {
    if (command === 'switch the theme') {
      const next = theme === 'paper' ? 'light' : 'paper';
      setTheme(next);
      toast({ title: next === 'paper' ? 'Paper theme on' : 'Light theme on' });
      return;
    }
    document.getElementById(JUMP[command])?.scrollIntoView();
  };

  return (
    <Hero id="hero" fade>
      <FloatingTiles tiles={TILES} />
      <HeroContainer>
        <FadeIn delay={0.05}>
          <Headline tilesAround text="The [ultimate] design system for Health OS" />
        </FadeIn>
        <FadeIn delay={0.1} className="mt-hero-gap-sm">
          <p className="max-w-hero-subcopy font-sans text-body text-ink-600">{meta.lead}</p>
        </FadeIn>
        <FadeIn delay={0.15} className="mt-hero-gap w-full max-w-2xl">
          <CommandWidget id="hero-search" shortcut onSubmit={search} />
        </FadeIn>
        <Stagger className="mt-hero-gap-sm flex flex-wrap items-center justify-center gap-2" amount={0.4}>
          {SHOWCASE_COMMANDS.map((command) => (
            <StaggerItem key={command}>
              <CommandChip command={command} onClick={() => run(command)} />
            </StaggerItem>
          ))}
        </Stagger>
      </HeroContainer>
    </Hero>
  );
};
