import React, { useState } from "react";
import { Play } from "lucide-react";
import { ROSE, APRICOT, LAVENDER, SUCCESS, CARBON, PAPER_IVORY } from "@/lib/palette";
import {
  DS, Badge, CardHeading, ProseText,
  FADE_UP, FADE_DOWN_SCRIM,
} from "./BentoCard";

type AC = "pink" | "purple" | "orange" | "green";

const C = {
  pink:   { bg: DS.pinkLight,   fg: DS.pink,   mid: DS.pinkMid },
  purple: { bg: DS.purpleLight, fg: DS.purple, mid: DS.purpleMid },
  orange: { bg: DS.orangeLight, fg: DS.orange, mid: DS.orangeMid },
  green:  { bg: DS.greenLight,  fg: DS.green,  mid: SUCCESS[200] },
};

// Theme-aware surface fade stops (mirrors the helper in BentoCard.tsx)
const S = (a: number) => `rgb(var(--surface) / ${a})`;
const SURFACE = "rgb(var(--surface))";

// Flat overlay badge chip — solid surface, line border, accent text (zero-glass)
const overlayChip = (accent: AC): React.CSSProperties => ({
  display: "inline-flex", alignItems: "center", gap: "0.3rem",
  padding: "0.22rem 0.6rem", borderRadius: "6px",
  background: SURFACE, border: `1px solid ${DS.border}`, boxShadow: DS.shadow,
  color: C[accent].fg, fontFamily: DS.fontMono, fontSize: "10px",
  letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700,
});

// ─── SECTION 1: 10 NEW BENTO CARDS ───────────────────────────────────────────

// S. Inverse Photo — image at BOTTOM, content at top; upward fade into image
export function InversePhotoCard({ src, badge, color = "pink", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`overflow-hidden flex flex-col ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadowMd, ...style }}>
      <div className="p-5 flex-shrink-0">
        {badge && <div style={{ marginBottom: "0.7rem" }}><Badge label={badge} color={color} /></div>}
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
      </div>
      <div className="relative flex-1" style={{ minHeight: "120px" }}>
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
        {/* seamless multi-stop fade from card surface downward into image */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${SURFACE} 0%, ${S(0.94)} 8%, ${S(0.78)} 18%, ${S(0.52)} 30%, ${S(0.24)} 44%, ${S(0.06)} 57%, ${S(0.01)} 66%, transparent 75%)` }} />
      </div>
    </div>
  );
}

