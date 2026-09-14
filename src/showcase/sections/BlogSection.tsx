/**
 * BlogSection: the blog system. An article page (breadcrumb, two-tone headline, meta, hero
 * figure, table of contents beside the reading column, pull quote on a rose rule, a
 * table, then tags, author, related posts and one next step) and a blog index (headline,
 * featured post, category filter, post grid and pagination). Headlines render as h3 so the
 * reference keeps one h1; on a real page each is the h1.
 */
import * as React from 'react';
import { Check, X } from 'lucide-react';
import { Section, Example } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Headline } from '@/components/ui/headline';
import { Pagination } from '@/components/ui/pagination';
import { ContentCard, ResourceCard } from '@/components/cards';
import { ArticleLayout, ArticleMeta, AuthorNote, CategoryFilter, FeaturedPost, PullQuote, type Author, type PostSummary } from '@/components/blog/Blog';
import { Appear } from '@/components/ui/animated';
import { PHOTOS } from '@/data/photos';
import { thumb } from '@/lib/images';

const ROWS = [
  { job: 'Online booking', one: true, stack: false },
  { job: 'Automatic reminders', one: true, stack: true },
  { job: 'Client records in one place', one: true, stack: false },
];

const Mark = ({ yes }: { yes: boolean }) =>
  yes ? (
    <>
      <Check className="h-4 w-4 text-success-600" strokeWidth={2} aria-hidden />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <X className="h-4 w-4 text-ink-400" strokeWidth={1.5} aria-hidden />
      <span className="sr-only">Not included</span>
    </>
  );

const photo = (fragment: string) => {
  const p = PHOTOS.find((x) => x.src.includes(fragment)) ?? PHOTOS[0];
  return { src: thumb(p.src), alt: p.description };
};

const JORDAN: Author = { name: 'Jordan Lee', initials: 'JL', role: 'Operations writer', accent: 'lavender' };
const PRIYA: Author = { name: 'Priya Kapoor', initials: 'PK', role: 'Movement coach', accent: 'rose' };

const TOC = [
  { id: 'blog-time', label: 'Where the time goes' },
  { id: 'blog-first', label: 'What to bring together first' },
  { id: 'blog-compare', label: 'A quick comparison' },
];

const POSTS: PostSummary[] = [
  { title: 'A calmer onboarding for new members', excerpt: 'What a new client receives, in order, without anyone sending it by hand.', category: 'Onboarding', image: photo('three-women-chatting-in-wellness-studio-with-drinks-16-9'), author: PRIYA, date: '4 September 2026', readTime: '4 min read' },
  { title: 'Reminders that go out on time', excerpt: 'Which messages to send before and after a session, and which to leave out.', category: 'Operations', image: photo('two-women-having-coffee-at-outdoor-bistro-table-16-9'), author: JORDAN, date: '28 August 2026', readTime: '5 min read' },
  { title: 'Posting without the Sunday scramble', excerpt: 'A simple rhythm for filming and sharing between client sessions.', category: 'Marketing', image: photo('woman-walking-with-iced-coffee-sydney-harbour-backdrop-16-9'), author: PRIYA, date: '21 August 2026', readTime: '6 min read' },
  { title: 'Counting what your tools cost', excerpt: 'List every subscription, what it does and who logs in, before changing anything.', category: 'Operations', image: photo('three-women-coworking-on-boucle-sofa-with-laptop-and-coffee-studio-lounge-16-9'), author: JORDAN, date: '14 August 2026', readTime: '3 min read' },
  { title: 'The first week of a new member', excerpt: 'Welcome, forms and a first booking, sent in the order a new client needs them.', category: 'Onboarding', image: photo('two-women-relaxing-on-grass-overhead-shot-16-9'), author: PRIYA, date: '7 August 2026', readTime: '5 min read' },
  { title: 'Filming between sessions', excerpt: 'Short updates you can record in ten minutes, without a studio or a script.', category: 'Marketing', image: photo('woman-in-peach-activewear-cross-legged-with-green-smoothie-at-cafe-16-9'), author: PRIYA, date: '31 July 2026', readTime: '4 min read' },
];

const FEATURED: PostSummary = {
  title: 'Fewer tools, wired together',
  excerpt: 'Most wellness businesses end up running on a handful of separate tools. This is a look at what to bring together first, and what can wait.',
  category: 'Operations',
  image: photo('woman-filming-content-on-laptop-by-city-window-16-9'),
  author: JORDAN,
  date: '11 September 2026',
  readTime: '6 min read',
  href: '#blog-article',
};

