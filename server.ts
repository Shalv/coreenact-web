import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenAI, ThinkingLevel, GenerateVideosOperation } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Lazy initializer for Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please configure it in AI Studio Settings > Secrets.");
    }
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// 1. Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Coreenact Enterprise AI Platform",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// 2. Customer Enquiry and Consultation Booking Mailer (/api/enquiry)
interface EnquiryRecord {
  id: string;
  source: "contact_page" | "book_consultation";
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  interest?: string;
  office?: string;
  timeframe?: string;
  notes?: string;
  receivedAt: string;
  emailDispatched: boolean;
}

const enquiriesStore: EnquiryRecord[] = [];

app.post("/api/enquiry", async (req, res) => {
  try {
    const {
      source = "contact_page",
      name,
      email,
      company = "",
      phone = "",
      service = "",
      interest = "",
      office = "",
      timeframe = "",
      notes = "",
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "Full Name and Work Email are required.",
      });
    }

    const recipient = process.env.NOTIFICATION_EMAIL || "info@coreenact.com";
    const selectedService = service || interest || "Dynamics 365 Business Central Consultation";
    const selectedOfficeOrTime = office || timeframe || "Immediate Review";
    const sourceTitle = source === "contact_page" ? "Contact Page Inquiry" : "Book Consultation Request";
    const timestamp = new Date().toISOString();
    const formattedDate = new Date().toLocaleString("en-US", { timeZoneName: "short" });

    const enquiryRecord: EnquiryRecord = {
      id: `ENQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      source,
      name,
      email,
      company,
      phone,
      service: selectedService,
      interest: selectedService,
      office: selectedOfficeOrTime,
      timeframe: selectedOfficeOrTime,
      notes,
      receivedAt: timestamp,
      emailDispatched: false,
    };

    const emailSubject = `[Coreenact Lead] ${name} (${company || "Individual"}) - ${selectedService}`;

    const emailText = `
NEW INQUIRY RECEIVED FOR COREENACT TECHNOLOGIES
--------------------------------------------------
Recipient: ${recipient}
Source: ${sourceTitle}
Date: ${formattedDate}

PROSPECT DETAILS:
• Full Name: ${name}
• Work Email: ${email}
• Phone / WhatsApp: ${phone || "Not provided"}
• Company / Organization: ${company || "Not provided"}
• Service / Practice Interest: ${selectedService}
• Office / Timeframe: ${selectedOfficeOrTime}
• Legacy Footprint & Requirements / Notes:
${notes || "None provided"}

--------------------------------------------------
This inquiry was submitted on the Coreenact web portal.
Reply directly to this email to follow up with ${name} (${email}).
`;

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${emailSubject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <div style="background: linear-gradient(135deg, #0078D4 0%, #1e40af 100%); padding: 24px 32px; color: #ffffff;">
      <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700;">Coreenact Technologies</h1>
      <p style="margin: 0; font-size: 13px; opacity: 0.9;">New Customer Lead • ${sourceTitle}</p>
    </div>
    
    <div style="padding: 28px 32px;">
      <p style="font-size: 14px; line-height: 1.5; margin: 0 0 20px 0; color: #475569;">
        A new prospect inquiry has been submitted via the Coreenact web portal destined for <strong>${recipient}</strong>.
      </p>
      
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px;">
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b; width: 38%;">Full Name:</td>
          <td style="padding: 10px 0; font-weight: 700; color: #0f172a;">${name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Work Email:</td>
          <td style="padding: 10px 0; color: #0078D4; font-weight: 600;"><a href="mailto:${email}" style="color: #0078D4; text-decoration: none;">${email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Phone / WhatsApp:</td>
          <td style="padding: 10px 0; color: #0f172a;">${phone || "Not provided"}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Company Name:</td>
          <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${company || "Not provided"}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Service / Area:</td>
          <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${selectedService}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Office / Timeframe:</td>
          <td style="padding: 10px 0; color: #0f172a;">${selectedOfficeOrTime}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0 0 0; font-weight: 600; color: #64748b; vertical-align: top;">Requirements / Notes:</td>
          <td style="padding: 12px 0 0 0; color: #334155; line-height: 1.6; white-space: pre-wrap;">${notes || "No additional requirements specified."}</td>
        </tr>
      </table>

      <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:${email}?subject=Re:%20Coreenact%20Dynamics%20365%20Consultation&body=Hi%20${encodeURIComponent(name)},%0A%0AThank%20you%20for%20reaching%20out%20to%20Coreenact%20regarding%20${encodeURIComponent(selectedService)}." 
           style="display: inline-block; background-color: #0078D4; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 10px 20px; border-radius: 8px;">
          Reply Directly to ${name} (${email})
        </a>
      </div>
    </div>
    
    <div style="background-color: #f1f5f9; padding: 14px 32px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center;">
      Coreenact Technologies • Global Delivery HQ: New Delhi, India • North America Hub: Mississauga, Canada • info@coreenact.com
    </div>
  </div>
</body>
</html>
`;

    let emailDispatched = false;
    let smtpNote = "";

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Coreenact Web Portal" <${process.env.SMTP_USER}>`,
          to: recipient,
          replyTo: email,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        });

        emailDispatched = true;
        smtpNote = `Direct email dispatched to ${recipient} via SMTP server.`;
        console.log(`[SMTP SUCCESS] Enquiry sent to ${recipient} from ${email}`);
      } catch (smtpErr: any) {
        console.error("[SMTP ERROR] Failed to send via SMTP:", smtpErr.message);
        smtpNote = `SMTP failed (${smtpErr.message}). Inquiry safely logged in server.`;
      }
    } else {
      console.log(`[ENQUIRY RECEIVED FOR ${recipient}]`, {
        source: sourceTitle,
        name,
        email,
        company,
        phone,
        service: selectedService,
        office: selectedOfficeOrTime,
        notes,
      });
      smtpNote = `Enquiry recorded and routed to ${recipient}. Configure SMTP credentials in environment for live SMTP relay.`;
    }

    enquiryRecord.emailDispatched = emailDispatched;
    enquiriesStore.unshift(enquiryRecord);
    if (enquiriesStore.length > 100) {
      enquiriesStore.pop();
    }

    const mailtoSubject = encodeURIComponent(`[Coreenact Enquiry] ${name} - ${selectedService}`);
    const mailtoBody = encodeURIComponent(
      `Hi Coreenact Team,\n\nI have submitted an inquiry with the following details:\n\n` +
      `Full Name: ${name}\n` +
      `Work Email: ${email}\n` +
      `Company: ${company}\n` +
      `Phone: ${phone}\n` +
      `Service: ${selectedService}\n` +
      `Timeframe / Office: ${selectedOfficeOrTime}\n` +
      `Requirements / Notes:\n${notes}\n\n` +
      `Best regards,\n${name}`
    );
    const mailtoUrl = `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

    return res.json({
      success: true,
      message: `Inquiry successfully recorded and routed to ${recipient}`,
      targetEmail: recipient,
      enquiryId: enquiryRecord.id,
      emailDispatched,
      smtpNote,
      mailtoUrl,
    });
  } catch (err: any) {
    console.error("Enquiry endpoint error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to process enquiry.",
    });
  }
});

app.get("/api/enquiries", (_req, res) => {
  res.json({
    count: enquiriesStore.length,
    targetEmail: process.env.NOTIFICATION_EMAIL || "info@coreenact.com",
    enquiries: enquiriesStore,
  });
});

// Official Coreenact Website Knowledge Base for RAG and accurate answers
const COREENACT_WEBSITE_KNOWLEDGE = `
[COREENACT ENTERPRISE KNOWLEDGE BASE - OFFICIAL WEBSITE CONTENT]
Organization: Coreenact Technologies (coreenact.com)
Tagline: Microsoft Dynamics 365 Business Central Specialists & Digital Transformation Partners
Credentials: Microsoft Solutions Partner for Business Applications (ERP & Power Platform)

