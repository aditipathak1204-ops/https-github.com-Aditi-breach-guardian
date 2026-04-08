import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/lib/mock-data";

const config: Record<RiskLevel, { label: string; className: string }> = {
  low: { label: "Low", className: "risk-low" },
  medium: { label: "Medium", className: "risk-medium" },
  high: { label: "High", className: "risk-high" },
};

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  const c = config[level];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase", c.className, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", {
        "bg-risk-low": level === "low",
        "bg-risk-medium": level === "medium",
        "bg-risk-high": level === "high",
      })} />
      {c.label}
    </span>
  );
}
