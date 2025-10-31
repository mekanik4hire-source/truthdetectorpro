import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "TruthDetectorPro has revolutionized how our newsroom verifies breaking stories. The speed and accuracy are unmatched.",
    author: "Sarah Chen",
    role: "Editor-in-Chief",
    company: "Global News Network",
    initials: "SC"
  },
  {
    quote: "As a researcher, I rely on TruthDetectorPro daily. It saves hours of manual fact-checking and provides sources I can trust.",
    author: "Dr. Marcus Johnson",
    role: "Research Director",
    company: "Institute of Studies",
    initials: "MJ"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">What Our Users Say</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by professionals across journalism, research, and education
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-testimonial-${index}`}>
              <CardContent className="p-8">
                <p className="text-base leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
