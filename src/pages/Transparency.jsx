import React from "react";
import {
  ShieldCheck,
  AlertTriangle,
  Activity,
  BarChart3,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const tokens = {
  ink: "#0B0E12",
  safe: "#2AD17B",
  warn: "#FFB020",
  copper: "#C69C6D",
  patina: "#2A8C82",
};

const StatCard = ({ label, value, sublabel, icon: Icon, accent }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
    <div className="flex items-center justify-between">
      <span className="text-sm text-white/70">{label}</span>
      <Icon className="h-5 w-5" />
    </div>
    <div className="mt-3 text-3xl font-bold">{value}</div>
    {sublabel && <div className="mt-1 text-xs text-white/60">{sublabel}</div>}
    <div className="mt-4 h-1 rounded-full" style={{ background: accent, opacity: 0.5 }} />
  </div>
);

const mockDaily = Array.from({ length: 30 }).map((_, i) => ({
  day: i + 1,
  scans: Math.round(400 + Math.random() * 300),
  risky: Math.round(40 + Math.random() * 40),
}));

export default function Transparency() {
  const totalScans = mockDaily.reduce((a, b) => a + b.scans, 0);
  const totalRisky = mockDaily.reduce((a, b) => a + b.risky, 0);
  const riskyRate = ((totalRisky / totalScans) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-[#0B0E12] text-white p-8">
      <h1 className="text-3xl font-bold mb-2">Transparency & Trust</h1>
      <p className="text-white/70 mb-6">
        Live metrics showing uptime, accuracy, scan volume, risky flags, and time-to-verdict.
      </p>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Uptime (90d)" value="99.97%" icon={Activity} accent={tokens.safe} />
        <StatCard label="Accuracy (30d)" value="98.4%" sublabel="False positives: 1.6%" icon={BarChart3} accent={tokens.copper} />
        <StatCard label="Scans (30d)" value={totalScans.toLocaleString()} icon={ShieldCheck} accent={tokens.patina} />
        <StatCard label="Risky rate" value={`${riskyRate}%`} icon={AlertTriangle} accent={tokens.warn} />
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold mb-3">Scans vs. Risky Flags (30 days)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockDaily}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip contentStyle={{ background: "#12151a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="scans" fill="rgba(42,209,123,0.25)" stroke="#2AD17B" strokeWidth={2} />
              <Area type="monotone" dataKey="risky" fill="rgba(255,176,32,0.2)" stroke="#FFB020" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
