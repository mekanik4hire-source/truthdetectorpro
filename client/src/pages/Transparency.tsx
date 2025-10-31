import { useState, useEffect } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  Activity,
  BarChart3,
  ArrowLeft,
} from "lucide-react";
import { Link } from "wouter";
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

interface StatCardProps {
  label: string;
  value: string;
  sublabel?: string;
  icon: React.ElementType;
  accent: string;
}

const StatCard = ({ label, value, sublabel, icon: Icon, accent }: StatCardProps) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-5" data-testid={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
    <div className="flex items-center justify-between">
      <span className="text-sm text-white/70">{label}</span>
      <Icon className="h-5 w-5" />
    </div>
    <div className="mt-3 text-3xl font-bold" data-testid={`value-${label.toLowerCase().replace(/\s/g, '-')}`}>{value}</div>
    {sublabel && <div className="mt-1 text-xs text-white/60">{sublabel}</div>}
    <div className="mt-4 h-1 rounded-full" style={{ background: accent, opacity: 0.5 }} />
  </div>
);

interface MetricsSummary {
  uptime90d: number;
  accuracy30d: number;
  scans30d: number;
  risky30d: number;
  riskyRate: number;
  avgTTVms: number;
  lastUpdated: string;
}

interface TimeseriesDataPoint {
  day: number;
  date: string;
  scans: number;
  risky: number;
  ttv: number;
}

export default function Transparency() {
  const [summary, setSummary] = useState<MetricsSummary | null>(null);
  const [timeseries, setTimeseries] = useState<TimeseriesDataPoint[]>([]);

  useEffect(() => {
    fetch('/api/metrics/summary')
      .then(r => r.json())
      .then(setSummary)
      .catch(err => console.error('Failed to fetch summary:', err));
  }, []);

  useEffect(() => {
    fetch('/api/metrics/timeseries')
      .then(r => r.json())
      .then(data => setTimeseries(data.points))
      .catch(err => console.error('Failed to fetch timeseries:', err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0E12] text-white p-8">
      <div className="mb-6">
        <Link
          href="/"
          data-testid="link-back-home"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">Transparency & Trust</h1>
      <p className="text-white/70 mb-6">
        Live metrics showing uptime, accuracy, scan volume, risky flags, and time-to-verdict.
      </p>

      {summary ? (
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Uptime (90d)" value={`${summary.uptime90d.toFixed(2)}%`} icon={Activity} accent={tokens.safe} />
          <StatCard 
            label="Accuracy (30d)" 
            value={`${summary.accuracy30d.toFixed(1)}%`} 
            sublabel={`False positives: ${(100 - summary.accuracy30d).toFixed(1)}%`}
            icon={BarChart3} 
            accent={tokens.copper} 
          />
          <StatCard label="Scans (30d)" value={summary.scans30d.toLocaleString()} icon={ShieldCheck} accent={tokens.patina} />
          <StatCard label="Risky rate" value={`${summary.riskyRate}%`} icon={AlertTriangle} accent={tokens.warn} />
        </div>
      ) : (
        <div className="text-center text-white/60 py-8">Loading metrics...</div>
      )}

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold mb-3">Scans vs. Risky Flags (30 days)</h3>
        {timeseries.length > 0 ? (
          <div className="h-64" data-testid="chart-scans-risky">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeseries}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip contentStyle={{ background: "#12151a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="scans" fill="rgba(42,209,123,0.25)" stroke="#2AD17B" strokeWidth={2} />
                <Area type="monotone" dataKey="risky" fill="rgba(255,176,32,0.2)" stroke="#FFB020" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-white/60">Loading chart data...</div>
        )}
      </div>
    </div>
  );
}
