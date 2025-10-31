import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Users, BarChart3, Globe, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Military-Grade Security",
    description: "Your data is protected with enterprise-level encryption and security protocols."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get verification results in under 3 seconds with our optimized AI engine."
  },
  {
    icon: Users,
    title: "Collaborative Teams",
    description: "Work together with your team to verify claims and share insights seamlessly."
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Track verification history, patterns, and trends with comprehensive dashboards."
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Verify claims in over 50 languages with native accuracy and context understanding."
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "We never store your sensitive data. All verifications are processed and discarded."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-card">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Powerful Features</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to verify truth and combat misinformation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-feature-${index}`}>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
