/**
 * Demo content for the Health OS v2 showcase + signature sections.
 * Calm Sage voice, Australian English, sentence case, "practitioners" / "clients".
 * All copy lives here so sections stay structural and nothing drifts off-brand.
 */
import {
  CalendarCheck,
  Users,
  GraduationCap,
  CalendarClock,
  Megaphone,
  TrendingUp,
  LayoutTemplate,
  Settings2,
  Layers,
  Clock,
  Rocket,
  HeartPulse,
  Wrench,
  Sparkles,
  LineChart,
  ShieldCheck,
  Type,
  Palette,
  Accessibility,
  Feather,
  Search,
  LayoutGrid,
  GalleryHorizontalEnd,
  Gem,
  type LucideIcon,
} from 'lucide-react';
import type { Accent } from '@/lib/accents';

/* ── Tickers (scrolling banners) ────────────────────────── */
export interface TickerItem {
  icon: LucideIcon;
  text: string;
}

/** Outcome facts — the default top banner */
export const TICKER_ITEMS: TickerItem[] = [
  { icon: Layers, text: 'Six to eight tools, now one system' },
  { icon: Clock, text: '10–15 hours returned each week' },
  { icon: Rocket, text: 'Live in 30 days' },
  { icon: HeartPulse, text: 'Built for practitioners and their clients' },
  { icon: Wrench, text: 'Done-with-you setup' },
];

/** Design principles — for a carbon banner variant */
export const TICKER_PRINCIPLES: TickerItem[] = [
  { icon: Type, text: 'Spline Sans + Anonymous Pro' },
  { icon: Palette, text: 'Warm ivory · carbon · rose' },
  { icon: Accessibility, text: 'WCAG AA throughout' },
  { icon: Layers, text: 'Fully tokenised, zero glass' },
  { icon: Feather, text: 'Sentence case, calm Sage voice' },
];

/** The craft — for a tinted banner variant */
export const TICKER_CRAFT: TickerItem[] = [
  { icon: Search, text: 'Command-palette hero' },
  { icon: GalleryHorizontalEnd, text: 'Tool-card carousel' },
  { icon: LayoutGrid, text: 'Bento feature grid' },
  { icon: Sparkles, text: 'Soft radial glows' },
  { icon: Gem, text: 'Premium, flat, warm' },
];

/* ── Showcase hero ──────────────────────────────────────── */
export const SHOWCASE_COMMANDS: string[] = [
  'browse the components',
  'copy a token',
  'switch the theme',
  'open the live page',
  'view on github',
];

/* ── Badges — emoji + soft pastel tints (health & wellness) ── */
export type BadgeVariant =
  | 'brand'
  | 'apricot'
  | 'lavender'
  | 'gold'
  | 'success'
  | 'warn'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'outline';

export interface BadgeSpec {
  emoji: string;
  label: string;
  variant: BadgeVariant;
}

/** Status badges */
export const BADGES_STATUS: BadgeSpec[] = [
  { emoji: '🟢', label: 'Live', variant: 'success' },
  { emoji: '✅', label: 'Active', variant: 'success' },
  { emoji: '⏳', label: 'Pending', variant: 'warn' },
  { emoji: '⚠️', label: 'Overdue', variant: 'danger' },
  { emoji: '🆕', label: 'New', variant: 'lavender' },
  { emoji: '⭐', label: 'Premium', variant: 'gold' },
  { emoji: '📝', label: 'Draft', variant: 'outline' },
];

