/**
 * Card — flat hairline surface. 1px line border, soft NEUTRAL shadow on hover only.
 * Zero glass, no coloured shadow. `interactive` adds the hover lift + border darken.
 *
 * Compose with CardHeader / CardTitle / CardDescription / CardContent / CardFooter,
 * or just drop children in. `tone="ivory"` for a paper-tinted surface on white grounds.
 *
 * PHOTOGRAPHY (prop-driven, opt-in): pass `image` (+ `imageAlt`) to give the card a
 * photo, with `mediaPosition="top"` (default) or `"side"`. An optional pill `badge`
 * overlays the image, an optional typed `meta` row (e.g. a clock + "6–8 hours") sits
 * under it, and an optional `actions` footer renders the reference's outline + solid
 * button pair. Until a real photo lands, omit `image` and the card shows a graceful
 * on-token wash placeholder (per-accent diagonal tint + optional aria-hidden icon).
 * Images get a subtle hairline, rounded-md, object-cover and an optional gentle
 * zoom-on-hover that honours `prefers-reduced-motion` natively (no JS). Every existing
 * CVA prop (tone/radius/padding/interactive) is preserved — a card with NO photography
 * prop renders byte-for-byte as before.
 */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import { ACCENTS, type Accent } from '@/lib/accents';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const card = cva('relative border transition-all duration-md ease-out', {
  variants: {
    tone: {
      surface: 'bg-surface border-line',
      ivory: 'bg-paper border-line',
      soft: 'bg-line-soft border-line-soft',
    },
    radius: { lg: 'rounded-lg', xl: 'rounded-xl', '2xl': 'rounded-2xl' },
    padding: { none: 'p-0', sm: 'p-4', md: 'p-6', lg: 'p-8' },
    interactive: { true: 'hover:border-ink-300 hover:shadow-md', false: '' },
  },
  defaultVariants: { tone: 'surface', radius: 'lg', padding: 'md', interactive: false },
});

/* ──────────────────────────────────────────────────────────────────────────
 * Shared media types — used by CardMedia, Card and FeatureCard so the clock-row
 * and the outline+solid footer render identically everywhere they appear.
 * ──────────────────────────────────────────────────────────────────────── */

/** One item in the meta row — a small mono caption, optionally led by an icon. */
export interface MetaItem {
  icon?: LucideIcon;
  label: string;
}

/** One footer action. The LAST action in the array defaults to the solid primary
 *  button and the rest to the outline secondary; pass `variant` to override. */
export interface ActionItem {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: ButtonProps['variant'];
}

/** A meta row may be a typed array (rendered consistently) or any node (escape hatch). */
export type CardMeta = MetaItem[] | React.ReactNode;
/** Actions may be a typed array (outline + solid pair) or any node (full control). */
export type CardActions = ActionItem[] | React.ReactNode;

/** Narrows a `CardMeta` to the typed `MetaItem[]` form (vs. an arbitrary node). */
export const isMetaArray = (m: CardMeta): m is MetaItem[] =>
  Array.isArray(m) && m.every((x) => x != null && typeof x === 'object' && 'label' in (x as object));

/** Narrows a `CardActions` to the typed `ActionItem[]` form (vs. an arbitrary node). */
export const isActionArray = (a: CardActions): a is ActionItem[] =>
  Array.isArray(a) && a.every((x) => x != null && typeof x === 'object' && 'label' in (x as object));

/** The clock-icon + "6–8 hours" row. Mono caption, ink-500, hairline icons. */
const MetaRow = ({ items, className }: { items: MetaItem[]; className?: string }) => (
  <div className={cn('flex flex-wrap items-center gap-x-4 gap-y-1.5', className)}>
    {items.map((m, i) => (
      <span
        key={i}
        className="inline-flex items-center gap-1.5 font-mono text-caption text-ink-500"
      >
        {m.icon && <m.icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />}
        {m.label}
      </span>
    ))}
  </div>
);

/** The outline + solid footer. Last action solid (primary), the rest outline.
 *  An action with `href` renders as an anchor; `href` is spread via the polymorphic
 *  `as="a"` element (Button forwards extra props to the rendered tag). */