// T. Third Slice — narrow 28% left image strip, wide 72% content zone
export function ThirdSliceCard({ src, badge, color = "purple", title, description, bullets, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; bullets?: string[]; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`overflow-hidden flex ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadowMd, ...style }}>
      <div className="relative flex-shrink-0" style={{ width: "28%" }}>
        <img src={src} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent 0%, transparent 38%, ${S(0.01)} 48%, ${S(0.06)} 57%, ${S(0.18)} 65%, ${S(0.40)} 74%, ${S(0.68)} 83%, ${S(0.92)} 93%, ${SURFACE} 100%)` }} />
      </div>
      <div className="flex flex-col justify-center p-5 flex-1">
        {badge && <div style={{ marginBottom: "0.6rem" }}><Badge label={badge} color={color} /></div>}
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
        {bullets && (
          <ul style={{ margin: "0.6rem 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            {bullets.map(b => (
              <li key={b} style={{ fontFamily: DS.fontMono, fontSize: "0.78rem", color: DS.fgMuted, display: "flex", alignItems: "flex-start", gap: "0.45rem" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: C[color].fg, marginTop: "0.42rem", flexShrink: 0, display: "inline-block" }} />{b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// U. Circle Portrait — circular image centred at top, content centred below
export function CirclePortraitCard({ src, badge, color = "pink", title, description, circleSize = 88, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; circleSize?: number; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`flex flex-col items-center text-center p-6 ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadow, ...style }}>
      <div style={{ width: circleSize, height: circleSize, borderRadius: "20px", overflow: "hidden", marginBottom: "1rem", boxShadow: DS.shadowMd, flexShrink: 0, border: `3px solid ${C[color].bg}` }}>
        <img src={src} alt="" className="w-full h-full object-cover" />
      </div>
      {badge && <div style={{ marginBottom: "0.55rem" }}><Badge label={badge} color={color} /></div>}
      <CardHeading>{title}</CardHeading>
      {description && <ProseText style={{ textAlign: "center" }}>{description}</ProseText>}
    </div>
  );
}

// V. Full Text on Image — all content directly on photo, no surface section
export function FullTextOnImageCard({ src, badge, color = "purple", title, body, stat, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; body?: string; stat?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`relative overflow-hidden flex flex-col justify-between p-5 ${className}`} style={{ borderRadius: DS.radius, boxShadow: DS.shadowLg, isolation: "isolate", minHeight: "220px", ...style }}>
      <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(145deg, rgba(31,31,31,0.58) 0%, rgba(31,31,31,0.18) 50%, rgba(31,31,31,0.52) 100%)" }} />
      <div className="relative">
        {badge && <span style={overlayChip(color)}>{badge}</span>}
      </div>
      <div className="relative">
        {stat && <div style={{ fontFamily: DS.fontMono, fontSize: "2.2rem", fontWeight: 700, color: PAPER_IVORY, lineHeight: 1, marginBottom: "0.3rem" }}>{stat}</div>}
        <CardHeading style={{ color: PAPER_IVORY, fontSize: "1.05rem" }}>{title}</CardHeading>
        {body && <p style={{ fontFamily: DS.fontMono, fontSize: "0.78rem", color: "rgba(249,246,242,0.68)", margin: "0.3rem 0 0", lineHeight: 1.6 }}>{body}</p>}
      </div>
    </div>
  );
}

// W. Mosaic Header — 3 tiled images as header strip, content below
export function MosaicHeaderCard({ images, badge, color = "orange", title, description, style, className = "" }: { images: [string, string, string]; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`overflow-hidden flex flex-col ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadowMd, ...style }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3px", height: "130px", flexShrink: 0 }}>
        {images.map((img, i) => (
          <div key={i} style={{ overflow: "hidden", background: DS.bg }}>
            <img src={img} alt="" aria-hidden className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="p-5">
        {badge && <div style={{ marginBottom: "0.55rem" }}><Badge label={badge} color={color} /></div>}
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
      </div>
    </div>
  );
}

// X. Pill Image Card — image displayed in a rounded squircle container
export function PillImageCard({ src, badge, color = "pink", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`flex flex-col p-5 ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadow, ...style }}>
      <div style={{ borderRadius: "20px", overflow: "hidden", height: "90px", marginBottom: "1rem", boxShadow: DS.shadow }}>
        <img src={src} alt="" className="w-full h-full object-cover" />
      </div>
      {badge && <div style={{ marginBottom: "0.55rem" }}><Badge label={badge} color={color} /></div>}
      <CardHeading>{title}</CardHeading>
      {description && <ProseText>{description}</ProseText>}
    </div>
  );
}

// Y. Side Accent Card — 22% left image accent, 78% content
export function SideAccentCard({ src, badge, color = "purple", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`overflow-hidden flex ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadow, ...style }}>
      <div className="relative flex-shrink-0" style={{ width: "22%", minWidth: "44px" }}>
        <img src={src} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent 0%, transparent 38%, ${S(0.01)} 48%, ${S(0.06)} 57%, ${S(0.18)} 65%, ${S(0.40)} 74%, ${S(0.68)} 83%, ${S(0.92)} 93%, ${SURFACE} 100%)` }} />
      </div>
      <div className="flex flex-col justify-center p-5 flex-1">
        {badge && <div style={{ marginBottom: "0.6rem" }}><Badge label={badge} color={color} /></div>}
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
      </div>
    </div>
  );
}

// Z. Big Stat + Nature Thumb — oversized metric with floating nature thumbnail
export function BigStatNatureCard({ src, value, unit, badge, color = "pink", label, sublabel, style, className = "" }: { src: string; value: string; unit?: string; badge?: string; color?: AC; label?: string; sublabel?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`relative flex flex-col justify-between p-5 ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadowMd, minHeight: "170px", ...style }}>
      <div style={{ position: "absolute", top: "1rem", right: "1rem", width: "68px", height: "68px", borderRadius: DS.radius, overflow: "hidden", boxShadow: DS.shadowMd }}>
        <img src={src} alt="" aria-hidden className="w-full h-full object-cover" />
      </div>
      <div>{badge && <Badge label={badge} color={color} />}</div>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.15rem" }}>
          <span style={{ fontFamily: DS.fontMono, fontSize: "3.4rem", fontWeight: 700, color: DS.fg, lineHeight: 1 }}>{value}</span>
          {unit && <span style={{ fontFamily: DS.fontMono, fontSize: "1.1rem", color: DS.fgSoft }}>{unit}</span>}
        </div>
        {label && <p style={{ fontFamily: DS.fontMono, fontSize: "0.74rem", color: DS.fgMuted, margin: "0.2rem 0 0" }}>{label}</p>}
        {sublabel && <p style={{ fontFamily: DS.fontMono, fontSize: "0.68rem", color: DS.fgSoft, margin: "0.1rem 0 0" }}>{sublabel}</p>}
      </div>
    </div>
  );
}

// AA. Multi-Stat Card — 2×2 stat grid with optional image context strip
export function MultiStatCard({ src, title, stats, style, className = "" }: { src?: string; title?: string; stats: { label: string; value: string; color: AC }[]; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`overflow-hidden flex flex-col ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadowMd, ...style }}>
      {src && (
        <div className="relative flex-shrink-0" style={{ height: "80px" }}>
          <img src={src} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${S(0)} 0%, ${S(0)} 18%, ${S(0.22)} 38%, ${S(0.52)} 55%, ${S(0.80)} 70%, ${S(0.96)} 83%, ${SURFACE} 92%)` }} />
          {title && <div className="absolute bottom-2 left-4" style={{ fontFamily: DS.fontDisplay, fontWeight: 600, fontSize: "0.85rem", color: DS.fg }}>{title}</div>}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: DS.border, gap: "1px", borderTop: `1px solid ${DS.border}` }}>
        {stats.map(s => (
          <div key={s.label} style={{ padding: "0.85rem 1rem", background: DS.card }}>
            <div style={{ fontFamily: DS.fontMono, fontSize: "1.45rem", fontWeight: 700, color: DS.fg, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: DS.fontMono, fontSize: "0.64rem", color: C[s.color].fg, marginTop: "0.2rem", letterSpacing: "0.07em", textTransform: "uppercase" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// BB. Depth Stack Card — main card sitting on visible flat cards behind it
// (layers are flat surface + line, pure translate offsets — no rotation)
export function DepthStackCard({ src, badge, color = "pink", title, description, style, className = "" }: { src?: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={className} style={{ position: "relative", paddingBottom: "10px", ...style }}>
      <div style={{ position: "absolute", bottom: 0, left: "12px", right: "12px", height: "100%", borderRadius: DS.radius, background: SURFACE, border: `1px solid ${DS.border}` }} />
      <div style={{ position: "absolute", bottom: "5px", left: "6px", right: "6px", height: "100%", borderRadius: DS.radius, background: SURFACE, border: `1px solid ${DS.border}` }} />
      <div style={{ position: "relative", borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadowMd, overflow: "hidden" }}>
        {src && (
          <div className="relative" style={{ height: "130px" }}>
            <img src={src} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${FADE_DOWN_SCRIM})` }} />
          </div>
        )}
        <div className="p-5">
          {badge && <div style={{ marginBottom: "0.6rem" }}><Badge label={badge} color={color} /></div>}
          <CardHeading>{title}</CardHeading>
          {description && <ProseText>{description}</ProseText>}
        </div>
      </div>
    </div>
  );
}

// ─── SECTION 2: 4 NEW PANORAMA CARDS ─────────────────────────────────────────

const FADE_LEFT_STR = [
  `${S(0)} 0%`, `${S(0)} 28%`, `${S(0.04)} 40%`,
  `${S(0.16)} 51%`, `${S(0.38)} 61%`, `${S(0.65)} 71%`,
  `${S(0.85)} 80%`, `${S(0.96)} 89%`, `${SURFACE} 96%`,
].join(", ");

// P2. Panorama Reverse — content LEFT, image fades to the RIGHT
export function PanoramaReverseCard({ src, badge, color = "pink", title, description, stats, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; stats?: { label: string; value: string }[]; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`overflow-hidden flex ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadowLg, ...style }}>
      <div className="relative flex flex-col justify-center p-6 flex-shrink-0" style={{ width: "44%" }}>
        {badge && <div style={{ marginBottom: "0.75rem" }}><Badge label={badge} color={color} /></div>}
        <CardHeading style={{ fontSize: "1.15rem" }}>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
        {stats && stats.length > 0 && (
          <div style={{ display: "flex", gap: "1.25rem", marginTop: "1.1rem", paddingTop: "1.1rem", borderTop: `1px solid ${DS.border}` }}>
            {stats.map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: DS.fontMono, fontSize: "1.15rem", fontWeight: 700, color: DS.fg, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: DS.fontMono, fontSize: "0.68rem", color: DS.fgSoft, marginTop: "0.2rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="relative flex-1" style={{ minHeight: "180px" }}>
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to left, ${FADE_LEFT_STR})` }} />
      </div>
    </div>
  );
}

// P3. Panorama Hero Banner — full-width image banner, horizontal stats row below
export function PanoramaBannerCard({ src, badge, color = "orange", title, description, stats, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; stats: { label: string; value: string; color: AC }[]; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`overflow-hidden flex flex-col ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadowLg, ...style }}>
      <div className="relative flex-shrink-0" style={{ height: "155px" }}>
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${FADE_DOWN_SCRIM})` }} />
        <div className="absolute inset-x-0 bottom-0 p-4">
          {badge && <div style={{ marginBottom: "0.3rem" }}><Badge label={badge} color={color} /></div>}
          <CardHeading>{title}</CardHeading>
          {description && <ProseText style={{ margin: "0.15rem 0 0" }}>{description}</ProseText>}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)`, borderTop: `1px solid ${DS.border}` }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{ padding: "0.85rem 1.1rem", borderRight: i < stats.length - 1 ? `1px solid ${DS.border}` : "none" }}>
            <div style={{ fontFamily: DS.fontMono, fontSize: "1.3rem", fontWeight: 700, color: DS.fg }}>{s.value}</div>
            <div style={{ fontFamily: DS.fontMono, fontSize: "0.64rem", color: C[s.color].fg, marginTop: "0.15rem", letterSpacing: "0.07em", textTransform: "uppercase" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// P4. Panorama Cinema — ultra-wide, short, cinematic strip
export function PanoramaCinemaCard({ src, badge, color = "purple", tagline, style, className = "" }: { src: string; badge?: string; color?: AC; tagline: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`relative overflow-hidden flex items-center justify-between px-6 ${className}`} style={{ borderRadius: DS.radius, boxShadow: DS.shadowLg, isolation: "isolate", height: "110px", ...style }}>
      <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(31,31,31,0.60) 0%, rgba(31,31,31,0.10) 45%, rgba(31,31,31,0.55) 100%)" }} />
      <div className="relative">{badge && <span style={overlayChip(color)}>{badge}</span>}</div>
      <p className="relative" style={{ fontFamily: DS.fontDisplay, fontStyle: "italic", fontSize: "1.1rem", fontWeight: 400, color: PAPER_IVORY, margin: 0, flex: 1, textAlign: "center" }}>{tagline}</p>
      {/* decorative play chip — flat, honest styling */}
      <span className="relative" aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.28rem 0.6rem", borderRadius: "6px", background: SURFACE, border: `1px solid ${DS.border}`, boxShadow: DS.shadow, fontFamily: DS.fontMono, fontSize: "10px", color: DS.fgMuted, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        <Play size={12} strokeWidth={1.5} aria-hidden /> Play
      </span>
    </div>
  );
}

// P5. Panorama Bookend — image | content | image (sandwiched)
export function PanoramaBookendCard({ srcLeft, srcRight, badge, color = "pink", title, description, style, className = "" }: { srcLeft: string; srcRight: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`overflow-hidden flex ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadowLg, ...style }}>
      <div className="relative flex-shrink-0" style={{ width: "24%", minHeight: "180px" }}>
        <img src={srcLeft} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent 0%, transparent 30%, ${S(0.04)} 44%, ${S(0.20)} 56%, ${S(0.50)} 67%, ${S(0.80)} 78%, ${S(0.97)} 89%, ${SURFACE} 97%)` }} />
      </div>
      <div className="flex flex-col justify-center p-5 flex-1">
        {badge && <div style={{ marginBottom: "0.6rem", textAlign: "center" }}><Badge label={badge} color={color} /></div>}
        <CardHeading style={{ textAlign: "center" }}>{title}</CardHeading>
        {description && <ProseText style={{ textAlign: "center" }}>{description}</ProseText>}
      </div>
      <div className="relative flex-shrink-0" style={{ width: "24%" }}>
        <img src={srcRight} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to left, transparent 0%, transparent 30%, ${S(0.04)} 44%, ${S(0.20)} 56%, ${S(0.50)} 67%, ${S(0.80)} 78%, ${S(0.97)} 89%, ${SURFACE} 97%)` }} />
      </div>
    </div>
  );
}

// ─── SECTION 3: FLOAT / TINT / MOOD — 8 NEW VARIANTS ─────────────────────────

// FTM1. Flip Card — crossfade reveal on hover/focus/tap: front=image, back=content.
// Rebuilt 2026-07: real <button>, opacity crossfade (240ms) — no 3D rotation.
export function FlipCard({ frontSrc, frontBadge, color = "pink", frontTitle, backBadge, backColor = "purple", backTitle, backBody, backStats, height = 280, style, className = "" }: { frontSrc: string; frontBadge?: string; color?: AC; frontTitle: string; backBadge?: string; backColor?: AC; backTitle: string; backBody?: string; backStats?: { label: string; value: string }[]; height?: number; style?: React.CSSProperties; className?: string }) {
  const [flipped, setFlipped] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <button
      type="button"
      className={className}
      aria-pressed={flipped}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => { setFocused(true); setFlipped(true); }}
      onBlur={() => { setFocused(false); setFlipped(false); }}
      onClick={() => setFlipped(f => !f)}
      style={{
        position: "relative", display: "block", width: "100%", height, padding: 0,
        border: "none", background: "transparent", textAlign: "left", cursor: "pointer",
        borderRadius: DS.radius,
        outline: focused ? "2px solid rgb(var(--accent-text))" : "none", outlineOffset: "2px",
        ...style,
      }}
    >
      {/* FRONT — fades out */}
      <div aria-hidden={flipped} style={{ position: "absolute", inset: 0, borderRadius: DS.radius, overflow: "hidden", boxShadow: DS.shadowLg, opacity: flipped ? 0 : 1, transition: "opacity 240ms ease-out" }}>
        <img src={frontSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${FADE_UP})` }} />
        <div className="absolute inset-x-0 bottom-0 p-5">
          {frontBadge && <div style={{ marginBottom: "0.5rem" }}><Badge label={frontBadge} color={color} /></div>}
          <CardHeading>{frontTitle}</CardHeading>
          <p style={{ fontFamily: DS.fontMono, fontSize: "0.7rem", color: DS.fgMuted, margin: "0.3rem 0 0" }}>Hover or focus to reveal</p>
        </div>
      </div>
      {/* BACK — fades in. Fixed light accent wash → fixed carbon text (theme-independent panel) */}
      <div aria-hidden={!flipped} style={{ position: "absolute", inset: 0, borderRadius: DS.radius, overflow: "hidden", background: C[backColor].bg, boxShadow: DS.shadowLg, display: "flex", flexDirection: "column", justifyContent: "center", padding: "1.5rem", opacity: flipped ? 1 : 0, transition: "opacity 240ms ease-out" }}>
        {backBadge && <div style={{ marginBottom: "0.75rem" }}><Badge label={backBadge} color={backColor} /></div>}
        <h3 style={{ fontFamily: DS.fontDisplay, fontWeight: 600, color: CARBON, lineHeight: 1.2, margin: 0 }}>{backTitle}</h3>
        {backBody && <p style={{ fontFamily: DS.fontMono, fontSize: "0.8rem", lineHeight: 1.65, color: "rgba(31,31,31,0.65)", margin: "0.4rem 0 0" }}>{backBody}</p>}
        {backStats && backStats.length > 0 && (
          <div style={{ display: "flex", gap: "1.25rem", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(31,31,31,0.12)" }}>
            {backStats.map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: DS.fontMono, fontSize: "1.3rem", fontWeight: 700, color: CARBON }}>{s.value}</div>
                <div style={{ fontFamily: DS.fontMono, fontSize: "0.68rem", color: "rgba(31,31,31,0.55)", marginTop: "0.15rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}

// FTM2. Color Overlay Card — image tinted with brand color at ~36%
export function ColorOverlayCard({ src, color = "pink", badge, title, description, style, className = "" }: { src: string; color?: AC; badge?: string; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  // Health OS accent-600 tints (rose / lavender / apricot / success)
  const overlayHex = { pink: "rgba(190,46,123,0.38)", purple: "rgba(126,60,176,0.38)", orange: "rgba(201,114,47,0.36)", green: "rgba(31,157,107,0.36)" };
  return (
    <div className={`relative overflow-hidden flex flex-col justify-between p-5 ${className}`} style={{ borderRadius: DS.radius, boxShadow: DS.shadowMd, isolation: "isolate", minHeight: "220px", ...style }}>
      <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.95) saturate(0.9)" }} />
      <div className="absolute inset-0" style={{ background: overlayHex[color] }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(31,31,31,0.45) 0%, transparent 55%)" }} />
      <div className="relative">{badge && <Badge label={badge} color={color} />}</div>
      <div className="relative">
        <CardHeading style={{ color: PAPER_IVORY }}>{title}</CardHeading>
        {description && <p style={{ fontFamily: DS.fontMono, fontSize: "0.78rem", color: "rgba(249,246,242,0.70)", margin: "0.35rem 0 0", lineHeight: 1.6 }}>{description}</p>}
      </div>
    </div>
  );
}

// FTM3. Vignette Card — radial dark vignette at edges, clear image centre
export function VignetteCard({ src, badge, color = "purple", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`relative overflow-hidden flex flex-col justify-between ${className}`} style={{ borderRadius: DS.radius, boxShadow: DS.shadowLg, isolation: "isolate", minHeight: "220px", ...style }}>
      <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 28%, rgba(31,31,31,0.78) 100%)" }} />
      <div className="relative p-5">{badge && <Badge label={badge} color={color} />}</div>
      <div className="relative p-5">
        <CardHeading style={{ color: PAPER_IVORY }}>{title}</CardHeading>
        {description && <p style={{ fontFamily: DS.fontMono, fontSize: "0.78rem", color: "rgba(249,246,242,0.65)", margin: "0.35rem 0 0", lineHeight: 1.6 }}>{description}</p>}
      </div>
    </div>
  );
}

// FTM4. Centred Panel Card — flat solid panel floating at centre of image
// (Rebuilt flat 2026-07: zero-glass rule — no backdrop blur, surface + line.)
export function CenteredPanelCard({ src, badge, color = "pink", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${className}`} style={{ borderRadius: DS.radius, boxShadow: DS.shadowLg, isolation: "isolate", minHeight: "220px", ...style }}>
      <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div style={{ position: "relative", margin: "1.5rem", padding: "1.25rem 1.4rem", background: SURFACE, border: `1px solid ${DS.border}`, borderRadius: DS.radius, boxShadow: DS.shadowMd, width: "100%" }}>
        {badge && <div style={{ marginBottom: "0.5rem" }}><Badge label={badge} color={color} /></div>}
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
      </div>
    </div>
  );
}

// FTM5. Peek Behind Card — image offset behind, main card in front
// (offset layers only — rotation removed, pure translate look)
export function PeekBehindCard({ src, badge, color = "orange", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={className} style={{ position: "relative", paddingTop: "12px", paddingRight: "12px", ...style }}>
      <div style={{ position: "absolute", top: 0, right: 0, left: "12px", bottom: "12px", borderRadius: DS.radius, overflow: "hidden", border: `1px solid ${DS.border}`, boxShadow: DS.shadow }}>
        <img src={src} alt="" aria-hidden className="w-full h-full object-cover" style={{ filter: "brightness(0.88) saturate(0.85)" }} />
      </div>
      <div style={{ position: "relative", borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadowMd, padding: "1.25rem" }}>
        {badge && <div style={{ marginBottom: "0.6rem" }}><Badge label={badge} color={color} /></div>}
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
      </div>
    </div>
  );
}

// FTM6. Layered Panel Card — 3 flat panels at staggered positions
// (Rebuilt flat 2026-07: zero-glass rule — solid surface layers, line borders.)
export function LayeredGlassCard({ src, badge, color = "purple", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ borderRadius: DS.radius, boxShadow: DS.shadowLg, isolation: "isolate", minHeight: "220px", ...style }}>
      <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div style={{ position: "absolute", bottom: "3.5rem", left: "0.75rem", right: "2rem", padding: "0.7rem 1rem", background: S(0.92), borderRadius: DS.radius, border: `1px solid ${DS.border}` }} />
      <div style={{ position: "absolute", bottom: "1.75rem", left: "0.5rem", right: "1.25rem", padding: "0.7rem 1rem", background: S(0.92), borderRadius: DS.radius, border: `1px solid ${DS.border}` }} />
      <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem", right: "0.75rem", padding: "1rem 1.1rem", background: SURFACE, borderRadius: DS.radius, border: `1px solid ${DS.border}`, boxShadow: DS.shadowMd }}>
        {badge && <div style={{ marginBottom: "0.4rem" }}><Badge label={badge} color={color} /></div>}
        <CardHeading style={{ fontSize: "0.95rem" }}>{title}</CardHeading>
        {description && <ProseText style={{ margin: "0.25rem 0 0" }}>{description}</ProseText>}
      </div>
    </div>
  );
}

// FTM7. Slide Reveal Card — hover/focus slides up a hidden stat row from bottom
export function SlideRevealCard({ src, badge, color = "pink", title, description, revealLabel, revealValue, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; revealLabel: string; revealValue: string; style?: React.CSSProperties; className?: string }) {
  const [on, setOn] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <div
      className={`overflow-hidden flex flex-col ${className}`}
      tabIndex={0}
      style={{
        borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`,
        boxShadow: DS.shadowMd, cursor: "default",
        outline: focused ? "2px solid rgb(var(--accent-text))" : "none", outlineOffset: "2px",
        ...style,
      }}
      onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}
      onFocus={() => { setOn(true); setFocused(true); }}
      onBlur={() => { setOn(false); setFocused(false); }}
    >
      <div className="relative flex-shrink-0" style={{ height: "48%", overflow: "hidden" }}>
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${FADE_DOWN_SCRIM})` }} />
        {badge && <div className="absolute top-3.5 left-4"><Badge label={badge} color={color} /></div>}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
        <div style={{ marginTop: "auto", overflow: "hidden", maxHeight: on ? "56px" : "0", transition: "max-height 240ms cubic-bezier(0.22,1,0.36,1), padding-top 240ms", paddingTop: on ? "0.7rem" : "0", borderTop: on ? `1px solid ${DS.border}` : "1px solid transparent" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: DS.fontMono, fontSize: "0.72rem", color: DS.fgMuted }}>{revealLabel}</span>
            <span style={{ fontFamily: DS.fontMono, fontSize: "1.1rem", fontWeight: 700, color: C[color].fg }}>{revealValue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// FTM8. Radial Wash Card — radial brand-colour wash emanating from image centre
export function RadialWashCard({ src, badge, color = "pink", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  // Health OS pastel washes (rose-50 / lavender-50 / apricot-50 / success-100)
  const radials = { pink: "rgba(250,222,238,0.82)", purple: "rgba(237,225,247,0.82)", orange: "rgba(253,236,223,0.82)", green: "rgba(226,245,236,0.82)" };
  return (
    <div className={`overflow-hidden flex flex-col ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadowMd, ...style }}>
      <div className="relative flex-shrink-0" style={{ height: "50%", minHeight: "110px" }}>
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${radials[color]} 0%, transparent 60%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${FADE_DOWN_SCRIM})` }} />
      </div>
      <div className="p-5">
        {badge && <div style={{ marginBottom: "0.55rem" }}><Badge label={badge} color={color} /></div>}
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
      </div>
    </div>
  );
}

// ─── SECTION 4: SPLIT & CORNER — 6 NEW VARIANTS ──────────────────────────────

// SC2. Large Corner Focus — image occupies 65% from top-right, content bottom-left
export function LargeCornerFocusCard({ src, badge, color = "purple", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`relative overflow-hidden flex flex-col justify-end p-5 ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadowMd, minHeight: "220px", isolation: "isolate", ...style }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: "67%", height: "67%", overflow: "hidden", borderBottomLeftRadius: DS.radius }}>
        <img src={src} alt="" aria-hidden className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to left, transparent 0%, transparent 22%, ${S(0.06)} 36%, ${S(0.24)} 50%, ${S(0.52)} 63%, ${S(0.80)} 76%, ${S(0.97)} 88%, ${SURFACE} 96%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${SURFACE} 0%, ${S(0.88)} 10%, ${S(0.60)} 22%, ${S(0.26)} 36%, ${S(0.06)} 50%, transparent 62%)` }} />
      </div>
      <div className="relative" style={{ maxWidth: "58%" }}>
        {badge && <div style={{ marginBottom: "0.6rem" }}><Badge label={badge} color={color} /></div>}
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
      </div>
    </div>
  );
}

// SC3. Inset Photo — image floating inside card with margin all around
export function InsetPhotoCard({ src, badge, color = "orange", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`flex flex-col p-5 ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadow, ...style }}>
      <div style={{ borderRadius: DS.radiusSm, overflow: "hidden", height: "130px", marginBottom: "1rem", boxShadow: DS.shadow }}>
        <img src={src} alt="" className="w-full h-full object-cover" />
      </div>
      {badge && <div style={{ marginBottom: "0.55rem" }}><Badge label={badge} color={color} /></div>}
      <CardHeading>{title}</CardHeading>
      {description && <ProseText>{description}</ProseText>}
    </div>
  );
}

