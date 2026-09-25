import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  TrendingUp,
  Target,
  FileText,
  Share2,
  Cpu,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  BarChart3,
  Zap,
  Globe2,
  Award,
  Layers,
  DollarSign,
  IndianRupee,
  ChevronRight,
  ShieldCheck,
  Check,
  Calendar,
  ExternalLink,
} from "lucide-react";
import {
  DIGITAL_MARKETING_SERVICES,
  MARKETING_CASE_RESULTS,
  MARKETING_TECH_STACK,
  MARKETING_SPRINT_STEPS,
  MarketingService,
} from "../data/digitalMarketingData";
import { MicrosoftAppBadge, MicrosoftLogo } from "./icons/MicrosoftIcons";

interface DigitalMarketingSectionProps {
  onOpenContact: (interest?: string) => void;
  isStandalonePage?: boolean;
  onBackHome?: () => void;
  onBack?: () => void;
}

export const DigitalMarketingSection: React.FC<DigitalMarketingSectionProps> = ({
  onOpenContact,
  isStandalonePage = false,
  onBackHome,
  onBack,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("seo-geo");
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [budgetInr, setBudgetInr] = useState<number>(150000); // 1.5 Lakh INR
  const [budgetUsd, setBudgetUsd] = useState<number>(3000); // $3000 USD
  const [selectedIndustry, setSelectedIndustry] = useState<string>("b2b_saas");
  const [selectedChannels, setSelectedChannels] = useState<string[]>([
    "google_ads",
    "seo",
    "linkedin",
  ]);

  const selectedService = useMemo(() => {
    return (
      DIGITAL_MARKETING_SERVICES.find((s) => s.id === selectedServiceId) ||
      DIGITAL_MARKETING_SERVICES[0]
    );
  }, [selectedServiceId]);

  const toggleChannel = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };

  // ROI Calculator Math
  const marketingProjections = useMemo(() => {
    const budget = currency === "INR" ? budgetInr : budgetUsd;

    // Industry multiplier benchmarks
    const industryBenchmarks: Record<
      string,
      { avgCplInr: number; avgCplUsd: number; dealValueInr: number; dealValueUsd: number; closeRate: number }
    > = {
      b2b_saas: {
        avgCplInr: 4200,
        avgCplUsd: 65,
        dealValueInr: 350000,
        dealValueUsd: 5500,
        closeRate: 0.12,
      },
      manufacturing: {
        avgCplInr: 5800,
        avgCplUsd: 85,
        dealValueInr: 750000,
        dealValueUsd: 12000,
        closeRate: 0.1,
      },
      professional_services: {
        avgCplInr: 3600,
        avgCplUsd: 55,
        dealValueInr: 280000,
        dealValueUsd: 4500,
        closeRate: 0.15,
      },
      healthcare: {
        avgCplInr: 3200,
        avgCplUsd: 48,
        dealValueInr: 220000,
        dealValueUsd: 3800,
        closeRate: 0.14,
      },
      edtech: {
        avgCplInr: 2400,
        avgCplUsd: 38,
        dealValueInr: 150000,
        dealValueUsd: 2500,
        closeRate: 0.16,
      },
    };

    const currentBench = industryBenchmarks[selectedIndustry] || industryBenchmarks.b2b_saas;
    const baseCpl = currency === "INR" ? currentBench.avgCplInr : currentBench.avgCplUsd;
    const dealValue = currency === "INR" ? currentBench.dealValueInr : currentBench.dealValueUsd;

    // Channel efficiency discount
    const channelBonus = Math.max(0.85, 1 - (selectedChannels.length - 1) * 0.05);
    const effectiveCpl = Math.round(baseCpl * channelBonus);

    const estimatedLeads = Math.max(5, Math.round(budget / effectiveCpl));
    const estimatedClosedDeals = Math.max(1, Math.round(estimatedLeads * currentBench.closeRate));
    const estimatedPipelineValue = estimatedLeads * dealValue;
    const estimatedNewRevenue = estimatedClosedDeals * dealValue;
    const estimatedRoi = Number((estimatedNewRevenue / budget).toFixed(1));

    return {
      effectiveCpl,
      estimatedLeads,
      estimatedClosedDeals,
      estimatedPipelineValue,
      estimatedNewRevenue,
      estimatedRoi: Math.max(2.5, estimatedRoi),
    };
  }, [currency, budgetInr, budgetUsd, selectedIndustry, selectedChannels]);

  const formatCurrency = (val: number) => {
    if (currency === "INR") {
      if (val >= 10000000) {
        return `₹${(val / 10000000).toFixed(2)} Cr`;
      }
      if (val >= 100000) {
        return `₹${(val / 100000).toFixed(2)} Lakh`;
      }
      return `₹${val.toLocaleString("en-IN")}`;
    } else {
      if (val >= 1000000) {
        return `$${(val / 1000000).toFixed(2)}M`;
      }
      if (val >= 1000) {
        return `$${(val / 1000).toFixed(0)}k`;
      }
      return `$${val.toLocaleString("en-US")}`;
    }
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Search":
        return <Search className="w-5 h-5" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5" />;
      case "Target":
        return <Target className="w-5 h-5" />;
      case "FileText":
        return <FileText className="w-5 h-5" />;
      case "Share2":
        return <Share2 className="w-5 h-5" />;
      case "Cpu":
        return <Cpu className="w-5 h-5" />;
      default:
        return <TrendingUp className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="digital-marketing"
      className="py-16 sm:py-24 bg-white dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 transition-colors duration-300"
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb / Back Link if Standalone Page */}
        {isStandalonePage && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            {(onBack || onBackHome) && (
              <button
                onClick={onBack || onBackHome}
                className="hover:text-blue-600 dark:hover:text-sky-400 font-medium cursor-pointer transition flex items-center gap-1.5"
                title="Go back to previous page"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-slate-100 font-semibold">
              Digital Marketing & Growth Services
            </span>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-sky-300 text-xs font-mono font-bold tracking-wide shadow-2xs">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
            <span>COREENACT DIGITAL GROWTH LAB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100 font-heading">
            Full-Funnel Digital Marketing & B2B Revenue Acceleration
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Dominate search rankings, acquire high-intent enterprise buyers, and bridge your digital campaigns directly to Microsoft Dynamics 365 CRM & ERP pipelines with closed-loop attribution.
          </p>

          {/* Quick Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Google & Meta Certified
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
              B2B Account-Based Marketing (ABM)
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              Dynamics 365 Customer Insights & Automation
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Transparent ROAS & ROI Metrics
            </span>
          </div>
        </div>

        {/* Core Services Interactive Navigator */}
        <div className="space-y-8">
          {/* Horizontal Filter Tabs */}
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {DIGITAL_MARKETING_SERVICES.map((srv) => {
              const isSelected = srv.id === selectedServiceId;
              return (
                <button
                  key={srv.id}
                  onClick={() => setSelectedServiceId(srv.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2 cursor-pointer border ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.02]"
                      : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {getServiceIcon(srv.icon)}
                  <span>{srv.title.split("(")[0].trim()}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {srv.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Service Detailed Showcase: Nested Gradient Border Card */}
          <div className="rounded-3xl p-[2px] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-xl shadow-blue-500/10">
            <div className="rounded-[22px] bg-white dark:bg-slate-900 p-6 sm:p-8 lg:p-10 text-left">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Visual Asset & KPI Badge */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-800 h-64 sm:h-80 bg-slate-900 group">
                    <img
                      src={selectedService.image}
                      alt={selectedService.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                    
                    {/* Floating KPI Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <MicrosoftAppBadge app="customer-insights" size="sm" />
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500 text-white shadow-xs">
                        Verified Impact
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 dark:border-slate-800/80 shadow-md">
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {selectedService.kpis.label}
                      </div>
                      <div className="text-2xl font-black text-blue-600 dark:text-sky-400 font-mono">
                        {selectedService.kpis.metric}
                      </div>
                    </div>
                  </div>

                  {/* Tool Stack Tags */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Production Tool Stack & Platforms
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedService.tools.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-2xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: In-Depth Features & Deliverables */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-sky-400 uppercase tracking-wider">
                      {getServiceIcon(selectedService.icon)}
                      <span>Enterprise Capability</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-heading">
                      {selectedService.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {selectedService.subtitle}
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                      {selectedService.description}
                    </p>
                  </div>

                  {/* 2-Column Specs: Key Features & Deliverables */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Core Capabilities */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span>Core Capabilities</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                        {selectedService.keyFeatures.map((kf, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                            <span>{kf}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables Checklist */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-emerald-500" />
                        <span>Client Deliverables</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                        {selectedService.deliverables.map((deliv, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onOpenContact(`Digital Marketing: ${selectedService.title}`)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Request Proposal for {selectedService.title.split("(")[0].trim()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onOpenContact("Free SEO & Digital Marketing Audit")}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-200 font-semibold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                    >
                      Book Free 30-Min Growth Audit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6-Service Overview Grid (So all services are fully visible simultaneously) */}
        <div className="space-y-6">
          <div className="text-left space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 font-heading">
              Complete Digital Marketing Services Spectrum
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Explore every component of our integrated B2B digital acquisition and retention engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIGITAL_MARKETING_SERVICES.map((srv) => (
              <div
                key={srv.id}
                onClick={() => {
                  setSelectedServiceId(srv.id);
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
                className="rounded-2xl p-[1.5px] bg-gradient-to-br from-slate-200 via-blue-200/50 to-indigo-200/50 dark:from-slate-800 dark:via-blue-900/30 dark:to-indigo-950 hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 group cursor-pointer shadow-xs hover:shadow-lg text-left flex flex-col justify-between"
              >
                <div className="rounded-[14px] bg-white dark:bg-slate-900 p-5 flex flex-col h-full justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-sky-400 flex items-center justify-center border border-blue-200/60 dark:border-blue-800/60 group-hover:scale-105 transition-transform">
                        {getServiceIcon(srv.icon)}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {srv.badge}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition">
                        {srv.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mt-1.5 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        Key KPI Benchmark:
                      </div>
                      <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        {srv.kpis.metric} {srv.kpis.label.toLowerCase()}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-sky-400">
                    <span>Explore Full Scope</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive B2B Marketing ROI & Lead Estimator */}
        <div className="rounded-3xl p-[2px] bg-gradient-to-br from-emerald-500 via-teal-500 to-indigo-600 shadow-xl shadow-emerald-500/10">
          <div className="rounded-[22px] bg-white dark:bg-slate-900 p-6 sm:p-8 lg:p-10 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Interactive Inputs */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4" />
                      <span>Live Revenue Forecasting</span>
                    </span>
                    {/* Currency Selector */}
                    <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <button
                        type="button"
                        onClick={() => setCurrency("INR")}
                        className={`px-2.5 py-0.5 rounded text-xs font-bold cursor-pointer transition ${
                          currency === "INR"
                            ? "bg-orange-500 text-white shadow-2xs"
                            : "text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        INR (₹)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrency("USD")}
                        className={`px-2.5 py-0.5 rounded text-xs font-bold cursor-pointer transition ${
                          currency === "USD"
                            ? "bg-blue-600 text-white shadow-2xs"
                            : "text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        USD ($)
                      </button>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-heading">
                    Digital Marketing ROI & Lead Estimator
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Model your projected monthly inbound qualified leads, target acquisition costs, and estimated pipeline revenue.
                  </p>
                </div>

                {/* Input 1: Monthly Budget Slider */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Monthly Digital Marketing Budget
                    </label>
                    <span className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-base border border-emerald-200 dark:border-emerald-800">
                      {currency === "INR" ? formatCurrency(budgetInr) : formatCurrency(budgetUsd)} / mo
                    </span>
                  </div>
                  {currency === "INR" ? (
                    <input
                      type="range"
                      min={50000}
                      max={2000000}
                      step={25000}
                      value={budgetInr}
                      onChange={(e) => setBudgetInr(Number(e.target.value))}
                      className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                  ) : (
                    <input
                      type="range"
                      min={1000}
                      max={35000}
                      step={500}
                      value={budgetUsd}
                      onChange={(e) => setBudgetUsd(Number(e.target.value))}
                      className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                  )}
                  <div className="flex justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span>{currency === "INR" ? "₹50,000/mo" : "$1,000/mo"}</span>
                    <span>{currency === "INR" ? "₹5 Lakh/mo" : "$10,000/mo"}</span>
                    <span>{currency === "INR" ? "₹20 Lakh+/mo" : "$35,000+/mo"}</span>
                  </div>
                </div>

                {/* Input 2: Target Industry Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    Your Industry Vertical
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: "b2b_saas", label: "B2B SaaS / Tech" },
                      { id: "manufacturing", label: "Industrial / Mfg" },
                      { id: "professional_services", label: "Pro Services" },
                      { id: "healthcare", label: "Healthcare / Life Sci" },
                      { id: "edtech", label: "Education & EdTech" },
                    ].map((ind) => (
                      <button
                        key={ind.id}
                        type="button"
                        onClick={() => setSelectedIndustry(ind.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-center transition cursor-pointer border ${
                          selectedIndustry === ind.id
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                            : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {ind.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input 3: Channel Focus Multi-Select */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    Target Acquisition Channels (Multi-Select)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "google_ads", label: "Google Ads (Search & PMax)" },
                      { id: "seo", label: "SEO & AI Generative Search" },
                      { id: "linkedin", label: "LinkedIn B2B ABM" },
                      { id: "content", label: "Thought Leadership & Email" },
                    ].map((ch) => {
                      const isActive = selectedChannels.includes(ch.id);
                      return (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => toggleChannel(ch.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer border flex items-center gap-1.5 ${
                            isActive
                              ? "bg-blue-600 text-white border-blue-600 shadow-2xs font-semibold"
                              : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          <Check className={`w-3.5 h-3.5 ${isActive ? "opacity-100" : "opacity-0"}`} />
                          <span>{ch.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Calculated Projections Display */}
              <div className="lg:col-span-6 rounded-2xl p-[2px] bg-gradient-to-br from-emerald-500 to-teal-600">
                <div className="rounded-[14px] bg-white dark:bg-slate-850 p-6 sm:p-8 space-y-6">
                  <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Projected Monthly Outcomes</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                      Confidence 94%
                    </span>
                  </div>

                  {/* Major Headline Metric */}
                  <div className="space-y-1">
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Estimated Monthly Pipeline Value
                    </div>
                    <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 font-mono tracking-tight">
                      {formatCurrency(marketingProjections.estimatedPipelineValue)}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 pt-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-bold text-emerald-700 dark:text-emerald-300">
                        {marketingProjections.estimatedRoi}x Projected Marketing ROI
                      </span>
                    </div>
                  </div>

                  {/* 3 Sub-Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-center">
                      <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                        Monthly MQLs
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">
                        ~{marketingProjections.estimatedLeads}
                      </div>
                      <div className="text-[9px] text-slate-500 dark:text-slate-400">Qualified leads</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-center">
                      <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                        Target CPL
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-sky-400 font-mono mt-1">
                        {formatCurrency(marketingProjections.effectiveCpl)}
                      </div>
                      <div className="text-[9px] text-slate-500 dark:text-slate-400">Cost per lead</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-center">
                      <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                        Est. Closed Deals
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400 font-mono mt-1">
                        {marketingProjections.estimatedClosedDeals}+
                      </div>
                      <div className="text-[9px] text-slate-500 dark:text-slate-400">Per month</div>
                    </div>
                  </div>

                  {/* Consultation CTA */}
                  <div className="pt-2">
                    <button
                      onClick={() =>
                        onOpenContact(
                          `Digital Marketing Growth Plan (${formatCurrency(
                            currency === "INR" ? budgetInr : budgetUsd
                          )}/mo budget - ${selectedIndustry})`
                        )
                      }
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Lock In This Customized Marketing Roadmap</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-2">
                      Includes 100% transparent live dashboard & no long-term lock-in contract.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 90-Day Sprint Delivery Framework */}
        <div className="space-y-8">
          <div className="text-left space-y-1 max-w-2xl">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-sky-400 uppercase tracking-wider">
              Battle-Tested Growth Architecture
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-heading">
              Our 90-Day B2B Revenue Acceleration Roadmap
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Clear milestone progression engineered to build durable organic equity while generating immediate paid revenue momentum.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MARKETING_SPRINT_STEPS.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl p-[1.5px] bg-gradient-to-b from-blue-500/30 to-slate-200 dark:to-slate-800 text-left h-full"
              >
                <div className="rounded-[14px] bg-white dark:bg-slate-900 p-6 flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-sky-400">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-sky-300 border border-blue-200 dark:border-blue-800">
                        {s.duration}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 font-heading">
                        {s.phase}
                      </h4>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                        {s.focus}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-300">
                      {s.bullets.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>Milestone Sign-Off</span>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real B2B Case Results Showcase */}
        <div className="space-y-8">
          <div className="text-left space-y-1 max-w-2xl">
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              Proven Enterprise Results
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-heading">
              How We Scale High-Growth Organizations
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Measurable outcomes from industrial manufacturers, enterprise SaaS, and healthcare organizations across India and North America.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MARKETING_CASE_RESULTS.map((cr) => (
              <div
                key={cr.id}
                className="rounded-2xl p-[1.5px] bg-gradient-to-br from-purple-500/40 via-indigo-500/20 to-blue-500/40 text-left h-full flex flex-col justify-between"
              >
                <div className="rounded-[14px] bg-white dark:bg-slate-900 p-6 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                        {cr.clientIndustry}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {cr.region}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {cr.title}
                    </h4>

                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      <div>
                        <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                          Challenge:{" "}
                        </strong>
                        {cr.challenge}
                      </div>
                      <div>
                        <strong className="text-slate-900 dark:text-slate-100 font-semibold">
                          Strategy:{" "}
                        </strong>
                        {cr.strategy}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="grid grid-cols-3 gap-2">
                      {cr.metrics.map((m, idx) => (
                        <div key={idx} className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                          <div className="text-sm sm:text-base font-black text-purple-600 dark:text-purple-400 font-mono">
                            {m.value}
                          </div>
                          <div className="text-[9px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MarTech Partners Badge Grid */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Enterprise Platforms & Certified Partner Ecosystem
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {MARKETING_TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-sky-400" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {tech.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  ({tech.badge})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Callout Banner */}
        <div className="rounded-3xl p-[2px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-xl">
          <div className="rounded-[22px] bg-white dark:bg-slate-900 p-8 sm:p-12 text-center space-y-6">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-sky-300 border border-blue-200 dark:border-blue-800 font-mono">
                ZERO-OBLIGATION TECHNICAL AUDIT
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-slate-100 font-heading">
                Ready to Accelerate Your Enterprise Growth?
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Claim a complimentary 30-minute growth diagnostic with our senior marketing architects. We'll analyze your search visibility, competitor ad strategies, and CRM funnel bottlenecks at zero cost.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onOpenContact("Free 30-Minute Digital Marketing & SEO Audit")}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Target className="w-4 h-4" />
                <span>Claim Free Digital Growth & SEO Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenContact("General Digital Marketing Consultation")}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              >
                Schedule Strategy Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
