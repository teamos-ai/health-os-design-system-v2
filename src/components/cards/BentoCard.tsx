import React from "react";

// ── Design tokens ──────────────────────────────────────────────────────────────
// Re-tokenised to Health OS brand (2026-07): Figma pink→rose, orange→apricot,
// purple→lavender, green→success. Accents use the AA-safe 600 shade; light/mid
// are the 50/200 washes. Radius normalised to the Health OS 8px global max.
export const DS = {
  pink:        "#BE2E7B",  // rose-600 (AA on white & under white text)
  pinkLight:   "#FADEEE",  // rose-50  — chip wash
  pinkMid:     "#F3A0CC",  // rose-200 — hover / border
  purple:      "#7E3CB0",  // lavender-600
  purpleLight: "#EDE1F7",  // lavender-50
  purpleMid:   "#C9A3E6",  // lavender-200
  orange:      "#C9722F",  // apricot-600 (AA)
  orangeLight: "#FDECDF",  // apricot-50
  orangeMid:   "#F8C39C",  // apricot-200
  green:       "#1F9D6B",  // success-600
  greenLight:  "#E2F5EC",  // success-100
  fg:          "#1F1F1F",  // carbon / ink-900
  fgMuted:     "#6B6560",  // warm muted grey (body)
  fgSoft:      "#A39B93",  // lighter warm grey (labels)
  bg:          "#F9F6F2",  // paper
  card:        "#FFFFFF",  // surface
  border:      "#E7E0D8",  // line hairline
  radius:      "0.5rem",   // 8px — Health OS global max (squircles only)
  radiusSm:    "0.5rem",
  shadow:      "0 1px 4px rgba(0,0,0,0.05), 0 2px 12px rgba(0,0,0,0.06)",
  shadowMd:    "0 2px 8px rgba(0,0,0,0.05), 0 4px 24px rgba(0,0,0,0.09)",
  shadowLg:    "0 4px 12px rgba(0,0,0,0.06), 0 8px 40px rgba(0,0,0,0.11)",
  fontDisplay: "'Spline Sans', sans-serif",
  fontMono:    "'Anonymous Pro', monospace",
};

// ── Seamless gradient helpers ───────────────────────────────────────────────────
// Multi-stop ease-in-out curves — no harsh transitions, pure feathering
export const FADE_UP = [
  "hsla(0,0%,100%,0) 0%",
  "hsla(0,0%,100%,0) 20%",
  "hsla(0,0%,100%,0.04) 34%",
  "hsla(0,0%,100%,0.15) 46%",
  "hsla(0,0%,100%,0.38) 57%",
  "hsla(0,0%,100%,0.65) 67%",
  "hsla(0,0%,100%,0.85) 77%",
  "hsla(0,0%,100%,0.96) 87%",
  "#ffffff 95%",
].join(", ");

export const FADE_DOWN_SCRIM = [
  "hsla(0,0%,100%,0) 0%",
  "hsla(0,0%,100%,0) 20%",
  "hsla(0,0%,100%,0.01) 30%",
  "hsla(0,0%,100%,0.05) 40%",
  "hsla(0,0%,100%,0.14) 50%",
  "hsla(0,0%,100%,0.32) 60%",
  "hsla(0,0%,100%,0.56) 70%",
  "hsla(0,0%,100%,0.78) 80%",
  "hsla(0,0%,100%,0.94) 89%",
  "#ffffff 98%",
].join(", ");

export const FADE_RIGHT = [
  "hsla(0,0%,100%,0) 0%",
  "hsla(0,0%,100%,0) 28%",
  "hsla(0,0%,100%,0.04) 40%",
  "hsla(0,0%,100%,0.16) 51%",
  "hsla(0,0%,100%,0.38) 61%",
  "hsla(0,0%,100%,0.65) 71%",
  "hsla(0,0%,100%,0.85) 80%",
  "hsla(0,0%,100%,0.96) 89%",
  "#ffffff 96%",
].join(", ");

// ── Badge — rounded-rect style matching Health OS design system ────────────────
type AccentColor = "pink" | "purple" | "orange" | "green";

