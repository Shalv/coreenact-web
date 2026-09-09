import React from "react";
import { motion } from "motion/react";
import { MapPin, Globe2, Building, Compass } from "lucide-react";
import { GLOBAL_OFFICES } from "../data/solutionsData";

interface GlobalHubsProps {
  onGroundLocation: (cityName: string) => void;
  onOpenContact: () => void;
}

export const GlobalHubs: React.FC<GlobalHubsProps> = ({
  onGroundLocation,
  onOpenContact,
}) => {
  return (
    <section id="maps" className="py-24 bg-white border-t border-slate-200/80 relative overflow-hidden text-left">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase">
            <Globe2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Global Microsoft Delivery Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Worldwide Delivery Centers &{" "}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              Microsoft Cloud Hubs
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Dedicated enterprise delivery centers in New Delhi, India and Mississauga, Canada providing 24/7 Microsoft Dynamics 365 Business Central engineering and consulting.
          </p>
        </div>

        {/* Global Hubs Grid (New Delhi & Mississauga) */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {GLOBAL_OFFICES.map((office, idx) => (
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-3xl p-1 bg-gradient-to-br from-blue-100 via-indigo-100 to-slate-200 shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="rounded-[23px] bg-white p-7 sm:p-8 h-full flex flex-col justify-between space-y-6 border border-slate-200 text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                      <Building className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                      {office.country}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {office.city}
                    </h3>
                    <div className="text-sm text-slate-600 flex items-start gap-2 mt-2 leading-relaxed">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Practice Center:
                    </div>
                    <div className="text-sm text-blue-700 font-semibold">
                      {office.specialty}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onGroundLocation(office.city)}
                    className="text-sm font-bold text-blue-600 hover:text-blue-700 transition flex items-center gap-2 group/btn cursor-pointer"
                  >
                    <Compass className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                    <span>View Location</span>
                  </button>
                  <span className="text-xs font-mono text-slate-400">
                    {office.coords.lat.toFixed(2)}°, {office.coords.lng.toFixed(2)}°
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
