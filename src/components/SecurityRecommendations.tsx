import { ShieldCheck, KeyRound, Eye, Lock, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SecurityRecommendation, RiskLevel } from "@/lib/mock-data";

const priorityStyles: Record<RiskLevel, string> = {
  high: "border-risk-high/20 bg-risk-high-bg",
  medium: "border-risk-medium/20 bg-risk-medium-bg",
  low: "border-border bg-card",
};

const priorityDot: Record<RiskLevel, string> = {
  high: "bg-risk-high",
  medium: "bg-risk-medium",
  low: "bg-risk-low",
};

const categoryIcons: Record<string, LucideIcon> = {
  password: KeyRound,
  account: Lock,
  monitoring: Eye,
  general: ShieldCheck,
};

export function SecurityRecommendations({ recommendations }: { recommendations: SecurityRecommendation[] }) {
  return (
    <div className="space-y-4 animate-fade-up">
      <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-primary" />
        Security Recommendations
      </h2>
      <div className="grid gap-2.5">
        {recommendations.map((rec) => {
          const Icon = categoryIcons[rec.category] || ShieldCheck;
          return (
            <div
              key={rec.id}
              className={cn(
                "flex items-start gap-3 rounded-lg border p-4 transition-shadow hover:shadow-sm",
                priorityStyles[rec.priority]
              )}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-background/80 mt-0.5">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", priorityDot[rec.priority])} />
                  <h3 className="text-sm font-semibold">{rec.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{rec.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