// SC4. Dual Corner — small nature images in BOTH top-right AND bottom-left
export function DualCornerCard({ srcTopRight, srcBottomLeft, badge, color = "pink", title, description, style, className = "" }: { srcTopRight: string; srcBottomLeft: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  const thumb: React.CSSProperties = { width: "76px", height: "76px", borderRadius: DS.radius, overflow: "hidden", boxShadow: DS.shadow, flexShrink: 0 };
  return (
    <div className={`relative flex flex-col justify-between p-5 ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadow, minHeight: "200px", ...style }}>
      <div style={{ ...thumb, position: "absolute", top: "1rem", right: "1rem" }}>
        <img src={srcTopRight} alt="" aria-hidden className="w-full h-full object-cover" />
      </div>
      <div style={{ maxWidth: "60%" }}>
        {badge && <div style={{ marginBottom: "0.6rem" }}><Badge label={badge} color={color} /></div>}
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
      </div>
      <div style={{ ...thumb, alignSelf: "flex-start" }}>
        <img src={srcBottomLeft} alt="" aria-hidden className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

// SC5. Strip Border Card — 13px image strip hard-edged on the left (accent line)
export function StripBorderCard({ src, badge, color = "purple", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`overflow-hidden flex ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadow, ...style }}>
      <div style={{ width: "13px", flexShrink: 0, position: "relative", overflow: "hidden" }}>
        <img src={src} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-center p-5 flex-1">
        {badge && <div style={{ marginBottom: "0.6rem" }}><Badge label={badge} color={color} /></div>}
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
      </div>
    </div>
  );
}

