/**
 * TestimonialWall: short quotes on rows that drift sideways.
 *
 *   <TestimonialWall />
 *   <TestimonialWall rows={2} items={mine} />
 *
 * Three rows, the middle one running the other way, each a little slower than the last, so the wall
 * reads as a crowd rather than a conveyor. Every row is a `Marquee`, so it pauses on hover and on
 * keyboard focus and sits still with reduced motion on; one pause button above the wall holds all of
 * them at once, which is what WCAG 2.2.2 asks for and is tidier than a button per row.
 *
 * Sized from tokens.json → wall (card width, fade, speed). Cards are not links: a wall is something
 * you glance at, and a moving link is a hard target to hit.
 *
 * The copy is sample copy until real clients have said something and signed for it. See
 * `SAMPLE_NOTICE` in src/data/testimonials.ts.
 */
import * as React from 'react';
import { Pause, Play } from 'lucide-react';
import { Marquee } from '@/components/ui/animated';
import { TestimonialCard } from '@/components/testimonials/TestimonialCard';
import { WALL } from '@/lib/palette';
import { testimonialsFor, type Testimonial } from '@/data/testimonials';
import { cn } from '@/lib/utils';

export interface TestimonialWallProps {
  /** which quotes to show. Defaults to the fifteen written for the rows */
  items?: Testimonial[];
  /** how many rows to split them across */
  rows?: number;
  /** keep the Sample mark on the cards */
  sample?: boolean;
  className?: string;
  /** classes for the pause button's row, so it can line up with a content column over a full-bleed wall */
  controlsClassName?: string;
}

export const TestimonialWall = ({ items, rows = 3, sample = true, className, controlsClassName }: TestimonialWallProps) => {
  const [paused, setPaused] = React.useState(false);
  const all = items ?? testimonialsFor('rows');
  const per = Math.ceil(all.length / rows);
  const lanes = Array.from({ length: rows }, (_, i) => all.slice(i * per, (i + 1) * per)).filter((lane) => lane.length > 0);

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className={cn('flex justify-end px-6 md:px-12', controlsClassName)}>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 font-sans text-label text-ink-900 transition-colors duration-sm hover:border-ink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2"
        >
          {paused ? <Play className="h-3 w-3" strokeWidth={1.75} aria-hidden /> : <Pause className="h-3 w-3" strokeWidth={1.75} aria-hidden />}
          {paused ? 'Play the wall' : 'Pause the wall'}
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {lanes.map((lane, i) => (
          <Marquee
            key={i}
            paused={paused}
            reverse={i % 2 === 1}
            speed={WALL.rowSpeed - i * 4}
            ariaLabel={`sample testimonials, row ${i + 1} of ${lanes.length}`}
            gapClassName="gap-5"
          >
            {lane.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} sample={sample} />
            ))}
          </Marquee>
        ))}
      </div>
    </div>
  );
};
