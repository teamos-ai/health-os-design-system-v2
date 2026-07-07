import React, { useState } from "react";
import { Leaf, Moon, Sun } from "lucide-react";
import { PAPER_IVORY } from "@/lib/palette";
import { DS, Badge } from "./BentoCard";

// ── New nature imagery (served from public/media/cards) ─────────────────────────
const imgGoldenGrass = "/media/cards/nature-amber-brown-grass-golden-hour-landscape.png";
const imgConesP      = "/media/cards/nature-brown-blue-hanging-cones-sunset-portrait.png";
const imgConesLS     = "/media/cards/nature-brown-blue-hanging-cones-sunset-landscape.png";
const imgCatkinsLS   = "/media/cards/nature-cream-brown-alder-catkins-winter-landscape.png";
const imgNavyLS      = "/media/cards/nature-brown-navy-pinecone-cluster-branch-landscape.png";
const imgLarchLS     = "/media/cards/nature-brown-cream-larch-pinecones-branch-landscape.png";

const GAP = "14px";
const R   = DS.radius;
const SQ  = "8px"; // squircle button radius (Health OS 8px max)

// Theme-aware surface fade stops (mirrors the helper in BentoCard.tsx)
const S = (a: number) => `rgb(var(--surface) / ${a})`;
const SURFACE = "rgb(var(--surface))";

// Shared focus-visible ring for the real buttons below
const focusRing = (focused: boolean): React.CSSProperties =>
  focused
    ? { outline: "2px solid rgb(var(--accent-text))", outlineOffset: "2px" }
    : { outline: "none" };

// ── Squircle primary button ───────────────────────────────────────────────────
function PrimaryBtn({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      type="button"
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => { setOn(false); setPressed(false); }}
      onFocus={() => setFocused(true)}
      onBlur={() => { setFocused(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
        padding: "0.78rem 1.6rem", borderRadius: SQ,
        background: DS.orange, color: PAPER_IVORY,
        fontFamily: DS.fontDisplay, fontWeight: 600, fontSize: "0.88rem",
        border: "none", cursor: "pointer", width: "100%",
        boxShadow: on ? DS.shadowMd : DS.shadow,
        transform: pressed ? "scale(0.98)" : on ? "translateY(-2px)" : "translateY(0)",
        transition: "all 240ms cubic-bezier(0.22,1,0.36,1)",
        ...focusRing(focused),
      }}
    >
      {children}
    </button>
  );
}

// ── Squircle ghost button ─────────────────────────────────────────────────────
function GhostBtn({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      type="button"
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => { setOn(false); setPressed(false); }}
      onFocus={() => setFocused(true)}
      onBlur={() => { setFocused(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
        padding: "0.76rem 1.6rem", borderRadius: SQ,
        background: on ? "rgb(var(--ink-900) / 0.05)" : "transparent",
        color: DS.fg, fontFamily: DS.fontDisplay, fontWeight: 500, fontSize: "0.88rem",
        border: `1px solid ${DS.border}`, cursor: "pointer", width: "100%",
        transform: pressed ? "scale(0.98)" : "scale(1)",
        transition: "background 180ms ease, transform 180ms ease",
        ...focusRing(focused),
      }}
    >
      {children}
    </button>
  );
}

// ── Mini stat item ─────────────────────────────────────────────────────────────
function StatChip({
  value, label, color,
}: {
  value: string; label: string; color: "pink" | "purple" | "orange";
}) {
  const map = { pink: { bg: DS.pinkLight, fg: DS.pink }, purple: { bg: DS.purpleLight, fg: DS.purple }, orange: { bg: DS.orangeLight, fg: DS.orange } };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
      <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: map[color].bg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: DS.fontMono, fontWeight: 700, fontSize: "10px", color: map[color].fg, lineHeight: 1, textAlign: "center" }}>{value}</span>
      </div>
      <span style={{ fontFamily: DS.fontMono, fontSize: "0.74rem", color: DS.fgMuted, lineHeight: 1.35 }}>{label}</span>
    </div>
  );
}

