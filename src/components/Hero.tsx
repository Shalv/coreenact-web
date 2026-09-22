import React from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Workflow,
  BarChart3,
  CheckCircle2,
  RefreshCw,
  Coins,
  FileCheck2,
  Cpu,
  Layers,
} from "lucide-react";
import { MicrosoftLogo, TechIcon, CopilotIcon } from "./icons/MicrosoftIcons";
import heroConsultantImg from "../assets/images/indian_d365_consultant_1790050307568.jpg";
import leadArchitectImg from "../assets/images/indian_lead_architect_1790050330867.jpg";

interface HeroProps {
  onOpenCalculator?: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCalculator,
  onOpenContact,
}) => {
  const handleCalculatorClick = () => {
    if (typeof onOpenCalculator === "function") {
      onOpenCalculator();
    } else {
      document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative pt-52 sm:pt-52 lg:pt-56 pb-20 bg-[#fbfcfd] dark:bg-[#0b0f19] border-b border-slate-200/80 dark:border-slate-800/80 text-left overflow-hidden">
      {/* Crisp subtle architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(to right, #005a9e 1px, transparent 1px), linear-gradient(to bottom, #005a9e 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Business Central Core Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 space-y-7"
          >
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
              <MicrosoftLogo className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 tracking-normal">
                Designated Microsoft Solutions Partner
              </span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
              <span className="text-xs text-[#005a9e] dark:text-sky-400 font-semibold hidden sm:inline">
                Dynamics 365 Business Central
              </span>
            </div>

            {/* Main Headline - Bold, Authoritative, NO Gradient Text */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.12]">
                Architecting the Enterprise Core with{" "}
                <span className="text-[#005a9e] dark:text-sky-400">
                  Microsoft Dynamics 365
                </span>{" "}
                Business Central
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Coreenact guides mid-market and enterprise organizations through full-lifecycle ERP modernization: zero-loss legacy Dynamics NAV cutovers, native India GST & e-invoicing compliance, and automated Copilot workflows.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenContact}
                className="px-6 py-3.5 rounded-lg font-bold text-sm text-white bg-[#005a9e] hover:bg-[#004a82] dark:bg-blue-600 dark:hover:bg-blue-700 shadow-sm transition-colors duration-150 flex items-center gap-2.5 cursor-pointer"
              >
                <span>Consult Senior D365 Architect</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleCalculatorClick}
                className="px-5 py-3.5 rounded-lg font-semibold text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 transition-colors duration-150 flex items-center gap-2 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-[#005a9e] dark:text-sky-400" />
                <span>Model Migration ROI & TCO</span>
              </button>

              <button
                onClick={onOpenContact}
                className="px-5 py-3.5 rounded-lg font-semibold text-sm text-slate-700 dark:text-slate-300 hover:text-[#005a9e] dark:hover:text-sky-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 border border-slate-200 dark:border-slate-700 transition-colors duration-150 flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#005a9e] dark:text-sky-400" />
                <span>40-Point ERP Audit</span>
              </button>
            </div>

            {/* Certified Architects Trust Assurance */}
            <div className="flex flex-wrap items-center gap-4 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex -space-x-2 shrink-0">
                <img
                  src={leadArchitectImg}
                  alt="Lead Microsoft Dynamics 365 Enterprise Solutions Architect"
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-[#005a9e] text-white flex items-center justify-center text-xs font-bold">
                  D365
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                  NAV
                </div>
              </div>
              <div className="text-xs sm:text-sm">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span>Direct 1-on-1 Access to Principal Microsoft Architects</span>
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                  15+ Years Avg. ERP Experience • 100% Go-Live Track Record Across North America & India
                </div>
              </div>
            </div>

            {/* 4 Specialized Business Central Feature Pillars */}
            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                <span>Core Business Central Modernization Vectors</span>
                <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition">
                  <div className="w-8 h-8 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900 flex items-center justify-center text-[#005a9e] dark:text-sky-400 mb-2">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">Financials & GL</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Multi-currency & cash flow</div>
                </div>

                <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition">
                  <div className="w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 mb-2">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">NAV to Cloud</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">C/AL to modern AL code</div>
                </div>

                <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition">
                  <div className="w-8 h-8 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-900 flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-2">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">India GST & Invoicing</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">e-Way & TDS automation</div>
                </div>

                <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition">
                  <div className="w-8 h-8 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-400 mb-2">
                    <CopilotIcon className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">Copilot in BC</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Bank recon & AI insights</div>
                </div>
              </div>
            </div>

            {/* Microsoft Partner Credentials Bar */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Certified Practices:</span>
              {[
                "D365 Business Central",
                "Finance & Operations",
                "Power Platform",
                "Power BI & Fabric",
                "Azure Cloud Hosting",
                "Managed Support 24/7",
              ].map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700"
                >
                  <TechIcon label={tech} className="w-3.5 h-3.5" />
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Architectural Delivery & Governance Console */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5"
          >
            {/* Delivery Console Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden text-left">
              {/* Consultant Photographic Header */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                <img
                  src={heroConsultantImg}
                  alt="Coreenact Senior Indian Microsoft Dynamics 365 Solutions Consultant & Practice Leader"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-slate-100 text-xs font-bold shadow-md">
                    <MicrosoftLogo className="w-3.5 h-3.5" />
                    <span>Microsoft Partner Practice</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>Live Indian Deployments</span>
                  </span>
                </div>

                {/* Bottom Photo Overlay Info */}
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
                  <div>
                    <div className="text-white font-extrabold text-base sm:text-lg leading-tight drop-shadow-sm">
                      Senior ERP Practice Leadership
                    </div>
                    <div className="text-sky-200 text-xs mt-0.5 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>India GST & Global Multi-Entity NAV Architecture</span>
                    </div>
                  </div>
                  <button
                    onClick={onOpenContact}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-md flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <span>Connect</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Delivery Console Content */}
              <div className="p-5 sm:p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Dynamics 365 Business Central Cloud Platform
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    Production Ready
                  </span>
                </div>

                {/* Verified Operational Performance */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 bg-slate-50/70 dark:bg-slate-800/50 h-full">
                    <div className="text-[11px] font-bold text-blue-700 dark:text-sky-300 uppercase flex items-center justify-between">
                      <span>Order Fulfillment</span>
                      <Workflow className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">
                      99.98%
                    </div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Real-time ledger sync
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 bg-slate-50/70 dark:bg-slate-800/50 h-full">
                    <div className="text-[11px] font-bold text-purple-700 dark:text-purple-300 uppercase flex items-center justify-between">
                      <span>NAV Migration Cycle</span>
                      <BarChart3 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">
                      60 Days
                    </div>
                    <div className="text-[11px] text-blue-700 dark:text-sky-400 mt-1 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3 text-blue-500" /> Zero disruption cutover
                    </div>
                  </div>
                </div>

                {/* Copilot Workflow Status */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/70 dark:bg-slate-800/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TechIcon label="copilot" className="w-4 h-4 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          Microsoft Copilot in Business Central
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          Automated Bank Reconciliation & Variance Detection
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      AI ACTIVE
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono">
                    Automated reconciliation matched 142 customer payments (₹4.1 Cr / $485,200) with GL accounts with zero manual journal adjustments.
                  </p>
                </div>

                {/* Advisory Blueprint Shortcuts */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Recommended Architecture Roadmaps
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={onOpenContact}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-blue-900 dark:text-sky-300 border border-slate-200 dark:border-slate-700 transition text-center truncate cursor-pointer shadow-2xs"
                    >
                      NAV to BC Roadmap
                    </button>
                    <button
                      onClick={onOpenContact}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-amber-900 dark:text-amber-300 border border-slate-200 dark:border-slate-700 transition text-center truncate cursor-pointer shadow-2xs"
                    >
                      India GST Blueprint
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
