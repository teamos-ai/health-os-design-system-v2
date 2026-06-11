import { Shell } from '@/showcase/Shell';
import { OverviewSection } from '@/showcase/sections/OverviewSection';
import { TokensSection } from '@/showcase/sections/TokensSection';
import { LogoSection } from '@/showcase/sections/LogoSection';
import { ComponentsSection } from '@/showcase/sections/ComponentsSection';
import { SignatureSection } from '@/showcase/sections/SignatureSection';
import { MotionSection } from '@/showcase/sections/MotionSection';
import { ImageLibrarySection } from '@/showcase/sections/ImageLibrarySection';
import { LivePageSection } from '@/showcase/sections/LivePageSection';

export default function App() {
  return (
    <Shell>
      <OverviewSection />
      <TokensSection />
      <LogoSection />
      <ComponentsSection />
      <SignatureSection />
      <MotionSection />
      <ImageLibrarySection />
      <LivePageSection />
    </Shell>
  );
}
