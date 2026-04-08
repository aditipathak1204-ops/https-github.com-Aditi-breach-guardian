import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { BarChart3, TrendingUp, ShieldAlert, Globe } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { mockMonthlyData } from "@/lib/mock-data";

const dataTypeDistribution = [
  { name: "Emails", value: 42, color: "hsl(199, 89%, 38%)" },
  { name: "Passwords", value: 28, color: "hsl(0, 72%, 51%)" },
  { name: "Phone Numbers", value: 15, color: "hsl(38, 92%, 50%)" },
  { name: "Addresses", value: 9, color: "hsl(152, 60%, 40%)" },
  { name: "Other", value: 6, color: "hsl(215, 10%, 46%)" },
];

const weeklyActivity = [
  { day: "Mon", searches: 12 },
  { day: "Tue", searches: 19 },
  { day: "Wed", searches: 8 },
  { day: "Thu", searches: 25 },
  { day: "Fri", searches: 14 },
  { day: "Sat", searches: 6 },
  { day: "Sun", searches: 4 },
];

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
};

export default function Analytics() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div className="space-y-1 animate-fade-up">
        <h1 className="text-2xl font-bold tracking-tight" style={{ lineHeight: "1.15" }}>Analytics</h1>
        <p className="text-sm text-muted-foreground">Visualize breach data trends and patterns across your monitored accounts.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-up-delay-1">
        <StatsCard title="Total Records Scanned" value="5.5M" icon={Globe} trend="+340K this month" />
        <StatsCard title="Active Datasets" value={4} icon={BarChart3} />
        <StatsCard title="Breaches Detected" value={110} icon={ShieldAlert} trend="+9 this month" />
        <StatsCard title="Avg. Risk Score" value="6.2 / 10" icon={TrendingUp} />
      </div>

      {/* Charts grid */}
      <div className="grid gap-4 lg:grid-cols-2 animate-fade-up-delay-2">
        {/* Breach trends stacked bar */}
        <div className="rounded-xl border bg-card p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold">Breach Trends by Risk Level</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockMonthlyData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="highRisk" name="High" stackId="a" fill="hsl(0, 72%, 51%)" />
                <Bar dataKey="mediumRisk" name="Medium" stackId="a" fill="hsl(38, 92%, 50%)" />
                <Bar dataKey="lowRisk" name="Low" stackId="a" fill="hsl(152, 60%, 40%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data type pie chart */}
        <div className="rounded-xl border bg-card p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold">Exposed Data Types</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {dataTypeDistribution.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {dataTypeDistribution.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-muted-foreground">{d.name} ({d.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly activity area chart */}
        <div className="rounded-xl border bg-card p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold">Weekly Search Activity</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={tooltipStyle} />
                <defs>
                  <linearGradient id="searchGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(199, 89%, 38%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(199, 89%, 38%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="searches" stroke="hsl(199, 89%, 38%)" fill="url(#searchGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total breaches line chart */}
        <div className="rounded-xl border bg-card p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold">Total Breaches Over Time</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="breaches" stroke="hsl(199, 89%, 38%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(199, 89%, 38%)" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
