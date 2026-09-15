/**
 * The Health OS email library: 46 emails in 10 series, written from db-health-os.
 *
 *   EMAIL_SERIES   every series, marketing first, in the order the library lists them
 *   EMAILS         every email, in series then step order
 *   fieldsFor(e)   the merge fields an email can use: GLOBAL_FIELDS plus its own
 *
 * Nothing here sends. Marketing emails wait for a list with a recorded consent basis; service
 * emails go to signed clients. Every email lists the open decisions it depends on in `open`.
 */
import { MARKETING_EMAILS, MARKETING_SERIES } from './marketing';
import { CUSTOMER_EMAILS, CUSTOMER_SERIES } from './customers';
import type { Email, EmailField, EmailSeries } from './types';

export type { Email, EmailBlock, EmailField, EmailGroup, EmailKind, EmailLayout, EmailSeries, NewsletterSeo } from './types';

/** Merge fields every email can use. Samples are illustrative, never real people. */
export const GLOBAL_FIELDS: Record<string, EmailField> = {
  first_name: { label: 'First name', sample: 'Nadia' },
  business_name: { label: 'Business name', sample: 'Salt Room Studio' },
  unsubscribe_link: { label: 'Unsubscribe link', sample: 'https://link.teamos.ai/unsubscribe', hint: 'The platform fills this. Every marketing email needs a working one' },
};

/** The sender block from db-health-os production layer. Complete as it stands. */
export const SENDER_BLOCK = ['OS A.I', 'Wyndham Village Shopping Centre, PO Box 8439, Tarneit VIC 3029', 'hello@oscale.ai'];

export const EMAIL_SERIES: EmailSeries[] = [...MARKETING_SERIES, ...CUSTOMER_SERIES];

export const EMAILS: Email[] = [...MARKETING_EMAILS, ...CUSTOMER_EMAILS];

export const EMAIL_BY_ID: Record<string, Email> = Object.fromEntries(EMAILS.map((e) => [e.id, e]));

export const SERIES_BY_ID: Record<string, EmailSeries> = Object.fromEntries(EMAIL_SERIES.map((s) => [s.id, s]));

export const emailsInSeries = (seriesId: string) => EMAILS.filter((e) => e.series === seriesId).sort((a, b) => a.step - b.step);

export const fieldsFor = (email: Email): Record<string, EmailField> => ({ ...GLOBAL_FIELDS, ...email.fields });

/** "Lead nurture · Founder-Dependence Score" */
export const seriesLabel = (s: EmailSeries) => (s.detail && s.name === 'Lead nurture' ? `${s.name} · ${s.detail}` : s.name);