const accentMap: Record<AccentColor, { bg: string; text: string; dot: string }> = {
  pink:   { bg: DS.pinkLight,   text: DS.pink,   dot: DS.pink },
  purple: { bg: DS.purpleLight, text: DS.purple, dot: DS.purple },
  orange: { bg: DS.orangeLight, text: DS.orange, dot: DS.orange },
  green:  { bg: DS.greenLight,  text: DS.green,  dot: DS.green },
};

export function Badge({
  label,
  color = "pink",
  icon,
}: {
  label: string;
  color?: AccentColor;
  icon?: React.ReactNode;
}) {
  const { bg, text } = accentMap[color];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
        padding: "0.28rem 0.7rem",
        borderRadius: "6px",            // rounded-rect, not full pill
        background: bg,
        color: text,
        fontFamily: DS.fontMono,
        fontSize: "0.63rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {icon && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
      {label}
    </span>
  );
}

// Block badge — full-width strip as used in their TYPE/VOICE/DO cards
export function BlockBadge({
  label,
  color = "pink",
  icon,
}: {
  label: string;
  color?: AccentColor;
  icon?: React.ReactNode;
}) {
  const { bg, text } = accentMap[color];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        padding: "0.5rem 0.75rem",
        borderRadius: "6px",
        background: bg,
        color: text,
        fontFamily: DS.fontMono,
        fontSize: "0.63rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        fontWeight: 700,
        marginBottom: "0.9rem",
        width: "fit-content",
      }}
    >
      {icon && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
      {label}
    </div>
  );
}

// Icon badge (square with rounded corners)
export function IconBadge({
  children,
  color = "pink",
}: {
  children: React.ReactNode;
  color?: AccentColor;
}) {
  const { bg, text } = accentMap[color];
  return (
    <div
      style={{
        width: "2.4rem",
        height: "2.4rem",
        borderRadius: DS.radiusSm,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: text,
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

// Dot bullet
export function Bullet({ color }: { color: AccentColor }) {
  return (
    <span
      style={{
        width: "5px",
        height: "5px",
        borderRadius: "50%",
        background: accentMap[color].dot,
        flexShrink: 0,
        display: "inline-block",
        marginTop: "0.42rem",
      }}
    />
  );
}

// Shared prose text
export const ProseText = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <p
    style={{
      fontFamily: DS.fontMono,
      fontSize: "0.8rem",
      lineHeight: 1.65,
      color: DS.fgMuted,
      margin: "0.4rem 0 0",
      ...style,
    }}
  >
    {children}
  </p>
);

export const CardHeading = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <h3
    style={{
      fontFamily: DS.fontDisplay,
      fontWeight: 600,
      color: DS.fg,
      lineHeight: 1.2,
      margin: 0,
      ...style,
    }}
  >
    {children}
  </h3>
);

// ─── VARIANT A: Full-Bleed Hero ────────────────────────────────────────────────
// Image fills card entirely; white gradient fades from bottom, content overlaid
export function HeroCard({
  src,
  badge,
  badgeColor = "pink",
  title,
  description,
  style,
  className = "",
}: {
  src: string;
  badge?: string;
  badgeColor?: AccentColor;
  title: string;
  description?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius: DS.radius, boxShadow: DS.shadowLg, isolation: "isolate", ...style }}
    >
      <img src={src} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${FADE_UP})` }} />
      <div className="absolute inset-x-0 bottom-0 p-5">
        {badge && <div className="mb-2.5"><Badge label={badge} color={badgeColor} /></div>}
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
      </div>
    </div>
  );
}

// ─── VARIANT B: Photo Band ────────────────────────────────────────────────────
// Nature image as top header that feathers seamlessly into white card body
export function PhotoBandCard({
  src,
  badge,
  badgeColor = "purple",
  badgeIcon,
  icon,
  iconColor = "purple",
  title,
  description,
  bullets,
  bandHeight = "52%",
  style,
  className = "",
}: {
  src: string;
  badge?: string;
  badgeColor?: AccentColor;
  badgeIcon?: React.ReactNode;
  icon?: React.ReactNode;
  iconColor?: AccentColor;
  title: string;
  description?: string;
  bullets?: string[];
  bandHeight?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden flex flex-col ${className}`}
      style={{
        borderRadius: DS.radius,
        background: DS.card,
        boxShadow: DS.shadowMd,
        border: `1px solid ${DS.border}`,
        ...style,
      }}
    >
      {/* image zone with seamless bottom fade */}
      <div className="relative flex-shrink-0" style={{ height: bandHeight, minHeight: "120px" }}>
        <img src={src} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${FADE_DOWN_SCRIM})` }}
        />
        {badge && (
          <div className="absolute top-3.5 left-4">
            <Badge label={badge} color={badgeColor} icon={badgeIcon} />
          </div>
        )}
      </div>

      {/* content — sits naturally below the fade, feels continuous */}
      <div className="flex flex-col flex-1 p-5 pt-3">
        {icon && <div className="mb-3"><IconBadge color={iconColor}>{icon}</IconBadge></div>}
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
        {bullets && bullets.length > 0 && (
          <ul style={{ margin: "0.7rem 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {bullets.map((b) => (
              <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <Bullet color={badgeColor} />
                <span style={{ fontFamily: DS.fontMono, fontSize: "0.8rem", color: DS.fgMuted, lineHeight: 1.5 }}>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ─── VARIANT C: Feature Card ──────────────────────────────────────────────────
// No image — icon badge, title, description. Matches their base card style exactly.
export function FeatureCard({
  icon,
  iconColor = "pink",
  badge,
  badgeColor = "pink",
  title,
  description,
  style,
  className = "",
}: {
  icon?: React.ReactNode;
  iconColor?: AccentColor;
  badge?: string;
  badgeColor?: AccentColor;
  title: string;
  description?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col p-5 ${className}`}
      style={{
        borderRadius: DS.radius,
        background: DS.card,
        border: `1px solid ${DS.border}`,
        boxShadow: DS.shadow,
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.85rem" }}>
        {icon && <IconBadge color={iconColor}>{icon}</IconBadge>}
        {badge && <Badge label={badge} color={badgeColor} />}
      </div>
      <CardHeading>{title}</CardHeading>
      {description && <ProseText>{description}</ProseText>}
    </div>
  );
}

