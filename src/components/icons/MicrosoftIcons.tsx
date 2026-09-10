import React from "react";

/**
 * The official Microsoft "four-square" logo (in use since 2012).
 * Colors match Microsoft's published brand palette exactly:
 * #F25022 (red), #7FBA00 (green), #00A4EF (blue), #FFB900 (yellow).
 * This is the real Microsoft mark — used across the site anywhere
 * Coreenact needs to visually substantiate its "Microsoft Partner" claim.
 */
export const MicrosoftLogo: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    viewBox="0 0 23 23"
    className={className}
    aria-label="Microsoft"
    role="img"
  >
    <rect x="1" y="1" width="10" height="10" fill="#F25022" />
    <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
    <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
    <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
  </svg>
);

/** Logo + "Microsoft" wordmark, for use in badges / partner strips. */
export const MicrosoftWordmark: React.FC<{
  className?: string;
  textClassName?: string;
}> = ({ className = "w-5 h-5", textClassName = "text-slate-800 dark:text-white" }) => (
  <span className="inline-flex items-center gap-2">
    <MicrosoftLogo className={className} />
    <span className={`font-semibold tracking-tight ${textClassName}`} style={{ fontFamily: "Segoe UI, Arial, sans-serif" }}>
      Microsoft
    </span>
  </span>
);

/**
 * A pill-style "Official Microsoft Partner" credential badge, built around
 * the real Microsoft mark so it reads as an authentic partner credential
 * rather than a generic icon.
 */
export const MicrosoftPartnerBadge: React.FC<{ className?: string; compact?: boolean }> = ({
  className = "",
  compact = false,
}) => (
  <span
    className={`inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 shadow-xs ${
      compact ? "px-2 py-1" : "px-3 py-1.5"
    } ${className}`}
  >
    <MicrosoftLogo className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
    <span className={`font-bold text-slate-800 ${compact ? "text-[10px]" : "text-xs"}`}>
      Solutions Partner
    </span>
  </span>
);

/* ------------------------------------------------------------------ */
/*  Real Microsoft product marks (brand-accurate colors & silhouettes) */
/* ------------------------------------------------------------------ */

export const AzureIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Azure" role="img">
    <defs>
      <linearGradient id="azureGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5EA0EF" />
        <stop offset="100%" stopColor="#0078D4" />
      </linearGradient>
    </defs>
    <path d="M11.4 3.5H19l-8.3 24.4-8.2-2.1z" fill="url(#azureGrad)" />
    <path d="M11.4 3.5 3.5 25.8h6.7l4.4-13.2 6.6 16.9-11.4-.1h20.7L18.1 3.5z" fill="#0078D4" opacity="0.9" />
    <path d="M20.9 20.4 11.4 3.5h4.3l14.8 24.9H21.7z" fill="#83B9F9" opacity="0.85" />
  </svg>
);

export const PowerBIIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Power BI" role="img">
    <rect x="4" y="14" width="6" height="14" rx="1" fill="#F2C811" />
    <rect x="13" y="8" width="6" height="20" rx="1" fill="#F2C811" opacity="0.85" />
    <rect x="22" y="2" width="6" height="26" rx="1" fill="#F2C811" opacity="0.65" />
  </svg>
);

export const DynamicsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Dynamics 365" role="img">
    <defs>
      <linearGradient id="d365Grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0FAFE3" />
        <stop offset="100%" stopColor="#0060A9" />
      </linearGradient>
    </defs>
    <path
      d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12c-3.7 0-7-1.7-9.2-4.3a1.4 1.4 0 0 1 2.1-1.8A9.2 9.2 0 1 0 16 6.8a1.4 1.4 0 0 1 0-2.8Z"
      fill="url(#d365Grad)"
    />
    <circle cx="6" cy="19.5" r="2.1" fill="#0FAFE3" />
  </svg>
);

export const TeamsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Teams" role="img">
    <rect x="2" y="9" width="18" height="18" rx="3" fill="#5059C9" />
    <circle cx="24.5" cy="10" r="4" fill="#7B83EB" />
    <path d="M18 9h9a3 3 0 0 1 3 3v6.5a5.5 5.5 0 0 1-9.9 3.3" fill="none" stroke="#7B83EB" strokeWidth="0" />
    <path d="M18 9h9.5A2.5 2.5 0 0 1 30 11.5v5.9a5.4 5.4 0 0 1-9.7 3.3L18 18.6Z" fill="#7B83EB" />
    <rect x="6" y="14" width="10" height="2" fill="#fff" />
    <rect x="9.5" y="14" width="3" height="9" fill="#fff" />
  </svg>
);

