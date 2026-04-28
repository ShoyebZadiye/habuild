"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { pixelEvent } from "@/lib/pixel";

const goalMotivation: Record<string, { headline: string; stat: string }> = {
  pain: {
    headline: "Tera Pain Relief plan ready hai! 🌿",
    stat: "90% logon ki body pain pehle hafte mein reduce hoti hai",
  },
  stress: {
    headline: "Tera Stress Relief plan ready hai! 🌬️",
    stat: "85% logon ka anxiety level pehle 5 din mein improve hota hai",
  },
  energy: {
    headline: "Tera Energy & Sleep plan ready hai! 🌙",
    stat: "88% logon ki neend quality pehle hafte mein better hoti hai",
  },
  weight: {
    headline: "Tera Weight Loss plan ready hai! ⚡",
    stat: "92% logon ne 14 din mein body better feel kiya",
  },
};

const planLabels: Record<string, string> = {
  pain: "Pain Relief",
  stress: "Stress Relief",
  energy: "Energy & Sleep",
  weight: "Weight Loss",
  "5min": "5-Min Daily",
  "15min": "15-Min Daily",
  "30min": "30-Min Daily",
  "30plus": "45-Min Daily",
  morning: "Morning Flow",
  afternoon: "Afternoon Reset",
  evening: "Evening Wind-Down",
  anytime: "Flexible",
  beginner: "Beginner",
  novice: "Foundation",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const weekPlan = [
  { day: "Day 1–2", focus: "Breathwork & Awareness", duration: "Builds mindfulness baseline" },
  { day: "Day 3–5", focus: "Gentle Movement", duration: "Activates body & reduces stiffness" },
  { day: "Day 6–8", focus: "Core & Strength", duration: "Builds foundational strength" },
  { day: "Day 9–11", focus: "Flow & Balance", duration: "Improves coordination & focus" },
  { day: "Day 12–13", focus: "Deep Stretch", duration: "Releases tension & improves flexibility" },
  { day: "Day 14", focus: "Full Body Flow", duration: "Integrates everything learned" },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PlanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goal = searchParams.get("goal") ?? "stress";
  const time = searchParams.get("time") ?? "15min";
  const when = searchParams.get("when") ?? "morning";
  const level = searchParams.get("level") ?? "beginner";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    pixelEvent("ViewContent", { content_name: "plan_page" });
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!emailRegex.test(email)) e.email = "Please enter a valid email address.";
    if (!whatsapp) {
      e.whatsapp = "Please enter your WhatsApp number.";
    } else if (!isValidPhoneNumber(whatsapp as string)) {
      e.whatsapp = "Please enter a valid WhatsApp number with country code.";
    }
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    const utms: Record<string, string> = {};
    utmKeys.forEach((k) => {
      const v = sessionStorage.getItem(k);
      if (v) utms[k] = v;
    });

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          whatsapp,
          quiz_answers: { goal, time, when, level },
          ...utms,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      pixelEvent("Lead", { content_name: "habuild_plan" });
      router.push(`/thank-you?name=${encodeURIComponent(name)}&goal=${goal}`);
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
      setLoading(false);
    }
  };

  const motive = goalMotivation[goal] ?? goalMotivation["stress"];

  return (
    <main className="min-h-screen flex flex-col px-5 py-10 max-w-md mx-auto gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-2 flex-wrap">
          {[planLabels[goal], planLabels[time], planLabels[when], planLabels[level]].map((tag) => (
            <span key={tag} className="text-xs font-semibold bg-[var(--accent)] text-black rounded-full px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-black leading-tight mt-2">
          {motive.headline}
        </h1>
        <div className="flex items-center gap-2 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-xl px-3 py-2">
          <span className="text-[var(--accent)] text-sm">📊</span>
          <p className="text-[var(--accent)] text-xs font-medium">{motive.stat}</p>
        </div>
        <p className="text-[var(--muted)] text-sm">
          Neeche details bhar ke apna free plan unlock karo.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative rounded-3xl overflow-hidden bg-[var(--card)] border border-[var(--border)]"
      >
        <div className="p-5 flex flex-col gap-3 blur-sm select-none pointer-events-none">
          {weekPlan.map((item) => (
            <div key={item.day} className="flex items-start gap-3 py-2 border-b border-[var(--border)] last:border-0">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-white">{item.day}: {item.focus}</p>
                <p className="text-xs text-[var(--muted)]">{item.duration}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px]">
          <span className="text-4xl mb-2">🔒</span>
          <p className="font-bold text-white text-center text-sm px-4">
            Fill the form below to unlock your free plan
          </p>
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold">Unlock your free plan</h2>

        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--muted)]">Your name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Priya Sharma"
            autoComplete="name"
            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-white placeholder-[var(--muted)] text-base focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
          {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--muted)]">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="priya@example.com"
            autoComplete="email"
            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-white placeholder-[var(--muted)] text-base focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
          {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
        </div>

        {/* WhatsApp with flag + country code */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--muted)]">WhatsApp number</label>
          <PhoneInput
            international
            defaultCountry="IN"
            value={whatsapp}
            onChange={(val) => setWhatsapp(val)}
            className="phone-input"
          />
          {errors.whatsapp && <p className="text-red-400 text-xs">{errors.whatsapp}</p>}
        </div>

        {errors.form && <p className="text-red-400 text-sm">{errors.form}</p>}

        <button type="submit" disabled={loading} className="btn-primary mt-2 disabled:opacity-60">
          {loading ? "Unlocking..." : "Unlock My Free Plan 🔓"}
        </button>

        <p className="text-center text-xs text-[var(--muted)]">
          No spam. We&apos;ll send your plan via WhatsApp & email.
        </p>
      </motion.form>
    </main>
  );
}