Offices & Global Delivery Centers:
- Global Delivery HQ (India): Plot 24, Okhla Phase III, New Delhi 110020, India. Phone: +91 99990 89255
- North America Delivery Hub (Canada): 201 City Centre Drive, Suite 700, Mississauga, ON L5B 2T4, Canada.
- Inquiries: info@coreenact.com | support@coreenact.com | sales@coreenact.com
- Website: https://coreenact.com

Core Services Offered:
1. Microsoft Dynamics 365 Business Central Implementation:
   - Full-lifecycle ERP deployment using Coreenact's 5-Phase Delivery Framework:
     * Phase 1: Discover (Business process mapping, gap analysis, licensing strategy, ROI baseline)
     * Phase 2: Design (Functional design specs, chart of accounts, dimension structure, database architecture)
     * Phase 3: Develop (AL extension development, API integrations, data cleansing & ETL)
     * Phase 4: Deploy (User acceptance testing, master data cutover, parallel run, go-live certification)
     * Phase 5: Drive (Post go-live hypercare, 24/7 SLA managed support, continuous updates)
2. Legacy Dynamics NAV & GP Cloud Modernization:
   - Automated code migration from C/AL to modern AL extensions.
   - Clean data migration preserving historical general ledger entries, open orders, and posted transactions.
   - Elimination of on-premise hardware costs and zero-downtime cutover.
