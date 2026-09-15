/**
 * EmailLibrary: every Health OS email and newsletter in one compact browser, so any email is a
 * search or two clicks away and nothing scrolls on forever.
 *
 *   <EmailLibrary />
 *
 * Left, the series list: marketing then customers, each series a collapsible row with its emails
 * in send order. A search above it reads subjects, preview text, bodies, triggers and open
 * decisions, and opens every series that matches. Right, the chosen email: where it sits in its
 * series (the steps are buttons), its subject, preview text, send moment, ask, word count against
 * the playbook and footer reason, then the email itself, rendered as the inbox will show it, on
 * desktop or phone, with samples or merge tags. Copy the subject, the HTML or the plain text.
 * Open decisions, merge fields and a newsletter's web version and SEO sit in disclosures below.
 *
 * The chosen email is kept in the address (?email=id), so a link opens it directly. On phones the
 * series list folds behind a Browse button above the email.
 */
import * as React from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Copy, Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Disclosure } from '@/components/ui/disclosure';
import { IconButton } from '@/components/ui/icon-button';
import { IconTile } from '@/components/ui/icon-tile';
import { SegmentedControl } from '@/components/ui/segmented';
import { useToast } from '@/components/ui/toast';
import { EmailPreview, type PreviewDevice } from '@/components/email/EmailPreview';
import { EMAILS, EMAIL_BY_ID, EMAIL_SERIES, SERIES_BY_ID, emailsInSeries, fieldsFor, seriesLabel, type EmailGroup } from '@/data/emails';
import { countWords, fillText, renderEmailHtml, renderEmailText, type FieldMode } from '@/lib/email-html';
import { cn } from '@/lib/utils';

const PUBLIC_BASE = 'https://ds-healthos.vercel.app';
const PARAM = 'email';

const PILLARS = { 1: 'The bottleneck', 2: 'One system', 3: 'Steady, not stop-start' } as const;

type GroupFilter = 'all' | EmailGroup;
const GROUP_OPTIONS: { value: GroupFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Customers', label: 'Customers' },
];
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

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900';

