import { useState, useRef } from "react";
import { Upload, Database, Clock, CheckCircle2, Archive, Trash2, FileUp, Users, Activity, Shield, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockDatasets, mockAdminUsers, mockActivityLogs } from "@/lib/mock-data";
import type { BreachDataset, AdminUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusConfig = {
  active: { icon: CheckCircle2, label: "Active", className: "text-risk-low bg-risk-low-bg" },
  processing: { icon: Clock, label: "Processing", className: "text-risk-medium bg-risk-medium-bg" },
  archived: { icon: Archive, label: "Archived", className: "text-muted-foreground bg-muted" },
};

const roleStyles: Record<string, string> = {
  admin: "text-risk-high bg-risk-high-bg",
  analyst: "text-primary bg-primary/10",
  user: "text-muted-foreground bg-muted",
};

type Tab = "datasets" | "users" | "activity";

function DatasetRow({ dataset }: { dataset: BreachDataset }) {
  const s = statusConfig[dataset.status];
  const StatusIcon = s.icon;
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-shadow hover:shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Database className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0 space-y-0.5">
        <p className="text-sm font-medium truncate">{dataset.name}</p>
        <p className="text-xs text-muted-foreground">
          {dataset.recordCount.toLocaleString()} records · Uploaded {new Date(dataset.uploadDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>
      <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", s.className)}>
        <StatusIcon className="h-3 w-3" />
        {s.label}
      </span>
      <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-destructive">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

function UserRow({ user }: { user: AdminUser }) {
  const initials = user.name.split(" ").map((n) => n[0]).join("");
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-shadow hover:shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
        {initials}
      </div>
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{user.name}</p>
          <span className={cn("h-1.5 w-1.5 rounded-full", user.status === "active" ? "bg-risk-low" : "bg-muted-foreground")} />
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Mail className="h-3 w-3" /> {user.email}
        </p>
      </div>
      <div className="hidden sm:block text-right space-y-0.5">
        <p className="text-xs text-muted-foreground tabular-nums">{user.searchCount} searches</p>
        <p className="text-xs text-muted-foreground">
          Last active {new Date(user.lastActive).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </p>
      </div>
      <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize", roleStyles[user.role])}>
        {user.role}
      </span>
    </div>
  );
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("datasets");
  const [datasets] = useState<BreachDataset[]>(mockDatasets);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const tabs: { key: Tab; label: string; icon: typeof Database }[] = [
    { key: "datasets", label: "Datasets", icon: Database },
    { key: "users", label: "Users", icon: Users },
    { key: "activity", label: "Activity", icon: Activity },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="space-y-1 animate-fade-up">
        <h1 className="text-2xl font-bold tracking-tight" style={{ lineHeight: "1.15" }}>Admin Panel</h1>
        <p className="text-sm text-muted-foreground">Manage breach datasets, users, and monitor activity.</p>
      </div>

      {/* Tab nav */}
      <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit animate-fade-up-delay-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200",
              activeTab === t.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Datasets tab */}
      {activeTab === "datasets" && (
        <div className="space-y-6 animate-fade-up">
          <div
            className={cn(
              "rounded-xl border-2 border-dashed bg-card p-10 text-center transition-colors duration-200 cursor-pointer",
              dragActive ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
            )}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input ref={fileInputRef} type="file" accept=".csv,.json,.txt" className="hidden" />
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <FileUp className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-medium">Drop breach dataset files here</p>
            <p className="text-xs text-muted-foreground mt-1">Supports CSV, JSON, and TXT formats · Max 500MB</p>
          </div>

          <div className="rounded-xl border bg-card p-6 space-y-4">
            <h3 className="text-sm font-semibold">Dataset Details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="datasetName">Dataset name</Label>
                <Input id="datasetName" placeholder="e.g., E-commerce Leak Q1 2025" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="datasetSource">Source</Label>
                <Input id="datasetSource" placeholder="e.g., HaveIBeenPwned, Internal" />
              </div>
            </div>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Dataset
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight">Uploaded Datasets</h2>
              <span className="text-xs text-muted-foreground tabular-nums">{datasets.length} total</span>
            </div>
            <div className="grid gap-2">
              {datasets.map((d) => (
                <DatasetRow key={d.id} dataset={d} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users tab */}
      {activeTab === "users" && (
        <div className="space-y-4 animate-fade-up">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Registered Users</h2>
            <span className="text-xs text-muted-foreground tabular-nums">{mockAdminUsers.length} users</span>
          </div>
          <div className="grid gap-2">
            {mockAdminUsers.map((u) => (
              <UserRow key={u.id} user={u} />
            ))}
          </div>
        </div>
      )}

      {/* Activity tab */}
      {activeTab === "activity" && (
        <div className="space-y-4 animate-fade-up">
          <h2 className="text-lg font-semibold tracking-tight">Recent Activity</h2>
          <div className="space-y-1">
            {mockActivityLogs.map((log, idx) => (
              <div key={log.id} className="flex gap-4 py-3 border-b last:border-0">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <Activity className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  {idx < mockActivityLogs.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-1" />
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-0.5 pb-2">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm font-medium">{log.user}</span>
                    <span className="text-sm text-muted-foreground">{log.action}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{log.details}</p>
                  <p className="text-xs text-muted-foreground/60">
                    {new Date(log.timestamp).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
