export type RiskLevel = "low" | "medium" | "high";

export interface BreachRecord {
  id: string;
  source: string;
  date: string;
  dataExposed: string[];
  riskLevel: RiskLevel;
  description: string;
}

export interface UserStats {
  totalBreaches: number;
  exposedPasswords: number;
  exposedEmails: number;
  overallRisk: RiskLevel;
}

export interface BreachDataset {
  id: string;
  name: string;
  recordCount: number;
  uploadDate: string;
  status: "processing" | "active" | "archived";
  uploadedBy: string;
}

export interface PastSearch {
  id: string;
  query: string;
  type: "email" | "phone";
  date: string;
  breachesFound: number;
  riskLevel: RiskLevel;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "analyst" | "user";
  lastActive: string;
  searchCount: number;
  status: "active" | "inactive";
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  details: string;
}

export interface MonthlyBreachData {
  month: string;
  breaches: number;
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
}

export interface SecurityRecommendation {
  id: string;
  title: string;
  description: string;
  priority: RiskLevel;
  category: "password" | "account" | "monitoring" | "general";
}

export const mockBreaches: BreachRecord[] = [
  {
    id: "1",
    source: "SocialMediaCorp",
    date: "2024-11-15",
    dataExposed: ["Email", "Password", "Phone"],
    riskLevel: "high",
    description: "Major data breach affecting 2.3M user accounts with plaintext passwords exposed.",
  },
  {
    id: "2",
    source: "ShopEasy",
    date: "2024-08-22",
    dataExposed: ["Email", "Name"],
    riskLevel: "low",
    description: "Limited exposure of email addresses and display names from marketing database.",
  },
  {
    id: "3",
    source: "CloudSync Pro",
    date: "2024-06-10",
    dataExposed: ["Email", "Password", "IP Address"],
    riskLevel: "high",
    description: "Authentication database compromised including hashed passwords and session tokens.",
  },
  {
    id: "4",
    source: "NewsDaily",
    date: "2024-03-05",
    dataExposed: ["Email"],
    riskLevel: "low",
    description: "Newsletter subscriber list exposed via misconfigured API endpoint.",
  },
  {
    id: "5",
    source: "FinanceTracker",
    date: "2023-12-18",
    dataExposed: ["Email", "Phone", "Address"],
    riskLevel: "medium",
    description: "Partial user records exposed including contact information and billing addresses.",
  },
  {
    id: "6",
    source: "GameVault",
    date: "2023-09-30",
    dataExposed: ["Email", "Username", "Password"],
    riskLevel: "medium",
    description: "Gaming platform breach exposing user credentials and profile information.",
  },
];

export const mockUserStats: UserStats = {
  totalBreaches: 6,
  exposedPasswords: 3,
  exposedEmails: 6,
  overallRisk: "medium",
};

export const mockDatasets: BreachDataset[] = [
  { id: "1", name: "Collection #1 - Jan 2024", recordCount: 2340000, uploadDate: "2024-01-15", status: "active", uploadedBy: "admin@breachguard.com" },
  { id: "2", name: "SocialMediaCorp Dump", recordCount: 890000, uploadDate: "2024-11-16", status: "active", uploadedBy: "admin@breachguard.com" },
  { id: "3", name: "Financial Services Q3", recordCount: 450000, uploadDate: "2024-10-01", status: "archived", uploadedBy: "analyst@breachguard.com" },
  { id: "4", name: "Gaming Platform Leak", recordCount: 1200000, uploadDate: "2024-09-20", status: "active", uploadedBy: "admin@breachguard.com" },
  { id: "5", name: "E-commerce 2024 Batch", recordCount: 670000, uploadDate: "2024-12-01", status: "processing", uploadedBy: "analyst@breachguard.com" },
];

export const mockPastSearches: PastSearch[] = [
  { id: "1", query: "alex@example.com", type: "email", date: "2025-03-18", breachesFound: 3, riskLevel: "high" },
  { id: "2", query: "+1 (555) 234-8901", type: "phone", date: "2025-03-15", breachesFound: 1, riskLevel: "low" },
  { id: "3", query: "alex.morgan@work.com", type: "email", date: "2025-03-10", breachesFound: 2, riskLevel: "medium" },
  { id: "4", query: "personal@gmail.com", type: "email", date: "2025-02-28", breachesFound: 0, riskLevel: "low" },
  { id: "5", query: "+44 7911 123456", type: "phone", date: "2025-02-20", breachesFound: 1, riskLevel: "medium" },
];

