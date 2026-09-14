/**
 * SwipeFiles: a fan of ready-to-use message templates, each turning over to show what is inside.
 *
 * Up to seven cards sit in a fan. With more, the fan pages round in a loop: cards slide in from one
 * side and out the other. Each front is cover art from the background library dissolving into a
 * surface panel with the format badge, the title and the length (text never sits on the raw photo).
 * Hovering a card lifts it and eases its neighbours apart. Activating the centre card (click, Enter
 * or Space) turns it over; a side card comes to the centre first. The back is a spec sheet: an
 * eyebrow, the cover art with the format and length, the title and who it is for, a short
 * description, what is inside, "Get the swipe file" and a text button to turn it back (Escape also
 * turns it back). Only the face you can see is reachable by keyboard and screen readers.
 *
 * Faces are laid out at one design size and scaled to the fan, so they read the same at every width;
 * a turned card grows back towards that size so the back can be read. Under the fan: the current
 * card (read out politely), previous and next, and dots. Arrow keys move the fan while it has focus.
 * Motion is springs with no overshoot; with reduced motion the fan snaps into place and the turn is a
 * crossfade.
 */
import * as React from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion, type Transition, type Variants } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { DURATION, EASE_OUT, EASE_STANDARD } from '@/lib/motion';
import { cn } from '@/lib/utils';

const REM = 16;

/** token candidate: layout.fan. The seven fan slots: rot in degrees, x and y in rem at full size, z the stacking order. */
export const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, z: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, z: 2 },
  { rot: -7, scale: 0.9346, x: -11, y: 1.3, z: 3 },
  { rot: 0, scale: 1, x: 0, y: 0, z: 10 },
  { rot: 7, scale: 0.9346, x: 11, y: 1.3, z: 3 },
  { rot: 14, scale: 0.8498, x: 22, y: 4.0, z: 2 },
  { rot: 21, scale: 0.7756, x: 30, y: 7.3, z: 1 },
] as const;

/**
 * token candidate: layout.fan.steps. By the fan's own width in px: the card width and the ideal fan
 * height in rem, and how far the slots spread. The height and card shrink on short viewports.
 */
export const FAN_STEPS = [
  { below: 480, card: 7, layout: 22, spread: 0.28 },
  { below: 640, card: 9, layout: 26, spread: 0.38 },
  { below: 768, card: 12, layout: 28, spread: 0.5 },
  { below: 1024, card: 16, layout: 34, spread: 0.75 },
  { below: Infinity, card: 20, layout: 38, spread: 1 },
] as const;

/** token candidate: size.swipe-card. The size card faces are designed at, in px (4:7). */
export const SWIPE_CARD = { width: 320, height: 560 } as const;

/** token candidate: motion.spring.calm. Overdamped (critical damping here is about 26), so nothing overshoots. */
export const FAN_SPRING = { type: 'spring', stiffness: 170, damping: 30, mass: 1 } as const;

/**
 * token candidate: motion.fan.hover. The hovered card lifts (rem at full size) and grows; its
 * neighbours push outward (rem) and tilt (deg), staggered per step (s); leaving waits (ms).
 */
export const FAN_HOVER = { lift: 2.5, grow: 1.08, push: 8, tilt: 3, stagger: 0.02, leaveDelay: 50 } as const;

/** token candidate: motion.fan.travel. How far a card slides (rem at full size) and turns (deg) as it pages in or out. */
export const FAN_TRAVEL = { x: 40, rotate: 30 } as const;

/** token candidate: motion.fan.entrance. Cards rise from below (rem), grow from half size and stagger in (s). */
export const FAN_ENTRANCE = { y: 12, scale: 0.5, delay: 0.2, stagger: 0.06 } as const;

/** token candidate: the perspective a card turns over in, in px. */
export const CARD_PERSPECTIVE = 1600;

export type SwipeFileTone = 'neutral' | 'rose' | 'lavender';

export interface SwipeFile {
  id: string;
  title: string;
  /** "Email sequence", "Text messages", "Script" */
  format: string;
  /** e.g. "3 emails" */
  length: string;
  /** who or when it is for, one short line */
  subtitle: string;
  /** one or two sentences */
  body: string;
  /** three short things inside */
  inside: [string, string, string];
  /** cover art from the background library (decorative) */
  cover: { src: string };
  /** the format badge: neutral, or rose and lavender for up to two formats kept the same across the set */
  tone?: SwipeFileTone;
}

