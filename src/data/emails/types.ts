/**
 * The shape of the Health OS email library: series, the emails in them, and the blocks an email
 * is written in. One source for the reference site's preview, the copied HTML and the plain text.
 *
 * Text can carry merge fields as {{key}}. Every key an email uses is described in `fields` (or in
 * GLOBAL_FIELDS), with a label and a realistic sample, so the preview reads like a real send and
 * the copied HTML keeps the tags for the platform to fill.
 */

export type EmailGroup = 'Marketing' | 'Customers';

/** marketing waits for a list and a recorded consent basis; service goes to a signed client about their own account */
export type EmailKind = 'marketing' | 'service';

/** plain: a personal note, no logo. letter: logo and card. newsletter: masthead, header image, subheads. transactional: icon, facts, button */
export type EmailLayout = 'plain' | 'letter' | 'newsletter' | 'transactional';

export type EmailBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'quote'; text: string }
  | { type: 'button'; label: string; href: string }
  /** a quiet supporting line, such as the sentence under a call to action */
  | { type: 'note'; text: string }
  | { type: 'facts'; rows: [string, string][] }
  | { type: 'image'; src: string; alt: string }
  | { type: 'sign'; lines: string[] };

export interface EmailField {
  label: string;
  sample: string;
  /** how the value is found or what must be true before it is used */
  hint?: string;
}

export interface NewsletterSeo {
  /** the web version's title tag, 60 characters at most */
  title: string;
  /** 150 to 160 characters */
  description: string;
  slug: string;
  keywords: string[];
}

export interface Email {
  id: string;
  series: string;
  /** position in the series, from 1 */
  step: number;
  /** what the email does, in a few words */
  name: string;
  /** when it goes: a day, a trigger or an event */
  send: string;
  subject: string;
  /** preview text shown after the subject in the inbox */
  preview: string;
  kind: EmailKind;
  layout: EmailLayout;
  /** messaging pillar: 1 the bottleneck, 2 one system, 3 steady not stop-start */
  pillar?: 1 | 2 | 3;
  /** the one ask, or "None" */
  ask: string;
  /** the word range for this type, from the database playbook */
  length: [number, number];
  /** completes "You are receiving this because …" truthfully */
  reason: string;
  blocks: EmailBlock[];
  /** newsletter title, shown under the masthead */
  title?: string;
  /** small icon tile above a transactional title: an id in public/email/icons */
  icon?: string;
  /** header image for a newsletter edition */
  image?: { src: string; alt: string };
  seo?: NewsletterSeo;
  fields?: Record<string, EmailField>;
  /** decisions still open in the database that this email depends on */
  open?: string[];
}

export interface EmailSeries {
  id: string;
  group: EmailGroup;
  name: string;
  /** a second line in the list, such as the lead magnet's name */
  detail?: string;
  /** an icon tile id from the icon library */
  icon: string;
  summary: string;
  trigger: string;
  goal: string;
  cadence: string;
  exit: string;
  /** where the rules come from in db-health-os */
  source: string;
}
