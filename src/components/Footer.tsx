import React, { useState, useEffect } from "react";
import {
  MapPin,
  Mail,
  ArrowRight,
  ArrowUp,
  Clock,
  Globe,
  CheckCircle2,
  FileText,
  Calendar,
  ShieldCheck,
  Building2,
  Award,
} from "lucide-react";
import { COREENACT_CONTACT } from "../data/coreenactData";
import { PageType } from "../types";
import { MicrosoftLogo, MicrosoftAppBadge } from "./icons/MicrosoftIcons";

const ADVISOR_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80",
];

interface FooterProps {
  onNavigate?: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [istTime, setIstTime] = useState<string>("");
  const [estTime, setEstTime] = useState<string>("");

  useEffect(() => {
    const updateClocks = () => {
      try {
        const now = new Date();
        setIstTime(
          now.toLocaleTimeString("en-US", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        );
        setEstTime(
          now.toLocaleTimeString("en-US", {
            timeZone: "America/Toronto",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        );
      } catch {
        setIstTime("IST Open");
        setEstTime("EST Open");
      }
    };

    updateClocks();
    const interval = setInterval(updateClocks, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLink = (page: PageType, hash?: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-[#050914] relative text-left text-slate-600 dark:text-slate-300 overflow-hidden">
      {/* Subtle ambient lighting backdrop */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Nested Gradient-Bordered CTA Ribbon */}
        <div className="pt-12 pb-12">
          <div className="rounded-3xl p-[2px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-xl overflow-hidden">
            <div className="rounded-[22px] bg-white dark:bg-[#0c1626] p-7 sm:p-10 lg:p-12 text-slate-900 dark:text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden border border-slate-100 dark:border-transparent">
              {/* Subtle background graphic */}
              <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-80 h-80 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

              <div className="space-y-4 max-w-3xl relative z-10">
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-500/40 text-xs font-bold text-blue-700 dark:text-sky-300 shadow-2xs backdrop-blur-xs">
                    <MicrosoftLogo className="w-4 h-4" />
                    <span>Microsoft Solutions Partner</span>
                    <span className="text-slate-400 dark:text-slate-500">•</span>
                    <span className="text-slate-900 dark:text-white">Dynamics 365 Business Central</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                    <span>Discovery Desk Active</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight font-heading leading-tight">
                  Transform Your Enterprise with Microsoft Dynamics 365 Architecture
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  Connect with our certified solution architects in New Delhi and Mississauga for structured discovery, legacy NAV migration audits, and INR / USD TCO financial modeling.
                </p>

                {/* Team Avatars Credibility Strip */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <div className="flex -space-x-3 items-center">
                    {ADVISOR_AVATARS.map((avatar, idx) => (
                      <img
                        key={idx}
                        src={avatar}
                        alt="Coreenact Microsoft Solution Advisor"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500 shadow-md"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-slate-900 dark:text-white">20+ Enterprise Rollouts</span>
                    <span className="text-slate-500 dark:text-slate-400"> • 100% On-Time Go-Live Track Record</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons & Immediate Calling Options */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0 relative z-10">
                <button
                  onClick={() => handleLink("contact")}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02]"
                >
                  <Calendar className="w-4 h-4 text-cyan-200" />
                  <span>Schedule Architecture Discovery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`mailto:${COREENACT_CONTACT.email}`}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900/90 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition text-center shadow-2xs"
                  title="Direct Enterprise Email Inquiries"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>{COREENACT_CONTACT.email}</span>
                </a>

                <button
                  onClick={() => handleLink("case-studies")}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900/90 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <FileText className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                  <span>Explore Client Case Studies</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Global Delivery Hubs Spotlight */}
        <div className="pb-12 grid grid-cols-1 md:grid-cols-2 gap-5 border-b border-slate-200 dark:border-slate-800/80">
          {/* Hub 1: India Engineering CoE */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-transparent dark:from-blue-600/40 dark:via-cyan-500/20">
            <div className="rounded-[15px] p-5 sm:p-6 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/90 flex flex-col justify-between h-full space-y-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                        India Engineering CoE
                      </h4>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-300 font-mono font-bold border border-blue-200 dark:border-blue-800/60">
                        New Delhi
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                      <span>Local Time: {istTime || "IST"}</span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">Operations Active</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span>{COREENACT_CONTACT.addressIndia}</span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <a
                  href={`mailto:${COREENACT_CONTACT.email}`}
                  className="font-mono font-bold text-blue-600 hover:text-blue-700 dark:text-cyan-300 dark:hover:text-cyan-200 transition flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{COREENACT_CONTACT.email}</span>
                </a>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  AL / C-AL Engineering Center
                </span>
              </div>
            </div>
          </div>

          {/* Hub 2: Canada Americas Hub */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500/30 via-purple-400/20 to-transparent dark:from-indigo-600/40 dark:via-purple-500/20">
            <div className="rounded-[15px] p-5 sm:p-6 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/90 flex flex-col justify-between h-full space-y-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                        Canada Practice Hub
                      </h4>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono font-bold border border-indigo-200 dark:border-indigo-800/60">
                        Ontario
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Local Time: {estTime || "EST"}</span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">Americas Desk Open</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <span>{COREENACT_CONTACT.addressCanada}</span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <a
                  href={`mailto:${COREENACT_CONTACT.email}`}
                  className="font-mono font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200 transition flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{COREENACT_CONTACT.email}</span>
                </a>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  North American Client Advisory
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Column High-Density Directory Grid */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 border-b border-slate-200 dark:border-slate-800/80">
          {/* Col 1: Brand & Practice Identity */}
          <div className="space-y-5 lg:col-span-1">
            <div
              onClick={() => handleLink("home")}
              className="inline-flex cursor-pointer bg-white px-3.5 py-2 rounded-xl items-center shadow-xs hover:opacity-95 transition border border-slate-200 dark:border-white/30"
              title="Coreenact - Microsoft Dynamics 365 Business Central Partner"
            >
              <img
                src="/coreenact-logo-transparent.png"
                alt="Coreenact Solutions"
                className="h-9 w-auto object-contain"
              />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Architecting the intelligent digital core for modern enterprises with Microsoft Dynamics 365 Business Central, cloud ERP migrations, and custom industry add-ons.
            </p>

            {/* Credibility metric pills */}
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="font-extrabold text-blue-600 dark:text-cyan-400 text-sm">20+</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">BC Deployments</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="font-extrabold text-indigo-600 dark:text-indigo-400 text-sm">15+ Yrs</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">NAV Mastery</div>
              </div>
            </div>

            {/* Official Inquiries Card */}
            <a
              href={`mailto:${COREENACT_CONTACT.email}`}
              className="p-3 rounded-xl bg-blue-50/70 hover:bg-blue-100/70 dark:bg-blue-950/30 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-500/20 transition flex items-center gap-3 block text-left group shadow-2xs"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  Official Inquiries
                </div>
                <div className="text-xs font-mono font-bold text-blue-700 dark:text-cyan-300 group-hover:underline truncate">
                  {COREENACT_CONTACT.email}
                </div>
              </div>
            </a>
          </div>

          {/* Col 2: Dynamics 365 Core */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-200 dark:border-slate-800">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                Dynamics 365 Core
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => handleLink("solutions")}
                  className="hover:text-blue-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-blue-600 dark:group-hover:bg-cyan-400 transition" />
                  <span>Business Central Implementation</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("services")}
                  className="hover:text-blue-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-blue-600 dark:group-hover:bg-cyan-400 transition" />
                  <span>Dynamics NAV to Cloud SaaS</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("solutions")}
                  className="hover:text-blue-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-blue-600 dark:group-hover:bg-cyan-400 transition" />
                  <span>Dynamics 365 Finance & Ops</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("solutions")}
                  className="hover:text-blue-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-blue-600 dark:group-hover:bg-cyan-400 transition" />
                  <span>Dynamics 365 CRM & Sales</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("solutions")}
                  className="hover:text-blue-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-blue-600 dark:group-hover:bg-cyan-400 transition" />
                  <span>Microsoft Fabric & OneLake</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("home", "#addons")}
                  className="hover:text-blue-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-blue-600 dark:group-hover:bg-cyan-400 transition" />
                  <span className="flex items-center gap-1.5">
                    <span>BC Add-on Suite</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 font-medium">
                      9 Modules
                    </span>
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Advisory & Services */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-200 dark:border-slate-800">
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                Advisory & Care
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => handleLink("services")}
                  className="hover:text-indigo-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition" />
                  <span>ERP Code & Architecture Audit</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("services")}
                  className="hover:text-indigo-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition" />
                  <span>India GST & e-Invoicing Compliance</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("services")}
                  className="hover:text-indigo-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition" />
                  <span>24/7 Managed Application SLA</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("solutions")}
                  className="hover:text-indigo-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition" />
                  <span>Microsoft Copilot & Agentic AI</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("solutions")}
                  className="hover:text-indigo-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition" />
                  <span>Power Apps & Power Automate</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("services")}
                  className="hover:text-blue-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-blue-600 dark:group-hover:bg-cyan-400 transition" />
                  <span className="flex items-center gap-1.5">
                    <span>B2B Digital Marketing & Growth</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-sky-300 border border-blue-300 dark:border-blue-500/30 font-mono font-medium">
                      New
                    </span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("solutions")}
                  className="hover:text-indigo-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition" />
                  <span>Jet Reports & Executive Dashboards</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Specialized Industries */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-200 dark:border-slate-800">
              <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                Industries
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => handleLink("industries")}
                  className="hover:text-purple-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-purple-600 dark:group-purple-400 transition" />
                  <span>Manufacturing & Supply Chain</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("industries")}
                  className="hover:text-purple-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-purple-600 dark:group-purple-400 transition" />
                  <span>FMCG & Wholesale Distribution</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("industries")}
                  className="hover:text-purple-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-purple-600 dark:group-purple-400 transition" />
                  <span>Retail & Omnichannel Commerce</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("industries")}
                  className="hover:text-purple-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-purple-600 dark:group-purple-400 transition" />
                  <span className="flex items-center gap-1.5">
                    <span>Higher Education & LMS</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30 font-medium">
                      EdCore
                    </span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("industries")}
                  className="hover:text-purple-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-purple-600 dark:group-purple-400 transition" />
                  <span>Professional Services & Projects</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("industries")}
                  className="hover:text-purple-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-purple-600 dark:group-purple-400 transition" />
                  <span>Healthcare & Statutory Labs</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Delivery & Trust Resources */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-200 dark:border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                Delivery & Tools
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => handleLink("about")}
                  className="hover:text-emerald-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-400 transition" />
                  <span>5-Phase Implementation Blueprint</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("home", "#estimator")}
                  className="hover:text-amber-700 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group text-amber-700 dark:text-amber-300/90 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>BC Migration & ROI Estimator</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("case-studies")}
                  className="hover:text-emerald-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-400 transition" />
                  <span>Enterprise Client Case Studies</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("about")}
                  className="hover:text-emerald-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-400 transition" />
                  <span>Certified Microsoft Architecture</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink("contact")}
                  className="hover:text-emerald-600 dark:hover:text-cyan-300 transition text-left cursor-pointer flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-400 transition" />
                  <span>Book In-Person / Virtual Workshop</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Certified Trust & Credentials Bar */}
        <div className="py-6 border-b border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-2xs">
              <MicrosoftLogo className="w-4 h-4" />
              <span className="font-semibold text-slate-900 dark:text-white">Microsoft Solutions Partner Practice</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>NIC GST Portal & e-Invoice Certified</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-2xs">
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>100% Certified Dynamics 365 AL Engineers</span>
            </div>
          </div>

          <div className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
            ISO 27001 & SOC 2 Cloud Security Standards Compliant
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Coreenact Solutions Pvt. Ltd. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-600">•</span>
            <span>New Delhi & Mississauga</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-slate-500 text-xs">
              <button
                onClick={() => handleLink("contact")}
                className="hover:text-slate-900 dark:hover:text-slate-300 transition cursor-pointer"
              >
                Privacy & Data
              </button>
              <span>•</span>
              <button
                onClick={() => handleLink("contact")}
                className="hover:text-slate-900 dark:hover:text-slate-300 transition cursor-pointer"
              >
                Terms of Service
              </button>
              <span>•</span>
              <button
                onClick={() => handleLink("contact")}
                className="hover:text-slate-900 dark:hover:text-slate-300 transition cursor-pointer"
              >
                Support SLA
              </button>
            </div>

            <button
              onClick={scrollToTop}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/80 transition cursor-pointer flex items-center gap-1.5 text-xs group shadow-2xs"
              title="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};


