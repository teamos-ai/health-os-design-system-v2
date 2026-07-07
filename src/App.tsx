import { Shell } from '@/showcase/Shell';
import { ToastProvider } from '@/components/ui/toast';
import { TopBanner } from '@/components/layout/TopBanner';
import { HeroSection } from '@/showcase/sections/HeroSection';
import { VideoSection } from '@/showcase/sections/VideoSection';
import { OverviewSection } from '@/showcase/sections/OverviewSection';
import { TokensSection } from '@/showcase/sections/TokensSection';
import { LogoSection } from '@/showcase/sections/LogoSection';
import { IconsSection } from '@/showcase/sections/IconsSection';
import { ButtonsSection } from '@/showcase/sections/ButtonsSection';
import { BadgesSection } from '@/showcase/sections/BadgesSection';
import { ElementsSection } from '@/showcase/sections/ElementsSection';
import { CardsSection } from '@/showcase/sections/CardsSection';
import { BlocksSection } from '@/showcase/sections/BlocksSection';
import { WidgetsSection } from '@/showcase/sections/WidgetsSection';
import { SignatureSection } from '@/showcase/sections/SignatureSection';
import { BannersSection } from '@/showcase/sections/BannersSection';
import { BlogSection } from '@/showcase/sections/BlogSection';
import { CalculatorsSection } from '@/showcase/sections/CalculatorsSection';
import { SocialMediaSection } from '@/showcase/sections/SocialMediaSection';
import { BackgroundsSection } from '@/showcase/sections/BackgroundsSection';
import { ImageLibrarySection } from '@/showcase/sections/ImageLibrarySection';
import { MemojisSection } from '@/showcase/sections/MemojisSection';
import { NotionSection } from '@/showcase/sections/NotionSection';
import { MotionSection } from '@/showcase/sections/MotionSection';
import { LivePageSection } from '@/showcase/sections/LivePageSection';

export default function App() {
  return (
    <ToastProvider>
      <Shell>
        {/* Top banner — the scrolling ticker, themed per mode (subtle / carbon / tint) */}
        <TopBanner />
        <HeroSection />
        <VideoSection />
        <OverviewSection />
        <TokensSection />
        <LogoSection />
        <IconsSection />
        <ButtonsSection />
        <BadgesSection />
        <ElementsSection />
        <CardsSection />
        <BlocksSection />
        <WidgetsSection />
        <SignatureSection />
        <BannersSection />
        <BlogSection />
        <CalculatorsSection />
        <SocialMediaSection />
        <BackgroundsSection />
        <ImageLibrarySection />
        <MemojisSection />
        <NotionSection />
        <MotionSection />
        <LivePageSection />
      </Shell>
    </ToastProvider>
  );
}
