import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Eye,
  Download,
  Zap,
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
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('[PWA] Install prompt captured');
    };
    
    window.addEventListener('beforeinstallprompt', handler);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('Install not available yet. Visit the home page then come back.');
      return;
    }
    
    await (deferredPrompt as any).prompt();
    const { outcome } = await (deferredPrompt as any).userChoice;
    console.log(`[PWA] User response: ${outcome}`);
    setDeferredPrompt(null);
  };
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
          
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              <button
                id="installPwaBtn"
                onClick={handleInstallClick}
                data-testid="button-install-pwa"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#2AD17B] px-5 py-3 text-black font-semibold hover:brightness-95 transition cursor-pointer"
              >
                <Download className="h-5 w-5" /> Install App (PWA)
              </button>
              <Link
                href="/docs/extension-dev"
                data-testid="button-add-extension"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#C69C6D] px-5 py-3 text-black font-semibold hover:brightness-95 transition"
              >
                <Zap className="h-5 w-5" /> Add Scam Radar (Extension)
              </Link>
              <Link
                href="/transparency"
                data-testid="link-transparency"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 hover:bg-white/10 transition"
              >
                <Eye className="h-5 w-5" /> View Transparency
              </Link>
            </div>
            <p className="text-sm text-white/60 max-w-2xl">
              <strong>On-demand checks:</strong> Install the app for manual fact verification. 
              <strong className="ml-2">Background scanning:</strong> Add the Chrome/Edge extension for always-on protection.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
