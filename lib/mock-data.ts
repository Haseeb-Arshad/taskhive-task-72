export type TeamRole =
  | "Sales Manager"
  | "Account Executive"
  | "Sales Development Rep"
  | "Marketing Analyst"
  | "Customer Success";

export type TeamMember = {
  id: string;
  name: string;
  role: TeamRole;
  email: string;
  region: string;
  avatar: string;
  activeDeals: number;
  wonDeals: number;
  revenue: number;
  conversionRate: number;
};

export type LeadStatus = "new" | "contacted" | "qualified" | "nurturing" | "disqualified";

export type Lead = {
  id: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  source: "LinkedIn" | "Website" | "Referral" | "Outbound" | "Event";
  ownerId: string;
  status: LeadStatus;
  score: number;
  estimatedValue: number;
  createdAt: string;
};

export type DealStage = "Prospecting" | "Qualification" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost";

export type Deal = {
  id: string;
  title: string;
  accountName: string;
  ownerId: string;
  stage: DealStage;
  value: number;
  probability: number;
  expectedCloseDate: string;
  createdAt: string;
  updatedAt: string;
};

export type ActivityType = "lead_added" | "deal_updated" | "note" | "call" | "meeting" | "chat";

export type ActivityItem = {
  id: string;
  type: ActivityType;
  actorId: string;
  target: string;
  message: string;
  createdAt: string;
};

export type SalesKpi = {
  revenue: number;
  pipelineValue: number;
  winRate: number;
  conversionRate: number;
  avgDealSize: number;
  activeDeals: number;
  closedWon: number;
  closedLost: number;
};

export type DateRange = {
  from: Date;
  to: Date;
};

export type TeamComparison = {
  memberId: string;
  name: string;
  revenue: number;
  wonDeals: number;
  conversionRate: number;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "tm_1",
    name: "Avery Chen",
    role: "Sales Manager",
    email: "avery.chen@salesnet.io",
    region: "North America",
    avatar: "AC",
    activeDeals: 12,
    wonDeals: 16,
    revenue: 321000,
    conversionRate: 38.1,
  },
  {
    id: "tm_2",
    name: "Mateo Singh",
    role: "Account Executive",
    email: "mateo.singh@salesnet.io",
    region: "EMEA",
    avatar: "MS",
    activeDeals: 9,
    wonDeals: 13,
    revenue: 254000,
    conversionRate: 34.2,
  },
  {
    id: "tm_3",
    name: "Nora Ibrahim",
    role: "Sales Development Rep",
    email: "nora.ibrahim@salesnet.io",
    region: "APAC",
    avatar: "NI",
    activeDeals: 15,
    wonDeals: 8,
    revenue: 149000,
    conversionRate: 27.3,
  },
  {
    id: "tm_4",
    name: "Jordan Park",
    role: "Marketing Analyst",
    email: "jordan.park@salesnet.io",
    region: "Global",
    avatar: "JP",
    activeDeals: 6,
    wonDeals: 7,
    revenue: 98000,
    conversionRate: 25.6,
  },
];

export const LEADS: Lead[] = [
  {
    id: "lead_101",
    company: "NovaGrid Systems",
    contactName: "Cynthia Bell",
    email: "cynthia.bell@novagrid.com",
    phone: "+1-415-555-0119",
    source: "Website",
    ownerId: "tm_2",
    status: "qualified",
    score: 88,
    estimatedValue: 54000,
    createdAt: "2026-02-01T10:35:00.000Z",
  },
  {
    id: "lead_102",
    company: "Blue Harbor Retail",
    contactName: "Damian Rhodes",
    email: "drhodes@blueharbor.co",
    phone: "+44-20-7946-0958",
    source: "Referral",
    ownerId: "tm_1",
    status: "nurturing",
    score: 72,
    estimatedValue: 33000,
    createdAt: "2026-02-03T14:21:00.000Z",
  },
  {
    id: "lead_103",
    company: "Helix Finance",
    contactName: "Mina Kwon",
    email: "mina.kwon@helixfinance.io",
    phone: "+65-6355-9988",
    source: "Outbound",
    ownerId: "tm_3",
    status: "contacted",
    score: 66,
    estimatedValue: 22000,
    createdAt: "2026-02-07T09:12:00.000Z",
  },
  {
    id: "lead_104",
    company: "Atlas Logistics",
    contactName: "Victor Hugo",
    email: "victor.hugo@atlaslogistics.com",
    phone: "+1-312-555-0177",
    source: "LinkedIn",
    ownerId: "tm_2",
    status: "new",
    score: 74,
    estimatedValue: 41000,
    createdAt: "2026-02-09T18:10:00.000Z",
  },
];

