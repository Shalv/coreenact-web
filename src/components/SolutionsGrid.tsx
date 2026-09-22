import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  Bot,
  ScanText,
  ShieldCheck,
  Headphones,
  Globe2,
  Building2,
  GraduationCap,
  FileCheck,
  Laptop,
  Cpu,
} from "lucide-react";
import { SOLUTION_PILLARS } from "../data/coreenactData";
import {
  MicrosoftLogo,
  DynamicsIcon,
  CopilotIcon,
  PowerAppsIcon,
  PowerBIIcon,
  FabricIcon,
  AzureIcon,
} from "./icons/MicrosoftIcons";
import indianIndustryOpsImg from "../assets/images/indian_industry_ops_1790050360620.jpg";
import indianLeadArchitectImg from "../assets/images/indian_lead_architect_1790050330867.jpg";

const PILLAR_BANNER_IMAGES: Record<string, string> = {
  "run-transform": indianIndustryOpsImg,
  "data-ai-insights": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
  "scale-localize": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
  "secure-govern": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
  "ai-productivity": "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=1600&q=80",
  "edcore-solution": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
};

const PILLAR_GRADIENTS: Record<string, string> = {
  "run-transform": "from-blue-600 via-indigo-600 to-cyan-500",
  "data-ai-insights": "from-purple-600 via-pink-600 to-indigo-600",
  "scale-localize": "from-emerald-500 via-teal-500 to-cyan-500",
  "secure-govern": "from-amber-500 via-orange-500 to-red-500",
  "ai-productivity": "from-cyan-500 via-blue-600 to-indigo-600",
  "edcore-solution": "from-rose-600 via-red-600 to-amber-500",
};

const SOLUTION_ITEM_IMAGES: Record<string, string> = {
  // Run & Transform
  "Dynamics 365 Business Central": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  "Dynamics 365 Finance & Operations": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
  "Dynamics 365 CRM": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
  "AI Agent in ERP": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  "AI-OCR Document Recognition": "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80",
  "Power Apps & Power Automate": "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",

  // Data, AI & Insights
  "Power BI Executive Dashboards": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  "Jet Reports for Business Central": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  "Microsoft Fabric & OneLake": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  "Data & AI Advisory": "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",

  // Scale & Localize
  "Global ERP Rollouts": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
  "India Localization & Statutory Compliance": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
  "NAV to Cloud Migration": "https://images.unsplash.com/photo-1619410283995-43d9134e7656?auto=format&fit=crop&w=800&q=80",

  // Secure & Govern
  "Security & Role Governance (RBAC)": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
  "ERP Audit & Health Check": "https://images.unsplash.com/photo-1573166364366-3f4f8b1857ea?auto=format&fit=crop&w=800&q=80",
  "24/7 Managed Services & Support": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",

  // AI & Productivity
  "Microsoft Copilot for Business Central": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
  "Custom Agentic AI Solutions": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "Digital Transformation Advisory": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",

  // EdCore
  "Student Lifecycle & Admissions": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  "Automated Fee & Financial Accounting": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
  "Academic Planning & Timetable Engine": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
  "Integrated LMS & Student Portal": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
};

/** Helper to render authentic, best-in-class icons for each solution item */
const getSolutionItemIcon = (name: string) => {
  if (name.includes("Dynamics") || name.includes("Business Central")) {
    return <DynamicsIcon className="w-3.5 h-3.5 shrink-0" />;
  }
  if (name.includes("Copilot")) {
    return <CopilotIcon className="w-3.5 h-3.5 shrink-0" />;
  }
  if (name.includes("Agent")) {
    return <Bot className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-sky-400" />;
  }
  if (name.includes("OCR")) {
    return <ScanText className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-sky-400" />;
  }
  if (name.includes("Power Apps") || name.includes("Power Automate")) {
    return <PowerAppsIcon className="w-3.5 h-3.5 shrink-0" />;
  }
  if (name.includes("Power BI")) {
    return <PowerBIIcon className="w-3.5 h-3.5 shrink-0" />;
  }
  if (name.includes("Fabric") || name.includes("OneLake")) {
    return <FabricIcon className="w-3.5 h-3.5 shrink-0" />;
  }
  if (name.includes("Azure") || name.includes("Synapse")) {
    return <AzureIcon className="w-3.5 h-3.5 shrink-0" />;
  }
  if (name.includes("Security") || name.includes("Governance")) {
    return <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-sky-400" />;
  }
  if (name.includes("Managed") || name.includes("Support") || name.includes("Audit")) {
    return <Headphones className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-sky-400" />;
  }
  if (name.includes("Global")) {
    return <Globe2 className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-sky-400" />;
  }
  if (name.includes("India") || name.includes("Localization") || name.includes("Statutory")) {
    return <Building2 className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-sky-400" />;
  }
  if (name.includes("Student") || name.includes("Admissions") || name.includes("Academic")) {
    return <GraduationCap className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-sky-400" />;
  }
  if (name.includes("Fee") || name.includes("Accounting")) {
    return <FileCheck className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-sky-400" />;
  }
  if (name.includes("LMS") || name.includes("Portal")) {
    return <Laptop className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-sky-400" />;
  }
  return <Cpu className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-sky-400" />;
};

