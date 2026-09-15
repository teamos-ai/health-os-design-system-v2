/**
 * BackgroundsSection: the full background library and the card crops, every image tagged.
 * Filter by orientation, tone and subject; each tile shows its context tags and suggested
 * use, and links the original for download.
 */
import { useMemo, useState, type ReactNode } from 'react';
import { Section, Usage, ShowAll } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { BACKGROUNDS, type Background } from '@/data/backgrounds';
import { CARD_MEDIA } from '@/data/media';
import { thumb } from '@/lib/images';
import { cn } from '@/lib/utils';

const SUBJECTS = Array.from(new Set(BACKGROUNDS.map((b) => b.subject))).sort();
const TONES = ['light', 'mid', 'dark'] as const;

const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={cn(
      'rounded-md border px-3 py-1 font-sans text-label capitalize transition-colors duration-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900',
      active ? 'border-apricot-200 bg-apricot-50 text-ink-900' : 'border-line bg-surface text-ink-600 hover:border-ink-400 hover:text-ink-900'
    )}
  >
    {children}
  </button>
);

export const ImageTile = ({
  src,
  href,
  alt,
  name,
  ratio,
  context,
  suggestedUse,
  meta,
  note,
}: {
  src: string;
  href: string;
  alt: string;
  name: string;
  ratio: string;
  context: string[];
  suggestedUse: string;
  meta: string;
  note?: string;
}) => (
  <figure className="group flex min-w-0 flex-col gap-3">
    <a href={href} download title={`Download ${name}`} className="block overflow-hidden rounded-lg border border-line bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2">
      <img src={src} alt={alt} loading="lazy" decoding="async" className={cn('w-full object-cover transition-transform duration-xl ease-out group-hover:scale-[1.02]', ratio)} />
    </a>
    <figcaption className="flex flex-col gap-2">
      <span className="font-display text-body text-ink-900">{name}</span>
      <span className="flex flex-wrap gap-1">
        {context.map((c) => (
          <Badge key={c} variant="outline" size="sm" className="normal-case">
            {c}
          </Badge>
        ))}
      </span>
      <span className="font-sans text-label text-ink-600">
        <span className="uppercase text-ink-900">Suggested use</span> {suggestedUse}
      </span>
      <span className="break-words font-sans text-label text-ink-500 [overflow-wrap:anywhere]">{meta}</span>
      {note && <span className="break-words font-sans text-label text-ink-600 [overflow-wrap:anywhere]">{note}</span>}
    </figcaption>
  </figure>
);

const BgTile = ({ bg }: { bg: Background }) => (
  <ImageTile
    src={thumb(bg.src)}
    href={bg.src}
    alt={bg.description}
    name={bg.name}
    ratio={bg.ratio === '16:9' ? 'aspect-video' : 'aspect-[9/16]'}
    context={bg.context}
    suggestedUse={bg.suggestedUse}
    meta={`${bg.ratio} · ${bg.tone} tone · text ${bg.textSpace === 'none' ? 'on a surface' : `at ${bg.textSpace}`}`}
    note={bg.note}
  />
);

export const BackgroundsSection = () => {
  const [ratio, setRatio] = useState<string | null>(null);
  const [tone, setTone] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(
    () => BACKGROUNDS.filter((b) => (!ratio || b.ratio === ratio) && (!tone || b.tone === tone) && (!subject || b.subject === subject)),
    [ratio, tone, subject]
  );
  /* the library opens on a peek of each kind; a filter or Show all reveals every image */
  const open = expanded || Boolean(ratio || tone || subject);
  const wide = filtered.filter((b) => b.ratio === '16:9').slice(0, open ? undefined : 6);
  const tall = filtered.filter((b) => b.ratio === '9:16').slice(0, open ? undefined : 8);
  const crops = open ? CARD_MEDIA : CARD_MEDIA.slice(0, 4);
  const total = BACKGROUNDS.length + CARD_MEDIA.length;
  const reset = () => {
    setRatio(null);
    setTone(null);
    setSubject(null);
  };

  return (
    <Section id="backgrounds">
      <div className="overflow-hidden rounded-lg border border-line bg-surface">
        <div className="flex flex-col gap-3 border-b border-line bg-surface-2 p-4 md:p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-sans text-label uppercase text-ink-500">Filter</span>
            <span className="flex items-center gap-3 font-sans text-label text-ink-600" aria-live="polite">
              {filtered.length} of {BACKGROUNDS.length}
              {(ratio || tone || subject) && (
                <button type="button" onClick={reset} className="rounded-md text-ink-900 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900">
                  Clear
                </button>
              )}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-20 font-sans text-label uppercase text-ink-500">Ratio</span>
            {['16:9', '9:16'].map((r) => (
              <Chip key={r} active={ratio === r} onClick={() => setRatio(ratio === r ? null : r)}>
                {r === '16:9' ? '16:9 web' : '9:16 story'}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-20 font-sans text-label uppercase text-ink-500">Tone</span>
            {TONES.map((t) => (
              <Chip key={t} active={tone === t} onClick={() => setTone(tone === t ? null : t)}>
                {t}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-20 font-sans text-label uppercase text-ink-500">Subject</span>
            {SUBJECTS.map((s) => (
              <Chip key={s} active={subject === s} onClick={() => setSubject(subject === s ? null : s)}>
                {s}
              </Chip>
            ))}
          </div>
        </div>

        <div id="background-list" className="flex flex-col gap-12 bg-paper p-6 md:p-8">
          {wide.length > 0 && (
            <div>
              <h3 className="mb-6 font-display text-subheading text-ink-900">16:9 for web and slides</h3>
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {wide.map((bg) => (
                  <BgTile key={bg.src} bg={bg} />
                ))}
              </div>
            </div>
          )}
          {tall.length > 0 && (
            <div>
              <h3 className="mb-6 font-display text-subheading text-ink-900">9:16 for stories</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                {tall.map((bg) => (
                  <BgTile key={bg.src} bg={bg} />
                ))}
              </div>
            </div>
          )}
          {filtered.length === 0 && (
            <div className="rounded-lg border border-dashed border-line py-16 text-center">
              <p className="font-sans text-body text-ink-600">No backgrounds match those filters.</p>
              <button type="button" onClick={reset} className="mt-2 font-sans text-label text-ink-900 underline underline-offset-4">
                Clear filters
              </button>
            </div>
          )}

          <div>
            <h3 className="font-display text-subheading text-ink-900">Card crops</h3>
            <p className="mb-6 mt-2 max-w-reading font-sans text-body text-ink-600">
              The images in media/cards, kept as supplied and tagged. Several are exact copies of backgrounds; the note says which.
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {crops.map((m) => (
                <ImageTile
                  key={m.src}
                  src={thumb(m.src)}
                  href={m.src}
                  alt={m.description}
                  name={m.name}
                  ratio={m.width >= m.height ? 'aspect-video' : 'aspect-[9/16]'}
                  context={m.context}
                  suggestedUse={m.suggestedUse}
                  meta={`${m.width} × ${m.height} · ${m.tone} tone`}
                  note={m.note}
                />
              ))}
            </div>
          </div>
          {!(ratio || tone || subject) && <ShowAll expanded={expanded} onToggle={() => setExpanded((e) => !e)} total={total} noun="images" controls="background-list" />}
        </div>
        <Usage id="backgrounds" />
      </div>
    </Section>
  );
};
