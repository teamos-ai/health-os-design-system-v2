/**
 * CardsSection: the nine card types with their usage, then the bento grid and the feature
 * bento in its three styles. Images come from the tagged library; prices follow the offer.
 */
import * as React from 'react';
import { CalendarCheck, ClipboardCheck, MailCheck } from 'lucide-react';
import { Section, Example } from '@/showcase/Section';
import { ContentCard, FeatureCard, ServiceCard, PricingCard, ResourceCard, ActionCard, SessionCard, ProfileCard, StepsCard } from '@/components/cards';
import { BentoGrid, BentoCell } from '@/components/bento/Bento';
import { FeatureBento, type BentoStyle } from '@/components/bento/FeatureBento';
import { SegmentedControl } from '@/components/ui/segmented';
import { thumb } from '@/lib/images';
import { PLANS, PRICING_NOTE } from '@/data/offer';

const IMG = {
  filming: '/imagery/work-and-content-creation/woman-filming-content-on-laptop-by-city-window-16-9.png',
  coworking: '/imagery/work-and-content-creation/three-women-coworking-on-boucle-sofa-with-laptop-and-coffee-4-3.png',
  studio: '/imagery/social-and-wellness/three-women-chatting-in-wellness-studio-with-drinks-16-9.png',
  coffee: '/imagery/social-and-wellness/two-women-having-coffee-at-outdoor-bistro-table-16-9.png',
  meadow: '/backgrounds/nature-pink-purple-crescent-moon-grass-portrait.png',
  dusk: '/backgrounds/nature-purple-pink-snowy-peaks-contrail-portrait.png',
  yoga: '/imagery/active-and-fitness/group-yoga-side-plank-in-bright-studio-16-9.png',
  portrait: '/imagery/social-and-wellness/woman-in-pink-sweatshirt-and-cap-with-phone-and-earphones-portrait-9-16.png',
  smoothie: '/imagery/social-and-wellness/woman-in-peach-activewear-with-green-smoothie-at-cafe-full-length-9-16.png',
  founder: '/imagery/work-and-content-creation/woman-filming-content-on-laptop-by-city-window-vertical-9-16.png',
};

const BENTO_STYLES: { value: BentoStyle; label: string }[] = [
  { value: 'photo', label: 'Photo-led' },
  { value: 'tint', label: 'Tinted' },
  { value: 'quiet', label: 'Quiet' },
];

const FeatureBentoExample = () => {
  const [variant, setVariant] = React.useState<BentoStyle>('photo');
  return (
    <Example
      id="feature-bento"
      label="Feature bento"
      action={<SegmentedControl size="sm" aria-label="Bento style" options={BENTO_STYLES} value={variant} onValueChange={(v) => setVariant(v as BentoStyle)} />}
    >
      <FeatureBento
        key={variant}
        variant={variant}
        hero={{
          eyebrow: 'Health OS',
          title: 'Set it up once, then let it run',
          description: 'Built with you, then running in the background while you are with your clients.',
          image: { src: thumb(IMG.coworking), alt: 'Three women working together on a sofa with laptops and coffee' },
        }}
        highlight={{ icon: ClipboardCheck, value: 10, label: 'questions in the check, under two minutes' }}
        feature={{ icon: CalendarCheck, title: 'Bookings that confirm themselves', description: 'Clients book, pay and get reminders without you in the loop.' }}
        action={{ eyebrow: 'The check', title: 'See what still routes through you' }}
        facts={[
          { value: 297, prefix: '$', label: 'AUD a month for Health OS' },
          { value: 'One', label: 'place for booking, clients and sales' },
        ]}
      />
    </Example>
  );
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

      <Example id="session-card" label="Session card">
        <div className="grid gap-6 md:grid-cols-2">
          <SessionCard
            title="Morning mobility"
            date={{ weekday: 'Thu', day: '18', month: 'Sep' }}
            time="6:30 to 7:15 am"
            repeats="Every Thursday"
            place="Bondi studio"
            mode="In studio"
            image={{ src: thumb(IMG.yoga), alt: 'A group holding side plank on mats in a bright yoga studio' }}
            action={{ label: 'Reserve a place' }}
            calendarHref="#card-bento"
          />
          <SessionCard
            title="Setting up online booking"
            date={{ weekday: 'Tue', day: '23', month: 'Sep' }}
            time="12:00 to 12:45 pm AEST"
            place="Online"
            mode="Online"
            description="A live walkthrough of booking pages, reminders and payments, with time for questions."
            action={{ label: 'Save a spot' }}
            calendarHref="#card-bento"
          />
        </div>
      </Example>

      <Example id="profile-card" label="Profile card">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProfileCard
            name="Priya Kapoor"
            role="Movement coach"
            portrait={{ src: thumb(IMG.portrait), alt: 'A woman in a pink sweatshirt and cap holding her phone' }}
            focus={['Mobility', 'Strength', 'Pilates']}
            approach="Small groups, slow progressions and a plan you can keep up at home."
            action={{ label: 'Book with Priya' }}
          />
          <ProfileCard
            name="Jordan Lee"
            role="Nutrition coach"
            portrait={{ src: thumb(IMG.smoothie), alt: 'A woman in peach activewear holding a green smoothie at a cafe' }}
            focus={['Meal planning', 'Habits']}
            approach="Practical changes that fit a busy week, reviewed every fortnight."
            action={{ label: 'Book with Jordan' }}
          />
          <ProfileCard
            name="Mia Hart"
            role="Founder"
            portrait={{ src: thumb(IMG.founder), alt: 'A woman in a pink armchair recording a video on her laptop by a window' }}
            focus={['Studio operations', 'Onboarding']}
            approach="Keeps the studio running smoothly, so coaches can stay with their clients."
            action={{ label: 'Book a walkthrough' }}
          />
        </div>
      </Example>

      <Example id="steps-card" label="Steps card">
        <div className="grid gap-6 md:grid-cols-2">
          <StepsCard
            title="How setup works"
            intro="What happens between saying yes and a system that runs."
            steps={[
              { title: 'Walkthrough', detail: 'We look at your current tools and what still routes through you.' },
              { title: 'Build', detail: 'We move your clients, bookings and workflows into Health OS.' },
              { title: 'Handover', detail: 'You get a system that already runs, and training on the parts you use.' },
            ]}
          />
          <StepsCard
            title="Your onboarding"
            steps={[
              { title: 'Import your clients', detail: 'Upload your list or connect your old booking tool.' },
              { title: 'Set your hours', detail: 'Choose when people can book and how far ahead.' },
              { title: 'Turn on reminders', detail: 'Pick which messages go out before and after a session.' },
              { title: 'Share your booking page', detail: 'Add the link to your site and socials.' },
            ]}
            current={2}
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

      <FeatureBentoExample />
    </div>
  </Section>
);
