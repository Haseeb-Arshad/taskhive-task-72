"use client";

import { useEffect, useMemo, useState } from "react";

type TeamRole = "Manager" | "Account Executive" | "SDR" | "Analyst";
type DealStage =
  | "Prospecting"
  | "Qualified"
  | "Proposal"
  | "Negotiation"
  | "Closed Won"
  | "Closed Lost";

type FeedTab = "activity" | "chat";

interface TeamMember {
  id: number;
  name: string;
  role: TeamRole;
  territory: string;
  quota: number;
  revenue: number;
  dealsClosed: number;
  conversionRate: number;
}

interface Deal {
  id: number;
  name: string;
  company: string;
  value: number;
  stage: DealStage;
  ownerId: number;
  probability: number;
  closeDate: string;
  lastUpdate: string;
}

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  ownerId: number;
  score: number;
  status: "New" | "Contacted" | "Nurturing" | "Qualified" | "Customer";
  lastActivity: string;
}

interface ActivityItem {
  id: number;
  text: string;
  createdAt: string;
  severity?: "info" | "warning" | "success";
}

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  createdAt: string;
}

const STAGES: DealStage[] = [
  "Prospecting",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
];

const ROLE_OPTIONS: TeamRole[] = ["Manager", "Account Executive", "SDR", "Analyst"];

const INITIAL_TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Ava Johnson",
    role: "Manager",
    territory: "North America",
    quota: 320000,
    revenue: 218000,
    dealsClosed: 11,
    conversionRate: 34,
  },
  {
    id: 2,
    name: "Liam Chen",
    role: "Manager",
    territory: "EMEA",
    quota: 280000,
    revenue: 184000,
    dealsClosed: 9,
    conversionRate: 31,
  },
  {
    id: 3,
    name: "Maya Patel",
    role: "Account Executive",
    territory: "SMB Remote",
    quota: 210000,
    revenue: 139000,
    dealsClosed: 8,
    conversionRate: 29,
  },
  {
    id: 4,
    name: "Noah Rivera",
    role: "SDR",
    territory: "LATAM",
    quota: 140000,
    revenue: 91000,
    dealsClosed: 6,
    conversionRate: 22,
  },
  {
    id: 5,
    name: "Grace Miller",
    role: "Analyst",
    territory: "Ops",
    quota: 0,
    revenue: 0,
    dealsClosed: 0,
    conversionRate: 0,
  },
];

const INITIAL_DEALS: Deal[] = [
  {
    id: 501,
    name: "Enterprise CRM Rollout",
    company: "Northwind Energy",
    value: 86000,
    stage: "Proposal",
    ownerId: 1,
    probability: 68,
    closeDate: "2026-03-21",
    lastUpdate: "2026-03-11",
  },
  {
    id: 502,
    name: "Q2 Marketing Stack Upgrade",
    company: "Bluebird Retail",
    value: 54000,
    stage: "Negotiation",
    ownerId: 2,
    probability: 77,
    closeDate: "2026-03-17",
    lastUpdate: "2026-03-10",
  },
  {
    id: 503,
    name: "Lead Nurture Automation",
    company: "Nova Studio",
    value: 22000,
    stage: "Qualified",
    ownerId: 3,
    probability: 48,
    closeDate: "2026-03-27",
    lastUpdate: "2026-03-09",
  },
  {
    id: 504,
    name: "RevOps Dashboard Expansion",
    company: "Atlas Freight",
    value: 46000,
    stage: "Prospecting",
    ownerId: 4,
    probability: 24,
    closeDate: "2026-04-07",
    lastUpdate: "2026-03-08",
  },
  {
    id: 505,
    name: "Annual Retainer Renewal",
    company: "Helix Pharma",
    value: 98000,
    stage: "Closed Won",
    ownerId: 1,
    probability: 100,
    closeDate: "2026-03-01",
    lastUpdate: "2026-03-01",
  },
  {
    id: 506,
    name: "Outbound Pilot",
    company: "CargoMint",
    value: 18000,
    stage: "Closed Lost",
    ownerId: 4,
    probability: 0,
    closeDate: "2026-02-25",
    lastUpdate: "2026-02-25",
  },
  {
    id: 507,
    name: "Regional Campaign Licensing",
    company: "Summit Home",
    value: 33000,
    stage: "Proposal",
    ownerId: 2,
    probability: 58,
    closeDate: "2026-03-29",
    lastUpdate: "2026-03-12",
  },
];

