/**
 * LeadMagnetsSection: useful things to offer for an email address. An ebook to page through, then a
 * fan of swipe files that turn over. Images come from the tagged library. In the reference site
 * nothing is sent, so the actions confirm with a toast.
 */
import { Section, Example } from '@/showcase/Section';
import { Ebook, SwipeFiles, type EbookAction, type EbookImage, type EbookPage, type SwipeFile } from '@/components/lead-magnets';
import { useToast } from '@/components/ui/toast';
import { thumb } from '@/lib/images';
import { BACKGROUNDS } from '@/data/backgrounds';
import { PHOTOS } from '@/data/photos';

/** A library image at display size, with its description as the alt text. */
const libraryImage = (src: string): EbookImage => {
  const described = PHOTOS.find((p) => p.src === src) ?? BACKGROUNDS.find((b) => b.src === src);
  return { src: thumb(src), alt: described?.description ?? '' };
};

const background = (name: string) => thumb(`/backgrounds/nature-${name}.png`);

const EBOOK_COVER = libraryImage('/backgrounds/nature-brown-cream-alder-cones-frost-portrait.png');

const EBOOK_PAGES: EbookPage[] = [
  { kind: 'cover' },
  {
    kind: 'contents',
    items: [
      { label: 'Write down every tool', page: 3 },
      { label: "Follow one client's week", page: 4 },
      { label: 'Mark the hand-offs', page: 6 },
      { label: 'Start where clients start', page: 7 },
      { label: 'Keep what already works', page: 8 },
      { label: 'Put it on one page', page: 9 },
    ],
  },
  {
    kind: 'chapter',
    number: 1,
    title: 'Write down every tool',
    body: ['List everything the business runs on: booking, payments, forms, email, texts and notes.'],
    image: libraryImage('/imagery/work-and-content-creation/three-women-coworking-on-boucle-sofa-with-laptop-and-coffee-4-3.png'),
  },
  {
    kind: 'chapter',
    number: 2,
    title: "Follow one client's week",
    body: ['Pick a recent client and trace their path from first message to second booking.', 'Note each place their details were typed in again.'],
  },
  { kind: 'quote', text: "If a client's details get typed in twice, that is the place to start." },
  {
    kind: 'chapter',
    number: 3,
    title: 'Mark the hand-offs',
    body: ['A hand-off is any moment someone moves information between tools by hand.', 'Copying a booking into a calendar is one. Sending a reminder yourself is another.'],
  },
  {
    kind: 'chapter',
    number: 4,
    title: 'Start where clients start',
    body: ['Enquiry, booking and payment come first. When they sit together, reminders and records can follow.'],
    image: libraryImage('/backgrounds/nature-peach-lavender-misty-mountains-sunrise-landscape.png'),
  },
  {
    kind: 'chapter',
    number: 5,
    title: 'Keep what already works',
    body: ['Not everything has to move. If a tool does one job well and nothing is copied out of it, leave it.', 'Come back to the list once the first changes have settled.'],
  },
  {
    kind: 'chapter',
    number: 6,
    title: 'Put it on one page',
    body: ['Four columns: the tool, the job it does, who uses it and where it hands off.'],
    image: { placeholder: 'The worksheet is in the full ebook' },
  },
  { kind: 'cta', title: 'Read the rest', body: 'Leave your email and we will send the full ebook, with the one-page worksheet.' },
];

const EBOOK_ACTION: EbookAction = {
  label: 'Send me the ebook',
  placeholder: 'you@yourstudio.com.au',
  confirmation: { title: 'Request received', description: 'In this demo nothing is sent.' },
};