// ─── VARIANT D: Stat Card ─────────────────────────────────────────────────────
// Large monospace metric; image optionally shows as soft background wash
export function StatCard({
  value,
  unit,
  label,
  sublabel,
  color = "pink",
  src,
  style,
  className = "",
}: {
  value: string;
  unit?: string;
  label: string;
  sublabel?: string;
  color?: AccentColor;
  src?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden flex flex-col justify-between p-5 ${className}`}
      style={{
        borderRadius: DS.radius,
        background: DS.card,
        border: `1px solid ${DS.border}`,
        boxShadow: DS.shadowMd,
        minHeight: "140px",
        ...style,
      }}
    >
      {src && (
        <>
          <img src={src} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "saturate(0.6) brightness(1.1)", opacity: 0.16 }} />
          <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.7)" }} />
        </>
      )}
      <div className="relative"><Badge label={label} color={color} /></div>
      <div className="relative mt-3">
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.2rem" }}>
          <span style={{ fontFamily: DS.fontMono, fontSize: "2.5rem", fontWeight: 700, color: DS.fg, lineHeight: 1 }}>{value}</span>
          {unit && <span style={{ fontFamily: DS.fontMono, fontSize: "1rem", color: DS.fgSoft }}>{unit}</span>}
        </div>
        {sublabel && <ProseText style={{ margin: "0.2rem 0 0" }}>{sublabel}</ProseText>}
      </div>
    </div>
  );
}

// ─── VARIANT E: Panorama Card ─────────────────────────────────────────────────
// Landscape image on left feathering to white content on right
export function PanoramaCard({
  src,
  badge,
  badgeColor = "orange",
  title,
  description,
  stats,
  style,
  className = "",
}: {
  src: string;
  badge?: string;
  badgeColor?: AccentColor;
  title: string;
  description?: string;
  stats?: { label: string; value: string }[];
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden flex ${className}`}
      style={{
        borderRadius: DS.radius,
        background: DS.card,
        border: `1px solid ${DS.border}`,
        boxShadow: DS.shadowLg,
        ...style,
      }}
    >
      <div className="relative flex-1" style={{ minHeight: "180px" }}>
        <img src={src} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${FADE_RIGHT})` }} />
      </div>
      <div className="relative flex flex-col justify-center p-6" style={{ width: "44%", flexShrink: 0 }}>
        {badge && <div className="mb-3.5"><Badge label={badge} color={badgeColor} /></div>}
        <CardHeading style={{ fontSize: "1.15rem", lineHeight: 1.25 }}>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
        {stats && stats.length > 0 && (
          <div style={{ display: "flex", gap: "1.25rem", marginTop: "1.1rem", paddingTop: "1.1rem", borderTop: `1px solid ${DS.border}` }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: DS.fontMono, fontSize: "1.15rem", fontWeight: 700, color: DS.fg, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: DS.fontMono, fontSize: "0.68rem", color: DS.fgSoft, marginTop: "0.2rem", letterSpacing: "0.04em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── VARIANT F: Guideline Card ────────────────────────────────────────────────
// Their TYPE/VOICE/DO style — block badge + heading + bullet list
export function GuidelineCard({
  badge,
  badgeColor = "purple",
  badgeIcon,
  title,
  bullets,
  style,
  className = "",
}: {
  badge: string;
  badgeColor?: AccentColor;
  badgeIcon?: React.ReactNode;
  title: string;
  bullets: string[];
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col p-5 ${className}`}
      style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadow, ...style }}
    >
      <BlockBadge label={badge} color={badgeColor} icon={badgeIcon} />
      <CardHeading style={{ marginBottom: "0.75rem" }}>{title}</CardHeading>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {bullets.map((b) => (
          <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
            <Bullet color={badgeColor} />
            <span style={{ fontFamily: DS.fontMono, fontSize: "0.8rem", color: DS.fgMuted, lineHeight: 1.5 }}>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── VARIANT G: Tint Card ────────────────────────────────────────────────────
// Image fills entire card at very low opacity — acts as a living texture behind clean content
export function TintCard({
  src,
  badge,
  badgeColor = "pink",
  title,
  description,
  tintOpacity = 0.12,
  style,
  className = "",
}: {
  src: string;
  badge?: string;
  badgeColor?: AccentColor;
  title: string;
  description?: string;
  tintOpacity?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden flex flex-col p-5 ${className}`}
      style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadow, isolation: "isolate", ...style }}
    >
      <img src={src} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(0.8) brightness(1.05)", opacity: tintOpacity }} />
      <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.55)" }} />
      <div className="relative flex flex-col flex-1">
        {badge && <div className="mb-3"><Badge label={badge} color={badgeColor} /></div>}
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
      </div>
    </div>
  );
}

// ─── VARIANT H: Float Panel Card ─────────────────────────────────────────────
// Full-bleed image; frosted white content panel centered / positioned
export function FloatPanelCard({
  src,
  badge,
  badgeColor = "purple",
  title,
  description,
  panelPosition = "bottom",
  style,
  className = "",
}: {
  src: string;
  badge?: string;
  badgeColor?: AccentColor;
  title: string;
  description?: string;
  panelPosition?: "bottom" | "center";
  style?: React.CSSProperties;
  className?: string;
}) {
  const isCenter = panelPosition === "center";
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius: DS.radius, boxShadow: DS.shadowLg, isolation: "isolate", ...style }}
    >
      <img src={src} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      {/* floating frosted panel */}
      <div
        style={{
          position: "absolute",
          ...(isCenter ? { top: "50%", left: "1rem", right: "1rem", transform: "translateY(-50%)" }
                       : { left: "1rem", right: "1rem", bottom: "1rem" }),
          background: "rgba(255,255,255,0.52)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.55)",
          borderRadius: DS.radius,
          padding: "1rem 1.1rem",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        {badge && <div style={{ marginBottom: "0.5rem" }}><Badge label={badge} color={badgeColor} /></div>}
        <CardHeading style={{ fontSize: "1rem" }}>{title}</CardHeading>
        {description && <ProseText style={{ margin: "0.3rem 0 0" }}>{description}</ProseText>}
      </div>
    </div>
  );
}

// ─── VARIANT I: Corner Image Card ────────────────────────────────────────────
// Clean white card with a small rounded nature photo in the top-right corner
export function CornerImageCard({
  src,
  badge,
  badgeColor = "orange",
  title,
  description,
  style,
  className = "",
}: {
  src: string;
  badge?: string;
  badgeColor?: AccentColor;
  title: string;
  description?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col p-5 ${className}`}
      style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadow, position: "relative", ...style }}
    >
      {/* corner nature image */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          width: "4rem",
          height: "4rem",
          borderRadius: DS.radius,
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          flexShrink: 0,
        }}
      >
        <img src={src} alt="" aria-hidden className="w-full h-full object-cover" />
      </div>
      {badge && <div style={{ marginBottom: "0.75rem" }}><Badge label={badge} color={badgeColor} /></div>}
      <CardHeading style={{ paddingRight: "4.5rem" }}>{title}</CardHeading>
      {description && <ProseText style={{ paddingRight: "1rem" }}>{description}</ProseText>}
    </div>
  );
}

