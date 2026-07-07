/**
 * PricingTable — Health OS v2 marketing block.
 *
 * Up to three tiers. The recommended tier is emphasised with colour and a badge (not just
 * extra height, per the redesign rules): a `brand-400` hairline, a "Recommended" badge, and
 * a primary CTA — the others use the secondary CTA. Feature lists start at the same Y across
 * columns (fixed-height title/price block). Prices use `tabular-nums`. Flat cards, hairline,
 * `rounded-xl`; the recommended card lifts with `shadow-md`.
 */
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface PricingTier {
  name: string;
  price: string;
  cadence?: string;
  blurb: string;
  features: string[];
  cta: string;
  ctaHref?: string;
  recommended?: boolean;
}

export interface PricingTableProps {
  tiers: PricingTier[];
  className?: string;
}

export const PricingTable = ({ tiers, className }: PricingTableProps) => (
  <div className={cn('grid gap-6 md:grid-cols-3', className)}>
    {tiers.map((tier) => (
      <div
        key={tier.name}
        className={cn(
          'flex flex-col rounded-xl border bg-surface p-6 transition-shadow duration-md ease-out',
          tier.recommended ? 'border-brand-400 shadow-md' : 'border-line'
        )}
      >
        {/* Fixed-height header so feature lists align across columns */}
        <div className="min-h-[132px]">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-h4 text-ink-900">{tier.name}</h3>
            {tier.recommended && (
              <Badge variant="brand" size="sm">
                Recommended
              </Badge>
            )}
          </div>
          <p className="mt-3 flex items-baseline gap-1">
            <span className="font-display text-h1 tabular-nums text-ink-900">{tier.price}</span>
            {tier.cadence && <span className="font-mono text-caption text-ink-500">{tier.cadence}</span>}
          </p>
          <p className="mt-2 font-mono text-body-sm leading-relaxed text-ink-600">{tier.blurb}</p>
        </div>

        <ul className="mt-6 flex flex-1 flex-col gap-3">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 font-mono text-body-sm text-ink-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={1.5} aria-hidden />
              {f}
            </li>
          ))}
        </ul>

        <Button
          variant={tier.recommended ? 'primary' : 'secondary'}
          className="mt-6 w-full rounded-full"
          {...(tier.ctaHref ? { as: 'a' as const, href: tier.ctaHref } : {})}
        >
          {tier.cta}
        </Button>
      </div>
    ))}
  </div>
);
