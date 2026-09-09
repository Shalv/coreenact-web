import React, { useState } from "react";
import {
  Sparkles,
  Globe,
  Building2,
  Layers,
  Send,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import Markdown from "react-markdown";
import { KnowledgeSource, GroundingSource } from "../types";

interface CustomerQueryBarProps {
  onOpenChatWithPrompt?: (prompt: string, source: KnowledgeSource) => void;
}

const PRESET_QUERIES = [
  {
    label: "EdCore ERP Features",
    source: "website" as KnowledgeSource,
    query: "What features and modules does EdCore Education ERP provide for schools and universities?",
  },
  {
    label: "5-Phase Implementation",
    source: "website" as KnowledgeSource,
    query: "What are Coreenact's 5 phases for Business Central implementation and deliverables?",
  },
  {
    label: "New D365 Features (Google)",
    source: "google" as KnowledgeSource,
    query: "What are the latest Microsoft Dynamics 365 Business Central 2026 release features and capabilities?",
  },
  {
    label: "India GST & E-Invoicing",
    source: "hybrid" as KnowledgeSource,
    query: "How does Coreenact handle Indian GST e-invoicing and statutory compliance in Business Central?",
  },
  {
    label: "Offices & Contact Info",
    source: "website" as KnowledgeSource,
    query: "Where are Coreenact's offices located in India and Canada, and what are their contact details?",
  },
];

export const CustomerQueryBar: React.FC<CustomerQueryBarProps> = ({
  onOpenChatWithPrompt,
}) => {
  const [source, setSource] = useState<KnowledgeSource>("hybrid");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    query: string;
    reply: string;
    sourceUsed: KnowledgeSource;
    groundingSources: GroundingSource[];
    modelUsed?: string;
    isLocalFallback?: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e?: React.FormEvent, customQuery?: string, customSource?: KnowledgeSource) => {
    if (e) e.preventDefault();
    const queryText = (customQuery || query).trim();
    const activeSource = customSource || source;

    if (!queryText || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/customer-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: queryText,
          source: activeSource,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Error ${res.status}`);
      }

      const data = await res.json();
      setResult({
        query: queryText,
        reply: data.reply,
        sourceUsed: data.sourceUsed || activeSource,
        groundingSources: data.groundingSources || [],
        modelUsed: data.modelUsed,
        isLocalFallback: data.isLocalFallback,
      });
    } catch (err: any) {
      console.error("Customer query failed:", err);
      setError(err.message || "Unable to retrieve answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (item: typeof PRESET_QUERIES[0]) => {
    setQuery(item.query);
    setSource(item.source);
    handleSubmit(undefined, item.query, item.source);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white dark:from-[#0b0f19] dark:to-[#080b12] border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-3.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Free Customer AI Assistance • Non-Chargeable Grounded Search</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Have a Question? Ask Coreenact AI
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Get instant, verified answers grounded in our <span className="font-semibold text-slate-800 dark:text-slate-200">Official Website Content</span> or live from <span className="font-semibold text-slate-800 dark:text-slate-200">Google Search</span> — completely free with zero charges.
          </p>
        </div>

        {/* Query Console Card */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          {/* Source Tabs */}
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Answer From:
              </span>
              <div className="inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setSource("hybrid")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    source === "hybrid"
                      ? "bg-white dark:bg-blue-600 text-blue-700 dark:text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Hybrid (Both)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSource("website")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    source === "website"
                      ? "bg-white dark:bg-blue-600 text-blue-700 dark:text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Website Content</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSource("google")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    source === "google"
                      ? "bg-white dark:bg-blue-600 text-blue-700 dark:text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Live Google Search</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Grounded in real-time</span>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-5">
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  source === "website"
                    ? "Ask about Coreenact ERP services, EdCore, implementation phases, pricing..."
                    : source === "google"
                    ? "Search live Google for Dynamics 365 release notes, updates, ERP comparisons..."
                    : "Ask any customer question (searches both website content and live Google)..."
                }
                disabled={loading}
                className="flex-grow px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-sky-400 transition"
              />
              <button
                type="submit"
                disabled={!query.trim() || loading}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20 shrink-0"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <span>Ask AI</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Quick Sample Queries */}
            <div className="mt-3.5 flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 shrink-0">Popular:</span>
              {PRESET_QUERIES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-slate-700 transition cursor-pointer border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
                >
                  {preset.source === "website" && <Building2 className="w-3 h-3 text-blue-500 shrink-0" />}
                  {preset.source === "google" && <Globe className="w-3 h-3 text-emerald-500 shrink-0" />}
                  {preset.source === "hybrid" && <Layers className="w-3 h-3 text-purple-500 shrink-0" />}
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mx-5 mb-5 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs">
              {error}
            </div>
          )}

          {/* Answer Card */}
          {result && (
            <div className="border-t border-slate-200 dark:border-slate-800 p-5 sm:p-6 bg-slate-50/50 dark:bg-[#0c1222]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-sky-300 border border-blue-200 dark:border-blue-800">
                    {result.sourceUsed === "website" && <Building2 className="w-3 h-3" />}
                    {result.sourceUsed === "google" && <Globe className="w-3 h-3" />}
                    {result.sourceUsed === "hybrid" && <Layers className="w-3 h-3" />}
                    <span className="capitalize">{result.sourceUsed} Grounded Answer</span>
                  </span>

                  {result.isLocalFallback ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold text-blue-700 dark:text-sky-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Knowledge Base</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Free Tier AI Response</span>
                    </span>
                  )}
                </div>

                {onOpenChatWithPrompt && (
                  <button
                    onClick={() => onOpenChatWithPrompt(result.query, result.sourceUsed)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-sky-400 hover:underline cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Continue in Multi-Turn Chat</span>
                  </button>
                )}
              </div>

              {/* Answer Content */}
              <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed markdown-body prose prose-sm dark:prose-invert max-w-none">
                <Markdown>{result.reply}</Markdown>
              </div>

              {/* Citations */}
              {result.groundingSources.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-500" />
                    <span>Google Search Grounding Citations:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.groundingSources.map((src, i) => (
                      <a
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        referrerPolicy="no-referrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-slate-800 text-blue-600 dark:text-sky-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition"
                      >
                        <span className="truncate max-w-[200px]">{src.title || src.url}</span>
                        <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
