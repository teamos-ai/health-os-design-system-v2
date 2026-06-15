/**
 * WidgetsSection — rough-in scaffold for the small "software" widgets: the count-up
 * figures, scarcity meters, trend deltas, a live-status pill, the segmented control, a
 * live countdown and the command widget. Each tile is captioned with a mono label so the
 * library reads like a parts bin. Reuses counters / Stat / SegmentedControl / CommandWidget.
 */
import type { ReactNode } from 'react';
import { Section, Demo } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { MonoLabel } from '@/components/ui/mono-label';
import { BreathingDot } from '@/components/ui/animated';
import { SegmentedControl } from '@/components/ui/segmented';
import { CommandWidget } from '@/components/ui/command-widget';
import {
  MembersCount,
  SeatsRemaining,
  StatTrend,
  Countdown,
} from '@/components/ui/counters';

const ROUGH = <Badge variant="outline" size="sm">Rough scaffold</Badge>;

/** A captioned parts-bin tile — mono label on top, the live widget below. */
const Tile = ({
  caption,
  children,
  className,
}: {
  caption: string;
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 ${className ?? ''}`}
  >
    <MonoLabel>{caption}</MonoLabel>
    <div className="flex flex-1 flex-col justify-center">{children}</div>
  </div>
);

// A fixed-ish horizon for the countdown demo (computed at render, reduced-motion safe).
const COUNTDOWN_TO = new Date(Date.now() + 1000 * 60 * 60 * 24 * 9);

export const WidgetsSection = () => (
  <Section
    id="widgets"
    eyebrow="Library"
    title="Widgets"
    lead="The small, live pieces a Health OS surface is built from — outcome figures, scarcity meters, trend deltas and the command widget. Calm motion, count-ups that fire once in view, all reduced-motion safe."
  >
    <Demo label="Widget parts bin" action={ROUGH} padded={false}>
      <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <Tile caption="Members count">
          <MembersCount value={1284} label="active members" />
        </Tile>

        <Tile caption="Seats remaining">
          <SeatsRemaining taken={128} total={200} accent="apricot" />
        </Tile>

        <Tile caption="Trend delta">
          <StatTrend value={94} suffix="%" delta={12.4} label="show-up rate" />
        </Tile>

        <Tile caption="Live status">
          <MonoLabel tone="success" trailing={<BreathingDot color="bg-success-600" />}>
            System online
          </MonoLabel>
        </Tile>

        <Tile caption="Segmented control">
          <SegmentedControl
            aria-label="Cadence"
            defaultValue="weekly"
            options={[
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
            ]}
          />
        </Tile>

        <Tile caption="Countdown">
          <Countdown to={COUNTDOWN_TO} />
        </Tile>

        <Tile caption="Command widget" className="sm:col-span-2 lg:col-span-3">
          <CommandWidget />
        </Tile>
      </div>
    </Demo>
  </Section>
);
