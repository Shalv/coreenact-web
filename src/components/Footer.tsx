import React from "react";
import {
  Shield,
  MapPin,
  Mail,
  ArrowRight,
  ArrowUp,
  Clock,
  Globe,
  Layers,
  CheckCircle2,
  PhoneCall,
  FileText,
} from "lucide-react";
import { COREENACT_CONTACT } from "../data/coreenactData";
import { PageType } from "../types";
import { MicrosoftLogo } from "./icons/MicrosoftIcons";

interface FooterProps {
  onNavigate?: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (page: PageType) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#060a1c] relative overflow-hidden text-left text-slate-300">
      {/* Subtle ambient gradient mesh for depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Creative Top CTA / Quick Connect Banner */}
        <div className="pt-12 pb-10 border-b border-white/10">
          <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-slate-900/90 via-blue-950/40 to-slate-900/90 border border-blue-500/20 shadow-xl backdrop-blur-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-xs font-semibold text-cyan-300">
                <MicrosoftLogo className="w-3.5 h-3.5" />
                <span>Microsoft Solutions Partner</span>
                <span className="text-blue-400">•</span>
                <span className="text-white">Dynamics 365 Business Central</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Ready to Modernize Your Enterprise Operations?
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect with our certified Dynamics 365 architects for a zero-obligation discovery session, TCO benchmark, or legacy NAV migration roadmap.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleLink("contact")}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
              >
                <span>Schedule Architecture Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleLink("case-studies")}
                className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-white/15 text-slate-200 hover:text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Customer Case Studies</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Balanced 4-Column Directory Grid */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 border-b border-white/10">
          {/* Col 1: Brand & Practice Identity */}
          <div className="space-y-5">
            <div
              onClick={() => handleLink("home")}
              className="inline-flex cursor-pointer bg-white px-3.5 py-2 rounded-xl items-center shadow-md hover:opacity-95 transition border border-white/30"
              title="Coreenact - Microsoft Dynamics 365 Business Central Partner"
            >
              <img
                src="/coreenact-logo-transparent.png"
                alt="Coreenact Solutions"
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Converting enterprise complexity into an intelligent core with Microsoft Dynamics 365 Business Central, cloud ERP migrations, and custom industry add-ons.
            </p>

            {/* Credibility Badges */}
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10">
                <div className="font-extrabold text-cyan-400 text-sm">20+</div>
                <div className="text-[11px] text-slate-400">BC Deployments</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10">
                <div className="font-extrabold text-blue-400 text-sm">15+ Yrs</div>
                <div className="text-[11px] text-slate-400">NAV/BC Mastery</div>
              </div>
            </div>

            {/* Primary Contact Card */}
            <a
              href={`mailto:${COREENACT_CONTACT.email}`}
              className="group p-3 rounded-xl bg-blue-950/30 hover:bg-blue-900/40 border border-blue-500/20 transition flex items-center gap-3 block text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Official Inquiries
                </div>
                <div className="text-xs font-mono font-bold text-cyan-300 group-hover:underline truncate">
                  {COREENACT_CONTACT.email}
                </div>
              </div>
            </a>
          </div>

          {/* Col 2: Solutions & Capabilities */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-white/10">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Solutions & Services
              </h4>
            </div>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => handleLink("solutions")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition" />
                  <span>Business Central Implementation</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("services")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition" />
                  <span>Dynamics NAV to Cloud SaaS</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("services")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition" />
                  <span>India GST & e-Invoicing Compliance</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("services")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition" />
                  <span>ERP Code & Architecture Audit</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("services")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition" />
                  <span>24/7 Managed Application SLA</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("solutions")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition" />
                  <span className="flex items-center gap-1.5">
                    <span>BC Add-on Suite</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      9 Modules
                    </span>
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Industries & Practice */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-white/10">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Industries & Enterprise
              </h4>
            </div>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => handleLink("industries")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-400 transition" />
                  <span>Manufacturing & Supply Chain</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("industries")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-400 transition" />
                  <span>FMCG & Wholesale Distribution</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("industries")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-400 transition" />
                  <span>Retail & Omnichannel Commerce</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("industries")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-400 transition" />
                  <span>Higher Education & LMS (EdCore)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("about")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-400 transition" />
                  <span>5-Phase Delivery Framework</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("case-studies")}
                  className="hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-400 transition" />
                  <span>Enterprise Case Studies</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Dual Delivery Centers */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Global Delivery Hubs
              </h4>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              {/* India Hub */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between text-white font-bold">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>India (Engineering CoE)</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-cyan-300 border border-blue-800/60">
                    IST
                  </span>
                </div>
                <div className="text-slate-400 leading-relaxed">
                  Innov8, 3rd Fl, 211, Okhla Ind. Estate, Phase III, New Delhi – 110020
                </div>
              </div>

              {/* Canada Hub */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between text-white font-bold">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Canada (Americas Hub)</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/60">
                    EST
                  </span>
                </div>
                <div className="text-slate-400 leading-relaxed">
                  4255 Sherwoodtowne Blvd, Ste 300, Mississauga, ON L4Z 1Y5
                </div>
              </div>

              <button
                onClick={() => handleLink("contact")}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800/70 hover:bg-slate-700/80 border border-white/10 text-cyan-300 hover:text-white font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>View Full Contact Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Clean, Balanced Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Coreenact Solutions. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Microsoft Cloud Certified Partner</span>
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 transition cursor-pointer flex items-center gap-1 text-[11px]"
              title="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

