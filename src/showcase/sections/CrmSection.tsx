/**
 * CrmSection — the Health OS "CRM software" surface. The full set of product feature
 * scenes is a finished, self-contained design embedded live from
 * /public/embeds/feature-scenes.html: ~10 dashboard/feature scenes (automation, voice-AI
 * reception, course productisation, a unified social inbox, the whole-business dashboard,
 * booking rules, payments, funnel builder, content engine and the lead pipeline), on the
 * locked tokens with its own light/dark theme toggle. This replaces the earlier
 * CrmDashboard + building-blocks scaffold.
 */
import { Section } from '@/showcase/Section';
import { EmbedFrame } from '@/components/ui/embed-frame';

export const CrmSection = () => (
  <Section
    id="crm"
    eyebrow="Software"
    title="CRM software"
    lead="The product surface itself — a set of feature scenes showing Health OS in action: automation, an AI receptionist, course productisation, a unified social inbox, the whole-business dashboard, smart booking, payments, the funnel builder, a content engine and the lead pipeline. Built on the locked tokens, with a live light/dark toggle."
  >
    <EmbedFrame src="/embeds/feature-scenes.html" title="Health OS feature scenes" minHeight={1000} />
  </Section>
);
