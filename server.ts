import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, ThinkingLevel, GenerateVideosOperation } from "@google/genai";
import dotenv from "dotenv";

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

// 2. Multi-turn Chat Endpoint with Website RAG + Google Search Grounding (Free Tier)
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
    // If Google Search grounding is enabled ("google" or "hybrid"), prefer gemini-3.8-flash or gemini-3.5-flash (both free tier and support search tools)
    let selectedModel = model || roleConfig.defaultModel || "gemini-3.8-flash";

    if ((knowledgeSource === "google" || knowledgeSource === "hybrid") && selectedModel === "gemini-3.1-flash-lite") {
      selectedModel = "gemini-3.8-flash";
    }

    if (enableThinking && selectedModel === "gemini-3.1-pro-preview") {
      selectedModel = "gemini-3.1-pro-preview";
    }

    // Format chat history into contents ensuring alternating user/model turns
    const rawContents: any[] = [];
    for (const msg of messages) {
      if (!msg.content || typeof msg.content !== "string") continue;
      const roleStr = msg.role === "user" ? "user" : "model";
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
          // Merge consecutive same-role messages
          last.parts[0].text += `\n\n${item.parts[0].text}`;
        } else {
          contents.push(item);
        }
      }
    }

    if (contents.length === 0) {
      return res.status(400).json({ error: "Chat must begin with a user message." });
    }

    const config: any = {
      systemInstruction: combinedInstruction,
    };

    // Attach Google Search tool if google or hybrid knowledge is active
    if (knowledgeSource === "google" || knowledgeSource === "hybrid") {
      config.tools = [{ googleSearch: {} }];
    }

    if (enableThinking && selectedModel === "gemini-3.1-pro-preview") {
      config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
    }

    let response;
    try {
      response = await ai.models.generateContent({
        model: selectedModel,
        contents,
        config,
      });
    } catch (modelError: any) {
      console.warn(`Primary generation with ${selectedModel} (tools: ${!!config.tools}) failed:`, modelError?.message);
      // If tools with specific model failed, fallback to gemini-3.8-flash or gemini-3.5-flash without tools
      try {
        selectedModel = "gemini-3.8-flash";
        response = await ai.models.generateContent({
          model: selectedModel,
          contents,
          config: {
            systemInstruction: combinedInstruction,
          },
        });
      } catch (fallbackError: any) {
        selectedModel = "gemini-3.5-flash";
        response = await ai.models.generateContent({
          model: selectedModel,
          contents,
          config: {
            systemInstruction: combinedInstruction,
          },
        });
      }
    }

    const reply = response.text || "I was unable to generate a response. Please rephrase your question.";

    // Extract Google Search grounding citations if present
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

    res.json({
      reply,
      modelUsed: selectedModel,
      roleUsed: role,
      roleTitle: roleConfig.title,
      knowledgeSourceUsed: knowledgeSource,
      groundingSources,
      searchQueries: webSearchQueries || [],
      isFreeTier: true,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    res.status(500).json({
      error: error.message || "Failed to process chat request.",
      details: error.toString(),
    });
  }
});

// 3. Direct Customer Query Free Answering Endpoint (Website Content or Google Search)
app.post("/api/customer-query", async (req, res) => {
  try {
    const { query, source = "hybrid" } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Customer query string is required." });
    }

    const ai = getGenAI();
    const modelToUse = "gemini-3.8-flash"; // Free tier, fast, high capability

    let systemInstruction = "You are Coreenact's Customer Support & ERP AI Assistant. Your job is to answer customer questions accurately, politely, and professionally without charge.";

    const config: any = {};

    if (source === "website" || source === "hybrid") {
      systemInstruction += `\n\n${COREENACT_WEBSITE_KNOWLEDGE}\n\nUse this official Coreenact website knowledge base to answer company, service, EdCore, localization, and pricing questions.`;
    }

    if (source === "google" || source === "hybrid") {
      config.tools = [{ googleSearch: {} }];
      systemInstruction += "\n\nUse Google Search to answer queries that require real-time or external industry information.";
    }

    config.systemInstruction = systemInstruction;

    const response = await ai.models.generateContent({
      model: modelToUse,
      contents: query,
      config,
    });

    const reply = response.text || "No answer could be found for your query.";
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

    res.json({
      query,
      reply,
      sourceUsed: source,
      modelUsed: modelToUse,
      groundingSources,
      searchQueries: webSearchQueries || [],
      isFreeTier: true,
      freeMessage: "100% Free - Answered via standard Gemini API free tier",
    });
  } catch (error: any) {
    console.error("Customer query error:", error);
    res.status(500).json({
      error: error.message || "Failed to answer customer query.",
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

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config,
    });

    const text = response.text || "";
    const groundingChunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

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
