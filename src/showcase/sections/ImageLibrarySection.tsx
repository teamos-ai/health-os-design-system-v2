/**
 * ImageLibrarySection — the Health OS people & lifestyle photo library, grouped by theme
 * (Active & Fitness, Social & Wellness, Work & Content Creation) and tagged for asset
 * selection. Each tile downloads the full-resolution PNG. The brand gradient + glow washes
 * remain below for moments a photograph would be too loud.
 */
import { Section } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { MonoLabel } from '@/components/ui/mono-label';
import { PHOTOS, PHOTO_THEMES, type Photo } from '@/data/photos';
import { WASHES } from '@/data/imagery';

const PhotoTile = ({ p }: { p: Photo }) => (
  <a href={p.src} download title={`Download ${p.name} (PNG)`} className="group flex flex-col gap-2">
    <div className="aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface shadow-none transition group-hover:shadow-sm">
      <img
        src={p.src}
        alt={p.name}
        loading="lazy"
        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
      />
    </div>
    <p className="font-sans text-body-sm text-ink-700">{p.name}</p>
    <div className="flex flex-wrap items-center gap-1">
      <Badge variant="outline" size="sm">
        {p.ratio}
      </Badge>
      {p.tags.slice(0, 2).map((t) => (
        <Badge key={t} variant="neutral" size="sm">
          {t}
        </Badge>
      ))}
    </div>
  </a>
);

export const ImageLibrarySection = () => (
  <Section
    id="imagery"
    eyebrow="Imagery"
    title="Image library"
    lead="Real Health OS photography, grouped by theme and tagged for quick selection. Click any tile to download the full-resolution PNG. The brand washes below stand in when a photograph would be too loud."
  >
    {PHOTO_THEMES.map((theme) => {
      const items = PHOTOS.filter((p) => p.theme === theme);
      return (
        <div key={theme} className="mb-14">
          <div className="mb-5 flex items-center gap-3">
            <MonoLabel>{theme}</MonoLabel>
            <Badge variant="neutral" size="sm">
              {items.length}
            </Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <PhotoTile key={p.src} p={p} />
            ))}
          </div>
        </div>
      );
    })}

    {/* Brand washes — abstract fills for when a photograph would be too loud */}
    <div>
      <MonoLabel>Brand washes</MonoLabel>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {WASHES.map((wash) => (
          <div key={wash.name}>
            <div className="h-24 rounded-lg border border-line" style={{ background: wash.background }} />
            <p className="mt-2 font-mono text-caption text-ink-700">{wash.name}</p>
            <p className="font-mono text-[10px] text-ink-600">{wash.note}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);
