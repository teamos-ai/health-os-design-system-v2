/**
 * The Health OS sending-domain warm-up sequence: six emails over 24 days, written to earn a new
 * sub-domain a reputation rather than to sell anything.
 *
 * Separate from the email library in `src/data/emails` on purpose. A library email is filed by
 * series, step and pillar; a warm-up send is filed by the day it lands, the number of links it is
 * allowed to carry and the job it does for the domain. Those are different shapes, so they get
 * different files.
 *
 * One source per email: `blocks` render BOTH the plain-text and the HTML body
 * (`src/lib/warmup-render.ts`), so the two can never drift.
 *
 * The copy is final and ready to send. Sending waits on one thing: the qualified lists loaded into
 * Health OS with each address's consent basis recorded, which db-health-os guardrails and the Spam
 * Act both require (owner, 18 September 2026: the lists exist and are ready to load). The ramp
 * below is the order to load and send them in.
 */

/**
 * The email palette: Health OS tokens resolved to hex. Email has no CSS variables, so this is the
 * one place in the repo a token may be a literal. Re-derive from tokens.css, never hand-tune.
 *
 * Paper ground with white cards, per the two-theme rule: warm ivory is the system's own answer for
 * a print-like surface, and a light, image-free, near-linkless email is also what a cold sending
 * domain needs. Nothing sits on carbon.
 */
export const MAIL = {
  ground: '#F9F6F2', // --paper (.theme-paper)   warm ivory canvas
  surface: '#FFFFFF', // --surface                the card
  well: '#F4F0EA', // --surface-2              quoted rows
  line: '#E7E0D8', // --line                   hairline
  ink: '#1F1F1F', // --hos-ink-900            headings
  body: '#5A534B', // --hos-ink-600            body copy
  meta: '#6E665D', // --hos-ink-500            eyebrow, footer
  accent: '#F5A060', // --hos-apricot-400        the one accent word, and links
  button: '#F8C39C', // --hos-apricot-200        the one button fill (rule 9)
  buttonInk: '#1F1F1F', // dark ink on the apricot fill, never white
} as const

/**
 * GHL merge fields. The postal address is written out rather than merged: the CRM location holds
 * the Werribee street address, and db-health-os nominates the Tarneit PO Box for anything outward
 * facing. Merging the wrong one is a compliance defect, so this one is not a variable.
 */
export const MERGE = {
  firstName: '{{contact.first_name}}',
  unsubscribe: '{{unsubscribe_link}}',
} as const

/** The sender block, complete as it stands. Health OS sends and contracts as OS A.I. */
export const SENDER = {
  name: 'OS A.I',
  address: 'Wyndham Village Shopping Centre, PO Box 8439, Tarneit VIC 3029',
  email: 'hello@oscale.ai',
} as const

/** The one destination db-health-os marks LIVE. Every other Health OS URL is still a placeholder. */
export const BOOKING = 'https://link.teamos.ai/widget/bookings/book-a-call-health-os'

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'h'; text: string }
  | { kind: 'cta'; label: string; url: string; trust: string }

export interface WarmupEmail {
  n: number
  /** Days after the sequence starts. */
  day: number
  slug: string
  subject: string
  /** Alternates to A/B once the domain is warm. Never on the first two sends. */
  altSubjects: string[]
  preheader: string
  /** The job this send does for the domain, not for the reader. */
  role: string
  /** Links in the body. Held at zero until the last email. */
  links: number
  blocks: Block[]
  /** Truthfully completes "You are receiving this because …". */
  reason: string
  signoff: string[]
}

const p = (text: string): Block => ({ kind: 'p', text })
const h = (text: string): Block => ({ kind: 'h', text })

const SIGN = ['Audrey', 'Health OS']

/**
 * The sequence follows the three CEO-locked problems in order of depth: founder dependence, then
 * disconnected tools, then stop-start sales. No figure, no result and no proof appears anywhere —
 * db-health-os publishes none, and a warm-up send is the worst possible place to invent one.
 */
