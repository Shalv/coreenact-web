import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Copy,
  Check,
  Zap,
  Brain,
  Briefcase,
  AlertCircle,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown,
  Globe,
  Building2,
  Layers,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { ChatMessage, ChatRole, KnowledgeSource } from "../types";

interface GeminiChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string | null;
  initialSource?: KnowledgeSource;
}

interface RoleConfig {
  id: ChatRole;
  title: string;
  taskType: string;
  defaultModel: string;
  icon: React.ElementType;
  badgeColor: string;
  badgeBg: string;
  description: string;
}

const ROLES: RoleConfig[] = [
  {
    id: "consultant",
    title: "General ERP Consultant",
    icon: Briefcase,
    badgeColor: "text-blue-700 dark:text-sky-400",
    badgeBg: "bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800",
    description: "Standard D365 functional guidance, finance, supply chain & India GST localization",
  },
  {
    id: "architect",
    title: "Solutions Architect",
    taskType: "Complex Tasks",
    defaultModel: "gemini-3.1-pro-preview",
    icon: Brain,
    badgeColor: "text-purple-700 dark:text-purple-300",
    badgeBg: "bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800",
    description: "Deep migration architecture, multi-tenant DB migrations, AL development & reasoning",
  },
  {
    id: "fast",
    title: "Rapid Assistant",
    taskType: "Fast Tasks",
    defaultModel: "gemini-3.1-flash-lite",
    icon: Zap,
    badgeColor: "text-amber-700 dark:text-amber-300",
    badgeBg: "bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800",
    description: "Instant lookups, licensing rules, shortcut keys & speedy diagnostics",
  },
  {
    id: "ai_specialist",
    title: "AI & Automation Strategist",
    taskType: "AI & Workflows",
    defaultModel: "gemini-3.8-flash",
    icon: Sparkles,
    badgeColor: "text-emerald-700 dark:text-emerald-300",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800",
    description: "Copilot Studio agents, Power Automate orchestration & predictive models",
  },
];

const QUICK_STARTERS = [
  { text: "What are Coreenact's 5 phases for Business Central implementation?", type: "website" },
  { text: "Tell me about EdCore Education ERP modules & fee billing features", type: "website" },
  { text: "What is the latest Microsoft Dynamics 365 2026 release wave on Google?", type: "google" },
  { text: "How does Business Central handle Indian GST, e-Invoicing & TDS?", type: "hybrid" },
  { text: "Where are Coreenact's delivery centers and how can I contact them?", type: "website" },
];

const STORAGE_KEY = "coreenact_gemini_chat_history_v2";

