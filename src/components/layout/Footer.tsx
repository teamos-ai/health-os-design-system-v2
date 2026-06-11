/**
 * Footer — the rounded dark-carbon panel (Cherry Note craft, Health OS skin). Inset
 * rounded carbon card with subtle grain, a "ready to simplify" CTA, link columns, a
 * newsletter field and a calm bottom row. Wordmark goes inverse. No glass.
 */
import * as React from 'react';
import { Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import { LogoMark } from '@/components/brand/Logo';
import { FOOTER_COLUMNS } from '@/data/system';
import { cn } from '@/lib/utils';

const SOCIALS = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Youtube, label: 'YouTube' },
];

export const Footer = ({ className }: { className?: string }) => (
  <footer className={cn('bg-paper px-4 pb-4', className)}>
    <div className="grain-dark relative mx-auto max-w-[1320px] overflow-hidden rounded-3xl bg-carbon px-8 py-16 text-white shadow-carbon md:px-14 md:py-20">
      <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        {/* Left — CTA */}
        <div className="flex flex-col gap-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-success-600" />
            <span className="font-mono text-overline uppercase text-white/70">Systems operational</span>
          </span>

          <div className="max-w-md">
            <h2 className="font-display text-h2 leading-tight text-white">
              Ready to simplify your practice?
            </h2>
            <p className="mt-4 font-sans text-body-lg leading-relaxed text-white/60">
              Book a discovery call and we will map your current stack onto one calm system.
            </p>
          </div>

          <a
            href="#book"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-7 py-3.5 font-display text-body-md font-medium text-carbon transition-transform duration-sm ease-out hover:-translate-y-0.5"
          >
            Book a discovery call
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </a>

          <LogoMark size={36} inverse />
        </div>

        {/* Right — columns + newsletter */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3.5">
              <h4 className="font-mono text-overline uppercase text-white/60">{col.heading}</h4>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-sans text-body-sm text-white/75 transition-colors duration-sm hover:text-white"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}

          <div className="col-span-2 max-w-xs sm:col-span-4 lg:col-span-2 xl:col-span-4">
            <h4 className="mb-3 font-mono text-overline uppercase text-white/60">Stay in the loop</h4>
            <form
              className="flex w-full items-center gap-2 rounded-full bg-white/10 p-1 pr-1.5 transition-colors focus-within:bg-white/15"
              onSubmit={(e: React.FormEvent) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Email address"
                aria-label="Email address"
                className="w-full bg-transparent px-4 py-2 font-mono text-body-sm text-white placeholder-white/60 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-white px-4 py-2 font-display text-body-sm font-medium text-carbon transition-colors hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-carbon"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="relative z-10 mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 font-mono text-caption text-white/60 sm:flex-row">
        <p>© 2026 Health OS. Built for practitioners.</p>
        <div className="flex gap-5">
          {SOCIALS.map(({ icon: Icon, label }) => (
            <a key={label} href="#" aria-label={label} className="text-white/50 transition-colors hover:text-white">
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
