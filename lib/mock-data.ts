export type TeamRole = "Admin" | "Sales Manager" | "Sales Rep" | "Marketing Analyst";

export type PipelineStage =
  | "lead"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "closed_won"
  | "closed_lost";

export type LeadStatus = "new" | "contacted" | "qualified" | "disqualified";

export type ActivityType =
  | "lead_created"
  | "lead_updated"
  | "deal_moved"
  | "comment"
  | "task_completed";

export type DateRangeKey = "7d" | "30d" | "90d" | "ytd" | "all" | "custom";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  region: string;
  monthlyTarget: number;
  avatarColor: string;
};

export type Lead = {
  id: string;
  company: string;
  contactName: string;
  contactEmail: string;
  source: "Website" | "Referral" | "Outbound" | "LinkedIn";
  ownerId: string;
  status: LeadStatus;
  estimatedValue: number;
  createdAt: string;
};

export type Deal = {
  id: string;
  name: string;
  company: string;
  ownerId: string;
  stage: PipelineStage;
  value: number;
  probability: number;
  expectedCloseDate: string;
  createdAt: string;
  updatedAt: string;
};

export type ActivityItem = {
  id: string;
  type: ActivityType;
  actorId: string;
  message: string;
  createdAt: string;
};

export type DateRange = {
  key: DateRangeKey;
  label: string;
  from: Date | null;
  to: Date | null;
};

export type SalesMetrics = {
  revenue: number;
  dealsWon: number;
  dealsLost: number;
  openPipelineValue: number;
  weightedForecast: number;
  conversionRate: number;
  avgDealSize: number;
  activeLeads: number;
};

export type RepPerformance = {
  memberId: string;
  memberName: string;
  role: TeamRole;
  revenue: number;
  dealsWon: number;
  dealsInProgress: number;
  winRate: number;
  quotaAttainment: number;
};

const NOW = new Date("2026-03-01T10:00:00.000Z");

export const teamMembers: TeamMember[] = [
  {
    id: "tm_1",
    name: "Ava Thompson",
    email: "ava@salesnet.io",
    role: "Sales Manager",
    region: "North America",
    monthlyTarget: 140000,
    avatarColor: "#0ea5e9",
  },
  {
    id: "tm_2",
    name: "Noah Patel",
    email: "noah@salesnet.io",
    role: "Sales Rep",
    region: "North America",
    monthlyTarget: 90000,
    avatarColor: "#10b981",
  },
  {
    id: "tm_3",
    name: "Mia Garcia",
    email: "mia@salesnet.io",
    role: "Sales Rep",
    region: "EMEA",
    monthlyTarget: 95000,
    avatarColor: "#8b5cf6",
  },
  {
    id: "tm_4",
    name: "Ethan Kim",
    email: "ethan@salesnet.io",
    role: "Marketing Analyst",
    region: "Global",
    monthlyTarget: 0,
    avatarColor: "#f59e0b",
  },
];

export const leads: Lead[] = [
  {
    id: "lead_1",
    company: "Northwind Logistics",
    contactName: "Rina Holt",
    contactEmail: "rina@northwindlogistics.com",
    source: "Website",
    ownerId: "tm_2",
    status: "qualified",
    estimatedValue: 22000,
    createdAt: "2026-02-18T09:00:00.000Z",
  },
  {
    id: "lead_2",
    company: "Aster Retail Group",
    contactName: "Kiran Das",
    contactEmail: "kiran@asterretail.com",
    source: "LinkedIn",
    ownerId: "tm_3",
    status: "contacted",
    estimatedValue: 14000,
    createdAt: "2026-02-24T15:20:00.000Z",
  },
  {
    id: "lead_3",
    company: "Blue Arc Medical",
    contactName: "Lana Brooks",
    contactEmail: "lana@bluearcmed.com",
    source: "Referral",
    ownerId: "tm_2",
    status: "new",
    estimatedValue: 31000,
    createdAt: "2026-02-27T11:45:00.000Z",
  },
  {
    id: "lead_4",
    company: "Pioneer Fintech",
    contactName: "Victor Hale",
    contactEmail: "victor@pioneerfintech.io",
    source: "Outbound",
    ownerId: "tm_3",
    status: "qualified",
    estimatedValue: 40000,
    createdAt: "2026-02-11T08:10:00.000Z",
  },
];