export const EmailLibrary = ({ className }: { className?: string }) => {
  const { toast } = useToast();
  const [query, setQuery] = React.useState('');
  const [group, setGroup] = React.useState<GroupFilter>('all');
  const [selectedId, setSelectedId] = React.useState<string>(() => readParam() ?? EMAILS[0].id);
  const [expanded, setExpanded] = React.useState<Set<string>>(() => new Set([EMAIL_BY_ID[readParam() ?? EMAILS[0].id].series]));
  const [browsing, setBrowsing] = React.useState(false);
  const [device, setDevice] = React.useState<PreviewDevice>('desktop');
  const [fields, setFields] = React.useState<FieldMode>('sample');
  const detailRef = React.useRef<HTMLDivElement>(null);

  const email = EMAIL_BY_ID[selectedId];
  const series = SERIES_BY_ID[email.series];
  const siblings = emailsInSeries(series.id);

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const searching = terms.length > 0;
  const matches = EMAILS.filter((e) => (group === 'all' || SERIES_BY_ID[e.series].group === group) && terms.every((t) => HAY[e.id].includes(t)));
  const matchSet = new Set(matches.map((e) => e.id));
  const filtering = searching || group !== 'all';

  const select = (id: string, { scroll = false } = {}) => {
    setSelectedId(id);
    setExpanded((s) => new Set(s).add(EMAIL_BY_ID[id].series));
    writeParam(id);
    setBrowsing(false);
    if (scroll) detailRef.current?.scrollIntoView({ block: 'start' });
  };

  const toggleSeries = (id: string) =>
    setExpanded((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

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
  const groups: EmailGroup[] = group === 'all' ? ['Marketing', 'Customers'] : [group];

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {/* search and filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
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
            placeholder="Search subjects and copy: receipt, trial, follow-up"
            className="h-11 w-full rounded-md border border-line bg-surface pl-12 pr-11 font-sans text-body text-ink-900 placeholder:text-ink-500 focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900 [&::-webkit-search-cancel-button]:appearance-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear the search" className={cn('absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-ink-500 hover:bg-ink-100 hover:text-ink-900', FOCUS)}>
              <X className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SegmentedControl size="sm" aria-label="Show emails for" options={GROUP_OPTIONS} value={group} onValueChange={(v) => setGroup(v as GroupFilter)} />
          <span className="whitespace-nowrap font-sans text-label text-ink-600" aria-live="polite">
            {filtering ? `${matches.length} of ${EMAILS.length} emails` : `${EMAILS.length} emails in ${EMAIL_SERIES.length} series`}
          </span>
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        {/* series list */}
        <div className="min-w-0 lg:sticky lg:top-6">
          <button
            type="button"
            onClick={() => setBrowsing((b) => !b)}
            aria-expanded={browsing}
            aria-controls="email-series-list"
            className={cn('flex w-full items-center justify-between gap-3 rounded-md border border-line bg-surface px-4 py-3 text-left font-display text-body text-ink-900 lg:hidden', FOCUS)}
          >
            <span className="min-w-0 truncate">Browse all {EMAILS.length} emails</span>
            <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform duration-sm', browsing && 'rotate-180')} strokeWidth={1.75} aria-hidden />
          </button>

          <nav
            id="email-series-list"
            aria-label="Email series"
            className={cn('mt-3 flex-col gap-5 rounded-lg border border-line bg-surface p-2 lg:mt-0 lg:flex lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto', browsing ? 'flex' : 'hidden')}
          >
            {matches.length === 0 ? (
              <div className="px-3 py-6">
                <p className="font-sans text-body text-ink-900">No email matches that.</p>
                <button type="button" onClick={() => { setQuery(''); setGroup('all'); }} className={cn('mt-2 font-sans text-label text-ink-900 underline decoration-apricot-200 decoration-2 underline-offset-4 hover:decoration-ink-900', FOCUS)}>
                  Clear search and filters
                </button>
              </div>
            ) : (
              groups.map((g) => {
                const list = EMAIL_SERIES.filter((s) => s.group === g && emailsInSeries(s.id).some((e) => matchSet.has(e.id)));
                if (!list.length) return null;
                return (
                  <div key={g} className="flex flex-col gap-1">
                    <p className="px-2 pt-2 font-sans text-label uppercase text-ink-500">{g}</p>
                    {list.map((s) => {
                      const items = emailsInSeries(s.id).filter((e) => matchSet.has(e.id));
                      const open = searching || expanded.has(s.id);
                      const current = s.id === series.id;
                      return (
                        <div key={s.id}>
                          <button
                            type="button"
                            onClick={() => toggleSeries(s.id)}
                            aria-expanded={open}
                            aria-controls={`email-series-${s.id}`}
                            title={s.detail ? `${s.name}: ${s.detail}` : s.name}
                            className={cn('flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors duration-sm hover:bg-ink-100', FOCUS)}
                          >
                            <IconTile id={s.icon} size="xs" ground="paper" />
                            <span className="min-w-0 flex-1">
                              <span className={cn('block truncate font-sans text-body', current ? 'text-ink-900' : 'text-ink-600')}>{s.name}</span>
                              {s.detail && <span className="block truncate font-sans text-label text-ink-500">{s.detail}</span>}
                            </span>
                            <span className="font-sans text-label tabular-nums text-ink-500">{filtering ? `${items.length}/${emailsInSeries(s.id).length}` : items.length}</span>
                            <ChevronDown className={cn('h-4 w-4 shrink-0 text-ink-500 transition-transform duration-sm', open && 'rotate-180')} strokeWidth={1.75} aria-hidden />
                          </button>
                          {open && (
                            <ol id={`email-series-${s.id}`} className="mb-2 ml-5 flex flex-col gap-px border-l border-line pl-2">
                              {items.map((e) => {
                                const on = e.id === email.id;
                                return (
                                  <li key={e.id}>
                                    <button
                                      type="button"
                                      onClick={() => select(e.id, { scroll: true })}
                                      aria-current={on ? 'true' : undefined}
                                      className={cn(
                                        'flex w-full items-baseline gap-2 rounded-md px-2 py-2 text-left transition-colors duration-sm',
                                        on ? 'bg-apricot-50 ring-1 ring-inset ring-apricot-200' : 'hover:bg-ink-100',
                                        FOCUS
                                      )}
                                    >
                                      <span className="w-5 shrink-0 font-sans text-label tabular-nums text-ink-500">{pad(e.step)}</span>
                                      <span className="min-w-0">
                                        <span className="block truncate font-sans text-label text-ink-900">{e.name}</span>
                                        <span className="block truncate font-sans text-label text-ink-500">{e.subject}</span>
                                      </span>
                                    </button>
                                  </li>
                                );
                              })}
                            </ol>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}
          </nav>
        </div>

        {/* the chosen email */}
        <article ref={detailRef} aria-labelledby="email-detail-title" className="flex min-w-0 scroll-mt-6 flex-col gap-6">
          <header className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-sans text-label uppercase text-ink-500">
                  {series.group} · {seriesLabel(series)} · Email {email.step} of {siblings.length}
                </p>
                <h3 id="email-detail-title" className="mt-2 font-display text-subheading text-ink-900">
                  {email.name}
                </h3>
              </div>
              <div className="flex shrink-0 gap-2">
                <IconButton size="small" aria-label={prev ? `Previous email: ${prev.name}` : 'No previous email'} disabled={!prev} onClick={() => prev && select(prev.id)}>
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </IconButton>
                <IconButton size="small" aria-label={next ? `Next email: ${next.name}` : 'No next email'} disabled={!next} onClick={() => next && select(next.id)}>
                  <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </IconButton>
              </div>
            </div>

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

            {siblings.length > 1 && (
              <ol aria-label={`Emails in ${seriesLabel(series)}`} className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                {siblings.map((e) => {
                  const on = e.id === email.id;
                  return (
                    <li key={e.id} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => select(e.id)}
                        aria-current={on ? 'step' : undefined}
                        className={cn(
                          'flex max-w-56 flex-col rounded-md border px-3 py-2 text-left transition-colors duration-sm',
                          on ? 'border-apricot-200 bg-apricot-50' : 'border-line bg-surface hover:border-ink-400',
                          FOCUS
                        )}
                      >
                        <span className="font-sans text-label tabular-nums text-ink-500">
                          {pad(e.step)} · {e.send.split(',')[0]}
                        </span>
                        <span className="truncate font-sans text-label text-ink-900">{e.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            )}
          </header>

          <dl className="grid gap-x-6 gap-y-4 rounded-lg border border-line bg-surface p-5 sm:grid-cols-2">
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
              <dd className="mt-1 flex items-center gap-2 font-sans text-body text-ink-900">
                <span aria-hidden className={cn('h-2 w-2 shrink-0 rounded-full', inRange ? 'bg-success-600' : 'bg-warning-600')} />
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
    </div>
  );
};
