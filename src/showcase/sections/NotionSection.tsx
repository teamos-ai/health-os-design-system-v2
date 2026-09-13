/**
 * NotionSection: a docs page template for guides and help content, in a browser frame.
 */
import { BookOpen, FileText, LifeBuoy, PlayCircle, Download, type LucideIcon } from 'lucide-react';
import { Section, Example } from '@/showcase/Section';
import { Button } from '@/components/ui/button';
import { Disclosure } from '@/components/ui/disclosure';
import { cn } from '@/lib/utils';

const PAGES: { Icon: LucideIcon; name: string; active?: boolean }[] = [
  { Icon: BookOpen, name: 'Getting started', active: true },
  { Icon: PlayCircle, name: 'Walkthroughs' },
  { Icon: FileText, name: 'Templates' },
  { Icon: LifeBuoy, name: 'Help' },
];

export const NotionSection = () => (
  <Section id="notion">
    <Example id="docs-template" label="Docs page" padded={false}>
      <div className="m-6 overflow-hidden rounded-lg border border-line bg-surface shadow-sm md:m-8">
        <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-3">
          <span aria-hidden className="flex gap-2">
            <i className="h-2 w-2 rounded-full bg-ink-200" />
            <i className="h-2 w-2 rounded-full bg-ink-200" />
            <i className="h-2 w-2 rounded-full bg-ink-200" />
          </span>
          <span className="font-sans text-label text-ink-500">help.healthos.au</span>
        </div>
        <div className="flex min-h-96">
          <nav aria-label="Docs" className="hidden w-56 shrink-0 flex-col gap-1 border-r border-line bg-paper p-4 md:flex">
            {PAGES.map(({ Icon, name, active }) => (
              <span key={name} className={cn('flex items-center gap-3 rounded-md px-3 py-2 font-sans text-body', active ? 'bg-rose-50 text-rose-700' : 'text-ink-600')}>
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                {name}
              </span>
            ))}
          </nav>
          <article className="min-w-0 flex-1 p-6 md:p-10">
            <p className="font-sans text-label uppercase text-ink-500">Getting started</p>
            <h3 className="mt-2 font-display text-subheading text-ink-900">Your first week on Health OS</h3>
            <p className="mt-3 max-w-reading font-sans text-body text-ink-600">
              What happens after the walkthrough, in order: setup, migration, your first bookings, then handover.
            </p>
            <div className="mt-6 rounded-lg bg-lavender-50 p-4">
              <p className="font-sans text-body text-lavender-700">Your setup team handles the migration. You only need your login details for the tools you use today.</p>
            </div>
            <div className="mt-6 max-w-reading">
              <Disclosure title="What do I need before setup?">
                <p className="font-sans text-body text-ink-600">A list of the tools you pay for and access to your booking page.</p>
              </Disclosure>
              <Disclosure title="How long does migration take?">
                <p className="font-sans text-body text-ink-600">Your setup team confirms the timeline on the walkthrough call.</p>
              </Disclosure>
            </div>
            <div className="mt-6 flex max-w-reading items-center gap-4 rounded-lg border border-line bg-surface p-4">
              <span aria-hidden className="h-12 w-12 shrink-0 rounded-md bg-brand-gradient-soft" />
              <div className="min-w-0 flex-1">
                <p className="font-display text-body text-ink-900">Setup checklist</p>
                <p className="font-sans text-label text-ink-500">PDF, 2 pages</p>
              </div>
              <Button variant="secondary" size="small" leadingIcon={<Download className="h-4 w-4" strokeWidth={1.5} />}>
                Download
              </Button>
            </div>
          </article>
        </div>
      </div>
    </Example>
  </Section>
);
