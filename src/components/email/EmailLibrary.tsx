/**
 * EmailLibrary: every Health OS email and newsletter in one browser, with all the navigation in a
 * bar across the top so the email itself gets the full width below it.
 *
 *   <EmailLibrary />
 *
 * The bar, top to bottom: a search that reads subjects, preview text, bodies, triggers and open
 * decisions, and lists what matches under the field; the series as chips in two rows, marketing
 * and customers; and the emails in the chosen series as steps, with previous and next. Below it,
 * the chosen email: its badges, subject, preview text, send moment, ask, word count against the
 * playbook and footer reason, then the email rendered as the inbox will show it, on desktop or
 * phone, with samples or merge tags. Copy the subject, the HTML or the plain text. The series,
 * open decisions, merge fields and a newsletter's web version and SEO sit in disclosures below.
 *
 * The chosen email is kept in the address (?email=id), so a link opens it directly.
 */
import * as React from 'react';
import { ChevronLeft, ChevronRight, Copy, Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Disclosure } from '@/components/ui/disclosure';
import { IconButton } from '@/components/ui/icon-button';
import { SegmentedControl } from '@/components/ui/segmented';
import { useToast } from '@/components/ui/toast';
import { EmailPreview, type PreviewDevice } from '@/components/email/EmailPreview';
import { EMAILS, EMAIL_BY_ID, EMAIL_SERIES, SERIES_BY_ID, emailsInSeries, fieldsFor, seriesLabel, type EmailGroup, type EmailSeries } from '@/data/emails';
import { countWords, fillText, renderEmailHtml, renderEmailText, type FieldMode } from '@/lib/email-html';
import { cn } from '@/lib/utils';

const PUBLIC_BASE = 'https://ds-healthos.vercel.app';
const PARAM = 'email';
const MAX_RESULTS = 12;

const PILLARS = { 1: 'The bottleneck', 2: 'One system', 3: 'Steady, not stop-start' } as const;
const GROUPS: EmailGroup[] = ['Marketing', 'Customers'];

const DEVICE_OPTIONS: { value: PreviewDevice; label: string }[] = [
  { value: 'desktop', label: 'Desktop' },
  { value: 'phone', label: 'Phone' },
];
const FIELD_OPTIONS: { value: FieldMode; label: string }[] = [
  { value: 'sample', label: 'Samples' },
  { value: 'tags', label: 'Merge tags' },
];

/* Everything a search can match, per email, in lower case. */
const HAY: Record<string, string> = Object.fromEntries(
  EMAILS.map((e) => {
    const s = SERIES_BY_ID[e.series];
    return [e.id, [e.subject, e.preview, e.name, e.send, e.kind, e.ask, s.name, s.detail, s.trigger, s.group, renderEmailText(e, { fields: 'sample' }), ...(e.open ?? []), ...(e.seo?.keywords ?? [])].join(' ').toLowerCase()];
  })
);

const readParam = () => {
  try {
    const id = new URLSearchParams(window.location.search).get(PARAM);
    return id && EMAIL_BY_ID[id] ? id : null;
  } catch {
    return null;
  }
};

const writeParam = (id: string) => {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set(PARAM, id);
    window.history.replaceState(window.history.state, '', url);
  } catch {
    /* the address is a convenience; the library works without it */
  }
};

const pad = (n: number) => String(n).padStart(2, '0');

/** The short name on a series chip: the diagnostic for a nurture track, otherwise the series name. */
const chipLabel = (s: EmailSeries) => (s.name === 'Lead nurture' && s.detail ? s.detail : s.name);

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900';
const CHIP = 'inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md border px-3 py-2 font-sans text-label transition-colors duration-sm';
/* one sideways-scrolling row on phones, wrapping rows from md up */
const ROW = 'no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:overflow-visible md:px-0';
const CHIP_ON = 'border-apricot-200 bg-apricot-50 text-ink-900';
const CHIP_OFF = 'border-line bg-surface text-ink-600 hover:border-ink-400 hover:text-ink-900';

