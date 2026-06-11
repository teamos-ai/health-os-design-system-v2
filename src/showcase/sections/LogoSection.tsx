/**
 * LogoSection — the mark, the wordmark, the lockup, and inverse on carbon. The "OS"
 * tile carries the gradient; the wordmark picks it up on OS. Clear space + min size.
 */
import { Section, Demo } from '@/showcase/Section';
import { Logo, LogoMark } from '@/components/brand/Logo';

export const LogoSection = () => (
  <Section
    id="logo"
    eyebrow="Brand"
    title="Logo"
    lead="A soft rounded-square tile carrying OS in the apricot → rose → lavender gradient, with the Health OS wordmark. Light is primary; inverse flips the wordmark white for carbon grounds."
  >
    <div className="grid gap-4 md:grid-cols-2">
      <Demo label="Lockup — light">
        <div className="flex min-h-[120px] items-center justify-center">
          <Logo size={44} />
        </div>
      </Demo>
      <Demo label="Lockup — inverse" padded={false}>
        <div className="flex min-h-[136px] items-center justify-center bg-carbon">
          <Logo size={44} inverse />
        </div>
      </Demo>
      <Demo label="Mark">
        <div className="flex min-h-[120px] items-center justify-center gap-6">
          <LogoMark size={64} />
          <LogoMark size={40} />
          <LogoMark size={28} />
        </div>
      </Demo>
      <Demo label="Clear space + min size">
        <div className="flex min-h-[120px] flex-col justify-center gap-3 font-mono text-body-sm text-ink-600">
          <p>Clear space ≥ the height of the OS tile on all sides.</p>
          <p>Minimum mark size 24px; wordmark 96px wide.</p>
          <p>Never recolour the gradient or stretch the lockup.</p>
        </div>
      </Demo>
    </div>
  </Section>
);
