import React, { useState } from "react";
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

// ── Squircle primary button ───────────────────────────────────────────────────
function PrimaryBtn({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  return (
    <button
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
        padding: "0.78rem 1.6rem", borderRadius: SQ,
        background: DS.orange, color: "#fff",
        fontFamily: DS.fontDisplay, fontWeight: 600, fontSize: "0.88rem",
        border: "none", cursor: "pointer", width: "100%",
        boxShadow: on ? "0 8px 28px rgba(232,136,26,0.42)" : "0 4px 16px rgba(232,136,26,0.26)",
        transform: on ? "translateY(-3px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "all 0.24s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      {children}
    </button>
  );
}

// ── Squircle ghost button ─────────────────────────────────────────────────────
function GhostBtn({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  return (
    <button
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
        padding: "0.76rem 1.6rem", borderRadius: SQ,
        background: on ? "rgba(0,0,0,0.04)" : "transparent",
        color: DS.fg, fontFamily: DS.fontDisplay, fontWeight: 500, fontSize: "0.88rem",
        border: `1.5px solid rgba(0,0,0,0.13)`, cursor: "pointer", width: "100%",
        transition: "background 0.18s ease",
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
      <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: map[color].bg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: DS.fontMono, fontWeight: 700, fontSize: "0.62rem", color: map[color].fg, lineHeight: 1, textAlign: "center" }}>{value}</span>
      </div>
      <span style={{ fontFamily: DS.fontMono, fontSize: "0.74rem", color: DS.fgMuted, lineHeight: 1.35 }}>{label}</span>
    </div>
  );
}

// ── Mini category chip (like reference's sofa/chair icons) ───────────────────
function CategoryChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  const [on, setOn] = useState(false);
  return (
    <div
      onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}
      style={{
        display: "flex", alignItems: "center", gap: "0.45rem",
        padding: "0.45rem 0.75rem", borderRadius: SQ,
        background: on ? DS.pinkLight : DS.bg,
        border: `1px solid ${on ? DS.pinkMid : DS.border}`,
        cursor: "default", transition: "all 0.18s ease", flexShrink: 0,
      }}
    >
      <span style={{ color: on ? DS.pink : DS.fgMuted, display: "flex" }}>{icon}</span>
      <span style={{ fontFamily: DS.fontMono, fontSize: "0.68rem", color: on ? DS.pink : DS.fgMuted }}>{label}</span>
    </div>
  );
}

