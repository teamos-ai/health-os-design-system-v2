/**
 * PricingCard: one plan. Name, price with currency and cadence, any one-off fee, what is
 * included, one action.
 *
 * `featured` marks the plan to recommend: the soft wash header, a badge and the primary
 * button. Only one featured card per set. Other plans use the secondary button.
 * Always label the currency and state anything charged on top.
 *
 * Prices are numbers so they can change calmly: when `billing` is annual and the plan has an
 * `annualPrice`, the figure slides to the price for the year and the cadence changes with it.
 * Health OS annual prices are the monthly price × 10 (two months free, confirmed by Tumai on
 * 15 September 2026). Never show an annual price the offer does not have.
 *
 * `guarantee` puts a promise in the card, immediately above the action, which is where a buyer
 * is holding the question it answers. It is a seal, a name and one line, and it belongs to the
 * plan it is made about rather than to the page: a guarantee two sections below the price is a
 * guarantee the buyer meets after deciding. Give it to one plan, not to all of them, or it stops
 * reading as a promise and starts reading as a disclaimer. Quote the promise whole, never a
 * shortened half of one, because a clipped guarantee is a different commitment.
 *
 * Always render cards through PricingTable, so every pricing view shares the same layout, the
 * rise into place, the billing switch and the confetti. The featured plan's action celebrates.
 */
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { IconTile } from '@/components/ui/icon-tile';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DURATION, EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';

export type Billing = 'monthly' | 'annual';

export interface PricingCardProps {
  name: string;
  /** an icon from the library beside the plan name, e.g. blocks, gold-star, crown */
  icon?: string;
  /** the monthly price, e.g. 297 */
  price: number;
  /** the price for a year paid in full, only if the offer has one (Health OS: monthly × 10) */
  annualPrice?: number;
  /** cadence beside the annual price, e.g. "AUD / year" (defaults to `cadence`) */
  annualCadence?: string;
  /** the symbol before the figure (default "$") */
  symbol?: string;
  /** e.g. "AUD / month" */
  cadence: string;
  /** a one-off fee or note under the price, e.g. "+ $997 AUD onboarding" */
  fee?: string;
  description: string;
  features: string[];
  /** the plan's one action. `celebrate` pops confetti on click; it defaults to on for the featured plan */
  action: { label: string; href?: string; onClick?: () => void; celebrate?: boolean };
  /** a promise about this plan, sealed and set above the action. `name` is its title, e.g. "30-day activation guarantee" */
  guarantee?: { name: string; text: string };
  featured?: boolean;
  /** set by a PricingTable with a billing switch */
  billing?: Billing;
  /** set by a PricingTable: the saving shown beside "Billed annually", e.g. "2 months free" */
  annualNote?: string;
  className?: string;
}

export const PricingCard = ({ name, icon, price, annualPrice, annualCadence, symbol = '$', cadence, fee, description, features, action, guarantee, featured = false, billing, annualNote, className }: PricingCardProps) => {
  const reduced = useReducedMotion();
  const annual = billing === 'annual' && annualPrice !== undefined;
  const shown = annual ? annualPrice : price;
  return (
    <article
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-lg border bg-surface transition-shadow duration-md ease-out',
        featured ? 'border-rose-200 shadow-sm' : 'border-line hover:shadow-sm',
        className
      )}
    >
      <header className={cn('px-6 pb-6 pt-6', featured ? 'bg-brand-gradient-soft' : 'bg-surface-2')}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {icon && <IconTile id={icon} size="xs" ground="white" />}
            <h3 className="font-sans text-label uppercase text-ink-900">{name}</h3>
          </div>
          {featured && (
            <Badge variant="rose" size="sm">
              Recommended
            </Badge>
          )}
        </div>
        {/* figure and cadence on their own lines, so a longer yearly price never reflows the cards */}
        <p className="mt-4 flex flex-col">
          <span className="relative inline-flex self-start overflow-hidden font-display text-heading tabular-nums text-ink-900">
            {symbol}
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={shown}
                initial={reduced ? { opacity: 0 } : { y: '0.5em', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduced ? { opacity: 0 } : { y: '-0.5em', opacity: 0 }}
                transition={{ duration: DURATION.lg, ease: EASE_OUT }}
              >
                {shown.toLocaleString('en-AU')}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="font-sans text-body text-ink-600">{annual ? (annualCadence ?? cadence) : cadence}</span>
        </p>
        {billing && (
          <p className="mt-1 font-sans text-label text-ink-600">
            {annual ? `Billed annually${annualNote ? `, ${annualNote}` : ''}` : 'Billed monthly'}
          </p>
        )}
        {fee && <p className="mt-1 font-sans text-label text-ink-600">{fee}</p>}
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <p className="font-sans text-body text-ink-600">{description}</p>
        <ul className="flex flex-col gap-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3 font-sans text-body text-ink-900">
              <span className={cn('mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full', featured ? 'bg-rose-50 text-ink-900 ring-1 ring-inset ring-rose-200' : 'bg-ink-100 text-ink-900')}>
                <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
              </span>
              {f}
            </li>
          ))}
        </ul>
        {/* THE SEAL, and nothing else.
            A guarantee is the one place on a pricing card where ornament is earned, and also the
            place it is most often overdone: a starburst, a drop shadow and a second colour turn a
            commitment into a sticker.

            IT WAS A ROSE-50 SLAB FIRST and that was wrong. Filled, it became the loudest thing in
            the card, louder than the price, which is the opposite of what a card like this should
            do. A guarantee reassures; it does not compete for the first look. White with the
            plan's own rose hairline contains it enough to read as a seal rather than a footnote,
            and the wax is then the only colour in the block, which is the whole point of putting
            it there. */}
        {guarantee && (
          <div className="mt-auto flex items-start gap-3.5 rounded-md border border-rose-200 bg-surface px-4 py-4">
            <IconTile id="red-wax-seal" size="xs" ground="white" className="shrink-0" />
            <span className="min-w-0">
              <span className="block font-sans text-label uppercase text-ink-600">{guarantee.name}</span>
              <span className="mt-1.5 block font-sans text-body text-ink-900">{guarantee.text}</span>
            </span>
          </div>
        )}

        <Button
          variant={featured ? 'primary' : 'secondary'}
          href={action.href}
          onClick={action.onClick}
          celebrate={action.celebrate ?? featured}
          className={cn('w-full', guarantee ? 'mt-0' : 'mt-auto')}
        >
          {action.label}
        </Button>
      </div>
    </article>
  );
};
