/**
 * CardsSection — the full card library ported from the Figma "Refine card components"
 * export (2026-07). 11 of the source's 13 sections are shown here; the two the brief
 * dropped ("Float, tint & mood" composition 04 and "6 new split & corner") are omitted.
 *
 * The card components live in @/components/cards and are self-contained (React + the DS
 * token object, re-tokenised to Health OS brand). Palette: pink→rose, orange→apricot,
 * purple→lavender, green→success. Radius normalised to the 8px global max. A few
 * float/glass cards deliberately keep their frosted backdrop-blur (approved exception
 * to the zero-glass rule). Images are served from /public/media/cards.
 */
import type { CSSProperties } from 'react';
import { Section } from '@/showcase/Section';
import {
  DS,
  Badge,
  HeroBentoSection,
  HeroCard,
  StatCard,
  PhotoBandCard,
  PanoramaCard,
  FeatureCard,
  GuidelineCard,
  TintCard,
  FloatPanelCard,
  CornerImageCard,
  SplitCard,
  MoodCard,
  DuotoneCard,
  QuoteCard,
  ProgressRingCard,
  BillboardCard,
  StackedStatCard,
  OverlapCard,
  InversePhotoCard,
  ThirdSliceCard,
  CirclePortraitCard,
  FullTextOnImageCard,
  MosaicHeaderCard,
  PillImageCard,
  SideAccentCard,
  BigStatNatureCard,
  MultiStatCard,
  DepthStackCard,
  PanoramaReverseCard,
  PanoramaBannerCard,
  PanoramaCinemaCard,
  PanoramaBookendCard,
  FlipCard,
  ColorOverlayCard,
  VignetteCard,
  CenteredPanelCard,
  PeekBehindCard,
  LayeredGlassCard,
  SlideRevealCard,
  RadialWashCard,
  ZoomHoverCard,
  TiltHoverCard,
  PopHoverCard,
  OutlineCard,
  TightEdgeCard,
  StampCard,
  PulseGlowCard,
} from '@/components/cards';

/* ── Local nature imagery (served from public/media/cards) ─────────────────────── */
const imgPurpleOrange = '/media/cards/blurred-purple-orange-sunset-gradient.jpg';
const imgGoldenMeadow = '/media/cards/golden-meadow-grass-at-sunrise.jpg';
const imgAutumnMaple  = '/media/cards/autumn-maple-leaves-orange-bokeh.jpg';
const imgSnowyMtn     = '/media/cards/snowy-mountain-pink-blue-twilight-sky.jpg';
const imgCrescentMoon = '/media/cards/crescent-moon-over-pampas-grass-dusk.jpg';
const imgHiker        = '/media/cards/hiker-overlooking-misty-purple-mountains.jpg';
const imgSeagulls     = '/media/cards/seagulls-over-pastel-sunset-ocean.jpg';
const imgPinkOcean    = '/media/cards/pink-sunset-over-ocean-waves.jpg';
const imgClouds       = '/media/cards/pink-purple-cumulus-clouds-at-dusk.jpg';
const imgMtnMist      = '/media/cards/mountain-peaks-in-pink-mist-at-dusk.jpg';
const imgOceanSunset  = '/media/cards/ChatGPT_Image_Jun_14__2026__08_37_50_PM.png';
const imgBokehWarm    = '/media/cards/ChatGPT_Image_Jun_14__2026__08_37_20_PM.png';
const imgBokehCool    = '/media/cards/ChatGPT_Image_Jun_14__2026__08_36_24_PM.png';
const imgDuskCity     = '/media/cards/ChatGPT_Image_Jun_14__2026__08_35_44_PM.png';
const imgGoldenHour   = '/media/cards/ChatGPT_Image_Jun_14__2026__08_35_28_PM.png';

/* ── Tiny SVG icons (accent-coloured, 16px) ────────────────────────────────────── */
const ip = (c: string) => ({
  width: 16, height: 16, viewBox: '0 0 24 24',
  fill: 'none', stroke: c, strokeWidth: 1.9,
  strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
});
const HeartIcon    = ({ c = DS.pink }: { c?: string }) => <svg {...ip(c)}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const CalIcon      = ({ c = DS.purple }: { c?: string }) => <svg {...ip(c)}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const ActivityIcon = ({ c = DS.orange }: { c?: string }) => <svg {...ip(c)}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const MoonIcon     = ({ c = DS.purple }: { c?: string }) => <svg {...ip(c)}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const SettingsIcon = ({ c = DS.pink }: { c?: string }) => <svg {...ip(c)}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;

