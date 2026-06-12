/**
 * Accent map — the disciplined apricot / rose / lavender / gold three-and-a-bit
 * family. Keeps every tonal surface (icon wells, badges, dots) on locked tokens so
 * nothing drifts to a hard-coded colour. `ink` is the calm neutral option.
 */
export type Accent = 'rose' | 'apricot' | 'lavender' | 'gold' | 'ink';

export interface AccentStyle {
  /** soft tonal well for an icon (bg + icon colour) */
  well: string;
  /** same-hue text */
  text: string;
  /** solid dot / marker */
  dot: string;
  /** matching Badge variant */
  badge: 'brand' | 'apricot' | 'lavender' | 'gold' | 'neutral';
  /** soft tonal field — the graceful media placeholder wash (a diagonal
   *  50 → 100 tint built from locked tokens) shown until a real photo lands */
  wash: string;
  /** decorative icon colour to sit on the `wash` field */
  washIcon: string;
}

export const ACCENTS: Record<Accent, AccentStyle> = {
  rose: { well: 'bg-rose-50 text-brand-600', text: 'text-brand-700', dot: 'bg-brand-400', badge: 'brand', wash: 'bg-gradient-to-br from-rose-50 to-brand-100', washIcon: 'text-brand-400' },
  apricot: { well: 'bg-apricot-50 text-apricot-600', text: 'text-apricot-700', dot: 'bg-apricot-400', badge: 'apricot', wash: 'bg-gradient-to-br from-apricot-50 to-apricot-200', washIcon: 'text-apricot-400' },
  lavender: { well: 'bg-lavender-50 text-lavender-600', text: 'text-lavender-700', dot: 'bg-lavender-400', badge: 'lavender', wash: 'bg-gradient-to-br from-lavender-50 to-lavender-200', washIcon: 'text-lavender-400' },
  gold: { well: 'bg-gold-100 text-gold-800', text: 'text-gold-800', dot: 'bg-gold-400', badge: 'gold', wash: 'bg-gradient-to-br from-gold-100 to-apricot-100', washIcon: 'text-gold-400' },
  ink: { well: 'bg-ink-100 text-ink-700', text: 'text-ink-700', dot: 'bg-ink-400', badge: 'neutral', wash: 'bg-gradient-to-br from-ink-100 to-ink-200', washIcon: 'text-ink-400' },
};
