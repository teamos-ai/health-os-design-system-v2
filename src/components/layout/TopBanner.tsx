/**
 * TopBanner: the thin scrolling banner at the top of the reference site. The one banner on
 * the soft wash, on both themes.
 */
import { Ticker } from '@/components/layout/Ticker';
import { TICKER_PRINCIPLES } from '@/data/system';

export const TopBanner = () => <Ticker items={TICKER_PRINCIPLES} reverse speed={36} />;
