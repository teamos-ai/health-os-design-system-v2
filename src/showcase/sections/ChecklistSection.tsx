/**
 * ChecklistSection: the quick check to run before shipping anything made from the system,
 * then the decisions still waiting on Tumai and what the system does until they are made.
 * Both lists are written into design-system/CHECKLIST.md and REFERENCE.md by scripts/docs.mjs.
 */
import * as React from 'react';
import { Check } from 'lucide-react';
import { Section } from '@/showcase/Section';
import { CHECKLIST, OPEN } from '@/showcase/catalog';
import { cn } from '@/lib/utils';

export const ChecklistSection = () => {
  const [done, setDone] = React.useState<boolean[]>(() => CHECKLIST.map(() => false));
  const count = done.filter(Boolean).length;
  return (
    <Section id="checklist">
      <div className="overflow-hidden rounded-lg border border-line bg-surface">
        <div className="flex items-center justify-between gap-4 border-b border-line bg-surface-2 px-6 py-3">
          <span className="font-sans text-label uppercase text-ink-500">Pre-asset checklist</span>
          <span className="font-sans text-label text-ink-600" aria-live="polite">
            {count} of {CHECKLIST.length} checked
          </span>
        </div>
        <ol className="divide-y divide-line-soft">
          {CHECKLIST.map((item, i) => (
            <li key={item}>
              <label className="flex cursor-pointer items-start gap-4 px-6 py-4 transition-colors duration-sm hover:bg-ink-100/50">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={done[i]}
                  onChange={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                />
                <span
                  aria-hidden
                  className={cn(
                    'mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-sm peer-focus-visible:ring-2 peer-focus-visible:ring-rose-700/40',
                    done[i] ? 'border-rose-700 bg-rose-700 text-white' : 'border-ink-400 bg-surface'
                  )}
                >
                  {done[i] && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                <span className="mt-1 font-sans text-label text-ink-500">{String(i + 1).padStart(2, '0')}</span>
                <span className={cn('font-sans text-body transition-colors duration-sm', done[i] ? 'text-ink-500' : 'text-ink-900')}>{item}</span>
              </label>
            </li>
          ))}
        </ol>
      </div>

      <div id="open-decisions" className="mt-8 scroll-mt-8 overflow-hidden rounded-lg border border-line bg-surface">
        <div className="flex items-center justify-between gap-4 border-b border-line bg-surface-2 px-6 py-3">
          <h3 className="font-sans text-label uppercase text-ink-500">Waiting on a decision</h3>
          <span className="font-sans text-label text-ink-600">{OPEN.length} open</span>
        </div>
        <ul className="divide-y divide-line-soft">
          {OPEN.map((o) => (
            <li key={o.id} className="grid gap-2 px-6 py-5 md:grid-cols-[14rem_1fr] md:gap-8">
              <div>
                <p className="font-display text-body text-ink-900">{o.topic}</p>
                <p className="mt-1 font-sans text-label text-ink-500">{o.ref}</p>
              </div>
              <div>
                <p className="font-sans text-body text-ink-900">{o.question}</p>
                <p className="mt-1 font-sans text-body text-ink-600">For now: {o.current}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
