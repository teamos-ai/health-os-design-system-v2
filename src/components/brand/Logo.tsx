/**
 * LogoMark — the Health OS logo. This renders the exact shipped brand asset
 * (`/health-os-logo.png` — the gradient "OS" tile with its background removed). It
 * sits on light and dark grounds as-is, so it's used on its own everywhere, with no
 * wordmark. `inverse` is accepted for API compatibility but the mark is identical on
 * every ground.
 */
import { cn } from '@/lib/utils';

export interface LogoMarkProps {
  size?: number;
  className?: string;
  inverse?: boolean;
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

/** Back-compat alias — the mark is the logo; there is no separate wordmark lockup. */
export const Logo = LogoMark;
