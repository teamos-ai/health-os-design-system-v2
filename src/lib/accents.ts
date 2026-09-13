/**
 * Accent map. The three brand colours plus a calm neutral, each expressed with the
 * three shades only (50 soft, 400 base, 700 deep), so tonal surfaces never drift.
 */
export type Accent = 'rose' | 'apricot' | 'lavender' | 'ink';

export interface AccentStyle {
  /** soft tonal well for an icon: tint background + deep icon colour */
  well: string;
  /** same-hue readable text */
  text: string;
  /** solid dot or marker */
  dot: string;
  /** matching Badge variant */
  badge: 'rose' | 'apricot' | 'lavender' | 'neutral';
  /** soft field for media placeholders */
  wash: string;
}

export const ACCENTS: Record<Accent, AccentStyle> = {
  rose: { well: 'bg-rose-50 text-rose-700', text: 'text-rose-700', dot: 'bg-rose-400', badge: 'rose', wash: 'bg-rose-50' },
  apricot: { well: 'bg-apricot-50 text-apricot-700', text: 'text-apricot-700', dot: 'bg-apricot-400', badge: 'apricot', wash: 'bg-apricot-50' },
  lavender: { well: 'bg-lavender-50 text-lavender-700', text: 'text-lavender-700', dot: 'bg-lavender-400', badge: 'lavender', wash: 'bg-lavender-50' },
  ink: { well: 'bg-ink-100 text-ink-900', text: 'text-ink-900', dot: 'bg-ink-400', badge: 'neutral', wash: 'bg-ink-100' },
};
