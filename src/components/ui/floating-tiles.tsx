/**
 * FloatingTiles: icon tiles drifting around a page's opening headline, for the home hero only.
 * Instead of tiles inside the words, a loose ring of tiles hangs in the space around the title,
 * each leaning a few degrees and floating slowly at its own pace, as if suspended.
 *
 *   <Hero id="hero" fade>
 *     <FloatingTiles tiles={HOME_TILES} />
 *     <HeroContainer>
 *       <Headline tilesAround text="The [ultimate] design system for Health OS" />
 *     </HeroContainer>
 *   </Hero>
 *
 * Place it as the first child of a `Hero` (it fills the hero behind the content). Positions are
 * percentages of the hero, so keep tiles in the side margins and above the headline, clear of
 * the words, the search and the chips; `from` shows a tile only from a breakpoint up and `until`
 * only below one, so phones get their own two placements above the headline. Tiles are
 * pictures: hidden from screen readers, they never catch the pointer and they do not react to it. They rise in once, then float while the hero is on screen; with
 * reduced motion on they sit still at their lean. Motion values come from tokens.json → icon
 * (float-tilt, float-distance, float-duration).
 */
import * as React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { HEADLINE_TILES } from '@/data/headline-tiles';
import { DURATION, EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';

export interface FloatingTile {
  /** a tile id from the icon library */
  id: string;
  /** centre of the tile, as a percentage of the hero's width and height */
  x: number;
  y: number;
  size?: 'sm' | 'md' | 'lg';
  /** lean direction and strength, -1 to 1, as a share of the float-tilt token */
  lean?: number;
  /** show the tile only from this breakpoint up */
  from?: 'sm' | 'md' | 'lg' | 'xl';
  /** show the tile only below this breakpoint (phone placements) */
  until?: 'sm' | 'md' | 'lg' | 'xl';
}

const SIZE = { sm: 'icon-tile-sm', md: 'icon-tile-md', lg: 'icon-tile-lg' } as const;
const FROM = { sm: 'hidden sm:block', md: 'hidden md:block', lg: 'hidden lg:block', xl: 'hidden xl:block' } as const;
const UNTIL = { sm: 'sm:hidden', md: 'md:hidden', lg: 'lg:hidden', xl: 'xl:hidden' } as const;

export const FloatingTiles = ({ tiles, className }: { tiles: FloatingTile[]; className?: string }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  return (
    <div ref={ref} aria-hidden data-floating={inView || undefined} className={cn('floating-tiles pointer-events-none absolute inset-0 -z-10', className)}>
      {tiles.map((t, i) => {
        const tile = HEADLINE_TILES[t.id];
        if (!tile?.src) {
          if (import.meta.env.DEV) console.warn(`FloatingTiles: no ready tile called "${t.id}" in the icon library`);
          return null;
        }
        const style = {
          left: `${t.x}%`,
          top: `${t.y}%`,
          '--tile-lean': t.lean ?? (i % 2 === 0 ? -1 : 0.75),
          '--tile-phase': `${i * -1.3}s`,
          '--tile-pace': `${1 + (i % 3) * 0.18}`,
        } as React.CSSProperties;
        return (
          <motion.span
            key={t.id}
            className={cn('floating-tile', t.from && FROM[t.from], t.until && UNTIL[t.until])}
            style={style}
            initial={reduced ? false : { opacity: 0, scale: 0.7, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: DURATION.xl * 1.6, ease: EASE_OUT, delay: 0.25 + i * 0.07 }}
          >
            <span className={cn('floating-tile-face icon-tile', SIZE[t.size ?? 'md'])}>
              <img src={tile.src} alt="" draggable={false} decoding="async" />
            </span>
          </motion.span>
        );
      })}
    </div>
  );
};
