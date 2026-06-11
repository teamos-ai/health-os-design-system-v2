/**
 * BentoBoxSection — rough-in scaffold for the bento playground. A space with its own
 * flavour, design language and tokens, shown here as two distinct arrangements of the
 * shared BentoGrid. Placeholder copy, to be detailed later.
 */
import { CalendarCheck, Users, Megaphone, GraduationCap, CreditCard, BarChart3 } from 'lucide-react';
import { Section } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { MonoLabel } from '@/components/ui/mono-label';
import { BentoGrid, BentoCard } from '@/components/bento/Bento';

export const BentoBoxSection = () => (
  <Section
    id="bento-box"
    eyebrow="Layouts"
    title="Bento box"
    lead="A bento playground with its own flavour — the same calm tokens, arranged with more freedom. Two arrangements below sketch how feature tiles flex across spans."
  >
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <MonoLabel number="01">Booking-led arrangement</MonoLabel>
        <Badge variant="outline" size="sm">Rough scaffold</Badge>
      </div>
      <BentoGrid>
        <BentoCard
          span={2}
          accent="rose"
          icon={CalendarCheck}
          title="Online booking"
          description="Clients book themselves in around your availability, with reminders sent automatically."
        />
        <BentoCard
          span={1}
          accent="lavender"
          icon={Users}
          title="Client records"
          description="Every contact, note and session in one place."
        />
        <BentoCard
          span={1}
          accent="apricot"
          icon={CreditCard}
          title="Payments"
          description="Take deposits and settle invoices without leaving the calendar."
        />
        <BentoCard
          span={2}
          accent="gold"
          icon={Megaphone}
          title="Marketing"
          description="Simple campaigns and follow-ups that keep your practice front of mind, without the busywork."
        />
      </BentoGrid>

      <MonoLabel number="02">Growth-led arrangement</MonoLabel>
      <BentoGrid>
        <BentoCard
          span={1}
          accent="lavender"
          icon={GraduationCap}
          title="Courses"
          description="Package your knowledge into programmes clients can follow."
        />
        <BentoCard
          span={2}
          accent="rose"
          icon={BarChart3}
          title="Insights"
          description="See bookings, revenue and enquiries at a glance, so the next decision is an easy one."
        />
        <BentoCard
          span={3}
          accent="apricot"
          icon={Megaphone}
          title="One calm surface"
          description="The whole practice — booking, records, payments and follow-up — running from a single place rather than six."
        />
      </BentoGrid>
    </div>
  </Section>
);
