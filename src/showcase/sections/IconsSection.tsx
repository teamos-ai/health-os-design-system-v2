/**
 * IconsSection: the icon library. Every icon tile Health OS uses (one photoreal object on a
 * squircle), tagged with the words it stands for. Search a word or pick a group, switch the
 * ground between charcoal, paper and white, copy the tile's {id} into a headline or download
 * the tile on that ground for Canva (charcoal ships baked; paper and white are baked in the
 * browser from the same object). Ready tiles come first; the library opens on its first twelve
 * and a search or filter shows every match. Then IconTile in its sizes and grounds, and the
 * recipe for making a new icon.
 */
import * as React from 'react';
import { CalendarCheck, Copy, Download, Search } from 'lucide-react';
import { Section, Example, ShowAll } from '@/showcase/Section';
import { IconTile, type IconTileGround } from '@/components/ui/icon-tile';
import { Badge } from '@/components/ui/badge';
import { SegmentedControl } from '@/components/ui/segmented';
import { useToast } from '@/components/ui/toast';
import { HEADLINE_TILES, HEADLINE_TILE_LIST, HEADLINE_TILE_GROUPS, type HeadlineTile, type HeadlineTileGroup } from '@/data/headline-tiles';
import { bakeTile, saveBlob } from '@/lib/bake-tile';
import { thumb } from '@/lib/images';
import { cn } from '@/lib/utils';

const PEEK = 12;

type StatusFilter = 'all' | 'ready' | 'planned';
const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'ready', label: 'Ready' },
  { value: 'planned', label: 'To make' },
];

const GROUND_OPTIONS: { value: IconTileGround; label: string }[] = [
  { value: 'carbon', label: 'Charcoal' },
  { value: 'paper', label: 'Paper' },
  { value: 'white', label: 'White' },
];
const GROUND_KEY = 'hos-icon-ground';

/* The chosen ground is remembered in this browser only, as a convenience. */
const readGround = (): IconTileGround => {
  try {
    const v = window.localStorage.getItem(GROUND_KEY);
    return v === 'paper' || v === 'white' ? v : 'carbon';
  } catch {
    return 'carbon';
  }
};

const READY = HEADLINE_TILE_LIST.filter((t) => t.status === 'ready').length;

/* Ready tiles first, then the ones still to make, each in library order. */
const ORDERED = [...HEADLINE_TILE_LIST.filter((t) => t.status === 'ready'), ...HEADLINE_TILE_LIST.filter((t) => t.status === 'planned')];

const TileEntry = ({ tile, terms, ground }: { tile: HeadlineTile; terms: string[]; ground: IconTileGround }) => {
  const { toast } = useToast();
  const [baking, setBaking] = React.useState(false);
  const mark = `{${tile.id}}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(mark);
      toast({ title: `Copied ${mark}`, description: `Put it beside "${tile.words[0].toLowerCase()}" in a headline.` });
    } catch {
      toast({ title: `Type ${mark} into the headline`, tone: 'warning' });
    }
  };
  const groundName = GROUND_OPTIONS.find((g) => g.value === ground)?.label.toLowerCase() ?? ground;
  const download = async () => {
    if (!tile.original || baking) return;
    setBaking(true);
    try {
      saveBlob(await bakeTile(tile.original, ground), `${tile.id}-tile-${ground}.png`);
    } catch {
      toast({ title: 'That tile could not download', description: 'Try again, or use the charcoal tile.', tone: 'warning' });
    } finally {
      setBaking(false);
    }
  };
  const downloadClass =
    'hidden h-9 w-9 shrink-0 items-center justify-center rounded-md border sm:inline-flex border-line bg-surface text-ink-600 transition-colors duration-sm ease-out hover:border-ink-400 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 disabled:opacity-50';
  const matches = (w: string) => terms.some((t) => w.toLowerCase().includes(t));
  return (
    <li className="flex min-w-0 flex-col gap-3">
      <div className="flex items-end gap-3">
        <IconTile id={tile.id} size="lg" ground={ground} />
        {/* the other way to picture the same word: a metaphor points at its picture, and back */}
        {tile.otherWay && HEADLINE_TILES[tile.otherWay] && (
          <span className="flex flex-col items-center gap-1">
            <IconTile id={tile.otherWay} size="sm" ground={ground} />
            <span className="font-sans text-label uppercase text-ink-400">or</span>
          </span>
        )}
      </div>
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
      <div className="mt-auto flex min-w-0 items-center gap-2">
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy ${mark}, the ${tile.words[0].toLowerCase()} icon`}
          className="inline-flex h-9 min-w-0 items-center gap-2 rounded-md border border-line bg-surface px-3 font-sans text-label text-ink-900 transition-colors duration-sm ease-out hover:border-ink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900"
        >
          <span className="truncate">{mark}</span>
          <Copy className="h-3 w-3 shrink-0 text-ink-500" strokeWidth={1.75} aria-hidden />
        </button>
        {ground === 'carbon'
          ? tile.baked && (
              <a href={tile.baked} download aria-label={`Download the ${tile.words[0].toLowerCase()} icon tile on charcoal as a PNG`} className={downloadClass}>
                <Download className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </a>
            )
          : tile.original && (
              <button type="button" onClick={download} disabled={baking} aria-label={`Download the ${tile.words[0].toLowerCase()} icon tile on ${groundName} as a PNG`} className={downloadClass}>
                <Download className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </button>
            )}
      </div>
    </li>
  );
};