/* ── Overview cards (gentle left-scrolling snapshots) ───── */
export interface OverviewCard {
  emoji: string;
  badge: string;
  title: string;
  lines: string[];
  accent: Accent;
}
export const OVERVIEW_CARDS: OverviewCard[] = [
  { emoji: '✨', badge: 'Essence', accent: 'rose', title: 'The Health OS Design System', lines: ['Warm, flat, premium, calm', 'One locked, considered system'] },
  { emoji: '🌓', badge: 'Themes', accent: 'lavender', title: 'Three grounds, one system', lines: ['Light — clean white', 'Paper — warm ivory', 'Dark — carbon, warm off-white text'] },
  { emoji: '🔒', badge: 'Locked', accent: 'rose', title: 'What stays ours', lines: ['Warm ivory + carbon + rose', 'Spline Sans + Anonymous Pro', 'Sentence case, zero glass, AA'] },
  { emoji: '🎨', badge: 'Colour', accent: 'apricot', title: 'Warm multi-hue', lines: ['Rose primary · apricot · lavender · gold', 'rose-600 for white text (AA)', 'Gradient used with restraint'] },
  { emoji: '🔤', badge: 'Type', accent: 'lavender', title: 'Two voices', lines: ['Spline Sans — headings (600/700)', 'Anonymous Pro — mono body, 1.6', 'Sentence case everywhere'] },
  { emoji: '🗣️', badge: 'Voice', accent: 'gold', title: 'Calm Sage advisor', lines: ['Outcome first, no hype', 'Australian English', '“Practitioners” and “clients”'] },
  { emoji: '✅', badge: 'Do', accent: 'apricot', title: 'Always', lines: ['Use the tokens', '8px max radius, soft neutral shadows', 'Honour reduced motion'] },
  { emoji: '🚫', badge: 'Don’t', accent: 'rose', title: 'Never', lines: ['No glassmorphism', 'No pure white/black or pink-red', 'No all-caps, no bounce'] },
  { emoji: '💠', badge: 'Logo', accent: 'lavender', title: 'The OS mark', lines: ['Gradient tile, on its own', 'No wordmark beside it', 'Minimum 16px'] },
  { emoji: '📐', badge: 'Shape', accent: 'gold', title: 'Squircles only', lines: ['8px global maximum', 'Flat + 1px hairline', 'No pills, no circles'] },
  { emoji: '🌊', badge: 'Motion', accent: 'apricot', title: 'Quiet by default', lines: ['150–250ms interactions', 'Reveals 300–400ms, ≤500ms', 'Fade, glow, marquee, count-up'] },
  { emoji: '♿', badge: 'Access', accent: 'lavender', title: 'AA throughout', lines: ['WCAG AA contrast', 'Branded focus rings', 'prefers-reduced-motion safe'] },
];

/** Wellness tags */
export const BADGES_WELLNESS: BadgeSpec[] = [
  { emoji: '🌿', label: 'Wellness', variant: 'success' },
  { emoji: '🧘', label: 'Mindful', variant: 'lavender' },
  { emoji: '💗', label: 'Self-care', variant: 'brand' },
  { emoji: '☀️', label: 'Energy', variant: 'apricot' },
  { emoji: '💧', label: 'Hydration', variant: 'info' },
  { emoji: '🌙', label: 'Rest', variant: 'lavender' },
  { emoji: '🍃', label: 'Calm', variant: 'success' },
  { emoji: '🌸', label: 'Bloom', variant: 'brand' },
  { emoji: '🔥', label: 'Streak', variant: 'apricot' },
  { emoji: '🩺', label: 'Practitioner', variant: 'info' },
];

