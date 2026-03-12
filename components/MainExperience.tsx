"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type TeamRole = "Admin" | "Manager" | "Sales Rep" | "Analyst";
type DealStage =
  | "Prospect"
  | "Qualified"
  | "Proposal"
  | "Negotiation"
  | "Closed Won"
  | "Closed Lost";
type ActivityType = "deal" | "team" | "chat" | "system";

interface TeamMember {
  id: number;
  name: string;
  role: TeamRole;
  region: string;
  active: boolean;
}

interface Deal {
  id: number;
  contact: string;
  company: string;
  ownerId: number;
  stage: DealStage;
  source: "Inbound" | "Outbound" | "Referral" | "Campaign";
  value: number;
  probability: number;
  updatedAt: string;
  closedAt: string | null;
}

interface ActivityItem {
  id: number;
  type: ActivityType;
  user: string;
  message: string;
  time: string;
}

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  time: string;
}

const STAGES: DealStage[] = [
  "Prospect",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
];

const TEAM_ROLES: TeamRole[] = ["Admin", "Manager", "Sales Rep", "Analyst"];

function daysAgoISO(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function asDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDateTime(value: string): string {
  return new Date(value).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function withinRange(dateISO: string, startDate: string, endDate: string): boolean {
  const date = new Date(dateISO).getTime();
  const start = new Date(`${startDate}T00:00:00`).getTime();
  const end = new Date(`${endDate}T23:59:59`).getTime();
  return date >= start && date <= end;
}

const INITIAL_MEMBERS: TeamMember[] = [
  { id: 1, name: "Ava Johnson", role: "Manager", region: "North America", active: true },
  { id: 2, name: "Noah Kim", role: "Sales Rep", region: "EMEA", active: true },
  { id: 3, name: "Mia Patel", role: "Sales Rep", region: "North America", active: true },
  { id: 4, name: "Liam Garcia", role: "Analyst", region: "Global", active: true },
  { id: 5, name: "Sofia Brown", role: "Admin", region: "Global", active: true },
];

const INITIAL_DEALS: Deal[] = [
  {
    id: 1001,
    contact: "Daniel Reed",
    company: "Orion Health",
    ownerId: 2,
    stage: "Prospect",
    source: "Outbound",
    value: 22000,
    probability: 20,
    updatedAt: daysAgoISO(2),
    closedAt: null,
  },
  {
    id: 1002,
    contact: "Priya Nair",
    company: "BluePeak",
    ownerId: 3,
    stage: "Qualified",
    source: "Campaign",
    value: 34000,
    probability: 40,
    updatedAt: daysAgoISO(4),
    closedAt: null,
  },
  {
    id: 1003,
    contact: "Ethan Cole",
    company: "AeroGrid",
    ownerId: 2,
    stage: "Proposal",
    source: "Inbound",
    value: 48000,
    probability: 60,
    updatedAt: daysAgoISO(7),
    closedAt: null,
  },
  {
    id: 1004,
    contact: "Leila Ahmad",
    company: "Nova Retail",
    ownerId: 1,
    stage: "Negotiation",
    source: "Referral",
    value: 67000,
    probability: 75,
    updatedAt: daysAgoISO(1),
    closedAt: null,
  },
  {
    id: 1005,
    contact: "Mark Silva",
    company: "Vector Manufacturing",
    ownerId: 3,
    stage: "Closed Won",
    source: "Inbound",
    value: 72000,
    probability: 100,
    updatedAt: daysAgoISO(5),
    closedAt: daysAgoISO(5),
  },
  {
    id: 1006,
    contact: "Grace Lin",
    company: "Tern Labs",
    ownerId: 2,
    stage: "Closed Lost",
    source: "Outbound",
    value: 29000,
    probability: 0,
    updatedAt: daysAgoISO(8),
    closedAt: daysAgoISO(8),
  },
  {
    id: 1007,
    contact: "Yusuf Khan",
    company: "CloudHarbor",
    ownerId: 1,
    stage: "Closed Won",
    source: "Campaign",
    value: 91000,
    probability: 100,
    updatedAt: daysAgoISO(12),
    closedAt: daysAgoISO(12),
  },
  {
    id: 1008,
    contact: "Emma Scott",
    company: "Beacon Finance",
    ownerId: 3,
    stage: "Negotiation",
    source: "Referral",
    value: 53000,
    probability: 70,
    updatedAt: daysAgoISO(0),
    closedAt: null,
  },
];

const INITIAL_ACTIVITY: ActivityItem[] = [
  {
    id: 1,
    type: "deal",
    user: "Ava Johnson",
    message: "Moved Nova Retail to Negotiation.",
    time: daysAgoISO(1),
  },
  {
    id: 2,
    type: "team",
    user: "Sofia Brown",
    message: "Assigned Mia Patel to BluePeak opportunity.",
    time: daysAgoISO(2),
  },
  {
    id: 3,
    type: "chat",
    user: "Noah Kim",
    message: "Proposal draft is ready for AeroGrid review.",
    time: daysAgoISO(0),
  },
];

const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 1,
    user: "Ava Johnson",
    message: "Morning team. Focus today: move at least 2 deals into Proposal.",
    time: daysAgoISO(0),
  },
  {
    id: 2,
    user: "Mia Patel",
    message: "On it. I am finalizing BluePeak qualification notes now.",
    time: daysAgoISO(0),
  },
];

