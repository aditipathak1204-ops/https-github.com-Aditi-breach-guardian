import { Calendar, Database } from "lucide-react";
import { RiskBadge } from "./RiskBadge";
import type { BreachRecord } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function BreachCard({ breach, className }: { breach: BreachRecord; className?: string }) {
  return (
    <div className={cn(
      "group rounded-xl border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]",
      className
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2 min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Database className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm truncate">{breach.source}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {new Date(breach.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{breach.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {breach.dataExposed.map((d) => (
              <span key={d} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">{d}</span>
            ))}
          </div>
        </div>
        <RiskBadge level={breach.riskLevel} />
      </div>
    </div>
  );
}
