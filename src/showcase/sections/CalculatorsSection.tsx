/**
 * CalculatorsSection — the tokenised health calculators that drop onto practitioner
 * websites. The sample revenue calculator is fully working (controlled inputs → live
 * result); the keypad row below is a visual spec of the calculator button style, not
 * an input device, so it renders as non-interactive tiles.
 */
import * as React from 'react';
import { CalendarCheck, DollarSign, Percent } from 'lucide-react';
import { Section, Demo } from '@/showcase/Section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Stat } from '@/components/ui/stat';
import { MonoLabel } from '@/components/ui/mono-label';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const money = (n: number) =>
  '$' + Math.round(n).toLocaleString('en-AU');

export const CalculatorsSection = () => {
  const [sessions, setSessions] = React.useState('20');
  const [fee, setFee] = React.useState('120');
  const [rate, setRate] = React.useState('80');
  const [result, setResult] = React.useState<{ monthly: number; perWeek: number; sessionsPerMonth: number } | null>(null);

  const calculate = () => {
    const s = Math.max(0, Number(sessions) || 0);
    const f = Math.max(0, Number(fee) || 0);
    const r = Math.min(100, Math.max(0, Number(rate) || 0)) / 100;
    const booked = s * r;
    setResult({
      perWeek: booked * f,
      monthly: booked * f * 4,
      sessionsPerMonth: Math.round(booked * 4),
    });
  };

  return (
    <Section
      id="calculators"
      eyebrow="Tools"
      title="Calculators"
      lead="Tokenised calculator components that drop onto a practitioner's website — same family, same tokens, transferable from one practice to the next. This sample is live: enter your numbers and calculate."
    >
      <Demo label="Sample calculator — live">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Inputs */}
          <form
            className="rounded-lg border border-line bg-surface p-6"
            onSubmit={(e) => {
              e.preventDefault();
              calculate();
            }}
          >
            <MonoLabel number="01">Revenue estimate</MonoLabel>
            <div className="mt-5 flex flex-col gap-4">
              <Input
                label="Sessions per week"
                icon={CalendarCheck}
                type="number"
                min={0}
                value={sessions}
                onChange={(e) => setSessions(e.target.value)}
              />
              <Input
                label="Average fee ($)"
                icon={DollarSign}
                type="number"
                min={0}
                value={fee}
                onChange={(e) => setFee(e.target.value)}
              />
              <Input
                label="Booked rate (%)"
                icon={Percent}
                type="number"
                min={0}
                max={100}
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
              <Button type="submit" variant="primary" className="mt-1 w-full">
                Calculate
              </Button>
            </div>
          </form>

          {/* Result screen */}
          <div className="flex flex-col rounded-lg border border-line bg-paper p-6" aria-live="polite">
            <MonoLabel>Result</MonoLabel>
            {result ? (
              <>
                <div className="mt-5">
                  <Stat display={money(result.monthly)} label="projected monthly revenue" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Stat display={String(result.sessionsPerMonth)} label="sessions / month" />
                  <Stat display={money(result.perWeek)} label="per week" />
                </div>
                <p className="mt-auto pt-6 font-mono text-caption text-ink-500">
                  A projection, not a promise — bookings vary week to week.
                </p>
              </>
            ) : (
              <div className="mt-5 flex flex-1 flex-col items-start justify-center rounded-md border border-dashed border-line p-6">
                <p className="font-sans text-body-sm text-ink-600">
                  Enter your sessions, fee and booked rate, then calculate to see the
                  projection here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Keypad — visual spec of the calculator button style (not an input device) */}
        <div className="mt-6 border-t border-line pt-6">
          <MonoLabel>Calculator buttons — visual spec</MonoLabel>
          <div className="mt-4 grid w-44 grid-cols-3 gap-2" aria-hidden>
            {KEYS.map((k) => (
              <span
                key={k}
                className="inline-flex items-center justify-center rounded-md border border-line bg-surface py-2.5 font-sans text-body-md text-ink-900 shadow-none"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </Demo>
    </Section>
  );
};
