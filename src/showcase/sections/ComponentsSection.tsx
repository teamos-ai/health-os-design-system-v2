/**
 * ComponentsSection — the component gallery. Buttons, badges, inputs, the command bar
 * and chips, cards, tool + feature cards, stats and mono labels — all live, all on token.
 */
import { Mail, CalendarCheck, Users } from 'lucide-react';
import { Section, Demo } from '@/showcase/Section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CommandBar } from '@/components/ui/command-bar';
import { CommandChip } from '@/components/ui/command-chip';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ToolCard } from '@/components/ui/tool-card';
import { FeatureCard } from '@/components/ui/feature-card';
import { Stat } from '@/components/ui/stat';
import { MonoLabel } from '@/components/ui/mono-label';
import { BADGES_STATUS, BADGES_WELLNESS } from '@/data/system';

export const ComponentsSection = () => (
  <Section
    id="components"
    eyebrow="Library"
    title="Components"
    lead="The building blocks the site is assembled from. Flat hairline surfaces, soft neutral hover, the dark carbon pill and the signature gradient CTA used sparingly."
  >
    <div className="flex flex-col gap-4">
      {/* Buttons */}
      <Demo label="Buttons">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Book a discovery call</Button>
            <Button variant="dark">See the system</Button>
            <Button variant="gradient">Start free</Button>
            <Button variant="secondary">Compare plans</Button>
            <Button variant="ghost">Learn more</Button>
            <Button variant="link">Read the docs</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button variant="danger">Cancel plan</Button>
          </div>
        </div>
      </Demo>

      {/* Badges — emoji + soft pastel tints (health & wellness) */}
      <Demo label="Badges — status + wellness, with emoji">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2.5">
            {BADGES_STATUS.map((b) => (
              <Badge key={b.label} variant={b.variant} emoji={b.emoji}>
                {b.label}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {BADGES_WELLNESS.map((b) => (
              <Badge key={b.label} variant={b.variant} emoji={b.emoji}>
                {b.label}
              </Badge>
            ))}
          </div>
        </div>
      </Demo>

      {/* Mono labels */}
      <Demo label="Mono labels — 01 02 03 rhythm">
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <MonoLabel number="01">Consolidate</MonoLabel>
          <MonoLabel number="02">Clarity</MonoLabel>
          <MonoLabel dot tone="brand">Done-with-you setup</MonoLabel>
        </div>
      </Demo>

      {/* Inputs */}
      <Demo label="Inputs">
        <div className="grid max-w-2xl gap-5 md:grid-cols-2">
          <Input label="Full name" placeholder="Jane practitioner" />
          <Input label="Email" type="email" icon={Mail} placeholder="jane@practice.com.au" />
          <Input label="Practice name" placeholder="Calm Studio" hint="Shown to your clients." />
          <Input label="Phone" placeholder="04xx xxx xxx" error="Enter a valid number." />
        </div>
      </Demo>

      {/* Command bar + chips */}
      <Demo label="Command bar + /command chips">
        <div className="flex flex-col gap-4">
          <CommandBar />
          <div className="flex flex-wrap gap-2.5">
            <CommandChip command="set up online booking" />
            <CommandChip command="import my client list" />
            <CommandChip command="build a course" />
          </div>
        </div>
      </Demo>

      {/* Cards */}
      <Demo label="Card">
        <div className="grid gap-4 md:grid-cols-2">
          <Card interactive>
            <CardHeader>
              <CardTitle>Online booking</CardTitle>
              <CardDescription>Scheduling and reminders, in one calendar.</CardDescription>
            </CardHeader>
            <CardContent>
              Clients book themselves in; reminders go out automatically; no double-handling.
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="secondary">View</Button>
            </CardFooter>
          </Card>
          <ToolCard name="Booking & calendar" meta="Scheduling + reminders" icon={CalendarCheck} accent="rose" />
        </div>
      </Demo>

      {/* Feature card + stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Demo label="Feature card">
          <FeatureCard
            icon={Users}
            title="Client CRM"
            description="Every record, conversation and booking in one place — the whole relationship at a glance."
            accent="lavender"
            number="02"
            eyebrow="Clarity"
          />
        </Demo>
        <Demo label="Stat — count-up">
          <div className="flex h-full items-center gap-10">
            <Stat value={12} suffix=" hrs" label="returned each week" />
            <Stat display="6–8 → 1" label="tools consolidated" />
          </div>
        </Demo>
      </div>
    </div>
  </Section>
);