const ActionsRow = ({ items, className }: { items: ActionItem[]; className?: string }) => (
  <div className={cn('flex flex-wrap items-center gap-3', className)}>
    {items.map((a, i) => (
      <Button
        key={i}
        size="sm"
        variant={a.variant ?? (i === items.length - 1 ? 'primary' : 'secondary')}
        onClick={a.onClick}
        {...(a.href ? { as: 'a' as const, href: a.href } : {})}
      >
        {a.label}
      </Button>
    ))}
  </div>
);

/* ── CardMedia — the photo (or graceful wash placeholder) ──────────────────────
 * Self-contained: drop a real `src` in and it just works; leave it out for the
 * on-token wash. Overlay `badge` (top-left by default) sits over the image. The whole
 * tile is rounded-md with a hairline; `zoom` adds a calm group-hover scale that is
 * disabled under prefers-reduced-motion via the platform-native `motion-reduce:`
 * variant — correct even with JS off and pre-hydration, no framer-motion needed.
 * The zoom keys off the nearest `.group` ancestor (Card's media mode + FeatureCard
 * add one; for a bare Card, add `group` yourself). Placeholder icon is aria-hidden. */
export interface CardMediaProps {
  src?: string;
  alt?: string;
  /** aspect ratio, e.g. '16/9', '4/3', '1/1' — defaults to '16/9' */
  ratio?: string;
  /** accent that tints the placeholder wash when there is no image */
  accent?: Accent;
  /** decorative icon shown on the wash placeholder */
  placeholderIcon?: LucideIcon;
  /** node overlaid on a top corner of the image (e.g. a Badge) */
  badge?: React.ReactNode;
  /** which top corner the badge sits in — default 'start' (left) */
  badgeAlign?: 'start' | 'end';
  /** gentle zoom on parent hover (reduced-motion safe) — default true */
  zoom?: boolean;
  /** fill the parent's height instead of using `ratio` (image-side layouts) */
  fill?: boolean;
  className?: string;
  /** extra classes on the <img> (object-position etc.) */
  imgClassName?: string;
}

