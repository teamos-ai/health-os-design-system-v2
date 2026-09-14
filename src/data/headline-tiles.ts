/**
 * Headline tiles: the pictures that sit between the words of a two-tone headline.
 *
 * Each tile is a literal picture of what the headline says (software is a vintage
 * computer, calm is balanced stones). Objects are cut out on a transparent ground, so the
 * squircle's soft tint comes from the tone. Display files are 320px WebP; the 1024px PNG
 * originals sit beside them for new sizes.
 *
 * To add a tile, generate it with the recipe in design-system/ASSET-RECIPES.md, save both
 * files to public/heading-tiles/, then add an entry here. Refer to it in a headline as {id}.
 */

export type HeadlineTileTone = 'apricot' | 'rose' | 'lavender';

export interface HeadlineTile {
  /** the name used inside a headline string: {id} */
  id: string;
  /** display file, 320px WebP with a transparent ground */
  src: string;
  /** 1024px PNG original */
  original: string;
  /** what the picture shows, for the library and for anyone reusing it */
  alt: string;
  /** ideas this picture can stand for */
  means: string[];
  /** the soft tint behind the object */
  tone: HeadlineTileTone;
}

const tile = (id: string, file: string, alt: string, means: string[], tone: HeadlineTileTone): HeadlineTile => ({
  id,
  src: `/heading-tiles/${file}.webp`,
  original: `/heading-tiles/${file}.png`,
  alt,
  means,
  tone,
});

export const HEADLINE_TILES: Record<string, HeadlineTile> = {
  swatches: tile('swatches', 'colour-swatch-cards', 'A fan of paint swatch cards in apricot, rose and lavender', ['design', 'design system', 'brand', 'colour', 'choices'], 'apricot'),
  stones: tile('stones', 'balanced-river-stones', 'Three smooth river stones balanced in a cairn', ['calm', 'balance', 'steady'], 'lavender'),
  blocks: tile('blocks', 'wooden-building-blocks', 'A small structure of natural wooden building blocks', ['built', 'building', 'foundations', 'setup'], 'apricot'),
  computer: tile('computer', 'vintage-all-in-one-computer', 'A vintage beige all-in-one computer with a softly glowing screen', ['software', 'system', 'runs itself', 'technology'], 'rose'),
  tools: tile('tools', 'screwdriver-and-wrench', 'A wooden-handled screwdriver crossed with an adjustable wrench', ['tools', 'tool stack', 'fixing', 'admin'], 'lavender'),
  cables: tile('cables', 'cables-plugged-together', 'Two white braided cables plugged into each other', ['connected', 'integrated', 'wired together', 'one place'], 'apricot'),
};
