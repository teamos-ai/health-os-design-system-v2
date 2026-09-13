/**
 * ElementsSection: form controls, navigation, overlays, feedback and data display.
 * Each element sits beside its usage guidance.
 */
import * as React from 'react';
import { Bell, Search, UserRound } from 'lucide-react';
import { Section, Example } from '@/showcase/Section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { SegmentedControl } from '@/components/ui/segmented';
import { Tabs } from '@/components/ui/tabs';
import { Disclosure } from '@/components/ui/disclosure';
import { Tooltip } from '@/components/ui/tooltip';
import { Modal } from '@/components/ui/modal';
import { Alert } from '@/components/ui/alert';
import { Table } from '@/components/ui/table';
import { Skeleton, SkeletonText } from '@/components/ui/skeleton';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Pagination } from '@/components/ui/pagination';
import { CommandBar } from '@/components/ui/command-bar';
import { CommandChip } from '@/components/ui/command-chip';
import { CommandWidget } from '@/components/ui/command-widget';
import { useToast } from '@/components/ui/toast';

interface Booking {
  client: string;
  service: string;
  when: string;
  fee: string;
}

const BOOKINGS: Booking[] = [
  { client: 'Priya Ramaswamy', service: 'Initial consult', when: 'Mon 9:00', fee: '$140' },
  { client: 'Elliot Brennan', service: 'Follow-up', when: 'Mon 10:30', fee: '$95' },
  { client: 'Noa Feldman', service: 'Program review', when: 'Tue 14:00', fee: '$120' },
];

const Group = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-6">
    <h3 className="font-display text-subheading text-ink-900">{title}</h3>
    {children}
  </div>
);

