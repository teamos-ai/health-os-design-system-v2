/**
 * Motion constants. The shared easing and press values behind every Health OS animation.
 * Values mirror design-system/tokens/tokens.json (motion.easing, motion.duration).
 */

/** Entrances and reveals: cubic-bezier(0.22, 1, 0.36, 1). */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** State changes: cubic-bezier(0.4, 0, 0.2, 1). */
export const EASE_STANDARD = [0.4, 0, 0.2, 1] as const;

/** Durations in seconds for Framer Motion (tokens: xs 80, sm 160, md 240, lg 360, xl 480 ms). */
export const DURATION = { xs: 0.08, sm: 0.16, md: 0.24, lg: 0.36, xl: 0.48 } as const;

/** Press feedback for interactive elements. */
export const PRESS_SCALE = 0.98;
