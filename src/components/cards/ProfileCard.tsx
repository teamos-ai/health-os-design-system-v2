/**
 * ProfileCard: who someone will work with. A team member, coach or facilitator.
 *
 * Remodelled from the 21st.dev team member card. The portrait dissolves into the card,
 * then the name, role, up to three areas of practice and one line on how they work. Nothing
 * is hidden behind hover, so it reads the same on touch screens, and the card is not a link,
 * so it does not lift. One text action books with them. Use the person's own photo: library photos are placeholders, never presented as
 * a real team member.
 */
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ProfileCardProps {
  name: string;
  /** "Movement coach", "Founder" */
  role: string;
  portrait: { src: string; alt: string };
  /** up to three areas of practice */
  focus?: string[];
  /** one sentence on how they work */
  approach?: string;
  action?: { label: string; href?: string };
  className?: string;
}

export const ProfileCard = ({ name, role, portrait, focus = [], approach, action, className }: ProfileCardProps) => (
  <article
    className={cn(
      'flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface',
      className
    )}
  >
    <div className="image-fade-b relative aspect-[4/5] overflow-hidden">
      <img
        src={portrait.src}
        alt={portrait.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </div>

    <div className="relative -mt-4 flex flex-1 flex-col gap-3 px-6 pb-6">
      <div>
        <h3 className="font-display text-subheading text-ink-900">{name}</h3>
        <p className="mt-1 font-sans text-label uppercase text-ink-500">{role}</p>
      </div>
      {focus.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label={`${name} works on`}>
          {focus.slice(0, 3).map((f) => (
            <li key={f}>
              <Badge variant="rose" size="sm">
                {f}
              </Badge>
            </li>
          ))}
        </ul>
      )}
      {approach && <p className="font-sans text-body text-ink-600">{approach}</p>}
      {action && (
        <Button
          variant="text"
          href={action.href ?? '#'}
          className="group mt-auto self-start"
          trailingIcon={<ArrowRight className="h-4 w-4 transition-transform duration-sm ease-out group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />}
        >
          {action.label}
        </Button>
      )}
    </div>
  </article>
);