const SWIPE_FILES: SwipeFile[] = [
  {
    id: 'enquiry-replies',
    title: 'Enquiry replies',
    format: 'Email sequence',
    length: '3 emails',
    subtitle: 'For the hours after someone asks',
    body: 'A first reply with one clear next step, then two follow-ups.',
    inside: ['A same-day first reply', 'A follow-up on day two', 'A last note on day five'],
    cover: { src: background('blue-purple-dreamy-dandelion-haze-portrait') },
  },
  {
    id: 'booking-confirmations',
    title: 'Booking confirmations',
    format: 'Email sequence',
    length: '3 emails',
    subtitle: 'For the moment a client books',
    body: 'Confirms the time, the place and what to bring, in plain words.',
    inside: ['The confirmation', 'What to bring and wear', 'A thank-you after'],
    cover: { src: background('cream-peach-pampas-soft-seedheads-portrait') },
  },
  {
    id: 'reminder-texts',
    title: 'Reminder texts',
    format: 'Text messages',
    length: '3 texts',
    subtitle: 'For the days before a booking',
    body: 'Short reminders with the time and a link to move it.',
    inside: ['Two days out', 'The morning of', 'A reply to reschedule'],
    cover: { src: background('peach-pink-ocean-sunset-waves-portrait') },
  },
  {
    id: 'no-show-follow-up',
    title: 'No-show follow-up',
    format: 'Text messages',
    length: '3 texts',
    subtitle: 'For when someone misses a session',
    body: 'A kind check-in that makes rebooking the obvious next step.',
    inside: ['A same-day check-in', 'An offer to rebook', 'A last friendly nudge'],
    cover: { src: background('lavender-peach-seascape-birds-flock-portrait') },
  },
  {
    id: 'rebooking-nudges',
    title: 'Rebooking nudges',
    format: 'Email sequence',
    length: '3 emails',
    subtitle: 'For clients who have not rebooked',
    body: 'Timed notes that invite a client back without pressure.',
    inside: ['A two-week check-in', 'A six-week reminder', 'A seasonal invitation'],
    cover: { src: background('orange-amber-misty-forest-pines-portrait') },
  },
  {
    id: 'review-requests',
    title: 'Review requests',
    format: 'Text messages',
    length: '3 texts',
    subtitle: 'For the day after a good session',
    body: 'A short ask with a direct link, sent while it is fresh.',
    inside: ['The first ask', 'One follow-up', 'A thank-you reply'],
    cover: { src: background('lavender-purple-hydrangea-pastel-haze-portrait') },
  },
  {
    id: 'welcome-sequence',
    title: 'Welcome sequence',
    format: 'Email sequence',
    length: '3 emails',
    subtitle: "For a new client's first fortnight",
    body: 'Settles new clients in, from first booking to second visit.',
    inside: ['A welcome on day one', 'What to expect first', 'An invite to book again'],
    cover: { src: background('orange-grey-copper-grass-blades-portrait') },
  },
  {
    id: 'class-waitlist',
    title: 'Class waitlist',
    format: 'Text messages',
    length: '3 texts',
    subtitle: 'For full classes and freed spots',
    body: 'Lets people know where they stand and when a spot opens.',
    inside: ['Added to the waitlist', 'A spot has opened', 'The class is still full'],
    cover: { src: background('gold-amber-golden-bokeh-orbs-portrait') },
  },
  {
    id: 'referral-asks',
    title: 'Referral asks',
    format: 'Script',
    length: '1 script',
    subtitle: 'For a chat at the front desk',
    body: 'Words for asking a happy client to pass your name on.',
    inside: ['A natural way to open', 'What to say about you', 'How to hand over a card'],
    cover: { src: background('purple-lavender-field-wooden-post-portrait') },
  },
];

const SwipeFilesExample = () => {
  const { toast } = useToast();
  return (
    <Example id="swipe-files" label="Swipe files">
      <SwipeFiles
        files={SWIPE_FILES}
        onGet={(file) => toast({ title: `${file.title} requested`, description: 'In this demo nothing is sent.', tone: 'success' })}
      />
    </Example>
  );
};

export const LeadMagnetsSection = () => (
  <Section id="lead-magnets">
    <div className="flex flex-col gap-8">
      <Example id="ebook" label="Ebook">
        <Ebook
          title="Count your stack"
          subtitle="Where a wellness business's week goes, and what to bring together first"
          description="A short guide to listing the tools you use, following one client through a week and choosing what to join up first."
          cover={EBOOK_COVER}
          pages={EBOOK_PAGES}
          action={EBOOK_ACTION}
        />
      </Example>
      <SwipeFilesExample />
    </div>
  </Section>
);
