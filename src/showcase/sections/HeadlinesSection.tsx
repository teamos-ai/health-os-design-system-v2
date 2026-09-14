/**
 * HeadlinesSection: the two-tone headline. Live examples with the copy that produces them,
 * the anatomy, the tile library and the recipe for making a new tile. Examples render as
 * h3 so the reference keeps one h1; on a real page each is the h1.
 */
import { Section, Example, Demo } from '@/showcase/Section';
import { Headline } from '@/components/ui/headline';
import { Badge } from '@/components/ui/badge';
import { HEADLINE_TILES } from '@/data/headline-tiles';
import { cn } from '@/lib/utils';

const EXAMPLES = [
  { lead: 'You built {blocks} it.', rest: 'Now make it run {computer} without you.', where: 'Homepage hero' },
  { lead: 'The design system {swatches}', rest: 'behind a calm {stones} practice', where: 'Reference site hero' },
  { lead: 'Fewer {tools} tools,', rest: 'wired {cables} together', where: 'Article' },
];

const ANATOMY = [
  { name: 'Lead', value: 'ink-900', note: 'The opening phrase that makes the point. One switch of tone, never two.' },
  { name: 'Rest', value: 'ink-400', note: 'Everything after the lead, in the same size and weight.' },
  { name: 'Tiles', value: '2 or 3', note: 'A 0.9em squircle beside the word it pictures, kept on its line. Never first or last.' },
];

const TONE_SWATCH = {
  rose: 'bg-rose-50 ring-rose-200',
  lavender: 'bg-lavender-50 ring-lavender-200',
  neutral: 'bg-ink-100 ring-ink-200',
} as const;

const RECIPE = `Photorealistic studio product photograph of [one literal object that pictures the word], [materials and colours], three-quarter view. Isolated on a fully transparent background, centred and filling about 80% of a square frame, soft diffused daylight from the upper left, gentle natural shading, crisp high detail, calm minimal aesthetic. No text, no letters, no logos, no brand marks, no watermark.`;

export const HeadlinesSection = () => (
  <Section id="headlines">
    <div className="flex flex-col gap-8">
      <Example id="headline" label="Two-tone headline">
        <div className="flex flex-col divide-y divide-line-soft">
          {EXAMPLES.map((ex) => (
            <figure key={ex.where} className="flex flex-col gap-4 py-8 first:pt-2 last:pb-2">
              <Headline as="h3" lead={ex.lead} rest={ex.rest} className="max-w-3xl" />
              <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-label text-ink-500">
                <span className="uppercase">{ex.where}</span>
                <code className="normal-case text-ink-600">
                  lead="{ex.lead}" rest="{ex.rest}"
                </code>
              </figcaption>
            </figure>
          ))}
        </div>
      </Example>

      <Demo label="Anatomy">
        <dl className="grid gap-6 md:grid-cols-3">
          {ANATOMY.map((a) => (
            <div key={a.name} className="flex flex-col gap-2 border-t border-line pt-4">
              <dt className="flex items-center gap-3">
                <span className="font-display text-subheading text-ink-900">{a.name}</span>
                <Badge variant="outline" size="sm">
                  {a.value}
                </Badge>
              </dt>
              <dd className="font-sans text-body text-ink-600">{a.note}</dd>
            </div>
          ))}
        </dl>
      </Demo>

      <Example id="headline-tiles" label="Tile library">
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {Object.values(HEADLINE_TILES).map((t) => (
            <li key={t.id} className="flex flex-col gap-3">
              <span className={cn('flex aspect-square w-full max-w-40 items-center justify-center overflow-hidden rounded-lg ring-1 ring-inset', TONE_SWATCH[t.tone])}>
                <img src={t.src} alt={t.alt} loading="lazy" decoding="async" className="h-full w-full object-contain" />
              </span>
              <span className="font-sans text-label text-ink-900">{`{${t.id}}`}</span>
              <span className="font-sans text-label text-ink-500">{t.means.join(' · ')}</span>
            </li>
          ))}
        </ul>
      </Example>

      <Example id="headline-tile-recipe" label="Making a new tile">
        <div className="flex flex-col gap-4">
          <p className="max-w-reading font-sans text-body text-ink-600">
            Picture the word literally: software is a vintage computer, calm is balanced stones. Generate at 1:1 with a transparent background, check it is sharp and free of text and logos, then save a 1024px PNG and a 320px WebP.
          </p>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-md border border-line bg-surface-2 p-4 font-sans text-label normal-case text-ink-900">{RECIPE}</pre>
        </div>
      </Example>
    </div>
  </Section>
);
