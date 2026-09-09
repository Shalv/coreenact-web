import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RefreshCw,
  Copy,
  Check,
  Brain,
  Zap,
  Sliders,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { ChatMessage, ChatRole } from "../types";

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string | null;
}

export const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({
  isOpen,
  onClose,
  initialPrompt,
}) => {
  const [role, setRole] = useState<ChatRole>("architect");
  const [modelType, setModelType] = useState<"fast" | "general" | "complex">("general");
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      role: "model",
      content:
        "Hello! I am Coreenact's Enterprise Copilot AI Assistant. Whether you're exploring a legacy ERP migration to Dynamics 365, building autonomous Copilot agents, or planning an Azure data lakehouse, I can provide technical blueprints, ROI calculations, and implementation timelines. How can I assist your enterprise today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      modelUsed: "gemini-3.5-flash",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  // Map user preference to recommended Gemini models per guidelines:
  // - gemini-3.1-pro-preview for complex tasks
  // - gemini-3.5-flash for general tasks
  // - gemini-3.1-flash-lite for tasks that should happen fast
  const getSelectedModel = () => {
    if (modelType === "complex") return "gemini-3.1-pro-preview";
    if (modelType === "fast") return "gemini-3.1-flash-lite";
    return "gemini-3.5-flash";
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage("");
    setLoading(true);

    try {
      const chosenModel = getSelectedModel();
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          role,
          model: chosenModel,
          enableThinking: modelType === "complex",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate AI response.");

      const aiResponse: ChatMessage = {
        id: "ai-" + Date.now(),
        role: "model",
        content: data.reply || "No response received.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        modelUsed: data.modelUsed || chosenModel,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: "err-" + Date.now(),
        role: "model",
        content:
          "I encountered an issue connecting to the Gemini backend service. Please verify your GEMINI_API_KEY in AI Studio Settings > Secrets.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPrompts = [
    "What is the recommended roadmap to migrate from SAP ECC to Dynamics 365 F&O?",
    "How do we configure autonomous Copilot Studio agents in Business Central?",
    "Calculate estimated ROI for 150 users moving to Dynamics 365.",
    "Explain the difference between Power Automate Cloud flows vs Desktop RPA.",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className={`fixed top-0 right-0 h-full z-50 bg-[#080d22] border-l border-cyan-500/20 shadow-2xl flex flex-col transition-all duration-300 ${
              isExpanded ? "w-full md:w-[720px]" : "w-full md:w-[480px]"
            }`}
          >
            {/* Header with Role & Model Switcher */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center text-slate-950 font-bold shadow-md">
                    <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Coreenact Copilot</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </h3>
                    <p className="text-[10px] text-cyan-300 font-mono">
                      Multi-Turn Enterprise AI Consulting Thread
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition hidden md:block"
                    title={isExpanded ? "Collapse" : "Expand"}
                  >
                    {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[
                  { id: "architect", label: "Enterprise Architect" },
                  { id: "d365", label: "Dynamics 365 Lead" },
                  { id: "copilot", label: "Copilot AI Strategist" },
                  { id: "pricing", label: "ROI & TCO Advisor" },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition ${
                      role === r.id
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                        : "bg-slate-950/40 text-slate-400 hover:text-white"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              {/* Model Speed & Reasoning Tier Selector */}
              <div className="flex items-center justify-between text-[10px] bg-slate-950/60 p-1 rounded-xl border border-white/5">
                <span className="text-slate-400 pl-2 font-medium">Model Speed:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setModelType("fast")}
                    className={`px-2 py-0.5 rounded-lg font-bold transition flex items-center gap-1 ${
                      modelType === "fast"
                        ? "bg-cyan-500 text-slate-950"
                        : "text-slate-400 hover:text-white"
                    }`}
                    title="gemini-3.1-flash-lite for fast tasks"
                  >
                    <Zap className="w-3 h-3" />
                    Fast Lite
                  </button>
                  <button
                    onClick={() => setModelType("general")}
                    className={`px-2 py-0.5 rounded-lg font-bold transition ${
                      modelType === "general"
                        ? "bg-blue-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                    title="gemini-3.5-flash for general tasks"
                  >
                    3.5 Flash
                  </button>
                  <button
                    onClick={() => setModelType("complex")}
                    className={`px-2 py-0.5 rounded-lg font-bold transition flex items-center gap-1 ${
                      modelType === "complex"
                        ? "bg-purple-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                    title="gemini-3.1-pro-preview with high thinking for complex tasks"
                  >
                    <Brain className="w-3 h-3 text-amber-300" />
                    High Thinking
                  </button>
                </div>
              </div>
            </div>

            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-left">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                        isUser
                          ? "bg-cyan-500 text-slate-950 font-bold"
                          : "bg-indigo-600/60 border border-indigo-400/30 text-indigo-200"
                      }`}
                    >
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    <div className={`max-w-[85%] space-y-1 ${isUser ? "items-end text-right" : "items-start text-left"}`}>
                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                          isUser
                            ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md rounded-tr-xs font-medium"
                            : "bg-slate-900/90 border border-white/10 text-slate-200 shadow-sm rounded-tl-xs whitespace-pre-line"
                        }`}
                      >
                        {msg.content}
                      </div>

                      <div className="flex items-center gap-2 px-1 text-[10px] text-slate-500">
                        <span>{msg.timestamp}</span>
                        {msg.modelUsed && (
                          <span className="font-mono text-cyan-400/70">
                            • {msg.modelUsed}
                          </span>
                        )}
                        {!isUser && (
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="hover:text-slate-300 transition flex items-center gap-0.5"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600/40 border border-indigo-400/30 flex items-center justify-center text-xs text-indigo-300">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 text-xs text-cyan-300 flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing enterprise context & generating response...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-white/5 space-y-1.5 text-left">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Suggested Prompts:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((qp, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(qp)}
                      className="px-2.5 py-1 rounded-lg text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 transition text-left truncate max-w-full"
                    >
                      {qp}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Box */}
            <div className="p-4 border-t border-white/10 bg-slate-950/80">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask anything about Dynamics 365, Copilot AI, or Azure..."
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-900 border border-white/15 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs text-white placeholder-slate-500 transition"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !inputMessage.trim()}
                  className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white disabled:opacity-40 hover:opacity-90 transition shadow-lg shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
