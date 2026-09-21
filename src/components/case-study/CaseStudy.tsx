/**
 * CaseStudy: one client's story, told in the order someone reads it.
 *
 *   <CaseStudy study={CASE_STUDY} />
 *
 * Who they are, what was wrong, what we set out to do, what was actually done, what changed, what
 * they said, and what happens next. It takes any story shaped like `CaseStudy` in
 * src/data/case-studies.ts, so a real one drops in by replacing the object.
 *
 * One rule holds this page together: **what was done is not the same as what changed**. The actions
 * are the scope Health OS actually sells (offer-overview.md), and only the results section makes a
 * claim about outcomes.
 *
 * Icons are `IconTile`s from the library, one picture per idea. Nothing here is decorative.
 */
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { IconTile } from '@/components/ui/icon-tile';
import { Stat } from '@/components/ui/stat';
import { person, portrait, portraitLarge } from '@/data/testimonials';
import type { CaseStudy as CaseStudyData } from '@/data/case-studies';
import { cn } from '@/lib/utils';

/* one picture per idea, from the icon library */
const CHALLENGE_ICONS = ['rope-knot', 'puzzle-pieces', 'hourglass'];
const ACTION_ICONS = ['all-in-one-desktop', 'assistant-robot', 'funnel', 'brass-key'];

const Heading = ({ children }: { children: React.ReactNode }) => <h3 className="font-display text-subheading text-ink-900">{children}</h3>;

export interface CaseStudyProps {
  study: CaseStudyData;
  /** keep the sample notice and the Sample mark. Leave it on until the story is real */
  sample?: boolean;
  className?: string;
}

export const CaseStudy = ({ study, sample = true, className }: CaseStudyProps) => {
  const who = person(study.person);

  return (
    <article className={cn('flex flex-col gap-16', className)}>
      {/* who and what, in one screen */}
      <header className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-sans text-label uppercase text-ink-500">{study.kicker}</span>
            {sample && (
              <Badge variant="neutral" size="sm">
                Sample story
              </Badge>
            )}
          </div>
          <h2 className="max-w-reading font-display text-heading text-ink-900">{study.title}</h2>
          <p className="max-w-reading font-sans text-body text-ink-600">{study.summary}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-line pt-6">
          <img
            src={portrait(who.id)}
            alt=""
            width={56}
            height={56}
            decoding="async"
            className="h-14 w-14 shrink-0 rounded-full border border-line object-cover"
          />
          <div className="min-w-0">
            <p className="font-display text-title text-ink-900">{who.name}</p>
            <p className="font-sans text-label text-ink-500">{who.role}</p>
          </div>
        </div>
      </header>

      {/* about */}
      <section className="grid gap-6 lg:grid-cols-[14rem_1fr]">
        <Heading>About the business</Heading>
        <div className="flex max-w-reading flex-col gap-4">
          {study.about.map((p) => (
            <p key={p} className="font-sans text-body text-ink-600">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* what was wrong */}
      <section className="flex flex-col gap-6">
        <Heading>What was wrong</Heading>
        <ul className="grid gap-5 md:grid-cols-3">
          {study.challenge.map((c, i) => (
            <li key={c.title} className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-6">
              <IconTile id={CHALLENGE_ICONS[i % CHALLENGE_ICONS.length]} size="sm" />
              <div className="flex flex-col gap-2">
                <h4 className="font-display text-title text-ink-900">{c.title}</h4>
                <p className="font-sans text-body text-ink-600">{c.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* what we set out to do */}
      <section className="grid gap-6 lg:grid-cols-[14rem_1fr]">
        <Heading>What we set out to do</Heading>
        <ul className="flex max-w-reading flex-col gap-3">
          {study.objectives.map((o) => (
            <li key={o} className="flex gap-3 font-sans text-body text-ink-900">
              <span aria-hidden className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-apricot-50">
                <Check className="h-3 w-3 text-ink-900" strokeWidth={2} />
              </span>
              {o}
            </li>
          ))}
        </ul>
      </section>

      {/* what was done */}
      <section className="flex flex-col gap-6">
        <Heading>What was done</Heading>
        <ol className="grid gap-5 md:grid-cols-2">
          {study.actions.map((a, i) => (
            <li key={a.title} className="flex gap-5 rounded-lg border border-line bg-surface p-6">
              <IconTile id={ACTION_ICONS[i % ACTION_ICONS.length]} size="sm" ground="paper" />
              <div className="flex min-w-0 flex-col gap-2">
                <h4 className="font-display text-title text-ink-900">{a.title}</h4>
                <p className="font-sans text-body text-ink-600">{a.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* what changed */}
      <section className="flex flex-col gap-6">
        <Heading>What changed</Heading>
        <div className="grid gap-8 rounded-lg border border-line bg-surface-2 p-8 sm:grid-cols-2 lg:grid-cols-4">
          {study.results.map((r) => (
            <Stat key={r.label} display={r.value} label={r.label} />
          ))}
        </div>
      </section>

      {/* what they said */}
      <section className="flex flex-col items-start gap-6 rounded-lg border border-line bg-surface p-8 md:flex-row md:items-center md:gap-10 md:p-12">
        <img
          src={portraitLarge(who.id)}
          alt=""
          width={128}
          height={128}
          loading="lazy"
          decoding="async"
          className="h-32 w-32 shrink-0 rounded-full border border-line object-cover"
        />
        <figure className="flex min-w-0 flex-col gap-4">
          <blockquote className="max-w-reading font-display text-subheading text-ink-900">{study.quote.text}</blockquote>
          <figcaption className="flex flex-wrap items-center gap-3 font-sans text-label text-ink-500">
            {study.quote.attribution}
            {sample && (
              <Badge variant="neutral" size="sm">
                Sample
              </Badge>
            )}
          </figcaption>
        </figure>
      </section>

      {/* what happens next */}
      <section className="grid gap-8 border-t border-line pt-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Heading>Where it leaves them</Heading>
          <p className="max-w-reading font-sans text-body text-ink-600">{study.closing}</p>
        </div>
        <div className="flex flex-col gap-4">
          <Heading>What happens next</Heading>
          <ul className="flex flex-col gap-3">
            {study.next.map((n) => (
              <li key={n} className="flex gap-3 font-sans text-body text-ink-600">
                <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-apricot-200" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
};
