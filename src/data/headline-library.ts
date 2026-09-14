/**
 * The headline library: twenty ready headlines, written in the Headline markup ([accent word]
 * and {tile}). Each maps to one messaging pillar from the Health OS database
 * (04-voice-and-messaging/messaging-pillars.md) and says where it came from, so a verified line
 * is never mistaken for a new one. New and adapted lines follow the copywriting rules: one idea,
 * the business rather than health, no numbers, no banned words. Check a line against the
 * database before it goes live.
 */

export type HeadlinePillar = 'The bottleneck' | 'One system' | 'Steady, not stop-start' | 'Standard';

export const HEADLINE_PILLARS: HeadlinePillar[] = ['The bottleneck', 'One system', 'Steady, not stop-start', 'Standard'];

export interface LibraryHeadline {
  /** Headline markup: [accent word] and {tile} */
  text: string;
  pillar: HeadlinePillar;
  /** where it works best */
  use: string;
  /** where the line comes from */
  from: string;
}

export const HEADLINE_LIBRARY: LibraryHeadline[] = [
  { text: 'You [built] {blocks} it. Now make it run {computer} without you.', pillar: 'The bottleneck', use: 'Homepage hero', from: 'Verified core brand message' },
  { text: 'Stop being the bottleneck in the [business] {briefcase} you built.', pillar: 'The bottleneck', use: 'Landing page hero', from: 'Adapted from a verified persona headline' },
  { text: 'Your [time] {pocket-watch} belongs to the clients who booked it.', pillar: 'The bottleneck', use: 'Landing page section', from: 'New' },
  { text: 'More [space] {ringed-planet} in the week for the work only you can do.', pillar: 'The bottleneck', use: 'Email header', from: 'New' },
  { text: 'One [system] {computer} instead of eight {tools} tools.', pillar: 'One system', use: 'Ad or landing page', from: 'Adapted from a verified pillar line' },
  { text: 'Eight logins. Eight bills. One [dashboard] {gauge} for all of it.', pillar: 'One system', use: 'Landing page section', from: 'Adapted from a hook in the content bank' },
  { text: 'Every client, booking and message [connected] {cables} in one place.', pillar: 'One system', use: 'Homepage section', from: 'New' },
  { text: 'A [CRM] {card-index} that follows up while you are with a client.', pillar: 'One system', use: 'Feature page', from: 'New' },
  { text: '[Bookings] {desk-calendar} that confirm themselves.', pillar: 'One system', use: 'Feature page', from: 'Existing product copy' },
  { text: '[Automation] {gears} for the follow-up between sessions.', pillar: 'Steady, not stop-start', use: 'Feature page', from: 'New' },
  { text: 'Finally, [clients] {coffee-cups} coming in every week instead of in waves.', pillar: 'Steady, not stop-start', use: 'Hero or email subject', from: 'Verified business plan line' },
  { text: 'Feast or famine is a [pipeline] {copper-pipes} problem, not a demand problem.', pillar: 'Steady, not stop-start', use: 'Blog or social', from: 'Adapted from a verified pillar line' },
  { text: 'Keep the [momentum] {newtons-cradle} going after a busy month.', pillar: 'Steady, not stop-start', use: 'Newsletter', from: 'Adapted from a hook in the content bank' },
  { text: 'Every [lead] {horseshoe-magnet} answered, even at nine at night.', pillar: 'Steady, not stop-start', use: 'Ad', from: 'Adapted from a hook in the content bank' },
  { text: '[Retention] {rope-knot} that does not rely on your memory.', pillar: 'Steady, not stop-start', use: 'Feature page', from: 'New' },
  { text: 'A [platform] {plinth} built for operators, not beginners.', pillar: 'Standard', use: 'Brand page', from: 'Adapted from a verified persona headline' },
  { text: 'Notes for a [calm] {stones} practice that runs {computer} on its own.', pillar: 'Standard', use: 'Blog index', from: 'Existing blog headline' },
  { text: 'Run your [studio] {yoga-mat} from one place, even between classes.', pillar: 'One system', use: 'Landing page for studios', from: 'Adapted from a verified business plan line' },
  { text: '[Clinic] {doctors-bag} admin that keeps moving while you see clients.', pillar: 'The bottleneck', use: 'Landing page for clinics', from: 'New' },
  { text: 'The [clarity] {quartz} to see what still routes through you.', pillar: 'The bottleneck', use: 'Lead magnet page', from: 'New, for the check' },
];
