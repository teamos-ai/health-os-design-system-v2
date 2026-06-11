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
  Component,
  LayoutTemplate,
  ScrollText,
  Wand2,
  Images,
  Globe,
  Shapes,
  LayoutGrid,
  Newspaper,
  Calculator,
  Share2,
  Wallpaper,
  NotebookText,
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
  { id: 'overview', label: 'Overview', Icon: LayoutDashboard, accent: 'lavender' },
  { id: 'tokens', label: 'Tokens', Icon: Palette, accent: 'apricot' },
  { id: 'logo', label: 'Logo', Icon: Hexagon, accent: 'gold' },
  { id: 'icons', label: 'Icons', Icon: Shapes, accent: 'rose' },
  { id: 'components', label: 'Components', Icon: Component, accent: 'lavender' },
  { id: 'signature', label: 'Signature sections', Icon: LayoutTemplate, accent: 'apricot' },
  { id: 'bento-box', label: 'Bento box', Icon: LayoutGrid, accent: 'gold' },
  { id: 'banners', label: 'Banners', Icon: ScrollText, accent: 'rose' },
  { id: 'blog', label: 'Blog', Icon: Newspaper, accent: 'lavender' },
  { id: 'calculators', label: 'Calculators', Icon: Calculator, accent: 'apricot' },
  { id: 'social', label: 'Social media', Icon: Share2, accent: 'gold' },
  { id: 'backgrounds', label: 'Backgrounds', Icon: Wallpaper, accent: 'rose' },
  { id: 'imagery', label: 'Image library', Icon: Images, accent: 'lavender' },
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

  return (
    <div className="min-h-screen bg-paper">
      {/* Mobile header */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-paper px-5 py-3 lg:hidden">
        <LogoMark size={28} />
        <div className="flex items-center gap-3">
          <span className="font-mono text-caption text-ink-600">Design system v2</span>
          <ThemeToggle />
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-20 hidden flex-col border-r border-line bg-paper py-7 transition-[width,padding] duration-md ease-out lg:flex',
          collapsed ? 'w-[76px] px-3' : 'w-64 px-6'
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

        {/* Nav */}
        <nav className={cn('flex flex-col gap-1', collapsed ? 'mt-6 items-center' : '')}>
          {SHOWCASE_NAV.map((item) => {
            const isActive = active === item.id;
            const a = ACCENTS[item.accent];
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                title={item.label}
                aria-label={item.label}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'flex items-center font-mono text-body-sm transition-colors duration-sm',
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

        {/* Footer */}
        <div className={cn('mt-auto border-t border-line pt-5', collapsed && 'flex flex-col items-center gap-4')}>
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
      <main className={cn('transition-[padding] duration-md ease-out', collapsed ? 'lg:pl-[76px]' : 'lg:pl-64')}>
        {children}
      </main>
    </div>
  );
};
