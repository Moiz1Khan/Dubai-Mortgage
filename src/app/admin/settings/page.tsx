export default function AdminSettingsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      <p className="text-muted-foreground">
        Environment and Supabase project settings are managed through `.env.local`.
      </p>
      <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
        Configure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `ADMIN_EMAIL`.
      </div>
    </div>
  );
}
