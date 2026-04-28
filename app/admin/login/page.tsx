"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Wrong password. Try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-black text-[var(--accent)]">habuild</h1>
          <p className="text-[var(--muted)] text-sm mt-1">Admin Access</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoFocus
            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-white placeholder-[var(--muted)] text-base focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
            {loading ? "Checking..." : "Login →"}
          </button>
        </form>
      </div>
    </main>
  );
}
