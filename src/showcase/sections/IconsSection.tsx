/**
 * IconsSection — rough scaffold. Our Lucide line set (always 1.5px stroke), plus a
 * placeholder for the Health OS icon pack to be drawn later. Dashed "add your own" slots
 * stand in for the bespoke set.
 */
import {
  CalendarCheck, Users, GraduationCap, Megaphone, HeartPulse, Stethoscope,
  ClipboardList, MessageCircle, Bell, CreditCard, LineChart, Settings,
  Sparkle, Leaf, Mail, Search, Plus,
} from 'lucide-react';
import { Section } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';

const ICONS = [
  { icon: CalendarCheck, name: 'calendar-check' },
  { icon: Users, name: 'users' },
  { icon: GraduationCap, name: 'graduation-cap' },
  { icon: Megaphone, name: 'megaphone' },
  { icon: HeartPulse, name: 'heart-pulse' },
  { icon: Stethoscope, name: 'stethoscope' },
  { icon: ClipboardList, name: 'clipboard-list' },
  { icon: MessageCircle, name: 'message-circle' },
  { icon: Bell, name: 'bell' },
  { icon: CreditCard, name: 'credit-card' },
  { icon: LineChart, name: 'line-chart' },
  { icon: Settings, name: 'settings' },
  { icon: Sparkle, name: 'sparkle' },
  { icon: Leaf, name: 'leaf' },
  { icon: Mail, name: 'mail' },
  { icon: Search, name: 'search' },
];

export const IconsSection = () => (
  <Section
    id="icons"
    eyebrow="Foundations"
    title="Icons"
    lead="A calm Lucide line set, always drawn at 1.5px, with a Health OS icon pack of our own on the way. Rough scaffold for now."
  >
    <div className="mb-8 flex justify-center">
      <Badge variant="outline">Rough draft</Badge>
    </div>

    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
      {ICONS.map(({ icon: Icon, name }) => (
        <div
          key={name}
          className="flex aspect-square flex-col items-center justify-center gap-2 rounded-md border border-line bg-surface"
        >
          <Icon className="h-6 w-6 text-ink-700" strokeWidth={1.5} aria-hidden />
          <span className="font-mono text-[10px] text-ink-500">{name}</span>
        </div>
      ))}

      {/* "Add your own" placeholder slots for the bespoke pack */}
      {[0, 1, 2].map((i) => (
        <div
          key={`add-${i}`}
          className="flex aspect-square flex-col items-center justify-center gap-2 rounded-md border border-dashed border-line bg-paper"
        >
          <Plus className="h-6 w-6 text-ink-400" strokeWidth={1.5} aria-hidden />
          <span className="font-mono text-[10px] text-ink-400">add icon</span>
        </div>
      ))}
    </div>
  </Section>
);
