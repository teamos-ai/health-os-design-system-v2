/**
 * WidgetsSection — the Health OS "Aura" widget library. A finished, self-contained design
 * embedded live from /public/embeds/aura-widgets.html: 32 on-brand components (aura stat
 * tiles, gradient rings, meters, trend sparklines, live trackers, countdowns, leaderboards,
 * agendas, gauges, funnels, calendars, plan cards, feeds and more) across four groups.
 * Built from the system's own tokens; calm, reduced-motion-safe motion. This replaces the
 * earlier parts-bin scaffold.
 */
import { Section } from '@/showcase/Section';
import { EmbedFrame } from '@/components/ui/embed-frame';

export const WidgetsSection = () => (
  <Section
    id="widgets"
    eyebrow="Library"
    title="Widgets"
    lead="The Aura widget library — 32 live, on-brand components across hero figures, live & structural pieces, relational widgets and expansion sets. Aura glow, the brand gradient and per-accent washes, all on 8px squircles with Spline Sans figures over Anonymous Pro labels. Motion is calm and reduced-motion safe."
  >
    <EmbedFrame src="/embeds/aura-widgets.html" title="Health OS Aura widget library" minHeight={1000} />
  </Section>
);
