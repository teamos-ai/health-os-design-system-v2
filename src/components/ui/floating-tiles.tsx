/**
 * FloatingTiles: icon tiles floating around a page's opening headline, for the home hero only.
 * The headline stands clear, and a loose field of tiles hangs in the space around it. Each tile
 * rises in, then drifts on its own slow loop (up and down, side to side, rocking a few degrees),
 * and eases away from the mouse pointer when it comes close, springing back once it leaves.
 *
 *   <Hero id="hero" fade>
 *     <FloatingTiles tiles={HOME_TILES} />
 *     <HeroContainer>
 *       <Headline tilesAround text={'The [Ultimate] Design System\nFor Health OS'} />
 *     </HeroContainer>
 *   </Hero>
 *
 * Two ways to place it. `anchor="box"` (the default) fills its positioned parent and takes x and
 * y as percentages of it. `anchor="headline"` (the home hero) sits at the top centre of the
 * headline, inside a relative wrapper around it, and takes x, y and size in the headline's own em:
 * so the scatter hugs the words at every screen width, grows with the heading and sits behind the
 * letters. Give tiles different sizes (tokens.json → icon.float-size-min to float-size-max) and
 * uneven positions so the field reads as scattered, never set out. Keep tiles around the headline
 * and subtitle only, never down by the search. `from` shows a tile only from a breakpoint up and
 * `until` only below one, so each screen size gets its own placement. Tiles are pictures: hidden
 * from screen readers and never a click target; the repel follows a mouse only, never touch. The
 * float runs while the hero is on screen; with reduced motion on the tiles simply sit in place.
 * Values come from tokens.json → icon (float-*, repel-*, spring-*, size-hero).
 */
import * as React from 'react';
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { HEADLINE_TILES } from '@/data/headline-tiles';
import { ICON_FLOAT } from '@/lib/palette';
import { EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';

export interface FloatingTile {
  /** a tile id from the icon library */
  id: string;
  /** centre of the tile: percent of the box, or em from the headline's top centre (anchor headline) */
  x: number;
  y: number;
  /** a number is the tile's size in the headline's em (anchor headline); or hero (64px, 80px from md), sm, md, lg */
  size?: number | 'sm' | 'md' | 'lg' | 'hero';
  /** show the tile only from this breakpoint up */
  from?: 'sm' | 'md' | 'lg' | 'xl';
  /** show the tile only below this breakpoint */
  until?: 'sm' | 'md' | 'lg' | 'xl';
}

const SIZE = { sm: 'icon-tile-sm', md: 'icon-tile-md', lg: 'icon-tile-lg', hero: 'icon-tile-hero' } as const;
const FROM = { sm: 'hidden sm:block', md: 'hidden md:block', lg: 'hidden lg:block', xl: 'hidden xl:block' } as const;
const UNTIL = { sm: 'sm:hidden', md: 'md:hidden', lg: 'lg:hidden', xl: 'xl:hidden' } as const;

type Pointer = { x: number; y: number } | null;
type Listener = (p: Pointer) => void;

const Tile = ({ tile, index, subscribe, floating, still, unit }: { tile: FloatingTile; index: number; subscribe: (l: Listener) => () => void; floating: boolean; still: boolean; unit: '%' | 'em' }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: ICON_FLOAT.stiffness, damping: ICON_FLOAT.damping });
  const springY = useSpring(y, { stiffness: ICON_FLOAT.stiffness, damping: ICON_FLOAT.damping });
  /* each tile keeps its own pace for as long as it is on the page */
  const [pace] = React.useState(() => ICON_FLOAT.durationMin + Math.random() * (ICON_FLOAT.durationMax - ICON_FLOAT.durationMin));
  const src = HEADLINE_TILES[tile.id]?.src;

  React.useEffect(() => {
    if (still) return;
    return subscribe((p) => {
      const el = ref.current;
      if (!el || !p) {
        x.set(0);
        y.set(0);
        return;
      }
      const r = el.getBoundingClientRect();
      const dx = p.x - (r.left + r.width / 2);
      const dy = p.y - (r.top + r.height / 2);
      const distance = Math.hypot(dx, dy);
      if (distance < ICON_FLOAT.repelRadius) {
        /* the closer the pointer, the further the tile eases away */
        const angle = Math.atan2(dy, dx);
        const force = (1 - distance / ICON_FLOAT.repelRadius) * ICON_FLOAT.repelForce;
        x.set(-Math.cos(angle) * force);
        y.set(-Math.sin(angle) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    });
  }, [subscribe, still, x, y]);

  if (!src) {
    if (import.meta.env.DEV) console.warn(`FloatingTiles: no ready tile called "${tile.id}" in the icon library`);
    return null;
  }

  return (
    <motion.span
      ref={ref}
      className={cn('floating-tile', tile.from && FROM[tile.from], tile.until && UNTIL[tile.until])}
      style={{ left: `${tile.x}${unit}`, top: `${tile.y}${unit}`, x: springX, y: springY }}
      initial={still ? false : { opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: EASE_OUT }}
    >
      <motion.span
        className={cn('floating-tile-face icon-tile', typeof tile.size !== 'number' && SIZE[tile.size ?? 'hero'])}
        style={typeof tile.size === 'number' ? ({ '--icon-size': `${tile.size}em` } as React.CSSProperties) : undefined}
        animate={
          floating && !still
            ? {
                y: [0, -ICON_FLOAT.rise, 0, ICON_FLOAT.rise, 0],
                x: [0, ICON_FLOAT.drift, 0, -ICON_FLOAT.drift, 0],
                rotate: [0, ICON_FLOAT.turn, 0, -ICON_FLOAT.turn, 0],
              }
            : { y: 0, x: 0, rotate: 0 }
        }
        transition={floating && !still ? { duration: pace, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' } : { duration: 0.6, ease: EASE_OUT }}
      >
        <img src={src} alt="" draggable={false} decoding="async" />
      </motion.span>
    </motion.span>
  );
};

export const FloatingTiles = ({ tiles, anchor = 'box', className }: { tiles: FloatingTile[]; anchor?: 'box' | 'headline'; className?: string }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion() ?? false;
  const listeners = React.useRef(new Set<Listener>());
  const subscribe = React.useCallback((l: Listener) => {
    listeners.current.add(l);
    return () => {
      listeners.current.delete(l);
    };
  }, []);

  /* One mouse listener for the whole field, batched to one update per frame, only while on screen. */
  React.useEffect(() => {
    if (reduced || !inView) return;
    let frame = 0;
    let latest: Pointer = null;
    const flush = () => {
      frame = 0;
      listeners.current.forEach((l) => l(latest));
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      latest = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(flush);
    };
    const onLeave = () => {
      latest = null;
      if (!frame) frame = requestAnimationFrame(flush);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, inView]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        'floating-tiles pointer-events-none absolute',
        anchor === 'headline' ? 'left-1/2 top-0 h-px w-px text-heading' : 'inset-0',
        className
      )}
    >
      {tiles.map((t, i) => (
        <Tile key={`${t.id}-${i}`} tile={t} index={i} subscribe={subscribe} floating={inView} still={reduced} unit={anchor === 'headline' ? 'em' : '%'} />
      ))}
    </div>
  );
};