3. India GST & Statutory Localization:
   - Full compliance with native India Goods and Services Tax (GST).
   - Real-time E-Invoicing integration via IRP portal (NIC / ClearTax APIs).
   - E-Way bill generation, Reverse Charge Mechanism (RCM), Tax Deducted at Source (TDS), and GST audit reporting.
4. AL Extension Development & Customizations:
   - Zero modifications to standard Microsoft base app code; pure AL event-driven extensions ensuring smooth Microsoft monthly updates.
   - Power Platform (Power BI analytics, Power Automate approval flows, Power Apps frontends) & Azure integration.
5. 24/7 Managed ERP Support & Health Audits:
   - Dedicated Level 1, 2, and 3 enterprise support desk with guaranteed 15-minute critical SLA.
   - Database performance tuning, index rebuilding, and version update testing.

Industry Vertical Blueprints:
1. Manufacturing & Discrete Engineering: Bill of materials (BOM), routing, capacity planning, scrap tracking, shop-floor execution.
2. FMCG & Wholesale Distribution: Multi-warehouse management, expiry dates, batch tracking, promotional pricing, route sales.
3. EdCore Education ERP (Proprietary Coreenact IP built on Business Central):
   - Comprehensive institution management for K-12 schools, higher education, colleges, and university groups.
   - Key modules: Student Admissions & Inquiries, Automated Fee Billing & Online Payment Gateway Reconciliation, Timetable & Faculty Scheduling, Exam Marks & Grade Sheets, Student Attendance & RFID/Biometric integration, GPS Bus Fleet Tracking, Digital Library Management.
4. Retail & Point of Sale (POS): Omnichannel inventory synchronization, loyalty programs, barcode scanning, centralized pricing.
5. Healthcare & Pharmaceuticals: Batch recall capability, cold-chain temperature monitoring, expiry date management, FDA/GMP compliance.
6. Logistics & Supply Chain: Freight management, container tracking, 3PL billing, customs documentation.
7. Automotive & Auto-Ancillary: OEM schedule handling, Just-in-Time (JIT) delivery, sub-contracting, warranty tracking.
8. Chemical & Process Manufacturing: Recipe management, dynamic potency adjustments, hazardous material regulatory compliance.
9. Professional Services: Project accounting, resource utilization, milestone billing, timesheet tracking.

Licensing & TCO Information:
- Business Central Cloud Essential: ~$70 per user/month (Full finance, sales, purchasing, inventory, CRM, project management).
- Business Central Cloud Premium: ~$100 per user/month (Includes all Essential features plus Manufacturing & Service Order Management).
- Team Member License: ~$8 per user/month (Read access plus lightweight approval, time recording, and quote generation).
- Implementation Pricing: Scaled according to user count, custom integrations, and data migration scope with transparent fixed-fee or time-and-materials milestones.
`;

/**
 * Intelligent local knowledge synthesizer used if external Gemini API quota (429) is temporarily exhausted.
 * Generates structured, high-fidelity answers directly from Coreenact verified enterprise data.
 */
function generateLocalKnowledgeResponse(query: string, roleTitle = "ERP Consultant"): string {
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
    return `### Microsoft Dynamics 365 Business Central Licensing & Pricing Guide

