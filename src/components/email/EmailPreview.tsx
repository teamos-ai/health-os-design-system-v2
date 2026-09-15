/**
 * EmailPreview: one email from the library rendered exactly as it will be copied, inside a frame
 * so its inline styles and media query behave as they do in an inbox. Desktop shows the 600px
 * layout; phone narrows the frame to 375px, which triggers the email's own phone styles. The
 * frame grows to the email's full height, so the page scrolls rather than the frame.
 *
 *   <EmailPreview email={email} device="desktop" fields="sample" />
 */
import * as React from 'react';
import { renderEmailHtml, type FieldMode } from '@/lib/email-html';
import type { Email } from '@/data/emails';
import { cn } from '@/lib/utils';

export type PreviewDevice = 'desktop' | 'phone';

export const EmailPreview = ({ email, device, fields, className }: { email: Email; device: PreviewDevice; fields: FieldMode; className?: string }) => {
  const frame = React.useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = React.useState(640);
  const html = React.useMemo(() => renderEmailHtml(email, { base: window.location.origin, fields, highlight: true }), [email, fields]);

  const measure = React.useCallback(() => {
    const doc = frame.current?.contentDocument;
    if (!doc?.body) return;
    /* the body's own height, so a shorter email shrinks the frame rather than keeping the last one's height */
    setHeight(Math.max(320, Math.ceil(doc.body.getBoundingClientRect().height)));
  }, []);

  /* measure once the frame loads, again as its images arrive, and whenever the width changes */
  const onLoad = () => {
    measure();
    frame.current?.contentDocument?.querySelectorAll('img').forEach((img) => img.addEventListener('load', measure, { once: true }));
  };
  React.useEffect(() => {
    const id = window.setTimeout(measure, 60);
    return () => window.clearTimeout(id);
  }, [device, measure]);

  return (
    <div className={cn('flex justify-center overflow-hidden rounded-lg border border-line bg-surface-2 px-2 py-4 sm:px-4', className)}>
      <iframe
        ref={frame}
        title={`Preview: ${email.subject}`}
        srcDoc={html}
        onLoad={onLoad}
        sandbox="allow-same-origin"
        className={cn('block border-0 bg-transparent transition-[width] duration-md ease-out', device === 'phone' ? 'w-full max-w-sm rounded-lg shadow-md' : 'w-full max-w-2xl')}
        style={{ height }}
      />
    </div>
  );
};
