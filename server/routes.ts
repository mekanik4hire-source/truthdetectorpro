import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import type { VerificationResult, VerificationSource } from "@shared/schema";

// --- BEGIN: Metrics Mock (live-feel) ---
type TimeseriesPoint = { day: number; date: string; scans: number; risky: number; ttv: number };

const metrics = {
  uptime90d: 99.97,
  accuracy30d: 98.4,
  scans30d: 0,
  risky30d: 0,
  avgTTVms: 780,
};

// 30 days of synthetic points
const timeseries: TimeseriesPoint[] = Array.from({ length: 30 }).map((_, i) => {
  const scans = Math.round(400 + Math.random() * 300);
  const risky = Math.round(40 + Math.random() * 40);
  const ttv = Math.round(600 + Math.random() * 200);
  metrics.scans30d += scans;
  metrics.risky30d += risky;
  const date = new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  return { day: i + 1, date, scans, risky, ttv };
});

// keep the last point moving so the dashboard looks alive
setInterval(() => {
  const bump = Math.round(200 + Math.random() * 200);
  const risk = Math.round(bump * (0.1 + Math.random() * 0.1));
  metrics.scans30d += bump;
  metrics.risky30d += risk;
  metrics.avgTTVms = Math.max(480, Math.min(1200, metrics.avgTTVms + (Math.random() - 0.5) * 40));
  const today = timeseries[timeseries.length - 1];
  today.scans += bump;
  today.risky += risk;
  today.ttv = metrics.avgTTVms;
}, 8000);
// --- END: Metrics Mock ---

export async function registerRoutes(app: Express): Promise<Server> {
  const verifyClaimSchema = z.object({
    claim: z.string().min(1, "Claim is required"),
  });

  app.post("/api/verify", async (req, res) => {
    try {
      const { claim } = verifyClaimSchema.parse(req.body);

      const analysisResult = await analyzeClaimMock(claim);

      const verification = await storage.createVerification({
        claim,
        verdict: analysisResult.verdict,
        confidence: analysisResult.confidence,
        status: analysisResult.status,
        sources: analysisResult.sources,
      });

      const result: VerificationResult = {
        id: verification.id,
        claim: verification.claim,
        verdict: verification.verdict,
        confidence: verification.confidence,
        status: verification.status,
        sources: JSON.parse(verification.sources),
        createdAt: verification.createdAt.toISOString(),
      };

      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Verification error:", error);
      res.status(500).json({ error: "Failed to verify claim" });
    }
  });

  app.get("/api/verifications", async (req, res) => {
    try {
      const verifications = await storage.getAllVerifications();
      const results: VerificationResult[] = verifications.map(v => ({
        id: v.id,
        claim: v.claim,
        verdict: v.verdict,
        confidence: v.confidence,
        status: v.status,
        sources: JSON.parse(v.sources),
        createdAt: v.createdAt.toISOString(),
      }));
      res.json(results);
    } catch (error) {
      console.error("Error fetching verifications:", error);
      res.status(500).json({ error: "Failed to fetch verifications" });
    }
  });

  app.get("/api/verifications/:id", async (req, res) => {
    try {
      const verification = await storage.getVerification(req.params.id);
      if (!verification) {
        return res.status(404).json({ error: "Verification not found" });
      }
      const result: VerificationResult = {
        id: verification.id,
        claim: verification.claim,
        verdict: verification.verdict,
        confidence: verification.confidence,
        status: verification.status,
        sources: JSON.parse(verification.sources),
        createdAt: verification.createdAt.toISOString(),
      };
      res.json(result);
    } catch (error) {
      console.error("Error fetching verification:", error);
      res.status(500).json({ error: "Failed to fetch verification" });
    }
  });

  app.get("/api/metrics/summary", (_req, res) => {
    const riskyRate = metrics.scans30d ? (metrics.risky30d / metrics.scans30d) * 100 : 0;
    res.json({
      uptime90d: metrics.uptime90d,
      accuracy30d: metrics.accuracy30d,
      scans30d: metrics.scans30d,
      risky30d: metrics.risky30d,
      riskyRate: Number(riskyRate.toFixed(1)),
      avgTTVms: Math.round(metrics.avgTTVms),
      lastUpdated: new Date().toISOString(),
    });
  });

  app.get("/api/metrics/timeseries", (_req, res) => {
    res.json({ points: timeseries });
  });

  const httpServer = createServer(app);

  return httpServer;
}

async function analyzeClaimMock(claim: string): Promise<{
  verdict: string;
  confidence: number;
  status: string;
  sources: VerificationSource[];
}> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const claimLower = claim.toLowerCase();
  
  let verdict = "Uncertain";
  let confidence = 50;
  let status = "uncertain";

  if (claimLower.includes("earth") && claimLower.includes("sun")) {
    verdict = "True";
    confidence = 99;
    status = "verified";
  } else if (claimLower.includes("flat earth")) {
    verdict = "False";
    confidence = 98;
    status = "false";
  } else if (claimLower.includes("moon landing")) {
    verdict = "True";
    confidence = 95;
    status = "verified";
  } else {
    const random = Math.random();
    if (random > 0.7) {
      verdict = "Mostly True";
      confidence = Math.floor(70 + Math.random() * 20);
      status = "verified";
    } else if (random > 0.4) {
      verdict = "Partially True";
      confidence = Math.floor(50 + Math.random() * 20);
      status = "uncertain";
    } else {
      verdict = "Mostly False";
      confidence = Math.floor(60 + Math.random() * 20);
      status = "false";
    }
  }

  const sources: VerificationSource[] = [
    {
      name: "Reuters Fact Check",
      url: "https://www.reuters.com/fact-check",
      credibility: Math.floor(90 + Math.random() * 8),
    },
    {
      name: "AP News",
      url: "https://apnews.com",
      credibility: Math.floor(88 + Math.random() * 8),
    },
    {
      name: "Snopes",
      url: "https://www.snopes.com",
      credibility: Math.floor(85 + Math.random() * 8),
    },
  ];

  return { verdict, confidence, status, sources };
}
