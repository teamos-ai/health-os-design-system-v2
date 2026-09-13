/**
 * ActionCard: the one thing to do next. Booking a call, starting a diagnostic.
 *
 * Warm sunrise gradient by default (`tone="warm"`), or the soft wash (`tone="soft"`).
 * Add an image to split the card on wide screens. One action only: the primary button
 * in the neutral tone, which reads clearly on both gradients.
 */
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ActionCardProps {
  title: string;
  description: string;
  action: { label: string; href?: string };
  /** a short line under the button, e.g. what happens next */
  note?: string;
  tone?: 'warm' | 'soft';
  image?: { src: string; alt: string };
  className?: string;
}

export const ActionCard = ({ title, description, action, note, tone = 'warm', image, className }: ActionCardProps) => (
  <article
    className={cn(
      'group grid overflow-hidden rounded-lg',
      tone === 'warm' ? 'bg-brand-gradient-warm' : 'bg-brand-gradient-soft',
      image && 'md:grid-cols-2',
      className
    )}
  >
    <div className="flex flex-col items-start gap-4 p-8 md:p-10">
      <h3 className="max-w-md font-display text-subheading text-ink-900">{title}</h3>
      <p className="max-w-md font-sans text-body text-ink-900">{description}</p>
      <Button
        tone="neutral"
        href={action.href ?? '#'}
        className="mt-2"
        trailingIcon={<ArrowRight className="h-4 w-4 transition-transform duration-sm group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />}
      >
        {action.label}
      </Button>
      {note && <p className="font-sans text-label text-ink-900">{note}</p>}
    </div>
    {image && (
      <div className="relative hidden min-h-64 md:block">
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    )}
  </article>
);
