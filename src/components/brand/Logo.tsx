/**
 * Logo — Health OS mark + wordmark.
 *
 * The mark is a soft rounded-square gradient tile carrying "OS" (apricot → rose →
 * lavender, never reversed). The wordmark reads "Health OS" where OS picks up the
 * gradient. Light mode is primary; `inverse` flips the wordmark to white for the
 * dark-carbon footer. `variant="mark"` for the tile alone; `variant="lockup"` for
 * mark + wordmark.
 */
import { cn } from '@/lib/utils';

const GRAD_ID = 'hos2-mark-grad';

export const LogoMark = ({ size = 40, className }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Health OS"
  >
    <defs>
      <linearGradient id={GRAD_ID} x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5A060" />
        <stop offset="0.5" stopColor="#E85BA8" />
        <stop offset="1" stopColor="#A666D9" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="60" height="60" rx="16" fill={`url(#${GRAD_ID})`} />
    <text
      x="32"
      y="34"
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily="'Spline Sans', system-ui, sans-serif"
      fontWeight="700"
      fontSize="25"
      letterSpacing="-0.5"
      fill="#FFFFFF"
    >
      OS
    </text>
  </svg>
);

export interface LogoProps {
  variant?: 'mark' | 'lockup';
  size?: number;
  className?: string;
  inverse?: boolean;
}

export const Logo = ({ variant = 'lockup', size = 36, className, inverse = false }: LogoProps) => {
  if (variant === 'mark') return <LogoMark size={size} className={className} />;
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark size={size} />
      <span
        className={cn(
          'font-display font-bold tracking-tight leading-none',
          inverse ? 'text-white' : 'text-ink-900'
        )}
        style={{ fontSize: size * 0.52 }}
      >
        Health<span className="text-gradient"> OS</span>
      </span>
    </span>
  );
};
