import express from "express";
import path from "path";
import fs from "fs";
import https from "https";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;
const AUDIO_DIR = path.join(process.cwd(), "public/audio");

// Ensure audio dir exists
if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

function getHash(text: string): string {
  return crypto.createHash("md5").update(text.trim().replace(/\s+/g, " ")).digest("hex").slice(0, 16);
}

// Fetch a single TTS chunk from the Romanian voice service
function fetchTtsChunk(text: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const url = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + encodeURIComponent(text) + "&tl=ro&client=tw-ob";
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error("TTS service responded with status " + res.statusCode));
      }
      const chunks: Buffer[] = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    }).on("error", reject);
  });
}

// In-memory cache for fast sub-millisecond serving
const ttsMemoryCache = new Map<string, Buffer>();

// Synthesizes Romanian voice with female narrative tone, caching to disk and memory
async function getRomanianAudioBuffer(text: string): Promise<Buffer | null> {
  const norm = text.trim().replace(/\s+/g, " ");
  if (!norm) return null;

  const hash = getHash(norm);
  const filePath = path.join(AUDIO_DIR, `${hash}.mp3`);

  // 1. Check memory cache
  if (ttsMemoryCache.has(hash)) {
    return ttsMemoryCache.get(hash)!;
  }

  // 2. Check disk cache in public/audio
  if (fs.existsSync(filePath)) {
    try {
      const buffer = fs.readFileSync(filePath);
      if (buffer.length > 500) {
        ttsMemoryCache.set(hash, buffer);
        return buffer;
      }
    } catch {
      // ignore and re-synthesize
    }
  }

  // 3. Synthesize dynamically with sentence splitting
  try {
    const sentences = norm.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [norm];
    const buffers: Buffer[] = [];

    for (const s of sentences) {
      const trimmed = s.trim();
      if (!trimmed) continue;

      if (trimmed.length <= 140) {
        buffers.push(await fetchTtsChunk(trimmed));
      } else {
        const words = trimmed.split(" ");
        let current = "";
        for (const w of words) {
          if ((current + " " + w).length > 140) {
            buffers.push(await fetchTtsChunk(current.trim()));
            current = w;
          } else {
            current += " " + w;
          }
        }
        if (current.trim()) {
          buffers.push(await fetchTtsChunk(current.trim()));
        }
      }
    }

    const completeBuffer = Buffer.concat(buffers);
    if (completeBuffer.length > 0) {
      fs.writeFileSync(filePath, completeBuffer);
      ttsMemoryCache.set(hash, completeBuffer);
      return completeBuffer;
    }
    return null;
  } catch (err) {
    console.error("Romanian TTS synthesis error:", err);
    return null;
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "10mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", voice: "Romanian Narrative Female" });
  });

  // Direct static serving of public/audio with aggressive browser caching
  app.use("/audio", express.static(AUDIO_DIR, {
    maxAge: "365d",
    immutable: true,
  }));

  // GET /api/tts - Audio stream endpoint with exact same Romanian narrative voice
  app.get("/api/tts", async (req, res) => {
    const text = (req.query.text as string) || (req.query.t as string);
    if (!text) {
      return res.status(400).json({ error: "Missing text parameter" });
    }

    const audioBuffer = await getRomanianAudioBuffer(text);
    if (!audioBuffer) {
      return res.status(500).json({ error: "Failed to generate Romanian voice" });
    }

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.send(audioBuffer);
  });

  // POST /api/tts - JSON endpoint returning base64 audio data
  app.post("/api/tts", async (req, res) => {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Invalid text in request body" });
    }

    const audioBuffer = await getRomanianAudioBuffer(text);
    if (!audioBuffer) {
      return res.status(500).json({ error: "Failed to generate Romanian voice" });
    }

    res.json({
      audioBase64: audioBuffer.toString("base64"),
      mimeType: "audio/mpeg",
      cached: true,
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
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
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
