/**
 * Hero — the spacious, minimalist hero shell.
 *
 * RULE (design-system contract): every hero across Health OS is built with <Hero> so the
 * generous vertical rhythm and calm stack gaps stay identical everywhere. The spacing is
 * tokenised in the Tailwind preset (hero-py / hero-py-lg for the section padding,
 * hero-gap / hero-gap-sm for the space between items) — never hand-roll hero padding.
 *
 *   <Hero id="hero">
 *     <HeroGlow />
 *     <HeroContainer>
 *       <h1 …/>
 *       <p className="mt-hero-gap-sm" …/>      // title → subcopy
 *       <div className="mt-hero-gap" …/>        // subcopy → primary action
 *       <div className="mt-hero-gap-sm" …/>     // action → supporting chips
 *     </HeroContainer>
 *   </Hero>
 *
 * `fade` (a page's opening hero only): no hairline at the foot; instead the hero's ground
 * dissolves over the hero-fade height into the textured ground of the section below, so
 * nothing marks where the fold was. Use it when the next section sits on the textured ground.
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  /** blend softly into the section below instead of ending on a hairline */
  fade?: boolean;
  children: React.ReactNode;
}

/** The hero section — owns the spacious, tokenised vertical padding. */
export const Hero = ({ id, fade = false, className, children, ...rest }: HeroProps) => (
  <section
    id={id}
    className={cn(
      'relative isolate scroll-mt-8 overflow-hidden px-6',
      fade ? 'hero-fade' : 'border-b border-line',
      'pb-hero-py pt-hero-py md:pb-hero-py-lg md:pt-hero-py-lg',
      className
    )}
    {...rest}
  >
    {children}
  </section>
);

export interface HeroContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** Centred, max-width column for the hero's content. */
export const HeroContainer = ({ className, children, ...rest }: HeroContainerProps) => (
  <div
    className={cn('mx-auto flex max-w-4xl flex-col items-center text-center', className)}
    {...rest}
  >
    {children}
  </div>
);
