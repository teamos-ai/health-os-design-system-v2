/**
 * NotionSection — rough scaffold. A Notion-style asset marketplace where practitioners
 * click through, create a free login and pull templates, brand kits and backgrounds for
 * free. Mocked inside a clean browser frame; detail lands later.
 */
import { Section } from '@/showcase/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MonoLabel } from '@/components/ui/mono-label';

const PAGES = [
  { emoji: '📦', name: 'Templates', active: true },
  { emoji: '🎨', name: 'Brand kit', active: false },
  { emoji: '🖼️', name: 'Backgrounds', active: false },
  { emoji: '🧩', name: 'Components', active: false },
];

export const NotionSection = () => (
  <Section
    id="notion"
    eyebrow="App"
    title="Notion"
    lead="A Notion-style marketplace where practitioners click through, create a free login and pull templates, backgrounds and brand assets — all free. Rough scaffold for now."
  >
    <div className="mb-6 flex justify-center">
      <Badge variant="outline">Rough draft</Badge>
    </div>

    {/* Browser-frame card */}
    <div className="overflow-hidden rounded-md border border-line bg-surface shadow-sm">
      {/* Chrome bar */}
      <div className="flex items-center gap-3 border-b border-line bg-paper px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-md bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-md bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-md bg-ink-200" />
        </div>
        <span className="font-mono text-caption text-ink-400">assets.healthos.com.au</span>
      </div>

      <div className="flex min-h-[420px]">
        {/* Sidebar */}
        <aside className="hidden w-60 flex-col border-r border-line bg-paper p-4 md:flex">
          <MonoLabel className="px-1">Health OS Assets</MonoLabel>
          <nav className="mt-4 flex flex-col gap-0.5">
            {PAGES.map((p) => (
              <span
                key={p.name}
                className={`flex items-center gap-2.5 rounded-md px-3 py-2 font-sans text-body-sm ${
                  p.active ? 'bg-rose-50 text-brand-600' : 'text-ink-600'
                }`}
              >
                <span aria-hidden>{p.emoji}</span>
                {p.name}
              </span>
            ))}
          </nav>
        </aside>

        {/* Page area */}
        <main className="flex-1 bg-surface p-6 md:p-10">
          <div className="text-4xl" aria-hidden>📦</div>
          <h3 className="mt-3 font-display text-h2 text-ink-900">Templates</h3>
          <p className="mt-4 max-w-prose font-sans text-body-md leading-relaxed text-ink-600">
            Browse the kit, sign in free and the assets are yours — no licence to chase, no
            watermark. Built for practitioners who want to launch this week.
          </p>

          {/* Callout block */}
          <div className="mt-5 rounded-md border border-line bg-lavender-50 p-4">
            <p className="font-sans text-body-sm text-lavender-600">
              Free login unlocks every page. Your downloads stay synced to your workspace.
            </p>
          </div>

          {/* Free asset row */}
          <div className="mt-5 flex items-center gap-4 rounded-md border border-line bg-surface p-4">
            <span className="h-12 w-12 shrink-0 rounded-md bg-brand-gradient" aria-hidden />
            <div className="flex-1">
              <p className="font-display text-body-md text-ink-900">Onboarding template</p>
              <p className="font-mono text-caption text-ink-500">Notion · free</p>
            </div>
            <Button variant="primary" size="sm">Get for free</Button>
          </div>
        </main>
      </div>
    </div>
  </Section>
);
