import { Suspense } from "react";
import Link from "next/link";
import UTMCapture from "@/components/UTMCapture";

export default function Home() {
  return (
    <>
      <Suspense><UTMCapture /></Suspense>
      <main className="min-h-screen flex flex-col px-5 max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between py-5">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="5" r="3" fill="#4ade80"/>
              <path d="M7 12 Q14 8 21 12" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none"/>
              <path d="M14 11 L14 20" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/>
              <path d="M14 20 L9 26" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/>
              <path d="M14 20 L19 26" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-xl font-black tracking-tight text-white">Habuild</span>
          </div>
          <span className="text-sm font-bold text-[var(--accent)]">#HarGharYoga</span>
        </div>

        {/* Hero */}
        <div className="flex flex-col gap-4 pt-2 pb-5">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-4xl">
            🧘
          </div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)]">
            Free 14-Day Yoga Challenge
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-tight">
            Subah uthte hi<br />
            <span className="text-[var(--accent)]">body stiff rehti hai?</span>
          </h1>
          <p className="text-[var(--muted)] text-base leading-relaxed">
            India ke sabse bade free yoga challenge mein join karo — 14 din, daily live sessions, aur ek community jo tumhare saath chalegi.
          </p>
        </div>

        {/* CTA above fold */}
        <div className="flex flex-col gap-2 pb-7">
          <Link href="/quiz" className="btn-primary">
            🧘 Free Challenge Join Karo →
          </Link>
          <div className="flex items-center justify-center gap-3 text-xs text-[var(--muted)]">
            <span>✅ Bilkul free</span>
            <span>⏱️ 60 seconds</span>
            <span>🔒 No spam</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { value: "1.4 Cr+", label: "Participants" },
            { value: "4.9 ⭐", label: "Google Rating" },
            { value: "14 Din", label: "Free Challenge" },
          ].map((s) => (
            <div key={s.label} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-3 text-center">
              <p className="text-base font-black text-[var(--accent)]">{s.value}</p>
              <p className="text-xs text-[var(--muted)] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Pain points */}
        <div className="flex flex-col gap-3 mb-6">
          {[
            { icon: "🌿", label: "Body pain hai?", text: "7 din ke morning yoga se back & joint pain reduce hoti hai" },
            { icon: "🌬️", label: "Stress zyada hai?", text: "5 min breathwork se nervous system reset hota hai" },
            { icon: "🌙", label: "Neend nahi aati?", text: "Evening routine se sleep quality 40% improve hoti hai" },
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

        {/* Testimonial */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 mb-6">
          <div className="flex gap-0.5 mb-2 text-sm">⭐⭐⭐⭐⭐</div>
          <p className="text-sm text-white leading-relaxed">
            &ldquo;7 din mein meri back pain almost khatam ho gayi. Yeh challenge actually kaam karta hai!&rdquo;
          </p>
          <p className="text-xs text-[var(--muted)] mt-2">— Priya S., Mumbai · Habuild Challenge</p>
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
            <span className="text-white font-semibold">2,847</span> Indians ne is hafte join kiya
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col gap-3 pb-10">
          <Link href="/quiz" className="btn-primary">
            🧘 Free Challenge Join Karo →
          </Link>
          <p className="text-center text-xs text-[var(--accent)] font-semibold">
            🔥 Aaj ke liye available — abhi join karo
          </p>
        </div>

      </main>
    </>
  );
}
