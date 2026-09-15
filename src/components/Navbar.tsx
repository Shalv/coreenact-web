import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { PageType } from "../types";
import { COREENACT_CONTACT } from "../data/coreenactData";
import { MicrosoftLogo } from "./icons/MicrosoftIcons";
import { AddonsListCard } from "./AddonsListCard";
import { AddonItem } from "../data/addonsData";

interface NavbarProps {
  activePage?: PageType;
  onSelectPage?: (page: PageType) => void;
  onOpenContact: (initialInterest?: string) => void;
  onNavigate?: (sectionId: string) => void;
  onSelectAddon?: (addon: AddonItem) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage = "home",
  onSelectPage,
  onOpenContact,
  onNavigate,
  onSelectAddon,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addonsDropdownOpen, setAddonsDropdownOpen] = useState(false);
  const [mobileAddonsOpen, setMobileAddonsOpen] = useState(false);
  const addonsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addonsRef.current && !addonsRef.current.contains(event.target as Node)) {
        setAddonsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 py-1.5 px-4 text-center text-xs text-slate-600 dark:text-slate-300 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span className="flex items-center gap-2 text-blue-700 dark:text-sky-400 font-bold whitespace-nowrap shrink-0">
          <MicrosoftLogo className="w-3.5 h-3.5 shrink-0" />
          <span>Official Microsoft Solutions Partner</span>
        </span>
        <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
        <span className="whitespace-nowrap shrink-0">
          Enterprise Inquiries:{" "}
          <a
            href={`mailto:${COREENACT_CONTACT.email}`}
            className="text-slate-900 dark:text-slate-100 hover:text-blue-700 dark:hover:text-sky-400 font-mono font-bold transition whitespace-nowrap"
          >
            {COREENACT_CONTACT.email}
          </a>
        </span>
        <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
        <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap shrink-0">
          <MapPin className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
          <span>Offices in New Delhi (India) & Mississauga (Canada)</span>
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Official Attached Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => handlePageClick("home")}
            title="Coreenact - Microsoft Dynamics 365 Business Central Partner"
          >
            <div className="flex items-center transition group-hover:opacity-90 dark:bg-white/95 dark:px-2.5 dark:py-1 dark:rounded-xl shrink-0">
              <img
                src="/coreenact-logo-transparent.png"
                alt="Coreenact Solutions"
                className="h-10 sm:h-12 w-auto object-contain shrink-0"
              />
            </div>
            {/* Full badge on 2XL screens */}
            <div className="hidden 2xl:flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-3 shrink-0">
              <MicrosoftLogo className="w-5 h-5 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-extrabold tracking-wider text-blue-700 dark:text-sky-400 uppercase font-mono whitespace-nowrap">
                  Microsoft Partner
                </span>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                  Dynamics 365 Business Central
                </span>
              </div>
            </div>
            {/* Compact badge on XL screens */}
            <div className="hidden xl:flex 2xl:hidden items-center gap-1.5 border-l border-slate-200 dark:border-slate-800 pl-2.5 shrink-0">
              <MicrosoftLogo className="w-4 h-4 shrink-0" />
              <span className="text-[10px] font-extrabold tracking-wider text-blue-700 dark:text-sky-400 uppercase font-mono whitespace-nowrap">
                Microsoft Partner
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (XL and above) */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-1.5 bg-slate-100/90 dark:bg-slate-900/90 p-1 2xl:p-1.5 rounded-full border border-slate-200/80 dark:border-slate-800 shadow-2xs shrink-0">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageClick(item.id)}
                  className={`px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-full text-xs 2xl:text-sm font-semibold transition cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-700 hover:text-blue-700 hover:bg-white dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-sky-400"
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Compact Nav Links for Large laptops (lg: 1024px to 1279px) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-0.5 bg-slate-100/90 dark:bg-slate-900/90 p-1 rounded-full border border-slate-200/80 dark:border-slate-800 shadow-2xs shrink-0">
            {[
              { id: "solutions", label: "Solutions" },
              { id: "services", label: "Services" },
              { id: "industries", label: "Industries" },
              { id: "about", label: "About" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handlePageClick(item.id as PageType)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer whitespace-nowrap shrink-0 ${
                  activePage === item.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-700 hover:text-blue-700 hover:bg-white dark:text-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Action CTAs: Add-on (with dropdown), Book Consultation (second last), and Support Login (last) */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
            {/* Add-on Dropdown Menu Button */}
            <div className="relative shrink-0" ref={addonsRef}>
              <button
                onClick={() => setAddonsDropdownOpen(!addonsDropdownOpen)}
                className="px-2.5 xl:px-3.5 py-2 rounded-lg font-bold text-xs cursor-pointer bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition flex items-center gap-1.5 whitespace-nowrap shrink-0"
                title="Explore Business Central Add-ons"
              >
                <span className="whitespace-nowrap">Add-on</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                    addonsDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Add-on Dropdown Menu */}
              <AnimatePresence>
                {addonsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 sm:left-auto sm:-right-24 md:-right-16 lg:right-0 mt-2 w-[calc(100vw-2rem)] sm:w-[540px] md:w-[580px] max-w-[580px] z-50 shadow-2xl"
                  >
                    <AddonsListCard
                      onSelectAddon={(addon) => {
                        setAddonsDropdownOpen(false);
                        onSelectAddon?.(addon);
                      }}
                      onOpenConsultation={(addonName) => {
                        setAddonsDropdownOpen(false);
                        onOpenContact(addonName);
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Book Consultation Button (Shifted Right to Second Last Position) */}
            <button
              onClick={() => onOpenContact()}
              className="px-2.5 xl:px-3.5 py-2 rounded-lg font-bold text-xs cursor-pointer bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">Book Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>

            {/* Support Login External Portal Link (Last Position) */}
            <a
              href="https://support.coreenact.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 xl:px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-800 transition flex items-center gap-1.5 shadow-2xs whitespace-nowrap shrink-0"
              title="Access Coreenact Enterprise Support Portal (https://support.coreenact.com/)"
            >
              <span className="whitespace-nowrap">Support login</span>
              <ExternalLink className="w-3 h-3 text-slate-500 dark:text-slate-400 shrink-0" />
            </a>
          </div>

          {/* Mobile/Tablet Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
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
              {/* Mobile Add-on Expandable Menu (First position in actions) */}
              <div className="space-y-2">
                <button
                  onClick={() => setMobileAddonsOpen(!mobileAddonsOpen)}
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Add-on</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      mobileAddonsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileAddonsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <AddonsListCard
                        className="border-blue-800/40 p-2 sm:p-3"
                        onSelectAddon={(addon) => {
                          setMobileMenuOpen(false);
                          setMobileAddonsOpen(false);
                          onSelectAddon?.(addon);
                        }}
                        onOpenConsultation={(addonName) => {
                          setMobileMenuOpen(false);
                          setMobileAddonsOpen(false);
                          onOpenContact(addonName);
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Book Consultation (Shifted right to Second Last) */}
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

              {/* Support Login (Last Position) */}
              <a
                href="https://support.coreenact.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>Support login</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

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
