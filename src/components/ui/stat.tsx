/**
 * Stat: a single figure with its label, counting up once it scrolls into view.
 * Only for real, sourced numbers or clearly labelled sample data. Pass `display` for a
 * figure that is not a clean count (for example "3 of 5").
 */
import { CountUp } from '@/components/ui/animated';
import { cn } from '@/lib/utils';

export interface StatProps {
  /** number to count up to; ignored when `display` is set */
  value?: number;
  /** static figure shown instead of a count-up */
  display?: string;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  align?: 'left' | 'center';
  className?: string;
}

export const Stat = ({ value, display, label, prefix = '', suffix = '', decimals = 0, align = 'left', className }: StatProps) => (
  <div className={cn('flex flex-col gap-2', align === 'center' && 'items-center text-center', className)}>
    <span className="font-display text-heading text-ink-900">
      {display ?? <CountUp to={value ?? 0} prefix={prefix} suffix={suffix} decimals={decimals} />}
    </span>
    <span className="font-sans text-body text-ink-600">{label}</span>
  </div>
);
