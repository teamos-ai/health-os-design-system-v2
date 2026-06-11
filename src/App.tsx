import { Shell } from '@/showcase/Shell';
import { Ticker } from '@/components/layout/Ticker';
import { HeroSection } from '@/showcase/sections/HeroSection';
import { VideoSection } from '@/showcase/sections/VideoSection';
import { OverviewSection } from '@/showcase/sections/OverviewSection';
import { TokensSection } from '@/showcase/sections/TokensSection';
import { LogoSection } from '@/showcase/sections/LogoSection';
import { IconsSection } from '@/showcase/sections/IconsSection';
import { ComponentsSection } from '@/showcase/sections/ComponentsSection';
import { SignatureSection } from '@/showcase/sections/SignatureSection';
import { BentoBoxSection } from '@/showcase/sections/BentoBoxSection';
import { BannersSection } from '@/showcase/sections/BannersSection';
import { BlogSection } from '@/showcase/sections/BlogSection';
import { CalculatorsSection } from '@/showcase/sections/CalculatorsSection';
import { SocialMediaSection } from '@/showcase/sections/SocialMediaSection';
import { BackgroundsSection } from '@/showcase/sections/BackgroundsSection';
import { ImageLibrarySection } from '@/showcase/sections/ImageLibrarySection';
import { NotionSection } from '@/showcase/sections/NotionSection';
import { MotionSection } from '@/showcase/sections/MotionSection';
import { LivePageSection } from '@/showcase/sections/LivePageSection';

export default function App() {
  return (
    <Shell>
      {/* Top banner — the scrolling ticker at the top of the design system */}
      <Ticker />
      <HeroSection />
      <VideoSection />
      <OverviewSection />
      <TokensSection />
      <LogoSection />
      <IconsSection />
      <ComponentsSection />
      <SignatureSection />
      <BentoBoxSection />
      <BannersSection />
      <BlogSection />
      <CalculatorsSection />
      <SocialMediaSection />
      <BackgroundsSection />
      <ImageLibrarySection />
      <NotionSection />
      <MotionSection />
      <LivePageSection />
    </Shell>
  );
}
