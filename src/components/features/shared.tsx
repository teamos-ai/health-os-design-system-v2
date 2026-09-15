/**
 * Feature parts: what FeatureSteps, FeatureTabs, FeatureGrid and FeatureCards share.
 *
 * One item shape (icon, title, description, an optional tone), one intro block (eyebrow,
 * title, description) and one heading rule: `headingLevel` is the level of the intro title
 * and item titles sit one level below it. Spacing is shared too: the intro sits 40 to 48px
 * above the items, cells and cards pad 24 then 32px, the icon sits 24px above its title and
 * the sentence 8px below it. Icons are tiles from the icon library (IconTile), one ground per
 * component: charcoal in the grid and cards, paper beside the photos that dissolve in the steps
 * and tabs. Pass `ground` to change it for the whole component. Tone colours a tab's badge
 * only, so it never includes apricot: apricot is kept for the current step and selected tab.
 */
import { FadeIn } from '@/components/ui/animated';
import type { IconTileGround } from '@/components/ui/icon-tile';
import { ACCENTS } from '@/lib/accents';
import { cn } from '@/lib/utils';

export type FeatureHeadingLevel = 'h2' | 'h3';

/** decoration tone for an item's badge: ink, or the light rose and lavender shades */
export type FeatureTone = 'ink' | 'rose' | 'lavender';

export interface FeatureItem {
  /** a tile id from the icon library */
  icon: string;
  title: string;
  /** one or two plain sentences */
  description: string;
  tone?: FeatureTone;
}

export interface FeatureIntroProps {
  /** short uppercase context above the title: "Setup" */
  eyebrow?: string;
  /** the one text-heading in the component */
  title?: string;
  description?: string;
  /** intro alignment; the items keep their own layout */
  align?: 'start' | 'center';
  /** level of the intro title; item titles sit one level below. Pass 'h3' inside a section that already has its h2 */
  headingLevel?: FeatureHeadingLevel;
}

export interface FeatureBaseProps extends FeatureIntroProps {
  /** the icon tiles' ground, the same for every item */
  ground?: IconTileGround;
  className?: string;
}

/** Item titles sit one level below the intro title. */
export const itemHeading = (level: FeatureHeadingLevel = 'h2') => (level === 'h2' ? 'h3' : 'h4');

export const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

export const toneBadge = (tone: FeatureTone = 'ink') => (tone === 'ink' ? 'outline' : ACCENTS[tone].badge);

export const FeatureIntro = ({ eyebrow, title, description, align = 'start', headingLevel = 'h2' }: FeatureIntroProps) => {
  if (!eyebrow && !title && !description) return null;
  const Heading = headingLevel;
  return (
    <FadeIn as="header" className={cn('mb-10 max-w-2xl md:mb-12', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && <p className="mb-3 font-sans text-label uppercase text-ink-500">{eyebrow}</p>}
      {title && <Heading className="font-display text-heading text-ink-900">{title}</Heading>}
      {description && <p className={cn('font-sans text-body text-ink-600', title && 'mt-4')}>{description}</p>}
    </FadeIn>
  );
};
