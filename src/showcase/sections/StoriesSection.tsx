/**
 * StoriesSection: the proof section. One case study told end to end, then thirty short quotes on
 * two moving walls, one that drifts sideways and one that drifts upward.
 */
import { Section, Example, Usage } from '@/showcase/Section';
import { CaseStudy } from '@/components/case-study/CaseStudy';
import { TestimonialCard } from '@/components/testimonials/TestimonialCard';
import { TestimonialColumns } from '@/components/testimonials/TestimonialColumns';
import { TestimonialWall } from '@/components/testimonials/TestimonialWall';
import { CASE_STUDY } from '@/data/case-studies';
import { TESTIMONIALS } from '@/data/testimonials';

export const StoriesSection = () => (
  <Section
    id="stories"
    lead=""
    bleed={
      <div className="pb-4 pt-2">
        <TestimonialWall controlsClassName="mx-auto max-w-5xl" />
      </div>
    }
  >
    <div className="flex flex-col gap-8">
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
