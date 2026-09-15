/**
 * FeatureCard: one benefit, told plainly.
 *
 * An icon tile from the icon library sits in the top row, beside an optional tag in the card's
 * accent that names the area. The title and sentence settle at the bottom, so cards of
 * different heights in a bento or grid still line up along their text. No numbering. The
 * tile is charcoal on a plain card; pass `ground="paper"` or `"white"` when the cards sit
 * beside dissolving photos or on a wash, and keep one ground across the grid. Not a link;
 * hover gives a quiet lift.
 *
 *   <FeatureCard icon="stones" title="Clarity" description="One view of what is booked." />
 */
import { Badge } from '@/components/ui/badge';
import { IconTile, type IconTileGround } from '@/components/ui/icon-tile';
import { ACCENTS, type Accent } from '@/lib/accents';
import { cn } from '@/lib/utils';

export interface FeatureCardProps {
  /** a tile id from the icon library */
  icon: string;
  title: string;
  description: string;
  accent?: Accent;
  /** names the area, top right: "Booking", "Follow-up" */
  tag?: string;
  /** the tile's ground: carbon (default), paper or white */
  ground?: IconTileGround;
  className?: string;
}

export const FeatureCard = ({ icon, title, description, accent = 'rose', tag, ground = 'carbon', className }: FeatureCardProps) => {
  const a = ACCENTS[accent];
  return (
    <div
      className={cn(
        'group flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-[box-shadow,transform,border-color] duration-md ease-out hover:-translate-y-1 hover:border-ink-200 hover:shadow-sm',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <IconTile id={icon} size="md" ground={ground} className="transition-transform duration-md ease-out group-hover:-translate-y-0.5" />
        {tag && (
          <Badge variant={a.badge} size="sm">
            {tag}
          </Badge>
        )}
      </div>
      <div className="mt-auto pt-8">
        <h3 className="font-display text-subheading text-ink-900">{title}</h3>
        <p className="mt-2 font-sans text-body text-ink-600">{description}</p>
      </div>
    </div>
  );
};
