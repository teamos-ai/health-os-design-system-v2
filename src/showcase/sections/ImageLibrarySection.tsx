/**
 * ImageLibrarySection: the people and lifestyle photo library, every image tagged.
 * Search across names, tags, context and descriptions, or pick a theme. Tiles show the
 * context tags and suggested use, then link the original for download. Screenshot rules
 * close the section.
 */
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Section, Usage } from '@/showcase/Section';
import { PHOTOS, PHOTO_THEMES } from '@/data/photos';
import { thumb } from '@/lib/images';
import { cn } from '@/lib/utils';
import { ImageTile } from './BackgroundsSection';

const RATIO: Record<string, string> = { '16:9': 'aspect-video', '9:16': 'aspect-[9/16]', '4:3': 'aspect-[4/3]' };

export const ImageLibrarySection = () => {
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return PHOTOS.filter((p) => {
      if (theme && p.theme !== theme) return false;
      const hay = [p.name, p.activity, p.setting, p.people, p.gender, p.description, p.suggestedUse, ...p.tags, ...p.context].join(' ').toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [query, theme]);

  return (
    <Section id="imagery">
      <div className="flex flex-col gap-8">
        <div className="overflow-hidden rounded-lg border border-line bg-surface">
          <div className="flex flex-col gap-4 border-b border-line bg-surface-2 p-4 md:p-5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
              <label htmlFor="image-search" className="sr-only">
                Search images
              </label>
              <input
                id="image-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by activity, place, mood or use"
                className="h-12 w-full rounded-md border border-line bg-surface pl-12 pr-4 font-sans text-body text-ink-900 placeholder:text-ink-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-700/30"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {[null, ...PHOTO_THEMES].map((t) => (
                  <button
                    key={t ?? 'all'}
                    type="button"
                    aria-pressed={theme === t}
                    onClick={() => setTheme(t)}
                    className={cn(
                      'rounded-md border px-3 py-1 font-sans text-label transition-colors duration-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-700/40',
                      theme === t ? 'border-ink-900 bg-ink-900 text-white' : 'border-line bg-surface text-ink-600 hover:border-ink-400 hover:text-ink-900'
                    )}
                  >
                    {t ?? 'All'}
                  </button>
                ))}
              </div>
              <span className="font-sans text-label text-ink-600" aria-live="polite">
                {filtered.length} of {PHOTOS.length} images
              </span>
            </div>
          </div>

          <div className="bg-paper p-6 md:p-8">
            {filtered.length === 0 ? (
              <div className="rounded-lg border border-dashed border-line py-16 text-center">
                <p className="font-sans text-body text-ink-600">No images match that search.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setTheme(null);
                  }}
                  className="mt-2 font-sans text-label text-ink-900 underline underline-offset-4"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                  <ImageTile
                    key={p.src}
                    src={thumb(p.src)}
                    href={p.src}
                    alt={p.description}
                    name={p.name}
                    ratio={RATIO[p.ratio]}
                    context={p.context}
                    suggestedUse={p.suggestedUse}
                    meta={`${p.ratio} · ${p.people} · ${p.setting}`}
                    note={p.note}
                  />
                ))}
              </div>
            )}
          </div>
          <Usage id="photos" />
        </div>

        <div className="overflow-hidden rounded-lg border border-line bg-surface">
          <Usage id="screenshots" className="border-t-0" />
        </div>
      </div>
    </Section>
  );
};
