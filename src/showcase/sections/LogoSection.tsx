/**
 * LogoSection: the mark and the long logo on the two grounds the system uses, light and
 * paper, at the sizes in use. There is no dark ground, so none is shown.
 */
import { Section, Usage } from '@/showcase/Section';
import { LogoMark, LogoLong } from '@/components/brand/Logo';
import { PAPER_IVORY, WHITE } from '@/lib/palette';
import { cn } from '@/lib/utils';

/* Fixed grounds, so each shows its real colour whichever theme the reference is in. */
const GROUNDS = [
  { label: 'Light', style: { background: WHITE } },
  { label: 'Paper', style: { background: PAPER_IVORY } },
] as const;

const Ground = ({ label, style, children }: { label: string; style: React.CSSProperties; children: React.ReactNode }) => (
  <figure className="flex flex-col gap-3">
    <div className={cn('flex min-h-40 flex-wrap items-center justify-center gap-8 rounded-lg border border-line px-6 py-8')} style={style}>{children}</div>
    <figcaption className="font-sans text-label uppercase text-ink-500">{label}</figcaption>
  </figure>
);

export const LogoSection = () => (
  <Section id="logo">
    <div className="flex flex-col gap-8">
      <div className="overflow-hidden rounded-lg border border-line bg-surface">
        <div className="border-b border-line bg-surface-2 px-4 py-3 font-sans text-label uppercase text-ink-500">The mark</div>
        <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
          {GROUNDS.map((g) => (
            <Ground key={g.label} label={g.label} style={g.style}>
              <LogoMark size={72} />
              <LogoMark size={40} />
              <LogoMark size={24} />
            </Ground>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 border-t border-line px-6 py-4 md:px-8">
          <span className="flex items-center gap-2 rounded-md border border-line bg-paper px-3 py-2">
            <LogoMark size={16} />
            <span className="font-sans text-label text-ink-600">healthos.au</span>
          </span>
          <span className="font-sans text-label text-ink-500">As a 16px favicon, the smallest size in use</span>
        </div>
        <Usage id="logo" />
      </div>

      <div className="overflow-hidden rounded-lg border border-line bg-surface">
        <div className="border-b border-line bg-surface-2 px-4 py-3 font-sans text-label uppercase text-ink-500">The long logo</div>
        <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
          {GROUNDS.map((g) =>
            (['white', 'filled'] as const).map((v) => (
              <Ground key={`${g.label}-${v}`} label={`${g.label} · ${v === 'white' ? 'White background' : 'Filled background'}`} style={g.style}>
                <LogoLong variant={v} height={64} />
                <LogoLong variant={v} height={32} />
              </Ground>
            ))
          )}
        </div>
        <Usage id="logo-long" />
      </div>
    </div>
  </Section>
);
