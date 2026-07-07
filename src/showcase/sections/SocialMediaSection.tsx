/**
 * SocialMediaSection — rough scaffold. What our social media looks like, plus links out to
 * the generators (to be built later). Example posts use the locked gradient washes as
 * stand-ins until real artwork lands.
 */
import { Section } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MonoLabel } from '@/components/ui/mono-label';
import { ImageWash } from '@/components/ui/image-wash';
import { WASHES } from '@/data/imagery';

const POSTS = [
  { wash: 0, ratio: '1/1', label: 'Feed post' },
  { wash: 1, ratio: '1/1', label: 'Quote card' },
  { wash: 2, ratio: '9/16', label: 'Story' },
  { wash: 4, ratio: '9/16', label: 'Reel cover' },
];

export const SocialMediaSection = () => (
  <Section
    id="social"
    eyebrow="Assets"
    title="Social media"
    lead="Calm, on-brand posts and stories that look like the rest of the system — and a generator to spin them up fast. Rough scaffold for now."
  >
    <div className="mb-8 flex justify-center">
      <Badge variant="outline">Rough draft</Badge>
    </div>

    <MonoLabel>Example posts</MonoLabel>
    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {POSTS.map((post) => (
        <ImageWash
          key={post.label}
          background={WASHES[post.wash].background}
          ratio={post.ratio}
          label={post.label}
          dark={post.wash === 4}
        />
      ))}
    </div>

    {/* Generators are on the roadmap — buttons stay honestly disabled until they exist */}
    <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <Button variant="primary" disabled title="Coming soon">
        Social media generator — coming soon
      </Button>
      <Button variant="secondary" disabled title="Coming soon">
        Image generator — coming soon
      </Button>
    </div>
    <p className="mt-4 text-center font-mono text-caption text-ink-500">
      Format specs: feed 1080×1080 · story and reel 1080×1920 (keep type inside the centre
      1080×1420) · link/OG 1200×630.
    </p>
  </Section>
);
