/**
 * Showcase building blocks.
 *
 *   Section  a reference section: title and lead come from the catalogue by id
 *   Demo     a labelled frame around a live example
 *   Usage    purpose, when to use, when not to, API and source for one catalogue entry
 */
import type { ReactNode } from 'react';
import { FadeIn } from '@/components/ui/animated';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { entry, sectionMeta, SECTIONS, type CatalogEntry } from '@/showcase/catalog';

export interface SectionProps {
  id: string;
  /** override the catalogue title */
  title?: string;
  /** override the catalogue lead */
  lead?: string;
  children: ReactNode;
  className?: string;
}

/** The group eyebrow shows once, on the first section of each group, so labels stay rare. */
const opensGroup = (id: string) => {
  const i = SECTIONS.findIndex((s) => s.id === id);
  return i <= 0 || SECTIONS[i - 1].group !== SECTIONS[i].group;
};

export const Section = ({ id, title, lead, children, className }: SectionProps) => {
  const meta = sectionMeta(id);
  const heading = title ?? meta.title;
  const intro = lead ?? meta.lead;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('scroll-mt-8 border-b border-line px-6 py-16 md:px-12 md:py-24', className)}>
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <header className="mb-12 max-w-2xl">
            {opensGroup(id) && <p className="mb-3 font-sans text-label uppercase text-ink-500">{meta.group}</p>}
            <h2 id={`${id}-title`} className="font-display text-heading text-ink-900">
              {heading}
            </h2>
            {intro && <p className="mt-4 font-sans text-body text-ink-600">{intro}</p>}
          </header>
        </FadeIn>
        {children}
      </div>
    </section>
  );
};

/** A labelled frame around a live example. `action` sits top right. */
export const Demo = ({
  label,
  action,
  children,
  className,
  padded = true,
}: {
  label?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) => (
  <div className={cn('overflow-hidden rounded-lg border border-line bg-surface', className)}>
    {(label || action) && (
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-line bg-surface-2 px-4 py-2">
        {label ? <span className="font-sans text-label uppercase text-ink-500">{label}</span> : <span />}
        {action}
      </div>
    )}
    <div className={cn(padded && 'p-6 md:p-8')}>{children}</div>
  </div>
);

const STATUS: Record<CatalogEntry['status'], { label: string; variant: 'apricot' | 'neutral' } | null> = {
  stable: null,
  experimental: { label: 'Experimental', variant: 'apricot' },
  'in-progress': { label: 'In progress', variant: 'neutral' },
};

/** Usage guidance for one catalogue entry, shown under its example. */
export const Usage = ({ id, className, compact = false, columns = 2 }: { id: string; className?: string; compact?: boolean; columns?: 1 | 2 }) => {
  const e = entry(id);
  const status = STATUS[e.status];
  return (
    <div className={cn('border-t border-line bg-surface px-6 py-6 md:px-8', className)}>
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-body text-ink-900">{e.name}</h3>
        {status && (
          <Badge variant={status.variant} size="sm">
            {status.label}
          </Badge>
        )}
      </div>
      <p className="mt-1 max-w-reading font-sans text-body text-ink-600">{e.purpose}</p>
      {!compact && (
        <div className={cn('mt-5 grid gap-6', columns === 2 && 'md:grid-cols-2')}>
          <UsageList title="Use it for" items={e.use} />
          <UsageList title="Not for" items={e.avoid} />
        </div>
      )}
      <dl className="mt-5 grid gap-2 border-t border-line-soft pt-4 md:grid-cols-[auto_1fr] md:gap-x-6">
        <dt className="font-sans text-label uppercase text-ink-500">API</dt>
        <dd className="break-words font-sans text-label normal-case text-ink-900">{e.api}</dd>
        <dt className="font-sans text-label uppercase text-ink-500">Source</dt>
        <dd className="break-words font-sans text-label normal-case text-ink-600">{e.source}</dd>
      </dl>
    </div>
  );
};

const UsageList = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <p className="font-sans text-label uppercase text-ink-500">{title}</p>
    <ul className="mt-2 flex flex-col gap-2">
      {items.map((it) => (
        <li key={it} className="flex gap-3 font-sans text-body text-ink-600">
          <span aria-hidden className="mt-3 h-1 w-1 shrink-0 rounded-full bg-ink-400" />
          {it}
        </li>
      ))}
    </ul>
  </div>
);

/** A live example with its usage guidance: below it (stack) or beside it (split, from lg). */
export const Example = ({
  id,
  label,
  children,
  className,
  padded = true,
  compact,
  action,
  layout = 'stack',
}: {
  id: string;
  label?: string;
  children: ReactNode;
  className?: string;
  padded?: boolean;
  compact?: boolean;
  action?: ReactNode;
  layout?: 'stack' | 'split';
}) => (
  <div className={cn('overflow-hidden rounded-lg border border-line bg-surface', className)}>
    {(label || action) && (
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-line bg-surface-2 px-4 py-2">
        {label ? <span className="font-sans text-label uppercase text-ink-500">{label}</span> : <span />}
        {action}
      </div>
    )}
    <div className={cn(layout === 'split' && 'grid lg:grid-cols-2')}>
      <div className={cn('bg-paper', padded && 'p-6 md:p-8', layout === 'split' && 'flex items-center')}>
        <div className="w-full">{children}</div>
      </div>
      <Usage id={id} compact={compact} columns={layout === 'split' ? 1 : 2} className={cn(layout === 'split' && 'lg:border-l lg:border-t-0')} />
    </div>
  </div>
);
