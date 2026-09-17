/**
 * The dashboard library: 29 Health OS product screens, tagged so the system knows what each one
 * holds. Supplied by Tumai on 17 September 2026 as 4K stills; screen 79 is the featured one.
 *
 * These are mockups of the product, not pages built from the tokens. Every one was read and
 * tagged with the area of the product it belongs to, its layout, the parts it is built from, what
 * to take from it, and each place it departs from the system (`departures`), which is nearly
 * always a saturated pink button where the system has one apricot button colour. **Build from the
 * tokens, not from the picture:** a screen with departures shows the shape to copy, not the paint.
 *
 * Three files per screen: the 4K PNG as supplied (`/dashboards/<id>.png`), a 1920px JPEG for
 * reading on the page (`large/`), and a 960px JPEG for the grid (`thumbs/`).
 */

/** The part of the product a screen belongs to. */
export type DashboardArea =
  | 'Overview'
  | 'Bookings'
  | 'Clients'
  | 'Messages'
  | 'Funnels and websites'
  | 'Content'
  | 'Automations'
  | 'Courses and community';

/** How the screen is laid out, whatever it is about. */
export type DashboardLayout =
  | 'Overview'
  | 'List and table'
  | 'Record detail'
  | 'Builder canvas'
  | 'Calendar'
  | 'Template gallery'
  | 'Form and settings'
  | 'Feed'
  | 'Split preview'
  | 'Empty state'
  | 'Dialog'
  | 'Report';

export interface Dashboard {
  /** the number the screen was supplied as, and its file name */
  id: number;
  name: string;
  area: DashboardArea;
  layout: DashboardLayout;
  /** one sentence on what the screen shows */
  summary: string;
  /** the components it is built from, in the system's words */
  parts: string[];
  /** which colour leads: rose, lavender, apricot, mixed wash or mostly neutral */
  palette: string;
  /** airy, balanced or dense */
  density: string;
  /** what a designer should take from it */
  useFor: string;
  /** every place it differs from the system. Empty means it can be built as it stands */
  departures: string[];
  /** the words on the screen that name it */
  readsAs: string;
  /** the one screen shown first: the main Health OS dashboard */
  featured?: boolean;
}

/** Areas in product order, for the filter chips. */
export const DASHBOARD_AREAS: DashboardArea[] = ['Overview', 'Bookings', 'Clients', 'Messages', 'Funnels and websites', 'Content', 'Automations', 'Courses and community'];

