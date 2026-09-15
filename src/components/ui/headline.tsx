/**
 * Headline: the H1 for every page. Dark ink, one descriptive word in apricot, and icon tiles
 * beside the words they picture.
 *
 * Write the whole headline as one string. Mark the one descriptive word with [brackets] and
 * each tile with {id} from the icon library (HEADLINE_TILES), right after the word it pictures.
 * One to three tiles; the accent word does not need a tile of its own:
 *
 *   <Headline text="Notes for a [calm] {stones} practice that runs {computer} on its own" />
 *   <Headline text="You built {blocks} it. Now [make] it run {computer} without you." />
 *
 * Every word is ink-900 except the accent word, which is apricot-400: the one place text is
 * apricot in the system. Tiles are decorative (the words carry the meaning), so they are
 * hidden from screen readers and do not react to the pointer. Each tile is kept on the same
 * line as the word before it, so it never starts a line on its own; gluing both sides would
 * make chunks too wide for a phone. Sizes are in em, so tiles scale with the heading role.
 * Tiles are dark icon tiles (tokens.json → icon); one still to be made shows as an empty squircle.
 * Each tile floats: it is turned a few degrees, alternating left and right, and drifts slowly up
 * and down, so the icons hang between the words (tokens.json → headline.tile-tilt, float-*). The
 * float stops while the headline is off screen and when reduced motion is on; the tilt stays.
 * The home hero is the one exception: its tiles float around the headline instead (`tilesAround`
 * with FloatingTiles), so the words stand clear.
 * In development, a headline with no accent word or more than one, too few or too many tiles,
 * a tile at the very start or end, or a tile still to be made, warns.
 */
import * as React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { HEADLINE_TILES, type HeadlineTile } from '@/data/headline-tiles';
import { HEADLINE } from '@/lib/palette';
import { EASE_OUT, DURATION } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Atom = { kind: 'word'; text: string; accent: boolean } | { kind: 'space'; text: string } | { kind: 'tile'; tile: HeadlineTile };

const MARK = /(\[[^\]]+\]|\{[a-z0-9-]+\})/g;

/** Splits headline copy into words, spaces and tiles. Unknown tile ids are dropped with a warning. */
export const parseHeadline = (text: string, library: Record<string, HeadlineTile> = HEADLINE_TILES): Atom[] => {
  const atoms: Atom[] = [];
  const pushText = (chunk: string, accent: boolean) => {
    for (const piece of chunk.split(/(\s+)/)) {
      if (!piece) continue;
      atoms.push(/^\s+$/.test(piece) ? { kind: 'space', text: piece } : { kind: 'word', text: piece, accent });
    }
  };
  for (const piece of text.split(MARK)) {
    if (!piece) continue;
    if (piece.startsWith('[') && piece.endsWith(']')) pushText(piece.slice(1, -1), true);
    else if (piece.startsWith('{') && piece.endsWith('}')) {
      const tile = library[piece.slice(1, -1)];
      if (tile) atoms.push({ kind: 'tile', tile });
      else if (import.meta.env.DEV) console.warn(`Headline: no tile called "${piece}" in the icon library`);
    } else pushText(piece, false);
  }
  return atoms;
};

/** The accent word, the tiles and the plain words of a headline, for libraries and tools. */
export const headlineParts = (text: string, library: Record<string, HeadlineTile> = HEADLINE_TILES) => {
  const atoms = parseHeadline(text, library);
  return {
    accent: atoms
      .filter((a): a is Extract<Atom, { kind: 'word' }> => a.kind === 'word' && a.accent)
      .map((a) => a.text)
      .join(' '),
    tiles: atoms.filter((a): a is Extract<Atom, { kind: 'tile' }> => a.kind === 'tile').map((a) => a.tile),
    plain: text.replace(/\{[a-z0-9-]+\}\s?/g, '').replace(/[[\]]/g, '').replace(/\s+/g, ' ').trim(),
  };
};

export interface HeadlineProps {
  /** The whole headline. Mark the one descriptive word as [word] and each tile as {id}. */
  text: string;
  /** h1 on a real page; h2 or h3 when a page already has its h1 (as in this reference); p inside an asset such as a social post */
  as?: 'h1' | 'h2' | 'h3' | 'p';
  /** Tiles float around this headline (FloatingTiles, the home hero) instead of sitting in it: no inline tiles expected. */
  tilesAround?: boolean;
  /** Tile library to resolve {id} against. Defaults to the icon library. */
  tiles?: Record<string, HeadlineTile>;
  id?: string;
  className?: string;
}

