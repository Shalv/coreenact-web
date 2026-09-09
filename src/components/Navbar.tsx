import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { PageType } from "../types";
import { COREENACT_CONTACT } from "../data/coreenactData";

interface NavbarProps {
  activePage?: PageType;
  onSelectPage?: (page: PageType) => void;
  onOpenContact: () => void;
  onOpenGeminiChat?: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage = "home",
  onSelectPage,
  onOpenContact,
  onOpenGeminiChat,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePageClick = (page: PageType) => {
    if (typeof onSelectPage === "function") {
      onSelectPage(page);
    } else if (typeof onNavigate === "function") {
      onNavigate(page);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: Array<{ id: PageType; label: string }> = [
    { id: "home", label: "Home" },
    { id: "solutions", label: "Solutions" },
    { id: "services", label: "Services" },
    { id: "industries", label: "Industries" },
    { id: "about", label: "About Us" },
    { id: "case-studies", label: "Case Studies" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "shadow-sm border-b border-slate-200/90 bg-white/98 backdrop-blur-md dark:bg-slate-950/98 dark:border-slate-800"
          : "border-b border-slate-200/80 bg-white dark:bg-slate-950 dark:border-slate-800"
      }`}
    >
      {/* Top Utility Bar */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 py-2 px-4 text-center text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
        <span className="flex items-center gap-2 text-blue-700 dark:text-sky-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Official Microsoft Solutions Partner
        </span>
        <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
        <span>
          Enterprise Inquiries:{" "}
          <a
            href={`mailto:${COREENACT_CONTACT.email}`}
            className="text-slate-900 dark:text-slate-100 hover:text-blue-700 dark:hover:text-sky-400 font-mono font-bold transition"
          >
            {COREENACT_CONTACT.email}
          </a>
        </span>
        <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
        <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
          <MapPin className="w-4 h-4 text-blue-600 dark:text-sky-400" />
          Offices in New Delhi (India) & Mississauga (Canada)
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Attached Logo - Increased scale and prominence */}
          <div
            className="flex items-center gap-3.5 cursor-pointer group"
            onClick={() => handlePageClick("home")}
            title="Coreenact - Microsoft Dynamics 365 Business Central Partner"
          >
            <div className="flex items-center transition group-hover:opacity-90 dark:bg-white/95 dark:px-3 dark:py-1.5 dark:rounded-xl">
              <img
                src="/coreenact-logo-transparent.png"
                alt="Coreenact Solutions"
                className="h-11 sm:h-13 w-auto object-contain"
              />
            </div>
            <div className="hidden lg:flex flex-col text-left border-l border-slate-200 dark:border-slate-800 pl-3.5">
              <span className="text-[11px] font-extrabold tracking-wider text-blue-700 dark:text-sky-400 uppercase font-mono">
                Microsoft Partner
              </span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Dynamics 365 Business Central
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/80 shadow-2xs">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageClick(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-700 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Medium Screen Nav Links */}
          <nav className="hidden md:flex xl:hidden items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/80 shadow-2xs">
            {[
              { id: "solutions", label: "Solutions" },
              { id: "services", label: "Services" },
              { id: "industries", label: "Industries" },
              { id: "about", label: "About" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handlePageClick(item.id as PageType)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition cursor-pointer ${
                  activePage === item.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-700 hover:text-blue-700 hover:bg-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs (Theme button removed, compact button sizing, Support Login added, Coreenact AI at end) */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Support Login External Portal Link */}
            <a
              href="https://support.coreenact.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-800 transition flex items-center gap-1.5 shadow-2xs"
              title="Access Coreenact Enterprise Support Portal (https://support.coreenact.com/)"
            >
              <span>Support login</span>
              <ExternalLink className="w-3 h-3 text-slate-500 dark:text-slate-400" />
            </a>

            {/* Book Consultation Button - Compact */}
            <button
              onClick={onOpenContact}
              className="px-3.5 py-2 rounded-lg font-bold text-xs cursor-pointer bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition flex items-center gap-1.5"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Coreenact AI Multi-turn Chat Launcher (In Last Position) - Compact */}
            <button
              onClick={onOpenGeminiChat}
              className="px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xs"
              title="Open Coreenact AI Advisor"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
              <span>Coreenact AI</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button (Theme button removed) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-5 py-5 space-y-3 text-left shadow-xl"
          >
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handlePageClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between cursor-pointer ${
                    activePage === item.id
                      ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-400 border border-blue-200 dark:border-blue-800 font-bold"
                      : "text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <a
                href="https://support.coreenact.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>Support login</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGeminiChat?.();
                }}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
                <span>Open Coreenact AI Advisor</span>
              </button>

              <div className="text-[11px] text-slate-500 text-center pt-1.5">
                Offices: New Delhi, India • Mississauga, Canada
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
