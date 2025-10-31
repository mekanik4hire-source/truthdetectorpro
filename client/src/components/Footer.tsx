import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t pt-16 pb-8">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate inline-block px-1 rounded-md" data-testid="link-features-footer">Features</a></li>
              <li><a href="#" className="hover-elevate inline-block px-1 rounded-md" data-testid="link-pricing-footer">Pricing</a></li>
              <li><a href="#" className="hover-elevate inline-block px-1 rounded-md" data-testid="link-api-footer">API</a></li>
              <li><a href="#" className="hover-elevate inline-block px-1 rounded-md" data-testid="link-integrations-footer">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate inline-block px-1 rounded-md" data-testid="link-about-footer">About</a></li>
              <li><a href="#" className="hover-elevate inline-block px-1 rounded-md" data-testid="link-blog-footer">Blog</a></li>
              <li><a href="#" className="hover-elevate inline-block px-1 rounded-md" data-testid="link-careers-footer">Careers</a></li>
              <li><a href="#" className="hover-elevate inline-block px-1 rounded-md" data-testid="link-press-footer">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate inline-block px-1 rounded-md" data-testid="link-docs-footer">Documentation</a></li>
              <li><a href="#" className="hover-elevate inline-block px-1 rounded-md" data-testid="link-help-footer">Help Center</a></li>
              <li><a href="#" className="hover-elevate inline-block px-1 rounded-md" data-testid="link-community-footer">Community</a></li>
              <li><a href="#" className="hover-elevate inline-block px-1 rounded-md" data-testid="link-status-footer">Status</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated with our latest features and news.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="your@email.com" 
                data-testid="input-newsletter"
              />
              <Button data-testid="button-subscribe">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 TruthDetectorPro. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover-elevate p-1 rounded-md" data-testid="link-privacy">
              <span className="text-sm">Privacy</span>
            </a>
            <a href="#" className="text-muted-foreground hover-elevate p-1 rounded-md" data-testid="link-terms">
              <span className="text-sm">Terms</span>
            </a>
            <div className="flex items-center gap-2 ml-4">
              <Button size="icon" variant="ghost" data-testid="button-twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="button-linkedin">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="button-github">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
