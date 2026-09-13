/**
 * The widget colour system: soft by rule. Every fill, bar, ring, tile, chart mark and
 * selected state inside a widget uses the light (200) and soft (50) shades, so a screen
 * full of widgets reads calm rather than loud. Full-strength colour is not used for data.
 * The one exception is the rose primary button, which keeps the global button colour.
 */
import { APRICOT, ROSE, LAVENDER, INK } from '@/lib/palette';

export type WidgetAccent = 'apricot' | 'rose' | 'lavender';

/** light shade: bars, rings, chart marks, legend dots, tile starts */
export const LIGHT: Record<WidgetAccent, string> = { apricot: APRICOT[200], rose: ROSE[200], lavender: LAVENDER[200] };
/** soft shade: tile ends, bar starts, faces and tinted wells */
export const SOFT: Record<WidgetAccent, string> = { apricot: APRICOT[50], rose: ROSE[50], lavender: LAVENDER[50] };

/** a tile or avatar: light into soft, with ink text on top */
export const TILE: Record<WidgetAccent, string> = {
  apricot: `linear-gradient(150deg, ${APRICOT[200]} 0%, ${APRICOT[50]} 100%)`,
  rose: `linear-gradient(150deg, ${ROSE[200]} 0%, ${ROSE[50]} 100%)`,
  lavender: `linear-gradient(150deg, ${LAVENDER[200]} 0%, ${LAVENDER[50]} 100%)`,
};

/** a horizontal bar fill: soft into light */
export const BAR: Record<WidgetAccent, string> = {
  apricot: `linear-gradient(90deg, ${APRICOT[50]}, ${APRICOT[200]})`,
  rose: `linear-gradient(90deg, ${ROSE[50]}, ${ROSE[200]})`,
  lavender: `linear-gradient(90deg, ${LAVENDER[50]}, ${LAVENDER[200]})`,
};

/** the brand sweep in light shades, for rings, gauges and progress fills */
export const SWEEP = [APRICOT[200], ROSE[200], LAVENDER[200]] as const;
export const SWEEP_BAR = `linear-gradient(90deg, ${APRICOT[200]}, ${ROSE[200]}, ${LAVENDER[200]})`;

/** empty tracks and unlit ticks */
export const TRACK = INK[100];
