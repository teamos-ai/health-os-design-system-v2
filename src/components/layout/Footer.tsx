/**
 * Footer: the rounded carbon panel. One closing message and action on the left, link
 * columns and a newsletter field on the right, then the legal line. The carbon panel is a
 * fixed dark surface in both themes, so its text and focus rings are white.
 */
import * as React from 'react';
import { Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import { LogoMark } from '@/components/brand/Logo';
import { Button } from '@/components/ui/button';
import { FOOTER_COLUMNS } from '@/data/system';
import { cn } from '@/lib/utils';

const SOCIALS = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Youtube, label: 'YouTube' },
];

const CARBON_FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-carbon';

export const Footer = ({ className }: { className?: string }) => {
  const [subscribed, setSubscribed] = React.useState(false);

  return (
    <footer className={cn('bg-paper px-4 pb-4', className)}>
      <div className="relative mx-auto max-w-container-wide overflow-hidden rounded-lg bg-carbon px-8 py-16 text-white md:px-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col items-start gap-8">
            <LogoMark size={36} />
            <div className="max-w-md">
              <h2 className="font-display text-subheading text-white">You built it. Now make it run without you.</h2>
              <p className="mt-4 font-sans text-body text-white/70">
                A short walkthrough of what still routes through you, and what could run on its own.
              </p>
            </div>
            <Button
              href="#book"
              className="focus-visible:ring-offset-carbon"
              trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />}
            >
              Book the walkthrough
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <nav aria-label="Footer" className="contents">
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.heading} className="flex flex-col gap-3">
                  <h3 className="font-sans text-label uppercase text-white/60">{col.heading}</h3>
                  {col.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className={cn('rounded-md font-sans text-body text-white/80 transition-colors duration-sm hover:text-white', CARBON_FOCUS)}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              ))}
            </nav>

            <div className="col-span-2 max-w-sm sm:col-span-4 lg:col-span-2 xl:col-span-4">
              <h3 className="mb-3 font-sans text-label uppercase text-white/60">Notes, now and then</h3>
              {subscribed ? (
                <p aria-live="polite" className="font-sans text-body text-white/80">
                  You are on the list.
                </p>
              ) : (
                <form
                  className="flex w-full items-center gap-2 rounded-md bg-white/10 p-1 transition-colors focus-within:bg-white/15"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubscribed(true);
                  }}
                >
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="Email address"
                    className="w-full rounded-md bg-transparent px-3 py-2 font-sans text-body text-white placeholder-white/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className={cn('shrink-0 rounded-md bg-white px-4 py-2 font-display text-body text-carbon transition-colors hover:bg-white/90', CARBON_FOCUS)}
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 font-sans text-label text-white/60 sm:flex-row">
          <p>© 2026 Health OS, a product of OS A.I</p>
          <div className="flex gap-4">
            {SOCIALS.map(({ icon: Icon, label }) => (
              <a key={label} href="#" aria-label={label} className={cn('rounded-md p-1 text-white/60 transition-colors hover:text-white', CARBON_FOCUS)}>
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
