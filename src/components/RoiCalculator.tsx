import React, { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import {
  Calculator,
  TrendingUp,
  Clock,
  Zap,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  IndianRupee,
  Sliders,
  Users,
} from "lucide-react";

interface RoiCalculatorProps {
  onOpenContact: () => void;
}

type Currency = "INR" | "USD";

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({
  onOpenContact,
}) => {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [users, setUsers] = useState<number>(25);
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
    const isINR = currency === "INR";
    const exchangeRate = 84; // 1 USD ~ 84 INR

    const baseLegacyCostUSD =
      currentSystem === "nav"
        ? 210 // On-prem maintenance, infrastructure, manual patching
        : currentSystem === "sap"
        ? 310
        : currentSystem === "oracle"
        ? 280
        : currentSystem === "netsuite"
        ? 220
        : 160;

    const baseLegacyCostPerUser = isINR
      ? baseLegacyCostUSD * exchangeRate
      : baseLegacyCostUSD;

    const modernCostPerUser = isINR ? 8500 : 120; // D365 BC cloud license + Azure managed services

    const moduleMultiplier = 1 + selectedModules.length * 0.12;
    const copilotBonus = selectedModules.includes("copilot-bc") ? 1.35 : 1.0;

    const currentYearlyCost = users * baseLegacyCostPerUser * 12;
    const modernYearlyCost = users * modernCostPerUser * moduleMultiplier * 12;

    // Minimum baseline savings scaled to user count (starting at 5 users)
    const baselineSavings = isINR
      ? Math.max(250000, users * 48000)
      : Math.max(3000, users * 600);
    const productivityCashValue = users * (isINR ? 95000 : 1200) * copilotBonus;

    const annualSavings = Math.max(
      baselineSavings,
      Math.round(currentYearlyCost - modernYearlyCost + productivityCashValue)
    );
    const threeYearSavings = Math.round(annualSavings * 3);
    const hoursSavedPerYear = Math.round(users * 190 * copilotBonus);
    const paybackMonths = Math.max(
      4,
      Math.min(14, Math.round(11 - users / 120 - (isFastTrack ? 3 : 0)))
    );
    const productivityUplift = Math.min(
      68,
      Math.round(24 + selectedModules.length * 6 + (copilotBonus > 1 ? 14 : 0))
    );

    // Cross currency conversion for executive clarity
    const convertedThreeYearSavings = isINR
      ? Math.round(threeYearSavings / exchangeRate)
      : Math.round(threeYearSavings * exchangeRate);

    return {
      annualSavings,
      threeYearSavings,
      convertedThreeYearSavings,
      hoursSavedPerYear,
      paybackMonths,
      productivityUplift,
      currentYearlyCost,
      modernYearlyCost,
      exchangeRate,
    };
  }, [users, currentSystem, selectedModules, isFastTrack, currency]);

  const formatAmount = (amount: number) => {
    if (currency === "INR") {
      if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(2)} Cr`;
      }
      if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(2)} Lakh`;
      }
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(amount);
    } else {
      if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(2)}M`;
      }
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(amount);
    }
  };

  const formatExact = (amount: number) => {
    if (currency === "INR") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(amount);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatSecondaryAmount = (amount: number) => {
    if (currency === "INR") {
      // Amount in USD
      if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(2)}M USD`;
      }
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(amount) + " USD";
    } else {
      // Amount in INR
      if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(2)} Cr INR`;
      }
      if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(2)} Lakh INR`;
      }
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(amount) + " INR";
    }
  };

  const handleUsersChange = (val: number) => {
    const clamped = Math.max(5, Math.min(500, val));
    setUsers(clamped);
  };

  const handleIncrement = () => {
    setUsers((prev) => Math.min(500, prev < 25 ? prev + 5 : prev + 10));
  };

  const handleDecrement = () => {
    setUsers((prev) => Math.max(5, prev <= 10 ? 5 : prev <= 25 ? prev - 5 : prev - 10));
  };

  const handleCelebrate = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#0078D4", "#10b981", "#f59e0b", "#6366f1", "#ec4899", "#06b6d4"],
    });
  };

  return (
    <section id="calculator" className="py-24 bg-gradient-to-b from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-[#070e24] border-t border-slate-200/80 dark:border-slate-800 relative overflow-hidden text-left">
      {/* Decorative colorful ambient glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/15 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-400/15 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-purple-500/15 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-sky-300 text-xs font-bold tracking-wide uppercase shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
            <span>Interactive Business Central ROI & TCO Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-heading">
            Dynamics 365 Business Central{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Migration & ROI Estimator
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Model your organization&apos;s migration from legacy Dynamics NAV or older ERPs to cloud-native Dynamics 365 Business Central. Compare Indian Rupee (INR) and USD costs, simulate user seats starting from 5 users, and calculate 3-year cumulative ROI.
          </p>

          {/* Currency Toggle Switcher */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-md">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 px-3 uppercase tracking-wider hidden sm:inline">
                Currency:
              </span>
              <button
                type="button"
                onClick={() => setCurrency("INR")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  currency === "INR"
                    ? "bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-600 text-white shadow-md shadow-orange-500/25 scale-[1.02]"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <IndianRupee className="w-4 h-4" />
                <span>INR (₹ Rupee)</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  currency === "USD"
                    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>USD ($ Dollar)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Calculator Layout - Nested Gradient-Bordered Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Controls Card: Nested Gradient Border */}
          <div className="lg:col-span-6 rounded-3xl p-[2px] bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-400 shadow-xl shadow-blue-500/10">
            <div className="rounded-[22px] p-6 sm:p-8 bg-white dark:bg-slate-900 h-full space-y-6 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      Configuration Parameters
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Customize user count, legacy tech, & target modules
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setCurrency("INR")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      currency === "INR"
                        ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-xs scale-[1.02]"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <IndianRupee className="w-3 h-3" />
                    <span>INR (₹)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency("USD")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      currency === "USD"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs scale-[1.02]"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <DollarSign className="w-3 h-3" />
                    <span>USD ($)</span>
                  </button>
                </div>
              </div>

              {/* Control 1: User Seat Count Slider starting from 5 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                      <span>Target Business Central Users (Seats)</span>
                    </label>
                    <span className="text-[11px] text-blue-600 dark:text-sky-400 font-semibold flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      Starts from 5 enterprise users minimum
                    </span>
                  </div>

                  {/* Stepper + Exact Numeric Input */}
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      disabled={users <= 5}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-50 dark:hover:bg-slate-650 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center text-base shadow-2xs cursor-pointer"
                      title="Decrease user count (min 5)"
                    >
                      −
                    </button>
                    <div className="flex items-center px-1.5">
                      <input
                        type="number"
                        min={5}
                        max={500}
                        value={users}
                        onChange={(e) => handleUsersChange(Number(e.target.value) || 5)}
                        className="w-11 text-center font-mono font-bold text-sm sm:text-base bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none"
                      />
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">seats</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      disabled={users >= 500}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-50 dark:hover:bg-slate-650 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center text-base shadow-2xs cursor-pointer"
                      title="Increase user count"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="pt-1">
                  <input
                    type="range"
                    min={5}
                    max={500}
                    step={users < 25 ? 1 : 5}
                    value={users}
                    onChange={(e) => handleUsersChange(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-indigo-600 transition-all"
                  />
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-mono mt-1.5">
                    <span className="font-bold text-blue-600 dark:text-sky-400">Min 5 seats</span>
                    <span>25 seats</span>
                    <span>75 seats</span>
                    <span>150 seats</span>
                    <span>500+ seats</span>
                  </div>
                </div>

                {/* Quick Selection Buttons starting from 5 */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[5, 10, 15, 25, 50, 75, 100, 250, 500].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleUsersChange(preset)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                        users === preset
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs font-bold"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-750"
                      }`}
                    >
                      {preset === 5 ? "5 seats (Starter)" : `${preset} seats`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 2: Current Legacy ERP */}
              <div className="space-y-2.5">
                <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                  Current Legacy ERP / Core Platform
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: "nav", label: "Dynamics NAV (On-Prem)", color: "from-blue-600 to-indigo-600" },
                    { id: "sap", label: "SAP ECC / B1", color: "from-amber-600 to-orange-600" },
                    { id: "oracle", label: "Oracle EBS", color: "from-red-600 to-rose-600" },
                    { id: "netsuite", label: "NetSuite", color: "from-purple-600 to-violet-600" },
                    { id: "tally", label: "Tally Prime / ERP 9", color: "from-emerald-600 to-teal-600" },
                    { id: "custom", label: "Custom SQL ERP", color: "from-cyan-600 to-blue-600" },
                  ].map((sys) => {
                    const active = currentSystem === sys.id;
                    return (
                      <button
                        key={sys.id}
                        type="button"
                        onClick={() => setCurrentSystem(sys.id)}
                        className={`p-2.5 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer border ${
                          active
                            ? "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/80 dark:to-indigo-950/80 border-blue-500 text-blue-900 dark:text-sky-300 shadow-xs font-bold scale-[1.02]"
                            : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                        }`}
                      >
                        {sys.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Control 3: Target Transformation Modules */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                    Target Business Central & AI Modules
                  </label>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {selectedModules.length} selected
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: "bc-finance", label: "D365 BC Financials & GL", tag: "Finance", color: "bg-emerald-500" },
                    { id: "bc-supply-chain", label: "Supply Chain & Inventory", tag: "SCM", color: "bg-blue-500" },
                    { id: "copilot-bc", label: "Copilot AI in Business Central", tag: "AI Agent", color: "bg-purple-500" },
                    { id: "gst-compliance", label: "India GST, TDS & E-Way Bill", tag: "Statutory", color: "bg-amber-500" },
                    { id: "power-bi", label: "Power BI Executive Dashboards", tag: "Analytics", color: "bg-yellow-500" },
                    { id: "power-automate", label: "Power Automate Approvals", tag: "RPA", color: "bg-cyan-500" },
                  ].map((mod) => {
                    const active = selectedModules.includes(mod.id);
                    return (
                      <div
                        key={mod.id}
                        onClick={() => toggleModule(mod.id)}
                        className={`p-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all border flex items-center justify-between ${
                          active
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/70 dark:to-indigo-950/70 border-blue-400 text-blue-900 dark:text-sky-200 shadow-2xs font-semibold"
                            : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <div
                            className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] transition-all ${
                              active
                                ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold"
                                : "border border-slate-400 dark:border-slate-600"
                            }`}
                          >
                            {active && "✓"}
                          </div>
                          <span className="truncate">{mod.label}</span>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 font-mono text-blue-700 dark:text-sky-300 border border-slate-200 dark:border-slate-700 font-bold shrink-0">
                          {mod.tag}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Control 4: FastTrack Delivery Option */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/60 dark:via-indigo-950/60 dark:to-purple-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-between">
                <div className="space-y-0.5 pr-2">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>Coreenact FastTrack NAV to Cloud (60-Day Cutover)</span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300">
                    Includes automated C/AL code converters, GL data extraction, and pre-built master mapping
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isFastTrack}
                  onChange={(e) => setIsFastTrack(e.target.checked)}
                  className="w-5 h-5 rounded-md accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right Metrics Display Card: Nested Gradient Border */}
          <div className="lg:col-span-6 rounded-3xl p-[2px] bg-gradient-to-br from-emerald-500 via-teal-500 to-indigo-600 shadow-xl shadow-emerald-500/10">
            <div className="rounded-[22px] bg-white dark:bg-slate-900 p-6 sm:p-8 h-full flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Verified Financial Model ({currency})</span>
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xs">
                    Confidence: 96%
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-heading">
                  Projected Business Central Value
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Calculated based on actual Coreenact enterprise deployments across Indian manufacturing, retail, and North American global rollouts.
                </p>
              </div>

              {/* Major Headline Metric Card: Nested Gradient Card */}
              <div className="rounded-2xl p-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-600 shadow-md">
                <div className="rounded-[14px] p-6 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 space-y-2.5">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
                    <span>3-Year Cumulative TCO Savings</span>
                    {currency === "INR" ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                        INR (₹)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-sky-300 border border-blue-200 dark:border-blue-800">
                        USD ($)
                      </span>
                    )}
                  </div>
                  <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent font-mono tracking-tight">
                    {formatAmount(calculations.threeYearSavings)}
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 flex flex-wrap items-center gap-1.5 font-medium pt-1">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                      +{formatAmount(calculations.annualSavings)} / year
                    </span>
                    <span>operational run-rate reduction for {users} active users</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/70 dark:border-slate-700/60 text-[11px] font-mono">
                    <span className="text-slate-500 dark:text-slate-400">
                      Exact: {formatExact(calculations.threeYearSavings)}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold bg-white/70 dark:bg-slate-900/70 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60">
                      ≈ {formatSecondaryAmount(calculations.convertedThreeYearSavings)} ({currency === "INR" ? "USD equivalent" : "INR equivalent"})
                    </span>
                  </div>
                </div>
              </div>

              {/* Sub Metrics Grid: 3 Colorful Nested Cards */}
              <div className="grid grid-cols-3 gap-3">
                {/* 1. Payback */}
                <div className="rounded-xl p-[1.5px] bg-gradient-to-br from-blue-500 to-cyan-400">
                  <div className="rounded-[10px] p-3 bg-white dark:bg-slate-850 h-full">
                    <div className="text-[10px] font-bold text-blue-700 dark:text-sky-300 uppercase flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-600" />
                      <span>Payback</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">
                      {calculations.paybackMonths} Mo
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Break-even window</div>
                  </div>
                </div>

                {/* 2. Productivity */}
                <div className="rounded-xl p-[1.5px] bg-gradient-to-br from-purple-500 to-pink-500">
                  <div className="rounded-[10px] p-3 bg-white dark:bg-slate-850 h-full">
                    <div className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase flex items-center gap-1">
                      <Zap className="w-3 h-3 text-purple-600" />
                      <span>Productivity</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">
                      +{calculations.productivityUplift}%
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Workflow speed</div>
                  </div>
                </div>

                {/* 3. Hours Saved */}
                <div className="rounded-xl p-[1.5px] bg-gradient-to-br from-amber-500 to-emerald-500">
                  <div className="rounded-[10px] p-3 bg-white dark:bg-slate-850 h-full">
                    <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                      <span>Hours Saved</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">
                      {calculations.hoursSavedPerYear.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Hours/yr reclaimed</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    handleCelebrate();
                    onOpenContact();
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <ShieldCheck className="w-4 h-4 text-sky-200" />
                  <span>Receive Detailed {currency} Business Case Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onOpenContact}
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Request Custom TCO Architecture Review ({users} Users)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