// ─── VARIANT J: Split Card ────────────────────────────────────────────────────
// Hard 50/50 split — crisp edge, no fade. Image is contained, not bled.
export function SplitCard({
  src,
  badge,
  badgeColor = "pink",
  title,
  description,
  imageOnRight = false,
  style,
  className = "",
}: {
  src: string;
  badge?: string;
  badgeColor?: AccentColor;
  title: string;
  description?: string;
  imageOnRight?: boolean;
  style?: React.CSSProperties;
  className?: string;
}) {
  const image = (
    <div className="flex-1 relative" style={{ minHeight: "160px" }}>
      <img src={src} alt={title} className="absolute inset-0 w-full h-full object-cover" />
    </div>
  );
  const content = (
    <div className="flex-1 flex flex-col justify-center p-5" style={{ background: DS.card }}>
      {badge && <div style={{ marginBottom: "0.75rem" }}><Badge label={badge} color={badgeColor} /></div>}
      <CardHeading>{title}</CardHeading>
      {description && <ProseText>{description}</ProseText>}
    </div>
  );
  return (
    <div
      className={`overflow-hidden flex ${className}`}
      style={{
        borderRadius: DS.radius,
        border: `1px solid ${DS.border}`,
        boxShadow: DS.shadowMd,
        flexDirection: imageOnRight ? "row-reverse" : "row",
        ...style,
      }}
    >
      {image}
      {content}
    </div>
  );
}

