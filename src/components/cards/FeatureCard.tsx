/**
 * FeatureCard: one benefit, told plainly.
 *
 * THE TITLE SITS IN THE TILE'S ROW. An icon tile from the icon library opens the card with the
 * title beside it, and an optional tag in the card's accent closes the row, naming the area.
 * The sentence follows underneath.
 *
 * It used to stack: a 64px tile alone on the first row, the tag opposite it, and the title
 * pushed to the foot of the card. That left a band of empty card the full width and 64px tall
 * between the tile and the words, on every card of every grid at once, and it meant a reader
 * scanning a row of cards read six pictures before reading a single name. A tile is a mark for
 * the title, so it belongs next to the title.
 *
 * The tile is `sm`, not `md`, for the same reason: at 64px it was taller than the two lines of
 * heading it now sits beside, so the row would take the tile's height instead of the text's and
 * the card would keep the space this arrangement exists to save.
 *
 * The sentence still settles at the bottom, so cards of different heights in a bento or grid
 * line up along their text. No numbering. The tile is charcoal on a plain card; pass
 * `ground="paper"` or `"white"` when the cards sit beside dissolving photos or on a wash, and
 * keep one ground across the grid. Not a link; hover gives a quiet lift.
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
      <div className="flex items-start gap-3">
        <IconTile id={icon} size="sm" ground={ground} className="shrink-0 transition-transform duration-md ease-out group-hover:-translate-y-0.5" />
        {/* `flex-1 min-w-0` so a long title wraps inside its own column instead of pushing the
            tag off the card, and the tag stays pinned to the right however long the title is. */}
        <h3 className="min-w-0 flex-1 font-display text-subheading text-ink-900">{title}</h3>
        {tag && (
          <Badge variant={a.badge} size="sm" className="mt-0.5 shrink-0">
            {tag}
          </Badge>
        )}
      </div>
      <p className="mt-4 font-sans text-body text-ink-600">{description}</p>
    </div>
  );
};
