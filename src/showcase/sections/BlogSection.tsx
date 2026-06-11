/**
 * BlogSection — rough-in scaffold for the content layer: how blog articles and the
 * comparison blocks inside them are structured. Placeholder copy, to be detailed later.
 */
import { Check, X } from 'lucide-react';
import { Section, Demo } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { ImageWash } from '@/components/ui/image-wash';
import { WASHES } from '@/data/imagery';

const ROWS = [
  { feature: 'Online booking', a: true, b: false },
  { feature: 'Automated reminders', a: true, b: true },
  { feature: 'Client records in one place', a: true, b: false },
];

export const BlogSection = () => (
  <Section
    id="blog"
    eyebrow="Content"
    title="Blog"
    lead="How long-form articles are structured — a clear hierarchy of heading, lead, body and pull-quote, with comparison tables dropped in where a decision needs framing."
  >
    <Demo label="Article layout" action={<Badge variant="outline" size="sm">Rough scaffold</Badge>}>
      <article className="mx-auto max-w-2xl">
        <Badge variant="lavender" size="sm">Practice growth</Badge>
        <h1 className="mt-4 font-display text-h1 text-ink-900">
          Choosing the right tools for a calmer practice
        </h1>
        <p className="mt-3 font-mono text-caption text-ink-500">
          Dr Elise Warner • 11 June 2026 • 6 min read
        </p>

        <p className="mt-6 font-sans text-body-lg leading-relaxed text-ink-700">
          Most practitioners end up juggling six or eight disconnected tools. This is a look
          at what to consolidate first, and what genuinely moves the needle for clients.
        </p>

        <h2 className="mt-8 font-display text-h3 text-ink-900">Where the time really goes</h2>
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

        <ImageWash
          background={WASHES[1].background}
          ratio="16/9"
          label="Inline figure"
          note="Placeholder — real photography to come"
        />

        <h2 className="mt-8 font-display text-h3 text-ink-900">A quick comparison</h2>
        <div className="mt-4 overflow-hidden rounded-md border border-line">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line bg-surface px-4 py-2.5">
            <span className="font-mono text-caption uppercase text-ink-600">Capability</span>
            <span className="w-16 text-center font-mono text-caption uppercase text-ink-600">Health OS</span>
            <span className="w-16 text-center font-mono text-caption uppercase text-ink-600">Patchwork</span>
          </div>
          {ROWS.map((row) => (
            <div
              key={row.feature}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line px-4 py-3 last:border-b-0"
            >
              <span className="font-sans text-body-sm text-ink-700">{row.feature}</span>
              <span className="flex w-16 justify-center">
                {row.a ? (
                  <Check className="h-4 w-4 text-success-600" strokeWidth={1.5} />
                ) : (
                  <X className="h-4 w-4 text-ink-400" strokeWidth={1.5} />
                )}
              </span>
              <span className="flex w-16 justify-center">
                {row.b ? (
                  <Check className="h-4 w-4 text-success-600" strokeWidth={1.5} />
                ) : (
                  <X className="h-4 w-4 text-ink-400" strokeWidth={1.5} />
                )}
              </span>
            </div>
          ))}
        </div>
      </article>
    </Demo>
  </Section>
);
