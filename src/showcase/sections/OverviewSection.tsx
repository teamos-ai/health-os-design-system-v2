/**
 * OverviewSection — what v2 is: efficient.app's structure and craft, wearing Health OS's
 * warm palette, fonts and calm voice. The borrowed-vs-locked split + the non-negotiables.
 */
import { Check } from 'lucide-react';
import { Section } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';

const BORROWED = [
  'Command-palette search hero with /command chips',
  'Soft pastel radial hero glows on a light ground',
  'Horizontal feature/tool-card carousel',
  'Mono labels + dark pill CTAs',
  'Rounded hairline cards, generous white space',
  'A grain texture, thin top ticker, bento grid, dark-carbon footer',
];

const LOCKED = [
  'Warm Ivory ground + Carbon text — never pure white/black',
  'Rose as the accent — in place of efficient.app’s pink-red',
  'Apricot → rose → lavender gradient, used with restraint',
  'Spline Sans headings + Anonymous Pro mono body',
  'Sentence case, calm Sage voice, Australian English',
  'Zero glassmorphism, soft neutral shadows, WCAG AA',
];

export const OverviewSection = () => (
  <Section
    id="overview"
    eyebrow="Health OS design system v2"
    title="efficient.app structure, Health OS skin."
    lead="The second design-system experiment for Health OS. It borrows the command-centre craft of efficient.app and the quiet details of Cherry Note, then dresses them in the locked Health OS brand — warm, flat, premium, calm."
  >
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-line bg-surface p-6">
        <Badge variant="lavender">Borrowed craft</Badge>
        <ul className="mt-5 flex flex-col gap-3">
          {BORROWED.map((item) => (
            <li key={item} className="flex items-start gap-2.5 font-sans text-body-md text-ink-700">
              <Check className="mt-1 h-4 w-4 shrink-0 text-lavender-600" strokeWidth={1.5} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-line bg-surface p-6">
        <Badge variant="brand">Locked brand</Badge>
        <ul className="mt-5 flex flex-col gap-3">
          {LOCKED.map((item) => (
            <li key={item} className="flex items-start gap-2.5 font-sans text-body-md text-ink-700">
              <Check className="mt-1 h-4 w-4 shrink-0 text-brand-600" strokeWidth={1.5} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);
