import React from "react";
import { Sparkles, Shield, MapPin, Mail, Phone, ExternalLink, ArrowRight } from "lucide-react";
import { COREENACT_CONTACT } from "../data/coreenactData";
import { PageType } from "../types";

interface FooterProps {
  onOpenChat: () => void;
  onNavigate?: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenChat, onNavigate }) => {
  const handleLink = (page: PageType) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#060a1c] pt-16 pb-12 relative overflow-hidden text-left">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand Info & Primary Contact */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col space-y-3">
              <div
                onClick={() => handleLink("home")}
                className="inline-flex cursor-pointer bg-white px-3.5 py-2 rounded-xl items-center shadow-sm hover:bg-slate-50 transition w-fit border border-white/20"
                title="Coreenact - Microsoft Dynamics 365 Business Central Partner"
              >
                <img
                  src="/coreenact-logo-transparent.png"
                  alt="Coreenact Solutions"
                  className="h-9 sm:h-10 w-auto object-contain"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs tracking-wider text-cyan-400 uppercase font-mono font-bold">
                  Microsoft Solutions Partner
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-300 font-semibold">
                  Dynamics 365 Business Central
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering global enterprises with high-velocity Microsoft Dynamics 365 Business Central implementations, seamless NAV to Cloud migrations, India GST localization, and 24/7 managed support.
            </p>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-1.5 max-w-sm">
              <div className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Official Contact Email</span>
              </div>
              <a
                href={`mailto:${COREENACT_CONTACT.email}`}
                className="text-base font-bold text-cyan-300 hover:underline font-mono"
              >
                {COREENACT_CONTACT.email}
              </a>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 border border-blue-400/30 text-blue-300">
                Microsoft Solutions Partner
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
                Dynamics 365 Business Central
              </span>
            </div>
          </div>

          {/* Col 3: Solutions & Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Pages & Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => handleLink("solutions")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer"
                >
                  Solutions (5 Pillars + EdCore)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("services")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer"
                >
                  ERP Consulting & Implementation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("services")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer"
                >
                  NAV to Cloud Migration
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("services")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer"
                >
                  ERP Audit & Health Check
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("services")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer"
                >
                  India Localization (GST/e-Invoice)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("services")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer"
                >
                  24/7 Managed Services
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Industries & About */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Industries & Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => handleLink("industries")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer"
                >
                  Manufacturing & Supply Chain
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("industries")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer"
                >
                  FMCG & Distribution
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("industries")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer"
                >
                  Retail & Omnichannel Commerce
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("industries")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer"
                >
                  Education & LMS (EdCore)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("about")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer"
                >
                  About Us & 5-Phase Methodology
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("case-studies")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer"
                >
                  Customer Case Studies
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Exact Global Offices */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Office Locations
            </h4>
            <div className="space-y-3.5 text-sm text-slate-400">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                <div className="text-white font-bold flex items-center gap-1.5 text-sm">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>India Office</span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  Innov8, 3rd Floor, 211, Okhla Industrial Estate, Phase III, New Delhi – 110020
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                <div className="text-white font-bold flex items-center gap-1.5 text-sm">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Canada Office</span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  4255 Sherwoodtowne Blvd, Ste 300, Mississauga, ON L4Z 1Y5
                </div>
              </div>

              <button
                onClick={() => handleLink("contact")}
                className="text-sm font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 pt-1 cursor-pointer"
              >
                <span>View Full Contact Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <div>
            © {new Date().getFullYear()} Coreenact Solutions. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <button
              onClick={onOpenChat}
              className="text-cyan-400 hover:text-cyan-300 transition font-medium cursor-pointer"
            >
              Consult Copilot AI
            </button>
            <span>•</span>
            <span className="text-slate-400">Microsoft Solutions Partner</span>
            <span>•</span>
            <span className="text-slate-400">info@coreenact.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
