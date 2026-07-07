/**
 * Motion constants — the shared Health OS v2 easing/press vocabulary.
 * Single source of truth for the brand ease-out curve (foundations/motion.md).
 */

/** Brand ease-out — cubic-bezier(0.22, 1, 0.36, 1). */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Standard active/press scale for interactive elements. */
export const PRESS_SCALE = 0.98;
