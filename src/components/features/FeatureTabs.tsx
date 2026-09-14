/**
 * FeatureTabs: a few product areas behind tabs, one panel at a time.
 *
 * Remodelled from the 21st.dev Feature108 (shadcnblocks). Each tab has an icon and a one-word
 * label; its panel holds a small badge, a subheading, a sentence or two, one button and a
 * library photo. Tabs follow the Tabs component: role tablist, tab and tabpanel, a roving
 * tabindex, arrow keys, Home and End, and selection that follows focus. The selected tab has
 * the apricot underline on a hairline rail. On phones the tabs stack and the rail runs down
 * the left edge, with the same apricot mark beside the selected tab.
 *
 * The panel is one surface with a hairline: text on one side, the photo dissolving toward it
 * on the other (below the photo on phones), so text never sits on the photo. A new panel rises
 * in over a short fade; nothing waits on it. The badge takes the item's tone; apricot stays
 * with the tab and the button.
 */
import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DURATION, EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { FeatureIntro, FOCUS_RING, ICON_STROKE, itemHeading, toneBadge, type FeatureBaseProps, type FeatureItem } from './shared';

export interface FeatureTab extends FeatureItem {
  /** stable id for the tab; defaults to the label */
  value?: string;
  /** short trigger label: "Reminders" */
  label: string;
  /** small tag above the panel title: "Reminders" */
  badge?: string;
  /** the one action in the panel */
  action?: { label: string; href?: string; onClick?: () => void; variant?: 'primary' | 'secondary' };
  /** library photo (use thumb()) */
  image: { src: string; alt: string };
}

export interface FeatureTabsProps extends FeatureBaseProps {
  /** three or four tabs with short labels */
  items: FeatureTab[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** accessible name for the tab list; defaults to the intro title */
  'aria-label'?: string;
}

export const FeatureTabs = ({
  items,
  value,
  defaultValue,
  onValueChange,
  'aria-label': ariaLabel,
  eyebrow,
  title,
  description,
  align,
  headingLevel = 'h2',
  className,
}: FeatureTabsProps) => {
  const reduced = useReducedMotion();
  const keyOf = (t: FeatureTab) => t.value ?? t.label;
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? (items[0] ? keyOf(items[0]) : ''));
  const active = isControlled ? value : internal;
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = React.useId();
  const ItemHeading = itemHeading(headingLevel);

  const select = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const len = items.length;
    let next = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % len;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + len) % len;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = len - 1;
    else return;
    e.preventDefault();
    select(keyOf(items[next]));
    refs.current[next]?.focus();
  };

  const idFor = (t: FeatureTab) => keyOf(t).toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div className={className}>
      <FeatureIntro eyebrow={eyebrow} title={title} description={description} align={align} headingLevel={headingLevel} />

      <div
        role="tablist"
        aria-label={ariaLabel ?? title ?? 'Features'}
        className={cn('flex flex-col border-l border-line md:flex-row md:gap-1 md:border-b md:border-l-0', align === 'center' && 'md:justify-center')}
      >
        {items.map((tab, i) => {
          const selected = keyOf(tab) === active;
          const Icon = tab.icon;
          return (
            <button
              key={keyOf(tab)}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${baseId}-tab-${idFor(tab)}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${idFor(tab)}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(keyOf(tab))}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                'relative -ml-px flex min-w-0 items-center gap-3 px-4 py-3 text-left font-sans text-body transition-colors duration-sm ease-out md:-mb-px md:ml-0',
                FOCUS_RING,
                selected ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'
              )}
            >
              <Icon className="h-5 w-5 shrink-0" strokeWidth={ICON_STROKE} aria-hidden />
              <span className="truncate">{tab.label}</span>
              <span
                aria-hidden
                className={cn(
                  'absolute inset-y-0 -left-px w-0.5 rounded-full bg-apricot-200 transition-opacity duration-md ease-out md:inset-x-0 md:inset-y-auto md:-bottom-px md:left-0 md:h-0.5 md:w-auto',
                  selected ? 'opacity-100' : 'opacity-0'
                )}
              />
            </button>
          );
        })}
      </div>

      {items.map((tab) => {
        const selected = keyOf(tab) === active;
        return (
          <div
            key={keyOf(tab)}
            role="tabpanel"
            id={`${baseId}-panel-${idFor(tab)}`}
            aria-labelledby={`${baseId}-tab-${idFor(tab)}`}
            hidden={!selected}
            tabIndex={0}
            className={cn('mt-6 rounded-lg md:mt-8', FOCUS_RING)}
          >
            {selected && (
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.md, ease: EASE_OUT }}
                className="grid overflow-hidden rounded-lg border border-line bg-surface md:grid-cols-2"
              >
                <div className="image-fade-b relative min-h-56 overflow-hidden md:order-last md:min-h-96 md:image-fade-l">
                  <img src={tab.image.src} alt={tab.image.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <div className="flex min-w-0 flex-col items-start justify-center p-6 pt-2 md:p-8 lg:p-12">
                  {tab.badge && (
                    <Badge variant={toneBadge(tab.tone)} size="sm">
                      {tab.badge}
                    </Badge>
                  )}
                  <ItemHeading className={cn('font-display text-subheading text-ink-900', tab.badge && 'mt-4')}>{tab.title}</ItemHeading>
                  <p className="mt-2 font-sans text-body text-ink-600">{tab.description}</p>
                  {tab.action && (
                    <Button variant={tab.action.variant ?? 'primary'} href={tab.action.href} onClick={tab.action.onClick} className="mt-6">
                      {tab.action.label}
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
};
