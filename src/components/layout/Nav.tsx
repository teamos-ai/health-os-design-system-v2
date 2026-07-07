/**
 * Nav — sticky centered marketing nav. Logo left, centred text
 * links, an inline command/search bar, dark-carbon pill CTA. Solid warm-ivory ground
 * with a hairline that deepens to a soft shadow on scroll — no glass, no blur tint.
 * Below lg the links collapse into a hamburger-toggled dropdown panel.
 */
import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { LogoMark } from '@/components/brand/Logo';
import { CommandBar } from '@/components/ui/command-bar';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { NAV_LINKS } from '@/data/system';
import { cn } from '@/lib/utils';

/* Branded focus ring for nav links (light ground). */
const LINK_FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 focus-visible:ring-offset-2';

export interface NavProps {
  className?: string;
  sticky?: boolean;
  /**
   * href of the current page — the matching link gets brand text + `aria-current="page"`.
   * Undefined (default) marks nothing active; we never guess.
   */
  activeHref?: string;
}

export const Nav = ({ className, sticky = true, activeHref }: NavProps) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (!sticky) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sticky]);

  /* Escape closes the mobile menu and hands focus back to the trigger. */
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const isActive = (href: string) => activeHref !== undefined && href === activeHref;

  return (
    <header
      className={cn(
        'z-40 w-full border-b border-line bg-paper transition-shadow duration-md',
        sticky ? 'sticky top-0' : 'relative',
        sticky && scrolled && 'shadow-sm',
        className
      )}
    >
      <nav className="mx-auto grid h-16 max-w-container grid-cols-[auto_1fr_auto] items-center gap-4 px-6">
        {/* Left — logo */}
        <a
          href="#top"
          className={cn('flex items-center rounded-sm', LINK_FOCUS)}
          aria-label="Health OS home"
        >
          <LogoMark size={32} />
        </a>

        {/* Centre — links */}
        <div className="hidden items-center justify-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={cn(
                'rounded-md px-3 py-2 font-mono text-body-sm transition-colors duration-sm hover:bg-ink-100 hover:text-ink-900',
                LINK_FOCUS,
                isActive(link.href) ? 'text-accent' : 'text-ink-600'
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right — search + CTA + mobile menu trigger */}
        <div className="flex items-center justify-end gap-3">
          <CommandBar
            size="md"
            shortcut={false}
            placeholder="Search"
            containerClassName="hidden w-44 xl:flex"
            aria-label="Search the platform"
          />
          <ThemeToggle />
          <Button variant="dark" size="sm">
            Book a demo
          </Button>
          <IconButton
            ref={menuButtonRef}
            variant="ghost"
            size="sm"
            className="lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </IconButton>
        </div>
      </nav>

      {/* Mobile menu — full-width dropdown under the header (below lg) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="nav-mobile-menu"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="absolute inset-x-0 top-full border-b border-line bg-paper shadow-md lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="mx-auto flex max-w-container flex-col gap-1 px-6 py-4"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'rounded-sm px-3 py-2.5 font-mono text-body-md transition-colors duration-sm',
                    'hover:bg-ink-100 hover:text-ink-900 active:bg-ink-200',
                    LINK_FOCUS,
                    isActive(link.href) ? 'text-accent' : 'text-ink-600'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
