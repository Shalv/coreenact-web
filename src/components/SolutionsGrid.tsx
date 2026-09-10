import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { SOLUTION_PILLARS } from "../data/coreenactData";
import { MicrosoftLogo } from "./icons/MicrosoftIcons";

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
    <section id="solutions" className="py-24 bg-white relative overflow-hidden text-left border-t border-slate-100">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase">
            <MicrosoftLogo className="w-3.5 h-3.5" />
            <span>Microsoft Dynamics 365 Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Enterprise Solutions for the{" "}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              Intelligent Digital Core
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Structured around Microsoft Dynamics 365 Business Central, Power Platform, Azure AI, and proprietary platforms like EdCore. We convert enterprise complexity into connected, automated execution.
          </p>
        </div>

        {/* Pillars Nav Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          <button
            onClick={() => setActivePillarId("all")}
            className={`px-4.5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              activePillarId === "all"
                ? "bg-blue-600 text-white shadow-sm scale-105"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            All 5 Pillars + EdCore
          </button>
          {SOLUTION_PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => setActivePillarId(pillar.id)}
              className={`px-4.5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                activePillarId === pillar.id
                  ? "bg-blue-600 text-white shadow-sm scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {pillar.title}
            </button>
          ))}
        </div>

        {/* Pillars Showcase */}
        <div className="space-y-12">
          {currentPillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="p-8 sm:p-10 rounded-3xl bg-slate-50/80 border border-slate-200/80 shadow-xs space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                      {pillar.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      Pillar 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-blue-700 font-semibold mt-1">
                    {pillar.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      onSelectSolution(
                        `${pillar.title}: ${pillar.subtitle}`
                      )
                    }
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold border border-slate-300 shadow-xs transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Consult Architect</span>
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={onOpenContact}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-xs transition flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Talk to Expert</span>
                  </button>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 max-w-4xl leading-relaxed">
                {pillar.description}
              </p>

              {/* Items Grid inside the Pillar */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {pillar.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-1.5">
                        {item.name}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-slate-100">
                      {item.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Fast Track Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-left text-white">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold font-heading">
              Need a Microsoft Dynamics 365 Architecture Roadmap?
            </h3>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Our Microsoft Certified Solution Architects in New Delhi and Mississauga review your existing systems, assess data maturity, and present an outcome-driven delivery roadmap.
            </p>
          </div>
          <button
            onClick={onOpenContact}
            className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-900 bg-white hover:bg-blue-50 shadow-md flex items-center gap-2 shrink-0 transition cursor-pointer"
          >
            <span>Schedule Architecture Review</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </div>
    </section>
  );
};
