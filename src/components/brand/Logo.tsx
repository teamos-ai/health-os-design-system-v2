/**
 * The Health OS logo files, rendered exactly as supplied.
 *
 *   LogoMark  the gradient "OS" tile on its own (`/health-os-logo.png`). Favicons, navigation,
 *             avatars and anywhere space is square or tight.
 *   LogoLong  the long logo: HEALTH beside the OS tile, in a rounded frame, 2.8 : 1.
 *             `white` has a white fill inside a gradient edge; `filled` sits on the gradient
 *             with white letters. Headers, footers, email and documents with room to breathe.
 *
 * Both sit on the light and paper grounds as supplied. There is no dark ground.
 *
 * Asset note: `design-system/logo/health-os-logo.svg` is not a true vector (it embeds PNG
 * rasters behind masks), so the PNGs stay the shipped files until clean vectors exist.
 */
import { cn } from '@/lib/utils';

export interface LogoMarkProps {
  size?: number;
  className?: string;
}

export const LogoMark = ({ size = 36, className }: LogoMarkProps) => (
  <img
    src="/health-os-logo.png"
    alt="Health OS"
    width={size}
    height={size}
    draggable={false}
    className={cn('block select-none', className)}
    style={{ width: size, height: size }}
  />
);

/** Back-compat alias for the mark. */
export const Logo = LogoMark;

/** Width over height of the long logo files (1120 × 400). */
export const LOGO_LONG_RATIO = 2.8;

export interface LogoLongProps {
  /** white: white fill in a gradient edge. filled: the gradient fill with white letters. */
  variant?: 'white' | 'filled';
  /** rendered height in px; width follows the 2.8 : 1 ratio */
  height?: number;
  className?: string;
}

export const LogoLong = ({ variant = 'white', height = 40, className }: LogoLongProps) => (
  <img
    src={`/logo/health-os-long-${variant}.png`}
    alt="Health OS"
    width={Math.round(height * LOGO_LONG_RATIO)}
    height={height}
    draggable={false}
    className={cn('block select-none', className)}
    style={{ height, width: Math.round(height * LOGO_LONG_RATIO) }}
  />
);
