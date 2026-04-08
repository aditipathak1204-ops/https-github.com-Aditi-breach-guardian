import { useState } from "react";
import { Bell, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PasswordStrengthMeter } from "@/components/PasswordStrengthMeter";

function NewPasswordInput() {
  const [pw, setPw] = useState("");
  return (
    <div className="space-y-2">
      <Input type="password" placeholder="Min. 8 characters" value={pw} onChange={(e) => setPw(e.target.value)} />
      <PasswordStrengthMeter password={pw} />
    </div>
  );
}

export default function Settings() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div className="space-y-1 animate-fade-up">
        <h1 className="text-2xl font-bold tracking-tight" style={{ lineHeight: "1.15" }}>Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and notification preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <div className="rounded-xl border bg-card p-6 space-y-4 animate-fade-up-delay-1">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Profile</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Display name</Label>
              <Input defaultValue="Alex Morgan" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="alex@example.com" type="email" />
            </div>
          </div>
          <Button size="sm">Save changes</Button>
        </div>

        {/* Notifications */}
        <div className="rounded-xl border bg-card p-6 space-y-4 animate-fade-up-delay-2">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Notifications</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "Email alerts for new breaches", desc: "Get notified when your data appears in a new breach" },
              { label: "Weekly security digest", desc: "Summary of your security status every Monday" },
              { label: "Critical risk alerts", desc: "Immediate notification for high-risk exposures" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="rounded-xl border bg-card p-6 space-y-4 animate-fade-up-delay-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Security</h3>
          </div>
          <div className="space-y-2">
            <Label>Current password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>New password</Label>
              <NewPasswordInput />
            </div>
            <div className="space-y-2">
              <Label>Confirm password</Label>
              <Input type="password" placeholder="Repeat password" />
            </div>
          </div>
          <Button size="sm">Update password</Button>
        </div>
      </div>
    </div>
  );
}
