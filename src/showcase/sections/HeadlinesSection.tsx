/**
 * HeadlinesSection: the Headline. Live examples with the markup that produces them, the
 * anatomy, and the headline library: twenty ready headlines that open on the first four,
 * with a pillar filter and a copy button for each line's markup. Headlines render as h3 so
 * the reference keeps one h1; on a real page each is the h1. Icons live in the icon library.
 * Floating tiles show the home hero's exception: tiles around the headline instead of inside it.
 */
import * as React from 'react';
import { Copy } from 'lucide-react';
import { Section, Example, Demo, ShowAll } from '@/showcase/Section';
import { Headline, headlineParts } from '@/components/ui/headline';
import { FloatingTiles, type FloatingTile } from '@/components/ui/floating-tiles';
import { Badge } from '@/components/ui/badge';
import { SegmentedControl } from '@/components/ui/segmented';
import { useToast } from '@/components/ui/toast';
import { HEADLINE_LIBRARY, HEADLINE_PILLARS, type HeadlinePillar } from '@/data/headline-library';

const EXAMPLES = [
  { text: 'You built {blocks} it. Now [make] it run {computer} without you.', where: 'Homepage hero' },
  { text: 'Notes for a [calm] {stones} practice that runs {computer} on its own', where: 'Blog index' },
  { text: 'Fewer {tools} tools, wired {cables} [together]', where: 'Article' },
];

const ANATOMY = [
  { name: 'Words', value: 'ink-900', note: 'Every word of the headline is dark ink, in one size and weight.' },
  { name: 'Accent', value: 'apricot-400', note: 'One descriptive word, marked [word]: calm, together, make. Never two.' },
  { name: 'Icon tiles', value: '1 to 3', note: 'Dark icon tiles right after the words they picture. The accent word does not need its own. Never first or last.' },
];

const PEEK = 4;

/* A small field for the example frame: tiles in the margins, clear of the words. */
const FIELD: FloatingTile[] = [
  { id: 'cloud', x: 10, y: 28, size: 'md', from: 'sm' },
  { id: 'feather', x: 18, y: 76, size: 'sm', from: 'md' },
  { id: 'computer', x: 89, y: 30, size: 'md', from: 'sm' },
  { id: 'lightning-bolt', x: 81, y: 78, size: 'sm', from: 'md' },
  { id: 'paper-plane', x: 50, y: 12, size: 'sm', until: 'sm' },
];

/* Lines whose tiles are all made come first, so the library opens on headlines ready to use. */
const ORDERED = [...HEADLINE_LIBRARY].sort((a, b) => Number(headlineParts(a.text).tiles.some((t) => t.status === 'planned')) - Number(headlineParts(b.text).tiles.some((t) => t.status === 'planned')));
type PillarFilter = 'all' | HeadlinePillar;
const PILLAR_OPTIONS: { value: PillarFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  ...HEADLINE_PILLARS.map((p) => ({ value: p, label: p === 'Steady, not stop-start' ? 'Steady' : p })),
];

