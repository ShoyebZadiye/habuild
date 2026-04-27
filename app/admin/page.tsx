import { getSupabase, supabaseReady } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!supabaseReady()) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-5 text-center gap-4">
        <span className="text-4xl">⚠️</span>
        <h1 className="text-2xl font-black">Supabase not connected</h1>
        <p className="text-[var(--muted)] max-w-sm">
          Add your Supabase URL and anon key to Vercel environment variables, then redeploy.
        </p>
      </main>
    );
  }

  const { data: leads, error } = await getSupabase()
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-400">Error loading leads: {error.message}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black">Leads</h1>
          <p className="text-[var(--muted)] text-sm mt-1">
            {leads?.length ?? 0} total submissions
          </p>
        </div>
        <span className="text-3xl">🧘</span>
      </div>

      {!leads || leads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <span className="text-5xl">📭</span>
          <p className="text-[var(--muted)]">No leads yet. Share your Instagram ad!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-lg">{lead.name}</p>
                  <p className="text-[var(--muted)] text-sm">{lead.email}</p>
                  <p className="text-white text-sm font-medium">📱 {lead.whatsapp}</p>
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
                {lead.quiz_answers &&
                  Object.entries(lead.quiz_answers as Record<string, string>).map(([k, v]) => (
                    <span
                      key={k}
                      className="text-xs bg-[var(--border)] text-[var(--muted)] rounded-full px-2 py-0.5"
                    >
                      {k}: {v}
                    </span>
                  ))}
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-[var(--muted)]">
                {lead.utm_campaign && (
                  <span className="bg-orange-500/10 text-orange-400 rounded-full px-2 py-0.5">
                    📢 {lead.utm_campaign}
                  </span>
                )}
                {lead.utm_source && (
                  <span className="bg-blue-500/10 text-blue-400 rounded-full px-2 py-0.5">
                    🔗 {lead.utm_source}
                  </span>
                )}
                <span className="ml-auto">
                  {new Date(lead.created_at).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
