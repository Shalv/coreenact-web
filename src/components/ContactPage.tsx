import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Building,
  Clock,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Send,
} from "lucide-react";
import confetti from "canvas-confetti";
import { COREENACT_CONTACT } from "../data/coreenactData";

interface ContactPageProps {
  onGroundLocation: (cityName: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onGroundLocation,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "Microsoft Dynamics 365 Business Central",
    office: "India (New Delhi)",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#0078D4", "#0284c7", "#4f46e5", "#10b981"],
    });
  };

  return (
    <div className="py-12 sm:py-20 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase">
          <Mail className="w-3.5 h-3.5 text-blue-600" />
          <span>Contact Coreenact</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
          Let’s Build Your{" "}
          <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
            Intelligent Digital Core
          </span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Connect directly with Coreenact’s Microsoft certified solution architects in New Delhi or Mississauga to scope your Dynamics 365 Business Central project, schedule a diagnostic audit, or request a custom proposal.
        </p>
      </div>

      {/* Main Grid: Office Locations on Left, Consultation Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Official Contact & Offices (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Email Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-blue-50/70 border border-blue-200 shadow-xs space-y-3">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Primary Enterprise Email
                </div>
                <a
                  href={`mailto:${COREENACT_CONTACT.email}`}
                  className="text-lg sm:text-xl font-black text-blue-900 hover:text-blue-700 font-mono transition"
                >
                  {COREENACT_CONTACT.email}
                </a>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Inquiries regarding Microsoft Dynamics 365 Business Central, NAV migrations, global rollouts, and custom AI agents are reviewed and answered within 4 business hours.
            </p>
          </div>

          {/* Detailed Office Cards */}
          {COREENACT_CONTACT.offices.map((office) => (
            <div
              key={office.id}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs hover:border-blue-300 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {office.city} Office
                    </h3>
                    <div className="text-xs text-slate-500 font-medium">
                      {office.region}
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 font-mono">
                  {office.badge}
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                  <span className="leading-relaxed">{office.address}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-500 text-xs pl-6">
                  <span className="font-medium">Landmark:</span>
                  <span>{office.landmark}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-500 text-xs pl-6">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{office.timing}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onGroundLocation(office.city)}
                  className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>View Location</span>
                </button>
                <span className="text-xs font-mono text-slate-400">
                  {office.coords.lat.toFixed(2)}°, {office.coords.lng.toFixed(2)}°
                </span>
              </div>
            </div>
          ))}

          {/* Strategic Delivery Centers */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              Core Delivery Hubs & CoE
            </h4>
            <div className="space-y-2.5">
              {COREENACT_CONTACT.deliveryHighlights.map((c, i) => (
                <div
                  key={i}
                  className="text-sm text-slate-700 flex items-start gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                  <div>
                    <span className="font-bold text-slate-900">{c.title} ({c.location}):</span>{" "}
                    <span className="text-slate-600">{c.focus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Consultation & Discovery Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl p-1 bg-gradient-to-br from-blue-100 via-indigo-100 to-slate-200 shadow-md h-full">
            <div className="rounded-[23px] bg-white p-6 sm:p-10 h-full flex flex-col justify-between space-y-6 border border-slate-200">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Architecture & Discovery Form</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Request a Dedicated Consultation
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Tell us about your organization and requirements. Our Microsoft Solutions Practice Leads will analyze your current setup and provide a preliminary Business Central implementation blueprint.
                </p>
              </div>

              {submitted ? (
                <div className="py-16 text-center space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    Discovery Request Received!
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. An executive architect from Coreenact ({formData.office}) has received your inquiry for <span className="font-bold text-blue-700">{formData.service}</span>. We will follow up at <span className="font-mono text-blue-700">{formData.email}</span> within 4 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="sarah@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="Acme Enterprises Ltd."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+1 (555) 000-0000 / +91 ..."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                        Primary Area of Interest
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      >
                        <option value="Microsoft Dynamics 365 Business Central">
                          Dynamics 365 Business Central
                        </option>
                        <option value="Dynamics 365 Finance & Operations">
                          Dynamics 365 Finance & Operations
                        </option>
                        <option value="NAV to Business Central Cloud Migration">
                          NAV to Business Central Cloud Migration
                        </option>
                        <option value="ERP Audit & Health Check">
                          ERP Audit & Health Check
                        </option>
                        <option value="Global ERP Rollouts">
                          Global ERP Rollouts
                        </option>
                        <option value="India Localization & GST Compliance">
                          India Localization & GST Compliance
                        </option>
                        <option value="Continuous 24/7 Managed Services">
                          Continuous 24/7 Managed Services
                        </option>
                        <option value="Copilot & Custom Automation">
                          Copilot & Custom Automation
                        </option>
                        <option value="EdCore Education ERP & LMS">
                          EdCore Education ERP & LMS
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                        Preferred Coreenact Hub
                      </label>
                      <select
                        value={formData.office}
                        onChange={(e) =>
                          setFormData({ ...formData, office: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      >
                        <option value="India (New Delhi)">
                          New Delhi, India (Innov8 Okhla Phase III)
                        </option>
                        <option value="Canada (Mississauga)">
                          Mississauga, Canada (4255 Sherwoodtowne)
                        </option>
                        <option value="Global / Virtual">
                          Global Virtual / Follow-the-Sun
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                      Project Notes & Objectives
                    </label>
                    <textarea
                      rows={4}
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="Share current ERP systems (e.g. Dynamics NAV, SAP, QuickBooks, Tally), user counts, target timeline, or custom integration requirements..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Enterprise Inquiry</span>
                  </button>

                  <div className="text-center text-xs text-slate-500 pt-1">
                    Direct inquiries can also be sent anytime to{" "}
                    <a
                      href={`mailto:${COREENACT_CONTACT.email}`}
                      className="text-blue-600 underline font-mono font-medium"
                    >
                      {COREENACT_CONTACT.email}
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