export default function MainExperience() {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [activity, setActivity] = useState<ActivityItem[]>(INITIAL_ACTIVITY);
  const [chat, setChat] = useState<ChatMessage[]>(INITIAL_CHAT);

  const today = new Date();
  const prior30 = new Date();
  prior30.setDate(today.getDate() - 30);

  const [startDate, setStartDate] = useState<string>(asDateInputValue(prior30));
  const [endDate, setEndDate] = useState<string>(asDateInputValue(today));
  const [dealSearch, setDealSearch] = useState<string>("");
  const [selectedRep, setSelectedRep] = useState<number>(1);
  const [chatInput, setChatInput] = useState<string>("");
  const [liveFeedEnabled, setLiveFeedEnabled] = useState<boolean>(true);

  const activityIdRef = useRef<number>(INITIAL_ACTIVITY.length + 10);
  const chatIdRef = useRef<number>(INITIAL_CHAT.length + 10);

  const addActivity = (entry: Omit<ActivityItem, "id" | "time">) => {
    setActivity((prev) => [
      {
        ...entry,
        id: activityIdRef.current++,
        time: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      const rangeMatch = withinRange(deal.updatedAt, startDate, endDate);
      const text = `${deal.contact} ${deal.company} ${deal.source}`.toLowerCase();
      const searchMatch = text.includes(dealSearch.toLowerCase());
      return rangeMatch && searchMatch;
    });
  }, [deals, startDate, endDate, dealSearch]);

  const pipelineByStage = useMemo(() => {
    const map = new Map<DealStage, Deal[]>();
    STAGES.forEach((stage) => map.set(stage, []));
    filteredDeals.forEach((deal) => {
      map.get(deal.stage)?.push(deal);
    });
    return map;
  }, [filteredDeals]);

  const dashboard = useMemo(() => {
    const won = filteredDeals.filter((d) => d.stage === "Closed Won");
    const lost = filteredDeals.filter((d) => d.stage === "Closed Lost");
    const active = filteredDeals.filter(
      (d) => d.stage !== "Closed Won" && d.stage !== "Closed Lost",
    );

    const wonRevenue = won.reduce((sum, d) => sum + d.value, 0);
    const activeValue = active.reduce((sum, d) => sum + d.value, 0);
    const completedDeals = won.length + lost.length;
    const conversionRate = completedDeals > 0 ? (won.length / completedDeals) * 100 : 0;
    const avgDealSize = won.length > 0 ? wonRevenue / won.length : 0;

    return {
      wonRevenue,
      activeValue,
      conversionRate,
      avgDealSize,
      totalDeals: filteredDeals.length,
      wonCount: won.length,
    };
  }, [filteredDeals]);

  const teamPerformance = useMemo(() => {
    const byRep = members.map((member) => {
      const repDeals = filteredDeals.filter((d) => d.ownerId === member.id);
      const repWon = repDeals.filter((d) => d.stage === "Closed Won");
      const repLost = repDeals.filter((d) => d.stage === "Closed Lost");
      const revenue = repWon.reduce((sum, d) => sum + d.value, 0);
      const totalClosed = repWon.length + repLost.length;
      const conversion = totalClosed > 0 ? (repWon.length / totalClosed) * 100 : 0;
      return {
        ...member,
        revenue,
        conversion,
        deals: repDeals.length,
        wonDeals: repWon.length,
      };
    });

    const maxRevenue = Math.max(1, ...byRep.map((r) => r.revenue));
    return { byRep, maxRevenue };
  }, [members, filteredDeals]);

  const selectedRepStats = useMemo(() => {
    return teamPerformance.byRep.find((r) => r.id === selectedRep) ?? teamPerformance.byRep[0];
  }, [selectedRep, teamPerformance.byRep]);

  const trend = useMemo(() => {
    const points = Array.from({ length: 7 }, (_, index) => {
      const day = new Date();
      day.setDate(day.getDate() - (6 - index));
      const key = day.toISOString().slice(0, 10);
      const dayRevenue = deals
        .filter((d) => d.stage === "Closed Won" && d.closedAt && d.closedAt.slice(0, 10) === key)
        .reduce((sum, d) => sum + d.value, 0);
      return {
        key,
        label: day.toLocaleDateString([], { month: "short", day: "numeric" }),
        revenue: dayRevenue,
      };
    });

    const max = Math.max(1, ...points.map((p) => p.revenue));
    const polyline = points
      .map((point, index) => {
        const x = (index / (points.length - 1)) * 100;
        const y = 100 - (point.revenue / max) * 90;
        return `${x},${y}`;
      })
      .join(" ");

    return { points, max, polyline };
  }, [deals]);

  const moveDealStage = (dealId: number, direction: "prev" | "next") => {
    setDeals((prev) => {
      const updated = prev.map((deal) => {
        if (deal.id !== dealId) return deal;

        const currentIndex = STAGES.indexOf(deal.stage);
        const targetIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
        if (targetIndex < 0 || targetIndex >= STAGES.length) return deal;

        const nextStage = STAGES[targetIndex];
        const closedAt =
          nextStage === "Closed Won" || nextStage === "Closed Lost"
            ? new Date().toISOString()
            : null;

        const ownerName = members.find((m) => m.id === deal.ownerId)?.name ?? "Unknown";
        addActivity({
          type: "deal",
          user: ownerName,
          message: `${deal.company} moved to ${nextStage}.`,
        });

        return {
          ...deal,
          stage: nextStage,
          updatedAt: new Date().toISOString(),
          closedAt,
          probability:
            nextStage === "Closed Won"
              ? 100
              : nextStage === "Closed Lost"
                ? 0
                : Math.min(90, Math.max(10, deal.probability + (direction === "next" ? 15 : -15))),
        };
      });

      return updated;
    });
  };

  const updateMemberRole = (memberId: number, role: TeamRole) => {
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, role } : m)));
    const memberName = members.find((m) => m.id === memberId)?.name ?? "Team member";
    addActivity({
      type: "team",
      user: "System",
      message: `${memberName} role updated to ${role}.`,
    });
  };

  const toggleMemberStatus = (memberId: number) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, active: !m.active } : m)),
    );
    const member = members.find((m) => m.id === memberId);
    if (member) {
      addActivity({
        type: "team",
        user: "System",
        message: `${member.name} ${member.active ? "set to inactive" : "reactivated"}.`,
      });
    }
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    const value = chatInput.trim();
    if (!value) return;

    const message: ChatMessage = {
      id: chatIdRef.current++,
      user: "You",
      message: value,
      time: new Date().toISOString(),
    };

    setChat((prev) => [...prev, message]);
    setChatInput("");

    addActivity({
      type: "chat",
      user: "You",
      message: `Sent a message to team chat: "${value.slice(0, 42)}${value.length > 42 ? "..." : ""}"`,
    });

    if (liveFeedEnabled) {
      window.setTimeout(() => {
        const response: ChatMessage = {
          id: chatIdRef.current++,
          user: "Ops Bot",
          message: "Captured. I pinned this update for your regional sales team.",
          time: new Date().toISOString(),
        };
        setChat((prev) => [...prev, response]);
      }, 900);
    }
  };

  const applyPresetRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setStartDate(asDateInputValue(start));
    setEndDate(asDateInputValue(end));
  };

  const exportCSV = () => {
    const header = [
      "Deal ID",
      "Contact",
      "Company",
      "Owner",
      "Stage",
      "Value",
      "Probability",
      "Source",
      "Last Updated",
    ];

    const rows = filteredDeals.map((d) => {
      const owner = members.find((m) => m.id === d.ownerId)?.name ?? "Unknown";
      return [
        d.id,
        d.contact,
        d.company,
        owner,
        d.stage,
        d.value,
        `${d.probability}%`,
        d.source,
        new Date(d.updatedAt).toLocaleDateString(),
      ];
    });

    const csv = [header, ...rows]
      .map((r) =>
        r
          .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sales-report-${startDate}-to-${endDate}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addActivity({
      type: "system",
      user: "System",
      message: "Exported pipeline report as CSV.",
    });
  };

  const exportPDF = () => {
    window.print();
    addActivity({
      type: "system",
      user: "System",
      message: "Opened print dialog for PDF export.",
    });
  };

  useEffect(() => {
    if (!liveFeedEnabled) return;

    const interval = window.setInterval(() => {
      const random = Math.random();
      if (random < 0.34) {
        addActivity({
          type: "deal",
          user: "Realtime Engine",
          message: "New inbound lead detected from website demo form.",
        });
      } else if (random < 0.67) {
        addActivity({
          type: "team",
          user: "Realtime Engine",
          message: "Daily KPI snapshot refreshed for all team dashboards.",
        });
      } else {
        addActivity({
          type: "chat",
          user: "Realtime Engine",
          message: "Noah Kim marked a follow-up call as complete.",
        });
      }
    }, 12000);

    return () => window.clearInterval(interval);
  }, [liveFeedEnabled]);

  return (
    <div className="experience">
      <header className="hero card">
        <div>
          <p className="eyebrow">Sales Marketing Network</p>
          <h1>Team pipeline collaboration + live analytics workspace</h1>
          <p className="subtext">
            Unified view for role management, deal movement, rep productivity, and real-time
            activity updates.
          </p>
        </div>
        <div className="heroMeta">
          <span className="chip">Seats: 100</span>
          <span className="chip">Active Pipelines: 2</span>
          <span className={`chip ${liveFeedEnabled ? "success" : "muted"}`}>
            {liveFeedEnabled ? "Live Feed ON" : "Live Feed OFF"}
          </span>
        </div>
      </header>

      <section className="controls card" aria-label="Date range and report controls">
        <div className="dateControls">
          <label>
            Start
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={endDate}
            />
          </label>
          <label>
            End
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
            />
          </label>
          <div className="presets" role="group" aria-label="Quick date presets">
            <button type="button" onClick={() => applyPresetRange(7)}>
              Last 7d
            </button>
            <button type="button" onClick={() => applyPresetRange(30)}>
              Last 30d
            </button>
            <button type="button" onClick={() => applyPresetRange(90)}>
              Last 90d
            </button>
          </div>
        </div>
        <div className="exportActions">
          <button type="button" className="secondary" onClick={() => setLiveFeedEnabled((v) => !v)}>
            {liveFeedEnabled ? "Pause Live Updates" : "Resume Live Updates"}
          </button>
          <button type="button" className="secondary" onClick={exportCSV}>
            Export CSV
          </button>
          <button type="button" onClick={exportPDF}>
            Export PDF
          </button>
        </div>
      </section>

      <section className="kpis" aria-label="Sales metrics and KPI summary">
        <article className="card kpi">
          <h3>Revenue (Won)</h3>
          <p>{formatCurrency(dashboard.wonRevenue)}</p>
        </article>
        <article className="card kpi">
          <h3>Conversion Rate</h3>
          <p>{dashboard.conversionRate.toFixed(1)}%</p>
        </article>
        <article className="card kpi">
          <h3>Pipeline Value</h3>
          <p>{formatCurrency(dashboard.activeValue)}</p>
        </article>
        <article className="card kpi">
          <h3>Avg Deal Size</h3>
          <p>{formatCurrency(dashboard.avgDealSize)}</p>
        </article>
      </section>

      <section className="mainGrid">
        <div className="leftColumn">
          <article className="card">
            <div className="sectionHeader">
              <h2>Sales Pipeline / Deal Tracking</h2>
              <span>{filteredDeals.length} matching deals</span>
            </div>
            <div className="pipelineGrid">
              {STAGES.map((stage) => {
                const stageDeals = pipelineByStage.get(stage) ?? [];
                const stageValue = stageDeals.reduce((sum, d) => sum + d.value, 0);
                return (
                  <section key={stage} className="stageColumn" aria-label={`${stage} stage`}>
                    <div className="stageHeader">
                      <strong>{stage}</strong>
                      <small>
                        {stageDeals.length} deals • {formatCurrency(stageValue)}
                      </small>
                    </div>
                    {stageDeals.length === 0 ? (
                      <div className="empty">No deals in this stage</div>
                    ) : (
                      stageDeals.map((deal) => (
                        <div key={deal.id} className="dealCard">
                          <div className="dealTop">
                            <strong>{deal.company}</strong>
                            <span>{formatCurrency(deal.value)}</span>
                          </div>
                          <p>
                            {deal.contact} • {members.find((m) => m.id === deal.ownerId)?.name}
                          </p>
                          <small>
                            {deal.source} • {deal.probability}% confidence
                          </small>
                          <div className="dealActions">
                            <button
                              type="button"
                              onClick={() => moveDealStage(deal.id, "prev")}
                              disabled={stage === STAGES[0]}
                            >
                              ←
                            </button>
                            <button
                              type="button"
                              onClick={() => moveDealStage(deal.id, "next")}
                              disabled={stage === STAGES[STAGES.length - 1]}
                            >
                              →
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </section>
                );
              })}
            </div>
          </article>

          <article className="card">
            <div className="sectionHeader">
              <h2>Lead / Contact Database</h2>
              <input
                aria-label="Search leads"
                placeholder="Search by contact, company, or source"
                value={dealSearch}
                onChange={(e) => setDealSearch(e.target.value)}
              />
            </div>
            {filteredDeals.length === 0 ? (
              <div className="emptyState">
                <p>No leads found for this filter range.</p>
                <button type="button" onClick={() => setDealSearch("")}>
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="tableWrap">
                <table>
                  <thead>
                    <tr>
                      <th>Contact</th>
                      <th>Company</th>
                      <th>Owner</th>
                      <th>Stage</th>
                      <th>Value</th>
                      <th>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDeals.map((deal) => (
                      <tr key={deal.id}>
                        <td>{deal.contact}</td>
                        <td>{deal.company}</td>
                        <td>{members.find((m) => m.id === deal.ownerId)?.name}</td>
                        <td>{deal.stage}</td>
                        <td>{formatCurrency(deal.value)}</td>
                        <td>{new Date(deal.updatedAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </article>
        </div>

        <aside className="rightColumn">
          <article className="card">
            <div className="sectionHeader">
              <h2>Team Profiles & Role Management</h2>
            </div>
            <div className="memberList">
              {members.map((member) => (
                <div className="memberRow" key={member.id}>
                  <div>
                    <strong>{member.name}</strong>
                    <p>
                      {member.region} • {member.active ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <div className="memberActions">
                    <select
                      aria-label={`Role for ${member.name}`}
                      value={member.role}
                      onChange={(e) => updateMemberRole(member.id, e.target.value as TeamRole)}
                    >
                      {TEAM_ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    <button type="button" onClick={() => toggleMemberStatus(member.id)}>
                      {member.active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="card">
            <div className="sectionHeader">
              <h2>Real-time Activity Feed</h2>
              <span>{activity.length} events</span>
            </div>
            <div className="activityList">
              {activity.slice(0, 12).map((item) => (
                <div key={item.id} className={`activityItem ${item.type}`}>
                  <div>
                    <strong>{item.user}</strong>
                    <p>{item.message}</p>
                  </div>
                  <time>{formatDateTime(item.time)}</time>
                </div>
              ))}
            </div>
          </article>

          <article className="card">
            <div className="sectionHeader">
              <h2>Team Performance Comparison</h2>
            </div>
            <div className="bars">
              {teamPerformance.byRep.map((rep) => {
                const width = (rep.revenue / teamPerformance.maxRevenue) * 100;
                return (
                  <div key={rep.id} className="barRow">
                    <div className="barLabel">
                      <span>{rep.name}</span>
                      <small>
                        {formatCurrency(rep.revenue)} • {rep.conversion.toFixed(0)}%
                      </small>
                    </div>
                    <div className="barTrack">
                      <div className="barFill" style={{ width: `${width}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="repStats">
              <label>
                Individual rep stats
                <select
                  value={selectedRep}
                  onChange={(e) => setSelectedRep(Number(e.target.value))}
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="repTiles">
                <div>
                  <strong>{selectedRepStats?.deals ?? 0}</strong>
                  <span>Deals in range</span>
                </div>
                <div>
                  <strong>{selectedRepStats?.wonDeals ?? 0}</strong>
                  <span>Won deals</span>
                </div>
                <div>
                  <strong>{(selectedRepStats?.conversion ?? 0).toFixed(1)}%</strong>
                  <span>Close rate</span>
                </div>
              </div>
            </div>
          </article>
        </aside>
      </section>

      <section className="bottomGrid">
        <article className="card">
          <div className="sectionHeader">
            <h2>Revenue Trend (Real-time Visualization)</h2>
            <span>Last 7 days</span>
          </div>
          <div className="chartWrap" aria-label="Revenue trend chart">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img">
              <polyline points={trend.polyline} fill="none" strokeWidth="2.8" stroke="url(#lineGrad)" />
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6ee7b7" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
            </svg>
            <div className="axisLabels">
              {trend.points.map((p) => (
                <span key={p.key}>{p.label}</span>
              ))}
            </div>
          </div>
          <div className="trendLegend">
            <span>Peak day: {formatCurrency(trend.max)}</span>
            <span>Won deals this range: {dashboard.wonCount}</span>
          </div>
        </article>

        <article className="card chatCard">
          <div className="sectionHeader">
            <h2>Team Chat</h2>
            <span>{chat.length} messages</span>
          </div>
          <div className="chatList">
            {chat.slice(-10).map((msg) => (
              <div key={msg.id} className={`chatBubble ${msg.user === "You" ? "me" : "them"}`}>
                <strong>{msg.user}</strong>
                <p>{msg.message}</p>
                <time>{formatDateTime(msg.time)}</time>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="chatForm">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Send update to your sales team..."
              aria-label="Message sales team"
            />
            <button type="submit">Send</button>
          </form>
        </article>
      </section>

      <style jsx>{`
        .experience {
          max-width: 1360px;
          margin: 0 auto;
          padding: 24px;
          color: #e5e7eb;
          background: radial-gradient(circle at top right, #1d2844 0%, #0b1020 55%, #060a16 100%);
          min-height: 100vh;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        }
        .card {
          background: rgba(15, 23, 42, 0.72);
          border: 1px solid rgba(148, 163, 184, 0.24);
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 10px 30px rgba(2, 6, 23, 0.35);
          backdrop-filter: blur(8px);
        }
        .hero {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        .hero h1 {
          margin: 8px 0;
          font-size: clamp(1.3rem, 2vw, 2rem);
          line-height: 1.2;
          color: #f8fafc;
        }
        .eyebrow {
          margin: 0;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.12em;
          color: #93c5fd;
          font-weight: 700;
        }
        .subtext {
          margin: 0;
          color: #cbd5e1;
          max-width: 760px;
        }
        .heroMeta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .chip {
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.4);
          background: rgba(30, 41, 59, 0.6);
        }
        .chip.success {
          border-color: rgba(34, 197, 94, 0.7);
          color: #bbf7d0;
        }
        .chip.muted {
          border-color: rgba(148, 163, 184, 0.4);
          color: #cbd5e1;
        }
        .controls {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .dateControls {
          display: flex;
          align-items: end;
          gap: 12px;
          flex-wrap: wrap;
        }
        label {
          display: grid;
          gap: 6px;
          font-size: 13px;
          color: #cbd5e1;
        }
        input,
        select,
        button {
          background: rgba(15, 23, 42, 0.82);
          color: #e2e8f0;
          border: 1px solid rgba(148, 163, 184, 0.35);
          border-radius: 10px;
          padding: 9px 12px;
          font-size: 14px;
        }
        button {
          cursor: pointer;
          transition: all 0.2s ease;
          border-color: rgba(96, 165, 250, 0.4);
          background: linear-gradient(180deg, #2563eb, #1d4ed8);
          color: #eff6ff;
          font-weight: 600;
        }
        button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35);
        }
        button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .secondary {
          background: rgba(15, 23, 42, 0.8);
          border-color: rgba(148, 163, 184, 0.35);
        }
        .presets {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }
        .exportActions {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }
        .kpis {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 16px;
        }
        .kpi h3 {
          margin: 0;
          color: #cbd5e1;
          font-size: 13px;
          font-weight: 500;
        }
        .kpi p {
          margin: 8px 0 0;
          font-size: 1.6rem;
          font-weight: 700;
          color: #f8fafc;
        }
        .mainGrid {
          display: grid;
          grid-template-columns: 1.7fr 1fr;
          gap: 14px;
        }
        .leftColumn,
        .rightColumn {
          display: grid;
          gap: 14px;
          align-content: start;
        }
        .sectionHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .sectionHeader h2 {
          margin: 0;
          font-size: 1rem;
          color: #f1f5f9;
        }
        .sectionHeader span {
          font-size: 12px;
          color: #93c5fd;
        }
        .pipelineGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }
        .stageColumn {
          background: rgba(2, 6, 23, 0.35);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 12px;
          min-height: 220px;
          padding: 10px;
          display: grid;
          gap: 8px;
          align-content: start;
        }
        .stageHeader {
          display: grid;
          gap: 2px;
        }
        .stageHeader strong {
          color: #dbeafe;
          font-size: 13px;
        }
        .stageHeader small {
          color: #94a3b8;
        }
        .dealCard {
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 10px;
          background: rgba(15, 23, 42, 0.9);
          padding: 9px;
          display: grid;
          gap: 5px;
        }
        .dealTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 6px;
          font-size: 13px;
        }
        .dealCard p {
          margin: 0;
          font-size: 12px;
          color: #cbd5e1;
        }
        .dealCard small {
          color: #94a3b8;
        }
        .dealActions {
          display: flex;
          gap: 6px;
          justify-content: end;
        }
        .dealActions button {
          padding: 4px 8px;
          font-size: 13px;
          background: rgba(37, 99, 235, 0.18);
        }
        .empty {
          border: 1px dashed rgba(148, 163, 184, 0.3);
          border-radius: 8px;
          padding: 10px;
          font-size: 12px;
          color: #94a3b8;
          text-align: center;
        }
        .tableWrap {
          overflow: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 620px;
        }
        th,
        td {
          text-align: left;
          padding: 10px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.14);
          font-size: 13px;
        }
        th {
          color: #93c5fd;
          font-weight: 600;
        }
        .emptyState {
          display: grid;
          place-items: center;
          gap: 10px;
          border: 1px dashed rgba(148, 163, 184, 0.35);
          border-radius: 12px;
          min-height: 120px;
        }
        .memberList {
          display: grid;
          gap: 10px;
        }
        .memberRow {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
          border: 1px solid rgba(148, 163, 184, 0.18);
          border-radius: 10px;
          padding: 8px;
        }
        .memberRow p {
          margin: 4px 0 0;
          font-size: 12px;
          color: #94a3b8;
        }
        .memberActions {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .activityList {
          max-height: 280px;
          overflow: auto;
          display: grid;
          gap: 8px;
        }
        .activityItem {
          border-left: 3px solid #64748b;
          background: rgba(15, 23, 42, 0.55);
          padding: 9px;
          border-radius: 8px;
          display: grid;
          gap: 4px;
        }
        .activityItem.deal {
          border-color: #60a5fa;
        }
        .activityItem.team {
          border-color: #f59e0b;
        }
        .activityItem.chat {
          border-color: #34d399;
        }
        .activityItem.system {
          border-color: #a78bfa;
        }
        .activityItem p {
          margin: 2px 0;
          color: #dbeafe;
          font-size: 13px;
        }
        .activityItem time {
          color: #94a3b8;
          font-size: 11px;
        }
        .bars {
          display: grid;
          gap: 10px;
          margin-bottom: 12px;
        }
        .barRow {
          display: grid;
          gap: 6px;
        }
        .barLabel {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #e2e8f0;
        }
        .barLabel small {
          color: #93c5fd;
        }
        .barTrack {
          height: 10px;
          border-radius: 999px;
          background: rgba(30, 41, 59, 0.8);
          overflow: hidden;
        }
        .barFill {
          height: 100%;
          background: linear-gradient(90deg, #34d399, #3b82f6);
          border-radius: 999px;
        }
        .repStats {
          display: grid;
          gap: 8px;
        }
        .repTiles {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .repTiles div {
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 10px;
          background: rgba(15, 23, 42, 0.6);
          padding: 8px;
          display: grid;
          gap: 2px;
        }
        .repTiles strong {
          font-size: 1.05rem;
          color: #f8fafc;
        }
        .repTiles span {
          color: #94a3b8;
          font-size: 12px;
        }
        .bottomGrid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 14px;
          margin-top: 14px;
        }
        .chartWrap {
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 10px;
          padding: 10px;
          background: rgba(2, 6, 23, 0.35);
        }
        svg {
          width: 100%;
          height: 160px;
          display: block;
        }
        .axisLabels {
          margin-top: 8px;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          font-size: 11px;
          color: #94a3b8;
          text-align: center;
        }
        .trendLegend {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #bfdbfe;
        }
        .chatCard {
          display: grid;
          grid-template-rows: auto 1fr auto;
        }
        .chatList {
          max-height: 260px;
          overflow: auto;
          display: grid;
          gap: 8px;
          padding-right: 4px;
        }
        .chatBubble {
          border-radius: 10px;
          padding: 8px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.15);
          max-width: 90%;
        }
        .chatBubble.me {
          margin-left: auto;
          border-color: rgba(96, 165, 250, 0.5);
          background: rgba(37, 99, 235, 0.2);
        }
        .chatBubble strong {
          display: block;
          font-size: 12px;
        }
        .chatBubble p {
          margin: 4px 0;
          font-size: 13px;
          color: #e2e8f0;
        }
        .chatBubble time {
          font-size: 11px;
          color: #94a3b8;
        }
        .chatForm {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 8px;
          margin-top: 10px;
        }

        @media (max-width: 1200px) {
          .kpis {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .mainGrid {
            grid-template-columns: 1fr;
          }
          .pipelineGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .bottomGrid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 780px) {
          .experience {
            padding: 14px;
          }
          .hero {
            flex-direction: column;
          }
          .kpis {
            grid-template-columns: 1fr;
          }
          .pipelineGrid {
            grid-template-columns: 1fr;
          }
          .repTiles {
            grid-template-columns: 1fr;
          }
          .chatForm {
            grid-template-columns: 1fr;
          }
        }

        @media print {
          .experience {
            background: white;
            color: #111827;
          }
          .card {
            border: 1px solid #d1d5db;
            box-shadow: none;
            background: white;
          }
          button,
          .chatForm,
          .presets,
          .exportActions {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
