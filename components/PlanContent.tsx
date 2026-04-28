"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { pixelEvent } from "@/lib/pixel";

const goalMotivation: Record<string, { headline: string; stat: string }> = {
  pain: {
    headline: "Tera spot ready hai! 🌿",
    stat: "90% logon ki body pain pehle hafte mein reduce hoti hai",
  },
  stress: {
    headline: "Tera spot ready hai! 🌬️",
    stat: "85% logon ka stress level pehle 5 din mein improve hota hai",
  },
  energy: {
    headline: "Tera spot ready hai! 🌙",
    stat: "88% logon ki neend quality pehle hafte mein better hoti hai",
  },
  weight: {
    headline: "Tera spot ready hai! ⚡",
    stat: "92% logon ne 14 din mein body better feel kiya",
  },
};

const challengeSchedule = [
  { day: "Day 1–2", focus: "Breathwork & Awareness", detail: "Mindfulness baseline build karo" },
  { day: "Day 3–5", focus: "Gentle Movement", detail: "Body activate karo, stiffness hatao" },
  { day: "Day 6–8", focus: "Core & Strength", detail: "Foundation strength build karo" },
  { day: "Day 9–11", focus: "Flow & Balance", detail: "Coordination & focus improve karo" },
  { day: "Day 12–13", focus: "Deep Stretch", detail: "Tension release, flexibility badhao" },
  { day: "Day 14", focus: "Full Body Flow", detail: "Sab kuch ek saath — transformation complete!" },
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
    if (!name.trim()) e.name = "Apna naam baro.";
    if (!emailRegex.test(email)) e.email = "Valid email address daro.";
    if (!whatsapp) {
      e.whatsapp = "WhatsApp number daro.";
    } else if (!isValidPhoneNumber(whatsapp as string)) {
      e.whatsapp = "Country code ke saath valid number daro.";
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

      pixelEvent("Lead", { content_name: "habuild_challenge" });
      router.push(`/thank-you?name=${encodeURIComponent(name)}&goal=${goal}`);
    } catch {
      setErrors({ form: "Kuch gadbad ho gayi. Dobara try karo." });
      setLoading(false);
    }
  };

  const motive = goalMotivation[goal] ?? goalMotivation["stress"];

  return (
    <main className="min-h-screen flex flex-col px-5 py-10 max-w-md mx-auto gap-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-3"
      >
        <h1 className="text-3xl font-black leading-tight">
          {motive.headline}
        </h1>
        <div className="flex items-center gap-2 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-xl px-3 py-2">
          <span className="text-sm">📊</span>
          <p className="text-[var(--accent)] text-xs font-medium">{motive.stat}</p>
        </div>
        <p className="text-[var(--muted)] text-sm">
          Apna free spot claim karo — details bhar ke 14-day Habuild Yoga Challenge join karo.
        </p>
      </motion.div>

      {/* Challenge preview — blurred */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative rounded-3xl overflow-hidden bg-[var(--card)] border border-[var(--border)]"
      >
        <div className="p-5 flex flex-col gap-3 blur-sm select-none pointer-events-none">
          {challengeSchedule.map((item) => (
            <div key={item.day} className="flex items-start gap-3 py-2 border-b border-[var(--border)] last:border-0">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-white">{item.day}: {item.focus}</p>
                <p className="text-xs text-[var(--muted)]">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px]">
          <span className="text-4xl mb-2">🔒</span>
          <p className="font-bold text-white text-center text-sm px-4">
            Register karo aur challenge unlock karo
          </p>
        </div>
      </motion.div>

      {/* Registration form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold">Free Challenge Register Karo</h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--muted)]">Tumhara naam</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Shoyeb"
            autoComplete="name"
            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-white placeholder-[var(--muted)] text-base focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
          {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--muted)]">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="shoyebzadiye@gmail.com"
            autoComplete="email"
            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-white placeholder-[var(--muted)] text-base focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
          {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
        </div>

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
          {loading ? "Register ho rahe ho..." : "🧘 Free Challenge Join Karo"}
        </button>

        <p className="text-center text-xs text-[var(--muted)]">
          No spam. Challenge details WhatsApp & email par milenge.
        </p>
      </motion.form>
    </main>
  );
}
