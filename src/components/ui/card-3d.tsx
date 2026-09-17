/**
 * Card3D: a picture that floats and turns over.
 *
 * It rests at a slight angle so it reads as lifted off the page, tilts toward the pointer as it
 * crosses it, eases back when the pointer leaves, and on a click turns over to show whatever is
 * behind it: a video, another picture, a panel of figures.
 *
 *   <Card3D
 *     front={<img src="/dashboards/large/79.jpg" alt="The main Health OS dashboard" />}
 *     back={<VideoPlayer src="/media/overview.mp4" float={false} playOnReveal />}
 *     frontAction="Play the overview"
 *     backAction="Back to the dashboard"
 *   />
 *
 * The front is the click target, so the back can hold its own controls without the card turning
 * under them; the button that turns it back sits under the card, clear of anything the back is
 * playing, and Escape does the same thing. The back is only rendered while
 * it is showing, so a video behind it stops the moment the card turns back. Every value comes from
 * tokens.json → card3d (perspective, tilt, resting angle, how long it follows and turns, the lift
 * and the glow), so the same effect moves to another page or brand by changing the variables.
 *
 * The tilt follows a mouse only, and only while the front is showing: a touch simply turns the
 * card, and a pointer over the back never moves it while someone is using the controls. With
 * reduced motion on, the card sits flat and the two faces cross-fade.
 */
import * as React from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { CARD_3D } from '@/lib/palette';
import { cn } from '@/lib/utils';

export interface Card3DProps {
  /** what shows at rest, usually a picture */
  front: React.ReactNode;
  /** what shows once it turns over. Left out, the card floats and tilts but never turns */
  back?: React.ReactNode;
  /** the words on the button over the front */
  frontAction?: string;
  /** the words on the button that turns it back */
  backAction?: string;
  /** degrees of tilt either way; the token is the sensible ceiling */
  tilt?: number;
  /** turned over from the outside; leave it out and the card keeps its own state */
  flipped?: boolean;
  onFlippedChange?: (flipped: boolean) => void;
  className?: string;
}

export const Card3D = ({ front, back, frontAction = 'Turn it over', backAction = 'Turn it back', tilt = CARD_3D.tilt, flipped, onFlippedChange, className }: Card3DProps) => {
  const reduced = useReducedMotion() ?? false;
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [own, setOwn] = React.useState(false);
  const isFlipped = flipped ?? own;
  /* the back stays mounted through the turn, then goes, which stops a video behind it */
  const [backMounted, setBackMounted] = React.useState(isFlipped);
  const [following, setFollowing] = React.useState(false);

  React.useEffect(() => {
    if (isFlipped) {
      setBackMounted(true);
      return;
    }
    const id = window.setTimeout(() => setBackMounted(false), reduced ? 0 : CARD_3D.flip);
    return () => window.clearTimeout(id);
  }, [isFlipped, reduced]);

  const setFlipped = (next: boolean) => {
    if (flipped === undefined) setOwn(next);
    onFlippedChange?.(next);
  };

  const rest = `rotateX(${CARD_3D.restX}deg) rotateY(${CARD_3D.restY}deg)`;
  const face = (t: string) => (isFlipped ? `${t} rotateY(180deg)` : t);

  const move = (e: React.PointerEvent) => {
    if (reduced || isFlipped || e.pointerType !== 'mouse') return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientY - r.top) / r.height - 0.5) * -tilt;
    const y = ((e.clientX - r.left) / r.width - 0.5) * tilt;
    setFollowing(true);
    el.style.transform = `rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg)`;
  };

  const settle = () => {
    setFollowing(false);
    if (cardRef.current) cardRef.current.style.transform = face(rest);
  };

  /* Escape turns it back, the same as the button under the card */
  React.useEffect(() => {
    if (!isFlipped) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFlipped(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFlipped]);

  /* the turn owns the transform again, so the card never holds a pointer angle while it is over */
  React.useEffect(() => {
    setFollowing(false);
    if (cardRef.current) cardRef.current.style.transform = face(rest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFlipped]);

  return (
    <div className={cn('card3d-stage', className)}>
      <div ref={cardRef} className={cn('card3d', following && 'card3d-following')} style={{ transform: face(rest) }}>
        {/* only the face you can see takes clicks, or the hidden one swallows them */}
        <div className={cn('card3d-face relative', isFlipped && 'pointer-events-none', reduced && isFlipped && 'opacity-0')} onPointerMove={move} onPointerLeave={settle}>
          {front}
          {back && (
            <button
              type="button"
              onClick={() => setFlipped(true)}
              tabIndex={isFlipped ? -1 : undefined}
              aria-hidden={isFlipped || undefined}
              className="group absolute inset-0 flex items-end justify-center p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink-900"
            >
              <span className="inline-flex items-center gap-3 rounded-md bg-surface/90 px-4 py-3 font-display text-body text-ink-900 shadow-md backdrop-blur-sm transition-transform duration-md ease-out group-hover:-translate-y-1">
                <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-full bg-apricot-200">
                  <Play className="ml-px h-4 w-4 fill-current" strokeWidth={0} />
                </span>
                {frontAction}
              </span>
            </button>
          )}
        </div>

        {back && backMounted && (
          <div className={cn('card3d-face card3d-back bg-surface', !isFlipped && 'pointer-events-none', reduced && !isFlipped && 'opacity-0')} aria-hidden={!isFlipped}>
            {back}
          </div>
        )}
      </div>

      {/* the way back sits under the card, not over it: whatever is on the back keeps its own controls */}
      {back && (
        <div className="mt-4 flex min-h-9 justify-end">
          {isFlipped && (
            <button
              type="button"
              onClick={() => setFlipped(false)}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 font-sans text-label text-ink-900 transition-colors duration-sm hover:border-ink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900"
            >
              <RotateCcw className="h-3 w-3" strokeWidth={1.75} aria-hidden />
              {backAction}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
