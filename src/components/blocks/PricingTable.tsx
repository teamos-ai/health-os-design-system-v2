/**
 * PricingTable: a row of PricingCards. Two or three plans, one featured.
 * Put the currency and anything charged on top in the note below the table.
 *
 * Motion: as the table scrolls into view the cards rise into place. From md up the featured
 * plan settles slightly forward and the plans beside it slightly back and in, so the eye lands
 * on the recommendation; on phones the cards simply rise in order. Reduced motion shows them
 * at rest.
 *
 * Billing switch: when every plan has an `annualPrice`, a switch appears above the cards.
 * Turning annual billing on slides each price to its annual figure and marks the moment with
 * a small burst of confetti in the soft brand colours. The switch never appears for plans
 * without a recorded annual price, so a table cannot invent one.
 */
import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PricingCard, type Billing, type PricingCardProps } from '@/components/cards';
import { Switch } from '@/components/ui/switch';
import { useCelebrate } from '@/components/ui/celebrate';
import { cn } from '@/lib/utils';

export interface PricingTableProps {
  plans: PricingCardProps[];
  /** a line under the table, e.g. usage charges or currency */
  note?: string;
  /** label beside the billing switch (shown only when every plan has an annualPrice) */
  annualLabel?: string;
  /** a short fact beside the label, only if the database records it */
  annualNote?: string;
  className?: string;
}

const useWide = () => {
  const [wide, setWide] = React.useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches);
  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => setWide(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return wide;
};

export const PricingTable = ({ plans, note, annualLabel = 'Annual billing', annualNote, className }: PricingTableProps) => {
  const [billing, setBilling] = React.useState<Billing>('monthly');
  const switchRef = React.useRef<HTMLSpanElement>(null);
  const { celebrate, confetti } = useCelebrate();
  const reduced = useReducedMotion();
  const wide = useWide();
  const hasAnnual = plans.length > 0 && plans.every((p) => p.annualPrice !== undefined);
  const featuredIndex = plans.findIndex((p) => p.featured);

  const settle = (i: number) => {
    if (!wide || featuredIndex < 0) return { y: 0, x: 0, scale: 1, opacity: 1 };
    if (i === featuredIndex) return { y: -16, x: 0, scale: 1, opacity: 1 };
    return { y: 0, x: i < featuredIndex ? 16 : -16, scale: 0.96, opacity: 1 };
  };

  return (
    <div className={className}>
      {hasAnnual && (
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          <span ref={switchRef} className="inline-flex">
            <Switch
              label={annualLabel}
              checked={billing === 'annual'}
              onCheckedChange={(on) => {
                setBilling(on ? 'annual' : 'monthly');
                if (on) celebrate(switchRef.current);
              }}
            />
          </span>
          {annualNote && <span className="font-sans text-label text-ink-600">{annualNote}</span>}
          <span className="sr-only" aria-live="polite">
            {billing === 'annual' ? 'Showing prices billed annually' : 'Showing prices billed monthly'}
          </span>
        </div>
      )}
      <div className={cn('grid gap-6', plans.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3')}>
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            className={cn('relative', i === featuredIndex ? 'z-10' : 'z-0', wide && featuredIndex >= 0 && i !== featuredIndex && (i < featuredIndex ? 'origin-right' : 'origin-left'))}
            initial={reduced ? false : { y: 48, opacity: 0 }}
            whileInView={settle(i)}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: 'spring', stiffness: 100, damping: 30, delay: wide ? 0.1 : i * 0.08, opacity: { duration: 0.4 } }}
          >
            <PricingCard {...plan} billing={hasAnnual ? billing : undefined} />
          </motion.div>
        ))}
      </div>
      {note && <p className="mt-6 text-center font-sans text-label text-ink-500">{note}</p>}
      {confetti}
    </div>
  );
};
