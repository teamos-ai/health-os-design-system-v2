/**
 * StoriesSection: the proof section. One case study told end to end, then thirty short quotes on
 * two moving walls, one that drifts sideways and one that drifts upward.
 *
 * It opens with the notice, because everything in it is sample copy and none of it may ship: the
 * database blocks client results, quotes and logos until one is measured and the client has given
 * written permission. The components are finished; the words and faces are placeholders waiting for
 * real ones.
 */
import { AlertTriangle } from 'lucide-react';
import { Section, Example, Usage } from '@/showcase/Section';
import { CaseStudy } from '@/components/case-study/CaseStudy';
import { TestimonialCard } from '@/components/testimonials/TestimonialCard';
import { TestimonialColumns } from '@/components/testimonials/TestimonialColumns';
import { TestimonialWall } from '@/components/testimonials/TestimonialWall';
import { CASE_STUDY } from '@/data/case-studies';
import { SAMPLE_NOTICE, TESTIMONIALS } from '@/data/testimonials';

const Notice = () => (
  <div className="flex gap-4 rounded-lg border border-warning-300 bg-warning-100 p-5">
    <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-warning-600" strokeWidth={1.75} aria-hidden />
    <div className="flex flex-col gap-2">
      <p className="font-display text-title text-ink-900">Nothing in this section may be published</p>
      <p className="max-w-reading font-sans text-body text-ink-600">{SAMPLE_NOTICE}</p>
      <p className="max-w-reading font-sans text-body text-ink-600">
        Thirty people, thirty quotes and one story, written in the voice of the primary buyer and mapped to the three messaging pillars, so the components can be
        designed, reviewed and handed over ready to take real ones. The portraits are generated and picture nobody real. To go live, replace a quote, its person
        and its portrait together, and turn the Sample mark off only for that one.
      </p>
    </div>
  </div>
);

export const StoriesSection = () => (
  <Section
    id="stories"
    bleed={
      <div className="pb-4 pt-2">
        <TestimonialWall controlsClassName="mx-auto max-w-5xl" />
      </div>
    }
  >
    <div className="flex flex-col gap-8">
      <Notice />

      <Example id="case-study" label="Case study" padded={false}>
        <div className="p-6 md:p-10">
          <CaseStudy study={CASE_STUDY} />
        </div>
      </Example>

      <Example id="testimonial-columns" label="Testimonial columns">
        <TestimonialColumns />
      </Example>

      <Example id="testimonial-card" label="Testimonial card">
        <div className="flex flex-wrap items-start gap-5">
          <TestimonialCard testimonial={TESTIMONIALS[0]} showPillar />
          <TestimonialCard testimonial={TESTIMONIALS[17]} size="tall" showPillar />
        </div>
      </Example>

      {/* the wall itself runs full bleed under the section, so its notes sit here */}
      <div className="overflow-hidden rounded-lg border border-line">
        <Usage id="testimonial-wall" className="border-t-0" />
      </div>
    </div>
  </Section>
);
