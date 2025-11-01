import { Link } from "wouter";
import { Share, Plus, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Install() {
  return (
    <main className="min-h-screen bg-[#0B0E12] text-white">
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">
            Install TruthDetectorPro
          </h1>
          <p className="text-white/70 text-lg">
            Get instant access to fact-checking from your home screen
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share className="w-5 h-5 text-[#C69C6D]" />
              iOS Safari Installation
            </CardTitle>
            <CardDescription>
              Follow these steps to install TruthDetectorPro on your iPhone or iPad
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#C69C6D] flex items-center justify-center text-[#0B0E12] font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tap the Share button</h3>
                <p className="text-white/70 text-sm">
                  Tap the <Share className="inline w-4 h-4" /> Share icon at the bottom of your Safari browser
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#C69C6D] flex items-center justify-center text-[#0B0E12] font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Add to Home Screen</h3>
                <p className="text-white/70 text-sm">
                  Scroll down and tap "Add to Home Screen" <Plus className="inline w-4 h-4" />
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#C69C6D] flex items-center justify-center text-[#0B0E12] font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Confirm installation</h3>
                <p className="text-white/70 text-sm">
                  Tap "Add" in the top-right corner to complete the installation
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#2AD17B] flex items-center justify-center text-[#0B0E12] font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Launch from Home Screen</h3>
                <p className="text-white/70 text-sm">
                  Find the TruthDetectorPro icon on your home screen and tap to launch
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HomeIcon className="w-5 h-5 text-[#C69C6D]" />
              Desktop Installation
            </CardTitle>
            <CardDescription>
              Chrome, Edge, and other Chromium browsers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white/70 text-sm">
              Look for the install icon in your browser's address bar (usually a 
              <Plus className="inline w-4 h-4 mx-1" /> or 
              <span className="mx-1 px-2 py-1 bg-white/10 rounded text-xs">⊕</span> 
              icon). Click it and follow the prompts to install TruthDetectorPro.
            </p>
            <p className="text-white/70 text-sm">
              Alternatively, open your browser menu and select "Install TruthDetectorPro" 
              or "Add to Home screen".
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/">
            <Button 
              variant="outline" 
              size="lg"
              data-testid="button-back-home"
            >
              <HomeIcon className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
