/**
 * EmbedFrame — a self-sizing, same-origin iframe used to host a finished, self-contained
 * HTML design (served from /public/embeds). It measures the embedded document and grows
 * the iframe to fit, so the embed reads as a native, scroll-free part of the page.
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
  }, [src, minHeight]);

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      <iframe
        ref={ref}
        src={src}
        title={title}
        loading="lazy"
        scrolling="no"
        className="block w-full"
        style={{ height, border: 0 }}
      />
    </div>
  );
};
