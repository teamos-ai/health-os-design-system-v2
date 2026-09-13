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

/** How the system is built. Carbon banner, the paper-theme default. */
export const TICKER_PRINCIPLES: TickerItem[] = [
  { icon: Type, text: 'Spline Sans and Anonymous Pro' },
  { icon: Palette, text: 'Rose, apricot and lavender' },
  { icon: SunMedium, text: 'Light and paper themes' },
  { icon: Shapes, text: 'Tokens first, always' },
  { icon: Blend, text: 'Three gradients, used sparingly' },
];

/** The feel. Tint banner. */
export const TICKER_CRAFT: TickerItem[] = [
  { icon: Waves, text: 'Calm, minimal, open' },
  { icon: Sparkles, text: 'Motion on by default' },
  { icon: LayoutGrid, text: 'Six card types' },
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
  emoji: string;
  badge: string;
  title: string;
  lines: string[];
  accent: Accent;
}

export const OVERVIEW_CARDS: OverviewCard[] = [
  { emoji: '✨', badge: 'Essence', accent: 'rose', title: 'The design and brand reference', lines: ['Calm, minimal, open', 'Built for AI agents first, people second'] },
  { emoji: '📄', badge: 'Themes', accent: 'lavender', title: 'Light and paper', lines: ['Light: a clean white ground', 'Paper: warm ivory, like reading paper', 'Same colours and components in both'] },
  { emoji: '🎨', badge: 'Colour', accent: 'apricot', title: 'Three colours, three shades', lines: ['Rose, apricot and lavender', '50 soft, 400 base, 700 deep', 'Neutrals and status colours kept apart'] },
  { emoji: '🌅', badge: 'Gradients', accent: 'rose', title: 'Three gradients', lines: ['Signature, soft wash, warm sunrise', 'Behind type or in one button', 'Never on every surface'] },
  { emoji: '🔤', badge: 'Type', accent: 'lavender', title: 'Three roles and a label', lines: ['Heading and subheading: Spline Sans', 'Body and label: Anonymous Pro', 'One weight per role'] },
  { emoji: '🔘', badge: 'Buttons', accent: 'apricot', title: 'Three button styles', lines: ['Primary, secondary, text', 'Default and small sizes', 'Loading and disabled for each'] },
  { emoji: '🗂️', badge: 'Cards', accent: 'rose', title: 'Six card types', lines: ['Content, feature, service', 'Pricing, resource, action'] },
  { emoji: '📊', badge: 'Widgets', accent: 'lavender', title: 'A full widget library', lines: ['Every widget does a real job', 'Experimental ones are labelled', 'Animated as they come into view'] },
  { emoji: '🌊', badge: 'Motion', accent: 'apricot', title: 'Motion on by default', lines: ['Calm and flowing', 'Open to new moments', 'Reduced-motion safe'] },
  { emoji: '🖼️', badge: 'Imagery', accent: 'rose', title: 'Every image tagged', lines: ['Context tags on each file', 'One suggested use for each', 'Nothing guessed about origin'] },
  { emoji: '📐', badge: 'Spacing', accent: 'lavender', title: 'An 8px rhythm', lines: ['4px steps for tight spots', 'The same spacing in both themes'] },
  { emoji: '✅', badge: 'Approval', accent: 'apricot', title: 'One final say', lines: ['Tumai approves every exception', 'Exceptions need a defined need'] },
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
