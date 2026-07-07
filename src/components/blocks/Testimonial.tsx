/**
 * Testimonial — Health OS v2 marketing block.
 *
 * Quiet proof — a `<figure>`/`<blockquote>` with the practitioner's words, then a
 * `<figcaption>` with name, role and (optional) avatar. Single quote by default; the
 * `TestimonialWall` composes several into a masonry-ish column layout (no dot carousel,
 * per the redesign rules). Flat card, hairline, `rounded-xl`. Avatars are squircles
 * (`rounded-lg`), not circles, for the less-generic look.
 */
import { cn } from '@/lib/utils';

export interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface TestimonialProps extends TestimonialData {
  className?: string;
}

export const Testimonial = ({ quote, name, role, avatar, className }: TestimonialProps) => (
  <figure className={cn('flex flex-col rounded-xl border border-line bg-surface p-6', className)}>
    <blockquote className="flex-1 font-display text-h4 font-medium leading-snug text-ink-900">
      “{quote}”
    </blockquote>
    <figcaption className="mt-5 flex items-center gap-3">
      {avatar ? (
        <img
          src={avatar}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-11 w-11 shrink-0 rounded-lg border border-line object-cover"
        />
      ) : (
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-gradient-soft font-display text-body-md font-semibold text-ink-900"
        >
          {name.charAt(0)}
        </span>
      )}
      <span className="flex flex-col">
        <span className="font-mono text-body-sm text-ink-900">{name}</span>
        <span className="font-mono text-caption text-ink-500">{role}</span>
      </span>
    </figcaption>
  </figure>
);

export interface TestimonialWallProps {
  items: TestimonialData[];
  className?: string;
}

/** A calm multi-column wall — CSS columns so quotes of varying length pack naturally. */
export const TestimonialWall = ({ items, className }: TestimonialWallProps) => (
  <div className={cn('gap-6 [column-gap:1.5rem] sm:columns-2 lg:columns-3', className)}>
    {items.map((t) => (
      <Testimonial key={t.name} {...t} className="mb-6 break-inside-avoid" />
    ))}
  </div>
);