export const WARMUP: WarmupEmail[] = [
  {
    n: 1,
    day: 0,
    slug: 'new-address',
    subject: 'A new address, and what it is for',
    altSubjects: ['Hello from a new address', 'Health OS, from the OS A.I team'],
    preheader: 'Nothing to click. Thirty seconds, and a question at the end.',
    role: 'Lands from the new sub-domain and asks for a reply. No link, no image, no offer. A reply is the strongest signal a young sending domain can earn, and the cheapest one to ask for.',
    links: 0,
    reason: 'you gave us your address and asked to hear from Health OS',
    blocks: [
      p(`Hi ${MERGE.firstName},`),
      p('Short one, and there is nothing to click.'),
      p('This is the first message from a new address. Health OS is the product brand for wellness operators, and it sits under OS A.I, the company behind it. Same team, same phone number, same work.'),
      p('It is going out on its own, ahead of anything else, so that the address arrives before the content does. A new sending address with no history behind it tends to land in the wrong tab, and once it is there it stays.'),
      p('Five more follow over the next few weeks. They are about the three things that cap a proven operator: a business that runs through one person, tools that do not talk to each other, and demand that arrives in waves.'),
      p('If you have thirty seconds, reply and tell me which of those three is loudest at the moment. I read all of them.'),
    ],
    signoff: SIGN,
  },
  {
    n: 2,
    day: 4,
    slug: 'founder-dependence',
    subject: 'Nothing moves unless you do',
    altSubjects: ['The wall you built yourself', 'Hand it off, take it back'],
    preheader: 'The deepest of the three, and the one nobody names.',
    role: 'The first real argument. Still zero links, so the body earns the read time instead of spending it. Problem one of three.',
    links: 0,
    reason: 'you gave us your address and asked to hear from Health OS',
    blocks: [
      p(`Hi ${MERGE.firstName},`),
      p('Here is the one I think runs deepest.'),
      p('Everything goes through you. A piece of it gets handed over, the quality slips, and it comes back. So next time there is something to hand over, it does not get handed over.'),
      p('That is not a discipline problem. It is a structural one, and it has a ceiling built into it: growth, income and time are all capped by the same wall, because all three are downstream of one person being available.'),
      p('Most of what gets sold as the fix is a better list of tasks. A better list still runs through you.'),
      p('What moves is taking one repeatable thing out of your head, writing it down once, and giving it somewhere to live that is not you.'),
      p('Reply with the one thing you keep taking back. I will tell you where I would put it.'),
    ],
    signoff: SIGN,
  },
  {
    n: 3,
    day: 8,
    slug: 'disconnected-tools',
    subject: 'Eight logins, one lost lead',
    altSubjects: ['Another login, another bill', 'Where the enquiries go missing'],
    preheader: 'Not the cost of the tools. The seams between them.',
    role: 'Problem two. The structural version of a claim the database blocks as a costed one: eight or more tools is a description, never a dollar figure.',
    links: 0,
    reason: 'you gave us your address and asked to hear from Health OS',
    blocks: [
      p(`Hi ${MERGE.firstName},`),
      p('Count the tools on the card this month. Booking, payments, email, texts, the site, the funnel, the course, the community, whatever runs the socials.'),
      p('The number is not the problem. The seams are.'),
      p('Every seam is somewhere a lead can sit. An enquiry arrives in one system, the reply is owed from another, and the two never meet. Nobody drops it on purpose. There is simply nowhere it is definitely held.'),
      p('Here is the test. Name every enquiry from the last seven days and what happened to each one. If the answer takes three logins, the leak has already been found.'),
      p('I am not going to tell you what that costs. You can work it out more accurately than I can.'),
      p('Reply with your number of logins if you like. I keep a tally.'),
    ],
    signoff: SIGN,
  },
  {
    n: 4,
    day: 13,
    slug: 'stop-start',
    subject: 'Busy one month, quiet the next',
    altSubjects: ['The demand is there. The steadiness is not.', 'Why the quiet months arrive'],
    preheader: 'Demand is not the constraint. Rhythm is.',
    role: 'Problem three, and the last send before the domain has enough history to carry a link. By now four clean sends sit behind it.',
    links: 0,
    reason: 'you gave us your address and asked to hear from Health OS',
    blocks: [
      p(`Hi ${MERGE.firstName},`),
      p('The third one gets misdiagnosed more than the other two.'),
      p('A quiet month reads as a demand problem, so the answer is more marketing. More marketing produces a busy month. The busy month eats the hours the marketing was coming out of, and the month after that is quiet again.'),
      p('Demand is not the constraint. The constraint is that the work of bringing people in stops the moment you are needed somewhere else, and you are always needed somewhere else.'),
      p('Steady is not a harder version of busy. It is a different mechanism: something that runs at the same rate whether or not you are in the room that week.'),
      p('That is the whole argument for building the engine instead of driving it.'),
      p('Same question as last time. Which month are you in right now? One word is fine.'),
    ],
    signoff: SIGN,
  },
  {
    n: 5,
    day: 18,
    slug: 'what-we-build',
    subject: 'What we actually build',
    altSubjects: ['The short version of the product', 'One platform, three agents, set up for you'],
    preheader: 'Mechanism, not a brochure. Still nothing to click.',
    role: 'The capability email. Reply-gated rather than link-gated: the pages it would link to do not exist yet, and a CTA into a page that is not ready is worse than no CTA at all.',
    links: 0,
    reason: 'you gave us your address and asked to hear from Health OS',
    blocks: [
      p(`Hi ${MERGE.firstName},`),
      p('Four emails in, here is the part that has been left out.'),
      p('Health OS is three things sold as one.'),
      h('One platform'),
      p('A white-labelled platform holding the CRM, the inbox, the calendar, payments, the site, funnels, courses, community and the content schedule. One login in place of eight.'),
      h('Three agents'),
      p('Software that runs the everyday work against the three problems in the emails before this one, rather than sitting there waiting to be operated.'),
      h('Set up for you'),
      p('We build it, migrate what you already have, and turn it on. That is the part this category mostly does not do, and it is the part that decides whether any of the rest gets used.'),
      p('There is no link in this one either. The pages are still being built, and sending you nothing beats sending you something half-finished.'),
      p('If you want the detail before then, reply and ask. I will answer properly.'),
    ],
    signoff: SIGN,
  },
  {
    n: 6,
    day: 24,
    slug: 'open-door',
    subject: 'Open door',
    altSubjects: ['Thirty minutes, if it is useful', 'The one ask'],
    preheader: 'One link, the first in six emails.',
    role: 'The one ask, carrying the sequence’s only link and its only accent fill. Offers a way to decline without unsubscribing, which protects the list the next campaign runs on.',
    links: 1,
    reason: 'you gave us your address and asked to hear from Health OS',
    blocks: [
      p(`Hi ${MERGE.firstName},`),
      p('Last one in this series, and it carries the only link I have sent.'),
      p('If any of the last three landed, a call is the quickest way to find out whether there is anything here for you. Thirty minutes. We look at how the business runs now, and I tell you the one thing I would change first.'),
      p('If it is not a fit I will say so on the call. That is not a line. A bad fit costs me more than it costs you.'),
      {
        kind: 'cta',
        label: 'Book thirty minutes',
        url: BOOKING,
        trust: 'No deck. No obligation.',
      },
      p('If the timing is wrong, reply with "not now" and it goes quiet until you say otherwise. You do not have to unsubscribe to stop hearing from me.'),
    ],
    signoff: SIGN,
  },
]

