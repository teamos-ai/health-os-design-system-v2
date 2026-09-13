/**
 * Accent map for cards and tiles. The three brand colours plus a calm neutral, in the
 * lighter shades only (50 soft, 200 light), so cards never read loud. Full strength (400)
 * is kept for primary buttons, checked controls and focus rings, not for card colour.
 */
export type Accent = 'rose' | 'apricot' | 'lavender' | 'ink';

export interface AccentStyle {
  /** soft tonal well for an icon: tint background + light icon colour */
  well: string;
  /** icon and mark colour in the light shade. Not for text: text stays in ink */
  icon: string;
  /** solid dot or marker */
  dot: string;
  /** matching Badge variant */
  badge: 'rose' | 'apricot' | 'lavender' | 'neutral';
  /** soft field for media placeholders */
  wash: string;
}

export const ACCENTS: Record<Accent, AccentStyle> = {
  rose: { well: 'bg-rose-50 text-rose-200', icon: 'text-rose-200', dot: 'bg-rose-200', badge: 'rose', wash: 'bg-rose-50' },
  apricot: { well: 'bg-apricot-50 text-apricot-200', icon: 'text-apricot-200', dot: 'bg-apricot-200', badge: 'apricot', wash: 'bg-apricot-50' },
  lavender: { well: 'bg-lavender-50 text-lavender-200', icon: 'text-lavender-200', dot: 'bg-lavender-200', badge: 'lavender', wash: 'bg-lavender-50' },
  ink: { well: 'bg-ink-100 text-ink-900', icon: 'text-ink-900', dot: 'bg-ink-400', badge: 'neutral', wash: 'bg-ink-100' },
};
