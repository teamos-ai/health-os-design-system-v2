/**
 * LogoSection: the gradient OS mark on each ground it is used on, at the sizes in use.
 */
import { Section, Usage } from '@/showcase/Section';
import { LogoMark } from '@/components/brand/Logo';
import { PAPER_IVORY } from '@/lib/palette';

const Ground = ({ label, className, style, children }: { label: string; className: string; style?: React.CSSProperties; children: React.ReactNode }) => (
  <figure className="flex flex-col gap-3">
    <div className={`flex min-h-40 items-center justify-center gap-8 rounded-lg ${className}`} style={style}>
      {children}
    </div>
    <figcaption className="font-sans text-label uppercase text-ink-500">{label}</figcaption>
  </figure>
);

export const LogoSection = () => (
  <Section id="logo">
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      <div className="grid gap-6 p-6 md:grid-cols-3 md:p-8">
        <Ground label="Light" className="border border-line bg-white">
          <LogoMark size={72} />
          <LogoMark size={40} />
          <LogoMark size={24} />
        </Ground>
        <Ground label="Paper" className="border border-line" style={{ background: PAPER_IVORY }}>
          <LogoMark size={72} />
          <LogoMark size={40} />
          <LogoMark size={24} />
        </Ground>
        <Ground label="Carbon" className="bg-carbon">
          <LogoMark size={72} />
          <LogoMark size={40} />
          <LogoMark size={24} />
        </Ground>
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
  </Section>
);
