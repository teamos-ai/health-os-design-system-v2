/**
 * Blog: the parts of a Health OS article page and blog index.
 *
 * Article page, top to bottom: Breadcrumb, a category badge, the Headline (apricot accent word, floating icon tiles), a
 * standfirst, ArticleMeta (author, date, reading time, copy link), the hero figure, then
 * ArticleLayout: the reading column beside a TableOfContents. Inside the body: subheadings,
 * running text, PullQuote, figures and tables. It ends with tags, AuthorNote, related posts
 * and one next step.
 *
 * Blog index: the Headline (apricot accent word, floating icon tiles), one FeaturedPost, CategoryFilter, a grid of content
 * cards with a result count for screen readers, and Pagination.
 *
 * Nothing here uses a filled block behind reading text: pull quotes sit on a rose rule.
 * Apricot marks only what you can act on or have chosen: the selected filter and the
 * table of contents' current section.
 */
import * as React from 'react';
import { ArrowRight, Link2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { Tooltip } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/toast';
import { Avatar } from '@/components/widgets/relational';
import type { WidgetAccent } from '@/components/widgets/tones';
import { cn } from '@/lib/utils';

export interface Author {
  name: string;
  initials: string;
  role: string;
  accent?: WidgetAccent;
}

/** Author, date and reading time, with a copy-link action. */
export const ArticleMeta = ({ author, date, readTime, className }: { author: Author; date: string; readTime: string; className?: string }) => {
  const { toast } = useToast();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copied' });
    } catch {
      toast({ title: 'Copy the link from the address bar', tone: 'warning' });
    }
  };
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-4 border-y border-line py-4', className)}>
      <div className="flex items-center gap-3">
        <Avatar initials={author.initials} accent={author.accent} className="h-10 w-10" />
        <div>
          <p className="font-sans text-body text-ink-900">{author.name}</p>
          <p className="font-sans text-label text-ink-500">
            {date} · {readTime}
          </p>
        </div>
      </div>
      <Tooltip label="Copy link">
        <IconButton variant="secondary" size="small" aria-label="Copy link to this article" onClick={copy}>
          <Link2 className="h-4 w-4" strokeWidth={1.5} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

/** A quote from the article, set larger on a soft rose rule. Never a filled block. */
export const PullQuote = ({ children, cite }: { children: React.ReactNode; cite?: string }) => (
  <figure className="my-10 border-l-2 border-rose-200 pl-6">
    <blockquote>
      <p className="font-display text-subheading text-ink-900">{children}</p>
    </blockquote>
    {cite && <figcaption className="mt-3 font-sans text-label text-ink-500">{cite}</figcaption>}
  </figure>
);

/**
 * On this page: links to the article's subheadings. The section in view is marked with an
 * apricot rule. Sticky from lg, beside the reading column.
 */
export const TableOfContents = ({ items, className }: { items: { id: string; label: string }[]; className?: string }) => {
  const [active, setActive] = React.useState(items[0]?.id);
  React.useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '0px 0px -60% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav aria-label="On this page" className={cn('lg:sticky lg:top-8', className)}>
      <p className="font-sans text-label uppercase text-ink-500">On this page</p>
      <ol className="mt-3 flex flex-col border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
              className={cn(
                '-ml-px block border-l-2 py-2 pl-4 font-sans text-body transition-colors duration-sm ease-out',
                active === item.id ? 'border-apricot-200 text-ink-900' : 'border-transparent text-ink-500 hover:text-ink-900'
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

/**
 * The article body beside its table of contents. One column on phones and tablets, the
 * contents beside the reading column from lg. Both columns can shrink (min-w-0), so a wide
 * table scrolls inside its own frame instead of pushing text off the screen.
 */
export const ArticleLayout = ({ toc, children, className }: { toc?: { id: string; label: string }[]; children: React.ReactNode; className?: string }) => (
  <div className={cn('grid gap-10', toc && 'lg:grid-cols-[12rem_minmax(0,1fr)]', className)}>
    {toc && <TableOfContents items={toc} className="min-w-0 self-start" />}
    <div className="min-w-0 max-w-reading">{children}</div>
  </div>
);

/** Who wrote it, after the article: the author, one line and a link to more of their writing. */
export const AuthorNote = ({ author, bio, href = '#' }: { author: Author; bio: string; href?: string }) => (
  <aside className="flex gap-4 rounded-lg border border-line bg-surface p-6">
    <Avatar initials={author.initials} accent={author.accent} className="h-12 w-12" />
    <div className="flex flex-col items-start gap-1">
      <p className="font-display text-body text-ink-900">{author.name}</p>
      <p className="font-sans text-label uppercase text-ink-500">{author.role}</p>
      <p className="mt-2 font-sans text-body text-ink-600">{bio}</p>
      <Button variant="text" size="small" href={href} className="mt-2">
        More from {author.name.split(' ')[0]}
      </Button>
    </div>
  </aside>
);

/** The category filter for a blog index: All plus each category, one selected. */
export const CategoryFilter = ({
  categories,
  value,
  onChange,
}: {
  categories: string[];
  value: string;
  onChange: (category: string) => void;
}) => (
  <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
    {['All', ...categories].map((c) => {
      const selected = c === value;
      return (
        <button
          key={c}
          type="button"
          aria-pressed={selected}
          onClick={() => onChange(c)}
          className={cn(
            'rounded-md border px-3 py-2 font-sans text-body transition-colors duration-sm ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900',
            selected ? 'border-apricot-200 bg-apricot-50 text-ink-900' : 'border-line bg-surface text-ink-600 hover:border-ink-400 hover:text-ink-900'
          )}
        >
          {c}
        </button>
      );
    })}
  </div>
);

export interface PostSummary {
  title: string;
  excerpt: string;
  category: string;
  image: { src: string; alt: string };
  author: Author;
  date: string;
  readTime: string;
  href?: string;
}

/** The one featured post at the top of a blog index: the photo dissolves toward the text. */
export const FeaturedPost = ({ post, className }: { post: PostSummary; className?: string }) => (
  <article className={cn('group grid overflow-hidden rounded-lg border border-line bg-surface md:grid-cols-2', className)}>
    <div className="image-fade-b relative min-h-64 overflow-hidden md:image-fade-r">
      <img
        src={post.image.src}
        alt={post.image.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
    <div className="flex flex-col items-start gap-4 p-6 md:p-10">
      <div className="flex items-center gap-3">
        <Badge variant="rose" size="sm">
          Featured
        </Badge>
        <span className="font-sans text-label uppercase text-ink-500">{post.category}</span>
      </div>
      <h3 className="font-display text-subheading text-ink-900">{post.title}</h3>
      <p className="font-sans text-body text-ink-600">{post.excerpt}</p>
      <div className="mt-auto flex items-center gap-3 pt-4">
        <Avatar initials={post.author.initials} accent={post.author.accent} />
        <p className="font-sans text-label text-ink-500">
          <span className="text-ink-900">{post.author.name}</span> · {post.date} · {post.readTime}
        </p>
      </div>
      <Button
        variant="text"
        href={post.href ?? '#'}
        trailingIcon={<ArrowRight className="h-4 w-4 transition-transform duration-sm ease-out group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />}
      >
        Read the article
      </Button>
    </div>
  </article>
);
