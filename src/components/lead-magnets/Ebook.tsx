/**
 * Ebook: a guide someone can page through before they leave an email address.
 *
 * Closed, it sits on the soft wash like a printed book: the cover's library background dissolves
 * into a surface panel with the format, title and subtitle (text never sits on the raw photo), a
 * light binding crease runs down the spine, and a page edge and back cover sit behind it. Hover or
 * keyboard focus turns it a little so the page edges show. Beside it: what it covers, the page
 * count and one primary action.
 *
 * "Read a preview" (or activating the book) opens a page-flip reader in its place, built on
 * react-pageflip (the page-flip engine, MIT). Pages are real DOM from a typed schema (cover,
 * contents, chapter, quote, cta), so every ebook is set the same way: surface pages with a hairline
 * edge, ink text, label page numbers and image slots from the library or a soft tint. The last page
 * is the call to action, a short email capture. Under the reader: previous and next, the page status
 * (read out politely), arrow keys while the reader has focus, and Close, which returns focus to the
 * book. Two pages side by side where there is room, one page on phones. With reduced motion the book
 * does not turn and pages change almost at once.
 *
 * Wrap the app in <ToastProvider>: a valid address shows `action.confirmation` as a toast.
 */
import * as React from 'react';
import HTMLFlipBook from 'react-pageflip';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { celebrate } from '@/components/ui/celebrate';
import { DURATION, EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';

/** token candidate: motion.duration.page-turn. One page turn in the reader, in ms. */
export const EBOOK_FLIP_MS = 700;
/** token candidate: the reduced-motion page turn, in ms. Not 0: the engine divides by it. */
export const EBOOK_FLIP_REDUCED_MS = 1;
/** token candidate: size.book.width. The closed cover's width in px; the height follows 49:60. */
export const EBOOK_COVER_WIDTH = 240;
/** token candidate: size.book.depth. The closed book's thickness in px (the page edge you see when it turns). */
export const EBOOK_DEPTH = 32;
/** token candidate: motion.book-turn. How far the closed book turns on hover and focus. */
export const EBOOK_TURN = 'rotateY(-20deg) translateX(-8px)';
/** token candidate: the perspective the closed book turns in, in px. */
export const EBOOK_PERSPECTIVE = 900;
/** token candidate: page shadow strength while a page turns (0 to 1). */
export const EBOOK_SHADOW_OPACITY = 0.25;
/**
 * token candidate: size.book.page. Reader page proportions and limits in px. `spread` shows two pages
 * side by side; below twice its minimum width the reader switches to `single`, a taller page.
 */
export const EBOOK_PAGE = {
  spread: { width: 400, height: 540, minWidth: 320, maxWidth: 400 },
  single: { width: 320, height: 520, minWidth: 240, maxWidth: 400 },
} as const;

export interface EbookImage {
  src: string;
  alt: string;
}

export interface EbookAction {
  /** the submit button, e.g. "Send me the ebook" */
  label: string;
  /** the email field's label, default "Email" */
  fieldLabel?: string;
  placeholder?: string;
  /** called with a valid address: connect it to the email tool */
  onSubmit?: (email: string) => void;
  /** the toast shown after a valid address */
  confirmation?: { title: string; description?: string };
}

/** One page of the ebook. Every ebook is built from these five kinds, so they all read the same. */
export type EbookPage =
  | { kind: 'cover' }
  | { kind: 'contents'; title?: string; items: { label: string; page: number }[] }
  | {
      kind: 'chapter';
      number: number;
      title: string;
      /** one or two short paragraphs; keep a page with an image to one */
      body: string[];
      /** a library image, or a soft tint holding a short label */
      image?: EbookImage | { placeholder: string };
    }
  | { kind: 'quote'; text: string; cite?: string }
  | { kind: 'cta'; title: string; body: string; action?: EbookAction };

export interface EbookProps {
  title: string;
  subtitle: string;
  /** a background from the library; it dissolves into the cover's title panel */
  cover: EbookImage;
  pages: EbookPage[];
  /** the email capture on the last page (a `cta` page can override it) */
  action: EbookAction;
  /** the format badge on the cover, default "Ebook" */
  format?: string;
  /** one or two sentences beside the closed book */
  description?: string;
  /** the button that opens the reader, default "Read a preview" */
  readLabel?: string;
  className?: string;
}

type Orientation = 'portrait' | 'landscape';

/** The parts of the page-flip engine this component calls. */
interface FlipEngine {
  flipNext: (corner?: 'top' | 'bottom') => void;
  flipPrev: (corner?: 'top' | 'bottom') => void;
  destroy: () => void;
  getRender: () => { render: (time: number) => void };
}
interface FlipEvent<T> {
  data: T;
  object: FlipEngine;
}

interface EbookContextValue {
  title: string;
  subtitle: string;
  cover: EbookImage;
  format: string;
  action: EbookAction;
}
const EbookContext = React.createContext<EbookContextValue | null>(null);
const useEbook = () => {
  const ctx = React.useContext(EbookContext);
  if (!ctx) throw new Error('Ebook pages render inside <Ebook>');
  return ctx;
};

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

/** The pages in view: one in portrait; in landscape the cover alone, then pairs, then a last single page. */
const visiblePages = (index: number, total: number, mode: Orientation): number[] => {
  if (mode === 'portrait' || index === 0) return [index];
  const left = index % 2 === 1 ? index : index - 1;
  return left + 1 < total ? [left, left + 1] : [left];
};

/* ── Closed book ── */

const ClosedBook = React.forwardRef<HTMLButtonElement, { onOpen: () => void; label: string }>(({ onOpen, label }, ref) => {
  const { title, subtitle, cover, format } = useEbook();
  const W = EBOOK_COVER_WIDTH;
  const D = EBOOK_DEPTH;
  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      aria-label={`${label}: ${title}`}
      className={cn('group/book relative block rounded-md text-left', focusRing)}
      style={{ perspective: `${EBOOK_PERSPECTIVE}px` }}
    >
      <span
        className="relative block transition-transform duration-md ease-out motion-safe:group-hover/book:[transform:var(--ebook-turn)] motion-safe:group-focus-visible/book:[transform:var(--ebook-turn)]"
        style={{ width: W, aspectRatio: '49 / 60', transformStyle: 'preserve-3d', ['--ebook-turn' as string]: EBOOK_TURN }}
      >
        {/* front cover */}
        <span className="relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface shadow-md transition-shadow duration-md ease-out group-hover/book:shadow-lg">
          <span className="image-fade-b relative block min-h-0 flex-1">
            <img src={cover.src} alt="" draggable={false} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          </span>
          <span className="flex flex-col items-start gap-2 bg-surface pb-5 pl-8 pr-4">
            <Badge size="sm">{format}</Badge>
            <span className="font-display text-subheading text-ink-900">{title}</span>
            <span className="font-sans text-label text-ink-600">{subtitle}</span>
          </span>
          {/* binding crease: a soft shade on the spine and a light fold line */}
          <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-ink-900/5" />
          <span aria-hidden className="pointer-events-none absolute inset-y-0 left-3 w-px bg-ink-900/10" />
          <span aria-hidden className="pointer-events-none absolute inset-y-0 left-4 w-px bg-white/60" />
        </span>
        {/* page edge, turned to face right */}
        <span
          aria-hidden
          className="absolute left-0 block border-y border-line bg-surface-2"
          style={{ top: 3, height: 'calc(100% - 6px)', width: D - 2, transform: `translateX(${W - D / 2 - 3}px) rotateY(90deg) translateX(${D / 2}px)` }}
        />
        {/* back cover */}
        <span aria-hidden className="absolute inset-0 block rounded-md border border-line bg-ink-200" style={{ transform: `translateZ(${-D}px)` }} />
      </span>
    </button>
  );
});
ClosedBook.displayName = 'ClosedBook';

