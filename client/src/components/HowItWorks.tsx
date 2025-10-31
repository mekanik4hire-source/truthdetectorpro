import { Card, CardContent } from "@/components/ui/card";
import { FileText, Zap, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Submit Your Claim",
    description: "Paste any text, URL, or statement you want to verify. Our system accepts multiple formats and sources."
  },
  {
    icon: Zap,
    title: "AI Analysis",
    description: "Our advanced algorithms cross-reference multiple databases, fact-check sources, and analyze context in milliseconds."
  },
  {
    icon: CheckCircle,
    title: "Get Results",
    description: "Receive detailed verification reports with confidence scores, source citations, and comprehensive breakdowns."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">How It Works</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to verify any claim with precision and speed
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-step-${index}`}>
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 mb-4">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
