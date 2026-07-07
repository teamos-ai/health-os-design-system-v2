/**
 * Stat — a big outcome number with a calm label. Uses CountUp (reduced-motion safe).
 * For the "6–8 tools → 1 · 10–15 hrs returned · live in 30 days" outcome band.
 * Pass a non-numeric `display` (e.g. "30 days") when the figure isn't a clean count.
 */
import { CountUp } from '@/components/ui/animated';
import { cn } from '@/lib/utils';

export interface StatProps {
  /**
   * Numeric value to count up to. Ignored whenever `display` is set —
   * `display` always wins over `value`.
   */
  value?: number;
  /**
   * Static display string rendered instead of a count-up, e.g. "6–8 → 1".
   * Takes precedence over `value` (and `prefix`/`suffix`/`decimals`).
   */
  display?: string;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  align?: 'left' | 'center';
  className?: string;
}

export const Stat = ({
  value,
  display,
  label,
  prefix = '',
  suffix = '',
  decimals = 0,
  align = 'left',
  className,
}: StatProps) => (
  <div className={cn('flex flex-col gap-1.5', align === 'center' && 'items-center text-center', className)}>
    <span
      className="font-display text-display-lg leading-none text-ink-900"
      aria-label={display ?? `${prefix}${(value ?? 0).toFixed(decimals)}${suffix}`}
    >
      {display ?? (
        <CountUp to={value ?? 0} prefix={prefix} suffix={suffix} decimals={decimals} />
      )}
    </span>
    <span className="font-mono text-body-sm text-ink-600">{label}</span>
  </div>
);
