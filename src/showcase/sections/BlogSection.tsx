/**
 * BlogSection — the content layer: how blog articles and the comparison blocks inside
 * them are structured. A clear hierarchy of headline, byline, lead, body, pull-quote
 * and figure, plus a real (semantic) comparison table. The demo headline is an h3 so
 * the showcase document keeps its single h1; on a real article page it would be the h1.
 */
import { Check, X } from 'lucide-react';
import { Section, Demo } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { PHOTOS } from '@/data/photos';

const ROWS = [
  { feature: 'Online booking', a: true, b: false },
  { feature: 'Automated reminders', a: true, b: true },
  { feature: 'Client records in one place', a: true, b: false },
];

const Mark = ({ yes }: { yes: boolean }) =>
  yes ? (
    <>
      <Check className="h-4 w-4 text-success-600" strokeWidth={1.5} aria-hidden />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <X className="h-4 w-4 text-ink-400" strokeWidth={1.5} aria-hidden />
      <span className="sr-only">Not included</span>
    </>
  );

const figurePhoto = PHOTOS.find((p) => p.ratio === '16:9') ?? PHOTOS[0];

export const BlogSection = () => (
  <Section
    id="blog"
    eyebrow="Content"
    title="Blog"
    lead="How long-form articles are structured — a clear hierarchy of heading, lead, body and pull-quote, with comparison tables dropped in where a decision needs framing. Headline text-h1 · lead body-lg · body body-md at max-w-2xl · pull-quote h4 italic with a 2px brand-400 left border."
  >
    <Demo label="Article layout">
      <article className="mx-auto max-w-2xl">
        <Badge variant="lavender" size="sm">Practice growth</Badge>
        {/* h3 in the showcase document; h1 on a real article page */}
        <h3 className="mt-4 font-display text-h1 text-ink-900">
          Choosing the right tools for a calmer practice
        </h3>
        <p className="mt-3 font-mono text-caption text-ink-500">
          Dr Elise Warner • 11 June 2026 • 6 min read
        </p>

        <p className="mt-6 font-sans text-body-lg leading-relaxed text-ink-700">
          Most practitioners end up juggling six or eight disconnected tools. This is a look
          at what to consolidate first, and what genuinely moves the needle for clients.
        </p>

        <h4 className="mt-8 font-display text-h3 text-ink-900">Where the time really goes</h4>
        <p className="mt-3 font-sans text-body-md leading-relaxed text-ink-600">
          Admin rarely shows up as one big block. It leaks out across the week — a reminder
          here, a rescheduled session there, a payment chased the next morning. Added up, it
          is often the single largest line item in a week of work.
        </p>
        <p className="mt-3 font-sans text-body-md leading-relaxed text-ink-600">
          The fix is rarely a new tool. More often it is fewer tools, wired together, so the
          same booking, record and message live in one place rather than three.
        </p>

        <blockquote className="my-7 border-l-2 border-brand-400 pl-4 font-display text-h4 italic text-ink-700">
          The goal is not more software. It is one calm surface that holds the whole
          relationship with a client.
        </blockquote>

        <figure>
          <img
            src={figurePhoto.src}
            alt={figurePhoto.name}
            loading="lazy"
            decoding="async"
            className="aspect-video w-full rounded-lg border border-line object-cover"
          />
          <figcaption className="mt-2 font-mono text-caption text-ink-500">
            Real photography from the image library — warm, natural light, calm.
          </figcaption>
        </figure>

        <h4 className="mt-8 font-display text-h3 text-ink-900">A quick comparison</h4>
        <div className="mt-4 overflow-hidden rounded-md border border-line">
          <table className="w-full border-collapse">
            <caption className="sr-only">
              Capability comparison between Health OS and a patchwork of tools
            </caption>
            <thead>
              <tr className="border-b border-line bg-surface">
                <th scope="col" className="px-4 py-2.5 text-left font-mono text-caption font-normal uppercase text-ink-600">
                  Capability
                </th>
                <th scope="col" className="w-24 px-2 py-2.5 text-center font-mono text-caption font-normal uppercase text-ink-600">
                  Health OS
                </th>
                <th scope="col" className="w-24 px-2 py-2.5 text-center font-mono text-caption font-normal uppercase text-ink-600">
                  Patchwork
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-line last:border-b-0">
                  <th scope="row" className="px-4 py-3 text-left font-sans text-body-sm font-normal text-ink-700">
                    {row.feature}
                  </th>
                  <td className="px-2 py-3">
                    <span className="flex justify-center"><Mark yes={row.a} /></span>
                  </td>
                  <td className="px-2 py-3">
                    <span className="flex justify-center"><Mark yes={row.b} /></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </Demo>
  </Section>
);
