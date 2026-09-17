/**
 * Sample case study. One invented client, written to the case study arc: who they are, what was
 * wrong, what we set out to do, what was actually done, what changed, and what happens next.
 *
 * **Sample, like the testimonials, and blocked by the same rule.** db-health-os claim C21 blocks
 * every client result, count and quote until one is measured and the client has given written
 * permission, so every figure here carries the evidence it would need before it could ship. The
 * scope in `actions` is the real offer (offer-overview.md, 30-day done-for-you setup); the outcomes
 * are not real.
 *
 * The component takes any story of this shape, so a real one drops in by replacing this object.
 */
import type { Pillar } from '@/data/testimonials';

export interface CaseStudyResult {
  value: string;
  label: string;
  /** what would have to exist before this figure could be published */
  needs: string;
}

export interface CaseStudy {
  id: string;
  /** the person whose story it is, from PEOPLE */
  person: string;
  business: string;
  /** one line under the title */
  kicker: string;
  title: string;
  summary: string;
  about: string[];
  pillar: Pillar;
  challenge: { title: string; detail: string }[];
  objectives: string[];
  actions: { title: string; detail: string }[];
  results: CaseStudyResult[];
  quote: { text: string; attribution: string };
  closing: string;
  next: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'vale-studio',
    person: 'harriet-vale',
    business: 'Vale Studio',
    kicker: 'Clinical Pilates and rehab, Sydney',
    title: 'The studio that could not run without her',
    summary:
      'A twelve-year-old clinical Pilates studio with a full book, a waiting list she kept in her phone and a founder who was the only person who knew how any of it worked. Thirty days of done-for-you setup put the enquiry, the booking and the follow-up in one system, and handed the running of it to her team.',
    pillar: 'bottleneck',
    about: [
      'Harriet Vale has run Vale Studio for twelve years. Two rooms, six instructors, a rehab list that comes in from physiotherapists and a reformer timetable that fills by word of mouth.',
      'She is a proven operator, not a beginner. She is past the income ceiling that traps most studio owners, and she is good at the work. Her constraint is not money or knowledge. It is that too much of the business still runs through her personally.',
    ],
    challenge: [
      {
        title: 'She was the system',
        detail:
          'Every enquiry landed in her inbox, her phone or the studio Instagram, and every one of them waited for her. When she took a week off, the answer was not that the business slowed down. It was that nobody new came in.',
      },
      {
        title: 'Eight tools that did not talk',
        detail:
          'A booking platform, a mailing tool, a payment link, a scheduler, a spreadsheet of rehab referrals, a chat widget nobody watched and two shared inboxes. Another login, another bill, another place to lose someone.',
      },
      {
        title: 'Busy, then quiet',
        detail:
          'Term intakes filled in a rush because she worked nights to fill them, then went quiet for six weeks while she taught. Nothing carried the work between the pushes.',
      },
    ],
    objectives: [
      'Take the enquiry off her personally, without dropping the standard she answers with',
      'Put every conversation, booking and payment in one place her instructors can use',
      'Make the follow-up happen on its own between term intakes',
      'Leave the team able to run it, and able to change it, without her',
    ],
    actions: [
      {
        title: 'One system, set up for her',
        detail:
          'Thirty days of done-for-you setup: the CRM and pipeline, calendars, payments, the unified inbox and the studio site, migrated with her existing client list and her timetable in place. She approved; she did not build.',
      },
      {
        title: 'Three agents on the work she was doing herself',
        detail:
          'The lead agent answers and books across Instagram, the site and SMS. The sales agent runs the follow-up on an enquiry that has not booked. The retention agent watches for a client who has stopped coming in.',
      },
      {
        title: 'The funnels a studio actually uses',
        detail:
          'Pre-built wellness funnels fitted to her intakes: a rehab referral path, a beginner course waitlist, a free assessment and a term enrolment page, each with its landing page, form, emails and booking sequence.',
      },
      {
        title: 'Handover to the team, not to the founder',
        detail:
          'Her studio manager and two senior instructors were trained on the inbox, the pipeline and the sequences. Ninety days of strategy support sat behind them for the things that only come up once.',
      },
    ],
    results: [
      { value: '8 to 1', label: 'Tools replaced by one system', needs: 'A signed list of what the client was paying for before and after. This is the one figure here that is structural rather than measured.' },
      { value: '30', label: 'Days from kickoff to the team running it', needs: 'The delivery record for a real client, plus their agreement to be named.' },
      { value: '0', label: 'Enquiries waiting on the founder overnight', needs: 'Before and after data from the client system, over a stated period, with the method written down.' },
      { value: '3', label: 'People other than Harriet who can run an intake', needs: 'The client saying so in writing.' },
    ],
    quote: {
      text:
        'I have bought software before and ended up with a very expensive to-do list. This time somebody built the thing, showed my team how to run it, and then it kept running without me.',
      attribution: 'Harriet Vale, Vale Studio',
    },
    closing:
      'The point was never the software. It was that a business she built over twelve years could not open its doors on a morning she was not there. It can now.',
    next: [
      'Ninety-day strategy support continues on the rehab referral path',
      'A second location goes onto the same system rather than its own stack',
      'Her course and community templates come next, once the intakes are steady',
    ],
  },
];

export const CASE_STUDY = CASE_STUDIES[0];
