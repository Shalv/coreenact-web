import React from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Workflow,
  BarChart3,
  CheckCircle2,
  Database,
  Building2,
  FileCheck2,
  CloudCog,
  RefreshCw,
  Coins,
} from "lucide-react";

interface HeroProps {
  onOpenChat: (preset?: string) => void;
  onOpenCalculator?: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenChat,
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
    <section id="hero" className="relative pt-32 pb-20 bg-gradient-to-b from-slate-50 via-white to-white overflow-hidden text-left">
      {/* Subtle background mesh grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(to right, #0078d4 1px, transparent 1px), linear-gradient(to bottom, #0078d4 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Soft color highlights */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Business Central Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-7"
          >
            {/* Pill Announcement */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200/80 shadow-xs"
            >
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>
              <span className="text-xs sm:text-sm font-bold text-blue-900 tracking-wide">
                Microsoft Solutions Partner • Dynamics 365 Business Central
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-heading">
                Modernize Your Enterprise with{" "}
                <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                  Microsoft Dynamics 365
                </span>{" "}
                Business Central
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Coreenact accelerates mid-market and enterprise digital transformation with certified Microsoft Dynamics 365 Business Central deployments, zero-data-loss Dynamics NAV/Navision to Cloud migrations, native India GST statutory compliance, and Copilot AI automation.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={() => onOpenChat("I need an expert consultation on migrating from Dynamics NAV to Business Central SaaS.")}
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all duration-200 hover:scale-[1.02] flex items-center gap-2.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-blue-200" />
                <span>Consult D365 Architect</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleCalculatorClick}
                className="px-5 py-3.5 rounded-xl font-bold text-sm text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 shadow-xs transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>Calculate BC Migration ROI</span>
              </button>

              <button
                onClick={onOpenContact}
                className="px-5 py-3.5 rounded-xl font-bold text-sm text-slate-700 hover:text-blue-700 bg-blue-50/60 hover:bg-blue-50 border border-blue-200/60 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Book 40-Point ERP Audit</span>
              </button>
            </div>

            {/* 4 Specialized Business Central Feature Pillars */}
            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                <span>Core Business Central Modernization Vectors:</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-sm transition">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-2">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-bold text-slate-900">Financials & GL</div>
                  <div className="text-xs text-slate-600 mt-0.5">Multi-currency & cash flow</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-sm transition">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 mb-2">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-bold text-slate-900">NAV to Cloud</div>
                  <div className="text-xs text-slate-600 mt-0.5">C/AL to modern AL code</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-sm transition">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-2">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-bold text-slate-900">India GST & Invoicing</div>
                  <div className="text-xs text-slate-600 mt-0.5">e-Way & TDS automation</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-sm transition">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 mb-2">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-bold text-slate-900">Copilot in BC</div>
                  <div className="text-xs text-slate-600 mt-0.5">Bank recon & AI insights</div>
                </div>
              </div>
            </div>

            {/* Microsoft Partner Credentials Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600">
              <span className="font-semibold text-slate-800">Microsoft Certified Specialties:</span>
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
                  className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Business Central Cloud Telemetry & Operations Console */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            {/* Outer elevated card */}
            <div className="rounded-3xl p-1 bg-gradient-to-br from-blue-200 via-indigo-200 to-slate-200 shadow-xl">
              <div className="rounded-[22px] bg-white border border-slate-200/80 p-6 overflow-hidden space-y-5 text-left">
                {/* Header of Business Central Console */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono font-bold text-slate-700 ml-1">
                      Dynamics 365 Business Central Cloud
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Production SaaS
                  </span>
                </div>

                {/* Real-time Business Central Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                    <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center justify-between">
                      <span>Order Fulfillment</span>
                      <Workflow className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                      99.98%
                    </div>
                    <div className="text-[10px] text-emerald-600 mt-1 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Real-time inventory sync
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                    <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center justify-between">
                      <span>Avg. Migration Time</span>
                      <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                      60 Days
                    </div>
                    <div className="text-[10px] text-blue-600 mt-1 flex items-center gap-1 font-semibold">
                      <TrendingUp className="w-3 h-3" /> Zero disruption cutover
                    </div>
                  </div>
                </div>

                {/* Copilot in Business Central Action Preview */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Microsoft Copilot in Business Central</div>
                        <div className="text-[10px] text-blue-700 font-medium">Bank Reconciliation & Anomaly Detection</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold">
                      ACTIVE
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-blue-200/60 text-xs text-slate-700 font-mono leading-relaxed">
                    <span className="text-blue-600 font-bold">&gt;</span> Automated reconciliation matched <span className="font-bold text-slate-900">142 customer payments</span> ($485,200). 100% matched with general ledger accounts with zero manual adjustments.
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                    <span>Integration: Dynamics 365 Cloud v25</span>
                    <span className="text-emerald-600 font-semibold">Audit Status: Verified</span>
                  </div>
                </div>

                {/* Direct Consultation Trigger Shortcuts */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Business Central Action Blueprints:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenChat("Tell me the exact step-by-step roadmap to upgrade from Dynamics NAV to Business Central SaaS.")}
                      className="py-2.5 px-3 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200/70 hover:border-blue-300 transition text-center truncate cursor-pointer"
                    >
                      NAV to BC Roadmap
                    </button>
                    <button
                      onClick={() => onOpenChat("How does Business Central handle Indian GST, e-Invoicing, and TDS automatically?")}
                      className="py-2.5 px-3 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200/70 hover:border-blue-300 transition text-center truncate cursor-pointer"
                    >
                      India GST Architecture
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Badges */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-5 bg-white border border-slate-200 shadow-lg rounded-2xl p-3 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-extrabold text-slate-900">100+ BC Deployments</div>
                <div className="text-[10px] text-blue-600 font-semibold">15+ Years NAV/BC Mastery</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-5 -right-5 bg-white border border-slate-200 shadow-lg rounded-2xl p-3 flex items-center gap-3 hidden sm:flex"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-extrabold text-slate-900">100% Go-Live Success</div>
                <div className="text-[10px] text-emerald-600 font-semibold">Zero Unplanned Downtime</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