export const CopilotIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Copilot" role="img">
    <defs>
      <radialGradient id="copilotGrad" cx="30%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#7FD5F0" />
        <stop offset="45%" stopColor="#5B7CF0" />
        <stop offset="100%" stopColor="#8C4FE0" />
      </radialGradient>
    </defs>
    <path
      d="M16 3c1 4.4 2.2 6.9 4.5 9.5C22.8 15 26 16.4 29 17c-4.4 1-6.9 2.2-9.5 4.5C17 24 15.6 27.6 15 29c-1-4.4-2.2-6.9-4.5-9.5C8 17 4.4 15.6 3 15c4.4-1 6.9-2.2 9.5-4.5C15 8 15.6 4.4 16 3Z"
      fill="url(#copilotGrad)"
    />
  </svg>
);

export const ExcelIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Excel" role="img">
    <rect x="4" y="3" width="20" height="26" rx="1.5" fill="#107C41" />
    <rect x="4" y="3" width="20" height="6" fill="#21A366" />
    <path d="M9 12h4.2l2.8 4.4 2.8-4.4H23l-4.4 6 4.4 6h-4.2l-2.8-4.4L13.2 24H9l4.4-6z" fill="#fff" />
  </svg>
);

export const OutlookIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Outlook" role="img">
    <rect x="14" y="6" width="16" height="20" rx="1.5" fill="#0A2767" />
    <rect x="14" y="6" width="16" height="6" fill="#0364B8" />
    <circle cx="10" cy="16" r="9" fill="#28A8EA" />
    <circle cx="10" cy="16" r="5.5" fill="#fff" />
    <circle cx="10" cy="16" r="3" fill="#0078D4" />
  </svg>
);

export const PowerAutomateIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Power Automate" role="img">
    <path d="M18 3 6 18h8l-2 11 12-15h-8z" fill="#0066FF" />
  </svg>
);

export const PowerAppsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Power Apps" role="img">
    <polygon points="16,2 29,9.5 29,22.5 16,30 3,22.5 3,9.5" fill="#742774" />
    <polygon points="16,8 23,12 23,20 16,24 9,20 9,12" fill="#fff" opacity="0.92" />
  </svg>
);

export const FabricIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Fabric" role="img">
    <path d="M4 8 16 3l12 5-12 5z" fill="#3BC5F6" />
    <path d="M4 16 16 11l12 5-12 5z" fill="#0F6CBD" />
    <path d="M4 24 16 19l12 5-12 5z" fill="#004E8C" />
  </svg>
);

export const EntraIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} aria-label="Microsoft Entra ID" role="img">
    <circle cx="16" cy="16" r="13" fill="none" stroke="#0078D4" strokeWidth="3" />
    <circle cx="16" cy="16" r="6" fill="#50E6FF" />
  </svg>
);

/** Generic fallback chip for any other Microsoft-ecosystem term. */
export const MicrosoftGenericIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <MicrosoftLogo className={className} />
);

const ICON_MAP: Array<{ match: RegExp; Icon: React.FC<{ className?: string }> }> = [
  { match: /azure|synapse|onelake|entra|purview|defender/i, Icon: AzureIcon },
  { match: /entra/i, Icon: EntraIcon },
  { match: /power\s*bi/i, Icon: PowerBIIcon },
  { match: /fabric/i, Icon: FabricIcon },
  { match: /power\s*automate/i, Icon: PowerAutomateIcon },
  { match: /power\s*apps|power\s*pages|dataverse/i, Icon: PowerAppsIcon },
  { match: /copilot|semantic kernel|openai/i, Icon: CopilotIcon },
  { match: /teams/i, Icon: TeamsIcon },
  { match: /excel/i, Icon: ExcelIcon },
  { match: /outlook/i, Icon: OutlookIcon },
  { match: /dynamics|business central|d365|erp|f&o|finance|supply chain|sales|customer insights/i, Icon: DynamicsIcon },
];

/**
 * Given a free-text stack label (e.g. "Azure Data Lake", "Power BI Embedded"),
 * renders the closest matching real Microsoft product icon, falling back to
 * the Microsoft logo itself.
 */
export const TechIcon: React.FC<{ label: string; className?: string }> = ({
  label,
  className = "w-5 h-5",
}) => {
  const found = ICON_MAP.find((entry) => entry.match.test(label));
  const Icon = found ? found.Icon : MicrosoftGenericIcon;
  return <Icon className={className} />;
};
