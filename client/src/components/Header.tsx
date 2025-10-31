import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-sm bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold tracking-tight">TruthDetectorPro</div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover-elevate px-2 py-1 rounded-md" data-testid="link-features">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium hover-elevate px-2 py-1 rounded-md" data-testid="link-how-it-works">
            How It Works
          </a>
          <a href="#pricing" className="text-sm font-medium hover-elevate px-2 py-1 rounded-md" data-testid="link-pricing">
            Pricing
          </a>
          <a href="#about" className="text-sm font-medium hover-elevate px-2 py-1 rounded-md" data-testid="link-about">
            About
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" data-testid="button-login">
            Log In
          </Button>
          <Button variant="default" data-testid="button-get-started">
            Get Started
          </Button>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <nav className="flex flex-col p-4 gap-2">
            <a href="#features" className="text-sm font-medium hover-elevate px-4 py-2 rounded-md">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover-elevate px-4 py-2 rounded-md">
              How It Works
            </a>
            <a href="#pricing" className="text-sm font-medium hover-elevate px-4 py-2 rounded-md">
              Pricing
            </a>
            <a href="#about" className="text-sm font-medium hover-elevate px-4 py-2 rounded-md">
              About
            </a>
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="ghost">Log In</Button>
              <Button variant="default">Get Started</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
