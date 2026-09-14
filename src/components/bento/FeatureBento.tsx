/**
 * FeatureBento: the feature grid for a website section, in three styles.
 *
 * Remodelled from the 21st.dev feature bento for Health OS. Six cells on a three-column
 * grid: a large hero cell (two by two), a highlight figure and a feature beside it, then an
 * action and two facts along the bottom. The layout stays the same in every style; the
 * style only changes how the cells are filled:
 *
 *   photo   a library photo fills the top of the hero and dissolves into the text below it
 *   tint    soft brand tints in every cell, the photo framed in the hero
 *   quiet   surfaces and hairlines, the photo dissolving in beside the hero text
 *
 * Interactive: cells lift on hover, the hero photo eases forward, figures count up as they
 * come into view and the action's arrow turns toward you. Colour comes from the 50 and 200
 * shades only, the action arrow uses the button colour, and there is at most one gradient.
 * Figures must be real: prices from the offer or facts from the database.
 */
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { CountUp, BreathingDot } from '@/components/ui/animated';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type BentoStyle = 'photo' | 'tint' | 'quiet';

export interface BentoFigure {
  /** numbers count up; text (such as "Under 2") shows as written */
  value: number | string;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface FeatureBentoProps {
  variant?: BentoStyle;
  hero: {
    eyebrow?: string;
    /** a genuinely live state, shown with a breathing dot: "Bookings open" */
    live?: string;
    title: string;
    description: string;
    image: { src: string; alt: string };
  };
  highlight: BentoFigure & { icon: LucideIcon };
  feature: { icon: LucideIcon; title: string; description: string };
  action: { eyebrow: string; title: string; href?: string };
  facts: [BentoFigure, BentoFigure];
  className?: string;
}

const cell = 'relative flex min-h-64 flex-col overflow-hidden rounded-lg transition-[transform,box-shadow] duration-md ease-out hover:-translate-y-1 hover:shadow-sm';

const FILL: Record<BentoStyle, { hero: string; highlight: string; feature: string; action: string; facts: [string, string]; well: string }> = {
  photo: {
    hero: 'border border-line bg-surface',
    highlight: 'bg-apricot-50 ring-1 ring-inset ring-apricot-200',
    feature: 'border border-line bg-surface',
    action: 'border border-line bg-brand-gradient-dawn',
    facts: ['bg-rose-50 ring-1 ring-inset ring-rose-200', 'bg-lavender-50 ring-1 ring-inset ring-lavender-200'],
    well: 'bg-surface text-ink-900',
  },
  tint: {
    hero: 'bg-brand-gradient-soft ring-1 ring-inset ring-line',
    highlight: 'bg-apricot-50 ring-1 ring-inset ring-apricot-200',
    feature: 'bg-lavender-50 ring-1 ring-inset ring-lavender-200',
    action: 'bg-apricot-50 ring-1 ring-inset ring-apricot-200',
    facts: ['bg-rose-50 ring-1 ring-inset ring-rose-200', 'bg-surface ring-1 ring-inset ring-line'],
    well: 'bg-surface text-ink-900',
  },
  quiet: {
    hero: 'border border-line bg-surface',
    highlight: 'border border-line bg-surface',
    feature: 'border border-line bg-surface',
    action: 'border border-line bg-brand-gradient-dawn',
    facts: ['border border-line bg-surface', 'border border-line bg-surface'],
    well: 'bg-apricot-50 text-ink-900 ring-1 ring-inset ring-apricot-200',
  },
};

const Figure = ({ figure, className }: { figure: BentoFigure; className?: string }) => (
  <p className={cn('font-display text-heading text-ink-900', className)}>
    {typeof figure.value === 'number' ? (
      <CountUp to={figure.value} prefix={figure.prefix} suffix={figure.suffix} />
    ) : (
      `${figure.prefix ?? ''}${figure.value}${figure.suffix ?? ''}`
    )}
  </p>
);

const HeroText = ({ hero }: { hero: FeatureBentoProps['hero'] }) => (
  <div className="relative flex flex-col items-start gap-3">
    {hero.live ? (
      <Badge variant="success" size="sm" className="bg-surface">
        <BreathingDot color="bg-success-600" />
        {hero.live}
      </Badge>
    ) : (
      hero.eyebrow && (
        <Badge variant="outline" size="sm">
          {hero.eyebrow}
        </Badge>
      )
    )}
    <h3 className="max-w-md font-display text-heading text-ink-900">{hero.title}</h3>
    <p className="max-w-md font-sans text-body text-ink-600">{hero.description}</p>
  </div>
);

const Hero = ({ hero, variant }: { hero: FeatureBentoProps['hero']; variant: BentoStyle }) => {
  const photo = (
    <img
      src={hero.image.src}
      alt={hero.image.alt}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-xl ease-out group-hover:scale-[1.04]"
    />
  );
  if (variant === 'photo') {
    return (
      <>
        <div className="image-fade-b relative min-h-56 flex-1 overflow-hidden">{photo}</div>
        <div className="p-8 pt-2 md:p-10 md:pt-2">
          <HeroText hero={hero} />
        </div>
      </>
    );
  }
  if (variant === 'tint') {
    return (
      <div className="flex h-full flex-col gap-8 p-8 md:p-10">
        <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-md shadow-md transition-transform duration-md ease-out group-hover:-rotate-1">{photo}</div>
        <div className="mt-auto">
          <HeroText hero={hero} />
        </div>
      </div>
    );
  }
  return (
    <div className="grid h-full md:grid-cols-2">
      <div className="image-fade-b relative min-h-48 overflow-hidden md:order-2 md:image-fade-l">{photo}</div>
      <div className="flex items-end p-8 md:p-10">
        <HeroText hero={hero} />
      </div>
    </div>
  );
};

export const FeatureBento = ({ variant = 'photo', hero, highlight, feature, action, facts, className }: FeatureBentoProps) => {
  const f = FILL[variant];
  const HighlightIcon = highlight.icon;
  const FeatureIcon = feature.icon;
  return (
    <div className={cn('grid grid-cols-1 gap-4 md:grid-cols-3', className)}>
      <div className={cn(cell, 'group min-h-96 md:col-span-2 md:row-span-2', f.hero)}>
        <Hero hero={hero} variant={variant} />
      </div>

      <div className={cn(cell, 'justify-between p-8', f.highlight)}>
        <span className={cn('flex h-12 w-12 items-center justify-center rounded-md', f.well)}>
          <HighlightIcon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
        </span>
        <div>
          <Figure figure={highlight} />
          <p className="mt-1 font-sans text-body text-ink-600">{highlight.label}</p>
        </div>
      </div>

      <div className={cn(cell, 'group justify-between p-8', f.feature)}>
        <FeatureIcon className="h-6 w-6 text-ink-900 transition-transform duration-md ease-out group-hover:-translate-y-1" strokeWidth={1.5} aria-hidden />
        <div>
          <h3 className="font-display text-subheading text-ink-900">{feature.title}</h3>
          <p className="mt-2 font-sans text-body text-ink-600">{feature.description}</p>
        </div>
      </div>

      <a
        href={action.href ?? '#'}
        className={cn(
          cell,
          'group justify-between p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apricot-400 focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
          f.action
        )}
      >
        <span className="flex items-start justify-between gap-4">
          <Badge variant="outline" size="sm">
            {action.eyebrow}
          </Badge>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-apricot-200 text-ink-900 transition-transform duration-md ease-out group-hover:rotate-45 group-focus-visible:rotate-45">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </span>
        </span>
        <span className="font-display text-subheading text-ink-900">{action.title}</span>
      </a>

      {facts.map((fact, i) => (
        <div key={fact.label} className={cn(cell, 'justify-center gap-1 p-8', f.facts[i])}>
          <Figure figure={fact} />
          <p className="font-sans text-label uppercase text-ink-500">{fact.label}</p>
        </div>
      ))}
    </div>
  );
};
