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
    500: '#D63F92', 600: '#BE2E7B', 700: '#97215F', 800: '#5F1640', 900: '#2E1222',
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
  { name: 'glow-rose', bg: 'radial-gradient(circle at center, rgba(232,91,168,0.55), transparent 70%)' },
  { name: 'glow-apricot', bg: 'radial-gradient(circle at center, rgba(245,160,96,0.55), transparent 70%)' },
  { name: 'glow-lavender', bg: 'radial-gradient(circle at center, rgba(166,102,217,0.55), transparent 70%)' },
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
  apricot: 'text-[#F5A060]',
  rose: 'text-[#E85BA8]',
  lavender: 'text-[#A666D9]',
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
  { name: 'md · 8px · max', cls: 'rounded-md' },
];

const SHADOWS = ['shadow-sm', 'shadow-md', 'shadow-lg'];

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
              <p className="mt-2 font-mono text-[10px] text-ink-600">{g.name}</p>
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

      {/* Animated — gentle, always-on, frozen under reduced-motion by the global guard */}
      <p className="mb-3 mt-8 font-mono text-caption text-ink-500">
        Animated — gentle and always-on; frozen under reduced-motion.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <div
            className="anim-grad-pan h-24 rounded-md border border-line"
            style={{
              backgroundImage: 'linear-gradient(110deg,#F5A060,#E85BA8,#A666D9,#E85BA8,#F5A060)',
              backgroundSize: '300% 100%',
            }}
          />
          <p className="mt-2 font-mono text-[10px] text-ink-600">Flowing trio · anim-grad-pan</p>
        </div>
        <div>
          <div
            className="anim-grad-drift h-24 rounded-md border border-line bg-paper"
            style={{ backgroundImage: MESH, backgroundSize: '180% 180%' }}
          />
          <p className="mt-2 font-mono text-[10px] text-ink-600">Drifting mesh · anim-grad-drift</p>
        </div>
        <div>
          <div className="relative h-24 overflow-hidden rounded-md border border-line">
            <div
              className="anim-grad-spin absolute inset-[-40%]"
              style={{ background: 'conic-gradient(from 0deg,#F5A060,#E85BA8,#A666D9,#F5A060)' }}
            />
          </div>
          <p className="mt-2 font-mono text-[10px] text-ink-600">Rotating bloom · anim-grad-spin</p>
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
            <span className="h-3 w-3 rounded-sm ring-1 ring-inset ring-black/10" style={{ background: h.dot }} />
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
        <MonoLabel>Radius — 8px max</MonoLabel>
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
  </Section>
  );
};
