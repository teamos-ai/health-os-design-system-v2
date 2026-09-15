/**
 * CalculatorsSection: a working lead-magnet calculator. The visitor lists the tools they pay
 * for and their monthly cost; the result totals the month and the year. Inputs only, never
 * pre-filled costs, and no savings promise.
 */
import * as React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Section, Example } from '@/showcase/Section';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { Figure } from '@/components/widgets';

interface Row {
  id: number;
  name: string;
  cost: string;
}

const money = (n: number) => n.toLocaleString('en-AU', { maximumFractionDigits: 0 });

export const CalculatorsSection = () => {
  const [rows, setRows] = React.useState<Row[]>([
    { id: 1, name: '', cost: '' },
    { id: 2, name: '', cost: '' },
    { id: 3, name: '', cost: '' },
  ]);
  const [result, setResult] = React.useState<{ monthly: number; count: number } | null>(null);
  const nextId = React.useRef(4);

  const update = (id: number, key: 'name' | 'cost', value: string) => setRows((r) => r.map((row) => (row.id === id ? { ...row, [key]: value } : row)));

  const calculate = () => {
    const filled = rows.filter((r) => Number(r.cost) > 0);
    setResult({ monthly: filled.reduce((a, r) => a + Number(r.cost), 0), count: filled.length });
  };

  return (
    <Section id="calculators">
      <Example id="stack-calculator" label="Stack cost calculator">
        <div className="grid gap-6 lg:grid-cols-2">
          <form
            className="rounded-lg border border-line bg-surface p-6"
            onSubmit={(e) => {
              e.preventDefault();
              calculate();
            }}
          >
            <h3 className="font-display text-subheading text-ink-900">Count your stack</h3>
            <p className="mt-2 font-sans text-body text-ink-600">List each tool you pay for and what it costs you each month.</p>
            <div className="mt-6 flex flex-col gap-3">
              <div className="grid grid-cols-[1fr_7rem_2.75rem] gap-3 font-sans text-label uppercase text-ink-500" aria-hidden>
                <span>Tool</span>
                <span>AUD / month</span>
                <span />
              </div>
              {rows.map((row, i) => (
                <div key={row.id} className="grid grid-cols-[1fr_7rem_2.75rem] gap-3">
                  <input
                    aria-label={`Tool ${i + 1} name`}
                    placeholder="Booking app"
                    value={row.name}
                    onChange={(e) => update(row.id, 'name', e.target.value)}
                    className="h-11 min-w-0 rounded-md border border-line bg-surface px-3 font-sans text-body text-ink-900 placeholder:text-ink-500 focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900 [&::-webkit-search-cancel-button]:appearance-none"
                  />
                  <input
                    aria-label={`Tool ${i + 1} monthly cost in AUD`}
                    inputMode="decimal"
                    type="number"
                    min={0}
                    placeholder="0"
                    value={row.cost}
                    onChange={(e) => update(row.id, 'cost', e.target.value)}
                    className="h-11 min-w-0 rounded-md border border-line bg-surface px-3 font-sans text-body tabular-nums text-ink-900 placeholder:text-ink-500 focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900 [&::-webkit-search-cancel-button]:appearance-none"
                  />
                  <IconButton
                    variant="text"
                    aria-label={`Remove tool ${i + 1}`}
                    disabled={rows.length === 1}
                    onClick={() => setRows((r) => r.filter((x) => x.id !== row.id))}
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                  </IconButton>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <Button
                variant="text"
                size="small"
                leadingIcon={<Plus className="h-4 w-4" strokeWidth={1.5} />}
                onClick={() => setRows((r) => [...r, { id: nextId.current++, name: '', cost: '' }])}
              >
                Add a tool
              </Button>
              <Button type="submit">Add it up</Button>
            </div>
          </form>

          <div className="flex flex-col rounded-lg border border-line bg-paper p-6" aria-live="polite">
            <p className="font-sans text-label uppercase text-ink-500">Your result</p>
            {result && result.count > 0 ? (
              <div className="mt-6 flex flex-1 flex-col">
                <p className="font-sans text-body text-ink-600">
                  {result.count} {result.count === 1 ? 'tool' : 'tools'} cost you
                </p>
                <Figure key={result.monthly} value={result.monthly} prefix="$" className="mt-2 block font-display text-heading text-ink-900" />
                <p className="font-sans text-body text-ink-600">AUD each month</p>
                <p className="mt-6 font-display text-subheading text-ink-900">${money(result.monthly * 12)} AUD a year</p>
                <p className="mt-auto pt-6 font-sans text-label text-ink-500">Based only on the costs you entered.</p>
              </div>
            ) : (
              <div className="mt-6 flex flex-1 items-center rounded-md border border-dashed border-line p-6">
                <p className="font-sans text-body text-ink-600">Add the monthly cost of each tool, then add it up to see your month and your year.</p>
              </div>
            )}
          </div>
        </div>
      </Example>
    </Section>
  );
};
