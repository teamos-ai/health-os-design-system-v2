/**
 * TopBanner — the scrolling ticker at the very top of the design system. It swaps the
 * whole banner with the active theme (reads the live theme, so it changes instantly):
 *   • light (white)  → Subtle — outcomes, scrolling left
 *   • paper (ivory)  → Carbon — principles (black bar), scrolling right
 *   • dark  (carbon) → Tint — the craft, the gentle pastel wash
 */
import { useTheme } from '@/lib/useTheme';
import { Ticker } from '@/components/layout/Ticker';
import { TICKER_ITEMS, TICKER_PRINCIPLES, TICKER_CRAFT } from '@/data/system';

export const TopBanner = () => {
  const { theme } = useTheme();

  if (theme === 'paper') {
    return <Ticker items={TICKER_PRINCIPLES} tone="carbon" reverse speed={36} />;
  }
  if (theme === 'dark') {
    return <Ticker items={TICKER_CRAFT} tone="tint" speed={42} />;
  }
  return <Ticker items={TICKER_ITEMS} tone="subtle" speed={32} />;
};
