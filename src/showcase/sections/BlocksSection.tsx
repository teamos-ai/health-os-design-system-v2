/**
 * BlocksSection — the composed marketing blocks (pricing, FAQ, testimonials) referenced by
 * ASSET-RECIPES.md. Each is built from the primitives and stays on-voice: modest numbers,
 * calm proof, sentence case.
 */
import { Section, Demo } from '@/showcase/Section';
import { PricingTable } from '@/components/blocks/PricingTable';
import { Faq } from '@/components/blocks/Faq';
import { TestimonialWall } from '@/components/blocks/Testimonial';

export const BlocksSection = () => (
  <Section
    id="blocks"
    eyebrow="Composed"
    title="Blocks"
    lead="Higher-level marketing blocks built from the primitives — pricing, FAQ and testimonials. The recommended pricing tier leads with colour, not height; testimonials are a calm wall, not a dot carousel."
  >
    <div className="flex flex-col gap-10">
      <Demo label="PricingTable — recommended tier emphasised by colour" padded={false} className="bg-surface p-6 md:p-8">
        <PricingTable
          tiers={[
            {
              name: 'Solo',
              price: '$39',
              cadence: '/ month',
              blurb: 'For a single practitioner finding their feet.',
              features: ['Online booking', 'Automated reminders', 'Client records', 'Email support'],
              cta: 'Start with Solo',
            },
            {
              name: 'Practice',
              price: '$89',
              cadence: '/ month',
              blurb: 'For a growing practice that wants the admin gone.',
              features: [
                'Everything in Solo',
                'Automations & follow-up',
                'Programs & courses',
                'Two team seats',
                'Priority support',
              ],
              cta: 'Choose Practice',
              recommended: true,
            },
            {
              name: 'Studio',
              price: '$149',
              cadence: '/ month',
              blurb: 'For a multi-practitioner studio or clinic.',
              features: ['Everything in Practice', 'Unlimited seats', 'Custom domains', 'Onboarding help'],
              cta: 'Talk to us',
            },
          ]}
        />
      </Demo>

      <Demo label="TestimonialWall — quiet proof, no carousel" padded={false} className="bg-surface p-6 md:p-8">
        <TestimonialWall
          items={[
            {
              quote: 'The back office just runs now. I spend my week with clients, not chasing reminders.',
              name: 'Dr Elise Warner',
              role: 'Physiotherapist, Fremantle',
            },
            {
              quote: 'Bookings, intake and follow-up in one place. I stopped stitching six apps together.',
              name: 'Marcus True',
              role: 'Movement coach, Brunswick',
            },
            {
              quote: 'No-shows dropped once the reminders sent themselves. It paid for itself in a fortnight.',
              name: 'Priya Ramaswamy',
              role: 'Clinical psychologist, Newtown',
            },
          ]}
        />
      </Demo>

      <Demo label="Faq — built on the accessible Disclosure primitive" className="bg-surface">
        <Faq
          columns={2}
          items={[
            { question: 'How long until we are live?', answer: 'Most practices are live within 30 days, with done-with-you setup.' },
            { question: 'Can I keep my current booking link?', answer: 'Yes — you can redirect your existing link, so nothing breaks for your clients.' },
            { question: 'Do my clients need an account?', answer: 'No. Clients book, reschedule and complete intake without creating a login.' },
            { question: 'What happens to my data if I leave?', answer: 'It is yours. Export your clients, bookings and notes at any time.' },
          ]}
        />
      </Demo>
    </div>
  </Section>
);
