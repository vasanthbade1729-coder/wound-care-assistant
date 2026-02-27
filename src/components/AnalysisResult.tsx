import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  ClipboardList,
  ShieldAlert,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface WoundAnalysis {
  severity: "mild" | "moderate" | "severe";
  symptoms: string[];
  description: string;
  recommendations: string[];
  seekEmergencyCare: boolean;
  emergencyReason: string;
}

const severityConfig = {
  mild: {
    label: "Mild",
    icon: CheckCircle2,
    className: "severity-mild",
    barClass: "bg-[hsl(142,71%,45%)]",
    barWidth: "33%",
  },
  moderate: {
    label: "Moderate",
    icon: AlertCircle,
    className: "severity-moderate",
    barClass: "bg-[hsl(38,92%,50%)]",
    barWidth: "66%",
  },
  severe: {
    label: "Severe",
    icon: AlertTriangle,
    className: "severity-severe",
    barClass: "bg-[hsl(0,72%,51%)]",
    barWidth: "100%",
  },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const AnalysisResult = ({ analysis }: { analysis: WoundAnalysis }) => {
  const config = severityConfig[analysis.severity];
  const SeverityIcon = config.icon;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {/* Emergency Banner */}
      {analysis.seekEmergencyCare && (
        <motion.div variants={item}>
          <Card className="border-destructive bg-destructive/5">
            <CardContent className="flex items-start gap-3 p-4">
              <ShieldAlert className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-display font-semibold text-destructive">
                  Seek Emergency Care Immediately
                </p>
                <p className="text-sm text-destructive/80 mt-1">
                  {analysis.emergencyReason}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Severity */}
      <motion.div variants={item}>
        <Card className="card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-display">
              <Activity className="h-5 w-5 text-primary" />
              Severity Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${config.className}`}
              >
                <SeverityIcon className="h-4 w-4" />
                {config.label}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${config.barClass}`}
                initial={{ width: 0 }}
                animate={{ width: config.barWidth }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="text-sm text-muted-foreground">{analysis.description}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Symptoms */}
      <motion.div variants={item}>
        <Card className="card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-display">
              <Stethoscope className="h-5 w-5 text-primary" />
              Observed Symptoms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.symptoms.map((symptom, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-foreground">{symptom}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recommendations */}
      <motion.div variants={item}>
        <Card className="card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-display">
              <ClipboardList className="h-5 w-5 text-primary" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {analysis.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full hero-gradient text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-foreground">{rec}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </motion.div>

      {/* Disclaimer */}
      <motion.div variants={item}>
        <p className="text-xs text-muted-foreground text-center px-4">
          ⚠️ This AI-powered analysis is for informational purposes only and is{" "}
          <strong>not a substitute</strong> for professional medical advice. Always
          consult a healthcare provider for proper diagnosis and treatment.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AnalysisResult;