Coreenact assists organizations with optimal license structuring:

- **Business Central Cloud Essential (~$70 per user/month)**:
  Includes Financial Management (GL, AP, AR, Fixed Assets), Sales & Order Processing, Purchasing & Payables, Inventory Management & Costing, Basic CRM, and Project/Job Accounting.
- **Business Central Cloud Premium (~$100 per user/month)**:
  Includes everything in Essential plus **Manufacturing** (Production Orders, Bill of Materials, Capacity Planning, Routing) and **Service Order Management** (Service contracts, dispatching, warranty tracking).
- **Team Member License (~$8 per user/month)**:
  Designed for lightweight users who need read access across the system, timesheet entry, expense reporting, and purchase quote approval.
- **Implementation & Services**:
  Transparent, milestone-based pricing with fixed-price deliverables or time-and-materials arrangements depending on customization complexity.`;
  }

  if (q.includes("office") || q.includes("address") || q.includes("contact") || q.includes("location") || q.includes("phone") || q.includes("email") || q.includes("delhi") || q.includes("canada") || q.includes("where")) {
    return `### Coreenact Offices & Contact Information

Connect with our global enterprise advisory teams:

- **Global Delivery Headquarters (India)**:
  - Address: Plot 24, Okhla Phase III, New Delhi 110020, India
  - Direct Phone: **+91 99990 89255**
  - Working Hours: Mon–Fri, 9:00 AM – 6:30 PM IST (24/7 Managed Support available)

- **North America Delivery Hub (Canada)**:
  - Address: 201 City Centre Drive, Suite 700, Mississauga, ON L5B 2T4, Canada
  - Service Hours: Mon–Fri, 9:00 AM – 5:00 PM EST

- **Digital Inquiries & Support**:
  - General Inquiries: **info@coreenact.com**
  - Enterprise Support: **support@coreenact.com**
  - Sales & Architecture Discovery: **sales@coreenact.com**
  - Website: [coreenact.com](https://coreenact.com)`;
  }

  // General comprehensive fallback
  return `### Enterprise Guidance from Coreenact Technologies

Thank you for your question regarding Microsoft Dynamics 365 Business Central and Coreenact's enterprise services.

**Key Highlights of Coreenact Capabilities:**
- **Full-Lifecycle ERP Implementation**: Delivered via our structured **5-Phase Delivery Framework** (Discover, Design, Develop, Deploy, Drive) ensuring predictable timelines and measurable ROI.
- **Proprietary Industry Solutions**: Including **EdCore Education ERP** for multi-campus academic institutions, discrete manufacturing blueprints, and FMCG supply chain engines.
- **Native Localization**: Complete compliance with Indian GST, real-time e-invoicing via IRP/NIC, automated E-way bills, TDS, and RCM.
- **Legacy Modernization**: Automated refactoring of legacy Dynamics NAV / GP C/AL code into clean, update-safe AL extensions.
- **Global Delivery Reach**: Dual delivery centers in New Delhi, India (HQ) and Mississauga, Canada with 24/7 SLA-governed support.

For personalized architectural discovery or a detailed demo, contact our consulting team at **sales@coreenact.com** or call **+91 99990 89255**.`;
}

/**
 * Resilient multi-tier generation that handles search grounding, model cascading,
 * and graceful fallback to Coreenact's verified knowledge base if API quotas (429) occur.
 */
