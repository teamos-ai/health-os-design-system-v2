/**
 * Showcase content. Every string that the reference site and its example sections show
 * lives here, so structure stays in the components and copy stays reviewable in one place.
 *
 * Voice: plain, calm, Australian English, sentence case, no em dashes, no invented numbers.
 * Commercial facts (offer, prices, claims) follow the Health OS database (db-health-os).
 */
import {
  CalendarCheck,
  CalendarClock,
  Layers,
  LineChart,
  MailCheck,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
  Type,
  Palette,
  SunMedium,
  Shapes,
  Waves,
  LayoutGrid,
  Blend,
  Library,
  type LucideIcon,
} from 'lucide-react';
import type { Accent } from '@/lib/accents';
import type { BadgeVariant } from '@/components/ui/badge';

/* ── Tickers (scrolling banners) ───────────────────────────────────────── */
export interface TickerItem {
  icon: LucideIcon;
  text: string;
}

/** What the product does. Subtle banner, the light-theme default. */
export const TICKER_ITEMS: TickerItem[] = [
  { icon: Layers, text: 'One system for the whole business' },
  { icon: CalendarCheck, text: 'Bookings that confirm themselves' },
  { icon: MailCheck, text: 'Follow-up that sends on time' },
  { icon: Wrench, text: 'Done-for-you setup' },
  { icon: Users, text: 'Built for established wellness businesses' },
];

/** How the system is built. Tint banner, the paper-theme default. */
export const TICKER_PRINCIPLES: TickerItem[] = [
  { icon: Type, text: 'Spline Sans and Anonymous Pro' },
  { icon: Palette, text: 'Apricot for every action' },
  { icon: SunMedium, text: 'Light and paper themes' },
  { icon: Shapes, text: 'Tokens first, always' },
  { icon: Blend, text: 'Three gradients, used sparingly' },
];

/** The feel. Tint banner. */
export const TICKER_CRAFT: TickerItem[] = [
  { icon: Waves, text: 'Calm, minimal, open' },
  { icon: Sparkles, text: 'Motion on by default' },
  { icon: LayoutGrid, text: 'Nine card types' },
  { icon: Library, text: 'Every image tagged' },
  { icon: ShieldCheck, text: 'One source of truth' },
];

/* ── Showcase hero ─────────────────────────────────────────────────────── */
export const SHOWCASE_COMMANDS: string[] = [
  'browse the components',
  'copy a token',
  'switch the theme',
  'read the checklist',
  'open the live page',
];

/* ── Badges: emoji + soft tints, grouped by where they are used ────────── */
export interface BadgeSpec {
  emoji: string;
  label: string;
  variant: BadgeVariant;
}

export const BADGES_STATUS: BadgeSpec[] = [
  { emoji: '🟢', label: 'Live', variant: 'success' },
  { emoji: '✅', label: 'Active', variant: 'success' },
  { emoji: '⏳', label: 'Pending', variant: 'warning' },
  { emoji: '⚠️', label: 'Overdue', variant: 'error' },
  { emoji: '🆕', label: 'New', variant: 'lavender' },
  { emoji: '⭐', label: 'Premium', variant: 'apricot' },
  { emoji: '📝', label: 'Draft', variant: 'outline' },
];

export const BADGES_WELLNESS: BadgeSpec[] = [
  { emoji: '🌿', label: 'Wellness', variant: 'success' },
  { emoji: '🧘', label: 'Mindful', variant: 'lavender' },
  { emoji: '💗', label: 'Self-care', variant: 'rose' },
  { emoji: '☀️', label: 'Energy', variant: 'apricot' },
  { emoji: '💧', label: 'Hydration', variant: 'lavender' },
  { emoji: '🌙', label: 'Rest', variant: 'lavender' },
  { emoji: '🍃', label: 'Calm', variant: 'success' },
  { emoji: '🌸', label: 'Bloom', variant: 'rose' },
  { emoji: '🔥', label: 'Streak', variant: 'apricot' },
  { emoji: '🩺', label: 'Practitioner', variant: 'lavender' },
];

