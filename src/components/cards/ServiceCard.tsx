/**
 * ServiceCard: an offering a customer can buy or book. Image on one side with a crisp
 * edge (no fade), the offer on the other: name, what it is, the key details, one action.
 *
 * Image ratio is flexible and can sit left or right. Stacks image-first on small screens.
 * Hover eases the image forward; the action is the only link.
 */
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ServiceCardProps {
  title: string;
  description: string;
  image: { src: string; alt: string };
  category?: string;
  /** two or three facts, e.g. format, timeline, what is included */
  details?: { label: string; value: string }[];
  action: { label: string; href?: string };
  imagePosition?: 'left' | 'right';
  className?: string;
}

export const ServiceCard = ({
  title,
  description,
  image,
  category,
  details = [],
  action,
  imagePosition = 'left',
  className,
}: ServiceCardProps) => (
  <article
    className={cn(
      'group grid overflow-hidden rounded-lg border border-line bg-surface transition-[box-shadow,border-color] duration-md ease-out hover:border-ink-200 hover:shadow-sm md:grid-cols-2',
      className
    )}
  >
    <div className={cn('relative min-h-56 overflow-hidden', imagePosition === 'right' && 'md:order-2')}>
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-xl ease-out group-hover:scale-[1.03]"
      />
    </div>

    <div className="flex flex-col gap-4 p-6 md:p-8">
      {category && (
        <Badge variant="apricot" className="self-start">
          {category}
        </Badge>
      )}
      <div>
        <h3 className="font-display text-subheading text-ink-900">{title}</h3>
        <p className="mt-2 font-sans text-body text-ink-600">{description}</p>
      </div>
      {details.length > 0 && (
        <dl className="grid grid-cols-2 gap-4 border-t border-line pt-4">
          {details.map((d) => (
            <div key={d.label}>
              <dt className="font-sans text-label uppercase text-ink-500">{d.label}</dt>
              <dd className="mt-1 font-sans text-body text-ink-900">{d.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <Button
        variant="text"
        href={action.href ?? '#'}
        className="mt-auto self-start"
        trailingIcon={<ArrowRight className="h-4 w-4 transition-transform duration-sm group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />}
      >
        {action.label}
      </Button>
    </div>
  </article>
);
