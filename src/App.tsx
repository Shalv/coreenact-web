import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SolutionsGrid } from "./components/SolutionsGrid";
import { ServicesPage } from "./components/ServicesPage";
import { IndustriesPage } from "./components/IndustriesPage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { RoiCalculator } from "./components/RoiCalculator";
import { CaseStudies } from "./components/CaseStudies";
import { GlobalHubs } from "./components/GlobalHubs";
import { TechStackShowcase } from "./components/TechStackShowcase";
import { Footer } from "./components/Footer";
import { ContactModal } from "./components/ContactModal";
import { GeminiChatDrawer } from "./components/GeminiChatDrawer";
import { CustomerQueryBar } from "./components/CustomerQueryBar";
import { PageType, KnowledgeSource } from "./types";
import {
  ArrowLeft,
  Briefcase,
  Factory,
  Info,
  Mail,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { COREENACT_CONTACT } from "./data/coreenactData";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isGeminiChatOpen, setIsGeminiChatOpen] = useState(false);
  const [geminiPresetPrompt, setGeminiPresetPrompt] = useState<string | null>(null);
  const [geminiPresetSource, setGeminiPresetSource] = useState<KnowledgeSource>("hybrid");

  const handleOpenGeminiChat = (promptText?: string, source?: KnowledgeSource) => {
    if (promptText) {
      setGeminiPresetPrompt(promptText);
    }
    if (source) {
      setGeminiPresetSource(source);
    }
    setIsGeminiChatOpen(true);
  };

  const handleNavigate = (target: string) => {
    // If target matches a page type, switch page
    if (
      [
        "home",
        "solutions",
        "services",
        "industries",
        "about",
        "case-studies",
        "contact",
      ].includes(target)
    ) {
      setCurrentPage(target as PageType);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Otherwise scroll to section on current page
    if (currentPage !== "home") {
      setCurrentPage("home");
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectPage = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGroundLocation = (cityName: string) => {
    if (currentPage === "home") {
      const el = document.getElementById("maps");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    // Switch to contact or open map query
    const targetOffice = COREENACT_CONTACT.offices.find(
      (o) => o.city.toLowerCase() === cityName.toLowerCase()
    );
    if (targetOffice) {
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${targetOffice.coords.lat},${targetOffice.coords.lng}`;
      window.open(mapUrl, "_blank", "noopener,noreferrer");
    } else {
      handleNavigate("contact");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden transition-colors duration-200">
      {/* Top Navigation Header */}
      <Navbar
        activePage={currentPage}
        onSelectPage={handleSelectPage}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenGeminiChat={() => handleOpenGeminiChat()}
        onNavigate={handleNavigate}
      />

      {/* Page Breadcrumb / Bar for Subpages */}
      {currentPage !== "home" && (
        <div className="pt-36 pb-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
              <button
                onClick={() => handleSelectPage("home")}
                className="hover:text-blue-600 dark:hover:text-sky-400 transition flex items-center gap-1.5 font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600" />
              <span className="text-blue-700 dark:text-sky-400 font-bold capitalize font-mono text-sm">
                {currentPage.replace("-", " ")}
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <button
                onClick={() => setIsContactOpen(true)}
                className="text-sm text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 font-medium cursor-pointer"
              >
                Book D365 Consultation
              </button>
              <button
                onClick={() => handleSelectPage("contact")}
                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic View Switcher */}
      <main className="flex-grow bg-white dark:bg-[#0b0f19]">
        {currentPage === "home" && (
          <>
            {/* 1. Hero Section */}
            <Hero
              onOpenCalculator={() => handleNavigate("calculator")}
              onOpenContact={() => setIsContactOpen(true)}
            />

            {/* Quick Portal Cards mirroring Coreenact main navigation */}
            <div className="py-12 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0b0f19]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                  onClick={() => handleSelectPage("services")}
                  className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-sky-400 hover:shadow-md transition cursor-pointer group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-sky-400 mb-4 group-hover:scale-105 transition">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition">
                    Services Catalog
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    Business Central ERP Consulting, NAV migrations, GST localization & audits
                  </p>
                </div>

                <div
                  onClick={() => handleSelectPage("industries")}
                  className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-sky-400 hover:shadow-md transition cursor-pointer group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-105 transition">
                    <Factory className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition">
                    9 Industry Blueprints
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    Manufacturing, FMCG, Retail, EdCore education ERP, and logistics
                  </p>
                </div>

                <div
                  onClick={() => handleSelectPage("about")}
                  className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-sky-400 hover:shadow-md transition cursor-pointer group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-105 transition">
                    <Info className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition">
                    About Coreenact
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    Story, 5-phase delivery framework, and Microsoft partner credentials
                  </p>
                </div>

                <div
                  onClick={() => handleSelectPage("contact")}
                  className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-sky-400 hover:shadow-md transition cursor-pointer group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-105 transition">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition">
                    Contact & Hubs
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    New Delhi & Mississauga offices • info@coreenact.com
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Customer Query AI Assistant (Website Content or Google Search Grounded - Free Tier) */}
            <CustomerQueryBar
              onOpenChatWithPrompt={(prompt, source) => handleOpenGeminiChat(prompt, source)}
            />

            {/* 3. Enterprise Solutions & 5 Pillars + EdCore */}
            <SolutionsGrid
              onSelectSolution={() => setIsContactOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
            />

            {/* 3b. Interactive Real Microsoft Technology Stack Showcase */}
            <TechStackShowcase onOpenContact={() => setIsContactOpen(true)} />

            {/* 4. Interactive ROI & 3-Year TCO Calculator */}
            <RoiCalculator
              onOpenContact={() => setIsContactOpen(true)}
            />

            {/* 5. Enterprise Case Studies */}
            <CaseStudies
              onOpenContact={() => setIsContactOpen(true)}
            />

            {/* 6. Global Hubs & Delivery Centers */}
            <GlobalHubs
              onGroundLocation={handleGroundLocation}
              onOpenContact={() => setIsContactOpen(true)}
            />
          </>
        )}

        {currentPage === "services" && (
          <ServicesPage
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {currentPage === "industries" && (
          <IndustriesPage
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {currentPage === "about" && (
          <AboutPage
            onOpenContact={() => setIsContactOpen(true)}
            onGroundLocation={handleGroundLocation}
          />
        )}

        {currentPage === "contact" && (
          <ContactPage
            onGroundLocation={handleGroundLocation}
          />
        )}

        {currentPage === "solutions" && (
          <div className="pt-8">
            <SolutionsGrid
              onSelectSolution={() => setIsContactOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
            />
          </div>
        )}

        {currentPage === "case-studies" && (
          <div className="pt-8 pb-16">
            <CaseStudies
              onOpenContact={() => setIsContactOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Dark Footer as requested */}
      <Footer
        onNavigate={handleSelectPage}
        onOpenGeminiChat={() => handleOpenGeminiChat()}
      />

      {/* Floating Action Button for Coreenact AI Advisor */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => handleOpenGeminiChat()}
          className="relative group p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2.5 cursor-pointer border border-blue-400/40"
          title="Open Free Coreenact AI Advisor"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-cyan-200 animate-pulse" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="font-bold text-xs leading-none flex items-center gap-1.5">
              <span>Coreenact AI</span>
              <span className="text-[10px] bg-emerald-500/80 text-white px-1 py-0.2 rounded font-normal">Free</span>
            </div>
            <div className="text-[10px] text-cyan-200/80 font-mono mt-0.5 leading-none">Website RAG • Google Grounded</div>
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
        </button>
      </div>

      {/* Multi-turn Gemini Chatbot Drawer */}
      <GeminiChatDrawer
        isOpen={isGeminiChatOpen}
        onClose={() => {
          setIsGeminiChatOpen(false);
          setGeminiPresetPrompt(null);
        }}
        initialPrompt={geminiPresetPrompt}
        initialSource={geminiPresetSource}
      />

      {/* Contact & Architecture Discovery Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
