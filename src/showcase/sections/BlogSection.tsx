/**
 * BlogSection: the article layout on the reading column. The demo headline is an h3 so
 * the reference keeps one h1; on a real article page it is the h1.
 */
import { Check, X } from 'lucide-react';
import { Section, Example } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { PHOTOS } from '@/data/photos';
import { thumb } from '@/lib/images';

const ROWS = [
  { job: 'Online booking', one: true, stack: false },
  { job: 'Automatic reminders', one: true, stack: true },
  { job: 'Client records in one place', one: true, stack: false },
];

const Mark = ({ yes }: { yes: boolean }) =>
  yes ? (
    <>
      <Check className="h-4 w-4 text-success-600" strokeWidth={2} aria-hidden />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <X className="h-4 w-4 text-ink-400" strokeWidth={1.5} aria-hidden />
      <span className="sr-only">Not included</span>
    </>
  );

const figure = PHOTOS.find((p) => p.src.includes('woman-filming-content-on-laptop-by-city-window-16-9')) ?? PHOTOS[0];

export const BlogSection = () => (
  <Section id="blog">
    <Example id="article" label="Article layout">
      <article className="mx-auto max-w-reading py-4">
        <Badge variant="lavender">Operations</Badge>
        <h3 className="mt-6 font-display text-heading text-ink-900">Fewer tools, wired together</h3>
        <p className="mt-4 font-sans text-label text-ink-500">
          <span className="block text-ink-900">Jordan Lee</span>
          11 September 2026 · 6 min read
        </p>

        <p className="mt-8 font-sans text-body text-ink-900">
          Most wellness businesses end up running on a handful of separate tools. This is a look at what to bring together first, and what can wait.
        </p>

        <h4 className="mt-10 font-display text-subheading text-ink-900">Where the time goes</h4>
        <p className="mt-3 font-sans text-body text-ink-600">
          Admin rarely arrives as one big block. It leaks across the week: a reminder here, a rescheduled session there, a payment chased the next morning.
        </p>
        <p className="mt-4 font-sans text-body text-ink-600">
          The answer is rarely another tool. It is usually fewer tools, connected, so the same booking, record and message live in one place.
        </p>

        <blockquote className="my-10 rounded-lg bg-brand-gradient-soft px-8 py-6">
          <p className="font-display text-subheading text-ink-900">The goal is not more software. It is one place that holds the whole relationship with a client.</p>
        </blockquote>

        <figure>
          <img src={thumb(figure.src)} alt={figure.description} loading="lazy" decoding="async" className="aspect-video w-full rounded-lg border border-line object-cover" />
          <figcaption className="mt-3 font-sans text-label text-ink-500">Recording a short update between client sessions.</figcaption>
        </figure>

        <h4 className="mt-10 font-display text-subheading text-ink-900">A quick comparison</h4>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[420px] border-collapse">
            <caption className="sr-only">One connected system compared with separate tools</caption>
            <thead>
              <tr className="border-b border-line bg-surface-2">
                <th scope="col" className="px-4 py-3 text-left font-sans text-label uppercase text-ink-500">Job</th>
                <th scope="col" className="w-32 px-2 py-3 text-center font-sans text-label uppercase text-ink-500">One system</th>
                <th scope="col" className="w-32 px-2 py-3 text-center font-sans text-label uppercase text-ink-500">Separate tools</th>
              </tr>
            </thead>
            <tbody className="bg-surface">
              {ROWS.map((row) => (
                <tr key={row.job} className="border-b border-line last:border-b-0">
                  <th scope="row" className="px-4 py-3 text-left font-sans text-body font-normal text-ink-900">
                    {row.job}
                  </th>
                  <td className="px-2 py-3">
                    <span className="flex justify-center">
                      <Mark yes={row.one} />
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    <span className="flex justify-center">
                      <Mark yes={row.stack} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </Example>
  </Section>
);