export interface SwipeFilesProps {
  files: SwipeFile[];
  /** the fan's accessible name, default "Swipe files" */
  label?: string;
  /** the primary action on the back, default "Get the swipe file" */
  actionLabel?: string;
  onGet?: (file: SwipeFile) => void;
  className?: string;
}

interface Slot {
  rot: number;
  scale: number;
  x: number;
  y: number;
  z: number;
}

interface FanMetrics {
  spread: number;
  arc: number;
  cardScale: number;
  layout: number;
  flipScale: number;
  compact: boolean;
}

interface Pose {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  z: number;
}

/** What a card animates between: its place in the fan and whether it shows. */
type CardTarget = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  opacity: number;
};

interface ExitCustom {
  direction: number;
  travel: number;
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

const mod = (n: number, m: number) => ((n % m) + m) % m;

const measureFan = (width: number, viewportHeight: number): FanMetrics => {
  const step = FAN_STEPS.find((s) => width < s.below) ?? FAN_STEPS[FAN_STEPS.length - 1];
  const ideal = step.layout * REM;
  const fitHeight = Math.min(1, (0.7 * viewportHeight) / ideal);
  const cardWidth = step.card * REM * fitHeight;
  /* keep the outer cards inside the fan's own width */
  const edge = FAN_POSITIONS[0];
  const turn = (Math.abs(edge.rot) * Math.PI) / 180;
  const edgeHalf = (cardWidth * (Math.cos(turn) + (SWIPE_CARD.height / SWIPE_CARD.width) * Math.sin(turn)) * edge.scale) / 2;
  const fit = Math.max(0, (width / 2 - edgeHalf - 8) / (Math.abs(edge.x) * REM));
  return {
    spread: Math.min(step.spread, fit),
    arc: (step.card / FAN_STEPS[FAN_STEPS.length - 1].card) * fitHeight,
    cardScale: cardWidth / SWIPE_CARD.width,
    layout: Math.min(ideal, 0.7 * viewportHeight),
    flipScale: Math.min(1, (width - 8) / SWIPE_CARD.width, (0.9 * viewportHeight) / SWIPE_CARD.height),
    compact: width < 400,
  };
};

/** Seven cards use the fan slots; fewer are spread along the same curve. */
const slotFor = (offset: number, half: number): Slot => {
  if (half === 3) return FAN_POSITIONS[offset + 3];
  if (half === 0) return FAN_POSITIONS[3];
  const d = offset / half;
  return { rot: d * 21, scale: 1 - 0.2244 * d * d, x: d * 30, y: d * d * 7.3, z: offset === 0 ? 10 : Math.max(1, 4 - Math.abs(offset)) };
};

const poseFor = (offset: number, half: number, m: FanMetrics, hovered: number | null, turned: boolean): Pose => {
  if (turned) return { x: 0, y: 0, rotate: 0, scale: m.flipScale, z: 30 };
  const s = slotFor(offset, half);
  const pose: Pose = { x: s.x * REM * m.spread, y: s.y * REM * m.arc, rotate: s.rot, scale: s.scale * m.cardScale, z: s.z };
  if (hovered === null) return pose;
  if (offset === hovered) return { ...pose, y: pose.y - FAN_HOVER.lift * REM * m.arc, scale: pose.scale * FAN_HOVER.grow, z: 20 };
  const distance = Math.abs(offset - hovered);
  const direction = Math.sign(offset - hovered);
  /* cards nearer the middle move more; the outer cards stay put, so the fan keeps its width */
  const normalized = half ? Math.abs(offset) / half : 0;
  const push = FAN_HOVER.push * (1 - normalized) * (1 + 0.2 * Math.max(0, 3 - distance));
  return { ...pose, x: pose.x + direction * push * REM * m.spread, rotate: pose.rotate + (direction * FAN_HOVER.tilt) / (distance + 1) };
};

const EXIT: Variants = {
  exit: ({ direction, travel }: ExitCustom) => ({ x: -direction * travel, rotate: -direction * FAN_TRAVEL.rotate, opacity: 0 }),
};

interface Faces {
  front: HTMLButtonElement | null;
  back: HTMLDivElement | null;
}

interface FanCardProps {
  file: SwipeFile;
  offset: number;
  isCentre: boolean;
  showBack: boolean;
  lifted: boolean;
  reduced: boolean;
  initial: CardTarget | false;
  animate: CardTarget;
  transition: Transition;
  z: number;
  exitCustom: ExitCustom;
  actionLabel: string;
  onActivate: (offset: number) => void;
  onHover: (offset: number) => void;
  onGet?: (file: SwipeFile) => void;
  onTurnBack: () => void;
  register: (id: string, faces: Faces | null) => void;
}

const FanCard = ({
  file,
  offset,
  isCentre,
  showBack,
  lifted,
  reduced,
  initial,
  animate,
  transition,
  z,
  exitCustom,
  actionLabel,
  onActivate,
  onHover,
  onGet,
  onTurnBack,
  register,
}: FanCardProps) => {
  const frontRef = React.useRef<HTMLButtonElement>(null);
  const backRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();

  /* only the face you can see takes focus, clicks and screen readers */
  React.useLayoutEffect(() => {
    if (backRef.current) backRef.current.inert = !showBack;
    if (frontRef.current) frontRef.current.inert = showBack;
  }, [showBack]);

  React.useLayoutEffect(() => {
    register(file.id, { front: frontRef.current, back: backRef.current });
    return () => register(file.id, null);
  }, [file.id, register]);

  const face = 'absolute inset-0 overflow-hidden rounded-lg border border-line bg-surface';
  const hideBackface: React.CSSProperties = { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' };

  return (
    <motion.div
      data-fan-card=""
      custom={exitCustom}
      variants={EXIT}
      initial={initial}
      animate={animate}
      exit="exit"
      transition={transition}
      onHoverStart={() => onHover(offset)}
      aria-hidden={!isCentre || undefined}
      className="absolute left-1/2 top-1/2"
      style={{ width: SWIPE_CARD.width, height: SWIPE_CARD.height, marginLeft: -SWIPE_CARD.width / 2, marginTop: -SWIPE_CARD.height / 2, zIndex: z }}
    >
      {/* keeps the hover while the pointer drops below a lifted card */}
      <span aria-hidden className="absolute inset-x-0 top-full block h-16" />
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d', transformPerspective: CARD_PERSPECTIVE }}
        initial={false}
        animate={{ rotateY: showBack && !reduced ? 180 : 0 }}
        transition={reduced ? { duration: 0 } : { duration: DURATION.xl, ease: EASE_STANDARD }}
      >
        <button
          ref={frontRef}
          type="button"
          tabIndex={isCentre ? 0 : -1}
          aria-label={`${file.title}, ${file.format}. Turn over to see what is inside`}
          aria-hidden={showBack || undefined}
          onClick={() => onActivate(offset)}
          className={cn(
            face,
            'flex flex-col text-left transition-[box-shadow,opacity] duration-md ease-out',
            lifted ? 'shadow-lg' : 'shadow-md',
            reduced && showBack && 'opacity-0',
            focusRing
          )}
          style={hideBackface}
        >
          <span className="image-fade-b relative block min-h-0 flex-1">
            <img src={file.cover.src} alt="" draggable={false} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          </span>
          <span className="flex flex-col items-start gap-3 bg-surface px-6 pb-6">
            <Badge variant={file.tone ?? 'neutral'} size="sm">
              {file.format}
            </Badge>
            <span className="font-display text-subheading text-ink-900">{file.title}</span>
            <span className="font-sans text-label uppercase text-ink-500">{file.length}</span>
          </span>
        </button>

        <div
          ref={backRef}
          role="group"
          aria-labelledby={titleId}
          aria-hidden={!showBack || undefined}
          tabIndex={-1}
          className={cn(
            face,
            'flex flex-col gap-4 p-6 shadow-lg transition-opacity duration-md ease-out',
            !showBack && 'pointer-events-none',
            reduced && !showBack && 'opacity-0',
            focusRing
          )}
          style={reduced ? hideBackface : { ...hideBackface, transform: 'rotateY(180deg)' }}
        >
          <div className="flex items-center gap-4">
            <img src={file.cover.src} alt="" draggable={false} loading="lazy" decoding="async" className="h-16 w-16 shrink-0 rounded-md object-cover" />
            <div className="flex min-w-0 flex-col items-start gap-2">
              <Badge variant="outline" size="sm">
                Swipe file
              </Badge>
              <p className="font-sans text-label uppercase text-ink-500">
                {file.format} · {file.length}
              </p>
            </div>
          </div>
          <div>
            <h3 id={titleId} className="font-display text-subheading text-ink-900">
              {file.title}
            </h3>
            <p className="mt-1 font-sans text-label uppercase text-ink-500">{file.subtitle}</p>
          </div>
          <p className="font-sans text-body text-ink-600">{file.body}</p>
          <div>
            <p className="font-sans text-label uppercase text-ink-500">{"What's inside"}</p>
            <ul className="mt-2 flex flex-col gap-1">
              {file.inside.map((item) => (
                <li key={item} className="flex items-start gap-2 font-sans text-body text-ink-900">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-ink-900" strokeWidth={2} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto flex flex-col items-center gap-1">
            <Button className="w-full" onClick={() => onGet?.(file)} leadingIcon={<Download className="h-4 w-4" strokeWidth={1.5} aria-hidden />}>
              {actionLabel}
            </Button>
            <Button variant="text" size="small" onClick={onTurnBack}>
              Turn it back
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const SwipeFiles = ({ files, label = 'Swipe files', actionLabel = 'Get the swipe file', onGet, className }: SwipeFilesProps) => {
  const reduced = useReducedMotion() ?? false;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = React.useState<FanMetrics | null>(null);
  const [[current, direction], setPosition] = React.useState<[number, number]>([0, 0]);
  const [turned, setTurned] = React.useState(false);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [settled, setSettled] = React.useState(false);
  const leaveTimer = React.useRef<ReturnType<typeof setTimeout>>();
  const faces = React.useRef(new Map<string, Faces>());
  const pendingFocus = React.useRef<{ index: number; face: 'front' | 'back' } | null>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.3 });

  const total = files.length;
  const visible = total === 0 ? 0 : Math.min(total, FAN_POSITIONS.length) - (Math.min(total, FAN_POSITIONS.length) % 2 === 0 ? 1 : 0);
  const half = Math.max(0, (visible - 1) / 2);

  React.useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => setMetrics(measureFan(el.clientWidth, window.innerHeight));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  React.useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setSettled(true), (FAN_ENTRANCE.delay + visible * FAN_ENTRANCE.stagger + 0.8) * 1000);
    return () => clearTimeout(t);
  }, [inView, visible]);

  React.useEffect(() => () => clearTimeout(leaveTimer.current), []);

  /* move focus once the faces have swapped which one is inert */
  React.useLayoutEffect(() => {
    const request = pendingFocus.current;
    if (!request) return;
    pendingFocus.current = null;
    const target = faces.current.get(files[request.index]?.id ?? '');
    const el = request.face === 'back' ? target?.back : target?.front;
    el?.focus({ preventScroll: true });
  });

  const register = React.useCallback((id: string, f: Faces | null) => {
    if (f) faces.current.set(id, f);
    else faces.current.delete(id);
  }, []);

  const go = (step: number, focusCard = false) => {
    if (!total || step === 0) return;
    const next = mod(current + step, total);
    setTurned(false);
    setPosition([next, Math.sign(step)]);
    if (focusCard) pendingFocus.current = { index: next, face: 'front' };
  };

  const goTo = (index: number) => {
    let step = index - current;
    if (step > total / 2) step -= total;
    if (step < -total / 2) step += total;
    go(step);
  };

  const activate = (offset: number) => {
    if (offset !== 0) {
      go(offset);
      return;
    }
    const next = !turned;
    setTurned(next);
    setHovered(null);
    pendingFocus.current = { index: current, face: next ? 'back' : 'front' };
  };

  const turnBack = () => {
    setTurned(false);
    pendingFocus.current = { index: current, face: 'front' };
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      if (target.closest('input, textarea, select')) return;
      e.preventDefault();
      go(e.key === 'ArrowRight' ? 1 : -1, !!target.closest('[data-fan-card]'));
    } else if (e.key === 'Escape' && turned) {
      e.preventDefault();
      turnBack();
    }
  };

  const hoverCard = (offset: number) => {
    clearTimeout(leaveTimer.current);
    if (!turned && !reduced) setHovered(offset);
  };
  const leaveFan = () => {
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHovered(null), FAN_HOVER.leaveDelay);
  };

