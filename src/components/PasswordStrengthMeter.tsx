import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface PasswordStrengthMeterProps {
  password: string;
}

function getStrength(password: string): { score: number; label: string; feedback: string } {
  if (!password) return { score: 0, label: "", feedback: "" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: "Weak", feedback: "Add uppercase, numbers, and symbols" };
  if (score <= 2) return { score: 2, label: "Fair", feedback: "Try adding more character variety" };
  if (score <= 3) return { score: 3, label: "Good", feedback: "Consider making it longer" };
  return { score: 4, label: "Strong", feedback: "Great password!" };
}

const barColors: Record<number, string> = {
  1: "bg-risk-high",
  2: "bg-risk-medium",
  3: "bg-primary",
  4: "bg-risk-low",
};

const labelColors: Record<number, string> = {
  1: "text-risk-high",
  2: "text-risk-medium",
  3: "text-primary",
  4: "text-risk-low",
};

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const { score, label, feedback } = useMemo(() => getStrength(password), [password]);

  if (!password) return null;

  return (
    <div className="space-y-1.5 animate-fade-up">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i <= score ? barColors[score] : "bg-muted"
            )}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className={cn("text-xs font-medium", labelColors[score])}>{label}</span>
        <span className="text-xs text-muted-foreground">{feedback}</span>
      </div>
    </div>
  );
}
