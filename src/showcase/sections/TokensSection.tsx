/**
 * TokensSection — the visual token reference. Colour ramps, surfaces + semantic, the
 * signature gradient + soft radial glows, the type scale, radius, elevation and motion.
 * Everything here is the literal locked value, shown so nothing has to be guessed.
 */
import { useState, type ReactNode } from 'react';
import { Section } from '@/showcase/Section';
import { MonoLabel } from '@/components/ui/mono-label';
import { Swatch, GradientSwatch } from '@/components/ui/swatch';
import { cn } from '@/lib/utils';

const RAMPS: Record<string, Record<string, string>> = {
  'rose / brand': {
    50: '#FADEEE', 100: '#F8C6E0', 200: '#F3A0CC', 300: '#EE7DBA', 400: '#E85BA8',
    // 550 — lightest AA fill for white text; the resting primary
    500: '#D63F92', 550: '#CC3385', 600: '#BE2E7B', 700: '#97215F', 800: '#5F1640', 900: '#2E1222',
  },
  apricot: {
    50: '#FDECDF', 100: '#FBD9BE', 200: '#F8C39C', 300: '#F7B27E', 400: '#F5A060',
    500: '#E68A47', 600: '#C9722F', 700: '#9E5723', 800: '#6B3A18', 900: '#312013',
  },
  lavender: {
    50: '#EDE1F7', 100: '#DEC8F0', 200: '#C9A3E6', 300: '#B985DE', 400: '#A666D9',
    500: '#9450C9', 600: '#7E3CB0', 700: '#602C88', 800: '#3E1C58', 900: '#21152B',
  },
  ink: {
    100: '#F2EFEB', 200: '#E3DDD6', 300: '#C9C1B8', 400: '#A39B91',
    500: '#7C746B', 600: '#5A534B', 700: '#3D3833', 900: '#1F1F1F',
  },
};

/** The main brand shade per ramp — the 400s are the signature accents (and the
 *  gradient trio). Highlighted in the ramp so the primary colour is unmistakable. */
const PRIMARY_STEP: Record<string, string> = {
  'rose / brand': '400',
  apricot: '400',
  lavender: '400',
};

const SURFACES = [
  { name: 'paper', hex: '#F9F6F2', ring: true },
  { name: 'surface', hex: '#FFFFFF', ring: true },
  { name: 'carbon', hex: '#1F1F1F', ring: false },
  { name: 'line', hex: '#E7E0D8', ring: true },
];

const SEMANTIC = [
  { name: 'success', hex: '#1F9D6B' },
  { name: 'warn', hex: '#C08415' },
  { name: 'danger', hex: '#C8382F' },
  { name: 'info', hex: '#7E3CB0' },
  { name: 'gold', hex: '#BE9522' },
];

const GLOWS = [
  { name: 'glow-rose', bg: 'radial-gradient(circle at center, rgba(232,91,168,0.28), transparent 70%)' },
  { name: 'glow-apricot', bg: 'radial-gradient(circle at center, rgba(245,160,96,0.28), transparent 70%)' },
  { name: 'glow-lavender', bg: 'radial-gradient(circle at center, rgba(166,102,217,0.28), transparent 70%)' },
];

/** The drifting-mesh field — three soft radial blobs in the brand trio. Reused as both
 *  a copyable static gradient (Mesh) and the animated "Drifting mesh" card. */
const MESH =
  'radial-gradient(40% 60% at 20% 20%,rgba(245,160,96,.6),transparent 70%),radial-gradient(45% 55% at 80% 30%,rgba(166,102,217,.55),transparent 72%),radial-gradient(50% 60% at 50% 90%,rgba(232,91,168,.55),transparent 70%)';

/** Static gradient variations — each click-to-copy via GradientSwatch. */
const GRADIENTS = [
  { label: 'Sunrise', css: 'linear-gradient(135deg,#FDECDF 0%,#F5A060 45%,#E85BA8 100%)' },
  { label: 'Dusk', css: 'linear-gradient(160deg,#E85BA8 0%,#A666D9 100%)' },
  { label: 'Aurora', css: 'linear-gradient(90deg,#F5A060 0%,#E85BA8 50%,#A666D9 100%)' },
  { label: 'Peach glow', css: 'radial-gradient(circle at 30% 30%,#FBD9BE 0%,#F5A060 45%,transparent 80%)' },
  { label: 'Bloom', css: 'conic-gradient(from 200deg,#F5A060,#E85BA8,#A666D9,#F5A060)' },
  { label: 'Mesh', css: MESH },
];

type TypeHue = 'ink' | 'apricot' | 'rose' | 'lavender';

