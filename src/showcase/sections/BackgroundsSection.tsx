/**
 * BackgroundsSection — the real Health OS background library: warm, abstract nature and
 * gradient fields for websites, landing pages and social, in both the web (16:9) and
 * social (9:16) ratios. Sourced from the marketing image library; each tile downloads the
 * full-resolution PNG. Tagged by colour family + subject for quick selection.
 */
import { Section } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { MonoLabel } from '@/components/ui/mono-label';
import { cn } from '@/lib/utils';
import { BACKGROUNDS_16x9, BACKGROUNDS_9x16, type Background } from '@/data/backgrounds';

const BgTile = ({ bg }: { bg: Background }) => (
  <a href={bg.src} download title={`Download ${bg.name} (PNG)`} className="group flex flex-col gap-2">
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-line bg-surface shadow-none transition group-hover:shadow-sm',
        bg.ratio === '16:9' ? 'aspect-[16/9]' : 'aspect-[9/16]'
      )}
    >
      <img
        src={bg.src}
        alt={bg.name}
        loading="lazy"
        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
      />
    </div>
    <p className="font-sans text-body-sm text-ink-700">{bg.name}</p>
    <div className="flex flex-wrap gap-1">
      {bg.colors.slice(0, 3).map((c) => (
        <Badge key={c} variant="outline" size="sm">
          {c}
        </Badge>
      ))}
    </div>
  </a>
);

export const BackgroundsSection = () => (
  <Section
    id="backgrounds"
    eyebrow="Assets"
    title="Backgrounds"
    lead="Warm, abstract background fields for websites, landing pages and social — sized for both wide web heroes (16:9) and tall social stories (9:16). Click any tile to download the full-resolution PNG."
  >
    {/* 16:9 — web & landing */}
    <div className="mb-14">
      <div className="mb-5 flex items-center gap-3">
        <MonoLabel>16:9 — web &amp; landing</MonoLabel>
        <Badge variant="neutral" size="sm">
          {BACKGROUNDS_16x9.length}
        </Badge>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BACKGROUNDS_16x9.map((bg) => (
          <BgTile key={bg.src} bg={bg} />
        ))}
      </div>
    </div>

    {/* 9:16 — social & stories */}
    <div>
      <div className="mb-5 flex items-center gap-3">
        <MonoLabel>9:16 — social &amp; stories</MonoLabel>
        <Badge variant="neutral" size="sm">
          {BACKGROUNDS_9x16.length}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {BACKGROUNDS_9x16.map((bg) => (
          <BgTile key={bg.src} bg={bg} />
        ))}
      </div>
    </div>
  </Section>
);
