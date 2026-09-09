import React from "react";
import {
  Sparkles,
  Building,
  CheckCircle2,
  Award,
  Globe2,
  Compass,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
} from "lucide-react";
import { ABOUT_COREENACT, COREENACT_CONTACT } from "../data/coreenactData";

interface AboutPageProps {
  onOpenContact: () => void;
  onGroundLocation: (cityName: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenContact,
  onGroundLocation,
}) => {
  return (
    <div className="py-12 sm:py-20 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>About Coreenact Solutions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
          Engineered for Enterprise{" "}
          <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
            Certainty & Velocity
          </span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Coreenact is an enterprise consulting and digital engineering firm specializing in Microsoft Dynamics 365 Business Central, cloud transformations, and automated business workflows.
        </p>
      </div>

      {/* Core Company Story & Pillars */}
      <div className="rounded-3xl p-1 bg-gradient-to-br from-blue-100 via-indigo-100 to-slate-200 shadow-md">
        <div className="rounded-[23px] bg-white p-6 sm:p-10 space-y-8 border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                The Coreenact Foundation
              </h2>
              <p className="text-sm text-slate-500">
                ERP consulting, Microsoft Business Central, & Enterprise Automation
              </p>
            </div>
          </div>

          <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
            {ABOUT_COREENACT.story}
          </p>

          {/* Key Differentiators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {ABOUT_COREENACT.pillars.map((pil, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5"
              >
                <div className="flex items-center gap-2 text-blue-700 text-base font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{pil.title}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pil.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5-Phase Implementation Methodology */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Our 5-Phase Delivery Framework
          </h2>
          <p className="text-sm text-slate-600">
            A battle-tested agile methodology designed to prevent scope creep, ensure data integrity, and guarantee on-time cutover.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {ABOUT_COREENACT.methodology.map((m) => (
            <div
              key={m.step}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between space-y-4 shadow-xs group"
            >
              <div>
                <span className="text-3xl font-black text-blue-200 group-hover:text-blue-600 font-mono transition-colors">
                  {m.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2 mb-2">
                  {m.phase}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {m.description}
                </p>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 w-2/3 group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Microsoft Credentials & Global Footprint */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Microsoft Credentials Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Microsoft Solutions Partner
              </h3>
              <p className="text-sm text-slate-500">
                Validated partner competencies across Business Applications & Cloud
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="text-sm font-bold text-blue-700">Dynamics 365</div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Business Central & Finance & Supply Chain certified architects
              </div>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="text-sm font-bold text-indigo-700">Power Platform</div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Power Apps, Power Automate RPA, and Power BI enterprise reporting
              </div>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="text-sm font-bold text-emerald-700">Azure AI & Cloud</div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Azure infrastructure, Copilot Studio, and secure cloud hosting
              </div>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="text-sm font-bold text-amber-700">Security & Trust</div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Microsoft Entra ID, Purview, and zero-trust identity governance
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenContact}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <span>Connect with our Principal Architect</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Hubs Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Global Delivery Footprint
              </h3>
              <p className="text-sm text-slate-500">
                Offices in New Delhi, India and Mississauga, Canada
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {COREENACT_CONTACT.offices.map((office) => (
              <div
                key={office.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-600" />
                    <span>
                      {office.city}, {office.country}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800 font-mono">
                    {office.badge}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{office.address}</p>
                <div className="pt-1.5 flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-mono text-xs">
                    {office.timing}
                  </span>
                  <button
                    onClick={() => onGroundLocation(office.city)}
                    className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 text-sm cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>View Location</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-sm text-slate-600 pt-2 flex items-center gap-2">
            <span>Primary Contact:</span>
            <a
              href={`mailto:${COREENACT_CONTACT.email}`}
              className="text-blue-600 hover:underline font-mono font-bold"
            >
              {COREENACT_CONTACT.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
