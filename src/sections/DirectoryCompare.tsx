/**
 * DirectoryCompare — the directory / comparison section (comparisons
 * rhythm). A calm hairline table: your current stack, patched together, versus Health
 * OS, one system. The Health OS column carries a soft rose tint and a check; the stack
 * column stays muted. AA throughout, zero glass.
 */
import { Check, X } from 'lucide-react';
import { FadeIn } from '@/components/ui/animated';
import { MonoLabel } from '@/components/ui/mono-label';
import { COMPARE_ROWS } from '@/data/system';

export const DirectoryCompare = ({ id = 'compare' }: { id?: string }) => (
  <section id={id} className="py-16 md:py-24">
    <div className="mx-auto max-w-container px-6">
      <div className="mb-12 mx-auto flex max-w-2xl flex-col items-center text-center">
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
        {/* A real table for row/column semantics; below sm it scrolls inside its own
            container rather than crushing three columns into a phone viewport. */}
        <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
          <table className="w-full min-w-[560px] border-collapse">
            <caption className="sr-only">
              Capability comparison — a typical stack of tools versus Health OS
            </caption>
            <thead>
              <tr className="border-b border-line bg-paper">
                <th scope="col" className="px-5 py-4 text-left font-mono text-overline font-bold uppercase text-ink-500 md:px-7">
                  Capability
                </th>
                <th scope="col" className="px-4 py-4 text-center font-mono text-overline font-bold uppercase text-ink-600 md:px-5">
                  Typical stack
                </th>
                <th scope="col" className="bg-rose-50 px-4 py-4 text-center font-mono text-overline font-bold uppercase text-brand-700 md:px-5">
                  Health OS
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i < COMPARE_ROWS.length - 1 ? 'border-b border-line' : ''}
                >
                  <th scope="row" className="px-5 py-4 text-left font-sans text-body-md font-normal text-ink-700 md:px-7">
                    {row.feature}
                  </th>
                  <td className="px-4 py-4 md:px-5">
                    <span className="flex items-center justify-center gap-2">
                      <X className="h-4 w-4 shrink-0 text-ink-400" strokeWidth={1.5} aria-hidden />
                      <span className="font-mono text-body-sm text-ink-600">{row.stack}</span>
                    </span>
                  </td>
                  <td className="bg-rose-50/60 px-4 py-4 md:px-5">
                    <span className="flex items-center justify-center gap-2">
                      <Check className="h-4 w-4 shrink-0 text-brand-600" strokeWidth={2} aria-hidden />
                      <span className="font-mono text-body-sm font-bold text-brand-700">{row.healthos}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>
    </div>
  </section>
);