/* ── Pages ── */

const PageFooter = ({ n }: { n: number }) => {
  const { title } = useEbook();
  return (
    <div className="mt-auto flex items-center justify-between gap-4 pt-4">
      <span className="min-w-0 truncate font-sans text-label text-ink-500">{title}</span>
      <span className="shrink-0 font-sans text-label text-ink-500">{n}</span>
    </div>
  );
};

const CoverPage = () => {
  const { title, subtitle, cover, format } = useEbook();
  return (
    <div className="flex h-full flex-col">
      <div className="image-fade-b relative min-h-0 flex-1">
        <img src={cover.src} alt="" draggable={false} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="flex flex-col items-start gap-3 px-6 pb-8 sm:px-8">
        <Badge size="sm">{format}</Badge>
        <p className="font-display text-subheading text-ink-900">{title}</p>
        <p className="font-sans text-body text-ink-600">{subtitle}</p>
      </div>
    </div>
  );
};

const ContentsPage = ({ page, n }: { page: Extract<EbookPage, { kind: 'contents' }>; n: number }) => (
  <div className="flex h-full flex-col p-6 sm:p-8">
    <p className="font-sans text-label uppercase text-ink-500">Contents</p>
    <h4 className="mt-3 font-display text-subheading text-ink-900">{page.title ?? 'In this preview'}</h4>
    <ol className="mt-4 flex flex-col">
      {page.items.map((item) => (
        <li key={item.label} className="flex items-baseline justify-between gap-4 border-b border-line-soft py-2">
          <span className="min-w-0 font-sans text-body text-ink-900">{item.label}</span>
          <span className="shrink-0 font-sans text-label text-ink-500">{item.page}</span>
        </li>
      ))}
    </ol>
    <PageFooter n={n} />
  </div>
);

