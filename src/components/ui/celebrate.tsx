/**
 * Celebrate: a mini confetti moment when someone commits to something. Curly streamers, short
 * ribbons, stars and dots pop up from the top edge of the control, hang for a beat, then drift
 * down past it and fade, in brand colours (tokens.json → celebration), in under two seconds.
 *
 * Use it for the moment a commitment lands: choosing annual billing, booking or confirming a
 * booking, saving changes, accepting, getting a lead magnet, pressing play for the first time.
 * Fire it once per action, from the control that made it happen, and after the action has
 * succeeded (a save that is still loading has not landed yet). Never on load, on hover, or for
 * something people undo, such as closing or cancelling. Nothing waits on it, it never catches the
 * pointer, and it does nothing when reduced motion is on.
 *
 *   <Button celebrate>Book the walkthrough</Button>          fires on click
 *   celebrate(buttonRef.current)                             fires from any element, e.g. after a save
 *
 * One confetti layer serves the whole page: it mounts itself on first use, so there is nothing to
 * add to the app shell.
 */
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import { CELEBRATION } from '@/lib/palette';

type Shape = 'streamer' | 'ribbon' | 'star' | 'dot';

interface Piece {
  shape: Shape;
  /** start, along the top edge of the control */
  x: number;
  y: number;
  /** sideways drift, how high it pops and how far below the top edge it falls to */
  dx: number;
  rise: number;
  fall: number;
  spin: number;
  turn: number;
  size: number;
  colour: string;
  delay: number;
  flip: boolean;
}

interface Burst {
  id: number;
  pieces: Piece[];
}

/* Six in every thirty pieces are streamers, six ribbons, six stars and twelve dots. */
const SHAPES: Shape[] = ['streamer', 'dot', 'ribbon', 'dot', 'star'];

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const remToPx = (rem: string) => parseFloat(rem) * parseFloat(getComputedStyle(document.documentElement).fontSize || '16');

const makeBurst = (rect: DOMRect): Piece[] => {
  const rise = remToPx(CELEBRATION.rise);
  /* small controls still get a proper spray, not a knot */
  const spread = Math.max(rect.width * 0.9, 200);
  return Array.from({ length: CELEBRATION.pieces }, (_, i) => {
    const shape = SHAPES[i % SHAPES.length];
    /* mostly from the middle of the top edge, a few from its ends */
    const along = (Math.random() + Math.random()) / 2;
    const heavy = shape === 'dot' || shape === 'star';
    return {
      shape,
      x: rect.left + rect.width * (0.15 + along * 0.7),
      y: rect.top + 2,
      dx: (along - 0.5) * spread + rand(-24, 24),
      rise: rise * rand(heavy ? 0.45 : 0.6, 1),
      fall: rand(40, heavy ? 150 : 110),
      spin: rand(-40, 40),
      turn: rand(-260, 260) * (shape === 'streamer' ? 0.5 : 1),
      size: shape === 'streamer' ? rand(0.9, 1.25) : shape === 'ribbon' ? rand(0.9, 1.2) : shape === 'star' ? rand(10, 13) : rand(5, 8),
      colour: CELEBRATION.colours[Math.floor(Math.random() * CELEBRATION.colours.length)],
      delay: rand(0, 0.12),
      flip: Math.random() > 0.5,
    };
  });
};

const Glyph = ({ piece }: { piece: Piece }) => {
  const { shape, colour, size, flip } = piece;
  if (shape === 'dot') return <span className="block rounded-full" style={{ width: size, height: size, backgroundColor: colour }} />;
  if (shape === 'star')
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
        <path d="M12 1.8l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9l7.1-.6z" fill={colour} strokeLinejoin="round" />
      </svg>
    );
  if (shape === 'ribbon')
    return (
      <svg width={26 * size} height={14 * size} viewBox="0 0 26 14" aria-hidden style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
        <path d="M3 11 Q 13 -1 23 9" fill="none" stroke={colour} strokeWidth={2.6} strokeLinecap="round" />
      </svg>
    );
  return (
    <svg width={22 * size} height={48 * size} viewBox="0 0 22 48" aria-hidden style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
      <path d="M11 3 C 19 5, 19 15, 11 16 C 3 17, 3 27, 11 28 C 19 29, 20 39, 12 45" fill="none" stroke={colour} strokeWidth={2.6} strokeLinecap="round" />
    </svg>
  );
};

/* ── the one layer ────────────────────────────────────────────────────── */
let bursts: Burst[] = [];
let nextId = 0;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const Layer = () => {
  const [, render] = React.useReducer((n: number) => n + 1, 0);
  React.useEffect(() => {
    listeners.add(render);
    return () => {
      listeners.delete(render);
    };
  }, []);
  const seconds = CELEBRATION.duration / 1000;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {bursts.map((burst) =>
        burst.pieces.map((p, i) => (
          <motion.span
            key={`${burst.id}-${i}`}
            className="absolute block"
            style={{ left: p.x, top: p.y }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: p.spin }}
            animate={{
              x: [0, p.dx * 0.7, p.dx],
              y: [0, -p.rise, -p.rise * 0.2 + p.fall],
              opacity: [0, 1, 1, 0],
              scale: [0.3, 1, 1, 0.9],
              rotate: [p.spin, p.spin + p.turn * 0.4, p.spin + p.turn],
            }}
            transition={{
              duration: seconds,
              delay: p.delay,
              x: { duration: seconds, delay: p.delay, times: [0, 0.3, 1], ease: ['easeOut', 'easeInOut'] },
              y: { duration: seconds, delay: p.delay, times: [0, 0.3, 1], ease: ['easeOut', 'easeIn'] },
              opacity: { duration: seconds, delay: p.delay, times: [0, 0.06, 0.72, 1] },
              scale: { duration: seconds, delay: p.delay, times: [0, 0.2, 0.8, 1] },
              rotate: { duration: seconds, delay: p.delay, times: [0, 0.3, 1], ease: 'linear' },
            }}
          >
            <span className="block -translate-x-1/2 -translate-y-1/2">
              <Glyph piece={p} />
            </span>
          </motion.span>
        ))
      )}
    </div>
  );
};

let mounted = false;
const mount = () => {
  if (mounted || typeof document === 'undefined') return;
  mounted = true;
  const host = document.createElement('div');
  host.setAttribute('data-celebration', '');
  document.body.appendChild(host);
  createRoot(host).render(<Layer />);
};

/** Pop confetti from the top edge of `from`. Does nothing without an element or with reduced motion on. */
export const celebrate = (from: Element | null | undefined) => {
  if (!from || typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rect = from.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return;
  mount();
  const id = nextId++;
  bursts = [...bursts, { id, pieces: makeBurst(rect) }];
  emit();
  window.setTimeout(() => {
    bursts = bursts.filter((b) => b.id !== id);
    emit();
  }, CELEBRATION.duration + 300);
};

/**
 * The hook form, kept for existing callers: `celebrate` is the same function, and `confetti` is
 * null because the shared layer renders every burst.
 */
export const useCelebrate = () => ({ celebrate, confetti: null as React.ReactNode });
