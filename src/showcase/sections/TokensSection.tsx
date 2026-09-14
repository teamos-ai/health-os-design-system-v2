/**
 * TokensSection: the token reference, read straight from design-system/tokens/tokens.json
 * so the page can never show a value the system does not have.
 */
import type { ReactNode } from 'react';
import tokens from '../../../design-system/tokens/tokens.json';
import { Section, Usage } from '@/showcase/Section';
import { Swatch, GradientSwatch } from '@/components/ui/swatch';
import { useTheme } from '@/lib/useTheme';
import { entry } from '@/showcase/catalog';
import { cn } from '@/lib/utils';

type Node = { $value: string; $description?: string };
const steps = (group: Record<string, unknown>) =>
  Object.entries(group).filter(([k]) => !k.startsWith('$')) as [string, Node][];

const Group = ({ title, children, usage, columns = 2 }: { title: string; children: ReactNode; usage: string; columns?: 1 | 2 }) => (
  <div className="overflow-hidden rounded-lg border border-line bg-surface">
    <div className="border-b border-line bg-surface-2 px-6 py-3">
      <h3 className="font-sans text-label uppercase text-ink-500">{title}</h3>
    </div>
    <div className="bg-paper p-6 md:p-8">{children}</div>
    <Usage id={usage} columns={columns} />
  </div>
);

