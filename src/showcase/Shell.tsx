/**
 * Shell — the showcase chrome. A left sidebar that COLLAPSES to a slim icon rail:
 * expanded shows icon + label, collapsed shows just the icon. Either way the active
 * section is tracked on scroll and tinted with that section's own accent (so the
 * highlighted icon's colour changes as you move through the system). Solid ground,
 * no glass.
 */
import * as React from 'react';
import {
  Github,
  PanelLeftClose,
  PanelLeftOpen,
  House,
  LayoutDashboard,
  Palette,
  Hexagon,
  MousePointerClick,
  Tags,
  LayoutTemplate,
  ScrollText,
  Wand2,
  Images,
  Globe,
  Shapes,
  Newspaper,
  Calculator,
  Share2,
  Wallpaper,
  NotebookText,
  LayoutGrid,
  Blocks,
  Smile,
  Clapperboard,
  SlidersHorizontal,
  Rows3,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from 'lucide-react';
import { LogoMark } from '@/components/brand/Logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ACCENTS, type Accent } from '@/lib/accents';
import { cn } from '@/lib/utils';

export interface NavItem {
  id: string;
  label: string;
  Icon: LucideIcon;
  accent: Accent;
}

export const SHOWCASE_NAV: NavItem[] = [
  { id: 'hero', label: 'Home', Icon: House, accent: 'rose' },
  { id: 'video', label: 'Video', Icon: Clapperboard, accent: 'lavender' },
  { id: 'overview', label: 'Overview', Icon: LayoutDashboard, accent: 'lavender' },
  { id: 'tokens', label: 'Tokens', Icon: Palette, accent: 'apricot' },
  { id: 'logo', label: 'Logo', Icon: Hexagon, accent: 'gold' },
  { id: 'icons', label: 'Icons', Icon: Shapes, accent: 'rose' },
  { id: 'buttons', label: 'Buttons', Icon: MousePointerClick, accent: 'lavender' },
  { id: 'badges', label: 'Badges', Icon: Tags, accent: 'apricot' },
  { id: 'elements', label: 'Elements', Icon: SlidersHorizontal, accent: 'rose' },
  { id: 'card-bento', label: 'Cards & bento', Icon: LayoutGrid, accent: 'rose' },
  { id: 'blocks', label: 'Blocks', Icon: Rows3, accent: 'lavender' },
  { id: 'widgets', label: 'Widgets', Icon: Blocks, accent: 'gold' },
  { id: 'signature', label: 'Signature sections', Icon: LayoutTemplate, accent: 'apricot' },
  { id: 'banners', label: 'Banners', Icon: ScrollText, accent: 'rose' },
  { id: 'blog', label: 'Blog', Icon: Newspaper, accent: 'lavender' },
  { id: 'calculators', label: 'Calculators', Icon: Calculator, accent: 'apricot' },
  { id: 'social', label: 'Social media', Icon: Share2, accent: 'gold' },
  { id: 'backgrounds', label: 'Backgrounds', Icon: Wallpaper, accent: 'rose' },
  { id: 'imagery', label: 'Image library', Icon: Images, accent: 'lavender' },
  { id: 'memojis', label: 'Memojis', Icon: Smile, accent: 'apricot' },
  { id: 'notion', label: 'Notion', Icon: NotebookText, accent: 'apricot' },
  { id: 'motion', label: 'Motion', Icon: Wand2, accent: 'gold' },
  { id: 'live', label: 'Live page', Icon: Globe, accent: 'rose' },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export const Shell = ({ children }: { children: React.ReactNode }) => {
  const ids = React.useMemo(() => SHOWCASE_NAV.map((n) => n.id), []);
  const active = useActiveSection(ids);

  const [collapsed, setCollapsed] = React.useState<boolean>(() => {
    try {
      return localStorage.getItem('sidebar-collapsed') === '1';
    } catch {
      return false;
    }
  });
  const toggle = () =>
    setCollapsed((c) => {
      const next = !c;
      try {
        localStorage.setItem('sidebar-collapsed', next ? '1' : '0');
      } catch {
        /* ignore */
      }
      return next;
    });

  // Nav scroll affordance — show a down chevron + bottom fade when there's more nav
  // below the fold, an up chevron once scrolled. The footer lives OUTSIDE this scroll
  // region so "The Health OS Design System" + GitHub are always visible.
  const navRef = React.useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = React.useState({ up: false, down: false });
  const syncOverflow = React.useCallback(() => {
    const el = navRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    setOverflow({
      up: scrollTop > 8,
      down: scrollTop + clientHeight < scrollHeight - 8,
    });
  }, []);
  React.useEffect(() => {
    syncOverflow();
    window.addEventListener('resize', syncOverflow);
    return () => window.removeEventListener('resize', syncOverflow);
  }, [syncOverflow, collapsed]);
  const scrollNav = (dir: 1 | -1) => navRef.current?.scrollBy({ top: dir * 180, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-paper">
      {/* Skip link — first tab stop, visible only on focus */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:border focus:border-line focus:bg-surface focus:px-4 focus:py-2 focus:font-mono focus:text-body-sm focus:text-ink-900 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-600/40"
      >
        Skip to content
      </a>

      {/* Mobile header — logo, section jump list, theme */}
      <div className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-paper px-5 py-3 lg:hidden">
        <LogoMark size={28} />
        <div className="flex min-w-0 items-center gap-3">
          <select
            aria-label="Jump to section"
            value={active}
            onChange={(e) => {
              const id = e.target.value;
              document.getElementById(id)?.scrollIntoView();
            }}
            className="min-w-0 max-w-44 rounded-md border border-line bg-surface px-2.5 py-1.5 font-mono text-caption text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40"
          >
            {SHOWCASE_NAV.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          <ThemeToggle />
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-20 hidden flex-col border-r border-line bg-paper py-7 transition-[width,padding] duration-md ease-out lg:flex',
          collapsed ? 'w-20 px-3' : 'w-64 px-6'
        )}
      >
        {/* Header — logo + collapse toggle */}
        <div className={cn('mb-1 flex items-center', collapsed ? 'flex-col gap-3' : 'justify-between')}>
          <a href="#hero" className="flex items-center" aria-label="Health OS home">
            <LogoMark size={collapsed ? 30 : 34} />
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="flex h-8 w-8 items-center justify-center rounded-md text-ink-500 transition-colors duration-sm hover:bg-ink-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <PanelLeftClose className="h-4 w-4" strokeWidth={1.5} />
            )}
          </button>
        </div>
        {!collapsed && <p className="mb-8 pl-0.5 font-mono text-caption text-ink-600">Design system v2</p>}

        {/* Nav — scrolls independently so the footer below stays pinned on screen */}
        <div className="relative mt-2 min-h-0 flex-1">
          <div
            ref={navRef}
            onScroll={syncOverflow}
            className="h-full overflow-y-auto overscroll-contain pb-2 [scrollbar-width:thin]"
          >
            <nav aria-label="Design system sections" className={cn('flex flex-col gap-1', collapsed && 'items-center')}>
              {SHOWCASE_NAV.map((item) => {
                const isActive = active === item.id;
                const a = ACCENTS[item.accent];
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    title={item.label}
                    aria-label={item.label}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'flex items-center font-mono text-body-sm transition-colors duration-sm',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40',
                      collapsed ? 'h-10 w-10 justify-center rounded-md' : 'gap-2.5 rounded-md px-3 py-2',
                      isActive
                        ? a.well
                        : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
                    )}
                  >
                    <item.Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.5} />
                    {!collapsed && <span>{item.label}</span>}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Bottom fade — only when more nav sits below the fold */}
          <div
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-paper to-transparent transition-opacity duration-sm',
              overflow.down ? 'opacity-100' : 'opacity-0'
            )}
          />

          {/* Scroll chevron — down when more below, up once scrolled */}
          {(overflow.down || overflow.up) && (
            <button
              type="button"
              onClick={() => scrollNav(overflow.down ? 1 : -1)}
              aria-label={overflow.down ? 'Scroll navigation down' : 'Scroll navigation up'}
              title={overflow.down ? 'More below' : 'Back to top'}
              className="absolute bottom-1.5 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-md border border-line bg-surface text-ink-600 shadow-sm transition-colors duration-sm hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40"
            >
              {overflow.down ? (
                <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
              ) : (
                <ChevronUp className="h-4 w-4" strokeWidth={1.5} />
              )}
            </button>
          )}
        </div>

        {/* Footer — pinned, outside the scroll region */}
        <div className={cn('mt-4 shrink-0 border-t border-line pt-5', collapsed && 'flex flex-col items-center gap-4')}>
          {!collapsed ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-caption text-ink-600">Theme</span>
                <ThemeToggle />
              </div>
              <p className="font-mono text-caption leading-relaxed text-ink-600">
                The Health OS<br />Design System
              </p>
              <a
                href="https://github.com/teamos-ai/health-os-design-system-v2"
                className="mt-3 inline-flex items-center gap-2 font-mono text-caption text-ink-600 transition-colors hover:text-ink-900"
              >
                <Github className="h-3.5 w-3.5" strokeWidth={1.5} />
                View on GitHub
              </a>
            </>
          ) : (
            <a
              href="https://github.com/teamos-ai/health-os-design-system-v2"
              aria-label="View on GitHub"
              title="View on GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-md text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
            >
              <Github className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </a>
          )}
        </div>
      </aside>

      {/* Main */}
      <main
        id="main-content"
        className={cn('transition-[padding] duration-md ease-out', collapsed ? 'lg:pl-20' : 'lg:pl-64')}
      >
        {children}
      </main>
    </div>
  );
};
