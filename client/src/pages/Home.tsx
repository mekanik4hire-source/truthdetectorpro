import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import VerificationDemo from "@/components/VerificationDemo";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <VerificationDemo />
        <Statistics />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
