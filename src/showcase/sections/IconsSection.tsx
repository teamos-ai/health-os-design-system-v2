/**
 * IconsSection: intentionally empty. The icon library is being rebuilt as one filled set
 * in two sizes; this space stays blank until the new set is approved.
 */
import { Section, Usage } from '@/showcase/Section';

export const IconsSection = () => (
  <Section id="icons">
    <div className="overflow-hidden rounded-lg border border-dashed border-ink-200 bg-surface">
      <div className="min-h-80" aria-label="Reserved for the new icon library" role="img" />
      <Usage id="icons" compact className="border-dashed border-ink-200" />
    </div>
  </Section>
);