const RoleRow = ({ id, token, spec, children }: { id: string; token: string; spec: string; children: ReactNode }) => {
  const e = entry(id);
  return (
    <div className="grid gap-6 border-b border-line py-8 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-2">
      <div className="min-w-0">
        {children}
        <p className="mt-3 font-sans text-label text-ink-500">
          {token} · {spec}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="font-sans text-label uppercase text-ink-500">Use it for</p>
          <ul className="mt-2 flex flex-col gap-2">
            {e.use.map((u) => (
              <li key={u} className="font-sans text-body text-ink-600">
                {u}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-sans text-label uppercase text-ink-500">Not for</p>
          <ul className="mt-2 flex flex-col gap-2">
            {e.avoid.map((u) => (
              <li key={u} className="font-sans text-body text-ink-600">
                {u}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Numbered spacing steps from tokens.json, drawn at their real width.
const SPACE = Object.entries(tokens.space)
  .filter(([k]) => /^\d+$/.test(k))
  .map(([token, n]) => ({ token, rem: (n as Node).$value, px: parseFloat((n as Node).$value) * 16 }));

export const TokensSection = () => {
  const { theme, setTheme } = useTheme();
  const c = tokens.color;
  const role = (d?: string) => d?.split('.')[0];

  return (
    <Section id="tokens">
      <div className="flex flex-col gap-8">
        {/* Themes */}
        <Group title="Themes" usage="themes">
          <div className="grid gap-4 md:grid-cols-2">
            {(['light', 'paper'] as const).map((t) => {
              const g = tokens.theme[t];
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  aria-pressed={theme === t}
                  className={cn(
                    'rounded-lg border p-5 text-left transition-[border-color,box-shadow] duration-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900',
                    theme === t ? 'border-ink-900 shadow-sm' : 'border-line hover:border-ink-400'
                  )}
                  style={{ background: g.paper.$value }}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-display text-subheading capitalize text-ink-900">{t}</span>
                    <span className="font-sans text-label uppercase text-ink-500">{theme === t ? 'Active' : 'Switch'}</span>
                  </span>
                  <span className="mt-4 grid grid-cols-3 gap-2">
                    {(['paper', 'surface', 'surface-2', 'line', 'line-soft', 'ground-textured'] as const).map((k) => (
                      <span key={k} className="flex flex-col gap-1">
                        <span className="h-10 rounded-md border border-ink-900/10" style={{ background: g[k].$value }} />
                        <span className="font-sans text-label text-ink-600">{k}</span>
                      </span>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
        </Group>

        {/* Brand colours */}
        <Group title="Brand colours" usage="colour-brand">
          <div className="flex flex-col gap-6">
            {(['rose', 'apricot', 'lavender'] as const).map((hue) => (
              <div key={hue}>
                <p className="mb-3 font-display text-body capitalize text-ink-900">{hue}</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {steps(c[hue]).map(([step, n]) => (
                    <Swatch key={step} hex={n.$value} label={`${hue}-${step}`} role={role(n.$description)} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Group>

        {/* Neutrals */}
        <Group title="Neutrals" usage="colour-neutral">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {steps(c.ink).map(([step, n]) => (
              <Swatch key={step} hex={n.$value} label={`ink-${step}`} />
            ))}
            <Swatch hex={c.white.$value} label="white" />
          </div>
        </Group>

        {/* Status */}
        <Group title="Status colours" usage="colour-status">
          <div className="grid gap-6 md:grid-cols-3">
            {(['success', 'warning', 'error'] as const).map((s) => (
              <div key={s} className="flex flex-col gap-3">
                <p className="font-display text-body capitalize text-ink-900">{s}</p>
                {steps(c[s]).map(([step, n]) => (
                  <Swatch key={step} hex={n.$value} label={`${s}-${step}`} />
                ))}
              </div>
            ))}
          </div>
        </Group>

        {/* Gradients */}
        <div className="overflow-hidden rounded-lg border border-line bg-surface">
          <div className="border-b border-line bg-surface-2 px-6 py-3">
            <h3 className="font-sans text-label uppercase text-ink-500">Gradients</h3>
          </div>
          {(
            [
              ['brand-gradient', 'Signature'],
              ['brand-gradient-soft', 'Soft wash'],
              ['brand-gradient-dawn', 'Soft dawn'],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="grid border-b border-line last:border-b-0 lg:grid-cols-[2fr_3fr]">
              <div className="bg-paper p-6">
                <GradientSwatch label={label} token={`bg-${key}`} css={tokens.gradient[key].$value} />
              </div>
              <Usage id={key} className="border-t-0 lg:border-l" />
            </div>
          ))}
        </div>

        {/* Type */}
        <div className="overflow-hidden rounded-lg border border-line bg-surface">
          <div className="border-b border-line bg-surface-2 px-6 py-3">
            <h3 className="font-sans text-label uppercase text-ink-500">Type roles</h3>
          </div>
          <div className="bg-paper p-6 md:p-8">
            <RoleRow id="type-heading" token="text-heading" spec="Spline Sans 700 · 36 to 58px">
              <p className="font-display text-heading text-ink-900">Set it up once</p>
            </RoleRow>
            <RoleRow id="type-subheading" token="text-subheading" spec="Spline Sans 600 · 20 to 24px">
              <p className="font-display text-subheading text-ink-900">Bookings that confirm themselves</p>
            </RoleRow>
            <RoleRow id="type-body" token="text-body" spec="Anonymous Pro 400 · 16px on 26px">
              <p className="font-sans text-body text-ink-600">Clients book, pay and get reminders while you are with someone else. Nothing waits on you.</p>
            </RoleRow>
            <RoleRow id="type-label" token="text-label" spec="Anonymous Pro 700 · 12px">
              <p className="font-sans text-label uppercase text-ink-500">Published · 6 min read</p>
            </RoleRow>
          </div>
        </div>

        {/* Spacing */}
        <Group title="Spacing" usage="spacing">
          <div className="flex flex-col gap-3">
            {SPACE.map((s) => (
              <div key={s.token} className="flex items-center gap-4">
                <span className="w-12 font-sans text-label text-ink-900">{s.token}</span>
                <span className={cn('h-4 rounded-md', s.px % 8 === 0 ? 'bg-ink-200' : 'bg-ink-100 ring-1 ring-inset ring-ink-200')} style={{ width: s.rem }} />
                <span className="font-sans text-label text-ink-500">
                  {s.px}px{s.px % 8 !== 0 ? ' · compact' : ''}
                </span>
              </div>
            ))}
          </div>
        </Group>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Radius */}
          <Group title="Radius" usage="radius" columns={1}>
            <div className="flex flex-wrap items-end gap-6">
              {steps(tokens.radius)
                .filter(([k]) => k !== 'none')
                .map(([k, n]) => (
                  <div key={k} className="flex flex-col items-center gap-3">
                    <span
                      className={cn('h-16 w-24 border border-ink-200 bg-ink-100', k === 'md' && 'rounded-md', k === 'lg' && 'rounded-lg', k === 'full' && 'w-16 rounded-full')}
                    />
                    <span className="font-sans text-label text-ink-900">rounded-{k}</span>
                    <span className="font-sans text-label text-ink-500">{k === 'full' ? 'round' : n.$value}</span>
                  </div>
                ))}
            </div>
          </Group>

          {/* Shadow */}
          <Group title="Shadow" usage="shadow" columns={1}>
            <div className="flex flex-wrap gap-6">
              {(['sm', 'md', 'lg'] as const).map((k) => (
                <div key={k} className="flex flex-col items-center gap-3">
                  <span className={cn('h-16 w-24 rounded-lg border border-line bg-surface', k === 'sm' && 'shadow-sm', k === 'md' && 'shadow-md', k === 'lg' && 'shadow-lg')} />
                  <span className="font-sans text-label text-ink-900">shadow-{k}</span>
                </div>
              ))}
            </div>
          </Group>
        </div>

        {/* Motion */}
        <Group title="Motion" usage="motion-tokens">
          <div className="grid gap-6 md:grid-cols-2">
            <ul className="flex flex-col divide-y divide-line-soft rounded-lg border border-line bg-surface">
              {steps(tokens.motion.duration).map(([k, n]) => (
                <li key={k} className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="shrink-0 whitespace-nowrap font-sans text-label text-ink-900">duration-{k}</span>
                  <span className="text-right font-sans text-label text-ink-500">
                    {n.$value} · {n.$description}
                  </span>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col divide-y divide-line-soft rounded-lg border border-line bg-surface">
              {Object.entries(tokens.motion.easing)
                .filter(([k]) => !k.startsWith('$'))
                .map(([k, n]) => (
                  <li key={k} className="flex flex-col gap-1 px-4 py-3">
                    <span className="font-sans text-label text-ink-900">ease-{k}</span>
                    <span className="font-sans text-label text-ink-500">
                      cubic-bezier({(n as { $value: number[] }).$value.join(', ')}) · {(n as { $description: string }).$description}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </Group>
      </div>
    </Section>
  );
};
