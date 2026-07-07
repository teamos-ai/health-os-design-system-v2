/**
 * BackgroundsSection — the real Health OS background library: warm, abstract nature and
 * gradient fields for websites, landing pages and social, in web (16:9) and social (9:16)
 * ratios. A filter bar narrows by orientation and colour family. Grid tiles show a
 * lightweight JPEG thumbnail (`thumbs/`); clicking a tile downloads the full-res PNG.
 */
import { useMemo, useState, type ReactNode } from 'react';
import { Section } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { MonoLabel } from '@/components/ui/mono-label';
import { cn } from '@/lib/utils';
import { BACKGROUNDS_16x9, BACKGROUNDS_9x16, type Background } from '@/data/backgrounds';

/** display thumbnail path: /backgrounds/foo.png → /backgrounds/thumbs/foo.jpg */
const thumb = (src: string) => src.replace(/\/([^/]+)\.png$/i, '/thumbs/$1.jpg');

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const ALL = [...BACKGROUNDS_16x9, ...BACKGROUNDS_9x16];
const COLOUR_OPTIONS = Array.from(new Set(ALL.flatMap((b) => b.colors))).sort();

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

const BgTile = ({ bg }: { bg: Background }) => (
  <a href={bg.src} download title={`Download ${bg.name} (PNG)`} className="group flex flex-col gap-2">
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-line bg-surface shadow-none transition group-hover:shadow-sm',
        bg.ratio === '16:9' ? 'aspect-[16/9]' : 'aspect-[9/16]'
      )}
    >
      <img
        src={thumb(bg.src)}
        alt={bg.name}
        loading="lazy"
        decoding="async"
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

export const BackgroundsSection = () => {
  const [orient, setOrient] = useState<string[]>([]);
  const [colours, setColours] = useState<string[]>([]);

  const toggle = (list: string[], set: (v: string[]) => void, value: string) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const matchColour = (bg: Background) => colours.length === 0 || bg.colors.some((c) => colours.includes(c));
  const showRatio = (r: Background['ratio']) => orient.length === 0 || orient.includes(r);

  const wide = useMemo(() => BACKGROUNDS_16x9.filter(matchColour), [colours]);
  const tall = useMemo(() => BACKGROUNDS_9x16.filter(matchColour), [colours]);

  const activeCount = orient.length + colours.length;
  const visible = (showRatio('16:9') ? wide.length : 0) + (showRatio('9:16') ? tall.length : 0);

  return (
    <Section
      id="backgrounds"
      eyebrow="Assets"
      title="Backgrounds"
      lead="Warm, abstract background fields for websites, landing pages and social — sized for wide web heroes (16:9) and tall social stories (9:16). Filter by orientation and colour; click any tile to download the full-resolution PNG."
    >
      {/* ── Filter bar ─────────────────────────────────────────── */}
      <div className="mb-8 rounded-lg border border-line bg-surface p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between">
          <MonoLabel>Filter</MonoLabel>
          <div className="flex items-center gap-3">
            <span className="font-mono text-caption text-ink-600">
              {visible} of {ALL.length}
            </span>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setOrient([]);
                  setColours([]);
                }}
                className="font-mono text-caption text-ink-700 underline underline-offset-2 hover:text-ink-900"
              >
                Clear ({activeCount})
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 w-20 shrink-0 font-mono text-[10px] uppercase tracking-wide2 text-ink-500">
              Orientation
            </span>
            {(['16:9', '9:16'] as const).map((r) => (
              <Chip key={r} active={orient.includes(r)} onClick={() => toggle(orient, setOrient, r)}>
                {r === '16:9' ? '16:9 — web' : '9:16 — social'}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 w-20 shrink-0 font-mono text-[10px] uppercase tracking-wide2 text-ink-500">
              Colour
            </span>
            {COLOUR_OPTIONS.map((c) => (
              <Chip key={c} active={colours.includes(c)} onClick={() => toggle(colours, setColours, c)}>
                {titleCase(c)}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* ── 16:9 — web & landing ───────────────────────────────── */}
      {showRatio('16:9') && wide.length > 0 && (
        <div className="mb-14">
          <div className="mb-5 flex items-center gap-3">
            <MonoLabel>16:9 — web &amp; landing</MonoLabel>
            <Badge variant="neutral" size="sm">
              {wide.length}
            </Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {wide.map((bg) => (
              <BgTile key={bg.src} bg={bg} />
            ))}
          </div>
        </div>
      )}

      {/* ── 9:16 — social & stories ────────────────────────────── */}
      {showRatio('9:16') && tall.length > 0 && (
        <div>
          <div className="mb-5 flex items-center gap-3">
            <MonoLabel>9:16 — social &amp; stories</MonoLabel>
            <Badge variant="neutral" size="sm">
              {tall.length}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {tall.map((bg) => (
              <BgTile key={bg.src} bg={bg} />
            ))}
          </div>
        </div>
      )}

      {/* ── Empty state ────────────────────────────────────────── */}
      {visible === 0 && (
        <div className="rounded-lg border border-dashed border-line py-16 text-center">
          <p className="font-sans text-body-sm text-ink-600">No backgrounds match those filters.</p>
          <button
            type="button"
            onClick={() => {
              setOrient([]);
              setColours([]);
            }}
            className="mt-2 font-mono text-caption text-ink-900 underline underline-offset-2"
          >
            Clear filters
          </button>
        </div>
      )}
    </Section>
  );
};
