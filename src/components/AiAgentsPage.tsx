import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Bot,
  Cpu,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Zap,
  Lock,
  Database,
  FileText,
  Workflow,
  ChevronDown,
  ChevronUp,
  Building2,
  Factory,
  GraduationCap,
  Landmark,
  Stethoscope,
  ShoppingBag,
  TrendingUp,
  X,
  Search,
  Check,
  Scale,
  Users,
  Briefcase,
  Code2,
} from "lucide-react";
import { MicrosoftLogo } from "./icons/MicrosoftIcons";

// Official Microsoft Copilot 101 CDN Image Assets
export const COPILOT_101_IMAGES = {
  heroBackground:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/374085-hero-background-1600x616?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=2000&hei=770&qlt=100&fit=constrain",
  heroInsert:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/374085-hero-Insert-752x580?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=734&qlt=100&fmt=png-alpha&fit=constrain",
  overview:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/374085-card-carousel-01-416x178?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  documentCreation:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/374085-card-carousel-02-new-416x178?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  dataAnalysis:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/374085-card-carousel-03-416x178?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  projectManagement:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/374085-card-carousel-04-416x178?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  communication:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/374085-card-carousel-05-416x178?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  presentationDesign:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/374085-card-carousel-06-416x178?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  enterpriseErp:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/374085-card-carousel-07-416x178?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  howAiWorks:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/1073708-how-do-ai-agents-work-feature-card-image?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  typesOfAgents:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/1073708-different-types-of-ai-agents-feature-card-image?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  buildAiAgent:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/1073708-how-to-build-an-ai-agent-feature-card-image?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  autonomousAi:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/414350-autonomous-ai-agents-416x179?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  retailIndustry:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/1073708-ai-agents-and-businesses-feature-card-image?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  financeIndustry:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/1052108-card-thumbnail?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  healthcareIndustry:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/1058580-aI-automation?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  educationIndustry:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/1059323-workflow-automation?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  governmentIndustry:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/1059323-chatbot-builder?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  manufacturingIndustry:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/1073708-ai-for-architecture-feature-card-image?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  gptBuilder:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/1059324-gpt-builder?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  marketingAi:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/1073708-ai-for-marketing-feature-card-image?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
  softwareDevAi:
    "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/1059323-ai-software-development?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1000&hei=429&qlt=100&fit=constrain",
};

// Detailed Topic Interface for Card-Wise Information
export interface CopilotTopicDetail {
  id: string;
  category: "apps" | "architecture" | "agents" | "industries" | "solutions" | "stories";
  badge: string;
  appTitle?: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
  tagline: string;
  summary: string;
  keyCapabilities: string[];
  howItWorks: string[];
  complianceNote?: string;
}

