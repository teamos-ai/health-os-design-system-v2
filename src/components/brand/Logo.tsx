/**
 * LogoMark — the Health OS logo. This renders the exact shipped brand asset
 * (`/health-os-logo.png` — the gradient "OS" tile with its background removed). It
 * sits on light and dark grounds as-is, so it's used on its own everywhere, with no
 * wordmark.
 *
 * Asset note: `design-system/logo/health-os-logo.svg` is not a true vector — it is a
 * 2.6MB export that embeds base64 PNG rasters behind masks (no `<path>` data) — so
 * the PNG stays the shipped file until a clean vector mark exists.
 */
import { cn } from '@/lib/utils';

export interface LogoMarkProps {
  size?: number;
  className?: string;
  /**
   * Deliberate no-op. Per `design-system/logo/usage.md` the gradient mark is
   * ground-agnostic — it holds unchanged on paper, surface and carbon. Only the
   * wordmark flips to white on carbon, and this component never renders the
   * wordmark, so there is nothing to invert.
   */
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