export const mockAdminUsers: AdminUser[] = [
  { id: "1", name: "Alex Morgan", email: "alex@breachguard.com", role: "admin", lastActive: "2025-03-20T09:15:00", searchCount: 47, status: "active" },
  { id: "2", name: "Priya Sharma", email: "priya@breachguard.com", role: "analyst", lastActive: "2025-03-19T14:30:00", searchCount: 128, status: "active" },
  { id: "3", name: "Marcus Chen", email: "marcus@example.com", role: "user", lastActive: "2025-03-18T11:00:00", searchCount: 12, status: "active" },
  { id: "4", name: "Leila Johansson", email: "leila@example.com", role: "user", lastActive: "2025-03-01T08:45:00", searchCount: 5, status: "inactive" },
  { id: "5", name: "Davi Oliveira", email: "davi@example.com", role: "user", lastActive: "2025-03-17T16:20:00", searchCount: 23, status: "active" },
  { id: "6", name: "Fatima Al-Rashid", email: "fatima@breachguard.com", role: "analyst", lastActive: "2025-03-20T10:00:00", searchCount: 89, status: "active" },
];

export const mockActivityLogs: ActivityLog[] = [
  { id: "1", user: "Alex Morgan", action: "Uploaded dataset", timestamp: "2025-03-20T09:15:00", details: "E-commerce 2024 Batch (670K records)" },
  { id: "2", user: "Priya Sharma", action: "Breach search", timestamp: "2025-03-19T14:30:00", details: "Searched email: test@example.com — 2 results" },
  { id: "3", user: "Marcus Chen", action: "Breach search", timestamp: "2025-03-18T11:00:00", details: "Searched phone: +1 (555) 123-4567 — 0 results" },
  { id: "4", user: "Fatima Al-Rashid", action: "Archived dataset", timestamp: "2025-03-17T16:00:00", details: "Financial Services Q3 dataset archived" },
  { id: "5", user: "Priya Sharma", action: "Exported report", timestamp: "2025-03-17T10:20:00", details: "Monthly breach summary report generated" },
  { id: "6", user: "Alex Morgan", action: "Updated user role", timestamp: "2025-03-16T09:00:00", details: "Changed Davi Oliveira from viewer to user" },
  { id: "7", user: "Leila Johansson", action: "Breach search", timestamp: "2025-03-01T08:45:00", details: "Searched email: leila@example.com — 1 result" },
];

export const mockMonthlyData: MonthlyBreachData[] = [
  { month: "Oct", breaches: 14, highRisk: 3, mediumRisk: 5, lowRisk: 6 },
  { month: "Nov", breaches: 22, highRisk: 8, mediumRisk: 7, lowRisk: 7 },
  { month: "Dec", breaches: 18, highRisk: 4, mediumRisk: 6, lowRisk: 8 },
  { month: "Jan", breaches: 31, highRisk: 12, mediumRisk: 10, lowRisk: 9 },
  { month: "Feb", breaches: 16, highRisk: 5, mediumRisk: 4, lowRisk: 7 },
  { month: "Mar", breaches: 9, highRisk: 2, mediumRisk: 3, lowRisk: 4 },
];

export const mockRecommendations: SecurityRecommendation[] = [
  { id: "1", title: "Change compromised passwords immediately", description: "Your password was found in 3 breaches. Use a unique, strong password for each account.", priority: "high", category: "password" },
  { id: "2", title: "Enable two-factor authentication", description: "Add 2FA to accounts where your email was exposed to prevent unauthorized access.", priority: "high", category: "account" },
  { id: "3", title: "Monitor your credit reports", description: "Your address and phone were exposed. Watch for unauthorized credit inquiries.", priority: "medium", category: "monitoring" },
  { id: "4", title: "Use a password manager", description: "Generate and store unique passwords for all your accounts to limit future breach impact.", priority: "medium", category: "password" },
  { id: "5", title: "Review account activity", description: "Check recent login activity on breached accounts for any unauthorized access.", priority: "high", category: "account" },
  { id: "6", title: "Update security questions", description: "If personal info was exposed, change security questions on sensitive accounts.", priority: "low", category: "general" },
];
