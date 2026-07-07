/**
 * OutcomeBand — the "trusted by" outcome stat band (design.md). Outcome-first, no logos
 * theatre: tools consolidated, hours returned, days to live, one source of truth.
 * Count-ups are reduced-motion safe.
 */
import { Stat } from '@/components/ui/stat';
import { FadeIn } from '@/components/ui/animated';
import { MonoLabel } from '@/components/ui/mono-label';
import { OUTCOME_STATS } from '@/data/system';

export const OutcomeBand = ({ id = 'outcomes' }: { id?: string }) => (
  <section id={id} className="py-16 md:py-24">
    <div className="mx-auto max-w-container px-6">
      <FadeIn className="mb-10 flex flex-col items-center text-center">
        <MonoLabel>The outcome</MonoLabel>
        <h2 className="mt-4 font-display text-h2 text-ink-900">What changes in the first month</h2>
      </FadeIn>

      <FadeIn delay={0.05} y={16}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 rounded-2xl border border-line bg-paper px-8 py-12 md:grid-cols-4 md:px-12">
          {OUTCOME_STATS.map((stat) => (
            <Stat
              key={stat.label}
              value={stat.value}
              display={stat.display}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={stat.label}
              align="center"
            />
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);