const INITIAL_LEADS: Lead[] = [
  {
    id: 9001,
    name: "Sophia Park",
    company: "Grove Systems",
    email: "sophia.park@grove.io",
    phone: "+1 (415) 019-4421",
    ownerId: 3,
    score: 88,
    status: "Qualified",
    lastActivity: "2026-03-11",
  },
  {
    id: 9002,
    name: "Ethan Brooks",
    company: "Urbanloop",
    email: "ethan@urbanloop.com",
    phone: "+1 (212) 884-1009",
    ownerId: 4,
    score: 73,
    status: "Nurturing",
    lastActivity: "2026-03-10",
  },
  {
    id: 9003,
    name: "Isabella Kim",
    company: "Waveform Health",
    email: "ikim@waveformhealth.com",
    phone: "+44 20 7946 0945",
    ownerId: 2,
    score: 64,
    status: "Contacted",
    lastActivity: "2026-03-09",
  },
  {
    id: 9004,
    name: "Oliver Scott",
    company: "PineTech",
    email: "oliver.scott@pinetech.com",
    phone: "+1 (617) 332-1012",
    ownerId: 1,
    score: 91,
    status: "Qualified",
    lastActivity: "2026-03-12",
  },
  {
    id: 9005,
    name: "Ariana Diaz",
    company: "Mint Forge",
    email: "ariana.diaz@mintforge.com",
    phone: "+52 55 1024 8871",
    ownerId: 4,
    score: 56,
    status: "New",
    lastActivity: "2026-03-08",
  },
];

const INITIAL_ACTIVITY: ActivityItem[] = [
  {
    id: 1,
    text: "Ava moved ‘Enterprise CRM Rollout’ to Proposal.",
    createdAt: "2026-03-12T09:02:00.000Z",
    severity: "info",
  },
  {
    id: 2,
    text: "Liam logged a negotiation call with Bluebird Retail.",
    createdAt: "2026-03-12T08:38:00.000Z",
    severity: "success",
  },
  {
    id: 3,
    text: "Overdue reminder: Atlas Freight close date is in 2 days.",
    createdAt: "2026-03-12T08:11:00.000Z",
    severity: "warning",
  },
];

const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 1,
    sender: "Ava",
    message: "Team, focus on proposal follow-ups before 3 PM.",
    createdAt: "2026-03-12T08:45:00.000Z",
  },
  {
    id: 2,
    sender: "Maya",
    message: "I’ll handle Nova Studio and post an update after demo.",
    createdAt: "2026-03-12T09:00:00.000Z",
  },
];

function currency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function sameOrAfter(target: string, from: string): boolean {
  return new Date(target).getTime() >= new Date(from).getTime();
}

