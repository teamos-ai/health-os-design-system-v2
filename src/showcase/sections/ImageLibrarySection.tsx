/**
 * ImageLibrarySection — the Health OS people & lifestyle photo library. A filter bar
 * at the top narrows the set by theme, orientation, people, gender, activity and
 * setting (facets derived from the data, so new photos extend the filters
 * automatically). Grid tiles show a lightweight JPEG thumbnail (`thumbs/`); clicking
 * a tile downloads the full-resolution PNG. Brand washes remain below.
 */
import { useMemo, useState, type ReactNode } from 'react';
import { Section } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { MonoLabel } from '@/components/ui/mono-label';
import { cn } from '@/lib/utils';
import { PHOTOS, PHOTO_THEMES, type Photo } from '@/data/photos';
import { WASHES } from '@/data/imagery';

/** display thumbnail path: /imagery/<theme>/foo.png → /imagery/<theme>/thumbs/foo.jpg */
const thumb = (src: string) => src.replace(/\/([^/]+)\.png$/i, '/thumbs/$1.jpg');

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type FacetKey = 'theme' | 'ratio' | 'people' | 'gender' | 'activity' | 'setting';

const uniq = (key: FacetKey) => Array.from(new Set(PHOTOS.map((p) => p[key]))).sort();

const FACETS: { key: FacetKey; label: string; options: string[] }[] = [
  { key: 'theme', label: 'Theme', options: PHOTO_THEMES },
  { key: 'ratio', label: 'Orientation', options: ['16:9', '9:16', '4:3'] },
  { key: 'people', label: 'People', options: ['solo', 'pair', 'group'] },
  { key: 'gender', label: 'Gender', options: ['women', 'men', 'mixed'] },
  { key: 'activity', label: 'Activity', options: uniq('activity') },
  { key: 'setting', label: 'Setting', options: uniq('setting') },
];

type Active = Record<FacetKey, string[]>;
const EMPTY: Active = { theme: [], ratio: [], people: [], gender: [], activity: [], setting: [] };

const Chip = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={cn(
      'rounded-md border px-2.5 py-1 font-mono text-caption transition-colors duration-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-300',
      active
        ? 'border-ink-900 bg-ink-900 text-paper'
        : 'border-line text-ink-600 hover:border-ink-400 hover:text-ink-900'
    )}
  >
    {children}
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
  const [active, setActive] = useState<Active>(EMPTY);

  const toggle = (key: FacetKey, value: string) =>
    setActive((prev) => {
      const set = new Set(prev[key]);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...prev, [key]: Array.from(set) };
    });

  const activeCount = useMemo(
    () => Object.values(active).reduce((n, arr) => n + arr.length, 0),
    [active]
  );

  const filtered = useMemo(
    () =>
      PHOTOS.filter((p) =>
        FACETS.every((f) => {
          const sel = active[f.key];
          return sel.length === 0 || sel.includes(String(p[f.key]));
        })
      ),
    [active]
  );

  return (
    <Section
      id="imagery"
      eyebrow="Imagery"
      title="Image library"
      lead="Real Health OS photography, filterable by theme, orientation and what's in the shot. Click any tile to download the full-resolution PNG. The brand washes below stand in when a photograph would be too loud."
    >
      {/* ── Filter bar ─────────────────────────────────────────── */}
      <div className="mb-8 rounded-lg border border-line bg-surface p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between">
          <MonoLabel>Filter</MonoLabel>
          <div className="flex items-center gap-3">
            <span className="font-mono text-caption text-ink-600">
              {filtered.length} of {PHOTOS.length}
            </span>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={() => setActive(EMPTY)}
                className="font-mono text-caption text-ink-700 underline underline-offset-2 hover:text-ink-900"
              >
                Clear ({activeCount})
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {FACETS.map((f) => (
            <div key={f.key} className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 w-20 shrink-0 font-mono text-[10px] uppercase tracking-wide2 text-ink-500">
                {f.label}
              </span>
              {f.options.map((opt) => (
                <Chip key={opt} active={active[f.key].includes(opt)} onClick={() => toggle(f.key, opt)}>
                  {f.key === 'theme' || f.key === 'ratio' ? opt : titleCase(opt)}
                </Chip>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Results ────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-line py-16 text-center">
          <p className="font-sans text-body-sm text-ink-600">No photos match those filters.</p>
          <button
            type="button"
            onClick={() => setActive(EMPTY)}
            className="mt-2 font-mono text-caption text-ink-900 underline underline-offset-2"
          >
            Clear filters
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
