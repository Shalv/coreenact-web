import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Maximize2,
  Minimize2,
  ChevronDown,
  ExternalLink,
  Copy,
  Check,
  Zap,
  Building2,
  Cpu,
  ShieldCheck,
  Calendar,
  Layers,
} from "lucide-react";
import { MicrosoftLogo } from "./icons/MicrosoftIcons";

export type ChatRole = "consultant" | "architect" | "fast" | "ai_specialist";

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
  modelUsed?: string;
  roleTitle?: string;
  groundingSources?: Array<{ title: string; url: string }>;
  isLocalFallback?: boolean;
}

interface GeminiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContactWithSpec?: (specText: string) => void;
  initialRole?: ChatRole;
}

const ROLE_PRESETS: Record<
  ChatRole,
  {
    title: string;
    description: string;
    defaultModel: "gemini-3.1-pro-preview" | "gemini-3.8-flash" | "gemini-3.1-flash-lite";
    modelBadge: string;
    icon: React.ReactNode;
    color: string;
    welcomeMessage: string;
    samplePrompts: string[];
  }
> = {
  architect: {
    title: "Enterprise Solutions Architect",
    description: "Complex migrations, multi-entity ERP topology, and Azure integrations",
    defaultModel: "gemini-3.1-pro-preview",
    modelBadge: "Complex Tasks (gemini-3.1-pro-preview)",
    icon: <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
    color: "from-purple-600 to-indigo-600",
    welcomeMessage:
      "Hello! I am Coreenact's **Principal Enterprise Solutions Architect** powered by **Gemini 3.1 Pro**. I handle complex enterprise roadmaps, legacy Dynamics NAV/AX/GP upgrades to Business Central Cloud SaaS, AL extension architectures, and scalable Azure topologies. How can I assist with your enterprise architecture today?",
    samplePrompts: [
      "How to plan a NAV 2016 C/AL migration to Business Central SaaS?",
      "Design an AL extension architecture for high-volume order APIs",
      "Multi-entity consolidation across India and Canada entities",
    ],
  },
  consultant: {
    title: "D365 Functional Consultant",
    description: "General ERP workflows, inventory, financials, and India GST/e-Invoice",
    defaultModel: "gemini-3.8-flash",
    modelBadge: "General Tasks (gemini-3.8-flash)",
    icon: <Layers className="w-4 h-4 text-blue-600 dark:text-sky-400" />,
    color: "from-blue-600 to-indigo-600",
    welcomeMessage:
      "Welcome! I am Coreenact's **Lead Dynamics 365 Functional Consultant** powered by **Gemini 3.8 Flash**. I assist with standard business workflows, inventory costing, month-end bank reconciliations, and native India statutory localization (GST, e-Invoicing, e-Way bills). What business process would you like to explore?",
    samplePrompts: [
      "How does Indian GST e-Invoicing link with Business Central?",
      "Best practices for multi-location warehouse replenishment",
      "Explain fixed asset depreciation methods in Business Central",
    ],
  },
  fast: {
    title: "Rapid ERP & Licensing Specialist",
    description: "Instant answers for licensing, shortcuts, field rules, and quick diagnostics",
    defaultModel: "gemini-3.1-flash-lite",
    modelBadge: "Fast Tasks (gemini-3.1-flash-lite)",
    icon: <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
    color: "from-amber-500 to-orange-600",
    welcomeMessage:
      "Greetings! I am Coreenact's **Rapid ERP Specialist** powered by **Gemini 3.1 Flash-Lite**. I provide instant, concise answers on Microsoft Dynamics 365 licensing (Essential vs Premium), keyboard shortcuts, field properties, and fast checks. Ask me anything!",
    samplePrompts: [
      "Difference between Business Central Essential and Premium licenses?",
      "Top 10 daily keyboard shortcuts in Business Central web client",
      "What permissions are needed to post a sales invoice in BC?",
    ],
  },
  ai_specialist: {
    title: "AI & Automation Strategist",
    description: "Copilot Studio agents, Power Automate flows, and Azure OpenAI in ERP",
    defaultModel: "gemini-3.8-flash",
    modelBadge: "General Tasks (gemini-3.8-flash)",
    icon: <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
    color: "from-cyan-600 to-blue-600",
    welcomeMessage:
      "Hello! I am Coreenact's **AI & Automation Strategist** powered by **Gemini 3.8 Flash**. I specialize in deploying Microsoft Copilot Studio agents, designing automated Power Automate approval workflows, and grounding AI models in Business Central telemetry. How can we automate your business processes today?",
    samplePrompts: [
      "How to build an autonomous PO approval agent in Copilot Studio?",
      "How does Microsoft Graph grounding protect enterprise ERP data?",
      "Automating vendor AP invoice extraction with AI-OCR",
    ],
  },
};

