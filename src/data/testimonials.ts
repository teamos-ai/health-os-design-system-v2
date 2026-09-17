/**
 * Sample testimonials. Thirty invented wellness operators, written in the voice of the primary ICP
 * and mapped to the three messaging pillars.
 *
 * **None of this is real, and none of it may ship.** db-health-os blocks every client result,
 * count, testimonial and logo as claim C21: no measured outcome and no written permission exists
 * for any Health OS client. These exist so the testimonial components can be designed, reviewed and
 * handed over ready to receive real quotes. Every card carries a Sample mark, the section carries a
 * standing notice, and `SAMPLE_NOTICE` below is the one sentence to keep with them anywhere they
 * travel. Replacing a quote means replacing the person, the role and the portrait with a real one.
 *
 * Portraits are generated (KIE gpt-image-2, 180 credits, Tumai 17 September 2026) and picture nobody
 * real. CLAUDE.md rule 12 says never imply a person in a photo is a client, so these faces only ever
 * appear beside a Sample mark, and they leave with the sample copy.
 */

export type Pillar = 'bottleneck' | 'one-system' | 'steady';

/** which wall the quote was written for: the rows read fast, the columns hold a longer thought */
export type Wall = 'rows' | 'columns';

export interface Person {
  id: string;
  name: string;
  /** what they do, not a job title from a corporate ladder */
  role: string;
  /** invented business. No real practice is named anywhere in this file */
  business: string;
  city: string;
}

export interface Testimonial {
  id: string;
  person: string;
  quote: string;
  pillar: Pillar;
  wall: Wall;
}

export const PILLARS: Record<Pillar, { label: string; problem: string }> = {
  bottleneck: { label: 'The bottleneck', problem: 'Founder dependence. She is the business' },
  'one-system': { label: 'One system', problem: 'Disconnected tools. Eight or more that do not talk' },
  steady: { label: 'Steady, not stop-start', problem: 'Stop-start sales. Busy, then quiet' },
};

export const SAMPLE_NOTICE =
  'Sample copy and generated portraits. No Health OS client result, quote or logo is cleared for use: the database blocks all of them until a measured outcome exists and the client has given written permission.';

