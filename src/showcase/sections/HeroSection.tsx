/**
 * HeroSection: the reference site's opening. "The Ultimate Design System / For Health OS" in title
 * case on two lines (Tumai's copy), with nine icon tiles floating around it that drift and ease
 * away from the mouse (FloatingTiles). Then a short line, a search
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

/* Tumai's nine icons for the home hero. Wide screens hang them in the side margins, above the
   headline and below the chips; tablets keep a row above and one below; phones keep three. */
const TILES: FloatingTile[] = [
  { id: 'cloud', x: 11, y: 12, from: 'xl' },
  { id: 'computer', x: 89, y: 14, from: 'xl' },
  { id: 'monstera', x: 6, y: 47, from: 'xl' },
  { id: 'terminal', x: 94, y: 49, from: 'xl' },
  { id: 'paper-plane', x: 31, y: 7, from: 'xl' },
  { id: 'feather', x: 69, y: 7, from: 'xl' },
  { id: 'lightning-bolt', x: 5, y: 88, from: 'xl' },
  { id: 'diamond', x: 93, y: 81, from: 'xl' },
  { id: 'orange-juice', x: 50, y: 92, from: 'xl' },
  /* tablets */
  { id: 'cloud', x: 9, y: 9, from: 'md', until: 'xl' },
  { id: 'paper-plane', x: 33, y: 6, from: 'md', until: 'xl' },
  { id: 'feather', x: 67, y: 6, from: 'md', until: 'xl' },
  { id: 'computer', x: 91, y: 9, from: 'md', until: 'xl' },
  { id: 'diamond', x: 22, y: 92, from: 'md', until: 'xl' },
  { id: 'orange-juice', x: 78, y: 92, from: 'md', until: 'xl' },
  /* phones */
  { id: 'cloud', x: 15, y: 5, until: 'md' },
  { id: 'feather', x: 85, y: 5, until: 'md' },
  { id: 'orange-juice', x: 50, y: 94, until: 'md' },
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
          <Headline tilesAround text={'The [Ultimate] Design System\nFor Health OS'} />
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
