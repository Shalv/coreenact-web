import React, { useState, useEffect } from "react";
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
import { DigitalMarketingSection } from "./components/DigitalMarketingSection";
import { Footer } from "./components/Footer";
import { ContactModal } from "./components/ContactModal";
import { AddonsListCard } from "./components/AddonsListCard";
import { AddonDetailModal } from "./components/AddonDetailModal";
import { AddonsDrawer } from "./components/AddonsDrawer";
import { AddonItem } from "./data/addonsData";
import { PageType } from "./types";
import {
  ArrowLeft,
  Briefcase,
  Factory,
  Info,
  Mail,
  ChevronRight,
  Layers,
  TrendingUp,
} from "lucide-react";
import { COREENACT_CONTACT } from "./data/coreenactData";
import { MicrosoftAppBadge } from "./components/icons/MicrosoftIcons";
import consultantConsultingImg from "./assets/images/indian_d365_consultant_1790050307568.jpg";
import industryOpsCardImg from "./assets/images/indian_industry_ops_1790050360620.jpg";
import globalConsultingTeamImg from "./assets/images/enterprise_consulting_team_1790047798645.jpg";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [historyStack, setHistoryStack] = useState<PageType[]>(["home"]);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Sync with browser popstate event while keeping URL address clean
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const targetPage: PageType = event.state?.page || "home";
      setCurrentPage(targetPage);
      setHistoryStack((prev) => {
        const idx = prev.lastIndexOf(targetPage);
        if (idx !== -1) {
          return prev.slice(0, idx + 1);
        }
        return [...prev, targetPage];
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const formatPageTitle = (page: PageType): string => {
    switch (page) {
      case "home":
        return "Home";
      case "solutions":
        return "Solutions";
      case "services":
        return "Services";
      case "digital-marketing":
        return "Digital Marketing";
      case "industries":
        return "Industries";
      case "about":
        return "About Us";
      case "case-studies":
        return "Case Studies";
      case "contact":
        return "Contact Us";
      default:
        return (page as string).replace("-", " ");
    }
  };

  // Add-on states
  const [selectedAddon, setSelectedAddon] = useState<AddonItem | null>(null);
  const [isAddonDetailOpen, setIsAddonDetailOpen] = useState(false);
  const [isAddonsDrawerOpen, setIsAddonsDrawerOpen] = useState(false);
  const [contactInterest, setContactInterest] = useState<string>("Dynamics 365 Business Central");

  const handleOpenContact = (interest?: string) => {
    if (interest) {
      setContactInterest(interest);
    }
    setIsContactOpen(true);
  };

  const handleSelectAddon = (addon: AddonItem) => {
    setSelectedAddon(addon);
    setIsAddonDetailOpen(true);
  };

  const handleSelectPage = (page: PageType) => {
    if (page === currentPage) return;
    setHistoryStack((prev) => {
      if (prev[prev.length - 1] === page) return prev;
      return [...prev, page];
    });
    setCurrentPage(page);
    try {
      window.history.pushState({ page }, "", window.location.href);
    } catch {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoBack = () => {
    if (historyStack.length > 1) {
      const newStack = [...historyStack];
      newStack.pop(); // Remove current page
      const prevPage = newStack[newStack.length - 1] || "home";
      setHistoryStack(newStack);
      setCurrentPage(prevPage);
      try {
        window.history.replaceState({ page: prevPage }, "", window.location.href);
      } catch {}
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setHistoryStack(["home"]);
      setCurrentPage("home");
      try {
        window.history.replaceState({ page: "home" }, "", window.location.href);
      } catch {}
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const previousPage: PageType =
    historyStack.length > 1 ? historyStack[historyStack.length - 2] : "home";

  const handleNavigate = (target: string) => {
    // If target matches a page type, switch page
    if (
      [
        "home",
        "solutions",
        "services",
        "digital-marketing",
        "industries",
        "about",
        "case-studies",
        "contact",
      ].includes(target)
    ) {
      handleSelectPage(target as PageType);
      return;
    }

    // Otherwise scroll to section on current page
    if (currentPage !== "home") {
      handleSelectPage("home");
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
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
        onOpenContact={handleOpenContact}
        onNavigate={handleNavigate}
        onSelectAddon={handleSelectAddon}
      />

      {/* Page Breadcrumb / Bar for Subpages */}
      {currentPage !== "home" && (
        <div className="pt-48 sm:pt-40 pb-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center gap-2.5 sm:gap-3 text-slate-500 dark:text-slate-400 min-w-0">
              <button
                onClick={handleGoBack}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-sky-400 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400 font-semibold transition-all shadow-2xs cursor-pointer shrink-0"
                title={previousPage ? `Back to ${formatPageTitle(previousPage)}` : "Go back"}
                aria-label={previousPage ? `Back to ${formatPageTitle(previousPage)}` : "Go back"}
              >
                <ArrowLeft className="w-4 h-4 text-blue-600 dark:text-sky-400 group-hover:-translate-x-0.5 transition-transform shrink-0" />
                <span>Back</span>
                {previousPage && previousPage !== "home" && (
                  <span className="hidden sm:inline text-xs font-normal text-slate-400 dark:text-slate-500">
                    to {formatPageTitle(previousPage)}
                  </span>
                )}
              </button>

              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>

              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <button
                  onClick={() => handleSelectPage("home")}
                  className="hover:text-blue-600 dark:hover:text-sky-400 font-medium cursor-pointer transition"
                >
                  Home
                </button>
                {previousPage && previousPage !== "home" && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
                    <button
                      onClick={() => handleSelectPage(previousPage)}
                      className="hover:text-blue-600 dark:hover:text-sky-400 font-medium cursor-pointer transition"
                    >
                      {formatPageTitle(previousPage)}
                    </button>
                  </>
                )}
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
                <span className="text-blue-700 dark:text-sky-400 font-bold capitalize font-mono text-sm truncate">
                  {formatPageTitle(currentPage)}
                </span>
              </div>

              <span className="sm:hidden text-blue-700 dark:text-sky-400 font-bold capitalize font-mono text-xs truncate">
                {formatPageTitle(currentPage)}
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-3.5 shrink-0">
              <button
                onClick={() => setIsContactOpen(true)}
                className="hidden sm:inline text-sm text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 font-medium cursor-pointer"
              >
                Book D365 Consultation
              </button>
              <button
                onClick={() => handleSelectPage("contact")}
                className="px-3.5 sm:px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition cursor-pointer whitespace-nowrap"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                {/* 1. Services Catalog Card */}
                <div
                  onClick={() => handleSelectPage("services")}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 cursor-pointer group text-left overflow-hidden flex flex-col h-full"
                >
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={consultantConsultingImg}
                      alt="Coreenact Microsoft Dynamics 365 Business Central Practice Consultant"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <MicrosoftAppBadge app="business-central" />
                    </div>
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                      <span>D365 & NAV Migrations</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3 shadow-sm">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition">
                        Full-Lifecycle Services
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                        Business Central ERP Consulting, NAV cutovers, India GST localization & 24/7 SLAs.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-bold text-blue-600 dark:text-sky-400">
                      <span>Explore Service Offerings</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </div>
                </div>

                {/* 2. Industry Blueprints Card */}
                <div
                  onClick={() => handleSelectPage("industries")}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 cursor-pointer group text-left overflow-hidden flex flex-col h-full"
                >
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={industryOpsCardImg}
                      alt="Manufacturing and discrete engineering operations with Business Central"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <MicrosoftAppBadge app="power-bi" />
                    </div>
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                      <span>9 Domain Frameworks</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-sm">
                        <Factory className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                        9 Industry Solutions
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                        Manufacturing, FMCG, Retail, EdCore education ERP, and cold-chain supply.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <span>View Industry Modules</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </div>
                </div>

                {/* 3. Digital Marketing Card */}
                <div
                  onClick={() => handleSelectPage("digital-marketing")}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 cursor-pointer group text-left overflow-hidden flex flex-col h-full"
                >
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
                      alt="Coreenact Digital Marketing and Growth Acceleration"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <MicrosoftAppBadge app="customer-insights" />
                    </div>
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                      <span>SEO & Paid ROAS</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-3 shadow-sm">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition">
                        Digital Marketing
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                        Enterprise SEO, Generative Search (GEO), B2B ABM, and Dynamics 365 closed-loop marketing.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-bold text-blue-600 dark:text-sky-400">
                      <span>Explore Growth Services</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </div>
                </div>

                {/* 4. About Coreenact Card */}
                <div
                  onClick={() => handleSelectPage("about")}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300 cursor-pointer group text-left overflow-hidden flex flex-col h-full"
                >
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={globalConsultingTeamImg}
                      alt="Coreenact Microsoft enterprise consulting team in executive session"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <MicrosoftAppBadge app="partner" />
                    </div>
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                      <span>15+ Years NAV Mastery</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-3 shadow-sm">
                        <Info className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
                        About Coreenact
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                        5-phase delivery framework, Microsoft partner competencies, and verified track record.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-bold text-purple-600 dark:text-purple-400">
                      <span>Our Story & Methodology</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </div>
                </div>

                {/* 5. Contact & Hubs Card */}
                <div
                  onClick={() => handleSelectPage("contact")}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all duration-300 cursor-pointer group text-left overflow-hidden flex flex-col h-full"
                >
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                      alt="Coreenact Lead Microsoft Solutions Architect & Global Delivery Hub"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <MicrosoftAppBadge app="azure" />
                    </div>
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                      <span>Delhi & Mississauga</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-3 shadow-sm">
                        <Mail className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                        Contact & Hubs
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                        Direct consultation with certified architects. Offices in New Delhi & Mississauga.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-bold text-amber-600 dark:text-amber-400">
                      <span>Reach Advisory Team</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Enterprise Solutions & EdCore */}
            <SolutionsGrid
              onSelectSolution={() => setIsContactOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
            />

            {/* 3b. Interactive Real Microsoft Technology Stack Showcase */}
            <TechStackShowcase onOpenContact={() => setIsContactOpen(true)} />

            {/* 3c. Business Central Add-on Suite Showcase */}
            <section id="addons" className="py-16 bg-[#040817] text-white border-y border-blue-900/40 relative overflow-hidden">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-sky-300 text-xs font-mono mb-3">
                    <span className="w-2 h-2 bg-[#0078d4] inline-block shadow-xs shadow-blue-500/50" />
                    <span>MICROSOFT DYNAMICS 365 BC EXTENSIONS</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-heading">
                    Business Central Add-on Suite
                  </h2>
                  <p className="text-sm text-slate-300 max-w-xl mx-auto mt-2">
                    Pre-built enterprise add-ons that integrate directly with Business Central to automate workflows, capture approvals, and bridge external channels.
                  </p>
                </div>

                <AddonsListCard
                  onSelectAddon={handleSelectAddon}
                  onOpenConsultation={(addonName) => handleOpenContact(addonName)}
                />
              </div>
            </section>

            {/* 4. Digital Marketing & Growth Acceleration Section */}
            <DigitalMarketingSection
              onOpenContact={handleOpenContact}
            />

            {/* 5. Interactive ROI & 3-Year TCO Calculator */}
            <RoiCalculator
              onOpenContact={(interest) =>
                handleOpenContact(interest || "Dynamics 365 Business Central Licensing & ROI")
              }
            />

            {/* 6. Enterprise Case Studies */}
            <CaseStudies
              onOpenContact={() => setIsContactOpen(true)}
            />

            {/* 7. Global Hubs & Delivery Centers */}
            <GlobalHubs
              onGroundLocation={handleGroundLocation}
              onOpenContact={() => setIsContactOpen(true)}
            />
          </>
        )}

        {currentPage === "digital-marketing" && (
          <div className="pt-8">
            <DigitalMarketingSection
              isStandalonePage={true}
              onBack={handleGoBack}
              onBackHome={handleGoBack}
              onOpenContact={handleOpenContact}
            />
          </div>
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
      />

      {/* Floating Action Button for Add-on Suite */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAddonsDrawerOpen(true)}
          className="p-3 sm:px-4 sm:py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 shadow-md transition-all duration-150 flex items-center gap-3 cursor-pointer border border-slate-700/50 dark:border-slate-200"
          title="Explore Microsoft Dynamics 365 Business Central Add-ons"
        >
          <div className="w-7 h-7 rounded-lg bg-[#005a9e] text-white flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="font-bold text-xs leading-tight flex items-center gap-1.5">
              <span>BC Add-on Suite</span>
              <span className="text-[10px] bg-[#005a9e]/20 text-[#005a9e] dark:bg-blue-100 dark:text-blue-800 px-1.5 py-0.5 rounded font-mono font-medium">
                9 Modules
              </span>
            </div>
            <div className="text-[10px] text-slate-400 dark:text-slate-600 font-mono mt-0.5 leading-none">
              Dynamics 365 BC Extensions
            </div>
          </div>
        </button>
      </div>

      {/* Add-on Detailed Modal */}
      <AddonDetailModal
        addon={selectedAddon}
        isOpen={isAddonDetailOpen}
        onClose={() => {
          setIsAddonDetailOpen(false);
          setSelectedAddon(null);
        }}
        onOpenConsultation={(addonName) => handleOpenContact(addonName)}
      />

      {/* Add-ons Sliding Drawer */}
      <AddonsDrawer
        isOpen={isAddonsDrawerOpen}
        onClose={() => setIsAddonsDrawerOpen(false)}
        onSelectAddon={handleSelectAddon}
        onOpenConsultation={handleOpenContact}
      />

      {/* Contact & Architecture Discovery Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialInterest={contactInterest}
      />
    </div>
  );
}
