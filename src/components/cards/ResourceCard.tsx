/**
 * ResourceCard: a guide, ebook, checklist or template someone can take away.
 *
 * A cover sits on the soft wash like a printed piece on a desk: the cover image with a
 * paper title strip (text never sits on the raw photo). Below: format and length, the
 * title, one sentence and a download action. Hover lifts the cover.
 */
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ResourceCardProps {
  /** Guide, Ebook, Checklist, Workbook, Template */
  type: string;
  title: string;
  description: string;
  cover: { src: string; alt: string };
  /** format and length, e.g. "PDF, 18 pages" */
  meta?: string;
  action: { label: string; href?: string };
  className?: string;
}

export const ResourceCard = ({ type, title, description, cover, meta, action, className }: ResourceCardProps) => (
  <article className={cn('group flex h-full flex-col rounded-lg border border-line bg-surface p-4 transition-shadow duration-md ease-out hover:shadow-sm', className)}>
    <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-brand-gradient-soft">
      <div className="relative flex h-5/6 aspect-[3/4] flex-col overflow-hidden rounded-md bg-surface shadow-md transition-[transform,box-shadow] duration-md ease-out group-hover:-translate-y-2 group-hover:shadow-lg">
        <img src={cover.src} alt={cover.alt} loading="lazy" decoding="async" className="min-h-0 flex-1 object-cover" />
        <div className="bg-surface px-3 py-2">
          <p className="font-sans text-label uppercase text-rose-700">{type}</p>
          <p className="truncate font-display text-body text-ink-900">{title}</p>
        </div>
      </div>
    </div>

    <div className="flex flex-1 flex-col gap-2 px-2 pb-2 pt-6">
      {meta && <p className="font-sans text-label uppercase text-ink-500">{meta}</p>}
      <h3 className="font-display text-subheading text-ink-900">{title}</h3>
      <p className="font-sans text-body text-ink-600">{description}</p>
      <Button
        variant="text"
        href={action.href ?? '#'}
        className="mt-auto self-start pt-4"
        leadingIcon={<Download className="h-4 w-4" strokeWidth={1.5} aria-hidden />}
      >
        {action.label}
      </Button>
    </div>
  </article>
);
