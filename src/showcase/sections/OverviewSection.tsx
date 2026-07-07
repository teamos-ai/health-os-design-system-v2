/**
 * OverviewSection — twelve snapshot cards that drift gently to the left
 * (testimonial-scroller craft). Three show at a time; the row fades into a vignette at
 * each edge (the Marquee's edge mask). Pauses on hover, reduced-motion safe. Each card
 * uses the design-system card pattern — flat hairline surface, soft neutral hover lift
 * and shadow — with an emoji squircle badge.
 */
import { Section } from '@/showcase/Section';
import { Marquee } from '@/components/ui/animated';
import { Badge } from '@/components/ui/badge';
import { ACCENTS } from '@/lib/accents';
import { OVERVIEW_CARDS } from '@/data/system';
import { cn } from '@/lib/utils';

export const OverviewSection = () => (
  <Section
    id="overview"
    eyebrow="The system at a glance"
    title="Overview"
    lead="Twelve snapshots of how Health OS v2 works — colour, type, voice, do’s and don’ts — drifting gently past. Hover to pause; drag to move through faster."
  >
    <Marquee speed={18} draggable gapClassName="gap-5">
      {OVERVIEW_CARDS.map((card) => {
        const a = ACCENTS[card.accent];
        return (
          <article
            key={`${card.badge}-${card.title}`}
            className={cn(
              'group flex h-[264px] w-[328px] shrink-0 flex-col gap-4 rounded-md border border-line bg-surface p-6',
              'shadow-none transition duration-md ease-out hover:-translate-y-1 hover:shadow-md'
            )}
          >
            <div className="flex items-center justify-between">
              <Badge variant={a.badge} emoji={card.emoji}>
                {card.badge}
              </Badge>
              <span className={cn('h-2 w-2 rounded-sm opacity-60 transition-opacity group-hover:opacity-100', a.dot)} aria-hidden />
            </div>
            <h3 className="font-display text-h4 leading-snug text-ink-900">{card.title}</h3>
            <ul className="mt-auto flex flex-col gap-2.5">
              {card.lines.map((line) => (
                <li key={line} className="flex gap-2.5 font-sans text-body-sm leading-relaxed text-ink-600">
                  <span className={cn('mt-2 h-1 w-1 shrink-0 rounded-full', a.dot)} aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </Marquee>
  </Section>
);
