import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@assets/generated_images/Dashboard_verification_interface_screenshot_cf39d54e.png";

export default function Hero() {
  return (
    <section className="min-h-[700px] pt-16 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
          <div className="md:col-span-3 space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                Verify Truth in Seconds
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Advanced AI-powered fact-checking that analyzes claims, cross-references sources, and delivers instant verification results with detailed confidence scores.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" data-testid="button-start-verifying">
                Start Verifying
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-watch-demo">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold font-mono">10M+</div>
                <div className="text-sm text-muted-foreground">Claims Verified</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-mono">98.5%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-mono">150K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <img
                src={heroImage}
                alt="TruthDetectorPro Dashboard"
                className="relative rounded-lg shadow-xl border"
                data-testid="img-hero"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
