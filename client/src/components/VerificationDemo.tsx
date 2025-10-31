import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { VerificationResult } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function VerificationDemo() {
  const [claim, setClaim] = useState("");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const { toast } = useToast();

  const verifyMutation = useMutation({
    mutationFn: async (claimText: string) => {
      const response = await apiRequest("POST", "/api/verify", { claim: claimText });
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
    },
    onError: (error: any) => {
      toast({
        title: "Verification Failed",
        description: error.message || "Failed to verify claim. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleVerify = () => {
    if (!claim.trim()) return;
    setResult(null);
    verifyMutation.mutate(claim);
  };

  const getStatusIcon = (status: string) => {
    if (status === "verified") return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (status === "false") return <XCircle className="h-5 w-5 text-red-500" />;
    return <AlertCircle className="h-5 w-5 text-yellow-500" />;
  };

  return (
    <section className="py-16 md:py-24">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Try It Yourself</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter any claim below to see our verification system in action
          </p>
        </div>

        <Card data-testid="card-verification-demo">
          <CardHeader>
            <CardTitle>Claim Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Textarea
                placeholder="Enter a claim to verify... (e.g., 'The Earth orbits the Sun')"
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
                className="min-h-[120px] resize-none"
                data-testid="input-claim"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-muted-foreground">
                  {claim.length} characters
                </span>
                <Button 
                  onClick={handleVerify} 
                  disabled={!claim.trim() || verifyMutation.isPending}
                  data-testid="button-verify"
                >
                  {verifyMutation.isPending ? "Analyzing..." : "Verify Claim"}
                </Button>
              </div>
            </div>

            {verifyMutation.isPending && (
              <div className="space-y-2" data-testid="status-analyzing">
                <p className="text-sm font-medium">Analyzing claim...</p>
                <Progress value={66} />
              </div>
            )}

            {result && (
              <div className="space-y-4 pt-4 border-t" data-testid="result-container">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <span className="text-lg font-semibold">{result.verdict}</span>
                  </div>
                  <Badge variant="secondary" data-testid="badge-confidence">
                    {result.confidence}% Confidence
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Confidence Score</p>
                  <Progress value={result.confidence} className="h-2" />
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Verified Sources</p>
                  <div className="space-y-2">
                    {result.sources.map((source: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                        data-testid={`source-${index}`}
                      >
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{source.name}</span>
                        </div>
                        <span className="text-sm font-mono text-muted-foreground">
                          {source.credibility}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