export const deals: Deal[] = [
  {
    id: "deal_1",
    name: "Northwind Annual Contract",
    company: "Northwind Logistics",
    ownerId: "tm_2",
    stage: "proposal",
    value: 30000,
    probability: 0.65,
    expectedCloseDate: "2026-03-20T00:00:00.000Z",
    createdAt: "2026-02-10T10:00:00.000Z",
    updatedAt: "2026-02-26T14:15:00.000Z",
  },
  {
    id: "deal_2",
    name: "Aster Expansion Package",
    company: "Aster Retail Group",
    ownerId: "tm_3",
    stage: "negotiation",
    value: 54000,
    probability: 0.8,
    expectedCloseDate: "2026-03-08T00:00:00.000Z",
    createdAt: "2026-01-28T12:10:00.000Z",
    updatedAt: "2026-02-28T13:00:00.000Z",
  },
  {
    id: "deal_3",
    name: "Blue Arc Pilot",
    company: "Blue Arc Medical",
    ownerId: "tm_2",
    stage: "closed_won",
    value: 47000,
    probability: 1,
    expectedCloseDate: "2026-02-14T00:00:00.000Z",
    createdAt: "2026-01-14T10:30:00.000Z",
    updatedAt: "2026-02-14T17:45:00.000Z",
  },
  {
    id: "deal_4",
    name: "Pioneer Core Suite",
    company: "Pioneer Fintech",
    ownerId: "tm_3",
    stage: "closed_lost",
    value: 62000,
    probability: 0,
    expectedCloseDate: "2026-02-16T00:00:00.000Z",
    createdAt: "2026-01-20T09:00:00.000Z",
    updatedAt: "2026-02-16T12:20:00.000Z",
  },
  {
    id: "deal_5",
    name: "Helios Growth Bundle",
    company: "Helios Commerce",
    ownerId: "tm_1",
    stage: "qualified",
    value: 38000,
    probability: 0.35,
    expectedCloseDate: "2026-03-29T00:00:00.000Z",
    createdAt: "2026-02-22T07:35:00.000Z",
    updatedAt: "2026-02-25T08:40:00.000Z",
  },
];

export const activities: ActivityItem[] = [
  {
    id: "act_1",
    type: "lead_created",
    actorId: "tm_2",
    message: "Created lead Blue Arc Medical from referral campaign.",
    createdAt: "2026-02-27T11:45:00.000Z",
  },
  {
    id: "act_2",
    type: "deal_moved",
    actorId: "tm_3",
    message: "Moved Aster Expansion Package from proposal to negotiation.",
    createdAt: "2026-02-28T13:00:00.000Z",
  },
  {
    id: "act_3",
    type: "comment",
    actorId: "tm_1",
    message: "Added pricing guidance for Northwind Annual Contract.",
    createdAt: "2026-02-26T16:05:00.000Z",
  },
  {
    id: "act_4",
    type: "task_completed",
    actorId: "tm_4",
    message: "Published monthly funnel analysis dashboard snapshot.",
    createdAt: "2026-02-25T18:25:00.000Z",
  },
];

export function getDateRange(key: DateRangeKey, customFrom?: string, customTo?: string): DateRange {
  const to = new Date(NOW);

  if (key === "all") {
    return { key, label: "All time", from: null, to: null };
  }

  if (key === "custom") {
    const fromDate = customFrom ? new Date(customFrom) : null;
    const toDate = customTo ? new Date(customTo) : null;

    if (fromDate && Number.isNaN(fromDate.getTime())) {
      throw new Error("Invalid customFrom date.");
    }
    if (toDate && Number.isNaN(toDate.getTime())) {
      throw new Error("Invalid customTo date.");
    }

    return {
      key,
      label: "Custom",
      from: fromDate,
      to: toDate,
    };
  }

  const from = new Date(to);
  if (key === "7d") from.setDate(to.getDate() - 7);
  if (key === "30d") from.setDate(to.getDate() - 30);
  if (key === "90d") from.setDate(to.getDate() - 90);
  if (key === "ytd") {
    from.setMonth(0, 1);
    from.setHours(0, 0, 0, 0);
  }

  const labelMap: Record<Exclude<DateRangeKey, "custom">, string> = {
    "7d": "Last 7 days",
    "30d": "Last 30 days",
    "90d": "Last 90 days",
    ytd: "Year to date",
    all: "All time",
  };

  return {
    key,
    label: labelMap[key],
    from,
    to,
  };
}