function sameOrBefore(target: string, to: string): boolean {
  return new Date(target).getTime() <= new Date(to).getTime();
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.max(1, Math.floor(diffMs / (1000 * 60)));
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function MainExperience() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM);
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [leads] = useState<Lead[]>(INITIAL_LEADS);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITY);
  const [chat, setChat] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [feedTab, setFeedTab] = useState<FeedTab>("activity");
  const [realtimeOn, setRealtimeOn] = useState(true);
  const [chatInput, setChatInput] = useState("");

  const [startDate, setStartDate] = useState("2026-02-15");
  const [endDate, setEndDate] = useState("2026-03-31");

  const [leadSearch, setLeadSearch] = useState("");
  const [leadOwnerFilter, setLeadOwnerFilter] = useState<string>("all");
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>("all");

  const [roleWarning, setRoleWarning] = useState<string>("");

  const managerLimit = 2;
  const seatLimit = 100;
  const managerCount = teamMembers.filter((m) => m.role === "Manager").length;

  const rangedDeals = useMemo(() => {
    return deals.filter((d) => sameOrAfter(d.closeDate, startDate) && sameOrBefore(d.closeDate, endDate));
  }, [deals, startDate, endDate]);

  const wonDeals = rangedDeals.filter((d) => d.stage === "Closed Won");
  const lostDeals = rangedDeals.filter((d) => d.stage === "Closed Lost");
  const activeDeals = deals.filter((d) => !["Closed Won", "Closed Lost"].includes(d.stage));

  const kpiRevenue = wonDeals.reduce((sum, d) => sum + d.value, 0);
  const kpiPipeline = activeDeals.reduce((sum, d) => sum + d.value, 0);
  const conversionRate = wonDeals.length + lostDeals.length > 0
    ? Math.round((wonDeals.length / (wonDeals.length + lostDeals.length)) * 100)
    : 0;

  const overdueDeals = activeDeals.filter((d) => new Date(d.closeDate).getTime() < Date.now());

  const filteredLeads = useMemo(() => {
    const query = leadSearch.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesQuery =
        query.length === 0 ||
        lead.name.toLowerCase().includes(query) ||
        lead.company.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query);
      const matchesOwner = leadOwnerFilter === "all" || String(lead.ownerId) === leadOwnerFilter;
      const matchesStatus = leadStatusFilter === "all" || lead.status === leadStatusFilter;
      return matchesQuery && matchesOwner && matchesStatus;
    });
  }, [leads, leadOwnerFilter, leadSearch, leadStatusFilter]);

  const teamMaxRevenue = Math.max(...teamMembers.map((m) => m.revenue), 1);

  const trendData = useMemo(() => {
    const buckets = 6;
    const from = new Date(startDate).getTime();
    const to = new Date(endDate).getTime();
    const span = Math.max(to - from, 1);
    const result = Array.from({ length: buckets }, (_, i) => {
      const tickTime = from + (span / (buckets - 1)) * i;
      const label = new Date(tickTime).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      return { label, value: 0 };
    });

    wonDeals.forEach((deal) => {
      const time = new Date(deal.closeDate).getTime();
      const ratio = Math.min(0.9999, Math.max(0, (time - from) / span));
      const idx = Math.floor(ratio * buckets);
      result[idx].value += deal.value;
    });

    return result;
  }, [startDate, endDate, wonDeals]);

  const linePath = useMemo(() => {
    const max = Math.max(...trendData.map((p) => p.value), 1);
    return trendData
      .map((point, index) => {
        const x = 40 + index * 104;
        const y = 190 - (point.value / max) * 140;
        return `${x},${y}`;
      })
      .join(" ");
  }, [trendData]);

  const addActivity = (text: string, severity: ActivityItem["severity"] = "info") => {
    setActivities((prev) => [
      {
        id: Date.now(),
        text,
        createdAt: new Date().toISOString(),
        severity,
      },
      ...prev,
    ]);
  };

  useEffect(() => {
    if (!realtimeOn) return;
    const timer = window.setInterval(() => {
      const messages = [
        "New lead assigned from website form.",
        "Deal probability increased after discovery call.",
        "Contact record updated with new decision-maker.",
        "Weekly conversion snapshot refreshed.",
      ];
      const text = messages[Math.floor(Math.random() * messages.length)];
      addActivity(text, "info");
    }, 12000);

    return () => window.clearInterval(timer);
  }, [realtimeOn]);

  const moveDeal = (dealId: number, direction: "left" | "right") => {
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id !== dealId) return deal;
        const currentIndex = STAGES.indexOf(deal.stage);
        const nextIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;
        if (nextIndex < 0 || nextIndex >= STAGES.length) return deal;
        const nextStage = STAGES[nextIndex];
        addActivity(`${deal.name} moved from ${deal.stage} to ${nextStage}.`, "success");
        return {
          ...deal,
          stage: nextStage,
          lastUpdate: new Date().toISOString().slice(0, 10),
          probability:
            nextStage === "Closed Won"
              ? 100
              : nextStage === "Closed Lost"
              ? 0
              : Math.min(95, Math.max(10, deal.probability + (direction === "right" ? 10 : -10))),
        };
      })
    );
  };

  const setQuickRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setStartDate(start.toISOString().slice(0, 10));
    setEndDate(end.toISOString().slice(0, 10));
  };

  const onRoleChange = (memberId: number, nextRole: TeamRole) => {
    setRoleWarning("");
    const member = teamMembers.find((m) => m.id === memberId);
    if (!member) return;

    if (nextRole === "Manager" && member.role !== "Manager" && managerCount >= managerLimit) {
      setRoleWarning(`Manager seat limit reached (${managerLimit}). Reassign an existing manager first.`);
      return;
    }

    setTeamMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role: nextRole } : m))
    );
    addActivity(`${member.name} role updated to ${nextRole}.`, "info");
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const msg: ChatMessage = {
      id: Date.now(),
      sender: "You",
      message: chatInput.trim(),
      createdAt: new Date().toISOString(),
    };
    setChat((prev) => [...prev, msg]);
    setChatInput("");
    addActivity("New team chat message posted.", "info");
  };

  const exportCSV = () => {
    const rows = [
      ["Metric", "Value"],
      ["Revenue (range)", String(kpiRevenue)],
      ["Pipeline Value", String(kpiPipeline)],
      ["Conversion Rate", `${conversionRate}%`],
      ["Won Deals", String(wonDeals.length)],
      ["Lost Deals", String(lostDeals.length)],
      [],
      ["Deal Name", "Company", "Stage", "Owner", "Value", "Close Date"],
      ...deals.map((d) => {
        const owner = teamMembers.find((m) => m.id === d.ownerId)?.name ?? "Unassigned";
        return [d.name, d.company, d.stage, owner, String(d.value), d.closeDate];
      }),
    ];

    const csv = rows
      .map((r) => r.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sales-report-${startDate}-to-${endDate}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    addActivity("CSV report exported.", "success");
  };

  const exportPDF = () => {
    const reportHtml = `
      <html>
        <head>
          <title>Sales Report</title>
          <style>
            body { font-family: Inter, Arial, sans-serif; padding: 24px; color: #0f172a; }
            h1 { margin: 0 0 6px; }
            .muted { color: #475569; margin-bottom: 18px; }
            .grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; margin-bottom: 18px; }
            .card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #e2e8f0; padding: 8px; text-align: left; font-size: 12px; }
            th { background: #f8fafc; }
          </style>
        </head>
        <body>
          <h1>Sales Marketing Network Report</h1>
          <div class="muted">Date range: ${startDate} → ${endDate}</div>
          <div class="grid">
            <div class="card"><strong>Revenue</strong><br/>${currency(kpiRevenue)}</div>
            <div class="card"><strong>Pipeline Value</strong><br/>${currency(kpiPipeline)}</div>
            <div class="card"><strong>Conversion Rate</strong><br/>${conversionRate}%</div>
            <div class="card"><strong>Overdue Deals</strong><br/>${overdueDeals.length}</div>
          </div>
          <table>
            <thead>
              <tr><th>Deal</th><th>Company</th><th>Stage</th><th>Owner</th><th>Value</th></tr>
            </thead>
            <tbody>
              ${deals
                .map((d) => {
                  const owner = teamMembers.find((m) => m.id === d.ownerId)?.name ?? "Unassigned";
                  return `<tr><td>${d.name}</td><td>${d.company}</td><td>${d.stage}</td><td>${owner}</td><td>${currency(
                    d.value
                  )}</td></tr>`;
                })
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "noopener,noreferrer,width=1000,height=700");
    if (!printWindow) return;
    printWindow.document.open();
    printWindow.document.write(reportHtml);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    addActivity("PDF print report opened.", "success");
  };

  return (
    <div className="experience-root">
      <section className="hero card">
        <div>
          <p className="eyebrow">Sales Marketing Network</p>
          <h1>Team pipeline, collaboration, and analytics in one workspace</h1>
          <p className="subtitle">
            Coordinate role assignments, track deals through every stage, compare rep performance, and
            export executive-ready reports.
          </p>
        </div>

        <div className="date-tools">
          <div className="date-inputs">
            <label>
              Start
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
            <label>
              End
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>
          </div>
          <div className="quick-buttons">
            <button onClick={() => setQuickRange(7)}>Last 7d</button>
            <button onClick={() => setQuickRange(30)}>Last 30d</button>
            <button onClick={() => setQuickRange(90)}>Last 90d</button>
          </div>
        </div>
      </section>

      <section className="kpi-grid">
        <article className="kpi card">
          <span>Revenue (selected range)</span>
          <strong>{currency(kpiRevenue)}</strong>
        </article>
        <article className="kpi card">
          <span>Open pipeline value</span>
          <strong>{currency(kpiPipeline)}</strong>
        </article>
        <article className="kpi card">
          <span>Conversion rate</span>
          <strong>{conversionRate}%</strong>
        </article>
        <article className="kpi card">
          <span>Overdue deals</span>
          <strong className={overdueDeals.length > 0 ? "danger" : ""}>{overdueDeals.length}</strong>
        </article>
      </section>

      <section className="top-grid">
        <article className="card team-card">
          <div className="section-header">
            <h2>Team profiles & role management</h2>
            <p>
              Seats used: {teamMembers.length}/{seatLimit} • Manager seats: {managerCount}/{managerLimit}
            </p>
          </div>
          {roleWarning ? <div className="warning-banner">{roleWarning}</div> : null}

          <div className="team-list">
            {teamMembers.map((member) => (
              <div className="team-row" key={member.id}>
                <div>
                  <h3>{member.name}</h3>
                  <p>
                    {member.territory} • {member.dealsClosed} deals • {currency(member.revenue)}
                  </p>
                </div>
                <label className="role-select-wrap">
                  <span>Role</span>
                  <select
                    value={member.role}
                    onChange={(e) => onRoleChange(member.id, e.target.value as TeamRole)}
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ))}
          </div>
        </article>

        <article className="card feed-card">
          <div className="section-header inline-header">
            <h2>Real-time activity feed / team chat</h2>
            <button className="ghost" onClick={() => setRealtimeOn((v) => !v)}>
              {realtimeOn ? "Pause realtime" : "Resume realtime"}
            </button>
          </div>

          <div className="feed-tabs">
            <button
              className={feedTab === "activity" ? "active" : ""}
              onClick={() => setFeedTab("activity")}
            >
              Activity
            </button>
            <button className={feedTab === "chat" ? "active" : ""} onClick={() => setFeedTab("chat")}>
              Team Chat
            </button>
          </div>

          {feedTab === "activity" ? (
            <ul className="feed-list">
              {activities.length === 0 ? (
                <li className="empty">No recent activity. Realtime feed is currently quiet.</li>
              ) : (
                activities.slice(0, 8).map((item) => (
                  <li key={item.id}>
                    <span className={`dot ${item.severity ?? "info"}`} />
                    <div>
                      <p>{item.text}</p>
                      <small>{timeAgo(item.createdAt)}</small>
                    </div>
                  </li>
                ))
              )}
            </ul>
          ) : (
            <div className="chat-box">
              <div className="chat-list">
                {chat.map((message) => (
                  <div className="message" key={message.id}>
                    <strong>{message.sender}</strong>
                    <p>{message.message}</p>
                    <small>{timeAgo(message.createdAt)}</small>
                  </div>
                ))}
              </div>
              <div className="chat-compose">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Share update, blocker, or handoff..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendChat();
                  }}
                />
                <button onClick={sendChat}>Send</button>
              </div>
            </div>
          )}
        </article>
      </section>

      <section className="pipeline card">
        <div className="section-header">
          <h2>Sales pipeline & deal tracking</h2>
          <p>Advance or rollback deals by stage to reflect current ownership and risk.</p>
        </div>

        <div className="pipeline-board">
          {STAGES.map((stage) => {
            const stageDeals = deals.filter((d) => d.stage === stage);
            return (
              <div className="stage" key={stage}>
                <header>
                  <h3>{stage}</h3>
                  <span>{stageDeals.length}</span>
                </header>

                {stageDeals.length === 0 ? (
                  <div className="stage-empty">No deals in this stage.</div>
                ) : (
                  stageDeals.map((deal) => {
                    const owner = teamMembers.find((m) => m.id === deal.ownerId);
                    const isOverdue =
                      !["Closed Won", "Closed Lost"].includes(deal.stage) &&
                      new Date(deal.closeDate).getTime() < Date.now();
                    return (
                      <article className="deal-card" key={deal.id}>
                        <h4>{deal.name}</h4>
                        <p>{deal.company}</p>
                        <div className="deal-meta">
                          <span>{currency(deal.value)}</span>
                          <span>{deal.probability}% likely</span>
                        </div>
                        <div className="deal-meta">
                          <span>{owner?.name ?? "Unassigned"}</span>
                          <span className={isOverdue ? "danger" : ""}>Close {deal.closeDate}</span>
                        </div>
                        <div className="deal-actions">
                          <button onClick={() => moveDeal(deal.id, "left")}>←</button>
                          <button onClick={() => moveDeal(deal.id, "right")}>→</button>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="analytics-grid">
        <article className="card">
          <div className="section-header">
            <h2>Sales performance dashboard</h2>
            <p>Real-time visualization of revenue generated from won deals.</p>
          </div>

          <svg viewBox="0 0 600 220" className="line-chart" role="img" aria-label="Revenue trend chart">
            <line x1="40" y1="190" x2="560" y2="190" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="40" y1="30" x2="40" y2="190" stroke="#cbd5e1" strokeWidth="1" />
            <polyline fill="none" stroke="#4f46e5" strokeWidth="4" points={linePath} />
            {trendData.map((p, i) => {
              const max = Math.max(...trendData.map((x) => x.value), 1);
              const x = 40 + i * 104;
              const y = 190 - (p.value / max) * 140;
              return (
                <g key={`${p.label}-${i}`}>
                  <circle cx={x} cy={y} r="5" fill="#4f46e5" />
                  <text x={x} y="208" textAnchor="middle" fontSize="11" fill="#64748b">
                    {p.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </article>

        <article className="card">
          <div className="section-header">
            <h2>Team performance comparison</h2>
            <p>Revenue bars and individual rep stats for coaching and capacity planning.</p>
          </div>
          <div className="bars">
            {teamMembers
              .filter((m) => m.role !== "Analyst")
              .map((member) => {
                const width = Math.max(6, Math.round((member.revenue / teamMaxRevenue) * 100));
                return (
                  <div className="bar-row" key={member.id}>
                    <div className="bar-label">
                      <strong>{member.name}</strong>
                      <span>{member.conversionRate}% conversion</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${width}%` }} />
                    </div>
                    <div className="bar-value">{currency(member.revenue)}</div>
                  </div>
                );
              })}
          </div>
        </article>
      </section>

      <section className="card lead-section">
        <div className="section-header">
          <h2>Lead & contact database</h2>
          <p>Filter leads by owner and lifecycle status to prioritize outreach.</p>
        </div>

        <div className="lead-filters">
          <input
            placeholder="Search contact, company, or email"
            value={leadSearch}
            onChange={(e) => setLeadSearch(e.target.value)}
          />
          <select value={leadOwnerFilter} onChange={(e) => setLeadOwnerFilter(e.target.value)}>
            <option value="all">All owners</option>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
          <select value={leadStatusFilter} onChange={(e) => setLeadStatusFilter(e.target.value)}>
            <option value="all">All statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Nurturing">Nurturing</option>
            <option value="Qualified">Qualified</option>
            <option value="Customer">Customer</option>
          </select>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="empty-state">
            <p>No leads match this filter set.</p>
            <button
              onClick={() => {
                setLeadSearch("");
                setLeadOwnerFilter("all");
                setLeadStatusFilter("all");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Contact</th>
                  <th>Company</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Lead Score</th>
                  <th>Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => {
                  const owner = teamMembers.find((m) => m.id === lead.ownerId)?.name ?? "Unassigned";
                  return (
                    <tr key={lead.id}>
                      <td>
                        <strong>{lead.name}</strong>
                        <br />
                        <small>{lead.email}</small>
                      </td>
                      <td>{lead.company}</td>
                      <td>{owner}</td>
                      <td>{lead.status}</td>
                      <td>{lead.score}</td>
                      <td>{lead.lastActivity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="card report-section">
        <div className="section-header inline-header">
          <div>
            <h2>Custom reports & exports</h2>
            <p>Export range-based snapshots for leadership as CSV or print-ready PDF.</p>
          </div>
          <div className="report-buttons">
            <button onClick={exportCSV}>Export CSV</button>
            <button onClick={exportPDF}>Export PDF</button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .experience-root {
          min-height: 100vh;
          padding: 28px;
          background: radial-gradient(circle at top left, #eef2ff 0%, #f8fafc 45%, #f1f5f9 100%);
          color: #0f172a;
          display: grid;
          gap: 18px;
        }

        .card {
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
          padding: 18px;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 12px;
        }

        .eyebrow {
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 12px;
          color: #475569;
          font-weight: 600;
        }

        h1 {
          margin: 6px 0;
          font-size: clamp(1.2rem, 2.5vw, 2rem);
          line-height: 1.2;
        }

        .subtitle {
          margin: 0;
          color: #475569;
          max-width: 64ch;
        }

        .date-tools {
          display: grid;
          gap: 10px;
          align-content: center;
        }

        .date-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .date-inputs label,
        .role-select-wrap {
          display: grid;
          gap: 4px;
          font-size: 12px;
          color: #334155;
        }

        input,
        select,
        button {
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          padding: 9px 11px;
          font: inherit;
          background: #fff;
        }

        button {
          background: linear-gradient(180deg, #ffffff, #f8fafc);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
        }

        button:hover {
          transform: translateY(-1px);
          box-shadow: 0 5px 12px rgba(15, 23, 42, 0.08);
        }

        .quick-buttons {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }

        .kpi-grid {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .kpi {
          display: grid;
          gap: 6px;
        }

        .kpi span {
          color: #64748b;
          font-size: 13px;
        }

        .kpi strong {
          font-size: 1.45rem;
        }

        .danger {
          color: #b91c1c !important;
        }

        .top-grid,
        .analytics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .section-header {
          margin-bottom: 10px;
        }

        .section-header h2 {
          margin: 0;
          font-size: 1.05rem;
        }

        .section-header p {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 13px;
        }

        .inline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .warning-banner {
          background: #fff7ed;
          color: #9a3412;
          border: 1px solid #fdba74;
          border-radius: 10px;
          padding: 8px 10px;
          margin-bottom: 10px;
          font-size: 13px;
        }

        .team-list {
          display: grid;
          gap: 10px;
          max-height: 290px;
          overflow: auto;
          padding-right: 4px;
        }

        .team-row {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px;
        }

        .team-row h3 {
          margin: 0;
          font-size: 15px;
        }

        .team-row p {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 13px;
        }

        .ghost {
          background: #f8fafc;
        }

        .feed-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }

        .feed-tabs button.active {
          background: #e0e7ff;
          border-color: #c7d2fe;
          color: #3730a3;
          font-weight: 600;
        }

        .feed-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 8px;
          max-height: 290px;
          overflow: auto;
        }

        .feed-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 8px;
          background: #fcfdff;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          margin-top: 7px;
          flex-shrink: 0;
        }

        .dot.info {
          background: #6366f1;
        }

        .dot.success {
          background: #059669;
        }

        .dot.warning {
          background: #ea580c;
        }

        .feed-list p,
        .message p {
          margin: 0;
          font-size: 13px;
        }

        .feed-list small,
        .message small {
          color: #64748b;
          font-size: 12px;
        }

        .chat-box {
          display: grid;
          gap: 10px;
        }

        .chat-list {
          max-height: 220px;
          overflow: auto;
          display: grid;
          gap: 8px;
        }

        .message {
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 8px;
          background: #fcfdff;
        }

        .chat-compose {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 8px;
        }

        .pipeline-board {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: minmax(220px, 1fr);
          overflow-x: auto;
          gap: 12px;
          padding-bottom: 6px;
        }

        .stage {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px;
          background: #f8fafc;
          min-height: 280px;
          display: grid;
          gap: 8px;
          align-content: start;
        }

        .stage header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stage h3 {
          margin: 0;
          font-size: 14px;
        }

        .stage span {
          font-size: 12px;
          color: #475569;
        }

        .stage-empty,
        .empty,
        .empty-state {
          border: 1px dashed #cbd5e1;
          border-radius: 10px;
          color: #64748b;
          padding: 14px;
          text-align: center;
          font-size: 13px;
          background: #ffffff;
        }

        .deal-card {
          border: 1px solid #dbeafe;
          background: #ffffff;
          border-radius: 10px;
          padding: 8px;
          display: grid;
          gap: 6px;
        }

        .deal-card h4 {
          margin: 0;
          font-size: 14px;
        }

        .deal-card p {
          margin: 0;
          color: #64748b;
          font-size: 12px;
        }

        .deal-meta {
          display: flex;
          justify-content: space-between;
          gap: 6px;
          font-size: 12px;
        }

        .deal-actions {
          display: flex;
          justify-content: space-between;
          gap: 8px;
        }

        .deal-actions button {
          flex: 1;
          padding: 6px;
        }

        .line-chart {
          width: 100%;
          height: 250px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: linear-gradient(180deg, #ffffff, #f8fafc);
        }

        .bars {
          display: grid;
          gap: 10px;
        }

        .bar-row {
          display: grid;
          grid-template-columns: 170px 1fr auto;
          align-items: center;
          gap: 10px;
        }

        .bar-label strong {
          display: block;
          font-size: 13px;
        }

        .bar-label span {
          font-size: 12px;
          color: #64748b;
        }

        .bar-track {
          height: 10px;
          background: #e2e8f0;
          border-radius: 999px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #22c55e);
          border-radius: 999px;
          transition: width 0.5s ease;
        }

        .bar-value {
          font-size: 13px;
          font-weight: 600;
        }

        .lead-filters {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr;
          gap: 10px;
          margin-bottom: 10px;
        }

        .table-wrap {
          overflow: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th,
        td {
          border-bottom: 1px solid #e2e8f0;
          padding: 9px 8px;
          text-align: left;
          vertical-align: top;
          font-size: 13px;
        }

        th {
          color: #475569;
          font-weight: 600;
          background: #f8fafc;
          position: sticky;
          top: 0;
        }

        .report-buttons {
          display: flex;
          gap: 8px;
        }

        @media (max-width: 1080px) {
          .hero,
          .top-grid,
          .analytics-grid {
            grid-template-columns: 1fr;
          }

          .kpi-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .bar-row {
            grid-template-columns: 1fr;
            gap: 6px;
          }

          .lead-filters {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .experience-root {
            padding: 14px;
          }

          .kpi-grid {
            grid-template-columns: 1fr;
          }

          .date-inputs {
            grid-template-columns: 1fr;
          }

          .inline-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .chat-compose {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
