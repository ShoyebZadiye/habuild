"use client";

import { useState, useMemo } from "react";

type Lead = {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  quiz_answers: Record<string, string> | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  created_at: string;
};

const goalLabels: Record<string, string> = {
  pain: "Pain Relief", stress: "Stress Relief",
  energy: "Energy & Sleep", weight: "Weight Loss",
};

function exportCSV(leads: Lead[]) {
  const headers = ["ID", "Name", "Email", "WhatsApp", "Goal", "Time", "When", "Level", "UTM Source", "UTM Campaign", "Date"];
  const rows = leads.map((l) => [
    l.id,
    `"${l.name}"`,
    l.email,
    l.whatsapp,
    l.quiz_answers?.goal ?? "",
    l.quiz_answers?.time ?? "",
    l.quiz_answers?.when ?? "",
    l.quiz_answers?.level ?? "",
    l.utm_source ?? "",
    l.utm_campaign ?? "",
    new Date(l.created_at).toLocaleString("en-IN"),
  ]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `habuild-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminDashboard({ leads }: { leads: Lead[] }) {
  const [search, setSearch] = useState("");
  const [filterGoal, setFilterGoal] = useState("all");
  const [filterSource, setFilterSource] = useState("all");
  const [filterCampaign, setFilterCampaign] = useState("all");
  const [filterDate, setFilterDate] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [activeTab, setActiveTab] = useState<"dashboard" | "leads">("dashboard");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekAgo = new Date(today); weekAgo.setDate(weekAgo.getDate() - 7);
  const monthAgo = new Date(today); monthAgo.setDate(monthAgo.getDate() - 30);

  const sources = ["all", ...Array.from(new Set(leads.map((l) => l.utm_source).filter(Boolean))) as string[]];
  const campaigns = ["all", ...Array.from(new Set(leads.map((l) => l.utm_campaign).filter(Boolean))) as string[]];

  const filtered = useMemo(() => {
    const fromDate = dateFrom ? new Date(dateFrom) : null;
    const toDate = dateTo ? new Date(dateTo + "T23:59:59") : null;

    return leads.filter((l) => {
      const d = new Date(l.created_at);
      if (filterDate === "today" && d < today) return false;
      if (filterDate === "week" && d < weekAgo) return false;
      if (filterDate === "month" && d < monthAgo) return false;
      if (filterDate === "custom") {
        if (fromDate && d < fromDate) return false;
        if (toDate && d > toDate) return false;
      }
      if (filterGoal !== "all" && l.quiz_answers?.goal !== filterGoal) return false;
      if (filterSource !== "all" && l.utm_source !== filterSource) return false;
      if (filterCampaign !== "all" && l.utm_campaign !== filterCampaign) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!l.name.toLowerCase().includes(q) && !l.email.toLowerCase().includes(q) && !l.whatsapp.includes(q)) return false;
      }
      return true;
    });
  }, [leads, filterDate, dateFrom, dateTo, filterGoal, filterSource, filterCampaign, search]);

  const todayLeads = leads.filter((l) => new Date(l.created_at) >= today).length;
  const weekLeads = leads.filter((l) => new Date(l.created_at) >= weekAgo).length;
  const topSource = Object.entries(
    leads.reduce((acc, l) => { if (l.utm_source) acc[l.utm_source] = (acc[l.utm_source] || 0) + 1; return acc; }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

  const goalBreakdown = Object.entries(
    leads.reduce((acc, l) => { const g = l.quiz_answers?.goal ?? "unknown"; acc[g] = (acc[g] || 0) + 1; return acc; }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]);

  const campaignBreakdown = Object.entries(
    leads.reduce((acc, l) => { const c = l.utm_campaign ?? "organic"; acc[c] = (acc[c] || 0) + 1; return acc; }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]);

  const selectClass = "bg-[var(--card)] border border-[var(--border)] text-white text-xs rounded-lg px-3 py-2 outline-none focus:border-[var(--accent)] cursor-pointer";

  return (
    <main className="min-h-screen px-4 py-6 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[var(--accent)]">habuild</h1>
          <p className="text-[var(--muted)] text-xs mt-0.5">Admin Dashboard</p>
        </div>
        <button
          onClick={() => exportCSV(filtered)}
          className="flex items-center gap-2 bg-[var(--accent)] text-black text-sm font-bold px-4 py-2 rounded-xl"
        >
          ⬇ Export CSV {filtered.length !== leads.length && `(${filtered.length})`}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["dashboard", "leads"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${activeTab === tab ? "bg-[var(--accent)] text-black" : "bg-[var(--card)] text-[var(--muted)]"}`}
          >
            {tab === "dashboard" ? "📊 Dashboard" : "👥 Leads"}
          </button>
        ))}
      </div>

      {activeTab === "dashboard" && (
        <div className="flex flex-col gap-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Total Leads", value: leads.length, icon: "🧘" },
              { label: "Today", value: todayLeads, icon: "📅" },
              { label: "This Week", value: weekLeads, icon: "📈" },
              { label: "Top Source", value: topSource, icon: "🔗" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-1">
                <span className="text-2xl">{stat.icon}</span>
                <p className="text-2xl font-black text-[var(--accent)]">{stat.value}</p>
                <p className="text-xs text-[var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
              <h3 className="font-bold mb-4">Goals Breakdown</h3>
              <div className="flex flex-col gap-2">
                {goalBreakdown.map(([goal, count]) => (
                  <div key={goal} className="flex items-center gap-3">
                    <span className="text-xs text-[var(--muted)] w-24 shrink-0">{goalLabels[goal] ?? goal}</span>
                    <div className="flex-1 bg-[var(--border)] rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-[var(--accent)]"
                        style={{ width: `${Math.round((count / leads.length) * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-white w-6 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
              <h3 className="font-bold mb-4">Campaign Breakdown</h3>
              <div className="flex flex-col gap-2">
                {campaignBreakdown.length === 0 ? (
                  <p className="text-xs text-[var(--muted)]">No campaign data yet</p>
                ) : campaignBreakdown.map(([campaign, count]) => (
                  <div key={campaign} className="flex items-center gap-3">
                    <span className="text-xs text-[var(--muted)] w-24 shrink-0 truncate">{campaign}</span>
                    <div className="flex-1 bg-[var(--border)] rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-[var(--accent)]"
                        style={{ width: `${Math.round((count / leads.length) * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-white w-6 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "leads" && (
        <div className="flex flex-col gap-4">
          {/* Filters */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-3">
            <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-widest">Filters</p>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="🔍 Search name, email, number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#1a1a1a] border border-[var(--border)] text-white text-xs rounded-lg px-3 py-2 outline-none focus:border-[var(--accent)] flex-1 min-w-[180px]"
              />
              <select
                value={filterDate}
                onChange={(e) => { setFilterDate(e.target.value); if (e.target.value !== "custom") { setDateFrom(""); setDateTo(""); } }}
                className={selectClass}
              >
                <option value="all">📅 All time</option>
                <option value="today">Today</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
                <option value="custom">📆 Custom range</option>
              </select>
              {filterDate === "custom" && (
                <>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className={selectClass}
                    title="From date"
                  />
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className={selectClass}
                    title="To date"
                  />
                </>
              )}
              <select value={filterGoal} onChange={(e) => setFilterGoal(e.target.value)} className={selectClass}>
                <option value="all">🎯 All goals</option>
                <option value="pain">Pain Relief</option>
                <option value="stress">Stress Relief</option>
                <option value="energy">Energy & Sleep</option>
                <option value="weight">Weight Loss</option>
              </select>
              <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)} className={selectClass}>
                {sources.map((s) => <option key={s} value={s}>{s === "all" ? "🔗 All sources" : s}</option>)}
              </select>
              <select value={filterCampaign} onChange={(e) => setFilterCampaign(e.target.value)} className={selectClass}>
                {campaigns.map((c) => <option key={c} value={c}>{c === "all" ? "📢 All campaigns" : c}</option>)}
              </select>
              {(search || filterGoal !== "all" || filterSource !== "all" || filterCampaign !== "all" || filterDate !== "all") && (
                <button
                  onClick={() => { setSearch(""); setFilterGoal("all"); setFilterSource("all"); setFilterCampaign("all"); setFilterDate("all"); setDateFrom(""); setDateTo(""); }}
                  className="text-xs text-red-400 border border-red-400/30 rounded-lg px-3 py-2"
                >
                  ✕ Clear
                </button>
              )}
            </div>
            <p className="text-xs text-[var(--muted)]">Showing <span className="text-white font-semibold">{filtered.length}</span> of {leads.length} leads</p>
          </div>

          {/* Leads list */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-16 gap-3">
              <span className="text-4xl">📭</span>
              <p className="text-[var(--muted)] text-sm">No leads match your filters.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((lead) => (
                <div key={lead.id} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold">{lead.name}</p>
                      <p className="text-[var(--muted)] text-xs">{lead.email}</p>
                      <p className="text-white text-sm font-medium mt-0.5">📱 {lead.whatsapp}</p>
                    </div>
                    <a
                      href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 bg-[#25D366] text-white text-xs font-bold px-3 py-1.5 rounded-full"
                    >
                      WhatsApp
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {lead.quiz_answers && Object.entries(lead.quiz_answers).map(([k, v]) => (
                      <span key={k} className="text-xs bg-[var(--border)] text-[var(--muted)] rounded-full px-2 py-0.5">
                        {k}: {v}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                    {lead.utm_campaign && (
                      <span className="bg-orange-500/10 text-orange-400 rounded-full px-2 py-0.5">📢 {lead.utm_campaign}</span>
                    )}
                    {lead.utm_source && (
                      <span className="bg-blue-500/10 text-blue-400 rounded-full px-2 py-0.5">🔗 {lead.utm_source}</span>
                    )}
                    <span className="ml-auto">
                      {new Date(lead.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
