/**
 * BadgesSection — the badge taxonomy and the mono labels. Badges are laid out as a
 * tidy two-column set of labelled groups; every badge is a soft pastel tonal squircle
 * so the tags stay quiet on a page. Mono labels follow below.
 */
import { ArrowUpRight } from 'lucide-react';
import { Section, Demo } from '@/showcase/Section';
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
  { title: 'Wellness states', items: BADGES_WELLNESS },
  { title: 'Essential oils', items: BADGES_OILS },
  { title: 'Coaching & courses', items: BADGES_COACHING },
  { title: 'Communities & membership', items: BADGES_COMMUNITY },
  { title: 'Webinars & events', items: BADGES_EVENTS },
  { title: 'Social & marketing', items: BADGES_SOCIAL },
  { title: 'Commerce & status', items: BADGES_COMMERCE },
];

export const BadgesSection = () => (
  <Section
    id="badges"
    eyebrow="Library"
    title="Badges"
    lead="A soft tag for every corner of the practice — status, wellness, oils, courses, community, events, marketing and commerce. Pastel tonal backgrounds with same-hue text, so tags stay calm and never shout on a page."
  >
    <div className="flex flex-col gap-8">
      <Demo label="Badges — a soft tag for every corner of the practice">
        <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {BADGE_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <MonoLabel>{group.title}</MonoLabel>
                <span className="h-px flex-1 bg-line" aria-hidden />
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
      </Demo>

      <Demo label="Mono labels — rhythm, tones, status & trailing slots">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <MonoLabel number="01">Consolidate</MonoLabel>
            <MonoLabel number="02">Clarity</MonoLabel>
            <MonoLabel number="03">Calm</MonoLabel>
            <MonoLabel dot tone="brand">Done-with-you setup</MonoLabel>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <MonoLabel tone="success" trailing={<BreathingDot color="bg-success-600" />}>
              System online
            </MonoLabel>
            <MonoLabel tone="ink" trailing={<BreathingDot color="bg-apricot-400" />}>
              Sync in progress
            </MonoLabel>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <MonoLabel dot tone="apricot">Bookings</MonoLabel>
            <MonoLabel dot tone="lavender">Insights</MonoLabel>
            <MonoLabel dot tone="gold">Premium</MonoLabel>
            <MonoLabel dot tone="success">Active plan</MonoLabel>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-md bg-carbon p-2">
              <MonoLabel tone="inverse" number="01">Command</MonoLabel>
            </span>
            <span className="inline-flex rounded-md bg-carbon p-2">
              <MonoLabel tone="inverse" dot>Live</MonoLabel>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <MonoLabel size="sm" tone="ink">Tight label</MonoLabel>
            <MonoLabel size="sm" tone="brand" number="A1">Compact rhythm</MonoLabel>
            <MonoLabel tone="brand" trailing={<ArrowUpRight className="h-3.5 w-3.5" aria-hidden />}>
              View the system
            </MonoLabel>
          </div>
        </div>
      </Demo>
    </div>
  </Section>
);