export interface PlanRow {
  window: string
  sends: string
  segment: string
  cap: string
}

/**
 * The ramp. Volume, not copy, is what warms a domain.
 *
 * Load the qualified lists in this order, warmest segment first, and loading them and warming the
 * domain happen in the same pass.
 */
export const PLAN: PlanRow[] = [
  { window: 'Days 1–4', sends: 'Email 1', segment: 'People who have replied to a person here in the last 90 days', cap: '50 / day' },
  { window: 'Days 5–11', sends: 'Emails 1–2', segment: 'Add: opened or clicked in the last 180 days', cap: '150 / day' },
  { window: 'Days 12–17', sends: 'Emails 2–3', segment: 'Add: engaged in the last 365 days', cap: '400 / day' },
  { window: 'Days 18–24', sends: 'Emails 4–5', segment: 'Add: clients and past clients, any date', cap: '800 / day' },
  { window: 'Day 25 on', sends: 'Email 6, then the library', segment: 'Everything left that is not suppressed', cap: '1,500 / day' },
]

/** Pre-flight and in-flight rules. Each one is a thing that sinks a new sending domain. */
export const RULES: ReadonlyArray<{ title: string; text: string }> = [
  {
    title: 'Load the lists with their consent basis',
    text: 'Every address goes in with how it was collected and its consent basis recorded against it. That is what db-health-os and the Spam Act both require, and it is the only thing between this copy and the first send. Load the qualified lists in the ramp order above, warmest first.',
  },
  {
    title: 'Authenticate before the first send',
    text: 'SPF, DKIM and a custom return-path on the sending sub-domain, plus a DMARC record at p=none on the root. Send nothing until all three verify green in the LC Email domain panel.',
  },
  {
    title: 'Suppress before you segment',
    text: 'Remove hard bounces, role addresses (info@, admin@, accounts@, reception@), anything that has not engaged in two years, and every address that came from a list you did not collect yourself.',
  },
  {
    title: 'Warmest first, always',
    text: 'The ramp is ordered by engagement recency, not by import date and not alphabetically. The first sends go to the people most likely to open and reply.',
  },
  {
    title: 'Hold the links',
    text: 'Emails 1 to 5 carry no link in the body at all. Link-heavy mail from a domain with no history is the fastest way into the spam folder, and it is also the honest position here: the booking link is the only Health OS destination that is live.',
  },
  {
    title: 'The footer is not optional',
    text: 'Every send carries the sender block — OS A.I, the Tarneit PO Box, hello@oscale.ai — a working unsubscribe, and a reason line that is true of the person reading it. The Spam Act wants the sender identified and the exit working; both are satisfied by the footer this section renders.',
  },
  {
    title: 'No figure, no result, no proof',
    text: 'Not one Health OS statistic is publishable, and no client outcome exists. Every send here argues structurally instead: one subscription in place of eight, not a dollar figure; set up for you, not a percentage. The structural version usually reads better anyway.',
  },
  {
    title: 'A reply beats a click',
    text: 'Five of the six emails ask for a reply and nothing else. Replies, and the absence of complaints, are what a young domain is actually being scored on.',
  },
]
