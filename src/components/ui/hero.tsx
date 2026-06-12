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
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  children: React.ReactNode;
}

/** The hero section — owns the spacious, tokenised vertical padding. */
export const Hero = ({ id, className, children, ...rest }: HeroProps) => (
  <section
    id={id}
    className={cn(
      'relative scroll-mt-8 overflow-hidden border-b border-line px-6',
      'pb-hero-py pt-hero-py md:pb-hero-py-lg md:pt-hero-py-lg',
      className
    )}
    {...rest}
  >
    {children}
  </section>
);

export interface HeroContainerProps {
  className?: string;
  children: React.ReactNode;
}

/** Centred, max-width column for the hero's content. */
export const HeroContainer = ({ className, children }: HeroContainerProps) => (
  <div className={cn('mx-auto flex max-w-4xl flex-col items-center text-center', className)}>
    {children}
  </div>
);
