/**
 * CrmSection — the Health OS "CRM software" surface. Two parts:
 *  1. The finished feature-scenes design, embedded live from /public/embeds/feature-scenes.html.
 *  2. A gallery of product screens (Stitch mockups in the Health OS language) grouped by
 *     type — CRM dashboards, kanban boards, project management and automations. Each tile
 *     shows a lightweight JPEG thumbnail (thumbs/); clicking opens the full-size PNG.
 */
import { Section } from '@/showcase/Section';
import { EmbedFrame } from '@/components/ui/embed-frame';
import { MonoLabel } from '@/components/ui/mono-label';
import { Badge } from '@/components/ui/badge';

/** display thumbnail: /media/crm/foo.png → /media/crm/thumbs/foo.jpg */
const thumb = (src: string) => src.replace(/\/([^/]+)\.png$/i, '/thumbs/$1.jpg');

const CRM_GROUPS: { title: string; items: { src: string; name: string }[] }[] = [
  {
    title: 'CRM dashboards',
    items: [
      { src: '/media/crm/crm-dashboard-my-day.png', name: 'Dashboard — my day' },
      { src: '/media/crm/crm-wellness-center-dashboard.png', name: 'Wellness centre — overview' },
      { src: '/media/crm/crm-daily-operations.png', name: 'Daily operations' },
      { src: '/media/crm/crm-practice-overview-reports.png', name: 'Practice overview — reports' },
      { src: '/media/crm/crm-collaboration-hub.png', name: 'Practice collaboration hub' },
    ],
  },
  {
    title: 'Kanban boards',
    items: [{ src: '/media/crm/crm-patient-pipeline-kanban.png', name: 'Patient pipeline — discovery → treatment' }],
  },
  {
    title: 'Project management',
    items: [{ src: '/media/crm/project-task-board.png', name: 'Project & task board — subtasks and roles' }],
  },
  {
    title: 'Automations & workflows',
    items: [
      { src: '/media/crm/automation-patient-intake-flow.png', name: 'Patient intake flow' },
      { src: '/media/crm/automation-visual-logic-builder.png', name: 'Visual logic builder' },
      { src: '/media/crm/automation-trigger-picker.png', name: 'Automation triggers' },
      { src: '/media/crm/automation-appointment-reminder.png', name: 'Appointment reminder recipe' },
      { src: '/media/crm/automation-recipe-templates.png', name: 'Recipe templates gallery' },
    ],
  },
];

const Screen = ({ src, name }: { src: string; name: string }) => (
  <a
    href={src}
    target="_blank"
    rel="noreferrer"
    title={`Open ${name} (full size)`}
    className="group mb-5 block break-inside-avoid"
  >
    <div className="overflow-hidden rounded-lg border border-line bg-paper shadow-none transition duration-md group-hover:shadow-md">
      <img src={thumb(src)} alt={name} loading="lazy" decoding="async" className="block w-full" />
    </div>
    <p className="mt-2 font-sans text-body-sm text-ink-700">{name}</p>
  </a>
);

export const CrmSection = () => (
  <Section
    id="crm"
    eyebrow="Software"
    title="CRM software"
    lead="The product surface itself — the feature scenes showing Health OS in action, then a gallery of product screens grouped by type: CRM dashboards, kanban pipelines, project boards and automation builders. All in the locked Health OS language; click any screen to open it full-size."
  >
    <div className="flex flex-col gap-16">
      {/* 1 · Feature scenes (live design) */}
      <EmbedFrame src="/embeds/feature-scenes.html" title="Health OS feature scenes" minHeight={1000} />

      {/* 2 · Product screens gallery */}
      <div className="flex flex-col gap-10">
        <div>
          <MonoLabel>Product screens</MonoLabel>
          <p className="mt-2 max-w-reading font-sans text-body-sm text-ink-600">
            CRM dashboards, kanban pipelines, project boards and automation builders — the product surfaces in
            the Health OS visual language. Click any screen to open it full-size.
          </p>
        </div>

        {CRM_GROUPS.map((group) => (
          <div key={group.title} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <MonoLabel>{group.title}</MonoLabel>
              <Badge variant="neutral" size="sm">{group.items.length}</Badge>
              <span className="h-px flex-1 bg-line" aria-hidden />
            </div>
            <div className="gap-5 sm:columns-2">
              {group.items.map((s) => (
                <Screen key={s.src} src={s.src} name={s.name} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Section>
);