const ChapterPage = ({ page, n }: { page: Extract<EbookPage, { kind: 'chapter' }>; n: number }) => {
  const photo = page.image && 'src' in page.image ? page.image : null;
  const tint = page.image && 'placeholder' in page.image ? page.image : null;
  return (
    <div className="flex h-full flex-col">
      {photo && (
        <div className="image-fade-b relative h-32 shrink-0 overflow-hidden sm:h-40">
          <img src={photo.src} alt={photo.alt} draggable={false} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      )}
      {tint && (
        <div className="mx-6 mt-6 flex h-28 shrink-0 items-center justify-center rounded-md bg-lavender-50 px-4 text-center ring-1 ring-inset ring-lavender-200 sm:mx-8 sm:mt-8">
          <span className="font-sans text-label text-ink-600">{tint.placeholder}</span>
        </div>
      )}
      <div className={cn('flex min-h-0 flex-1 flex-col gap-3 p-6 sm:p-8', photo && 'pt-2 sm:pt-2')}>
        <p className="font-sans text-label uppercase text-ink-500">Chapter {page.number}</p>
        <h4 className="font-display text-subheading text-ink-900">{page.title}</h4>
        {page.body.map((paragraph) => (
          <p key={paragraph} className="font-sans text-body text-ink-600">
            {paragraph}
          </p>
        ))}
        <PageFooter n={n} />
      </div>
    </div>
  );
};

const QuotePage = ({ page, n }: { page: Extract<EbookPage, { kind: 'quote' }>; n: number }) => (
  <div className="flex h-full flex-col p-6 sm:p-8">
    <figure className="my-auto border-l-2 border-rose-200 pl-6">
      <blockquote>
        <p className="font-display text-subheading text-ink-900">{page.text}</p>
      </blockquote>
      {page.cite && <figcaption className="mt-3 font-sans text-label text-ink-500">{page.cite}</figcaption>}
    </figure>
    <PageFooter n={n} />
  </div>
);

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CtaPage = ({ page, n }: { page: Extract<EbookPage, { kind: 'cta' }>; n: number }) => {
  const { action: bookAction } = useEbook();
  const action = page.action ?? bookAction;
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState<string>();
  const formRef = React.useRef<HTMLFormElement>(null);
  const submitRef = React.useRef<HTMLButtonElement>(null);

  /* The engine turns the page on mousedown and cancels its default, which would keep the field
     from taking focus. Stop those events at the form, natively, before they reach the engine. */
  React.useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const stop = (e: Event) => e.stopPropagation();
    form.addEventListener('mousedown', stop);
    form.addEventListener('touchstart', stop, { passive: true });
    return () => {
      form.removeEventListener('mousedown', stop);
      form.removeEventListener('touchstart', stop);
    };
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setError('Enter an email address, such as name@example.com');
      return;
    }
    setError(undefined);
    action.onSubmit?.(value);
    celebrate(submitRef.current);
    if (action.confirmation) toast({ ...action.confirmation, tone: 'success' });
    setEmail('');
  };

  return (
    <div className="flex h-full flex-col p-6 sm:p-8">
      <p className="font-sans text-label uppercase text-ink-500">The full ebook</p>
      <h4 className="mt-3 font-display text-subheading text-ink-900">{page.title}</h4>
      <p className="mt-3 font-sans text-body text-ink-600">{page.body}</p>
      <form ref={formRef} noValidate onSubmit={submit} className="mt-6 flex flex-col gap-3">
        <Input
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          label={action.fieldLabel ?? 'Email'}
          placeholder={action.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
        <Button ref={submitRef} type="submit" className="w-full">
          {action.label}
        </Button>
      </form>
      <PageFooter n={n} />
    </div>
  );
};

const PageView = ({ page, index }: { page: EbookPage; index: number }) => {
  const n = index + 1;
  switch (page.kind) {
    case 'cover':
      return <CoverPage />;
    case 'contents':
      return <ContentsPage page={page} n={n} />;
    case 'chapter':
      return <ChapterPage page={page} n={n} />;
    case 'quote':
      return <QuotePage page={page} n={n} />;
    case 'cta':
      return <CtaPage page={page} n={n} />;
  }
};

