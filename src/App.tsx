import { Shell } from '@/showcase/Shell';
import { Ticker } from '@/components/layout/Ticker';
import { HeroSection } from '@/showcase/sections/HeroSection';
import { OverviewSection } from '@/showcase/sections/OverviewSection';
import { TokensSection } from '@/showcase/sections/TokensSection';
import { LogoSection } from '@/showcase/sections/LogoSection';
import { ComponentsSection } from '@/showcase/sections/ComponentsSection';
import { SignatureSection } from '@/showcase/sections/SignatureSection';
import { BannersSection } from '@/showcase/sections/BannersSection';
import { MotionSection } from '@/showcase/sections/MotionSection';
import { ImageLibrarySection } from '@/showcase/sections/ImageLibrarySection';
import { LivePageSection } from '@/showcase/sections/LivePageSection';

export default function App() {
  return (
    <Shell>
      {/* Top banner — the scrolling ticker at the top of the design system */}
      <Ticker />
      <HeroSection />
      <OverviewSection />
      <TokensSection />
      <LogoSection />
      <ComponentsSection />
      <SignatureSection />
      <BannersSection />
      <MotionSection />
      <ImageLibrarySection />
      <LivePageSection />
    </Shell>
  );
}
