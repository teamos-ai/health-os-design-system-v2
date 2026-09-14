/**
 * SquirclesSection: the squircle library. Every picture tile a headline can use, tagged with
 * the words it stands for. Search a word or pick a group, then copy the tile's {id} into a
 * headline. Ready tiles come first. The library opens on its first twelve tiles; a search or
 * filter shows every match. Tiles still to be made show as empty tinted squircles with their brief. The recipe
 * for making a tile closes the section.
 */
import * as React from 'react';
import { Copy, Search } from 'lucide-react';
import { Section, Example, ShowAll } from '@/showcase/Section';
import { Tile } from '@/components/ui/headline';
import { Badge } from '@/components/ui/badge';
import { SegmentedControl } from '@/components/ui/segmented';
import { useToast } from '@/components/ui/toast';
import { HEADLINE_TILE_LIST, HEADLINE_TILE_GROUPS, type HeadlineTile, type HeadlineTileGroup } from '@/data/headline-tiles';
import { cn } from '@/lib/utils';

const PEEK = 12;

type StatusFilter = 'all' | 'ready' | 'planned';
const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'ready', label: 'Ready' },
  { value: 'planned', label: 'To make' },
];

const READY = HEADLINE_TILE_LIST.filter((t) => t.status === 'ready').length;

/* Ready tiles first, then the ones still to make, each in library order. */
const ORDERED = [...HEADLINE_TILE_LIST.filter((t) => t.status === 'ready'), ...HEADLINE_TILE_LIST.filter((t) => t.status === 'planned')];

const TileEntry = ({ tile, terms }: { tile: HeadlineTile; terms: string[] }) => {
  const { toast } = useToast();
  const mark = `{${tile.id}}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(mark);
      toast({ title: `Copied ${mark}`, description: `Put it beside "${tile.words[0].toLowerCase()}" in a headline.` });
    } catch {
      toast({ title: `Type ${mark} into the headline`, tone: 'warning' });
    }
  };
  const matches = (w: string) => terms.some((t) => w.toLowerCase().includes(t));
  return (
    <li className="flex min-w-0 flex-col gap-3">
      <span className="squircle-specimen">
        <Tile tile={tile} />
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-body text-ink-900">{tile.words[0]}</h3>
          {tile.status === 'planned' && (
            <Badge variant="outline" size="sm">
              To make
            </Badge>
          )}
        </div>
        {tile.words.length > 1 && (
          <p className="font-sans text-label text-ink-500">
            {tile.words.slice(1).map((w, i) => (
              <React.Fragment key={w}>
                {i > 0 && ' · '}
                <span className={cn(terms.length > 0 && matches(w) && 'text-ink-900 underline decoration-ink-400 underline-offset-2')}>{w}</span>
              </React.Fragment>
            ))}
          </p>
        )}
        <p className="font-sans text-label text-ink-600">{tile.picture}</p>
        {tile.note && <p className="font-sans text-label text-ink-500">{tile.note}</p>}
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${mark}, the ${tile.words[0].toLowerCase()} tile`}
        className="mt-auto inline-flex h-9 w-fit items-center gap-2 rounded-md border border-line bg-surface px-3 font-sans text-label text-ink-900 transition-colors duration-sm ease-out hover:border-ink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900"
      >
        {mark}
        <Copy className="h-3 w-3 text-ink-500" strokeWidth={1.75} aria-hidden />
      </button>
    </li>
  );
};