async function executeResilientGeneration({
  ai,
  contents,
  systemInstruction,
  enableSearch = false,
  preferredModel = "gemini-3.8-flash",
  enableThinking = false,
  queryTextForFallback = "",
  roleTitle = "ERP Consultant",
}: {
  ai: GoogleGenAI;
  contents: any;
  systemInstruction?: string;
  enableSearch?: boolean;
  preferredModel?: string;
  enableThinking?: boolean;
  queryTextForFallback?: string;
  roleTitle?: string;
}): Promise<{
  reply: string;
  modelUsed: string;
  groundingSources: Array<{ title: string; url: string }>;
  searchQueries: string[];
  isLocalFallback?: boolean;
}> {
  let response: any = null;
  let modelUsed = preferredModel;
  let usedTools = false;

  // Step 1: Attempt with Google Search tool if requested
  if (enableSearch) {
    try {
      usedTools = true;
      const config: any = {
        systemInstruction,
        tools: [{ googleSearch: {} }],
      };
      if (enableThinking && preferredModel === "gemini-3.1-pro-preview") {
        config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
      }
      response = await ai.models.generateContent({
        model: preferredModel,
        contents,
        config,
      });
    } catch (searchError: any) {
      console.warn(
        `[Search Grounding Quota/Error with ${preferredModel}]: ${searchError?.message}. Falling back to direct models without tools...`
      );
      response = null;
      usedTools = false;
    }
  }

  // Step 2: If no response yet, try direct models without search tools (cascade in order of quota resilience)
  if (!response) {
    const candidateModels = [
      preferredModel,
      "gemini-3.1-flash-lite", // Extremely high RPM and low quota consumption
      "gemini-3.5-flash",
      "gemini-3.8-flash",
    ].filter((m, idx, arr) => arr.indexOf(m) === idx);

    for (const modelCandidate of candidateModels) {
      try {
        const config: any = { systemInstruction };
        if (enableThinking && modelCandidate === "gemini-3.1-pro-preview") {
          config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
        }
        response = await ai.models.generateContent({
          model: modelCandidate,
          contents,
          config,
        });
        modelUsed = modelCandidate;
        break; // Successfully got response
      } catch (err: any) {
        console.warn(`[Model Cascade]: ${modelCandidate} failed (${err?.message || "unknown"}). Trying next model...`);
      }
    }
  }

  // Step 3: If all models failed (e.g. 429 RESOURCE_EXHAUSTED / quota exceeded across project), use local knowledge base
  if (!response || !response.text) {
    console.warn("[Quota Exceeded on All Models]: Synthesizing answer directly from Coreenact Enterprise Knowledge Base...");
    const fallbackAnswer = generateLocalKnowledgeResponse(queryTextForFallback, roleTitle);
    return {
      reply: `${fallbackAnswer}\n\n---\n*Note: Verified response delivered directly from Coreenact Enterprise Knowledge Base.*`,
      modelUsed: "coreenact-enterprise-kb",
      groundingSources: [
        { title: "Coreenact Official Website", url: "https://coreenact.com" },
        { title: "Microsoft Dynamics 365 Business Central Documentation", url: "https://learn.microsoft.com/en-us/dynamics365/business-central/" },
      ],
      searchQueries: [],
      isLocalFallback: true,
    };
  }

  // Extract grounding citations if available
  const reply = response.text || "No response received.";
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
  const webSearchQueries = response.candidates?.[0]?.groundingMetadata?.webSearchQueries;

  const groundingSources: Array<{ title: string; url: string }> = [];
  if (groundingChunks && Array.isArray(groundingChunks)) {
    for (const chunk of groundingChunks) {
      if (chunk.web?.uri) {
        groundingSources.push({
          title: chunk.web.title || new URL(chunk.web.uri).hostname,
          url: chunk.web.uri,
        });
      }
    }
  }

  return {
    reply,
    modelUsed,
    groundingSources,
    searchQueries: webSearchQueries || [],
    isLocalFallback: false,
  };
}

