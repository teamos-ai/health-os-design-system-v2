/**
 * TestimonialCard: one person, one thing they said.
 *
 *   <TestimonialCard testimonial={t} />            row size, for the drifting rows
 *   <TestimonialCard testimonial={t} size="tall" />  column size, for a longer quote
 *
 * The quote leads and the person follows, because the sentence is what someone reads as the card
 * goes past. Portrait, name, then what they do and where, in the quiet label role.
 *
 * **Every card carries the Sample mark while the copy is sample copy**, which is all of it today:
 * the database blocks client quotes until one is measured and permitted (C21). Pass `sample={false}`
 * only for a quote that has cleared that bar, with the person's written permission on file.
 */
import { PILLARS, person, portrait, type Testimonial } from '@/data/testimonials';
import { cn } from '@/lib/utils';

export interface TestimonialCardProps {
  testimonial: Testimonial;
  /** row card, or the taller card a column carries */
  size?: 'row' | 'tall';
  /** show the pillar the quote argues for. Off in the walls, on where quotes are being chosen */
  showPillar?: boolean;
  /** the Sample mark. Leave it on until the quote is real */
  sample?: boolean;
  className?: string;
}

export const TestimonialCard = ({ testimonial, size = 'row', showPillar = false, sample = true, className }: TestimonialCardProps) => {
  const who = person(testimonial.person);
  const tall = size === 'tall';
  return (
    <figure
      className={cn(
        'flex shrink-0 flex-col justify-between rounded-lg border border-line bg-surface',
        tall ? 'w-full gap-6 p-6' : 'wall-card gap-5 p-5',
        className
      )}
    >
      <div className="flex flex-col gap-3">
        {(sample || showPillar) && (
          <div className="flex items-center justify-between gap-3">
            {showPillar ? <span className="font-sans text-label uppercase text-ink-500">{PILLARS[testimonial.pillar].label}</span> : <span />}
            {sample && (
              <span className="font-sans text-label uppercase text-ink-400" title="Sample copy. Not a Health OS client">
                Sample
              </span>
            )}
          </div>
        )}
        <blockquote className="font-sans text-body text-ink-900">{testimonial.quote}</blockquote>
      </div>

      <figcaption className="flex items-center gap-3">
        <img
          src={portrait(who.id)}
          alt=""
          width={40}
          height={40}
          loading="lazy"
          decoding="async"
          className="h-10 w-10 shrink-0 rounded-full border border-line object-cover"
        />
        <span className="flex min-w-0 flex-col">
          <span className="truncate font-display text-title text-ink-900">{who.name}</span>
          <span className="truncate font-sans text-label text-ink-500">
            {who.role}, {who.city}
          </span>
        </span>
      </figcaption>
    </figure>
  );
};
