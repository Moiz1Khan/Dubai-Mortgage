"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Inbox,
  Settings,
  Home,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

const ThemeToggleClient = dynamic(
  () => import("@/components/ThemeToggle").then((m) => ({ default: m.ThemeToggle })),
  {
    ssr: false,
    loading: () => (
      <button
        type="button"
        className="p-2 rounded-lg bg-secondary text-muted-foreground"
        aria-label="Theme toggle"
      />
    ),
  }
);

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setAuthLoading(false);
      return;
    }
    const client = supabase;
    let isMounted = true;

    async function checkSession() {
      const { data } = await client.auth.getSession();
      if (!isMounted) return;
      const hasSession = Boolean(data.session);
      if (!hasSession && !isLoginPage) {
        router.replace("/admin/login");
      } else if (hasSession && isLoginPage) {
        router.replace("/admin");
      }
      setAuthLoading(false);
    }

    checkSession();
    const { data: listener } = client.auth.onAuthStateChange(() => {
      checkSession();
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [isLoginPage, router]);

  if (authLoading && !isLoginPage) {
    return (
      <div className="min-h-screen grid place-items-center text-muted-foreground">
        Checking admin session...
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  async function handleSignOut() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card shrink-0 flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/admin" className="font-bold text-xl">
            Admin Panel
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary/20 hover:text-foreground"
                }`}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full mb-2 flex items-center justify-center px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
          >
            Sign Out
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary/20 hover:text-foreground transition-colors"
          >
            <Home className="size-5" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border px-6 flex items-center justify-between shrink-0">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <ThemeToggleClient />
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
              A
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
