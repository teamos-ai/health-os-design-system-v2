/**
 * The squircle library: every picture that can sit beside a word in a headline.
 *
 * Each tile is one literal object that shows a word (software is a vintage computer, calm is
 * balanced stones), cut out on a transparent ground so the squircle's soft tint comes from
 * its tone. `words` are the headline words the picture can stand for: they are the tags the
 * library search reads, so every word Health OS headlines reach for points at exactly one
 * tile. `status` is `ready` once the files exist in public/heading-tiles/, and `planned`
 * while the tile is still to be made; a planned tile shows as an empty tinted squircle.
 *
 * To make a planned tile, follow the recipe in design-system/ASSET-RECIPES.md with its
 * `picture` as the object, save a 1024px PNG and a 320px WebP named after the id, then add
 * the file name here. Refer to a tile in a headline as {id}.
 */

export type HeadlineTileTone = 'rose' | 'lavender' | 'neutral';

export type HeadlineTileGroup = 'Presence' | 'Vitality' | 'Calm' | 'Practice' | 'Business' | 'Software' | 'Freedom' | 'Clarity' | 'Momentum';

export const HEADLINE_TILE_GROUPS: HeadlineTileGroup[] = ['Presence', 'Vitality', 'Calm', 'Practice', 'Business', 'Software', 'Freedom', 'Clarity', 'Momentum'];

export interface HeadlineTile {
  /** the name used inside a headline string: {id} */
  id: string;
  /** the headline words this picture stands for, and the tags search reads. The first is the main word. */
  words: string[];
  group: HeadlineTileGroup;
  /** the one literal object, used as the generation brief and as the description */
  picture: string;
  /** the soft tint behind the object: rose, lavender or a warm neutral (apricot is for actions) */
  tone: HeadlineTileTone;
  status: 'ready' | 'planned';
  /** display file, 320px WebP with a transparent ground (ready tiles only) */
  src?: string;
  /** 1024px PNG original (ready tiles only) */
  original?: string;
  /** a copy rule from the Health OS database for one of the words */
  note?: string;
}

const ready = (id: string, file: string, group: HeadlineTileGroup, words: string[], picture: string, tone: HeadlineTileTone, note?: string): HeadlineTile => ({
  id,
  words,
  group,
  picture,
  tone,
  status: 'ready',
  src: `/heading-tiles/${file}.webp`,
  original: `/heading-tiles/${file}.png`,
  note,
});

const planned = (id: string, group: HeadlineTileGroup, words: string[], picture: string, tone: HeadlineTileTone, note?: string): HeadlineTile => ({
  id,
  words,
  group,
  picture,
  tone,
  status: 'planned',
  note,
});

