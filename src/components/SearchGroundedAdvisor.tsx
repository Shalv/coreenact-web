import React, { useState } from "react";
import Markdown from "react-markdown";
import {
  Search,
  Sparkles,
  ExternalLink,
  Globe2,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface GroundingSource {
  title: string;
  url: string;
}

interface SearchGroundedAdvisorProps {
  context?: "erp" | "marketing";
  onOpenContact?: (interest?: string) => void;
}

const ERP_PRESET_QUERIES = [
  "What are the latest Microsoft Dynamics 365 Business Central release wave features and Copilot updates?",
  "How does real-time India GST e-Invoicing (IRP/NIC) and e-Way bill integration work with Business Central?",
  "Key best practices for migrating legacy Dynamics NAV (C/AL) to Business Central Cloud (AL extensions)",
  "Compare Microsoft Dynamics 365 Business Central Essential vs Premium licensing capabilities",
];

const MARKETING_PRESET_QUERIES = [
  "Latest B2B Generative Engine Optimization (GEO) & AI Overviews SEO strategies for enterprise software",
  "How to connect LinkedIn Ads and Google Ads closed-loop attribution with Microsoft Dynamics 365 CRM",
  "B2B SaaS and manufacturing lead generation benchmarks for high-intent search campaigns",
  "How Microsoft Dynamics 365 Customer Insights automates account-based marketing (ABM) journeys",
];

export const SearchGroundedAdvisor: React.FC<SearchGroundedAdvisorProps> = ({
  context = "erp",
  onOpenContact,
}) => {
  const presets = context === "marketing" ? MARKETING_PRESET_QUERIES : ERP_PRESET_QUERIES;
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    query: string;
    reply: string;
    groundingSources: GroundingSource[];
    searchQueries: string[];
  } | null>(null);

  const handleRunSearch = async (searchText?: string) => {
    const activeQuery = (searchText ?? query).trim();
    if (!activeQuery) return;

    setQuery(activeQuery);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/search-grounding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: activeQuery,
          context,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to retrieve search-grounded insights.");
      }

      setResult({
        query: activeQuery,
        reply: data.reply || "",
        groundingSources: Array.isArray(data.groundingSources) ? data.groundingSources : [],
        searchQueries: Array.isArray(data.searchQueries) ? data.searchQueries : [],
      });
    } catch (err: any) {
      setError(err.message || "Failed to fetch live search-grounded insights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg overflow-hidden text-left">
      {/* Header Bar */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-[#071936] to-slate-900 text-white border-b border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-semibold">
              <Globe2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Live Google Search Grounding</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight font-heading">
              {context === "marketing"
                ? "Real-Time B2B Search & Digital Growth Intelligence"
                : "Live Microsoft Dynamics 365 & Copilot Research Hub"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {context === "marketing"
                ? "Query live Google Search data for up-to-date SEO/GEO trends, B2B ad benchmarks, and Dynamics 365 marketing attribution insights with verified web citations."
                : "Research the latest Microsoft Dynamics 365 Business Central release waves, Copilot capabilities, and statutory compliance updates grounded in live Google Search data."}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-xs font-medium text-sky-200 shrink-0">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Grounded with Google Search Citations</span>
          </div>
        </div>

        {/* Search Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRunSearch();
          }}
          className="mt-6 flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                context === "marketing"
                  ? "Ask about B2B SEO/GEO trends, LinkedIn ABM benchmarks, or D365 attribution..."
                  : "Ask about Business Central release waves, Copilot agents, GST e-Invoicing, or NAV migration..."
              }
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-sky-400 transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-md"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Searching Live Web...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Search & Synthesize</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Preset Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-1">
            Suggested Live Queries:
          </span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleRunSearch(preset)}
              disabled={loading}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-xs text-slate-200 transition cursor-pointer text-left truncate max-w-full sm:max-w-md"
              title={preset}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Results Area */}
      {error && (
        <div className="p-6 bg-rose-50 dark:bg-rose-950/40 border-b border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="p-6 sm:p-8 space-y-6 bg-white dark:bg-slate-900">
          {/* Top Status Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Grounded Synthesis Complete</span>
            </div>
            {result.searchQueries.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Google Search Queries:
                </span>
                {result.searchQueries.slice(0, 3).map((sq, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] border border-slate-200 dark:border-slate-700"
                  >
                    "{sq}"
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Markdown Answer */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed space-y-3">
            <Markdown>{result.reply}</Markdown>
          </div>

          {/* Grounding Citations / Web Sources */}
          {result.groundingSources.length > 0 && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                <span>Verified Google Search Sources & Citations</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {result.groundingSources.map((src, idx) => (
                  <a
                    key={idx}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/70 dark:bg-slate-800/70 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition flex items-center justify-between gap-2 group"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 truncate">
                        {src.title}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {src.url}
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-sky-400 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          {onOpenContact && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Want to discuss how this applies to your organization’s roadmap?
              </span>
              <button
                type="button"
                onClick={() => onOpenContact(`Search Research Follow-up: ${result.query}`)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Schedule Architect Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
