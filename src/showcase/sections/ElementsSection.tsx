/**
 * ElementsSection — the interaction layer added in the impeccable pass: form controls,
 * overlays and data display. Every demo is live and names the component + its key props so
 * the showcase doubles as documentation.
 */
import * as React from 'react';
import { Search, Bell } from 'lucide-react';
import { Section, Demo } from '@/showcase/Section';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Tabs } from '@/components/ui/tabs';
import { Tooltip } from '@/components/ui/tooltip';
import { Modal } from '@/components/ui/modal';
import { Alert } from '@/components/ui/alert';
import { Table } from '@/components/ui/table';
import { Skeleton, SkeletonText } from '@/components/ui/skeleton';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useToast } from '@/components/ui/toast';

const CAPTION = 'mt-3 font-mono text-caption text-ink-500';

interface Booking {
  client: string;
  service: string;
  when: string;
  fee: string;
}

const BOOKINGS: Booking[] = [
  { client: 'Priya Ramaswamy', service: 'Initial consult', when: 'Mon 9:00', fee: '$140' },
  { client: 'Elliot Brennan', service: 'Follow-up', when: 'Mon 10:30', fee: '$95' },
  { client: 'Noa Feldman', service: 'Programme review', when: 'Tue 14:00', fee: '$120' },
];