const LIST: HeadlineTile[] = [
  /* Presence */
  planned('candle', 'Presence', ['Presence', 'Present', 'Aware'], 'A lit beeswax pillar candle with a small steady flame', 'rose'),
  planned('meditation-cushion', 'Presence', ['Mindful', 'Conscious', 'Intentional'], 'A round oatmeal linen meditation cushion', 'neutral'),
  planned('tuning-fork', 'Presence', ['Attuned'], 'A polished brass tuning fork standing upright', 'lavender'),
  planned('wooden-hand', 'Presence', ['Human', 'Embodied'], 'A smooth carved wooden hand, palm open', 'neutral'),
  planned('pomegranate', 'Presence', ['Whole'], 'A whole ripe pomegranate with its crown', 'rose'),
  ready('cables', 'cables-plugged-together', 'Presence', ['Connected', 'Integrated', 'Wired together', 'One place'], 'Two white braided cables plugged into each other', 'neutral'),
  planned('seedling', 'Presence', ['Alive', 'Renew'], 'A green seedling sprouting from soil in a small terracotta pot', 'lavender'),

  /* Vitality */
  planned('matcha', 'Vitality', ['Wellness', 'Wellbeing'], 'A handmade ceramic cup of matcha beside a bamboo whisk', 'lavender', 'Wellbeing is banned as an outcome Health OS delivers. It is a search tag only.'),
  planned('blood-orange', 'Vitality', ['Vitality', 'Vital'], 'A halved blood orange showing its jewel-red flesh', 'neutral'),
  planned('flowering-plant', 'Vitality', ['Thrive'], 'A small potted plant in full bloom', 'rose'),
  planned('nourish-bowl', 'Vitality', ['Nourish'], 'A speckled ceramic bowl of fresh berries, greens and seeds', 'neutral'),
  planned('aloe', 'Vitality', ['Heal', 'Recovery'], 'A cut aloe vera leaf', 'lavender', 'Heal is banned in Health OS copy because it is a health claim. Use recovery only in its business sense.'),
  planned('green-apple', 'Vitality', ['Health'], 'A crisp green apple with a single leaf', 'rose', 'Health OS writes about the business of health, never a health outcome.'),
  planned('light-bulb', 'Vitality', ['Energy', 'Current'], 'A vintage filament light bulb glowing warmly', 'neutral'),
  planned('kintsugi-bowl', 'Vitality', ['Restore', 'Resilience'], 'A white ceramic bowl mended with gold kintsugi seams', 'lavender'),
  planned('bonsai', 'Vitality', ['Longevity', 'Grounded'], 'A small bonsai tree in a shallow clay pot', 'neutral'),
  planned('running-shoes', 'Vitality', ['Movement'], 'A pair of light grey running shoes with no logos', 'rose'),

  /* Calm */
  ready('stones', 'balanced-river-stones', 'Calm', ['Calm', 'Balance', 'Steady'], 'Three smooth river stones balanced in a cairn', 'lavender'),
  planned('hammock', 'Calm', ['Ease'], 'A cream woven cotton hammock gently sagging', 'rose'),
  planned('water-glass', 'Calm', ['Still'], 'A clear glass of water with a perfectly still surface', 'neutral'),
  planned('pottery-wheel', 'Calm', ['Centred'], 'A lump of wet clay centred on a small pottery wheel', 'lavender'),
  planned('bamboo-spout', 'Calm', ['Flow'], 'Water pouring in a smooth stream from a bamboo spout', 'rose'),
  planned('olive-branch', 'Calm', ['Peace'], 'A fresh olive branch with silver-green leaves', 'neutral'),
  planned('hourglass', 'Calm', ['Reset'], 'A wood and glass hourglass with pale sand', 'lavender'),
  planned('thermostat', 'Calm', ['Regulate'], 'A round brass thermostat dial with no numbers', 'rose'),
  planned('snow-globe', 'Calm', ['Settle'], 'A glass snow globe with snow settling around a small tree', 'neutral'),
  planned('dandelion', 'Calm', ['Breathe'], 'A dandelion seed head with a few seeds drifting away', 'lavender'),

  /* Practice */
  planned('yoga-mat', 'Practice', ['Practice', 'Studio'], 'A rolled cork yoga mat tied with a cotton strap', 'neutral'),
  planned('oil-dropper', 'Practice', ['Practitioner'], 'An amber glass dropper bottle with no label', 'rose'),
  planned('whistle', 'Practice', ['Coach'], 'A silver coach whistle on a woven lanyard', 'lavender'),
  planned('coffee-cups', 'Practice', ['Client', 'Clients'], 'Two ceramic coffee cups side by side on saucers', 'neutral'),
  planned('singing-bowl', 'Practice', ['Session'], 'A brass singing bowl with its wooden mallet', 'rose'),
  planned('compass', 'Practice', ['Direction', 'Guidance', 'Pathway', 'Journey'], 'A brass pocket compass with its lid open', 'lavender', 'Journey is banned in Health OS copy: use path or pathway. It is a search tag only.'),
  planned('mortar-pestle', 'Practice', ['Method', 'Protocol'], 'A white marble mortar and pestle', 'neutral', 'Protocol only for business processes, never treatment.'),
  ready('blocks', 'wooden-building-blocks', 'Practice', ['Framework', 'Program', 'Built', 'Building', 'Foundations', 'Setup'], 'A small structure of natural wooden building blocks', 'neutral'),
  planned('lifebuoy', 'Practice', ['Support'], 'A classic white and soft red lifebuoy ring', 'rose'),
  planned('hot-water-bottle', 'Practice', ['Care'], 'A hot water bottle in a cream knitted cover', 'lavender'),
  planned('doctors-bag', 'Practice', ['Clinic'], 'A vintage tan leather doctor’s bag', 'neutral'),

  /* Business */
  planned('briefcase', 'Business', ['Business'], 'A tan leather briefcase with brass clasps', 'rose'),
  ready('swatches', 'colour-swatch-cards', 'Business', ['Brand', 'Design', 'Design system', 'Colour', 'Choices'], 'A fan of paint swatch cards in apricot, rose and lavender', 'rose'),
  planned('cash-register', 'Business', ['Revenue'], 'A vintage brass cash register', 'lavender'),
  planned('horseshoe-magnet', 'Business', ['Leads'], 'A red and silver horseshoe magnet', 'neutral'),
  planned('desk-calendar', 'Business', ['Bookings'], 'A wooden flip desk calendar with blank pages', 'rose'),
  planned('rope-knot', 'Business', ['Retention'], 'A thick natural rope tied in a secure knot', 'lavender'),
  planned('monstera', 'Business', ['Growth'], 'A potted monstera with a new leaf unfurling', 'neutral'),
  planned('copper-pipes', 'Business', ['Pipeline'], 'Polished copper pipes joined with a brass valve', 'rose'),
  planned('funnel', 'Business', ['Conversion'], 'A copper kitchen funnel', 'lavender'),

  /* Software */
  ready('computer', 'vintage-all-in-one-computer', 'Software', ['Software', 'Tech', 'Digital', 'System', 'Runs itself', 'Technology'], 'A vintage beige all-in-one computer with a softly glowing screen', 'rose'),
  planned('cloud', 'Software', ['Cloud', 'SaaS'], 'A soft white cumulus cloud', 'lavender'),
  planned('plinth', 'Software', ['Platform'], 'A round white marble display plinth', 'neutral'),
  planned('smartphone', 'Software', ['App'], 'A modern smartphone with a softly glowing blank screen and no logos', 'rose'),
  planned('arched-door', 'Software', ['Portal'], 'A small arched oak door standing slightly open', 'lavender'),
  planned('gauge', 'Software', ['Dashboard'], 'A retro analogue gauge dial with a brass bezel and no numbers', 'neutral'),
  planned('card-index', 'Software', ['CRM'], 'A wooden rotary card index with blank cards', 'rose'),
  planned('gears', 'Software', ['Automation'], 'Three interlocking brass clockwork gears', 'lavender'),
  planned('toy-robot', 'Software', ['AI'], 'A small friendly vintage tin toy robot', 'neutral'),
  ready('tools', 'screwdriver-and-wrench', 'Software', ['Toolkit', 'Tools', 'Tool stack', 'Fixing', 'Admin'], 'A wooden-handled screwdriver crossed with an adjustable wrench', 'lavender'),

  /* Freedom */
  planned('open-birdcage', 'Freedom', ['Freedom', 'Liberation'], 'An open white wire birdcage with its door swung wide', 'rose', 'Never "financial freedom": it is an earnings claim.'),
  planned('ringed-planet', 'Freedom', ['Space'], 'A small ringed planet model in soft pastel tones', 'lavender'),
  planned('pocket-watch', 'Freedom', ['Time'], 'An open silver pocket watch on a short chain', 'neutral'),
  planned('lever', 'Freedom', ['Leverage'], 'A wooden plank lever balanced on a stone fulcrum', 'rose', 'Leverage as a noun only, never as a verb.'),
  planned('measuring-jug', 'Freedom', ['Capacity'], 'A clear glass measuring jug with plain marks and no numbers', 'lavender'),
  planned('paper-plane', 'Freedom', ['Autonomy'], 'A crisp white paper aeroplane', 'neutral'),
  planned('spring', 'Freedom', ['Flexibility'], 'A coiled steel spring', 'rose'),
  planned('feather', 'Freedom', ['Lightness'], 'A single soft white feather', 'lavender'),
  planned('bud-vase', 'Freedom', ['Simplicity'], 'A plain white ceramic bud vase holding one stem', 'neutral', 'Never call her work simple or easy.'),

  /* Clarity */
  planned('quartz', 'Clarity', ['Clarity', 'Clear'], 'A clear quartz crystal point', 'rose'),
  planned('camera-lens', 'Clarity', ['Focus'], 'A vintage camera lens with a metal focus ring', 'neutral'),
  planned('transistor-radio', 'Clarity', ['Signal'], 'A small cream transistor radio with its antenna raised', 'lavender'),
  planned('magnifying-glass', 'Clarity', ['Insight'], 'A brass magnifying glass with a wooden handle', 'rose'),
  planned('round-glasses', 'Clarity', ['Vision'], 'A pair of round wire-rimmed glasses', 'neutral'),
  planned('spirit-level', 'Clarity', ['Alignment'], 'A wooden spirit level with a centred bubble', 'lavender'),
  planned('folded-linen', 'Clarity', ['Order'], 'A neat stack of folded linen napkins in soft neutrals', 'rose'),
  planned('callipers', 'Clarity', ['Precision'], 'A pair of brass vernier callipers', 'neutral'),

  /* Momentum */
  planned('stethoscope', 'Momentum', ['Pulse'], 'A stethoscope with a silver chest piece', 'lavender'),
  planned('metronome', 'Momentum', ['Rhythm'], 'A wooden pyramid metronome with its arm mid-swing', 'rose'),
  planned('newtons-cradle', 'Momentum', ['Momentum', 'Motion'], 'A chrome Newton’s cradle with one ball raised', 'neutral'),
  planned('match', 'Momentum', ['Spark'], 'A single wooden match just struck, flame bright', 'lavender'),
  planned('battery', 'Momentum', ['Charge'], 'A retro cylindrical battery in cream and copper with no text', 'rose'),
  planned('spinning-top', 'Momentum', ['Dynamic'], 'A turned wooden spinning top mid-spin', 'neutral'),
];

/** Every tile, by id. */
export const HEADLINE_TILES: Record<string, HeadlineTile> = Object.fromEntries(LIST.map((t) => [t.id, t]));

/** Every tile in library order: grouped, then as listed. */
export const HEADLINE_TILE_LIST = LIST;

/** The tile whose words include `word` (case-insensitive), if there is one. */
export const tileForWord = (word: string) => {
  const w = word.trim().toLowerCase();
  return LIST.find((t) => t.words.some((x) => x.toLowerCase() === w));
};
