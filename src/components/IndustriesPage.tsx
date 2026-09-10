import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Factory,
  GraduationCap,
  ShoppingBag,
  Zap,
  Briefcase,
  HardHat,
  Ship,
  Stethoscope,
  Truck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
} from "lucide-react";
import { INDUSTRIES_CATALOG } from "../data/coreenactData";
import { DynamicsIcon, MicrosoftLogo } from "./icons/MicrosoftIcons";

const INDUSTRY_IMAGES: Record<string, string> = {
  manufacturing: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=75",
  fmcg: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1400&q=75",
  retail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=75",
  education: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=75",
  "professional-services": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=75",
  construction: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=75",
  "maritime-logistics": "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1400&q=75",
  healthcare: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=75",
  distribution: "https://images.unsplash.com/photo-1601599963565-b7f49b9c68ba?auto=format&fit=crop&w=1400&q=75",
};

interface IndustriesPageProps {
  onOpenContact: () => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({
  onOpenContact,
}) => {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>(INDUSTRIES_CATALOG[0].id);
  const activeIndustry =
    INDUSTRIES_CATALOG.find((ind) => ind.id === selectedIndustryId) || INDUSTRIES_CATALOG[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Factory":
        return <Factory className="w-5 h-5" />;
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5" />;
      case "ShoppingBag":
        return <ShoppingBag className="w-5 h-5" />;
      case "Zap":
        return <Zap className="w-5 h-5" />;
      case "Briefcase":
        return <Briefcase className="w-5 h-5" />;
      case "HardHat":
        return <HardHat className="w-5 h-5" />;
      case "Ship":
        return <Ship className="w-5 h-5" />;
      case "Stethoscope":
        return <Stethoscope className="w-5 h-5" />;
      case "Truck":
        return <Truck className="w-5 h-5" />;
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
          <span>Industry Solutions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
          Tailored ERP & AI for Your{" "}
          <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
            Specific Operating Model
          </span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Generic ERP templates fail because every industry operates with distinct economics, compliance mandates, and supply chain constraints. We configure Microsoft Dynamics 365 to fit your exact reality.
        </p>
      </div>

      {/* Industry Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2.5 mb-10">
        {INDUSTRIES_CATALOG.map((ind) => {
          const isSelected = ind.id === selectedIndustryId;
          return (
            <button
              key={ind.id}
              onClick={() => setSelectedIndustryId(ind.id)}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-2 transition text-center cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                {getIcon(ind.iconName)}
              </div>
              <span className="text-xs font-bold leading-tight line-clamp-1">
                {ind.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Industry Spotlight View */}
      <motion.div
        key={activeIndustry.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl p-1 bg-gradient-to-br from-blue-100 via-indigo-100 to-slate-200 shadow-md mb-16"
      >
        <div className="rounded-[23px] bg-white overflow-hidden border border-slate-200">
          {/* Industry photo banner */}
          <div className="h-40 sm:h-56 w-full relative overflow-hidden">
            <img
              src={INDUSTRY_IMAGES[activeIndustry.id]}
              alt={`${activeIndustry.name} industry`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-lg shadow-sm">
              <MicrosoftLogo className="w-4 h-4" />
              <span className="text-xs font-bold text-slate-800">Built on Dynamics 365</span>
            </span>
            <span className="absolute bottom-4 left-6 text-white text-2xl sm:text-3xl font-extrabold font-heading drop-shadow">
              {activeIndustry.name}
            </span>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                {getIcon(activeIndustry.iconName)}
              </div>
              <div>
                <p className="text-sm sm:text-base text-blue-700 font-semibold mt-0.5">
                  {activeIndustry.tagline}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-right">
                <div className="text-xs uppercase font-bold text-slate-500">
                  {activeIndustry.resultMetric.label}
                </div>
                <div className="text-xl font-black text-blue-600 font-mono">
                  {activeIndustry.resultMetric.value}
                </div>
              </div>

              <button
                onClick={onOpenContact}
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Industry Demo</span>
              </button>
            </div>
          </div>

          {/* Contrast: Typical Industry Hurdles vs Coreenact Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Common Industry Hurdles */}
            <div className="p-6 sm:p-8 rounded-2xl bg-rose-50 border border-rose-200 space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-rose-900 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Pervasive Industry Friction</span>
              </h3>
              <ul className="space-y-3">
                {activeIndustry.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-950 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coreenact Native Solutions */}
            <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Coreenact Engineered Outcomes</span>
              </h3>
              <ul className="space-y-3">
                {activeIndustry.solutions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Microsoft Dynamics 365 Specialized Features */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <DynamicsIcon className="w-4 h-4" />
              <span>Microsoft Dynamics 365 Pre-Configured Capabilities</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {activeIndustry.d365Features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-center gap-2.5 shadow-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                  <span className="font-semibold">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
            <div className="text-xs sm:text-sm text-slate-600">
              Need to see how your specific business process maps to Dynamics 365?
            </div>
            <button
              onClick={onOpenContact}
              className="text-sm font-bold text-blue-600 hover:text-blue-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Consult Architect for {activeIndustry.name} Blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          </div>
        </div>
      </motion.div>

      {/* Grid of All 9 Industries */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 font-heading">
          All Industry Specializations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES_CATALOG.map((ind) => (
            <div
              key={ind.id}
              onClick={() => setSelectedIndustryId(ind.id)}
              className={`rounded-2xl cursor-pointer transition-all duration-200 border text-left overflow-hidden group ${
                ind.id === selectedIndustryId
                  ? "bg-blue-50/50 border-blue-400 shadow-md"
                  : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs"
              }`}
            >
              <div className="h-28 w-full overflow-hidden relative">
                <img
                  src={INDUSTRY_IMAGES[ind.id]}
                  alt={ind.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
              </div>
              <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  {getIcon(ind.iconName)}
                </div>
                <span className="text-xs font-mono font-bold text-blue-600">
                  {ind.resultMetric.value}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1.5">{ind.name}</h4>
              <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">{ind.tagline}</p>
              <div className="text-xs font-bold text-blue-600 flex items-center gap-1">
                <span>View Full Industry Blueprint</span>
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
