/**
 * Celebrate: a small burst of confetti for a moment worth marking, such as switching to annual
 * billing. Soft brand colours only (tokens.json → celebration), small round pieces that rise
 * from the control, drift and fall, over in about a second. Nothing people need waits on it,
 * and it does nothing when reduced motion is on. Use it at most once per action, never on load.
 *
 *   const { celebrate, confetti } = useCelebrate();
 *   <Switch onCheckedChange={(on) => on && celebrate(switchRef.current)} />
 *   {confetti}
 */
import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { CELEBRATION } from '@/lib/palette';
import { EASE_OUT } from '@/lib/motion';

interface Piece {
  dx: number;
  rise: number;
  fall: number;
  size: number;
  colour: string;
  delay: number;
}

interface Burst {
  id: number;
  x: number;
  y: number;
  pieces: Piece[];
}

const makePieces = (): Piece[] =>
  Array.from({ length: CELEBRATION.pieces }, (_, i) => {
    /* an upward cone, 60 degrees either side of straight up */
    const angle = (-90 + (Math.random() * 120 - 60)) * (Math.PI / 180);
    const distance = 60 + Math.random() * 90;
    return {
      dx: Math.cos(angle) * distance,
      rise: Math.sin(angle) * distance,
      fall: 40 + Math.random() * 60,
      size: 5 + Math.round(Math.random() * 4),
      colour: CELEBRATION.colours[i % CELEBRATION.colours.length],
      delay: Math.random() * 0.08,
    };
  });

export const useCelebrate = () => {
  const reduced = useReducedMotion();
  const [bursts, setBursts] = React.useState<Burst[]>([]);
  const nextId = React.useRef(0);

  const celebrate = React.useCallback(
    (from: Element | null) => {
      if (reduced || !from) return;
      const r = from.getBoundingClientRect();
      const id = nextId.current++;
      setBursts((b) => [...b, { id, x: r.left + r.width / 2, y: r.top + r.height / 2, pieces: makePieces() }]);
      window.setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), CELEBRATION.duration + 200);
    },
    [reduced]
  );

  const confetti =
    bursts.length > 0 && typeof document !== 'undefined'
      ? createPortal(
          <div aria-hidden className="pointer-events-none fixed inset-0 z-50">
            {bursts.map((burst) =>
              burst.pieces.map((p, i) => (
                <motion.span
                  key={`${burst.id}-${i}`}
                  className="absolute rounded-full"
                  style={{ left: burst.x, top: burst.y, width: p.size, height: p.size, backgroundColor: p.colour }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
                  animate={{ x: [0, p.dx * 0.85, p.dx], y: [0, p.rise, p.rise + p.fall], opacity: [1, 1, 0], scale: [0.4, 1, 0.9] }}
                  transition={{ duration: CELEBRATION.duration / 1000, delay: p.delay, times: [0, 0.4, 1], ease: [EASE_OUT, 'easeIn'] }}
                />
              ))
            )}
          </div>,
          document.body
        )
      : null;

  return { celebrate, confetti };
};
