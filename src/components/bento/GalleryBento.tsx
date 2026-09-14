/**
 * GalleryBento: an image-led mosaic for a practitioner's own studio, class or retreat page.
 *
 * Five cells on four columns from lg: a tall portrait photo down one side, a wide photo and
 * the text on the top row, then the details and a second wide photo below, so photos and
 * words interlock. One column on phones (photo, text, details, then the other photos), two
 * on tablets. `reverse` mirrors the layout.
 *
 * Photos come from the tagged library and never carry text: a caption sits below its photo,
 * which dissolves into it with the shared image fade. The text cell holds a small eyebrow,
 * the title, one sentence and the one action, on the soft dawn wash (the bento's only
 * gradient). Details are plain facts you pass in, each with a quiet icon. Only the action
 * can be pressed, so no cell lifts and no photo zooms on hover.
 */
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface GalleryPhoto {
  src: string;
  /** from the library description: what is visible, nothing more */
  alt: string;
  /** a short line below the photo about the place, never about the people in it */
  caption?: string;
}

export interface GalleryDetail {
  icon: LucideIcon;
  /** "Where", "When", "Group size" */
  label: string;
  value: string;
}

export interface GalleryBentoProps {
  photos: {
    /** a 9:16 photo for the tall cell */
    portrait: GalleryPhoto;
    /** a 16:9 or 4:3 photo beside the text */
    wide: GalleryPhoto;
    /** a second landscape photo beside the details */
    second: GalleryPhoto;
  };
  eyebrow?: string;
  title: string;
  description: string;
  action: { label: string; href?: string; variant?: 'text' | 'secondary' };
  /** two or three facts */
  details: [GalleryDetail, GalleryDetail] | [GalleryDetail, GalleryDetail, GalleryDetail];
  /** mirror the layout */
  reverse?: boolean;
  className?: string;
}

const cell = 'relative flex min-w-0 flex-col overflow-hidden rounded-lg';

/* Literal placements so Tailwind keeps them. Phones follow source order. */
const PLACE = {
  portrait: ['sm:col-start-1 sm:row-span-2 sm:row-start-1 lg:col-start-1 lg:row-span-2 lg:row-start-1', 'sm:col-start-2 sm:row-span-2 sm:row-start-1 lg:col-start-4 lg:row-span-2 lg:row-start-1'],
  text: ['sm:col-start-2 sm:row-start-1 lg:col-start-4 lg:row-start-1', 'sm:col-start-1 sm:row-start-1 lg:col-start-1 lg:row-start-1'],
  details: ['sm:col-start-2 sm:row-start-2 lg:col-start-2 lg:row-start-2', 'sm:col-start-1 sm:row-start-2 lg:col-start-3 lg:row-start-2'],
  wide: ['sm:col-start-1 sm:row-start-3 lg:col-span-2 lg:col-start-2 lg:row-start-1', 'sm:col-start-2 sm:row-start-3 lg:col-span-2 lg:col-start-2 lg:row-start-1'],
  second: ['sm:col-start-2 sm:row-start-3 lg:col-span-2 lg:col-start-3 lg:row-start-2', 'sm:col-start-1 sm:row-start-3 lg:col-span-2 lg:col-start-1 lg:row-start-2'],
} as const;

const PhotoCell = ({ photo, className }: { photo: GalleryPhoto; className?: string }) => (
  <figure className={cn(cell, 'border border-line bg-surface', className)}>
    <div className={cn('relative min-h-40 flex-1 overflow-hidden', photo.caption && 'image-fade-b')}>
      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    </div>
    {photo.caption && <figcaption className="px-6 pb-6 pt-2 font-sans text-label uppercase text-ink-500">{photo.caption}</figcaption>}
  </figure>
);

export const GalleryBento = ({ photos, eyebrow, title, description, action, details, reverse = false, className }: GalleryBentoProps) => {
  const side = reverse ? 1 : 0;
  return (
    <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      <PhotoCell photo={photos.portrait} className={cn('min-h-96', PLACE.portrait[side])} />

      <div className={cn(cell, 'justify-between gap-6 border border-line bg-brand-gradient-dawn p-6 md:p-8 lg:p-6', PLACE.text[side])}>
        <div className="flex flex-col items-start gap-3">
          {eyebrow && (
            <Badge variant="outline" size="sm">
              {eyebrow}
            </Badge>
          )}
          <h3 className="font-display text-subheading text-ink-900">{title}</h3>
          <p className="font-sans text-body text-ink-600">{description}</p>
        </div>
        <Button
          variant={action.variant ?? 'text'}
          size={action.variant === 'secondary' ? 'small' : 'default'}
          href={action.href ?? '#'}
          className="group self-start"
          trailingIcon={<ArrowRight className="h-4 w-4 transition-transform duration-sm ease-out group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />}
        >
          {action.label}
        </Button>
      </div>

      <dl className={cn(cell, 'justify-center gap-4 bg-lavender-50 p-6 ring-1 ring-inset ring-lavender-200 md:p-8 lg:p-6', PLACE.details[side])}>
        {details.map(({ icon: Icon, label, value }) => (
          <div key={label}>
            <dt className="flex items-center gap-2 font-sans text-label uppercase text-ink-600">
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
              {label}
            </dt>
            <dd className="mt-1 pl-6 font-sans text-body text-ink-900">{value}</dd>
          </div>
        ))}
      </dl>

      <PhotoCell photo={photos.wide} className={cn('min-h-64', PLACE.wide[side])} />
      <PhotoCell photo={photos.second} className={cn('min-h-64', PLACE.second[side])} />
    </div>
  );
};
