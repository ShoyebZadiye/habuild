"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { pixelEvent } from "@/lib/pixel";

const confettiPieces = [
  { x: 80, y: -60, color: "#4ade80" },
  { x: 100, y: 20, color: "#86efac" },
  { x: 70, y: 90, color: "#fbbf24" },
  { x: 10, y: 120, color: "#f9a8d4" },
  { x: -60, y: 100, color: "#60a5fa" },
  { x: -100, y: 30, color: "#4ade80" },
  { x: -90, y: -50, color: "#fbbf24" },
  { x: -40, y: -110, color: "#86efac" },
  { x: 30, y: -120, color: "#f9a8d4" },
  { x: 110, y: -30, color: "#60a5fa" },
  { x: 120, y: 60, color: "#4ade80" },
  { x: 50, y: 130, color: "#fbbf24" },
  { x: -20, y: 140, color: "#86efac" },
  { x: -110, y: 70, color: "#f9a8d4" },
  { x: -130, y: -10, color: "#60a5fa" },
  { x: -60, y: -120, color: "#4ade80" },
];

function Confetti() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-start justify-center">
      {confettiPieces.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2.5 h-2.5 rounded-full"
          style={{ background: p.color, top: "12%" }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.025 }}
        />
      ))}
    </div>
  );
}

const goalData: Record<string, { title: string; stat: string; steps: string[] }> = {
  pain: {
    title: "Teri Pain Relief Plan",
    stat: "90% logon ki body pain pehle hafte mein reduce hoti hai 🌿",
    steps: [
      "Subah 5 min gentle cat-cow stretches se shuru karo",
      "45 min se zyada ek jagah mat baitho — movement break lo",
      "Week 1 focus: spinal decompression & hip openers",
    ],
  },
  stress: {
    title: "Tera Stress Relief Plan",
    stat: "85% logon ka anxiety level pehle 5 din mein improve hota hai 🌬️",
    steps: [
      "Har subah phone check karne se pehle 3 deep belly breaths lo",
      "Raat ko: 10-min legs-up-the-wall pose before bed",
      "Week 1 focus: breathwork & nervous system reset",
    ],
  },
  energy: {
    title: "Tera Energy & Sleep Plan",
    stat: "88% logon ki neend quality pehle hafte mein better hoti hai 🌙",
    steps: [
      "Subah sunlight + 5-min yoga wake-up sequence",
      "Sone se 30 min pehle screens band — restorative yoga karo",
      "Week 1 focus: circadian rhythm reset through movement",
    ],
  },
  weight: {
    title: "Tera Weight Loss Plan",
    stat: "92% logon ne 14 din mein body better feel kiya ⚡",
    steps: [
      "Sun salutations se shuru karo — calories burn + strength",
      "Khane ke baad 10-min walk add karo",
      "Week 1 focus: metabolism-boosting flow sequences",
    ],
  },
};

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? "Friend";
  const goal = searchParams.get("goal") ?? "stress";
  const plan = goalData[goal] ?? goalData["stress"];
  const firstName = name.split(" ")[0];

  useEffect(() => {
    pixelEvent("CompleteRegistration", { content_name: "habuild_signup" });
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col px-5 py-10 max-w-md mx-auto gap-8 overflow-hidden">
      <Confetti />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center gap-3 pt-6"
      >
        <span className="text-6xl">🎉</span>
        <h1 className="text-3xl font-black">
          {firstName}, tu in hai! 🙌
        </h1>
        <p className="text-[var(--muted)] text-base">
          Tera personalised plan 5 minute mein WhatsApp & email par aa jayega.
        </p>
      </motion.div>

      {/* Stat card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-2xl px-5 py-4 flex items-center gap-3"
      >
        <span className="text-2xl">📊</span>
        <p className="text-sm text-[var(--accent)] font-medium">{plan.stat}</p>
      </motion.div>

      {/* Plan preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-[var(--accent)]">{plan.title}</h2>
        <div className="flex flex-col gap-3">
          {plan.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[var(--accent)] font-black text-lg leading-none mt-0.5">{i + 1}.</span>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Streak hook */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-[var(--card)] border border-[var(--accent)]/30 rounded-2xl p-4 flex items-center gap-4"
      >
        <span className="text-3xl">⏰</span>
        <div>
          <p className="font-bold text-sm">Day 1 kal se shuru hota hai!</p>
          <p className="text-xs text-[var(--muted)] mt-0.5">Apne phone mein subah ka reminder set karo — streak mat tooto.</p>
        </div>
      </motion.div>

      {/* What next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="flex flex-col gap-3"
      >
        <h3 className="font-bold text-lg">Aage kya hoga?</h3>
        {[
          { icon: "📱", text: "Poora 14-din plan WhatsApp par milega" },
          { icon: "📧", text: "Day 1 welcome email video links ke saath" },
          { icon: "🔔", text: "Daily reminders taaki streak zinda rahe" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-3 bg-[var(--card)] rounded-2xl px-4 py-3">
            <span className="text-2xl">{item.icon}</span>
            <span className="text-sm text-[var(--muted)]">{item.text}</span>
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="flex flex-col gap-3 pb-8"
      >
        <p className="text-center text-sm text-[var(--muted)]">
          Kisi dost ko bhi chahiye? Share karo 💛
        </p>
        <a
          href={`https://wa.me/917969213331?text=${encodeURIComponent("I WANT TO JOIN")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          WhatsApp par baat karo
        </a>
        <Link href="/" className="text-center text-sm text-[var(--muted)] underline underline-offset-2">
          Home par wapas jao
        </Link>
      </motion.div>
    </main>
  );
}
