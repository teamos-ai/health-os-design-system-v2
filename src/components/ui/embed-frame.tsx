/**
 * EmbedFrame — a self-sizing, same-origin iframe used to host a finished, self-contained
 * HTML design (served from /public/embeds). It measures the embedded document and grows
 * the iframe to fit, so the embed reads as a native, scroll-free part of the page.
 * Shows a shimmer skeleton until the document loads and a calm inline message if it
 * cannot; the height resets whenever `src` changes.
 */
import { useEffect, useRef, useState } from 'react';

export const EmbedFrame = ({
  src,
  title,
  minHeight = 600,
}: {
  src: string;
  title: string;
  minHeight?: number;
}) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(minHeight);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // A new src is a new document — drop the stale measurement and states.
  useEffect(() => {
    setHeight(minHeight);
    setLoaded(false);
    setFailed(false);
  }, [src, minHeight]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ro: ResizeObserver | null = null;

    const measure = () => {
      try {
        const doc = el.contentDocument;
        if (doc?.documentElement) {
          setHeight(Math.max(minHeight, doc.documentElement.scrollHeight + 2));
        }
      } catch {
        /* cross-origin (shouldn't happen for same-origin /embeds) — keep min height */
      }
    };

    const onLoad = () => {
      setLoaded(true);
      measure();
      // Re-measure after web-fonts/layout settle.
      setTimeout(measure, 300);
      setTimeout(measure, 1200);
      try {
        const body = el.contentDocument?.body;
        if (body && 'ResizeObserver' in window) {
          ro = new ResizeObserver(measure);
          ro.observe(body);
        }
      } catch {
        /* ignore */
      }
    };

    el.addEventListener('load', onLoad);
    if (el.contentDocument?.readyState === 'complete') onLoad();
    return () => {
      el.removeEventListener('load', onLoad);
      ro?.disconnect();
    };
  }, [src, minHeight, failed]);

  if (failed) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-line bg-surface p-8">
        <p className="rounded-md border border-line px-4 py-3 font-mono text-caption text-ink-600">
          This embed could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-line bg-surface">
      <iframe
        ref={ref}
        src={src}
        title={title}
        loading="lazy"
        // `scrolling` is deprecated but remains the only reliable way to suppress the
        // embedded document's own scrollbars cross-browser (CSS overflow on the iframe
        // element doesn't reach the inner document). Kept deliberately.
        scrolling="no"
        onError={() => setFailed(true)}
        className="block w-full"
        style={{ height, border: 0 }}
      />
      {/* loading skeleton — shimmer sheen until the document's load event fires */}
      {!loaded && (
        <div className="absolute inset-0 bg-surface-2">
          <div className="h-full w-full animate-shimmer bg-gradient-to-r from-surface-2 via-surface to-surface-2 bg-[length:200%_100%]" />
          <span className="sr-only">Loading embedded content</span>
        </div>
      )}
    </div>
  );
};