// ── Mini category chip (like reference's sofa/chair icons) ───────────────────
function CategoryChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  const [on, setOn] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <button
      type="button"
      onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        display: "flex", alignItems: "center", gap: "0.45rem",
        padding: "0.45rem 0.75rem", borderRadius: SQ,
        background: on ? DS.pinkLight : DS.bg,
        border: `1px solid ${on ? DS.pinkMid : DS.border}`,
        cursor: "pointer", transition: "all 180ms ease", flexShrink: 0,
        ...focusRing(focused),
      }}
    >
      <span style={{ color: on ? DS.pink : DS.fgMuted, display: "flex" }}>{icon}</span>
      <span style={{ fontFamily: DS.fontMono, fontSize: "0.68rem", color: on ? DS.pink : DS.fgMuted }}>{label}</span>
    </button>
  );
}

// ── Bottom feature card ────────────────────────────────────────────────────────
function FeatureCard({
  src, badge, title, description, color, objectPos = "center",
}: {
  src: string; badge: string; title: string; description: string;
  color: "pink" | "purple" | "orange"; objectPos?: string;
}) {
  const [on, setOn] = useState(false);
  return (
    <div
      onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}
      style={{
        borderRadius: R, overflow: "hidden", background: DS.card,
        border: `1px solid ${DS.border}`,
        boxShadow: on ? DS.shadowMd : DS.shadow,
        transform: on ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 220ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms ease",
        height: "100%", display: "flex", flexDirection: "column", cursor: "default",
      }}
    >
      {/* image header band */}
      <div style={{ position: "relative", height: "46%", overflow: "hidden", flexShrink: 0 }}>
        <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: objectPos,
          transform: on ? "scale(1.03)" : "scale(1)", transition: "transform 240ms ease" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 0%, transparent 24%, ${S(0.01)} 34%, ${S(0.06)} 44%, ${S(0.18)} 54%, ${S(0.40)} 64%, ${S(0.66)} 74%, ${S(0.88)} 85%, ${SURFACE} 97%)` }} />
      </div>
      {/* content */}
      <div style={{ padding: "0.55rem 0.8rem 0.7rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <Badge label={badge} color={color} />
        <div style={{ fontFamily: DS.fontDisplay, fontWeight: 600, fontSize: "0.82rem", color: DS.fg, lineHeight: 1.2 }}>{title}</div>
        <p style={{ fontFamily: DS.fontMono, fontSize: "0.66rem", color: DS.fgMuted, margin: 0, lineHeight: 1.5 }}>{description}</p>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function HeroBentoSection({
  headingLevel = "h2",
}: {
  /** Heading element for the hero headline — pages that already have an h1
   *  (CardsSection, LivePage) keep the default 'h2'. */
  headingLevel?: "h1" | "h2";
} = {}) {
  const Heading = headingLevel;
  return (
    <div>
      {/* ── Section label ─────────────────────────────────────────── */}
      <div style={{ marginBottom: "1.75rem" }}>
        <Badge label="Hero Bento II" color="pink" />
        <h2 style={{ fontFamily: DS.fontDisplay, fontWeight: 600, fontSize: "clamp(1.4rem,3vw,1.9rem)", color: DS.fg, margin: "0.45rem 0 0", lineHeight: 1.2 }}>
          Editorial hero grid
        </h2>
        <p style={{ fontFamily: DS.fontMono, fontSize: "0.82rem", color: DS.fgMuted, marginTop: "0.35rem", lineHeight: 1.6, maxWidth: "460px" }}>
          Full-page hero layout — squircle CTAs, seasonal nature imagery, and practitioner stats in one balanced composition.
        </p>
      </div>

      {/* ── Bento wrapper — flex column keeps top + bottom cleanly stacked ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* TOP ROW — 3 columns, height driven by left panel content   */}
      {/* (responsive collapse via Tailwind: 1 col → 2 cols → 3 cols) */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div
        className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] lg:grid-cols-[1.1fr_1.85fr_0.9fr]"
        style={{ gap: GAP }}
      >

        {/* ── LEFT — typography + CTA panel ──────────────────────── */}
        <div style={{
          borderRadius: R, background: DS.card, border: `1px solid ${DS.border}`,
          boxShadow: DS.shadowMd, padding: "1.6rem 1.5rem",
          display: "flex", flexDirection: "column",
          minHeight: "520px",
        }}>
          {/* brand micro-tag */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.9rem" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "4px", background: DS.orange, flexShrink: 0 }} />
            <span style={{ fontFamily: DS.fontMono, fontSize: "0.63rem", letterSpacing: "0.14em", textTransform: "uppercase", color: DS.fgSoft }}>
              Health OS · 2026
            </span>
          </div>

          {/* main headline */}
          <Heading style={{
            fontFamily: DS.fontDisplay, fontWeight: 700,
            fontSize: "clamp(1.9rem, 2.4vw, 2.75rem)",
            color: DS.fg, lineHeight: 1.08, margin: 0, letterSpacing: "-0.025em",
          }}>
            Care that<br />
            <span style={{ color: DS.orange }}>moves</span> with<br />
            the seasons.
          </Heading>

          {/* accent rule — tighter above description */}
          <div style={{ width: "36px", height: "2.5px", background: DS.orange, borderRadius: "999px", margin: "0.75rem 0 0.65rem" }} />

          {/* description — immediately above buttons, no floating gap */}
          <p style={{
            fontFamily: DS.fontMono, fontSize: "0.78rem", color: DS.fgMuted,
            lineHeight: 1.65, margin: "0 0 1.1rem",
          }}>
            Practitioner tools built around the rhythms of nature — intelligent, calm, and beautiful by design.
          </p>

          {/* CTA buttons — right below description */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <PrimaryBtn>Explore the system <span aria-hidden="true">→</span></PrimaryBtn>
            <GhostBtn>View collections</GhostBtn>
          </div>

          {/* category chips */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
            <CategoryChip icon={<Leaf size={13} strokeWidth={1.5} aria-hidden />} label="Morning" />
            <CategoryChip icon={<Moon size={13} strokeWidth={1.5} aria-hidden />} label="Evening" />
            <CategoryChip icon={<Sun size={13} strokeWidth={1.5} aria-hidden />} label="Seasonal" />
          </div>

          {/* stat chips — pushed to bottom with auto margin + subtle separator */}
          <div style={{
            display: "flex", flexDirection: "column", gap: "0.55rem",
            marginTop: "auto", paddingTop: "1.1rem",
            borderTop: `1px solid ${DS.border}`,
          }}>
            <StatChip value="2.4k" label="Active practitioners" color="pink" />
            <StatChip value="50+"  label="Seasonal programmes"  color="purple" />
            <StatChip value="4.9★" label="Client avg. rating"   color="orange" />
          </div>
        </div>

        {/* ── CENTER — full-bleed hero image ──────────────────────── */}
        <div style={{
          borderRadius: R, overflow: "hidden",
          boxShadow: DS.shadowLg,
          position: "relative",
          minHeight: "280px",
        }}>
          <img
            src={imgGoldenGrass}
            alt="Golden hour — Health OS hero"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 55%" }}
          />
          {/* ultra-subtle top vignette */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(31,31,31,0.06) 0%, transparent 30%)" }} />

          {/* floating flat badge — top-left (zero-glass: solid surface + line) */}
          <div style={{
            position: "absolute", top: "1.1rem", left: "1.1rem",
            padding: "0.48rem 0.85rem", borderRadius: "12px",
            background: SURFACE,
            border: `1px solid ${DS.border}`, boxShadow: DS.shadow,
          }}>
            <span style={{ fontFamily: DS.fontMono, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: DS.fg, fontWeight: 700 }}>
              Golden hour
            </span>
          </div>

          {/* floating metric chip — bottom-right (flat, solid surface) */}
          <div style={{
            position: "absolute", bottom: "1.1rem", right: "1.1rem",
            padding: "0.6rem 1rem", borderRadius: SQ,
            background: SURFACE,
            border: `1px solid ${DS.border}`, boxShadow: DS.shadow,
            display: "flex", flexDirection: "column", gap: "0.1rem",
          }}>
            <span style={{ fontFamily: DS.fontMono, fontWeight: 700, fontSize: "1.1rem", color: DS.fg, lineHeight: 1 }}>8.4 / 10</span>
            <span style={{ fontFamily: DS.fontMono, fontSize: "0.64rem", color: DS.fgMuted }}>Avg. session score</span>
          </div>
        </div>

        {/* ── RIGHT — two stacked cards ───────────────────────────── */}
        <div
          className="flex flex-col h-full md:col-span-full md:flex-row md:h-[180px] lg:col-span-1 lg:flex-col lg:h-full"
          style={{ gap: GAP }}
        >

          {/* TOP portrait card — hanging cones at dusk */}
          <div style={{
            flex: "0 0 calc(58% - 6px)",
            borderRadius: R, overflow: "hidden",
            boxShadow: DS.shadowLg,
            position: "relative",
          }}>
            <img
              src={imgConesP}
              alt="Hanging cones at dusk"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }}
            />
            {/* bottom scrim */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(31,31,31,0.65) 0%, rgba(31,31,31,0.22) 42%, transparent 68%)" }} />
            {/* content overlay */}
            <div style={{ position: "absolute", bottom: "0.9rem", left: "0.9rem", right: "0.9rem" }}>
              <Badge label="Winter" color="purple" />
              <p style={{
                fontFamily: DS.fontDisplay, fontWeight: 600, fontSize: "0.9rem",
                color: PAPER_IVORY, margin: "0.3rem 0 0", lineHeight: 1.25,
              }}>
                Stillness between seasons
              </p>
            </div>
          </div>

          {/* BOTTOM stat card — rich wellbeing widget */}
          <div style={{
            flex: 1,
            borderRadius: R, overflow: "hidden",
            background: DS.card, border: `1px solid ${DS.border}`,
            boxShadow: DS.shadowMd, display: "flex", flexDirection: "column",
          }}>
            {/* nature image strip at top */}
            <div style={{ position: "relative", height: "88px", flexShrink: 0, overflow: "hidden" }}>
              <img
                src={imgLarchLS} alt="" aria-hidden
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
              />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 0%, transparent 24%, ${S(0.02)} 35%, ${S(0.10)} 47%, ${S(0.30)} 59%, ${S(0.58)} 71%, ${S(0.84)} 83%, ${SURFACE} 96%)` }} />
            </div>

            {/* content */}
            <div style={{ padding: "0.75rem 1rem 0.9rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <Badge label="Wellbeing" color="pink" />

              {/* metrics row */}
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "0.5rem" }}>
                <div>
                  <div style={{ fontFamily: DS.fontMono, fontSize: "2rem", fontWeight: 700, color: DS.fg, lineHeight: 1 }}>91%</div>
                  <div style={{ fontFamily: DS.fontMono, fontSize: "10px", color: DS.fgMuted, marginTop: "0.15rem" }}>
                    Client satisfaction
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: DS.fontMono, fontSize: "0.88rem", fontWeight: 700, color: DS.green, lineHeight: 1 }}>↑ 3.2%</div>
                  <div style={{ fontFamily: DS.fontMono, fontSize: "10px", color: DS.fgSoft, marginTop: "0.15rem" }}>vs last qtr</div>
                </div>
              </div>

              {/* progress bar */}
              <div style={{ marginTop: "0.65rem" }}>
                <div
                  role="progressbar"
                  aria-valuenow={91}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Client satisfaction"
                  style={{ height: "5px", borderRadius: "999px", background: DS.pinkLight, overflow: "hidden" }}
                >
                  <div style={{ width: "91%", height: "100%", background: DS.pink, borderRadius: "999px" }} />
                </div>
                <div style={{ fontFamily: DS.fontMono, fontSize: "10px", color: DS.fgSoft, marginTop: "0.3rem" }}>Q1 2026 · 1,240 clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* BOTTOM ROW — 5 feature cards (responsive: 2 → 3 → 5 cols)  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        style={{ gap: GAP, gridAutoRows: "210px" }}
      >
        <FeatureCard
          src={imgLarchLS}
          badge="Morning"
          title="Sunrise practice"
          description="10-min protocol timed to first light"
          color="orange"
          objectPos="center 60%"
        />
        <FeatureCard
          src={imgConesLS}
          badge="Evening"
          title="Dusk restore"
          description="Wind-down sequences for deep sleep"
          color="purple"
          objectPos="center 40%"
        />
        <FeatureCard
          src={imgCatkinsLS}
          badge="Seasonal"
          title="Winter reset"
          description="4-week programme for the cold season"
          color="pink"
          objectPos="center 30%"
        />
        <FeatureCard
          src={imgNavyLS}
          badge="Stillness"
          title="Breathwork"
          description="Pranayama calibrated to your rhythm"
          color="purple"
          objectPos="center 50%"
        />
        <FeatureCard
          src={imgGoldenGrass}
          badge="Golden hour"
          title="End-of-day"
          description="Daily reflection at your natural rhythm"
          color="orange"
          objectPos="center 60%"
        />
      </div>

      </div>{/* ── end bento flex wrapper ── */}
    </div>
  );
}