export const BADGES_OILS: BadgeSpec[] = [
  { emoji: '🌿', label: 'Lavender', variant: 'lavender' },
  { emoji: '🍊', label: 'Citrus', variant: 'apricot' },
  { emoji: '🌶️', label: 'Cinnamon', variant: 'error' },
  { emoji: '🌱', label: 'Peppermint', variant: 'success' },
  { emoji: '🌳', label: 'Frankincense', variant: 'apricot' },
  { emoji: '🌹', label: 'Rose blend', variant: 'rose' },
  { emoji: '💧', label: 'Diffuser', variant: 'lavender' },
  { emoji: '🧴', label: 'Roll-on', variant: 'neutral' },
  { emoji: '🌾', label: 'Single note', variant: 'outline' },
  { emoji: '✅', label: 'Therapeutic grade', variant: 'success' },
  { emoji: '🐝', label: 'Ethically sourced', variant: 'apricot' },
  { emoji: '⚠️', label: 'Dilute first', variant: 'warning' },
];

export const BADGES_COACHING: BadgeSpec[] = [
  { emoji: '🎓', label: 'Course', variant: 'lavender' },
  { emoji: '🧭', label: '1:1 sessions', variant: 'rose' },
  { emoji: '🌅', label: 'Group program', variant: 'apricot' },
  { emoji: '📚', label: 'Self-paced', variant: 'lavender' },
  { emoji: '🏅', label: 'Certified', variant: 'apricot' },
  { emoji: '📈', label: 'Beginner', variant: 'success' },
  { emoji: '🚀', label: 'Advanced', variant: 'rose' },
  { emoji: '🪴', label: 'In progress', variant: 'warning' },
  { emoji: '🎉', label: 'Completed', variant: 'success' },
  { emoji: '🔓', label: 'Enrolled', variant: 'neutral' },
  { emoji: '📝', label: 'Worksheet', variant: 'outline' },
];

export const BADGES_COMMUNITY: BadgeSpec[] = [
  { emoji: '🤝', label: 'Member', variant: 'success' },
  { emoji: '💎', label: 'Inner circle', variant: 'lavender' },
  { emoji: '⭐', label: 'Founding member', variant: 'apricot' },
  { emoji: '🌸', label: 'Free tier', variant: 'outline' },
  { emoji: '🔑', label: 'All-access', variant: 'rose' },
  { emoji: '🛡️', label: 'Moderator', variant: 'lavender' },
  { emoji: '💬', label: 'Active', variant: 'success' },
  { emoji: '👋', label: 'New here', variant: 'apricot' },
  { emoji: '🔔', label: 'Invite only', variant: 'warning' },
  { emoji: '🏡', label: 'Community', variant: 'neutral' },
];

export const BADGES_EVENTS: BadgeSpec[] = [
  { emoji: '🔴', label: 'Live', variant: 'error' },
  { emoji: '📺', label: 'Webinar', variant: 'lavender' },
  { emoji: '🗓️', label: 'Upcoming', variant: 'lavender' },
  { emoji: '▶️', label: 'Replay', variant: 'neutral' },
  { emoji: '🎟️', label: 'Free entry', variant: 'success' },
  { emoji: '🏷️', label: 'Early bird', variant: 'apricot' },
  { emoji: '🔥', label: 'Almost full', variant: 'warning' },
  { emoji: '🚪', label: 'Sold out', variant: 'error' },
  { emoji: '🧑‍🏫', label: 'Workshop', variant: 'rose' },
  { emoji: '🌐', label: 'In person', variant: 'apricot' },
  { emoji: '📝', label: 'RSVP', variant: 'outline' },
];

export const BADGES_SOCIAL: BadgeSpec[] = [
  { emoji: '📸', label: 'Instagram', variant: 'rose' },
  { emoji: '🎵', label: 'TikTok', variant: 'lavender' },
  { emoji: '📰', label: 'Newsletter', variant: 'apricot' },
  { emoji: '📌', label: 'Pinterest', variant: 'error' },
  { emoji: '🎬', label: 'Reel', variant: 'lavender' },
  { emoji: '📣', label: 'Campaign', variant: 'apricot' },
  { emoji: '🗓️', label: 'Scheduled', variant: 'warning' },
  { emoji: '🚀', label: 'Published', variant: 'success' },
  { emoji: '🤝', label: 'Collab', variant: 'lavender' },
  { emoji: '📊', label: 'Trending', variant: 'neutral' },
  { emoji: '📝', label: 'Draft', variant: 'outline' },
];