// SC6. Full Top Half — top 50% is full-bleed image (no top border-radius seam), bottom is surface
export function FullTopHalfCard({ src, badge, color = "pink", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`overflow-hidden flex flex-col ${className}`} style={{ borderRadius: DS.radius, boxShadow: DS.shadowMd, isolation: "isolate", ...style }}>
      <div className="relative flex-shrink-0" style={{ height: "50%" }}>
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 0%, transparent 35%, ${S(0.08)} 50%, ${S(0.32)} 62%, ${S(0.66)} 74%, ${S(0.90)} 85%, ${SURFACE} 94%)` }} />
        {badge && <div className="absolute top-3.5 left-4"><Badge label={badge} color={color} /></div>}
      </div>
      <div className="flex flex-col flex-1 p-5" style={{ background: DS.card }}>
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
      </div>
    </div>
  );
}

// ─── SECTION 5: PUSH CONCEPTS — 7 HOVER/INTERACTIVE CARDS ───────────────────

// P7A. Zoom Hover — image inside scales up gently on hover
export function ZoomHoverCard({ src, badge, color = "orange", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className={`overflow-hidden flex flex-col ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadow, cursor: "default", ...style }}
      onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
      <div style={{ position: "relative", height: "50%", overflow: "hidden", flexShrink: 0 }}>
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: on ? "scale(1.03)" : "scale(1)", transition: "transform 240ms cubic-bezier(0.22,1,0.36,1)" }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${FADE_DOWN_SCRIM})` }} />
        {badge && <div className="absolute top-3.5 left-4"><Badge label={badge} color={color} /></div>}
      </div>
      <div className="p-5">
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
      </div>
    </div>
  );
}

// P7B. Tilt Hover — standard hover lift (tilt tracking removed: no 3D motion)
export function TiltHoverCard({ src, badge, color = "purple", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  const [on, setOn] = useState(false);
  return (
    <div
      className={className}
      style={{
        borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`,
        boxShadow: on ? DS.shadowMd : DS.shadow, overflow: "hidden",
        transform: on ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 240ms cubic-bezier(0.22,1,0.36,1), box-shadow 240ms ease",
        ...style,
      }}
      onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}
    >
      <div style={{ position: "relative", height: "140px" }}>
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${FADE_DOWN_SCRIM})` }} />
      </div>
      <div className="p-5">
        {badge && <div style={{ marginBottom: "0.5rem" }}><Badge label={badge} color={color} /></div>}
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
      </div>
    </div>
  );
}

// P7C. Pop Hover — standard hover lift with a deeper token shadow
export function PopHoverCard({ src, badge, color = "pink", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className={`overflow-hidden flex flex-col ${className}`}
      style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: on ? DS.shadowMd : DS.shadow, transform: on ? "translateY(-4px)" : "translateY(0)", transition: "transform 240ms cubic-bezier(0.22,1,0.36,1), box-shadow 240ms ease", cursor: "default", ...style }}
      onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
      <div style={{ position: "relative", height: "50%", overflow: "hidden", flexShrink: 0 }}>
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${FADE_DOWN_SCRIM})` }} />
        {badge && <div className="absolute top-3.5 left-4"><Badge label={badge} color={color} /></div>}
      </div>
      <div className="p-5">
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
      </div>
    </div>
  );
}

