import { getSupabase, supabaseReady } from "@/lib/supabase";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

async function saveToFile(lead: Record<string, unknown>) {
  const dir = path.join(process.cwd(), "data");
  const file = path.join(dir, "leads.json");
  await mkdir(dir, { recursive: true });

  let existing: unknown[] = [];
  try {
    const raw = await readFile(file, "utf-8");
    existing = JSON.parse(raw);
  } catch {
    existing = [];
  }

  existing.push({ ...lead, created_at: new Date().toISOString() });
  await writeFile(file, JSON.stringify(existing, null, 2), "utf-8");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, whatsapp, quiz_answers, utm_source, utm_medium, utm_campaign, utm_content, utm_term } = body;

    if (!email || !whatsapp) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const lead = {
      name: "",
      email,
      whatsapp,
      quiz_answers,
      utm_source: utm_source ?? null,
      utm_medium: utm_medium ?? null,
      utm_campaign: utm_campaign ?? null,
      utm_content: utm_content ?? null,
      utm_term: utm_term ?? null,
    };

    if (supabaseReady()) {
      const { error } = await getSupabase().from("leads").insert(lead);
      if (error) {
        console.error("Supabase error:", JSON.stringify(error));
        return Response.json({ error: "Database error" }, { status: 500 });
      }
    } else {
      await saveToFile(lead);
      console.log("Lead saved to data/leads.json (Supabase not configured)");
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
