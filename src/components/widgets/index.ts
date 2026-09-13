/**
 * The Health OS widget library. Every widget is functional: it takes real data as props,
 * animates its measurement into view, and settles to the final state under reduced motion.
 * Usage, inputs and experimental status for each live in design-system/reference/catalog.json.
 */
import './widgets.css';

export * from './figures';
export * from './relational';
export * from './metrics';
export * from './scheduling';
export * from './social';
export { Figure, Grow, SweepRing, useSeen, useProgress } from './motion';
