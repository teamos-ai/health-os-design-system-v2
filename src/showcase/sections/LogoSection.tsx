/**
 * LogoSection — the "OS" mark on its own. Bare Spline Sans glyph, no box: gradient on
 * light grounds, white on dark. No wordmark — the mark stands alone everywhere.
 */
import { Section, Demo } from '@/showcase/Section';
import { LogoMark } from '@/components/brand/Logo';

export const LogoSection = () => (
  <Section
    id="logo"
    eyebrow="Brand"
    title="Logo"
    lead="The bare 'OS' glyph in Spline Sans — no box. It carries the apricot → rose → lavender gradient on light grounds and flips to white on dark. It always stands on its own; no wordmark beside it."
  >
    <div className="grid gap-4 md:grid-cols-2">
      <Demo label="Mark — light">
        <div className="flex min-h-[136px] items-center justify-center gap-8">
          <LogoMark size={72} />
          <LogoMark size={44} />
          <LogoMark size={28} />
        </div>
      </Demo>
      <Demo label="Mark — inverse (on carbon)" padded={false}>
        <div className="flex min-h-[152px] items-center justify-center gap-8 bg-carbon">
          <LogoMark size={72} inverse />
          <LogoMark size={44} inverse />
          <LogoMark size={28} inverse />
        </div>
      </Demo>
      <Demo label="As favicon">
        <div className="flex min-h-[120px] items-center justify-center gap-6">
          <span className="flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-2">
            <LogoMark size={16} />
            <span className="font-mono text-caption text-ink-600">healthos.com.au</span>
          </span>
        </div>
      </Demo>
      <Demo label="Clear space + min size">
        <div className="flex min-h-[120px] flex-col justify-center gap-3 font-mono text-body-sm text-ink-600">
          <p>Clear space ≥ the cap height of the OS on all sides.</p>
          <p>Minimum 16px (favicon). Gradient on light, white on dark.</p>
          <p>Never recolour the gradient, outline, or add a box back.</p>
        </div>
      </Demo>
    </div>
  </Section>
);
