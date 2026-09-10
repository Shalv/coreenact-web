import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import { SOLUTIONS } from "../data/solutionsData";
import { MicrosoftLogo, TechIcon } from "./icons/MicrosoftIcons";

interface TechStackShowcaseProps {
  onOpenContact: () => void;
}

export const TechStackShowcase: React.FC<TechStackShowcaseProps> = ({ onOpenContact }) => {
  const [activeId, setActiveId] = useState(SOLUTIONS[0].id);
  const active = SOLUTIONS.find((s) => s.id === activeId) ?? SOLUTIONS[0];

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#080c18] border-t border-slate-200/80 dark:border-slate-800 relative overflow-hidden text-left">
      <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-blue-100/50 dark:bg-blue-950/30 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900 shadow-xs">
            <MicrosoftLogo className="w-4 h-4" />
            <span className="text-xs font-bold tracking-wider uppercase text-blue-700 dark:text-sky-400">
              Real Microsoft Technology Stack
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
            Tap a Solution. See{" "}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              Exactly What We Build With
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Every engagement is assembled from genuine, licensed Microsoft products — never generic tooling wearing a Microsoft badge.
          </p>
        </div>

        {/* Interactive solution tab selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SOLUTIONS.map((sol) => (
            <button
              key={sol.id}
              onClick={() => setActiveId(sol.id)}
              className={`px-4 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer border ${
                activeId === sol.id
                  ? "text-white shadow-md scale-[1.03] border-transparent"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-300"
              }`}
              style={
                activeId === sol.id
                  ? { backgroundImage: sol.accentGradient }
                  : undefined
              }
            >
              {sol.badge}
            </button>
          ))}
        </div>

        {/* Active solution detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-3xl p-1 max-w-6xl mx-auto shadow-lg"
            style={{ backgroundImage: active.accentGradient }}
          >
            <div className="rounded-[22px] bg-white dark:bg-slate-950 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left: description + capabilities */}
              <div className="lg:col-span-3 space-y-5">
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3"
                    style={{ backgroundImage: active.accentGradient }}
                  >
                    {active.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
                    {active.title}
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-sky-400 font-semibold mt-1">
                    {active.tagline}
                  </p>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                  {active.description}
                </p>
                <ul className="space-y-2.5">
                  {active.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-sky-400 hover:gap-3 transition-all cursor-pointer"
                >
                  <span>Discuss this stack with an architect</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right: real Microsoft product icon grid + metric */}
              <div className="lg:col-span-2 space-y-5">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <MicrosoftLogo className="w-3.5 h-3.5" />
                    <span>Microsoft Products in This Stack</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {active.microsoftStack.map((tech) => (
                      <motion.div
                        key={tech}
                        whileHover={{ scale: 1.04, y: -2 }}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xs"
                      >
                        <TechIcon label={tech} className="w-6 h-6 shrink-0" />
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                          {tech}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div
                  className="p-5 rounded-2xl text-white flex items-center justify-between"
                  style={{ backgroundImage: active.accentGradient }}
                >
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider opacity-90">
                      {active.metrics.label}
                    </div>
                    <div className="text-3xl font-black font-mono mt-1">{active.metrics.value}</div>
                  </div>
                  <TrendingUp className="w-8 h-8 opacity-80" />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
