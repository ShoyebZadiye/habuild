import { getSupabase, supabaseReady } from "@/lib/supabase";
import AdminDashboard from "@/components/AdminDashboard";

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

  return <AdminDashboard leads={leads ?? []} />;
}
