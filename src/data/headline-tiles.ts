/**
 * The icon library: every icon tile Health OS uses. One photoreal object on a warm charcoal
 * squircle (tokens.json → icon), the same tile whether it pictures a word in a headline or
 * stands on its own in a card, bento, list or post.
 *
 * `words` are the words the picture stands for: they are the tags the library search reads,
 * so every word Health OS headlines reach for points at exactly one tile. The first nine groups
 * cover those headline words; the other eight (communication, devices, automation, workplace,
 * everyday, food and drink, nature, play) are everyday and business objects tagged by what they
 * are, added on 15 September 2026 from Tumai's reference sheets and a software and email set. Each tile has three
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

export type HeadlineTileGroup =
  | 'Presence' | 'Vitality' | 'Calm' | 'Practice' | 'Business' | 'Software' | 'Freedom' | 'Clarity' | 'Momentum'
  | 'Communication' | 'Devices' | 'Automation' | 'Workplace' | 'Everyday' | 'Food and drink' | 'Nature' | 'Play';

/** The first nine groups hold the icons for Health OS headline words; the rest are everyday objects, tagged by what they are. */
export const HEADLINE_TILE_GROUPS: HeadlineTileGroup[] = [
  'Presence', 'Vitality', 'Calm', 'Practice', 'Business', 'Software', 'Freedom', 'Clarity', 'Momentum',
  'Communication', 'Devices', 'Automation', 'Workplace', 'Everyday', 'Food and drink', 'Nature', 'Play',
];

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
  tile('code-window', 'Software', ['Code', 'Programming', 'Developer'], 'A floating glossy browser window showing rows of coloured horizontal bars like abstract code, with no readable text'),
  tile('terminal', 'Software', ['Terminal', 'Command line', 'Script'], 'A small black terminal window with a glowing green cursor block and no text'),
  tile('server-rack', 'Software', ['Server', 'Hosting', 'Infrastructure'], 'A black server rack cabinet with rows of units and small blue status lights, no logos'),
  tile('database', 'Software', ['Database', 'Data', 'Records'], 'A stack of three glossy silver database cylinders'),
  tile('circuit-chip', 'Software', ['Chip', 'Processor', 'Circuit'], 'A computer processor chip on a small green circuit board with gold pins and no markings'),
  tile('ladybird', 'Software', ['Bug', 'Debug', 'Glitch'], 'A glossy red ladybird beetle with black spots'),
  tile('puzzle-pieces', 'Software', ['Integration', 'Fits together', 'Puzzle'], 'Two interlocking jigsaw puzzle pieces, one blue and one orange'),
  tile('plug-socket', 'Software', ['API', 'Plug-in', 'Power up'], 'A white electrical plug about to slot into a white wall socket'),
  tile('usb-drive', 'Software', ['USB', 'Storage', 'Backup'], 'A silver USB flash drive with no markings'),
  tile('hard-drive', 'Software', ['Hard drive', 'Files', 'Archive'], 'An open computer hard drive showing its shiny platter and arm, no labels'),
  tile('floppy-disk', 'Software', ['Save', 'Floppy disk', 'Saved'], 'A blue floppy disk with a silver shutter and a blank label'),
  tile('rocket', 'Software', ['Launch', 'Rocket', 'Go live'], 'A white and red toy rocket with small fins'),

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

  /* Communication */
  tile('gold-bell', 'Communication', ['Bell', 'Notification', 'Alert'], 'A shiny gold bell with a small loop on top'),
  tile('mailbox', 'Communication', ['Mailbox', 'Mail', 'Delivered'], 'A blue rural mailbox on a wooden post with its red flag raised'),
  tile('chat-bubbles', 'Communication', ['Chat', 'Messages', 'Conversation'], 'Two glossy speech bubbles, one blue behind and one white in front with three grey dots'),
  tile('open-envelope', 'Communication', ['Letter', 'Open envelope', 'Invitation'], 'An open cream envelope with a blank letter sliding out'),
  tile('envelope', 'Communication', ['Email', 'Envelope', 'Send'], 'A sealed cream paper envelope'),
  tile('studio-microphone', 'Communication', ['Microphone', 'Podcast', 'Voice'], 'A black studio microphone on a round desk stand'),
  tile('service-bell', 'Communication', ['Service bell', 'Front desk', 'Reception'], 'A brass hotel service bell on a black base'),
  tile('megaphone', 'Communication', ['Megaphone', 'Announcement', 'Promote'], 'A red and white megaphone'),
  tile('inbox-tray', 'Communication', ['Inbox', 'Incoming', 'Tray'], 'A wooden desk inbox tray holding a few blank letters'),
  tile('envelope-stack', 'Communication', ['Newsletter', 'Bulk mail', 'Campaign'], 'A neat stack of cream envelopes tied with twine'),
  tile('wax-seal-letter', 'Communication', ['Personal note', 'Handwritten', 'Sealed'], 'A cream envelope closed with a plain red wax seal with no emblem'),
  tile('telephone', 'Communication', ['Phone call', 'Call', 'Ring'], 'A cream retro desk telephone with a curly cord and blank buttons with no numbers'),
  tile('walkie-talkie', 'Communication', ['Walkie-talkie', 'Team chat', 'Radio'], 'A yellow walkie-talkie with a short antenna, no logos'),
  tile('satellite-dish', 'Communication', ['Broadcast', 'Satellite', 'Reach'], 'A white satellite dish on a small mount'),
  /* Devices */
  tile('pc-tower', 'Devices', ['Desktop tower', 'PC', 'Hardware'], 'A black desktop computer tower with a mesh front panel and a tinted glass side, no logos'),
  tile('game-console', 'Devices', ['Games console', 'Gaming', 'Console'], 'A tall white and black games console standing upright, a generic design with no logos'),
  tile('laptop', 'Devices', ['Laptop', 'Computer', 'Remote work'], 'An open silver laptop with a dark blank screen, no logos'),
  tile('silver-headphones', 'Devices', ['Headphones', 'Listen', 'Audio'], 'A pair of silver over-ear headphones with a mesh headband, no logos'),
  tile('bookshelf-speaker', 'Devices', ['Speaker', 'Sound', 'Loud'], 'A white bookshelf speaker with a black woofer and tweeter, no logos'),
  tile('smart-speaker', 'Devices', ['Smart speaker', 'Voice assistant', 'Home'], 'A round grey fabric smart speaker with a glossy black top, no logos'),
  tile('camera', 'Devices', ['Camera', 'Photo', 'Content'], 'A black DSLR camera with a zoom lens, no logos'),
  tile('smartwatch', 'Devices', ['Smartwatch', 'Wearable', 'Tracker'], 'A smartwatch with an orange woven band and a dark blank screen, no logos'),
  tile('all-in-one-desktop', 'Devices', ['Monitor', 'Screen', 'Desktop'], 'A slim modern all-in-one desktop computer with a blue screen and a light blue stand, no logos'),
  tile('printer-3d', 'Devices', ['3D printer', 'Prototype', 'Fabricate'], 'A compact dark grey 3D printer with a spool of filament, no logos'),
  tile('printer', 'Devices', ['Printer', 'Print', 'Paperwork'], 'A black inkjet printer with a blank sheet of paper coming out, no logos'),
  tile('display-monitor', 'Devices', ['Display', 'External monitor', 'Workstation'], 'A black flat-screen computer monitor on a silver stand with a blank dark screen, no logos'),
  tile('beige-headphones', 'Devices', ['Wireless headphones', 'Quiet', 'Focus music'], 'A pair of beige over-ear wireless headphones, no logos'),
  tile('mini-pc', 'Devices', ['Mini PC', 'Small computer', 'Home server'], 'A small square silver mini desktop computer, no logos'),
  tile('compact-desktop', 'Devices', ['Compact desktop', 'Processing power', 'Base unit'], 'A compact silver aluminium desktop computer box with a vent grille, no logos'),
  tile('earbuds', 'Devices', ['Earbuds', 'Wireless', 'On the go'], 'A pair of white wireless earbuds standing in their open charging case, no logos'),
  tile('graphics-card', 'Devices', ['Graphics card', 'GPU', 'Performance'], 'A black computer graphics card with two cooling fans, no logos'),
  tile('console-box', 'Devices', ['Home console', 'Entertainment', 'Media box'], 'A matte black box-shaped games console, no logos'),
  tile('computer-mouse', 'Devices', ['Mouse', 'Click', 'Point'], 'A white wireless computer mouse, no logos'),
  tile('wifi-router', 'Devices', ['Wi-Fi', 'Router', 'Internet'], 'A white Wi-Fi router with two antennas and small green lights, no logos'),
  tile('tablet', 'Devices', ['Tablet', 'Touchscreen', 'Portable'], 'A modern tablet computer with a softly glowing blank screen, no logos'),
  tile('computer-keyboard', 'Devices', ['Computer keyboard', 'Typing', 'Keys'], 'A slim white computer keyboard with blank keys and no letters'),
  tile('webcam', 'Devices', ['Webcam', 'Video call', 'Meeting'], 'A round black webcam on a small clip stand, no logos'),
  tile('vr-headset', 'Devices', ['VR headset', 'Virtual', 'Immersive'], 'A white virtual reality headset, no logos'),
  tile('drone', 'Devices', ['Drone', 'Aerial', 'Bird’s eye'], 'A white quadcopter drone with four propellers, no logos'),
  /* Automation */
  tile('cog', 'Automation', ['Cog', 'Settings', 'Mechanism'], 'A single chunky brushed steel cog wheel'),
  tile('robot-arm', 'Automation', ['Robot arm', 'Automated', 'Assembly'], 'An orange industrial robot arm on a round grey base, no markings'),
  tile('assistant-robot', 'Automation', ['Chatbot', 'Assistant', 'Bot'], 'A small rounded white robot with a glowing blue face screen showing two simple eyes'),
  tile('conveyor-belt', 'Automation', ['Conveyor', 'Workflow', 'Process'], 'A short conveyor belt carrying three small plain cardboard boxes'),
  tile('lightning-bolt', 'Automation', ['Instant', 'Trigger', 'Fast'], 'A glossy yellow lightning bolt'),
  tile('dominoes', 'Automation', ['Chain reaction', 'Sequence', 'Dominoes'], 'A row of ivory dominoes toppling one after another'),
  tile('wind-up-key', 'Automation', ['Wind-up', 'Autopilot', 'Hands-free'], 'A polished brass wind-up key'),
  tile('stopwatch', 'Automation', ['Stopwatch', 'Timed', 'Deadline'], 'A silver stopwatch with a plain white face and no numbers'),
  tile('toggle-switch', 'Automation', ['Switch', 'Toggle', 'Turn on'], 'A vintage brass toggle switch on a round wooden base'),
  /* Workplace */
  tile('wall-calendar', 'Workplace', ['Calendar', 'Dates', 'Appointments'], 'A spiral-bound desk calendar with a red top band and a grid of plain dark squares, with no numbers or letters'),
  tile('money-bag', 'Workplace', ['Money bag', 'Cash', 'Funds'], 'A tied burlap money sack, plain with no symbols or printing', 'Never pair it with an earnings, income or savings figure.'),
  tile('dartboard', 'Workplace', ['Target', 'Goal', 'Bullseye'], 'A round red and white target board with a red dart in the centre'),
  tile('safe', 'Workplace', ['Safe', 'Vault', 'Locked away'], 'A black steel safe with a plain combination dial and a handle, no numbers', 'Never "secure" as a claim about Health OS.'),
  tile('forklift', 'Workplace', ['Forklift', 'Heavy lifting', 'Logistics'], 'A yellow warehouse forklift with black forks, no markings'),
  tile('shield', 'Workplace', ['Shield', 'Protection', 'Guard'], 'A wooden shield with a polished steel rim', 'Never "secure" as a claim about Health OS.'),
  tile('barber-pole', 'Workplace', ['Barber', 'Salon', 'Local shop'], 'A classic red, white and blue striped barber pole with chrome caps'),
  tile('pen', 'Workplace', ['Pen', 'Sign', 'Write'], 'A sleek black ballpoint pen standing upright'),
  tile('pencil-cup', 'Workplace', ['Stationery', 'Pencils', 'Desk'], 'A dark grey desk cup holding two yellow pencils and a blue pen'),
  tile('red-flag', 'Workplace', ['Flag', 'Milestone', 'Flagged'], 'A red triangular flag on a thin silver pole'),
  tile('fire-extinguisher', 'Workplace', ['Fire extinguisher', 'Put out fires', 'Emergency'], 'A red fire extinguisher with a black nozzle, no labels'),
  tile('office-chair', 'Workplace', ['Office chair', 'Desk job', 'Seat'], 'A black mesh office chair on castors'),
  tile('typewriter', 'Workplace', ['Typewriter', 'Copywriting', 'Draft'], 'A vintage grey typewriter with a blank sheet of paper, keys without letters'),
  tile('toolbox', 'Workplace', ['Toolbox', 'Kit', 'Handy'], 'A red metal toolbox with a black handle and brass latches'),
  tile('padlock', 'Workplace', ['Padlock', 'Locked', 'Private'], 'A brass padlock with a steel shackle and a keyhole', 'Never "secure" as a claim about Health OS.'),
  tile('microscope', 'Workplace', ['Microscope', 'Research', 'Detail'], 'A black and silver laboratory microscope'),
  tile('gold-medal', 'Workplace', ['Medal', 'Winner', 'First place'], 'A gold medal with a red ribbon and a plain face with no numbers'),
  tile('lab-flask', 'Workplace', ['Flask', 'Experiment', 'Test'], 'A glass conical lab flask filled with blue liquid'),
  tile('trophy', 'Workplace', ['Trophy', 'Award', 'Win'], 'A gold two-handled trophy cup on a small base, blank with no engraving'),
  tile('balance-scales', 'Workplace', ['Scales', 'Fair', 'Compliance'], 'A brass balance scale with two hanging pans'),
  tile('hammer-wrench', 'Workplace', ['Hammer', 'Repair', 'Maintenance'], 'A claw hammer with a wooden handle crossed with a steel spanner'),
  tile('clipboard-checklist', 'Workplace', ['Checklist', 'Tasks', 'To do'], 'A wooden clipboard holding a sheet with three green ticks beside grey lines and no text'),
  tile('bar-chart', 'Workplace', ['Chart', 'Report', 'Analytics'], 'A glossy 3D bar chart model of four rising bars in soft apricot, rose and lavender on a small white base'),
  tile('manila-folder', 'Workplace', ['Folder', 'Documents', 'Organised'], 'A manila file folder with a few blank papers peeking out'),
  tile('filing-cabinet', 'Workplace', ['Filing cabinet', 'Paper records', 'Filed'], 'A grey metal filing cabinet with one drawer slightly open, no labels'),
  tile('payment-card', 'Workplace', ['Card payment', 'Payments', 'Checkout'], 'A plain rose gold payment card with a chip, no numbers, text or logos', 'Never write "no credit card required".'),
  tile('receipt', 'Workplace', ['Invoice', 'Receipt', 'Billing'], 'A curled paper receipt with grey lines and no text or numbers'),
  tile('sticky-notes', 'Workplace', ['Notes', 'Reminders', 'Ideas'], 'A small stack of blank pastel sticky notes'),
  tile('brass-key', 'Workplace', ['Key', 'Access', 'Login'], 'A shiny brass key'),
  tile('shopping-trolley', 'Workplace', ['Cart', 'Shop', 'Online store'], 'A small chrome shopping trolley'),
  tile('chain-links', 'Workplace', ['Link', 'Chain', 'Linked'], 'Two interlocking steel chain links'),
  tile('rubber-stamp', 'Workplace', ['Approved', 'Stamp', 'Sign off'], 'A wooden rubber stamp on a red ink pad, no text'),
  /* Everyday */
  tile('wall-clock', 'Everyday', ['Clock', 'Hours', 'Opening hours'], 'A classic round wall clock with a dark metal rim and a plain white face with simple tick marks and no numbers, hands at ten past ten'),
  tile('chef-knife', 'Everyday', ['Knife', 'Cut', 'Sharp'], 'A chef’s knife with a polished steel blade and a wooden handle, no engraving'),
  tile('coffee-maker', 'Everyday', ['Coffee maker', 'Brew', 'Morning'], 'A black drip coffee maker with a glass carafe of coffee, no logos'),
  tile('sunglasses', 'Everyday', ['Sunglasses', 'Summer', 'Cool'], 'A pair of classic black sunglasses'),
  tile('work-boot', 'Everyday', ['Boot', 'Hiking', 'Tough'], 'A tan leather lace-up work boot'),
  tile('backpack', 'Everyday', ['Backpack', 'Travel', 'Pack'], 'A dark grey canvas backpack with a front pocket, no logos'),
  tile('globe', 'Everyday', ['Globe', 'World', 'International'], 'A glossy model of planet Earth with blue oceans and green and tan continents, no stand'),
  tile('jacket', 'Everyday', ['Jacket', 'Outerwear', 'Layer up'], 'A black zip-up jacket shown front on as if on an invisible mannequin, no logos'),
  tile('microwave', 'Everyday', ['Microwave', 'Quick meal', 'Heat up'], 'A silver microwave oven with a dark glass door and a blank control panel'),
  tile('sneaker', 'Everyday', ['Sneaker', 'Casual', 'Street'], 'A plain white leather low-top sneaker with no logos'),
  tile('toaster', 'Everyday', ['Toaster', 'Toast', 'Kitchen'], 'A cream retro toaster with a slice of golden toast popping up'),
  tile('hardcover-book', 'Everyday', ['Book', 'Read', 'Ebook'], 'A closed navy blue hardcover book with a blank cover'),
  tile('baseball-cap', 'Everyday', ['Cap', 'Team', 'Merch'], 'A blue baseball cap with a black brim, no logos'),
  tile('rubbish-bin', 'Everyday', ['Bin', 'Rubbish', 'Delete'], 'A galvanised metal rubbish bin with a lid'),
  tile('pump-bottle', 'Everyday', ['Soap', 'Lotion', 'Pump bottle'], 'A teal and cream pump bottle of hand soap with no label'),
  tile('diamond', 'Everyday', ['Diamond', 'Premium', 'Precious'], 'A brilliant-cut pale blue diamond'),
  tile('high-heel', 'Everyday', ['High heel', 'Heels', 'Fashion'], 'A red patent leather stiletto high-heel shoe'),
  tile('alarm-clock', 'Everyday', ['Alarm clock', 'Wake up', 'Early start'], 'A black digital alarm clock with a softly glowing green blank display and no digits'),
  /* Food and drink */
  tile('lemon', 'Food and drink', ['Lemon', 'Zest', 'Citrus'], 'A whole bright yellow lemon'),
  tile('burger', 'Food and drink', ['Burger', 'Takeaway', 'Fast food'], 'A cheeseburger with a sesame seed bun, lettuce, tomato and melted cheese'),
  tile('doughnut', 'Food and drink', ['Doughnut', 'Treat', 'Sweet'], 'A pink iced doughnut with colourful sprinkles'),
  tile('croissant', 'Food and drink', ['Croissant', 'Bakery', 'Breakfast'], 'A golden flaky butter croissant'),
  tile('coffee-cup', 'Food and drink', ['Coffee', 'Cup', 'Break'], 'A white ceramic cup of black coffee on a saucer'),
  tile('chocolate-bar', 'Food and drink', ['Chocolate', 'Indulge', 'Chocolate bar'], 'A chocolate bar partly unwrapped from red paper and silver foil, no printing'),
  tile('cake-slice', 'Food and drink', ['Cake', 'Dessert', 'Slice'], 'A slice of layered sponge cake with cream and a strawberry on top'),
  tile('red-apple', 'Food and drink', ['Apple', 'Teacher', 'Crunch'], 'A shiny red apple with a green leaf'),
  tile('watermelon', 'Food and drink', ['Watermelon', 'Juicy', 'Summer fruit'], 'A triangular slice of watermelon with black seeds'),
  tile('avocado', 'Food and drink', ['Avocado', 'Brunch', 'Green'], 'A halved avocado with its stone'),
  tile('orange-juice', 'Food and drink', ['Juice', 'Smoothie', 'Refresh'], 'A tall glass of orange juice with an orange slice and a red straw'),
  tile('banana', 'Food and drink', ['Banana', 'Fruit', 'Snack'], 'A ripe yellow banana'),
  tile('fries', 'Food and drink', ['Fries', 'Chips', 'Side'], 'A red carton of golden french fries with no printing'),
  tile('cookie', 'Food and drink', ['Cookie', 'Biscuit', 'Bake'], 'A chocolate chip cookie'),
  tile('wine-glass', 'Food and drink', ['Wine', 'Cheers', 'Evening'], 'A stemmed glass of red wine'),
  /* Nature */
  tile('tulip', 'Nature', ['Tulip', 'Spring', 'Fresh'], 'A single pink tulip on its stem with two green leaves'),
  tile('sunflower', 'Nature', ['Sunflower', 'Sunny', 'Bright'], 'A single sunflower in full bloom on its stem with two leaves'),
  tile('toadstool', 'Nature', ['Mushroom', 'Toadstool', 'Forest'], 'A red toadstool mushroom with white spots and a pale stem'),
  tile('potted-plant', 'Nature', ['Plant', 'Greenery', 'Indoor plant'], 'A leafy green plant in a cream ceramic pot'),
  tile('red-rose', 'Nature', ['Rose', 'Romance', 'Thank you'], 'A single red rose on a long stem with leaves'),
  tile('green-leaf', 'Nature', ['Leaf', 'Natural', 'Eco'], 'A single fresh green leaf'),
  /* Play */
  tile('party-popper', 'Play', ['Party popper', 'Celebrate', 'Party'], 'A striped orange and yellow party popper cone bursting with curly paper streamers and small stars'),
  tile('snare-drum', 'Play', ['Drum', 'Beat', 'Drumroll'], 'A red snare drum with chrome lugs and two wooden drumsticks resting across the top'),
  tile('clapperboard', 'Play', ['Clapperboard', 'Film', 'Video'], 'A black and white striped film clapperboard with a blank board and no writing'),
  tile('skateboard', 'Play', ['Skateboard', 'Skate', 'Ride'], 'An orange skateboard with red wheels'),
  tile('top-hat', 'Play', ['Top hat', 'Magic', 'Showtime'], 'A black top hat with a red band'),
  tile('midi-keyboard', 'Play', ['MIDI keyboard', 'Piano', 'Compose'], 'A compact black MIDI keyboard with drum pads and knobs, no logos or labels'),
  tile('basketball', 'Play', ['Basketball', 'Team sport', 'Shoot'], 'An orange basketball'),
  tile('game-controller', 'Play', ['Controller', 'Gamepad', 'Game'], 'A light grey wireless game controller with no logos or symbols on the buttons'),
  tile('violin', 'Play', ['Violin', 'Strings', 'Orchestra'], 'A violin with its bow'),
  tile('soccer-ball', 'Play', ['Football', 'Soccer', 'Kick off'], 'A classic black and white soccer ball'),
  tile('gift-box', 'Play', ['Gift', 'Gift box', 'Bonus'], 'A white gift box tied with a red ribbon bow'),
  tile('saxophone', 'Play', ['Saxophone', 'Jazz', 'Smooth'], 'A polished brass saxophone'),
  tile('crystal-ball', 'Play', ['Crystal ball', 'Forecast', 'Predict'], 'A purple glass crystal ball on a wooden stand', 'Forecast is for planning only, never a promised result.'),
  tile('boxing-glove', 'Play', ['Boxing glove', 'Fight', 'Knockout'], 'A red leather boxing glove with no logos'),
  tile('paint-palette', 'Play', ['Palette', 'Creative', 'Paint'], 'A wooden artist’s palette with dabs of colourful paint and a brush'),
  tile('handheld-console', 'Play', ['Handheld game', 'Retro', 'Nostalgia'], 'A retro grey handheld game console with a blank green screen and buttons, no logos or text'),
  tile('birthday-cake', 'Play', ['Birthday', 'Anniversary', 'Birthday cake'], 'A small cream birthday cake with one lit striped candle'),
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
