/**
 * LogoSection — the Health OS logo. The exact brand asset (gradient "OS" tile,
 * background removed) used on its own everywhere, on light and dark grounds, and as
 * the favicon. No wordmark.
 */
import { Section, Demo } from '@/showcase/Section';
import { LogoMark } from '@/components/brand/Logo';

export const LogoSection = () => (
  <Section
    id="logo"
    eyebrow="Brand"
    title="Logo"
    lead="The Health OS logo — the gradient 'OS' tile with its background removed. It sits cleanly on any ground and always stands on its own; no wordmark beside it."
  >
    <div className="grid gap-4 md:grid-cols-2">
      <Demo label="On light">
        <div className="flex min-h-[136px] items-center justify-center gap-8">
          <LogoMark size={72} />
          <LogoMark size={44} />
          <LogoMark size={28} />
        </div>
      </Demo>
      <Demo label="On carbon" padded={false}>
        <div className="flex min-h-[152px] items-center justify-center gap-8 bg-carbon">
          <LogoMark size={72} />
          <LogoMark size={44} />
          <LogoMark size={28} />
        </div>
      </Demo>
      <Demo label="As favicon">
        <div className="flex min-h-[120px] items-center justify-center">
          <span className="flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-2">
            <LogoMark size={16} />
            <span className="font-mono text-caption text-ink-600">healthos.com.au</span>
          </span>
        </div>
      </Demo>
      <Demo label="Clear space + min size">
        <div className="flex min-h-[120px] flex-col justify-center gap-3 font-mono text-body-sm text-ink-600">
          <p>Clear space ≥ a quarter of the tile on all sides.</p>
          <p>Minimum 16px (favicon). Works on light and dark as-is.</p>
          <p>Never recolour, outline, or stretch the logo.</p>
        </div>
      </Demo>
    </div>
  </Section>
);