const Library = () => {
  const [query, setQuery] = React.useState('');
  const [group, setGroup] = React.useState<HeadlineTileGroup | null>(null);
  const [status, setStatus] = React.useState<StatusFilter>('all');
  const [expanded, setExpanded] = React.useState(false);

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const filtered = ORDERED.filter((t) => {
    if (group && t.group !== group) return false;
    if (status !== 'all' && t.status !== status) return false;
    const hay = [t.id, t.group, t.picture, ...t.words].join(' ').toLowerCase();
    return terms.every((term) => hay.includes(term));
  });
  const filtering = terms.length > 0 || group !== null || status !== 'all';
  const shown = filtering || expanded ? filtered : filtered.slice(0, PEEK);

  const clear = () => {
    setQuery('');
    setGroup(null);
    setStatus('all');
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
          <label htmlFor="squircle-search" className="sr-only">
            Search the squircle library
          </label>
          <input
            id="squircle-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a headline word: calm, bookings, software"
            className="h-12 w-full rounded-md border border-line bg-surface pl-12 pr-4 font-sans text-body text-ink-900 placeholder:text-ink-500 focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900 [&::-webkit-search-cancel-button]:appearance-none"
          />
        </div>
        <div role="group" aria-label="Filter by group" className="flex flex-wrap gap-2">
          {[null, ...HEADLINE_TILE_GROUPS].map((g) => (
            <button
              key={g ?? 'all'}
              type="button"
              aria-pressed={group === g}
              onClick={() => setGroup(g)}
              className={cn(
                'rounded-md border px-3 py-2 font-sans text-label transition-colors duration-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900',
                group === g ? 'border-apricot-200 bg-apricot-50 text-ink-900' : 'border-line bg-surface text-ink-600 hover:border-ink-400 hover:text-ink-900'
              )}
            >
              {g ?? 'All groups'}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SegmentedControl size="sm" aria-label="Filter by status" options={STATUS_OPTIONS} value={status} onValueChange={(v) => setStatus(v as StatusFilter)} />
          <span className="font-sans text-label text-ink-600" aria-live="polite">
            {filtering ? `${filtered.length} of ${HEADLINE_TILE_LIST.length} squircles` : `${HEADLINE_TILE_LIST.length} squircles, ${READY} ready`}
          </span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-line px-6 py-12 text-center">
          <p className="font-sans text-body text-ink-900">No squircle for that yet.</p>
          <p className="mx-auto mt-2 max-w-md font-sans text-body text-ink-600">Pick one literal object that shows the word, then make it with the recipe below.</p>
          <button
            type="button"
            onClick={clear}
            className="mt-4 font-sans text-label text-ink-900 underline decoration-apricot-200 decoration-2 underline-offset-4 hover:decoration-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900"
          >
            Clear search and filters
          </button>
        </div>
      ) : (
        <ul id="squircle-list" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((t) => (
            <TileEntry key={t.id} tile={t} terms={terms} />
          ))}
        </ul>
      )}

      {!filtering && filtered.length > PEEK && <ShowAll expanded={expanded} onToggle={() => setExpanded((e) => !e)} total={filtered.length} noun="squircles" controls="squircle-list" />}
    </div>
  );
};

const RECIPE = `Photorealistic studio product photograph of [the tile's picture, e.g. three smooth river stones balanced in a cairn], true materials and colours, three-quarter view. Isolated on a fully transparent background, centred and filling about 80% of a square frame, soft diffused daylight from the upper left, gentle natural shading, crisp high detail, calm minimal aesthetic. No text, no letters, no numbers, no logos, no brand marks, no watermark.`;

export const SquirclesSection = () => (
  <Section id="squircles">
    <div className="flex flex-col gap-8">
      <Example id="headline-tiles" label="Squircle library">
        <Library />
      </Example>

      <Example id="headline-tile-recipe" label="Making a new squircle">
        <div className="flex flex-col gap-4">
          <p className="max-w-reading font-sans text-body text-ink-600">
            Picture the word literally: software is a vintage computer, calm is balanced stones. Every planned squircle already has its picture written as a brief. Generate at 1:1 with a transparent background, check it is sharp and free of text and logos, then save a 1024px PNG and a 320px WebP named after its id.
          </p>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-md border border-line bg-surface-2 p-4 font-sans text-label normal-case text-ink-900">{RECIPE}</pre>
        </div>
      </Example>
    </div>
  </Section>
);
