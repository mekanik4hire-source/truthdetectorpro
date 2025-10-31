import { motion } from "framer-motion";
import {
  ShieldCheck,
  Eye,
} from "lucide-react";
import { Link } from "wouter";

const Section = ({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`w-full ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-7xl px-6 md:px-10 ${className}`}>{children}</div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-[#C69C6D] bg-white/5 px-3 py-1 text-xs text-white/80">
    <ShieldCheck className="h-3.5 w-3.5" /> {children}
  </span>
);

export default function Home() {
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
            <Link
              href="/transparency"
              data-testid="button-add-to-browser"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#2AD17B] px-5 py-3 text-black font-semibold hover:brightness-95 transition"
            >
              <ShieldCheck className="h-5 w-5" /> Add to Browser
            </Link>
            <Link
              href="/transparency"
              data-testid="link-transparency"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 hover:bg-white/10 transition"
            >
              <Eye className="h-5 w-5" /> View Transparency Dashboard
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
