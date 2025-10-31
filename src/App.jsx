import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  Eye,
  Lock,
  Download,
  Globe,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`w-full ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-6 md:px-10 ${className}`}>{children}</div>
);

const Feature = ({ icon: Icon, title, children }) => (
  <div className="group rounded-2xl border border-[#C69C6D]/30 bg-white/5 p-6 backdrop-blur hover:border-[#A87C48]/60 transition">
    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#C69C6D]/50 bg-[#0B0E12] shadow">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-sm text-white/70 leading-relaxed">{children}</p>
  </div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-[#C69C6D] bg-white/5 px-3 py-1 text-xs text-white/80">
    <ShieldCheck className="h-3.5 w-3.5" /> {children}
  </span>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0E12] text-white">
      <div className="h-1 w-full bg-gradient-to-r from-[#C69C6D] via-[#A87C48] to-[#2A8C82]" />

      {/* Hero */}
      <Section id="hero" className="relative overflow-hidden">
        <Container className="py-16 md:py-24">
          <Badge>Explainable AI • Privacy-First • Evidence-Backed</Badge>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">
            Know what to trust in seconds.
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            Scan links, images, videos, and messages. Get a plain-English verdict with
            a confidence score—and export receipts to prove it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#2AD17B] px-5 py-3 text-black font-semibold hover:brightness-95"
            >
              <ShieldCheck className="h-5 w-5" /> Add to Browser
            </a>
            <a
              href="#try"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 hover:bg-white/10"
            >
              <Eye className="h-5 w-5" /> Try a Free Scan
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
}
