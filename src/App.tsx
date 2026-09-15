import type { ComponentType } from 'react';
import { Shell } from '@/showcase/Shell';
import { ToastProvider } from '@/components/ui/toast';
import { TopBanner } from '@/components/layout/TopBanner';
import { NAV } from '@/showcase/registry';
import { HeroSection } from '@/showcase/sections/HeroSection';
import { VideoSection } from '@/showcase/sections/VideoSection';
import { OverviewSection } from '@/showcase/sections/OverviewSection';
import { ChecklistSection } from '@/showcase/sections/ChecklistSection';
import { TokensSection } from '@/showcase/sections/TokensSection';
import { HeadlinesSection } from '@/showcase/sections/HeadlinesSection';
import { LogoSection } from '@/showcase/sections/LogoSection';
import { IconsSection } from '@/showcase/sections/IconsSection';
import { MotionSection } from '@/showcase/sections/MotionSection';
import { ButtonsSection } from '@/showcase/sections/ButtonsSection';
import { BadgesSection } from '@/showcase/sections/BadgesSection';
import { ElementsSection } from '@/showcase/sections/ElementsSection';
import { CardsSection } from '@/showcase/sections/CardsSection';
import { FeaturesSection } from '@/showcase/sections/FeaturesSection';
import { BentosSection } from '@/showcase/sections/BentosSection';
import { BlocksSection } from '@/showcase/sections/BlocksSection';
import { WidgetsSection } from '@/showcase/sections/WidgetsSection';
import { SignatureSection } from '@/showcase/sections/SignatureSection';
import { BannersSection } from '@/showcase/sections/BannersSection';
import { BlogSection } from '@/showcase/sections/BlogSection';
import { LeadMagnetsSection } from '@/showcase/sections/LeadMagnetsSection';
import { CalculatorsSection } from '@/showcase/sections/CalculatorsSection';
import { SocialMediaSection } from '@/showcase/sections/SocialMediaSection';
import { MusicSection } from '@/showcase/sections/MusicSection';
import { BackgroundsSection } from '@/showcase/sections/BackgroundsSection';
import { ImageLibrarySection } from '@/showcase/sections/ImageLibrarySection';
import { LivePageSection } from '@/showcase/sections/LivePageSection';

/** Section id → component. Order and grouping come from the registry. */
const RENDER: Record<string, ComponentType> = {
  hero: HeroSection,
  video: VideoSection,
  overview: OverviewSection,
  checklist: ChecklistSection,
  tokens: TokensSection,
  headlines: HeadlinesSection,
  logo: LogoSection,
  icons: IconsSection,
  motion: MotionSection,
  buttons: ButtonsSection,
  badges: BadgesSection,
  elements: ElementsSection,
  'card-bento': CardsSection,
  features: FeaturesSection,
  bentos: BentosSection,
  blocks: BlocksSection,
  widgets: WidgetsSection,
  signature: SignatureSection,
  banners: BannersSection,
  blog: BlogSection,
  'lead-magnets': LeadMagnetsSection,
  calculators: CalculatorsSection,
  social: SocialMediaSection,
  music: MusicSection,
  backgrounds: BackgroundsSection,
  imagery: ImageLibrarySection,
  live: LivePageSection,
};

export default function App() {
  return (
    <ToastProvider>
      <Shell>
        <TopBanner />
        {NAV.map(({ id }) => {
          const Section = RENDER[id];
          return Section ? <Section key={id} /> : null;
        })}
      </Shell>
    </ToastProvider>
  );
}
