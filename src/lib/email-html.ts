/**
 * Email output: the HTML, the plain text and the word count for an email from the library.
 *
 * The HTML is built for inboxes, not browsers: one 600px table, inline styles, a hidden preview
 * line, a button made of a table cell, and one media query for phones. The reference site shows
 * this exact HTML in its preview frame, so what you see is what you copy.
 *
 *   renderEmailHtml(email, { base: 'https://ds-healthos.vercel.app', fields: 'sample' })
 *   renderEmailText(email, { fields: 'tags' })
 *
 * Fields: 'sample' fills {{tags}} with each field's sample, 'tags' keeps them for the platform
 * to fill. `highlight` marks filled or kept fields so they stand out in the preview; leave it off
 * for anything that is going into a platform. Colours come from the palette tokens; fonts fall
 * back to system faces, since most inboxes do not load web fonts.
 */
import { APRICOT, ERROR, INK, PAPER_IVORY, WHITE } from '@/lib/palette';
import { thumb } from '@/lib/images';
import { fieldsFor, SENDER_BLOCK, SERIES_BY_ID } from '@/data/emails';
import type { Email, EmailBlock } from '@/data/emails';

export type FieldMode = 'sample' | 'tags';

export interface EmailRenderOptions {
  /** absolute origin for images and links, without a trailing slash */
  base: string;
  fields?: FieldMode;
  highlight?: boolean;
}

const DISPLAY = "'Spline Sans', Helvetica, Arial, sans-serif";
const BODY = "'Anonymous Pro', ui-monospace, Menlo, Consolas, monospace";
const TAG = /\{\{\s*([a-z0-9_]+)\s*\}\}/g;

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Replaces {{tags}} in plain text, without markup. */
export const fillText = (text: string, email: Email, mode: FieldMode) => fillPlain(text, email, mode);

const fillPlain = (text: string, email: Email, mode: FieldMode) => {
  if (mode === 'tags') return text;
  const fields = fieldsFor(email);
  return text.replace(TAG, (m, key: string) => fields[key]?.sample ?? m);
};

/** Escapes text and replaces {{tags}}, marking them when `highlight` is on. */
const fill = (text: string, email: Email, mode: FieldMode, highlight: boolean) => {
  const fields = fieldsFor(email);
  let out = '';
  let last = 0;
  for (const m of text.matchAll(TAG)) {
    out += escape(text.slice(last, m.index));
    const key = m[1];
    const known = key in fields;
    const value = mode === 'sample' && known ? fields[key].sample : m[0];
    out += highlight
      ? `<span title="${escape(known ? fields[key].label : 'Unknown field')}" style="background:${known ? APRICOT[50] : ERROR[100]};border-bottom:1px dashed ${INK[400]};border-radius:3px;padding:0 2px;">${escape(value)}</span>`
      : escape(value);
    last = (m.index ?? 0) + m[0].length;
  }
  return out + escape(text.slice(last));
};

