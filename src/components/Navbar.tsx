import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  Mail,
  ArrowRight,
  Menu,
  X,
  MapPin,
} from "lucide-react";
import { PageType } from "../types";
import { COREENACT_CONTACT } from "../data/coreenactData";

interface NavbarProps {
  activePage?: PageType;
  onSelectPage?: (page: PageType) => void;
  onOpenChat: (preset?: string) => void;
  onOpenContact: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage = "home",
  onSelectPage,
  onOpenChat,
  onOpenContact,
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white ${
        isScrolled
          ? "shadow-sm border-b border-slate-200/90 bg-white/98 backdrop-blur-md"
          : "border-b border-slate-200/80 bg-white"
      }`}
    >
      {/* Top Utility Bar */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-2 px-4 text-center text-xs sm:text-[13px] text-slate-600 flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
        <span className="flex items-center gap-2 text-blue-700 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Official Microsoft Solutions Partner
        </span>
        <span className="text-slate-300 hidden sm:inline">•</span>
        <span>
          Enterprise Inquiries:{" "}
          <a
            href={`mailto:${COREENACT_CONTACT.email}`}
            className="text-slate-900 hover:text-blue-700 font-mono font-bold transition"
          >
            {COREENACT_CONTACT.email}
          </a>
        </span>
        <span className="text-slate-300 hidden sm:inline">•</span>
        <span className="flex items-center gap-1.5 text-slate-700 font-medium">
          <MapPin className="w-4 h-4 text-blue-600" />
          Offices in New Delhi (India) & Mississauga (Canada)
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Attached Logo */}
          <div
            className="flex items-center gap-3.5 cursor-pointer group"
            onClick={() => handlePageClick("home")}
            title="Coreenact - Microsoft Dynamics 365 Business Central Partner"
          >
            <div className="flex items-center transition group-hover:opacity-90">
              <img
                src="/coreenact-logo-transparent.png"
                alt="Coreenact Solutions"
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </div>
            <div className="hidden lg:flex flex-col text-left border-l border-slate-200 pl-3.5">
              <span className="text-[11px] font-extrabold tracking-wider text-blue-700 uppercase font-mono">
                Microsoft Partner
              </span>
              <span className="text-xs font-semibold text-slate-600">
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

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onOpenChat()}
              className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 transition cursor-pointer flex items-center gap-2 text-sm font-semibold"
              title="Dynamics 365 Copilot AI Advisor"
            >
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span className="hidden xl:inline">AI Advisor</span>
            </button>

            <button
              onClick={() => handlePageClick("contact")}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 cursor-pointer border ${
                activePage === "contact"
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200/80"
              }`}
            >
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Contact Us</span>
            </button>

            <button
              onClick={onOpenContact}
              className="px-4.5 py-2.5 rounded-xl font-bold text-sm cursor-pointer bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition flex items-center gap-2"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenChat()}
              className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700"
              title="Copilot Chat"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200"
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
            className="md:hidden bg-white border-b border-slate-200 px-5 py-6 space-y-4 text-left shadow-xl"
          >
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handlePageClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between cursor-pointer ${
                    activePage === item.id
                      ? "bg-blue-50 text-blue-700 border border-blue-200 font-bold"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}

              <button
                onClick={() => handlePageClick("contact")}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between cursor-pointer ${
                  activePage === "contact"
                    ? "bg-blue-600 text-white font-bold"
                    : "text-slate-800 hover:bg-slate-50"
                }`}
              >
                <span>Contact Us ({COREENACT_CONTACT.email})</span>
                <Mail className="w-4 h-4 text-blue-600" />
              </button>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-slate-500 text-center pt-2">
                Offices: New Delhi, India • Mississauga, Canada
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
