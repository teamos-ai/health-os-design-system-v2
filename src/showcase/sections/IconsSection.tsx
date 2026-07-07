/**
 * IconsSection — the Health OS squircle icon set. The full glyph library is a finished,
 * self-contained design embedded live from /public/embeds/squircle-icons.html: ~70 glyphs
 * on the 8px squircle across scheduling, CRM, payments, comms, marketing, programs,
 * reporting, ops, practice types and wellness, with two treatments (Aura / Dissolve) and
 * live Series / Theme / Intensity toggles. This replaces the earlier Lucide scaffold.
 */
import { Section } from '@/showcase/Section';
import { EmbedFrame } from '@/components/ui/embed-frame';

export const IconsSection = () => (
  <Section
    id="icons"
    eyebrow="Foundations"
    title="Icons"
    lead="The Health OS squircle icon set — one glyph library on the 8px squircle, in two treatments: Aura (saturated tile, knockout glyph) and Dissolve (translucent wash, line glyph). Single-family gradients — apricot, rose, lavender or gold, never blended. Toggle the series, theme and intensity to re-render the whole set."
  >
    <EmbedFrame src="/embeds/squircle-icons.html" title="Health OS squircle icon set" minHeight={900} />
  </Section>
);
