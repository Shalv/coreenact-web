import React from "react";
import { Sparkles, MessageSquare, Bot } from "lucide-react";

interface ChatLauncherButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatLauncherButton: React.FC<ChatLauncherButtonProps> = ({
  onClick,
  isOpen,
}) => {
  if (isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip hint on hover */}
      <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 text-white text-xs font-semibold shadow-lg backdrop-blur-md border border-white/10 animate-fade-in">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Ask Gemini Copilot & Architect</span>
      </div>

      {/* Main Floating Button */}
      <button
        onClick={onClick}
        aria-label="Open Coreenact Gemini Copilot Chat"
        className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ring-4 ring-blue-500/20"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 blur-md opacity-50 group-hover:opacity-80 transition duration-300 -z-10" />

        <div className="relative flex items-center justify-center">
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </div>
      </button>
    </div>
  );
};
