/**
 * CardsSection — rough-in scaffold for the card library: the standard hairline card,
 * the photography card (top + side media), the tool card and the feature card, shown
 * with on-token wash placeholders until real photography lands. Reuses the shared Card
 * / FeatureCard / ToolCard primitives so every variant stays on the locked tokens.
 */
import { Clock, MapPin, Leaf, HeartPulse, CalendarCheck, Sparkles, Waves } from 'lucide-react';
import { Section, Demo } from '@/showcase/Section';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { FeatureCard } from '@/components/ui/feature-card';
import { ToolCard } from '@/components/ui/tool-card';
import { Badge } from '@/components/ui/badge';
import { MonoLabel } from '@/components/ui/mono-label';

const ROUGH = <Badge variant="outline" size="sm">Rough scaffold</Badge>;

export const CardsSection = () => (
  <Section
    id="cards"
    eyebrow="Library"
    title="Cards"
    lead="The card family — a flat hairline surface that scales from a plain text block to a photo-topped programme card. One shadow on hover, 8px squircles, zero glass."
  >
    <div className="flex flex-col gap-8">
      {/* Standard + tool cards */}
      <Demo label="Standard & tool cards" action={ROUGH}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Card interactive>
            <CardHeader>
              <MonoLabel number="01">Records</MonoLabel>
              <CardTitle>One calm surface</CardTitle>
            </CardHeader>
            <CardContent>
              Booking, notes and payments for a client live in one place, so nothing has to
              be chased across three disconnected tools.
            </CardContent>
          </Card>

          <ToolCard
            name="Scheduling app"
            meta="Bookings, reminders, no-shows"
            icon={CalendarCheck}
            accent="apricot"
          />
        </div>
      </Demo>

      {/* Photography cards */}
      <Demo label="Photography cards — top & side media" action={ROUGH}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Card
            accent="rose"
            placeholderIcon={Waves}
            badge={<Badge variant="brand" size="sm">Workshop</Badge>}
            meta={[
              { icon: Clock, label: '6–8 hours' },
              { icon: MapPin, label: 'Byron Bay' },
            ]}
            actions={[{ label: 'View' }, { label: 'Book' }]}
            interactive
          >
            <CardTitle>Restorative breathwork retreat</CardTitle>
            <CardDescription className="mt-1.5">
              A calm half-day reset for practitioners and the clients they bring along.
            </CardDescription>
          </Card>

          <Card
            mediaPosition="side"
            accent="lavender"
            placeholderIcon={HeartPulse}
            interactive
          >
            <CardTitle>Client progress, at a glance</CardTitle>
            <CardDescription className="mt-1.5">
              A side-media layout for list rows and featured articles where the image sits
              beside the words rather than above them.
            </CardDescription>
          </Card>
        </div>
      </Demo>

      {/* Feature cards */}
      <Demo label="Feature cards" action={ROUGH}>
        <div className="grid gap-5 sm:grid-cols-2">
          <FeatureCard
            icon={Leaf}
            eyebrow="Outcome"
            title="Less admin, more care"
            description="The everyday workhorse — an icon well, a title and a calm line of body. Drops straight into a feature grid or a bento cell."
            accent="apricot"
          />
          <FeatureCard
            icon={Sparkles}
            title="Photo-topped feature"
            description="The same card with a photo on top (wash placeholder for now). The icon becomes the placeholder mark until a real image lands."
            accent="lavender"
            badge={<Badge variant="lavender" size="sm">New</Badge>}
          />
        </div>
      </Demo>
    </div>
  </Section>
);
