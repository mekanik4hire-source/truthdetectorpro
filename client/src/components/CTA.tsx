import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="w-full max-w-4xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Ready to Start Verifying?
        </h2>
        <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who trust TruthDetectorPro for accurate, fast fact-checking. Start your free trial today.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <Button size="lg" data-testid="button-cta-start-free-trial">
            Start Free Trial
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" data-testid="button-cta-contact-sales">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
