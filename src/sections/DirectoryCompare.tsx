/**
 * DirectoryCompare — the directory / comparison section (efficient.app comparisons
 * rhythm). A calm hairline table: your current stack, patched together, versus Health
 * OS, one system. The Health OS column carries a soft rose tint and a check; the stack
 * column stays muted. AA throughout, zero glass.
 */
import { Check, X } from 'lucide-react';
import { FadeIn } from '@/components/ui/animated';
import { MonoLabel } from '@/components/ui/mono-label';
import { COMPARE_ROWS } from '@/data/system';

export const DirectoryCompare = ({ id = 'compare' }: { id?: string }) => (
  <section id={id} className="py-20 md:py-24">
    <div className="mx-auto max-w-container px-6">
      <div className="mb-12 max-w-2xl">
        <FadeIn>
          <MonoLabel>Your stack vs Health OS</MonoLabel>
        </FadeIn>
        <FadeIn delay={0.05} className="mt-4">
          <h2 className="font-display text-h1 text-ink-900">Patched together, or one system</h2>
        </FadeIn>
        <FadeIn delay={0.1} className="mt-4">
          <p className="font-sans text-body-lg leading-relaxed text-ink-600">
            The same jobs, done six ways across six logins — or once, in a place built to
            hold them all.
          </p>
        </FadeIn>
      </div>

      <FadeIn delay={0.05} y={16}>
        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
          {/* Header */}
          <div className="grid grid-cols-[1.5fr_1fr_1fr] items-center border-b border-line bg-paper">
            <div className="px-5 py-4 font-mono text-overline uppercase text-ink-500 md:px-7">
              Capability
            </div>
            <div className="px-4 py-4 text-center font-mono text-overline uppercase text-ink-600 md:px-5">
              Typical stack
            </div>
            <div className="bg-rose-50 px-4 py-4 text-center font-mono text-overline uppercase text-brand-700 md:px-5">
              Health OS
            </div>
          </div>

          {/* Rows */}
          {COMPARE_ROWS.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1.5fr_1fr_1fr] items-center ${
                i < COMPARE_ROWS.length - 1 ? 'border-b border-line' : ''
              }`}
            >
              <div className="px-5 py-4 font-sans text-body-md text-ink-800 md:px-7">
                {row.feature}
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-4 md:px-5">
                <X className="h-4 w-4 shrink-0 text-ink-400" strokeWidth={1.5} aria-hidden />
                <span className="font-mono text-body-sm text-ink-600">{row.stack}</span>
              </div>
              <div className="flex h-full items-center justify-center gap-2 bg-rose-50/60 px-4 py-4 md:px-5">
                <Check className="h-4 w-4 shrink-0 text-brand-600" strokeWidth={2} aria-hidden />
                <span className="font-mono text-body-sm font-bold text-brand-700">{row.healthos}</span>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);
