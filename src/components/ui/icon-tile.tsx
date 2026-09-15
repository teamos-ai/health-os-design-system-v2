/**
 * IconTile: one icon from the icon library on its own, outside a headline. A photoreal object on
 * the warm charcoal squircle, in three sizes from tokens.json → icon: sm (40px) beside a list
 * item or card title, md (64px) in a feature card or bento cell, lg (96px) on its own.
 *
 *   <IconTile id="stones" size="md" />
 *   <IconTile id="desk-calendar" size="sm" label="Bookings" />
 *
 * Decorative by default: the words beside it carry the meaning. Pass `label` when the icon
 * stands in for words, and it is announced as an image. It never reacts to the pointer; wrap it
 * in a link or button for that. A tile still to be made shows as an empty squircle.
 */
import { HEADLINE_TILES } from '@/data/headline-tiles';
import { cn } from '@/lib/utils';

const SIZE = { sm: 'icon-tile-sm', md: 'icon-tile-md', lg: 'icon-tile-lg' } as const;

export interface IconTileProps {
  /** a tile id from the icon library */
  id: string;
  size?: keyof typeof SIZE;
  /** what the icon means, when there are no words beside it */
  label?: string;
  className?: string;
}

export const IconTile = ({ id, size = 'md', label, className }: IconTileProps) => {
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
      className={cn('icon-tile', SIZE[size], !tile.src && 'border border-dashed border-ink-400', className)}
    >
      {tile.src && <img src={tile.src} alt="" draggable={false} loading="lazy" decoding="async" />}
    </span>
  );
};
