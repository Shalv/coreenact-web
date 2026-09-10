import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Briefcase,
  CloudLightning,
  ShieldCheck,
  Globe2,
  FileCheck,
  Lock,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
  Award,
} from "lucide-react";
import { SERVICES_CATALOG } from "../data/coreenactData";

interface ServicesPageProps {
  onOpenContact: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenContact,
}) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES_CATALOG[0].id);
  const activeService =
    SERVICES_CATALOG.find((s) => s.id === activeServiceId) || SERVICES_CATALOG[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Briefcase":
        return <Briefcase className="w-5 h-5" />;
      case "CloudLightning":
        return <CloudLightning className="w-5 h-5" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5" />;
      case "Globe2":
        return <Globe2 className="w-5 h-5" />;
      case "FileCheck":
        return <FileCheck className="w-5 h-5" />;
      case "Lock":
        return <Lock className="w-5 h-5" />;
      case "Headphones":
        return <Headphones className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <div className="py-12 sm:py-20 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Coreenact Services</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
          Enterprise Services for the{" "}
          <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
            Microsoft Cloud
          </span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          From turnkey Microsoft Dynamics 365 Business Central implementations and legacy NAV migrations to 24/7 SLA managed care and India statutory compliance, we provide full-lifecycle enterprise engineering.
        </p>
      </div>

      {/* Services Nav Pill Selector */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-slate-200">
        {SERVICES_CATALOG.map((svc) => {
          const isSelected = svc.id === activeServiceId;
          return (
            <button
              key={svc.id}
              onClick={() => setActiveServiceId(svc.id)}
              className={`px-4.5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition flex items-center gap-2.5 shrink-0 cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {getIcon(svc.iconName)}
              <span>{svc.title}</span>
            </button>
          );
        })}
      </div>

      {/* Detailed Service Showcase Card */}
      <motion.div
        key={activeService.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl p-1 bg-gradient-to-br from-blue-100 via-indigo-100 to-slate-200 shadow-md mb-16"
      >
        <div className="rounded-[23px] bg-white overflow-hidden border border-slate-200">
          {/* Product-style Hero Image for the Active Service */}
          <div className="relative w-full h-44 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
            <img
              src={activeService.image}
              alt={activeService.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-blue-700 border border-blue-200 mb-2">
                <Award className="w-3.5 h-3.5" />
                <span>{activeService.badge}</span>
              </div>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading drop-shadow-sm">
                {activeService.title}
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-2">
              <p className="text-sm sm:text-base text-blue-700 font-semibold">
                {activeService.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <button
                onClick={onOpenContact}
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Scoping Session</span>
              </button>
              <button
                onClick={onOpenContact}
                className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-300 transition cursor-pointer w-full sm:w-auto"
              >
                Inquire About Service
              </button>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-4xl">
            {activeService.description}
          </p>

          {/* Three Column Breakdown: Phases, Deliverables, Value Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            {/* 1. Methodological Phases */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>Phased Execution Lifecycle</span>
              </h3>
              <ul className="space-y-3">
                {activeService.phases.map((phase, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="font-mono font-bold text-blue-600 shrink-0 mt-0.5">
                      {idx + 1}.
                    </span>
                    <span>{phase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Key Deliverables */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>Verified Deliverables</span>
              </h3>
              <ul className="space-y-3">
                {activeService.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Business Impact & Benefits */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Strategic Business Value</span>
              </h3>
              <ul className="space-y-3">
                {activeService.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-slate-200 mt-6">
                <div className="text-xs text-slate-500">
                  Ready to assess your project scope?
                </div>
                <button
                  onClick={onOpenContact}
                  className="mt-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Request Scoping Workshop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </motion.div>

      {/* Grid of All Services for Quick Access */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 font-heading">
          Explore All Coreenact Service Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_CATALOG.map((svc) => (
            <div
              key={svc.id}
              onClick={() => setActiveServiceId(svc.id)}
              className={`rounded-2xl cursor-pointer transition-all duration-200 border text-left overflow-hidden flex flex-col ${
                svc.id === activeServiceId
                  ? "bg-blue-50/50 border-blue-400 shadow-md"
                  : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs"
              }`}
            >
              {/* Product-style thumbnail image */}
              <div className="relative w-full h-40 sm:h-44 overflow-hidden shrink-0">
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                  {getIcon(svc.iconName)}
                </div>
              </div>

              <div className="p-5 sm:p-6 flex flex-col grow">
                <h4 className="text-base font-bold text-slate-900 mb-1.5">{svc.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">{svc.subtitle}</p>
                <div className="text-xs font-bold text-blue-600 flex items-center gap-1 mt-auto">
                  <span>View Full Practice Scope</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