// tiny SVG icons for category chips
const LeafSVG = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);
const MoonSVG = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const SunSVG = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
    <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
  </svg>
);

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
        transition: "transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease",
        height: "100%", display: "flex", flexDirection: "column", cursor: "default",
      }}
    >
      {/* image header band */}
      <div style={{ position: "relative", height: "46%", overflow: "hidden", flexShrink: 0 }}>
        <img src={src} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: objectPos,
          transform: on ? "scale(1.04)" : "scale(1)", transition: "transform 0.45s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 0%, transparent 24%, rgba(255,255,255,0.01) 34%, rgba(255,255,255,0.06) 44%, rgba(255,255,255,0.18) 54%, rgba(255,255,255,0.40) 64%, rgba(255,255,255,0.66) 74%, rgba(255,255,255,0.88) 85%, #ffffff 97%)` }} />
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
export function HeroBentoSection() {
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
      {/* ═══════════════════════════════════════════════════════════ */}
      <div
        className="hero-bento-top"
        style={{ display: "grid", gridTemplateColumns: "1.1fr 1.85fr 0.9fr", gap: GAP }}
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
            <div style={{ width: "6px", height: "6px", borderRadius: "2px", background: DS.orange, flexShrink: 0 }} />
            <span style={{ fontFamily: DS.fontMono, fontSize: "0.63rem", letterSpacing: "0.14em", textTransform: "uppercase", color: DS.fgSoft }}>
              Health OS · 2025
            </span>
          </div>

          {/* main headline */}
          <h1 style={{
            fontFamily: DS.fontDisplay, fontWeight: 700,
            fontSize: "clamp(1.9rem, 2.4vw, 2.75rem)",
            color: DS.fg, lineHeight: 1.08, margin: 0, letterSpacing: "-0.025em",
          }}>
            Care that<br />
            <span style={{ color: DS.orange }}>moves</span> with<br />
            the seasons.
          </h1>

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
            <PrimaryBtn>Explore the system &nbsp;→</PrimaryBtn>
            <GhostBtn>View collections</GhostBtn>
          </div>

          {/* category chips */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
            <CategoryChip icon={<LeafSVG />} label="Morning" />
            <CategoryChip icon={<MoonSVG />} label="Evening" />
            <CategoryChip icon={<SunSVG />} label="Seasonal" />
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
          boxShadow: "0 12px 48px rgba(0,0,0,0.13), 0 4px 12px rgba(0,0,0,0.08)",
          position: "relative",
        }}>
          <img
            src={imgGoldenGrass}
            alt="Golden hour — Health OS hero"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 55%" }}
          />
          {/* ultra-subtle top vignette */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, transparent 30%)" }} />

          {/* floating glass badge — top-left */}
          <div style={{
            position: "absolute", top: "1.1rem", left: "1.1rem",
            padding: "0.48rem 0.85rem", borderRadius: "10px",
            background: "rgba(255,255,255,0.84)", backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
          }}>
            <span style={{ fontFamily: DS.fontMono, fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: DS.fg, fontWeight: 700 }}>
              Golden hour
            </span>
          </div>

          {/* floating metric pill — bottom-right */}
          <div style={{
            position: "absolute", bottom: "1.1rem", right: "1.1rem",
            padding: "0.6rem 1rem", borderRadius: SQ,
            background: "rgba(255,255,255,0.86)", backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            display: "flex", flexDirection: "column", gap: "0.1rem",
          }}>
            <span style={{ fontFamily: DS.fontMono, fontWeight: 700, fontSize: "1.1rem", color: DS.fg, lineHeight: 1 }}>8.4 / 10</span>
            <span style={{ fontFamily: DS.fontMono, fontSize: "0.64rem", color: DS.fgMuted }}>Avg. session score</span>
          </div>
        </div>

        {/* ── RIGHT — two stacked cards ───────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: GAP, height: "100%" }}>

          {/* TOP portrait card — hanging cones at dusk */}
          <div style={{
            flex: "0 0 calc(58% - 6px)",
            borderRadius: R, overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.07)",
            position: "relative",
          }}>
            <img
              src={imgConesP}
              alt="Hanging cones at dusk"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }}
            />
            {/* bottom scrim */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.22) 42%, transparent 68%)" }} />
            {/* content overlay */}
            <div style={{ position: "absolute", bottom: "0.9rem", left: "0.9rem", right: "0.9rem" }}>
              <Badge label="Winter" color="purple" />
              <p style={{
                fontFamily: DS.fontDisplay, fontWeight: 600, fontSize: "0.9rem",
                color: "#fff", margin: "0.3rem 0 0", lineHeight: 1.25,
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
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 0%, transparent 24%, rgba(255,255,255,0.02) 35%, rgba(255,255,255,0.10) 47%, rgba(255,255,255,0.30) 59%, rgba(255,255,255,0.58) 71%, rgba(255,255,255,0.84) 83%, #ffffff 96%)" }} />
            </div>

            {/* content */}
            <div style={{ padding: "0.75rem 1rem 0.9rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <Badge label="Wellbeing" color="pink" />

              {/* metrics row */}
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "0.5rem" }}>
                <div>
                  <div style={{ fontFamily: DS.fontMono, fontSize: "2rem", fontWeight: 700, color: DS.fg, lineHeight: 1 }}>91%</div>
                  <div style={{ fontFamily: DS.fontMono, fontSize: "0.62rem", color: DS.fgMuted, marginTop: "0.15rem" }}>
                    Client satisfaction
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: DS.fontMono, fontSize: "0.88rem", fontWeight: 700, color: DS.green, lineHeight: 1 }}>↑ 3.2%</div>
                  <div style={{ fontFamily: DS.fontMono, fontSize: "0.6rem", color: DS.fgSoft, marginTop: "0.15rem" }}>vs last qtr</div>
                </div>
              </div>

              {/* progress bar */}
              <div style={{ marginTop: "0.65rem" }}>
                <div style={{ height: "5px", borderRadius: "999px", background: DS.pinkLight, overflow: "hidden" }}>
                  <div style={{ width: "91%", height: "100%", background: DS.pink, borderRadius: "999px" }} />
                </div>
                <div style={{ fontFamily: DS.fontMono, fontSize: "0.58rem", color: DS.fgSoft, marginTop: "0.3rem" }}>Q1 2025 · 1,240 clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* BOTTOM ROW — 5 feature cards (sits cleanly below via flex) */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: GAP, height: "210px" }}>
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

      <style>{`
        @media (max-width: 1100px) {
          .hero-bento-top {
            grid-template-columns: 1fr 1.5fr !important;
          }
          .hero-bento-top > *:last-child {
            grid-column: 1 / -1;
            flex-direction: row !important;
            height: 180px;
          }
        }
        @media (max-width: 700px) {
          .hero-bento-top {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
