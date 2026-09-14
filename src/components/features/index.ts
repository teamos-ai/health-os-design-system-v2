/**
 * The Health OS feature components. One item shape (icon, title, description, tone), one
 * intro block and one heading rule, four ways to lay features out:
 *
 *   FeatureSteps  a process        steps that play through beside a photo
 *   FeatureTabs   product areas    tabs, each with a panel, a button and a photo
 *   FeatureGrid   many features    a lined grid of icon, title and sentence
 *   FeatureCards  three benefits   cards with a decorated icon well, outline or muted
 */
export { FeatureSteps, FEATURE_STEPS_INTERVAL, type FeatureStepsProps, type FeatureStep } from './FeatureSteps';
export { FeatureTabs, type FeatureTabsProps, type FeatureTab } from './FeatureTabs';
export { FeatureGrid, type FeatureGridProps } from './FeatureGrid';
export { FeatureCards, type FeatureCardsProps, type FeatureCardsVariant } from './FeatureCards';
export { FeatureIntro, type FeatureItem, type FeatureTone, type FeatureHeadingLevel, type FeatureIntroProps, type FeatureBaseProps } from './shared';
