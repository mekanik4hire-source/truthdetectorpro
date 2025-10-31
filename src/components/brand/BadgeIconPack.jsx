import React from "react";

export const TDP_COLORS = {
  ink: "#0B0E12",
  surface: "#E6E9EE",
  safe: "#2AD17B",
  warn: "#FFB020",
  bronze: "#A87C48",
  copper: "#C69C6D",
  patina: "#2A8C82",
};

export function LogoMark({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={TDP_COLORS.copper} />
          <stop offset="100%" stopColor={TDP_COLORS.bronze} />
        </linearGradient>
      </defs>
      <path
        d="M32 6l18 6v16c0 15-11 23-18 25-7-2-18-10-18-25V12l18-6z"
        fill="url(#g1)"
        stroke={TDP_COLORS.copper}
        strokeWidth="1.5"
      />
      <path
        d="M24 33l6 6 10-12"
        stroke={TDP_COLORS.safe}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BadgePill({ children }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
      style={{
        borderColor: TDP_COLORS.copper,
        background: "rgba(255,255,255,0.04)",
      }}
    >
      <LogoMark size={14} />
      <span className="tracking-wide">{children}</span>
    </span>
  );
}

export const BadgeExplainableAI = () => <BadgePill>Explainable AI</BadgePill>;
export const BadgePrivacyFirst = () => <BadgePill>Privacy-First</BadgePill>;
export const BadgeEvidenceVault = () => <BadgePill>Evidence Vault</BadgePill>;
export const BadgeVerifiedCreator = () => <BadgePill>Verified Creator</BadgePill>;