export const BADGES_COMMERCE: BadgeSpec[] = [
  { emoji: '🛒', label: 'In stock', variant: 'success' },
  { emoji: '🏷️', label: 'On sale', variant: 'apricot' },
  { emoji: '✨', label: 'Bestseller', variant: 'apricot' },
  { emoji: '🆕', label: 'Just landed', variant: 'lavender' },
  { emoji: '📦', label: 'Bundle', variant: 'rose' },
  { emoji: '🔄', label: 'Subscription', variant: 'lavender' },
  { emoji: '⏰', label: 'Low stock', variant: 'warning' },
  { emoji: '🚫', label: 'Sold out', variant: 'error' },
  { emoji: '🚚', label: 'Free shipping', variant: 'success' },
  { emoji: '💳', label: 'Pre-order', variant: 'neutral' },
  { emoji: '🎁', label: 'Gift card', variant: 'outline' },
];

/* ── Overview snapshots ────────────────────────────────────────────────── */
export interface OverviewCard {
  /** the reference group, shown as the badge on the photos */
  group: string;
  title: string;
  /** where it lives: "Foundations · Tokens" */
  meta: string;
  description: string;
  figure: { value: string; label: string };
  /** section id the Open action scrolls to */
  section: string;
  /** background library files (landscape), shown as the carousel */
  images: string[];
}

const bg = (name: string) => `/backgrounds/nature-${name}-landscape.png`;

export const OVERVIEW_CARDS: OverviewCard[] = [
  { group: 'Start', title: 'The design and brand reference', meta: 'Start · Checklist', description: 'Calm, minimal and open. Built for AI agents first and people second.', figure: { value: '16', label: 'pre-asset checks' }, section: 'checklist', images: [bg('peach-lavender-misty-mountains-sunrise'), bg('lavender-peach-seascape-birds-flock'), bg('pink-grey-misty-rocky-peaks')] },
  { group: 'Foundations', title: 'Two tones and picture tiles', meta: 'Foundations · Headlines', description: 'Every H1 leads in dark ink, finishes in warm grey and shows its point in pictures.', figure: { value: '2 to 3', label: 'tiles per H1' }, section: 'headlines', images: [bg('cream-peach-pampas-soft-seedheads'), bg('purple-pink-pampas-mountains-twilight'), bg('peach-pink-ocean-sunset-waves')] },
  { group: 'Foundations', title: 'Three colours, three shades', meta: 'Foundations · Tokens', description: 'Rose, apricot and lavender at 400, 200 and 50. Apricot is the one interactive accent.', figure: { value: '9', label: 'brand shades' }, section: 'tokens', images: [bg('lavender-purple-hydrangea-pastel-haze'), bg('purple-lavender-field-wooden-post'), bg('blue-purple-dreamy-dandelion-haze')] },
  { group: 'Foundations', title: 'Light and paper', meta: 'Foundations · Tokens', description: 'The same colours and components on clean white or warm ivory. There is no dark theme.', figure: { value: '2', label: 'themes' }, section: 'tokens', images: [bg('purple-pink-billowing-cumulus-clouds'), bg('purple-pink-gradient-sky-bokeh'), bg('pink-purple-crescent-moon-grass')] },
  { group: 'Foundations', title: 'The mark and the long logo', meta: 'Foundations · Logo', description: 'The OS mark on its own, and the long logo on a white or a filled background.', figure: { value: '3', label: 'logo files' }, section: 'logo', images: [bg('purple-pink-snowy-peaks-contrail'), bg('peach-lavender-misty-mountains-sunrise'), bg('lavender-peach-seascape-birds-flock')] },
  { group: 'Foundations', title: 'Motion on by default', meta: 'Foundations · Motion', description: 'Calm and flowing, with a token for every duration and easing.', figure: { value: '5', label: 'durations' }, section: 'motion', images: [bg('peach-pink-ocean-sunset-waves'), bg('purple-pink-billowing-cumulus-clouds'), bg('cream-peach-pampas-soft-seedheads')] },
  { group: 'Library', title: 'One button colour', meta: 'Library · Buttons', description: 'Primary, secondary and text, all resting on soft apricot with ink text.', figure: { value: '3', label: 'button styles' }, section: 'buttons', images: [bg('pink-peach-dusk-tree-streetlights'), bg('gold-amber-backlit-wildflowers-haze'), bg('peach-pink-ocean-sunset-waves')] },
  { group: 'Library', title: 'Cards for every job', meta: 'Library · Cards', description: 'Content, feature, service, pricing, resource, action, session, profile and steps.', figure: { value: '9', label: 'card types' }, section: 'card-bento', images: [bg('pink-purple-crescent-moon-grass'), bg('purple-lavender-field-wooden-post'), bg('purple-pink-gradient-sky-bokeh')] },
  { group: 'Library', title: 'A bento in three styles', meta: 'Library · Cards', description: 'One feature grid you can set as photo-led, tinted or quiet.', figure: { value: '3', label: 'bento styles' }, section: 'card-bento', images: [bg('pink-grey-misty-rocky-peaks'), bg('purple-pink-snowy-peaks-contrail'), bg('purple-pink-pampas-mountains-twilight')] },
  { group: 'Library', title: 'A working widget library', meta: 'Library · Widgets', description: 'Every widget takes real data and animates as it comes into view.', figure: { value: '31', label: 'widgets' }, section: 'widgets', images: [bg('blue-purple-dreamy-dandelion-haze'), bg('lavender-purple-hydrangea-pastel-haze'), bg('purple-pink-billowing-cumulus-clouds')] },
  { group: 'Applied', title: 'Every image tagged', meta: 'Applied · Image library', description: 'Context tags and one suggested use on every file, with nothing guessed about origin.', figure: { value: '169', label: 'images' }, section: 'imagery', images: [bg('gold-amber-backlit-wildflowers-haze'), bg('cream-peach-pampas-soft-seedheads'), bg('lavender-peach-seascape-birds-flock')] },
];

