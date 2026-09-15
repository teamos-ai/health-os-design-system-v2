/**
 * SessionCard: one dated session someone can join. A class, workshop, retreat day or webinar.
 *
 * Remodelled from the 21st.dev event cards. An optional photo dissolves into the card, then
 * a paper date tile sits beside the title, time and place, with how often it repeats in
 * plain words. The footer offers one way to reserve and a quiet add-to-calendar icon button.
 * The card itself is not a link, so it does not lift on hover.
 * No attendee counts, seats left or countdowns: dates are facts, not pressure.
 */
import { ArrowRight, CalendarPlus, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface SessionCardProps {
  title: string;
  /** "Thu", "18", "Sep" */
  date: { weekday: string; day: string; month: string };
  /** "6:00 to 7:15 pm" */
  time: string;
  /** where it happens: "Bondi studio" or "Online" */
  place: string;
  /** in person or online, shown as a badge */
  mode?: 'In studio' | 'Online';
  /** how often it repeats, in plain words: "Every Thursday" */
  repeats?: string;
  description?: string;
  image?: { src: string; alt: string };
  /** the booking action; set `celebrate` to pop confetti when the click itself completes the step */
  action: { label: string; href?: string; celebrate?: boolean };
  /** a quiet link beside the action, such as add to calendar */
  calendarHref?: string;
  className?: string;
}

export const SessionCard = ({ title, date, time, place, mode, repeats, description, image, action, calendarHref, className }: SessionCardProps) => (
  <article
    className={cn(
      'flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface',
      className
    )}
  >
    {image && (
      <div className="image-fade-b relative aspect-[3/2] overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    )}

    <div className={cn('flex flex-1 flex-col gap-4 px-6 pb-6', image ? '-mt-4 relative' : 'pt-6')}>
      <div className="flex items-start gap-4">
        <div className="flex w-16 shrink-0 flex-col items-center rounded-md border border-line bg-paper py-2">
          <span className="font-sans text-label uppercase text-ink-500">{date.weekday}</span>
          <span className="font-display text-subheading text-ink-900">{date.day}</span>
          <span className="font-sans text-label uppercase text-ink-500">{date.month}</span>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          {mode && (
            <Badge variant={mode === 'Online' ? 'lavender' : 'rose'} size="sm" className="self-start">
              {mode}
            </Badge>
          )}
          <h3 className="font-display text-subheading text-ink-900">{title}</h3>
        </div>
      </div>

      <ul className="flex flex-col gap-2 font-sans text-body text-ink-600">
        <li className="flex items-center gap-3">
          <Clock className="h-4 w-4 shrink-0 text-ink-400" strokeWidth={1.5} aria-hidden />
          <span>
            {time}
            {repeats && <span className="text-ink-500"> · {repeats}</span>}
          </span>
        </li>
        <li className="flex items-center gap-3">
          <MapPin className="h-4 w-4 shrink-0 text-ink-400" strokeWidth={1.5} aria-hidden />
          {place}
        </li>
      </ul>

      {description && <p className="font-sans text-body text-ink-600">{description}</p>}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4">
        <Button
          variant="text"
          href={action.href}
          celebrate={action.celebrate}
          aria-label={`${action.label}: ${title}, ${date.weekday} ${date.day} ${date.month}`}
          className="group"
          trailingIcon={<ArrowRight className="h-4 w-4 transition-transform duration-sm ease-out group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />}
        >
          {action.label}
        </Button>
        {calendarHref && (
          <Tooltip label="Add to calendar">
            <IconButton variant="secondary" size="small" aria-label={`Add ${title} to your calendar`} onClick={() => window.location.assign(calendarHref)}>
              <CalendarPlus className="h-4 w-4" strokeWidth={1.5} />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  </article>
);