export const ElementsSection = () => {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(3);
  const [period, setPeriod] = React.useState('week');
  const [email, setEmail] = React.useState('hello@');

  return (
    <Section id="elements">
      <div className="flex flex-col gap-16">
        <Group title="Form controls">
          <Example id="input" label="Input" layout="split">
            <div className="flex flex-col gap-5">
              <Input label="Your name" placeholder="Jordan Lee" icon={UserRound} />
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={email.includes('.') ? undefined : 'Add the full email address, including the domain.'}
              />
            </div>
          </Example>
          <Example id="textarea" label="Textarea" layout="split">
            <Textarea label="Notes" hint="Only your team can see these." placeholder="Add a note for this client" />
          </Example>
          <Example id="select" label="Select" layout="split">
            <Select
              label="Service"
              placeholder="Choose a service"
              options={[
                { value: 'consult', label: 'Initial consult' },
                { value: 'follow', label: 'Follow-up' },
                { value: 'review', label: 'Program review' },
                { value: 'group', label: 'Group session' },
                { value: 'walkthrough', label: 'Walkthrough call' },
              ]}
            />
          </Example>
          <Example id="checkbox" label="Checkbox" layout="split">
            <div className="flex flex-col gap-3">
              <Checkbox label="Send an automatic reminder" defaultChecked />
              <Checkbox label="Add to the waitlist when full" />
              <Checkbox label="I agree to the terms" />
            </div>
          </Example>
          <Example id="radio-group" label="Radio group" layout="split">
            <RadioGroup
              name="cadence"
              legend="Reminder timing"
              defaultValue="24h"
              options={[
                { value: '24h', label: '24 hours before', hint: 'Enough time to reschedule.' },
                { value: '2h', label: '2 hours before', hint: 'A same-day nudge.' },
                { value: 'both', label: 'Both', hint: 'A day ahead and again on the day.' },
              ]}
            />
          </Example>
          <Example id="switch" label="Switch" layout="split">
            <div className="flex flex-col gap-4">
              <Switch label="Accept online bookings" defaultChecked />
              <Switch label="Send follow-up after each session" />
            </div>
          </Example>
          <Example id="segmented" label="Segmented control" layout="split">
            <SegmentedControl
              aria-label="Period"
              value={period}
              onValueChange={setPeriod}
              options={[
                { value: 'week', label: 'Week' },
                { value: 'month', label: 'Month' },
                { value: 'quarter', label: 'Quarter' },
              ]}
            />
          </Example>
        </Group>

        <Group title="Navigation">
          <Example id="tabs" label="Tabs" layout="split">
            <Tabs
              aria-label="Practice areas"
              items={[
                { value: 'today', label: 'Today', content: <p className="font-sans text-body text-ink-600">Three appointments, two reminders sent, one intake form outstanding.</p> },
                { value: 'week', label: 'This week', content: <p className="font-sans text-body text-ink-600">Fourteen bookings. Two follow-ups scheduled themselves.</p> },
                { value: 'clients', label: 'Clients', content: <p className="font-sans text-body text-ink-600">Every client with their history in one place.</p> },
              ]}
            />
          </Example>
          <Example id="breadcrumb" label="Breadcrumb" layout="split">
            <Breadcrumb items={[{ label: 'Practice', href: '#elements' }, { label: 'Clients', href: '#elements' }, { label: 'Priya Ramaswamy' }]} />
          </Example>
          <Example id="pagination" label="Pagination" layout="split">
            <Pagination page={page} total={9} onChange={setPage} />
          </Example>
        </Group>

        <Group title="Overlays and feedback">
          <Example id="tooltip" label="Tooltip" layout="split">
            <Tooltip label="Search everything (⌘K)" side="top">
              <Button variant="secondary" leadingIcon={<Search className="h-4 w-4" strokeWidth={1.5} />}>
                Hover or focus me
              </Button>
            </Tooltip>
          </Example>
          <Example id="modal" label="Modal" layout="split">
            <Button variant="secondary" onClick={() => setModalOpen(true)}>
              Confirm a booking
            </Button>
          </Example>
          <Example id="toast" label="Toast" layout="split">
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                leadingIcon={<Bell className="h-4 w-4" strokeWidth={1.5} />}
                onClick={() => toast({ title: 'Link copied' })}
              >
                Neutral toast
              </Button>
              <Button variant="secondary" onClick={() => toast({ tone: 'success', title: 'Reminder sent', description: 'Priya will get a nudge 24 hours before.' })}>
                Success toast
              </Button>
            </div>
          </Example>
          <Example id="alert" label="Alert" layout="split">
            <div className="flex flex-col gap-3">
              <Alert tone="success" title="Booking confirmed">
                Priya is booked for Monday at 9:00.
              </Alert>
              <Alert tone="warning" title="Intake form outstanding">
                One client has not completed their form.
              </Alert>
              <Alert tone="error" title="Payment failed">
                The last invoice did not go through. Try again.
              </Alert>
            </div>
          </Example>
        </Group>

        <Group title="Data display">
          <Example id="table" label="Table">
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
          </Example>
          <Example id="skeleton" label="Skeleton" layout="split">
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
                <p className="font-sans text-body text-ink-900">Content loaded in the same shape.</p>
              )}
              <Button variant="text" size="small" className="self-start" onClick={() => setLoading((l) => !l)}>
                {loading ? 'Show content' : 'Show loading'}
              </Button>
            </div>
          </Example>
          <Example id="disclosure" label="Disclosure" layout="split">
            <div className="flex flex-col">
              <Disclosure title="What does setup involve?">
                <p className="font-sans text-body text-ink-600">We move your tools, rebuild your workflows and hand over a system that already runs.</p>
              </Disclosure>
              <Disclosure title="Can I keep my booking link?">
                <p className="font-sans text-body text-ink-600">Yes. Your existing link can point to the new booking page.</p>
              </Disclosure>
            </div>
          </Example>
        </Group>

        <Group title="Command">
          <Example id="command-bar" label="Command bar" layout="split">
            <CommandBar size="md" aria-label="Search the platform" />
          </Example>
          <Example id="command-chip" label="Command chip" layout="split">
            <div className="flex flex-wrap gap-2">
              <CommandChip command="set up online booking" />
              <CommandChip command="import my client list" />
              <CommandChip command="count my current tools" />
            </div>
          </Example>
          <Example id="command-widget" label="Command widget">
            <CommandWidget />
          </Example>
        </Group>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm this booking"
        description="Priya Ramaswamy, initial consult, Monday at 9:00. A reminder will send 24 hours before."
        footer={
          <>
            <Button variant="text" tone="neutral" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
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
        <p className="font-sans text-body text-ink-600">The client gets a calendar invite and a confirmation straight away.</p>
      </Modal>
    </Section>
  );
};
