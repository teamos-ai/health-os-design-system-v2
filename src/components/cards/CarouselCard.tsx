/**
 * CarouselCard: a few photos on top, one idea and its figure below.
 *
 * Adapted from the 21st.dev place card for Health OS. The photos slide on a carousel with
 * arrows (on hover or keyboard focus) and dots; the lower third of the photo dissolves into
 * the card with the shared image fade, so the dots and the text never sit on a raw photo.
 * Below: a category, the title, a meta line, one sentence, then a single figure and an open
 * action. Hover lifts the card.
 */
import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EASE_OUT, DURATION } from '@/lib/motion';
import { cn } from '@/lib/utils';

export interface CarouselCardProps {
  /** two to four photos from the tagged library; alt text comes from the library description */
  images: { src: string; alt: string }[];
  /** one category badge on the photo */
  category?: string;
  title: string;
  /** a short line under the title, e.g. "Foundations · Tokens" */
  meta?: string;
  description: string;
  /** one figure that sums up the idea, e.g. { value: '9', label: 'brand shades' } */
  figure?: { value: string; label: string };
  action?: { label: string; href?: string; onClick?: () => void };
  className?: string;
}

const SLIDE = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

const arrow =
  'flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink-900 shadow-sm transition-[opacity,transform] duration-sm ease-out ' +
  'opacity-0 group-hover/photos:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apricot-400 active:scale-[0.98]';

export const CarouselCard = ({ images, category, title, meta, description, figure, action, className }: CarouselCardProps) => {
  const reduced = useReducedMotion();
  const [[index, direction], setSlide] = React.useState<[number, number]>([0, 0]);
  const count = images.length;

  const go = (step: number) => setSlide(([i]) => [(i + step + count) % count, step]);
  const goTo = (next: number) => setSlide(([i]) => [next, next > i ? 1 : -1]);

  return (
    <article
      className={cn(
        'flex w-80 shrink-0 flex-col overflow-hidden rounded-lg border border-line bg-surface transition-[transform,box-shadow] duration-md ease-out hover:-translate-y-1 hover:shadow-sm',
        className
      )}
    >
      <div className="group/photos relative h-48" aria-roledescription="carousel" aria-label={`${title} photos`}>
        <div className="image-fade-b absolute inset-0 overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={index}
              src={images[index].src}
              alt={images[index].alt}
              draggable={false}
              decoding="async"
              custom={direction}
              variants={SLIDE}
              initial={reduced ? false : 'enter'}
              animate="center"
              exit={reduced ? undefined : 'exit'}
              transition={{ duration: reduced ? 0 : DURATION.lg, ease: EASE_OUT }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>

        {category && (
          <Badge variant="neutral" size="sm" className="absolute left-3 top-3 z-10 bg-surface">
            {category}
          </Badge>
        )}

        {count > 1 && (
          <>
            <div className="absolute inset-x-3 top-1/2 z-10 flex -translate-y-1/2 justify-between">
              <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className={arrow}>
                <ChevronLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </button>
              <button type="button" aria-label="Next photo" onClick={() => go(1)} className={arrow}>
                <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </button>
            </div>
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  aria-label={`Show photo ${i + 1} of ${count}`}
                  aria-current={i === index}
                  onClick={() => goTo(i)}
                  className="flex h-6 items-center justify-center rounded-full px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apricot-400"
                >
                  <span className={cn('block h-1 rounded-full transition-all duration-md ease-out', i === index ? 'w-4 bg-ink-900' : 'w-1 bg-ink-400')} />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-6 pb-6 pt-3">
        <h3 className="font-display text-subheading text-ink-900">{title}</h3>
        {meta && <p className="font-sans text-label uppercase text-ink-500">{meta}</p>}
        <p className="font-sans text-body text-ink-600">{description}</p>
        {(figure || action) && (
          <div className="mt-auto flex items-end justify-between gap-4 border-t border-line-soft pt-4">
            {figure && (
              <p className="flex items-baseline gap-2">
                <span className="font-display text-subheading text-ink-900">{figure.value}</span>
                <span className="font-sans text-label text-ink-500">{figure.label}</span>
              </p>
            )}
            {action && (
              <Button
                variant="text"
                size="small"
                href={action.href}
                onClick={action.onClick}
                trailingIcon={<ArrowRight className="h-4 w-4 transition-transform duration-sm ease-out group-hover/open:translate-x-1" strokeWidth={1.5} aria-hidden />}
                className="group/open"
              >
                {action.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