// P7D. Outline Card — transparent background, bold border, no fill
export function OutlineCard({ src, badge, color = "purple", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`relative overflow-hidden flex flex-col p-5 ${className}`} style={{ borderRadius: DS.radius, background: "transparent", border: `2px solid ${C[color].fg}`, boxShadow: "none", isolation: "isolate", ...style }}>
      <img src={src} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" style={{ filter: "grayscale(1) brightness(1.1)", opacity: 0.07 }} />
      <div className="relative flex flex-col flex-1">
        {badge && <div style={{ marginBottom: "0.6rem" }}><Badge label={badge} color={color} /></div>}
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
        <div style={{ marginTop: "auto", paddingTop: "0.75rem", height: "2px", background: C[color].fg, borderRadius: "999px", width: "40%" }} />
      </div>
    </div>
  );
}

// P7E. Tight Edge Card — minimal 10px padding, dense, edge-to-edge feel
export function TightEdgeCard({ src, badge, color = "orange", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`overflow-hidden flex flex-col ${className}`} style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadow, ...style }}>
      <div style={{ position: "relative", height: "55%", overflow: "hidden", flexShrink: 0 }}>
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${FADE_DOWN_SCRIM})` }} />
        {badge && <div style={{ position: "absolute", top: "0.5rem", left: "0.65rem" }}><Badge label={badge} color={color} /></div>}
      </div>
      <div style={{ padding: "0.55rem 0.7rem 0.7rem" }}>
        <CardHeading style={{ fontSize: "0.88rem" }}>{title}</CardHeading>
        {description && <p style={{ fontFamily: DS.fontMono, fontSize: "0.7rem", color: DS.fgMuted, margin: "0.18rem 0 0", lineHeight: 1.45 }}>{description}</p>}
      </div>
    </div>
  );
}

// P7F. Stamp Card — postcard / stamp aesthetic with dashed border and postmark
export function StampCard({ src, badge, color = "pink", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`p-2 ${className}`} style={{ ...style }}>
      <div style={{ position: "relative", borderRadius: DS.radius, background: DS.card, border: `2px dashed ${C[color].fg}`, boxShadow: DS.shadowMd, overflow: "hidden", padding: "8px" }}>
        <div style={{ borderRadius: DS.radiusSm, overflow: "hidden", height: "145px", marginBottom: "0.7rem" }}>
          <img src={src} alt="" className="w-full h-full object-cover" />
        </div>
        <div style={{ padding: "0 0.4rem 0.5rem" }}>
          {badge && <div style={{ marginBottom: "0.45rem" }}><Badge label={badge} color={color} /></div>}
          <CardHeading style={{ fontSize: "0.92rem" }}>{title}</CardHeading>
          {description && <ProseText style={{ fontSize: "0.74rem" }}>{description}</ProseText>}
        </div>
        {/* postmark circle */}
        <div style={{ position: "absolute", top: "14px", right: "14px", width: "44px", height: "44px", borderRadius: "12px", border: `1.5px solid ${C[color].fg}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.28 }}>
          <span style={{ fontFamily: DS.fontMono, fontSize: "10px", color: C[color].fg, letterSpacing: "0.04em", textTransform: "uppercase", textAlign: "center" }}>POST</span>
        </div>
      </div>
    </div>
  );
}

// P7G. Pulse Glow Card — accent border appears on hover (glow ring removed:
// 2px accent-400 border + neutral token shadow, no coloured shadows)
export function PulseGlowCard({ src, badge, color = "purple", title, description, style, className = "" }: { src: string; badge?: string; color?: AC; title: string; description?: string; style?: React.CSSProperties; className?: string }) {
  const [on, setOn] = useState(false);
  const borderMap = { pink: ROSE[400], purple: LAVENDER[400], orange: APRICOT[400], green: SUCCESS[600] };
  return (
    <div className={`overflow-hidden flex flex-col ${className}`}
      style={{ borderRadius: DS.radius, background: DS.card, border: `2px solid ${on ? borderMap[color] : DS.border}`, boxShadow: on ? DS.shadowMd : DS.shadow, transition: "border-color 240ms ease, box-shadow 240ms ease", cursor: "default", ...style }}
      onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
      <div style={{ position: "relative", height: "50%", overflow: "hidden", flexShrink: 0 }}>
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${FADE_DOWN_SCRIM})` }} />
        {badge && <div className="absolute top-3.5 left-4"><Badge label={badge} color={color} /></div>}
      </div>
      <div className="p-5">
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
      </div>
    </div>
  );
}
