import { Suspense } from "react";
import Link from "next/link";
import UTMCapture from "@/components/UTMCapture";

export default function Home() {
  return (
    <>
      <Suspense><UTMCapture /></Suspense>
      <main className="min-h-screen flex flex-col items-center justify-between px-5 py-10 max-w-md mx-auto">

        {/* Top badge */}
        <div className="w-full flex justify-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-[var(--accent)] border border-[var(--accent)] rounded-full px-4 py-1">
            Free • No credit card
          </span>
        </div>

        {/* Hero section */}
        <div className="flex flex-col items-center text-center gap-6 py-10">
          <div className="text-6xl mb-2">🧘</div>

          <h1 className="text-4xl font-black leading-tight tracking-tight">
            Stop starting over.
            <br />
            <span className="text-[var(--accent)]">Start building habits.</span>
          </h1>

          <p className="text-[var(--muted)] text-lg leading-relaxed">
            Your body is asking for just <strong className="text-white">5 minutes a day</strong>.
            Get a free yoga plan built around your real life — not someone else&apos;s.
          </p>

          {/* Pain points */}
          <div className="w-full flex flex-col gap-3 mt-2">
            {[
              { icon: "😣", text: "Back pain from sitting all day" },
              { icon: "😰", text: "Stress & anxiety that won't go away" },
              { icon: "😴", text: "Can't sleep, always exhausted" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 bg-[var(--card)] rounded-2xl px-4 py-3 text-left"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm text-[var(--muted)]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="w-full flex flex-col gap-4">
          <Link href="/quiz" className="btn-primary">
            Get My Free Habit Plan →
          </Link>
          <p className="text-center text-xs text-[var(--muted)]">
            Takes 60 seconds · 2,400+ habits built this month
          </p>
        </div>

      </main>
    </>
  );
}
