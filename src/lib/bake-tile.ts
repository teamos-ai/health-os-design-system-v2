/**
 * bakeTile: an icon tile as a PNG, made in the browser, for Canva and slides.
 *
 * The charcoal tile ships baked (`<id>-tile.png`, from scripts/icon-tiles.py). Paper and white
 * tiles are baked here on demand from the same 1024px object, with the same geometry: a 512px
 * squircle (24% corner), the object across 64% of it, the ground's radial light centred a
 * little above the middle, and, on the light grounds, the hairline edge and soft contact
 * shadow the IconTile shows. Colours come from tokens.json → icon (ICON_GROUNDS).
 *
 *   const blob = await bakeTile('/heading-tiles/stones.png', 'paper');
 */
import { ICON_GROUNDS } from '@/lib/palette';
import type { IconTileGround } from '@/components/ui/icon-tile';

const SIZE = 512;
const RADIUS = 0.24;
const FILL = 0.64 / 0.8; // the 1024px original holds its object across 80% of the frame

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Could not load ${src}`));
    img.src = src;
  });

export const bakeTile = async (original: string, ground: IconTileGround, size = SIZE): Promise<Blob> => {
  const img = await loadImage(original);
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not available');

  const r = size * RADIUS;
  const squircle = new Path2D();
  squircle.roundRect(0, 0, size, size, r);
  ctx.save();
  ctx.clip(squircle);

  const cx = size * 0.5;
  const cy = size * 0.42;
  const fill = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.hypot(size * 0.5, size * 0.58));
  for (const [colour, offset] of ICON_GROUNDS[ground]) fill.addColorStop(offset, colour);
  ctx.fillStyle = fill;
  ctx.fillRect(0, 0, size, size);

  const light = ground !== 'carbon';
  const o = size * FILL;
  if (light) {
    ctx.shadowColor = ICON_GROUNDS.shadowLight;
    ctx.shadowOffsetY = size * 0.017;
    ctx.shadowBlur = size * 0.025;
  }
  ctx.drawImage(img, (size - o) / 2, (size - o) / 2, o, o);
  ctx.restore();

  if (light) {
    const w = Math.max(1, size / 256);
    const edge = new Path2D();
    edge.roundRect(w / 2, w / 2, size - w, size - w, r - w / 2);
    ctx.strokeStyle = ICON_GROUNDS.edgeLight;
    ctx.lineWidth = w;
    ctx.stroke(edge);
  }

  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Could not make the PNG'))), 'image/png'));
};

/** Saves a blob as a file with the given name. */
export const saveBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};
