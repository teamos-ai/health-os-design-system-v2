/**
 * SocialMediaSection: three post templates built only from tokens and the tagged library.
 * Shown scaled down; export at the sizes on each label.
 */
import type { ReactNode } from 'react';
import { Section, Example } from '@/showcase/Section';
import { LogoMark } from '@/components/brand/Logo';
import { thumb } from '@/lib/images';
import { PAPER_IVORY } from '@/lib/palette';

const STORY_BG = '/backgrounds/nature-purple-lavender-field-wooden-post-portrait.png';
const LINK_IMG = '/imagery/work-and-content-creation/three-women-coworking-on-boucle-sofa-with-laptop-and-coffee-4-3.png';

const Frame = ({ label, size, children, className }: { label: string; size: string; children: ReactNode; className?: string }) => (
  <figure className={className}>
    {children}
    <figcaption className="mt-3 flex items-center justify-between gap-3">
      <span className="font-sans text-label uppercase text-ink-900">{label}</span>
      <span className="font-sans text-label text-ink-500">{size}</span>
    </figcaption>
  </figure>
);

export const SocialMediaSection = () => (
  <Section id="social">
    <Example id="social-templates" label="Feed, story and link preview">
      <div className="grid gap-8 md:grid-cols-[1fr_0.6fr]">
        <Frame label="Feed post" size="1080 × 1080">
          <div className="relative flex aspect-square flex-col justify-between overflow-hidden rounded-lg border border-line p-8" style={{ background: PAPER_IVORY }}>
            <div className="flex items-center justify-between">
              <span className="font-sans text-label uppercase text-ink-500">Health OS</span>
              <LogoMark size={32} />
            </div>
            <p className="font-display text-heading text-ink-900">
              You built it. Now make it <span className="text-highlight">run without you</span>.
            </p>
            <p className="font-sans text-body text-ink-600">See what still routes through you.</p>
          </div>
        </Frame>

        <Frame label="Story" size="1080 × 1920">
          <div className="relative flex aspect-[9/16] flex-col overflow-hidden rounded-lg border border-line bg-surface">
            <div className="image-fade-b relative min-h-0 flex-1">
              <img src={thumb(STORY_BG)} alt="A lavender field at dusk with a wooden post" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="flex flex-col gap-3 bg-surface p-5 pt-0">
              <LogoMark size={24} />
              <p className="font-display text-subheading text-ink-900">Ten questions. Under two minutes.</p>
              <span className="self-start rounded-md bg-apricot-200 px-3 py-2 font-display text-body text-ink-900">Start the check</span>
            </div>
          </div>
        </Frame>

        <Frame label="Link preview" size="1200 × 630" className="md:col-span-2">
          <div className="grid aspect-[1200/630] grid-cols-2 overflow-hidden rounded-lg border border-line" style={{ background: PAPER_IVORY }}>
            <div className="flex flex-col justify-between p-8">
              <LogoMark size={32} />
              <div>
                <p className="font-sans text-label uppercase text-ink-500">Guide</p>
                <p className="mt-2 font-display text-heading text-ink-900">The quiet week plan</p>
              </div>
              <span aria-hidden className="h-1 w-24 rounded-full bg-brand-gradient" />
            </div>
            <div className="image-fade-l relative">
              <img src={thumb(LINK_IMG)} alt="Three women working together on a sofa with laptops and coffee" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
          </div>
        </Frame>
      </div>
    </Example>
  </Section>
);
