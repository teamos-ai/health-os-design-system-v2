/**
 * Headline: the H1 for every page. Dark ink, one descriptive word in apricot, and a picture
 * tile beside that word that shows it.
 *
 * Write the whole headline as one string. Mark the one descriptive word with [brackets] and
 * each tile with {id} from the squircle library (HEADLINE_TILES). The accent word's tile sits
 * right beside it; one or two more tiles may picture other words, up to three in all:
 *
 *   <Headline text="Notes for a [calm] {stones} practice that runs {computer} on its own" />
 *
 * Every word is ink-900 except the accent word, which is apricot-200: the one place text is
 * apricot in the system. Tiles are decorative (the words carry the meaning), so they are
 * hidden from screen readers and do not react to the pointer. Each tile is kept on the same
 * line as the word before it, so it never starts a line on its own; gluing both sides would
 * make chunks too wide for a phone. Sizes are in em, so tiles scale with the heading role.
 * A tile still to be made shows as an empty tinted squircle. In development, a headline with
 * no accent word or more than one, an accent word with no tile beside it, too few or too many
 * tiles, a tile at the very start or end, or a tile still to be made, warns.
 */
import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HEADLINE_TILES, type HeadlineTile, type HeadlineTileTone } from '@/data/headline-tiles';
import { HEADLINE } from '@/lib/palette';
import { EASE_OUT, DURATION } from '@/lib/motion';
import { cn } from '@/lib/utils';

const TONE: Record<HeadlineTileTone, { ready: string; planned: string }> = {
  rose: { ready: 'bg-rose-50 ring-1 ring-inset ring-rose-200', planned: 'bg-rose-50 border border-dashed border-rose-200' },
  lavender: { ready: 'bg-lavender-50 ring-1 ring-inset ring-lavender-200', planned: 'bg-lavender-50 border border-dashed border-lavender-200' },
  neutral: { ready: 'bg-ink-100 ring-1 ring-inset ring-ink-200', planned: 'bg-ink-100 border border-dashed border-ink-400' },
};

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
      else if (import.meta.env.DEV) console.warn(`Headline: no tile called "${piece}" in the squircle library`);
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
  /** h1 on a real page; h2 or h3 when a page already has its h1 (as in this reference) */
  as?: 'h1' | 'h2' | 'h3';
  /** Tile library to resolve {id} against. Defaults to the squircle library. */
  tiles?: Record<string, HeadlineTile>;
  id?: string;
  className?: string;
}

export const Tile = ({ tile, index = 0, className }: { tile: HeadlineTile; index?: number; className?: string }) => {
  const reduced = useReducedMotion();
  const tone = TONE[tile.tone];
  return (
    <motion.span
      aria-hidden
      className={cn('headline-tile', tile.src ? tone.ready : tone.planned, className)}
      initial={reduced ? false : { opacity: 0, scale: 0.6, rotate: -8 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: DURATION.xl, ease: EASE_OUT, delay: 0.15 + index * 0.08 }}
    >
      {tile.src && <img src={tile.src} alt="" draggable={false} decoding="async" />}
    </motion.span>
  );
};

const warn = (text: string, atoms: Atom[]) => {
  const say = (msg: string) => console.warn(`Headline "${text}": ${msg}`);
  const isAccent = (i: number) => atoms[i]?.kind === 'word' && (atoms[i] as { accent: boolean }).accent;
  /* consecutive accent words (across one space) count as one marked phrase */
  const starts = atoms.map((_, i) => i).filter((i) => isAccent(i) && !isAccent(i - 1) && !(atoms[i - 1]?.kind === 'space' && isAccent(i - 2)));
  const tiles = atoms.filter((a) => a.kind === 'tile').length;
  if (starts.length !== 1) say(`mark exactly one descriptive word as [word] (found ${starts.length}).`);
  if (tiles < HEADLINE.tilesMin || tiles > HEADLINE.tilesMax) say(`has ${tiles} tiles. Use ${HEADLINE.tilesMin} to ${HEADLINE.tilesMax}.`);
  if (atoms[0]?.kind === 'tile' || atoms[atoms.length - 1]?.kind === 'tile') say('a tile sits beside a word, never at the very start or end.');
  atoms.forEach((a) => {
    if (a.kind === 'tile' && a.tile.status === 'planned') say(`the {${a.tile.id}} tile is still to be made. Make it before this headline goes live.`);
  });
  const tileAt = (i: number, step: 1 | -1) => atoms[atoms[i + step]?.kind === 'space' ? i + 2 * step : i + step]?.kind === 'tile';
  const accents = atoms.map((_, i) => i).filter(isAccent);
  if (accents.length && !tileAt(accents[0], -1) && !tileAt(accents[accents.length - 1], 1)) say('put the tile that pictures the accent word right beside it.');
};

export const Headline = ({ text, as: Tag = 'h1', tiles = HEADLINE_TILES, id, className }: HeadlineProps) => {
  const atoms = parseHeadline(text, tiles);
  if (import.meta.env.DEV) warn(text, atoms);

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
      <span key={key} className="text-apricot-200">
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
    <Tag id={id} className={cn('font-display text-heading text-ink-900', className)}>
      {out}
    </Tag>
  );
};
