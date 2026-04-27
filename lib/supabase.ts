import { createClient } from "@supabase/supabase-js";

type LeadRow = {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  quiz_answers: Record<string, string>;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  created_at: string;
};

type LeadInsert = {
  name: string;
  email: string;
  whatsapp: string;
  quiz_answers: Record<string, string>;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  created_at?: string;
};

type Database = {
  public: {
    Tables: {
      leads: {
        Row: LeadRow;
        Insert: LeadInsert;
        Update: Partial<LeadInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

const clean = (s?: string) => s?.replace(/^﻿/, "").trim() ?? "";

let _client: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabase() {
  if (!_client) {
    _client = createClient<Database>(
      clean(process.env.SUPABASE_URL),
      clean(process.env.SUPABASE_ANON_KEY)
    );
  }
  return _client;
}

export const supabaseReady = () =>
  clean(process.env.SUPABASE_URL).startsWith("http") &&
  clean(process.env.SUPABASE_ANON_KEY).length > 0;
