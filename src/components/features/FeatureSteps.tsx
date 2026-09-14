/**
 * FeatureSteps: a process that plays through on its own, one step and one picture at a time.
 *
 * Remodelled from the 21st.dev feature-section (Serenity UI). Steps sit in a hairline list on
 * one side and a library photo sits on the other, dissolving into a caption with the step's
 * icon. The current step is the only apricot: its node fills apricot-200 and its hairline
 * fills from left to right as the step plays, like the tab underline. Earlier steps show a
 * tick; later steps stay in the ink neutrals. The photo swaps with a short rise and fade.
 *
 * Every step is a button, so a click or Enter jumps to it and autoplay stops for good. Autoplay
 * pauses while the pointer is over the steps or the photo, while focus is in the list and while
 * the block is out of view, and the Pause control stops it (WCAG 2.2.2). With reduced motion
 * there is no autoplay and no control, and the photo only fades. Descriptions are always
 * visible, so nothing waits on the timer. On phones the photo sits above the steps.
 */
import * as React from 'react';
import { AnimatePresence, motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion } from 'framer-motion';
import { Check, Pause, Play } from 'lucide-react';
import { DURATION, EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { FeatureIntro, FOCUS_RING, ICON_CLASS, ICON_STROKE, itemHeading, toneIcon, type FeatureBaseProps, type FeatureItem } from './shared';
import { AUTOPLAY } from '@/lib/palette';

/** How long each step holds before the next, in ms (tokens.json → motion.autoplay.step). */
export const FEATURE_STEPS_INTERVAL = AUTOPLAY.step;

export interface FeatureStep extends FeatureItem {
  /** library photo for the media panel (use thumb()) */
  image: { src: string; alt: string };
  /** caption beside the icon under the photo; defaults to "Step 01 of 04" */
  label?: string;
}

export interface FeatureStepsProps extends FeatureBaseProps {
  /** three to five steps */
  items: FeatureStep[];
  /** play through the steps on their own. Off with reduced motion */
  autoPlay?: boolean;
  /** ms each step holds */
  interval?: number;
  /** which side the photo sits on from md up */
  mediaSide?: 'start' | 'end';
}

const pad = (n: number) => String(n).padStart(2, '0');

export const FeatureSteps = ({
  items,
  autoPlay = true,
  interval = FEATURE_STEPS_INTERVAL,
  mediaSide = 'end',
  eyebrow,
  title,
  description,
  align,
  headingLevel = 'h2',
  className,
}: FeatureStepsProps) => {
  const reduced = useReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const mediaRef = React.useRef<HTMLElement>(null);
  /* play only while the photo and its pause control are mostly on screen */
  const inView = useInView(mediaRef, { amount: 0.6 });
  const [current, setCurrent] = React.useState(0);
  const [playing, setPlaying] = React.useState(autoPlay);
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const progress = useMotionValue(0);
  const baseId = React.useId();
  const ItemHeading = itemHeading(headingLevel);

  const canPlay = autoPlay && !reduced && items.length > 1;
  const running = canPlay && playing && inView && !hovered && !focused;

  useAnimationFrame((_, delta) => {
    if (!running) return;
    const next = progress.get() + Math.min(delta, 64) / interval;
    if (next >= 1) {
      progress.set(0);
      setCurrent((c) => (c + 1) % items.length);
    } else {
      progress.set(next);
    }
  });

  /* Warm the photos once the block is in view, so a swap never shows an empty frame. */
  React.useEffect(() => {
    if (!inView) return;
    items.forEach((item) => {
      const img = new Image();
      img.src = item.image.src;
    });
  }, [inView, items]);

  const pick = (i: number) => {
    setPlaying(false);
    progress.set(0);
    setCurrent(i);
  };

  const togglePlay = () => {
    setHovered(false);
    setPlaying((p) => !p);
  };

  const step = items[current] ?? items[0];
  if (!step) return null;
  const StepIcon = step.icon;

  const hoverHandlers = { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) };

  return (
    <div ref={rootRef} className={className}>
      <FeatureIntro eyebrow={eyebrow} title={title} description={description} align={align} headingLevel={headingLevel} />

      <div className="grid gap-8 md:grid-cols-2 md:items-center lg:gap-12">
        <ol
          className="min-w-0 border-b border-line"
          {...hoverHandlers}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
          }}
        >
          {items.map((item, i) => {
            const isCurrent = i === current;
            const done = i < current;
            return (
              <li key={item.title} className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 border-t border-line py-6">
                <span
                  aria-hidden
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full font-sans text-label ring-1 ring-inset transition-colors duration-md ease-out',
                    isCurrent ? 'bg-apricot-200 text-ink-900 ring-apricot-200' : 'bg-ink-100 ring-ink-200',
                    !isCurrent && (done ? 'text-ink-900' : 'text-ink-600')
                  )}
                >
                  {done ? <Check className="h-4 w-4" strokeWidth={2} /> : pad(i + 1)}
                </span>
                <div className="min-w-0 pt-1">
                  <ItemHeading className="font-display text-subheading">
                    <button
                      type="button"
                      onClick={() => pick(i)}
                      aria-current={isCurrent ? 'step' : undefined}
                      aria-describedby={`${baseId}-d${i}`}
                      className={cn(
                        'text-left transition-colors duration-sm ease-out',
                        "after:absolute after:inset-0 after:rounded-md after:content-['']",
                        'focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ink-900 focus-visible:after:ring-offset-2 focus-visible:after:ring-offset-paper',
                        isCurrent ? 'text-ink-900' : 'text-ink-600 hover:text-ink-900'
                      )}
                    >
                      <span className="sr-only">{done ? 'Done: ' : ''}</span>
                      {item.title}
                    </button>
                  </ItemHeading>
                  <p id={`${baseId}-d${i}`} className={cn('mt-2 font-sans text-body transition-colors duration-sm ease-out', isCurrent ? 'text-ink-600' : 'text-ink-500')}>
                    {item.description}
                  </p>
                </div>
                {isCurrent && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-px z-10 h-0.5 origin-left rounded-full bg-apricot-200"
                    style={{ scaleX: canPlay && playing ? progress : 1 }}
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div className={cn('order-first min-w-0', mediaSide === 'end' && 'md:order-last')}>
          <figure ref={mediaRef} className="overflow-hidden rounded-lg border border-line bg-surface">
            <div className="image-fade-b relative aspect-[4/3] overflow-hidden" {...hoverHandlers}>
              <AnimatePresence initial={false}>
                <motion.div
                  key={current}
                  className="absolute inset-x-0 -inset-y-2"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: DURATION.lg, ease: EASE_OUT }}
                >
                  <img src={step.image.src} alt={step.image.alt} decoding="async" className="h-full w-full object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
            <figcaption className="flex min-h-12 items-center justify-between gap-4 px-6 pb-6 pt-2">
              <span className="flex min-w-0 items-center gap-3">
                <StepIcon className={cn(ICON_CLASS, toneIcon(step.tone))} strokeWidth={ICON_STROKE} aria-hidden />
                <span className="truncate font-sans text-label uppercase text-ink-500">
                  {step.label ?? `Step ${pad(current + 1)} of ${pad(items.length)}`}
                </span>
              </span>
              {canPlay && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? 'Pause the steps' : 'Play the steps'}
                  className={cn(
                    'inline-flex shrink-0 items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 font-sans text-label text-ink-600 transition-colors duration-sm ease-out hover:border-ink-400 hover:text-ink-900',
                    FOCUS_RING
                  )}
                >
                  {playing ? <Pause className="h-3 w-3" strokeWidth={1.75} aria-hidden /> : <Play className="h-3 w-3" strokeWidth={1.75} aria-hidden />}
                  {playing ? 'Pause' : 'Play'}
                </button>
              )}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};
