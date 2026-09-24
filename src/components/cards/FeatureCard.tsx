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
      {/* THE TAG MOVED TO THE FOOT, 24 September 2026. Tumai: "we have tags or little chips that
          say more leads, more sales, more customers, and the H1 header needs to be squashed into
          two lines, and that's not good hierarchy, we can move those chips to be at the bottom of
          the card where there is space."

          The arithmetic was against the title. A card in a three-up grid is about 290px wide
          inside its padding; the tile takes 40 and its gap 12, and a tag like "Keep more
          customers" takes about 130. That left the title roughly 108px, so "Check-in agent" broke
          across two lines while the space under the sentence sat empty.

          A tag is metadata about the card, not part of its name, so the foot is where it belongs
          on every count: the title gets the full width of its row, the tag gets the width it
          needs, and the empty space at the bottom of a short card is now doing something.

          `mt-auto` is what makes it work across a grid: the tags line up along the bottom of the
          row however uneven the sentences are, which is the same reason the description used to
          be pinned there. */}
      <div className="flex items-start gap-3">
        <IconTile id={icon} size="sm" ground={ground} className="shrink-0 transition-transform duration-md ease-out group-hover:-translate-y-0.5" />
        <h3 className="min-w-0 font-display text-subheading text-ink-900">{title}</h3>
      </div>
      <p className="mt-4 font-sans text-body text-ink-600">{description}</p>
      {tag && (
        <p className="mt-auto pt-5">
          <Badge variant={a.badge} size="sm">
            {tag}
          </Badge>
        </p>
      )}
    </div>
  );
};