const ITEM_TAGS: Record<string, string> = {
  "Dynamics 365 Business Central": "Cloud ERP",
  "Dynamics 365 Finance & Operations": "Enterprise Supply Chain",
  "Dynamics 365 CRM": "Customer Engagement",
  "AI Agent in ERP": "Autonomous Agents",
  "AI-OCR Document Recognition": "Deep-Learning OCR",
  "Power Apps & Power Automate": "Low-Code Apps",
  "Power BI Executive Dashboards": "Executive Telemetry",
  "Jet Reports for Business Central": "Financial Modeling",
  "Microsoft Fabric & OneLake": "Unified Lakehouse",
  "Data & AI Advisory": "Enterprise Governance",
  "Global ERP Rollouts": "Multi-Entity Core",
  "India Localization & Statutory Compliance": "NIC GST & e-Invoice",
  "NAV to Cloud Migration": "C/AL to AL Refactoring",
  "Security & Role Governance (RBAC)": "Entra ID & SoD",
  "ERP Audit & Health Check": "Architectural Diagnostics",
  "24/7 Managed Services & Support": "SLA Operations Desk",
  "Microsoft Copilot for Business Central": "Generative Copilot",
  "Custom Agentic AI Solutions": "Multi-Agent Orchestration",
  "Digital Transformation Advisory": "Executive Roadmap",
  "Student Lifecycle & Admissions": "Admissions & Registry",
  "Automated Fee & Financial Accounting": "Bank Payment Gateways",
  "Academic Planning & Timetable Engine": "Conflict-Free Engine",
  "Integrated LMS & Student Portal": "Self-Service LMS",
};

interface SolutionsGridProps {
  onSelectSolution: (solutionTitle: string) => void;
  onOpenContact: () => void;
}