/** The featured screen first, then the rest in the order they were supplied. */
export const DASHBOARDS: Dashboard[] = [
  {
    id: 79,
    name: "Main Health OS dashboard",
    area: "Overview",
    layout: "Overview",
    summary: "An all-in-one CRM home screen with KPI tiles, a monthly profit bar chart, task checklist and new-customer list.",
    parts: ["side nav", "KPI tiles", "bar chart", "line chart", "list rows", "avatars", "buttons", "search"],
    palette: "rose",
    density: "dense",
    useFor: "Reference for pairing KPI tiles, a profit chart and a profile and customer list card, not for its saturated pink styling.",
    departures: ["Solid, saturated pink fills on tiles and buttons instead of the pale apricot accent", "The MRR tile and profile panel are fully saturated pink blocks rather than soft tints", "Body and label type is a plain sans, not Anonymous Pro", "An illustrated cartoon avatar rather than a plain photo or initial"],
    readsAs: "My Account", featured: true,
  },
  {
    id: 80,
    name: "Funnel template gallery",
    area: "Funnels and websites",
    layout: "Template gallery",
    summary: "A funnel template picker with thumbnail step previews, conversion rates, and a live preview panel for the selected template.",
    parts: ["top nav", "side nav", "cards", "side panel", "badges", "buttons", "search"],
    palette: "mixed wash",
    density: "balanced",
    useFor: "Reference for pairing a template grid with a live preview panel and plausible conversion metadata.",
    departures: ["The preview headline sits on a saturated pink to purple gradient, not a soft flat accent", "The preview call to action is a solid black pill button, not apricot", "The preview headline uses a plain display sans, not Spline Sans"],
    readsAs: "Funnels and Websites",
  },
  {
    id: 81,
    name: "Content calendar with AI drafting",
    area: "Content",
    layout: "Calendar",
    summary: "A weekly content calendar of scheduled posts with thumbnails and statuses, beside an AI caption drafting panel.",
    parts: ["side nav", "calendar grid", "cards", "media thumbnails", "badges", "form fields", "buttons"],
    palette: "rose",
    density: "balanced",
    useFor: "Reference for a weekly calendar beside a drafting panel, with post status on each card.",
    departures: ["The logo mark and Schedule button use saturated pink rather than the apricot accent", "The active post badge is saturated pink, not a calm pale tint", "The logo tile uses a purple, pink and orange gradient"],
    readsAs: "Content Calendar",
  },
  {
    id: 82,
    name: "Post planner table",
    area: "Content",
    layout: "List and table",
    summary: "A paginated table of posts showing caption, media thumbnail, status, type and the connected social accounts.",
    parts: ["side nav", "top nav", "data table", "badges", "avatars", "search", "buttons"],
    palette: "rose",
    density: "dense",
    useFor: "Reference for a dense log table with status badges, platform avatars and pagination.",
    departures: ["The New Post button and active nav item use saturated pink rather than pale apricot", "Status badges are solid saturated fills, not calm pale tints", "Every row repeats the same Type label instead of varied plausible values"],
    readsAs: "Planner",
  },
  {
    id: 83,
    name: "Post planner with view toggle",
    area: "Content",
    layout: "List and table",
    summary: "The same post table with a grid and list toggle, a date range filter, and post type shown per row.",
    parts: ["side nav", "top nav", "data table", "badges", "filters", "search", "buttons"],
    palette: "rose",
    density: "balanced",
    useFor: "Reference for a table and grid view switch with filters above varied row data.",
    departures: ["The New Post button and active nav item use saturated pink rather than pale apricot", "Status badges are solid saturated fills rather than calm pale tints"],
    readsAs: "Planner",
  },
  {
    id: 84,
    name: "Studio practice overview",
    area: "Overview",
    layout: "Overview",
    summary: "A practice home screen with revenue, bookings and fill rate tiles, a revenue line chart, the day's schedule and tasks.",
    parts: ["side nav", "KPI tiles", "line chart", "list rows", "avatars", "buttons"],
    palette: "mixed wash",
    density: "airy",
    useFor: "The calmest screen in the set: pale icon tiles, one soft line chart, and a schedule beside the figures.",
    departures: [],
    readsAs: "Good morning, Lindsay",
  },
  {
    id: 85,
    name: "Weekly class schedule",
    area: "Bookings",
    layout: "Calendar",
    summary: "A week of classes colour coded by type, with an instructor filter and live waitlist counts.",
    parts: ["side nav", "top nav", "calendar grid", "badges", "avatars", "buttons", "notifications", "toggles", "filters"],
    palette: "mixed wash",
    density: "balanced",
    useFor: "Reference for a booking calendar with class types in colour, a day, week and month switch, and an instructor filter.",
    departures: ["The New class button is a saturated pink fill, not the single apricot button colour", "Class blocks use solid pink, apricot and lavender fills rather than pale tints"],
    readsAs: "Schedule, August 2026",
  },
  {
    id: 86,
    name: "Studio owner overview",
    area: "Overview",
    layout: "Overview",
    summary: "A calm studio dashboard showing a revenue trend, the day's bookings, recent activity and a task list.",
    parts: ["side nav", "top nav", "KPI tiles", "area chart", "list rows", "badges", "avatars", "buttons", "toggles"],
    palette: "mixed wash",
    density: "balanced",
    useFor: "Reference for a calm home screen that holds summary tiles, one trend chart and two activity lists.",
    departures: [],
    readsAs: "Good morning, Lindsay",
  },
  {
    id: 87,
    name: "Studio overview, stronger accent",
    area: "Overview",
    layout: "Overview",
    summary: "The same studio dashboard with a saturated pink active nav item and a bold pink task button.",
    parts: ["side nav", "top nav", "KPI tiles", "area chart", "list rows", "badges", "avatars", "buttons", "toggles", "search", "notifications"],
    palette: "mixed wash",
    density: "balanced",
    useFor: "Shows how the same dashboard reads with a stronger accent on the nav and the buttons.",
    departures: ["The active sidebar item and the task button use a saturated pink fill, not the single apricot button colour", "The logo mark is an orange to pink gradient tile"],
    readsAs: "Good morning, Lindsay",
  },
  {
    id: 88,
    name: "Practitioner performance dashboard",
    area: "Overview",
    layout: "Overview",
    summary: "A practitioner home screen with spend, leads, revenue and recurring revenue tiles, a profit bar chart and a growth chart.",
    parts: ["side nav", "top nav", "KPI tiles", "bar chart", "line chart", "cards", "list rows", "avatars", "search", "notifications"],
    palette: "mixed wash",
    density: "dense",
    useFor: "Reference for a busy home screen with a long nav, a profile card and two chart cards.",
    departures: ["The active sidebar item is a saturated pink fill, not apricot", "The profit bar chart mixes several accent colours instead of one calm flat colour"],
    readsAs: "Dashboard, August 2026",
  },
  {
    id: 89,
    name: "Message inbox with suggested reply",
    area: "Messages",
    layout: "Split preview",
    summary: "A three pane text inbox showing a client conversation, a suggested reply, and the client's bookings and value.",
    parts: ["top nav", "side panel", "chat thread", "list rows", "search", "badges", "avatars", "buttons", "notifications", "tabs"],
    palette: "mixed wash",
    density: "balanced",
    useFor: "Reference for a three pane inbox with a suggestion under the thread and client details to the side.",
    departures: ["The suggested reply bubble uses a pink to lavender gradient fill, not a flat pale tint", "The send button is a saturated pink fill, not the single apricot button colour", "The active status badge is teal, outside the rose, lavender and apricot palette", "The lifetime value figure is set in saturated pink"],
    readsAs: "Client conversation, active now",
  },
  {
    id: 90,
    name: "Message inbox in monospace",
    area: "Messages",
    layout: "Split preview",
    summary: "The same inbox set in the monospaced body type, with a flat suggestion box and a dark send button.",
    parts: ["top nav", "side panel", "chat thread", "list rows", "search", "badges", "avatars", "buttons", "notifications", "tabs"],
    palette: "mostly neutral",
    density: "balanced",
    useFor: "The same layout in the system's body type, useful for comparing type treatments on one screen.",
    departures: ["The send button is filled near black with white text rather than the single apricot button colour", "The unread tab label is set in saturated magenta", "The active status dot is teal, outside the rose, lavender and apricot palette", "The lifetime value figure is set in saturated red"],
    readsAs: "Client conversation, active",
  },
  {
    id: 91,
    name: "Social funnel flow",
    area: "Automations",
    layout: "Builder canvas",
    summary: "A node based builder for an Instagram and Facebook lead campaign that replies by direct message and tags the lead.",
    parts: ["side nav", "top nav", "tabs", "cards", "badges", "avatars", "buttons"],
    palette: "mixed wash",
    density: "balanced",
    useFor: "Reference for trigger, logic and action cards on a canvas, with status badges inline.",
    departures: ["The Test Workflow button is a saturated pink fill, not apricot", "Trigger and campaign badges are saturated magenta rather than a pale tint", "The Wait for reply progress bar is a solid pink fill"],
    readsAs: "Social Media Selling Machine",
  },
  {
    id: 92,
    name: "Lead routing automation",
    area: "Automations",
    layout: "Builder canvas",
    summary: "An automation that runs a lead check, then splits new leads into high priority, general and low priority paths.",
    parts: ["side nav", "top nav", "tabs", "cards", "badges", "buttons"],
    palette: "mixed wash",
    density: "balanced",
    useFor: "Reference for a branching split on a canvas, with the paths labelled underneath.",
    departures: ["The Test Workflow button is a saturated pink fill, not apricot", "The active sidebar tab is a solid pink block", "The live status badge uses a saturated green fill rather than a soft tint"],
    readsAs: "New Lead Catch",
  },
  {
    id: 93,
    name: "Email action settings",
    area: "Automations",
    layout: "Builder canvas",
    summary: "A vertical list of automation steps with a side panel setting an email action's template, subject line and sender.",
    parts: ["side nav", "top nav", "tabs", "side panel", "form fields", "avatars", "buttons"],
    palette: "mixed wash",
    density: "balanced",
    useFor: "Reference for a settings panel beside a flow: a select, a field, a sender card and a destructive action.",
    departures: ["The Test Workflow and Save Configuration buttons are saturated pink, not apricot", "The selected node is outlined in solid magenta", "The Delete Node button uses a pink outline and pink label"],
    readsAs: "Email Action",
  },
  {
    id: 94,
    name: "AI agent workspace",
    area: "Automations",
    layout: "Overview",
    summary: "A workspace of agent capability cards with a live message preview and weekly performance tiles.",
    parts: ["side nav", "top nav", "cards", "KPI tiles", "chat thread", "avatars", "toggles", "buttons", "badges"],
    palette: "mixed wash",
    density: "balanced",
    useFor: "Reference for putting capability cards, a live conversation and figures on one screen.",
    departures: ["The agent toggle and outgoing message bubbles are saturated pink, not apricot", "The agent status banner is a solid saturated magenta block", "The rating figure and star are bright pink rather than a soft accent", "The logo tile uses a pink to orange gradient"],
    readsAs: "AI Employee, Conversation AI",
  },
  {
    id: 95,
    name: "Live conversation panel",
    area: "Automations",
    layout: "Split preview",
    summary: "A live view of an agent rescheduling a client by message, beside tiles for active conversations and satisfaction.",
    parts: ["side nav", "top nav", "tabs", "chat thread", "KPI tiles", "buttons", "badges", "notifications"],
    palette: "mixed wash",
    density: "balanced",
    useFor: "Reference for watching a conversation beside its figures, with quick replies under the thread.",
    departures: ["The active sidebar item and the confirm button are saturated pink, not apricot", "The download button is a solid magenta pill", "The satisfaction figure is bright pink"],
    readsAs: "Employee Control Panel, live view",
  },
  {
    id: 96,
    name: "Weekly coaching calendar",
    area: "Bookings",
    layout: "Calendar",
    summary: "A week view of coaching sessions with a waitlist, filtered by calendar type and by coach.",
    parts: ["side nav", "top nav", "tabs", "calendar grid", "avatars", "badges", "buttons", "filters"],
    palette: "mixed wash",
    density: "balanced",
    useFor: "Reference for a week calendar filtered by person, with session chips and a waitlist tag.",
    departures: ["The New Appointment button is a saturated pink fill, not apricot", "Session chips use saturated pink, apricot and lavender fills rather than pale tints", "The current time line is saturated pink"],
    readsAs: "Calendar, October 2024",
  },
  {
    id: 97,
    name: "Calendar management table",
    area: "Bookings",
    layout: "List and table",
    summary: "A practitioner's calendar list with summary tiles, a paginated table of personal and service calendars, and two tip cards.",
    parts: ["side nav", "top nav", "tabs", "KPI tiles", "data table", "cards", "badges", "search", "buttons", "notifications"],
    palette: "rose",
    density: "balanced",
    useFor: "Reference for pairing summary tiles with a list table and status badges.",
    departures: ["The New class button is a saturated pink fill, not the single apricot accent", "The conversion figure is saturated magenta rather than a pale tint"],
    readsAs: "Calendar Management",
  },
  {
    id: 98,
    name: "Studio calendar overview",
    area: "Bookings",
    layout: "Overview",
    summary: "A calendar overview with summary tiles, a gradient callout, and per studio cards showing booking progress.",
    parts: ["side nav", "top nav", "tabs", "KPI tiles", "cards", "badges", "buttons", "search", "notifications"],
    palette: "mixed wash",
    density: "balanced",
    useFor: "Reference for combining summary tiles, one promoted tile and per studio status cards.",
    departures: ["The report tile uses a saturated pink to purple gradient, not a pale flat tint", "The New class button is a pink gradient rather than flat apricot", "Progress bars are filled in saturated pink, purple and orange"],
    readsAs: "Calendar Management",
  },
  {
    id: 99,
    name: "Client directory with side panel",
    area: "Clients",
    layout: "List and table",
    summary: "A client table with summary tiles and a side panel of quick actions, a double booking alert and a tip card.",
    parts: ["top nav", "tabs", "KPI tiles", "data table", "side panel", "cards", "badges", "avatars", "search", "filters", "buttons", "notifications"],
    palette: "mixed wash",
    density: "dense",
    useFor: "Reference for a table paired with a side panel that holds actions and alerts.",
    departures: ["The New class button is saturated pink rather than apricot", "Tile progress bars use saturated orange, purple and magenta fills instead of pale tints", "The conflicts alert card uses a saturated warning fill"],
    readsAs: "Health OS, Clients",
  },
  {
    id: 100,
    name: "Weekly appointment calendar",
    area: "Bookings",
    layout: "Calendar",
    summary: "A colour coded week grid showing assessment, nutrition and coaching appointments, with a new appointment button.",
    parts: ["side nav", "top nav", "tabs", "calendar grid", "badges", "buttons", "notifications"],
    palette: "mixed wash",
    density: "airy",
    useFor: "Reference for a week grid where each appointment type carries its own colour.",
    departures: ["The New Appointment button is a saturated pink fill, not apricot", "Appointment blocks use saturated purple, orange and pink fills rather than pale accent tints", "The current time line and badge are bright magenta"],
    readsAs: "October 2024, week view",
  },
  {
    id: 101,
    name: "Calendar with manage panel",
    area: "Bookings",
    layout: "Calendar",
    summary: "A week calendar beside an open panel for filtering calendars and people and setting buffer times.",
    parts: ["side nav", "top nav", "tabs", "calendar grid", "side panel", "filters", "toggles", "search", "badges", "buttons"],
    palette: "mixed wash",
    density: "dense",
    useFor: "Reference for a calendar with a settings panel for people, calendar types and buffers.",
    departures: ["Appointment blocks use saturated pink and teal fills, outside the rose, lavender and apricot palette", "The New Appointment button is pink rather than apricot", "The paid badge uses a saturated teal fill, which is not in the accent set"],
    readsAs: "Calendar, 12 to 18 October 2024",
  },
  {
    id: 102,
    name: "Community feed and leaderboard",
    area: "Courses and community",
    layout: "Feed",
    summary: "A community home with a featured video, latest posts, a group profile card and a member leaderboard.",
    parts: ["side nav", "top nav", "search", "tabs", "cards", "avatars", "list rows", "media thumbnails", "buttons", "notifications"],
    palette: "rose",
    density: "balanced",
    useFor: "Reference for a community home that holds a feed, a group card, a leaderboard and one promoted tile.",
    departures: ["The session and enrol buttons are saturated pink rather than the single apricot accent", "The promoted tile uses a strong magenta fill instead of a pale tint", "Post copy makes health claims, which Health OS copy never does"],
    readsAs: "Welcome home, latest activity",
  },
  {
    id: 103,
    name: "Course library grid",
    area: "Courses and community",
    layout: "Template gallery",
    summary: "Six course and workshop cards for a studio, each with an icon tile, a category label, a description and one button.",
    parts: ["side nav", "top nav", "tabs", "search", "cards", "buttons", "avatars", "notifications"],
    palette: "rose",
    density: "balanced",
    useFor: "Reference for a course card: icon tile, small category label, title, description and one full width action.",
    departures: ["Every card button is a saturated pink fill, not the single apricot button colour"],
    readsAs: "The Studio Collective, courses",
  },
  {
    id: 104,
    name: "Featured course feed",
    area: "Courses and community",
    layout: "Feed",
    summary: "A discussion feed led by a large featured course banner and a live session card, with four resource cards below.",
    parts: ["top nav", "tabs", "search", "cards", "media thumbnails", "avatars", "badges", "buttons", "notifications"],
    palette: "mixed wash",
    density: "balanced",
    useFor: "Shows how a large feature banner, a live card and a row of smaller cards sit together in one feed.",
    departures: ["The resume button is saturated magenta rather than apricot"],
    readsAs: "Discussion, Mastering Somatic Intelligence",
  },
  {
    id: 105,
    name: "Private group discussion",
    area: "Courses and community",
    layout: "Feed",
    summary: "A private community home with a post box, featured posts, an activity feed, and a group panel with a leaderboard.",
    parts: ["side nav", "top nav", "tabs", "form fields", "cards", "media thumbnails", "avatars", "badges", "list rows", "side panel", "buttons", "notifications"],
    palette: "mixed wash",
    density: "dense",
    useFor: "Reference for a feed with a group panel and leaderboard held to the right.",
    departures: ["The chat button and several avatar chips use saturated pink and purple fills rather than pale tints"],
    readsAs: "Discussion, The Vitality Collective",
  },
  {
    id: 106,
    name: "Community home, quiet",
    area: "Courses and community",
    layout: "Feed",
    summary: "A calmer community home with a featured video, status badges, an activity feed, and a stats and leaderboard panel.",
    parts: ["side nav", "cards", "media thumbnails", "badges", "avatars", "list rows", "side panel", "buttons"],
    palette: "mixed wash",
    density: "balanced",
    useFor: "Reference for pale pill badges beside a stats and leaderboard panel on a community page.",
    departures: ["The new session button is saturated magenta instead of apricot"],
    readsAs: "Home, The Resilience Lab",
  },
  {
    id: 107,
    name: "Enquiry pipeline board",
    area: "Clients",
    layout: "List and table",
    summary: "A four column board tracking enquiries from first contact through a trial week to paid membership, with monthly revenue shown.",
    parts: ["side nav", "top nav", "kanban board", "cards", "buttons", "search", "badges", "avatars", "notifications"],
    palette: "mixed wash",
    density: "dense",
    useFor: "Reference for a client pipeline board with a status tag per card and a running figure in the header.",
    departures: ["The add button and several status tags are saturated rather than pale accent tints"],
    readsAs: "Sales pipeline, new enquiry to member",
  },
];

export const dashboardOriginal = (d: Dashboard) => `/dashboards/${d.id}.png`;
export const dashboardLarge = (d: Dashboard) => `/dashboards/large/${d.id}.jpg`;
export const dashboardThumb = (d: Dashboard) => `/dashboards/thumbs/${d.id}.jpg`;

/** Screens with nothing to fix: they can be built from the tokens as they stand. */
export const DASHBOARDS_ON_SYSTEM = DASHBOARDS.filter((d) => d.departures.length === 0);
