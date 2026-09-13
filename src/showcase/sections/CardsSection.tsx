/**
 * CardsSection: the six card types with their usage, then a bento composed from them.
 * Images come from the tagged library; prices follow the Health OS offer.
 */
import { CalendarCheck, MailCheck } from 'lucide-react';
import { Section, Example } from '@/showcase/Section';
import { ContentCard, FeatureCard, ServiceCard, PricingCard, ResourceCard, ActionCard } from '@/components/cards';
import { BentoGrid, BentoCell } from '@/components/bento/Bento';
import { thumb } from '@/lib/images';
import { PLANS, PRICING_NOTE } from '@/data/offer';

const IMG = {
  filming: '/imagery/work-and-content-creation/woman-filming-content-on-laptop-by-city-window-16-9.png',
  coworking: '/imagery/work-and-content-creation/three-women-coworking-on-boucle-sofa-with-laptop-and-coffee-4-3.png',
  studio: '/imagery/social-and-wellness/three-women-chatting-in-wellness-studio-with-drinks-16-9.png',
  coffee: '/imagery/social-and-wellness/two-women-having-coffee-at-outdoor-bistro-table-16-9.png',
  meadow: '/backgrounds/nature-pink-purple-crescent-moon-grass-portrait.png',
  dusk: '/backgrounds/nature-purple-pink-snowy-peaks-contrail-portrait.png',
};

export const CardsSection = () => (
  <Section id="card-bento">
    <div className="flex flex-col gap-8">
      <Example id="content-card" label="Content card">
        <div className="grid gap-6 md:grid-cols-2">
          <ContentCard
            title="Where the week goes when everything routes through you"
            excerpt="The small decisions that still wait for the founder, and which ones a system can carry."
            image={{ src: thumb(IMG.filming), alt: 'A woman recording a video on a laptop beside a city window' }}
            category="Operations"
            meta="6 min read"
            href="#card-bento"
          />
          <ContentCard
            title="A calmer onboarding for new members"
            excerpt="What a new client receives, in order, without anyone sending it by hand."
            image={{ src: thumb(IMG.studio), alt: 'Three women talking in a wellness studio with drinks in hand' }}
            category="Onboarding"
            categoryVariant="lavender"
            meta="4 min read"
            href="#card-bento"
          />
        </div>
      </Example>

      <Example id="image-fade" label="Image fade">
        <div className="grid gap-6 md:grid-cols-2">
          <figure className="overflow-hidden rounded-lg border border-line bg-surface">
            <div className="image-fade-b relative aspect-video">
              <img src={thumb(IMG.studio)} alt="Three women talking in a wellness studio with drinks in hand" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <figcaption className="relative -mt-8 px-6 pb-6 font-sans text-label text-ink-500">image-fade-b · text below</figcaption>
          </figure>
          <figure className="grid grid-cols-2 overflow-hidden rounded-lg border border-line bg-surface">
            <figcaption className="flex items-end p-6 font-sans text-label text-ink-500">image-fade-l · text beside</figcaption>
            <div className="image-fade-l relative min-h-48">
              <img src={thumb(IMG.coffee)} alt="Two women talking over coffee at an outdoor table" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </figure>
        </div>
      </Example>

      <Example id="feature-card" label="Feature card">
        <div className="grid gap-4 md:grid-cols-2">
          <FeatureCard icon={CalendarCheck} tag="Booking" title="Bookings that confirm themselves" description="Clients book, pay and get reminders without you in the loop." />
          <FeatureCard icon={MailCheck} accent="lavender" tag="Follow-up" title="Follow-up that sends on time" description="Every client gets the next message when it is due." />
        </div>
      </Example>

      <Example id="service-card" label="Service card">
        <ServiceCard
          category="Service"
          title="Done-for-you setup"
          description="We move your tools, rebuild your workflows and hand over a system that already runs."
          image={{ src: thumb(IMG.coworking), alt: 'Three women working together on a sofa with laptops and coffee' }}
          details={[
            { label: 'Format', value: 'Done for you' },
            { label: 'Includes', value: 'Migration and workflows' },
          ]}
          action={{ label: 'See what is included', href: '#card-bento' }}
        />
      </Example>

      <Example id="pricing-card" label="Pricing card">
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
        <p className="mt-6 font-sans text-label text-ink-500">{PRICING_NOTE}</p>
      </Example>

      <Example id="resource-card" label="Resource card">
        <div className="grid gap-6 md:grid-cols-2">
          <ResourceCard
            type="Guide"
            meta="PDF, 18 pages"
            title="The quiet week plan"
            description="How to set up bookings, reminders and follow-up so a week runs without you in every step."
            cover={{ src: thumb(IMG.meadow), alt: 'A crescent moon over grass at dusk' }}
            action={{ label: 'Download the guide' }}
          />
          <ResourceCard
            type="Checklist"
            meta="PDF, 2 pages"
            title="Count your stack"
            description="List every tool you pay for, what it does and who logs in to it."
            cover={{ src: thumb(IMG.dusk), alt: 'Snowy peaks under a pink and lavender sky' }}
            action={{ label: 'Get the checklist' }}
          />
        </div>
      </Example>

      <Example id="action-card" label="Action card">
        <div className="flex flex-col gap-6">
          <ActionCard
            title="See what still routes through you"
            description="Ten questions, under two minutes. The result is yours whether we ever speak or not."
            action={{ label: 'Start the check' }}
          />
          <ActionCard
            tone="soft"
            title="A walkthrough of your setup"
            description="A short call to look at your current setup and what could run on its own."
            action={{ label: 'Book the walkthrough' }}
            image={{ src: thumb(IMG.coffee), alt: 'Two women talking over coffee at an outdoor table' }}
          />
        </div>
      </Example>

      <Example id="bento-grid" label="Bento grid">
        <BentoGrid>
          <BentoCell span={2}>
            <ContentCard
              title="Set it up once, then let it run"
              excerpt="Built with you, then running in the background."
              image={{ src: thumb(IMG.coworking), alt: 'Three women working together on a sofa with laptops and coffee' }}
              ratio="3/2"
              category="Setup"
              className="h-full"
            />
          </BentoCell>
          <BentoCell>
            <FeatureCard icon={MailCheck} accent="lavender" title="Enquiries answered" description="New enquiries get a reply and a next step while you are with a client." />
          </BentoCell>
          <BentoCell>
            <FeatureCard icon={CalendarCheck} accent="apricot" title="Reminders on time" description="Every booking gets its reminder without anyone sending it." />
          </BentoCell>
          <BentoCell span={2}>
            <ActionCard title="See what still routes through you" description="Ten questions, under two minutes." action={{ label: 'Start the check' }} className="h-full" />
          </BentoCell>
        </BentoGrid>
      </Example>
    </div>
  </Section>
);
