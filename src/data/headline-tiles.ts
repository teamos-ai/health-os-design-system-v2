/**
 * The icon library: every icon tile Health OS uses. One photoreal object on a warm charcoal
 * squircle (tokens.json → icon), the same tile whether it pictures a word in a headline or
 * stands on its own in a card, bento, list or post.
 *
 * `words` are the words the picture stands for: they are the tags the library search reads,
 * so every word Health OS headlines reach for points at exactly one tile. Each tile has three
 * files in public/heading-tiles/, named after its id unless `file` says otherwise: a 1024px PNG
 * of the object on a transparent ground, a 320px WebP for display, and a baked `-tile.png`
 * with the charcoal squircle for Canva and slides. A tile whose files are not made yet is
 * `planned` and shows as an empty squircle.
 *
 * To add a tile: follow the recipe in design-system/ASSET-RECIPES.md with its `picture` as
 * the object, save the three files and add an entry below (list its id in PLANNED until the
 * files exist). Refer to a tile in
 * a headline as {id}, or on its own with <IconTile id="…" />.
 */

export type HeadlineTileGroup = 'Presence' | 'Vitality' | 'Calm' | 'Practice' | 'Business' | 'Software' | 'Freedom' | 'Clarity' | 'Momentum';

export const HEADLINE_TILE_GROUPS: HeadlineTileGroup[] = ['Presence', 'Vitality', 'Calm', 'Practice', 'Business', 'Software', 'Freedom', 'Clarity', 'Momentum'];

export interface HeadlineTile {
  /** the name used inside a headline string: {id}, and by <IconTile id /> */
  id: string;
  /** the words this picture stands for, and the tags search reads. The first is the main word. */
  words: string[];
  group: HeadlineTileGroup;
  /** the one literal object, used as the generation brief and as the description */
  picture: string;
  status: 'ready' | 'planned';
  /** display file, 320px WebP of the object on a transparent ground */
  src?: string;
  /** 1024px PNG original of the object */
  original?: string;
  /** the baked tile with its charcoal squircle, for Canva and slides */
  baked?: string;
  /** a copy rule from the Health OS database for one of the words */
  note?: string;
}

interface Entry {
  id: string;
  group: HeadlineTileGroup;
  words: string[];
  picture: string;
  note?: string;
  file: string;
}

const tile = (id: string, group: HeadlineTileGroup, words: string[], picture: string, note?: string, file = id): Entry => ({ id, group, words, picture, note, file });