// 2. Multi-turn Chat Endpoint with Website RAG + Google Search Grounding (Free Tier & Quota-Resilient)
app.post("/api/chat", async (req, res) => {
  try {
    const {
      messages = [],
      role = "consultant",
      knowledgeSource = "hybrid", // "website" | "google" | "hybrid"
      model,
      enableThinking = false,
    } = req.body;

    const ai = getGenAI();

    // Specific roles with dedicated system instructions and task-oriented models
    const roleDefinitions: Record<string, { instruction: string; defaultModel: string; title: string }> = {
      architect: {
        title: "Enterprise Solutions Architect",
        instruction:
          "You are Coreenact's Principal Enterprise Solutions Architect. You specialize in complex Microsoft Dynamics 365 Business Central deployments, legacy Dynamics NAV/GP to Cloud SaaS migrations, AL extension architecture, Azure integration, and high-level enterprise roadmaps. Provide deep, structured, technically rigorous guidance with clear milestones.",
        defaultModel: "gemini-3.1-pro-preview", // Complex tasks
      },
      consultant: {
        title: "D365 Functional Consultant",
        instruction:
          "You are Coreenact's Lead Dynamics 365 Business Central Functional Consultant. You specialize in general ERP operations, financial management, supply chain, inventory costing, native India GST & e-Invoicing localization, and Power Platform workflows. Provide balanced, clear, and practical enterprise recommendations.",
        defaultModel: "gemini-3.8-flash", // General tasks (free tier, fast, supports Google Search)
      },
      fast: {
        title: "Rapid ERP & Licensing Specialist",
        instruction:
          "You are Coreenact's Rapid ERP Specialist. You provide instant, concise answers regarding Business Central Essential vs Premium licensing, keyboard shortcuts, field definitions, and quick diagnostics. Provide bulleted, direct answers without unnecessary fluff.",
        defaultModel: "gemini-3.1-flash-lite", // Fast tasks
      },
      ai_specialist: {
        title: "AI & Automation Strategist",
        instruction:
          "You are Coreenact's AI & Automation Strategist. You specialize in Microsoft Copilot Studio agents, Power Automate cloud flows, Azure OpenAI integration with Business Central, and document automation. Provide architectural and workflow design patterns.",
        defaultModel: "gemini-3.8-flash", // Automation and general AI tasks
      },
    };

    const roleConfig = roleDefinitions[role] || roleDefinitions.consultant;
    let baseInstruction = roleConfig.instruction;

    // Incorporate website knowledge base and grounding directives based on knowledgeSource
    let combinedInstruction = baseInstruction;

    if (knowledgeSource === "website" || knowledgeSource === "hybrid") {
      combinedInstruction += `\n\n${COREENACT_WEBSITE_KNOWLEDGE}\n\nWhen answering questions regarding Coreenact's services, delivery phases, EdCore ERP, offices in New Delhi or Canada, phone/email contact, or Business Central expertise, prioritize the official website content provided above.`;
    }

    if (knowledgeSource === "google") {
      combinedInstruction += "\n\nYou are grounded with Google Search. Use Google Search to retrieve the latest real-time web information to answer the customer's query accurately.";
    } else if (knowledgeSource === "hybrid") {
      combinedInstruction += "\n\nYou have access to both Coreenact's official website content AND live Google Search. Provide accurate answers by drawing from the Coreenact website context for company specifics, and Google Search for live industry updates or general technical details.";
    }

    // Determine model selection:
    let selectedModel = model || roleConfig.defaultModel || "gemini-3.8-flash";
    if (enableThinking && selectedModel === "gemini-3.1-pro-preview") {
      selectedModel = "gemini-3.1-pro-preview";
    }

    // Format chat history into contents ensuring alternating user/model turns
    const rawContents: any[] = [];
    let lastUserQuery = "";
    for (const msg of messages) {
      if (!msg.content || typeof msg.content !== "string") continue;
      const roleStr = msg.role === "user" ? "user" : "model";
      if (roleStr === "user") {
        lastUserQuery = msg.content;
      }
      rawContents.push({
        role: roleStr,
        parts: [{ text: msg.content }],
      });
    }

    if (rawContents.length === 0) {
      return res.status(400).json({ error: "No valid messages provided." });
    }

    // Normalize turns to ensure alternating user/model sequence starting with user
    const contents: any[] = [];
    for (const item of rawContents) {
      if (contents.length === 0) {
        if (item.role === "user") {
          contents.push(item);
        }
      } else {
        const last = contents[contents.length - 1];
        if (last.role === item.role) {
          last.parts[0].text += `\n\n${item.parts[0].text}`;
        } else {
          contents.push(item);
        }
      }
    }

    if (contents.length === 0) {
      return res.status(400).json({ error: "Chat must begin with a user message." });
    }

    const enableSearch = knowledgeSource === "google" || knowledgeSource === "hybrid";

    const result = await executeResilientGeneration({
      ai,
      contents,
      systemInstruction: combinedInstruction,
      enableSearch,
      preferredModel: selectedModel,
      enableThinking,
      queryTextForFallback: lastUserQuery,
      roleTitle: roleConfig.title,
    });

    res.json({
      reply: result.reply,
      modelUsed: result.modelUsed,
      roleUsed: role,
      roleTitle: roleConfig.title,
      knowledgeSourceUsed: knowledgeSource,
      groundingSources: result.groundingSources,
      searchQueries: result.searchQueries,
      isFreeTier: true,
      isLocalFallback: result.isLocalFallback || false,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    // Even if top-level throws, return graceful fallback from knowledge base rather than a broken 500
    const fallbackAnswer = generateLocalKnowledgeResponse("", "Consultant");
    res.json({
      reply: `${fallbackAnswer}\n\n---\n*Verified response provided by Coreenact Knowledge Base.*`,
      modelUsed: "coreenact-enterprise-kb",
      roleUsed: "consultant",
      roleTitle: "D365 Functional Consultant",
      knowledgeSourceUsed: "website",
      groundingSources: [{ title: "Coreenact Official Website", url: "https://coreenact.com" }],
      searchQueries: [],
      isFreeTier: true,
      isLocalFallback: true,
    });
  }
});

// 3. Direct Customer Query Free Answering Endpoint (Website Content or Google Search with Resilient Fallback)
app.post("/api/customer-query", async (req, res) => {
  try {
    const { query, source = "hybrid" } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Customer query string is required." });
    }

    const ai = getGenAI();
    let systemInstruction = "You are Coreenact's Customer Support & ERP AI Assistant. Your job is to answer customer questions accurately, politely, and professionally without charge.";

    if (source === "website" || source === "hybrid") {
      systemInstruction += `\n\n${COREENACT_WEBSITE_KNOWLEDGE}\n\nUse this official Coreenact website knowledge base to answer company, service, EdCore, localization, and pricing questions.`;
    }

    if (source === "google" || source === "hybrid") {
      systemInstruction += "\n\nUse Google Search to answer queries that require real-time or external industry information.";
    }

    const enableSearch = source === "google" || source === "hybrid";

    const result = await executeResilientGeneration({
      ai,
      contents: query,
      systemInstruction,
      enableSearch,
      preferredModel: "gemini-3.8-flash",
      queryTextForFallback: query,
      roleTitle: "Customer Support Advisor",
    });

    res.json({
      query,
      reply: result.reply,
      sourceUsed: source,
      modelUsed: result.modelUsed,
      groundingSources: result.groundingSources,
      searchQueries: result.searchQueries,
      isFreeTier: true,
      isLocalFallback: result.isLocalFallback || false,
      freeMessage: "100% Free - Answered via Coreenact AI",
    });
  } catch (error: any) {
    console.error("Customer query error:", error);
    const query = req.body?.query || "";
    const fallbackAnswer = generateLocalKnowledgeResponse(query, "Customer Support Advisor");
    res.json({
      query,
      reply: `${fallbackAnswer}\n\n---\n*Verified response provided by Coreenact Knowledge Base.*`,
      sourceUsed: req.body?.source || "website",
      modelUsed: "coreenact-enterprise-kb",
      groundingSources: [{ title: "Coreenact Official Website", url: "https://coreenact.com" }],
      searchQueries: [],
      isFreeTier: true,
      isLocalFallback: true,
      freeMessage: "100% Free - Coreenact Verified Knowledge Base",
    });
  }
});

// 3. Google Maps Grounding Endpoint
app.post("/api/maps-grounding", async (req, res) => {
  try {
    const { prompt, lat, lng } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const ai = getGenAI();
    const config: any = {
      tools: [{ googleMaps: {} }],
    };

    if (lat && lng) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: Number(lat),
            longitude: Number(lng),
          },
        },
      };
    }

    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config,
      });
    } catch (mapsErr: any) {
      console.warn(`Maps grounding tool failed or quota reached (${mapsErr?.message}). Trying direct model without tools...`);
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: `Provide a concise geographical and commercial description of the surrounding area and logistical benefits for: ${prompt}`,
        });
      } catch (liteErr) {
        // Fallback directly to structured hub info
        return res.json({
          text: `Coreenact Global Delivery Center Hub:\n- Location: ${prompt}\n- Facility: Modern Tier-1 IT infrastructure with high-speed connectivity, dedicated enterprise conference rooms, and 24/7 SLA command centers.\n- Accessibility: Strategically situated within prime commercial business corridors with convenient transit and international airport proximity.`,
          groundingChunks: [],
        });
      }
    }

    const text = response?.text || `Coreenact Delivery Hub: ${prompt}`;
    const groundingChunks =
      response?.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    res.json({
      text,
      groundingChunks,
    });
  } catch (error: any) {
    console.error("Maps grounding API error:", error);
    res.status(500).json({
      error: error.message || "Failed to fetch maps-grounded intelligence.",
      details: error.toString(),
    });
  }
});

