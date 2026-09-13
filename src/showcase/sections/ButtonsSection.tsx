/**
 * ButtonsSection: the base buttons. Three styles, two sizes, loading and disabled for each,
 * the neutral tone of the primary, and the icon button.
 */
import * as React from 'react';
import { ArrowRight, CalendarCheck, Copy, MoreHorizontal, Play, X } from 'lucide-react';
import { Section, Example } from '@/showcase/Section';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="grid items-center gap-3 border-b border-line-soft py-5 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-[10rem_1fr]">
    <span className="font-sans text-label uppercase text-ink-500">{label}</span>
    <div className="flex flex-wrap items-center gap-3">{children}</div>
  </div>
);

export const ButtonsSection = () => {
  const [saving, setSaving] = React.useState(false);
  const save = () => {
    setSaving(true);
    window.setTimeout(() => setSaving(false), 1600);
  };

  return (
    <Section id="buttons">
      <div className="flex flex-col gap-8">
        <Example id="button" label="Button">
          <Row label="Primary">
            <Button leadingIcon={<CalendarCheck className="h-4 w-4" strokeWidth={1.5} />}>Book the walkthrough</Button>
            <Button tone="neutral">Start the check</Button>
            <Button size="small">Save</Button>
            <Button tone="neutral" size="small">
              Send
            </Button>
          </Row>
          <Row label="Secondary">
            <Button variant="secondary">See pricing</Button>
            <Button variant="secondary" size="small">
              Export
            </Button>
          </Row>
          <Row label="Text">
            <Button variant="text" trailingIcon={<ArrowRight className="h-4 w-4" strokeWidth={1.5} />}>
              Read the guide
            </Button>
            <Button variant="text" tone="neutral">
              Cancel
            </Button>
            <Button variant="text" size="small">
              Edit
            </Button>
          </Row>
          <Row label="Loading">
            <Button loading={saving} onClick={save}>
              {saving ? 'Saving' : 'Save changes'}
            </Button>
            <Button variant="secondary" loading>
              Loading
            </Button>
            <Button variant="text" loading>
              Loading
            </Button>
          </Row>
          <Row label="Disabled">
            <Button disabled>Book the walkthrough</Button>
            <Button variant="secondary" disabled>
              See pricing
            </Button>
            <Button variant="text" disabled>
              Read the guide
            </Button>
          </Row>
        </Example>

        <Example id="icon-button" label="Icon button">
          <Row label="Default">
            <IconButton variant="primary" aria-label="Play the video">
              <Play className="h-4 w-4 fill-current" strokeWidth={0} />
            </IconButton>
            <IconButton variant="primary" tone="neutral" aria-label="Play the video">
              <Play className="h-4 w-4 fill-current" strokeWidth={0} />
            </IconButton>
            <IconButton variant="secondary" aria-label="Copy link">
              <Copy className="h-4 w-4" strokeWidth={1.5} />
            </IconButton>
            <IconButton variant="text" aria-label="More options">
              <MoreHorizontal className="h-4 w-4" strokeWidth={1.5} />
            </IconButton>
          </Row>
          <Row label="Small">
            <IconButton variant="secondary" size="small" aria-label="Copy link">
              <Copy className="h-4 w-4" strokeWidth={1.5} />
            </IconButton>
            <IconButton variant="text" size="small" aria-label="Close">
              <X className="h-4 w-4" strokeWidth={1.5} />
            </IconButton>
            <IconButton variant="secondary" size="small" aria-label="Copy link" disabled>
              <Copy className="h-4 w-4" strokeWidth={1.5} />
            </IconButton>
          </Row>
        </Example>
      </div>
    </Section>
  );
};
