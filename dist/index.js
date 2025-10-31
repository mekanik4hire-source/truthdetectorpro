// server/index.ts
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
app.use(cors());
app.use(express.json());
var PORT = Number(process.env.PORT) || 3e3;
var metrics = {
  uptime90d: 99.97,
  accuracy30d: 98.4,
  scans30d: 0,
  risky30d: 0,
  avgTTVms: 780
};
var timeseries = Array.from({ length: 30 }).map((_, i) => {
  const scans = Math.round(400 + Math.random() * 300);
  const risky = Math.round(40 + Math.random() * 40);
  const ttv = Math.round(600 + Math.random() * 200);
  metrics.scans30d += scans;
  metrics.risky30d += risky;
  const date = new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1e3).toISOString().slice(0, 10);
  return { day: i + 1, date, scans, risky, ttv };
});
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
}, 8e3);
app.get("/api/metrics/summary", (_req, res) => {
  const riskyRate = metrics.scans30d ? metrics.risky30d / metrics.scans30d * 100 : 0;
  res.json({
    uptime90d: metrics.uptime90d,
    accuracy30d: metrics.accuracy30d,
    scans30d: metrics.scans30d,
    risky30d: metrics.risky30d,
    riskyRate: Number(riskyRate.toFixed(1)),
    avgTTVms: Math.round(metrics.avgTTVms),
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
  });
});
app.get("/api/metrics/timeseries", (_req, res) => {
  res.json({ points: timeseries });
});
var publicDir = path.join(__dirname, "../server/public");
app.use(express.static(publicDir));
app.get("*", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});
app.listen(PORT, () => {
  console.log(`\u{1F680} Server running at http://localhost:${PORT}`);
  console.log(`\u{1F4C1} Serving static files from: ${publicDir}`);
});
