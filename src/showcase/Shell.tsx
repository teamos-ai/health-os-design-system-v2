/**
 * Shell: the reference site frame. A left rail grouped Start, Foundations, Library,
 * Applied and Proof. It collapses to icons (remembered), highlights the section in view,
 * and pins the theme switch. On small screens a sticky header offers a section jump list.
 */
import * as React from 'react';
import { Github, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { LogoMark } from '@/components/brand/Logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { NAV } from '@/showcase/registry';
import { GROUPS } from '@/showcase/catalog';
import { cn } from '@/lib/utils';

function useActiveSection(ids: string[]) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        let best = '';
        let max = 0;
        ratios.forEach((r, id) => {
          if (r > max) {
            max = r;
            best = id;
          }
        });
        if (best) setActive(best);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const REPO = 'https://github.com/teamos-ai/health-os-design-system-v2';

export const Shell = ({ children }: { children: React.ReactNode }) => {
  const ids = React.useMemo(() => NAV.map((n) => n.id), []);
  const active = useActiveSection(ids);
  const navRef = React.useRef<HTMLElement>(null);
  /* keep the current section's link inside the rail's own scroll area */
  React.useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!nav || !link) return;
    const top = link.offsetTop - nav.offsetTop;
    if (top < nav.scrollTop + 8 || top + link.offsetHeight > nav.scrollTop + nav.clientHeight - 8) {
      nav.scrollTo({ top: Math.max(0, top - nav.clientHeight / 2), behavior: 'smooth' });
    }
  }, [active]);
  const [collapsed, setCollapsed] = React.useState<boolean>(() => {
    try {
      return localStorage.getItem('sidebar-collapsed') === '1';
    } catch {
      return false;
    }
  });
  const toggle = () =>
    setCollapsed((c) => {
      try {
        localStorage.setItem('sidebar-collapsed', c ? '0' : '1');
      } catch {
        /* storage unavailable */
      }
      return !c;
    });

  return (
    <div className="min-h-screen bg-paper">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:border focus:border-line focus:bg-surface focus:px-4 focus:py-2 focus:font-sans focus:text-body focus:text-ink-900 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-ink-900"
      >
        Skip to content
      </a>

      {/* Small screens: logo, jump list, theme */}
      <div className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-paper px-5 py-3 lg:hidden">
        <LogoMark size={28} />
        <div className="flex min-w-0 items-center gap-3">
          <label htmlFor="jump" className="sr-only">
            Jump to section
          </label>
          <select
            id="jump"
            value={active}
            onChange={(e) => document.getElementById(e.target.value)?.scrollIntoView()}
            className="min-w-0 max-w-48 rounded-md border border-line bg-surface px-3 py-2 font-sans text-body text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900"
          >
            {GROUPS.map((g) => (
              <optgroup key={g} label={g}>
                {NAV.filter((n) => n.group === g).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <ThemeToggle />
        </div>
      </div>

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-20 hidden flex-col border-r border-line bg-paper py-6 lg:flex',
          collapsed ? 'w-20 px-3' : 'w-64 px-5'
        )}
      >
        <div className={cn('flex items-center', collapsed ? 'flex-col gap-3' : 'justify-between')}>
          <a href="#hero" className="flex items-center gap-3 rounded-md" aria-label="Health OS design system home">
            <LogoMark size={collapsed ? 30 : 32} />
            {!collapsed && <span className="font-display text-body text-ink-900">Design system</span>}
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="flex h-8 w-8 items-center justify-center rounded-md text-ink-500 transition-colors duration-sm hover:bg-ink-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900"
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" strokeWidth={1.5} /> : <PanelLeftClose className="h-4 w-4" strokeWidth={1.5} />}
          </button>
        </div>

        <nav ref={navRef} aria-label="Design system sections" className="no-scrollbar mt-6 min-h-0 flex-1 overflow-y-auto overscroll-contain pb-4">
          {GROUPS.map((group) => (
            <div key={group} className="mb-4 last:mb-0">
              {collapsed ? (
                <span aria-hidden className="mx-auto mb-2 block h-px w-6 bg-line" />
              ) : (
                <p className="mb-1 px-3 font-sans text-label uppercase text-ink-500">{group}</p>
              )}
              <ul className={cn('flex flex-col gap-1', collapsed && 'items-center')}>
                {NAV.filter((n) => n.group === group).map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        title={item.label}
                        aria-current={isActive ? 'location' : undefined}
                        className={cn(
                          'flex items-center rounded-md font-sans text-body transition-colors duration-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900',
                          collapsed ? 'h-10 w-10 justify-center' : 'gap-3 px-3 py-2',
                          isActive ? 'bg-apricot-50 text-ink-900' : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
                        )}
                      >
                        <item.Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                        {collapsed ? <span className="sr-only">{item.label}</span> : <span className="truncate">{item.label}</span>}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className={cn('shrink-0 border-t border-line pt-4', collapsed ? 'flex flex-col items-center gap-3' : 'flex items-center justify-between')}>
          <ThemeToggle />
          <a
            href={REPO}
            aria-label="View on GitHub"
            title="View on GitHub"
            className="flex h-8 w-8 items-center justify-center rounded-md text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900"
          >
            <Github className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>
      </aside>

      <main id="main-content" className={collapsed ? 'lg:pl-20' : 'lg:pl-64'}>
        {children}
      </main>
    </div>
  );
};