const asset = (src: string, base: string) => {
  if (/^https?:\/\//.test(src)) return src;
  const path = src.startsWith('/imagery/') ? thumb(src) : src;
  return `${base}${path}`;
};

const p = (html: string, extra = '') => `<p style="margin:0 0 16px;font-family:${BODY};font-size:16px;line-height:26px;color:${INK[900]};${extra}">${html}</p>`;

const block = (b: EmailBlock, email: Email, o: Required<EmailRenderOptions>) => {
  const f = (t: string) => fill(t, email, o.fields, o.highlight);
  switch (b.type) {
    case 'p':
      return p(f(b.text));
    case 'h2':
      return `<h2 style="margin:28px 0 12px;font-family:${DISPLAY};font-size:20px;line-height:1.3;font-weight:700;color:${INK[900]};">${f(b.text)}</h2>`;
    case 'list': {
      const tag = b.ordered ? 'ol' : 'ul';
      return `<${tag} style="margin:0 0 16px;padding-left:24px;font-family:${BODY};font-size:16px;line-height:26px;color:${INK[900]};">${b.items.map((i) => `<li style="margin:0 0 8px;">${f(i)}</li>`).join('')}</${tag}>`;
    }
    case 'quote':
      return `<blockquote style="margin:0 0 16px;padding:4px 0 4px 16px;border-left:3px solid ${APRICOT[200]};font-family:${BODY};font-size:16px;line-height:26px;color:${INK[900]};">${f(b.text)}</blockquote>`;
    case 'note':
      return p(f(b.text), `font-size:13px;line-height:1.6;color:${INK[600]};`);
    case 'button': {
      const href = escape(fillPlain(b.href, email, o.fields));
      return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 20px;"><tr><td style="border-radius:8px;background:${APRICOT[200]};"><a href="${href}" style="display:inline-block;padding:12px 22px;font-family:${DISPLAY};font-size:15px;font-weight:500;line-height:1.2;color:${INK[900]};text-decoration:none;border-radius:8px;">${escape(b.label)}</a></td></tr></table>`;
    }
    case 'facts':
      return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:4px 0 20px;border-top:1px solid ${INK[200]};">${b.rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:10px 12px 10px 0;border-bottom:1px solid ${INK[200]};font-family:${BODY};font-size:13px;line-height:1.5;color:${INK[600]};vertical-align:top;width:42%;">${f(k)}</td><td style="padding:10px 0;border-bottom:1px solid ${INK[200]};font-family:${BODY};font-size:14px;line-height:1.5;color:${INK[900]};text-align:right;vertical-align:top;">${f(v)}</td></tr>`
        )
        .join('')}</table>`;
    case 'image':
      return `<img src="${escape(asset(b.src, o.base))}" alt="${escape(b.alt)}" width="536" style="display:block;width:100%;max-width:536px;height:auto;margin:0 0 24px;border:0;border-radius:12px;" />`;
    case 'sign':
      return `<p style="margin:24px 0 0;font-family:${BODY};font-size:16px;line-height:26px;color:${INK[900]};">${b.lines.map((l) => f(l)).join('<br />')}</p>`;
  }
};

const footer = (email: Email, o: Required<EmailRenderOptions>) => {
  const f = (t: string) => fill(t, email, o.fields, o.highlight);
  const link = (label: string, href: string) => `<a href="${escape(fillPlain(href, email, o.fields))}" style="color:${INK[600]};text-decoration:underline;">${label}</a>`;
  const lines = [
    SENDER_BLOCK.map(escape).join('<br />'),
    `You are receiving this because ${f(email.reason)}.`,
    email.kind === 'marketing' ? link('Unsubscribe', '{{unsubscribe_link}}') : '',
  ].filter(Boolean);
  return `<p style="margin:0;font-family:${BODY};font-size:12px;line-height:1.6;color:${INK[500]};">${lines.join('<br /><br />')}</p>`;
};

/** The email as inbox-ready HTML. */
export const renderEmailHtml = (email: Email, options: EmailRenderOptions) => {
  const o: Required<EmailRenderOptions> = { fields: 'sample', highlight: false, ...options };
  const f = (t: string) => fill(t, email, o.fields, o.highlight);
  const plain = email.layout === 'plain';
  const ground = plain ? WHITE : PAPER_IVORY;
  const body = email.blocks.map((b) => block(b, email, o)).join('\n');
  const series = SERIES_BY_ID[email.series];

  const logo = `<img src="${o.base}/email/health-os-logo.png" alt="Health OS" width="140" style="display:block;width:140px;height:auto;border:0;" />`;
  const icon = email.icon ? `<img src="${o.base}/email/icons/${email.icon}.png" alt="" width="56" height="56" style="display:block;width:56px;height:56px;margin:0 0 20px;border:0;" />` : '';
  const title = email.title ? `<h1 style="margin:0 0 20px;font-family:${DISPLAY};font-size:28px;line-height:1.2;font-weight:700;color:${INK[900]};">${escape(email.title)}</h1>` : '';

  let inner: string;
  if (plain) {
    inner = `<tr><td class="pad" style="padding:32px 24px 24px;">${body}</td></tr>
<tr><td class="pad" style="padding:0 24px 32px;"><div style="border-top:1px solid ${INK[200]};padding-top:20px;">${footer(email, o)}</div></td></tr>`;
  } else if (email.layout === 'newsletter') {
    const edition = `${series?.name ?? 'Newsletter'} · ${escape(email.send)}`;
    const web = `<a href="${escape(fillPlain('{{web_version_link}}', email, o.fields))}" style="font-family:${BODY};font-size:12px;color:${INK[600]};text-decoration:underline;">View on the web</a>`;
    const header = email.image ? `<img src="${escape(asset(email.image.src, o.base))}" alt="${escape(email.image.alt)}" width="600" style="display:block;width:100%;height:auto;border:0;border-radius:12px 12px 0 0;" />` : '';
    inner = `<tr><td style="padding:28px 0 20px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td>${logo}</td><td align="right">${web}</td></tr></table></td></tr>
<tr><td style="background:${WHITE};border:1px solid ${INK[200]};border-radius:12px;">${header}
<div class="pad" style="padding:32px 32px 36px;"><p style="margin:0 0 12px;font-family:${BODY};font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:${INK[500]};">${edition}</p>${title}${body}</div></td></tr>
<tr><td class="pad" style="padding:24px 8px 40px;">${footer(email, o)}</td></tr>`;
  } else {
    inner = `<tr><td style="padding:28px 0 20px;">${logo}</td></tr>
<tr><td class="pad" style="background:${WHITE};border:1px solid ${INK[200]};border-radius:12px;padding:32px 32px 36px;">${icon}${title}${body}</td></tr>
<tr><td class="pad" style="padding:24px 8px 40px;">${footer(email, o)}</td></tr>`;
  }

  return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<title>${escape(fillPlain(email.subject, email, o.fields))}</title>
<link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro&amp;family=Spline+Sans:wght@500;700&amp;display=swap" rel="stylesheet" />
<style>
  body { margin: 0; padding: 0; }
  a { color: ${INK[900]}; }
  @media (max-width: 620px) {
    .container { width: 100% !important; }
    .pad { padding-left: 20px !important; padding-right: 20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${ground};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${f(email.preview)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${ground};">
<tr><td align="center" style="padding:0 12px;">
<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
${inner}
</table>
</td></tr>
</table>
</body>
</html>`;
};

/** The email as plain text, for the text part of a send or for pasting into a one-to-one message. */
export const renderEmailText = (email: Email, options: { fields?: FieldMode } = {}) => {
  const mode = options.fields ?? 'tags';
  const t = (s: string) => fillPlain(s, email, mode);
  const parts: string[] = [];
  if (email.title) parts.push(t(email.title));
  for (const b of email.blocks) {
    if (b.type === 'p' || b.type === 'note' || b.type === 'quote') parts.push(t(b.text));
    else if (b.type === 'h2') parts.push(t(b.text));
    else if (b.type === 'list') parts.push(b.items.map((i, n) => `${b.ordered ? `${n + 1}.` : '-'} ${t(i)}`).join('\n'));
    else if (b.type === 'button') parts.push(`${b.label}: ${t(b.href)}`);
    else if (b.type === 'facts') parts.push(b.rows.map(([k, v]) => `${t(k)}: ${t(v)}`).join('\n'));
    else if (b.type === 'sign') parts.push(b.lines.map(t).join('\n'));
  }
  const foot = [SENDER_BLOCK.join('\n'), `You are receiving this because ${t(email.reason)}.`];
  if (email.kind === 'marketing') foot.push(`Unsubscribe: ${t('{{unsubscribe_link}}')}`);
  return `${parts.join('\n\n')}\n\n--\n${foot.join('\n\n')}\n`;
};

/** Words in the body the playbook limits: paragraphs, subheads, lists and quotes, with samples filled. Not the sign-off, notes, buttons or footer. */
export const countWords = (email: Email) =>
  email.blocks
    .flatMap((b) => (b.type === 'p' || b.type === 'h2' || b.type === 'quote' ? [b.text] : b.type === 'list' ? b.items : []))
    .map((s) => fillPlain(s, email, 'sample'))
    .join(' ')
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9$]/.test(w)).length;
