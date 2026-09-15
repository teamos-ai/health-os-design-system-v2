/**
 * HeroSection: the reference site's opening. "The Ultimate Design System / For Health OS" in title
 * case on two lines (Tumai's copy), with nine icon tiles of different sizes scattered around it
 * and behind its letters, drifting and easing away from the mouse (FloatingTiles, anchored to the
 * headline). A long pause (hero-gap-lg) puts the search in the lower part of the hero. Then a short line, a search
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

/* Tumai's nine icons, scattered around the headline and behind its letters. Positions and sizes
   are in the headline's em from its top centre, so the field hugs the words at every width, each
   tile kept a touch clear of the letters so the words read easily. Each screen size has its own
   scatter: uneven, different sizes, never set out in a grid. */
const TILES: FloatingTile[] = [
  /* wide screens */
  { id: 'cloud', x: -7.6, y: -0.5, size: 1.45, from: 'xl' },
  { id: 'paper-plane', x: -3.6, y: -1.6, size: 1, from: 'xl' },
  { id: 'feather', x: 1.9, y: -2, size: 1.3, from: 'xl' },
  { id: 'orange-juice', x: 5.9, y: -1.75, size: 0.85, from: 'xl' },
  { id: 'computer', x: 7.75, y: 0.55, size: 1.75, from: 'xl' },
  { id: 'monstera', x: -6, y: 2.6, size: 1.5, from: 'xl' },
  { id: 'terminal', x: 3.6, y: 2.3, size: 0.9, from: 'xl' },
  { id: 'lightning-bolt', x: -8.1, y: 3.2, size: 0.8, from: 'xl' },
  { id: 'diamond', x: 7.4, y: 3, size: 1.15, from: 'xl' },
  /* tablets */
  { id: 'cloud', x: -5.4, y: -1.3, size: 1.15, from: 'md', until: 'xl' },
  { id: 'paper-plane', x: -1.6, y: -1.9, size: 0.95, from: 'md', until: 'xl' },
  { id: 'feather', x: 2.5, y: -1.7, size: 1.2, from: 'md', until: 'xl' },
  { id: 'computer', x: 4.7, y: -1.75, size: 1.15, from: 'md', until: 'xl' },
  { id: 'monstera', x: -5, y: 2.2, size: 1.05, from: 'md', until: 'xl' },
  { id: 'diamond', x: 4.6, y: 2.35, size: 0.95, from: 'md', until: 'xl' },
  /* phones */
  { id: 'cloud', x: -3.8, y: -1.5, size: 1.2, until: 'md' },
  { id: 'paper-plane', x: 0.3, y: -2.2, size: 0.95, until: 'md' },
  { id: 'feather', x: 3.6, y: -1.8, size: 1.35, until: 'md' },
  { id: 'orange-juice', x: 4.4, y: 2.9, size: 1, until: 'md' },
  { id: 'lightning-bolt', x: -4.3, y: 3.2, size: 0.95, until: 'md' },
];

/* Three small tiles at the hero's far edges, Tumai's marked spots: percent of the hero, size in rem. */
const EDGE_TILES: FloatingTile[] = [
  { id: 'bonsai', x: 5, y: 7, size: 2.9, from: 'md' },
  { id: 'horseshoe-magnet', x: 93, y: 9, size: 2.6, from: 'md' },
  { id: 'rope-knot', x: 95, y: 47, size: 3.1, from: 'md' },
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
      <FloatingTiles tiles={EDGE_TILES} />
      <HeroContainer>
        <FadeIn delay={0.05} className="relative">
          <FloatingTiles anchor="headline" tiles={TILES} />
          <Headline tilesAround hero text={'The [Ultimate] Design System\nFor {@logo}'} />
        </FadeIn>
        <FadeIn delay={0.1} className="mt-hero-gap-sm">
          <p className="max-w-hero-subcopy font-sans text-body text-ink-600">{meta.lead}</p>
        </FadeIn>
        <FadeIn delay={0.15} className="mt-hero-gap w-full max-w-2xl md:mt-hero-gap-lg">
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
