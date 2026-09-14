/**
 * DirectoryCompare: a typical stack of separate tools against Health OS, as a real table.
 * Names jobs, never competitors. Scrolls inside its own container on small screens.
 */
import { Check, X } from 'lucide-react';
import { FadeIn } from '@/components/ui/animated';
import { COMPARE_ROWS } from '@/data/system';

export const DirectoryCompare = ({ id = 'compare' }: { id?: string }) => (
  <section id={id} className="py-16 md:py-24">
    <div className="mx-auto max-w-container px-6">
      <FadeIn className="mb-12 max-w-2xl">
        <h2 className="font-display text-heading text-ink-900">Patched together, or one system</h2>
        <p className="mt-4 font-sans text-body text-ink-600">The same jobs, done across separate logins, or done once in one place.</p>
      </FadeIn>
      <FadeIn delay={0.05} y={16}>
        <div className="relative overflow-x-auto rounded-lg border border-line bg-surface">
          <table className="w-full min-w-[560px] border-collapse">
            <caption className="sr-only">A typical stack of separate tools compared with Health OS</caption>
            <thead>
              <tr className="border-b border-line bg-surface-2">
                <th scope="col" className="px-6 py-4 text-left font-sans text-label uppercase text-ink-500">Job</th>
                <th scope="col" className="px-4 py-4 text-left font-sans text-label uppercase text-ink-500">Typical stack</th>
                <th scope="col" className="bg-rose-50 px-4 py-4 text-left font-sans text-label uppercase text-ink-900">Health OS</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-line last:border-b-0">
                  <th scope="row" className="px-6 py-4 text-left font-sans text-body font-normal text-ink-900">{row.feature}</th>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-2 font-sans text-body text-ink-500">
                      <X className="h-4 w-4 shrink-0 text-ink-400" strokeWidth={1.5} aria-hidden />
                      {row.stack}
                    </span>
                  </td>
                  <td className="bg-rose-50/50 px-4 py-4">
                    <span className="flex items-center gap-2 font-sans text-body text-ink-900">
                      <Check className="h-4 w-4 shrink-0 text-success-600" strokeWidth={2} aria-hidden />
                      {row.healthos}
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