export const DEALS: Deal[] = [
  {
    id: "deal_201",
    title: "Enterprise Expansion Plan",
    accountName: "NovaGrid Systems",
    ownerId: "tm_2",
    stage: "Proposal",
    value: 68000,
    probability: 65,
    expectedCloseDate: "2026-03-28",
    createdAt: "2026-01-21T10:00:00.000Z",
    updatedAt: "2026-02-12T11:45:00.000Z",
  },
  {
    id: "deal_202",
    title: "Annual Marketing Suite",
    accountName: "Blue Harbor Retail",
    ownerId: "tm_1",
    stage: "Negotiation",
    value: 45000,
    probability: 80,
    expectedCloseDate: "2026-03-20",
    createdAt: "2026-01-18T08:30:00.000Z",
    updatedAt: "2026-02-13T15:20:00.000Z",
  },
  {
    id: "deal_203",
    title: "Pilot Analytics Rollout",
    accountName: "Helix Finance",
    ownerId: "tm_3",
    stage: "Qualification",
    value: 28000,
    probability: 45,
    expectedCloseDate: "2026-04-04",
    createdAt: "2026-02-02T12:25:00.000Z",
    updatedAt: "2026-02-14T09:40:00.000Z",
  },
  {
    id: "deal_204",
    title: "Q1 Contract Renewal",
    accountName: "Eon Dynamics",
    ownerId: "tm_1",
    stage: "Closed Won",
    value: 92000,
    probability: 100,
    expectedCloseDate: "2026-02-10",
    createdAt: "2026-01-10T09:15:00.000Z",
    updatedAt: "2026-02-10T16:00:00.000Z",
  },
  {
    id: "deal_205",
    title: "Multi-region Onboarding",
    accountName: "Atlas Logistics",
    ownerId: "tm_2",
    stage: "Prospecting",
    value: 36000,
    probability: 30,
    expectedCloseDate: "2026-04-16",
    createdAt: "2026-02-08T14:10:00.000Z",
    updatedAt: "2026-02-15T08:55:00.000Z",
  },
  {
    id: "deal_206",
    title: "Legacy Migration Package",
    accountName: "Brightline Health",
    ownerId: "tm_4",
    stage: "Closed Lost",
    value: 51000,
    probability: 0,
    expectedCloseDate: "2026-02-05",
    createdAt: "2026-01-12T10:00:00.000Z",
    updatedAt: "2026-02-05T17:22:00.000Z",
  },
];

export const ACTIVITIES: ActivityItem[] = [
  {
    id: "act_1",
    type: "deal_updated",
    actorId: "tm_2",
    target: "deal_201",
    message: "Moved Enterprise Expansion Plan to Proposal stage.",
    createdAt: "2026-02-15T09:30:00.000Z",
  },
  {
    id: "act_2",
    type: "meeting",
    actorId: "tm_1",
    target: "deal_202",
    message: "Completed pricing alignment meeting with Blue Harbor stakeholders.",
    createdAt: "2026-02-15T08:42:00.000Z",
  },
  {
    id: "act_3",
    type: "chat",
    actorId: "tm_3",
    target: "lead_104",
    message: "Shared lead qualification notes with Mateo in team channel.",
    createdAt: "2026-02-15T07:55:00.000Z",
  },
  {
    id: "act_4",
    type: "lead_added",
    actorId: "tm_4",
    target: "lead_104",
    message: "Added Atlas Logistics from LinkedIn campaign.",
    createdAt: "2026-02-14T18:02:00.000Z",
  },
];

export function parseDateSafe(value: string | Date): Date {
  const parsed = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return new Date(0);
  }
  return parsed;
}

export function inDateRange(date: string | Date, range?: DateRange): boolean {
  if (!range) return true;
  const d = parseDateSafe(date).getTime();
  return d >= range.from.getTime() && d <= range.to.getTime();
}