export const GeminiChatDrawer: React.FC<GeminiChatDrawerProps> = ({
  isOpen,
  onClose,
  initialPrompt,
  initialSource = "hybrid",
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback to initial welcome message
    }
    return [
      {
        id: "welcome-1",
        role: "model",
        content:
          "Welcome to **Coreenact Customer & Enterprise AI**. I can answer any question regarding our services either directly from our **Official Website Content** or live from **Google Search** — completely **free of charge**!\n\n- 🏢 **Website Content**: Explains Coreenact's D365 services, 5 implementation phases, EdCore ERP, Delhi & Canada offices, and pricing.\n- 🌐 **Google Search**: Live web grounding for the newest Dynamics 365 2026 release notes, tax regulations, and technical docs.\n- 🔄 **Hybrid (Both)**: Cross-references both for maximum accuracy.\n\nWhat would you like to ask?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        modelUsed: "gemini-3.8-flash",
        roleUsed: "consultant",
        roleTitle: "Customer & ERP AI Advisor",
        sourceUsed: "hybrid",
      },
    ];
  });

  const [activeRole, setActiveRole] = useState<ChatRole>("consultant");
  const [selectedModel, setSelectedModel] = useState<string>("gemini-3.8-flash");
  const [knowledgeSource, setKnowledgeSource] = useState<KnowledgeSource>(initialSource);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showModelPicker, setShowModelPicker] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync role default model when role changes
  const handleRoleChange = (newRole: ChatRole) => {
    setActiveRole(newRole);
    const target = ROLES.find((r) => r.id === newRole);
    if (target) {
      setSelectedModel(target.defaultModel);
    }
  };

  // Persist messages
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Handle incoming initial prompt
  useEffect(() => {
    if (isOpen && initialPrompt) {
      setInputMessage(initialPrompt);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 300);
    }
  }, [isOpen, initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    setErrorMsg(null);
    setInputMessage("");

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      // Send conversation history to /api/chat with selected knowledgeSource
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          role: activeRole,
          model: selectedModel,
          knowledgeSource,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      const currentRoleObj = ROLES.find((r) => r.id === activeRole);

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "model",
        content: data.reply || "No response received.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        modelUsed: data.modelUsed || selectedModel,
        roleUsed: activeRole,
        roleTitle: data.roleTitle || currentRoleObj?.title || "ERP Consultant",
        sourceUsed: data.knowledgeSourceUsed || knowledgeSource,
        groundingSources: data.groundingSources || [],
        searchQueries: data.searchQueries || [],
        isLocalFallback: data.isLocalFallback || false,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error("Coreenact AI chat error:", err);
      setErrorMsg(err.message || "Failed to reach Coreenact AI service. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Clear conversation history and restart with a fresh thread?")) {
      const resetMsg: ChatMessage = {
        id: `welcome-${Date.now()}`,
        role: "model",
        content:
          "Conversation thread reset. You can ask queries grounded in our **Official Website Content** or live via **Google Search** — completely **free of charge**. How can I help you?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        modelUsed: selectedModel,
        roleUsed: activeRole,
        roleTitle: ROLES.find((r) => r.id === activeRole)?.title || "Customer & ERP AI Advisor",
        sourceUsed: knowledgeSource,
      };
      setMessages([resetMsg]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  const currentRole = ROLES.find((r) => r.id === activeRole) || ROLES[0];
  const CurrentIcon = currentRole.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        />

        {/* Drawer Container */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="w-screen max-w-2xl bg-white dark:bg-[#0b0f19] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-full text-slate-900 dark:text-slate-100"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      Coreenact AI Advisor
                    </h2>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-sky-300 border border-blue-200 dark:border-blue-800">
                      Multi-Turn
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span>Active Model:</span>
                    <span className="font-mono font-semibold text-blue-600 dark:text-sky-400">
                      {selectedModel}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleClearHistory}
                  title="Clear conversation history"
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Knowledge Grounding Selector (Website Content vs Google Search vs Hybrid) */}
            <div className="px-5 py-2.5 bg-slate-100/90 dark:bg-[#0d1322] border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-600 dark:text-slate-400">Grounding Knowledge:</span>
                <div className="inline-flex p-0.5 rounded-xl bg-slate-200/90 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                  <button
                    onClick={() => setKnowledgeSource("hybrid")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                      knowledgeSource === "hybrid"
                        ? "bg-white dark:bg-blue-600 text-blue-700 dark:text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Hybrid (Both)</span>
                  </button>
                  <button
                    onClick={() => setKnowledgeSource("website")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                      knowledgeSource === "website"
                        ? "bg-white dark:bg-blue-600 text-blue-700 dark:text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Website Content</span>
                  </button>
                  <button
                    onClick={() => setKnowledgeSource("google")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                      knowledgeSource === "google"
                        ? "bg-white dark:bg-blue-600 text-blue-700 dark:text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Live Google Search</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Free • Non-Chargeable</span>
              </div>
            </div>

            {/* Role & Task Complexity Selector */}
            <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1424]">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                <span>Specialized System Persona:</span>
                <button
                  onClick={() => setShowModelPicker(!showModelPicker)}
                  className="text-blue-600 dark:text-sky-400 hover:underline flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                >
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>Model Override</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              {/* Roles Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ROLES.map((role) => {
                  const Icon = role.icon;
                  const isSelected = activeRole === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => handleRoleChange(role.id)}
                      className={`p-2 rounded-xl text-left transition border cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-blue-50/80 dark:bg-blue-950/70 border-blue-500 dark:border-sky-400 shadow-2xs"
                          : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon
                          className={`w-3.5 h-3.5 ${
                            isSelected ? "text-blue-600 dark:text-sky-400" : "text-slate-500"
                          }`}
                        />
                        <span
                          className={`text-xs font-bold truncate ${
                            isSelected ? "text-blue-900 dark:text-sky-200" : "text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {role.taskType}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
                        {role.defaultModel.replace("gemini-", "")}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Optional Manual Model Picker Drawer */}
              {showModelPicker && (
                <div className="mt-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Active AI Model Engine:
                  </div>
                  <div className="grid grid-cols-2 gap-2 font-mono">
                    {[
                      { id: "gemini-3.8-flash", desc: "General & Automation (Free Tier)" },
                      { id: "gemini-3.5-flash", desc: "General Tasks & Grounding" },
                      { id: "gemini-3.1-pro-preview", desc: "Complex Tasks (High Reasoning)" },
                      { id: "gemini-3.1-flash-lite", desc: "Fast Tasks (Speed)" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedModel(m.id)}
                        className={`p-2 rounded-lg text-left border transition cursor-pointer ${
                          selectedModel === m.id
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400"
                        }`}
                      >
                        <div className="font-bold text-[11px] truncate">{m.id}</div>
                        <div className="text-[9px] opacity-80 truncate">{m.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Scrollable Conversation Thread */}
            <div
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-5 space-y-5 bg-slate-50/50 dark:bg-[#0b0f19]"
            >
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isUser
                          ? "bg-slate-800 dark:bg-slate-700 text-white"
                          : "bg-blue-600 text-white shadow-xs"
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed relative group ${
                        isUser
                          ? "bg-blue-600 text-white rounded-tr-xs shadow-xs"
                          : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-xs shadow-xs"
                      }`}
                    >
                      {/* Bot Header with Model & Role tag */}
                      {!isUser && (
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-[11px]">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-blue-700 dark:text-sky-400">
                              {msg.roleTitle || "Coreenact AI Advisor"}
                            </span>
                            <span className="text-slate-400 dark:text-slate-600">•</span>
                            <span className="font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">
                              {msg.modelUsed || selectedModel}
                            </span>
                            {msg.sourceUsed && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                {msg.sourceUsed === "website" && <Building2 className="w-2.5 h-2.5" />}
                                {msg.sourceUsed === "google" && <Globe className="w-2.5 h-2.5" />}
                                {msg.sourceUsed === "hybrid" && <Layers className="w-2.5 h-2.5" />}
                                <span className="capitalize">{msg.sourceUsed} Grounded</span>
                              </span>
                            )}
                            {msg.isLocalFallback && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-300 border border-blue-200 dark:border-blue-800">
                                <ShieldCheck className="w-2.5 h-2.5" />
                                <span>Verified KB</span>
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => handleCopyText(msg.id, msg.content)}
                            title="Copy message"
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition cursor-pointer"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}

                      {/* Content Body */}
                      <div className={isUser ? "text-white" : "markdown-body"}>
                        {isUser ? (
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        ) : (
                          <div className="prose prose-sm dark:prose-invert max-w-none text-slate-800 dark:text-slate-200">
                            <Markdown>{msg.content}</Markdown>
                          </div>
                        )}
                      </div>

                      {/* Web Grounding Citations */}
                      {!isUser && msg.groundingSources && msg.groundingSources.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1.5">
                            <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span>Verified Web Grounding Sources (Google Search):</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.groundingSources.map((source, sIdx) => (
                              <a
                                key={sIdx}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                referrerPolicy="no-referrer"
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-blue-700 dark:text-sky-300 border border-blue-200 dark:border-slate-700 transition max-w-xs"
                                title={source.url}
                              >
                                <span className="truncate">{source.title || source.url}</span>
                                <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Timestamp */}
                      <div
                        className={`text-[10px] mt-2 text-right ${
                          isUser ? "text-blue-100/70" : "text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Thinking / Loading Animation */}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 animate-pulse">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-xs p-4 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-sky-400">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>
                        {knowledgeSource === "website" && "Consulting Coreenact website knowledge base..."}
                        {knowledgeSource === "google" && "Searching Google in real time with zero charge..."}
                        {knowledgeSource === "hybrid" && "Cross-referencing website content & Google Search..."}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2.5">
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                      <div
                        className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Error Notice */}
              {errorMsg && (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold">Chat Processing Issue</div>
                    <div>{errorMsg}</div>
                    <button
                      onClick={() => handleSendMessage()}
                      className="mt-1 font-bold underline cursor-pointer"
                    >
                      Retry request
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Prompt Chips */}
            <div className="px-5 py-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-x-auto whitespace-nowrap scrollbar-none">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400 shrink-0">Sample Queries:</span>
                {QUICK_STARTERS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setKnowledgeSource(item.type as KnowledgeSource);
                      handleSendMessage(item.text);
                    }}
                    disabled={isLoading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-sky-300 text-xs transition truncate max-w-xs cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    {item.type === "website" && <Building2 className="w-3 h-3 text-blue-500 shrink-0" />}
                    {item.type === "google" && <Globe className="w-3 h-3 text-emerald-500 shrink-0" />}
                    {item.type === "hybrid" && <Layers className="w-3 h-3 text-purple-500 shrink-0" />}
                    <span className="truncate">{item.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Footer */}
            <div className="p-4 bg-white dark:bg-[#0b0f19] border-t border-slate-200 dark:border-slate-800">
              <div className="relative rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus-within:border-blue-500 dark:focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-blue-500/20 transition">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    knowledgeSource === "website"
                      ? "Ask customer query from Coreenact website content (services, EdCore, pricing, offices)..."
                      : knowledgeSource === "google"
                      ? "Ask customer query to search live Google with real-time web grounding (free)..."
                      : "Ask customer query grounded in website content & Google Search (100% Free)..."
                  }
                  rows={2}
                  disabled={isLoading}
                  className="w-full px-4 pt-3 pb-10 text-sm bg-transparent outline-none resize-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                />

                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                    <span>Source:</span>
                    <span className="font-semibold text-blue-600 dark:text-sky-400 capitalize">
                      {knowledgeSource}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span>Free Tier</span>
                  </div>

                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    <span>Ask AI</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Free Customer AI Query Service (Zero Charges)</span>
                </span>
                <span className="font-mono">Powered by Coreenact AI & Google Grounding</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
