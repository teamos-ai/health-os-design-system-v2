/**
 * OverviewSection: the system in twelve snapshot cards on a slow, draggable marquee.
 */
import { Section } from '@/showcase/Section';
import { Marquee } from '@/components/ui/animated';
import { Badge } from '@/components/ui/badge';
import { ACCENTS } from '@/lib/accents';
import { OVERVIEW_CARDS } from '@/data/system';

export const OverviewSection = () => (
  <Section id="overview">
    <Marquee speed={18} draggable gapClassName="gap-4" ariaLabel="System snapshots">
      {OVERVIEW_CARDS.map((card) => {
        const a = ACCENTS[card.accent];
        return (
          <article
            key={card.title}
            className="flex h-64 w-80 shrink-0 flex-col gap-4 rounded-lg border border-line bg-surface p-6 transition-[transform,box-shadow] duration-md ease-out hover:-translate-y-1 hover:shadow-sm"
          >
            <Badge variant={a.badge} emoji={card.emoji} className="self-start">
              {card.badge}
            </Badge>
            <h3 className="font-display text-subheading text-ink-900">{card.title}</h3>
            <ul className="mt-auto flex flex-col gap-2">
              {card.lines.map((line) => (
                <li key={line} className="flex gap-3 font-sans text-body text-ink-600">
                  <span aria-hidden className={`mt-3 h-1 w-1 shrink-0 rounded-full ${a.dot}`} />
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
