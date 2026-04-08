import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  className?: string;
  animationDelay?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, className, animationDelay }: StatsCardProps) {
  return (
    <div className={cn(
      "rounded-xl border bg-card p-5 shadow-sm transition-shadow duration-200 hover:shadow-md animate-fade-up",
      animationDelay,
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight tabular-nums">{value}</p>
          {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
        </div>
        <div className="rounded-lg bg-primary/10 p-2.5">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
}