export const ElementsSection = () => {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  return (
    <Section
      id="elements"
      eyebrow="Interaction"
      title="Elements"
      lead="The interaction layer — form controls, overlays and data display. Each is fully tokenised, AA-accessible, keyboard-operable and reduced-motion safe."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Form controls */}
        <Demo label="Form controls — Select · Checkbox · Switch · Textarea">
          <div className="flex flex-col gap-5">
            <Select
              label="Service type"
              placeholder="Choose a service"
              options={[
                { value: 'consult', label: 'Initial consult' },
                { value: 'follow', label: 'Follow-up' },
                { value: 'review', label: 'Programme review' },
              ]}
            />
            <div className="flex flex-col gap-3">
              <Checkbox label="Send an automated reminder" defaultChecked />
              <Checkbox label="Add to the waitlist if full" />
              <Switch label="Accept online bookings" defaultChecked />
            </div>
            <Textarea label="Notes" hint="Private — only you can see these." placeholder="Add a note for this client…" />
          </div>
        </Demo>

        {/* Radio group */}
        <Demo label="RadioGroup — single choice with hints">
          <RadioGroup
            name="cadence"
            legend="Reminder cadence"
            defaultValue="24h"
            options={[
              { value: '24h', label: '24 hours before', hint: 'The default — enough time to reschedule.' },
              { value: '2h', label: '2 hours before', hint: 'A gentle same-day nudge.' },
              { value: 'both', label: 'Both', hint: 'A day ahead and again on the day.' },
              { value: 'off', label: 'No reminder', disabled: true },
            ]}
          />
        </Demo>

        {/* Tabs */}
        <Demo label="Tabs — ARIA tablist with panels" className="md:col-span-2">
          <Tabs
            aria-label="Practice areas"
            items={[
              {
                value: 'today',
                label: 'Today',
                content: (
                  <p className="font-mono text-body-sm leading-relaxed text-ink-600">
                    Three appointments, two reminders sent, one intake form outstanding.
                  </p>
                ),
              },
              {
                value: 'week',
                label: 'This week',
                content: (
                  <p className="font-mono text-body-sm leading-relaxed text-ink-600">
                    Fourteen bookings, 96% confirmed. Two follow-ups scheduled themselves.
                  </p>
                ),
              },
              {
                value: 'clients',
                label: 'Clients',
                content: (
                  <p className="font-mono text-body-sm leading-relaxed text-ink-600">
                    Forty-eight active clients, each with their history in one place.
                  </p>
                ),
              },
            ]}
          />
        </Demo>

        {/* Alerts */}
        <Demo label="Alert — the tint + text status pairs">
          <div className="flex flex-col gap-3">
            <Alert tone="success" title="Booking confirmed">
              Priya is booked for Monday at 9:00. A reminder will send itself.
            </Alert>
            <Alert tone="warn" title="Intake form outstanding">
              One client hasn&rsquo;t completed their form yet.
            </Alert>
            <Alert tone="danger" title="Payment failed">
              We couldn&rsquo;t process the last invoice. Please retry.
            </Alert>
          </div>
        </Demo>

        {/* Overlays — Tooltip, Modal, Toast */}
        <Demo label="Overlays — Tooltip · Modal · Toast">
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip label="Search your whole practice — ⌘K" side="top">
              <Button variant="secondary" leadingIcon={<Search className="h-4 w-4" strokeWidth={1.5} />}>
                Hover me
              </Button>
            </Tooltip>
            <Button variant="secondary" onClick={() => setModalOpen(true)}>
              Open a dialog
            </Button>
            <Button
              variant="secondary"
              leadingIcon={<Bell className="h-4 w-4" strokeWidth={1.5} />}
              onClick={() =>
                toast({
                  tone: 'success',
                  title: 'Reminder sent',
                  description: 'Priya will get a nudge 24 hours before.',
                })
              }
            >
              Trigger a toast
            </Button>
          </div>
          <p className={CAPTION}>Tooltip on hover and focus; modal traps focus and returns it; toasts stack and self-dismiss.</p>
        </Demo>

        {/* Table */}
        <Demo label="Table — semantic, mono, tabular numerals" className="md:col-span-2">
          <Table<Booking>
            caption="This week's bookings"
            rowKey={(r) => r.client}
            rows={BOOKINGS}
            columns={[
              { key: 'client', header: 'Client' },
              { key: 'service', header: 'Service' },
              { key: 'when', header: 'When' },
              { key: 'fee', header: 'Fee', numeric: true },
            ]}
          />
        </Demo>

        {/* Skeleton + Breadcrumb */}
        <Demo label="Skeleton — calm loading placeholder">
          <div className="flex flex-col gap-4">
            {loading ? (
              <div role="status" aria-busy className="flex items-center gap-4">
                <span className="sr-only">Loading</span>
                <Skeleton circle className="h-12 w-12" />
                <div className="flex-1">
                  <Skeleton className="mb-2 h-4 w-1/2" />
                  <SkeletonText lines={2} />
                </div>
              </div>
            ) : (
              <p className="font-mono text-body-sm text-ink-700">Content loaded. Real shape, no spinner.</p>
            )}
            <Button variant="ghost" size="sm" onClick={() => setLoading((l) => !l)}>
              Toggle loading
            </Button>
          </div>
        </Demo>

        <Demo label="Breadcrumb — you-are-here trail">
          <div className="flex flex-col gap-6">
            <Breadcrumb
              items={[
                { label: 'Practice', href: '#' },
                { label: 'Clients', href: '#' },
                { label: 'Priya Ramaswamy' },
              ]}
            />
            {!subscribed ? (
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
              >
                <span className="font-mono text-caption text-ink-500">A small live form:</span>
                <div className="flex gap-2">
                  <Checkbox label="I agree to the terms" required />
                </div>
                <Button type="submit" variant="primary" size="sm" className="self-start">
                  Continue
                </Button>
              </form>
            ) : (
              <Alert tone="success" title="All set" />
            )}
          </div>
        </Demo>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm this booking"
        description="Priya Ramaswamy — initial consult, Monday at 9:00. A reminder will send 24 hours before."
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setModalOpen(false);
                toast({ tone: 'success', title: 'Booking confirmed' });
              }}
            >
              Confirm booking
            </Button>
          </>
        }
      >
        <p className="font-mono text-body-sm leading-relaxed text-ink-600">
          The client gets a calendar invite and a confirmation straight away — nothing for you to chase.
        </p>
      </Modal>
    </Section>
  );
};
