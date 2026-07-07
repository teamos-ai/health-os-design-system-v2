/**
 * ButtonsSection — the button system, cleaned to the essentials. The core actions,
 * a colour explorer (filled + inline on a light and a dark ground, with a colour
 * toggle), and the expressive motion buttons (save, complete, sign-up, book-a-call).
 * One disciplined colour story; every button is a single flat colour — no gradients.
 */
import { useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { Section, Demo } from '@/showcase/Section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SaveButton } from '@/components/ui/save-button';
import { CelebrationButton } from '@/components/ui/celebration-button';
import { ConfettiButton } from '@/components/ui/confetti-button';
import { MagnetizeButton } from '@/components/ui/magnetize-button';
import { cn } from '@/lib/utils';

/* ── Button colour explorer ──────────────────────────────────────────────────
 * Pick a colour, see the filled + inline (outline) treatments on both a white and
 * a carbon tile. The tiles are FIXED grounds, so these maps use FIXED text/border
 * colours (never theme-flipping `ink-*` tokens) — the AA-correct pairing per ground
 * is baked into each entry. Every fill is a single flat colour. */
type BtnColor = 'apricot' | 'rose' | 'lavender' | 'black' | 'white' | 'paper';

const BTN_COLORS: { id: BtnColor; dot: string }[] = [
  { id: 'apricot', dot: '#F5A060' },
  { id: 'rose', dot: '#E85BA8' },
  { id: 'lavender', dot: '#A666D9' },
  { id: 'black', dot: '#1F1F1F' },
  { id: 'white', dot: '#FFFFFF' },
  { id: 'paper', dot: '#F9F6F2' },
];

const BTN_BASE =
  'inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 font-display text-body-md font-medium transition-all duration-sm active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 focus-visible:ring-offset-2';

const FILLED: Record<BtnColor, string> = {
  apricot: 'bg-apricot-400 text-carbon hover:bg-apricot-500',
  rose: 'bg-rose-200 text-rose-800 hover:bg-rose-300',
  lavender: 'bg-lavender-600 text-white hover:bg-lavender-700',
  black: 'bg-carbon text-white hover:bg-carbon-700',
  white: 'bg-white text-carbon ring-1 ring-inset ring-carbon/10 hover:bg-[#F2EFEB]',
  paper: 'bg-[#F9F6F2] text-carbon ring-1 ring-inset ring-carbon/10 hover:bg-[#F0EBE4]',
};

const OUTLINE_LIGHT: Record<BtnColor, string> = {
  apricot: 'border border-apricot-500 text-apricot-700 hover:bg-apricot-50',
  rose: 'border border-brand-550 text-brand-600 hover:bg-rose-50',
  lavender: 'border border-lavender-600 text-lavender-700 hover:bg-lavender-50',
  black: 'border border-carbon text-carbon hover:bg-[#F2EFEB]',
  white: 'border border-carbon/15 text-[#7C746B] hover:bg-[#F2EFEB]',
  paper: 'border border-carbon/15 text-[#5A534B] hover:bg-[#F9F6F2]',
};

const OUTLINE_DARK: Record<BtnColor, string> = {
  apricot: 'border border-apricot-400 text-apricot-300 hover:bg-white/5',
  rose: 'border border-rose-400 text-rose-300 hover:bg-white/5',
  lavender: 'border border-lavender-400 text-lavender-300 hover:bg-white/5',
  black: 'border border-white/20 text-white/60 hover:bg-white/5',
  white: 'border border-white/80 text-white hover:bg-white/10',
  paper: 'border border-[#F9F6F2]/70 text-[#F9F6F2] hover:bg-white/10',
};

export const ButtonsSection = () => {
  const [btnColor, setBtnColor] = useState<BtnColor>('apricot');

  return (
    <Section
      id="buttons"
      eyebrow="Library"
      title="Buttons"
      lead="The button system, kept to the essentials — the core actions, a colour explorer that shows filled + inline on a light and a dark ground, and the expressive motion buttons. Every button is a single flat colour: no gradients."
    >
      <div className="flex flex-col gap-4">
        {/* Core actions */}
        <Demo label="Core actions">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="dark" leadingIcon={<Play className="h-3 w-3 fill-current" strokeWidth={0} />}>
              Play the video
            </Button>
            <Button variant="primary">Book a discovery call</Button>
            <Button variant="ghost">Learn more</Button>
            <Button variant="link">See pricing</Button>
            <Button variant="link">
              Read more
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Button>
          </div>
        </Demo>

        {/* Button colour explorer — filled + inline on a white & a carbon tile */}
        <Demo label="Button colour explorer — filled + inline, light & dark grounds">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              {BTN_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setBtnColor(c.id)}
                  aria-pressed={btnColor === c.id}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-caption capitalize transition-colors duration-sm',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40',
                    btnColor === c.id ? 'border-ink-900 text-ink-900' : 'border-line text-ink-500 hover:text-ink-900'
                  )}
                >
                  <span className="h-3 w-3 rounded-sm ring-1 ring-inset ring-carbon/10" style={{ background: c.dot }} />
                  {c.id}
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-wrap items-center gap-3 rounded-lg border border-line bg-white p-6">
                <button type="button" className={cn(BTN_BASE, FILLED[btnColor])}>Filled</button>
                <button type="button" className={cn(BTN_BASE, OUTLINE_LIGHT[btnColor])}>Inline</button>
              </div>
              <div className="flex flex-wrap items-center gap-3 rounded-lg border border-line bg-carbon p-6">
                <button type="button" className={cn(BTN_BASE, FILLED[btnColor])}>Filled</button>
                <button type="button" className={cn(BTN_BASE, OUTLINE_DARK[btnColor])}>Inline</button>
              </div>
            </div>
            <p className="font-sans text-body-sm text-ink-500">
              Six colours × filled and inline (outline), each on a white and a carbon ground with the AA-correct
              text pairing per ground. Fixed-hex grounds use fixed text colours, not theme tokens.
            </p>
          </div>
        </Demo>

        {/* The sanctioned save confirmation */}
        <Demo label="Save confirmation — the sanctioned exception">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <SaveButton>Save changes</SaveButton>
            </div>
            <p className="font-sans text-body-sm text-ink-500">
              The one celebratory moment in the standard system: quiet green check chips,
              under 400ms, announced politely to screen readers. Reduced-motion users get an
              instant confirmation with no particles.
            </p>
          </div>
        </Demo>

        {/* Quarantined expressive group — off-brand, opt-in only (motion.md §Sanctioned exceptions) */}
        <Demo
          label="Expressive — off-brand, opt-in only"
          action={<Badge variant="warn" size="sm">Not for standard surfaces</Badge>}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <CelebrationButton>Mark complete</CelebrationButton>
              <ConfettiButton>Sign up free</ConfettiButton>
              <MagnetizeButton>Book a call</MagnetizeButton>
            </div>
            <p className="font-sans text-body-sm text-ink-500">
              Kept for deliberate one-off moments only. These break the locked motion rules
              (confetti, streamers, spring physics) and are excluded from the component
              catalogue — never use them on standard Health OS marketing or product surfaces.
              All reduced-motion safe.
            </p>
          </div>
        </Demo>
      </div>
    </Section>
  );
};
