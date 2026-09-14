/**
 * FeatureGrid: many small features at a glance, in a lined grid.
 *
 * Remodelled from the 21st.dev Features 4 (Tailark). One rounded frame with a hairline holds
 * the cells, and hairlines between them do the separating: no cards, tiles or shadows inside.
 * Each cell has an icon in ink or a light brand shade, a short title and one sentence. One
 * column on phones, two from sm and three from lg (or two throughout with `columns={2}`).
 * Each cell draws only its right and bottom line and the frame clips the outer ones, so a
 * short last row closes cleanly. Cell content rises in once as the grid comes into view.
 * Not links, so nothing lifts on hover.
 */
import { Stagger, StaggerItem } from '@/components/ui/animated';
import { cn } from '@/lib/utils';
import { FeatureIntro, ICON_CLASS, ICON_STROKE, itemHeading, toneIcon, type FeatureBaseProps, type FeatureItem, type FeatureTone } from './shared';

export interface FeatureGridProps extends FeatureBaseProps {
  /** four to nine items; a multiple of the column count reads best */
  items: FeatureItem[];
  /** columns at the widest size */
  columns?: 2 | 3;
  /** icon tone for every cell; an item's own tone wins */
  tone?: FeatureTone;
}

const COLUMNS = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
} as const;

export const FeatureGrid = ({ items, columns = 3, tone = 'ink', eyebrow, title, description, align, headingLevel = 'h2', className }: FeatureGridProps) => {
  const ItemHeading = itemHeading(headingLevel);
  return (
    <div className={className}>
      <FeatureIntro eyebrow={eyebrow} title={title} description={description} align={align} headingLevel={headingLevel} />
      <div className="overflow-hidden rounded-lg border border-line bg-surface">
        <Stagger as="ul" className={cn('-mb-px -mr-px grid grid-cols-1', COLUMNS[columns])}>
          {items.map(({ icon: Icon, title: itemTitle, description: itemDescription, tone: itemTone }) => (
            <li key={itemTitle} className="min-w-0 border-b border-r border-line p-6 md:p-8">
              <StaggerItem>
                <Icon className={cn(ICON_CLASS, toneIcon(itemTone ?? tone))} strokeWidth={ICON_STROKE} aria-hidden />
                <ItemHeading className="mt-6 font-display text-subheading text-ink-900">{itemTitle}</ItemHeading>
                <p className="mt-2 font-sans text-body text-ink-600">{itemDescription}</p>
              </StaggerItem>
            </li>
          ))}
        </Stagger>
      </div>
    </div>
  );
};
