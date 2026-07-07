/**
 * ImageLibrarySection — the Health OS people & lifestyle photo library. A full-width
 * search plus a curated row of "key tag" pills (with counts) floats at the top for fast
 * isolation — the health & wellness equivalents of a finance library's couples/seniors/
 * professionals set, tuned to what practitioners and clients actually look for. Grid
 * tiles show a lightweight JPEG thumbnail (`thumbs/`); clicking a tile downloads the
 * full-resolution PNG. Brand washes remain below.
 */
import { useMemo, useState, type ReactNode } from 'react';
import { Search } from 'lucide-react';
import { Section } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { MonoLabel } from '@/components/ui/mono-label';
import { cn } from '@/lib/utils';
import { PHOTOS, type Photo } from '@/data/photos';
import { WASHES } from '@/data/imagery';

/** display thumbnail path: /imagery/<theme>/foo.png → /imagery/<theme>/thumbs/foo.jpg */
const thumb = (src: string) => src.replace(/\/([^/]+)\.png$/i, '/thumbs/$1.jpg');

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Key tags — the curated, marketing-facing categories for a health & wellness library
 * (the equivalent of the finance set: couples / seniors / professionals / advice…).
 * Each maps to the structured photo facets + tags, so counts stay accurate and new
 * photos slot in automatically. Ordered by how often they're reached for.
 */
const KEY_TAGS: { label: string; match: (p: Photo) => boolean }[] = [
  { label: 'Fitness', match: (p) => ['yoga', 'running'].includes(p.activity) },
  { label: 'Wellbeing', match: (p) => p.activity === 'relaxing' || p.tags.some((t) => ['wellbeing', 'calm', 'mindfulness'].includes(t)) },
  { label: 'Nutrition', match: (p) => p.activity === 'coffee' || p.tags.some((t) => ['smoothie', 'drinks', 'iced-coffee'].includes(t)) },
  { label: 'Community', match: (p) => p.people === 'group' || p.activity === 'socialising' || p.tags.some((t) => ['social', 'community'].includes(t)) },
  { label: 'Couples', match: (p) => p.people === 'pair' },
  { label: 'Solo', match: (p) => p.people === 'solo' },
  { label: 'Lifestyle', match: (p) => p.tags.some((t) => ['lifestyle', 'street-style'].includes(t)) },
  { label: 'Outdoors', match: (p) => ['park', 'waterfront'].includes(p.setting) || p.tags.some((t) => ['outdoor', 'grass'].includes(t)) },
  { label: 'Studio', match: (p) => p.setting === 'studio' },
  { label: 'Urban', match: (p) => p.setting === 'urban' },
  { label: 'Workplace', match: (p) => ['coworking', 'filming'].includes(p.activity) || p.tags.some((t) => ['work', 'laptop'].includes(t)) },
];

/** precompute counts once; drop any key tag with no matches so the row never lies */
const TAGS = KEY_TAGS.map((t) => ({ ...t, count: PHOTOS.filter(t.match).length })).filter((t) => t.count > 0);

const Pill = ({
  active,
  count,
  onClick,
  children,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  children: ReactNode;
}) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={cn(
      'inline-flex items-center gap-2 rounded-md border px-3.5 py-1.5 font-mono text-body-sm transition-colors duration-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-300',
      active
        ? 'border-ink-900 bg-ink-900 text-paper'
        : 'border-line bg-surface text-ink-700 hover:border-ink-400 hover:text-ink-900'
    )}
  >
    <span>{children}</span>
    <span
      className={cn(
        'rounded-[4px] px-1.5 py-px text-[11px] leading-none',
        active ? 'bg-paper/20 text-paper' : 'bg-ink-100 text-ink-500'
      )}
    >
      {count}
    </span>
  </button>
);

const PhotoTile = ({ p }: { p: Photo }) => (
  <a href={p.src} download title={`Download ${p.name} (PNG)`} className="group flex flex-col gap-2">
    <div className="aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface shadow-none transition group-hover:shadow-sm">
      <img
        src={thumb(p.src)}
        alt={p.name}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
      />
    </div>
    <p className="font-sans text-body-sm text-ink-700">{p.name}</p>
    <div className="flex flex-wrap items-center gap-1">
      <Badge variant="outline" size="sm">
        {p.ratio}
      </Badge>
      <Badge variant="neutral" size="sm">
        {titleCase(p.activity)}
      </Badge>
      <Badge variant="neutral" size="sm">
        {titleCase(p.setting)}
      </Badge>
    </div>
  </a>
);

export const ImageLibrarySection = () => {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<string | null>(null); // null = All

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const tag = active ? TAGS.find((t) => t.label === active) : null;
    return PHOTOS.filter((p) => {
      if (tag && !tag.match(p)) return false;
      if (q) {
        const hay = `${p.name} ${p.tags.join(' ')} ${p.activity} ${p.setting} ${p.people} ${p.gender}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, active]);

  const reset = () => {
    setQuery('');
    setActive(null);
  };

  return (
    <Section
      id="imagery"
      eyebrow="Imagery"
      title="Image library"
      lead="Real Health OS photography for health & wellness pages, decks and ads. Search across everything, or tap a key tag to isolate a category. Click any tile to download the full-resolution PNG."
    >
      {/* ── Full-width search ──────────────────────────────────── */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" aria-hidden />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search images"
          placeholder="Search images…"
          className="w-full rounded-md border border-line bg-surface py-3.5 pl-12 pr-4 font-sans text-body-md text-ink-900 placeholder:text-ink-400 transition-colors focus:border-ink-400 focus:outline-none focus:ring-2 focus:ring-ink-200"
        />
      </div>

      {/* ── Key-tag pills (float at the top) ───────────────────── */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Pill active={active === null && !query} count={PHOTOS.length} onClick={reset}>
          All
        </Pill>
        {TAGS.map((t) => (
          <Pill key={t.label} active={active === t.label} count={t.count} onClick={() => setActive(active === t.label ? null : t.label)}>
            {t.label}
          </Pill>
        ))}
      </div>

      {/* ── Result count ───────────────────────────────────────── */}
      <div className="mb-6 mt-4 flex items-center justify-between" aria-live="polite">
        <MonoLabel>
          {filtered.length === PHOTOS.length ? `${PHOTOS.length} images` : `${filtered.length} of ${PHOTOS.length}`}
        </MonoLabel>
        {(active || query) && (
          <button
            type="button"
            onClick={reset}
            className="font-mono text-caption text-ink-600 underline underline-offset-2 hover:text-ink-900"
          >
            Clear
          </button>
        )}
      </div>

      <p className="mb-6 font-mono text-caption text-ink-500">
        Manifest: src/data/photos.ts — add new photography there (sentence-case names,
        structured facets) and it appears here with accurate counts.
      </p>

      {/* ── Results ────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="mb-14 rounded-lg border border-dashed border-line py-16 text-center">
          <p className="font-sans text-body-sm text-ink-600">No images match “{query || active}”.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-2 font-mono text-caption text-ink-900 underline underline-offset-2"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PhotoTile key={p.src} p={p} />
          ))}
        </div>
      )}

      {/* ── Brand washes — abstract fills for when a photograph would be too loud ── */}
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
};
