/**
 * DashboardLibrary: the Health OS product screens, tagged and searchable, with one open large at
 * the top and the rest as a grid under it.
 *
 *   <DashboardLibrary />
 *
 * The viewer holds the chosen screen: the picture at full width, then what it is, the area of the
 * product it belongs to, its layout, the parts it is built from, what to take from it, and any
 * place it departs from the system. The featured screen (the main Health OS dashboard) opens
 * first. Under it, a search across names, summaries, parts and departures, area chips, and a grid
 * of every screen. Picking one moves it into the viewer. The 4K original and a 1920px copy are
 * linked from the viewer, so a screen can be used in a deck or a page.
 *
 * These are mockups of the product, not pages built from the tokens. Where one differs from the
 * system, the system wins: every difference is listed on the screen itself as a departure.
 */
import * as React from 'react';
import { ArrowUpRight, Download, Search, Star, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DASHBOARDS, DASHBOARD_AREAS, dashboardLarge, dashboardOriginal, dashboardThumb, type Dashboard } from '@/data/dashboards';
import { cn } from '@/lib/utils';

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900';
const PEEK = 9;

const hay = (d: Dashboard) => [d.name, d.area, d.layout, d.summary, d.useFor, d.readsAs, ...d.parts, ...d.departures].join(' ').toLowerCase();
const HAY: Record<number, string> = Object.fromEntries(DASHBOARDS.map((d) => [d.id, hay(d)]));