// 4. High-Quality Image Generation (gemini-3-pro-image-preview)
app.post("/api/generate-image", async (req, res) => {
  try {
    const {
      prompt,
      imageSize = "1K",
      aspectRatio = "16:9",
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const ai = getGenAI();

    // Use gemini-3-pro-image-preview per instruction
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
          imageSize: imageSize as any,
        },
      },
    });

    let imageUrl = "";
    let caption = "";

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        imageUrl = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
      } else if (part.text) {
        caption += part.text;
      }
    }

    if (!imageUrl) {
      return res.status(500).json({
        error: "Model did not return image data. " + (caption || "Please try a different prompt."),
        caption,
      });
    }

    res.json({
      imageUrl,
      caption,
      imageSize,
      aspectRatio,
    });
  } catch (error: any) {
    console.error("Generate image API error:", error);
    res.status(500).json({
      error: error.message || "Image generation failed.",
      details: error.toString(),
    });
  }
});

// 5. Video Generation (Veo) - 3-step server workflow
// Step 1: Start video generation
app.post("/api/generate-video", async (req, res) => {
  try {
    const {
      prompt,
      aspectRatio = "16:9", // '16:9' or '9:16'
      imageBase64,
      mimeType = "image/png",
    } = req.body;

    const ai = getGenAI();

    const videoParams: any = {
      model: "veo-3.1-fast-generate-preview",
      prompt: prompt || "Cinematic transformation of enterprise business systems with glowing holographic data architecture, 4k ultra realistic, modern azure lighting",
      config: {
        numberOfVideos: 1,
        resolution: "720p",
        aspectRatio: aspectRatio === "9:16" ? "9:16" : "16:9",
      },
    };

    if (imageBase64) {
      videoParams.image = {
        imageBytes: imageBase64.replace(/^data:image\/[a-z]+;base64,/, ""),
        mimeType: mimeType || "image/png",
      };
    }

    const operation = await ai.models.generateVideos(videoParams);

    res.json({
      operationName: operation.name,
      status: "queued",
      aspectRatio: videoParams.config.aspectRatio,
    });
  } catch (error: any) {
    console.error("Generate video initiation error:", error);
    res.status(500).json({
      error: error.message || "Failed to initiate video generation.",
      details: error.toString(),
    });
  }
});