/* ── Reader ── */

const BOOK_STYLE: React.CSSProperties = { overflow: 'visible' };

/** One engine instance. Keyed by layout, so a new one is built when the layout changes. */
const FlipBook = ({
  single,
  startPage,
  reduced,
  engineRef,
  onInit,
  onFlip,
  onOrientation,
  children,
}: {
  single: boolean;
  startPage: number;
  reduced: boolean;
  engineRef: React.MutableRefObject<FlipEngine | null>;
  onInit: (e: FlipEvent<{ page: number; mode: Orientation }>) => void;
  onFlip: (e: FlipEvent<number>) => void;
  onOrientation: (e: FlipEvent<Orientation>) => void;
  children: React.ReactNode;
}) => {
  const own = React.useRef<FlipEngine | null>(null);
  const dims = single ? EBOOK_PAGE.single : EBOOK_PAGE.spread;
  const ratio = dims.width / dims.height;

  const handleInit = React.useCallback(
    (e: FlipEvent<{ page: number; mode: Orientation }>) => {
      own.current = e.object;
      engineRef.current = e.object;
      onInit(e);
    },
    [engineRef, onInit]
  );

  /* The engine has no stop for its frame loop: silence it, then remove its listeners. */
  React.useEffect(
    () => () => {
      const engine = own.current;
      if (!engine) return;
      if (engineRef.current === engine) engineRef.current = null;
      try {
        engine.getRender().render = () => undefined;
        engine.destroy();
      } catch {
        /* already gone */
      }
    },
    [engineRef]
  );

  return (
    <div className="mx-auto w-full" style={{ maxWidth: single ? dims.maxWidth : dims.maxWidth * 2 }}>
      <HTMLFlipBook
        className=""
        style={BOOK_STYLE}
        startPage={startPage}
        size="stretch"
        width={dims.width}
        height={dims.height}
        minWidth={dims.minWidth}
        maxWidth={dims.maxWidth}
        minHeight={Math.round(dims.minWidth / ratio)}
        maxHeight={Math.round(dims.maxWidth / ratio)}
        drawShadow
        maxShadowOpacity={EBOOK_SHADOW_OPACITY}
        flippingTime={reduced ? EBOOK_FLIP_REDUCED_MS : EBOOK_FLIP_MS}
        usePortrait
        startZIndex={0}
        autoSize
        showCover
        mobileScrollSupport
        clickEventForward
        useMouseEvents
        swipeDistance={30}
        showPageCorners={!reduced}
        disableFlipByClick={false}
        onInit={handleInit}
        onFlip={onFlip}
        onChangeOrientation={onOrientation}
      >
        {children}
      </HTMLFlipBook>
    </div>
  );
};

