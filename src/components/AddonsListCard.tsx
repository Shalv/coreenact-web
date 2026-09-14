import React from "react";
import { AddonItem, ADDONS_LIST } from "../data/addonsData";
import {
  Users,
  UserCheck,
  Building2,
  QrCode,
  PenTool,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Receipt,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface AddonsListCardProps {
  onSelectAddon?: (addon: AddonItem) => void;
  onOpenConsultation?: (addonName?: string) => void;
  className?: string;
}

export const AddonsListCard: React.FC<AddonsListCardProps> = ({
  onSelectAddon,
  onOpenConsultation,
  className = "",
}) => {
  const getAddonIcon = (id: string) => {
    switch (id) {
      case "vendor-customer-portal":
        return <Users className="w-4 h-4 text-sky-400" />;
      case "hrms-portal":
        return <UserCheck className="w-4 h-4 text-emerald-400" />;
      case "visitor-management-app":
        return <Building2 className="w-4 h-4 text-cyan-400" />;
      case "qr-bar-code":
        return <QrCode className="w-4 h-4 text-amber-400" />;
      case "signing-pad-handwritten":
        return <PenTool className="w-4 h-4 text-purple-400" />;
      case "in-app-approval-system":
        return <CheckCircle2 className="w-4 h-4 text-blue-400" />;
      case "whatsapp-shopify-integration":
        return <MessageSquare className="w-4 h-4 text-teal-400" />;
      case "digital-class-3-2-signature":
        return <ShieldCheck className="w-4 h-4 text-indigo-400" />;
      case "e-invoices-eway-bills":
        return <Receipt className="w-4 h-4 text-rose-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-400" />;
    }
  };

  const getAddonBadge = (id: string) => {
    switch (id) {
      case "vendor-customer-portal":
        return "Self-Service Web Portals";
      case "hrms-portal":
        return "Payroll & Attendance";
      case "visitor-management-app":
        return "Digital Gate Passes";
      case "qr-bar-code":
        return "GS1 Scanning & Labels";
      case "signing-pad-handwritten":
        return "Signature on POD";
      case "in-app-approval-system":
        return "Multi-Tier Approval Matrix";
      case "whatsapp-shopify-integration":
        return "Shopify & WhatsApp Sync";
      case "digital-class-3-2-signature":
        return "PKI DSC PDF Signing";
      case "e-invoices-eway-bills":
        return "IRN & GST E-way Bills";
      default:
        return "BC Extension";
    }
  };

  return (
    <div
      className={`bg-[#070e24] text-slate-100 rounded-2xl shadow-2xl border border-blue-900/50 relative overflow-hidden backdrop-blur-xl ${className}`}
      id="coreenact-addons-list-card"
    >
      {/* Top Gradient Border Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600" />

      {/* Header Bar */}
      <div className="px-5 py-3.5 border-b border-slate-800/80 bg-[#060b1e]/90 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 bg-blue-500 inline-block shadow-xs shadow-blue-500/60" />
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <span>Business Central Add-ons</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Plug & play enterprise extensions for Dynamics 365 BC
            </p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-950 text-cyan-300 border border-blue-700/60">
          9 Modules
        </span>
      </div>

      {/* Grid of Addons (2-columns on sm, 1-col on mobile) */}
      <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[65vh] sm:max-h-[500px] overflow-y-auto">
        {ADDONS_LIST.map((addon) => (
          <button
            key={addon.id}
            onClick={() => {
              if (onSelectAddon) {
                onSelectAddon(addon);
              } else if (onOpenConsultation) {
                onOpenConsultation(addon.name);
              }
            }}
            className="group w-full text-left p-2.5 rounded-xl bg-slate-900/60 hover:bg-blue-950/50 border border-slate-800/80 hover:border-blue-500/50 transition-all duration-150 flex items-start gap-2.5 cursor-pointer shadow-2xs"
            title={`View details for ${addon.name}`}
          >
            {/* Module Icon Tile */}
            <div className="w-8 h-8 rounded-lg bg-slate-800/80 group-hover:bg-blue-900/60 border border-slate-700/60 group-hover:border-blue-400/50 flex items-center justify-center shrink-0 transition-colors mt-0.5">
              {getAddonIcon(addon.id)}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-semibold text-slate-100 group-hover:text-white truncate">
                  {addon.name}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
              <p className="text-[11px] text-slate-400 group-hover:text-sky-200/80 transition-colors truncate mt-0.5">
                {getAddonBadge(addon.id)}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Action Footer */}
      <div className="px-4 py-3 bg-[#050917] border-t border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <span className="text-[11px] text-slate-400 text-center sm:text-left">
          Tailored for Indian GST, E-Invoicing & Supply Chain
        </span>
        <button
          onClick={() => onOpenConsultation?.("Enterprise Add-on Suite")}
          className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <span>Request Add-on Demo</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
