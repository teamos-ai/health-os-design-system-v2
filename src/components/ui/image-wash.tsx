/**
 * ImageWash — a draft image placeholder. A rounded tile carrying a CSS background wash
 * (gradient/glow from the signature family) under subtle grain, with an optional label
 * and icon. Stands in for photography until real shoots land.
 *
 * Prefer the tokenised `wash` prop — every value is built from the locked palette.
 * With a `label` the tile is announced as an image (`role="img"`); without one it is
 * decorative (`aria-hidden`).
 */
import type { LucideIcon } from 'lucide-react';
import { APRICOT, ROSE, LAVENDER, PAPER_IVORY, CARBON } from '@/lib/palette';
import { cn } from '@/lib/utils';

export type ImageWashName =
  | 'apricot'
  | 'rose'
  | 'lavender'
  | 'soft-gradient'
  | 'paper'
  | 'carbon';

/** Tokenised washes — built only from the locked palette, never ad-hoc hexes. */
const WASH_BG: Record<ImageWashName, string> = {
  apricot: `linear-gradient(135deg, ${APRICOT[50]} 0%, ${APRICOT[100]} 100%)`,
  rose: `linear-gradient(135deg, ${ROSE[50]} 0%, ${ROSE[100]} 100%)`,
  lavender: `linear-gradient(135deg, ${LAVENDER[50]} 0%, ${LAVENDER[100]} 100%)`,
  'soft-gradient': `linear-gradient(135deg, ${APRICOT[50]} 0%, ${ROSE[50]} 50%, ${LAVENDER[50]} 100%)`,
  paper: PAPER_IVORY,
  carbon: `linear-gradient(135deg, #2E2E2E 0%, ${CARBON} 100%)`, // #2E2E2E = carbon-700
};

export interface ImageWashProps {
  /**
   * Tokenised wash from the locked palette. Preferred over `background`.
   * Defaults to `soft-gradient` when neither prop is passed.
   */
  wash?: ImageWashName;
  /**
   * @deprecated Escape hatch for an arbitrary CSS background. Prefer `wash` so every
   * placeholder stays on the locked palette. Wins over `wash` when both are passed.
   */
  background?: string;
  label?: string;
  note?: string;
  icon?: LucideIcon;
  /** aspect ratio, e.g. '4/3', '16/9', '1/1' */
  ratio?: string;
  /**
   * White text/icon treatment. ONLY for the carbon (or an equally deep custom) wash —
   * white fails contrast on the light apricot/rose/lavender/paper washes.
   */
  dark?: boolean;
  className?: string;
}

export const ImageWash = ({
  wash,
  background,
  label,
  note,
  icon: Icon,
  ratio = '4/3',
  dark = false,
  className,
}: ImageWashProps) => (
  <div
    role={label ? 'img' : undefined}
    aria-label={label || undefined}
    aria-hidden={label ? undefined : true}
    className={cn('grain relative overflow-hidden rounded-lg border border-line', className)}
    style={{ background: background ?? WASH_BG[wash ?? 'soft-gradient'], aspectRatio: ratio }}
  >
    {(label || Icon) && (
      <div className="absolute inset-0 z-10 flex flex-col justify-end gap-1 p-4">
        {Icon && (
          <Icon
            className={cn('mb-1 h-5 w-5', dark ? 'text-white/80' : 'text-ink-700')}
            strokeWidth={1.5}
            aria-hidden
          />
        )}
        {label && (
          <span className={cn('font-display text-body-md font-medium', dark ? 'text-white' : 'text-ink-900')}>
            {label}
          </span>
        )}
        {note && (
          <span className={cn('font-mono text-caption', dark ? 'text-white/60' : 'text-ink-600')}>
            {note}
          </span>
        )}
      </div>
    )}
  </div>
);