export function formatCurrency(value: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

export function getPipelineByStage(deals: Deal[] = DEALS) {
  const stages: DealStage[] = [
    "Prospecting",
    "Qualification",
    "Proposal",
    "Negotiation",
    "Closed Won",
    "Closed Lost",
  ];

  return stages.map((stage) => {
    const stageDeals = deals.filter((d) => d.stage === stage);
    const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);
    return {
      stage,
      count: stageDeals.length,
      totalValue,
    };
  });
}

export function getSalesKpis(range?: DateRange, deals: Deal[] = DEALS): SalesKpi {
  const visibleDeals = deals.filter((d) => inDateRange(d.updatedAt, range));

  const activeDeals = visibleDeals.filter(
    (d) => d.stage !== "Closed Won" && d.stage !== "Closed Lost"
  );
  const closedWon = visibleDeals.filter((d) => d.stage === "Closed Won");
  const closedLost = visibleDeals.filter((d) => d.stage === "Closed Lost");
  const closedTotal = closedWon.length + closedLost.length;

  const revenue = closedWon.reduce((sum, d) => sum + d.value, 0);
  const pipelineValue = activeDeals.reduce((sum, d) => sum + d.value, 0);
  const avgDealSize = visibleDeals.length
    ? Math.round(visibleDeals.reduce((sum, d) => sum + d.value, 0) / visibleDeals.length)
    : 0;

  const weightedConversions = visibleDeals.length
    ? visibleDeals.reduce((sum, d) => sum + d.probability, 0) / visibleDeals.length
    : 0;

  return {
    revenue,
    pipelineValue,
    winRate: closedTotal ? (closedWon.length / closedTotal) * 100 : 0,
    conversionRate: weightedConversions,
    avgDealSize,
    activeDeals: activeDeals.length,
    closedWon: closedWon.length,
    closedLost: closedLost.length,
  };
}

export function getRepStats(memberId: string, deals: Deal[] = DEALS): TeamComparison | null {
  const member = TEAM_MEMBERS.find((m) => m.id === memberId);
  if (!member) return null;

  const assigned = deals.filter((d) => d.ownerId === memberId);
  const won = assigned.filter((d) => d.stage === "Closed Won");
  const lost = assigned.filter((d) => d.stage === "Closed Lost");
  const closedCount = won.length + lost.length;

  return {
    memberId,
    name: member.name,
    revenue: won.reduce((sum, d) => sum + d.value, 0),
    wonDeals: won.length,
    conversionRate: closedCount ? (won.length / closedCount) * 100 : 0,
  };
}

export function getTeamComparison(deals: Deal[] = DEALS): TeamComparison[] {
  return TEAM_MEMBERS.map((member) => getRepStats(member.id, deals))
    .filter((item): item is TeamComparison => Boolean(item))
    .sort((a, b) => b.revenue - a.revenue);
}

export function getActivityFeed(limit = 10, activities: ActivityItem[] = ACTIVITIES): ActivityItem[] {
  const safeLimit = Math.max(1, Math.min(limit, 100));
  return [...activities]
    .sort((a, b) => parseDateSafe(b.createdAt).getTime() - parseDateSafe(a.createdAt).getTime())
    .slice(0, safeLimit);
}

export function searchLeads(query: string, leads: Lead[] = LEADS): Lead[] {
  const q = query.trim().toLowerCase();
  if (!q) return leads;

  return leads.filter((lead) => {
    const haystack = [lead.company, lead.contactName, lead.email, lead.source, lead.status]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

function csvEscape(value: string | number): string {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export function dealsToCsv(deals: Deal[] = DEALS): string {
  const headers = [
    "Deal ID",
    "Title",
    "Account",
    "Owner",
    "Stage",
    "Value",
    "Probability",
    "Expected Close",
    "Updated At",
  ];

  const rows = deals.map((deal) => {
    const owner = TEAM_MEMBERS.find((m) => m.id === deal.ownerId)?.name ?? "Unknown";
    return [
      deal.id,
      deal.title,
      deal.accountName,
      owner,
      deal.stage,
      deal.value,
      `${deal.probability}%`,
      deal.expectedCloseDate,
      deal.updatedAt,
    ]
      .map(csvEscape)
      .join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}

export function exportCsvFile(csvContent: string, filename = "sales-report.csv"): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
}

export const DEFAULT_DATE_RANGE: DateRange = {
  from: new Date("2026-01-01T00:00:00.000Z"),
  to: new Date("2026-12-31T23:59:59.999Z"),
};
