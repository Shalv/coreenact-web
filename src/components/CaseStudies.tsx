import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Award,
  ArrowRight,
  Building2,
  Sparkles,
} from "lucide-react";
import { CASE_STUDIES } from "../data/solutionsData";

interface CaseStudiesProps {
  onOpenContact: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({
  onOpenContact,
}) => {
  const [selectedCase, setSelectedCase] = useState<string>(CASE_STUDIES[0].id);
  const activeCase = CASE_STUDIES.find((c) => c.id === selectedCase) || CASE_STUDIES[0];

  return (
    <section id="case-studies" className="py-24 bg-white border-t border-slate-200/80 relative overflow-hidden text-left">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Proven Industry Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Industry Vertical{" "}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            See how mid-market and enterprise organizations replaced obsolete legacy software with Microsoft Dynamics 365, Azure Cloud, and automated workflows to drive verified business value.
          </p>
        </div>

        {/* Vertical Selection Selector Bar - Only Vertical Name Shows */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {CASE_STUDIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCase(c.id)}
              className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center gap-2.5 border cursor-pointer ${
                selectedCase === c.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Building2 className={`w-4 h-4 ${selectedCase === c.id ? "text-white" : "text-blue-600"}`} />
              <span>{c.industry}</span>
            </button>
          ))}
        </div>

        {/* Highlighted Case Card */}
        <motion.div
          key={activeCase.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl p-1 bg-gradient-to-br from-blue-100 via-indigo-100 to-slate-200 shadow-md"
        >
          <div className="rounded-[22px] bg-white border border-slate-200 p-6 sm:p-10 space-y-8 text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="space-y-2">
                <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {activeCase.industry} Vertical
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                  {activeCase.headline}
                </h3>
                <div className="text-sm text-blue-700 font-semibold">
                  Delivery Partner: Coreenact Microsoft Dynamics 365 Practice
                </div>
              </div>

              {/* Quick Consultation Shortcut */}
              <button
                onClick={onOpenContact}
                className="px-5 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-bold text-sm flex items-center gap-2 shrink-0 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Discuss Vertical with Architect</span>
              </button>
            </div>

            {/* Challenge & Solution Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  The Legacy Challenge:
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {activeCase.challenge}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  Coreenact Architecture & Solution:
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {activeCase.solution}
                </p>
              </div>
            </div>

            {/* Outcome & Stats Strip */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Business Transformation Outcome:
                  </div>
                  <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed">
                    {activeCase.outcome}
                  </p>
                </div>

                {/* Metric counters */}
                <div className="flex items-center gap-4 shrink-0">
                  {activeCase.stats.map((stat, i) => (
                    <div key={i} className="text-center px-4 py-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                      <div className="text-2xl font-black font-mono text-blue-700">
                        {stat.value}
                      </div>
                      <div className="text-xs font-medium text-slate-600 whitespace-nowrap mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <span className="text-sm text-slate-600">
                Want similar results for your enterprise vertical?
              </span>
              <button
                onClick={onOpenContact}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
              >
                <span>Speak with an Industry Lead</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
