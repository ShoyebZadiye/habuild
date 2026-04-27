import { Suspense } from "react";
import Link from "next/link";
import UTMCapture from "@/components/UTMCapture";

export default function Home() {
  return (
    <>
      <Suspense><UTMCapture /></Suspense>
      <main className="min-h-screen flex flex-col px-5 max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center justify-center py-6">
          <span className="text-2xl font-black tracking-tight text-[var(--accent)]">habuild</span>
        </div>

        {/* Hero */}
        <div className="flex flex-col items-center text-center gap-5 pt-4 pb-8">
          <div className="w-20 h-20 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-5xl">
            🧘
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)]">
              Your Yoga Journey Starts Here
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tight">
              Find your calm.
              <br />
              <span className="text-[var(--accent)]">Build your practice.</span>
            </h1>
          </div>

          <p className="text-[var(--muted)] text-base leading-relaxed max-w-xs">
            A personalised 14-day yoga habit plan — crafted around your body, your time, and your goals.
          </p>
        </div>

        {/* Pain points */}
        <div className="flex flex-col gap-3 mb-8">
          {[
            { icon: "🌿", label: "Feeling stiff?", text: "Morning yoga can relieve body pain in 7 days" },
            { icon: "🌬️", label: "Stressed out?", text: "5 minutes of breathwork resets your nervous system" },
            { icon: "🌙", label: "Can't sleep?", text: "An evening routine improves sleep quality by 40%" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl px-4 py-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-xl shrink-0">
                {item.icon}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white">{item.label}</p>
                <p className="text-xs text-[var(--muted)] leading-snug">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex -space-x-2">
            {["🧑", "👩", "🧑‍🦱", "👩‍🦰"].map((e, i) => (
              <div key={i} className="w-7 h-7 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-sm">
                {e}
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--muted)]">
            <span className="text-white font-semibold">2,400+</span> people started this month
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3 pb-10">
          <Link href="/quiz" className="btn-primary">
            Build My Yoga Habit →
          </Link>
          <p className="text-center text-xs text-[var(--muted)]">
            Takes 60 seconds · Completely free
          </p>
        </div>

      </main>
    </>
  );
}