// Full, Card-Wise Detailed Information Mapped from Microsoft Copilot 101
export const COPILOT_TOPIC_DETAILS: CopilotTopicDetail[] = [
  // 1. Word: Document Creation & Editing
  {
    id: "copilot-word-docs",
    category: "apps",
    badge: "Productivity App",
    appTitle: "Microsoft Word",
    title: "Document Creation & Intelligent Editing",
    subtitle: "Draft, rewrite, summarize, and polish documents in seconds",
    imageUrl: COPILOT_101_IMAGES.documentCreation,
    imageAlt: "Professional using Microsoft Copilot in Word for document creation",
    tagline: "Reduces drafting turnaround by up to 70%",
    summary:
      "Microsoft Copilot in Word helps you draft reports, executive proposals, and client emails by generating initial drafts and offering line-by-line editing suggestions so the final result reflects your voice, style, and requirements. It synthesizes multiple internal documents, contracts, and meeting notes into polished deliverables with citations.",
    keyCapabilities: [
      "Generate comprehensive first drafts from simple natural language prompts or existing outlines",
      "Cross-document synthesis: pull data from Excel models, PowerPoint decks, and PDFs directly into a Word document",
      "Adjust tone, structure, and brevity dynamically (professional, concise, persuasive, or casual)",
      "Automated executive summaries and key takeaway callout boxes generated at the top of lengthy memos",
      "Line-by-line grammar, clarity, and phrasing suggestions while preserving domain terminology",
    ],
    howItWorks: [
      "User prompts Copilot with intent and optional reference file links (/filename)",
      "Microsoft Graph checks user permissions and retrieves relevant tenant text",
      "Large language model drafts the content with inline footnote citations",
      "User reviews in side-by-side editing canvas, accepts, tweaks, or regenerates sections",
    ],
    complianceNote: "Subject to Microsoft Purview data loss prevention (DLP) labels; restricted files cannot be referenced without permissions.",
  },

  // 2. Excel: Data Analysis & Formulas
  {
    id: "copilot-excel-data",
    category: "apps",
    badge: "Productivity App",
    appTitle: "Microsoft Excel",
    title: "Data Analysis, Formulas & Python Modeling",
    subtitle: "Explore trends, generate complex formulas, and visualize insights",
    imageUrl: COPILOT_101_IMAGES.dataAnalysis,
    imageAlt: "Analyzing data trends and financial metrics with Copilot in Excel",
    tagline: "Instant formula generation without macro coding",
    summary:
      "In Excel, Microsoft Copilot simplifies complex data analysis by generating formulas, identifying patterns, creating dynamic visualizations, and building PivotTables. Users can ask questions about raw numbers in plain English and receive instant statistical summaries, scenario modeling, and predictive forecasts.",
    keyCapabilities: [
      "Natural language formula generation (XLOOKUP, INDEX/MATCH, SUMIFS, LAMBDA) without memorizing syntax",
      "Automated PivotTable and dynamic chart generation highlighting key variances and trends",
      "Python in Excel integration: run machine learning regressions, cluster analysis, and statistical distributions",
      "Outlier and anomaly detection across tens of thousands of sales, accounting, or inventory rows",
      "Scenario modeling: 'What if gross margin drops by 3% in Q3 due to freight increases?'",
    ],
    howItWorks: [
      "Format raw data as an Excel Table (Ctrl+T) to establish structured boundaries",
      "Submit questions or tasks via the Copilot side panel in plain English",
      "Copilot writes and executes formulas or Python code in a sandboxed Azure environment",
      "Outputs interactive new sheets, summary tables, or formula columns with step-by-step explanations",
    ],
    complianceNote: "Formulas and Python scripts run securely in-memory without exposing tabular rows to public networks.",
  },

  // 3. Teams: Project Management & Meeting Intelligence
  {
    id: "copilot-teams-pm",
    category: "apps",
    badge: "Collaboration & PM",
    appTitle: "Microsoft Teams",
    title: "Project Management & Meeting Action Items",
    subtitle: "Real-time meeting synthesis, consensus tracking, and automated follow-ups",
    imageUrl: COPILOT_101_IMAGES.projectManagement,
    imageAlt: "Team collaboration and meeting synthesis with Microsoft Copilot in Teams",
    tagline: "Zero missed follow-ups from executive meetings",
    summary:
      "With Microsoft Copilot in Teams, tracking tasks and schedules is effortless. Copilot records meetings, transcribes multi-speaker discussions, extracts consensus decisions, and automatically assigns action items with clear ownership. It allows team members to catch up on missed sessions in seconds.",
    keyCapabilities: [
      "Real-time meeting intelligence: ask 'What did David say about the deployment timeline?' during live calls",
      "Post-meeting recap generation: organized by discussion topics, consensus points, and unresolved questions",
      "Automatic task extraction with explicit team member attribution and recommended due dates",
      "Chat and channel thread synthesis: catch up on 50+ messages in a high-velocity project channel in 3 bullet points",
      "Meeting sentiment tracking and question-readiness checks before critical client reviews",
    ],
    howItWorks: [
      "Meeting organizer turns on transcription or recording in Teams call",
      "Copilot parses audio streams in real-time, mapping voiceprints to Entra ID attendee profiles",
      "Semantic summarizer clusters dialogue into decisions, debate topics, and action lists",
      "Meeting recap tab updates automatically, with clickable timestamps linking back to exact video segments",
    ],
    complianceNote: "Transcription permissions honor tenant recording policies and local regulatory privacy consents.",
  },

  // 4. Outlook: Communication & Inbox Summarization
  {
    id: "copilot-outlook-comms",
    category: "apps",
    badge: "Communication",
    appTitle: "Microsoft Outlook",
    title: "Communication & Inbox Summarization",
    subtitle: "Triage high-volume executive inboxes and draft tailored communications",
    imageUrl: COPILOT_101_IMAGES.communication,
    imageAlt: "Summarizing email threads and composing communications with Copilot in Outlook",
    tagline: "Triage high-volume executive inboxes in minutes",
    summary:
      "In Outlook, Microsoft Copilot summarizes key action items from your inbox by topic or sender. It condenses lengthy email threads into structured overviews and drafts replies tailored to your required tone and brevity, helping professionals maintain responsiveness without inbox overload.",
    keyCapabilities: [
      "Summary by Copilot: transform 20-message email chains into 4 clear executive bullet points with cited senders",
      "Draft with Copilot: compose crisp replies based on calendar availability, past emails, and attached files",
      "Tone coaching: get real-time feedback on sentiment, clarity, and professionalism before hitting send",
      "Priority triage: identify high-urgency emails containing client deadlines, payment requests, or escalations",
      "Multilingual translation: interpret incoming client inquiries and generate fluent responses across languages",
    ],
    howItWorks: [
      "User opens an email or thread and clicks 'Summary by Copilot'",
      "Copilot extracts core discussion progression, who agreed to what, and outstanding requests",
      "When drafting, user specifies prompt instructions and desired length (Short / Medium / Long)",
      "Copilot references Exchange calendar and contact context to suggest optimal meeting slots and details",
    ],
    complianceNote: "Protected by Exchange Online encryption and Entra ID tenant boundary controls.",
  },

  // 5. PowerPoint: Presentation Design & Slide Generation
  {
    id: "copilot-powerpoint-design",
    category: "apps",
    badge: "Productivity App",
    appTitle: "Microsoft PowerPoint",
    title: "Presentation Design & Slide Generation",
    subtitle: "Transform documents and ideas into visually compelling decks with speaker notes",
    imageUrl: COPILOT_101_IMAGES.presentationDesign,
    imageAlt: "Creating visually compelling presentation decks with Copilot in PowerPoint",
    tagline: "Turns narrative strategy docs into board-ready decks",
    summary:
      "Copilot in PowerPoint assists in transforming a Word document, meeting notes, or simple natural language prompt into a formatted, visual presentation with AI-driven layout suggestions, images, and speaking notes. It eliminates the friction of blank-canvas presentation building.",
    keyCapabilities: [
      "Convert Word documents into full 10-15 slide presentations complete with structured sections and speaker notes",
      "Add new slides with contextual prompts: 'Add a slide comparing on-premise NAV costs vs Business Central Cloud ROI'",
      "Reorganize slide layouts, visual hierarchy, bullet density, and font pairings with intelligent Designer advice",
      "Automated speaker notes generated for each slide to prepare executives for board presentations",
      "Branded enterprise templates: apply corporate color schemes, fonts, and slide layouts seamlessly",
    ],
    howItWorks: [
      "User clicks 'Create presentation from file' and pastes the SharePoint URL of a Word doc or brief",
      "Copilot structures the narrative into title, problem, solution, architecture, timeline, and ROI sections",
      "Selects high-impact stock photography or AI-generated graphics adhering to the slide layout",
      "Generates presenter talking points inside the Notes pane for every slide",
    ],
    complianceNote: "Generates presentations adhering strictly to enterprise asset libraries and branding guidelines.",
  },

  // 6. Dynamics 365 Business Central: Autonomous ERP Workflows
  {
    id: "copilot-d365-erp",
    category: "apps",
    badge: "Enterprise ERP",
    appTitle: "Dynamics 365 Business Central",
    title: "Autonomous ERP Workflows & Accounting Intelligence",
    subtitle: "Automate reconciliations, sales quotes, and inventory forecasting",
    imageUrl: COPILOT_101_IMAGES.enterpriseErp,
    imageAlt: "Enterprise ERP automation and financial reconciliations with Business Central Copilot",
    tagline: "Coreenact certified implementation & AL extensions",
    summary:
      "Within Dynamics 365 Business Central, Microsoft Copilot automates bank reconciliations, generates marketing text for e-commerce catalogs, suggests sales lines from customer emails, and predicts late customer payments. Coreenact extends these capabilities with custom AL development and external API integrations.",
    keyCapabilities: [
      "Automated Bank Account Reconciliation: matches bank statement transactions with ledger entries using semantic fuzzy logic",
      "AI-Generated Marketing Text: drafts engaging, SEO-optimized item descriptions based on color, size, and material attributes",
      "Sales Line Suggestions: parses customer purchase inquiries and automatically generates sales quote line items",
      "Late Customer Payment Prediction: applies machine learning models to historical payment behaviors to flag cash flow risks",
      "Inventory Replenishment & Purchase Order Suggestions based on sales velocity and lead times",
    ],
    howItWorks: [
      "Business Central events trigger Copilot processes natively inside the ERP client",
      "Bank statement transactions are matched against open customer and vendor ledger entries",
      "Copilot provides confidence scores (High / Medium / Low) with detailed audit rationale",
      "Finance team reviews and posts the batch reconciliation with complete auditability",
    ],
    complianceNote: "Runs entirely within the secure Business Central tenant boundary with full audit logging.",
  },

  // 7. Technology & Architecture: How a Copilot Works
  {
    id: "copilot-architecture-nlp",
    category: "architecture",
    badge: "Core Architecture",
    title: "How a Copilot Uses AI and Machine Learning",
    subtitle: "The orchestration of Natural Language Processing, Machine Learning, and Microsoft Graph",
    imageUrl: COPILOT_101_IMAGES.howAiWorks,
    imageAlt: "How AI agents and Microsoft Copilot work through grounding and orchestration",
    tagline: "Semantic grounding within the enterprise boundary",
    summary:
      "At its core, a copilot brings together two sophisticated technologies: natural language processing and machine learning algorithms, grounded inside the secure boundary of Microsoft Graph. It translates natural language into secure system actions while strictly respecting user permissions.",
    keyCapabilities: [
      "Natural Language Processing (NLP): interprets everyday human language without requiring code or complex query syntax",
      "Machine Learning Algorithms: analyzes operational preferences, role patterns, and historical business workflows",
      "Microsoft Graph Semantic Grounding: retrieves only the files, emails, chats, and records the active user has explicit rights to see",
      "Retrieval-Augmented Generation (RAG): augments foundational LLM prompts with real-time enterprise context before response generation",
      "Responsible AI Safeguards: continuous toxicity filtering, prompt injection detection, and grounded verification",
    ],
    howItWorks: [
      "Step 1 (Pre-processing): User prompt is parsed and sent to Microsoft Graph for semantic indexing and permission check",
      "Step 2 (Grounding): Enterprise facts, files, and recent emails are combined into an augmented prompt payload",
      "Step 3 (LLM Execution): Secure enterprise LLM processes the grounded prompt within Microsoft's cloud boundary",
      "Step 4 (Post-processing): Response is checked against Responsible AI filters and sent back to the application",
    ],
    complianceNote: "Prompts and responses are NEVER used to train public OpenAI or Microsoft models.",
  },

  // 8. Types of AI Agents
  {
    id: "copilot-types-agents",
    category: "agents",
    badge: "AI Evolution",
    title: "Different Types of AI Agents",
    subtitle: "From simple reflex bots to proactive autonomous multi-agent networks",
    imageUrl: COPILOT_101_IMAGES.typesOfAgents,
    imageAlt: "Different types of AI agents across enterprise roles",
    tagline: "Task-specific intelligence tailored to teams",
    summary:
      "From deterministic assistants answering FAQs to proactive autonomous agents executing complex financial audits and inventory replenishment, agents span the spectrum from simple guidance to full autonomous workflow execution. Understanding each category helps businesses deploy the right tool for the job.",
    keyCapabilities: [
      "Simple Reflex Agents: operate on direct condition-action rules for immediate responses without state memory",
      "Model-Based Reflex Agents: maintain an internal world model and track state over time to handle changing conditions",
      "Goal-Based Agents: evaluate multiple paths of action to achieve specific business targets (minimizing freight cost)",
      "Utility-Based Agents: balance trade-offs across speed, expense, and customer satisfaction to optimize outcomes",
      "Learning Agents: continuously refine decision heuristics based on operator feedback and execution logs",
      "Multi-Agent Collaborative Networks: specialized agents delegating sub-tasks across finance, sales, and logistics",
    ],
    howItWorks: [
      "Perception: Sensors and webhooks detect system events or user inputs across enterprise APIs",
      "State Evaluation: Agent compares current state against operational rules and target goals",
      "Deliberation: Decision engine determines optimal sequence of actions using tool plugins",
      "Execution: Commands dispatched to ERP, CRM, or communication channels with audit logging",
    ],
    complianceNote: "All agent actions maintain cryptographic audit logs for SOC 2 and ISO compliance.",
  },

  // 9. Building AI Agents in Copilot Studio
  {
    id: "copilot-build-studio",
    category: "agents",
    badge: "Copilot Studio",
    title: "How to Build an AI Agent in Copilot Studio",
    subtitle: "Low-code to pro-code conversational agent authoring with 1,200+ enterprise connectors",
    imageUrl: COPILOT_101_IMAGES.buildAiAgent,
    imageAlt: "Building custom autonomous agents using Microsoft Copilot Studio",
    tagline: "Connects to 1,200+ enterprise connectors",
    summary:
      "Microsoft Copilot Studio is an end-to-end conversational AI design studio. Coreenact architects connect enterprise databases, Dataverse tables, custom REST APIs, and SharePoint libraries into autonomous agents with customizable triggers, conversation logic, and governance controls.",
    keyCapabilities: [
      "Visual conversation designer: author multi-turn dialog flows with conditional branching and fallback nodes",
      "Generative answers: ground agent responses in live company websites, SharePoint folders, and internal PDFs",
      "Plugin actions: empower agents to call external REST APIs, trigger Power Automate cloud flows, and execute SQL queries",
      "Pre-built enterprise connectors: direct integration with Salesforce, SAP, Dynamics 365, ServiceNow, and Azure SQL",
      "Enterprise security controls: enforce role-based access, Entra ID SSO, and conversational DLP policies",
    ],
    howItWorks: [
      "Step 1: Define agent persona, operational scope, and conversational tone",
      "Step 2: Add knowledge sources (SharePoint document libraries, Azure Cognitive Search indexes)",
      "Step 3: Define topics and triggers with generative AI natural language understanding",
      "Step 4: Attach actions and Power Automate flows for transactional system execution",
      "Step 5: Test in interactive sandbox and publish to Teams, websites, or mobile apps with one click",
    ],
    complianceNote: "Leverages Microsoft Entra ID single sign-on with granular role-based access controls.",
  },

  // 10. Autonomous AI Agents
  {
    id: "copilot-autonomous-ai",
    category: "agents",
    badge: "Next-Gen AI",
    title: "What is Autonomous AI?",
    subtitle: "Proactive event-driven agents that take action independently with human oversight",
    imageUrl: COPILOT_101_IMAGES.autonomousAi,
    imageAlt: "Autonomous AI agents taking action based on real-time business signals",
    tagline: "Continuous operation with human oversight",
    summary:
      "While a copilot works alongside you in response to prompts, autonomous AI agents operate independently to execute multi-step workflows, make decisions based on predefined rules and live data, and monitor business events 24/7. They transform organizations from reactive to predictive operations.",
    keyCapabilities: [
      "Event-driven execution: agents activate automatically upon receiving webhooks, telemetry alerts, or schedule triggers",
      "Multi-step orchestration: breaks high-level objectives into sequential API actions across multiple IT systems",
      "Exception handling & human-in-the-loop: self-heals routine issues but automatically escalates edge cases to managers",
      "Continuous 24/7 telemetry monitoring: watches supply chains, server health, and financial ledgers non-stop",
      "Auditability and guardrails: strict execution boundaries prevent unapproved external transmissions or modifications",
    ],
    howItWorks: [
      "Signal ingestion: IoT sensors or ERP triggers detect a supplier delivery delay",
      "Reasoning & Simulation: Agent computes stock depletion risk and identifies secondary qualified suppliers",
      "Proposal generation: Agent drafts an expedited purchase order and flags variance cost for manager sign-off",
      "Execution: Upon 1-click approval in Teams, agent dispatches the PO to the supplier and updates Business Central",
    ],
    complianceNote: "Configured with strict financial spending thresholds requiring explicit manager approval.",
  },

  // 11. Industry: Retail
  {
    id: "industry-retail",
    category: "industries",
    badge: "Industry Focus",
    title: "Retail & Omnichannel Commerce",
    subtitle: "Optimize stock forecasting, marketing budgets, and store floor schedules",
    imageUrl: COPILOT_101_IMAGES.retailIndustry,
    imageAlt: "Retail operations and customer conversion tracking with Copilot",
    tagline: "Precision stock forecasting & higher basket sizes",
    summary:
      "Retailers use Microsoft Copilot and autonomous agents to optimize marketing budgets, employee shift scheduling, and store revenue with real-time monitoring and predictive data analytics. Personalizing shopping experiences and streamlining product stocking improves customer satisfaction and conversion rates.",
    keyCapabilities: [
      "Dynamic inventory rebalancing across central distribution centers and retail storefronts",
      "Automated e-commerce product catalog descriptions tailored to seasonal search trends and brand voice",
      "Store shift scheduling optimization based on foot traffic footfalls and local weather forecasts",
      "Customer service bot triage resolving order status, shipping inquiries, and return authorizations 24/7",
      "Omnichannel basket analysis identifying cross-selling opportunities in point-of-sale (POS) systems",
    ],
    howItWorks: [
      "Point-of-sale data and online storefront metrics stream into Microsoft Fabric and Business Central",
      "Copilot monitors sales velocity and identifies fast-selling SKUs nearing stock exhaustion",
      "Drafts automated stock transfer requests between distribution hubs and regional stores",
      "Marketing teams generate multi-channel social promotions to move surplus inventory",
    ],
    complianceNote: "Complies with PCI-DSS standards; customer payment card data is never ingested into LLMs.",
  },

  // 12. Industry: Financial Services
  {
    id: "industry-finance",
    category: "industries",
    badge: "Industry Focus",
    title: "Financial Services & Banking",
    subtitle: "Accelerate financial modeling, general ledger variance, and regulatory audits",
    imageUrl: COPILOT_101_IMAGES.financeIndustry,
    imageAlt: "Financial modeling and audit acceleration with Microsoft Copilot",
    tagline: "Automated general ledger & variance reporting",
    summary:
      "Financial institutions use a copilot to automate financial modeling and reporting, speeding up analysis and improving reporting accuracy. Streamlining customer service operations, compliance risk scoring, and investment strategy development increases market share and mitigates compliance risk.",
    keyCapabilities: [
      "Automated financial spreading and covenant calculation from audited customer statements",
      "General ledger variance analysis with narrative explanations of revenue and cost drivers",
      "Anti-Money Laundering (AML) and KYC alert triage highlighting suspicious transaction clusters",
      "Client quarterly investment review summaries generated in seconds from portfolio performance databases",
      "Regulatory audit readiness: instant collation of internal controls and historical transaction lineages",
    ],
    howItWorks: [
      "Copilot connects securely to Core Banking APIs, Dynamics 365 Finance, and Azure SQL data warehouses",
      "Monitors ledger reconciliations and flags unexplained line-item variances exceeding 5%",
      "Synthesizes economic commentaries and market benchmark data for executive risk committees",
      "Generates formatted audit packs with complete cryptographic traceability",
    ],
    complianceNote: "Complies with FINRA, SEC, OSFI, and SOX requirements; tenant isolation guarantees confidentiality.",
  },

  // 13. Industry: Healthcare
  {
    id: "industry-healthcare",
    category: "industries",
    badge: "Industry Focus",
    title: "Healthcare & Clinical Operations",
    subtitle: "Reduce physician administrative burden and optimize workforce shift rosters",
    imageUrl: COPILOT_101_IMAGES.healthcareIndustry,
    imageAlt: "Healthcare collaboration and workforce shift planning with Copilot",
    tagline: "Eliminates administrative physician burnout",
    summary:
      "Hospitals enhance collaboration between care teams, reducing administrative tasks and allowing more focus on patient care. Processes related to clinical trials and workforce shift planning—a major challenge in healthcare—are made efficient through AI data analysis and structured summaries.",
    keyCapabilities: [
      "Clinical documentation summarization: condensing lengthy medical charts and multi-year patient histories",
      "Nurse and clinician workforce shift scheduling optimized against patient acuity and department staffing ratios",
      "Clinical trial participant matching based on inclusion/exclusion criteria and electronic health records",
      "Medical supplies and surgical kit inventory tracking preventing emergency room stockouts",
      "Administrative patient discharge instruction drafting written in patient-friendly, accessible language",
    ],
    howItWorks: [
      "Healthcare data is ingested via FHIR APIs within HIPAA-compliant Azure Health Data Services",
      "Copilot structures multi-provider clinical notes into standardized progress summaries",
      "Staff scheduling agents forecast emergency room influx using historical seasonal data",
      "Discharge paperwork is verified against hospital protocol checklists prior to physician sign-off",
    ],
    complianceNote: "Fully HIPAA, HITECH, and PIPEDA compliant; operates under Microsoft BAA agreement.",
  },

  // 14. Industry: Higher Education
  {
    id: "industry-education",
    category: "industries",
    badge: "Industry Focus",
    title: "Higher Education & Institutions",
    subtitle: "Lesson planning, personalized student support, and EdCore ERP integration",
    imageUrl: COPILOT_101_IMAGES.educationIndustry,
    imageAlt: "Educational administration and curriculum personalization with AI",
    tagline: "EdCore education ERP & student success models",
    summary:
      "Educators streamline lesson planning, assessment creation, and administrative tasks like policy drafting. Automating data analysis helps administrators understand student performance and enrollment trends, freeing faculty to prioritize high-impact teaching and research.",
    keyCapabilities: [
      "Automated syllabus and lesson plan structuring aligned with national curriculum standards",
      "Student early-warning retention scoring analyzing LMS engagement, attendance, and assignment submissions",
      "Institutional policy drafting: university bylaws, safety protocols, and accreditation documentation",
      "Admissions application triage and transcript evaluation across international grading scales",
      "EdCore Education ERP integration: synchronizing student fee billing, financial aid, and campus housing",
    ],
    howItWorks: [
      "Academic data from Microsoft 365 Education, Canvas/Blackboard LMS, and EdCore ERP syncs with Copilot",
      "Faculty interact with Copilot to generate rubrics, reading comprehension quizzes, and study guides",
      "Academic advisors receive automated risk alerts when a student displays signs of academic difficulty",
      "Institutional research teams query multi-year enrollment databases in plain natural language",
    ],
    complianceNote: "Complies with FERPA regulations; individual student grades and identities are protected.",
  },

  // 15. Industry: Government & Public Sector
  {
    id: "industry-government",
    category: "industries",
    badge: "Industry Focus",
    title: "Government & Public Sector",
    subtitle: "Transparent citizen communication, budget tracking, and public policy synthesis",
    imageUrl: COPILOT_101_IMAGES.governmentIndustry,
    imageAlt: "Government department budgeting and public service communication with Copilot",
    tagline: "Transparent public reporting & budget tracking",
    summary:
      "In government, a copilot transforms processes by optimizing budgeting, enhancing communication, and streamlining operations. AI-assisted data analysis helps departments manage budgets effectively, create strategy reports, and draft transparent citizen communications.",
    keyCapabilities: [
      "Public budget allocation modeling and legislative expenditure variance tracking",
      "Citizen service request triage routing 311 municipal inquiries to correct departmental crews",
      "Freedom of Information Act (FOIA) document redaction and search across multi-decade public records",
      "Grant application review assistance scoring proposals against statutory eligibility criteria",
      "Multi-agency regulatory alignment synthesizing federal, provincial/state, and municipal bylaws",
    ],
    howItWorks: [
      "Deployed within Microsoft Cloud for Government (FedRAMP High and state security certified)",
      "Public inquiries are classified by urgency and department through natural language processing",
      "Budget analysts query departmental capital expenditure databases in plain conversational queries",
      "Citizen-facing documents are translated and rephrased into plain language for accessibility",
    ],
    complianceNote: "Compliant with FedRAMP High, CJIS, and sovereign public sector data residency mandates.",
  },

  // 16. Industry: Manufacturing & Supply Chain
  {
    id: "industry-manufacturing",
    category: "industries",
    badge: "Industry Focus",
    title: "Manufacturing & Supply Chain",
    subtitle: "Predictive maintenance, shop-floor synchronization, and supplier contract evaluation",
    imageUrl: COPILOT_101_IMAGES.manufacturingIndustry,
    imageAlt: "Equipment monitoring and predictive maintenance in manufacturing with Copilot",
    tagline: "Downtime reduction & shop-floor synchronization",
    summary:
      "A copilot enhances efficiency in manufacturing by automating complex shop-floor processes, optimizing asset management, predicting machine maintenance needs to reduce unplanned downtime, and evaluating supplier contracts for tight supply chain resilience.",
    keyCapabilities: [
      "Predictive machine maintenance alerts based on IoT vibration, temperature, and cycle time sensors",
      "Dynamic shop-floor scheduling adjusting machine allocations during unexpected equipment downtime",
      "Supplier contract evaluation scoring vendor on-time delivery rates and raw material defect levels",
      "Bill of Materials (BOM) validation and revision tracking across engineering change orders (ECOs)",
      "Safety incident logging and OSHA/ISO regulatory compliance report generation",
    ],
    howItWorks: [
      "IoT edge telemetry streams from manufacturing assets into Azure IoT Hub and Business Central",
      "Machine learning models compare live sensor readings against normal operating baselines",
      "When anomaly thresholds are crossed, Copilot generates an urgent maintenance work order",
      "Parts availability is checked in ERP inventory, drafting purchase orders for missing components",
    ],
    complianceNote: "Conforms to ISO 9001 and ISO 14001 quality and environmental manufacturing standards.",
  },

  // 17. Solutions Library: AI Automation for Modern Business
  {
    id: "solution-ai-automation",
    category: "solutions",
    badge: "Solutions Library",
    title: "AI Automation for Modern Business",
    subtitle: "Synchronize multi-step workflows across ERP, CRM, and cloud platforms",
    imageUrl: COPILOT_101_IMAGES.healthcareIndustry,
    imageAlt: "AI automation tools for modern enterprise systems",
    tagline: "End-to-end process synchronization",
    summary:
      "Deploy intelligent enterprise systems that automate multi-step tasks across ERP, CRM, and cloud platforms without manual human data entry. Coreenact designs interconnected data fabrics that eliminate repetitive copy-pasting between disparate software silos.",
    keyCapabilities: [
      "Elimination of manual double-entry between CRM customer records and Business Central ERP billing",
      "Intelligent document processing: auto-extracting line items from vendor invoices and PDF receipts",
      "Autonomous approval escalations routing high-value transactions based on organizational authority matrices",
      "Cross-platform audit synchronization ensuring data parity between Salesforce, NAV, and D365",
      "Real-time event webhooks triggering customer SMS updates and inventory reservations simultaneously",
    ],
    howItWorks: [
      "System monitors inbound transaction streams across REST APIs and email drop-boxes",
      "AI vision and language models extract structured key-value data with 99%+ accuracy",
      "Business logic validates accounting dimensions, tax jurisdictions, and inventory availability",
      "Direct API commits update destination ERP and CRM tables with full audit traceability",
    ],
    complianceNote: "Full encryption in transit and at rest with zero data sharing outside your corporate tenant.",
  },

  // 18. Solutions Library: Workflow Automation Tools
  {
    id: "solution-workflow-tools",
    category: "solutions",
    badge: "Solutions Library",
    title: "Workflow Automation Tools & Power Platform",
    subtitle: "Integrate Power Automate and Microsoft Copilot to orchestrate enterprise approvals",
    imageUrl: COPILOT_101_IMAGES.educationIndustry,
    imageAlt: "Workflow automation tools building smarter systems",
    tagline: "Seamless Power Platform integration",
    summary:
      "Integrate Power Automate and Microsoft Copilot to orchestrate document approvals, purchase order triggers, and ERP posting validations. Users can build sophisticated workflows using plain conversational English prompts.",
    keyCapabilities: [
      "Natural language flow authoring: describe your business workflow in plain words and Copilot constructs the logic",
      "Interactive Adaptive Cards in Teams allowing managers to approve purchase orders directly from chat",
      "Automated fallback handling with conditional branches and error notification webhooks",
      "Cloud and desktop Robotic Process Automation (RPA) bridging modern APIs with legacy green-screen systems",
      "Centralized Power Platform governance monitoring run health, execution costs, and security compliance",
    ],
    howItWorks: [
      "Citizen developer or IT architect enters desired workflow logic into Copilot prompt box",
      "Power Automate synthesizes connectors, conditional checks, loops, and approval actions",
      "Developer validates test runs using sample payload data in the visual canvas",
      "Deploys flow to production with automated telemetry tracking execution duration and success rates",
    ],
    complianceNote: "Subject to Microsoft Data Loss Prevention (DLP) connector blocking policies.",
  },

  // 19. Solutions Library: Transform Operations with GPT Builders
  {
    id: "solution-gpt-builder",
    category: "solutions",
    badge: "Solutions Library",
    title: "Transform Operations with GPT Builders",
    subtitle: "Create custom organizational GPTs tailored to internal SOPs and product manuals",
    imageUrl: COPILOT_101_IMAGES.gptBuilder,
    imageAlt: "Transforming operations with GPT and chatbot builders",
    tagline: "Low-code domain customization",
    summary:
      "Create custom GPT agents tailored to your organization's internal standard operating procedures, HR guidelines, and product documentation. Coreenact helps businesses train and ground domain-specific assistants that answer employee questions with authoritative accuracy.",
    keyCapabilities: [
      "Domain-specific knowledge curation: upload proprietary PDF manuals, CAD specifications, and corporate handbooks",
      "Tailored system instructions defining exact persona, tone, prohibited topics, and formatting requirements",
      "Private organizational catalog sharing: publish custom GPTs to specific teams or the entire enterprise",
      "Continuous prompt alignment: testing tools to benchmark accuracy and eliminate hallucinated answers",
      "Seamless integration with Microsoft 365 Copilot chat interface for unified employee access",
    ],
    howItWorks: [
      "Administrators define the specialized GPT's objective and tone in Copilot Studio / Azure OpenAI",
      "Grounding documents are indexed with vector embeddings within private cognitive search clusters",
      "Employees query the custom assistant through web browsers, Teams, or the Microsoft 365 Copilot sidebar",
      "Every response cites exact page numbers and document titles from internal company files",
    ],
    complianceNote: "All vector embeddings and retrieved documents remain strictly isolated within your tenant.",
  },

  // 20. Solutions Library: Streamline Campaigns with AI Marketing
  {
    id: "solution-ai-marketing",
    category: "solutions",
    badge: "Solutions Library",
    title: "Streamline Campaigns with AI Marketing",
    subtitle: "Generate multi-channel ad copy, segment high-intent accounts, and optimize ROAS",
    imageUrl: COPILOT_101_IMAGES.marketingAi,
    imageAlt: "Streamline campaigns with AI marketing tools",
    tagline: "Data-driven audience segmentation",
    summary:
      "Generate multi-channel ad copy, segment high-intent accounts, and optimize omnichannel ROAS using Dynamics 365 Customer Insights. Copilot helps marketing leaders build cohesive multi-touch customer journeys grounded in transactional customer purchasing histories.",
    keyCapabilities: [
      "Natural language customer segmentation: 'Find B2B wholesale buyers who purchased in Q1 but have not placed an order in 60 days'",
      "Multi-variant email campaign copy generation optimized for high open rates and specific industry personas",
      "Omnichannel content repurposing: turn a technical whitepaper into 5 LinkedIn posts, a newsletter, and an executive abstract",
      "Predictive customer churn scoring flagging at-risk corporate accounts before contract renewals",
      "Real-time marketing attribution modeling connecting ad clicks directly to ERP closed-won sales revenue",
    ],
    howItWorks: [
      "Customer demographic, behavioral, and transactional ERP data streams into Dynamics 365 Customer Insights",
      "Copilot suggests micro-segments based on purchasing frequency and lifetime customer value (LTV)",
      "Marketing copy is drafted and refined using brand tone controls",
      "Journeys execute automatically across email, social, SMS, and account executive tasks",
    ],
    complianceNote: "Honors global consent management policies (GDPR, CASL, CAN-SPAM) automatically.",
  },

  // 21. Solutions Library: AI in Software & AL Development
  {
    id: "solution-ai-software",
    category: "solutions",
    badge: "Solutions Library",
    title: "AI in Software & ERP AL Development",
    subtitle: "Accelerate AL code generation for Dynamics 365 Business Central extensions",
    imageUrl: COPILOT_101_IMAGES.softwareDevAi,
    imageAlt: "Accelerate innovation with AI in software development",
    tagline: "Clean, upgrade-safe AL architecture",
    summary:
      "Accelerate AL code generation for Dynamics 365 Business Central extensions, automated unit tests, and API integration scaffolding. Coreenact developers utilize GitHub Copilot and custom code models to deliver clean, upgrade-safe AL customizations faster.",
    keyCapabilities: [
      "Automated AL table, page, codeunit, and report extension scaffolding from database schemas",
      "Intelligent code completion suggesting clean AL design patterns (clean event publishers and subscribers)",
      "Automated test codeunit generation verifying business logic against Microsoft test libraries",
      "Legacy C/AL to modern AL code refactoring assisting during NAV-to-BC cloud cutovers",
      "API integration wrapper generation for connecting Business Central with Shopify, Magento, and custom REST APIs",
    ],
    howItWorks: [
      "Developer describes required business functionality in AL code comments or prompts",
      "AI suggests syntactically valid AL code adhering to Microsoft's latest AppSource validation rules",
      "Unit tests are generated alongside business logic to guarantee upgrade resilience",
      "Code is reviewed by senior Coreenact architects before CI/CD deployment via Azure DevOps",
    ],
    complianceNote: "Code is verified with Microsoft CodeCop, UICop, and PerTenantExtensionCop analyzers.",
  },

  // 22. Solutions Library: AI in Architecture & Complex Projects
  {
    id: "solution-ai-architecture",
    category: "solutions",
    badge: "Solutions Library",
    title: "AI in Architecture & Complex Projects",
    subtitle: "Streamline project specifications, asset tracking, and multi-entity compliance",
    imageUrl: COPILOT_101_IMAGES.manufacturingIndustry,
    imageAlt: "Using AI to streamline architecture processes and projects",
    tagline: "Precision lifecycle tracking",
    summary:
      "Streamline project specifications, asset tracking, bill of materials (BOM) validation, and multi-entity regulatory compliance. Complex architectural, engineering, and construction projects benefit from automated compliance checks and document synthesis.",
    keyCapabilities: [
      "Automated building code and zoning specification compliance verification across hundreds of pages",
      "BIM asset metadata extraction linking building drawings with ERP procurement schedules",
      "Subcontractor quote comparison highlighting deviations from architectural engineering specifications",
      "Project change order risk modeling predicting schedule impact and budget overruns",
      "Multi-entity consolidated job-cost accounting across joint-venture construction partnerships",
    ],
    howItWorks: [
      "Architectural blueprints, specification PDFs, and project schedules ingest into Microsoft Graph",
      "Copilot extracts material requirements and compares them against procurement inventory lead times",
      "Project managers receive early-warning notifications regarding potential supply chain shortages",
      "Automated change order memos are generated for client sign-off with detailed cost breakdowns",
    ],
    complianceNote: "Maintains full document confidentiality with sovereign Azure cloud project security.",
  },
];