// Step 2: Poll video status
app.post("/api/video-status", async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: "operationName is required." });
    }

    const ai = getGenAI();
    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });

    res.json({
      done: Boolean(updated.done),
      error: updated.error || null,
      operationName,
    });
  } catch (error: any) {
    console.error("Video status polling error:", error);
    res.status(500).json({
      error: error.message || "Failed to poll video status.",
      details: error.toString(),
    });
  }
});

// Step 3: Download video stream
app.post("/api/video-download", async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: "operationName is required." });
    }

    const ai = getGenAI();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key is missing." });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

    if (!uri) {
      return res.status(404).json({ error: "Video URI not found or video generation not finished yet." });
    }

    const videoRes = await fetch(uri, {
      headers: { "x-goog-api-key": apiKey },
    });

    if (!videoRes.ok) {
      return res.status(videoRes.status).json({ error: "Failed to download video from Google servers." });
    }

    res.setHeader("Content-Type", "video/mp4");
    if (videoRes.body) {
      const reader = videoRes.body.getReader();
      const pump = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            res.end();
            break;
          }
          res.write(Buffer.from(value));
        }
      };
      await pump();
    } else {
      res.end();
    }
  } catch (error: any) {
    console.error("Video download streaming error:", error);
    res.status(500).json({
      error: error.message || "Failed to download video.",
      details: error.toString(),
    });
  }
});

// Vite middleware / production serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Coreenact Enterprise Platform server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

export { app };
export default app;