/* ── Marketing example content (signature sections, live page) ────────── */
export interface NavLink {
  label: string;
  href: string;
}
export const NAV_LINKS: NavLink[] = [
  { label: 'Platform', href: '#platform' },
  { label: 'Compare', href: '#compare' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Resources', href: '#resources' },
];

export const COMMANDS: string[] = [
  'set up online booking',
  'import my client list',
  'build a course',
  'count my current tools',
];

export interface Pillar {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
}
export const PILLARS: Pillar[] = [
  { title: 'Consolidate', description: 'Booking, clients, courses, content and sales in one system, so the stack of subscriptions can go.', icon: Layers, accent: 'rose' },
  { title: 'Clarity', description: 'One view of what is booked, what is owed and what needs you today.', icon: LineChart, accent: 'lavender' },
  { title: 'Control', description: 'Your clients and your data in one place, with workflows running in the background.', icon: ShieldCheck, accent: 'apricot' },
  { title: 'Consistency', description: 'Every client gets the same welcome and the same follow-up, whoever is working that day.', icon: Sparkles, accent: 'rose' },
];

export interface BentoItem {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
  span: 1 | 2 | 3;
}
export const BENTO_ITEMS: BentoItem[] = [
  { title: 'Done-for-you setup', description: 'We move your tools, rebuild your workflows and hand over a system that already runs.', icon: Wrench, accent: 'rose', span: 2 },
  { title: 'Enquiries answered', description: 'New enquiries get a reply and a next step while you are with a client.', icon: Megaphone, accent: 'lavender', span: 1 },
  { title: 'Onboarding without the chasing', description: 'Forms, welcome and first booking go out in order, without a reminder from you.', icon: CalendarClock, accent: 'apricot', span: 1 },
  { title: 'One clear view', description: 'Bookings, revenue and the day ahead, in plain language, on one screen.', icon: LineChart, accent: 'rose', span: 2 },
];

export interface CompareRow {
  feature: string;
  stack: string;
  healthos: string;
}
export const COMPARE_ROWS: CompareRow[] = [
  { feature: 'Online booking and reminders', stack: 'A separate subscription', healthos: 'Included' },
  { feature: 'Client records and pipeline', stack: 'A second tool', healthos: 'Included' },
  { feature: 'Courses and memberships', stack: 'A third platform', healthos: 'Included' },
  { feature: 'Email and follow-up', stack: 'Another login', healthos: 'Included' },
  { feature: 'One place to see it all', stack: 'Spread across tabs', healthos: 'One dashboard' },
  { feature: 'Setup and migration', stack: 'Your weekends', healthos: 'Done for you' },
];

export interface FooterColumn {
  heading: string;
  links: string[];
}
export const FOOTER_COLUMNS: FooterColumn[] = [
  { heading: 'Platform', links: ['Booking', 'Clients', 'Courses', 'Marketing', 'Sales'] },
  { heading: 'Company', links: ['Pricing', 'Compare', 'Contact', 'Book the walkthrough'] },
  { heading: 'Resources', links: ['Blog', 'Start the check', 'Help centre'] },
  { heading: 'Legal', links: ['Privacy', 'Terms', 'Refunds'] },
];
