/**
 * MemojisSection — rough-in scaffold for the brand avatar set. Emoji faces stand in on
 * soft on-token washes (and the signature soft gradient) until the real illustrated
 * memojis are commissioned. Each tile is a captioned 8px squircle. Decorative — the
 * emoji are aria-hidden and the caption carries the meaning.
 */
import { Section, Demo } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { ACCENTS, type Accent } from '@/lib/accents';
import { cn } from '@/lib/utils';

const ROUGH = <Badge variant="outline" size="sm">Rough scaffold</Badge>;

interface Memoji {
  emoji: string;
  label: string;
  accent: Accent;
  /** use the signature soft gradient instead of the per-accent wash */
  gradient?: boolean;
}

const MEMOJIS: Memoji[] = [
  { emoji: '🧘‍♀️', label: 'Sage', accent: 'lavender', gradient: true },
  { emoji: '🧑‍⚕️', label: 'Practitioner', accent: 'rose' },
  { emoji: '🌿', label: 'Calm', accent: 'apricot' },
  { emoji: '😌', label: 'Relief', accent: 'gold' },
  { emoji: '👩‍⚕️', label: 'Clinician', accent: 'rose' },
  { emoji: '🧖‍♀️', label: 'Restore', accent: 'lavender' },
  { emoji: '🌸', label: 'Bloom', accent: 'apricot' },
  { emoji: '☺️', label: 'Client', accent: 'gold' },
];

export const MemojisSection = () => (
  <Section
    id="memojis"
    eyebrow="Brand"
    title="Memojis"
    lead="A warm, friendly avatar set for testimonials, team and the AI Sage. Emoji placeholders sit on the brand washes for now — the real illustrated memojis are a future deliverable."
  >
    <Demo label="Avatar set" action={ROUGH}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {MEMOJIS.map((m) => {
          const a = ACCENTS[m.accent];
          return (
            <figure key={m.label} className="flex flex-col items-center gap-2.5">
              <div
                className={cn(
                  'grain flex h-24 w-full items-center justify-center rounded-md border border-line',
                  m.gradient ? 'bg-brand-gradient-soft' : a.wash
                )}
              >
                <span aria-hidden className="text-5xl leading-none">
                  {m.emoji}
                </span>
              </div>
              <figcaption className="font-mono text-caption uppercase tracking-label text-ink-500">
                {m.label}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </Demo>
  </Section>
);
