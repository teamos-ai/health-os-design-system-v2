/**
 * Logo — Health OS "OS" mark.
 *
 * The mark is the bare "OS" glyph (Spline Sans, geometric) — no box. It carries the
 * apricot → rose → lavender gradient on light grounds and flips to white on dark
 * grounds via `inverse`. Used on its own across the system (no wordmark). The `Logo`
 * lockup (mark + "Health OS" wordmark) is kept for brand-kit completeness but the
 * product UI uses the standalone `LogoMark`.
 */
import { useId } from 'react';
import { cn } from '@/lib/utils';

export interface LogoMarkProps {
  size?: number;
  className?: string;
  /** white fill for dark/carbon grounds (default = gradient for light grounds) */
  inverse?: boolean;
}

export const LogoMark = ({ size = 36, className, inverse = false }: LogoMarkProps) => {
  const gradId = useId();
  return (
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
      {!inverse && (
        <defs>
          <linearGradient id={gradId} x1="8" y1="14" x2="56" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5A060" />
            <stop offset="0.5" stopColor="#E85BA8" />
            <stop offset="1" stopColor="#A666D9" />
          </linearGradient>
        </defs>
      )}
      <text
        x="32"
        y="34"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Spline Sans', system-ui, sans-serif"
        fontWeight="700"
        fontSize="42"
        letterSpacing="-1.5"
        fill={inverse ? '#FFFFFF' : `url(#${gradId})`}
      >
        OS
      </text>
    </svg>
  );
};

export interface LogoProps {
  variant?: 'mark' | 'lockup';
  size?: number;
  className?: string;
  inverse?: boolean;
}

/** Lockup (mark + wordmark) — kept for the brand kit; product UI uses LogoMark alone. */
export const Logo = ({ variant = 'lockup', size = 36, className, inverse = false }: LogoProps) => {
  if (variant === 'mark') return <LogoMark size={size} className={className} inverse={inverse} />;
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark size={size} inverse={inverse} />
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
