/**
 * Image helpers. Library originals are full-resolution PNGs, or JPEGs where the set is photographic and a PNG would weigh ten times as much; every original has a
 * lightweight JPEG (800px long edge) in a sibling `thumbs/` folder for display.
 * Show the thumbnail in UI; link the original for download.
 */

/** /imagery/theme/name.png → /imagery/theme/thumbs/name.jpg (same for /backgrounds). */
export const thumb = (src: string) => src.replace(/\/([^/]+)\.(?:png|jpe?g)$/i, '/thumbs/$1.jpg');
