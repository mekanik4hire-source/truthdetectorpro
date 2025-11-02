import { ShieldCheck, Download, Zap, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "wouter";

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`w-full ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-4xl px-6 md:px-10 ${className}`}>{children}</div>
);

const Step = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4 mb-8">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C69C6D] text-black font-bold flex items-center justify-center">
      {number}
    </div>
    <div className="flex-1">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="text-white/80">{children}</div>
    </div>
  </div>
);

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="bg-black/40 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4">
    <code className="text-sm text-[#2AD17B] font-mono">{children}</code>
  </pre>
);

export default function ExtensionDev() {
  return (
    <div className="min-h-screen bg-[#0B0E12] text-white">
      <div className="h-1 w-full bg-gradient-to-r from-[#C69C6D] via-[#A87C48] to-[#2A8C82]" />

      <Section className="py-12 md:py-16">
        <Container>
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-[#C69C6D] hover:underline mb-6">
              ← Back to Home
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-[#FFB020]" />
            <h1 className="text-4xl md:text-5xl font-extrabold">Scam Radar Extension</h1>
          </div>
          
          <p className="text-lg text-white/80 mb-8">
            Developer preview: Install our Chrome/Edge extension for <strong>always-on background protection</strong> against scams, 
            phishing, and misinformation. Runs locally on your device - no data leaves your computer.
          </p>

          <div className="bg-[#2AD17B]/10 border border-[#2AD17B]/30 rounded-lg p-4 mb-12">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-[#2AD17B] flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <strong className="text-[#2AD17B]">Privacy-First Design:</strong> All scanning happens locally on your device. 
                The extension monitors websites for risk patterns but never sends your browsing data to any server.
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Installation (Developer Mode)</h2>

          <div className="mb-12">
            <Step number={1} title="Open Chrome Extensions">
              <p className="mb-2">In Chrome or Edge, navigate to:</p>
              <CodeBlock>chrome://extensions</CodeBlock>
              <p className="text-sm text-white/60">For Edge, use: <code className="text-[#C69C6D]">edge://extensions</code></p>
            </Step>

            <Step number={2} title="Enable Developer Mode">
              <p className="mb-3">Toggle the <strong>"Developer mode"</strong> switch in the top-right corner of the page.</p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm">
                <AlertTriangle className="h-4 w-4 text-[#FFB020] inline mr-2" />
                This allows you to load extensions from your local files.
              </div>
            </Step>

            <Step number={3} title="Load Unpacked Extension">
              <p className="mb-3">Click the <strong>"Load unpacked"</strong> button and select the extension folder:</p>
              <CodeBlock>/path/to/truthdetectorpro/extension</CodeBlock>
              <p className="text-sm text-white/60 mb-3">
                If you cloned the repo from GitHub, navigate to the <code className="text-[#C69C6D]">extension/</code> folder inside the project.
              </p>
            </Step>

            <Step number={4} title="Pin the Extension">
              <p className="mb-3">
                Click the puzzle piece icon in Chrome's toolbar, find <strong>"TruthDetectorPro - Scam Radar"</strong>, 
                and click the pin icon to keep it visible.
              </p>
            </Step>

            <Step number={5} title="Verify It's Running">
              <p className="mb-3">You should see the extension badge showing <strong className="text-[#2AD17B]">"ON"</strong> in green.</p>
              <p className="mb-3">Browse to any website - the extension is now monitoring for risks in the background!</p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm">
                <strong>Test it:</strong> Open DevTools Console and look for logs like:
                <code className="block mt-2 text-[#2AD17B]">[TDP Background] Service worker started</code>
                <code className="block text-[#2AD17B]">[TDP Content] Script loaded on: https://example.com</code>
              </div>
            </Step>
          </div>

          <h2 className="text-2xl font-bold mb-6">What It Does</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <ShieldCheck className="h-6 w-6 text-[#2AD17B] mb-3" />
              <h3 className="font-semibold mb-2">Local Risk Detection</h3>
              <p className="text-sm text-white/70">
                Scans pages for phishing phrases, suspicious URLs, and insecure password forms - all processed locally.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <AlertTriangle className="h-6 w-6 text-[#FFB020] mb-3" />
              <h3 className="font-semibold mb-2">Visual Warnings</h3>
              <p className="text-sm text-white/70">
                Shows a dismissible ribbon at the top of risky pages. Non-intrusive and easy to dismiss.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <Download className="h-6 w-6 text-[#C69C6D] mb-3" />
              <h3 className="font-semibold mb-2">Daily Reports</h3>
              <p className="text-sm text-white/70">
                Track what you encountered and export as JSON. All data stored locally in your browser.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <Zap className="h-6 w-6 text-[#FFB020] mb-3" />
              <h3 className="font-semibold mb-2">Always Running</h3>
              <p className="text-sm text-white/70">
                Background service worker monitors ALL websites automatically. Badge shows "ON" status.
              </p>
            </div>
          </div>

          <div className="bg-[#FFB020]/10 border border-[#FFB020]/30 rounded-lg p-6 mb-12">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#FFB020]" />
              Developer Preview Notice
            </h3>
            <p className="text-sm text-white/80 mb-2">
              This extension is currently in development and only available via "Load Unpacked" for testing.
            </p>
            <p className="text-sm text-white/80">
              <strong>Not yet published to Chrome Web Store.</strong> Once stable, we'll publish it for one-click installation.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-6">Source Code</h2>

          <p className="text-white/80 mb-4">
            The extension is open source and lives in the <code className="text-[#C69C6D] bg-white/10 px-2 py-1 rounded">/extension</code> folder 
            of our GitHub repository. Contributions welcome!
          </p>

          <div className="flex gap-4">
            <a
              href="https://github.com/your-repo/truthdetectorpro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/20 px-5 py-3 hover:bg-white/20 transition"
            >
              View on GitHub →
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#C69C6D] px-5 py-3 text-black font-semibold hover:brightness-95 transition"
            >
              Back to Home
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
