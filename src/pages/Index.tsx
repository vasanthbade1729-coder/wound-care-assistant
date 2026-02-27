import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ImageUploader from "@/components/ImageUploader";
import AnalysisResult, { type WoundAnalysis } from "@/components/AnalysisResult";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<WoundAnalysis | null>(null);

  const handleImageSelect = async (base64: string) => {
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-wound", {
        body: { imageBase64: base64 },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setAnalysis(data as WoundAnalysis);
    } catch (err: any) {
      console.error("Analysis failed:", err);
      toast.error(err.message || "Failed to analyze wound. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="hero-gradient py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary-foreground/20 p-2">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-primary-foreground">
                WoundCare AI
              </h1>
              <p className="text-xs text-primary-foreground/80">
                AI-Powered Wound Assessment
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-lg px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Trust badge */}
          <div className="flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm text-accent-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Your images are analyzed securely and never stored</span>
          </div>

          {/* Upload */}
          <ImageUploader onImageSelect={handleImageSelect} isAnalyzing={isAnalyzing} />

          {/* Results */}
          {analysis && <AnalysisResult analysis={analysis} />}

          {/* Empty state */}
          {!analysis && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-8"
            >
              <p className="text-sm text-muted-foreground">
                Upload a wound photo to get an instant AI-powered severity
                assessment with care recommendations.
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
