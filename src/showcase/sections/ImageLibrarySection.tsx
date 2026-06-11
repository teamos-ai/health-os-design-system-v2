/**
 * ImageLibrarySection — photography buckets + the draft CSS background washes that
 * stand in until real shoots land. Calm, warm, real direction; gradients built only
 * from the locked apricot/rose/lavender family.
 */
import { Section } from '@/showcase/Section';
import { MonoLabel } from '@/components/ui/mono-label';
import { ImageWash } from '@/components/ui/image-wash';
import { IMAGE_BUCKETS, WASHES } from '@/data/imagery';

export const ImageLibrarySection = () => (
  <Section
    id="imagery"
    eyebrow="Imagery"
    title="Image library"
    lead="Six buckets of calm, real photography, plus the gradient + glow washes that fill in for them while shoots are produced. Never stock-smiley, never glassy."
  >
    <div className="mb-12">
      <MonoLabel>Photography buckets</MonoLabel>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {IMAGE_BUCKETS.map((bucket) => (
          <div key={bucket.name}>
            <ImageWash
              background={WASHES[bucket.wash].background}
              icon={bucket.icon}
              dark={bucket.wash === 5}
              ratio="4/3"
            />
            <h3 className="mt-3 font-display text-h4 text-ink-900">{bucket.name}</h3>
            <p className="mt-1 font-sans text-body-sm leading-relaxed text-ink-600">{bucket.description}</p>
          </div>
        ))}
      </div>
    </div>

    <div>
      <MonoLabel>Background washes — drafts</MonoLabel>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {WASHES.map((wash) => (
          <div key={wash.name}>
            <div
              className="h-24 rounded-lg border border-line"
              style={{ background: wash.background }}
            />
            <p className="mt-2 font-mono text-caption text-ink-700">{wash.name}</p>
            <p className="font-mono text-[10px] text-ink-600">{wash.note}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);
