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

const goalStats: Record<string, string> = {
  pain: "90% logon ki body pain pehle hafte mein reduce hoti hai 🌿",
  stress: "85% logon ka stress level pehle 5 din mein improve hota hai 🌬️",
  energy: "88% logon ki neend quality pehle hafte mein better hoti hai 🌙",
  weight: "92% logon ne 14 din mein body better feel kiya ⚡",
};

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? "Friend";
  const goal = searchParams.get("goal") ?? "stress";
  const firstName = name.split(" ")[0];
  const stat = goalStats[goal] ?? goalStats["stress"];

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
          Welcome, {firstName}! 🙌
        </h1>
        <p className="text-[var(--muted)] text-base">
          You are now part of the Habuild 14-Day Yoga Challenge! Challenge details 5 minutes mein WhatsApp & email par aa jayegi.
        </p>
      </motion.div>

      {/* Stat */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-2xl px-5 py-4 flex items-center gap-3"
      >
        <span className="text-2xl">📊</span>
        <p className="text-sm text-[var(--accent)] font-medium">{stat}</p>
      </motion.div>

      {/* What to expect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="flex flex-col gap-3"
      >
        <h3 className="font-bold text-lg">Aage kya hoga? 👇</h3>
        {[
          { icon: "📱", text: "WhatsApp par challenge ka full schedule milega" },
          { icon: "📧", text: "Email par Day 1 ka welcome message aayega" },
          { icon: "🔔", text: "Daily reminders taaki streak kabhi na toote" },
          { icon: "👥", text: "Community group mein add kiya jaayega" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-3 bg-[var(--card)] rounded-2xl px-4 py-3">
            <span className="text-2xl">{item.icon}</span>
            <span className="text-sm text-[var(--muted)]">{item.text}</span>
          </div>
        ))}
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
          <p className="font-bold text-sm">Day 1 Monday se shuru hota hai!</p>
          <p className="text-xs text-[var(--muted)] mt-0.5">Subah ka alarm set karo — pehla din miss mat karna.</p>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="flex flex-col gap-3 pb-8"
      >
        <p className="text-center text-sm text-[var(--muted)]">
          Kisi dost ko bhi join karana hai? Share karo 💛
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
          Back to Home
        </Link>
      </motion.div>
    </main>
  );
}
