import { Shell } from '@/showcase/Shell';
import { TopBanner } from '@/components/layout/TopBanner';
import { HeroSection } from '@/showcase/sections/HeroSection';
import { VideoSection } from '@/showcase/sections/VideoSection';
import { OverviewSection } from '@/showcase/sections/OverviewSection';
import { TokensSection } from '@/showcase/sections/TokensSection';
import { LogoSection } from '@/showcase/sections/LogoSection';
import { IconsSection } from '@/showcase/sections/IconsSection';
import { ComponentsSection } from '@/showcase/sections/ComponentsSection';
import { CardsSection } from '@/showcase/sections/CardsSection';
import { WidgetsSection } from '@/showcase/sections/WidgetsSection';
import { SignatureSection } from '@/showcase/sections/SignatureSection';
import { CrmSection } from '@/showcase/sections/CrmSection';
import { BentoBoxSection } from '@/showcase/sections/BentoBoxSection';
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
    <Shell>
      {/* Top banner — the scrolling ticker, themed per mode (subtle / carbon / tint) */}
      <TopBanner />
      <HeroSection />
      <VideoSection />
      <OverviewSection />
      <TokensSection />
      <LogoSection />
      <IconsSection />
      <ComponentsSection />
      <CardsSection />
      <WidgetsSection />
      <SignatureSection />
      <CrmSection />
      <BentoBoxSection />
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
  );
}