/* ── Nav ────────────────────────────────────────────────── */
export interface NavLink {
  label: string;
  href: string;
}
export const NAV_LINKS: NavLink[] = [
  { label: 'Platform', href: '#platform' },
  { label: 'Compare', href: '#compare' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Resources', href: '#resources' },
  { label: 'About', href: '#about' },
];

/* ── Command chips (the `/command` palette) ─────────────── */
export const COMMANDS: string[] = [
  'set up online booking',
  'import my client list',
  'build a course',
  'schedule this month’s content',
  'compare with my current stack',
  'go live in 30 days',
];

/* ── Tools Health OS replaces (carousel) ────────────────── */
export interface Tool {
  name: string;
  meta: string;
  icon: LucideIcon;
  accent: Accent;
}
export const TOOLS: Tool[] = [
  { name: 'Booking & calendar', meta: 'Scheduling + reminders', icon: CalendarCheck, accent: 'rose' },
  { name: 'Client CRM', meta: 'Records + pipeline', icon: Users, accent: 'lavender' },
  { name: 'Course builder', meta: 'Programs + memberships', icon: GraduationCap, accent: 'apricot' },
  { name: 'Content scheduler', meta: 'Plan + publish', icon: CalendarClock, accent: 'rose' },
  { name: 'Marketing & email', meta: 'Nurture + broadcasts', icon: Megaphone, accent: 'gold' },
  { name: 'Sales & funnels', meta: 'Funnels + checkout', icon: TrendingUp, accent: 'lavender' },
  { name: 'Site & funnel builder', meta: 'Pages that convert', icon: LayoutTemplate, accent: 'apricot' },
  { name: 'Operations', meta: 'The admin behind it all', icon: Settings2, accent: 'ink' },
];

/* ── Outcome stats (Trusted-by band) ────────────────────── */
export interface OutcomeStat {
  value?: number;
  display?: string;
  label: string;
  prefix?: string;
  suffix?: string;
}
export const OUTCOME_STATS: OutcomeStat[] = [
  { display: '6–8 → 1', label: 'tools consolidated into one' },
  { value: 12, suffix: ' hrs', label: 'returned to you each week' },
  { value: 30, suffix: ' days', label: 'from sign-up to live' },
  { display: '1', label: 'login, one source of truth' },
];

/* ── Four pillars (Features) ────────────────────────────── */
export interface Pillar {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
}
export const PILLARS: Pillar[] = [
  {
    number: '01',
    title: 'Consolidate',
    description: 'Bring booking, clients, courses, content and sales into one calm system — and retire the stack of subscriptions.',
    icon: Layers,
    accent: 'rose',
  },
  {
    number: '02',
    title: 'Clarity',
    description: 'One dashboard shows what is booked, what is owed and what needs you today. No more guessing across tabs.',
    icon: LineChart,
    accent: 'lavender',
  },
  {
    number: '03',
    title: 'Control',
    description: 'Your data, your clients, your terms. Workflows run quietly in the background so nothing slips through.',
    icon: ShieldCheck,
    accent: 'apricot',
  },
  {
    number: '04',
    title: 'Consistency',
    description: 'Every client gets the same considered welcome, the same follow-up, the same care — automatically.',
    icon: Sparkles,
    accent: 'gold',
  },
];

/* ── Bento ("What Health OS runs") ──────────────────────── */
export interface BentoItem {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
  /** column span on lg grid (1–3) */
  span: 1 | 2 | 3;
}
export const BENTO_ITEMS: BentoItem[] = [
  {
    title: 'Done-with-you setup',
    description: 'We migrate your tools, rebuild your workflows and hand you a system that already works on day one.',
    icon: Wrench,
    accent: 'rose',
    span: 2,
  },
  {
    title: 'Lead & nurture engine',
    description: 'Enquiries are captured, answered and warmed automatically until they are ready to book.',
    icon: Megaphone,
    accent: 'lavender',
    span: 1,
  },
  {
    title: 'Onboarding on autopilot',
    description: 'New clients get the forms, the welcome and the first appointment without you lifting a finger.',
    icon: HeartPulse,
    accent: 'apricot',
    span: 1,
  },
  {
    title: 'One clear dashboard',
    description: 'Bookings, revenue and the day ahead — the whole practice at a glance, in plain language.',
    icon: LineChart,
    accent: 'gold',
    span: 2,
  },
];

/* ── Directory / comparison ─────────────────────────────── */
export interface CompareRow {
  feature: string;
  stack: string;
  healthos: string;
}
export const COMPARE_ROWS: CompareRow[] = [
  { feature: 'Online booking & reminders', stack: 'Separate subscription', healthos: 'Included' },
  { feature: 'Client records & pipeline', stack: 'A second tool', healthos: 'Included' },
  { feature: 'Courses & memberships', stack: 'A third platform', healthos: 'Included' },
  { feature: 'Email & nurture', stack: 'Yet another login', healthos: 'Included' },
  { feature: 'Funnels & checkout', stack: 'Patched together', healthos: 'Included' },
  { feature: 'One source of truth', stack: 'Scattered across tabs', healthos: 'One dashboard' },
  { feature: 'Setup & migration', stack: 'Your weekends', healthos: 'Done with you' },
];

/* ── Footer ─────────────────────────────────────────────── */
export interface FooterColumn {
  heading: string;
  links: string[];
}
export const FOOTER_COLUMNS: FooterColumn[] = [
  { heading: 'Platform', links: ['All-in-one', 'Booking', 'Client CRM', 'Course builder', 'Marketing', 'Sales & funnels'] },
  { heading: 'Company', links: ['About', 'Pricing', 'Compare', 'Contact', 'Book a demo'] },
  { heading: 'Resources', links: ['Discover', 'Blog', 'Take the quiz', 'Help centre'] },
  { heading: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
];
