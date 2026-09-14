/**
 * FeaturesSection: the four feature components with their usage. They share one item shape,
 * one intro block and one heading rule; the section already has its h2, so every example
 * passes headingLevel="h3". Copy is Health OS product copy; images come from the tagged library.
 */
import * as React from 'react';
import { BellRing, CalendarCheck, CalendarClock, GraduationCap, LineChart, MailCheck, Megaphone, MessagesSquare, Users, Workflow, Wrench } from 'lucide-react';
import { Section, Example } from '@/showcase/Section';
import { FeatureSteps, FeatureTabs, FeatureGrid, FeatureCards, type FeatureCardsVariant } from '@/components/features';
import { SegmentedControl } from '@/components/ui/segmented';
import { thumb } from '@/lib/images';

const IMG = {
  lounge: '/imagery/work-and-content-creation/three-women-coworking-on-boucle-sofa-with-laptop-and-coffee-studio-lounge-16-9.png',
  yoga: '/imagery/active-and-fitness/group-yoga-side-plank-in-bright-studio-16-9.png',
  coffee: '/imagery/social-and-wellness/two-women-having-coffee-at-outdoor-bistro-table-16-9.png',
  grass: '/imagery/social-and-wellness/two-women-relaxing-on-grass-overhead-shot-16-9.png',
  stairs: '/imagery/active-and-fitness/two-people-running-up-stadium-stairs-16-9.png',
  smoothie: '/imagery/social-and-wellness/woman-in-peach-activewear-with-green-smoothie-at-cafe-table-16-9.png',
  studio: '/imagery/social-and-wellness/three-women-chatting-in-wellness-studio-with-drinks-16-9.png',
};

const CARD_VARIANTS: { value: FeatureCardsVariant; label: string }[] = [
  { value: 'outline', label: 'Outline' },
  { value: 'muted', label: 'Muted' },
];

const FeatureCardsExample = () => {
  const [variant, setVariant] = React.useState<FeatureCardsVariant>('outline');
  return (
    <Example
      id="feature-cards"
      label="Feature cards"
      action={<SegmentedControl size="sm" aria-label="Card style" options={CARD_VARIANTS} value={variant} onValueChange={(v) => setVariant(v as FeatureCardsVariant)} />}
    >
      <FeatureCards
        headingLevel="h3"
        align="center"
        variant={variant}
        title="Built with you, then left to run"
        description="Three parts of the business that stop waiting on you."
        items={[
          { icon: Wrench, tone: 'rose', title: 'Done-for-you setup', description: 'We move your tools, rebuild your workflows and hand over a system that already runs.' },
          { icon: CalendarClock, tone: 'lavender', title: 'Onboarding without the chasing', description: 'Forms, welcome and first booking go out in order, without a reminder from you.' },
          { icon: LineChart, title: 'One clear view', description: 'Bookings, revenue and the day ahead, in plain language, on one screen.' },
        ]}
      />
    </Example>
  );
};

export const FeaturesSection = () => (
  <Section id="features">
    <div className="flex flex-col gap-8">
      <Example id="feature-steps" label="Feature steps">
        <FeatureSteps
          headingLevel="h3"
          eyebrow="Setup"
          title="From first call to a system that runs"
          description="What happens after you say yes, in the order it happens."
          items={[
            {
              icon: MessagesSquare,
              title: 'A walkthrough of your setup',
              description: 'A short call to look at your current tools and what still routes through you.',
              image: { src: thumb(IMG.lounge), alt: 'Three women talking over a laptop and coffee on a sofa in a studio lounge' },
            },
            {
              icon: CalendarCheck,
              title: 'Bookings moved across',
              description: 'We move your clients and bookings into Health OS, with reminders set to send on their own.',
              image: { src: thumb(IMG.yoga), alt: 'Three people holding side plank on mats in a bright studio' },
            },
            {
              icon: Workflow,
              title: 'Follow-up rebuilt',
              description: 'Welcome messages and check-ins go out in order, whoever is working that day.',
              image: { src: thumb(IMG.coffee), alt: 'Two women talking over coffee at an outdoor table' },
            },
            {
              icon: Wrench,
              title: 'A system that already runs',
              description: 'You get training on the parts you use, then it runs in the background while you are with clients.',
              image: { src: thumb(IMG.grass), alt: 'Two women lying on the grass, seen from above' },
            },
          ]}
        />
      </Example>

      <Example id="feature-tabs" label="Feature tabs">
        <FeatureTabs
          headingLevel="h3"
          title="One system for the whole business"
          description="Reminders, follow-up and client records in one place, instead of a login for each."
          items={[
            {
              icon: BellRing,
              label: 'Reminders',
              badge: 'Online booking',
              tone: 'rose',
              title: 'Reminders that send themselves',
              description: 'Every booking gets its reminder without anyone sending it. Choose which messages go out before and after a session.',
              action: { label: 'See how reminders work', href: '#feature-tabs' },
              image: { src: thumb(IMG.stairs), alt: 'Two people running up stadium stairs' },
            },
            {
              icon: MailCheck,
              label: 'Follow-up',
              badge: 'Email and follow-up',
              tone: 'lavender',
              title: 'Follow-up that sends on time',
              description: 'Every client gets the next message when it is due, and the same welcome whoever is working that day.',
              action: { label: 'See how follow-up works', href: '#feature-tabs' },
              image: { src: thumb(IMG.smoothie), alt: 'A woman in peach activewear with a green smoothie at a cafe table' },
            },
            {
              icon: Users,
              label: 'Clients',
              badge: 'Client records',
              title: 'Every client record in one place',
              description: 'Bookings, forms and history sit together, so you can see what is booked, what is owed and what needs you today.',
              action: { label: 'See client records', href: '#feature-tabs' },
              image: { src: thumb(IMG.studio), alt: 'Three women talking in a wellness studio with drinks in hand' },
            },
          ]}
        />
      </Example>

      <Example id="feature-grid" label="Feature grid">
        <FeatureGrid
          headingLevel="h3"
          title="The admin that runs without you"
          description="The small jobs that used to wait for you, handled while you are with clients."
          items={[
            { icon: CalendarCheck, title: 'Online booking', description: 'Clients book from your page at the hours you set, as far ahead as you allow.' },
            { icon: BellRing, title: 'Reminders', description: 'Every booking gets its reminder without anyone sending it.' },
            { icon: MailCheck, title: 'Follow-up', description: 'Every client gets the next message when it is due.' },
            { icon: Users, title: 'Client records', description: 'Bookings, forms and history for each client, in one place.' },
            { icon: Megaphone, title: 'Enquiries answered', description: 'New enquiries get a reply and a next step while you are with a client.' },
            { icon: GraduationCap, title: 'Courses and memberships', description: 'Run courses and memberships from the same system as your bookings.' },
          ]}
        />
      </Example>

      <FeatureCardsExample />
    </div>
  </Section>
);