export const CardMedia = ({
  src,
  alt = '',
  ratio = '16/9',
  accent = 'rose',
  placeholderIcon: Icon,
  badge,
  badgeAlign = 'start',
  zoom = true,
  fill = false,
  className,
  imgClassName,
}: CardMediaProps) => {
  const a = ACCENTS[accent];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md border border-line bg-surface-2',
        fill ? 'h-full w-full' : 'w-full',
        className
      )}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={cn(
            'h-full w-full object-cover',
            // Pure-CSS zoom, honoured by the OS preference natively — no JS, correct
            // pre-hydration and with scripts disabled.
            zoom &&
              'transition-transform duration-lg ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none',
            imgClassName
          )}
        />
      ) : (
        // Graceful placeholder — warm on-token wash + house grain, optional icon.
        // `relative` so the `.grain::after` overlay positions against this tile.
        <div
          aria-hidden
          className={cn(
            'grain relative flex h-full w-full items-center justify-center',
            a.wash
          )}
        >
          {Icon && <Icon className={cn('h-9 w-9', a.washIcon)} strokeWidth={1.5} />}
        </div>
      )}
      {badge && (
        <div className={cn('absolute top-3 z-10', badgeAlign === 'end' ? 'right-3' : 'left-3')}>
          {badge}
        </div>
      )}
    </div>
  );
};
CardMedia.displayName = 'CardMedia';

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof card> {
  as?: React.ElementType;
  /** photo src — when set (or `mediaPosition`/`badge`/`meta`/`actions` are used) the
   *  card renders in media mode: a CardMedia tile + a padded content well for children. */
  image?: string;
  /** Alt text for the photo. Required in spirit whenever `image` carries meaning —
   *  only omit (or pass '') when the photo is purely decorative. */
  imageAlt?: string;
  /** aspect ratio for the media, e.g. '16/9' (top) or '1/1' (side). */
  ratio?: string;
  /** where the media sits relative to the content. Default 'top'. */
  mediaPosition?: 'top' | 'side';
  /** node overlaid on the image (typically a <Badge />). */
  badge?: React.ReactNode;
  /** which top corner the badge sits in — default 'start' (left). */
  badgeAlign?: 'start' | 'end';
  /** small meta row under the photo — typed `{ icon?, label }[]` or any node. */
  meta?: CardMeta;
  /** footer actions — typed `{ label, href?, onClick?, variant? }[]` (last = solid,
   *  rest = outline) or any node for full control. Sits after the children. */
  actions?: CardActions;
  /** accent tinting the placeholder wash when there's no image. Default 'rose'. */
  accent?: Accent;
  /** decorative icon on the wash placeholder. */
  placeholderIcon?: LucideIcon;
  /** gentle zoom-on-hover for the image. Default true. */
  zoom?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      tone,
      radius,
      padding,
      interactive,
      as: Comp = 'div',
      image,
      imageAlt,
      ratio,
      mediaPosition = 'top',
      badge,
      badgeAlign,
      meta,
      actions,
      accent = 'rose',
      placeholderIcon,
      zoom,
      children,
      ...props
    },
    ref
  ) => {
    // Media mode is opt-in: triggered by any photography prop. Without them the card
    // is byte-for-byte the original (children rendered straight into the padded box).
    const hasMedia =
      image !== undefined ||
      badge !== undefined ||
      meta !== undefined ||
      actions !== undefined;

    if (!hasMedia) {
      return (
        <Comp
          ref={ref}
          className={cn(card({ tone, radius, padding, interactive }), className)}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    const side = mediaPosition === 'side';
    // In media mode the outer shell owns the border + radius and clips the media; the
    // padding token is applied to the inner content well instead of the whole box.
    const pad = padding ?? 'md';

    const media = (
      <CardMedia
        src={image}
        alt={imageAlt}
        ratio={ratio ?? (side ? '1/1' : '16/9')}
        accent={accent}
        placeholderIcon={placeholderIcon}
        badge={badge}
        badgeAlign={badgeAlign}
        zoom={zoom}
        fill={side}
        // Media butts to the card edge: drop its own border and radius entirely —
        // the card's overflow-hidden clips it to the outer radius at every size,
        // so it reads as one flat tile with no corner seam.
        className="rounded-none border-0"
      />
    );

    const content = (
      <div className={cn('group/content flex flex-1 flex-col', card({ padding: pad }))}>
        {meta &&
          (isMetaArray(meta) ? (
            meta.length > 0 && <MetaRow items={meta} className="mb-3" />
          ) : (
            <div className="mb-3 flex items-center gap-2 font-mono text-caption text-ink-500">
              {meta}
            </div>
          ))}
        {children}
        {actions &&
          (isActionArray(actions) ? (
            actions.length > 0 && <ActionsRow items={actions} className="mt-5" />
          ) : (
            <div className="mt-5 flex flex-wrap items-center gap-3">{actions}</div>
          ))}
      </div>
    );

    return (
      <Comp
        ref={ref}
        className={cn(
          'group',
          card({ tone, radius, padding: 'none', interactive }),
          'overflow-hidden',
          side ? 'flex flex-col sm:flex-row' : 'flex flex-col',
          className
        )}
        {...props}
      >
        {side ? <div className="w-full shrink-0 sm:w-2/5">{media}</div> : media}
        {content}
      </Comp>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4 flex flex-col gap-1.5', className)} {...props} />
);

export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('font-display text-h4 text-ink-900', className)} {...props} />
);

export const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('font-sans text-body-sm text-ink-500 leading-relaxed', className)} {...props} />
);

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('font-sans text-body-md text-ink-600', className)} {...props} />
);

export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-5 flex items-center gap-3', className)} {...props} />
);

/* Re-exported helpers — let consumers render a consistent meta row / actions footer
 * outside the Card shell (e.g. a hero or a custom layout) without re-spelling markup. */
export { MetaRow, ActionsRow };

export interface BadgeShorthand {
  label: string;
  variant?: BadgeProps['variant'];
  emoji?: string;
}
/** Helper to turn a badge shorthand into a <Badge/>, or pass a node straight through. */
export const renderBadge = (badge: BadgeShorthand | React.ReactNode): React.ReactNode => {
  if (
    badge != null &&
    typeof badge === 'object' &&
    !React.isValidElement(badge) &&
    'label' in (badge as object)
  ) {
    const b = badge as BadgeShorthand;
    return (
      <Badge variant={b.variant ?? 'brand'} size="sm" emoji={b.emoji}>
        {b.label}
      </Badge>
    );
  }
  return badge as React.ReactNode;
};
