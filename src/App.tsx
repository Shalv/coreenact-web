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
import { Footer } from "./components/Footer";
import { ChatbotDrawer } from "./components/ChatbotDrawer";
import { ContactModal } from "./components/ContactModal";
import { PageType } from "./types";
import {
  MessageSquare,
  Sparkles,
  ArrowLeft,
  Briefcase,
  Factory,
  Info,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { COREENACT_CONTACT } from "./data/coreenactData";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [chatPresetPrompt, setChatPresetPrompt] = useState<string | null>(null);

  const handleOpenChatWithPrompt = (promptText?: string) => {
    if (promptText) {
      setChatPresetPrompt(promptText);
    }
    setIsChatOpen(true);
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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Top Navigation Header */}
      <Navbar
        activePage={currentPage}
        onSelectPage={handleSelectPage}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Page Breadcrumb / Bar for Subpages */}
      {currentPage !== "home" && (
        <div className="pt-36 pb-4 border-b border-slate-200 bg-slate-50">
          <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5 text-slate-500">
              <button
                onClick={() => handleSelectPage("home")}
                className="hover:text-blue-600 transition flex items-center gap-1.5 font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <span className="text-blue-700 font-bold capitalize font-mono text-sm">
                {currentPage.replace("-", " ")}
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <button
                onClick={() => setIsContactOpen(true)}
                className="text-sm text-slate-700 hover:text-blue-600 font-medium cursor-pointer"
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
      <main className="flex-grow bg-white">
        {currentPage === "home" && (
          <>
            {/* 1. Hero Section */}
            <Hero
              onOpenChat={() => setIsChatOpen(true)}
              onOpenCalculator={() => handleNavigate("calculator")}
              onOpenContact={() => setIsContactOpen(true)}
            />

            {/* Quick Portal Cards mirroring Coreenact main navigation */}
            <div className="py-12 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                  onClick={() => handleSelectPage("services")}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition cursor-pointer group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-105 transition">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                    Services Catalog
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Business Central ERP Consulting, NAV migrations, GST localization & audits
                  </p>
                </div>

                <div
                  onClick={() => handleSelectPage("industries")}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition cursor-pointer group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-105 transition">
                    <Factory className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                    9 Industry Blueprints
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Manufacturing, FMCG, Retail, EdCore education ERP, and logistics
                  </p>
                </div>

                <div
                  onClick={() => handleSelectPage("about")}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition cursor-pointer group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-4 group-hover:scale-105 transition">
                    <Info className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                    About Coreenact
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Story, 5-phase delivery framework, and Microsoft partner credentials
                  </p>
                </div>

                <div
                  onClick={() => handleSelectPage("contact")}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition cursor-pointer group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-105 transition">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                    Contact & Hubs
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    New Delhi & Mississauga offices • info@coreenact.com
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Enterprise Solutions & 5 Pillars + EdCore */}
            <SolutionsGrid
              onSelectSolution={(title) =>
                handleOpenChatWithPrompt(
                  `Can you walk me through a Microsoft Dynamics 365 Business Central implementation plan for ${title}? What are the typical prerequisites and architectural phases?`
                )
              }
              onOpenContact={() => setIsContactOpen(true)}
            />

            {/* 3. Interactive ROI & 3-Year TCO Calculator */}
            <RoiCalculator
              onOpenChat={(preset) => handleOpenChatWithPrompt(preset)}
              onOpenContact={() => setIsContactOpen(true)}
            />

            {/* 4. Enterprise Case Studies */}
            <CaseStudies
              onOpenChat={(preset) => handleOpenChatWithPrompt(preset)}
              onOpenContact={() => setIsContactOpen(true)}
            />

            {/* 5. Global Hubs & Delivery Centers */}
            <GlobalHubs
              onGroundLocation={handleGroundLocation}
              onOpenContact={() => setIsContactOpen(true)}
            />
          </>
        )}

        {currentPage === "services" && (
          <ServicesPage
            onOpenContact={() => setIsContactOpen(true)}
            onOpenChat={(preset) => handleOpenChatWithPrompt(preset)}
          />
        )}

        {currentPage === "industries" && (
          <IndustriesPage
            onOpenContact={() => setIsContactOpen(true)}
            onOpenChat={(preset) => handleOpenChatWithPrompt(preset)}
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
            onOpenChat={(preset) => handleOpenChatWithPrompt(preset)}
          />
        )}

        {currentPage === "solutions" && (
          <div className="pt-8">
            <SolutionsGrid
              onSelectSolution={(title) =>
                handleOpenChatWithPrompt(
                  `Can you walk me through a Microsoft Dynamics 365 Business Central implementation plan for ${title}? What are the typical prerequisites and architectural phases?`
                )
              }
              onOpenContact={() => setIsContactOpen(true)}
            />
          </div>
        )}

        {currentPage === "case-studies" && (
          <div className="pt-8 pb-16">
            <CaseStudies
              onOpenChat={(preset) => handleOpenChatWithPrompt(preset)}
              onOpenContact={() => setIsContactOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Dark Footer as requested */}
      <Footer
        onOpenChat={() => setIsChatOpen(true)}
        onNavigate={handleSelectPage}
      />

      {/* Floating Action Button for Copilot AI Chatbot */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(true)}
          className="relative group p-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 cursor-pointer"
          title="Open Coreenact Copilot"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-white" />
            <Sparkles className="w-3 h-3 text-cyan-200 absolute -top-1.5 -right-1.5 animate-spin-slow" />
          </div>
          <span className="hidden sm:inline font-bold text-xs tracking-wide">
            D365 Copilot
          </span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
        </button>
      </div>

      {/* Multi-turn Chatbot Drawer */}
      <ChatbotDrawer
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setChatPresetPrompt(null);
        }}
        initialPrompt={chatPresetPrompt}
      />

      {/* Contact & Architecture Discovery Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
