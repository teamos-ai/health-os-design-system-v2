/**
 * Section — a showcase reference block. Anchor id, mono eyebrow, Spline Sans title and
 * a calm lead, then children. Generous rhythm so the reference reads like the system.
 */
import type { ReactNode } from 'react';
import { MonoLabel } from '@/components/ui/mono-label';
import { FadeIn } from '@/components/ui/animated';
import { cn } from '@/lib/utils';

export interface SectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}

export const Section = ({ id, eyebrow, title, lead, children, className }: SectionProps) => (
  <section id={id} className={cn('scroll-mt-8 border-b border-line px-6 py-16 md:px-12 md:py-20', className)}>
    <div className="mx-auto max-w-5xl">
      <FadeIn>
        <header className="mb-10 max-w-2xl">
          {eyebrow && <MonoLabel>{eyebrow}</MonoLabel>}
          <h2 className="mt-3 font-display text-h1 text-ink-900">{title}</h2>
          {lead && <p className="mt-4 font-sans text-body-lg leading-relaxed text-ink-600">{lead}</p>}
        </header>
      </FadeIn>
      {children}
    </div>
  </section>
);

/** Small labelled frame for embedding a live component demo. */
export const Demo = ({
  label,
  children,
  className,
  padded = true,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) => (
  <div className={cn('overflow-hidden rounded-xl border border-line bg-paper', className)}>
    {label && (
      <div className="border-b border-line bg-surface px-4 py-2.5">
        <span className="font-mono text-caption text-ink-500">{label}</span>
      </div>
    )}
    <div className={cn(padded && 'p-6 md:p-8')}>{children}</div>
  </div>
);