const ENTRIES: Entry[] = [
  /* Presence */
  tile('candle', 'Presence', ['Presence', 'Present', 'Aware'], 'A lit beeswax pillar candle with a small steady flame'),
  tile('meditation-cushion', 'Presence', ['Mindful', 'Conscious', 'Intentional'], 'A round oatmeal linen meditation cushion'),
  tile('tuning-fork', 'Presence', ['Attuned'], 'A polished brass tuning fork standing upright'),
  tile('wooden-hand', 'Presence', ['Human', 'Embodied'], 'A smooth carved wooden hand, palm open'),
  tile('pomegranate', 'Presence', ['Whole'], 'A whole ripe pomegranate with its crown'),
  tile('cables', 'Presence', ['Connected', 'Integrated', 'Wired together', 'One place'], 'Two white braided cables plugged into each other', undefined, 'cables-plugged-together'),
  tile('seedling', 'Presence', ['Alive', 'Renew'], 'A green seedling sprouting from soil in a small terracotta pot'),

  /* Vitality */
  tile('matcha', 'Vitality', ['Wellness', 'Wellbeing'], 'A handmade ceramic cup of matcha beside a bamboo whisk', 'Wellbeing is banned as an outcome Health OS delivers. It is a search tag only.'),
  tile('blood-orange', 'Vitality', ['Vitality', 'Vital'], 'A halved blood orange showing its jewel-red flesh'),
  tile('flowering-plant', 'Vitality', ['Thrive'], 'A small potted plant in full bloom'),
  tile('nourish-bowl', 'Vitality', ['Nourish'], 'A speckled ceramic bowl of fresh berries, greens and seeds'),
  tile('aloe', 'Vitality', ['Heal', 'Recovery'], 'A cut aloe vera leaf', 'Heal is banned in Health OS copy because it is a health claim. Use recovery only in its business sense.'),
  tile('green-apple', 'Vitality', ['Health'], 'A crisp green apple with a single leaf', 'Health OS writes about the business of health, never a health outcome.'),
  tile('light-bulb', 'Vitality', ['Energy', 'Current'], 'A vintage filament light bulb glowing warmly'),
  tile('kintsugi-bowl', 'Vitality', ['Restore', 'Resilience'], 'A white ceramic bowl mended with gold kintsugi seams'),
  tile('bonsai', 'Vitality', ['Longevity', 'Grounded'], 'A small bonsai tree in a shallow clay pot'),
  tile('running-shoes', 'Vitality', ['Movement'], 'A pair of light grey running shoes with no logos'),

  /* Calm */
  tile('stones', 'Calm', ['Calm', 'Balance', 'Steady'], 'Three smooth river stones balanced in a cairn', undefined, 'balanced-river-stones'),
  tile('hammock', 'Calm', ['Ease'], 'A cream woven cotton hammock gently sagging'),
  tile('water-glass', 'Calm', ['Still'], 'A clear glass of water with a perfectly still surface'),
  tile('pottery-wheel', 'Calm', ['Centred'], 'A lump of wet clay centred on a small pottery wheel'),
  tile('bamboo-spout', 'Calm', ['Flow'], 'Water pouring in a smooth stream from a bamboo spout'),
  tile('olive-branch', 'Calm', ['Peace'], 'A fresh olive branch with silver-green leaves'),
  tile('hourglass', 'Calm', ['Reset'], 'A wood and glass hourglass with pale sand'),
  tile('thermostat', 'Calm', ['Regulate'], 'A round brass thermostat dial with no numbers'),
  tile('snow-globe', 'Calm', ['Settle'], 'A glass snow globe with snow settling around a small tree'),
  tile('dandelion', 'Calm', ['Breathe'], 'A dandelion seed head with a few seeds drifting away'),

  /* Practice */
  tile('yoga-mat', 'Practice', ['Practice', 'Studio'], 'A rolled cork yoga mat tied with a cotton strap'),
  tile('oil-dropper', 'Practice', ['Practitioner'], 'An amber glass dropper bottle with no label'),
  tile('whistle', 'Practice', ['Coach'], 'A silver coach whistle on a woven lanyard'),
  tile('coffee-cups', 'Practice', ['Client', 'Clients'], 'Two ceramic coffee cups side by side on saucers'),
  tile('singing-bowl', 'Practice', ['Session'], 'A brass singing bowl with its wooden mallet'),
  tile('compass', 'Practice', ['Direction', 'Guidance', 'Pathway', 'Journey'], 'A brass pocket compass with its lid open', 'Journey is banned in Health OS copy: use path or pathway. It is a search tag only.'),
  tile('mortar-pestle', 'Practice', ['Method', 'Protocol'], 'A white marble mortar and pestle', 'Protocol only for business processes, never treatment.'),
  tile('blocks', 'Practice', ['Framework', 'Program', 'Built', 'Building', 'Foundations', 'Setup'], 'A small structure of natural wooden building blocks', undefined, 'wooden-building-blocks'),
  tile('lifebuoy', 'Practice', ['Support'], 'A classic white and soft red lifebuoy ring'),
  tile('hot-water-bottle', 'Practice', ['Care'], 'A hot water bottle in a cream knitted cover'),
  tile('doctors-bag', 'Practice', ['Clinic'], 'A vintage tan leather doctor’s bag'),

  /* Business */
  tile('briefcase', 'Business', ['Business'], 'A tan leather briefcase with brass clasps'),
  tile('swatches', 'Business', ['Brand', 'Design', 'Design system', 'Colour', 'Choices'], 'A fan of paint swatch cards in apricot, rose and lavender', undefined, 'colour-swatch-cards'),
  tile('cash-register', 'Business', ['Revenue'], 'A vintage brass cash register'),
  tile('horseshoe-magnet', 'Business', ['Leads'], 'A red and silver horseshoe magnet'),
  tile('desk-calendar', 'Business', ['Bookings'], 'A wooden flip desk calendar with blank pages'),
  tile('rope-knot', 'Business', ['Retention'], 'A thick natural rope tied in a secure knot'),
  tile('monstera', 'Business', ['Growth'], 'A potted monstera with a new leaf unfurling'),
  tile('copper-pipes', 'Business', ['Pipeline'], 'Polished copper pipes joined with a brass valve'),
  tile('funnel', 'Business', ['Conversion'], 'A copper kitchen funnel'),

  /* Software */
  tile('computer', 'Software', ['Software', 'Tech', 'Digital', 'System', 'Runs itself', 'Technology'], 'A vintage beige all-in-one computer with a softly glowing screen', undefined, 'vintage-all-in-one-computer'),
  tile('cloud', 'Software', ['Cloud', 'SaaS'], 'A soft white cumulus cloud'),
  tile('plinth', 'Software', ['Platform'], 'A round white marble display plinth'),
  tile('smartphone', 'Software', ['App'], 'A modern smartphone with a softly glowing blank screen and no logos'),
  tile('arched-door', 'Software', ['Portal'], 'A small arched oak door standing slightly open'),
  tile('gauge', 'Software', ['Dashboard'], 'A retro analogue gauge dial with a brass bezel and no numbers'),
  tile('card-index', 'Software', ['CRM'], 'A wooden rotary card index with blank cards'),
  tile('gears', 'Software', ['Automation'], 'Three interlocking brass clockwork gears'),
  tile('toy-robot', 'Software', ['AI'], 'A small friendly vintage tin toy robot'),
  tile('tools', 'Software', ['Toolkit', 'Tools', 'Tool stack', 'Fixing', 'Admin'], 'A wooden-handled screwdriver crossed with an adjustable wrench', undefined, 'screwdriver-and-wrench'),

  /* Freedom */
  tile('open-birdcage', 'Freedom', ['Freedom', 'Liberation'], 'An open white wire birdcage with its door swung wide', 'Never "financial freedom": it is an earnings claim.'),
  tile('ringed-planet', 'Freedom', ['Space'], 'A small ringed planet model in soft pastel tones'),
  tile('pocket-watch', 'Freedom', ['Time'], 'An open silver pocket watch on a short chain'),
  tile('lever', 'Freedom', ['Leverage'], 'A wooden plank lever balanced on a stone fulcrum', 'Leverage as a noun only, never as a verb.'),
  tile('measuring-jug', 'Freedom', ['Capacity'], 'A clear glass measuring jug with plain marks and no numbers'),
  tile('paper-plane', 'Freedom', ['Autonomy'], 'A crisp white paper aeroplane'),
  tile('spring', 'Freedom', ['Flexibility'], 'A coiled steel spring'),
  tile('feather', 'Freedom', ['Lightness'], 'A single soft white feather'),
  tile('bud-vase', 'Freedom', ['Simplicity'], 'A plain white ceramic bud vase holding one stem', 'Never call her work simple or easy.'),

  /* Clarity */
  tile('quartz', 'Clarity', ['Clarity', 'Clear'], 'A clear quartz crystal point'),
  tile('camera-lens', 'Clarity', ['Focus'], 'A vintage camera lens with a metal focus ring'),
  tile('transistor-radio', 'Clarity', ['Signal'], 'A small cream transistor radio with its antenna raised'),
  tile('magnifying-glass', 'Clarity', ['Insight'], 'A brass magnifying glass with a wooden handle'),
  tile('round-glasses', 'Clarity', ['Vision'], 'A pair of round wire-rimmed glasses'),
  tile('spirit-level', 'Clarity', ['Alignment'], 'A wooden spirit level with a centred bubble'),
  tile('folded-linen', 'Clarity', ['Order'], 'A neat stack of folded linen napkins in soft neutrals'),
  tile('callipers', 'Clarity', ['Precision'], 'A pair of brass vernier callipers'),

  /* Momentum */
  tile('stethoscope', 'Momentum', ['Pulse'], 'A stethoscope with a silver chest piece'),
  tile('metronome', 'Momentum', ['Rhythm'], 'A wooden pyramid metronome with its arm mid-swing'),
  tile('newtons-cradle', 'Momentum', ['Momentum', 'Motion'], 'A chrome Newton’s cradle with one ball raised'),
  tile('match', 'Momentum', ['Spark'], 'A single wooden match just struck, flame bright'),
  tile('battery', 'Momentum', ['Charge'], 'A retro cylindrical battery in cream and copper with no text'),
  tile('spinning-top', 'Momentum', ['Dynamic'], 'A turned wooden spinning top mid-spin'),
];

/** Ids listed here have no files yet in public/heading-tiles/ and show as empty squircles. */
const PLANNED = new Set<string>([]);

const LIST: HeadlineTile[] = ENTRIES.map(({ file, ...e }) =>
  !PLANNED.has(e.id)
    ? { ...e, status: 'ready', src: `/heading-tiles/${file}.webp`, original: `/heading-tiles/${file}.png`, baked: `/heading-tiles/${file}-tile.png` }
    : { ...e, status: 'planned' }
);

/** Every tile, by id. */
export const HEADLINE_TILES: Record<string, HeadlineTile> = Object.fromEntries(LIST.map((t) => [t.id, t]));

/** Every tile in library order: grouped, then as listed. */
export const HEADLINE_TILE_LIST = LIST;

/** The tile whose words include `word` (case-insensitive), if there is one. */
export const tileForWord = (word: string) => {
  const w = word.trim().toLowerCase();
  return LIST.find((t) => t.words.some((x) => x.toLowerCase() === w));
};
