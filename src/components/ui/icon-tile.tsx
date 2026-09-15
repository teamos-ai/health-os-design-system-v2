/**
 * IconTile: one icon from the icon library on its own, outside a headline. A photoreal object on
 * a squircle, in four sizes from tokens.json → icon: xs (28px) beside a tab label, sm (40px)
 * beside a list item or card title, md (64px) in a feature card or bento cell, lg (96px) on its own.
 *
 *   <IconTile id="stones" size="md" />
 *   <IconTile id="desk-calendar" size="sm" label="Bookings" />
 *   <IconTile id="monstera" ground="white" />
 *
 * Three grounds, one per component (never mixed in one row or grid):
 *
 *   carbon  the warm charcoal squircle, the default: headlines, the library, plain white or paper cards
 *   paper   warm ivory with a hairline: tabs, and cards beside or over photos that dissolve
 *   white   plain white with a hairline: brand washes, 50 tints and gradient tiles
 *
 * Decorative by default: the words beside it carry the meaning. Pass `label` when the icon
 * stands in for words, and it is announced as an image. It never reacts to the pointer; wrap it
 * in a link or button for that. A tile still to be made shows as an empty squircle.
 */
import { HEADLINE_TILES } from '@/data/headline-tiles';
import { cn } from '@/lib/utils';

const SIZE = { xs: 'icon-tile-xs', sm: 'icon-tile-sm', md: 'icon-tile-md', lg: 'icon-tile-lg' } as const;

export type IconTileGround = 'carbon' | 'paper' | 'white';
export const ICON_TILE_GROUNDS: IconTileGround[] = ['carbon', 'paper', 'white'];

const GROUND: Record<IconTileGround, string | undefined> = { carbon: undefined, paper: 'icon-tile-paper', white: 'icon-tile-white' };

export interface IconTileProps {
  /** a tile id from the icon library */
  id: string;
  size?: keyof typeof SIZE;
  /** the squircle behind the object: carbon (default), paper or white */
  ground?: IconTileGround;
  /** what the icon means, when there are no words beside it */
  label?: string;
  className?: string;
}

export const IconTile = ({ id, size = 'md', ground = 'carbon', label, className }: IconTileProps) => {
  const tile = HEADLINE_TILES[id];
  if (!tile) {
    if (import.meta.env.DEV) console.warn(`IconTile: no tile called "${id}" in the icon library`);
    return null;
  }
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn('icon-tile', SIZE[size], GROUND[ground], !tile.src && 'border border-dashed border-ink-400', className)}
    >
      {tile.src && <img src={tile.src} alt="" draggable={false} loading="lazy" decoding="async" />}
    </span>
  );
};