function getClientKnowledgeAnswer(query: string, roleTitle: string): string {
  const q = (query || "").toLowerCase();

  if (q.includes("5 phase") || q.includes("phase") || q.includes("framework") || q.includes("methodology") || q.includes("delivery")) {
    return `### Coreenact 5-Phase Implementation Framework

Coreenact delivers Microsoft Dynamics 365 Business Central deployments using our structured, milestone-driven **5-Phase Delivery Framework**:

1. **Phase 1: Discover (Weeks 1–3)**
   - Business process mapping and requirements gathering
   - Fit-gap analysis between standard Business Central and business requirements
   - Licensing strategy (Essential vs. Premium vs. Team Member)
   - ROI baseline and preliminary timeline formulation

2. **Phase 2: Design (Weeks 4–7)**
   - Functional Design Specifications (FDS) for all core departments
   - Chart of Accounts (COA) redesign and dimension tagging structure
   - Database schema, table extensions, and security role matrix
   - Data migration strategy for legacy records

3. **Phase 3: Develop (Weeks 8–14)**
   - Clean, event-driven AL extension development (zero base-code modifications)
   - Third-party API integrations (e-invoicing, bank feeds, payment gateways, CRM)
   - ETL scripts for historical master data (Customers, Vendors, Items, Chart of Accounts)
   - Power Platform automation (Power BI analytics, Power Automate approval flows)

4. **Phase 4: Deploy (Weeks 15–18)**
   - User Acceptance Testing (UAT) with real transactional test cases
   - Cutover rehearsal and final master/opening balance migration
   - Parallel test run with legacy systems
   - End-user training workshops and go-live certification

5. **Phase 5: Drive (Post Go-Live)**
   - 30-day hypercare support on-site and remote
   - 24/7 SLA-governed support desk (Level 1, 2, and 3)
   - Semi-annual major release regression testing and continuous optimization`;
  }

  if (q.includes("edcore") || q.includes("education") || q.includes("school") || q.includes("college") || q.includes("university") || q.includes("student") || q.includes("fee")) {
    return `### EdCore Education ERP by Coreenact

**EdCore** is Coreenact's proprietary institutional ERP built natively on Microsoft Dynamics 365 Business Central for schools, colleges, and multi-campus university groups:

- **Student Admissions & Enrollment**: End-to-end applicant tracking, digital form submission, entrance assessment grading, and automated enrollment conversion.
- **Automated Fee Billing & Reconciliation**: Dynamic fee structures (tuition, transport, lab, hostel), online payment gateway integration, automatic fee receipt generation, and real-time bank reconciliation.
- **Timetable & Faculty Scheduling**: Conflict-free classroom allocation, faculty substitute management, and course credit scheduling.
- **Exams, Marks & Grade Sheets**: Continuous assessment tracking, exam hall ticket generation, multi-grading scale support, and automated report card publishing.
- **Biometric & RFID Attendance**: Live student and staff attendance tracking with instant automated SMS/WhatsApp alerts to guardians.
- **GPS Fleet & Transport Tracking**: Real-time school bus tracking, geo-fencing, transport route management, and driver allocation.
- **Digital Library Management**: ISBN barcode cataloging, book issue/return tracking, overdue fine calculation, and OPAC search.`;
  }

  if (q.includes("gst") || q.includes("tax") || q.includes("invoice") || q.includes("invoicing") || q.includes("tds") || q.includes("rcm") || q.includes("e-way") || q.includes("india")) {
    return `### Native India GST & Statutory Localization in Business Central

Coreenact provides full-spectrum localization for Indian tax laws and statutory reporting within Microsoft Dynamics 365 Business Central:

- **Real-Time E-Invoicing**: Direct integration with the Government Invoice Registration Portal (IRP) via NIC / ClearTax APIs to generate Invoice Reference Numbers (IRN) and digitally signed QR codes instantly upon invoice posting.
- **Automated E-Way Bills**: Seamless API generation of E-Way bills from sales shipments and transfer orders without leaving Business Central.
- **Multi-State GST Compliance**: Full handling of IGST, CGST, SGST, and UTGST across multi-warehouse locations and inter-state stock transfers.
- **TDS & TCS Automation**: Automatic Tax Deducted at Source calculation on vendor payments and Tax Collected at Source on receipt thresholds.
- **Reverse Charge Mechanism (RCM)**: Automated self-invoicing and input tax credit management for unregistered vendor transactions.
- **Statutory Reporting**: Pre-formatted GSTR-1, GSTR-3B reconciliation worksheets and audit-ready electronic ledgers.`;
  }

  if (q.includes("nav") || q.includes("gp") || q.includes("migration") || q.includes("upgrade") || q.includes("moderniz") || q.includes("c/al")) {
    return `### Legacy Dynamics NAV & GP to Business Central Cloud Migration

Coreenact specializes in risk-free migrations from legacy on-premise systems (Dynamics NAV 2009–2018, Dynamics GP) to Business Central Cloud SaaS:

- **Automated C/AL to AL Conversion**: Refactoring customized legacy C/AL code into clean, modular AL extensions that preserve your custom business logic without compromising future automatic cloud updates.
- **Clean Data Cleansing & ETL**: Extracting historical General Ledger entries, customer/vendor subledgers, open purchase orders, and inventory valuation with complete audit trails.
- **Hardware & Maintenance Elimination**: Retiring on-premise SQL servers, eliminating costly Windows Server licenses, and gaining Microsoft's 99.9% cloud SLA with automated daily backups.
- **Modern User Experience**: Transforming older desktop interfaces into responsive browser and mobile app workflows accessible anywhere.`;
  }

  if (q.includes("price") || q.includes("pricing") || q.includes("cost") || q.includes("license") || q.includes("licensing") || q.includes("tco") || q.includes("essential") || q.includes("premium")) {
    return `### Microsoft Dynamics 365 Business Central Licensing & Pricing Guide (Not F&O)

Coreenact provides transparent pricing and license optimization specifically for Microsoft Dynamics 365 Business Central (not F&O):

- **Business Central Cloud Essential (₹6,655 per user/month | ~$79 USD)**:
  Includes Financial Management (GL, AP, AR, Fixed Assets), Sales & Order Processing, Purchasing & Payables, Inventory Management & Costing, Multi-currency, Basic CRM, and Project/Job Accounting.
- **Business Central Cloud Premium (₹9,155 per user/month | ~$109 USD)**:
  Includes everything in Essential plus **Manufacturing** (Production Orders, Bill of Materials, Capacity Planning, Routing) and **Service Order Management** (Service contracts, dispatching, warranty tracking).
- **Device License (₹3,780 per device/month | ~$45 USD)**:
  Designed for shared shop-floor terminals, warehouse barcode scanners, and point-of-sale stations.
- **Team Member License (₹665 per user/month | ~$8 USD)**:
  Designed for lightweight users who need read access across the system, timesheet entry, expense reporting, and purchase quote approval.
- **Fresh Implementation & Migration Services**:
  - Fresh Implementation: Milestone-based 5-Phase framework (90-day Turnkey or 45-day Express).
  - Migration from Dynamics NAV / legacy systems: FastTrack 60-day cutover with automated C/AL to AL conversion.`;
  }

  if (q.includes("office") || q.includes("address") || q.includes("contact") || q.includes("location") || q.includes("phone") || q.includes("email") || q.includes("delhi") || q.includes("canada") || q.includes("where")) {
    return `### Coreenact Offices & Contact Information

Connect with our global enterprise advisory teams:

- **Global Delivery Headquarters (India)**:
  - Address: 123-1st Floor, SRS CORPORATE TOWER, NH-19, Sector 31, Faridabad, Haryana 121003
  - Email: **info@coreenact.com**
  - Working Hours: Mon–Fri, 9:00 AM – 6:30 PM IST (24/7 Managed Support available)

- **North America Delivery Hub (Canada)**:
  - Address: 201 City Centre Drive, Suite 700, Mississauga, ON L5B 2T4, Canada
  - Service Hours: Mon–Fri, 9:00 AM – 5:00 PM EST

- **Digital Inquiries & Support**:
  - General Inquiries: **info@coreenact.com**
  - Enterprise Support: **support@coreenact.com**
  - Sales & Architecture Discovery: **sales@coreenact.com**
  - WhatsApp / Direct Line: **+91 84487 96169**
  - Website: [coreenact.com](https://coreenact.com)`;
  }

  return `### Enterprise Guidance from Coreenact Technologies

Thank you for contacting Coreenact Technologies regarding Microsoft Dynamics 365 Business Central.

**Core Capabilities:**
- **Full-Lifecycle ERP Implementation**: Milestone-driven **5-Phase Delivery Framework** (Discover, Design, Develop, Deploy, Drive) ensuring measurable business outcomes.
- **Proprietary Solutions**: **EdCore Education ERP** for multi-campus academic institutions, discrete manufacturing blueprints, and FMCG supply chain engines.
- **Native Localization**: Full compliance with Indian GST, real-time e-invoicing via IRP/NIC, automated E-way bills, TDS, and RCM.
- **Legacy Modernization**: Automated conversion of legacy Dynamics NAV / GP C/AL code into clean, upgrade-safe AL extensions.
- **Global Delivery Reach**: Dual delivery centers in New Delhi, India (HQ) and Mississauga, Canada with 24/7 SLA-governed support.

Connect with our architecture team at **sales@coreenact.com** or call **+91 84487 96169**.`;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  isOpen,
  onClose,
  onOpenContactWithSpec,
  initialRole = "consultant",
}) => {
  const [selectedRole, setSelectedRole] = useState<ChatRole>(initialRole);
  const [selectedModel, setSelectedModel] = useState<string>(
    ROLE_PRESETS[initialRole].defaultModel
  );
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "initial-msg",
      role: "model",
      content: ROLE_PRESETS[initialRole].welcomeMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      modelUsed: ROLE_PRESETS[initialRole].defaultModel,
      roleTitle: ROLE_PRESETS[initialRole].title,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  const handleRoleChange = (newRole: ChatRole) => {
    setSelectedRole(newRole);
    setSelectedModel(ROLE_PRESETS[newRole].defaultModel);
    setShowRoleMenu(false);

    // Append a system notification turn into conversation history
    const switchNotice: ChatMessage = {
      id: `switch-${Date.now()}`,
      role: "model",
      content: `Switched active role to **${ROLE_PRESETS[newRole].title}** (${ROLE_PRESETS[newRole].modelBadge}).\n\n${ROLE_PRESETS[newRole].welcomeMessage}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      modelUsed: ROLE_PRESETS[newRole].defaultModel,
      roleTitle: ROLE_PRESETS[newRole].title,
    };
    setMessages((prev) => [...prev, switchNotice]);
  };

  const handleModelChange = (modelName: "gemini-3.1-pro-preview" | "gemini-3.8-flash" | "gemini-3.1-flash-lite") => {
    setSelectedModel(modelName);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `cleared-${Date.now()}`,
        role: "model",
        content: ROLE_PRESETS[selectedRole].welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        modelUsed: selectedModel,
        roleTitle: ROLE_PRESETS[selectedRole].title,
      },
    ]);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInputValue("");
    setIsLoading(true);

    try {
      // Format messages payload for server-side multi-turn API
      const payloadMessages = updatedHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: payloadMessages,
          role: selectedRole,
          model: selectedModel,
          knowledgeSource: "hybrid",
        }),
      });

      if (!res.ok) {
        throw new Error(`API responded with status ${res.status}`);
      }

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "model",
        content: data.reply || "I am unable to generate a response at this moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        modelUsed: data.modelUsed || selectedModel,
        roleTitle: data.roleTitle || ROLE_PRESETS[selectedRole].title,
        groundingSources: data.groundingSources,
        isLocalFallback: data.isLocalFallback,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.warn("Chat API fallback invoked:", err);
      const fallbackText = getClientKnowledgeAnswer(query, ROLE_PRESETS[selectedRole].title);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "model",
        content: `${fallbackText}\n\n---\n*Coreenact Verified Enterprise Knowledge Base. Connect with our architects via [Schedule Discovery Call](#contact) or call +91 84487 96169.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        modelUsed: "coreenact-enterprise-kb",
        roleTitle: ROLE_PRESETS[selectedRole].title,
        isLocalFallback: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTransferToContact = (msgContent: string) => {
    if (onOpenContactWithSpec) {
      const summary = `Inquiry formulated via Gemini Copilot (${ROLE_PRESETS[selectedRole].title}):\n\n${msgContent.slice(
        0,
        500
      )}...`;
      onOpenContactWithSpec(summary);
      onClose();
    }
  };

  if (!isOpen) return null;

  const currentRoleConfig = ROLE_PRESETS[selectedRole];

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isExpanded
          ? "inset-2 sm:inset-6 md:inset-10"
          : "bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[460px] md:w-[500px] h-[640px] max-h-[90vh]"
      } flex flex-col bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden font-sans`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-4 sm:p-4.5 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shrink-0 ring-1 ring-white/20">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight truncate">
                Coreenact Gemini Copilot
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-sky-200 border border-white/20">
                Multi-Turn
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate">{currentRoleConfig.title}</span>
            </div>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleClearHistory}
            title="Reset conversation thread"
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Collapse to floating window" : "Expand chat window"}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer hidden sm:block"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            title="Close chatbot"
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Role & Model Selector Sub-Bar */}
      <div className="bg-slate-50 dark:bg-slate-950/80 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0 text-xs">
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200 shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-750 transition cursor-pointer"
          >
            {currentRoleConfig.icon}
            <span className="truncate max-w-[170px]">{currentRoleConfig.title}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>

          {/* Role Dropdown Menu */}
          {showRoleMenu && (
            <div className="absolute left-0 top-full mt-1.5 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-30 p-1.5 space-y-1">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Select Specialist Role
              </div>
              {(Object.keys(ROLE_PRESETS) as ChatRole[]).map((roleKey) => {
                const preset = ROLE_PRESETS[roleKey];
                const isActive = selectedRole === roleKey;
                return (
                  <button
                    key={roleKey}
                    onClick={() => handleRoleChange(roleKey)}
                    className={`w-full text-left p-2.5 rounded-lg transition flex items-start gap-2.5 cursor-pointer ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900"
                        : "hover:bg-slate-100 dark:hover:bg-slate-750"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">{preset.icon}</div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center justify-between">
                        <span>{preset.title}</span>
                        {isActive && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {preset.description}
                      </div>
                      <div className="text-[10px] font-mono text-sky-600 dark:text-sky-400 mt-0.5">
                        {preset.modelBadge}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Model Speed / Tier Quick Switcher */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-slate-600 dark:text-slate-400 hidden sm:inline">Model:</span>
          <select
            value={selectedModel}
            onChange={(e) =>
              handleModelChange(
                e.target.value as "gemini-3.1-pro-preview" | "gemini-3.8-flash" | "gemini-3.1-flash-lite"
              )
            }
            className="text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="gemini-3.1-pro-preview">Pro (Complex Tasks)</option>
            <option value="gemini-3.8-flash">Flash (General Tasks)</option>
            <option value="gemini-3.1-flash-lite">Lite (Fast Tasks)</option>
          </select>
        </div>
      </div>

      {/* Messages Scrollable Thread */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-left scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
                  isUser
                    ? "bg-blue-600 text-white"
                    : "bg-gradient-to-br from-indigo-600 to-blue-700 text-white"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble Card */}
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                  isUser
                    ? "bg-blue-600 text-white rounded-tr-xs"
                    : "bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-tl-xs"
                }`}
              >
                {/* Meta details for assistant replies */}
                {!isUser && (
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-200 dark:border-slate-700 text-[10px] text-slate-600 dark:text-slate-400">
                    <span className="font-bold text-blue-700 dark:text-sky-300">
                      {msg.roleTitle || currentRoleConfig.title}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {msg.modelUsed && (
                        <span className="font-mono px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {msg.modelUsed}
                        </span>
                      )}
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                )}

                {/* Markdown Content */}
                <div className={`prose prose-xs sm:prose-sm dark:prose-invert max-w-none break-words ${isUser ? "text-white" : ""}`}>
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                      li: ({ children }) => <li className="leading-snug">{children}</li>,
                      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                      code: ({ children }) => (
                        <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-900 font-mono text-[11px]">
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>

                {/* Grounding Citations */}
                {!isUser && msg.groundingSources && msg.groundingSources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      <span>Verified Knowledge Grounding Sources:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.groundingSources.slice(0, 3).map((source, sIdx) => (
                        <a
                          key={sIdx}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-sky-400 hover:underline"
                        >
                          <span className="truncate max-w-[140px]">{source.title}</span>
                          <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Assistant Footer Actions (Copy / Transfer) */}
                {!isUser && (
                  <div className="mt-3 pt-2 flex items-center justify-between gap-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px]">
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-600 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy spec</span>
                        </>
                      )}
                    </button>

                    {onOpenContactWithSpec && (
                      <button
                        onClick={() => handleTransferToContact(msg.content)}
                        className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-sky-400 hover:text-blue-700 dark:hover:text-sky-300 transition cursor-pointer"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>Schedule Call with Architect</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="rounded-2xl rounded-tl-xs p-3.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>
                {currentRoleConfig.title} is synthesizing response via {selectedModel}...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      {messages.length <= 3 && (
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span>Suggested Questions:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {currentRoleConfig.samplePrompts.map((promptText, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSendMessage(promptText)}
                disabled={isLoading}
                className="text-[11px] text-left px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-sky-300 transition cursor-pointer truncate max-w-full"
              >
                {promptText}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-end gap-2 bg-slate-100 dark:bg-slate-800/90 rounded-2xl p-2 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
          <textarea
            ref={inputRef}
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask ${currentRoleConfig.title}...`}
            className="flex-1 bg-transparent resize-none border-0 focus:outline-none text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 max-h-28 py-1 px-1.5"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className={`p-2.5 rounded-xl font-bold transition flex items-center justify-center shrink-0 cursor-pointer ${
              inputValue.trim() && !isLoading
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:from-blue-700 hover:to-indigo-700"
                : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-400 mt-2 px-1">
          <div className="flex items-center gap-1.5">
            <MicrosoftLogo className="w-3 h-3" />
            <span>Dynamics 365 & Copilot Knowledge Grounded</span>
          </div>
          <span className="font-mono">Shift+Enter for new line</span>
        </div>
      </div>
    </div>
  );
};
