export async function GET() {
  return Response.json({
    SUPABASE_URL: process.env.SUPABASE_URL ? process.env.SUPABASE_URL.slice(0, 30) + "..." : "MISSING",
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? "SET (" + process.env.SUPABASE_ANON_KEY.slice(0, 10) + "...)" : "MISSING",
  });
}
