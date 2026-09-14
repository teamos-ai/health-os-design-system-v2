/**
 * FeatureCards: three benefits side by side, each with a decorated icon well.
 *
 * Remodelled from the 21st.dev Features 1 and Features 2 (Tailark). The icon sits in a small
 * squircle, centred over a faint ink-200 grid that fades out in a circle, then a title and a
 * sentence, all centred. Two styles:
 *
 *   outline   a surface card with a hairline, for white and paper grounds
 *   muted     a recessed surface-2 card with no border, for a quieter row
 *
 * An item's tone tints the squircle in rose or lavender 50 with a 200 edge; the icon stays ink.
 * One column on phones, three from lg (or two from md with `columns={2}`). Not links, so
 * they do not lift on hover. Cards rise in once as the row comes into view.
 */
import type { CSSProperties } from 'react';
import { Stagger, StaggerItem } from '@/components/ui/animated';
import { cn } from '@/lib/utils';
import { FeatureIntro, ICON_CLASS, ICON_STROKE, itemHeading, type FeatureBaseProps, type FeatureItem, type FeatureTone } from './shared';

export type FeatureCardsVariant = 'outline' | 'muted';

export interface FeatureCardsProps extends FeatureBaseProps {
  /** two to four items; three reads best */
  items: FeatureItem[];
  variant?: FeatureCardsVariant;
  columns?: 2 | 3;
}

/** 24px grid in ink-200, offset so the squircle sits centred between lines; fades out radially. */
const PATTERN: CSSProperties = {
  backgroundImage: 'linear-gradient(to right, var(--hos-ink-200) 1px, transparent 1px), linear-gradient(to bottom, var(--hos-ink-200) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
  backgroundPosition: '12px 12px',
  maskImage: 'radial-gradient(closest-side, black 35%, transparent 100%)',
  WebkitMaskImage: 'radial-gradient(closest-side, black 35%, transparent 100%)',
};

const WELL: Record<FeatureTone, string> = {
  ink: 'bg-surface ring-ink-200',
  rose: 'bg-rose-50 ring-rose-200',
  lavender: 'bg-lavender-50 ring-lavender-200',
};

const CARD: Record<FeatureCardsVariant, string> = {
  outline: 'border border-line bg-surface',
  muted: 'bg-surface-2',
};

const COLUMNS = {
  2: 'md:grid-cols-2',
  3: 'lg:grid-cols-3',
} as const;

export const FeatureCards = ({ items, variant = 'outline', columns = 3, eyebrow, title, description, align, headingLevel = 'h2', className }: FeatureCardsProps) => {
  const ItemHeading = itemHeading(headingLevel);
  return (
    <div className={className}>
      <FeatureIntro eyebrow={eyebrow} title={title} description={description} align={align} headingLevel={headingLevel} />
      <Stagger as="ul" className={cn('grid grid-cols-1 gap-4', COLUMNS[columns])}>
        {items.map(({ icon: Icon, title: itemTitle, description: itemDescription, tone = 'ink' }) => (
          <StaggerItem as="li" key={itemTitle} className="min-w-0">
            <div className={cn('flex h-full flex-col items-center rounded-lg p-6 text-center md:p-8', CARD[variant])}>
              <div className="relative h-36 w-36 shrink-0">
                <div aria-hidden className="absolute inset-0" style={PATTERN} />
                <span className={cn('absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-md text-ink-900 ring-1 ring-inset', WELL[tone])}>
                  <Icon className={ICON_CLASS} strokeWidth={ICON_STROKE} aria-hidden />
                </span>
              </div>
              <ItemHeading className="mt-6 font-display text-subheading text-ink-900">{itemTitle}</ItemHeading>
              <p className="mt-2 max-w-sm font-sans text-body text-ink-600">{itemDescription}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
};
