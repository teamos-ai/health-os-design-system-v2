/**
 * OverviewSection — twelve snapshot cards that drift gently to the left (efficient.app
 * testimonial-scroller craft). Three show at a time; the row fades into a vignette at
 * each edge (the Marquee's edge mask). Pauses on hover, reduced-motion safe. Each card
 * carries an emoji squircle badge.
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
    lead="Twelve snapshots of how Health OS v2 works — colour, type, voice, do’s and don’ts — drifting gently past. Hover to pause and read."
  >
    <Marquee speed={18} gapClassName="gap-5">
      {OVERVIEW_CARDS.map((card) => {
        const a = ACCENTS[card.accent];
        return (
          <article
            key={`${card.badge}-${card.title}`}
            className="flex h-[260px] w-[320px] shrink-0 flex-col gap-4 rounded-md border border-line bg-surface p-6"
          >
            <Badge variant={a.badge} emoji={card.emoji}>
              {card.badge}
            </Badge>
            <h3 className="font-display text-h4 leading-snug text-ink-900">{card.title}</h3>
            <ul className="flex flex-col gap-2">
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
