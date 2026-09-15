/**
 * The Health OS offer as shown in examples. Mirrors db-health-os
 * (02-offer-and-pricing/pricing-and-tiers.md, as of 10 Sep 2026): AUD everywhere, $297 is
 * the lead, Platinum is published but never promoted, usage charges are stated, partner
 * payouts are never shown publicly. Annual prices are the monthly price × 10, two months free
 * for paying the year in full, as Tumai confirmed on 15 September 2026; onboarding is unchanged.
 * Change the database first, then this file.
 */
import type { PricingCardProps } from '@/components/cards';

export const PLANS: PricingCardProps[] = [
  {
    name: 'Build Your OS',
    price: 97,
    annualPrice: 970,
    cadence: 'AUD / month',
    annualCadence: 'AUD / year',
    fee: 'No onboarding fee',
    description: 'The business platform with step-by-step training.',
    features: ['Access to the business platform', 'Step-by-step training', 'Help importing your setup'],
    action: { label: 'Choose Build Your OS' },
  },
  {
    name: 'Health OS',
    price: 297,
    annualPrice: 2970,
    cadence: 'AUD / month',
    annualCadence: 'AUD / year',
    fee: '+ $997 AUD onboarding',
    description: 'The platform, set up and customised for your business.',
    features: ['The Health OS platform', 'Health OS wellness assets', 'Customisation, setup and support'],
    action: { label: 'Book the walkthrough' },
    featured: true,
  },
  {
    name: 'Health OS Platinum',
    price: 497,
    annualPrice: 4970,
    cadence: 'AUD / month',
    annualCadence: 'AUD / year',
    fee: '+ $997 AUD onboarding',
    description: 'Everything in Health OS, with AI phone calls.',
    features: ['Everything in Health OS', 'AI phone calls'],
    action: { label: 'Ask about Platinum' },
  },
];

export const PRICING_NOTE = 'Prices in AUD. Messaging usage is charged separately.';

/** Beside the billing switch: paying the year in full costs ten months. */
export const ANNUAL_NOTE = '2 months free';

export const FAQ_ITEMS = [
  { question: 'What does setup involve?', answer: 'We move your tools, rebuild your workflows and hand over a system that already runs.' },
  { question: 'Can I keep my current booking link?', answer: 'Yes. Your existing link can point to the new booking page, so nothing breaks for clients.' },
  { question: 'Is anything charged on top of the plan?', answer: 'Messaging usage, such as SMS and email sends, is charged separately.' },
  { question: 'What currency are prices in?', answer: 'All prices are in Australian dollars.' },
];
