/**
 * PricingCard: one plan. Name, price with currency and cadence, any one-off fee, what is
 * included, one action.
 *
 * `featured` marks the plan to recommend: the soft wash header, a badge and the primary
 * button. Only one featured card per set. Other plans use the secondary button.
 * Always label the currency and state anything charged on top.
 */
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PricingCardProps {
  name: string;
  price: string;
  /** e.g. "AUD / month" */
  cadence: string;
  /** a one-off fee or note under the price, e.g. "+ $997 AUD onboarding" */
  fee?: string;
  description: string;
  features: string[];
  action: { label: string; href?: string };
  featured?: boolean;
  className?: string;
}

export const PricingCard = ({ name, price, cadence, fee, description, features, action, featured = false, className }: PricingCardProps) => (
  <article
    className={cn(
      'flex h-full flex-col overflow-hidden rounded-lg border bg-surface transition-shadow duration-md ease-out',
      featured ? 'border-rose-400/60 shadow-md' : 'border-line hover:shadow-sm',
      className
    )}
  >
    <header className={cn('px-6 pb-6 pt-6', featured ? 'bg-brand-gradient-soft' : 'bg-surface-2')}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-sans text-label uppercase text-ink-900">{name}</h3>
        {featured && (
          <Badge variant="rose" size="sm">
            Recommended
          </Badge>
        )}
      </div>
      <p className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-heading text-ink-900">{price}</span>
        <span className="font-sans text-body text-ink-600">{cadence}</span>
      </p>
      {fee && <p className="mt-1 font-sans text-label text-ink-600">{fee}</p>}
    </header>

    <div className="flex flex-1 flex-col gap-6 p-6">
      <p className="font-sans text-body text-ink-600">{description}</p>
      <ul className="flex flex-col gap-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 font-sans text-body text-ink-900">
            <span className={cn('mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full', featured ? 'bg-rose-400 text-white' : 'bg-ink-100 text-ink-900')}>
              <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
            </span>
            {f}
          </li>
        ))}
      </ul>
      <Button variant={featured ? 'primary' : 'secondary'} href={action.href ?? '#'} className="mt-auto w-full">
        {action.label}
      </Button>
    </div>
  </article>
);