/* Badge icons (small, used inside guideline badge pills) */
const TypeIcon  = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>;
const VoiceIcon = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const DoIcon    = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

/* ── Ported section helpers ─────────────────────────────────────────────────────── */
function SectionHead({ num, title, sub }: { num: string; title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <Badge label={num} color="pink" />
      <h3 style={{ fontFamily: DS.fontDisplay, fontWeight: 600, fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: DS.fg, margin: '0.45rem 0 0', lineHeight: 1.2 }}>
        {title}
      </h3>
      {sub && (
        <p style={{ fontFamily: DS.fontMono, fontSize: '0.82rem', color: DS.fgMuted, marginTop: '0.35rem', lineHeight: 1.65, maxWidth: '500px' }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function Divider() {
  return <div style={{ height: '1px', background: DS.border, margin: '0 0 3.5rem' }} />;
}

function VariantLabel({ letter, name, color }: { letter: string; name: string; color: 'pink' | 'purple' | 'orange' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
      <Badge label={`${letter} · ${name}`} color={color} />
    </div>
  );
}

const rowLabel: CSSProperties = {
  fontFamily: DS.fontMono, fontSize: '0.7rem', letterSpacing: '0.12em',
  textTransform: 'uppercase', color: DS.fgSoft, marginBottom: '0.75rem',
};

export const CardsSection = () => (
  <Section
    id="card-bento"
    eyebrow="Library"
    title="Card & Bento"
    lead="The full card and bento family — 11 archetypes and their extended bento, panorama, float and interactive-push variants. Re-tokenised to the Health OS brand, 8px squircles, nature photography with seamless gradient blending."
  >
    <div style={{ fontFamily: DS.fontMono }}>

      {/* Editorial hero grid */}
      <HeroBentoSection />

      <Divider />

      {/* 01 — Hero bento */}
      <SectionHead num="01" title="Hero bento" sub="Full-bleed hero anchors a 4-column grid. Image fades naturally into card content." />
      <div className="cards-c01" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gridTemplateRows: '300px 240px', gap: '14px', marginBottom: '5rem' }}>
        <HeroCard src={imgHiker} badge="Wellbeing" badgeColor="pink" title="The space between" description="Clarity comes when you pause. Guided practices for daily stillness." style={{ gridColumn: '1/3', gridRow: '1/3' }} />
        <StatCard value="94%" label="Mood score" sublabel="7-day rolling average" color="pink" src={imgPinkOcean} />
        <PhotoBandCard src={imgCrescentMoon} badge="Evening" badgeColor="purple" icon={<MoonIcon />} iconColor="purple" title="Wind-down ritual" description="A 10-min sequence to lower cortisol and prepare for deep sleep." style={{ gridRow: '1/3' }} />
        <StatCard value="7.4h" label="Sleep avg" sublabel="Improving · +0.8h this week" color="purple" src={imgSnowyMtn} />
      </div>

      <Divider />

      {/* 02 — Panorama & features */}
      <SectionHead num="02" title="Panorama & features" sub="Wide landscape card spans the grid. Three feature cards complete the row below." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: '240px auto', gap: '14px', marginBottom: '5rem' }}>
        <PanoramaCard src={imgSeagulls} badge="Seasonal reset" badgeColor="pink" title="Autumn programme" description="A 4-week protocol — sleep, nutrition, and stress markers recalibrated as the light shifts." stats={[{ label: 'Duration', value: '28 days' }, { label: 'Sessions', value: '84' }, { label: 'Avg. gain', value: '+31%' }]} style={{ gridColumn: '1/4' }} />
        <FeatureCard icon={<CalIcon />} iconColor="purple" badge="Booking" badgeColor="purple" title="Booking & calendar" description="Scheduling + reminders. Clients book directly without back-and-forth." />
        <FeatureCard icon={<HeartIcon />} iconColor="pink" badge="Wellness" badgeColor="pink" title="Client wellbeing" description="Track mood, sleep, and energy alongside appointment history." />
        <FeatureCard icon={<ActivityIcon />} iconColor="orange" badge="Analytics" badgeColor="orange" title="One clear dashboard" description="Bookings, revenue, and the day ahead — the whole practice at a glance." />
      </div>

      <Divider />

      {/* 03 — Design system guidelines */}
      <SectionHead num="03" title="Design system guidelines" sub="TYPE / VOICE / DO — your Health OS guideline cards with block-badge style." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '14px', marginBottom: '5rem' }}>
        <GuidelineCard badge="Type" badgeColor="purple" badgeIcon={<TypeIcon />} title="Two voices" bullets={['Spline Sans — headings 600/700', 'Anonymous Pro — mono body, 1.6', 'Sentence case everywhere']} />
        <GuidelineCard badge="Voice" badgeColor="orange" badgeIcon={<VoiceIcon />} title="Calm sage advisor" bullets={['Outcome first, no hype', 'Australian English', '"Practitioners" and "clients"']} />
        <GuidelineCard badge="Colour" badgeColor="pink" title="Three key accents" bullets={['Rose #BE2E7B — action & warmth', 'Lavender #7E3CB0 — trust & depth', 'Apricot #C9722F — energy & growth']} />
        <GuidelineCard badge="Do" badgeColor="green" badgeIcon={<DoIcon />} title="Always" bullets={['Use the tokens', '8px max radius, soft shadows', 'Honour reduced motion']} />
      </div>

      <Divider />

      {/* 05 — Split & corner */}
      <SectionHead num="05" title="Split & corner" sub="Hard-edge split cards and corner image cards — clean structural layouts." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '5rem' }}>
        <SplitCard src={imgGoldenMeadow} badge="Morning" badgeColor="orange" title="Golden hour practice" description="10-minute movement sequence timed to sunrise for optimal cortisol response." style={{ gridColumn: 'span 2', minHeight: '220px' }} />
        <CornerImageCard src={imgPinkOcean} badge="Calm" badgeColor="pink" title="Ocean breath protocol" description="Box breathing calibrated to wave rhythm — proven to reduce HRV within 4 minutes." />
        <CornerImageCard src={imgCrescentMoon} badge="Sleep" badgeColor="purple" title="Lunar sleep tracking" description="Your rest patterns mapped alongside lunar phases — the connection is real." />
        <SplitCard src={imgSnowyMtn} badge="Recovery" badgeColor="purple" title="Cold recovery" description="Breathwork + cold exposure protocol. 14-day adaptive programme." imageOnRight style={{ gridColumn: 'span 2', minHeight: '220px' }} />
      </div>

      <Divider />

      {/* 11 types — Every card variant */}
      <SectionHead num="11 types" title="Every card variant" sub="All 11 archetypes displayed individually — pick and compose freely." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '14px', marginBottom: '5rem' }}>
        <div>
          <VariantLabel letter="A" name="Hero" color="pink" />
          <HeroCard src={imgMtnMist} badge="Full bleed" badgeColor="pink" title="Image fills card, content over gradient" style={{ minHeight: '270px' }} />
        </div>
        <div>
          <VariantLabel letter="B" name="Photo Band" color="purple" />
          <PhotoBandCard src={imgCrescentMoon} badge="Band image" badgeColor="purple" icon={<MoonIcon />} iconColor="purple" title="Nature band fades into white" description="Seamless multi-stop gradient transition." style={{ minHeight: '270px' }} />
        </div>
        <div>
          <VariantLabel letter="C" name="Feature" color="orange" />
          <FeatureCard icon={<SettingsIcon />} iconColor="pink" badge="No image" badgeColor="pink" title="Icon badge & text" description="Matches your existing Health OS card language exactly." style={{ minHeight: '270px' }} />
        </div>
        <div>
          <VariantLabel letter="D" name="Stat" color="pink" />
          <StatCard value="142" unit="bpm" label="Stat card" sublabel="Image as soft texture wash" color="pink" src={imgSeagulls} style={{ minHeight: '270px' }} />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <VariantLabel letter="E" name="Panorama" color="orange" />
          <PanoramaCard src={imgGoldenMeadow} badge="Wide landscape" badgeColor="orange" title="Panorama card — image fades right" description="Best at 2-column span. Stats row below prose." stats={[{ label: 'Cols', value: '2×' }, { label: 'Rows', value: '1×' }]} style={{ minHeight: '200px' }} />
        </div>
        <div>
          <VariantLabel letter="F" name="Guideline" color="purple" />
          <GuidelineCard badge="Guideline" badgeColor="purple" badgeIcon={<TypeIcon />} title="Block badge + bullets" bullets={['Full-width badge strip at top', 'Spline Sans heading 600', 'Anonymous Pro bullet list']} style={{ minHeight: '270px' }} />
        </div>
        <div>
          <VariantLabel letter="G" name="Tint" color="orange" />
          <TintCard src={imgAutumnMaple} badge="Texture wash" badgeColor="orange" title="Image as living texture" description="12% opacity beneath clean white surface — subtle depth without distraction." style={{ minHeight: '270px' }} />
        </div>
        <div>
          <VariantLabel letter="H" name="Float Panel" color="pink" />
          <FloatPanelCard src={imgPurpleOrange} badge="Frosted panel" badgeColor="pink" title="Frosted glass content panel" description="Backdrop-blur over full-bleed image." style={{ minHeight: '270px' }} />
        </div>
        <div>
          <VariantLabel letter="I" name="Corner Image" color="purple" />
          <CornerImageCard src={imgPinkOcean} badge="Corner photo" badgeColor="pink" title="Small nature photo in corner" description="Preserves clean layout while adding visual warmth and personality." style={{ minHeight: '270px' }} />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <VariantLabel letter="J" name="Split" color="orange" />
          <SplitCard src={imgHiker} badge="Hard split" badgeColor="purple" title="50/50 split — crisp edge, no fade" description="Structural. Clean. Works equally with image on left or right." style={{ minHeight: '220px' }} />
        </div>
        <div>
          <VariantLabel letter="K" name="Mood" color="pink" />
          <MoodCard src={imgSeagulls} emoji="✨" value="9.1" label="Mood card" sublabel="Centered metric over image wash" color="pink" style={{ minHeight: '270px' }} />
        </div>
      </div>

      <Divider />

      {/* New styles — 7 more concepts */}
      <SectionHead num="New styles" title="7 more concepts" sub="Push further — duotone photo treatment, pull-quotes, gradient fields, progress rings, billboard type, stacked metrics, and editorial overlap layouts." />
      <p style={rowLabel}>L · Duotone — greyscale photo + brand colour overlay</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginBottom: '2rem' }}>
        <DuotoneCard src={imgSeagulls} color="pink" badge="Restore" title="Coastal breathing" description="Rhythmic breath practice timed to wave patterns. 8-minute protocol." style={{ minHeight: '280px' }} />
        <DuotoneCard src={imgCrescentMoon} color="purple" badge="Evening" title="Lunar wind-down" description="Body-scan meditation aligned to the end of your chronotype window." style={{ minHeight: '280px' }} />
        <DuotoneCard src={imgAutumnMaple} color="orange" badge="Energy" title="Autumn activation" description="Seasonal movement protocol — strength and heat generation for colder months." style={{ minHeight: '280px' }} />
      </div>
      <p style={rowLabel}>M · Quote — editorial pull-quote over tinted nature image</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '2rem' }}>
        <QuoteCard src={imgHiker} color="purple" quote="Rest is not the absence of activity — it is the presence of recovery." attribution="Dr. Sarah Nguyen, Sleep Science" style={{ minHeight: '240px' }} />
        <QuoteCard src={imgPinkOcean} color="pink" quote="The body keeps the score. Listen before it raises its voice." attribution="Health OS · Daily prompt" style={{ minHeight: '240px' }} />
      </div>
      <p style={rowLabel}>O · Progress ring &nbsp;&nbsp; P · Billboard — oversized typographic display</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '2rem' }}>
        <ProgressRingCard value={82} label="Recovery" sublabel="Above target · keep going" color="pink" src={imgPinkOcean} />
        <ProgressRingCard value={67} label="Hydration" sublabel="1.6 L of 2.4 L target" color="purple" src={imgCrescentMoon} />
        <BillboardCard src={imgGoldenMeadow} displayText="8.4" label="Mood today" sublabel="Your highest score this month" color="orange" style={{ gridColumn: 'span 2' }} />
      </div>
      <p style={rowLabel}>Q · Stacked stats &nbsp;&nbsp; R · Overlap — editorial image–content depth</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginBottom: '5rem' }}>
        <StackedStatCard title="Weekly overview" src={imgSnowyMtn} rows={[
          { label: 'Sleep quality', value: '87%', pct: 87, color: 'purple' },
          { label: 'Movement goal', value: '73%', pct: 73, color: 'orange' },
          { label: 'Mindful minutes', value: '91%', pct: 91, color: 'pink' },
          { label: 'Hydration', value: '62%', pct: 62, color: 'green' },
        ]} />
        <OverlapCard src={imgMtnMist} badge="Clarity" badgeColor="pink" title="Morning clarity stack" description="A sequenced 20-minute protocol — light, breath, cold, and stillness — to prime your nervous system for the day." style={{ minHeight: '240px' }} />
        <OverlapCard src={imgClouds} badge="Recovery" badgeColor="purple" title="Cloud nine sleep prep" description="Guided body-scan paired with binaural audio. Average onset time: 11 minutes." style={{ minHeight: '240px' }} />
      </div>

      <Divider />

      {/* Bento + — 10 new bento layouts */}
      <SectionHead num="Bento +" title="10 new bento layouts" sub="Different image placements, splits, and UI arrangements — all composable in any grid." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginBottom: '2rem' }}>
        <InversePhotoCard src={imgGoldenHour} badge="S · Inverse photo" color="orange" title="Image at bottom" description="Content sits above; the fade flows downward into the nature image." />
        <ThirdSliceCard src={imgOceanSunset} badge="T · Third slice" color="purple" title="28 / 72 split" description="Narrow left image strip with the wide content zone dominant." bullets={['Asymmetric layout', 'No fade — direct edge', 'Vertical portrait crop']} />
        <CirclePortraitCard src={imgCrescentMoon} badge="U · Squircle portrait" color="purple" title="Squircle centred photo" description="Squircle-cropped nature image anchors the card from the top centre." />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '2rem' }}>
        <FullTextOnImageCard src={imgHiker} badge="V · Full text on image" color="purple" title="No white section at all" body="All content lives directly on the photograph. Diagonal gradient scrim keeps text readable." stat="8.4" style={{ minHeight: '240px' }} />
        <MosaicHeaderCard images={[imgBokehWarm, imgOceanSunset, imgGoldenHour]} badge="W · Mosaic header" color="orange" title="Three-tile image strip" description="Three nature photos tiled side by side as the card header — gallery feel." />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginBottom: '2rem' }}>
        <PillImageCard src={imgDuskCity} badge="X · Squircle image" color="pink" title="Photo in squircle frame" description="The nature image is cropped into a rounded-rectangle squircle container — clean corners, no pill." />
        <SideAccentCard src={imgBokehCool} badge="Y · Side accent" color="purple" title="22 % left accent strip" description="Minimal image presence as a left-edge accent — content dominant, image adds warmth." />
        <BigStatNatureCard src={imgPinkOcean} value="94" unit="%" badge="Z · Big stat" color="pink" label="Recovery score" sublabel="Above 30-day avg" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '5rem' }}>
        <MultiStatCard src={imgSeagulls} title="Weekly overview" stats={[{ label: 'Sleep', value: '87%', color: 'purple' }, { label: 'Movement', value: '73%', color: 'orange' }, { label: 'Mindfulness', value: '91%', color: 'pink' }, { label: 'Hydration', value: '62%', color: 'green' }]} />
        <DepthStackCard src={imgMtnMist} badge="BB · Depth stack" color="pink" title="Card on card — 3D depth" description="Shadow cards peek from behind the main card, creating spatial layering without any animation." />
      </div>

      <Divider />

      {/* Panorama + — 4 new panorama styles */}
      <SectionHead num="Panorama +" title="4 new panorama styles" sub="Different orientations, directions, and structural splits of the wide-landscape format." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '5rem' }}>
        <PanoramaReverseCard src={imgOceanSunset} badge="P2 · Reverse" color="pink" title="Content left — image fades right" description="Mirror of the original. Image on the right, content anchored left." stats={[{ label: 'Calm index', value: '9.2' }, { label: 'Sessions', value: '48' }]} />
        <PanoramaBannerCard src={imgSeagulls} badge="P3 · Hero banner" color="purple" title="Full-width image banner" description="Wide banner image with horizontal stat row anchored beneath." stats={[{ label: 'Mood', value: '8.8', color: 'pink' }, { label: 'Sleep', value: '7.4h', color: 'purple' }, { label: 'Steps', value: '9,210', color: 'orange' }]} />
        <PanoramaCinemaCard src={imgHiker} badge="P4 · Cinema" color="purple" tagline="The space between — where clarity lives." />
        <PanoramaBookendCard srcLeft={imgCrescentMoon} srcRight={imgMtnMist} badge="P5 · Bookend" color="pink" title="Two images, content between" description="Nature frames the message — equal images left and right, content centred." />
      </div>

      <Divider />

      {/* Float + — 8 new float, tint & mood */}
      <SectionHead num="Float +" title="8 new float, tint & mood" sub="Flip on hover, colour overlays, layered glass, radial washes, slide reveals, and more." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginBottom: '2rem' }}>
        <FlipCard frontSrc={imgOceanSunset} frontBadge="FTM1 · Flip" frontTitle="Hover or tap to flip" backBadge="Revealed" backColor="purple" backTitle="Evening restore protocol" backBody="7-minute breathwork sequence to lower cortisol after a high-output day." backStats={[{ label: 'Duration', value: '7 min' }, { label: 'Effect', value: '+34%' }]} height={280} />
        <ColorOverlayCard src={imgGoldenHour} color="orange" badge="FTM2 · Colour overlay" title="Brand tint on photo" description="Photo stays visible through a 36 % brand-colour overlay — tinted warmth." style={{ minHeight: '280px' }} />
        <VignetteCard src={imgBokehWarm} badge="FTM3 · Vignette" color="purple" title="Radial dark vignette" description="Hard vignette edges draw the eye to the clear centre of the image." style={{ minHeight: '280px' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginBottom: '5rem' }}>
        <CenteredPanelCard src={imgDuskCity} badge="FTM4 · Centre panel" color="pink" title="Frosted panel at centre" description="Glass panel floating in the middle of the image — full bleed, full depth." style={{ minHeight: '280px' }} />
        <PeekBehindCard src={imgMtnMist} badge="FTM5 · Peek behind" color="orange" title="Image rotated behind card" description="White card sits in front while the nature image peeks out at 3.5°." style={{ minHeight: '280px' }} />
        <LayeredGlassCard src={imgCrescentMoon} badge="FTM6 · Layered glass" color="purple" title="Three frosted panels" description="Three glass panels stacked at staggered positions — spatial depth on the image." style={{ minHeight: '280px' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '5rem' }}>
        <SlideRevealCard src={imgSeagulls} badge="FTM7 · Slide reveal" color="pink" title="Hover to unlock stat" description="A hidden metric row slides up from below the content on hover — interactive discovery." revealLabel="Best mood score this month" revealValue="9.4 / 10" style={{ minHeight: '280px' }} />
        <RadialWashCard src={imgBokehCool} badge="FTM8 · Radial wash" color="purple" title="Radial glow from centre" description="A radial brand-colour wash emanates from the image centre — subtle yet distinctive." style={{ minHeight: '280px' }} />
      </div>

      <Divider />

      {/* Push + — 7 interactive push concepts */}
      <SectionHead num="Push +" title="7 interactive push concepts" sub="Zoom, tilt, pop, outline, tight spacing, stamp frame, and glowing border — all respond to hover or touch." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginBottom: '2rem' }}>
        <ZoomHoverCard src={imgGoldenHour} badge="P7A · Zoom" color="orange" title="Image zooms on hover" description="The photo scales up inside its container — movement without layout shift." style={{ minHeight: '280px' }} />
        <TiltHoverCard src={imgOceanSunset} badge="P7B · 3D tilt" color="purple" title="Perspective tilt follows mouse" description="Move your cursor across the card — the 3D perspective tracks your position." style={{ minHeight: '280px' }} />
        <PopHoverCard src={imgSeagulls} badge="P7C · Pop" color="pink" title="Lifts with spring shadow" description="Card rises 7 px with a spring easing and deeper shadow on hover — satisfying pop." style={{ minHeight: '280px' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '2rem' }}>
        <OutlineCard src={imgCrescentMoon} badge="P7D · Outline" color="purple" title="No fill — border only" description="Transparent background, bold border, greyscale image ghost." style={{ minHeight: '240px' }} />
        <TightEdgeCard src={imgBokehCool} badge="P7E · Tight edge" color="orange" title="Ultra-dense spacing" description="10 px padding — content pushed to the very edges." style={{ minHeight: '240px' }} />
        <StampCard src={imgDuskCity} badge="P7F · Stamp" color="pink" title="Postcard / stamp frame" description="Dashed border and postmark circle — tactile, editorial aesthetic." style={{ minHeight: '240px' }} />
        <PulseGlowCard src={imgMtnMist} badge="P7G · Pulse glow" color="purple" title="Glowing ring on hover" description="Brand-coloured glow ring pulses outward on hover — subtle but premium." style={{ minHeight: '240px' }} />
      </div>

      <style>{`
        @media (max-width: 960px) {
          .cards-c01 { grid-template-columns: 1fr 1fr !important; grid-template-rows: auto !important; }
        }
      `}</style>
    </div>
  </Section>
);