const CopyMarkup = ({ text, toMake }: { text: string; toMake: string[] }) => {
  const { toast } = useToast();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      if (toMake.length) toast({ title: 'Headline copied, with tiles to make', description: `Make ${toMake.map((id) => `{${id}}`).join(' and ')} before it goes live.`, tone: 'warning' });
      else toast({ title: 'Headline copied', description: 'Paste it into the text of a Headline.' });
    } catch {
      toast({ title: 'Select the markup and copy it', tone: 'warning' });
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy the markup for: ${headlineParts(text).plain}`}
      className="inline-flex h-9 shrink-0 items-center gap-2 self-start rounded-md border border-line bg-surface px-3 font-sans text-label text-ink-900 transition-colors duration-sm ease-out hover:border-ink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900"
    >
      <Copy className="h-3 w-3 text-ink-500" strokeWidth={1.75} aria-hidden />
      Copy markup
    </button>
  );
};

const Library = () => {
  const [pillar, setPillar] = React.useState<PillarFilter>('all');
  const [expanded, setExpanded] = React.useState(false);
  const filtered = ORDERED.filter((h) => pillar === 'all' || h.pillar === pillar);
  const shown = pillar !== 'all' || expanded ? filtered : filtered.slice(0, PEEK);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SegmentedControl size="sm" aria-label="Filter by messaging pillar" options={PILLAR_OPTIONS} value={pillar} onValueChange={(v) => setPillar(v as PillarFilter)} />
        <span className="font-sans text-label text-ink-600" aria-live="polite">
          {pillar === 'all' ? `${HEADLINE_LIBRARY.length} headlines` : `${filtered.length} of ${HEADLINE_LIBRARY.length} headlines`}
        </span>
      </div>
      <ol id="headline-library-list" className="flex flex-col divide-y divide-line-soft">
        {shown.map((h) => {
          const { accent, tiles } = headlineParts(h.text);
          const toMake = tiles.filter((t) => t.status === 'planned').map((t) => t.id);
          return (
            <li key={h.text} className="flex flex-col gap-4 py-8 first:pt-2">
              <Headline as="h3" text={h.text} className="max-w-3xl" />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge size="sm">{h.use}</Badge>
                    <Badge variant="outline" size="sm">
                      {h.pillar}
                    </Badge>
                    {toMake.length > 0 && (
                      <Badge variant="warning" size="sm" dot>
                        {toMake.length === 1 ? '1 tile to make' : `${toMake.length} tiles to make`}
                      </Badge>
                    )}
                  </div>
                  <p className="font-sans text-label text-ink-600">
                    Accent <span className="text-ink-900">{accent}</span> · Tiles <span className="text-ink-900">{tiles.map((t) => `{${t.id}}`).join(' ')}</span> · {h.from}
                  </p>
                </div>
                <CopyMarkup text={h.text} toMake={toMake} />
              </div>
            </li>
          );
        })}
      </ol>
      {pillar === 'all' && <ShowAll expanded={expanded} onToggle={() => setExpanded((e) => !e)} total={HEADLINE_LIBRARY.length} noun="headlines" controls="headline-library-list" />}
    </div>
  );
};

export const HeadlinesSection = () => (
  <Section id="headlines">
    <div className="flex flex-col gap-8">
      <Example id="headline" label="Headline">
        <div className="flex flex-col divide-y divide-line-soft">
          {EXAMPLES.map((ex) => (
            <figure key={ex.where} className="flex flex-col gap-4 py-8 first:pt-2 last:pb-2">
              <Headline as="h3" text={ex.text} className="max-w-3xl" />
              <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-label text-ink-500">
                <span className="uppercase">{ex.where}</span>
                <code className="normal-case text-ink-600">text="{ex.text}"</code>
              </figcaption>
            </figure>
          ))}
        </div>
      </Example>

      <Demo label="Anatomy">
        <dl className="grid gap-6 md:grid-cols-3">
          {ANATOMY.map((a) => (
            <div key={a.name} className="flex flex-col gap-2 border-t border-line pt-4">
              <dt className="flex items-center gap-3">
                <span className="font-display text-subheading text-ink-900">{a.name}</span>
                <Badge variant="outline" size="sm">
                  {a.value}
                </Badge>
              </dt>
              <dd className="font-sans text-body text-ink-600">{a.note}</dd>
            </div>
          ))}
        </dl>
      </Demo>

      <Example id="floating-tiles" label="Floating tiles: the home hero only" padded={false}>
        <div className="relative isolate overflow-hidden px-6 py-20 md:py-24">
          <FloatingTiles tiles={FIELD} />
          <Headline as="h3" tilesAround text={'The [Ultimate] Design System\nFor Health OS'} className="mx-auto max-w-xl text-center" />
        </div>
      </Example>

      <Example id="headline-library" label="Headline library">
        <Library />
      </Example>
    </div>
  </Section>
);
