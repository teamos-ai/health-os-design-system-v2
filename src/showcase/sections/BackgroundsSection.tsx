/**
 * BackgroundsSection — rough scaffold. Background fields for websites, landing pages and
 * social, in both the web (16:9) and social (9:16) ratios. Drafts stand in via the locked
 * gradient washes until real artwork lands.
 */
import { Section } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { MonoLabel } from '@/components/ui/mono-label';
import { ImageWash } from '@/components/ui/image-wash';
import { WASHES } from '@/data/imagery';

export const BackgroundsSection = () => (
  <Section
    id="backgrounds"
    eyebrow="Assets"
    title="Backgrounds"
    lead="Calm gradient and glow fields for websites, landing pages and social — sized for both wide web heroes and tall social stories. Rough scaffold for now."
  >
    <div className="mb-8 flex justify-center">
      <Badge variant="outline">Rough draft</Badge>
    </div>

    {/* 16:9 — web & landing */}
    <div className="mb-12">
      <MonoLabel>16:9 — web &amp; landing</MonoLabel>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WASHES.map((wash, i) => (
          <ImageWash
            key={`wide-${wash.name}`}
            background={wash.background}
            ratio="16/9"
            label={wash.name}
            dark={i === 5}
          />
        ))}
      </div>
    </div>

    {/* 9:16 — social & stories */}
    <div>
      <MonoLabel>9:16 — social &amp; stories</MonoLabel>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {WASHES.map((wash, i) => (
          <ImageWash
            key={`tall-${wash.name}`}
            background={wash.background}
            ratio="9/16"
            label={wash.name}
            dark={i === 5}
          />
        ))}
      </div>
    </div>
  </Section>
);
