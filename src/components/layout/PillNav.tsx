/**
 * PillNav — a compact floating centred pill nav (Cherry Note craft). A dark-carbon
 * capsule carrying the mark, a few links and a white CTA pill. Self-contained dark
 * element, so it reads on every theme. Sits at the top of the design-system hero.
 */
import { LogoMark } from '@/components/brand/Logo';
import { HERO_NAV } from '@/data/system';
import { cn } from '@/lib/utils';

export const PillNav = ({ className }: { className?: string }) => (
  <nav
    className={cn(
      'inline-flex items-center gap-1 rounded-full bg-carbon p-1.5 pl-2.5 shadow-carbon',
      className
    )}
  >
    <a href="#hero" aria-label="Health OS home" className="mr-1 flex items-center">
      <LogoMark size={22} />
    </a>
    {HERO_NAV.map((link) => (
      <a
        key={link.label}
        href={link.href}
        className="hidden rounded-full px-4 py-2 font-mono text-body-sm text-white/70 transition-colors duration-sm hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:block"
      >
        {link.label}
      </a>
    ))}
    <a
      href="#components"
      className="ml-1 rounded-full bg-white px-4 py-2 font-display text-body-sm font-medium text-carbon transition-colors duration-sm hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      Get started
    </a>
  </nav>
);
