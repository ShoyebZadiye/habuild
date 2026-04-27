"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { pixelEvent } from "@/lib/pixel";

const goalMessages: Record<string, { title: string; steps: string[] }> = {
  pain: {
    title: "Your Pain Relief Plan",
    steps: [
      "Start with 5 mins of gentle cat-cow stretches every morning",
      "Avoid sitting for more than 45 mins without a movement break",
      "Your Week 1 focus: spinal decompression & hip openers",
    ],
  },
  stress: {
    title: "Your Stress Relief Plan",
    steps: [
      "Begin each day with 3 deep belly breaths before you check your phone",
      "Your evening routine: 10-min legs-up-the-wall pose",
      "Your Week 1 focus: breathwork & nervous system reset",
    ],
  },
  energy: {
    title: "Your Energy & Sleep Plan",
    steps: [
      "Morning sunlight + 5-min yoga wake-up sequence",
      "No screens 30 mins before bed — replace with restorative yoga",
      "Your Week 1 focus: circadian rhythm reset through movement",
    ],
  },
  weight: {
    title: "Your Weight Loss Plan",
    steps: [
      "Start with sun salutations — burns calories & builds strength",
      "Pair your yoga with a 10-min walk post-meals",
      "Your Week 1 focus: metabolism-boosting flow sequences",
    ],
  },
};

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? "Friend";
  const goal = searchParams.get("goal") ?? "stress";
  const plan = goalMessages[goal] ?? goalMessages["stress"];

  useEffect(() => {
    pixelEvent("CompleteRegistration", { content_name: "habuild_signup" });
  }, []);

  return (
    <main className="min-h-screen flex flex-col px-5 py-10 max-w-md mx-auto gap-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center gap-3 pt-6"
      >
        <span className="text-6xl">🎉</span>
        <h1 className="text-3xl font-black">
          You&apos;re in, {name.split(" ")[0]}!
        </h1>
        <p className="text-[var(--muted)] text-base">
          Your personalised habit plan is on its way to your WhatsApp & email within 5 minutes.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-[var(--accent)]">{plan.title}</h2>
        <div className="flex flex-col gap-3">
          {plan.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[var(--accent)] font-black text-lg leading-none mt-0.5">
                {i + 1}.
              </span>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex flex-col gap-3"
      >
        <h3 className="font-bold text-lg">What happens next?</h3>
        {[
          { icon: "📱", text: "Full 14-day plan sent to your WhatsApp" },
          { icon: "📧", text: "Day 1 welcome email with video links" },
          { icon: "🔔", text: "Daily reminders to keep your streak alive" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-3 bg-[var(--card)] rounded-2xl px-4 py-3">
            <span className="text-2xl">{item.icon}</span>
            <span className="text-sm text-[var(--muted)]">{item.text}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col gap-3 pb-8"
      >
        <p className="text-center text-sm text-[var(--muted)]">
          Know someone who needs this? Share the love 💛
        </p>
        <a
          href={`https://wa.me/917969213331?text=${encodeURIComponent("I WANT TO JOIN")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Chat with us on WhatsApp
        </a>
        <Link href="/" className="text-center text-sm text-[var(--muted)] underline underline-offset-2">
          Back to home
        </Link>
      </motion.div>
    </main>
  );
}