// Official Related Stories from Microsoft Copilot 101 Hub
export const COPILOT_RELATED_STORIES: CopilotTopicDetail[] = [
  {
    id: "story-sales-ai",
    category: "stories",
    badge: "Business AI",
    appTitle: "Copilot for Sales",
    title: "AI in Sales: Tools, Workflows & Best Practices",
    subtitle: "Streamline pipelines, personalize customer interactions, and close deals faster with Microsoft Copilot for Sales",
    imageUrl: COPILOT_101_IMAGES.financeIndustry,
    imageAlt: "Sales professionals analyzing pipeline intelligence and customer meetings with Copilot for Sales",
    tagline: "CRM & Pipeline Automation",
    summary:
      "Microsoft Copilot for Sales connects Microsoft 365 apps with CRM systems like Dynamics 365 Sales and Salesforce. Sales professionals use Copilot to generate pre-meeting customer briefs, extract buying signals from email conversations, automate follow-up action items, and create customized pitch presentations in minutes.",
    keyCapabilities: [
      "Pre-meeting intelligence dossiers synthesized automatically from CRM histories, recent emails, and shared documents",
      "Real-time meeting recaps in Teams capturing customer objections, competitor mentions, and pricing feedback",
      "Automated sales proposals and email follow-ups drafted with personalized tone and customer-specific product details",
      "Instant CRM update synchronization from Outlook and Teams eliminating hours of manual data entry",
    ],
    howItWorks: [
      "Connects securely to Microsoft Dynamics 365 Sales or Salesforce via Microsoft Graph connectors",
      "Aggregates account history, active opportunities, and past email interactions into an executive brief",
      "Generates meeting action items with recommended next steps based on historical deal win patterns",
      "One-click approval updates opportunity stages, contact roles, and forecasted revenue in CRM",
    ],
    complianceNote: "Maintains strict commercial data protection; client CRM records are never shared with public foundational AI models.",
  },
  {
    id: "story-legal-ai",
    category: "stories",
    badge: "Legal & Compliance",
    appTitle: "Legal Operations",
    title: "AI for Legal Research: Tools and Best Practices",
    subtitle: "Accelerate statutory analysis, automate contract reviews, and ensure regulatory compliance",
    imageUrl: COPILOT_101_IMAGES.governmentIndustry,
    imageAlt: "Legal professionals conducting statutory research and contract review with Copilot",
    tagline: "Regulatory & Contract Precision",
    summary:
      "Legal professionals utilize AI tools powered by natural language processing and large language models to query vast volumes of case law, identify high-risk clause deviations in commercial contracts, validate citations across jurisdictions, and draft initial legal briefs while maintaining strict attorney supervision.",
    keyCapabilities: [
      "Plain-language statutory and case law search scanning primary legal sources and multi-decade precedents",
      "Automated contract review and deviation risk scoring comparing vendor agreements against corporate gold standards",
      "Instant citation validation and cross-jurisdictional precedent analysis ensuring accuracy in filings",
      "Assisted legal brief and memorandum drafting synthesizing complex facts into structured arguments",
    ],
    howItWorks: [
      "Legal team uploads contracts or briefs into private tenant-secured SharePoint repository",
      "Natural language queries scan document text against statutory databases and internal compliance checklists",
      "Copilot highlights non-standard indemnification clauses and liability caps with proposed fallback language",
      "Attorney verifies citations and reasoning before final execution or court filing",
    ],
    complianceNote: "Protected by attorney-client privilege security boundaries; data is isolated in sovereign cloud tenants.",
  },
  {
    id: "story-hr-ai",
    category: "stories",
    badge: "Human Resources",
    appTitle: "People & Talent",
    title: "Transform Human Resources with the AI Advantage",
    subtitle: "Elevate employee experience, streamline recruitment, and automate administrative tasks",
    imageUrl: COPILOT_101_IMAGES.educationIndustry,
    imageAlt: "Human resources teams streamlining employee onboarding and talent matching with AI",
    tagline: "Talent Acquisition & Employee Care",
    summary:
      "Modern human resource departments use AI to automate routine operational tasks, from initial resume screening to drafting personalized onboarding journeys and 24/7 internal policy assistants. Predictive workforce analytics surface early-warning signals for employee disengagement, helping HR leaders improve team retention.",
    keyCapabilities: [
      "Automated candidate skill matching and interview scheduling eliminating weeks from the hiring cycle",
      "24/7 employee self-service policy assistant in Teams answering PTO, benefits, and payroll questions instantly",
      "Personalized onboarding curriculum generation tailoring training modules to new hire roles and competencies",
      "Predictive employee retention insights identifying burnout risks and disengagement patterns across teams",
    ],
    howItWorks: [
      "HR knowledge base, job descriptions, and employee handbook PDFs are indexed into Copilot Studio",
      "Recruitment agents evaluate inbound applicant qualifications against required skill matrices without bias",
      "Employees query the Teams HR assistant for instant confidential answers to benefits questions",
      "HR business partners receive aggregate department engagement trends for proactive workforce planning",
    ],
    complianceNote: "Complies with EEOC guidelines and privacy regulations; personal employee health data is strictly segregated.",
  },
  {
    id: "story-marketing-ai",
    category: "stories",
    badge: "Business AI",
    appTitle: "Customer Insights",
    title: "Streamline Marketing Campaigns with AI Tools",
    subtitle: "Build data-driven audience segments, create multi-channel copy, and maximize ROAS",
    imageUrl: COPILOT_101_IMAGES.marketingAi,
    imageAlt: "Marketing team developing targeted campaigns and customer segmentation using Copilot",
    tagline: "Omnichannel Growth & Attribution",
    summary:
      "Marketing teams leverage AI in Dynamics 365 Customer Insights to analyze cross-channel consumer behavior, generate multi-variant ad copy, personalize email nurturing flows, and connect campaign metrics directly to revenue in real-time.",
    keyCapabilities: [
      "Natural language customer segmentation identifying high-intent accounts and lapsed buyers dynamically",
      "Multi-channel copy generation for email nurture tracks, social media posts, and digital ad headlines",
      "Real-time attribution modeling linking marketing campaign touches directly to closed ERP sales revenue",
      "Automated content reformatting turning long-form technical whitepapers into digestible multi-part campaigns",
    ],
    howItWorks: [
      "Transactional purchase history from Business Central and web behavioral data sync into Customer Insights",
      "Marketing lead queries customer database in conversational English to generate targeted audience lists",
      "Copilot drafts brand-consistent copy variants with customized tones for different customer personas",
      "Campaign launches across digital channels with real-time performance telemetry tracking conversion lift",
    ],
    complianceNote: "Enforces global privacy compliance (GDPR, CASL, CAN-SPAM) and honors customer unsubscribe preferences.",
  },
  {
    id: "story-architecture-ai",
    category: "stories",
    badge: "Architecture & Engineering",
    appTitle: "Design & Construction",
    title: "AI in Architecture: Streamlining Projects & Lifecycles",
    subtitle: "Improve design workflows, verify zoning specifications, and coordinate project schedules",
    imageUrl: COPILOT_101_IMAGES.manufacturingIndustry,
    imageAlt: "Architects reviewing building information modeling data and structural compliance with Copilot",
    tagline: "BIM Integration & Code Compliance",
    summary:
      "Architects and construction engineering firms use Copilot to analyze building codes, match building information modeling (BIM) data with ERP procurement schedules, evaluate subcontractor bid variances, and predict project delay risks across multi-stakeholder builds.",
    keyCapabilities: [
      "Automated building code and zoning specification compliance checks across municipal regulation libraries",
      "BIM metadata synchronization linking 3D structural drawings with procurement lead times and inventory",
      "Subcontractor quote comparison matrices highlighting pricing anomalies and material exclusions",
      "Predictive project delay modeling identifying critical path risks before construction milestones are missed",
    ],
    howItWorks: [
      "Architectural blueprints, municipal bylaws, and engineering specifications are indexed into Microsoft Graph",
      "Copilot scans specification drafts to detect conflicting structural or environmental standards",
      "Subcontractor bid documents are parsed to generate line-item comparison sheets against engineering budgets",
      "Project directors receive automated change order risk briefings prior to signing owner-contractor agreements",
    ],
    complianceNote: "Secure document isolation ensures proprietary structural blueprints and bids remain strictly confidential.",
  },
  {
    id: "story-agent-types",
    category: "stories",
    badge: "Agent Technology",
    appTitle: "Agent Architectures",
    title: "Understanding Types of AI Agents",
    subtitle: "A foundational guide to how autonomous agents perceive, reason, and act across enterprise systems",
    imageUrl: COPILOT_101_IMAGES.typesOfAgents,
    imageAlt: "Infographic of different autonomous AI agent architectures and reasoning patterns",
    tagline: "From Reflex to Multi-Agent Swarms",
    summary:
      "Explore the architectural spectrum of AI agents—from deterministic simple reflex bots that trigger on threshold alerts to goal-based and utility-based agents that balance complex business trade-offs, and multi-agent systems that coordinate across departments without human intervention.",
    keyCapabilities: [
      "Simple reflex agents executing immediate condition-action rules for fast operational alerting",
      "Model-based agents tracking internal state over time to navigate evolving business environments",
      "Goal-based planners evaluating multi-step action sequences to reach defined strategic milestones",
      "Multi-agent collaborative networks where specialized agents exchange telemetry and delegate tasks",
    ],
    howItWorks: [
      "Perception layer gathers telemetry from APIs, database change logs, and scheduled system triggers",
      "Reasoning engine evaluates current state against predefined operational policies and goal parameters",
      "Action orchestrator dispatches API calls to ERP, CRM, or notification services with complete auditability",
      "Feedback loop captures operator decisions to continuously optimize future autonomous actions",
    ],
    complianceNote: "Autonomous agents operate within strict role-based boundaries with human-in-the-loop escalation controls.",
  },
  {
    id: "story-chatbots-explained",
    category: "stories",
    badge: "Agent Technology",
    appTitle: "Conversational AI",
    title: "What Are AI Chatbots and How Do They Work?",
    subtitle: "The evolution from rigid rule-based decision trees to generative, context-aware conversational AI",
    imageUrl: COPILOT_101_IMAGES.overview,
    imageAlt: "User interacting with a modern conversational AI chatbot on desktop and mobile devices",
    tagline: "Generative Conversational AI",
    summary:
      "Examining how modern generative AI chatbots utilize natural language understanding (NLU), large language models, and enterprise retrieval-augmented generation (RAG) to maintain conversational memory, understand multi-sentence intent, and execute secure transactional system updates.",
    keyCapabilities: [
      "Natural language understanding (NLU) parsing colloquial phrasing, idioms, and multi-part questions effortlessly",
      "Retrieval-Augmented Generation (RAG) grounding answers exclusively in corporate files and databases",
      "Multi-turn context retention carrying conversation history and user preferences throughout the session",
      "Secure tool integration enabling bots to trigger system workflows, not just answer questions",
    ],
    howItWorks: [
      "User input is analyzed for intent and key entity parameters using natural language models",
      "Semantic search retrieves verified facts from private enterprise repositories",
      "Conversational model synthesizes a fluent, accurate answer citing internal source documentation",
      "Optional action nodes trigger backend system updates when the user confirms their intent",
    ],
    complianceNote: "Corporate data is processed in memory and never retained for foundational public model training.",
  },
  {
    id: "story-build-chatbot",
    category: "stories",
    badge: "Agent Technology",
    appTitle: "Copilot Studio Guide",
    title: "How to Build an AI Chatbot with Copilot Studio",
    subtitle: "A step-by-step guide to authoring custom generative AI assistants with zero code",
    imageUrl: COPILOT_101_IMAGES.buildAiAgent,
    imageAlt: "Developer designing conversational dialog nodes in Microsoft Copilot Studio visual builder",
    tagline: "Low-Code Conversational Authoring",
    summary:
      "A practical architectural guide covering how to design, test, and publish enterprise chatbots in Microsoft Copilot Studio. From selecting knowledge sources (SharePoint, Azure Cognitive Search, custom websites) to configuring Power Automate flow plugins and deploying to Microsoft Teams and web portals.",
    keyCapabilities: [
      "Visual canvas for authoring multi-turn dialog topics with conditional logic and fallback triggers",
      "Generative answers pointing directly to SharePoint document libraries for instant out-of-the-box knowledge",
      "Pre-built connectors to 1,200+ enterprise systems including Dynamics 365, SAP, ServiceNow, and Salesforce",
      "Unified multi-channel publishing to Microsoft Teams, intranet portals, customer websites, and mobile apps",
    ],
    howItWorks: [
      "Architect defines agent persona, operational tone, and allowed conversation boundaries",
      "Enterprise knowledge libraries and public URLs are connected as live grounding data sources",
      "Developer configures Power Automate flows as plugin actions for transactional task execution",
      "Agent is verified in the built-in test sandbox before publishing to end-user channels with one click",
    ],
    complianceNote: "Enforces Microsoft Entra ID authentication and granular tenant data loss prevention policies.",
  },
  {
    id: "story-gpt-builders",
    category: "stories",
    badge: "Operations & HR",
    appTitle: "Custom GPTs",
    title: "Transforming Business Operations with GPT Builders",
    subtitle: "Deploy custom organizational GPTs tailored to internal SOPs and technical documentation",
    imageUrl: COPILOT_101_IMAGES.gptBuilder,
    imageAlt: "Enterprise team using customized GPT builders to digitize operational standard procedures",
    tagline: "Institutional Knowledge Preservation",
    summary:
      "How companies build specialized internal GPT assistants that act as institutional knowledge repositories. Employees can ask complex technical, procedural, or operational questions and receive authoritative answers citing specific company handbooks and manuals.",
    keyCapabilities: [
      "Centralized curation of company standard operating procedures (SOPs), manuals, and policy handbooks",
      "Customized persona instructions defining exact professional tone, terminology, and response formatting",
      "Private departmental distribution restricting sensitive assistants (Finance, Legal) to authorized staff",
      "Automatic document citation linking every generated paragraph directly to the underlying internal file",
    ],
    howItWorks: [
      "Company operations team compiles verified standard operating procedure documents and technical manuals",
      "Documents are indexed in secure Azure cognitive search clusters using high-dimensional vector embeddings",
      "System prompt instructions define persona, domain boundaries, and escalation triggers",
      "Employees access the assistant via Teams or web browser, receiving answers grounded in verified company facts",
    ],
    complianceNote: "Operates entirely within your enterprise Azure tenant boundary with complete encryption.",
  },
  {
    id: "story-software-dev-ai",
    category: "stories",
    badge: "Architecture & Software",
    appTitle: "Developer Tools",
    title: "Accelerating Innovation with AI in Software Development",
    subtitle: "Boost engineering velocity, automate test creation, and modernize legacy codebases",
    imageUrl: COPILOT_101_IMAGES.softwareDevAi,
    imageAlt: "Software engineers writing code with GitHub Copilot AI suggestions and unit test generators",
    tagline: "Developer Velocity & Test Scaffolding",
    summary:
      "How enterprise engineering squads leverage GitHub Copilot and Microsoft development tools to generate clean code, scaffold unit and integration test suites, refactor legacy monolithic codebases into cloud-native microservices, and automate technical documentation.",
    keyCapabilities: [
      "Real-time code suggestions and boilerplate scaffolding across C#, TypeScript, Python, and Business Central AL",
      "Automated unit test generation creating edge-case test suites from existing code methods",
      "Legacy code modernization converting outdated monolithic patterns into modern cloud-native architectures",
      "Automated pull request summaries and architecture documentation keeping team repositories synchronized",
    ],
    howItWorks: [
      "Developer writes intent comments or function signatures inside Visual Studio Code or Visual Studio",
      "Copilot analyzes repository context and coding conventions to propose syntax-valid implementations",
      "Automated test generator creates unit test suites matching project testing frameworks",
      "Engineer validates, refines, and commits code with continuous integration pipeline testing",
    ],
    complianceNote: "Configured with public code matching filters and strict intellectual property protection filters.",
  },
];

