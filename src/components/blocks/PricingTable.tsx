/**
 * PricingTable: a row of PricingCards. Two or three plans, one featured.
 * Put the currency and anything charged on top in the note below the table.
 */
import { PricingCard, type PricingCardProps } from '@/components/cards';
import { cn } from '@/lib/utils';

export interface PricingTableProps {
  plans: PricingCardProps[];
  /** a line under the table, e.g. usage charges or currency */
  note?: string;
  className?: string;
}

export const PricingTable = ({ plans, note, className }: PricingTableProps) => (
  <div className={className}>
    <div className={cn('grid gap-6', plans.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3')}>
      {plans.map((plan) => (
        <PricingCard key={plan.name} {...plan} />
      ))}
    </div>
    {note && <p className="mt-6 text-center font-sans text-label text-ink-500">{note}</p>}
  </div>
);