/** The type-scale colour toggle — preview the headings in the brand accents. */
const TYPE_HUES: { id: TypeHue; label: string; dot: string }[] = [
  { id: 'ink', label: 'Default', dot: '#1F1F1F' },
  { id: 'apricot', label: 'Orange', dot: '#F5A060' },
  { id: 'rose', label: 'Pink', dot: '#E85BA8' },
  { id: 'lavender', label: 'Purple', dot: '#A666D9' },
];
const TYPE_TEXT: Record<TypeHue, string> = {
  ink: 'text-ink-900',
  apricot: 'text-apricot-400',
  rose: 'text-rose-400',
  lavender: 'text-lavender-400',
};

const TYPE_SCALE = [
  { cls: 'text-display-xl', label: 'Display xl', sample: 'Aa', meta: '76 / 80' },
  { cls: 'text-display-lg', label: 'Display lg', sample: 'Aa', meta: '58 / 62' },
  { cls: 'text-h1', label: 'Heading 1', sample: 'Aa', meta: '42 / 48' },
  { cls: 'text-h2', label: 'Heading 2', sample: 'Aa', meta: '34 / 42' },
  { cls: 'text-h3', label: 'Heading 3', sample: 'Aa', meta: '26 / 34' },
  { cls: 'text-h4', label: 'Heading 4', sample: 'Aa', meta: '21 / 28' },
];

const RADII = [
  { name: 'xs · 4px', cls: 'rounded-xs' },
  { name: 'sm · 6px', cls: 'rounded-sm' },
  { name: 'md · 8px · UI', cls: 'rounded-md' },
  { name: 'lg · 12px · cards', cls: 'rounded-lg' },
  { name: 'xl · 20px · bento', cls: 'rounded-xl' },
  { name: '2xl · 28px', cls: 'rounded-2xl' },
  { name: 'full · pill', cls: 'rounded-full' },
];

const SHADOWS = ['shadow-xs', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl'];

const DURATIONS = [
  { name: 'duration-xs', ms: '80ms', use: 'taps, toggles' },
  { name: 'duration-sm', ms: '160ms', use: 'buttons, hovers, focus' },
  { name: 'duration-md', ms: '240ms', use: 'cards, inputs, menus' },
  { name: 'duration-lg', ms: '360ms', use: 'scroll reveals' },
  { name: 'duration-xl', ms: '480ms', use: 'the ceiling — largest hero reveal' },
];

const EASINGS = [
  { name: 'ease-out', value: 'cubic-bezier(0.22, 1, 0.36, 1)', use: 'entrances + reveals' },
  { name: 'ease-standard', value: 'cubic-bezier(0.4, 0, 0.2, 1)', use: 'UI state changes' },
  { name: 'linear', value: 'linear', use: 'marquee + ticker loops only' },
];

const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="mt-12 first:mt-0">
    <MonoLabel>{title}</MonoLabel>
    <div className="mt-5">{children}</div>
  </div>
);