export const DashboardLibrary = ({ className }: { className?: string }) => {
  const [query, setQuery] = React.useState('');
  const [area, setArea] = React.useState<string | null>(null);
  const [expanded, setExpanded] = React.useState(false);
  const [openId, setOpenId] = React.useState<number>(DASHBOARDS.find((d) => d.featured)?.id ?? DASHBOARDS[0].id);
  const viewerRef = React.useRef<HTMLDivElement>(null);

  const open = DASHBOARDS.find((d) => d.id === openId) ?? DASHBOARDS[0];
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const filtered = DASHBOARDS.filter((d) => (!area || d.area === area) && terms.every((t) => HAY[d.id].includes(t)));
  const filtering = terms.length > 0 || area !== null;
  const shown = filtering || expanded ? filtered : filtered.slice(0, PEEK);

  const choose = (id: number) => {
    setOpenId(id);
    viewerRef.current?.scrollIntoView({ block: 'start' });
  };

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      {/* the screen being looked at */}
      <div ref={viewerRef} className="flex scroll-mt-6 flex-col gap-4">
        <figure className="flex flex-col gap-4">
          <img
            key={open.id}
            src={dashboardLarge(open)}
            alt={open.summary}
            width={1920}
            height={1080}
            decoding="async"
            className="w-full rounded-lg border border-line bg-surface-2"
          />
          <figcaption className="flex flex-col gap-4">
            <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-subheading text-ink-900">{open.name}</h3>
                  {open.featured && (
                    <Badge variant="neutral" size="sm" icon={Star}>
                      Featured screen
                    </Badge>
                  )}
                </div>
                <p className="mt-2 max-w-reading font-sans text-body text-ink-600">{open.summary}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <a
                  href={dashboardLarge(open)}
                  target="_blank"
                  rel="noreferrer"
                  className={cn('inline-flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 font-sans text-label text-ink-900 transition-colors duration-sm hover:border-ink-400', FOCUS)}
                >
                  Open full size
                  <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} aria-hidden />
                </a>
                <a
                  href={dashboardOriginal(open)}
                  download
                  className={cn('inline-flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 font-sans text-label text-ink-900 transition-colors duration-sm hover:border-ink-400', FOCUS)}
                >
                  Download 4K
                  <Download className="h-3 w-3" strokeWidth={1.75} aria-hidden />
                </a>
              </div>
            </div>

            <dl className="grid gap-x-6 gap-y-4 rounded-lg border border-line bg-surface p-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="min-w-0">
                <dt className="font-sans text-label uppercase text-ink-500">Area</dt>
                <dd className="mt-1 font-sans text-body text-ink-900">{open.area}</dd>
              </div>
              <div className="min-w-0">
                <dt className="font-sans text-label uppercase text-ink-500">Layout</dt>
                <dd className="mt-1 font-sans text-body text-ink-900">{open.layout}</dd>
              </div>
              <div className="min-w-0">
                <dt className="font-sans text-label uppercase text-ink-500">Feel</dt>
                <dd className="mt-1 font-sans text-body text-ink-900">
                  {open.palette}, {open.density}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="font-sans text-label uppercase text-ink-500">Screen</dt>
                <dd className="mt-1 font-sans text-body text-ink-900">{open.readsAs || `Dashboard ${open.id}`}</dd>
              </div>
              <div className="min-w-0 sm:col-span-2 lg:col-span-4">
                <dt className="font-sans text-label uppercase text-ink-500">Built from</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {open.parts.map((p) => (
                    <Badge key={p} variant="neutral" size="sm">
                      {p}
                    </Badge>
                  ))}
                </dd>
              </div>
              <div className="min-w-0 sm:col-span-2">
                <dt className="font-sans text-label uppercase text-ink-500">Take from it</dt>
                <dd className="mt-1 font-sans text-body text-ink-900">{open.useFor}</dd>
              </div>
              <div className="min-w-0 sm:col-span-2">
                <dt className="font-sans text-label uppercase text-ink-500">Departures from the system</dt>
                <dd className="mt-1 font-sans text-body text-ink-900">
                  {open.departures.length === 0 ? (
                    'None seen. Build it from the tokens as it stands.'
                  ) : (
                    <ul className="flex flex-col gap-1">
                      {open.departures.map((d) => (
                        <li key={d} className="flex gap-2">
                          <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-warning-600" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </dd>
              </div>
            </dl>
          </figcaption>
        </figure>
      </div>

      {/* every screen */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
            <label htmlFor="dashboard-search" className="sr-only">
              Search the dashboards
            </label>
            <input
              id="dashboard-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a screen, a part or a departure: table, calendar, gradient"
              className="h-12 w-full rounded-md border border-line bg-surface pl-12 pr-11 font-sans text-body text-ink-900 placeholder:text-ink-500 focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900 [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear the search" className={cn('absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-ink-500 hover:bg-ink-100 hover:text-ink-900', FOCUS)}>
                <X className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div role="group" aria-label="Filter by area" className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              {[null, ...DASHBOARD_AREAS].map((a) => (
                <button
                  key={a ?? 'all'}
                  type="button"
                  aria-pressed={area === a}
                  onClick={() => setArea(a)}
                  className={cn(
                    'shrink-0 whitespace-nowrap rounded-md border px-3 py-2 font-sans text-label transition-colors duration-sm',
                    area === a ? 'border-apricot-200 bg-apricot-50 text-ink-900' : 'border-line bg-surface text-ink-600 hover:border-ink-400 hover:text-ink-900',
                    FOCUS
                  )}
                >
                  {a ?? 'All areas'}
                </button>
              ))}
            </div>
            <span className="font-sans text-label text-ink-600" aria-live="polite">
              {filtering ? `${filtered.length} of ${DASHBOARDS.length} screens` : `${DASHBOARDS.length} screens`}
            </span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line px-6 py-12 text-center">
            <p className="font-sans text-body text-ink-900">No screen matches that.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setArea(null);
              }}
              className={cn('mt-4 font-sans text-label text-ink-900 underline decoration-apricot-200 decoration-2 underline-offset-4 hover:decoration-ink-900', FOCUS)}
            >
              Clear search and filters
            </button>
          </div>
        ) : (
          <ul id="dashboard-grid" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((d) => {
              const on = d.id === open.id;
              return (
                <li key={d.id} className="min-w-0">
                  <button
                    type="button"
                    onClick={() => choose(d.id)}
                    aria-current={on ? 'true' : undefined}
                    className={cn(
                      'group flex h-full w-full flex-col gap-3 rounded-lg border p-3 text-left transition-[border-color,box-shadow,transform] duration-md ease-out hover:-translate-y-1 hover:shadow-sm',
                      on ? 'border-apricot-200 bg-apricot-50' : 'border-line bg-surface hover:border-ink-400',
                      FOCUS
                    )}
                  >
                    <img
                      src={dashboardThumb(d)}
                      alt={d.summary}
                      width={960}
                      height={540}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded-md border border-line bg-surface-2"
                    />
                    <span className="flex min-w-0 flex-col gap-2">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-body text-ink-900">{d.name}</span>
                        {d.featured && (
                          <Badge variant="neutral" size="sm" icon={Star}>
                            Featured
                          </Badge>
                        )}
                      </span>
                      <span className="font-sans text-label text-ink-500">
                        {d.area} · {d.layout}
                      </span>
                      <span className="font-sans text-label text-ink-600">{d.summary}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {!filtering && filtered.length > PEEK && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            aria-controls="dashboard-grid"
            className={cn('mx-auto inline-flex h-11 items-center gap-2 rounded-md border border-line bg-surface px-6 font-display text-body text-ink-900 transition-colors duration-sm hover:border-ink-400', FOCUS)}
          >
            {expanded ? 'Show fewer screens' : `Show all ${filtered.length} screens`}
          </button>
        )}
      </div>
    </div>
  );
};