export const SolutionsGrid: React.FC<SolutionsGridProps> = ({
  onSelectSolution,
  onOpenContact,
}) => {
  const [activePillarId, setActivePillarId] = useState<string>("all");

  const currentPillars =
    activePillarId === "all"
      ? SOLUTION_PILLARS
      : SOLUTION_PILLARS.filter((p) => p.id === activePillarId);

  return (
    <section id="solutions" className="py-20 bg-white dark:bg-slate-950 relative overflow-hidden text-left border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-blue-700 dark:text-sky-300 text-xs font-bold tracking-normal shadow-2xs">
            <MicrosoftLogo className="w-3.5 h-3.5" />
            <span>Microsoft Dynamics 365 Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-heading">
            Enterprise Solutions for the{" "}
            <span className="text-blue-700 dark:text-sky-400">
              Intelligent Digital Core
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Structured around Microsoft Dynamics 365 Business Central, Power Platform, Azure AI, and proprietary platforms like EdCore. We convert enterprise complexity into connected, automated execution.
          </p>
        </div>

        {/* Pillars Nav Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          <button
            onClick={() => setActivePillarId("all")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              activePillarId === "all"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
            }`}
          >
            All Solutions + EdCore
          </button>
          {SOLUTION_PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => setActivePillarId(pillar.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activePillarId === pillar.id
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {pillar.title}
            </button>
          ))}
        </div>

        {/* Pillars Showcase with Images */}
        <div className="space-y-16">
          {currentPillars.map((pillar) => {
            const bannerImage = PILLAR_BANNER_IMAGES[pillar.id] || indianIndustryOpsImg;

            return (
              <div
                key={pillar.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden"
              >
                {/* Pillar Hero Banner with Increased Height */}
                <div className="h-64 sm:h-80 md:h-[380px] w-full relative overflow-hidden bg-slate-900 group">
                  <img
                    src={bannerImage}
                    alt={`${pillar.title} enterprise solution`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-5 left-5 sm:left-8 right-5 sm:right-8 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 dark:bg-slate-900/95 text-blue-700 dark:text-sky-300 shadow-sm backdrop-blur-xs">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                        <span>{pillar.badge}</span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 shadow-sm backdrop-blur-xs">
                        <MicrosoftLogo className="w-4 h-4" />
                        <span className="hidden sm:inline">Microsoft Dynamics 365 Core</span>
                      </div>
                    </div>

                    {/* Bottom Overlay Content */}
                    <div className="absolute bottom-6 sm:bottom-8 left-5 sm:left-8 right-5 sm:right-8">
                      <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading drop-shadow-md mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-sky-300 font-semibold text-sm sm:text-base md:text-lg max-w-3xl mb-4 drop-shadow-sm">
                        {pillar.subtitle}
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() =>
                            onSelectSolution(`${pillar.title}: ${pillar.subtitle}`)
                          }
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                        >
                          <span>Consult Architect</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={onOpenContact}
                          className="px-5 py-2.5 rounded-xl bg-white/95 hover:bg-white text-slate-900 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer backdrop-blur-xs"
                        >
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>Schedule Discovery Call</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Pillar Body Content */}
                  <div className="p-6 sm:p-10 space-y-8">
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-4xl leading-relaxed">
                      {pillar.description}
                    </p>

                    {/* Mobile swipe hint for single-line EdCore cards */}
                    {pillar.id === "edcore-solution" && (
                      <div className="flex lg:hidden items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
                        <span>Swipe horizontally to view all 4 institutional modules in a single line →</span>
                      </div>
                    )}

                    {/* Capability Item Cards Grid with Images */}
                    <div
                      className={
                        pillar.id === "edcore-solution"
                          ? "flex lg:grid overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-5 snap-x snap-mandatory lg:grid-cols-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800"
                          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      }
                    >
                      {pillar.items.map((item, itemIdx) => {
                        const itemImg =
                          SOLUTION_ITEM_IMAGES[item.name] ||
                          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80";
                        const tag = ITEM_TAGS[item.name] || pillar.badge;
                        const isEdCore = pillar.id === "edcore-solution";

                        return (
                          <div
                            key={itemIdx}
                            className={`rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group text-left ${
                              isEdCore
                                ? "w-[82vw] sm:w-[320px] lg:w-auto shrink-0 lg:shrink snap-center"
                                : ""
                            }`}
                          >
                            <div>
                              {/* Card Image Thumbnail */}
                              <div
                                className={`${
                                  isEdCore ? "h-40 sm:h-44 xl:h-48" : "h-48 sm:h-52"
                                } w-full overflow-hidden relative bg-slate-900`}
                              >
                                <img
                                  src={itemImg}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                                <div className="absolute top-3 right-3">
                                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 dark:bg-slate-900/95 text-blue-700 dark:text-sky-300 shadow-xs backdrop-blur-xs flex items-center gap-1.5">
                                    {getSolutionItemIcon(item.name)}
                                    <span>{tag}</span>
                                  </span>
                                </div>
                                <div className="absolute bottom-3 left-4 right-4">
                                  <h4 className="text-white font-extrabold text-sm sm:text-base xl:text-lg drop-shadow-sm leading-snug">
                                    {item.name}
                                  </h4>
                                </div>
                              </div>

                              {/* Card Body */}
                              <div
                                className={`${
                                  isEdCore ? "p-4 sm:p-5" : "p-5 sm:p-6"
                                } space-y-4`}
                              >
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                                  {item.description}
                                </p>

                                <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                                  {item.features.map((feat, fIdx) => (
                                    <div
                                      key={fIdx}
                                      className={`flex items-center gap-2 ${
                                        isEdCore
                                          ? "text-xs"
                                          : "text-xs sm:text-sm"
                                      } text-slate-700 dark:text-slate-300 font-medium`}
                                    >
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                      <span className="truncate">{feat}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div
                              className={`${
                                isEdCore ? "p-4 sm:p-5" : "p-5 sm:p-6"
                              } pt-0`}
                            >
                              <button
                                onClick={() =>
                                  onSelectSolution(`${pillar.title} - ${item.name}`)
                                }
                                className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-700 dark:text-sky-300 hover:text-blue-800 text-xs sm:text-sm font-bold border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition flex items-center justify-center gap-1.5 cursor-pointer group/btn"
                              >
                                <span className="truncate">
                                  {isEdCore
                                    ? "Discuss EdCore"
                                    : "Discuss Solution Architecture"}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
            );
          })}
        </div>

        {/* Bottom Fast Track Banner with Authentic Indian Solution Architect */}
        <div className="mt-16 rounded-2xl border border-slate-800 bg-[#0c192c] p-8 sm:p-10 text-white shadow-xl overflow-hidden text-left flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="relative shrink-0">
              <img
                src={indianLeadArchitectImg}
                alt="Lead Microsoft Dynamics 365 Enterprise Solutions Architect"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-blue-400/40 shadow-lg"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold shadow-sm">
                Certified
              </span>
            </div>
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <MicrosoftLogo className="w-3.5 h-3.5" />
                <span>Accredited Microsoft Solutions Partner Practice</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Need a Custom Dynamics 365 Architecture Blueprint?
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Our Microsoft Certified Solution Architects in New Delhi and Mississauga conduct technical discovery, assess legacy ERP gaps, and structure an outcome-driven milestone delivery plan.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenContact}
            className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-900 bg-white hover:bg-slate-100 shadow-lg flex items-center gap-2 shrink-0 transition cursor-pointer hover:scale-[1.02]"
          >
            <span>Schedule Architecture Review</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