  if (total === 0) return null;

  const activeHover = turned || reduced ? null : hovered;
  const layoutHeight = metrics ? (turned ? Math.max(metrics.layout, SWIPE_CARD.height * metrics.flipScale + 32) : metrics.layout) : 0;
  const offsets = Array.from({ length: visible }, (_, i) => i - half);
  const announcement = `Swipe file ${current + 1} of ${total}: ${files[current].title}`;
  const dot = (active: boolean) => cn('block h-2 rounded-full transition-all duration-md ease-out', active ? 'w-4 bg-apricot-200' : 'w-2 bg-ink-200');

  return (
    <div
      ref={rootRef}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn('flex w-full min-w-0 flex-col items-center gap-4 overflow-x-clip', className)}
    >
      {metrics && (
        <motion.div
          className="relative w-full"
          initial={false}
          animate={{ height: layoutHeight }}
          transition={reduced ? { duration: 0 } : FAN_SPRING}
          style={{ height: layoutHeight }}
          onPointerLeave={leaveFan}
        >
          <AnimatePresence initial custom={{ direction, travel: FAN_TRAVEL.x * REM * metrics.spread } satisfies ExitCustom}>
            {offsets.map((offset) => {
              const index = mod(current + offset, total);
              const file = files[index];
              const isCentre = offset === 0;
              const pose = poseFor(offset, half, metrics, activeHover, isCentre && turned);
              const hidden: CardTarget = { x: 0, y: FAN_ENTRANCE.y * REM * metrics.arc, rotate: 0, scale: metrics.cardScale * FAN_ENTRANCE.scale, opacity: 0 };
              const travel: CardTarget = {
                x: pose.x + direction * FAN_TRAVEL.x * REM * metrics.spread,
                y: pose.y,
                rotate: pose.rotate + direction * FAN_TRAVEL.rotate,
                scale: pose.scale,
                opacity: 0,
              };
              const shown = inView || reduced;
              const delay =
                !shown || reduced
                  ? 0
                  : !settled
                    ? FAN_ENTRANCE.delay + (offset + half) * FAN_ENTRANCE.stagger
                    : activeHover !== null
                      ? Math.abs(offset - activeHover) * FAN_HOVER.stagger
                      : 0;
              const transition: Transition = reduced
                ? { duration: 0 }
                : { ...FAN_SPRING, delay, opacity: { duration: DURATION.md, ease: EASE_OUT, delay } };
              return (
                <FanCard
                  key={file.id}
                  file={file}
                  offset={offset}
                  isCentre={isCentre}
                  showBack={isCentre && turned}
                  lifted={activeHover === offset}
                  reduced={reduced}
                  initial={reduced ? false : inView ? travel : hidden}
                  animate={shown ? { x: pose.x, y: pose.y, rotate: pose.rotate, scale: pose.scale, opacity: 1 } : hidden}
                  transition={transition}
                  z={pose.z}
                  exitCustom={{ direction, travel: FAN_TRAVEL.x * REM * metrics.spread }}
                  actionLabel={actionLabel}
                  onActivate={activate}
                  onHover={hoverCard}
                  onGet={onGet}
                  onTurnBack={turnBack}
                  register={register}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      <p aria-live="polite" className="text-center font-sans text-label text-ink-600">
        {announcement}
      </p>

      <div className="flex items-center gap-4">
        <IconButton aria-label="Previous swipe file" onClick={() => go(-1)} className="rounded-full">
          <ChevronLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </IconButton>
        {metrics?.compact ? (
          <div aria-hidden className="flex items-center gap-2">
            {files.map((f, i) => (
              <span key={f.id} className={dot(i === current)} />
            ))}
          </div>
        ) : (
          <div className="flex items-center">
            {files.map((f, i) => (
              <button
                key={f.id}
                type="button"
                aria-label={`Show swipe file ${i + 1} of ${total}: ${f.title}`}
                aria-current={i === current || undefined}
                onClick={() => goTo(i)}
                className={cn('flex h-6 min-w-6 items-center justify-center rounded-full', focusRing)}
              >
                <span className={dot(i === current)} />
              </button>
            ))}
          </div>
        )}
        <IconButton aria-label="Next swipe file" onClick={() => go(1)} className="rounded-full">
          <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </IconButton>
      </div>
    </div>
  );
};