const Library = () => {
  const [query, setQuery] = React.useState('');
  const [group, setGroup] = React.useState<HeadlineTileGroup | null>(null);
  const [status, setStatus] = React.useState<StatusFilter>('all');
  const [expanded, setExpanded] = React.useState(false);
  const [ground, setGroundState] = React.useState<IconTileGround>(readGround);
  const setGround = (g: IconTileGround) => {
    setGroundState(g);
    try {
      window.localStorage.setItem(GROUND_KEY, g);
    } catch {
      /* nothing to remember it in; the switch still works */
    }
  };

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
          <label htmlFor="icon-search" className="sr-only">
            Search the icon library
          </label>
          <input
            id="icon-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a word or an object: calm, bookings, laptop"
            className="h-12 w-full rounded-md border border-line bg-surface pl-12 pr-4 font-sans text-body text-ink-900 placeholder:text-ink-500 focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900 [&::-webkit-search-cancel-button]:appearance-none"
          />
        </div>
        <div role="group" aria-label="Filter by group" className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {[null, ...HEADLINE_TILE_GROUPS].map((g) => (
            <button
              key={g ?? 'all'}
              type="button"
              aria-pressed={group === g}
              onClick={() => setGroup(g)}
              className={cn(
                'shrink-0 whitespace-nowrap rounded-md border px-3 py-2 font-sans text-label transition-colors duration-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink-900',
                group === g ? 'border-apricot-200 bg-apricot-50 text-ink-900' : 'border-line bg-surface text-ink-600 hover:border-ink-400 hover:text-ink-900'
              )}
            >
              {g ?? 'All groups'}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <SegmentedControl size="sm" aria-label="Tile ground" options={GROUND_OPTIONS} value={ground} onValueChange={(v) => setGround(v as IconTileGround)} />
            {/* the status filter only earns its place while some icons are still to make */}
            {READY < HEADLINE_TILE_LIST.length && (
              <SegmentedControl size="sm" aria-label="Filter by status" options={STATUS_OPTIONS} value={status} onValueChange={(v) => setStatus(v as StatusFilter)} />
            )}
          </div>
          <span className="font-sans text-label text-ink-600" aria-live="polite">
            {filtering ? `${filtered.length} of ${HEADLINE_TILE_LIST.length} icons` : READY < HEADLINE_TILE_LIST.length ? `${HEADLINE_TILE_LIST.length} icons, ${READY} ready` : `${HEADLINE_TILE_LIST.length} icons in ${HEADLINE_TILE_GROUPS.length} groups`}
          </span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-line px-6 py-12 text-center">
          <p className="font-sans text-body text-ink-900">No icon for that yet.</p>
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
        <ul id="icon-list" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((t) => (
            <TileEntry key={t.id} tile={t} terms={terms} ground={ground} />
          ))}
        </ul>
      )}

      {!filtering && filtered.length > PEEK && <ShowAll expanded={expanded} onToggle={() => setExpanded((e) => !e)} total={filtered.length} noun="icons" controls="icon-list" />}
    </div>
  );
};

const RECIPE = `Photorealistic studio product photograph of [the icon's picture, e.g. three smooth river stones balanced in a cairn], true-to-life materials and colours, three-quarter view. Isolated on a fully transparent background, centred and filling about 80% of a square frame, soft warm studio light from the upper left with a gentle rim light so every edge reads clearly, soft natural shading, crisp high detail, calm premium minimal aesthetic, like a refined app icon object. No text, no letters, no numbers, no logos, no brand marks, no watermark, no background, no floor, no shadow plane.`;