interface AiAgentsPageProps {
  onOpenContact: (initialInterest?: string) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const AiAgentsPage: React.FC<AiAgentsPageProps> = ({
  onOpenContact,
}) => {
  // Active FAQ state for smooth accordion toggles
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Active category filter for topics & cards
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Active filter for Related Stories section
  const [relatedStoryFilter, setRelatedStoryFilter] = useState<string>("all");

  // Detailed modal state for card-wise deep dive
  const [selectedTopic, setSelectedTopic] = useState<CopilotTopicDetail | null>(null);

  // Inline expanded cards set for quick on-card workflow reading
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleExpandCard = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Filtered topics based on search query and category
  const filteredTopics = useMemo(() => {
    return COPILOT_TOPIC_DETAILS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.appTitle && item.appTitle.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Filtered Related Stories
  const filteredRelatedStories = useMemo(() => {
    if (relatedStoryFilter === "all") return COPILOT_RELATED_STORIES;
    return COPILOT_RELATED_STORIES.filter((story) => {
      if (relatedStoryFilter === "business") {
        return story.badge === "Business AI";
      }
      if (relatedStoryFilter === "legal-hr") {
        return story.badge === "Legal & Compliance" || story.badge === "Human Resources" || story.badge === "Operations & HR";
      }
      if (relatedStoryFilter === "architecture-software") {
        return story.badge === "Architecture & Engineering" || story.badge === "Architecture & Software";
      }
      if (relatedStoryFilter === "agents") {
        return story.badge === "Agent Technology";
      }
      return true;
    });
  }, [relatedStoryFilter]);

  // Official FAQ questions and answers from Microsoft Copilot 101 (WITHOUT ANY NUMERIC SEQUENCING)
  const copilotFaqs = [
    {
      question: "Is Microsoft Copilot compatible with other Microsoft services like Azure and Dynamics 365?",
      answer:
        "Yes, Microsoft Copilot is deeply integrated across the Microsoft ecosystem. Beyond Microsoft 365 productivity apps, Copilot connects directly with Microsoft Dynamics 365 Business Central, Dynamics 365 Finance & Operations, Microsoft Fabric, Microsoft Power Platform, and Microsoft Azure OpenAI Service. It uses Microsoft Graph and secure enterprise connectors to provide grounded intelligence while strictly respecting existing role-based access controls (RBAC).",
    },
    {
      question: "What are some real-world examples of how businesses are using Microsoft Copilot?",
      answer:
        "Enterprises use Microsoft Copilot to automate routine tasks and enhance decision-making across departments. Finance teams use Copilot in Business Central and Excel to automate bank reconciliation, analyze cash flow variances, and forecast receivables. Operations teams predict inventory replenishment needs and evaluate supplier contracts. Sales and customer service teams draft personalized quotes, summarize customer inquiries, and resolve service tickets with AI-grounded suggestions.",
    },
    {
      question: "Do I need any special setup or configuration to start using Microsoft Copilot?",
      answer:
        "To get started with Microsoft Copilot, organizations need an eligible Microsoft 365 subscription (such as Business Standard, Business Premium, E3, or E5) and appropriate Copilot licensing. For enterprise deployment, Coreenact helps businesses prepare by establishing clean Microsoft Entra ID tenant permissions, configuring Microsoft Purview data loss prevention (DLP) labels, and setting up secure connections to Business Central and custom ERP databases.",
    },
    {
      question: "What support and training resources are available for getting started with Microsoft Copilot?",
      answer:
        "Microsoft provides extensive self-paced documentation, interactive guides, and adoption kits through Microsoft Learn and Copilot 101. As an accredited Microsoft Solutions Partner, Coreenact provides hands-on executive briefings, process-mapping workshops, prompt engineering guidance for ERP workflows, and dedicated change management to ensure rapid user adoption and measurable business ROI.",
    },
    {
      question: "Is Microsoft Copilot available in different languages, and does it support multilingual workflows?",
      answer:
        "Yes, Microsoft Copilot supports dozens of global languages, including English, Spanish, Japanese, French, German, Portuguese, Italian, Chinese, and many more. It can interpret prompts in one language and produce structured reports, summaries, or customer emails in another, making it an invaluable tool for multinational enterprises coordinating across global hubs.",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 min-h-screen text-left transition-colors duration-200">
      {/* 1. HERO SECTION: Official Microsoft Copilot 101 Structure */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pb-24 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Official Partner Meta */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
            <span>Microsoft Solutions Partner</span>
            <span aria-hidden="true">·</span>
            <span>Business Applications & AI</span>
            <span aria-hidden="true">·</span>
            <span className="text-blue-700 dark:text-sky-400 font-semibold">AI & Autonomous Agents</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Comprehensive Copilot 101 Introduction */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-800 dark:text-sky-300 text-xs font-semibold">
                <MicrosoftLogo className="w-3.5 h-3.5 shrink-0" />
                <span>Microsoft Copilot 101: Resources, Topics & Related Stories</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] font-heading text-balance">
                What is a Copilot? Enterprise AI & Autonomous Agents
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                An introduction to what a copilot is, how AI assistants work, how to streamline business operations with autonomous agents, and enterprise implementation across Microsoft Dynamics 365 and Microsoft 365 apps.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenContact("Copilot & Autonomous Agents Architecture Consultation")}
                  className="px-6 py-3 rounded-lg font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Copilot Architecture Discovery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection("topic-explorer")}
                  className="px-5 py-3 rounded-lg font-semibold text-sm bg-slate-100 hover:bg-slate-200/80 text-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                >
                  Explore Topic Capabilities
                </button>
                <button
                  onClick={() => scrollToSection("related-stories")}
                  className="px-5 py-3 rounded-lg font-semibold text-sm bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/80 dark:border-blue-800 transition cursor-pointer"
                >
                  Related Stories
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Commercial Data Protection
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                  No Model Training on Customer Data
                </span>
                <span className="flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  Microsoft Graph & ERP Grounding
                </span>
              </div>
            </div>

            {/* Right Column: Exact Microsoft Copilot 101 Hero Insert Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-900 group">
                <img
                  src={COPILOT_101_IMAGES.heroInsert}
                  alt="Microsoft Copilot conversational assistant on desktop interface"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="text-xs uppercase tracking-wider font-mono text-sky-300 font-semibold mb-1">
                    Microsoft Copilot 101
                  </div>
                  <div className="text-base font-bold text-white mb-1">
                    Your Everyday AI Companion
                  </div>
                  <div className="text-xs text-slate-300 leading-snug">
                    Microsoft Copilot combines large language models with Microsoft Graph to deliver real-time assistance, intelligent automation, and contextual decision support.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: WHAT IS A COPILOT? (Core Definition & 3 Pillars from Copilot 101) */}
      <section id="what-is-copilot" className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800 scroll-mt-24">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400 font-mono">
                Definition & Foundation
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
                What is a copilot?
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                A <strong>copilot</strong> is an AI-powered conversational assistant designed to enhance productivity and creativity by providing real-time support, suggestions, and contextual guidance across applications and workflows.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Just like a copilot in aviation who shares flight responsibilities with the lead pilot, an AI copilot operates alongside you—assisting with complex calculations, drafting communications, summarizing datasets, and automating repetitive activities so you can refocus on strategic, high-value work.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-slate-100 dark:bg-slate-900">
                <img
                  src={COPILOT_101_IMAGES.overview}
                  alt="A professional engaging with Microsoft Copilot AI assistant"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-[16/9]"
                />
              </div>
            </div>
          </div>

          {/* 3 Core Pillars Cards - WITHOUT SEQUENCING NUMBERS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-blue-400 dark:hover:border-blue-500 transition">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-sky-400 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  Boosting Productivity
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Complete tasks faster with a copilot’s intelligent suggestions, making content creation, data analysis, and communication more efficient across every department.
                </p>
              </div>
              <div className="pt-2 text-xs font-semibold text-blue-700 dark:text-sky-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Accelerated workflow execution</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-sky-400 dark:hover:border-sky-500 transition">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-400 flex items-center justify-center">
                  <Workflow className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  Simplifying Automation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  A copilot can automate repetitive tasks, handle multi-step actions, and trigger transactional system updates with no manual coding required.
                </p>
              </div>
              <div className="pt-2 text-xs font-semibold text-sky-700 dark:text-sky-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero-code task orchestration</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-purple-400 dark:hover:border-purple-500 transition">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  Providing Contextual Intelligence
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  AI suggestions help you make faster, more informed decisions grounded in your organization’s real-time emails, files, calendars, and ERP records.
                </p>
              </div>
              <div className="pt-2 text-xs font-semibold text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tenant-grounded accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CARD-WISE & TOPIC-WISE EXPLORER CONTROLS */}
      <section id="topic-explorer" className="py-8 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400 font-mono">
                Topic-Wise & Card-Wise Breakdown
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading">
                Explore Topic Capabilities
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Browse detailed functional capabilities and execution workflows across applications and industries.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search topics, apps, or industries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {[
              { id: "all", label: "All Topics" },
              { id: "apps", label: "What Copilot Can Do (M365 & ERP)" },
              { id: "architecture", label: "AI Architecture & NLP" },
              { id: "agents", label: "Autonomous Agents & Studio" },
              { id: "industries", label: "Industry Applications" },
              { id: "solutions", label: "Solutions & Automation Hub" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white font-semibold shadow-xs"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMPREHENSIVE CARD-WISE DETAILED TOPICS GRID */}
      <section className="py-12 sm:py-16 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Showing <strong>{filteredTopics.length}</strong> card-wise detailed topics
            </span>
            <span className="hidden sm:inline">
              Aligned with Microsoft Copilot 101 Specifications
            </span>
          </div>

          {/* Cards Grid - NO SEQUENCING NUMBERS ANYWHERE */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => {
              const isExpanded = !!expandedCards[topic.id];

              return (
                <div
                  key={topic.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-500/50 transition-all flex flex-col justify-between group"
                >
                  {/* Top Image Banner */}
                  <div
                    onClick={() => setSelectedTopic(topic)}
                    className="relative h-48 w-full overflow-hidden bg-slate-900 cursor-pointer"
                  >
                    <img
                      src={topic.imageUrl}
                      alt={topic.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-blue-600/90 text-white text-[11px] font-bold shadow-xs">
                      {topic.appTitle || topic.badge}
                    </div>

                    {/* Tagline */}
                    <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs font-semibold truncate">
                      {topic.tagline}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-sky-400 font-bold mb-1">
                          {topic.subtitle}
                        </div>
                        <h4
                          onClick={() => setSelectedTopic(topic)}
                          className="text-lg font-bold text-slate-900 dark:text-white font-heading cursor-pointer hover:text-blue-600 dark:hover:text-sky-400 transition"
                        >
                          {topic.title}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {topic.summary}
                      </p>

                      {/* 3 Structured Key Capabilities Bullet Points on the Card */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          Key Capabilities:
                        </div>
                        {topic.keyCapabilities.slice(0, 3).map((cap, idx) => (
                          <div
                            key={idx}
                            className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5 leading-snug"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{cap}</span>
                          </div>
                        ))}
                      </div>

                      {/* Inline Expanded Details (When Toggled) */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs animate-in fade-in duration-200">
                          {/* Step-by-Step Execution Architecture */}
                          <div className="space-y-2">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 text-[11px]">
                              <Workflow className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                              <span>Execution Workflow:</span>
                            </div>
                            <div className="space-y-1.5 pl-1">
                              {topic.howItWorks.map((step, sIdx) => (
                                <div key={sIdx} className="text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1" />
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {topic.complianceNote && (
                            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850/80 text-[11px] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-750 flex items-start gap-2">
                              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                              <span>{topic.complianceNote}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Card Actions Footer */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => toggleExpandCard(topic.id)}
                        className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            <span>Less Info</span>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Quick Breakdown</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setSelectedTopic(topic)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-400 border border-blue-200/80 dark:border-blue-800/80 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>Full Dossier</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. TOPIC DETAIL MODAL (Deep-Dive Card-Wise Dossier) */}
      {selectedTopic && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header with Image Banner */}
            <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden">
              <img
                src={selectedTopic.imageUrl}
                alt={selectedTopic.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedTopic(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold">
                    {selectedTopic.appTitle || selectedTopic.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800/80 text-sky-300 text-xs font-mono">
                    {selectedTopic.tagline}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  {selectedTopic.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                  {selectedTopic.subtitle}
                </p>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-16rem)] overflow-y-auto">
              {/* Full Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400 font-mono">
                  Topic Overview & Context
                </h4>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedTopic.summary}
                </p>
              </div>

              {/* Detailed Key Capabilities Grid */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400 font-mono">
                  Core Enterprise Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedTopic.keyCapabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850/80 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Execution Architecture */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400 font-mono">
                  Step-by-Step Architecture & Workflow
                </h4>
                <div className="space-y-2">
                  {selectedTopic.howItWorks.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850/50 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-sky-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                        {idx + 1}
                      </div>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance & Trust Note */}
              {selectedTopic.complianceNote && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850/80 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                    <span><strong>Security & Trust:</strong> {selectedTopic.complianceNote}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions Footer */}
            <div className="p-6 bg-slate-50 dark:bg-slate-850/90 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Want to implement this capability in your Microsoft 365 or Business Central tenant?
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedTopic.title;
                    setSelectedTopic(null);
                    onOpenContact(`Implementation Consultation: ${title}`);
                  }}
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span>Request Implementation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. SECTION: THE BUSINESS BENEFITS OF A COPILOT (Copilot 101 Core Pillars) */}
      <section id="business-benefits" className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800 scroll-mt-24 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400 font-mono">
              Proven Enterprise Outcomes
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
              The business benefits of a copilot
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              When organizations equip their workforce with Microsoft Copilot and automated agents, the impacts scale across operational efficiency, customer satisfaction, and fiscal performance.
            </p>
          </div>

          {/* 3 Outcome Cards - WITHOUT SEQUENCING NUMBERS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-sky-400 flex items-center justify-center">
                  <Workflow className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                  Reduce Manual Effort
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Automating processes like document creation, data analysis, email summarizing, and scheduling minimizes time spent on routine administrative tasks, making employees happier and more engaged with meaningful work.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                  <span>Eliminate spreadsheet reconciliation fatigue</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                  <span>Speed up quote generation by up to 5x</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                  Enhance Decision-Making
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  By providing intelligent insights, anomaly detection, and predictive forecasts, a copilot empowers users and leadership to make faster, high-confidence decisions grounded in enterprise facts.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Real-time working capital variance insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Accurate inventory safety stock suggestions</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                  Impact the Bottom Line
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  When employees spend less time on manual paperwork and make important decisions faster, they have more time to focus on strategic initiatives that drive business expansion and profitability.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>Direct reduction in operational headcount overhead</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>Faster customer SLA turnaround and loyalty</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION: RELATED STORIES (From Microsoft Copilot 101) */}
      <section id="related-stories" className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800 scroll-mt-24">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-sky-300 text-xs font-semibold">
                <MicrosoftLogo className="w-3.5 h-3.5 shrink-0" />
                <span>Microsoft Copilot 101 Hub</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
                Related stories
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Explore in-depth domain guides, implementation stories, and architectural insights directly from the official Microsoft Copilot 101 series.
              </p>
            </div>

            {/* Category Filter Pills for Related Stories */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "All Stories" },
                { id: "business", label: "Business AI (Sales & Marketing)" },
                { id: "legal-hr", label: "Legal & HR Operations" },
                { id: "architecture-software", label: "Architecture & Engineering" },
                { id: "agents", label: "Agent & Bot Technology" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setRelatedStoryFilter(pill.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                    relatedStoryFilter === pill.id
                      ? "bg-blue-600 text-white font-semibold shadow-xs"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Related Stories Grid - NO SEQUENCING NUMBERS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRelatedStories.map((story) => {
              const isExpanded = !!expandedCards[story.id];

              return (
                <div
                  key={story.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-500/50 transition-all flex flex-col justify-between group"
                >
                  {/* Story Cover Image */}
                  <div
                    onClick={() => setSelectedTopic(story)}
                    className="relative h-48 w-full overflow-hidden bg-slate-900 cursor-pointer"
                  >
                    <img
                      src={story.imageUrl}
                      alt={story.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-blue-600/90 text-white text-[11px] font-bold shadow-xs">
                      {story.badge}
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs font-semibold truncate">
                      {story.tagline}
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-sky-400 font-bold mb-1">
                          {story.subtitle}
                        </div>
                        <h3
                          onClick={() => setSelectedTopic(story)}
                          className="text-lg font-bold text-slate-900 dark:text-white font-heading cursor-pointer hover:text-blue-600 dark:hover:text-sky-400 transition"
                        >
                          {story.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {story.summary}
                      </p>

                      {/* 3 Core Capability Highlights */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          Key Takeaways & Capabilities:
                        </div>
                        {story.keyCapabilities.slice(0, 3).map((cap, cIdx) => (
                          <div
                            key={cIdx}
                            className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5 leading-snug"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{cap}</span>
                          </div>
                        ))}
                      </div>

                      {/* Expandable Step-by-Step Workflow */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs animate-in fade-in duration-200">
                          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 text-[11px]">
                            <Workflow className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                            <span>Implementation Architecture:</span>
                          </div>
                          <div className="space-y-1.5 pl-1">
                            {story.howItWorks.map((step, sIdx) => (
                              <div key={sIdx} className="text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1" />
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                          {story.complianceNote && (
                            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850/80 text-[11px] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-750 flex items-start gap-2 mt-2">
                              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                              <span>{story.complianceNote}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions Footer */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => toggleExpandCard(story.id)}
                        className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            <span>Less Info</span>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Quick Breakdown</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setSelectedTopic(story)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-400 border border-blue-200/80 dark:border-blue-800/80 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>Read Full Story</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. SECTION: COMMERCIAL DATA PROTECTION & TRUST */}
      <section id="security-trust" className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800 scroll-mt-24 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400 font-mono">
              Enterprise Trust & Security
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
              Commercial Data Protection & Zero Model Training
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              When utilizing Microsoft Copilot with enterprise work credentials, your organizational data is protected by the most stringent security and compliance certifications in the cloud.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">No Model Training</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Your prompts, retrieved Microsoft Graph records, and generated replies are never used to train the public foundational models of OpenAI or Microsoft.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <Lock className="w-6 h-6 text-blue-600 dark:text-sky-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Tenant Isolation</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                All data remains strictly within your Microsoft 365 and Azure sovereign tenant boundary. Copilot respects existing user permission ACLs automatically.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Purview DLP Integration</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Sensitivity labels (Confidential, Restricted, Secret) configured in Microsoft Purview are strictly enforced. Restricted records cannot leak into Copilot summaries.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <Database className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Global Compliance</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Certified compliant with SOC 1/2/3, ISO/IEC 27001, HIPAA, GDPR, FedRAMP High, and the EU Data Boundary commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SECTION: FREQUENTLY ASKED QUESTIONS (From Copilot 101 - WITHOUT ANY SEQUENCING NUMBERS) */}
      <section id="faqs" className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800 scroll-mt-24">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400 font-mono">
              Common Questions
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
              Frequently asked questions
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Find answers to common questions about Microsoft Copilot compatibility, real-world deployment, tenant configuration, and multilingual support.
            </p>
          </div>

          {/* Accordion List - WITHOUT ANY "01/", "02/" SEQUENCING NUMBERS */}
          <div className="max-w-4xl space-y-4">
            {copilotFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850 transition"
                  >
                    <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-white font-heading">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-blue-600 dark:text-sky-400" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. SECTION: COREENACT IMPLEMENTATION & ARCHITECTURE DISCOVERY CTA */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#0b0f19]">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/80 text-sky-300 text-xs font-semibold">
                <MicrosoftLogo className="w-3.5 h-3.5 shrink-0" />
                <span>Certified Microsoft Solutions Partner</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
                Ready to Implement Microsoft Copilot & Custom Agents?
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Coreenact’s certified Microsoft architects evaluate your tenant readiness, configure Microsoft Graph permission hygiene, design custom Copilot Studio agents, and integrate Business Central workflows with guaranteed enterprise security.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenContact("Copilot & Autonomous Agents Architecture Consultation")}
                  className="px-6 py-3 rounded-lg font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Copilot Architecture Discovery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://www.microsoft.com/en-us/microsoft-copilot/copilot-101/what-is-copilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-lg font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-2"
                >
                  <span>Visit Microsoft Copilot 101</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>

              <div className="text-xs text-slate-400 pt-4 flex flex-wrap items-center gap-4">
                <span>Direct Advisory: New Delhi (India) & Mississauga (Canada)</span>
                <span>•</span>
                <span>Inquiries: info@coreenact.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
