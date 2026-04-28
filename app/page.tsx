import { Suspense } from "react";
import Link from "next/link";
import UTMCapture from "@/components/UTMCapture";

export default function Home() {
  return (
    <>
      <Suspense><UTMCapture /></Suspense>
      <main className="min-h-screen flex flex-col px-5 max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center justify-center py-5">
          <span className="text-2xl font-black tracking-tight text-[var(--accent)]">habuild</span>
        </div>

        {/* Hero — identity hook question */}
        <div className="flex flex-col gap-4 pt-2 pb-5">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-4xl">
            🧘
          </div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)]">
            14-Day Free Yoga Plan
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-tight">
            Subah uthte hi<br />
            <span className="text-[var(--accent)]">body stiff rehti hai?</span>
          </h1>
          <p className="text-[var(--muted)] text-base leading-relaxed">
            Sirf 14 din mein — ek personalised yoga plan jo tumhari body, time aur goals ke hisaab se bana ho.
          </p>
        </div>

        {/* CTA above fold */}
        <div className="flex flex-col gap-2 pb-7">
          <Link href="/quiz" className="btn-primary">
            Mera Free Plan Banao →
          </Link>
          <div className="flex items-center justify-center gap-3 text-xs text-[var(--muted)]">
            <span>✅ Bilkul free</span>
            <span>⏱️ 60 seconds</span>
            <span>🔒 No spam</span>
          </div>
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
            &ldquo;7 din mein meri back pain almost khatam ho gayi. Yeh plan actually kaam karta hai!&rdquo;
          </p>
          <p className="text-xs text-[var(--muted)] mt-2">— Priya S., Mumbai · Pain Relief plan</p>
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
            <span className="text-white font-semibold">2,847</span> Indians ne is hafte start kiya
          </p>
        </div>

        {/* Bottom CTA with urgency */}
        <div className="flex flex-col gap-3 pb-10">
          <Link href="/quiz" className="btn-primary">
            Mera Free Plan Banao →
          </Link>
          <p className="text-center text-xs text-[var(--accent)] font-semibold">
            🔥 Aaj ke liye available — abhi banao
          </p>
        </div>

      </main>
    </>
  );
}
