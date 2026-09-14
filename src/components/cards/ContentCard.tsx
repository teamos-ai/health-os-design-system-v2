/**
 * ContentCard: text with an optional image. Articles, updates, stories, anything read.
 *
 * The image sits on top and dissolves into the card with the shared `image-fade-b` curve,
 * and the text rises slightly into the faded area so there is no edge. Image ratio is flexible
 * (16/9, 4/3, 3/2, 1/1). A category badge can sit on the image. The whole card is one
 * link when `href` is set; hover lifts the card and eases the image forward.
 */
import type { ReactNode } from 'react';
import { Badge, type BadgeVariant } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type ImageRatio = '16/9' | '4/3' | '3/2' | '1/1';

const RATIO: Record<ImageRatio, string> = {
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '1/1': 'aspect-square',
};

export interface ContentCardProps {
  title: string;
  excerpt?: string;
  image?: { src: string; alt: string };
  ratio?: ImageRatio;
  category?: string;
  categoryVariant?: BadgeVariant;
  /** metadata line, e.g. "6 min read" */
  meta?: ReactNode;
  href?: string;
  className?: string;
}

export const ContentCard = ({
  title,
  excerpt,
  image,
  ratio = '16/9',
  category,
  categoryVariant = 'rose',
  meta,
  href,
  className,
}: ContentCardProps) => (
  <article
    className={cn(
      'group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-[box-shadow,transform,border-color] duration-md ease-out',
      href && 'hover:-translate-y-1 hover:border-ink-200 hover:shadow-sm focus-within:ring-2 focus-within:ring-ink-900 focus-within:ring-offset-2 focus-within:ring-offset-paper',
      className
    )}
  >
    <div className={cn('relative', RATIO[ratio])}>
      <div className="image-fade-b absolute inset-0 overflow-hidden">
        {image ? (
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-xl ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div aria-hidden className="h-full w-full bg-brand-gradient-soft" />
        )}
      </div>
      {category && (
        <Badge variant={categoryVariant} className="absolute left-4 top-4">
          {category}
        </Badge>
      )}
    </div>

    <div className="relative -mt-4 flex flex-1 flex-col gap-3 p-6 pt-0">
      <h3 className="font-display text-subheading text-ink-900">
        {href ? (
          <a href={href} className="outline-none after:absolute after:inset-0 focus-visible:outline-none">
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      {excerpt && <p className="font-sans text-body text-ink-600">{excerpt}</p>}
      {meta && <p className="mt-auto pt-2 font-sans text-label text-ink-500">{meta}</p>}
    </div>
  </article>
);
