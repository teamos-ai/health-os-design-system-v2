/**
 * CalculatorsSection — rough-in scaffold for the tokenised health calculators that drop
 * onto practitioner websites. A sample revenue calculator, a numeric keypad component and
 * a result screen. Placeholder copy and figures, to be detailed later.
 */
import { CalendarCheck, DollarSign, Percent } from 'lucide-react';
import { Section, Demo } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Stat } from '@/components/ui/stat';
import { MonoLabel } from '@/components/ui/mono-label';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const CalculatorsSection = () => (
  <Section
    id="calculators"
    eyebrow="Tools"
    title="Calculators"
    lead="Tokenised calculator components that drop onto a practitioner's website — same family, same tokens, transferable from one practice to the next."
  >
    <Demo label="Sample calculator" action={<Badge variant="outline" size="sm">Rough scaffold</Badge>}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Inputs */}
        <div className="rounded-md border border-line bg-surface p-6">
          <MonoLabel number="01">Revenue estimate</MonoLabel>
          <div className="mt-5 flex flex-col gap-4">
            <Input label="Sessions per week" placeholder="20" icon={CalendarCheck} type="number" />
            <Input label="Average fee ($)" placeholder="120" icon={DollarSign} type="number" />
            <Input label="Booked rate (%)" placeholder="80" icon={Percent} type="number" />
            <Button variant="primary" className="mt-1 w-full">Calculate</Button>
          </div>
        </div>

        {/* Result screen */}
        <div className="flex flex-col rounded-md border border-line bg-paper p-6">
          <MonoLabel>Result</MonoLabel>
          <div className="mt-5">
            <Stat display="$3,840" label="projected monthly revenue" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Stat display="64" label="sessions / month" />
            <Stat display="$960" label="per week" />
          </div>
          <p className="mt-auto pt-6 font-mono text-caption text-ink-500">
            Opens in a modal-style result on the live site.
          </p>
        </div>
      </div>

      {/* Keypad — example calculator buttons */}
      <div className="mt-6 border-t border-line pt-6">
        <MonoLabel>Calculator buttons</MonoLabel>
        <div className="mt-4 grid w-44 grid-cols-3 gap-2">
          {KEYS.map((k) => (
            <Button key={k} variant="secondary" size="md">{k}</Button>
          ))}
        </div>
      </div>
    </Demo>
  </Section>
);