export const EmailLibrary = ({ className }: { className?: string }) => {
  const { toast } = useToast();
  const [query, setQuery] = React.useState('');
  const [selectedId, setSelectedId] = React.useState<string>(() => readParam() ?? EMAILS[0].id);
  const [device, setDevice] = React.useState<PreviewDevice>('desktop');
  const [fields, setFields] = React.useState<FieldMode>('sample');
  const navRef = React.useRef<HTMLElement>(null);

  const email = EMAIL_BY_ID[selectedId];
  const series = SERIES_BY_ID[email.series];
  const siblings = emailsInSeries(series.id);

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matches = terms.length ? EMAILS.filter((e) => terms.every((t) => HAY[e.id].includes(t))) : [];

  const select = (id: string) => {
    setSelectedId(id);
    writeParam(id);
  };

  const pick = (id: string) => {
    select(id);
    setQuery('');
  };

  /* on phones the chip rows scroll sideways: keep the chosen series and email in view */
  React.useEffect(() => {
    navRef.current?.querySelectorAll<HTMLElement>('[data-chip-row]').forEach((row) => {
      const on = row.querySelector<HTMLElement>('[aria-pressed="true"], [aria-current="step"]');
      if (!on || row.scrollWidth <= row.clientWidth) return;
      const r = row.getBoundingClientRect();
      const c = on.getBoundingClientRect();
      if (c.left < r.left || c.right > r.right) row.scrollLeft += c.left - r.left - 16;
    });
  }, [selectedId]);

  const flatIndex = EMAILS.findIndex((e) => e.id === email.id);
  const prev = EMAILS[flatIndex - 1];
  const next = EMAILS[flatIndex + 1];

  const copy = async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: `Copied the ${label}` });
    } catch {
      toast({ title: `Could not copy the ${label}`, description: 'Your browser blocked the clipboard. Select the text in the preview instead.', tone: 'warning' });
    }
  };

  const words = countWords(email);
  const [min, max] = email.length;
  const inRange = words >= min && words <= max;
  const emailFields = Object.entries(fieldsFor(email)).filter(([key]) => JSON.stringify(email).includes(`{{${key}}}`) || (key === 'unsubscribe_link' && email.kind === 'marketing'));

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {/* navigation: search, series, emails */}
      <nav ref={navRef} aria-label="Email library" className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-4 md:p-5">
        <div className="relative">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
              <label htmlFor="email-search" className="sr-only">
                Search emails and newsletters
              </label>
              <input
                id="email-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setQuery('');
                  if (e.key === 'Enter' && matches[0]) pick(matches[0].id);
                }}
                aria-controls="email-search-results"
                placeholder="Search subjects and copy: receipt, trial, follow-up"
                className="h-11 w-full rounded-md border border-line bg-surface pl-12 pr-11 font-sans text-body text-ink-900 placeholder:text-ink-500 focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900 [&::-webkit-search-cancel-button]:appearance-none"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} aria-label="Clear the search" className={cn('absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-ink-500 hover:bg-ink-100 hover:text-ink-900', FOCUS)}>
                  <X className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </button>
              )}
            </div>
            <span className="whitespace-nowrap font-sans text-label text-ink-600" aria-live="polite">
              {terms.length ? `${matches.length} of ${EMAILS.length} emails match` : `${EMAILS.length} emails in ${EMAIL_SERIES.length} series`}
            </span>
          </div>

          {terms.length > 0 && (
            <div id="email-search-results" className="absolute inset-x-0 top-full z-20 mt-2 max-h-96 overflow-y-auto rounded-lg border border-line bg-surface p-2 shadow-md">
              {matches.length === 0 ? (
                <p className="px-3 py-4 font-sans text-body text-ink-600">No email matches that. Try a subject word, a series or an open decision such as D48.</p>
              ) : (
                <ul className="flex flex-col">
                  {matches.slice(0, MAX_RESULTS).map((e) => {
                    const s = SERIES_BY_ID[e.series];
                    return (
                      <li key={e.id}>
                        <button type="button" onClick={() => pick(e.id)} className={cn('flex w-full flex-col gap-1 rounded-md px-3 py-2 text-left hover:bg-ink-100 sm:flex-row sm:items-baseline sm:gap-4', FOCUS)}>
                          <span className="shrink-0 font-sans text-label text-ink-500 sm:w-56 sm:truncate">
                            {chipLabel(s)} · {pad(e.step)}
                          </span>
                          <span className="min-w-0 font-sans text-label text-ink-900 sm:truncate">
                            {e.name}: {e.subject}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                  {matches.length > MAX_RESULTS && <li className="px-3 py-2 font-sans text-label text-ink-500">{matches.length - MAX_RESULTS} more. Add a word to narrow it down.</li>}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {GROUPS.map((g) => (
            <div key={g} role="group" aria-label={`${g} series`} className="flex flex-col gap-2 md:flex-row md:items-start md:gap-4">
              <p className="shrink-0 font-sans text-label uppercase text-ink-500 md:w-24 md:pt-2">{g}</p>
              <div data-chip-row className={ROW}>
                {EMAIL_SERIES.filter((s) => s.group === g).map((s) => {
                  const on = s.id === series.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={on}
                      title={s.summary}
                      onClick={() => !on && select(emailsInSeries(s.id)[0].id)}
                      className={cn(CHIP, on ? CHIP_ON : CHIP_OFF, FOCUS)}
                    >
                      {chipLabel(s)}
                      <span className="tabular-nums text-ink-500">{emailsInSeries(s.id).length}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-4 md:flex-row md:items-start md:gap-4">
          <p className="shrink-0 font-sans text-label uppercase text-ink-500 md:w-24 md:pt-2">Emails</p>
          <ol aria-label={`Emails in ${seriesLabel(series)}`} data-chip-row className={cn(ROW, 'min-w-0 md:flex-1')}>
            {siblings.map((e) => {
              const on = e.id === email.id;
              return (
                <li key={e.id} className="shrink-0">
                  <button type="button" onClick={() => select(e.id)} aria-current={on ? 'step' : undefined} className={cn(CHIP, on ? CHIP_ON : CHIP_OFF, FOCUS)}>
                    <span className="tabular-nums text-ink-500">{pad(e.step)}</span>
                    {e.name}
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="flex shrink-0 gap-2 self-end md:self-start">
            <IconButton size="small" aria-label={prev ? `Previous email: ${prev.name}` : 'No previous email'} disabled={!prev} onClick={() => prev && select(prev.id)}>
              <ChevronLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </IconButton>
            <IconButton size="small" aria-label={next ? `Next email: ${next.name}` : 'No next email'} disabled={!next} onClick={() => next && select(next.id)}>
              <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </IconButton>
          </div>
        </div>
      </nav>

      {/* the chosen email, full width */}
      <article aria-labelledby="email-detail-title" className="flex min-w-0 flex-col gap-6">
        <header className="flex flex-col gap-3">
          <p className="font-sans text-label uppercase text-ink-500">
            {series.group} · {seriesLabel(series)} · Email {email.step} of {siblings.length}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h3 id="email-detail-title" className="font-display text-subheading text-ink-900">
              {email.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {email.kind === 'marketing' ? (
                <Badge variant="warning" size="sm" dot>
                  Marketing · do not send yet
                </Badge>
              ) : (
                <Badge variant="outline" size="sm">
                  Service message
                </Badge>
              )}
              {email.pillar && (
                <Badge variant="neutral" size="sm">
                  Pillar {email.pillar} · {PILLARS[email.pillar]}
                </Badge>
              )}
              <Badge variant="neutral" size="sm">
                {email.layout === 'plain' ? 'Plain note' : email.layout === 'letter' ? 'Letter' : email.layout === 'newsletter' ? 'Newsletter' : 'Account email'}
              </Badge>
            </div>
          </div>
        </header>

        <dl className="grid gap-x-6 gap-y-4 rounded-lg border border-line bg-surface p-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0 sm:col-span-2">
            <dt className="font-sans text-label uppercase text-ink-500">Subject</dt>
            <dd className="mt-1 flex items-start justify-between gap-3">
              <span className="min-w-0 font-display text-title text-ink-900">{email.subject}</span>
              <IconButton variant="text" size="small" aria-label="Copy the subject" onClick={() => copy('subject', email.subject)} className="-mr-2 -mt-1 shrink-0">
                <Copy className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </IconButton>
            </dd>
          </div>
          <div className="min-w-0 sm:col-span-2">
            <dt className="font-sans text-label uppercase text-ink-500">Preview text</dt>
            <dd className="mt-1 font-sans text-body text-ink-900">{email.preview}</dd>
          </div>
          <div className="min-w-0">
            <dt className="font-sans text-label uppercase text-ink-500">Sends</dt>
            <dd className="mt-1 font-sans text-body text-ink-900">{email.send}</dd>
          </div>
          <div className="min-w-0">
            <dt className="font-sans text-label uppercase text-ink-500">The ask</dt>
            <dd className="mt-1 font-sans text-body text-ink-900">{email.ask}</dd>
          </div>
          <div className="min-w-0">
            <dt className="font-sans text-label uppercase text-ink-500">Length</dt>
            <dd className="mt-1 flex items-start gap-2 font-sans text-body text-ink-900">
              <span aria-hidden className={cn('mt-2 h-2 w-2 shrink-0 rounded-full', inRange ? 'bg-success-600' : 'bg-warning-600')} />
              {words} words, playbook {min} to {max}
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="font-sans text-label uppercase text-ink-500">Footer reason</dt>
            <dd className="mt-1 font-sans text-body text-ink-900">You are receiving this because {fillText(email.reason, email, fields)}.</dd>
          </div>
        </dl>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <SegmentedControl size="sm" aria-label="Preview size" options={DEVICE_OPTIONS} value={device} onValueChange={(v) => setDevice(v as PreviewDevice)} />
              <SegmentedControl size="sm" aria-label="Merge fields" options={FIELD_OPTIONS} value={fields} onValueChange={(v) => setFields(v as FieldMode)} />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="small" leadingIcon={<Copy className="h-4 w-4" strokeWidth={1.75} aria-hidden />} onClick={() => copy(fields === 'tags' ? 'HTML with merge tags' : 'HTML with samples', renderEmailHtml(email, { base: PUBLIC_BASE, fields }))}>
                Copy HTML
              </Button>
              <Button variant="secondary" size="small" leadingIcon={<Copy className="h-4 w-4" strokeWidth={1.75} aria-hidden />} onClick={() => copy('plain text', renderEmailText(email, { fields }))}>
                Copy text
              </Button>
            </div>
          </div>
          <EmailPreview email={email} device={device} fields={fields} />
        </div>

        <div className="flex flex-col gap-3">
          <Disclosure title={`About ${seriesLabel(series).toLowerCase()}`}>
            <div className="flex flex-col gap-4 px-4 pb-4">
              <p className="font-sans text-body text-ink-600">{series.summary}</p>
              <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {[
                  ['Starts when', series.trigger],
                  ['Goal', series.goal],
                  ['Timing', series.cadence],
                  ['Ends when', series.exit],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-sans text-label uppercase text-ink-500">{k}</dt>
                    <dd className="mt-1 font-sans text-body text-ink-900">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="font-sans text-label text-ink-500">Rules from {series.source}</p>
            </div>
          </Disclosure>

          {email.open && email.open.length > 0 && (
            <Disclosure title={`Before this sends: ${email.open.length} open ${email.open.length === 1 ? 'decision' : 'decisions'}`}>
              <ul className="flex flex-col gap-2 px-4 pb-4">
                {email.open.map((o) => (
                  <li key={o} className="flex gap-3 font-sans text-body text-ink-900">
                    <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-warning-600" />
                    {o}
                  </li>
                ))}
              </ul>
            </Disclosure>
          )}

          {emailFields.length > 0 && (
            <Disclosure title={`Merge fields: ${emailFields.length}`}>
              <div className="overflow-x-auto px-4 pb-4">
                <table className="w-full min-w-[32rem] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-line">
                      <th scope="col" className="py-2 pr-4 font-sans text-label uppercase text-ink-500">Tag</th>
                      <th scope="col" className="py-2 pr-4 font-sans text-label uppercase text-ink-500">What it is</th>
                      <th scope="col" className="py-2 font-sans text-label uppercase text-ink-500">Sample</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailFields.map(([key, f]) => (
                      <tr key={key} className="border-b border-line-soft align-top">
                        <td className="py-2 pr-4 font-sans text-label text-ink-900">{`{{${key}}}`}</td>
                        <td className="py-2 pr-4 font-sans text-label text-ink-900">
                          {f.label}
                          {f.hint && <span className="mt-1 block text-ink-500">{f.hint}</span>}
                        </td>
                        <td className="py-2 font-sans text-label text-ink-600">{f.sample}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Disclosure>
          )}

          {email.seo && (
            <Disclosure title="Web version and SEO">
              <dl className="flex flex-col gap-3 px-4 pb-4">
                <div>
                  <dt className="font-sans text-label uppercase text-ink-500">Title tag · {email.seo.title.length} of 60 characters</dt>
                  <dd className="mt-1 font-sans text-body text-ink-900">{email.seo.title}</dd>
                </div>
                <div>
                  <dt className="font-sans text-label uppercase text-ink-500">Meta description · {email.seo.description.length} of 160 characters</dt>
                  <dd className="mt-1 font-sans text-body text-ink-900">{email.seo.description}</dd>
                </div>
                <div>
                  <dt className="font-sans text-label uppercase text-ink-500">Address</dt>
                  <dd className="mt-1 break-all font-sans text-body text-ink-900">healthos.au/newsletter/{email.seo.slug}</dd>
                </div>
                {email.image && (
                  <div>
                    <dt className="font-sans text-label uppercase text-ink-500">Header image alt text</dt>
                    <dd className="mt-1 font-sans text-body text-ink-900">{email.image.alt}</dd>
                  </div>
                )}
                <div>
                  <dt className="font-sans text-label uppercase text-ink-500">Search phrases</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {email.seo.keywords.map((k) => (
                      <Badge key={k} variant="neutral" size="sm">
                        {k}
                      </Badge>
                    ))}
                  </dd>
                </div>
              </dl>
            </Disclosure>
          )}
        </div>
      </article>
    </div>
  );
};
