import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, ArrowRight, Layers, ShieldCheck, Zap } from "lucide-react";
import { AddonItem } from "../data/addonsData";

interface AddonDetailModalProps {
  addon: AddonItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: (addonName: string) => void;
}

export const AddonDetailModal: React.FC<AddonDetailModalProps> = ({
  addon,
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  if (!addon) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-xl rounded-3xl p-1 bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 shadow-2xl z-10 text-left"
          >
            <div className="rounded-[23px] bg-[#070d22] text-slate-100 p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5 border border-blue-900/50">
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 bg-blue-500 inline-block shrink-0 shadow-xs shadow-blue-500/50" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-400">
                    {addon.category}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  {addon.name}
                </h3>
                <p className="text-xs sm:text-sm text-sky-300 font-medium mt-1 leading-relaxed">
                  {addon.tagline}
                </p>
              </div>

              {/* Description */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-300 leading-relaxed">
                {addon.description}
              </div>

              {/* Benefits */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Key Value & Capabilities</span>
                </div>
                <ul className="space-y-2">
                  {addon.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* BC Integration */}
              <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-800/40 text-xs flex items-center gap-2.5 text-sky-200">
                <Layers className="w-4 h-4 text-sky-400 shrink-0" />
                <span>
                  <strong className="text-white font-semibold">Business Central Compatibility: </strong>
                  {addon.bcIntegration}
                </span>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenConsultation(addon.name);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  <span>Request {addon.name} Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