const Reader = ({ pageNodes, total, reduced, onClose }: { pageNodes: React.ReactNode; total: number; reduced: boolean; onClose: () => void }) => {
  const { title } = useEbook();
  const regionRef = React.useRef<HTMLDivElement>(null);
  const measureRef = React.useRef<HTMLDivElement>(null);
  const engineRef = React.useRef<FlipEngine | null>(null);
  const pageRef = React.useRef(0);
  const [available, setAvailable] = React.useState<number | null>(null);
  const [view, setView] = React.useState<{ page: number; mode: Orientation }>({ page: 0, mode: 'landscape' });

  React.useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const measure = () => setAvailable(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const region = regionRef.current;
    region?.focus({ preventScroll: true });
    region?.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
  }, [reduced]);

  const single = available !== null && available < 2 * EBOOK_PAGE.spread.minWidth;
  const bookKey = `${single ? 'single' : 'spread'}-${reduced ? 'still' : 'moving'}`;
  /* a new layout reopens on the page in view */
  const startPage = React.useMemo(() => (bookKey ? pageRef.current : 0), [bookKey]);

  const onInit = React.useCallback((e: FlipEvent<{ page: number; mode: Orientation }>) => {
    pageRef.current = e.data.page;
    setView({ page: e.data.page, mode: e.data.mode });
  }, []);
  const onFlip = React.useCallback((e: FlipEvent<number>) => {
    pageRef.current = e.data;
    setView((v) => ({ ...v, page: e.data }));
  }, []);
  const onOrientation = React.useCallback((e: FlipEvent<Orientation>) => setView((v) => ({ ...v, mode: e.data })), []);

  const shown = visiblePages(view.page, total, view.mode);
  const atStart = shown[0] === 0;
  const atEnd = shown[shown.length - 1] === total - 1;
  const status = shown.length === 2 ? `Pages ${shown[0] + 1} and ${shown[1] + 1} of ${total}` : `Page ${shown[0] + 1} of ${total}`;

  const next = () => {
    if (!atEnd) engineRef.current?.flipNext();
  };
  const prev = () => {
    if (!atStart) engineRef.current?.flipPrev();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('input, textarea, select')) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="sr-only">{title}, preview</h3>
      <div
        ref={regionRef}
        role="region"
        aria-label={`${title}, preview. Use the left and right arrow keys to turn pages.`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={cn('rounded-lg sm:bg-brand-gradient-soft sm:p-8', focusRing)}
      >
        <div ref={measureRef} className="w-full">
          {available !== null && (
            <FlipBook
              key={bookKey}
              single={single}
              startPage={startPage}
              reduced={reduced}
              engineRef={engineRef}
              onInit={onInit}
              onFlip={onFlip}
              onOrientation={onOrientation}
            >
              {pageNodes}
            </FlipBook>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-between">
        <div className="flex items-center gap-3">
          <IconButton aria-label="Previous page" aria-disabled={atStart || undefined} onClick={prev} className="aria-disabled:opacity-50">
            <ChevronLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </IconButton>
          <p aria-live="polite" className="w-40 text-center font-sans text-label text-ink-600">
            {status}
          </p>
          <IconButton aria-label="Next page" aria-disabled={atEnd || undefined} onClick={next} className="aria-disabled:opacity-50">
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </IconButton>
        </div>
        <Button variant="secondary" size="small" onClick={onClose} leadingIcon={<X className="h-4 w-4" strokeWidth={1.5} aria-hidden />}>
          Close
        </Button>
      </div>
    </div>
  );
};

/* ── Ebook ── */

export const Ebook = ({ title, subtitle, cover, pages, action, format = 'Ebook', description, readLabel = 'Read a preview', className }: EbookProps) => {
  const reduced = useReducedMotion() ?? false;
  const [open, setOpen] = React.useState(false);
  const returnFocus = React.useRef(false);

  const ctx = React.useMemo(() => ({ title, subtitle, cover, format, action }), [title, subtitle, cover, format, action]);

  /* The engine takes over these elements, so they are built once per set of pages and never re-rendered.
     Their content reads the book's details from context and can still update. */
  const pageNodes = React.useMemo(
    () =>
      pages.map((page, i) => (
        <div key={`${page.kind}-${i}`} data-density={page.kind === 'cover' ? 'hard' : 'soft'} className="overflow-hidden bg-surface ring-1 ring-inset ring-line">
          <PageView page={page} index={i} />
        </div>
      )),
    [pages]
  );

  const close = React.useCallback(() => {
    returnFocus.current = true;
    setOpen(false);
  }, []);

  /* the closed book mounts after the reader has faded out: take focus back to it then */
  const bookRef = React.useCallback((el: HTMLButtonElement | null) => {
    if (!el || !returnFocus.current) return;
    returnFocus.current = false;
    el.focus();
  }, []);

  const fade = {
    initial: reduced ? false : ({ opacity: 0, y: 8 } as const),
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, transition: { duration: reduced ? 0 : DURATION.sm } },
    transition: { duration: reduced ? 0 : DURATION.md, ease: EASE_OUT },
  };

  return (
    <EbookContext.Provider value={ctx}>
      <div className={cn('min-w-0', className)}>
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div key="reader" {...fade}>
              <Reader pageNodes={pageNodes} total={pages.length} reduced={reduced} onClose={close} />
            </motion.div>
          ) : (
            <motion.div key="closed" {...fade} className="grid items-center gap-8 md:grid-cols-2">
              <div className="flex min-w-0 items-center justify-center rounded-lg bg-brand-gradient-soft px-6 py-12 md:py-16">
                <ClosedBook ref={bookRef} onOpen={() => setOpen(true)} label={readLabel} />
              </div>
              <div className="flex min-w-0 flex-col items-start gap-4">
                <p className="font-sans text-label uppercase text-ink-500">
                  {format} preview · {pages.length} pages
                </p>
                <h3 className="font-display text-subheading text-ink-900">{title}</h3>
                <p className="font-sans text-body text-ink-900">{subtitle}</p>
                {description && <p className="font-sans text-body text-ink-600">{description}</p>}
                <Button onClick={() => setOpen(true)} className="mt-2" leadingIcon={<BookOpen className="h-4 w-4" strokeWidth={1.5} aria-hidden />}>
                  {readLabel}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </EbookContext.Provider>
  );
};
