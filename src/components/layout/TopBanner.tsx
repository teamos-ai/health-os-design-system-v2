/**
 * TopBanner: the thin scrolling banner at the top of the reference site.
 * Follows the theme: the subtle banner on light, the tint banner on paper.
 */
import { useTheme } from '@/lib/useTheme';
import { Ticker } from '@/components/layout/Ticker';
import { TICKER_ITEMS, TICKER_PRINCIPLES } from '@/data/system';

export const TopBanner = () => {
  const { theme } = useTheme();
  return theme === 'paper' ? (
    <Ticker items={TICKER_PRINCIPLES} tone="tint" reverse speed={36} />
  ) : (
    <Ticker items={TICKER_ITEMS} tone="subtle" speed={32} />
  );
};