export const TokensSection = () => {
  const [typeHue, setTypeHue] = useState<TypeHue>('ink');

  return (
  <Section
    id="tokens"
    eyebrow="Foundations"
    title="Tokens"
    lead="One source of truth, flowing from tailwind.preset.js into every component. Warm multi-hue, flat, premium — no hard-coded colours anywhere downstream."
  >
    {/* Colour ramps */}
    <Block title="Colour ramps">
      <p className="mb-5 font-mono text-caption text-ink-500">
        Hex + RGB on every swatch — click any colour to copy its hex. The{' '}
        <span className="font-bold text-ink-700">★ Main</span> swatch (the <span className="font-bold text-ink-700">400</span> shade,
        ringed) is the primary brand colour for rose, apricot and lavender — the signature gradient trio.
      </p>
      <div className="flex flex-col gap-6">
        {Object.entries(RAMPS).map(([name, ramp]) => (
          <div key={name}>
            <p className="mb-2.5 font-mono text-caption text-ink-600">{name}</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {Object.entries(ramp).map(([step, hex]) => (
                <Swatch key={step} hex={hex} label={step} primary={PRIMARY_STEP[name] === step} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Block>

    {/* Surfaces + semantic */}
    <Block title="Surfaces + semantic">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {[...SURFACES, ...SEMANTIC].map((s) => (
          <Swatch key={s.name} hex={s.hex} label={s.name} />
        ))}
      </div>
    </Block>

    {/* Gradient + glows */}
    <Block title="Signature gradient + glows">
      <div className="grid gap-4 md:grid-cols-2">
        <GradientSwatch
          label="bg-brand-gradient · apricot → rose → lavender"
          css="linear-gradient(135deg, #F5A060 0%, #E85BA8 50%, #A666D9 100%)"
        />
        <div className="grid grid-cols-3 gap-3">
          {GLOWS.map((g) => (
            <div key={g.name}>
              <div className="h-24 rounded-lg border border-line bg-paper" style={{ backgroundImage: g.bg }} />
              <p className="mt-2 font-mono text-micro font-normal tracking-normal text-ink-600">{g.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Static variations — click any to copy its CSS */}
      <p className="mb-3 mt-8 font-mono text-caption text-ink-500">
        Variations — click any to copy its CSS.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {GRADIENTS.map((g) => (
          <GradientSwatch key={g.label} label={g.label} css={g.css} />
        ))}
      </div>

      {/* The gradient is a STATIC brand device — it is never animated on shipped surfaces
          (foundations/motion.md). The soft washes below are the sanctioned large-fill
          siblings. */}
      <p className="mb-3 mt-8 font-mono text-caption text-ink-500">
        Soft washes — the large-fill siblings; the gradient stays static, never animated.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <div className="h-24 rounded-md border border-line bg-brand-gradient-soft" />
          <p className="mt-2 font-mono text-micro font-normal tracking-normal text-ink-600">Soft wash · bg-brand-gradient-soft</p>
        </div>
        <div>
          <div className="h-24 rounded-md border border-line bg-brand-gradient-warm" />
          <p className="mt-2 font-mono text-micro font-normal tracking-normal text-ink-600">Warm sunrise · bg-brand-gradient-warm</p>
        </div>
        <div>
          <div className="h-24 rounded-md border border-line bg-glow-hero bg-paper" />
          <p className="mt-2 font-mono text-micro font-normal tracking-normal text-ink-600">Hero glow · bg-glow-hero</p>
        </div>
      </div>
    </Block>

    {/* Type scale */}
    <Block title="Type scale — Spline Sans">
      {/* Colour toggle — preview the headings in each brand accent */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {TYPE_HUES.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() => setTypeHue(h.id)}
            aria-pressed={typeHue === h.id}
            className={cn(
              'inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-caption transition-colors duration-sm',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40',
              typeHue === h.id
                ? 'border-ink-900 text-ink-900'
                : 'border-line text-ink-500 hover:text-ink-900'
            )}
          >
            <span className="h-3 w-3 rounded-sm ring-1 ring-inset ring-carbon/10" style={{ background: h.dot }} />
            {h.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
        {TYPE_SCALE.map((t) => (
          <div key={t.cls} className="flex items-center justify-between gap-4 px-5 py-4">
            <span className={cn('font-display transition-colors duration-sm', TYPE_TEXT[typeHue], t.cls)}>{t.label}</span>
            <span className="shrink-0 font-mono text-caption text-ink-600">{t.cls} · {t.meta}</span>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <span className="font-sans text-body-md text-ink-700">Body — Anonymous Pro, line-height 1.6</span>
          <span className="shrink-0 font-mono text-caption text-ink-600">font-sans · 16 / 26</span>
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <span className="font-mono text-overline uppercase text-ink-600">Overline / mono label</span>
          <span className="shrink-0 font-mono text-caption text-ink-600">text-overline</span>
        </div>
      </div>
    </Block>

    {/* Radius + elevation */}
    <div className="mt-12 grid gap-12 md:grid-cols-2">
      <div>
        <MonoLabel>Radius — 8 UI · 12 cards · 20 bento · pills</MonoLabel>
        <div className="mt-5 flex flex-wrap gap-4">
          {RADII.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div className={cn('h-16 w-16 border border-line bg-brand-gradient-soft', r.cls)} />
              <span className="font-mono text-caption text-ink-600">{r.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <MonoLabel>Elevation — soft neutral</MonoLabel>
        <div className="mt-5 flex flex-wrap gap-4">
          {SHADOWS.map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={cn('h-16 w-24 rounded-lg border border-line bg-surface', s)} />
              <span className="font-mono text-caption text-ink-600">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Motion tokens — durations, easings, loops */}
    <Block title="Motion — durations, easings, loops">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
          {DURATIONS.map((d) => (
            <div key={d.name} className="flex items-center justify-between gap-4 px-5 py-3.5">
              <span className="font-mono text-body-sm text-ink-900">{d.name}</span>
              <span className="shrink-0 font-mono text-caption text-ink-600">{d.ms} · {d.use}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
            {EASINGS.map((e) => (
              <div key={e.name} className="flex flex-col gap-1 px-5 py-3.5">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-body-sm text-ink-900">{e.name}</span>
                  <span className="shrink-0 font-mono text-caption text-ink-600">{e.use}</span>
                </div>
                <span className="font-mono text-caption text-ink-500">{e.value}</span>
              </div>
            ))}
          </div>
          <p className="font-mono text-caption leading-relaxed text-ink-500">
            Interactions 150–250ms · reveals 300–400ms · 480ms is the ceiling. Loops: marquee
            40–60s, ticker 32–45s, plus a breathing status dot and the skeleton shimmer — one
            ambient loop per view, all frozen under reduced motion. Count-ups may settle over
            1.4s and snap for reduced-motion users.
          </p>
        </div>
      </div>
    </Block>
  </Section>
  );
};
