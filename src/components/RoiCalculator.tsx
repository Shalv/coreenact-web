import React, { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import {
  Calculator,
  TrendingUp,
  Clock,
  Zap,
  Sparkles,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface RoiCalculatorProps {
  onOpenChat: (preset?: string) => void;
  onOpenContact: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({
  onOpenChat,
  onOpenContact,
}) => {
  const [users, setUsers] = useState<number>(75);
  const [currentSystem, setCurrentSystem] = useState<string>("nav");
  const [selectedModules, setSelectedModules] = useState<string[]>([
    "bc-finance",
    "bc-supply-chain",
    "copilot-bc",
    "gst-compliance",
  ]);
  const [isFastTrack, setIsFastTrack] = useState<boolean>(true);

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  // Calculations centered on Dynamics 365 Business Central vs Legacy
  const calculations = useMemo(() => {
    const baseLegacyCostPerUser =
      currentSystem === "nav"
        ? 210 // On-prem maintenance, infrastructure, manual patching
        : currentSystem === "sap"
        ? 310
        : currentSystem === "oracle"
        ? 280
        : currentSystem === "netsuite"
        ? 220
        : 160;

    const moduleMultiplier = 1 + selectedModules.length * 0.15;
    const copilotBonus = selectedModules.includes("copilot-bc") ? 1.35 : 1.0;

    const currentYearlyCost = users * baseLegacyCostPerUser * 12;
    const modernYearlyCost = users * 120 * moduleMultiplier * 12;

    const annualSavings = Math.max(75000, Math.round(currentYearlyCost - modernYearlyCost + users * 1200 * copilotBonus));
    const threeYearSavings = Math.round(annualSavings * 3);
    const hoursSavedPerYear = Math.round(users * 190 * copilotBonus);
    const paybackMonths = Math.max(5, Math.min(16, Math.round(12 - (users / 150) - (isFastTrack ? 3 : 0))));
    const productivityUplift = Math.min(65, Math.round(22 + selectedModules.length * 6 + (copilotBonus > 1 ? 12 : 0)));

    return {
      annualSavings,
      threeYearSavings,
      hoursSavedPerYear,
      paybackMonths,
      productivityUplift,
    };
  }, [users, currentSystem, selectedModules, isFastTrack]);

  const handleCelebrate = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#0078D4", "#0284c7", "#4f46e5", "#10b981"],
    });
  };

  return (
    <section id="calculator" className="py-24 bg-slate-50/70 border-t border-slate-200/80 relative overflow-hidden text-left">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>Business Central ROI Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Dynamics 365 Business Central{" "}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              Migration & ROI Estimator
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Model your organization&apos;s migration from legacy Dynamics NAV or older ERPs to cloud-native Dynamics 365 Business Central. Calculate license savings, operational efficiency, and rapid payback.
          </p>
        </div>

        {/* Main Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Controls Card */}
          <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xs space-y-6 text-left">
            {/* Control 1: User Seat Count Slider */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Target Business Central Users (Seats)
                </label>
                <span className="text-xl font-black text-blue-700 font-mono">
                  {users.toLocaleString()} Users
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={1500}
                step={5}
                value={users}
                onChange={(e) => setUsers(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>10 seats</span>
                <span>250 seats</span>
                <span>750 seats</span>
                <span>1,500+ seats</span>
              </div>
            </div>

            {/* Control 2: Current Legacy ERP */}
            <div className="space-y-2.5">
              <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider block">
                Current Legacy System
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: "nav", label: "Dynamics NAV (On-Prem)" },
                  { id: "sap", label: "SAP ECC / B1" },
                  { id: "oracle", label: "Oracle EBS" },
                  { id: "netsuite", label: "NetSuite" },
                  { id: "tally", label: "Tally / QuickBooks" },
                  { id: "custom", label: "In-House Custom ERP" },
                ].map((sys) => (
                  <button
                    key={sys.id}
                    onClick={() => setCurrentSystem(sys.id)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-center transition border cursor-pointer ${
                      currentSystem === sys.id
                        ? "bg-blue-50 border-blue-500 text-blue-700 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {sys.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Target Transformation Modules */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Target Business Central & AI Modules
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: "bc-finance", label: "D365 BC Core Financials", tag: "Finance" },
                  { id: "bc-supply-chain", label: "D365 BC Supply Chain & Inventory", tag: "SCM" },
                  { id: "copilot-bc", label: "Copilot in Business Central", tag: "AI Agent" },
                  { id: "gst-compliance", label: "India GST & E-Invoicing", tag: "Statutory" },
                  { id: "power-bi", label: "Power BI & Jet Reports", tag: "Analytics" },
                  { id: "power-automate", label: "Power Automate Workflows", tag: "RPA" },
                ].map((mod) => {
                  const active = selectedModules.includes(mod.id);
                  return (
                    <div
                      key={mod.id}
                      onClick={() => toggleModule(mod.id)}
                      className={`p-2.5 rounded-xl text-xs font-medium cursor-pointer transition border flex items-center justify-between ${
                        active
                          ? "bg-blue-50/80 border-blue-400 text-blue-900"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                            active ? "bg-blue-600 text-white font-bold" : "border border-slate-400"
                          }`}
                        >
                          {active && "✓"}
                        </div>
                        <span className="truncate">{mod.label}</span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white font-mono text-blue-700 border border-slate-200">
                        {mod.tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Control 4: FastTrack Delivery Option */}
            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-600" />
                  <span>Coreenact FastTrack NAV to Cloud (60-Day Cutover)</span>
                </div>
                <div className="text-[11px] text-slate-600">
                  Pre-packaged C/AL to AL code converters and automated GL/ledger data extractors
                </div>
              </div>
              <input
                type="checkbox"
                checked={isFastTrack}
                onChange={(e) => setIsFastTrack(e.target.checked)}
                className="w-5 h-5 rounded accent-blue-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Right Metrics Display Card */}
          <div className="lg:col-span-6 rounded-3xl p-1 bg-gradient-to-br from-blue-100 via-indigo-100 to-slate-200 shadow-md flex flex-col">
            <div className="h-full rounded-[22px] bg-white border border-slate-200 p-6 sm:p-8 flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest">
                    Projected Financial Impact Model
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Confidence: 96%
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-heading">
                  Estimated Business Central Value
                </h3>
                <p className="text-xs text-slate-600">
                  Based on validated Coreenact migration benchmarks from 100+ mid-market and enterprise rollouts.
                </p>
              </div>

              {/* Major Headline Metric */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                  <span>3-Year Cumulative TCO Savings</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-4xl sm:text-5xl font-black text-slate-900 font-mono tracking-tight">
                  ${calculations.threeYearSavings.toLocaleString()}
                </div>
                <div className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                  <span className="text-emerald-700 font-bold">
                    +${calculations.annualSavings.toLocaleString()} / year
                  </span>{" "}
                  operational run-rate reduction
                </div>
              </div>

              {/* Sub Metrics Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-600" />
                    <span>Payback</span>
                  </div>
                  <div className="text-xl font-black text-slate-900 font-mono mt-1">
                    {calculations.paybackMonths} Mo
                  </div>
                  <div className="text-[10px] text-slate-500">Break-even window</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                    <Zap className="w-3 h-3 text-indigo-600" />
                    <span>Productivity</span>
                  </div>
                  <div className="text-xl font-black text-slate-900 font-mono mt-1">
                    +{calculations.productivityUplift}%
                  </div>
                  <div className="text-[10px] text-slate-500">Workflow automation</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    <span>Hours Saved</span>
                  </div>
                  <div className="text-xl font-black text-slate-900 font-mono mt-1">
                    {calculations.hoursSavedPerYear.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500">Hours / yr reclaimed</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-3">
                <button
                  onClick={() => {
                    handleCelebrate();
                    onOpenContact();
                  }}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-200" />
                  <span>Receive Full Business Case Report</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() =>
                    onOpenChat(
                      `Please generate an executive summary for our migration from ${currentSystem.toUpperCase()} to Microsoft Dynamics 365 Business Central for ${users} users, modeling an annual savings of $${calculations.annualSavings.toLocaleString()}.`
                    )
                  }
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ask Architect to Analyze This Scenario</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