const GROUNDS = [
  { ground: 'carbon', note: 'Charcoal · the default: headlines, the library, plain cards' },
  { ground: 'paper', note: 'Paper · tabs, and cards beside photos that dissolve' },
  { ground: 'white', note: 'White · brand washes, 50 tints and gradient tiles' },
] as const;

const PHOTO = '/imagery/social-and-wellness/two-women-having-coffee-at-outdoor-bistro-table-16-9.png';

const SIZES = [
  { size: 'xs', note: 'xs · 28px · beside a tab label' },
  { size: 'sm', note: 'sm · 40px · beside a list item or card title' },
  { size: 'md', note: 'md · 64px · in a feature card or bento cell' },
  { size: 'lg', note: 'lg · 96px · on its own' },
] as const;

export const IconsSection = () => (
  <Section id="icons">
    <div className="flex flex-col gap-8">
      <Example id="headline-tiles" label="Icon library">
        <Library />
      </Example>

      <Example id="icon-tile" label="Icon tile">
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap items-end gap-8">
            {SIZES.map((s) => (
              <div key={s.size} className="flex flex-col items-start gap-3">
                <IconTile id="stones" size={s.size} />
                <span className="font-sans text-label text-ink-600">{s.note}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {GROUNDS.map((g) => (
              <div key={g.ground} className="flex flex-col items-start gap-3">
                <IconTile id="feather" size="lg" ground={g.ground} />
                <span className="font-sans text-label text-ink-600">{g.note}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg border border-line bg-surface">
              <div className="image-fade-b relative h-40 overflow-hidden">
                <img src={thumb(PHOTO)} alt="Two women talking over coffee at an outdoor table" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="flex items-start gap-4 px-6 pb-6 pt-2">
                <IconTile id="coffee-cup" size="md" ground="paper" />
                <div className="min-w-0">
                  <h3 className="font-display text-subheading text-ink-900">Beside a photo</h3>
                  <p className="mt-1 font-sans text-body text-ink-600">Where the photo dissolves, a paper tile sits softly; charcoal would be the heaviest thing on the card.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-lg bg-brand-gradient-soft p-6 ring-1 ring-inset ring-line">
              <IconTile id="gold-bell" size="md" ground="white" />
              <div>
                <h3 className="font-display text-subheading text-ink-900">On a wash</h3>
                <p className="mt-2 font-sans text-body text-ink-600">On the soft wash and the 50 tints, a white tile reads as a clean card on the colour.</p>
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <ul className="flex flex-col divide-y divide-line-soft rounded-lg border border-line bg-surface px-5">
              {[
                { id: 'desk-calendar', title: 'Bookings that confirm themselves' },
                { id: 'coffee-cups', title: 'Every client in one record' },
                { id: 'gears', title: 'Follow-up that runs on its own' },
              ].map((row) => (
                <li key={row.id} className="flex items-center gap-4 py-4">
                  <IconTile id={row.id} size="sm" />
                  <span className="font-sans text-body text-ink-900">{row.title}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-6">
              <IconTile id="stones" size="md" />
              <div>
                <h3 className="font-display text-subheading text-ink-900">A calmer week</h3>
                <p className="mt-2 font-sans text-body text-ink-600">Reminders, forms and follow-up go out on time, so the week holds its shape.</p>
              </div>
              <span className="inline-flex items-center gap-2 font-sans text-label text-ink-500">
                <CalendarCheck className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                Line icons stay for controls and small labels
              </span>
            </div>
          </div>
        </div>
      </Example>

      <Example id="headline-tile-recipe" label="Making a new icon">
        <div className="flex flex-col gap-4">
          <p className="max-w-reading font-sans text-body text-ink-600">
            Picture the word literally: software is a vintage computer, calm is balanced stones. Generate the object at 1:1 with a transparent background, check it is sharp and free of text and logos, then save a 1024px PNG, a 320px WebP and the baked charcoal tile, all named after its id. Paper and white tiles need nothing more: they are made from the same object, on screen and when downloaded from the library.
          </p>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-md border border-line bg-surface-2 p-4 font-sans text-label normal-case text-ink-900">{RECIPE}</pre>
        </div>
      </Example>
    </div>
  </Section>
);
