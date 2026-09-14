/**
 * Headline: the two-tone H1 with picture tiles between its words.
 *
 * The opening phrase that makes the point is ink-900; the rest is ink-400. Two or three
 * square picture tiles sit beside the words they picture, so the headline shows what it
 * says. Write tiles into the copy as {id}, using ids from HEADLINE_TILES:
 *
 *   <Headline lead="You built {blocks} it." rest="Now make it run {computer} without you." />
 *
 * Tiles are decorative (the words carry the meaning), so they are hidden from screen
 * readers and do not react to the pointer. Each tile is kept on the same line as the words
 * either side of it, so it never starts a line away from the word it pictures. Sizes are in
 * em, so tiles scale with the heading role. Tile tints are rose, lavender or a warm neutral:
 * apricot is kept for things you can act on. In development, a headline with too few or too
 * many tiles, or a tile at the very start or end, warns.
 */
import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HEADLINE_TILES, type HeadlineTile, type HeadlineTileTone } from '@/data/headline-tiles';
import { HEADLINE } from '@/lib/palette';
import { EASE_OUT, DURATION } from '@/lib/motion';
import { cn } from '@/lib/utils';

const TONE: Record<HeadlineTileTone, string> = {
  rose: 'bg-rose-50 ring-rose-200',
  lavender: 'bg-lavender-50 ring-lavender-200',
  neutral: 'bg-ink-100 ring-ink-200',
};

type Part = { kind: 'text'; text: string } | { kind: 'tile'; tile: HeadlineTile };

const TILE_MARK = /\{([a-z0-9-]+)\}/g;

const parse = (copy: string, library: Record<string, HeadlineTile>): Part[] =>
  copy
    .split(TILE_MARK)
    .map((piece, i): Part | null => {
      if (i % 2 === 0) return piece ? { kind: 'text', text: piece } : null;
      const tile = library[piece];
      if (!tile) {
        if (import.meta.env.DEV) console.warn(`Headline: no tile called "${piece}" in the library`);
        return null;
      }
      return { kind: 'tile', tile };
    })
    .filter((p): p is Part => p !== null);

export interface HeadlineProps {
  /** The opening phrase that makes the point, in ink-900. Mark tiles with {id}. */
  lead: string;
  /** Everything after it, in ink-400. Mark tiles with {id}. */
  rest: string;
  /** h1 on a real page; h2 or h3 when a page already has its h1 (as in this reference) */
  as?: 'h1' | 'h2' | 'h3';
  /** Tile library to resolve {id} against. Defaults to HEADLINE_TILES. */
  tiles?: Record<string, HeadlineTile>;
  id?: string;
  className?: string;
}

export const Tile = ({ tile, index = 0 }: { tile: HeadlineTile; index?: number }) => {
  const reduced = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={cn('headline-tile ring-1 ring-inset', TONE[tile.tone])}
      initial={reduced ? false : { opacity: 0, scale: 0.6, rotate: -8 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: DURATION.xl, ease: EASE_OUT, delay: 0.15 + index * 0.08 }}
    >
      <img src={tile.src} alt="" draggable={false} decoding="async" />
    </motion.span>
  );
};

export const Headline = ({ lead, rest, as: Tag = 'h1', tiles = HEADLINE_TILES, id, className }: HeadlineProps) => {
  const leadParts = parse(lead, tiles);
  const restParts = parse(rest, tiles);

  if (import.meta.env.DEV) {
    const all = [...leadParts, ...restParts];
    const count = all.filter((p) => p.kind === 'tile').length;
    if (count < HEADLINE.tilesMin || count > HEADLINE.tilesMax) {
      console.warn(`Headline "${lead} ${rest}" has ${count} tiles. Use ${HEADLINE.tilesMin} or ${HEADLINE.tilesMax}.`);
    }
    if (all[0]?.kind === 'tile' || all[all.length - 1]?.kind === 'tile') {
      console.warn(`Headline "${lead} ${rest}": a tile sits beside a word, never at the very start or end.`);
    }
  }

  let tileIndex = 0;
  /* Glue each tile to the last word before it and the first word after it. */
  const render = (parts: Part[]) => {
    const out: React.ReactNode[] = [];
    const texts = parts.map((p) => (p.kind === 'text' ? p.text : ''));
    parts.forEach((p, i) => {
      if (p.kind === 'text') return;
      const before = i > 0 && parts[i - 1].kind === 'text' ? texts[i - 1].match(/^([\s\S]*?)(\S+\s*)$/) : null;
      const after = i < parts.length - 1 && parts[i + 1].kind === 'text' ? texts[i + 1].match(/^(\s*\S+)([\s\S]*)$/) : null;
      if (before) texts[i - 1] = before[1];
      if (after) texts[i + 1] = after[2];
      out[i] = (
        <span key={i} className="whitespace-nowrap">
          {before?.[2]}
          <Tile tile={p.tile} index={tileIndex++} />
          {after?.[1]}
        </span>
      );
    });
    return parts.map((p, i) => (p.kind === 'text' ? <React.Fragment key={i}>{texts[i]}</React.Fragment> : out[i]));
  };

  return (
    <Tag id={id} className={cn('font-display text-heading', className)}>
      <span className="text-ink-900">{render(leadParts)}</span> <span className="text-ink-400">{render(restParts)}</span>
    </Tag>
  );
};
