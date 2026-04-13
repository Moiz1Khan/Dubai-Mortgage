"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setPending(false);
      setError("Supabase is not configured. Add environment variables first.");
      return;
    }
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setPending(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.replace("/admin");
  }

  return (
    <div className="min-h-screen bg-background grid place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 md:p-8">
        <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Sign in to manage website content and blogs.
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="admin@creditlink.ae"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