export const PEOPLE: Person[] = [
  { id: 'priya-raman', name: 'Priya Raman', role: 'Pilates studio owner', business: 'Ridgeline Pilates', city: 'Melbourne' },
  { id: 'jess-carmody', name: 'Jess Carmody', role: 'Online coach', business: 'Carmody Method', city: 'Byron Bay' },
  { id: 'mele-tupou', name: 'Mele Tupou', role: 'Gym owner', business: 'Stonefruit Strength', city: 'Western Sydney' },
  { id: 'dan-whitlock', name: 'Dan Whitlock', role: 'Physiotherapist, practice owner', business: 'Foreshore Physio', city: 'Adelaide' },
  { id: 'aroha-ngata', name: 'Aroha Ngata', role: 'Yoga teacher trainer', business: 'Long Light Yoga', city: 'Gold Coast' },
  { id: 'sophie-lindqvist', name: 'Sophie Lindqvist', role: 'Naturopath', business: 'Wildflower Clinic', city: 'Hobart' },
  { id: 'marcus-ellery', name: 'Marcus Ellery', role: 'Retreat host', business: 'Kanvale Retreats', city: 'Margaret River' },
  { id: 'anika-sorensen', name: 'Anika Sorensen', role: 'Nutrition coach', business: 'Anika Sorensen Nutrition', city: 'Perth' },
  { id: 'tessa-okafor', name: 'Tessa Okafor', role: "Women's strength coach", business: 'Okafor Strong', city: 'Brisbane' },
  { id: 'liam-brennan', name: 'Liam Brennan', role: 'Breathwork facilitator', business: 'Low Tide Breathwork', city: 'Newcastle' },
  { id: 'noor-haddad', name: 'Noor Haddad', role: 'Allied health practice owner', business: 'Cedarline Health', city: 'Sydney' },
  { id: 'bec-fairweather', name: 'Bec Fairweather', role: 'Dance studio owner', business: 'Fairweather Dance', city: 'Ballarat' },
  { id: 'yuki-tanaka', name: 'Yuki Tanaka', role: 'Mobility coach', business: 'Hinge Mobility', city: 'Melbourne' },
  { id: 'grace-mbeki', name: 'Grace Mbeki', role: 'Wellness clinic director', business: 'Thornbury Wellness', city: 'Melbourne' },
  { id: 'toby-nash', name: 'Toby Nash', role: 'Personal trainer, two sites', business: 'Nash Performance', city: 'Canberra' },
  { id: 'harriet-vale', name: 'Harriet Vale', role: 'Clinical Pilates and rehab', business: 'Vale Studio', city: 'Sydney' },
  { id: 'sam-okada', name: 'Sam Okada', role: 'Strength and conditioning coach', business: 'Okada Barbell', city: 'Melbourne' },
  { id: 'fleur-beaumont', name: 'Fleur Beaumont', role: 'Skin and wellness clinic owner', business: 'Maison Fleur', city: 'Sydney' },
  { id: 'kiri-solomon', name: 'Kiri Solomon', role: 'Yoga studio owner', business: 'Saltbush Yoga', city: 'Sunshine Coast' },
  { id: 'nate-cardoso', name: 'Nate Cardoso', role: 'Online fitness coach', business: 'Cardoso Coaching', city: 'Gold Coast' },
  { id: 'imogen-pryce', name: 'Imogen Pryce', role: 'Nutritionist', business: 'Pryce Nutrition', city: 'Bendigo' },
  { id: 'ravi-kapoor', name: 'Ravi Kapoor', role: 'Physiotherapist, three practitioners', business: 'Kapoor Physio', city: 'Perth' },
  { id: 'lena-fischer', name: 'Lena Fischer', role: 'Pre and postnatal coach', business: 'Fourth Trimester Co', city: 'Wollongong' },
  { id: 'josh-iremonger', name: 'Josh Iremonger', role: 'Recovery studio owner', business: 'Coldhouse Recovery', city: 'Geelong' },
  { id: 'tara-whitmore', name: 'Tara Whitmore', role: 'Mindset coach', business: 'Whitmore Coaching', city: 'Noosa' },
  { id: 'elias-mwangi', name: 'Elias Mwangi', role: 'Group fitness owner', business: 'Mwangi Movement', city: 'Darwin' },
  { id: 'cass-donnelly', name: 'Cass Donnelly', role: 'Remedial massage clinic owner', business: 'Donnelly Remedial', city: 'Launceston' },
  { id: 'mina-park', name: 'Mina Park', role: 'Studio owner and online programs', business: 'Park Studio', city: 'Sydney' },
  { id: 'rob-hargreaves', name: 'Rob Hargreaves', role: 'Golf fitness coach', business: 'Hargreaves Golf Fitness', city: 'Mornington Peninsula' },
  { id: 'simone-adeyemi', name: 'Simone Adeyemi', role: "Women's health coach", business: 'Adeyemi Health', city: 'Brisbane' },
];

export const person = (id: string) => PEOPLE.find((p) => p.id === id) ?? PEOPLE[0];

/** the generated portrait, square, 320px. The 1024px original sits beside it as `-lg.jpg` */
export const portrait = (id: string) => `/testimonials/${id}.jpg`;
export const portraitLarge = (id: string) => `/testimonials/${id}-lg.jpg`;

