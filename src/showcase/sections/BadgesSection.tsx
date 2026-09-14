/**
 * BadgesSection: every badge set, grouped by where it is used, then the mono label.
 */
import { ArrowUpRight } from 'lucide-react';
import { Section, Example } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { MonoLabel } from '@/components/ui/mono-label';
import { BreathingDot } from '@/components/ui/animated';
import {
  BADGES_STATUS,
  BADGES_WELLNESS,
  BADGES_OILS,
  BADGES_COACHING,
  BADGES_COMMUNITY,
  BADGES_EVENTS,
  BADGES_SOCIAL,
  BADGES_COMMERCE,
} from '@/data/system';

const BADGE_GROUPS = [
  { title: 'Status', items: BADGES_STATUS },
  { title: 'Wellness', items: BADGES_WELLNESS },
  { title: 'Essential oils', items: BADGES_OILS },
  { title: 'Coaching and courses', items: BADGES_COACHING },
  { title: 'Community and membership', items: BADGES_COMMUNITY },
  { title: 'Webinars and events', items: BADGES_EVENTS },
  { title: 'Social and marketing', items: BADGES_SOCIAL },
  { title: 'Commerce', items: BADGES_COMMERCE },
];

export const BadgesSection = () => (
  <Section id="badges">
    <div className="flex flex-col gap-8">
      <Example id="badge" label="Badge sets">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {BADGE_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <h3 className="font-sans text-label uppercase text-ink-500">{group.title}</h3>
                <span aria-hidden className="h-px flex-1 bg-line" />
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((b) => (
                  <Badge key={b.label} variant={b.variant} emoji={b.emoji}>
                    {b.label}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Example>

      <Example id="mono-label" label="Mono label">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <MonoLabel number="01">Consolidate</MonoLabel>
            <MonoLabel number="02">Clarity</MonoLabel>
            <MonoLabel number="03">Control</MonoLabel>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <MonoLabel tone="success" trailing={<BreathingDot color="bg-success-600" />}>
              Bookings open
            </MonoLabel>
            <MonoLabel dot tone="apricot">
              Bookings
            </MonoLabel>
            <MonoLabel dot tone="lavender">
              Insights
            </MonoLabel>
            <MonoLabel tone="rose" trailing={<ArrowUpRight className="h-4 w-4" aria-hidden />}>
              View the system
            </MonoLabel>
          </div>
        </div>
      </Example>
    </div>
  </Section>
);
