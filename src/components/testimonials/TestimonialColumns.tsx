/**
 * TestimonialColumns: longer quotes on columns that drift upward.
 *
 *   <TestimonialColumns />
 *   <TestimonialColumns columns={2} items={mine} />
 *
 * The vertical twin of `TestimonialWall`, and the one to use when the quotes are a sentence or two
 * rather than a line: a column holds about three cards, so the next one is always arriving. Each
 * column runs at its own speed, which is what stops three columns reading as one block sliding.
 * Columns after the first are hidden on a phone, where a single column is all there is room for.
 *
 * It moves the way the rest of the system moves: a motion value driven per frame and wrapped, so it
 * pauses on hover and on keyboard focus, one button holds every column still (WCAG 2.2.2), and with
 * reduced motion on nothing moves and each column becomes a short scrolling list instead.
 *
 * Sized from tokens.json → wall (card width, column height, fade, speed). The copy is sample copy
 * until real clients have said something and signed for it.
 */
import * as React from 'react';
import { Pause, Play } from 'lucide-react';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, wrap } from 'framer-motion';
import { TestimonialCard } from '@/components/testimonials/TestimonialCard';
import { WALL } from '@/lib/palette';
import { testimonialsFor, type Testimonial } from '@/data/testimonials';
import { cn } from '@/lib/utils';

const Column = ({ items, speed, paused, label, sample, className }: { items: Testimonial[]; speed: number; paused: boolean; label: string; sample: boolean; className?: string }) => {
  const reduced = useReducedMotion() ?? false;
  const y = useMotionValue(0);
  const [copyHeight, setCopyHeight] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const copyRef = React.useRef<HTMLDivElement>(null);
  const duplicateRef = React.useRef<HTMLDivElement>(null);
  const held = paused || hovered || focused;

  /* the second copy exists only so the loop has no seam: keep it away from assistive tech */
  React.useEffect(() => {
    duplicateRef.current?.setAttribute('inert', '');
  }, []);

  React.useEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    const measure = () => setCopyHeight(el.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items]);

  useAnimationFrame((_, delta) => {
    if (reduced || held || copyHeight === 0) return;
    y.set(wrap(-copyHeight, 0, y.get() - (delta / 1000) * speed));
  });

  const cards = (ref?: React.Ref<HTMLDivElement>, hidden = false) => (
    <div ref={ref} aria-hidden={hidden || undefined} className="flex shrink-0 flex-col gap-5">
      {items.map((t) => (
        <TestimonialCard key={t.id} testimonial={t} size="tall" sample={sample} />
      ))}
    </div>
  );

  /* with reduced motion on, nothing drifts: the column becomes a short list someone scrolls */
  if (reduced) {
    return (
      <div role="group" aria-label={label} className={cn('wall-column min-w-0 flex-1 overflow-y-auto', className)}>
        {cards()}
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={label}
      className={cn('wall-mask-y wall-column relative min-w-0 flex-1 overflow-hidden', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
      }}
    >
      <motion.div className="flex flex-col gap-5" style={{ y }}>
        {cards(copyRef)}
        {cards(duplicateRef, true)}
      </motion.div>
    </div>
  );
};

export interface TestimonialColumnsProps {
  /** which quotes to show. Defaults to the fifteen written for the columns */
  items?: Testimonial[];
  columns?: number;
  sample?: boolean;
  className?: string;
}

export const TestimonialColumns = ({ items, columns = 3, sample = true, className }: TestimonialColumnsProps) => {
  const [paused, setPaused] = React.useState(false);
  const all = items ?? testimonialsFor('columns');
  const per = Math.ceil(all.length / columns);
  const lanes = Array.from({ length: columns }, (_, i) => all.slice(i * per, (i + 1) * per)).filter((lane) => lane.length > 0);

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 font-sans text-label text-ink-900 transition-colors duration-sm hover:border-ink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2"
        >
          {paused ? <Play className="h-3 w-3" strokeWidth={1.75} aria-hidden /> : <Pause className="h-3 w-3" strokeWidth={1.75} aria-hidden />}
          {paused ? 'Play the columns' : 'Pause the columns'}
        </button>
      </div>

      <div className="flex justify-center gap-5">
        {lanes.map((lane, i) => (
          <Column
            key={i}
            items={lane}
            speed={WALL.columnSpeed + i * 3}
            paused={paused}
            sample={sample}
            label={`sample testimonials, column ${i + 1} of ${lanes.length}`}
            /* a phone has room for one column, a tablet for two */
            className={i === 1 ? 'hidden md:block' : i > 1 ? 'hidden lg:block' : undefined}
          />
        ))}
      </div>
    </div>
  );
};
