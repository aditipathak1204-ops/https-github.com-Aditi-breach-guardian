import { useState } from "react";
import { Play, RotateCcw, Zap, Mail, Phone, User, MapPin, CreditCard, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BreachCard } from "@/components/BreachCard";
import { RiskBadge } from "@/components/RiskBadge";
import { SecurityRecommendations } from "@/components/SecurityRecommendations";
import { mockRecommendations } from "@/lib/mock-data";
import type { BreachRecord, RiskLevel } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const dataTypeOptions = [
  { key: "Email", icon: Mail },
  { key: "Password", icon: Key },
  { key: "Phone", icon: Phone },
  { key: "Name", icon: User },
  { key: "Address", icon: MapPin },
  { key: "Credit Card", icon: CreditCard },
] as const;

const simulatedBreachSources = [
  "MegaStore", "SocialVerse", "HealthTrack", "TravelHub",
  "StreamFlix", "BankSecure", "DevForums", "CloudNet",
];

function generateSimulatedBreaches(count: number, risk: RiskLevel, dataTypes: string[]): BreachRecord[] {
  const sources = [...simulatedBreachSources].sort(() => 0.5 - Math.random());
  return Array.from({ length: count }, (_, i) => ({
    id: `sim-${i}`,
    source: sources[i % sources.length],
    date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    dataExposed: dataTypes.length > 0 ? dataTypes : ["Email"],
    riskLevel: risk,
    description: `Simulated breach from ${sources[i % sources.length]} exposing ${dataTypes.join(", ") || "Email"} data. This is a demo result for testing purposes.`,
  }));
}

export default function BreachSimulation() {
  const [email, setEmail] = useState("demo@example.com");
  const [breachCount, setBreachCount] = useState(3);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>("high");
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>(["Email", "Password"]);
  const [results, setResults] = useState<BreachRecord[] | null>(null);
  const [simulating, setSimulating] = useState(false);

  const toggleDataType = (key: string) => {
    setSelectedDataTypes((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const runSimulation = () => {
    setSimulating(true);
    setResults(null);
    setTimeout(() => {
      setResults(generateSimulatedBreaches(breachCount, riskLevel, selectedDataTypes));
      setSimulating(false);
    }, 1500);
  };

  const resetSimulation = () => {
    setResults(null);
    setEmail("demo@example.com");
    setBreachCount(3);
    setRiskLevel("high");
    setSelectedDataTypes(["Email", "Password"]);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="space-y-1 animate-fade-up">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight" style={{ lineHeight: "1.15" }}>Breach Simulation</h1>
          <span className="rounded-full bg-risk-medium-bg px-2 py-0.5 text-xs font-medium text-risk-medium">Demo</span>
        </div>
        <p className="text-sm text-muted-foreground">Generate fake breach results to test the UI and understand risk levels.</p>
      </div>

      {/* Configuration */}
      <div className="rounded-xl border bg-card p-6 shadow-sm space-y-5 animate-fade-up-delay-1">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Simulation Config</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Test email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="demo@example.com" />
          </div>
          <div className="space-y-2">
            <Label>Number of breaches (1-8)</Label>
            <Input
              type="number"
              min={1}
              max={8}
              value={breachCount}
              onChange={(e) => setBreachCount(Math.min(8, Math.max(1, parseInt(e.target.value) || 1)))}
            />
          </div>
        </div>

        {/* Risk level selector */}
        <div className="space-y-2">
          <Label>Risk level</Label>
          <div className="flex gap-2">
            {(["low", "medium", "high"] as RiskLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setRiskLevel(level)}
                className={cn(
                  "flex-1 rounded-lg border py-2 text-sm font-medium capitalize transition-all duration-200 active:scale-[0.97]",
                  riskLevel === level
                    ? level === "low"
                      ? "border-risk-low bg-risk-low-bg text-risk-low"
                      : level === "medium"
                        ? "border-risk-medium bg-risk-medium-bg text-risk-medium"
                        : "border-risk-high bg-risk-high-bg text-risk-high"
                    : "border-border hover:bg-muted"
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Data types */}
        <div className="space-y-2">
          <Label>Exposed data types</Label>
          <div className="flex flex-wrap gap-2">
            {dataTypeOptions.map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => toggleDataType(key)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 active:scale-[0.97]",
                  selectedDataTypes.includes(key)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-3 w-3" />
                {key}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <Button onClick={runSimulation} disabled={simulating} className="flex-1 gap-2 group">
            {simulating ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                Simulating…
              </span>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run Simulation
              </>
            )}
          </Button>
          <Button variant="outline" onClick={resetSimulation} className="gap-1.5">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      {/* Simulation results */}
      {results !== null && (
        <div className="space-y-6 animate-fade-up">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Simulated: {results.length} breach{results.length > 1 ? "es" : ""} for {email}
            </h2>
            <RiskBadge level={riskLevel} />
          </div>
          <div className="grid gap-3">
            {results.map((breach) => (
              <BreachCard key={breach.id} breach={breach} />
            ))}
          </div>
          <SecurityRecommendations recommendations={mockRecommendations.slice(0, 3)} />
        </div>
      )}
    </div>
  );
}
