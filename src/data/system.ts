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
  type LucideIcon,
} from 'lucide-react';
import type { Accent } from '@/lib/accents';

/* ── Top ticker (Cherry Note) ───────────────────────────── */
export interface TickerItem {
  icon: LucideIcon;
  text: string;
}
export const TICKER_ITEMS: TickerItem[] = [
  { icon: Layers, text: 'Six to eight tools, now one system' },
  { icon: Clock, text: '10–15 hours returned each week' },
  { icon: Rocket, text: 'Live in 30 days' },
  { icon: HeartPulse, text: 'Built for practitioners and their clients' },
  { icon: Wrench, text: 'Done-with-you setup' },
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

/* ── Command chips (efficient.app `/command`) ───────────── */
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
