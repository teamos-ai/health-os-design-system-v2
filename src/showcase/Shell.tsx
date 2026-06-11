/**
 * Shell — the Apple-style showcase chrome. Fixed left sidebar with the logo, a grouped
 * section nav that tracks the active section on scroll, and a calm footer note. Main
 * content scrolls beside it. Solid warm-ivory — no glass.
 */
import * as React from 'react';
import { Github } from 'lucide-react';
import { LogoMark } from '@/components/brand/Logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';

export interface NavItem {
  id: string;
  label: string;
}

export const SHOWCASE_NAV: NavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'logo', label: 'Logo' },
  { id: 'components', label: 'Components' },
  { id: 'signature', label: 'Signature sections' },
  { id: 'motion', label: 'Motion' },
  { id: 'imagery', label: 'Image library' },
  { id: 'live', label: 'Live page' },
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
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-line bg-paper px-6 py-7 lg:flex">
        <a href="#overview" className="mb-1 flex items-center" aria-label="Health OS">
          <LogoMark size={32} />
        </a>
        <p className="mb-8 pl-0.5 font-mono text-caption text-ink-600">Design system v2</p>

        <nav className="flex flex-col gap-0.5">
          {SHOWCASE_NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  'flex items-center gap-2.5 rounded-md px-3 py-2 font-mono text-body-sm transition-colors duration-sm',
                  isActive ? 'bg-rose-50 text-brand-700' : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
                )}
              >
                <span
                  className={cn(
                    'h-1.5 w-1.5 shrink-0 rounded-full transition-colors',
                    isActive ? 'bg-brand-400' : 'bg-ink-300'
                  )}
                />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-line pt-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-caption text-ink-600">Theme</span>
            <ThemeToggle />
          </div>
          <p className="font-mono text-caption leading-relaxed text-ink-600">
            efficient.app structure ·<br />Health OS skin
          </p>
          <a
            href="https://github.com/teamos-ai/health-os-design-system-v2"
            className="mt-3 inline-flex items-center gap-2 font-mono text-caption text-ink-600 transition-colors hover:text-ink-900"
          >
            <Github className="h-3.5 w-3.5" strokeWidth={1.5} />
            View on GitHub
          </a>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:pl-64">{children}</main>
    </div>
  );
};
