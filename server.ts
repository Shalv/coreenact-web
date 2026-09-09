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

// 2. Multi-turn Chat Endpoint with System Instructions and Thinking Level
app.post("/api/chat", async (req, res) => {
  try {
    const {
      messages = [],
      role = "architect",
      model = "gemini-3.5-flash",
      enableThinking = false,
    } = req.body;

    const ai = getGenAI();

    // Determine system instruction based on enterprise persona
    const roleInstructions: Record<string, string> = {
      architect:
        "You are Coreenact's Principal Enterprise Solutions Architect. You specialize in Microsoft Dynamics 365 Business Central, cloud ERP migrations from legacy Dynamics NAV/GP, Power Platform, and automated business workflows. Provide structured, authoritative, actionable recommendations with clear business value and technical implementation steps.",
      d365:
        "You are Coreenact's Lead Dynamics 365 Business Central Technical Consultant. You provide detailed guidance on Business Central AL development, financials, supply chain, inventory management, India GST localization, and Power Platform integrations.",
      pricing:
        "You are Coreenact's Business Central ROI & Migration Advisor. You calculate estimated implementation roadmaps, Microsoft Business Central licensing models (Essential vs Premium), TCO savings, and NAV-to-BC upgrade timelines.",
      copilot:
        "You are Coreenact's Business Central Automation & Copilot Specialist. You help businesses configure Copilot in Business Central, automate document processing, reconcile bank statements, and build Power Automate approval flows.",
    };

    const systemInstruction = roleInstructions[role] || roleInstructions.architect;

    // Determine model selection
    let selectedModel = model;
    if (enableThinking) {
      selectedModel = "gemini-3.1-pro-preview";
    }

    // Format chat history into contents
    const contents: any[] = [];
    for (const msg of messages) {
      contents.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      });
    }

    if (contents.length === 0) {
      return res.status(400).json({ error: "No messages provided." });
    }

    const config: any = {
      systemInstruction,
    };

    if (enableThinking || selectedModel === "gemini-3.1-pro-preview") {
      config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
    }

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config,
    });

    const reply = response.text || "No response generated.";
    res.json({ reply, modelUsed: selectedModel });
  } catch (error: any) {
    console.error("Chat API error:", error);
    res.status(500).json({
      error: error.message || "Failed to process chat request.",
      details: error.toString(),
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

if (process.env.VERCEL !== "1") {
  startServer();
}

export default app;
export { app };