/** How each tile leans, as a share of the tilt token: left, right, left, never in step. */
const LEAN = [-1, 2 / 3, -5 / 6];

export const Tile = ({ tile, index = 0, className }: { tile: HeadlineTile; index?: number; className?: string }) => {
  const reduced = useReducedMotion();
  const style = { '--tile-lean': LEAN[index % LEAN.length], '--tile-phase': `${index * -2.2}s` } as React.CSSProperties;
  return (
    <motion.span
      aria-hidden
      className={cn('headline-tile', className)}
      style={style}
      initial={reduced ? false : { opacity: 0, scale: 0.6, y: '0.2em' }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: DURATION.xl, ease: EASE_OUT, delay: 0.15 + index * 0.08 }}
    >
      <span className={cn('headline-tile-face', !tile.src && 'border border-dashed border-ink-400')}>
        {tile.src && <img src={tile.src} alt="" draggable={false} loading="lazy" decoding="async" />}
      </span>
    </motion.span>
  );
};

const warn = (text: string, atoms: Atom[], tilesAround = false) => {
  const say = (msg: string) => console.warn(`Headline "${text}": ${msg}`);
  const isAccent = (i: number) => atoms[i]?.kind === 'word' && (atoms[i] as { accent: boolean }).accent;
  /* consecutive accent words (across one space) count as one marked phrase */
  const starts = atoms.map((_, i) => i).filter((i) => isAccent(i) && !isAccent(i - 1) && !(atoms[i - 1]?.kind === 'space' && isAccent(i - 2)));
  const tiles = atoms.filter((a) => a.kind === 'tile').length;
  if (starts.length !== 1) say(`mark exactly one descriptive word as [word] (found ${starts.length}).`);
  if (tilesAround) {
    if (tiles > 0) say('its tiles float around it (tilesAround), so it takes no inline tiles.');
  } else if (tiles < HEADLINE.tilesMin || tiles > HEADLINE.tilesMax) say(`has ${tiles} tiles. Use ${HEADLINE.tilesMin} to ${HEADLINE.tilesMax}.`);
  if (atoms[0]?.kind === 'tile' || atoms[atoms.length - 1]?.kind === 'tile') say('a tile sits beside a word, never at the very start or end.');
  atoms.forEach((a) => {
    if (a.kind === 'tile' && a.tile.status === 'planned') say(`the {${a.tile.id}} tile is still to be made. Make it before this headline goes live.`);
  });
};

export const Headline = ({ text, as: Tag = 'h1', tiles = HEADLINE_TILES, tilesAround = false, id, className }: HeadlineProps) => {
  const ref = React.useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref);
  const atoms = parseHeadline(text, tiles);
  if (import.meta.env.DEV) warn(text, atoms, tilesAround);

  /* Glue each tile to the word before it, so it never starts a line alone. */
  const ranges: [number, number][] = [];
  atoms.forEach((a, i) => {
    if (a.kind !== 'tile') return;
    const before = atoms[i - 1]?.kind === 'space' ? i - 2 : i - 1;
    const range: [number, number] = [atoms[before]?.kind === 'word' ? before : i, i];
    const last = ranges[ranges.length - 1];
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else ranges.push(range);
  });

  let tileIndex = 0;
  const render = (a: Atom, key: number) => {
    if (a.kind === 'space') return <React.Fragment key={key}>{a.text}</React.Fragment>;
    if (a.kind === 'tile') return <Tile key={key} tile={a.tile} index={tileIndex++} />;
    return a.accent ? (
      <span key={key} className="text-apricot-400">
        {a.text}
      </span>
    ) : (
      <React.Fragment key={key}>{a.text}</React.Fragment>
    );
  };

  const out: React.ReactNode[] = [];
  let i = 0;
  for (const [start, end] of ranges) {
    for (; i < start; i++) out.push(render(atoms[i], i));
    out.push(
      <span key={`glue-${start}`} className="whitespace-nowrap">
        {atoms.slice(start, end + 1).map((a, k) => render(a, start + k))}
      </span>
    );
    i = end + 1;
  }
  for (; i < atoms.length; i++) out.push(render(atoms[i], i));

  return (
    <Tag ref={ref} id={id} data-floating={inView || undefined} className={cn('headline font-display text-heading text-ink-900', className)}>
      {out}
    </Tag>
  );
};
