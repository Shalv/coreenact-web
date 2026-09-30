import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  ArrowRight,
  Menu,
  X,
  MapPin,
} from "lucide-react";
import { PageType } from "../types";
import { COREENACT_CONTACT } from "../data/coreenactData";
import { MicrosoftLogo } from "./icons/MicrosoftIcons";
import { AddonItem } from "../data/addonsData";

interface NavbarProps {
  activePage?: PageType;
  onSelectPage?: (page: PageType, sectionId?: string) => void;
  onOpenContact: (initialInterest?: string) => void;
  onNavigate?: (sectionId: string) => void;
  onSelectAddon?: (addon: AddonItem) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage = "home",
  onSelectPage,
  onOpenContact,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePageClick = (page: PageType, sectionId?: string) => {
    if (typeof onSelectPage === "function") {
      onSelectPage(page, sectionId);
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

  const navItems: Array<{ id: PageType; label: string; shortLabel?: string }> = [
    { id: "home", label: "Home" },
    { id: "solutions", label: "Solutions" },
    { id: "services", label: "Services" },
    { id: "ai-agents", label: "AI & Agents", shortLabel: "AI" },
    { id: "industries", label: "Industries" },
    { id: "about", label: "About Us", shortLabel: "About" },
    { id: "case-studies", label: "Case Studies" },
    { id: "resources", label: "Resources" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "shadow-sm border-b border-slate-200/90 bg-white/98 backdrop-blur-md dark:bg-slate-950/98 dark:border-slate-800"
          : "border-b border-slate-200/80 bg-white dark:bg-slate-950 dark:border-slate-800"
      }`}
    >
      {/* Top Utility Bar - Aligned to site container width */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-[1480px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-1.5 text-xs text-slate-600 dark:text-slate-300 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-blue-700 dark:text-sky-400 font-bold whitespace-nowrap shrink-0">
              <MicrosoftLogo className="w-3.5 h-3.5 shrink-0" />
              <span>Official Microsoft Solutions Partner</span>
            </span>
            <span className="text-slate-300 dark:text-slate-700 hidden md:inline">•</span>
            <span className="hidden md:inline whitespace-nowrap">
              Enterprise Inquiries:{" "}
              <a
                href={`mailto:${COREENACT_CONTACT.email}`}
                className="text-slate-900 dark:text-slate-100 hover:text-blue-700 dark:hover:text-sky-400 font-mono font-bold transition whitespace-nowrap"
              >
                {COREENACT_CONTACT.email}
              </a>
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <a
              href={`tel:+91${COREENACT_CONTACT.phoneRaw}`}
              className="inline-flex items-center gap-1 text-slate-900 dark:text-slate-100 hover:text-blue-700 dark:hover:text-sky-400 font-mono font-bold transition whitespace-nowrap"
              title="Call Coreenact"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
              <span>{COREENACT_CONTACT.phone}</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap shrink-0">
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
              <span>Haryana & Mississauga</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Exactly aligned with 1480px site width */}
      <div className="max-w-[1480px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2 xl:gap-2.5 2xl:gap-3 w-full">
          {/* Official Attached Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group shrink-0"
            onClick={() => handlePageClick("home")}
            title="Coreenact - Microsoft Dynamics 365 Business Central Partner"
          >
            <div className="flex items-center transition group-hover:opacity-90 dark:bg-white/95 dark:px-2.5 dark:py-1 dark:rounded-xl shrink-0">
              <img
                src="/coreenact-logo-transparent.png"
                alt="Coreenact Solutions"
                className="h-8 sm:h-9 2xl:h-11 w-auto object-contain shrink-0"
              />
            </div>
            {/* Compact badge on 2XL screens */}
            <div className="hidden 2xl:flex items-center gap-1.5 border-l border-slate-200 dark:border-slate-800 pl-2.5 shrink-0">
              <MicrosoftLogo className="w-4 h-4 shrink-0" />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] font-extrabold tracking-wider text-blue-700 dark:text-sky-400 uppercase font-mono whitespace-nowrap">
                  Microsoft Partner
                </span>
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                  Dynamics 365
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links (XL and above) */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 bg-slate-100/90 dark:bg-slate-900/90 p-1 rounded-full border border-slate-200/80 dark:border-slate-800 shadow-2xs shrink min-w-0">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageClick(item.id)}
                  className={`px-2 2xl:px-3 py-1.5 rounded-full text-xs 2xl:text-[13px] font-semibold transition cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-700 hover:text-blue-700 hover:bg-white dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-sky-400"
                  }`}
                >
                  <span className="hidden 2xl:inline whitespace-nowrap">{item.label}</span>
                  <span className="2xl:hidden whitespace-nowrap">{item.shortLabel || item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Compact Nav Links for Large laptops (lg: 1024px to 1279px) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-0.5 bg-slate-100/90 dark:bg-slate-900/90 p-1 rounded-full border border-slate-200/80 dark:border-slate-800 shadow-2xs shrink min-w-0">
            {[
              { id: "solutions", label: "Solutions" },
              { id: "services", label: "Services" },
              { id: "ai-agents", label: "AI" },
              { id: "industries", label: "Industries" },
              { id: "about", label: "About" },
              { id: "resources", label: "Resources" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handlePageClick(item.id as PageType)}
                className={`px-2 py-1 rounded-full text-xs font-semibold transition cursor-pointer whitespace-nowrap shrink-0 ${
                  activePage === item.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-700 hover:text-blue-700 hover:bg-white dark:text-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Action CTA: Book Consultation aligned with website container width */}
          <div className="hidden lg:flex items-center justify-end shrink-0">
            {/* Book Consultation Button */}
            <button
              onClick={() => onOpenContact()}
              className="px-4 xl:px-4.5 2xl:px-5 py-2 rounded-xl font-bold text-xs 2xl:text-[13px] cursor-pointer bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">Book Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>

          {/* Mobile/Tablet Menu Controls */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 cursor-pointer"
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
            className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-5 py-5 space-y-3 text-left shadow-xl max-h-[calc(100vh-6rem)] overflow-y-auto"
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
              {/* Book Consultation */}
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

              <div className="pt-1">
                <a
                  href={`tel:+91${COREENACT_CONTACT.phoneRaw}`}
                  className="w-full py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                  <span>{COREENACT_CONTACT.phone}</span>
                </a>
              </div>

              <div className="text-[11px] text-slate-500 text-center pt-1.5">
                Offices: Haryana, India • Mississauga, Canada
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
