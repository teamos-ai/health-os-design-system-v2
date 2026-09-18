/**
 * WarmupSection: the sending-domain warm-up sequence. Six emails over 24 days that exist to earn a
 * new sub-domain a reputation, in the two formats they get pasted into LC Email as.
 *
 * Copy is data (`src/data/warmup.ts`); the plain-text and HTML bodies are both rendered from the
 * same blocks by `src/lib/warmup-render.ts`, so the reference cannot drift from what is sent.
 *
 * Budgets: no primary button and no accent fill anywhere in the section. Every control is
 * secondary or text, because this is a tool rather than a pitch, and the one apricot fill in the
 * whole sequence belongs to the CTA inside email six. The cards collapse; the chevron is the only
 * thing that moves.
 */
import * as React from 'react';
import { ChevronDown, Copy } from 'lucide-react';
import { Section, Demo } from '@/showcase/Section';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { SegmentedControl } from '@/components/ui/segmented';
import { Table } from '@/components/ui/table';
import { useToast } from '@/components/ui/toast';
import { WARMUP, PLAN, RULES, type PlanRow, type WarmupEmail } from '@/data/warmup';
import { allPlainText, toHtml, toPlainText } from '@/lib/warmup-render';
import { cn } from '@/lib/utils';

type View = 'preview' | 'text' | 'html';

const VIEWS = [
  { value: 'preview', label: 'Preview' },
  { value: 'text', label: 'Plain text' },
  { value: 'html', label: 'HTML' },
];

const PLAN_COLUMNS = [
  { key: 'window', header: 'Window' },
  { key: 'sends', header: 'Sends' },
  { key: 'segment', header: 'Segment added' },
  { key: 'cap', header: 'Daily cap', numeric: true },
];

/** Copy to the clipboard and say so, or say why not. Same behaviour as the email library. */
const useCopy = () => {
  const { toast } = useToast();
  return async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: `Copied the ${label}` });
    } catch {
      toast({
        title: `Could not copy the ${label}`,
        description: 'Your browser blocked the clipboard. Select the text in the panel instead.',
        tone: 'warning',
      });
    }
  };
};

/**
 * One email, collapsed to its header until opened. The whole header row is the trigger, so the
 * target is the width of the card; the chevron turns over and nothing else moves.
 */
const EmailCard = ({ email, defaultOpen = false }: { email: WarmupEmail; defaultOpen?: boolean }) => {
  const [open, setOpen] = React.useState(defaultOpen);
  const [view, setView] = React.useState<View>('text');
  const id = React.useId();
  const copy = useCopy();

  const text = React.useMemo(() => toPlainText(email), [email]);
  const html = React.useMemo(() => toHtml(email), [email]);
  const body = view === 'text' ? text : html;

  return (
    <div className="overflow-clip rounded-lg border border-line bg-surface">
      <h3>
        <button
          type="button"
          id={`${id}-trigger`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-start gap-4 p-6 text-left transition-colors duration-sm ease-out hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-paper md:p-8"
        >
          <span className="flex min-w-0 flex-1 flex-col gap-2">
            <span className="font-sans text-label uppercase text-ink-500">
              Email {String(email.n).padStart(2, '0')} · Day {email.day} ·{' '}
              {email.links === 0 ? 'no body link' : `${email.links} link`}
            </span>
            <span className="font-display text-subheading text-ink-900">{email.subject}</span>
            <span className="font-sans text-body text-ink-600">{email.preheader}</span>
          </span>
          <ChevronDown
            aria-hidden
            strokeWidth={1.75}
            className={cn('mt-1 h-5 w-5 shrink-0 text-ink-500 transition-transform duration-md ease-out', open && 'rotate-180')}
          />
        </button>
      </h3>

      <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-trigger`} hidden={!open}>
        <div className="flex flex-col gap-6 border-t border-line p-6 md:p-8">
          <div>
            <p className="font-sans text-label uppercase text-ink-500">What this send is for</p>
            <p className="mt-2 max-w-reading font-sans text-body text-ink-600">{email.role}</p>
          </div>

          <div>
            <p className="font-sans text-label uppercase text-ink-500">
              Subject alternates — A/B only once the domain is warm
            </p>
            <ul className="mt-2 flex flex-col gap-1">
              {email.altSubjects.map((s) => (
                <li key={s} className="font-sans text-body text-ink-900">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <SegmentedControl
              size="sm"
              aria-label={`Format for email ${email.n}`}
              options={VIEWS}
              value={view}
              onValueChange={(v) => setView(v as View)}
            />
            <Button
              variant="secondary"
              size="small"
              leadingIcon={<Copy className="h-4 w-4" strokeWidth={1.75} aria-hidden />}
              onClick={() => copy('subject', email.subject)}
            >
              Copy subject
            </Button>
            <Button
              variant="secondary"
              size="small"
              leadingIcon={<Copy className="h-4 w-4" strokeWidth={1.75} aria-hidden />}
              onClick={() => (view === 'html' ? copy('HTML', html) : copy('plain text', text))}
            >
              {view === 'html' ? 'Copy HTML' : 'Copy plain text'}
            </Button>
          </div>

          {view === 'preview' ? (
            <iframe
              title={`Rendered preview: ${email.subject}`}
              srcDoc={html}
              sandbox=""
              className="h-[640px] w-full rounded-md border border-line bg-paper"
            />
          ) : (
            <pre className="max-h-[640px] overflow-auto rounded-md border border-line bg-surface-2 p-4 font-sans text-label normal-case leading-relaxed text-ink-600">
              <code>{body}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export const WarmupSection = () => {
  const copy = useCopy();
  const everything = React.useMemo(() => allPlainText(WARMUP), []);

  return (
    <Section id="warmup">
      <div className="flex flex-col gap-8">
        <Alert tone="warning" title="Ready to send once the lists are loaded">
          The copy is final. Sending waits on one thing: the qualified lists loaded into Health OS with each
          address&rsquo;s consent basis recorded, which the database and the Spam Act both require. Load them in the
          ramp order below, warmest segment first, and loading the lists warms the domain in the same pass.
        </Alert>

        <Demo label="The ramp — volume, not copy, is what warms a domain">
          <div className="flex flex-col gap-5">
            <p className="max-w-reading font-sans text-body text-ink-600">
              Six emails do not warm a sub-domain on their own. The ramp does. Each window adds a colder slice only
              after the warmer one has opened, replied and not complained.
            </p>
            <Table<PlanRow>
              columns={PLAN_COLUMNS}
              rows={PLAN}
              rowKey={(r) => r.window}
              caption="The warm-up ramp: window, which emails send, the segment added and the daily cap"
            />
          </div>
        </Demo>

        <Demo label="The rules that sink a new domain">
          <div className="grid gap-6 md:grid-cols-2">
            {RULES.map((r) => (
              <div key={r.title} className="flex flex-col gap-2">
                <h3 className="font-display text-title text-ink-900">{r.title}</h3>
                <p className="font-sans text-body text-ink-600">{r.text}</p>
              </div>
            ))}
          </div>
        </Demo>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-sans text-label uppercase text-ink-500">The sequence — 6 emails over 24 days</p>
            <Button
              variant="secondary"
              size="small"
              leadingIcon={<Copy className="h-4 w-4" strokeWidth={1.75} aria-hidden />}
              onClick={() => copy('whole sequence', everything)}
            >
              Copy all six, plain text
            </Button>
          </div>
          {WARMUP.map((e, i) => (
            <EmailCard key={e.slug} email={e} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </Section>
  );
};
