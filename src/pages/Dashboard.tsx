import { ShieldAlert, Mail, KeyRound, AlertTriangle, Search, Clock, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { StatsCard } from "@/components/StatsCard";
import { BreachCard } from "@/components/BreachCard";
import { RiskBadge } from "@/components/RiskBadge";
import { mockBreaches, mockUserStats, mockPastSearches, mockMonthlyData } from "@/lib/mock-data";

const riskDistribution = [
  { name: "High", value: 3, color: "hsl(0, 72%, 51%)" },
  { name: "Medium", value: 2, color: "hsl(38, 92%, 50%)" },
  { name: "Low", value: 2, color: "hsl(152, 60%, 40%)" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div className="space-y-1 animate-fade-up">
        <h1 className="text-2xl font-bold tracking-tight" style={{ lineHeight: "1.15" }}>User Data Security Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your data exposure across known breaches.</p>
      </div>

      {/* Overall risk banner */}
      <div className="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm animate-fade-up-delay-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-risk-medium-bg">
          <AlertTriangle className="h-5 w-5 text-risk-medium" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">Overall Risk Assessment</p>
          <p className="text-xs text-muted-foreground">Based on {mockUserStats.totalBreaches} breaches found for your monitored accounts</p>
        </div>
        <RiskBadge level={mockUserStats.overallRisk} />
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Breaches" value={mockUserStats.totalBreaches} icon={ShieldAlert} trend="2 new this month" animationDelay="animate-fade-up-delay-1" />
        <StatsCard title="Exposed Emails" value={mockUserStats.exposedEmails} icon={Mail} animationDelay="animate-fade-up-delay-2" />
        <StatsCard title="Exposed Passwords" value={mockUserStats.exposedPasswords} icon={KeyRound} trend="Change recommended" animationDelay="animate-fade-up-delay-3" />
        <StatsCard title="Searches This Month" value={mockPastSearches.length} icon={Search} animationDelay="animate-fade-up-delay-4" />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-5 animate-fade-up-delay-3">
        {/* Bar chart */}
        <div className="lg:col-span-3 rounded-xl border bg-card p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Breach Trends (6 months)</h3>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockMonthlyData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={30} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="highRisk" name="High" stackId="a" fill="hsl(0, 72%, 51%)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="mediumRisk" name="Medium" stackId="a" fill="hsl(38, 92%, 50%)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="lowRisk" name="Low" stackId="a" fill="hsl(152, 60%, 40%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie chart */}
        <div className="lg:col-span-2 rounded-xl border bg-card p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold">Risk Distribution</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {riskDistribution.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4">
            {riskDistribution.map((r) => (
              <div key={r.name} className="flex items-center gap-1.5 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: r.color }} />
                <span className="text-muted-foreground">{r.name} ({r.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Past searches */}
      <div className="space-y-4 animate-fade-up-delay-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-lg font-semibold tracking-tight">Past Searches</h2>
        </div>
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Query</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Breaches</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Risk</th>
                </tr>
              </thead>
              <tbody>
                {mockPastSearches.map((s) => (
                  <tr key={s.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium tabular-nums">{s.query}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        {s.type === "email" ? <Mail className="h-3 w-3" /> : <Search className="h-3 w-3" />}
                        {s.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(s.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
                    <td className="px-4 py-3 tabular-nums">{s.breachesFound}</td>
                    <td className="px-4 py-3"><RiskBadge level={s.riskLevel} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Breach history */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Breach History</h2>
        <div className="grid gap-3">
          {mockBreaches.map((breach) => (
            <BreachCard key={breach.id} breach={breach} />
          ))}
        </div>
      </div>
    </div>
  );
}