export const TESTIMONIALS: Testimonial[] = [
  /* ── the rows: short enough to read as a card passes ── */
  { id: 't-01', person: 'priya-raman', wall: 'rows', pillar: 'one-system', quote: 'Everything used to live in my head and in eight browser tabs. Now it lives in one place my team can actually use.' },
  { id: 't-02', person: 'jess-carmody', wall: 'rows', pillar: 'bottleneck', quote: 'I stopped being the only person who knows how someone gets from a DM to the calendar.' },
  { id: 't-03', person: 'mele-tupou', wall: 'rows', pillar: 'bottleneck', quote: 'The first fortnight was the setup. Then I watched someone book in without me touching a thing.' },
  { id: 't-04', person: 'dan-whitlock', wall: 'rows', pillar: 'one-system', quote: 'One login instead of five bills. That on its own would have been worth doing.' },
  { id: 't-05', person: 'aroha-ngata', wall: 'rows', pillar: 'steady', quote: 'It sounds small, but not losing an enquiry over a weekend has changed how I sleep.' },
  { id: 't-06', person: 'sophie-lindqvist', wall: 'rows', pillar: 'steady', quote: 'Eleven years in practice, and this is the first time the follow-up happens whether I remember it or not.' },
  { id: 't-07', person: 'marcus-ellery', wall: 'rows', pillar: 'bottleneck', quote: 'I wanted to hand over the admin without handing over the standard. That is what I got.' },
  { id: 't-08', person: 'anika-sorensen', wall: 'rows', pillar: 'one-system', quote: 'I came in sceptical after two other platforms. This one kept doing what it said it would.' },
  { id: 't-09', person: 'tessa-okafor', wall: 'rows', pillar: 'bottleneck', quote: 'My assistant can run a launch now. Last year that was me, at midnight, in a spreadsheet.' },
  { id: 't-10', person: 'liam-brennan', wall: 'rows', pillar: 'steady', quote: 'The agent answers faster than I do, and it sounds like me on a good day.' },
  { id: 't-11', person: 'noor-haddad', wall: 'rows', pillar: 'one-system', quote: 'Four practitioners, one system. Reception stopped asking me where things live.' },
  { id: 't-12', person: 'bec-fairweather', wall: 'rows', pillar: 'steady', quote: 'Term enrolments used to be a fortnight of chasing. Now it is a page and a sequence.' },
  { id: 't-13', person: 'yuki-tanaka', wall: 'rows', pillar: 'one-system', quote: 'Built for the way a studio actually runs, not a generic sales tool with yoga photos on it.' },
  { id: 't-14', person: 'grace-mbeki', wall: 'rows', pillar: 'bottleneck', quote: 'The setup was done for us. I had braced for a login and a good luck email.' },
  { id: 't-15', person: 'toby-nash', wall: 'rows', pillar: 'bottleneck', quote: 'I still work hard. I just do not work on the plumbing any more.' },

  /* ── the columns: one longer thought, read while it drifts past ── */
  { id: 't-16', person: 'harriet-vale', wall: 'columns', pillar: 'bottleneck', quote: 'I have bought software before and ended up with a very expensive to-do list. This time somebody built the thing, showed my team how to run it, and then it kept running without me.' },
  { id: 't-17', person: 'sam-okada', wall: 'columns', pillar: 'steady', quote: 'The part I did not expect was how quiet it got. No chasing, no reminding, no wondering whether the follow-up went out. It went out.' },
  { id: 't-18', person: 'fleur-beaumont', wall: 'columns', pillar: 'one-system', quote: 'Every tool I had was good at one thing and blind to the others. Putting the enquiry, the booking and the follow-up in one place fixed problems I had stopped noticing.' },
  { id: 't-19', person: 'kiri-solomon', wall: 'columns', pillar: 'bottleneck', quote: 'I did not want a CRM. I wanted my evenings back. It turns out that meant getting a CRM, but one somebody else set up properly.' },
  { id: 't-20', person: 'nate-cardoso', wall: 'columns', pillar: 'steady', quote: 'Honest version: for the first fortnight I kept checking it was working. Now I look once a week and it is boring, which is the whole point.' },
  { id: 't-21', person: 'imogen-pryce', wall: 'columns', pillar: 'steady', quote: 'My clients noticed before I told them anything had changed. Nothing falls through, and the reminders sound like a person wrote them.' },
  { id: 't-22', person: 'ravi-kapoor', wall: 'columns', pillar: 'one-system', quote: 'We run a clinic, not a marketing department. Having the sales side handled by something that already understands allied health is the difference.' },
  { id: 't-23', person: 'lena-fischer', wall: 'columns', pillar: 'bottleneck', quote: 'I was the bottleneck and I knew it. Handing the process to a system instead of to another hire is the smartest money I have spent this year.' },
  { id: 't-24', person: 'josh-iremonger', wall: 'columns', pillar: 'one-system', quote: 'Three staff who all used to do it their own way. Now there is one way, and it is written into the system rather than into my head.' },
  { id: 't-25', person: 'tara-whitmore', wall: 'columns', pillar: 'bottleneck', quote: 'I do not think of myself as a tech person and I have not needed to be. Somebody sat with me, built it, and left it working.' },
  { id: 't-26', person: 'elias-mwangi', wall: 'columns', pillar: 'steady', quote: 'Full disclosure, I nearly pushed the setup back a month because I was busy. It happened anyway, and I am glad somebody held me to it.' },
  { id: 't-27', person: 'cass-donnelly', wall: 'columns', pillar: 'bottleneck', quote: 'Thirty years in practice and the admin was still eating my Sundays. It is not eating them any more.' },
  { id: 't-28', person: 'mina-park', wall: 'columns', pillar: 'one-system', quote: 'I had a studio system and an online system and they did not talk to each other. Now there is one list of people and one place to look.' },
  { id: 't-29', person: 'rob-hargreaves', wall: 'columns', pillar: 'one-system', quote: 'I am not the target market for anything with wellness in the name. I still open it every day, because it does the job without a fuss.' },
  { id: 't-30', person: 'simone-adeyemi', wall: 'columns', pillar: 'steady', quote: 'What sold me was that nobody asked me to learn their software. They asked how I work, and then they built that.' },
];

export const testimonialsFor = (wall: Wall) => TESTIMONIALS.filter((t) => t.wall === wall);