// ─── VARIANT L: Duotone Card ─────────────────────────────────────────────────
// Image rendered in greyscale with a brand-colour overlay — creates a
// monochromatic tinted photo treatment. Entirely different from the raw photo
// cards above; feels premium / editorial.
export function DuotoneCard({
  src,
  color = "pink",
  badge,
  title,
  description,
  style,
  className = "",
}: {
  src: string;
  color?: AccentColor;
  badge?: string;
  title: string;
  description?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  const overlays: Record<AccentColor, string> = {
    pink:   "rgba(200, 0, 92,  0.48)",
    purple: "rgba(124, 58, 237, 0.46)",
    orange: "rgba(232, 136, 26, 0.46)",
    green:  "rgba(5, 150, 105,  0.44)",
  };
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius: DS.radius, boxShadow: DS.shadowLg, isolation: "isolate", ...style }}
    >
      {/* greyscale photo */}
      <img
        src={src}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "grayscale(1) brightness(0.88) contrast(1.05)" }}
      />
      {/* brand-colour multiply layer — creates duotone */}
      <div
        className="absolute inset-0"
        style={{ background: overlays[color], mixBlendMode: "multiply" }}
      />
      {/* soft gradient scrim at bottom for readability */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }}
      />
      {/* content */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        {badge && (
          <div style={{ marginBottom: "0.6rem" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.25rem 0.65rem", borderRadius: "6px",
              background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)",
              color: "#fff", fontFamily: DS.fontMono, fontSize: "0.63rem",
              letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700,
            }}>{badge}</span>
          </div>
        )}
        <h3 style={{ fontFamily: DS.fontDisplay, fontWeight: 600, color: "#fff", lineHeight: 1.2, margin: 0 }}>{title}</h3>
        {description && (
          <p style={{ fontFamily: DS.fontMono, fontSize: "0.8rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.6, margin: "0.4rem 0 0" }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── VARIANT M: Quote Card ────────────────────────────────────────────────────
// Editorial pull-quote centered over a tinted nature image.
// Large italic text is the entire point — no prose block below it.
export function QuoteCard({
  src,
  quote,
  attribution,
  color = "purple",
  style,
  className = "",
}: {
  src: string;
  quote: string;
  attribution?: string;
  color?: AccentColor;
  style?: React.CSSProperties;
  className?: string;
}) {
  const scrimColors: Record<AccentColor, string> = {
    pink:   "rgba(200, 0, 92,  0.58)",
    purple: "rgba(60,  20, 120, 0.62)",
    orange: "rgba(180, 80, 0,   0.55)",
    green:  "rgba(5, 80, 50,    0.58)",
  };
  return (
    <div
      className={`relative overflow-hidden flex flex-col items-center justify-center text-center p-8 ${className}`}
      style={{ borderRadius: DS.radius, boxShadow: DS.shadowLg, isolation: "isolate", minHeight: "220px", ...style }}
    >
      <img src={src} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: scrimColors[color] }} />
      <div className="relative flex flex-col items-center gap-3" style={{ maxWidth: "520px" }}>
        {/* large opening quote mark */}
        <span style={{ fontFamily: DS.fontDisplay, fontSize: "3.5rem", lineHeight: 0.6, color: "rgba(255,255,255,0.35)", display: "block", marginBottom: "0.4rem" }}>
          "
        </span>
        <p style={{
          fontFamily: DS.fontDisplay, fontStyle: "italic", fontWeight: 400,
          fontSize: "clamp(1rem, 2.2vw, 1.35rem)", lineHeight: 1.5,
          color: "#ffffff", margin: 0,
        }}>
          {quote}
        </p>
        {attribution && (
          <p style={{ fontFamily: DS.fontMono, fontSize: "0.72rem", color: "rgba(255,255,255,0.6)", margin: "0.25rem 0 0", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            — {attribution}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── VARIANT O: Progress Ring Card ────────────────────────────────────────────
// SVG circular progress ring — the central health-tracking element.
// Image shows as an ultra-subtle tint behind the white card.
export function ProgressRingCard({
  value,
  label,
  sublabel,
  color = "pink",
  src,
  style,
  className = "",
}: {
  value: number;       // 0–100
  label: string;
  sublabel?: string;
  color?: AccentColor;
  src?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  const R = 38;
  const circ = 2 * Math.PI * R;
  const offset = circ * (1 - Math.min(Math.max(value, 0), 100) / 100);
  const trackColor = accentMap[color].bg;
  const ringColor  = accentMap[color].text;

  return (
    <div
      className={`relative overflow-hidden flex flex-col items-center justify-center p-6 ${className}`}
      style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadowMd, minHeight: "200px", isolation: "isolate", ...style }}
    >
      {src && (
        <>
          <img src={src} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "saturate(0.5) brightness(1.1)", opacity: 0.1 }} />
          <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.8)" }} />
        </>
      )}
      <div className="relative flex flex-col items-center gap-4">
        <div style={{ position: "relative", width: 100, height: 100 }}>
          <svg width={100} height={100} viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
            {/* track */}
            <circle cx="50" cy="50" r={R} fill="none" stroke={trackColor} strokeWidth="8" />
            {/* ring */}
            <circle
              cx="50" cy="50" r={R} fill="none"
              stroke={ringColor} strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${circ} ${circ}`}
              strokeDashoffset={offset}
            />
          </svg>
          {/* centre value */}
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: DS.fontMono, fontWeight: 700, fontSize: "1.5rem", color: DS.fg, lineHeight: 1 }}>
              {value}
            </span>
            <span style={{ fontFamily: DS.fontMono, fontSize: "0.6rem", color: DS.fgSoft, letterSpacing: "0.06em" }}>%</span>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: DS.fontDisplay, fontWeight: 600, fontSize: "0.95rem", color: DS.fg }}>
            {label}
          </div>
          {sublabel && (
            <div style={{ fontFamily: DS.fontMono, fontSize: "0.72rem", color: DS.fgMuted, marginTop: "0.2rem" }}>
              {sublabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── VARIANT P: Billboard Card ────────────────────────────────────────────────
// Poster-style card. Oversized display number or word IS the design.
// Nature image fills behind; typography sits at massive scale.
export function BillboardCard({
  src,
  displayText,
  label,
  sublabel,
  color = "pink",
  style,
  className = "",
}: {
  src: string;
  displayText: string;
  label?: string;
  sublabel?: string;
  color?: AccentColor;
  style?: React.CSSProperties;
  className?: string;
}) {
  const textColors: Record<AccentColor, string> = {
    pink:   DS.pink,
    purple: DS.purple,
    orange: DS.orange,
    green:  DS.green,
  };
  return (
    <div
      className={`relative overflow-hidden flex flex-col justify-between p-5 ${className}`}
      style={{ borderRadius: DS.radius, boxShadow: DS.shadowLg, isolation: "isolate", minHeight: "220px", ...style }}
    >
      <img src={src} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(1.05) saturate(0.85)", opacity: 0.18 }} />
      <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.76)" }} />

      {label && (
        <div className="relative"><Badge label={label} color={color} /></div>
      )}

      {/* oversized number / word */}
      <div className="relative" style={{ lineHeight: 1, overflow: "hidden" }}>
        <span style={{
          fontFamily: DS.fontDisplay,
          fontWeight: 700,
          fontSize: "clamp(3.5rem, 8vw, 6rem)",
          color: textColors[color],
          letterSpacing: "-0.02em",
          display: "block",
        }}>
          {displayText}
        </span>
        {sublabel && (
          <p style={{ fontFamily: DS.fontMono, fontSize: "0.78rem", color: DS.fgMuted, margin: "0.25rem 0 0" }}>
            {sublabel}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── VARIANT Q: Stacked Stat Card ─────────────────────────────────────────────
// Dashboard-style card with 3–4 mini metric rows, each with a coloured
// progress bar. Ideal for daily overview or weekly summary widgets.
export function StackedStatCard({
  title,
  rows,
  src,
  style,
  className = "",
}: {
  title?: string;
  rows: { label: string; value: string; pct: number; color: AccentColor }[];
  src?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden flex flex-col p-5 ${className}`}
      style={{ borderRadius: DS.radius, background: DS.card, border: `1px solid ${DS.border}`, boxShadow: DS.shadowMd, isolation: "isolate", ...style }}
    >
      {src && (
        <>
          <img src={src} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "saturate(0.5) brightness(1.1)", opacity: 0.09 }} />
          <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.88)" }} />
        </>
      )}
      {title && (
        <div className="relative" style={{ fontFamily: DS.fontDisplay, fontWeight: 600, fontSize: "0.95rem", color: DS.fg, marginBottom: "1rem" }}>
          {title}
        </div>
      )}
      <div className="relative flex flex-col" style={{ gap: "0.85rem" }}>
        {rows.map((r) => {
          const barColor = { pink: DS.pink, purple: DS.purple, orange: DS.orange, green: DS.green }[r.color];
          const trackColor = { pink: DS.pinkLight, purple: DS.purpleLight, orange: DS.orangeLight, green: DS.greenLight }[r.color];
          return (
            <div key={r.label}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                <span style={{ fontFamily: DS.fontMono, fontSize: "0.75rem", color: DS.fgMuted }}>{r.label}</span>
                <span style={{ fontFamily: DS.fontMono, fontSize: "0.82rem", fontWeight: 700, color: DS.fg }}>{r.value}</span>
              </div>
              {/* mini progress bar */}
              <div style={{ height: "5px", borderRadius: "999px", background: trackColor, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${Math.min(r.pct, 100)}%`,
                  background: barColor,
                  borderRadius: "999px",
                  transition: "width 0.6s ease",
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── VARIANT R: Overlap Card ──────────────────────────────────────────────────
// White card where a nature photo occupies the top-right zone and "overlaps"
// into the content area — creating editorial depth without a full-bleed image.
export function OverlapCard({
  src,
  badge,
  badgeColor = "pink",
  title,
  description,
  imageWidth = "48%",
  imageHeight = "72%",
  style,
  className = "",
}: {
  src: string;
  badge?: string;
  badgeColor?: AccentColor;
  title: string;
  description?: string;
  imageWidth?: string;
  imageHeight?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`relative flex flex-col p-5 ${className}`}
      style={{
        borderRadius: DS.radius, background: DS.card,
        border: `1px solid ${DS.border}`, boxShadow: DS.shadowMd,
        overflow: "hidden", minHeight: "200px", ...style,
      }}
    >
      {/* nature photo anchored top-right, rounded on inner corners */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: imageWidth, height: imageHeight,
        borderBottomLeftRadius: DS.radius,
        overflow: "hidden",
      }}>
        <img src={src} alt="" aria-hidden className="w-full h-full object-cover" />
        {/* seamless left fade — 8-stop eased curve */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.94) 8%, rgba(255,255,255,0.76) 18%, rgba(255,255,255,0.48) 30%, rgba(255,255,255,0.20) 44%, rgba(255,255,255,0.05) 56%, transparent 68%)",
        }} />
        {/* seamless bottom fade — 9-stop gradual curve */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.88) 8%, rgba(255,255,255,0.68) 18%, rgba(255,255,255,0.42) 29%, rgba(255,255,255,0.20) 40%, rgba(255,255,255,0.08) 51%, rgba(255,255,255,0.02) 62%, transparent 72%)",
        }} />
      </div>

      {/* content — sits naturally on the white card surface */}
      <div className="relative flex flex-col flex-1" style={{ maxWidth: "60%", zIndex: 1 }}>
        {badge && <div style={{ marginBottom: "0.7rem" }}><Badge label={badge} color={badgeColor} /></div>}
        <CardHeading>{title}</CardHeading>
        {description && <ProseText>{description}</ProseText>}
      </div>
    </div>
  );
}

// ─── VARIANT K: Mood Card ────────────────────────────────────────────────────
// Large centered emoji/metric, image as full soft background wash
export function MoodCard({
  src,
  emoji,
  value,
  label,
  sublabel,
  color = "pink",
  style,
  className = "",
}: {
  src: string;
  emoji?: string;
  value?: string;
  label: string;
  sublabel?: string;
  color?: AccentColor;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden flex flex-col items-center justify-center text-center p-6 ${className}`}
      style={{ borderRadius: DS.radius, boxShadow: DS.shadowMd, isolation: "isolate", minHeight: "180px", ...style }}
    >
      <img src={src} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(0.75) brightness(1.05)", opacity: 0.22 }} />
      <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.72)" }} />
      <div className="relative flex flex-col items-center gap-2">
        {emoji && <span style={{ fontSize: "2rem", lineHeight: 1 }}>{emoji}</span>}
        {value && (
          <span style={{ fontFamily: DS.fontMono, fontSize: "2.2rem", fontWeight: 700, color: DS.fg, lineHeight: 1 }}>
            {value}
          </span>
        )}
        <Badge label={label} color={color} />
        {sublabel && (
          <p style={{ fontFamily: DS.fontMono, fontSize: "0.75rem", color: DS.fgMuted, margin: 0, lineHeight: 1.5 }}>
            {sublabel}
          </p>
        )}
      </div>
    </div>
  );
}
