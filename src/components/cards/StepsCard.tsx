/**
 * StepsCard: what happens, in order. Onboarding, a program's shape, how a service runs.
 *
 * Remodelled from the 21st.dev how-it-works timelines. One card holds three to five steps
 * on a dashed hairline. Each step has a quiet neutral node with its number, a title and one
 * sentence. Inside the product, `current` marks where someone is: earlier steps show a tick
 * and the current node fills with apricot, because progress is a state. Steps rise in once as the card comes into view.
 * No percentages or promised timeframes.
 */
import { Check } from 'lucide-react';
import { Stagger, StaggerItem } from '@/components/ui/animated';
import { cn } from '@/lib/utils';

export interface StepsCardProps {
  title: string;
  intro?: string;
  /** three to five steps */
  steps: { title: string; detail: string }[];
  /** zero-based index of the step someone is on (product use only) */
  current?: number;
  className?: string;
}

export const StepsCard = ({ title, intro, steps, current, className }: StepsCardProps) => (
  <article className={cn('flex h-full flex-col rounded-lg border border-line bg-surface p-6 md:p-8', className)}>
    <h3 className="font-display text-subheading text-ink-900">{title}</h3>
    {intro && <p className="mt-2 max-w-reading font-sans text-body text-ink-600">{intro}</p>}

    <Stagger as="ol" className="relative mt-8 flex flex-col gap-6" amount={0.3}>
      {steps.map((step, i) => {
        const done = current !== undefined && i < current;
        const isCurrent = current === i;
        const last = i === steps.length - 1;
        return (
          <StaggerItem key={step.title} as="li" className="relative flex gap-4" aria-current={isCurrent ? 'step' : undefined}>
            {!last && <span aria-hidden className="absolute -bottom-6 left-4 top-8 -ml-px border-l border-dashed border-ink-200" />}
            <span
              className={cn(
                'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-sans text-label text-ink-900 ring-1 ring-inset',
                isCurrent ? 'bg-apricot-200 ring-apricot-200' : 'bg-ink-100 ring-ink-200'
              )}
            >
              {done ? <Check className="h-4 w-4" strokeWidth={2} aria-label="Done" /> : String(i + 1).padStart(2, '0')}
            </span>
            <div className="pt-1">
              <p className="font-display text-body text-ink-900">{step.title}</p>
              <p className="mt-1 font-sans text-body text-ink-600">{step.detail}</p>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  </article>
);
