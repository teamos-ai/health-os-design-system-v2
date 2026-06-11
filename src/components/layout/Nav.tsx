/**
 * Nav — sticky centered marketing nav (efficient.app craft). Logo left, centred text
 * links, an inline command/search bar, dark-carbon pill CTA. Solid warm-ivory ground
 * with a hairline that deepens to a soft shadow on scroll — no glass, no blur tint.
 */
import * as React from 'react';
import { Logo } from '@/components/brand/Logo';
import { CommandBar } from '@/components/ui/command-bar';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/data/system';
import { cn } from '@/lib/utils';

export const Nav = ({ className, sticky = true }: { className?: string; sticky?: boolean }) => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    if (!sticky) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sticky]);

  return (
    <header
      className={cn(
        'z-40 w-full border-b bg-paper transition-shadow duration-md',
        sticky ? 'sticky top-0' : 'relative',
        sticky && scrolled ? 'border-line shadow-sm' : 'border-line',
        className
      )}
    >
      <nav className="mx-auto grid h-16 max-w-container grid-cols-[auto_1fr_auto] items-center gap-4 px-6">
        {/* Left — logo */}
        <a href="#top" className="flex items-center" aria-label="Health OS home">
          <Logo size={34} />
        </a>

        {/* Centre — links */}
        <div className="hidden items-center justify-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-2 font-mono text-body-sm text-ink-600 transition-colors duration-sm hover:bg-ink-100 hover:text-ink-900"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right — search + CTA */}
        <div className="flex items-center justify-end gap-3">
          <CommandBar
            size="md"
            shortcut={false}
            placeholder="Search"
            containerClassName="hidden w-44 xl:flex"
            aria-label="Search the platform"
          />
          <Button variant="dark" size="sm">
            Book a demo
          </Button>
        </div>
      </nav>
    </header>
  );
};
