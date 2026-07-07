/**
 * Image library — buckets + CSS background washes (drafts).
 * Photography direction is calm, real and warm (practitioners and clients, never
 * stock-smiley). Until shoots land, the washes below stand in: gradient + glow
 * families built only from the locked apricot/rose/lavender tokens, with grain.
 */
import { UserRound, HeartHandshake, Building2, Sparkle, MonitorSmartphone, Palette, type LucideIcon } from 'lucide-react';
import type { Accent } from '@/lib/accents';
import { APRICOT, ROSE, LAVENDER, PAPER_IVORY, CARBON } from '@/lib/palette';

/* ── Background washes (drafts) — built from the signature gradient family ── */
export interface Wash {
  name: string;
  /** CSS background value (gradient/glow from brand tokens) */
  background: string;
  note: string;
}
export const WASHES: Wash[] = [
  { name: 'Sunrise', background: `linear-gradient(135deg, ${APRICOT[50]} 0%, ${ROSE[50]} 100%)`, note: 'apricot → rose, warmest' },
  { name: 'Bloom', background: `linear-gradient(135deg, ${ROSE[50]} 0%, ${LAVENDER[50]} 100%)`, note: 'rose → lavender' },
  { name: 'Lavender haze', background: `linear-gradient(135deg, ${LAVENDER[50]} 0%, ${APRICOT[50]} 100%)`, note: 'lavender → apricot' },
  { name: 'Ivory mist', background: `radial-gradient(120% 120% at 30% 10%, ${ROSE[50]} 0%, ${PAPER_IVORY} 55%)`, note: 'faint glow on ivory' },
  { name: 'Signature', background: `linear-gradient(135deg, ${APRICOT[400]} 0%, ${ROSE[400]} 50%, ${LAVENDER[400]} 100%)`, note: 'full gradient — use sparingly' },
  { name: 'Carbon', background: `linear-gradient(135deg, #2E2E2E 0%, ${CARBON} 100%)` /* #2E2E2E = carbon-700 */, note: 'dark panels / footer' },
];

/* ── Photography buckets ────────────────────────────────── */
export interface ImageBucket {
  name: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
  /** index into WASHES used as the draft placeholder */
  wash: number;
}
export const IMAGE_BUCKETS: ImageBucket[] = [
  { name: 'Practitioners at work', description: 'Calm, real moments of practitioners in their element — focused, unhurried, never staged.', icon: UserRound, accent: 'rose', wash: 0 },
  { name: 'Client care', description: 'Warm one-to-one moments. Trust and attention, shot close and soft.', icon: HeartHandshake, accent: 'lavender', wash: 1 },
  { name: 'Calm spaces', description: 'Studios, clinics and rooms with light and air. The texture of a considered practice.', icon: Building2, accent: 'apricot', wash: 2 },
  { name: 'Details & hands', description: 'Close, tactile detail — hands, tools, notes. The craft up close.', icon: Sparkle, accent: 'gold', wash: 3 },
  { name: 'Product in context', description: 'Health OS on a laptop or phone, on a real desk. Quiet, never a hard sell.', icon: MonitorSmartphone, accent: 'rose', wash: 4 },
  { name: 'Brand washes', description: 'Abstract gradient + glow fields for when a photo would be too loud.', icon: Palette, accent: 'lavender', wash: 5 },
];
