/**
 * Image helpers. Library originals are full-resolution PNGs; every original has a
 * lightweight JPEG (800px long edge) in a sibling `thumbs/` folder for display.
 * Show the thumbnail in UI; link the original for download.
 */

/** /imagery/theme/name.png → /imagery/theme/thumbs/name.jpg (same for /backgrounds). */
export const thumb = (src: string) => src.replace(/\/([^/]+)\.png$/i, '/thumbs/$1.jpg');