const ArticleExample = () => {
  const hero = photo('woman-filming-content-on-laptop-by-city-window-16-9');
  return (
    <Example id="article" label="Article page">
      <article id="blog-article" className="mx-auto max-w-4xl scroll-mt-8 py-4">
        <Breadcrumb items={[{ label: 'Blog', href: '#blog' }, { label: 'Operations', href: '#blog' }, { label: 'Fewer tools, wired together' }]} />

        <header className="mt-8 max-w-3xl">
          <Badge variant="lavender">Operations</Badge>
          <Headline as="h3" lead="Fewer {tools} tools," rest="wired {cables} together" className="mt-6" />
          <p className="mt-6 max-w-reading font-sans text-body text-ink-600">
            Most wellness businesses end up running on a handful of separate tools. This is a look at what to bring together first, and what can wait.
          </p>
          <ArticleMeta author={JORDAN} date="11 September 2026" readTime="6 min read" className="mt-8" />
        </header>

        <figure className="mt-10">
          <img src={hero.src} alt={hero.alt} loading="lazy" decoding="async" className="aspect-video w-full rounded-lg object-cover" />
          <figcaption className="mt-3 font-sans text-label text-ink-500">Recording a short update between client sessions.</figcaption>
        </figure>

        <ArticleLayout toc={TOC} className="mt-12">
          <h4 id="blog-time" className="scroll-mt-8 font-display text-subheading text-ink-900">
            Where the time goes
          </h4>
          <p className="mt-3 font-sans text-body text-ink-600">
            Admin rarely arrives as one big block. It leaks across the week: a reminder here, a rescheduled session there, a payment chased the next morning.
          </p>
          <p className="mt-4 font-sans text-body text-ink-600">
            The answer is rarely another tool. It is usually fewer tools, connected, so the same booking, record and message live in one place.
          </p>

          <PullQuote>The goal is not more software. It is one place that holds the whole relationship with a client.</PullQuote>

          <h4 id="blog-first" className="scroll-mt-8 font-display text-subheading text-ink-900">
            What to bring together first
          </h4>
          <p className="mt-3 font-sans text-body text-ink-600">
            Start where a client first meets you: the booking. Once booking, reminders and the client record share one system, the follow-up can run on its own.
          </p>

          <h4 id="blog-compare" className="mt-10 scroll-mt-8 font-display text-subheading text-ink-900">
            A quick comparison
          </h4>
          <div className="mt-4 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[420px] border-collapse">
              <caption className="sr-only">One connected system compared with separate tools</caption>
              <thead>
                <tr className="border-b border-line bg-surface-2">
                  <th scope="col" className="px-4 py-3 text-left font-sans text-label uppercase text-ink-500">Job</th>
                  <th scope="col" className="w-32 px-2 py-3 text-center font-sans text-label uppercase text-ink-500">One system</th>
                  <th scope="col" className="w-32 px-2 py-3 text-center font-sans text-label uppercase text-ink-500">Separate tools</th>
                </tr>
              </thead>
              <tbody className="bg-surface">
                {ROWS.map((row) => (
                  <tr key={row.job} className="border-b border-line last:border-b-0">
                    <th scope="row" className="px-4 py-3 text-left font-sans text-body font-normal text-ink-900">
                      {row.job}
                    </th>
                    <td className="px-2 py-3">
                      <span className="flex justify-center">
                        <Mark yes={row.one} />
                      </span>
                    </td>
                    <td className="px-2 py-3">
                      <span className="flex justify-center">
                        <Mark yes={row.stack} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
            {['Booking', 'Reminders', 'Tool stack'].map((t) => (
              <li key={t}>
                <Badge variant="outline">{t}</Badge>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <AuthorNote author={JORDAN} bio="Writes about the systems behind small wellness businesses: bookings, follow-up and the admin in between." />
          </div>
        </ArticleLayout>

        <section aria-labelledby="blog-related" className="mt-16 border-t border-line pt-10">
          <h4 id="blog-related" className="font-display text-subheading text-ink-900">
            More in Operations
          </h4>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {POSTS.filter((p) => p.category === 'Operations').slice(0, 2).map((p) => (
              <ContentCard key={p.title} title={p.title} excerpt={p.excerpt} image={p.image} category={p.category} categoryVariant="lavender" meta={`${p.date} · ${p.readTime}`} href="#blog" />
            ))}
          </div>
        </section>

        <div className="mt-10">
          <ResourceCard
            type="Checklist"
            meta="PDF, 2 pages"
            title="Count your stack"
            description="List every tool you pay for, what it does and who logs in to it."
            cover={{ src: thumb('/backgrounds/nature-purple-pink-snowy-peaks-contrail-portrait.png'), alt: 'Snowy peaks under a pink and lavender sky' }}
            action={{ label: 'Get the checklist' }}
            className="md:max-w-md"
          />
        </div>
      </article>
    </Example>
  );
};

const PAGE_SIZE = 3;

const BlogIndexExample = () => {
  const [category, setCategory] = React.useState('All');
  const [page, setPage] = React.useState(1);
  const filtered = POSTS.filter((p) => category === 'All' || p.category === category);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const shown = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Example id="blog-index" label="Blog index">
      <div className="py-4">
        <Headline as="h3" lead="Notes for a calm {stones} practice" rest="that runs {computer} on its own" className="max-w-3xl" />
        <p className="mt-6 max-w-reading font-sans text-body text-ink-600">Plain guides on bookings, clients and the admin in between.</p>

        <FeaturedPost post={FEATURED} className="mt-10" />

        <div className="mt-10 flex flex-col gap-6">
          <CategoryFilter
            categories={['Operations', 'Onboarding', 'Marketing']}
            value={category}
            onChange={(c) => {
              setCategory(c);
              setPage(1);
            }}
          />
          <p className="sr-only" aria-live="polite">
            {`Showing ${filtered.length} ${filtered.length === 1 ? 'post' : 'posts'}${category === 'All' ? '' : ` in ${category}`}`}
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <Appear key={`${category}-${p.title}`} show>
                <ContentCard title={p.title} excerpt={p.excerpt} image={p.image} category={p.category} categoryVariant="lavender" meta={`${p.author.name} · ${p.readTime}`} href="#blog" className="h-full" />
              </Appear>
            ))}
          </div>
          {pages > 1 && <Pagination page={page} total={pages} onChange={setPage} className="self-center" />}
        </div>
      </div>
    </Example>
  );
};

export const BlogSection = () => (
  <Section id="blog">
    <div className="flex flex-col gap-8">
      <ArticleExample />
      <BlogIndexExample />
    </div>
  </Section>
);