export function isWithinRange(value: string, range: DateRange): boolean {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;

  if (range.from && date < range.from) return false;
  if (range.to && date > range.to) return false;
  return true;
}

export function filterDealsByRange(inputDeals: Deal[], range: DateRange): Deal[] {
  return inputDeals.filter((deal) => isWithinRange(deal.updatedAt, range));
}

export function filterActivitiesByRange(inputActivities: ActivityItem[], range: DateRange): ActivityItem[] {
  return inputActivities.filter((activity) => isWithinRange(activity.createdAt, range));
}

export function calculateSalesMetrics(
  inputDeals: Deal[],
  inputLeads: Lead[],
  range: DateRange,
): SalesMetrics {
  const scopedDeals = filterDealsByRange(inputDeals, range);
  const won = scopedDeals.filter((deal) => deal.stage === "closed_won");
  const lost = scopedDeals.filter((deal) => deal.stage === "closed_lost");
  const open = scopedDeals.filter(
    (deal) => deal.stage !== "closed_won" && deal.stage !== "closed_lost",
  );

  const revenue = won.reduce((sum, deal) => sum + deal.value, 0);
  const openPipelineValue = open.reduce((sum, deal) => sum + deal.value, 0);
  const weightedForecast = open.reduce((sum, deal) => sum + deal.value * deal.probability, 0);
  const decisions = won.length + lost.length;
  const conversionRate = decisions === 0 ? 0 : won.length / decisions;
  const avgDealSize = won.length === 0 ? 0 : revenue / won.length;

  const activeLeads = inputLeads.filter((lead) => lead.status !== "disqualified").length;

  return {
    revenue,
    dealsWon: won.length,
    dealsLost: lost.length,
    openPipelineValue,
    weightedForecast,
    conversionRate,
    avgDealSize,
    activeLeads,
  };
}

export function getRepPerformance(
  inputTeam: TeamMember[],
  inputDeals: Deal[],
  range: DateRange,
): RepPerformance[] {
  const scopedDeals = filterDealsByRange(inputDeals, range);

  return inputTeam
    .filter((member) => member.role === "Sales Rep" || member.role === "Sales Manager")
    .map((member) => {
      const memberDeals = scopedDeals.filter((deal) => deal.ownerId === member.id);
      const wonDeals = memberDeals.filter((deal) => deal.stage === "closed_won");
      const lostDeals = memberDeals.filter((deal) => deal.stage === "closed_lost");
      const inProgressDeals = memberDeals.filter(
        (deal) => deal.stage !== "closed_won" && deal.stage !== "closed_lost",
      );

      const revenue = wonDeals.reduce((sum, deal) => sum + deal.value, 0);
      const decisions = wonDeals.length + lostDeals.length;
      const winRate = decisions > 0 ? wonDeals.length / decisions : 0;
      const quotaAttainment = member.monthlyTarget > 0 ? revenue / member.monthlyTarget : 0;

      return {
        memberId: member.id,
        memberName: member.name,
        role: member.role,
        revenue,
        dealsWon: wonDeals.length,
        dealsInProgress: inProgressDeals.length,
        winRate,
        quotaAttainment,
      };
    })
    .sort((a, b) => b.revenue - a.revenue);
}

function escapeCsvValue(value: string): string {
  if (value.includes(",") || value.includes("\n") || value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function toCsv<T extends Record<string, string | number | boolean | null | undefined>>(
  rows: T[],
  columns: Array<keyof T>,
): string {
  const header = columns.join(",");
  const lines = rows.map((row) =>
    columns
      .map((key) => {
        const raw = row[key];
        const value = raw === null || raw === undefined ? "" : String(raw);
        return escapeCsvValue(value);
      })
      .join(","),
  );

  return [header, ...lines].join("\n");
}

export function buildDealsCsvReport(inputDeals: Deal[]): string {
  const rows = inputDeals.map((deal) => ({
    id: deal.id,
    name: deal.name,
    company: deal.company,
    stage: deal.stage,
    value: deal.value,
    probability: Math.round(deal.probability * 100),
    expectedCloseDate: deal.expectedCloseDate,
    updatedAt: deal.updatedAt,
  }));

  return toCsv(rows, [
    "id",
    "name",
    "company",
    "stage",
    "value",
    "probability",
    "expectedCloseDate",
    "updatedAt",
  ]);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export const mockDashboard = {
  generatedAt: NOW.toISOString(),
  teamMembers,
  leads,
  deals,
  activities,
};
